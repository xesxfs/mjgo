/**
 *
 * @author 
 *
 */
class LuckyPropsPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.USER.LOGIN,];
	}
	
    protected onReady() {
        this.mPanel.Toggle_Use_props.selected = GlobalClass.GameClass.bsfbIsAutoPlay;
    }
	
    private on90_event(event: egret.Event): void {
        console.log("on90_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Cancel,egret.TouchEvent.TOUCH_END,this.Btn_CancelClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
        this.AddClickEvent(this.mPanel.Toggle_Use_props,egret.TouchEvent.TOUCH_END,this.Toggle_Use_propsClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Cancel,egret.TouchEvent.TOUCH_END,this.Btn_CancelClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_Use_props,egret.TouchEvent.TOUCH_END,this.Toggle_Use_propsClick,this);
    }
    

    private Btn_CancelClick(){
        this.mPanel.hide();
    }

    private Btn_SureClick(){
        var autouse = this.mPanel.Toggle_Use_props.selected;
        GlobalClass.GameClass.bsfbIsAutoPlay = this.mPanel.Toggle_Use_props.selected;
        if( GlobalClass.GameClass.bsfbIsAutoPlay){
            NetEventMgr.getInstance().clientMsg(MsgID.Client.BSFBAutoUseON,"");
            egret.localStorage.setItem(GlobalClass.UserInfo.str_UserID + "isAutoUseProps", "1");
        }else{
            egret.localStorage.setItem(GlobalClass.UserInfo.str_UserID + "isAutoUseProps", "0");
            var js = { PropsID: GlobalClass.GameClass.str_PropsId[1]};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.USE_PROPS,JSON.stringify(js));
        }
        this.mPanel.hide();
    }
    private Toggle_Use_propsClick(){

    }
}