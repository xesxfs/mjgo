/**
 * 大厅模块
 * @author chenwei
 * @date 2017/4/24
 */
class HallController extends BaseController {
    /**控制模块名*/
    public static NAME: string = "HallController";
    /**显示大厅*/
    public static EVENT_SHOW_HALL: string = "ShowHallScene";
    /**大厅*/
    private hallScene: HallScene;
    private isReconnection:boolean=false;

    public constructor() {
        super();        
    }

    //注册时调用
    public onRegister() {
        this.addEvent(HallController.EVENT_SHOW_HALL, this.showHallScene, this); 
      
    }

    
	public registerSocket(){
		var gameSocket: ClientSocket = App.gameSocket;      
        gameSocket.register(ProtocolHead.RevCmd4, this.revCRoom, this);
		gameSocket.register(ProtocolHead.RevCmd5, this.revCRoomErr, this);
        gameSocket.register(ProtocolHead.RevCmd7, this.revERoom, this);
        gameSocket.register(ProtocolHead.RevCmd8, this.revERoomErr, this);
		//socket连接成功事件
        this.addEvent(EventConst.SocketConnect, this.onSocketConnect, this);
        //socket连接错误事件
        this.addEvent(EventConst.SocketIOError, this.onSocketError, this);
	} 
         //连接成功
   private onSocketConnect(socket: ClientSocket) {
        //  var loginData = ProtocolData.sendLogin         
        //  App.gameSocket.send(loginData);

     }
         /**socket连接错误*/
    private onSocketError(socket: ClientSocket) {
        if (socket == App.gameSocket) {
            console.log("网络连接失败，请检查您的网络。");
            // App.MsgBoxManager.recycleAllBox();
            // var messageBox: MessageBox = App.MsgBoxManager.getBoxB();
            // messageBox.showMsg("网络连接失败，请检查您的网络。");
        }
    }

    /**进入房间成功*/
	private revERoom(data:Object){	
        App.DataCenter.UserInfo.deleteAllUserExcptMe();
        App.DataCenter.UserInfo.httpUserInfo.roomId = data["msg"][0]["roomId"]
        var  myOpenId = App.DataCenter.UserInfo.httpUserInfo.openId;
        var userListData:Array<Object>=data["msg"];
        for(let i=0;i<userListData.length;i++){            
            var d=userListData[i];

            if(d!=null){

                if(myOpenId==d["openId"]){
                    App.DataCenter.UserInfo.httpUserInfo.seatID =d["index"];
                    continue
                 }
                var user=new UserVO();
                user.openId = d["openId"];
                user.nickName = d["nickName"];
                user.seatID = d["index"];
                App.DataCenter.UserInfo.addUser(user);
            }
        }

        App.getInstance().sendEvent(DKGameController.EVENT_SHOW_GAME_SCENE);

	}
    /**进入房间失败*/
	private revERoomErr(data:Object){	
		
	}
    /**创建房间成功*/
	private revCRoom(data:Object){	
        // {"cmd":4,"game":0,"msg":[{"daoshu":0,"flag":0,"gameModel":0,"gold":0,"id":0,"index":1,"integral":0,"kanshu":0,"nickName":"等风来","ok":false,"openId":"o2P0bwSTs13BEOZCrzGiq2wKvr6I","owner":true,"red":0,"roomCard":0,"roomId":79853,"status":1,"victory":0,"zanshi":0},null,null,null]}
        App.DataCenter.UserInfo.deleteAllUserExcptMe();
        App.DataCenter.UserInfo.httpUserInfo.roomId = data["msg"][0]["roomId"];
        App.DataCenter.UserInfo.httpUserInfo.seatID = data["msg"][0]["index"];
        App.getInstance().sendEvent(DKGameController.EVENT_SHOW_GAME_SCENE);    
		
	}
    /**创建房间失败*/
	private revCRoomErr(data:Object){	
		
	}


    //移除注册时调用
    public onRemove() {
       
    }

    /**显示大厅*/
    private showHallScene() {
        this.registerSocket();
        this.hallScene = App.SceneManager.runScene(SceneConst.HallScene, this) as HallScene;        
    }


}