/**
 *
 * @author 
 *
 */
class GameStartLogic {
    
    private  str_WebNameList:Array<string> = null;
    
    private  _WebPort:string = "";
    
    private index:number = 0;
    
    private static instance: GameStartLogic;
    public static getInstance(): GameStartLogic {
        if(this.instance == null) {
            this.instance = new GameStartLogic();
        }
        return this.instance;
    }
    
	public constructor() {
	}
	
	public initUniqueSerial(){
         if(DeviceUtils.IsAndroid)
        {
            GlobalClass.GameInfoForConfig.UniqueSerial = "000049-101-157";
        }else if(DeviceUtils.IsIos){
            GlobalClass.GameInfoForConfig.UniqueSerial = "000050-101-157";
        }else{
            GlobalClass.GameInfoForConfig.UniqueSerial = "000049-101-157";
        }
        
        GlobalClass.GameInfoForConfig.UniqueSerialInfo = GlobalClass.GameInfoForConfig.UniqueSerial.split("-");

        switch(GlobalClass.GameInfoForConfig.loginServer) {
            case "bsfb11":
                this.str_WebNameList = [ 
                "bsfb11.wgb.cn",
                "bsfb11.ganggui.com.cn",
                "218.60.113.182",
				"180.97.162.216",
                "bsfb.jxip.com"];
                this._WebPort = ":8089";
                break;
            case "bsfb10":
                this.str_WebNameList = ["bsfb10.wgb.cn"];
                this._WebPort = ":8017";

                this.str_WebNameList = ["120.24.41.188"];
                this._WebPort = ":8089";
                break;
            case "bsfb155":
                this.str_WebNameList = ["120.24.5.155" ];
                this._WebPort = ":8017";
                break;
        }
       this.StartConnect();

	}


    private GetWSInfo(){
        this.getShare();
        this.checkUSA();
        this.GetSmallRecharge();
        this.GetBindPhoneRemind();
        this.GetMoreGameList();
        this.GetCountryCode();
    }
	
    
    private  getWebName(){
        if(this.index == this.str_WebNameList.length){this.index = 0;}
        let item:string = this.str_WebNameList[this.index];
        GlobalClass.GameInfoForConfig.wsURL = item + this._WebPort;
        this.index ++;
    }

    public showReconnect(){
         KFControllerMgr.showTips(LocalizationMgr.getText("连接失败，是否重连?"),0,2,()=>{
                            this.StartConnect();
                        },"提示",()=>{
                            DeviceUtils.CloseGame();
                        });
    }
	
