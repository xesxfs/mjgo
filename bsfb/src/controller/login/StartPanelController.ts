/**
 *
 * @author 
 *
 */
class StartPanelController extends KFController {
    
    protected init(){
        super.init();
        this.EventsList = [MsgID.USER.SERVER_LOGINSUCCESS,
            MsgID.USER.GET_INITDATA,
            MsgID.USER.ANOTHER_LOCATION_LOGIN,
            MsgID.Hall.Msg_1020];
    }

     protected onShow(){//在界面上显示出来
        //  if(WebSocketMgr.getInstance().isClose()){
        //      KFControllerMgr.showTips("正在连接服务器...",0,0);
        //       WebSocketMgr.getInstance().createSocket("",0);
        //  }
         GlobalClass.LoginClass.iosUUID = DeviceUtils.getPhoneImei();
    }

    

    private on10009_event(event: egret.Event): void {
        console.log("获取10009消息成功" + GlobalClass.GameInfoForConfig.UniqueSerial);
        var msg: MessageStruct = <MessageStruct>event.data;
        var js = { UniqueSerial: GlobalClass.GameInfoForConfig.UniqueSerial }; 
        
        var timer: egret.Timer = new egret.Timer(1000,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(event) {
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.GET_INITDATA,JSON.stringify(js));
        },this);
        timer.start();
    }

    private on91_event(event: egret.Event): void {
        console.log("获取91消息成功 " + GlobalClass.GameInfoForConfig.UniqueSerial);

        var msg: MessageStruct = <MessageStruct>event.data;
        var jsonData = JSON.parse(msg.getDataStr());
        if(jsonData["registerNeedBind"]) {
            GlobalClass.GameInfoForConfig.registerNeedBind = jsonData["registerNeedBind"];
        }
        GlobalClass.GameInfoForConfig.QQ = jsonData["ServiceQQ"];
        GlobalClass.SDKType.bShowCustomService = jsonData["IsOpenService"] == 0 ? false : true;
        GlobalClass.SDKType.bShowAbout = jsonData["IsOpenAbout"] == 0 ? false : true;
        GlobalClass.GameInfoForConfig.openChatGuild = jsonData["openChatGuild"];
        GlobalClass.GameInfoForConfig.openChatWorld = jsonData["openChatWorld"];

        GlobalClass.GameInfoForConfig.IsDebug = jsonData["IsDebug"] == 0 ? false : true;
        GlobalClass.GameInfoForConfig.LoginWay = jsonData["LoginWay"];
        GlobalClass.GameInfoForConfig.ButtonType = jsonData["ButtonType"];
        GlobalClass.GameInfoForConfig.PayWay = jsonData["PayWay"];
        GlobalClass.GameInfoForConfig.SDKType = jsonData["SDKType"];
        this.SetSDKType(GlobalClass.GameInfoForConfig.SDKType);

        var iQuitGameType: number = jsonData["QuitGameType"];
        GlobalClass.GameInfoForConfig.LogOutType = (iQuitGameType & 0xFF);
        GlobalClass.GameInfoForConfig.QuitGameType = ((iQuitGameType >> 8) & 0xFF);

        console.log("gotoLoginScene");
        var timer: egret.Timer = new egret.Timer(1000,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(event) {
            KFControllerMgr.showTips("连接成功",1,0,function(event) {
                // KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1001),0);
                KFSceneManager.getInstance().replaceScene(SceneName.Login);
            });
        },this);
        timer.start();
    }


    private on10002_event(event: egret.Event): void {
        // KFControllerMgr.showTips("您的账号在其它地方登录", 0, 1,()=>{DeviceUtils.CloseGame();},"╮(╯﹏╰)╭");
    }

    private on1020_event(event: egret.Event): void {

    }

    private SetSDKType(i: number) {
        GlobalClass.SDKType.bShowStone = (i & 0x1) == 0;
        GlobalClass.SDKType.bShowFive = ((i >> 1) & 0x1) == 0;
        GlobalClass.SDKType.bShowDice = ((i >> 2) & 0x1) == 0;
        GlobalClass.SDKType.strShowDiamond = ((i >> 8) & 0x1) == 0 ? "元" : "钻石";
        GlobalClass.SDKType.bShowVedio = ((i >> 9) & 0x1) == 0;
        GlobalClass.SDKType.bShowBank = ((i >> 10) & 0x1) == 0;
        GlobalClass.SDKType.bShowClub = ((i >> 11) & 0x1) == 0;
        GlobalClass.SDKType.bShowShop = ((i >> 12) & 0x1) == 0;
        GlobalClass.SDKType.bShowBank2 = ((i >> 13) & 0x1) == 0;
        GlobalClass.SDKType.bShowClub2 = ((i >> 14) & 0x1) == 0;
        GlobalClass.HallClass.int_OpenBinding = ((i >> 15) & 0x1) == 0 ? 1 : 0;
        GlobalClass.HallClass.bGetCodes = new Array(4);
        GlobalClass.SDKType.ReceiveMoneyForWeb = new Array(4);
        GlobalClass.SDKType.IsGuildeNeedVerify = new Array(4);
        for(var _i = 0;_i < 4;_i++) {
            GlobalClass.HallClass.bGetCodes[_i] = ((i >> (16 + _i)) & 0x1) == 1;
            GlobalClass.SDKType.ReceiveMoneyForWeb[_i] = ((i >> (20 + _i)) & 0x1) == 1;
            GlobalClass.SDKType.IsGuildeNeedVerify[_i] = ((i >> (24 + _i)) & 0x1) == 1;
        }
    }
}
