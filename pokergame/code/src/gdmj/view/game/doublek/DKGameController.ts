/**
 * 游戏控制模块
 * @author chenkai
 * @date 2016/11/18
 */
class DKGameController extends BaseController{
	/**游戏模块名*/
	public static NAME:string = "DKGameController";
	/**游戏场景*/
	public gameScene:DKGameScene;
    /**离开游戏*/
    public static EVENT_QUIT_GAME:string = "EVENT_QUIT_GAME";
    /**发送聊天*/
    public static EVENT_SEND_CHAT:string = "EVENT_SEND_CHAT";
    /**发送动作表情*/
    public static EVENT_SEND_ACT_FACE:string = "EVENT_SEND_ACT_FACE";
    /**显示游戏场景*/
    public static EVENT_SHOW_GAME_SCENE:string = "EVENT_SHOW_DKGAME_SCENE";    
    
	public constructor() {
		super();
	}

    //注册模块时调用
	public onRegister(){
		this.addEvent(DKGameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
	}


    //注销模块时调用
	public onRemove(){
        this.removeEvent(DKGameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
	}
	
	/**显示游戏*/
	private showGameScene(){
	    this.registerSocket();
        this.gameScene = App.SceneManager.runScene(SceneConst.DKGameScene, this) as DKGameScene;   
	}

    private registerSocket(){
		var gameSocket: ClientSocket = App.gameSocket;  
        gameSocket.register(ProtocolHead.RevCmd7, this.revPlayerEnter, this);
		gameSocket.register("cmd10", this.revPlayerReady, this);
		gameSocket.register("cmd11", this.revPlayCancelReady, this);

		gameSocket.register("cmd12", this.revCards, this);
		gameSocket.register(ProtocolHead.RevCmd13, this.revChangePos, this);
		gameSocket.register("cmd14", this.revActStatus, this);
		gameSocket.register("cmd17", this.revOutPutTip, this);
		gameSocket.register("cmd18", this.revOhterPass, this)

		gameSocket.register("cmd19", this.revOutPutSuccess, this);
		gameSocket.register("cmd20", this.revOutPutShow, this);
		gameSocket.register("cmd21", this.revOutPutErr4Type, this);
		gameSocket.register("cmd22", this.revOutPutErrLess, this);

		gameSocket.register("cmd26", this.revResidueCard, this);
		gameSocket.register("cmd27", this.revSingerOver, this);

		gameSocket.register("cmd30", this.revNextGameStart, this);
		gameSocket.register("cmd34", this.revDisconnection, this);
		gameSocket.register("cmd35", this.revReConnection, this);
		gameSocket.register("cmd36",this.revReNewData,this)
		gameSocket.register("cmd39", this.revReConTip, this);

    }

	/***玩家进入广播 */
	private revPlayerEnter(data:Object){
		App.DataCenter.UserInfo.deleteAllUserExcptMe();        
        var  myOpenId = App.DataCenter.UserInfo.httpUserInfo.openId;
        var userListData:Array<Object>=data["msg"];
        for(let i=0;i<userListData.length;i++){            
            var d=userListData[i];

            if(d!=null){

                var user=new UserVO();
                user.openId = d["openId"];
                user.nickName = d["nickName"];
                user.seatID = d["index"];				
                App.DataCenter.UserInfo.addUser(user);
            }
        }

	}
	/***其他玩家准备 */
	private revPlayerReady(data:Object){
	//{"cmd":10,"game":0,"msg":[{"daoshu":0,"flag":0,"gameModel":0,"gold":0,"id":0,"index":4,"integral":0,"kanshu":0,"nickName":"等风来","ok":false,"openId":"o2P0bwSTs13BEOZCrzGiq2wKvr6I","owner":false,"red":0,"roomCard":0,"roomId":24915,"status":3,"victory":0,"zanshi":0}]}

	var index = data["msg"][0]["index"];
	var pos =this.changeSeat(index);
	this.gameScene.setReadyFlag(pos,true)
	}
	/***恢复数据 */
	 private revReNewData(data:Object){
	// 	{"cmd":36,"game":0,"msg":[[{"daoshu":0,"flag":0,"gameModel":-1,"gold":-1,"id":-1,"index":1,"integral":-1,"kanshu":0,"ok":false,"owner":false,"red":0,"roomCard":-1,"roomId":13429,"status":-1,"victory":-1,"zanshi":0},{"daoshu":0,"flag":0,"gameModel":-1,"gold":-1,"id":-1,"index":2,"integral":-1,"kanshu":0,"ok":false,"owner":false,"red":0,"roomCard":-1,"roomId":13429,"status":-1,"victory":-1,"zanshi":0},{"daoshu":0,"flag":0,"gameModel":-1,"gold":-1,"id":-1,"index":3,"integral":-1,"kanshu":0,"ok":false,"owner":false,"red":0,"roomCard":-1,"roomId":13429,"status":-1,"victory":-1,"zanshi":0}],{"cardArr":[54,52,51,50,49,45,45,44,43,42,37,33,29,27,24,23,22,21,20,19,18,13,9,8,7,7,4],"gameModel":0,"gold":0,"index":4,"integral":0,"openId":"o2P0bwVIsXa8H2ZN-K8gvUo5ksiU","roomCard":0,"roomId":13429,"status":3,"victory":0}]}
	
	var userList:Array<Object>  =data["msg"][0];
	userList.forEach((userOb)=>{

                var user=new UserVO();
                user.openId = userOb["openId"];
                user.nickName = userOb["nickName"];
                user.seatID = userOb["index"];
				user.headImgUrl=userOb["headImgUrl"];
                App.DataCenter.UserInfo.addUser(user);
	})

	App.DataCenter.UserInfo.httpUserInfo.seatID =data["msg"][1]["index"];
	App.DataCenter.UserInfo.httpUserInfo.roomId =data["msg"][1]["roomId"];
	var status  = data["msg"][1]["status"]
	var flag = data["msg"][1]["flag"];
	this.gameScene.setActStatus(flag);
	this.gameScene.setRoomIdLab();
	var cardArr=data["msg"][1]["cardArr"];
	if(cardArr)	this.gameScene.showHandleCard(cardArr)
	if(status==3){
		this.gameScene.showActUI(true)
	}else{
		this.gameScene.showActUI(false);
	}
}
	/**其他玩家取消准备 */
	private revPlayCancelReady(data:Object){
		var index = data["msg"][0]["index"];
		var pos =this.changeSeat(index);
		this.gameScene.setReadyFlag(pos,false);

	}
	/**服务器发牌 */
	private revCards(data:Object){
		//{"cmd":12,"game":0,"msg":[{"cards":[54,52,51,50,49,45,45,44,43,42,37,33,29,27,24,23,22,21,20,19,18,13,9,8,7,7,4],"index":4,"status":1}]}
		this.gameScene.showHandleCard(data["msg"][0]["cards"])
		// if(data["msg"][0]["status"]==3){
		// 	this.gameScene.showActUI(true)
		// }else{
			this.gameScene.showActUI(false);
		// }

	}
	/***交互位置 */
	private revChangePos(data:Object){
		// {"cmd":13,"game":0,"msg":[{"array":[[1,2]]}]}
		var id1=data["msg"][0]["array"][0][0];
		var id2=data["msg"][0]["array"][0][1];
		this.changeIndex(id1,id2);
		var pos1=this.changeSeat(id1);
		var pos2=this.changeSeat(id2);
		this.gameScene.changePlayPos(pos1,pos2);

	}
	/***轮到本人操作 flag false表示可以过牌; true表示玩家不能过牌，必须出牌*/
	private revActStatus(data:Object){
		//{"cmd":14,"game":0,"msg":[{"card":[51,50,43,41,41,40,39,38,37,36,36,35,33,27,26,26,24,23,21,18,17,9,6,5,5,3,1],"flag":false,"index":2,"status":2}]}
		var index = data["msg"][0]["index"];
		var pos =this.changeSeat(index);
		var flag =data["msg"][0]["flag"];
		this.gameScene.setActStatus(flag);
		this.gameScene.showActUI(true);
		this.gameScene.cleanOutCard(pos);


	}
	/**出牌提示 */
	private revOutPutTip(data:Object){
		// {"cmd":17,"game":0,"msg":[{"card":[53],"index":3}]
		this.gameScene.toUPCards(data["msg"][0]["card"])
	}

	/**其他玩家pass */
	private revOhterPass(data:Object){
	// {"cmd":18,"game":0,"msg":[{"index":3}]}
		var index = data["msg"][0]["index"];
		var pos =this.changeSeat(index);
		this.gameScene.cleanOutCard(pos);
	}

	/**本人出牌成功 */
	private revOutPutSuccess(data:Object){
		//{"cmd":19,"game":0,"msg":[{"card":[4],"cardType":1,"index":1,"remainCard":26}]}
		this.gameScene.mySelfOutCardOK();
		this.gameScene.showActUI(false);
	}
	/**其他玩家出牌广播显示 */
	private revOutPutShow(data:Object){
		// {"cmd":20,"game":0,"msg":[{"card":[4],"cardType":1,"index":1,"remainCard":26}]}
		var index = data["msg"][0]["index"];
		var remainCard =data["msg"][0]["remainCard"];
		var cards = data["msg"][0]["card"];
		var pos =this.changeSeat(index);
		this.gameScene.otherOutCardShow(pos,cards,remainCard);

	}	/**出牌不符合牌型 */
	private revOutPutErr4Type(data:Object){

	}	/**出牌小于上家牌型 */
	private revOutPutErrLess(data:Object){

	}
	/**牌数量 */
	private revResidueCard(data:Object){
		// {"cmd":26,"game":0,"msg":[[{"cardNum":27,"index":1},{"cardNum":27,"index":2},{"cardNum":27,"index":3},{"cardNum":27,"index":4}]]}
		var rArr:Array<Object> = data["msg"][0]
		rArr.forEach((rdata)=>{
			var pos = this.changeSeat(rdata["index"]);
			var cardNum =rdata["cardNum"];
			this.gameScene.showRemainCard(pos,cardNum);
		})

	}

	private revSingerOver(){

	}

	private revNextGameStart(){

	}

	private revDisconnection(){

	}

	private  revReConnection(){

	}
	//掉线玩家上线，提示恢复数据
	private revReConTip(){

	}





/***准备 */
	public sendReady(){	
  		var data= {cmd:'10',game:'0'}
		App.gameSocket.send(data);
	}

/****取消准备 */
	public sendCancelReady(){
	 var data={cmd:'11',game:'0'}
	 App.gameSocket.send(data);
	}

	public sendLeftRoom(roomId:number){
		var data={cmd:'9',msg:[{roomId:roomId}]}
		// data.msg[0].roomId = roomId;
		App.gameSocket.send(data);
	}

	public sendOutPutCard(card){
		var data={cmd:'15',game:'0',msg:[{card:card}]}
		App.gameSocket.send(data);

	}


	public sendOutPutCardTip(){
		var data={cmd:'16',game:'0'}
		App.gameSocket.send(data)
	}

	public sendActPass(){
		var data ={cmd:'18',game:'0'}
		App.gameSocket.send(data);
	}
// 倒计时结束，过牌
	public sendTimeOutPass(){
		 var data={cmd:'23',game:'0'}
		 App.gameSocket.send(data)
	}
// 倒计时结束,必须出牌
	public sendTimeOutOPCard(){
		var data= {cmd:'24',game:'0'}
		App.gameSocket.send(data);
	}

	public sendContinueGame(){
	// {'cmd':'29','game':' '}
	}

	public sendReConnectionData(){
		// {'cmd':'36','game':' ','msg':[{'openId':' ','nickname':' ','headImgUrl':' '}]}
	}
/***断线恢复数据 */
	public sendReNewData(){
		var data=	{cmd:'36',game:'0',msg:[{openId:' ',nickname:' ',headImgUrl:' '}]}
		var user=App.DataCenter.UserInfo.httpUserInfo;
		data.msg[0].openId =user.openId;
		data.msg[0].nickname =user.nickName;
		data.msg[0].headImgUrl =user.headImgUrl;
		App.gameSocket.send(data);
	}


	public changeSeat(seatId:number):UserPosition{
		var  mySeatId =App.DataCenter.UserInfo.httpUserInfo.seatID;
		var pos:UserPosition;
		if(seatId ==mySeatId){
			pos =0;
		}else if(seatId>mySeatId){
			pos =  seatId - mySeatId;
		}else{
			pos =  4 - mySeatId + seatId;
		}
		console.log("pos: ",pos);
		return pos;
	}

	public changeIndex(id1:number,id2:number){
		var play1=App.DataCenter.UserInfo.getUserBySeatID(id1.toString())
		var play2=App.DataCenter.UserInfo.getUserBySeatID(id2.toString())
		var temp=play1.seatID;
		play1.seatID =play2.seatID;
		play2.seatID =temp;

	}


}