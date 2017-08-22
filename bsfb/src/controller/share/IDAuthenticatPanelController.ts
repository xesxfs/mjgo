/**
 *
 * @author 
 *
 */
class IDAuthenticatPanelController extends KFController{ 
    
	private cb:Function;
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.Hall.Msg_1022,];
	}
	
    protected onReady() {

    }

    public setCB(callback:Function,thisObj:any):any{
        this.cb = ()=>{
            callback.call(thisObj);
        };
        return this;
    }

    protected onShow(){//在界面上显示出来

    }
	
    private on1022_event(event: egret.Event): void {
        console.log("on1022_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        if(jsonData["ret"]==1){
            GlobalClass.HallClass.bIDSecurity_Binding = true;
            var age = jsonData["info"]["age"];
            if(age < 18) {
                GlobalClass.HallClass.bAgeLegal = false;
            }else{
                GlobalClass.HallClass.bAgeLegal = true;
            }
            if (GlobalClass.HallClass.bAgeLegal ) {
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1103));
                if(this.cb!=null){
                    this.cb();
                    this.cb = null;
                }
            }else{
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1101));
            }
            this.mPanel.hide();
        }else{
            GlobalClass.HallClass.bIDSecurity_Binding = false;
            KFControllerMgr.showTips(jsonData["info"]["desc"]);
        }
        NetEventMgr.getInstance().clientMsg(MsgID.Client.BindingIDMsg,"");
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
    }
    

    private Btn_CloseClick(){
        this.mPanel.hide();
    }

    private Btn_SureClick():void{
        var idNumber = this.mPanel.Label_number.text;
        var  name = this.mPanel.Label_name.text;
    
        if (idNumber=="" ||name=="") {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1104));
            return;
        }

        if(CommonFuc.getUTF8StrLen(name) > 12 || CommonFuc.isChn(name) == false) {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1105));
            return;
        }

        var js = { id: idNumber,name:name};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_1022,JSON.stringify(js));
    }

    
}