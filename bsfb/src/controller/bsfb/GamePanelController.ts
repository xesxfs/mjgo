/**
 *
 * @author 
 *
 */
class GamePanelController extends KFController{ 
    private isAutoPay:boolean = false;
    private isShowTaskTipPanel:boolean = false;
    private isfisrtInitCount:boolean = true;
    private isenterDragon:boolean = false;

    private GO_PropAutoAninit = null;

    private str_Game_DataBy102Value = "";
    private str_Game_DataBy102Key = "";


    private int_AddTodayScore = 1;
    private int_AddTotalScore = 1;
    private diamondLoaded = false;

    private superViewShow = false;
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.BSFB.BET,
            MsgID.Client.BSFBButtonEnable,
            MsgID.Client.BSFBUpdateScore,
            MsgID.Client.BSFBTurnFinish,
            MsgID.Client.BSFBSlotEnd,
            MsgID.Client.BSFBSplitEnd,
            MsgID.BSFB.RECEIVE_MONEY,
            MsgID.BSFB.NoEnoughMoney,
            MsgID.Client.BSFBAutoUseON,
            MsgID.USER.USE_PROPS,
            MsgID.USER.UPDATE_PROPS,
            MsgID.Hall.Msg_1020,
            MsgID.BSFB.NEWBIE_102MSG,
            MsgID.BSFB.NEWBIE_SKIP,
            MsgID.USER.UPDATE_MONEY,
            ];
    //    GlobalClass.GameClass.str_PropsId[1] = 1;
	}
    private on80005_event(event: egret.Event): void {//开启自动使用道具 播放动画
        console.log("on80005_event");
        this.GO_PropAutoAninit.visible = true;
    }

    private on80006_event(event: egret.Event): void {//开启自动使用道具 播放动画
        console.log("on80006_event");
        this.slotTimerEnd();
    }

    private on80007_event(event: egret.Event): void {//开启自动使用道具 播放动画
        console.log("on80007_event");
        this.updateLastScore();
    }

    private on1020_event(event: egret.Event): void {
        console.log("on1020_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        datastr = datastr.replace(/\n/g, "\\n");
       datastr = datastr.replace(/\r/g, "\\r");
        GlobalClass.HallClass.fangChenMiResult = datastr;
        var jsdata = JSON.parse(datastr);
        if (jsdata["ret"] == "1"){
           
            var action = Number(jsdata["action"]);
            if(action==2){
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.GIVE_UP_EXIT,"");
            }
            if(action==3){
                KFControllerMgr.getCtl(PanelName.SystemTitlePanel).show();
            }else{
                 KFControllerMgr.getCtl(PanelName.AntiAddictionPanel).show();
            }
        }
    }

    private on180_event(event: egret.Event): void {
        console.log("on180_event");
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"")
    }

    private on113_event(event: egret.Event): void {
        console.log("on113_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.UserInfo.str_Game_lastTotalScore = strArray [2];

        this.mPanel.Label_SlotScore.text = GlobalClass.UserInfo.str_Game_lastSlotScore;
        this.mPanel.Label_TotalScore.text = GlobalClass.UserInfo.str_Game_lastTotalScore;
    }

    private on188_event(event: egret.Event): void {
        console.log("on188_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        var length = strArray.length - 2;
        GlobalClass.GameClass.str_Newbie_102Data = new Array(length);
		for (let i = 0; i < length; i++) {
			GlobalClass.GameClass.str_Newbie_102Data [i] = strArray [2 + i];
		}
    }

    private on151_event(event: egret.Event): void {
        console.log("on151_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if (strArray.length == 2) {
			GlobalClass.GameClass.str_PropsAmount = new Array(2); //初始化道具个数数组，为0个
			GlobalClass.GameClass.str_PropsId = new Array(2);         //算出有多少组道具
			GlobalClass.GameClass.str_PropsAmount [0] = "0";
			GlobalClass.GameClass.str_PropsAmount [1] = "0";
		} else {
			GlobalClass.GameClass.str_PropsAmount = new Array(2);  //初始化道具个数数组，为0个
			GlobalClass.GameClass.str_PropsId = new Array(2);    
			var _Str_PropsGroup1 = strArray [2].split (';' );
            GlobalClass.GameClass.str_PropsAmount = new Array(_Str_PropsGroup1.length);
			for (var i = 0; i < _Str_PropsGroup1.length; i++) {
				var _str_Props = _Str_PropsGroup1 [i].split (',');
				//将服务器的ID-Amount信息，与ID-price数组，改成相同的位置（同一道具在三个数组里的下标要相同）
				GlobalClass.GameClass.str_PropsId [i] = _str_Props [0];           //道具ID
				GlobalClass.GameClass.str_PropsAmount [i] = _str_Props [1];
			}
		}
        this.mPanel.Label_LuckyAmount.text = GlobalClass.GameClass.str_PropsAmount[1];
        this.mPanel.Label_Speed.text = GlobalClass.GameClass.str_PropsAmount[2];
    }

    private on153_event(event: egret.Event): void {
        console.log("on153_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if (strArray[2] == "3")//加速卡的使用
        {
            if (strArray[3] == "0"){
                GlobalClass.UserInfo.useSpeedup = "1";
                GameStartLogic.getInstance().SetQuickSpeed();
                KFControllerMgr.showTips("使用加速卡成功！");
                      WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_PROPS,"");
                }
                else if (strArray[3] == "5")
                {
                    KFControllerMgr.showTips("不要频繁使用加速卡");
                }
                else
                {
                    KFControllerMgr.showTips("使用加速卡被拒");
                }
                
        }
        if (strArray [3] == "0") {        //使用道具成功
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_PROPS,"");
            if(!GlobalClass.GameClass.bsfbIsAutoPlay){
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1094));
            }
		} else if (strArray [3] == "1") {   //使用道具失败
			KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1095));
			this.CloseAutoUse ();
		} else if (strArray [3] == "2") {   //该道具每局只能使用一次
		    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1096));
		} else if (strArray [3] == "3") {   //道具数量为0, 请购买
			KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1097));
			this.CloseAutoUse ();
		} else if (strArray [3] == "4") {   //道具必须是bet状态或游戏状态中才能使用
			KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1098));
		} else if (strArray [3] == "5") {   //消息发送过快, 请您稍后再发!
		    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1099));
		} else if (strArray [3] == "6") {   //您发的消息存在非法字符
			KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1100));
		}
    }

    private on105_event(event: egret.Event): void {
        console.log("on105_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
		this.isShowTaskTipPanel = true;
        var js = { KEY: "0"};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.RECEIVE_MONEY,JSON.stringify(js));
    }

     private on127_event(event: egret.Event): void {
         console.log("on127_event");
         var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = "127%-1%1%3%1%1%1000%5000";
        var strArray = datastr.split("%");
        GlobalClass.TaskClass.str_TaskType = strArray [2];
		GlobalClass.TaskClass.str_TaskMssage = strArray [3];//1-7，7代表需要进行低保二次验证
		GlobalClass.TaskClass.str_ReceiveTimes = strArray [4];
		GlobalClass.TaskClass.str_ReceiveConditions = strArray [6];
		GlobalClass.TaskClass.str_ReceiveScore = strArray [7];
        if (GlobalClass.TaskClass.str_TaskMssage == "7")
        {
            KFControllerMgr.getCtl(PanelName.PhoneVerificationCodePanel).show();
        }
        else
        {
            if(GlobalClass.TaskClass.str_TaskType == "1"){
                return;
            }
            if (this.isShowTaskTipPanel)//
            {
                if (GlobalClass.TaskClass.str_ReceiveTimes=="0")
                {
                    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1061),0,1,()=>{
                        this.Btn_PropsGameClick();
                    });
                }else{
                    KFControllerMgr.getCtl(PanelName.TaskTipPanel).show();
                }
                this.isAutoPay = false;
                GlobalClass.GameClass.bsfbIsAutoPlay = false;
                this.Btn_TrusteeshipCancelClick();//停止托管

                this.isShowTaskTipPanel = false;
                this.enableButton();
            }else{
                KFControllerMgr.getCtl(PanelName.TaskPanel).show();
            }
        }
     }

    private on80002_event(event: egret.Event): void {
        console.log("on80002_event");
        this.enableButton();
    }

    private on80003_event(event: egret.Event): void {
        console.log("on80003_event");
    }

    private on80004_event(event: egret.Event): void {
        console.log("on80004_event");
        //是否进入龙珠夺宝
            if (GlobalClass.UserInfo.Game_isEnterLZTB)
            {
                GlobalClass.UserInfo.Game_isEnterLZTB = false;
                if (this.isAutoPay)
                    {
                        this.isAutoPay = false;
                        GlobalClass.GameClass.bsfbIsAutoPlay = false;
                    }
                return;
            }
            else        //如果砖墙消完，本场所没有赢分，不能进入龙珠探宝  
            {
                if (GlobalClass.GameClass.f_brickArray[2] == 0)    //这种情况只允许玩家选择“退出大厅”
                {
                    if (this.isAutoPay)
                    {
                        this.isAutoPay = false;
                        GlobalClass.GameClass.bsfbIsAutoPlay = false;
                    }

                    KFControllerMgr.getCtl(PanelName.GameScorePanel).setType(1).show();
                }
            }

        if(GlobalClass.UserInfo.Game_isSlot){
            GlobalClass.UserInfo.Game_isSlot = false;
            this.enableButton();
        }else{
            if (this.isAutoPay)
            {
                this.invoke(GlobalClass.Speed.OnPayPress,this.startBet,this)
            }
            else
            {
                if (!GlobalClass.UserInfo.isNewbie)
                {
                    this.enableButton();
                }else{//新手教程
                    // this.enableButton();
                }   
            }
        }

        if ((Number(GlobalClass.UserInfo.str_Game_currentTodayScore) - Number(this.mPanel.Label_TodayScore.text)) > 10)
        {
            this.int_AddTodayScore = Math.floor((Number(GlobalClass.UserInfo.str_Game_currentTodayScore) - Number(this.mPanel.Label_TodayScore.text)) / 10);
            this.int_AddTotalScore = Math.floor((Number(GlobalClass.UserInfo.str_Game_currentTotalScore) - Number(this.mPanel.Label_TotalScore.text)) / 10);
        }
        else
        {
            this.int_AddTodayScore = 1;
            this.int_AddTotalScore = 1;
        }
        this.UpdateCurrentToday_TotalScore();
    }

    private slotTimerEnd(){
        if (this.isAutoPay)
        {
            this.startBet();
        }
    }

    private slotANi;
    public ShowSLotAni(){
        var s = AnimationMgr.getInstance().getSkeleton(skeletonType.BSFB_Slot,90,160);
        this.slotANi = s;
        this.mPanel.addChild(this.slotANi.display);
         s.addEventListener( dragonBones.AnimationEvent.LOOP_COMPLETE, ()=>{
            },this);
        
        s.animation.play();
    }
	
    protected onReady() {
        KFControllerMgr.getCtl(PanelName.VedioPanel).setType(1).show();
        this.initView();
    }

    protected onShow(){//在界面上显示出来
        this.mPanel.superBetBG.visible = false;
        if(GlobalClass.UserInfo.useSpeedup == "1"){
            GameStartLogic.getInstance().SetQuickSpeed();
        }else{
            GameStartLogic.getInstance().SetSlowSpeed();
        }
        this.mPanel.Btn_ExitGame.touchEnabled = false;
        this.invoke(1,()=>{
            this.mPanel.Btn_ExitGame.touchEnabled = true;
        },this);
    }

    public diamondReady(){
        this.diamondLoaded = true;
        if(!GlobalClass.UserInfo.isNewbie){
            this.enableBut(this.mPanel.Btn_MakeSure);
            this.enableBut(this.mPanel.Btn_Trusteeship);
        }
    }
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_ExitGame,egret.TouchEvent.TOUCH_END,this.Btn_ExitGameClick,this);
        this.AddClickEvent(this.mPanel.Btn_HelpGame,egret.TouchEvent.TOUCH_END, this.Btn_HelpGameClick, this);
        this.AddClickEvent(this.mPanel.Btn_Setting,egret.TouchEvent.TOUCH_END,this.Btn_SettingClick,this);
        this.AddClickEvent(this.mPanel.Btn_Ranklist,egret.TouchEvent.TOUCH_END, this.Btn_RanklistClick, this);
        this.AddClickEvent(this.mPanel.Btn_VedioGame,egret.TouchEvent.TOUCH_END,this.Btn_VedioGameClick,this);
        this.AddClickEvent(this.mPanel.Btn_TaskGame,egret.TouchEvent.TOUCH_END, this.Btn_TaskGameClick, this);
        this.AddClickEvent(this.mPanel.Btn_Lucky,egret.TouchEvent.TOUCH_END,this.Btn_LuckyClick,this);
        this.AddClickEvent(this.mPanel.Btn_MakeSure,egret.TouchEvent.TOUCH_END, this.Btn_MakeSureClick, this);
        this.AddClickEvent(this.mPanel.Btn_Trusteeship,egret.TouchEvent.TOUCH_END,this.Btn_TrusteeshipClick,this);
        this.AddClickEvent(this.mPanel.Btn_PropsGame,egret.TouchEvent.TOUCH_END, this.Btn_PropsGameClick, this);
        this.AddClickEvent(this.mPanel.Btn_MyBank,egret.TouchEvent.TOUCH_END,this.Btn_MyBankClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClubDole,egret.TouchEvent.TOUCH_END, this.Btn_ClubDoleClick, this);
        this.AddClickEvent(this.mPanel.Btn_SuperBet,egret.TouchEvent.TOUCH_END,this.Btn_SuperBetClick,this);
        this.AddClickEvent(this.mPanel.Btn_Addline,egret.TouchEvent.TOUCH_TAP, this.Btn_AddlineClick, this,0);
        this.AddClickEvent(this.mPanel.Btn_Minusline,egret.TouchEvent.TOUCH_TAP,this.Btn_MinuslineClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_Addcount,egret.TouchEvent.TOUCH_TAP, this.Btn_AddcountClick, this,0);
        this.AddClickEvent(this.mPanel.Btn_Minuscount,egret.TouchEvent.TOUCH_TAP,this.Btn_MinuscountClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_TrusteeshipCancel,egret.TouchEvent.TOUCH_END,this.Btn_TrusteeshipCancelClick,this);
        this.AddClickEvent(this.mPanel.Btn_SoltHelp,egret.TouchEvent.TOUCH_END,this.Btn_SoltHelpClick,this,0.5,false);
        
        this.AddClickEvent(this.mPanel.Toggle_Count0,egret.TouchEvent.TOUCH_END, this.Toggle_CountClick, this,0);
        this.AddClickEvent(this.mPanel.Toggle_Count1,egret.TouchEvent.TOUCH_END,this.Toggle_CountClick,this,0);
        this.AddClickEvent(this.mPanel.Toggle_Count2,egret.TouchEvent.TOUCH_END,this.Toggle_CountClick,this);
        this.AddClickEvent(this.mPanel.Toggle_Count3,egret.TouchEvent.TOUCH_END,this.Toggle_CountClick,this);
        this.AddClickEvent(this.mPanel.superBetBG,egret.TouchEvent.TOUCH_TAP,this.superBetBGClick,this);
        this.AddClickEvent(this.mPanel.Btn_Speed,egret.TouchEvent.TOUCH_TAP,this.Btn_SpeedClick,this);
        
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_ExitGame,egret.TouchEvent.TOUCH_END,this.Btn_ExitGameClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_HelpGame,egret.TouchEvent.TOUCH_END, this.Btn_HelpGameClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_Setting,egret.TouchEvent.TOUCH_END,this.Btn_SettingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Ranklist,egret.TouchEvent.TOUCH_END, this.Btn_RanklistClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_VedioGame,egret.TouchEvent.TOUCH_END,this.Btn_VedioGameClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_TaskGame,egret.TouchEvent.TOUCH_END, this.Btn_TaskGameClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_Lucky,egret.TouchEvent.TOUCH_END,this.Btn_LuckyClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_MakeSure,egret.TouchEvent.TOUCH_END, this.Btn_MakeSureClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_Trusteeship,egret.TouchEvent.TOUCH_END,this.Btn_TrusteeshipClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_PropsGame,egret.TouchEvent.TOUCH_END, this.Btn_PropsGameClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_MyBank,egret.TouchEvent.TOUCH_END,this.Btn_MyBankClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClubDole,egret.TouchEvent.TOUCH_END, this.Btn_ClubDoleClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_SuperBet,egret.TouchEvent.TOUCH_END,this.Btn_SuperBetClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Addline,egret.TouchEvent.TOUCH_END, this.Btn_AddlineClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_Minusline,egret.TouchEvent.TOUCH_END,this.Btn_MinuslineClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Addcount,egret.TouchEvent.TOUCH_END, this.Btn_AddcountClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_Minuscount,egret.TouchEvent.TOUCH_END,this.Btn_MinuscountClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_TrusteeshipCancel,egret.TouchEvent.TOUCH_END,this.Btn_TrusteeshipCancelClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_SoltHelp,egret.TouchEvent.TOUCH_END,this.Btn_SoltHelpClick,this);

        this.RemoveClickEvent(this.mPanel.Toggle_Count0,egret.TouchEvent.TOUCH_END, this.Toggle_CountClick, this,0);
        this.RemoveClickEvent(this.mPanel.Toggle_Count1,egret.TouchEvent.TOUCH_END,this.Toggle_CountClick,this,0);
        this.RemoveClickEvent(this.mPanel.Toggle_Count2,egret.TouchEvent.TOUCH_END,this.Toggle_CountClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_Count3,egret.TouchEvent.TOUCH_END,this.Toggle_CountClick,this);
        this.RemoveClickEvent(this.mPanel.superBetBG,egret.TouchEvent.TOUCH_END,this.superBetBGClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Speed,egret.TouchEvent.TOUCH_TAP,this.Btn_SpeedClick,this);
    }

    private Btn_SpeedClick(){
        if (GlobalClass.UserInfo.useSpeedup == "1")
        {
            KFControllerMgr.showTips("你已经开启了加速功能");
        }
        else if (this.mPanel.Label_Speed.text == "0")
        {
            KFControllerMgr.showTips("加速卡不足!");
        }
        else
        {
            KFControllerMgr.showTips("加速卡可以增加本轮游戏的速度",0,2,()=>{
                if(GlobalClass.UserInfo.useSpeedup=="1"){
                    KFControllerMgr.showTips("你已经开启了加速功能");
                    return;
                }
                var js1 = { PropsID: GlobalClass.GameClass.str_PropsId[2]};
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.USE_PROPS,JSON.stringify(js1));
            });
        }
        
    }

    public getTodayScore():string{
        return this.mPanel.Label_TodayScore.text;
    }

    private getTotalScore():string{
        return this.mPanel.Label_TotalScore.text;
    }

    private Toggle_CountClick(event:egret.Event){
        var but = <eui.Button>event.target;
        var value= "";
        this.mPanel.Toggle_Count0.filters = [];
        this.mPanel.Toggle_Count1.filters = [];
        this.mPanel.Toggle_Count2.filters = [];
        this.mPanel.Toggle_Count3.filters = [];
        but.filters = [new egret.GlowFilter(0xFFD800,1,2,2)];
        if(but==this.mPanel.Toggle_Count0){
            this.mPanel.Label_Count.text = "500";
        }
        if(but==this.mPanel.Toggle_Count1){
            this.mPanel.Label_Count.text = "1000";
        }
        if(but==this.mPanel.Toggle_Count2){
            this.mPanel.Label_Count.text = "2000";
        }
        if(but==this.mPanel.Toggle_Count3){
            this.mPanel.Label_Count.text = "5000";
        }
        for (var k = 0; k < 5; k++)
        {
            this.mPanel.Label_CountGroup.getChildAt(k).text = this.mPanel.Label_Count.text;
        }
    }

    private superBetBGClick(){
        this.Btn_SuperBetClick();
    }
    private  CloseAutoUse(){
		GlobalClass.GameClass.bsfbIsAutoPlay = false;
        egret.localStorage.setItem(GlobalClass.UserInfo.str_UserID + "isAutoUseProps", "0");
		 this.GO_PropAutoAninit.visible = false; //
	}

    private Btn_LuckyClick(){
        if (GlobalClass.GameClass.bsfbIsAutoPlay) {
			this.CloseAutoUse ();
		} else {
			if (this.mPanel.Label_LuckyAmount.text == "0")
			{
				KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1060),1);
			}
			else
			{
				KFControllerMgr.getCtl(PanelName.LuckyPropsPanel).show();
			}
		}
    }

    private Btn_SoltHelpClick(){
        SoundMgr.Instance.playEffect(SoundMgr.helpEffect);
        KFControllerMgr.getCtl(PanelName.SlotHelpPanel).show();
    }

    private Btn_TaskGameClick(){
        var js = { KEY: "0"};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.RECEIVE_MONEY,JSON.stringify(js));
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.assist_receive);
    }

    private Btn_TrusteeshipCancelClick(){
        this.isAutoPay = false;
        this.mPanel.Btn_MakeSure.visible = true;
        this.mPanel.Btn_Trusteeship.visible = true;
        this.mPanel.Btn_TrusteeshipCancel.visible = false;
        this.mPanel.Btn_TrusteeshipCancel.enabled = false;

        KFControllerMgr.getCtl(PanelName.VedioPanel).hideTrustBG();
    }

    private Btn_ExitGameClick(){
        //  KFControllerMgr.getCtl(PanelName.BSFBExitPanel).show();
          WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.SAVEGAME_EXIT,"");
        KFSceneManager.getInstance().replaceScene(SceneName.Hall);
    }
    private Btn_MakeSureClick(){
        this.startBet();
        // this.on102_event(null);
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.lhdb_start);
    }
    private Btn_TrusteeshipClick(){
        console.log("Btn_TrusteeshipClick");
        this.isAutoPay = true;
        this.startBet();
        this.mPanel.Btn_MakeSure.visible = false;
        this.mPanel.Btn_Trusteeship.visible = false;
        this.mPanel.Btn_TrusteeshipCancel.visible = true;
        this.mPanel.Btn_TrusteeshipCancel.enabled = true;
        if(Number(GlobalClass.UserInfo.str_UserLevel) < 3){
            KFControllerMgr.getCtl(PanelName.VedioPanel).showTrustBG();
        }
    }
    private Btn_VedioGameClick(){
        KFControllerMgr.getCtl(PanelName.VedioPanel).setType(2).show();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.lhdb_sharevideo);
    }
    private Btn_HelpGameClick(){
        KFControllerMgr.getCtl(PanelName.GameHelpPanel).show();
    }
    private Btn_SettingClick(){
        KFControllerMgr.getCtl(PanelName.GameSettingPanel).show();
    }
    private Btn_RanklistClick(){
        KFControllerMgr.getCtl(PanelName.GameRankPanel).show();
    }
    private Btn_PropsGameClick(){
        KFControllerMgr.getCtl(PanelName.PropshopPanel).show();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.show_shop,"2","1");        
    }
    private Btn_MyBankClick(){
        KFControllerMgr.getCtl(PanelName.BankPanel).show();
    }
    private Btn_ClubDoleClick(){
        if (Number(GlobalClass.ClubClass.str_ClubMsgRet) <= 0)
        {
            KFControllerMgr.showTips("请先加入公会",0,2,()=>{
                KFControllerMgr.getCtl(PanelName.ClubPanel).show();
            });
            return;
        }
        KFControllerMgr.getCtl(PanelName.ClubDolePanel).show();
    }

    private initSuperView()
    {
        this.mPanel.label_SuperbetTip.text = LocalizationMgr.getText(TipTexts.A1109) + GlobalClass.HallClass.str_SuperBetCount + LocalizationMgr.getText(TipTexts.A1110);
        if (Number(GlobalClass.UserInfo.str_Game_lastTotalScore) >= Number(GlobalClass.HallClass.str_SuperBetCount))
        {
            this.mPanel.Toggle_Count0.visible = true;
            this.mPanel.Toggle_Count1.visible = true;
            this.mPanel.Toggle_Count2.visible = true;
            this.mPanel.Toggle_Count3.visible = true;
            this.mPanel.label_SuperbetTip.visible = false;
        }
        else 
        {
            this.mPanel.Toggle_Count0.visible = false;
            this.mPanel.Toggle_Count1.visible = false;
            this.mPanel.Toggle_Count2.visible = false;
            this.mPanel.Toggle_Count3.visible = false;
            this.mPanel.label_SuperbetTip.visible = true;
        }
    }
    private Btn_SuperBetClick(){
        var posx;
        this.disableButton();
        if(this.superViewShow){
            this.mPanel.superBetBG.visible = false;
            console.log("hide");
            posx = this.mPanel.SuperBetGroup.x + this.mPanel.SuperBetGroup.width*3/4;
            egret.Tween.get(this.mPanel.SuperBetGroup).to({x:posx},1000,egret.Ease.sineOut).call(function (){
                this.superViewShow = false;
                this.enableButton();
            },this);
        }else{
            console.log("show");
            this.initSuperView();
            posx = this.mPanel.SuperBetGroup.x - this.mPanel.SuperBetGroup.width*3/4;
            egret.Tween.get(this.mPanel.SuperBetGroup).to({x:posx},1000,egret.Ease.sineOut).call(function (){
                this.superViewShow = true;
                this.enableBut(this.mPanel.Btn_SuperBet);
                this.mPanel.superBetBG.visible = true;
            },this);
        }
        
    }
    private Btn_AddlineClick(){
         if (Number(this.mPanel.Label_Line.text) < 5)
        {
            this.mPanel.Label_Line.text = (Number(this.mPanel.Label_Line.text) + 1)+"";
        }
        this.Show_Go_Label_Line();
        if (GlobalClass.UserInfo.isNewbie)
        {
            if (this.mPanel.Label_Line.text == "5")
            {
                this.GameBtnCancelDisPlay();
                this.mPanel.gslider.enable = true;
                this.mPanel.gslider.visible = true;
                this.enableBut(this.mPanel.Btn_Addcount);
                this.enableBut(this.mPanel.Btn_Minuscount);
                KFControllerMgr.getCtl(PanelName.VedioPanel).AddlineClick();
            }
        }
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.lhdb_chooseLine,this.mPanel.Label_Line.text);
    }
    private Btn_MinuslineClick(){
        if (Number(this.mPanel.Label_Line.text) > 1)
        {
            this.mPanel.Label_Line.text = (Number(this.mPanel.Label_Line.text) - 1)+"";
        }
        this.Show_Go_Label_Line();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.lhdb_chooseLine,this.mPanel.Label_Line.text);        
    }
    
    private int_NewBitID = 1;
    private str_NewBit_102;
    private startBet(){
        this.saveLineNum();
        this.disableButton();
        if (GlobalClass.UserInfo.isNewbie)
        {
            KFControllerMgr.getCtl(PanelName.VedioPanel).newbieBet(this.int_NewBitID);
            switch (this.int_NewBitID)
            {
                //2线100点  出现钻头 赢钱200
                case 1:
                    this.str_NewBit_102 = GlobalClass.GameClass.str_Newbie_102Data[0].replace(/&/g, '%');
                    this.int_NewBitID = 2;
                    break;
                case 2:
                    this.str_NewBit_102 = GlobalClass.GameClass.str_Newbie_102Data[1].replace(/&/g, '%');
                    this.int_NewBitID = 3;
                    break;
                case 3:
                    this.str_NewBit_102 = GlobalClass.GameClass.str_Newbie_102Data[2].replace(/&/g, '%');
                    this.int_NewBitID = 4;
                    break;
                case 4:
                    this.str_NewBit_102 = GlobalClass.GameClass.str_Newbie_102Data[3].replace(/&/g, '%');
                    this.int_NewBitID = 5;
                    break;
                case 5:
                    this.str_NewBit_102 = GlobalClass.GameClass.str_Newbie_102Data[4].replace(/&/g, '%');
                    this.int_NewBitID = 6;
                    break;
                //5线100点  赢了8000
                case 6:
                    this.str_NewBit_102 = GlobalClass.GameClass.str_Newbie_102Data[5].replace(/&/g, '%');
                    this.int_NewBitID = 7;
                    break;

            }
            var ads = new MessageStruct();
            ads.setMainID(102);
            ads.setAssistantID(0);
            ads.setDataStr(this.str_NewBit_102);
            var event = {};
            event["data"] = ads;
            this.invoke(0.1,()=>{
                this.on102_event(event);
            },this);
            return;
        }
        if(GlobalClass.GameClass.bsfbIsAutoPlay){
            var js1 = { PropsID: GlobalClass.GameClass.str_PropsId[1]};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.USE_PROPS,JSON.stringify(js1));
        }
        

        var js = { Count: this.mPanel.Label_Count.text,Line:this.mPanel.Label_Line.text};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.BET,JSON.stringify(js));
    }

    public SetDefaultLineAndSliderCount(){
        var Line = egret.localStorage.getItem(GlobalClass.UserInfo.str_UserID+"lastedLineNum");
        if(Line==null){
            Line = "1";
        }
        //线数
		this.mPanel.Label_Line.text = Line;
        var Count = egret.localStorage.getItem(GlobalClass.UserInfo.str_UserID+"lastedCountNum");
        if(Count==null){
            Count = "10";
        }
        this.mPanel.Label_Count.text = Count;
        
		//点数
        var per = egret.localStorage.getItem(GlobalClass.UserInfo.str_UserID+"lastedCountSliderNum");
        if(per==null){
            per = "0.05";
        }
		 this.isfisrtInitCount = true;
		this.mPanel.gslider.pValue = Number(per);

        //左边的图片和提示
        this.Show_Go_Label_Line();
        for (var k = 0; k < 5; k++)
        {
            this.mPanel.Label_CountGroup.getChildAt(k).text = this.mPanel.Label_Count.text;
        }
    }

    private Show_Go_Label_Line(){
          for (var k = 0; k < 5; k++)
        {
            if (k < Number(this.mPanel.Label_Line.text))
            {
                this.mPanel.Label_CountGroup.getChildAt(k).visible = true;
                this.mPanel.Sprite_Line.getChildAt(k).source = RES.getRes("Sprite_Line01");
            }
            else
            {
                this.mPanel.Label_CountGroup.getChildAt(k).visible = false;
                this.mPanel.Sprite_Line.getChildAt(k).source = RES.getRes("Sprite_Line02");
            }
        }
    }

    private disableButton(){
        this.disableBut(this.mPanel.Btn_VedioGame);
        this.disableBut(this.mPanel.Btn_MakeSure);
        this.disableBut(this.mPanel.Btn_Trusteeship);
        // this.disableBut(this.mPanel.Btn_Minuscount);
        // this.disableBut(this.mPanel.Btn_Addcount);
        this.disableBut(this.mPanel.Btn_PropsGame);
        // this.disableBut(this.mPanel.Btn_Addline);
        // this.disableBut(this.mPanel.Btn_Minusline);
        this.disableBut(this.mPanel.Btn_SuperBet);
        this.disableBut(this.mPanel.Btn_MyBank);
        this.disableBut(this.mPanel.Btn_ClubDole);
        // this.mPanel.gslider.enable = false;
    }

    private enableButton(){
        this.enableBut(this.mPanel.Btn_VedioGame);
        this.enableBut(this.mPanel.Btn_MakeSure);
        this.enableBut(this.mPanel.Btn_Trusteeship);
        this.enableBut(this.mPanel.Btn_Minuscount);
        this.enableBut(this.mPanel.Btn_Addcount);
        this.enableBut(this.mPanel.Btn_PropsGame);
        this.enableBut(this.mPanel.Btn_Addline);
        this.enableBut(this.mPanel.Btn_Minusline);
        this.enableBut(this.mPanel.Btn_SuperBet);
        this.enableBut(this.mPanel.Btn_MyBank);
        this.enableBut(this.mPanel.Btn_ClubDole);
        this.mPanel.gslider.enable = true;
    }

    private initAutoAni(){
        var posx = this.mPanel.Btn_Lucky.x-20;
        var posy = this.mPanel.Btn_Lucky.y-10;
        posx = 150;
        posy = 445;
        this.GO_PropAutoAninit = AnimationMgr.getInstance().getAnimation(aniType.useProps,posx,posy);
        this.GO_PropAutoAninit.$setScaleX(1.1);
        this.mPanel.GamePanel.addChild(this.GO_PropAutoAninit);
        var auto = egret.localStorage.getItem(GlobalClass.UserInfo.str_UserID + "isAutoUseProps");
        if(auto==null){
            auto = "0";
        }
        if(auto=="1"){
            GlobalClass.GameClass.bsfbIsAutoPlay = true;
            //播放动画
             this.GO_PropAutoAninit.visible = true;
        }else{
            GlobalClass.GameClass.bsfbIsAutoPlay = false;
             this.GO_PropAutoAninit.visible = false;
        }
    }

    private initView(){
        this.superViewShow = false;
        this.mPanel.gslider.SetChangeCB(this.onSliderChange,this);
        this.SetDefaultLineAndSliderCount();
        this.mPanel.Btn_TrusteeshipCancel.visible = false;

        this.mPanel.Btn_MyBank.visible = GlobalClass.SDKType.bShowBank2;
        this.mPanel.Btn_ClubDole.visible = GlobalClass.SDKType.bShowClub2;

        AnimationMgr.getInstance().loadbsfbAni(this.initAutoAni,this);
       
        this.mPanel.Label_LuckyAmount.text = GlobalClass.GameClass.str_PropsAmount [1];
        this.mPanel.Label_Speed.text = GlobalClass.GameClass.str_PropsAmount[2];
        
        this.updateLastScore();
        
        if(!this.diamondLoaded){
            this.disableBut(this.mPanel.Btn_MakeSure);
            this.disableBut(this.mPanel.Btn_Trusteeship);
        }

        this.initNewbie();
    }
    private GameBtnCancelDisPlay(){
        this.disableBut(this.mPanel.Btn_Addcount);
        this.disableBut(this.mPanel.Btn_Minuscount);
        this.disableBut(this.mPanel.Btn_Addline);
        this.disableBut(this.mPanel.Btn_Minusline);
        this.disableBut(this.mPanel.Btn_MakeSure);
        this.disableBut(this.mPanel.Btn_Trusteeship);
        this.mPanel.gslider.enable = false;
        this.mPanel.gslider.visible = false;
    }
    private initNewbie(){
        // GlobalClass.UserInfo.isNewbie = true;
         if (GlobalClass.UserInfo.isNewbie)
        {
            var str_SlotScore = GlobalClass.UserInfo.str_Game_lastSlotScore;
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.NEWBIE_102MSG,"");

            this.mPanel.Label_SlotScore.text = "0";
            this.mPanel.Label_Line.text = "1";
            this.mPanel.Label_TotalScore.text = "100";
            this.mPanel.gslider.pValue = 0.05;

            this.mPanel.Label_TodayScore.text = "0";
            this.GameBtnCancelDisPlay();
            this.mPanel.Go_Sp_NewBie1.visible = true;
            this.mPanel.Go_Sp_NewBie2.visible = true;
            CommonFuc.imgFilterHex(this.mPanel.Go_Sp_NewBie1,0x000000C8);
            CommonFuc.imgFilterHex(this.mPanel.Go_Sp_NewBie2,0x000000C8);

            this.mPanel.Btn_Setting.visible = false;
            this.mPanel.Btn_HelpGame.visible = false;
            this.mPanel.Btn_MyBank.visible = false;
            this.mPanel.Btn_ClubDole.visible = false;
            this.mPanel.Btn_PropsGame.visible = false;
            this.mPanel.Btn_Ranklist.visible = false;
            this.mPanel.Btn_TaskGame.visible = false;
            this.mPanel.Btn_VedioGame.visible = false;
            this.mPanel.Btn_ExitGame.visible = false;
            this.mPanel.Btn_SuperBet.visible = false;

            // this.mPanel.Btn_SoltHelp.GetComponent<UIButton>().isEnabled = false;
            KFControllerMgr.getCtl(PanelName.VedioPanel).initNewbie();
             this.invoke(3,this.NewBie,this);
        }
    }

    public enterLHDB(){
        this.mPanel.Go_Sp_NewBie1.visible = false;
        this.mPanel.Go_Sp_NewBie2.visible = false;

        this.mPanel.Btn_Setting.visible = true;
        this.mPanel.Btn_HelpGame.visible = true;
        
        this.mPanel.Btn_MyBank.visible = GlobalClass.SDKType.bShowBank2;
        this.mPanel.Btn_ClubDole.visible = GlobalClass.SDKType.bShowClub2;

        this.mPanel.Btn_PropsGame.visible = GlobalClass.SDKType.bShowShop;
        this.mPanel.Btn_Ranklist.visible = true;
        this.mPanel.Btn_SuperBet.visible = true;
        this.mPanel.Btn_TaskGame.visible = true;
        this.mPanel.Btn_VedioGame.visible = true;
        this.mPanel.Btn_ExitGame.visible = true;

        GlobalClass.UserInfo.str_Game_lastTotalScore = GlobalClass.UserInfo.str_Hall_totalScore;
        GlobalClass.UserInfo.str_Game_lastTodayScore = "0";

        this.enableButton();

        this.updateLastScore();
    }

    private NewBie(){
        this.enableBut(this.mPanel.Btn_Addline);
        this.enableBut(this.mPanel.Btn_Minusline);
        KFControllerMgr.getCtl(PanelName.VedioPanel).NewBie();
    }

    public newBieBallance(){
         switch (this.int_NewBitID)
         {
             case 7:
                this.mPanel.gslider.pValue = 0.01;
                break;
            default:
                this.enableBut(this.mPanel.Btn_MakeSure);
                break;           
        }
    }
    
    private updateLastScore(){
        this.mPanel.Label_SlotScore.text = GlobalClass.UserInfo.str_Game_lastSlotScore;
        this.mPanel.Label_TotalScore.text = GlobalClass.UserInfo.str_Game_lastTotalScore;
        this.mPanel.Label_TodayScore.text = GlobalClass.UserInfo.str_Game_lastTodayScore;
    }

    public showLevel(level){
        var imgSource = "Sprite_Level"+level;
        this.mPanel.Bg_Gauanqia.source = RES.getRes(imgSource);
    }


    private Btn_AddcountClick(){
         if (this.mPanel.gslider.pValue < 1.0)
        {
            this.mPanel.gslider.pValue += 0.05;
        }
        else
        {
            this.mPanel.gslider.pValue = 0.05;
        }
    }
    private Btn_MinuscountClick(){
        if (this.mPanel.gslider.pValue > 0.074)
        {
            this.mPanel.gslider.pValue -= 0.05;
        }
        else
        {
            this.mPanel.gslider.pValue = 1.0;
        }
    }

    private onSliderChange(percent:any){
        console.log(percent);
        if(this.isfisrtInitCount){
			this.isfisrtInitCount = false;
			return;
		}
		this.mPanel.Label_Count.text = (Math.floor(percent * 20) * 10)+"";
        if (percent < 0.05)
        {
            this.mPanel.gslider.pValue = 0.05;
            this.mPanel.Label_Count.text = "10";
        }
        for (var k = 0; k < 5; k++)
        {
            this.mPanel.Label_CountGroup.getChildAt(k).text = this.mPanel.Label_Count.text;
        }
        if (GlobalClass.UserInfo.isNewbie)
        {
            if (Number(this.mPanel.Label_Count.text) >= 20)
            {
                this.mPanel.Label_Count.text = "20";
                for (var k = 0; k < 5; k++)
                {
                    this.mPanel.Label_CountGroup.getChildAt(k).text = "20";
                }
                this.GameBtnCancelDisPlay();
                this.enableBut(this.mPanel.Btn_MakeSure);
                KFControllerMgr.getCtl(PanelName.VedioPanel).onSliderChange();
             }
        }
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.lhdb_lineValue,this.mPanel.Label_Count.text);
    }

    protected destroy(){
        AnimationMgr.getInstance().unloadBSFBAni();
        this.mPanel.removeChild(this.slotANi.display);
        this.slotANi = null;
        super.destroy();
     }

    private saveLineNum(){
        if(!GlobalClass.UserInfo.isNewbie){
            egret.localStorage.setItem (GlobalClass.UserInfo.str_UserID+"lastedLineNum",this.mPanel.Label_Line.text);
			egret.localStorage.setItem (GlobalClass.UserInfo.str_UserID+"lastedCountSliderNum",this.mPanel.gslider.pValue+"");
			egret.localStorage.setItem (GlobalClass.UserInfo.str_UserID+"lastedCountNum",this.mPanel.Label_Count.text);
		}
    }
	
    private on102_event(event): void {
        console.log("on102_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var  datastr = "102%-1%19784%0%50000207403%20586%802%50000207403%1%11,15,13,11,13;14,12,14,12,12;30,14,11,12,12;14,11,11,11,14;12,13,12,11,12;%13,11,15,15,11,12,12,15,11,12,15,14,15,15,15,13,15,15,14,14,;12,14,13,15,12,14,11,11,14,11,13,13,12,12,15,13,11,13,14,11,;14,12,15,14,11,13,12,14,13,11,13,11,15,13,12,14,11,13,11,14,;12,12,14,12,12,11,14,12,11,13,12,14,11,14,13,11,11,14,11,12,;14,14,14,13,11,15,12,15,12,14,12,11,15,11,14,11,11,11,14,14,;%1%2,0%0,14,15%11,5,2,2;12,10,50,50;14,10,750,750;%2,2;3,2;3,1;3,3;4,3;#$1,3;2,3;1,4;3,3;2,2;2,4;4,3;4,2;4,4;4,1;#$1,0;2,0;2,1;2,2;1,2;1,3;1,4;2,4;3,4;4,4;#$$%0%0%1488281095";
        // var datastr = "id=102 data=102%-1%1261%0%50000208322%1265%4%50000208322%0%3,2,1,1;1,1,3,1;2,1,1,5;4,1,4,30;%2,4,3,4,2,5,1,1,;3,2,3,3,2,5,1,4,;1,1,2,1,5,3,2,1,;4,4,1,1,1,1,5,2,;%1%3,3%9,15,15%1,5,4,4;%1,0;1,1;2,1;3,1;2,2;#$$%0%0%1488340039";
        // var datastr= "102%-1%19931%0%50000208878%19931%0%50000208878%2%23,25,21,30,21,22;21,21,21,22,24,24;24,23,25,25,23,22;21,22,21,22,21,23;23,21,24,25,23,23;23,25,22,21,23,24;%23,24,23,21,23,25,;23,24,25,22,25,22,;23,23,21,21,24,25,;23,24,21,24,21,23,;25,23,24,23,24,22,;24,22,24,24,23,23,;%1%0,3%0,0,8%null%null$%0%0%1488371132";
        // var datastr = "102%-1%316190%192000%2102761%316190%192000%2102761%1%13,11,13,13,14;11,14,15,14,11;14,11,12,15,11;12,12,11,11,12;14,13,12,13,30;%15,13,11,13,14,;12,11,15,14,13,;14,12,14,15,13,;12,12,14,12,12,;11,11,14,13,15,;%1%4,4%0,14,15%null%null$%0%0%1491896759";
        // var datastr = "102%-1%4915648%20%2190568%4915648%20%2190568%0%2,1,2,3;1,3,1,2;2,2,5,2;30,1,1,5;%2,1,2,4,;2,3,4,2,;1,5,5,5,;2,1,2,1,;%1%3,0%7,15,15%null%null$%0%0%1492132625";
        var strArray = datastr.split("%");

        if (!GlobalClass.UserInfo.isNewbie) {
            this.str_Game_DataBy102Value = datastr + "@" + CommonFuc.getDateTrick();

			this.str_Game_DataBy102Key = "" +datastr.length+ strArray [10].length + strArray [14].length + strArray [15].length;
		}

       	GlobalClass.UserInfo.str_Game_lastTotalScore = strArray [2];
		GlobalClass.UserInfo.str_Game_lastTodayScore = strArray [3];
		GlobalClass.UserInfo.str_Game_lastSlotScore = strArray [4];
		GlobalClass.UserInfo.str_Game_currentTotalScore = strArray [5];
		GlobalClass.UserInfo.str_Game_currentTodayScore = strArray [6];
		GlobalClass.UserInfo.str_Game_currentSlotScore = strArray [7];
		GlobalClass.GameClass.int_level = Number (strArray [8]);
		GlobalClass.GameClass.str_init = strArray [9];        //初始
		GlobalClass.GameClass.str_suppliment = strArray [10]; //补充
		var tmpstrs = strArray [13].split (',');      //砖地图
		GlobalClass.GameClass.f_brickArray =  [];
        GlobalClass.GameClass.f_brickArray.push(Number (tmpstrs [0]));
        GlobalClass.GameClass.f_brickArray.push(Number (tmpstrs [1]));
        GlobalClass.GameClass.f_brickArray.push(Number (tmpstrs [2]));
		GlobalClass.GameClass.str_groupBallanceData = strArray [14];           //本局成绩结算
		GlobalClass.GameClass.str_turnDesData = strArray [15];                 //消除组合
        //是否中累积奖
		if (strArray [16] != "0") {
			GlobalClass.UserInfo.Game_isSlot = true;
			var strs1 = strArray [16].split (",");
			GlobalClass.UserInfo.str_Game_slotScore = strs1 [1];
		}
         if (!GlobalClass.UserInfo.isNewbie && GlobalClass.GameClass.str_groupBallanceData != "null") {
        // if(true){
             var strs1 = GlobalClass.GameClass.str_groupBallanceData.split(';' );
             var _length = strs1.length;
            for (var i = 0; i < _length; i++){
                var strs2 = strs1[i].split(",");
                this.VedioData(strs2[0], strs2[1]);
            }
       }

        //是否龙珠探宝
		var strs = strArray [17].split (";");       //"1;100,200,300,5000,10000"
		if (strs [0] == "1") {
            GlobalClass.UserInfo.Game_isEnterLZTB = true;
			GlobalClass.SearchClass.str_dragonOption = strs [1].split (",");
			GlobalClass.UserInfo.str_Search_lastTotalScore = GlobalClass.UserInfo.str_Game_currentTotalScore;
			GlobalClass.UserInfo.str_Search_lastTodayScore = GlobalClass.UserInfo.str_Game_currentTodayScore;
			GlobalClass.UserInfo.str_Search_lastSlotScore = GlobalClass.UserInfo.str_Game_currentSlotScore;
		}
        KFControllerMgr.getCtl(PanelName.VedioPanel).startPlaying();
    }

    private VedioData(groupType:string,PieceAccount:string){
        var _Account = Number(PieceAccount);
        switch (groupType)
        {
            case "1": //白玉
            case "22": //绿宝石
                if (_Account > 12)//12
                {
                    this.SetVedioData();
                }
                break;
            case "2": //碧玉
            case "13": //紫水晶
            case "24": //蓝宝石
                if (_Account > 10)//10
                {
                    this.SetVedioData();
                }
                break;
            case "3": //墨玉
            case "14": //翡翠
                if (_Account > 9)//9
                {
                    this.SetVedioData();
                }
                break;
            case "4": //玛瑙
            case "25": //钻石
                if (_Account > 8)//8
                {
                    this.SetVedioData();
                }
                break;
            case "5": //琥珀
                if (_Account > 6)//6
                {
                    this.SetVedioData();
                }
                break;
            case "11": //祖母绿
                if (_Account > 13)//13
                {
                    this.SetVedioData();
                }
                break;
            case "12": //猫眼石
            case "23": //黄宝石
                if (_Account > 11)//11
                {
                    this.SetVedioData();
                }
                break;
            case "15": //珍珠
                if (_Account > 7)//7
                {
                    this.SetVedioData();
                }
                break;
            case "21": //红宝石
                if (_Account > 14)//14
                {
                    this.SetVedioData();
                }
                break;
        }
    }

    private SetVedioData(){
        var aa = egret.localStorage.getItem(this.str_Game_DataBy102Key);
         if (egret.localStorage.getItem(this.str_Game_DataBy102Key)==null)
        {
             var _list = "";
            egret.localStorage.setItem(this.str_Game_DataBy102Key, this.str_Game_DataBy102Value);
            var a = egret.localStorage.getItem (GlobalClass.UserInfo.str_UserID + "MyVedioKey");
            _list = this.str_Game_DataBy102Key + "&"+a;
            egret.localStorage.setItem(GlobalClass.UserInfo.str_UserID+ "MyVedioKey", _list);
        }
    }
    private UpdateCurrentToday_TotalScore(){
        if (this.mPanel.Label_TodayScore.text != GlobalClass.UserInfo.str_Game_currentTodayScore)
        {
            this.mPanel.Label_TodayScore.text = (Number(this.mPanel.Label_TodayScore.text) + this.int_AddTodayScore)+"";
            if (Number(this.mPanel.Label_TodayScore.text) > Number(GlobalClass.UserInfo.str_Game_currentTodayScore))
            {
                this.mPanel.Label_TodayScore.text = GlobalClass.UserInfo.str_Game_currentTodayScore;
            }
        }
        if (this.mPanel.Label_TotalScore.text != GlobalClass.UserInfo.str_Game_currentTotalScore)
        {
            this.mPanel.Label_TotalScore.text = (Number(this.mPanel.Label_TotalScore.text) + this.int_AddTotalScore)+"";
            if (Number(this.mPanel.Label_TotalScore.text) > Number(GlobalClass.UserInfo.str_Game_currentTotalScore))
            {
                this.mPanel.Label_TotalScore.text = GlobalClass.UserInfo.str_Game_currentTotalScore;
            }
        }
        if (this.mPanel.Label_TodayScore.text != GlobalClass.UserInfo.str_Game_currentTodayScore || this.mPanel.Label_TotalScore.text != GlobalClass.UserInfo.str_Game_currentTotalScore)
        {
            this.invoke(0.05,this.UpdateCurrentToday_TotalScore,this);
        }
    }
}