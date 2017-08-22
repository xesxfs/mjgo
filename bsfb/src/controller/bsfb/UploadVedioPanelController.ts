/**
 *
 * @author 
 *
 */
class UploadVedioPanelController extends KFController{ 
    
	private str_VedioDate:string;
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.BSFB.UPLOAD_VEDIOCODE,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.mPanel.Input_VedioTitle.value == "";
    }
	
    private on184_event(event: egret.Event): void {
        console.log("on184_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = '184%-1%0%视频上传成功';
        var strArray = datastr.split("%");
        if (strArray[2] == "0") {//上传成功
            this.mPanel.Input_VedioTitle.text = "";
            this.mPanel.hide();
            KFControllerMgr.getCtl(PanelName.VedioPanel).RenewPublicVedio();
        }
        KFControllerMgr.showTips(strArray[3],1);
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_Up,egret.TouchEvent.TOUCH_END,this.Btn_UpClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Up,egret.TouchEvent.TOUCH_END,this.Btn_UpClick,this);
    }
    

    private Btn_CloseClick(){
        this.mPanel.hide();
    }

    private Btn_UpClick(){
         if (this.mPanel.Input_VedioTitle.value == "")
        {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1071));
            return;
        }
        var s = this.str_VedioDate.replace(/%/g, '&');
        
        var js = { VedioTitle: this.mPanel.Input_VedioTitle.text,VedioCode:s};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.UPLOAD_VEDIOCODE,JSON.stringify(js));
    }

    public setData(data:string):any{
        this.str_VedioDate = data;
        return this;
    }
}