    public  StartConnect(){
        let languageConfig =  egret.localStorage.getItem("LanguageConfig");
        if (languageConfig!=null&&languageConfig!="")
        {
            GlobalClass.GameInfoForConfig.LanguageCode = languageConfig;
        }

        if (GlobalClass.GameInfoForConfig.LanguageCode == "1001")
        {
            GlobalClass.GameInfoForConfig.LanguageType = "简体中文";
        }
        else if (GlobalClass.GameInfoForConfig.LanguageCode == "1002")
        {
            GlobalClass.GameInfoForConfig.LanguageType = "繁体中文";
        }

        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1040),0);

        this.getWebName();
       
        this.GetWSInfo();
       
    }

    private GetDataIP(){
         if(GlobalClass.GameInfoForConfig.UniqueSerial!=""){
            SendMsgForWebService.GetData_ServerIp((result) => {
                if(CommonFuc.strContains(result,"post error")||CommonFuc.strContains(result,"postTimeout")){
                     this.showReconnect();
                    return;
                }
                var jsonstr = CommonFuc.AESDecryptBase64(result,"ThroughhThroughh");
                console.log("IP回调==" + jsonstr);
                if(jsonstr==""){
                     this.showReconnect();
                    return;
                }
                // jsonstr = '{"Code":"201","Msg":"服务器维护中，预计开服时间15:10，如遇特殊情况，开服时间将会顺延,届时请玩家重新进入游戏。若给您带来不便，深感抱歉。","Value":"","Data":"00b42e5e-a7b7-4a"}';
                var msg = JSON.parse(jsonstr);
                console.log("IP回调==" + msg["Code"]);
               if(msg["Code"]+""=="200"){
                    var ipMsg = msg["Msg"]+"";
                    if(ipMsg==""){
                        this.showReconnect();
                        return;
                    }
                    var Message = ipMsg.split(":");
                    var Server_ip = Message[0];
                    var Server_prot = Message[1];
                    console.log(Server_ip +":"+ Server_prot);
                    var Server_protInt: number = Number(Server_prot);
                    WebSocketMgr.getInstance().createSocket(Server_ip,Server_protInt,()=>{this.timerComFunc();});

                    
                } else if(msg["Code"]+"" == "201"){
                    // GlobalClass.UserInfo.systemMsg = msg["Msg"]; 
                    // this.showReconnect();
                    var info = msg["Msg"];
                    KFControllerMgr.showTips(info,0,1,()=>{
                        DeviceUtils.CloseGame();
                    });
                    KFControllerMgr.getCtl(PanelName.DialogPanel).setContentSize(18);
                }else{
                    console.log("请求IP回调出错");
                    this.showReconnect();
                }
            });
        }
    }

    private timerComFunc(){
      GameStartLogic.getInstance().StartConnect();
  }

    private mStage: eui.UILayer ;
    public startGame(stage: eui.UILayer){
        this.mStage = stage;
        if(DeviceUtils.IsWeb){
            this.mStage.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        }
        this.parseLocaliztionText();
        this.SetSlowSpeed();
    }

    private touchEnd(event:egret.Event){
        console.log("stageTouch tartget = "+event.target.name);
        NetEventMgr.getInstance().clientMsg(MsgID.Client.StageClick,event.target.name);
    }

    public parseLocaliztionText(){
        RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this ); 
        RES.addEventListener( RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this ); 
        RES.getResByUrl("resource/config/LocalisedString.json",this.onConfigComplete,this,RES.ResourceItem.TYPE_JSON);
    }

    private onConfigComplete(event:RES.ResourceEvent):void {
        KFPanelManager.getInstance().setLocalizedDatas(event);
        KFSceneManager.getInstance(this.mStage).replaceScene(SceneName.Awake);
        GameStartLogic.getInstance().initUniqueSerial();
    }

    private onConfigLoadErr(event:RES.ResourceEvent):void {
        console.log("onConfigLoadErr");
    }

    private checkUSA(){
        SendMsgForWebService.ChecekUSAIP((result)=>{
            console.log("isUSA IP: "+ result);
            if (result == "0")
            {
                GlobalClass.LoginClass.isUSAIP = false;
            }
            else {
                GlobalClass.LoginClass.isUSAIP = true;
            }
        })
    }

    private GetCountryCode(){
         SendMsgForWebService.GetCountryCode((result)=>{
             if(CommonFuc.strContains(result,"post error")||CommonFuc.strContains(result,"postTimeout")){
                 console.log("GetCountryCode error");
             }else{
                GlobalClass.GameInfoForConfig.CountryCodeStr = result;
                GlobalClass.GameInfoForConfig.CountryCodeJsonData = JSON.parse(result);
                GlobalClass.GameInfoForConfig.CountryCodeCount = GlobalClass.GameInfoForConfig.CountryCodeJsonData.Count;
             }
            this.GetDataIP();
         });
    }

    private GetMoreGameList(){
        SendMsgForWebService.GetMoreGameList((result)=>{
            console.log("GetMoreGameList: "+ result);
             if(CommonFuc.strContains(result,"post error")||CommonFuc.strContains(result,"postTimeout")){return;};
            var jsonData = JSON.parse(result);
            GlobalClass.LoginClass.IsOpenMoGame = jsonData["IsOpen"]+""=="1";
            let jsonArr = jsonData["Data"];
            if(jsonArr.length>0){
                GlobalClass.LoginClass.games = jsonArr;
                console.log("新游戏个数"+ jsonArr.Count);
            }
        });
    }

    private GetBindPhoneRemind(){
         SendMsgForWebService.GetBindPhoneRemind((result)=>{
            console.log("GetBindPhoneRemind: "+ result);
            if(CommonFuc.strContains(result,"post error")||CommonFuc.strContains(result,"postTimeout")){return;};
            var jsonData = JSON.parse(result);
            GlobalClass.LoginClass.BindPhoneRemind = Number(jsonData["number"]);
         });
    }

    private GetSmallRecharge(){
         SendMsgForWebService.GetSmallRecharge((result)=>{
             console.log("GetSmallRecharge: "+ result);
             GlobalClass.LoginClass.SmallRecharge = result;
        });
    }



    private getShare(){
        // let result = '{"Wx_Title":"test1","Wx_Content":"test","Wx_WebUrl":"http://www.wgb.cn/webimage/index.html","QQ_Title":"test2","QQ_Content":"test3","QQ_WebUrl":"http://www.wgb.cn","QQ_PicUrl":"http://m.wgb.cn/Images/favicon.ico","IsOpenWx":"1","IsOpenQQ":"1","DownLoadUrl":"http://www.wgb.cn/dowload/ZYLGF_000000-001-153_bsfb10_2016_11_29_09_38.apk"}';
        //  var JData = JSON.parse(result);
        //     GlobalClass.ShareInfo.WXShareURL = JData ["Wx_WebUrl"]+"";
        //     GlobalClass.ShareInfo.WXShareTitle = JData ["Wx_Title"]+"";
        //     GlobalClass.ShareInfo.WXShareContent = JData ["Wx_Content"]+"";
        //     GlobalClass.ShareInfo.QQShareTitle = JData ["QQ_Title"]+"";
        //     GlobalClass.ShareInfo.QQShareContent = JData ["QQ_Content"]+"";
        //     GlobalClass.ShareInfo.QQShareURL = JData ["QQ_WebUrl"]+"";
        //     GlobalClass.ShareInfo.QQSharePicURL = JData ["QQ_PicUrl"]+"";
        //     GlobalClass.SDKType.bShowShare = JData ["IsOpenWx"]=="0"?false:true;
        //     GlobalClass.ShareInfo.DownLoadURL = JData ["DownLoadUrl"]+"";

         SendMsgForWebService.getShareInfo((result)=>{
            console.log(result);
            if(CommonFuc.strContains(result,"post error")){
                return;
            }
            if(CommonFuc.strContains(result,"postTimeout")){
                return;
            }
            var JData = JSON.parse(result);
            GlobalClass.ShareInfo.WXShareURL = JData ["Wx_WebUrl"]+"";
            GlobalClass.ShareInfo.WXShareTitle = JData ["Wx_Title"]+"";
            GlobalClass.ShareInfo.WXShareContent = JData ["Wx_Content"]+"";
            GlobalClass.ShareInfo.QQShareTitle = JData ["QQ_Title"]+"";
            GlobalClass.ShareInfo.QQShareContent = JData ["QQ_Content"]+"";
            GlobalClass.ShareInfo.QQShareURL = JData ["QQ_WebUrl"]+"";
            GlobalClass.ShareInfo.QQSharePicURL = JData ["QQ_PicUrl"]+"";
            GlobalClass.SDKType.bShowShare = JData ["IsOpenWx"]=="0"?false:true;
            GlobalClass.ShareInfo.DownLoadURL = JData ["DownLoadUrl"]+"";
        });
    }

    public SetQuickSpeed()
    {
       GlobalClass.Speed.fallSpeed = 1000*1.5;
        GlobalClass.Speed.splitSpeed = 1000/60/1.5;
        GlobalClass.Speed.OnSplitBegin = 1/1.5;
        GlobalClass.Speed.StartNewGroup0 = 2.2/1.5;
        GlobalClass.Speed.StartNewGroup1 = 3.2/1.5;
        GlobalClass.Speed.StartNewGroup2 = 4.4/1.5;
        GlobalClass.Speed.NewGroup = 1/1.5;

        GlobalClass.Speed.StartShowRoundBallance0 = 2.0/1.5;
        GlobalClass.Speed.StartShowRoundBallance1 = 2.8/1.5;
        GlobalClass.Speed.StartShowRoundBallance2 = 3.8/1.5;

        GlobalClass.Speed.diggerframeRate =24*1.5;
        GlobalClass.Speed.brickframeRate =16*1.5;
        
        GlobalClass.Speed.ShowUpFall = 0.9/1.5;

        GlobalClass.Speed.FallBallance = 0.9/1.5;
        GlobalClass.Speed.DiggerFallBallance = 0.9/1.5;
        
        GlobalClass.Speed.OnPayPress = 0.8/1.5;
        GlobalClass.Speed.FallTime0 = 0.1/1.5;
        GlobalClass.Speed.FallTime1 = 0.1/1.5;

        GlobalClass.Speed.DiggerFallBallanceTime = 0.6/1.5;
        GlobalClass.Speed.FallBallanceTime = 0.3/1.5;
        GlobalClass.Speed.playDownEffect = 0.6/1.5;
        GlobalClass.Speed.showWinSlot = 1.5/1.5;
        
    }
    public SetSlowSpeed()
    {
        GlobalClass.Speed.fallSpeed = 1000;
        GlobalClass.Speed.splitSpeed = 1000/60;
        GlobalClass.Speed.OnSplitBegin = 1;
        GlobalClass.Speed.StartNewGroup0 = 2.2;
        GlobalClass.Speed.StartNewGroup1 = 3.2;
        GlobalClass.Speed.StartNewGroup2 = 4.4;
        GlobalClass.Speed.NewGroup = 1;
        
        GlobalClass.Speed.StartShowRoundBallance0 = 2.0;
        GlobalClass.Speed.StartShowRoundBallance1 = 2.8;
        GlobalClass.Speed.StartShowRoundBallance2 = 3.8;

        GlobalClass.Speed.diggerframeRate =24;
        GlobalClass.Speed.brickframeRate =16;
        
        
        GlobalClass.Speed.ShowUpFall = 0.9;

        GlobalClass.Speed.FallBallance = 0.9;
        GlobalClass.Speed.DiggerFallBallance = 0.9;
        
        GlobalClass.Speed.OnPayPress = 0.8;
        GlobalClass.Speed.FallTime0 = 0.1;
        GlobalClass.Speed.FallTime1 = 0.1;

        GlobalClass.Speed.DiggerFallBallanceTime = 0.6;
        GlobalClass.Speed.FallBallanceTime = 0.3;
        GlobalClass.Speed.playDownEffect = 0.6;
        GlobalClass.Speed.showWinSlot = 1.5;
    }
}
