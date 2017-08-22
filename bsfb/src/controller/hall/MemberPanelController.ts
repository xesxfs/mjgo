/**
 *
 * @author 
 *
 */
class MemberPanelController extends KFController{ 
    private toggleType = 1;
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.Hall.SIGNIN_RECEIVE,
            MsgID.USER.GET_USERSIGN_INFO,
            MsgID.Hall.GET_VIPINFO,];
	}
	
    protected onReady() {
        for(let i=0;i<3;i++){
            this.mPanel.VIPPrices.getChildAt(i).visible = false;
        }
    }

    protected onShow(){//在界面上显示出来
        var js = {key: GlobalClass.GameInfoForConfig.UniqueSerial};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.GET_VIPINFO,JSON.stringify(js));
        if(this.toggleType==1){
            this.Toggle_VIPClick();
        }else{
            this.Toggle_SignClick();
        }
        this.refreshVIPPanel();
        GlobalClass.HallClass.isOpenSignInPanel = false;
    }

    private setToggle(type):any{
        this.toggleType = type;
        return this;
    }
	
    private on160_event(event: egret.Event): void {
        console.log("on160_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        var str0 = strArray[2].split( ";");
 
        var str_VIPID_Group = [];
        var str_VIPName_Group = [];
        var str_VIPPrice = [];
        var str_VIPType = [];

        str0.forEach(element => {
            if(element!=""){
                var _str_VIPinfo = element.split(",");
                str_VIPID_Group.push( _str_VIPinfo[0]);
                str_VIPName_Group.push( _str_VIPinfo[1]);
                str_VIPPrice.push( _str_VIPinfo[2]);
                str_VIPType.push( _str_VIPinfo[4]);
            }
        });
     
        GlobalClass.TaskClass.str_VIPInfo_Group = str0;
        GlobalClass.TaskClass.str_VIPID_Group = str_VIPID_Group;
        GlobalClass.TaskClass.str_VIPName_Group = str_VIPName_Group;
        GlobalClass.TaskClass.str_VIPPrice = str_VIPPrice;
        GlobalClass.TaskClass.str_VIPType = str_VIPType;

        this.Btn_VIPQuarterClick();
    }
    private on122_event(event: egret.Event): void {
        console.log("on122_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
         if (strArray[2] == "0") {
             WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.GET_USERSIGN_INFO,"");
            KFControllerMgr.showTips("签到成功!\r\n您已获得奖励!");
         }else if (strArray[2] == "4" ){
            KFControllerMgr.showTips("您不是VIP，无法领取每日奖励!");
         }
    }
    private on126_event(event: egret.Event): void {
        console.log("on126_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.UserInfo.str_Hall_isSignIn = strArray[2];   //是否已经领取（1表示已领取，0为未领取）
        GlobalClass.UserInfo.str_Hall_SignInDays = strArray[3]; //已连续签到的天数
        this.mPanel.Label_SignInInfo.text = LocalizationMgr.getText(TipTexts.A1113)+GlobalClass.UserInfo.str_UserNickname+LocalizationMgr.getText(TipTexts.A1114)+GlobalClass.UserInfo.str_Hall_SignInDays+LocalizationMgr.getText(TipTexts.A1115);
        this.refreshVIPPanel();
        this.refreshSignInPanel();
    }

    private refreshSignInPanel(){
        for(var i=0;i<7;i++){//只显示出灰色图
            this.mPanel.prizebgs.getChildAt(i).getChildAt(1).visible = false;
        }
        var a = GlobalClass.UserInfo.str_Hall_SignInDays;
        var b = GlobalClass.UserInfo.str_Hall_isSignIn;
        // GlobalClass.UserInfo.str_Hall_SignInDays = "6";
        if (GlobalClass.UserInfo.str_Hall_SignInDays != "0" && GlobalClass.UserInfo.str_Hall_SignInDays != "") {
            var len = Number(GlobalClass.UserInfo.str_Hall_SignInDays);
            for(var i=0;i<len;i++){
                this.mPanel.prizebgs.getChildAt(i).getChildAt(0).source = RES.getRes("Task_qiandaokuan01");//已过的天数显示橙色图
                this.mPanel.prizebgs.getChildAt(i).getChildAt(1).visible = true;
            }
        }
    var txt = LocalizationMgr.getText(TipTexts.A1113)+"[FFFF00]"+GlobalClass.UserInfo.str_UserNickname+"[-]"+LocalizationMgr.getText(TipTexts.A1114)+"[FFFF00]"+GlobalClass.UserInfo.str_Hall_SignInDays+"[-]"+LocalizationMgr.getText(TipTexts.A1115);
    this.mPanel.Label_SignInInfo.textFlow = CommonFuc.parseColorText(txt);

    //  this.mPanel.Label_SignInInfo.text = LocalizationMgr.getText(TipTexts.A1113)+GlobalClass.UserInfo.str_UserNickname+LocalizationMgr.getText(TipTexts.A1114)+GlobalClass.UserInfo.str_Hall_SignInDays+LocalizationMgr.getText(TipTexts.A1115);
     
     if(GlobalClass.UserInfo.str_Hall_isSignIn == "0") {
        var index = Number(GlobalClass.UserInfo.str_Hall_SignInDays);
        this.mPanel.prizebgs.getChildAt(index).getChildAt(0).source = RES.getRes("Task_qiandaokuan02");
        this.enableBut(this.mPanel.Btn_Receive);
     }else if  (GlobalClass.UserInfo.str_Hall_isSignIn == "1") {
        this.disableBut(this.mPanel.Btn_Receive);
     }

      for(let i=0;i<3;i++){
            this.mPanel.VIPPrices.getChildAt(0).visible = true;
        }
     this.mPanel.VIPPrices.getChildAt(0).textFlow = CommonFuc.parseColorText("[FFFF00]"+GlobalClass.TaskClass.str_VIPPrice[0] +"[-][F4A460]"+ "元/月[-]");
     this.mPanel.VIPPrices.getChildAt(1).textFlow = CommonFuc.parseColorText("[FFFF00]"+GlobalClass.TaskClass.str_VIPPrice[1] +"[-][F4A460]"+ "元/季[-]");
     this.mPanel.VIPPrices.getChildAt(2).textFlow = CommonFuc.parseColorText("[FFFF00]"+GlobalClass.TaskClass.str_VIPPrice[2] +"[-][F4A460]"+ "元/年[-]");
     
    
    }

    private refreshVIPPanel(){
        for(var i=0;i<7;i++){
            if (GlobalClass.UserInfo.str_Hall_SignIn_PrizeType[i] == "1"){
                this.mPanel.PrizePics.getChildAt(i).source = RES.getRes("Coin0"+i);
                this.mPanel.PrizeLabels.getChildAt(i).text = LocalizationMgr.getText(TipTexts.A1088)+GlobalClass.UserInfo.str_Hall_SignIn_PrizePrices[i];
            }else if(GlobalClass.UserInfo.str_Hall_SignIn_PrizeType[i] == "2"){
                if (GlobalClass.UserInfo.str_Hall_SignIn_PrizePrices[i] == "1"){
                    this.mPanel.PrizePics.getChildAt(i).source = RES.getRes("LoudSpeaker");
                    this.mPanel.PrizeLabels.getChildAt(i).text = LocalizationMgr.getText(TipTexts.A1111)+GlobalClass.UserInfo.str_Hall_SignIn_PrizeAmount[i];
             
                }else if (GlobalClass.UserInfo.str_Hall_SignIn_PrizePrices[i] == "2"){
                    this.mPanel.PrizePics.getChildAt(i).source = RES.getRes("LuckCard");
                    this.mPanel.PrizeLabels.getChildAt(i).text = LocalizationMgr.getText(TipTexts.A1112)+GlobalClass.UserInfo.str_Hall_SignIn_PrizeAmount[i];
                }
            }
        }
        for(let i=0;i<3;i++){
            this.mPanel.VIPPrices.getChildAt(i).visible = true;
        }
     this.mPanel.VIPPrices.getChildAt(0).textFlow = CommonFuc.parseColorText("[FFFF00]"+GlobalClass.TaskClass.str_VIPPrice[0] +"[-][F4A460]"+ "元/月[-]");
     this.mPanel.VIPPrices.getChildAt(1).textFlow = CommonFuc.parseColorText("[FFFF00]"+GlobalClass.TaskClass.str_VIPPrice[1] +"[-][F4A460]"+ "元/季[-]");
     this.mPanel.VIPPrices.getChildAt(2).textFlow = CommonFuc.parseColorText("[FFFF00]"+GlobalClass.TaskClass.str_VIPPrice[2] +"[-][F4A460]"+ "元/年[-]");
     
     if(GlobalClass.TaskClass.str_VIPStatus == "1") {
            var txt1 = "[F4A460]"+LocalizationMgr.getText(TipTexts.A1119)+"[-][FFFF00]"+GlobalClass.TaskClass.str_VIPDays+"[-][F4A460]"+LocalizationMgr.getText(TipTexts.A1121)+"[-]";
            this.mPanel.Label_VIPTimes.textFlow = CommonFuc.parseColorText(txt1);
            //   this.mPanel.Label_VIPTimes.textFlow = LocalizationMgr.getText(TipTexts.A1119)+ GlobalClass.TaskClass.str_VIPDays +LocalizationMgr.getText(TipTexts.A1121);
                this.mPanel.Btn_RenewVIP.visible = true;
                this.mPanel.Btn_BecomeVIP.visible =false;
        }else if (GlobalClass.TaskClass.str_VIPStatus == "0") {
            this.mPanel.Label_VIPTimes.textFlow = CommonFuc.parseColorText(LocalizationMgr.getText("[F4A460]马上成为VIP会员，领取尊贵特权![-]"));
            this.mPanel.Btn_RenewVIP.visible = false;
            this.mPanel.Btn_BecomeVIP.visible = true;
        }
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_Receive,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveClick,this);
        this.AddClickEvent(this.mPanel.Btn_RenewVIP,egret.TouchEvent.TOUCH_END,this.Btn_RenewVIPClick,this);
        this.AddClickEvent(this.mPanel.Btn_BecomeVIP,egret.TouchEvent.TOUCH_END,this.Btn_BecomeVIPClick,this);
        this.AddClickEvent(this.mPanel.Toggle_VIP,egret.TouchEvent.CHANGE,this.Toggle_VIPClick,this);
        this.AddClickEvent(this.mPanel.Toggle_Sign,egret.TouchEvent.CHANGE,this.Toggle_SignClick,this);

        this.AddClickEvent(this.mPanel.Btn_VIPYear,egret.TouchEvent.TOUCH_END,this.Btn_VIPYearClick,this);
        this.AddClickEvent(this.mPanel.Btn_VIPQuarter,egret.TouchEvent.TOUCH_END,this.Btn_VIPQuarterClick,this);
        this.AddClickEvent(this.mPanel.Btn_VIPMonth,egret.TouchEvent.TOUCH_END,this.Btn_VIPMonthClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Receive,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_VIP,egret.TouchEvent.TOUCH_END,this.Toggle_VIPClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_Sign,egret.TouchEvent.TOUCH_END,this.Toggle_SignClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Receive,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_RenewVIP,egret.TouchEvent.TOUCH_END,this.Btn_RenewVIPClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_VIPYear,egret.TouchEvent.TOUCH_END,this.Btn_VIPYearClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_VIPQuarter,egret.TouchEvent.TOUCH_END,this.Btn_VIPQuarterClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_VIPMonth,egret.TouchEvent.TOUCH_END,this.Btn_VIPMonthClick,this);
    }

    private Btn_VIPYearClick(){
        this.mPanel.Btn_VIPYear.selected = true;
        GlobalClass.TaskClass.str_VIPID = GlobalClass.TaskClass.str_VIPID_Group[2];                  
        GlobalClass.TaskClass.str_VIP_Price = GlobalClass.TaskClass.str_VIPPrice[2]; 
    }
    private Btn_VIPQuarterClick(){
        this.mPanel.Btn_VIPQuarter.selected = true;
        GlobalClass.TaskClass.str_VIPID = GlobalClass.TaskClass.str_VIPID_Group[1];                  
        GlobalClass.TaskClass.str_VIP_Price = GlobalClass.TaskClass.str_VIPPrice[1]; 
    }
    private Btn_VIPMonthClick(){
        this.mPanel.Btn_VIPMonth.selected = true;
        GlobalClass.TaskClass.str_VIPID = GlobalClass.TaskClass.str_VIPID_Group[0];                  
        GlobalClass.TaskClass.str_VIP_Price = GlobalClass.TaskClass.str_VIPPrice[0]; 
    }
    
    private Btn_RenewVIPClick(){
        GlobalClass.GameClass.isBuyVip = true;

        GlobalClass.GameClass.isBuyVip = true;

        KFControllerMgr.getCtl(PanelName.PayChoicePanel).show();
    }

    private Btn_BecomeVIPClick(){
        GlobalClass.GameClass.isBuyVip = true;

        KFControllerMgr.getCtl(PanelName.PayChoicePanel).show();
        
    }

    private Btn_ReceiveClick(){
         WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.SIGNIN_RECEIVE,"");
    }

    private Toggle_VIPClick(){
        this.mPanel.VIPPanel.visible = true;
        this.mPanel.SignInPanel.visible = false;
        this.mPanel.Toggle_VIP.selected = true;
        this.refreshVIPPanel();
    }
    private Toggle_SignClick(){
        this.mPanel.VIPPanel.visible = false;
        this.mPanel.SignInPanel.visible = true;
        this.mPanel.Toggle_Sign.selected = true;
        this.refreshSignInPanel();
    }

    private Btn_CloseClick(){
        this.mPanel.hide();
    }
    
}