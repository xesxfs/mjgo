/**
 *
 * @author 
 *
 */
class LoginChoicePanelController extends KFController{ 
    
	
    private timer:egret.Timer;
    private Btn_Click = [];
    private data ;
    private jsonHaveLoaded = false;
    private childrenHaveReady = false;
    private haveInit = false;

	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.DiceGame.BEGIN_SEND,
            MsgID.USER.IMLOGIN,
            MsgID.USER.LOGIN];
        this.parseLoginInfoText();
	}

    public parseLoginInfoText(){
        RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this ); 
        RES.addEventListener( RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this ); 
        RES.getResByUrl("resource/config/BtnLoginType.json",this.onConfigComplete,this,RES.ResourceItem.TYPE_JSON);
    }

    private onConfigComplete(event:RES.ResourceEvent):void {
        this.data = event;
        this.jsonHaveLoaded = true;
        if(this.jsonHaveLoaded&&this.childrenHaveReady){
            this.initButton();
        }
    }

    private onConfigLoadErr(event:RES.ResourceEvent):void {
        console.log("onConfigLoadErr");
    }

  protected onShow(){//在界面上显示出来
    GlobalClass.Ranklist.str_LikeOrUnLike_Group = null;
    GlobalClass.Ranklist.str_MyLikeOrUnLikeID = null;
    // GlobalClass.GameClass.isSendVIPLoginMessage = true;
    GlobalClass.HallClass.isOpenSignInPanel = true;
    SoundMgr.Instance.allowPlayBGM = LocalStorageUtil.Instance.allowMusic;
    SoundMgr.Instance.allowPlayEffect = LocalStorageUtil.Instance.allowEffect;      
    DeviceUtils.ShowFload();
    // if(DEBUG || DeviceUtils.IsWeb){
    //     egret.log("低空飞行的八哥就是低八哥");
    //     // this.on6103_event(null);
    //    }else{
    //     this.mPanel.AccountPanel.visible = false;
    //     this.mPanel.PhoneLoginPanel.visible = false;        
    //     DeviceUtils.setLoginCallBack((loginData:LoginData)=>{
    //         let unique_id = GlobalClass.GameInfoForConfig.UniqueSerial;
    //         if(DeviceUtils.IsIos){
    //             unique_id = "000050-101-157";
    //         }else if(DeviceUtils.IsAndroid){
    //             unique_id = "000049-101-157";                
    //         }
    //         KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1001),0);
    //         let jss = {url:"",token:loginData.token,userid:loginData.uid,unique_id:unique_id,ip:WebSocketMgr.getInstance().IPaddress,devid:DeviceUtils.getPhoneImei()};
    //         // let js = [JSON.stringify(jss)];
    //         WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.IMLOGIN,JSON.stringify(jss));
    //         this.timer = new egret.Timer(5000);
    //         this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
    //     },this);
    // }
  }
    
  protected onReady() {
      this.Btn_Click = [this.mPanel.Btn_Click1,this.mPanel.Btn_Click0,this.mPanel.Btn_Click2];
      this.childrenHaveReady = true;
      if(this.jsonHaveLoaded&&this.childrenHaveReady){
        this.initButton();
    }
  }

  private initButton(){
      if(this.haveInit){
            return;
        }
        this.haveInit = true;
        for(let i=0;i<3;i++){
            this.Btn_Click[i].visible = false;
        }
        let iBtnType  = GlobalClass.GameInfoForConfig.LoginWay;
        let iBtnColor  = GlobalClass.GameInfoForConfig.ButtonType;
        let src = new Array(3);
        src[2] = (iBtnColor >> 16) & 0xFF;
        src[1] = (iBtnColor >> 8) & 0xFF;
        src[0] = iBtnColor & 0xFF;

        //获取按钮配置
        let type = new Array(1);
        //获取按钮个数配置
        type[0] = iBtnType & 0x7;
        var JDataOut = this.data;

        let length = Number(JDataOut["ButtonNum"][type[0]]["showBtnNum"]+"");
        if (length > this.Btn_Click.length)
        {
            console.log("length == " + length + " ThirdLoginUI.Btn_Click.Length == " + this.Btn_Click.length);
            return;
        }
        //按钮配置赋值
        for (let x = 0; x < length; x++)
        {
            //获取需要显示的按钮
            let i = Number(JDataOut["ButtonNum"][type[0]]["showBtn" + x]+"");
            if (Number(JDataOut["ButtonSetting"][src[i]]["type"]+"") == GlobalClass.GameInfoForConfig.ShowWay)
            {
                console.log("隐藏按钮" + i);
                continue;
            }
            this.Btn_Click[i].visible = true;
            // this.Btn_Click[i].getChildAt(0).source = RES.getRes(JDataOut["ButtonSetting"][src[i]]["BtnColor"]+"") ;
            //赋值显示文字
            if (JDataOut["ButtonSetting"][src[i]]["BtnName"]=="None")
            {
                // this.Btn_Click[i].getChildAt(1).visible = false;
                this.Btn_Click[i].getChildAt(2).visible = false;
            }
            else
            {
                // if (GlobalClass.GameInfoForConfig.LanguageType == "简体中文")
                // {
                //     this.Btn_Click[i].getChildAt(1).text = JDataOut["ButtonSetting"][src[i]]["BtnName"]+"";
                // }else if (GlobalClass.GameInfoForConfig.LanguageType == "繁体中文")
                // {
                //      this.Btn_Click[i].getChildAt(1).text = JDataOut["ButtonSetting"][src[i]]["BtnName2"]+"";
                // }
                this.Btn_Click[i].getChildAt(2).visible = true;
                this.Btn_Click[i].getChildAt(2).source = RES.getRes(JDataOut["ButtonSetting"][src[i]]["txtPic"]+"");
            }
            //赋值按钮显示图标
            if (JDataOut["ButtonSetting"][src[i]]["BtnIcom"]=="None")
            {
                this.Btn_Click[i].getChildAt(3).visible = false;
            }
            else
            {
                this.Btn_Click[i].getChildAt(3).source = RES.getRes("LoginBut_json."+JDataOut["ButtonSetting"][src[i]]["BtnIcom"]+"");
            }
            //赋值按钮事件
            this.AddClickEvent(this.Btn_Click[i],egret.TouchEvent.TOUCH_TAP,()=>{
                    let funName = JDataOut["ButtonSetting"][src[i]]["BtnAction"]+"";
					this[funName]();
                },this);
        }
  }

  private timerComFunc(){
      KFControllerMgr.showTips("连接失败,是否重新连接?", 0, 2,()=>{
        DeviceUtils.setLoginCallBack((loginData:LoginData)=>{
        let jss = {url:"",token:loginData.token,userid:loginData.uid,unique_id:GlobalClass.GameInfoForConfig.UniqueSerial,ip:WebSocketMgr.getInstance().IPaddress,devid:DeviceUtils.getPhoneImei()};
        // let js = [JSON.stringify(jss)];
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.IMLOGIN,JSON.stringify(jss));
        this.timer = new egret.Timer(5000);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        },this);
      },"╮(╯﹏╰)╭",()=>{DeviceUtils.CloseGame();});
  }

    
    protected setOnClickListener() {
    }

  protected removeOnClickListener() {
  }

  private on90_event(event: egret.Event): void {
        console.log("on90_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        var length = strArray.length;
        if(length > 6) {
          if (strArray [6]+"" == "0") {  //没有完成新手引导
            GlobalClass.UserInfo.isNewbie = true;
          }else{
            GlobalClass.UserInfo.isNewbie = false;
          }
    
           //是否打开手机绑定功能
          if (GlobalClass.HallClass.int_OpenBinding == 1) {
            GlobalClass.HallClass.int_OpenBinding = Number (strArray [7]);
          }
        }
    if (length > 11)
    {
      GlobalClass.UserInfo.isVGame = strArray[10]+"" == "1";
      GlobalClass.UserInfo.vGameIpPort = strArray[11];
    }
    if (length > 12)
    {
      GlobalClass.HallClass.bIDSecurity_Binding = strArray[12]+"" == "1" ? true : false;
    }
    if (length > 13)
    {
        GlobalClass.HallClass.bAgeLegal = (Number(strArray[13]) < 18) ? false : true;
    }
    
    if(length > 14) //是否已设置保护口令 0位未设置 1为设置
    {
        GlobalClass.HallClass.bCodeProtect_Binding = strArray[14] + "" == "1" ? true : false;
    }
    if(length > 15) //是否已开启游戏保护 0位为设置 1为设置
    {
        GlobalClass.HallClass.bCodeProtect_Open = strArray[15] + "" == "1" ? true : false;
    }
    if(length > 16) //是否已开启密码修改 0位为关闭 1为开启
    {
        GlobalClass.HallClass.CanModifyPSW = strArray[16] + "" == "1" ? true : false;
    }
    if(length > 17) //以天数决定是否为新手 主要用于统计
    {
        GlobalClass.UserInfo.isNew = strArray[17] + "" == "1" ? true : false;
    }

    if (length > 9 && strArray [9]+""  == "1") {  //处理大话色游戏断线重连
      console.log ("断线重连。。。");
//      GlobalClass.DiceGameClass.offLine = true;
     KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1002), 2);
      var js = { id: strArray[3]};
      WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.BEGIN_SEND,JSON.stringify(js));
    }else{
      if (strArray [2]+"" =="0") {
        GlobalClass.UserInfo.str_UserID = strArray [3];
        GlobalClass.UserInfo.str_UserNickname = strArray [4];
        if (strArray [5]+""  == "1") {
          GlobalClass.UserInfo.isAnonymous = true;
        }
        GlobalClass.HallClass.str_OpenBindingPhone = "1"; //该字段在90消息中不存在，但是在60消息中存在，用来表示是否打开手机绑定功能，所以要在90消息回调中手动置为1
       KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1003),1,0,function(event) {
            KFSceneManager.getInstance().replaceScene(SceneName.Hall);
          });

      }else if (strArray [2]+"" =="1") {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1004),2);
            egret.localStorage.removeItem("account");
            egret.localStorage.removeItem("password");
        }else if (strArray [2]+"" =="2") {
           KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1005), 2);
              egret.localStorage.removeItem("account");
              egret.localStorage.removeItem("password");
          } else if (strArray [2]+"" =="3") {
           KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1006), 2);
            egret.localStorage.removeItem("account");
            egret.localStorage.removeItem("password");
          } else if (strArray [2]+"" =="4") {
           KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1007), 2);
            egret.localStorage.removeItem("account");
            egret.localStorage.removeItem("password");
          } else if (strArray [2]+"" =="5" || strArray [2]+"" =="7") {
           KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1008), 2);
            egret.localStorage.removeItem("account");
            egret.localStorage.removeItem("password");
          }else if (strArray [2]+"" =="6") {
           KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1009), 2);
            egret.localStorage.removeItem("account");
            egret.localStorage.removeItem("password");
          }else if (strArray [2]+"" =="8") {
           KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1007), 2);
            egret.localStorage.removeItem("account");
            egret.localStorage.removeItem("password");
          }else{
           KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1010), 4);
            egret.localStorage.removeItem("account");
            egret.localStorage.removeItem("password");
          }


        //dice game 
