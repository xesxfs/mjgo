/**
 * 登录控制模块
 * @author chenwei
 * @date 2017/4/24
 */
class LoginController extends BaseController{
	/**模块名*/
	public static NAME:string = "LoginController";
	/**显示登录界面*/
	public static EVENT_SHOW_LOGIN:string = "ShowLoginScene";
	/**登录界面*/
	public loginScene:LoginScene;
	public constructor() {
		super();
	}

	public onRegister(){
		this.addEvent(LoginController.EVENT_SHOW_LOGIN,this.showLoginScene, this);
		this.registerSocket();
	}

	public registerSocket(){
		var gameSocket: ClientSocket = App.gameSocket;
        gameSocket.register(ProtocolHead.RevCmd2, this.revLogin, this);
		gameSocket.register(ProtocolHead.RevCmd39, this.reConnection, this);
		//socket连接成功事件
        this.addEvent(EventConst.SocketConnect, this.onSocketConnect, this);
        //socket连接错误事件
        this.addEvent(EventConst.SocketIOError, this.onSocketError, this);
	}
	/**登录成功*/
	private revLogin(data:Object){	
		this.gotoHall();
	}
	private reConnection(data:Object){
		App.DataCenter.GameInfo.isReCon  = true;
		 App.getInstance().sendEvent(DKGameController.EVENT_SHOW_GAME_SCENE);

	}
	/**登录*/
	public onLogin(){
		 App.gameSocket.startConnect(App.DataCenter.ServerInfo.GAME_SERVER,false);
	}



     //连接成功
   private onSocketConnect(socket: ClientSocket) {

	   var loginData;
	   var muser= App.DataCenter.UserInfo.httpUserInfo;
	   if(App.DataCenter.debugInfo.isDebug){
		ProtocolData.sendLogin.msg[0].openId=App.DataCenter.debugInfo.account;
		muser.openId = App.DataCenter.debugInfo.account;
		loginData = ProtocolData.sendLogin;	

	   }else{
		
		 if(muser){
			 loginData ={cmd:'1',game:'-1',msg:[
				 {
					 id:muser.playerId,
					 openId:muser.openId,
				 	nickName:muser.nickName,
				    headImgUrl:muser.headImgUrl,
					roomCard:muser.roomCard
				}]}	
		 }
	   }
         App.gameSocket.send(loginData);

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

	/**显示登录界面*/
	private showLoginScene(){
		this.startLoadLogin();        
       var code = egret.getOption("code");

	}
	/**开始加载登录界面*/
	private startLoadLogin(){
		var preloadPanel: PreloadPanel = App.PanelManager.open(PanelConst.PreloadPanel);
		var resource=["hall","card","common","login","create","rule","score","eroom","set","msg","pay","notice","award","pinfo","gamecom","dkgame"]
		App.ResUtils.loadGroup(resource,this, this.loadLoginComplete, this.loadLoginProgress);
	}

	/**加载登录界面进度*/
	private loadLoginProgress(e:RES.ResourceEvent){
		var preloadPanel:PreloadPanel = App.PanelManager.getPanel(PanelConst.PreloadPanel);
		preloadPanel.setProgress(Math.round(e.itemsLoaded/e.itemsTotal*100));
	}

	/**加载登录界面完成*/
	private loadLoginComplete(){
		App.DataCenter.UserInfo.setMyUserVo();
		App.PanelManager.close(PanelConst.PreloadPanel);
		this.loginScene = App.SceneManager.runScene(SceneConst.LoginScene) as LoginScene;
		this.loginScene.setController(this);
	}
	
	/**去大厅*/
	public gotoHall(){
			console.log("显示大厅");
			App.getInstance().sendEvent(HallController.EVENT_SHOW_HALL);	
	}

	
}