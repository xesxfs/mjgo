/**
 *
 * @author chenwei
 *
 */
class OtherGame extends BasePanel{
	public constructor() {
    	super();
      this.skinName ="OtherGameSkin"
	}
	
    private headGroup: eui.Group;
    private keyInter:number;
    private overShutupGroup:eui.Group;
    public deskNo:number;
    public desk:DeskInfo;
    private delayTime:number =2000;
    private gstateLab:eui.Label;
	
    /**组件创建完毕*/
    protected childrenCreated() {
        this.resetHead();
    }
        
    /**添加到场景中*/
    protected onEnable() {
        this.overShutupGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOverShutup,this);
    }    
    
    public select(){
        var gameSocket: ClientSocket = App.gameSocket;
        gameSocket.register(ProtocolHead.Rev104_10_1,this.revGetDesk,this);    
        //gameSocket.register(ProtocolHead.Rev102_20_1,this.revKickPlayer,this);
        gameSocket.register(ProtocolHead.Rev111_2_1,this.revGameShutup,this);
        gameSocket.register(ProtocolHead.Rev102_5_1,this.revKickPlayer,this);    
        this.sendGetDesk();
        this.keyInter= egret.setInterval(this.sendGetDesk,this,this.delayTime)     
        this.hideOverShutupUI();
    }
    
    public unSelect(){
        if(this.keyInter)
        egret.clearInterval(this.keyInter);
    }
    
    private onOverShutup(e:egret.Event){
     var gameSocket: ClientSocket = App.gameSocket;
        //需要的时候注册
     gameSocket.register(ProtocolHead.Rev102_20_1,this.revKickPlayer,this);
     gameSocket.register(ProtocolHead.Rev111_2_1,this.revGameShutup,this);            
        
     let idx= this.overShutupGroup.getChildIndex(e.target);     
     let idx1= idx%4;
     let head:HeadUI=this.headGroup.getChildAt(idx1) as HeadUI
     if(!head.userID){
         return
     }
     //踢人
     if (idx<4){
         console.log("发送踢人:___________",head.userID)
         ProtocolData.Send102_20_0.kickUserID = head.userID         
         this.sendGameKick()
     }else{
    //禁言
        console.log("发送禁言:___________",head.userID)
        ProtocolData.Send111_2_0.banPostUserID= head.userID;
        ProtocolData.Send111_2_0.type =1//1 禁言3分钟  2本局禁言
        this.sendGameShutup()
         }
    }
    
//    private 
    
    /**
 * 获取桌子信息
 * @param deskNo
 */
    private sendGetDesk() {
        
     if(this.deskNo != null){ 
     
        var info = ProtocolData.Send104_10_0;
        info.deskNo = this.deskNo;
        App.gameSocket.send(ProtocolHead.Send104_10_0,info);        
        }
    }

    /**
     * 获取桌子信息
     */
    private revGetDesk(data) {
        var info = ProtocolData.Rev104_10_1;
        info = data;        
        let  desk:DeskInfo = new DeskInfo();
        desk.readData(info.deskinfo); 
        this.gstateLab.visible = desk.isPlaying
        this.desk = desk;
        let len=info.userList.length
  
        if(!len){
            this.resetHead();
        }
        for(let i=0;i<len;i++){
           // "{"money": 203661, "sex": 1, "win_point": 0, "room_card_coop": 1386, "reconnect": false, "losecount": 0, "dwBank": 0, "build_desk_count": 0, "deskno": 4, "deskstation": 0, "wincount": 0, "room_card": 763, "vip_rank": 0, "nickname": "test9", "szName": "test9", "midcount": 0, "userstate": 2, "isrobot": 0, "userid": 9235, "exp": 0, "signature": "signature11111111111", "avater": "http://192.168.0.252:9090/zjhscript/headimg/head.png"}"
            let user = info.userList[i] ;
            if( typeof user == "string"){
                user = JSON.parse(user);
            }
            let headUi:HeadUI=this.headGroup.getChildAt(i) as HeadUI;         
            headUi.nameLabel.text = user.nickname;
            headUi.scoreLabel.text = user.win_point;
            headUi.loadImg(user.avater)
            headUi.userID = user.userid;
            let shutupImg: eui.Image = this.overShutupGroup.getChildAt(this.headGroup.numChildren + i) as eui.Image;
            shutupImg.visible =true;
            let gameKickImg: eui.Image = this.overShutupGroup.getChildAt(i) as eui.Image;
            gameKickImg.visible=true;
        }
    }
    
    //发送踢人
    private sendGameKick() {
        var data = ProtocolData.Send102_20_0;
        App.gameSocket.send(ProtocolHead.Send102_20_0,data);
        
    }

    
    /**接收踢人广播*/
    public revKickPlayer(data) {
        var json = ProtocolData.Rev102_5_1;
        json = data;
        var kickByUserid = json.userid; //踢人的玩家
        
        //ps 当前玩家只能是在主桌子，不可能在其它桌子
        //var myUserID: number = App.DataCenter.UserInfo.getMyUserVo().userID;    
        
        for(let i = 0;i < this.headGroup.numChildren;i++) {            
            let head: HeadUI = this.headGroup.getChildAt(i) as HeadUI;  
            if(head.userID == json.userid) {
                    head.clear();
                    break;                
            }
        }
    }   
    
    //发送禁言
    private sendGameShutup() {
        var data = ProtocolData.Send111_2_0;
        App.gameSocket.send(ProtocolHead.Send111_2_0,data);
    }
    
    //接受禁言
    private revGameShutup(data){
        var json = ProtocolData.Rev111_2_1;
        json = data;       
        for(let i=0;i<this.headGroup.numChildren;i++){
          let head:HeadUI=this.headGroup.getChildAt(i) as HeadUI
          if(head.userID == json.banPostUserID){
              let shutupImg: eui.Image = this.overShutupGroup.getChildAt(this.headGroup.numChildren+i) as eui.Image;
              shutupImg.source = "game_shutup_ing_png"
              break;
          }
        }
    }
    
    /**隐藏踢人、禁言按钮*/
    private hideOverShutupUI() {
        for(var i = 0;i < this.overShutupGroup.numChildren;i++) {
            this.overShutupGroup.getChildAt(i).visible = false;
        }
    }
    /**判断房主*/
    private isDeskOwner() {
        return (App.DataCenter.UserInfo.getMyUserVo().userID == App.DataCenter.deskInfo.ownerID);
    }
    
    /**重置头像*/
    private resetHead(){
        let len=this.headGroup.numChildren
        for(let i=0;i<len;i++){
          let head:HeadUI =this.headGroup.getChildAt(i) as HeadUI;
          head.clear();
        }
    }

    /**从场景中移除*/
    protected onRemove() {
    
    }
    
    
}
