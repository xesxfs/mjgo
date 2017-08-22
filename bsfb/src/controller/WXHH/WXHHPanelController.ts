/**
 *
 * @author 
 *
 */
class WXHHPanelController extends KFController{ 
    private testingNet = false;
    private blinkmatri;
    private blinkIndex = 0;
    private timeOnEnterFrame:number = 0;
    private LotteryRecordList = [];

    private startx = 311;
    private starty = 180;

    private OriSprite_PokerBorderX = 0;
    private SpriteDel = 92;

    private resultDiamond:egret.MovieClip;
    private DiamondOrix = 100;
    private DiamondOriy = 210;
    private posx = 550;
    private posy = 200;
    private diamondMoveInterval = 1000;
    private openLotteryInterval = 520;
    private winDisplay;
    private aniIsReady = false;
    private rankListArr;
    private isDestoryed = false;

    private LnningType = 0;//1为概率 0为局数
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.WXHH.NET_DELAY,
            MsgID.WXHH.GET_CONFIG,
            MsgID.WXHH.BET_POKER,
            MsgID.WXHH.OPEN_POKER,
            MsgID.WXHH.START_POKER,
            MsgID.WXHH.REWARD_POKER,
            MsgID.WXHH.EXIT_ROOM,
            MsgID.WXHH.GET_TOPLIST,
            MsgID.WXHH.TOP_AWARD,
            MsgID.WXHH.ALLBET_AWARD,
            MsgID.USER.LOUDERSPEAKER_MSG,
            MsgID.USER.UPDATE_MONEY,
            MsgID.Client.WXHHLnningSwitch,
            MsgID.Hall.Msg_1020,
            ];
        
        
	}

    private on83001_event(event: egret.Event): void {//切换局数或概率
        var msg: string = <string>event.data;
        this.LnningType = Number(msg);
        this.UpdateLabel_Inning();
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

    private on154_event(event: egret.Event): void {
        console.log("on154_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        var isvip =  str_Param[6];
        var text = "[" + str_Param[4] + "]" + str_Param[3] + "[-]";
        var obj = new Object();
        obj["txt"] = text;
        obj["vip"] = Number(isvip);
        var js = [obj];
        this.mPanel.louderspeaker.pushMarquees(js);
    }

    private on175_event(event: egret.Event): void {
        console.log("on175_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.ServerInfo.isNetDelayTest = false;
         if (GlobalClass.ServerInfo.f_NetDelayTime > 0.4){
             this.mPanel.NetDelayPanel.visible = true;
         }else if (GlobalClass.ServerInfo.f_NetDelayTime < 0.4){
            this.mPanel.NetDelayPanel.visible = false;
         }
    }
    private TestNet(){
        if(this.testingNet){
            this.NetDelay();
            var mTimer = new egret.Timer(3000,1);
            mTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.TestNet,this);
            mTimer.start();
        }
    }
    private NetDelay(){
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.NET_DELAY,"");
        GlobalClass.ServerInfo.f_NetDelayTime = 0;
        GlobalClass.ServerInfo.isNetDelayTest = true;
    }
    private on113_event(event: egret.Event): void {
        console.log("on113_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        this.mPanel.Label_MyCount.text = str_Param[2];
    }
    private on202_event(event: egret.Event): void {
        console.log("on202_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        var _str_Param2_202 = str_Param[2].split( ',');
        for (var i = 0; i < 5; i++){
            this.mPanel.Lb_OddsGroup.getChildAt(i).text = "x" + _str_Param2_202[i];
        }
        var _str_Param3_202 = str_Param[3].split(',' );
        GlobalClass.FiveClass.str_Count_Group = new Array(_str_Param3_202.length);
        for (var i = 0; i < _str_Param3_202.length; i++){
              this.mPanel.Go_CountToggle.getChildAt(i).getChildAt(1).text = _str_Param3_202[i];
              GlobalClass.FiveClass.str_Count_Group[i] = _str_Param3_202[i];
        }

        var _str_Param4_202 = str_Param[4].split( ',');
         GlobalClass.FiveClass.str_BetTime_Group = [];
        var _str_Param5_202 = str_Param[5].split( ',');
         GlobalClass.FiveClass.str_Inning_Group = [];
        var _str_Param6_202 = str_Param[6].split( ',');
         GlobalClass.FiveClass.str_LotteryRecord_Group = [];
         GlobalClass.FiveClass.str_LotteryRecordNum_Group = [];
         GlobalClass.FiveClass.str_MyCount = str_Param[7];
        var _str_Param8_202 = str_Param[8].split( ',');
        for (var i = 0; i < _str_Param8_202.length; i++){
            this.mPanel.Go_BetCountLabel.getChildAt(i).text = _str_Param8_202[i];
        }

        var _str_Param9_202 = str_Param[9].split( ';');
        var _str_Param9_202_length = _str_Param9_202.length;
        for (var i = 0; i < _str_Param9_202_length; i++){
            var Param9_202 = _str_Param9_202[i].split( ',');
            this.mPanel.Go_AllCountLabel.getChildAt(i).text = Param9_202[1];
        }

        for (var i = 0; i < _str_Param4_202.length; i++) {
             GlobalClass.FiveClass.str_BetTime_Group.push(_str_Param4_202[i])  ;
        }
        for (var i = 0; i < _str_Param5_202.length; i++){
             GlobalClass.FiveClass.str_Inning_Group.push(_str_Param5_202[i]);
        }
        for (var i = 0; i < _str_Param6_202.length; i++) {
             GlobalClass.FiveClass.str_LotteryRecord_Group[i] = (Number(_str_Param6_202[i]) >> 4)+"";
             GlobalClass.FiveClass.str_LotteryRecordNum_Group[i] = (Number(_str_Param6_202[i]) & 0x0f, 2).toString(2);
             if (GlobalClass.FiveClass.str_LotteryRecord_Group[i] == "4" && GlobalClass.FiveClass.str_LotteryRecordNum_Group[i] == "10") {
                 GlobalClass.FiveClass.str_LotteryRecord_Group[i] = "5";
            }
        }
         GlobalClass.FiveClass.str_LotteryPocker_Color = GlobalClass.FiveClass.str_BetTime_Group[2];
         GlobalClass.FiveClass.str_LotteryNum = GlobalClass.FiveClass.str_BetTime_Group[3];
        if (GlobalClass.FiveClass.str_LotteryPocker_Color != "4"){
            switch (GlobalClass.FiveClass.str_LotteryNum) {
            case "10":
                GlobalClass.FiveClass.str_LotteryNum = "0";
                break;
            case "11":
                GlobalClass.FiveClass.str_LotteryNum = "J";
                break;
            case "12":
                GlobalClass.FiveClass.str_LotteryNum = "Q";
                break;
            case "13":
                GlobalClass.FiveClass.str_LotteryNum = "K";
                break;
            }
        }
        this.Five_InitSet();
    }
   
    private on203_event(event: egret.Event): void {
        console.log("on203_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        switch (str_Param[2]){
        //0-bet成功
        //1-参数错误，bet失败
        //2-不是bet时间，不可bet
        //3-玩家金币不足
        //4-用户操作过于频繁
        //5-该花色bet已上限
            case "0":
                // KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1078),0.5);
                break;
            case "1":
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1079));
                break;
            case "2":
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1080));
                break;
            case "3":
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1081));
                break;
            case "4":
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1082),0,1,()=>{
                            KFControllerMgr.getCtl(PanelName.PropshopPanel).show();
                        });
                break;
            case "5":
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1083));
                break;
            case "6":
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1084));
                break;
            case "7":
                KFControllerMgr.showTips("已达到今日净输上限");
                break;
            default:
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1010)+str_Param[2]);
                break;
          }
          if (str_Param[2] == "0"){
              var num = Number(this.mPanel.Go_BetCountLabel.getChildAt(Number(str_Param[5])).text)+ Number(str_Param[4]);
              this.mPanel.Go_BetCountLabel.getChildAt(Number(str_Param[5])).text = num+"";
            this.mPanel.Label_MyCount.text = str_Param[3];
         }
    }
    private on204_event(event: egret.Event): void {
        console.log("on204_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        this.enableBut(this.mPanel.Btn_MyBank);
        this.enableBut(this.mPanel.Btn_ClubDole);
        var _str_Param2_204 = str_Param[2].split(',');
        GlobalClass.FiveClass.str_LotteryPocker_Color = _str_Param2_204[0];
        GlobalClass.FiveClass.str_LotteryNum = _str_Param2_204[1];
        if (GlobalClass.FiveClass.str_LotteryPocker_Color != "4"){
            switch (GlobalClass.FiveClass.str_LotteryNum) {
                case "10":
                    GlobalClass.FiveClass.str_LotteryNum = "0";
                    break;
                case "11":
                    GlobalClass.FiveClass.str_LotteryNum = "J";
                    break;
                case "12":
                    GlobalClass.FiveClass.str_LotteryNum = "Q";
                    break;
                case "13":
                    GlobalClass.FiveClass.str_LotteryNum = "K";
                    break;
                default:
                    break;
            }
        }
        for (var i = 0; i < 5; i++){
            if (i != Number(GlobalClass.FiveClass.str_LotteryPocker_Color) && GlobalClass.FiveClass.str_LotteryPocker_Color != "4"){
                   this.switchLabelColor(this.mPanel.Go_BetCountLabel.getChildAt(i),false);
             }
       }                
       var _str_Param3_204 = str_Param[3].split(',' );
        GlobalClass.FiveClass.str_Inning_Group = new Array(_str_Param3_204.length);
        for (var i = 0; i < _str_Param3_204.length; i++){
             GlobalClass.FiveClass.str_Inning_Group[i] = _str_Param3_204[i];
        }
        var _str_Param4_204 = str_Param[4].split( ',');
        GlobalClass.FiveClass.str_LotteryRecord_Group = new Array(_str_Param4_204.length);
        GlobalClass.FiveClass.str_LotteryRecordNum_Group = new Array(_str_Param4_204.length);
         for (var i = 0; i < _str_Param4_204.length; i++){
            GlobalClass.FiveClass.str_LotteryRecord_Group[i] = (Number(_str_Param4_204[i]) >> 4)+"";
            GlobalClass.FiveClass.str_LotteryRecordNum_Group[i] = (Number(_str_Param4_204[i]) & 0x0f).toString(2);
            if (GlobalClass.FiveClass.str_LotteryRecord_Group[i] == "4" && GlobalClass.FiveClass.str_LotteryRecordNum_Group[i] == "10"){
                   GlobalClass.FiveClass.str_LotteryRecord_Group[i] = "5";
            }
         }
        var _str_Param5_204 = str_Param[5].split(',' );
        GlobalClass.FiveClass.str_BetTime_Group = new Array(_str_Param5_204.length);
        for (var i = 0; i < _str_Param5_204.length; i++){
           GlobalClass.FiveClass.str_BetTime_Group[i] = _str_Param5_204[i];
        }
        this.UpdateLotteryInfo();
    }
    private on205_event(event: egret.Event): void {
        console.log("on205_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        this.disableBut( this.mPanel.Btn_MyBank);
        this.disableBut( this.mPanel.Btn_ClubDole);
        var _str_Param2_205 = str_Param[2].split( ',' );
        GlobalClass.FiveClass.str_BetTime_Group = new Array(_str_Param2_205.length);
        GlobalClass.FiveClass.str_SystemMaintenance = str_Param[3];
        if (GlobalClass.FiveClass.str_SystemMaintenance == "0"){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1085),0);
        }else if (GlobalClass.FiveClass.str_SystemMaintenance == "1" ) {
             KFControllerMgr.getCtl(PanelName.DialogPanel).hide();
        }
        for (var i = 0; i < _str_Param2_205.length; i++){
             GlobalClass.FiveClass.str_BetTime_Group[i] = _str_Param2_205[i];
        }
        for (var i = 0; i < 5; i++){
            this.switchLabelColor(this.mPanel.Go_BetCountLabel.getChildAt(i),true);
        }

        this.TimeRestart(true);
        for (var i = 0; i < 5; i++){
            this.mPanel.Go_BetCountLabel.getChildAt(i).text = "0";
            this.mPanel.Go_AllCountLabel.getChildAt(i).text = "0";
        }
        this.StartCloseLottery();
    }
    private on206_event(event: egret.Event): void {
        console.log("on206_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        GlobalClass.FiveClass.str_WinCount = str_Param[2];
        GlobalClass.FiveClass.str_MyCount = str_Param[3];
        if (GlobalClass.FiveClass.str_WinCount != "0" ){
            if (GlobalClass.FiveClass.str_LotteryPocker_Color != "4"){
                this.mPanel.Go_BetCountLabel.getChildAt(Number(GlobalClass.FiveClass.str_LotteryPocker_Color)).text = GlobalClass.FiveClass.str_WinCount;
            }
            else if (GlobalClass.FiveClass.str_LotteryPocker_Color == "4"){
                var num0  = Number(this.mPanel.Go_BetCountLabel.getChildAt(0).text);
                var num1  = Number(this.mPanel.Go_BetCountLabel.getChildAt(1).text);
                var num2  = Number(this.mPanel.Go_BetCountLabel.getChildAt(2).text);
                var num3  = Number(this.mPanel.Go_BetCountLabel.getChildAt(3).text);
                this.mPanel.Go_BetCountLabel.getChildAt(4).text = (Number(GlobalClass.FiveClass.str_WinCount) - num0 - num1-num2-num3)+"";
            }
            this.showWin();
            this.invoke(0.1,this.AddMyCount,this);
        }else{
            console.log("没中奖");
        }
    }
    private on207_event(event: egret.Event): void {
        console.log("on207_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        GlobalClass.FiveClass.str_QuitMsg = str_Param[2];
        if (GlobalClass.FiveClass.str_QuitMsg == "0"){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1086));
         }else if (GlobalClass.FiveClass.str_QuitMsg == "1"){
            KFSceneManager.getInstance().replaceScene(SceneName.Hall);
         }
    }

    private on208_event(event: egret.Event): void {
        console.log("on208_event");
        
        var msg2: MessageStruct = <MessageStruct>event.data;
        var datastr = msg2.getDataStr();
        var str_Param = datastr.split("%");
         var msg = str_Param[2];
        if (msg == null)
            return;
        
        this.disableBut(this.mPanel.Btn_Receive);
        // //console.logError(msg);
        // //拆分数据类型
        var allStr = msg.split('#');
        var length = allStr.length;
        var rakingStr = new Array(length);
        for (var i = 0; i < length; i++)
        {
            rakingStr[i] = allStr[i].split(',');
        }
        length = rakingStr.length;
        if (length <= 1)
            return;
        var _type = 0;
        var _raking = 0;

        this.rankListArr = new Array(2);
        for (var i = 0; i < length; i++)
        {
            this.rankListArr[i] = [];
            var obj = new Object();
            _type = Number(rakingStr[i][0]) - 1;

            if(_type==0){
                this.mPanel.Label_MyRanklistInfo0.visible = false;
            }else if(_type==1){
                this.mPanel.Label_MyRanklistInfo1.visible = false;
            }

            _raking = Number(rakingStr[i][1]);
            obj["rank"] = _raking;
            obj["NickName"] =  rakingStr[i][2];
            obj["Count"] = rakingStr[i][3];
            if (_type == 1)
            {
                if (GlobalClass.UserInfo.str_UserNickname == rakingStr[i][2]+"")
                {
                    if (_raking < 4)
                    {
                        if (rakingStr[i][4] == "1")
                        {
                            this.mPanel.Btn_Receive.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1089);
                            this.disableBut(this.mPanel.Btn_Receive);
                        }
                        else
                        {
                            this.mPanel.Btn_Receive.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1093);
                            this.enableBut(this.mPanel.Btn_Receive);
                        }
                    }
                }
            }
            this.rankListArr[_type].push(obj);
        }
        this.Toggle_Ranklist0Click();

        var collection1 = new eui.ArrayCollection();
        collection1.source = this.rankListArr[0];
        this.mPanel.Ranklist0.dataProvider = collection1;

        var collection2 = new eui.ArrayCollection();
        collection2.source = this.rankListArr[1];
        this.mPanel.Ranklist1.dataProvider = collection2;
    }
    private on209_event(event: egret.Event): void {
        console.log("on209_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        switch (str_Param[2])
        {
        //209%-1%0%0
            case "0"://成功
                var i = Number(str_Param[3]);
                if (i > 0)
                {
                    GlobalClass.FiveClass.str_MyCount = this.mPanel.Label_MyCount.text;//同步一下数据
                    var text = LocalizationMgr.getText(TipTexts.A1087)+ i + LocalizationMgr.getText(TipTexts.A1088);
                    KFControllerMgr.showTips(text);
                    GlobalClass.FiveClass.str_MyCount = (Number(GlobalClass.FiveClass.str_MyCount) + i)+"";
                    this.invoke(0.1,this.AddMyCount,this);
                    this.enableBut(this.mPanel.Btn_Receive);
                    this.mPanel.Btn_Receive.getChildAt(1).text = "已领取";
                }
                else
                {
                    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1090));
                }
                break;
            case "1"://失败
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1091));
                break;
            case "2"://已领取
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1091));
                break;
            default:
                var text = LocalizationMgr.getText(TipTexts.A1010) + str_Param[2];
                KFControllerMgr.showTips(text);
                break;
        }
    }
    private on210_event(event: egret.Event): void {
        console.log("on210_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        var _str_Param_210 = str_Param[2].split(';' );
        var length = _str_Param_210.length;
        for (var i = 0; i < length; i++)
        {
            var _str = _str_Param_210[i].split(',');
            if (_str.length > 1)
            {
                this.mPanel.Go_AllCountLabel.getChildAt(i).text = _str[1];
            }
        }
    }
	
    protected onReady() {
        this.mPanel.Btn_MyBank.visible = GlobalClass.SDKType.bShowBank2;
        this.mPanel.Btn_ClubDole.visible = GlobalClass.SDKType.bShowClub2;

        this.mPanel.HelpPanel.visible =false;
        this.mPanel.RanklingPanel.visible =false;
        this.mPanel.NetDelayPanel.visible =false;
        this.mPanel.Go_WinInfo.visible =false;

        this.mPanel.HelpPanel.touchEnabled =false;
        this.mPanel.RanklingPanel.touchEnabled =false;
        this.mPanel.NetDelayPanel.touchEnabled =false;
        this.mPanel.Go_WinInfo.touchEnabled =false;

        this.mPanel.Ranklist0.itemRenderer = WXRankItem;
        this.mPanel.Ranklist1.itemRenderer = WXRankAllItem;

        this.mPanel.FivePanel.setChildIndex(this.mPanel.ResultGroup,4);
        
        this.switchGirlImg();


        AnimationMgr.getInstance().loadSkeleton(()=>{
            // this.invoke(3,this.hideWin,this);
            // this.StarNumAni();
            this.initBorderAni();
        },this);
    }

    private spriteDisplay;
    private porkerDisplay;
    private porkerAniIsload = false;
    private initBorderAni(){
        this.spriteDisplay = AnimationMgr.getInstance().getSkeleton(skeletonType.Wxhh_kuang_1,160,310);
        this.mPanel.FivePanel.addChild(this.spriteDisplay.display);

        this.porkerDisplay = AnimationMgr.getInstance().getSkeleton(skeletonType.Wxhh_kuang_2,415,478);
        this.mPanel.FivePanel.addChild(this.porkerDisplay.display);
        
        this.OriSprite_PokerBorderX = 415;
        this.spriteDisplay.animation.play();
        this.porkerDisplay.animation.play();

        this.spriteDisplay.display.visible = false;
        this.porkerDisplay.display.visible = false;
        
        
        this.porkerAniIsload = true;
    }

    private playspriteAni(){
        this.spriteDisplay.display.visible = true;
        // this.spriteDisplay.animation.play();
    }
    private hidespriteAni(){
        // this.spriteDisplay.animation.stop();
        this.spriteDisplay.display.visible = false;
    }
    private playPorkerAni(index){
        this.porkerDisplay.display.visible = true;
        // this.porkerDisplay.animation.play();
        this.porkerDisplay.display.x = this.OriSprite_PokerBorderX+this.SpriteDel*index;
    }
    private hidePorkerAni(){
        // this.porkerDisplay.animation.stop();
        this.porkerDisplay.display.visible = false;
    }

    protected destroy(){
        if(this.numDisplay!=null){
            dragonBones.WorldClock.clock.remove(this.numDisplay);
            this.mPanel.FivePanel.removeChild(this.numDisplay.display);
        }
        if(this.winDisplay != null){
            dragonBones.WorldClock.clock.remove(this.winDisplay);
            this.mPanel.Go_WinInfo.removeChild(this.winDisplay.display);
        }
        this.testingNet = false;
        this.numDisplay = null;
        this.winDisplay = null;
        this.isDestoryed = true;
        AnimationMgr.getInstance().unloadSkeleton();
        AnimationMgr.getInstance().unloadwxAni();

        super.destroy();
    }

    private showWin(){
        SoundMgr.Instance.playWinEffect();
        this.winDisplay = AnimationMgr.getInstance().getSkeleton(skeletonType.Wxhh_win,120,-30,true);
        this.mPanel.Go_WinInfo.addChildAt(this.winDisplay.display);
        this.mPanel.FivePanel.setChildIndex(this.mPanel.Go_WinInfo,110);
        this.winDisplay.addEventListener( dragonBones.AnimationEvent.LOOP_COMPLETE, ()=>{
                this.mPanel.Label_WinCount.text = CommonFuc.stringDivide(GlobalClass.FiveClass.str_WinCount) ;
                this.mPanel.Label_WinCount.visible = true;
            },this);
        this.winDisplay.animation.play("Wxhh_win",1);
        
        this.mPanel.Go_WinInfo.visible = true;
        this.mPanel.Label_WinCount.visible = false;
    }



    private numDisplay;
    //播放倒计时
    private StarNumAni(){
        if(this.isDestoryed){
            return;
        }
        this.numDisplay = AnimationMgr.getInstance().getSkeleton(skeletonType.Wxhh_TimeCountDown,160,280);
            this.mPanel.FivePanel.addChild(this.numDisplay.display);
            this.numDisplay.display.scaleX = 0.5;
            this.numDisplay.display.scaleY = 0.5;
        if(this.numDisplay!=null){
            this.numDisplay.display.visible = true;
            this.numDisplay.animation.play();
            this.numDisplay.addEventListener( dragonBones.AnimationEvent.LOOP_COMPLETE, ()=>{
                dragonBones.WorldClock.clock.remove(this.numDisplay);
                this.mPanel.FivePanel.removeChild(this.numDisplay.display);
                this.numDisplay = null;
            },this);
        }
    }

    private hideWin(){
        if(this.winDisplay != null){
            this.mPanel.Go_WinInfo.removeChild(this.winDisplay.display);
            this.winDisplay = null;
            this.mPanel.Go_WinInfo.visible = false;
        }
    }

    private enterFrameHandler(){
        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;
        var pass = now - time;
        this.timeOnEnterFrame = egret.getTimer();
        GlobalClass.ServerInfo.f_NetDelayTime += pass;
    }

    private switchGirlImg(){
        this.mPanel.Sprite_LotteryResult.source = RES.getRes("Five_girl"+Math.floor(Math.random() * (6)));
    }

    private spriteTurnBack(cb:Function,thisObj:any){
         egret.Tween.get(this.mPanel.ResultGroup).to({scaleX : 0},this.openLotteryInterval,egret.Ease.sineIn).call(function (){
            if(cb!=null){
                cb.call(thisObj);
            }
		},this);
    }

    private spriteTurnFront(cb?:Function,thisObj?:any){
         egret.Tween.get(this.mPanel.ResultGroup).to({scaleX : 1},this.openLotteryInterval,egret.Ease.sineInOut).call(function (){
             if(cb!=null){
                 cb.call(thisObj);
            }
		},this);
    }

    protected onShow(){
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.GET_CONFIG,"");

        this.testingNet = true;
        this.TestNet();

        this.mPanel.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
        this.timeOnEnterFrame = egret.getTimer();
        
        this.mPanel.Label_LotteryNum0.visible = false;
        this.mPanel.Label_LotteryNum1.visible = false;
        this.mPanel.Sprite_LotteryColor0.visible = false;
        this.mPanel.Sprite_LotteryColor1.visible = false;
        this.mPanel.Btn_Receive.visible = false;

        AnimationMgr.getInstance().loadwxAni(()=>{
            // GlobalClass.FiveClass.str_LotteryNum = "1";
            // GlobalClass.FiveClass.str_LotteryPocker_Color = "4";
            // this.StartOpenLottery();
            // this.Five_InitSet();

            this.aniIsReady = true;
        },this);
        GlobalClass.FiveClass.isFirstInitSet = true;
    }
    
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_MyLog,egret.TouchEvent.TOUCH_END,this.Btn_MyLogClick,this);
        this.AddClickEvent(this.mPanel.Btn_History,egret.TouchEvent.TOUCH_END,this.Btn_HistoryClick,this);
        this.AddClickEvent(this.mPanel.Btn_Help,egret.TouchEvent.TOUCH_END,this.Btn_HelpClick,this,0.5,false);
        this.AddClickEvent(this.mPanel.Btn_Pay,egret.TouchEvent.TOUCH_END,this.Btn_PayClick,this);
        this.AddClickEvent(this.mPanel.Btn_QuitFive,egret.TouchEvent.TOUCH_END,this.Btn_QuitFiveClick,this);

        this.AddClickEvent(this.mPanel.Btn_MyBank,egret.TouchEvent.TOUCH_END,this.Btn_MyBankClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClubDole,egret.TouchEvent.TOUCH_END,this.Btn_ClubDoleClick,this);
        this.AddClickEvent(this.mPanel.Btn_Receive,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveClick,this);

        this.AddClickEvent(this.mPanel.Btn_closeHelp,egret.TouchEvent.TOUCH_END,this.Btn_closeHelpClick,this);
        this.AddClickEvent(this.mPanel.Btn_closeRank,egret.TouchEvent.TOUCH_END,this.Btn_closeRankClick,this);
        this.AddClickEvent(this.mPanel.Btn_ranking,egret.TouchEvent.TOUCH_END,this.Btn_rankingClick,this);
        
        this.AddClickEvent(this.mPanel.Toggle_Ranklist0,egret.TouchEvent.CHANGE,this.Toggle_Ranklist0Click,this);
        this.AddClickEvent(this.mPanel.Toggle_Ranklist1,egret.TouchEvent.CHANGE,this.Toggle_Ranklist1Click,this);

        for(var i=0;i<3;i++){
            this.AddClickEvent(this.mPanel.Go_CountToggle.getChildAt(i),egret.TouchEvent.CHANGE,this.CountToggle,this);
        }

        for(var i=0;i<5;i++){
            this.AddClickEvent(this.mPanel.Go_BetButton.getChildAt(i),egret.TouchEvent.TOUCH_END,this.Btn_betClick,this,0);
        }
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_MyLog,egret.TouchEvent.TOUCH_END,this.Btn_MyLogClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_History,egret.TouchEvent.TOUCH_END,this.Btn_HistoryClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Help,egret.TouchEvent.TOUCH_END,this.Btn_HelpClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Pay,egret.TouchEvent.TOUCH_END,this.Btn_PayClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_QuitFive,egret.TouchEvent.TOUCH_END,this.Btn_QuitFiveClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_MyBank,egret.TouchEvent.TOUCH_END,this.Btn_MyBankClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClubDole,egret.TouchEvent.TOUCH_END,this.Btn_ClubDoleClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Receive,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_closeHelp,egret.TouchEvent.TOUCH_END,this.Btn_closeHelpClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_closeRank,egret.TouchEvent.TOUCH_END,this.Btn_closeRankClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ranking,egret.TouchEvent.TOUCH_END,this.Btn_rankingClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_Ranklist0,egret.TouchEvent.CHANGE,this.Toggle_Ranklist0Click,this);
        this.RemoveClickEvent(this.mPanel.Toggle_Ranklist1,egret.TouchEvent.CHANGE,this.Toggle_Ranklist1Click,this);

        for(var i=0;i<3;i++){
            this.RemoveClickEvent(this.mPanel.Go_CountToggle.getChildAt(i),egret.TouchEvent.TOUCH_END,this.CountToggle,this);
        }
        for(var i=0;i<5;i++){
            this.RemoveClickEvent(this.mPanel.Go_BetButton.getChildAt(i),egret.TouchEvent.TOUCH_END,this.Btn_betClick,this);
        }
    }

    private Btn_betClick(event:egret.Event){
        SoundMgr.Instance.playEffect(SoundMgr.betEffect);
        var target = <eui.RadioButton>event.target;
        this.showAddCount(target.name);
        var js = {PokerID: target.name,BetID:GlobalClass.FiveClass.str_BetID};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.BET_POKER,JSON.stringify(js));
    }

    private AddCountOriX = 420;
    private showAddCount(index){
        var lable = new eui.Label("+"+GlobalClass.FiveClass.str_BetCount);
        lable.size = 22;
        lable.textColor = 0xFFF04C;
        lable.anchorOffsetX = lable.width/2;
        lable.anchorOffsetY = lable.height/2;
        lable.x = this.AddCountOriX+92*Number(index);
        lable.y = 420;
        lable.visible = true;
        this.mPanel.addChild(lable);
        egret.Tween.get(lable).to({y:410,scaleX:1.4,scaleY:1.4},350).to({y:405,scaleX:1.28,scaleY:1.28},150).call(function (){
            this.mPanel.removeChild(lable);
		},this);
    }

    private CountToggle(event:egret.Event){
        var target = <eui.RadioButton>event.target;
        var id = Number(target.name);
        this.CountChose(id);
    }

    private CountChose(index:number){

        this.mPanel.Go_CountToggle.getChildAt(index).selected = true;
        GlobalClass.FiveClass.str_BetCount = GlobalClass.FiveClass.str_Count_Group[index];//分数
        GlobalClass.FiveClass.str_BetID = index+"";//ID号
    }

    private Toggle_Ranklist0Click(){
        this.mPanel.Label_RanklistPanel0.visible = false;
        this.mPanel.Label_RanklistPanel1.visible = false;
        this.mPanel.Label_RanklistPanel0.visible = true;
        this.mPanel.Btn_Receive.visible = false;
    }
    private Toggle_Ranklist1Click(){
        this.mPanel.Label_RanklistPanel0.visible = false;
        this.mPanel.Label_RanklistPanel1.visible = false;
        this.mPanel.Label_RanklistPanel1.visible = true;
        this.mPanel.Btn_Receive.visible = true;
    }
    private Btn_ReceiveClick(){
        console.log("Btn_ReceiveClick");
        var js = {KEY: "2"};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.TOP_AWARD,JSON.stringify(js));
    }
    private Btn_rankingClick(){
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.GET_TOPLIST,"");
        this.mPanel.RanklingPanel.visible = true;
    }
    private Btn_closeHelpClick(){this.mPanel.HelpPanel.visible = false;}
    private Btn_closeRankClick(){
        this.mPanel.RanklingPanel.visible = false;
    }
    private Btn_MyLogClick(){
        KFControllerMgr.getInstance().getCtl(PanelName.WXMylogPanel).show();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.wxhh_myrecord);
    }
    private Btn_HistoryClick(){
        if(GlobalClass.TaskClass.str_VIPStatus!="1"){//不是vip
             KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1092),0,2,()=>{
                 KFControllerMgr.getCtl(PanelName.PropshopPanel).setToggleType(2).show();
             });
		}else{
            KFControllerMgr.getInstance().getCtl(PanelName.WXHistoryPanel).show();
        }
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.wxhh_histroyrecord);
    }
    private Btn_HelpClick(){
        SoundMgr.Instance.playEffect(SoundMgr.helpEffect);
        this.mPanel.HelpPanel.visible = true;
    }
    private Btn_PayClick(){
        GlobalClass.UserInfo.str_Hall_totalScore = this.mPanel.Label_MyCount.text;
        KFControllerMgr.getInstance().getCtl(PanelName.PropshopPanel).show();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.show_shop,"3","1");
    }
    private UIP_LnningControlClick(){}
    private Btn_MyBankClick(){
        KFControllerMgr.getInstance().getCtl(PanelName.BankPanel).show();
    }
    private Btn_ClubDoleClick(){
        if (Number(GlobalClass.ClubClass.str_ClubMsgRet) <= 0)
        {
             KFControllerMgr.showTips("请先加入公会",0,2,()=>{
                KFControllerMgr.getCtl(PanelName.ClubPanel).show();
            }); 
            return;
        }
        KFControllerMgr.getInstance().getCtl(PanelName.ClubDolePanel).show();
    }
    private Btn_QuitFiveClick(){
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.EXIT_ROOM,"");
    }

     private UpdateLabel_Inning(){
        if (GlobalClass.FiveClass.str_Inning_Group != null&&GlobalClass.FiveClass.str_Inning_Group.length>0)
        {
            for (var i = 0; i < 5; i++)
            {
                if (this.LnningType == 1)
                {
                    
                    var a = (Number(GlobalClass.FiveClass.str_Inning_Group[i+1]) / Number(GlobalClass.FiveClass.str_Inning_Group[0])) * 100;
                    this.mPanel.LabelInningGroup.getChildAt(i).text = a.toFixed(2)+"%";
                    this.mPanel.LabelInningGroup.getChildAt(i).size = 12;
                }
                else
                {
                    this.mPanel.LabelInningGroup.getChildAt(i).text =  GlobalClass.FiveClass.str_Inning_Group[i+1];
                    this.mPanel.LabelInningGroup.getChildAt(i).size = 14;
                }
            }
			if (this.LnningType == 1)
			{
                this.mPanel.LnningControl.setDataNum("100%");
			}
			else{
                this.mPanel.LnningControl.setDataNum(GlobalClass.FiveClass.str_Inning_Group[0]);
			}
        }
    }


    private Five_InitSet(){
        this.UpdateLotteryInfo();
        this.mPanel.Label_MyCount.text = GlobalClass.FiveClass.str_MyCount;
        this.CountChose(0);



        if (GlobalClass.FiveClass.str_BetTime_Group[0] == "0")
        {
            this.mPanel.Sprite_LotteryResult.spriteName = "Five_poker_bg3";
            for (var i = 0; i < 5; i++)
            {
                if (i != Number(GlobalClass.FiveClass.str_LotteryPocker_Color) && GlobalClass.FiveClass.str_LotteryPocker_Color != "4")
                {
                     this.switchLabelColor(this.mPanel.Go_BetCountLabel.getChildAt(i),false);
                }
            }

            this.createPoker();
        }
        GlobalClass.FiveClass.isFirstInitSet = false;
    }

    private getPokerPosx(j:number):number{
        return this.startx + (j * 65);
    }   

    private getPokerPosY(i:number):number{
       return this.starty + (i * 31);
    }

    private UpdateLotteryInfo(){
        this.UpdateLabel_Inning();
       this.clearList();
       
        var _mod = GlobalClass.FiveClass.str_LotteryRecord_Group.length % 8;
        var _division = Math.floor(GlobalClass.FiveClass.str_LotteryRecord_Group.length / 8);
        for (var i = 0; i < _division; i++)
        {
            for (var j = 0; j < 8; j++)
            {
                var posx = this.getPokerPosx(j);
                var posy = this.getPokerPosY(i);
                var imgName = "Five_poker_" + GlobalClass.FiveClass.str_LotteryRecord_Group[i * 8 + j];
                var img = new eui.Image(RES.getRes(imgName));
                this.LotteryRecordList.push(img);
                img.x = posx;
                img.y = posy;
                this.mPanel.porkerPanel.addChild(img);

                if (_mod == 0 && i == _division - 1 && j == 7 && GlobalClass.FiveClass.str_BetTime_Group[0] == "0" && GlobalClass.FiveClass.isFirstInitSet == false)
                {
                    img.visible = false;
                }
            }
        }
        for (var i = 0; i < _mod; i++)
        {
            var posx = this.getPokerPosx(i);
            var posy = this.getPokerPosY(_division);
            var imgName = "Five_poker_" + GlobalClass.FiveClass.str_LotteryRecord_Group[_division * 8 + i];
            var img = new eui.Image(RES.getRes(imgName));
            this.LotteryRecordList.push(img);
            img.x = posx;
            img.y = posy;
            this.mPanel.porkerPanel.addChild(img);

            if (i == _mod - 1 && GlobalClass.FiveClass.str_BetTime_Group[0] == "0" && GlobalClass.FiveClass.isFirstInitSet == false)
            {
                img.visible = false;
            }
        }

        if (GlobalClass.FiveClass.str_LotteryPocker_Color != null && GlobalClass.FiveClass.str_LotteryPocker_Color != "")
        {
            var ss = Number(GlobalClass.FiveClass.str_LotteryPocker_Color);
            if(this.porkerAniIsload){
                if(GlobalClass.FiveClass.str_BetTime_Group[0] == "0"){
                    this.playPorkerAni(Number(GlobalClass.FiveClass.str_LotteryPocker_Color));
                    this.playspriteAni();
                }
            }
            if (GlobalClass.FiveClass.isFirstInitSet == false)
            {
                if(this.aniIsReady){
                    this.StartOpenLottery();
                }
                
            }
        }
        if (GlobalClass.FiveClass.str_BetTime_Group[1] != "0")
        {
			this.TimeRestart(false);
        }

    }

    private isRestart:boolean = false;
    private TimeRestart(restart:boolean){
        this.isRestart = restart;
        if (this.mPanel.Go_WinInfo.visible == true)
        {
            this.hideWin();
        }

        if (GlobalClass.FiveClass.str_BetTime_Group[0] == "0")
        {
            this.mPanel.Label_time.text = GlobalClass.FiveClass.str_BetTime_Group[1];
            this.mPanel.Go_Time.getChildAt(0).source = RES.getRes("Five_time_jssj");
            this.enableBut( this.mPanel.Btn_MyBank);
            this.enableBut( this.mPanel.Btn_ClubDole);
            for (var i = 0; i < 5; i++)
            {
                var but = this.mPanel.Go_BetButton.getChildAt(i);
                this.disableBut(but);
            }
        }
        else
        {
            this.mPanel.Label_time.text = GlobalClass.FiveClass.str_BetTime_Group[0];
            this.mPanel.Go_Time.getChildAt(0).source = RES.getRes("Five_time_xzsj");
            this.disableBut( this.mPanel.Btn_MyBank);
            this.disableBut( this.mPanel.Btn_ClubDole);
            for (var i = 0; i < 5; i++)
            {
                var but = this.mPanel.Go_BetButton.getChildAt(i);
                this.enableBut(but);
            }
            if(this.porkerAniIsload){
                this.hidePorkerAni();
                this.hidespriteAni();
            }
        }
        if(!this.countDownBegin){
            this.countDownBegin = true;
             this.invoke(1,this.Timeinfo,this);
        }
       
    }
    private countDownBegin = false;

    private Timeinfo(){
        if(this.isDestoryed){
            return;
        }
        this.mPanel.Label_time.text = (Number(this.mPanel.Label_time.text) - 1)+"";
        if (this.mPanel.Label_time.text == "0")
        {
            for (var i = 0; i < 5; i++){
                var but = this.mPanel.Go_BetButton.getChildAt(i);
                this.disableBut(but);
            }
            this.countDownBegin = false;
        }else{
            this.invoke(1,this.Timeinfo,this);
        }
		if(this.mPanel.Label_time.text == "3"&&GlobalClass.FiveClass.str_BetTime_Group[0] != "0"){
			this.StarNumAni();
		}
    }

    private StartOpenLottery(){
        SoundMgr.Instance.playOpenEffect();
        var a = Number(GlobalClass.FiveClass.str_LotteryPocker_Color)+2;
        if (GlobalClass.FiveClass.str_LotteryPocker_Color == "4" && GlobalClass.FiveClass.str_LotteryNum == "2"){
            a++;
        }
        if(this.resultDiamond !=null){
            this.mPanel.FivePanel.removeChild(this.resultDiamond);
            this.resultDiamond = null;
        }
        this.resultDiamond = AnimationMgr.getInstance().getAnimation(a,this.DiamondOrix,this.DiamondOriy,0.7);
        this.mPanel.FivePanel.addChildAt(this.resultDiamond,3);
         egret.Tween.get(this.resultDiamond).to({x : this.DiamondOrix+60},this.openLotteryInterval,egret.Ease.sineInOut).call(function (){
            this.mPanel.FivePanel.setChildIndex(this.resultDiamond,99);
            this.OpenLottery();
		},this)
        this.spriteTurnBack(()=>{
            // this.OpenLottery();
        },this);
    }

    private OpenLottery(){

       this.createPoker();

        this.showDiamond();
    }

    private createPoker(){
         this.mPanel.Sprite_LotteryResult.source = RES.getRes("Five_poker_bg3");
        this.mPanel.Label_LotteryNum0.text = GlobalClass.FiveClass.str_LotteryNum;
        this.mPanel.Label_LotteryNum1.text = GlobalClass.FiveClass.str_LotteryNum;
        if (GlobalClass.FiveClass.str_LotteryPocker_Color == "4" && GlobalClass.FiveClass.str_LotteryNum == "2"){
            this.mPanel.Sprite_LotteryColor0.source = RES.getRes("Five_poker_" + (Number(GlobalClass.FiveClass.str_LotteryPocker_Color) + 1));
            this.mPanel.Sprite_LotteryColor1.source = RES.getRes("Five_poker_" + (Number(GlobalClass.FiveClass.str_LotteryPocker_Color) + 1));
        } else if (GlobalClass.FiveClass.str_LotteryPocker_Color == "4" && GlobalClass.FiveClass.str_LotteryNum == "1"){
            this.mPanel.Sprite_LotteryColor0.source = RES.getRes("Five_poker_" + (Number(GlobalClass.FiveClass.str_LotteryPocker_Color)));
            this.mPanel.Sprite_LotteryColor1.source = RES.getRes("Five_poker_" + (Number(GlobalClass.FiveClass.str_LotteryPocker_Color)));
        }else{
            this.mPanel.Sprite_LotteryColor0.source = RES.getRes("Five_poker_" + GlobalClass.FiveClass.str_LotteryPocker_Color);
            this.mPanel.Sprite_LotteryColor1.source = RES.getRes("Five_poker_" + GlobalClass.FiveClass.str_LotteryPocker_Color);
        }
            this.mPanel.Label_LotteryNum0.visible = true;
            this.mPanel.Label_LotteryNum1.visible = true;
            this.mPanel.Sprite_LotteryColor0.visible = true;
            this.mPanel.Sprite_LotteryColor1.visible = true;
        if (GlobalClass.FiveClass.str_LotteryPocker_Color == "0" || GlobalClass.FiveClass.str_LotteryPocker_Color == "2"){
            this.mPanel.Label_LotteryNum0.textColor = 0x000000;
            this.mPanel.Label_LotteryNum1.textColor = 0x000000;
        }else if (GlobalClass.FiveClass.str_LotteryPocker_Color == "1" || GlobalClass.FiveClass.str_LotteryPocker_Color == "3"){
            this.mPanel.Label_LotteryNum0.textColor = 0x8D0505;
            this.mPanel.Label_LotteryNum1.textColor = 0x8D0505;
        }else{
            this.mPanel.Label_LotteryNum0.visible = false;
            this.mPanel.Label_LotteryNum1.visible = false;
        }
    }
    

    
    private showDiamond(){
        egret.Tween.get(this.resultDiamond).to({x : this.DiamondOrix},this.openLotteryInterval,egret.Ease.sineIn).call(function (){
            this.invoke(4,()=>{
                this.diamondMove();
            },this)
		},this);
        
        this.spriteTurnFront();
    }

    private diamondMove(){
        var a = this.LotteryRecordList[this.LotteryRecordList.length-1];
        var px = a.x;
        var py = a.y;
        var desx = (a.x - this.resultDiamond.x)*2/3+this.resultDiamond.x;
        var desy = (a.y - this.resultDiamond.y)*2/3+this.resultDiamond.y-this.resultDiamond.height/3;

        egret.Tween.get(this.resultDiamond).to({x : desx,y:desy,scaleX:1.05,scaleY:1.05},this.diamondMoveInterval,egret.Ease.sineIn).call(function (){
           if(!this.isDestoryed){
            // this.showBoom();
            // this.mPanel.FivePanel.removeChild(this.resultDiamond);
            // this.resultDiamond = null;
            this.diamondMoveNext();
           }
		},this);
    }

    private diamondMoveNext(){
        var a = this.LotteryRecordList[this.LotteryRecordList.length-1];
        var px = a.x;
        var py = a.y;
        egret.Tween.get(this.resultDiamond).to({x : px,y:py,scaleX:0.2,scaleY:0.2},this.diamondMoveInterval/3,egret.Ease.sineOut).call(function (){
           if(!this.isDestoryed){
            this.showBoom();
            this.mPanel.FivePanel.removeChild(this.resultDiamond);
            this.resultDiamond = null;
           }
		},this);
    }

    private showBoom(){
        var a = this.LotteryRecordList[this.LotteryRecordList.length-1];
        var px = a.x;
        var py = a.y;
        var boom = AnimationMgr.getInstance().getAnimation(aniType.boom,px,py);
        boom.anchorOffsetX = boom.width*3/4;
        boom.anchorOffsetY = boom.height*3/4;
        this.mPanel.FivePanel.addChildAt(boom,99);
        boom.addEventListener(egret.Event.COMPLETE, function (){
				boom.parent.removeChild(boom);
        }, this);
        boom.addEventListener(egret.Event.LOOP_COMPLETE, function (){
				boom.parent.removeChild(boom);
        	}, this);
        boom.play();
        
        this.invoke(0.4,this.diamondFade,this);
    }

    private diamondFade(){
        var img = this.LotteryRecordList[this.LotteryRecordList.length-1];
        img.alpha = 0.2;
        img.visible = true;
        egret.Tween.get(img).to({alpha: 1},700).call(function (){

		},this);
    }

    private StartCloseLottery(){
        this.spriteTurnBack(()=>{
            this.CloseLottery();
        },this);
    }
    private CloseLottery(){
        this.mPanel.Label_LotteryNum0.visible = false;
        this.mPanel.Label_LotteryNum1.visible = false;
        this.mPanel.Sprite_LotteryColor0.visible = false;
        this.mPanel.Sprite_LotteryColor1.visible = false;
        this.switchGirlImg();
        this.spriteTurnFront();
    }

    private clearList(){
         if(this.LotteryRecordList.length>0){
            this.LotteryRecordList.forEach(ps=>{
                 ps.parent.removeChild(ps);
            });
            this.LotteryRecordList = [];
        }
    }

    private AddMyCount(){
        if (this.mPanel.Label_MyCount.text != GlobalClass.FiveClass.str_MyCount)
        {
            GlobalClass.FiveClass.int_AddMyCount = Math.floor((Number(GlobalClass.FiveClass.str_MyCount) - Number(this.mPanel.Label_MyCount.text)) / 2);
            this.mPanel.Label_MyCount.text = (Number(this.mPanel.Label_MyCount.text) + GlobalClass.FiveClass.int_AddMyCount)+"";
            if (Number(this.mPanel.Label_MyCount.text) > Number(GlobalClass.FiveClass.str_MyCount) || GlobalClass.FiveClass.int_AddMyCount < 10)
            {
                this.mPanel.Label_MyCount.text = GlobalClass.FiveClass.str_MyCount;
            }
        }
        if (this.mPanel.Label_MyCount.text != GlobalClass.FiveClass.str_MyCount)
        {
            this.invoke(0.1,this.AddMyCount,this);
        }
    }

    private switchLabelColor(obj:eui.Label,bright:boolean){
        if(bright){
            obj.textColor = 0xFF951C;
        }else{
            obj.textColor = 0x8C867F;
        }
        
    }
}