//        GlobalClass.DiceGameClass.offLine = false;
        GlobalClass.HallClass.fangChenMiEnabled = 0;
//        GlobalClass.DiceGameClass.opponentIsJoin = false;
        GlobalClass.HallClass.bCodeProtect_HaveChecked = false;
        GlobalClass.HallClass.firstOpenHall = true;
        }
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.login_success);
    }

   private on6103_event(event: egret.Event): void {
        console.log("on6103_event");
        this.timer.stop();
        let msg: MessageStruct = <MessageStruct>event.data;
        let str = msg.getDataStr();
        // let str = `{"info": {"code_open": 0, "check_url": null, "need_enter_dice": 0, "can_modify_passwd": 1, "bind_code": 0, "isNew": 1, "nick_name": "8d14e530e442949336", "visitor": 0, "need_check_name": 0, "userid": 4932853, "need_modify_nickname": 1, "age": 1, "show_bind": 0, "can_change_nickname": 1, "open_safety": 1, "bind_ident": 0, "guide": 0, "need_binding": 0}, "code": 6103, "ret": 1}`;
        if (str == null||str == "")
        {
            egret.log ("获取6103消息失败");
            this.timerComFunc();
			return;
		}
        try
        {

            let JData = JSON.parse(str);
            let info = JData ["info"];
            if(JData ["ret"]==0){
                this.timerComFunc();
                return;
            }

            if (info["guide"] == 0) {//没有完成新手引导
                GlobalClass.UserInfo.isNewbie = true;
            } else {
                GlobalClass.UserInfo.isNewbie = false;
            }

            GlobalClass.HallClass.str_OpenBindingPhone = info ["show_bind"].toString ();
            egret.log("set show_bind == " + GlobalClass.HallClass.str_OpenBindingPhone + " to " + info ["show_bind"].toString ());

            // if (info["need_binding"]) {//是否开启手机绑定 0为不开启，1为开启
                GlobalClass.HallClass.int_OpenBinding = Number(info ["need_binding"]);
            // } 

            // if (info["need_check_game"])
            // {
                GlobalClass.UserInfo.isVGame = info ["need_check_game"]=="1";
                GlobalClass.UserInfo.vGameIpPort = info ["check_url"];
            // }
            // if (info["bind_ident"])
            // {
                GlobalClass.HallClass.bIDSecurity_Binding = info ["bind_ident"] == "1";
            // }

            // if (info.Keys["age"])
            // {
                GlobalClass.HallClass.bAgeLegal = Number(info ["age"])< 18 ? false : true;
            // }

            // if (info["bind_code"]) {
                GlobalClass.HallClass.bCodeProtect_Binding = info ["bind_code"].toString ()=="1";
            // } else {
            // 	GlobalClass.HallClass.bCodeProtect_Binding = false;
            // }

            // if (info["code_open"]) {
                GlobalClass.HallClass.bCodeProtect_Open = info ["code_open"]=="1";
            // } else {
            // 	GlobalClass.HallClass.bCodeProtect_Open = false;
            // }

            // if (info["open_safety"]) {
                GlobalClass.HallClass.OpenSafety = info ["open_safety"]=="1";
            // } else {
            // 	GlobalClass.HallClass.OpenSafety = false;
            // }

            GlobalClass.HallClass.CanModifyPSW = false;//1.5.2先关闭

            // if (info["need_modify_nickname"]) {
                GlobalClass.HallClass.need_Modify_NickName = info ["need_modify_nickname"]=="1";
            // } else {
            // 	GlobalClass.HallClass.need_Modify_NickName = false;
            // }

            // if (info["isNew"])
            // {
                GlobalClass.UserInfo.isNew = info["isNew"]=="1";
            // }
            // else
            // {
            // 	GlobalClass.HallClass.CanModifyPSW = false;
            // }


            if (info["need_enter_dice"]=="1") { //处理大话色游戏断线重连
                egret.log ("断线重连。。。");
                GlobalClass.DiceGameClass.offLine = true;
                KFControllerMgr.showTips(LocalizationMgr.getText("连接成功"), 1);
                var js = { id: info["userid"]};
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.BEGIN_SEND,JSON.stringify(js));
            } else {
                switch (JData ["ret"].toString()) {
                case "1"://成功
                    GlobalClass.UserInfo.str_UserID = info ["userid"];
                    GlobalClass.UserInfo.str_UserNickname = info ["nick_name"];
                    GlobalClass.UserInfo.isAnonymous = false;

                    KFSceneManager.getInstance().replaceScene(SceneName.Hall);
                    StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.login_success);
                    break;
                case "0":
                    KFControllerMgr.showTips(LocalizationMgr.getText("自动登录已过期，请重新进行登录！"), 2);
                    break;
                default:
                    KFControllerMgr.showTips(LocalizationMgr.getText("自动登录已过期，请重新进行登录！"), 2);
                    break;
                }


                //dice game 
                GlobalClass.DiceGameClass.offLine = false;
                GlobalClass.HallClass.fangChenMiEnabled = 0;
                GlobalClass.DiceGameClass.opponentIsJoin = false;

                GlobalClass.HallClass.bCodeProtect_HaveChecked = false;

                GlobalClass.HallClass.firstOpenHall = true;
            }
        }
        catch(err)
        {
            KFControllerMgr.showTips("传说中的错误就是："+err.description , 2);
        }
    }

    private on401_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        let code = jd['code'];
        console.log(""+jd);
        if(code == 401){
            if (jd ["ret"] == "1") {
                GlobalClass.UserInfo.str_Hall_totalScore = jd["info"]["ownP"];
                GlobalClass.DiceGameClass.ownerPoint = GlobalClass.UserInfo.str_Hall_totalScore;
                GlobalClass.DiceGameClass.opponentPoint = GlobalClass.UserInfo.str_Hall_totalScore;
                GlobalClass.DiceGameClass.update_interval = jd["info"]["update_interval"];
                KFSceneManager.getInstance().replaceScene(SceneName.DHS);
                KFControllerMgr.getCtl(PanelName.DHTGamePanel).show();
            }else{//失败则提示失败原因
                let info = jd["info"]["reasonType"];
                if(info == 1009) {
                    KFControllerMgr.showTips("Tips_102");
                }else{
                    KFControllerMgr.showTips("Tips_0");    
                }
           
                // KFControllerMgr.showTips(jd["info"]["desc"]);
                return;
            }
        }else if(code == 410){
            //掉线重连
            let ret = jd["ret"];
            if(ret == 1) {

                GlobalClass.DiceGameClass.offLine = true;

                let pwd = jd["info"]["pwd"];        //房间密码
                GlobalClass.DiceGameClass.RoomNum = pwd;

                let betP = jd["info"]["betP"];      //默认对局点数
                GlobalClass.DiceGameClass.RoomScore = (betP);

                let protectPoint = jd["info"]["protectPoint"];
                GlobalClass.DiceGameClass.GuaranteePoint = (protectPoint);

                let waitTime = jd["info"]["waitTime"]; //正常状态下的最大叫骰思考时间
                GlobalClass.DiceGameClass.waitTime = (waitTime);

                let autoTime = jd["info"]["autoTime"];  //托管状态下的最大叫骰子思考时间
                GlobalClass.DiceGameClass.autoTime = (autoTime);

                let oLeftTime = jd["info"]["oLeftTime"];  //房主剩余思考时间
                GlobalClass.DiceGameClass.ownerLeftTime = (oLeftTime);

                let cLeftTime = jd["info"]["cLeftTime"];   //挑战者剩余思考时间
                GlobalClass.DiceGameClass.opponentLeftTime = (cLeftTime);

                let isOwner = jd["info"]["isOwner"];    //是否房主
                if(isOwner == "1") { 
                    GlobalClass.DiceGameClass.isRoomOwner = true;
                }

                let oName = jd["info"]["oName"];     //房主昵称
                GlobalClass.DiceGameClass.ownerPlayerName = oName;

                let cName = jd["info"]["cName"];    //挑战者昵称
                GlobalClass.DiceGameClass.opponentPlayerName = cName;

                let owner = jd["info"]["owner"];  //房主ID
                let challenger = jd["info"]["challenger"];  //挑战者ID,负数表示不存在
                if ((challenger) > 0) {
                    GlobalClass.DiceGameClass.opponentIsJoin = true;
                }
                    
                if (isOwner == "1") {
                    GlobalClass.UserInfo.str_UserID = owner;
                    GlobalClass.UserInfo.str_UserNickname = oName;
                }else{
                    GlobalClass.UserInfo.str_UserID = challenger;
                    GlobalClass.UserInfo.str_UserNickname = cName;
                }   
                    
                let oAuto = jd["info"]["oAuto"];   //房主是否托管
                GlobalClass.DiceGameClass.ownerPlayerDeposit = oAuto;

                let cAuto = jd["info"]["cAuto"];   //挑战者是否托管
                GlobalClass.DiceGameClass.opponentPlayerDeposit = cAuto;

                let oReady = jd["info"]["oReady"];    //房主是否准备好
                GlobalClass.DiceGameClass.ownerIsReady = oReady;

                let cReady = jd["info"]["cReady"];    //挑战者是否准备好
                GlobalClass.DiceGameClass.opponentIsReady = cReady;

                let oBidstr = jd["info"]["oBid"];    //房主最近一次叫骰内容
                let oBid = (oBidstr);
                let oPoint = oBid % 10;
                let oPointCount = Math.floor(oBid / 10);
                GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber = oPoint.toString();
                GlobalClass.DiceGameClass.ownerPlayerCallDiceCount = oPointCount.toString();

                let cBidstr = jd["info"]["cBid"];    //挑战者最近一次叫骰内容
                let cBid = (cBidstr);
                let cPoint = cBid % 10;
                let cPointCount = Math.floor(cBid / 10);
                GlobalClass.DiceGameClass.opponentPlayerCallDiceCount = cPointCount.toString();
                GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber = cPoint.toString();

                let oTotalPoint = jd["info"]["oPoint"];   //双方总分数
                let cTotalPoint = jd["info"]["cPoint"];
                
                GlobalClass.DiceGameClass.ownerPoint=oTotalPoint
                GlobalClass.DiceGameClass.opponentPoint=cTotalPoint

                if (isOwner == "1") {
                    GlobalClass.UserInfo.str_Hall_totalScore = oTotalPoint;
                }else{
                    GlobalClass.UserInfo.str_Hall_totalScore = cTotalPoint;
                }

                let isRunning = jd["info"]["isRunning"];
                if (isRunning == 0 || isRunning == "0") {
                    GlobalClass.DiceGameClass.isRunning = false;
                }else{
                    GlobalClass.DiceGameClass.isRunning = true;
                }
                
                let diceContent:string = jd["info"]["diceContent"];
                if (diceContent != null && diceContent.length!=0) {
                    let resultArray = diceContent.split("-");
                    if (GlobalClass.DiceGameClass.isRoomOwner) {
                            let paraArray = [];
                            for (let i = 0;i < 5;i++) {
                                paraArray[i] = resultArray[i];
                            }
                            GlobalClass.DiceGameClass.ownerPlayerDice = paraArray;

                            paraArray = [];
                            for (let i = 5; i<10;i++) {
                                paraArray[i-5] = resultArray[i];
                            }
                            GlobalClass.DiceGameClass.opponentPlayerDice = paraArray;
                        }else{
                            let paraArray = [];
                            for (let i = 0;i < 5;i++) {
                                paraArray[i] = resultArray[i];
                            }
                            GlobalClass.DiceGameClass.opponentPlayerDice = paraArray;
                            
                            paraArray = [];
                            for (let i = 5; i<10;i++) {
                                paraArray[i-5] = resultArray[i];
                            }
                            GlobalClass.DiceGameClass.ownerPlayerDice = paraArray;
                        }
                }  
                    
                let oCanBid = jd["info"]["oCanBid"];
                if (oCanBid == "1") {
                    GlobalClass.DiceGameClass.ownerCanBid = true;
                    }

                let cCanBid = jd["info"]["cCanBid"];
                if (cCanBid == "1") {
                    GlobalClass.DiceGameClass.opponentCanBid = true;
                }

                let roomName = jd["info"]["roomName"];
                GlobalClass.DiceGameClass.RoomName = roomName;

                let gameMode = jd["info"]["diceMode"];
                GlobalClass.DiceGameClass.gameMode = gameMode;

                //快速模式
                let mode = jd["info"]["isQuickMode"];
                if (mode == "1") {
                    GlobalClass.DiceGameClass.isQuickGame = true;
                }else{
                    GlobalClass.DiceGameClass.isQuickGame = false;
                }
                KFSceneManager.getInstance().replaceScene(SceneName.DHS);
                KFControllerMgr.getCtl(PanelName.DHTRoomListPanel).hide();
                KFControllerMgr.getCtl(PanelName.DHTGamePanel).show();             
            }else{
                KFControllerMgr.showTips(jd["info"]["desc"]);
            }
        }
    }

    /// <summary>
    /// 账号登录按钮
    /// </summary>
    /// <param name="_go"></param>
    public  OnBtn_AccountLoginClick()
    {
        KFControllerMgr.getCtl(PanelName.ThirdLoginPanel).show();
    }

    /// <summary>
	/// 手机登录按钮
	/// </summary>
	/// <param name="_go"></param>
	private  OnBtn_PhoneLoginClick()
	{   
		KFControllerMgr.getCtl(PanelName.ThirdLoginPanel).show();
	}

    /// <summary>
    /// 游客登录按钮
    /// </summary>
    /// <param name="_go"></param>
    public  OnBtn_AnonymousLoginClick()
    {
        console.log("AnonymousLogin");
        KFControllerMgr.getCtl(PanelName.AnonymousTipsPanel).show();
    }

     /// <summary>
    /// 登陆1
    /// </summary>
    /// <param name="go"></param>
    public OnBtn_3002LoginClick()
    {
        console.log("LoginSend3002");
		GlobalClass.SDKType.LoginNum = 1;
        DeviceUtils.executePluginsEvents(3002+"#"+"");
    }

    /// <summary>
    /// 登陆2
    /// </summary>
    /// <param name="go"></param>
    public  OnBtn_3003LoginClick()
    {
        console.log("LoginSend3003");
		GlobalClass.SDKType.LoginNum = 2;
		DeviceUtils.executePluginsEvents(3003+"#"+"");
    }

    /// <summary>
    /// 登陆0
    /// </summary>
    /// <param name="go"></param>
    public  OnBtn_3001LoginClick()
    {
        console.log("LoginSend3001 or AnySDK");
        // GlobalClass.iLoginNum++;
        // if (GlobalClass.iLoginNum > 3 && GlobalClass.bLoginErrorSendServer)
        // {
		// 	HttpWeb.httpWeb.SendErrorMsg("static_2", "登录失败警告", "失败时间:" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " 渠道id:" + GlobalClass.GameInfoForConfig.UniqueSerial + " 失败原因:点击三次登陆无法登陆.");
		// }
		GlobalClass.SDKType.LoginNum = 0;
		DeviceUtils.executePluginsEvents(3001+"#"+"");
    }
    
}