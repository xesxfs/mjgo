/**
 *
 * @author 
 *
 */
class PhoneVerificationCodePanelController extends KFController{ 
    private Timer:egret.Timer;
    private int_SendTime = 60;
    private int_SendTime_ori = 60;

	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.Hall.Msg_2301,
            MsgID.Hall.Msg_2302,];
	}
	
    protected onReady() {
        
    }

    protected onShow(){//在界面上显示出来
         this.mPanel.Label_number.text = GlobalClass.HallClass.str_BindingPhone;
         this.mPanel.Btn_GetCode.getChildAt(1).text =  LocalizationMgr.getText(TipTexts.A1035);
         this.initTimer();
    }
	
    private on2301_event(event: egret.Event): void {
        console.log("on2301_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
       if(jsonData["ret"]==1){
           KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1106));
       }else{
        //    this.ResendOver();
           KFControllerMgr.showTips(jsonData["desc"]);
       }
    }

    private Resend(){
        this.int_SendTime = this.int_SendTime_ori;
        this.disableBut(this.mPanel.Btn_GetCode);
        this.Timer.start();
    }

    private ResendOver(){
        this.enableBut(this.mPanel.Btn_GetCode);
        this.mPanel.Btn_GetCode.getChildAt(1).text =  LocalizationMgr.getText(TipTexts.A1035);
        this.int_SendTime = 0;
        this.Timer.reset();
    }

    private initTimer(){
        this.Timer = new egret.Timer(1000,60);
        this.Timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
            this.ResendOver();
        },this);
        this.Timer.addEventListener(egret.TimerEvent.TIMER,()=>{
            this.int_SendTime --;
            this.mPanel.Btn_GetCode.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1041)+"(" + this.int_SendTime + ")";
        },this);
    }

    private on2302_event(event: egret.Event): void {
        console.log("on2302_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
       if(jsonData["ret"]==1){
           KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1107));
           this.mPanel.hide();
       }else{
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1108));
       }
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_GetCode,egret.TouchEvent.TOUCH_END,this.Btn_GetCodeClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_GetCode,egret.TouchEvent.TOUCH_END,this.Btn_GetCodeClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
    }
    
    private Btn_GetCodeClick(){
        this.Resend();
        var js = {PhoneNumber: "123456"};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_2301,JSON.stringify(js));   
    }
    private Btn_SureClick(){
        var js = {code: this.mPanel.Input_identifying.text};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_2302,JSON.stringify(js));  
    }
    private Btn_CloseClick(){
        this.mPanel.hide();
    }
}