/**
 *
 * @author 
 *
 */
class BindingPhonePanelController extends KFController{ 
    private int_SendTime_ori:number = 60;
	private int_SendTime:number;
    private bResetBankCode:boolean = false;
    private m_CallBack:Function = null;
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.Hall.SEND_BINDING_PHONENUMBER,
            MsgID.Hall.SEND_BINDING_CODE,
            MsgID.Hall.SEND_UNBINDING__PHONENUMBER,
            MsgID.Hall.SEND_UNBINDING_CODE,
            MsgID.Hall.SEND_BINDINGFail_CODE];
	}
	
    protected onReady() {
      
    }

    protected onShow(){
        // this.mPanel.show();
        this.int_SendTime = this.int_SendTime_ori;
        this.mPanel.Label_GetCode = <eui.Label>this.mPanel.Btn_GetCode.getChildAt(1);
        this.UpdateInfo();
        this.refreshView();
    }

    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_GetCode,egret.TouchEvent.TOUCH_END,this.Btn_GetCodeClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_GetCode,egret.TouchEvent.TOUCH_END,this.Btn_GetCodeClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }

    private Btn_GetCodeClick(){
        if(this.mPanel.Input_PhoneNum.text==""){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1013),3);
            return;
        }
        var js = { PhoneNumber: this.mPanel.Input_PhoneNum.text }; 
        if(GlobalClass.HallClass.str_BindingPhone == "0" || GlobalClass.HallClass.str_BindingPhone ==""){
             WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.SEND_BINDING_PHONENUMBER,JSON.stringify(js));
        }else{
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.SEND_UNBINDING__PHONENUMBER,JSON.stringify(js));
        }
        let from = KFSceneManager.getInstance().getRuningSceneName() == SceneName[SceneName.Hall] ? "hall" : "lhdb";
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.phone_getCode, from, this.mPanel.Input_PhoneNum.text);
        // this.on195_event(null);
    }
    private Btn_SureClick(){
        if(this.mPanel.Input_PhoneNum.text=="" || this.mPanel.Input_SecurityCode.text==""){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1012),3);
            return;
        }
        var js = { CheckCode: this.mPanel.Input_SecurityCode.text }; 
        let from = KFSceneManager.getInstance().getRuningSceneName() == SceneName[SceneName.Hall] ? "hall" : "lhdb";
        if(GlobalClass.HallClass.str_BindingPhone == "0" || GlobalClass.HallClass.str_BindingPhone ==""){
             WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.SEND_BINDING_CODE,JSON.stringify(js));
             StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.phone_bind, from, this.mPanel.Input_PhoneNum.text,"0");
        }else{
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.SEND_UNBINDING_CODE,JSON.stringify(js));
            StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.phone_bind, from, this.mPanel.Input_PhoneNum.text,"0");
        }
    }
    private Btn_CloseClick(){
        this.mPanel.hide();
        var a = GlobalClass.HallClass.isOpenSignInPanel;
        var b = GlobalClass.UserInfo.isNewbie;
        var c = GlobalClass.TaskClass.str_VIPStatus;
        var d = GlobalClass.UserInfo.str_Hall_isSignIn;
        if(GlobalClass.HallClass.isOpenSignInPanel && !GlobalClass.UserInfo.isNewbie && GlobalClass.TaskClass.str_VIPStatus == "1" && GlobalClass.UserInfo.str_Hall_isSignIn == "0"){
            
            KFControllerMgr.getCtl(PanelName.MemberPanel).setToggle(2).show();
        }
        if(this.m_CallBack!=null){
            this.m_CallBack();
            this.m_CallBack = null;
        }
    }

    public setCallBack(cbfun:Function){
        this.m_CallBack = cbfun;
    }

   
	
     private on191_event(event: egret.Event): void {
        console.log("on191_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
       
       if(strArray[0]!="0"){//验证码发送失败
           this.resendOver();
       }else{
           this.UpdateInfo();
       }
        KFControllerMgr.showTips(strArray[1],3);
       WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
    }

    private on192_event(event: egret.Event): void {
        console.log("on192_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if(strArray[0]== "0"){//绑定成功
            this.resendOver();
            this.mPanel.hide();
            this.UpdateInfo();
            GlobalClass.HallClass.str_BindingPhone = this.mPanel.Input_PhoneNum.text;
            if(KFSceneManager.getInstance().getRuningSceneName()=="HallScene"){
                KFControllerMgr.getCtl(PanelName.HallPanel).Hide_Sprite_Binding();
                NetEventMgr.getInstance().clientMsg(MsgID.Client.BindingPhoneMsg,"");
            }
            if(KFSceneManager.getInstance().getRuningSceneName()=="BSFBScene"){
            }
        }
        KFControllerMgr.showTips(strArray[1],3);
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
    }

    private on193_event(event: egret.Event): void {
        console.log("on193_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if(strArray[0]== "0"){
            this.UpdateInfo();
        }
        KFControllerMgr.showTips(strArray[1],3);
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
    }

    private on194_event(event: egret.Event): void {
        console.log("on194_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        KFControllerMgr.showTips(strArray[1],3);
        if(strArray[0]== "0"){
            this.UpdateInfo();
            this.mPanel.Input_PhoneNum.text = "";
            GlobalClass.HallClass.int_OpenBinding = 1;
            GlobalClass.HallClass.str_BindingPhone = "0";
            NetEventMgr.getInstance().clientMsg(MsgID.Client.BindingPhoneMsg,"");
            if(KFSceneManager.getInstance().getRuningSceneName()=="HallScene"){
                KFControllerMgr.getCtl(PanelName.HallPanel).Hide_Sprite_Binding();
            }
            this.mPanel.Input_SecurityCode.text = "";
            this.UpdateInfo();
            this.resendOver();
            this.mPanel.hide();
        }
        
    }

    private on195_event(event: egret.Event): void {
        console.log("on195_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = "0%验证码发送成功，请注意查收";
        var strArray = datastr.split("%");
        KFControllerMgr.showTips(strArray[1]);
        if(strArray[0]=="0"){
            this.resend();
        }
    }

    private resend(){
        this.int_SendTime = this.int_SendTime_ori;
        this.mPanel.Btn_GetCode.enabled = false;
        var mTimer = new egret.Timer(1000,1);
        mTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.resendLoop,this);
        mTimer.start();
    }

    private resendLoop(){
        this.int_SendTime = this.int_SendTime - 1;
        this.mPanel.Label_GetCode.text = LocalizationMgr.getText(TipTexts.A1041)+"（"+ this.int_SendTime+ "）";
        if(this.int_SendTime<=0){
            this.resendOver();
        }else{
            var mTimer = new egret.Timer(1000,1);
            mTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.resendLoop,this);
            mTimer.start();
        }
    }

    private resendOver(){
        this.mPanel.Btn_GetCode.enabled = true;
        this.mPanel.Label_GetCode.text = LocalizationMgr.getText(TipTexts.A1035);
        this.int_SendTime = 0;
    }

    private UpdateInfo(){
        if (GlobalClass.HallClass.str_BindingPhone == "0" || GlobalClass.HallClass.str_BindingPhone==""){
            if(KFSceneManager.getInstance().getRuningSceneName()=="HallScene"){
                KFControllerMgr.getCtl(PanelName.HallPanel).Hide_Sprite_Binding();
            }
            // this.mPanel.Btn_Sure.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1042);
            this.mPanel.Btn_Sure.getChildAt(2).source = RES.getRes("lijibangding");
            this.mPanel.Label_Tips.text = LocalizationMgr.getText(TipTexts.A1043);
            this.mPanel.Input_PhoneNum.enabled = true;
            this.mPanel.Label_Title.text = LocalizationMgr.getText(TipTexts.A1044);
        }else{
            if(KFSceneManager.getInstance().getRuningSceneName()=="HallScene"){
                KFControllerMgr.getCtl(PanelName.HallPanel).Hide_Sprite_Binding();
            }
            // this.mPanel.Btn_Sure.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1045);
            this.mPanel.Btn_Sure.getChildAt(2).source = RES.getRes("jiechubangding");
            this.mPanel.Label_Tips.text = LocalizationMgr.getText(TipTexts.A1046);
            this.mPanel.Input_PhoneNum.text = GlobalClass.HallClass.str_BindingPhone;
            this.mPanel.Input_PhoneNum.enabled = false;
            this.mPanel.Label_Title.text = LocalizationMgr.getText(TipTexts.A1047);
        }
    }

    private refreshView(){
        this.mPanel.Label_GetCode.text = LocalizationMgr.getText(TipTexts.A1035);
        this.mPanel.Input_PhoneNum.text = "";
        this.mPanel.Input_SecurityCode.text = "";
    }

    public setCB(cbFun:Function):any{
        this.m_CallBack = cbFun;
        return this;
    }
}