/**
 *
 * @author 
 *
 */
class SystemTitlePanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.USER.LOGIN,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来

        var jsonData = JSON.parse(GlobalClass.HallClass.fangChenMiResult);
        this.mPanel.label_title.text = jsonData["info"]["title"];
        this.mPanel.label_content.text = jsonData["info"]["content"];
    }
	
    private on90_event(event: egret.Event): void {
        console.log("on90_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
       
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }
    

    private Btn_CloseClick(){
        this.mPanel.hide();
    }


    
}