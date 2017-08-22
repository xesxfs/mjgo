/**
 *
 * @author 
 *
 */
class SharePanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.USER.LOGIN,];
	}
	
    protected onReady() {
    }
	
    private on90_event(event: egret.Event): void {
        console.log("on90_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
    }

     protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_Copy,egret.TouchEvent.TOUCH_END,this.Btn_CopyClick,this);
        this.AddClickEvent(this.mPanel.Btn_ShareWXFriend,egret.TouchEvent.TOUCH_END,this.Btn_ShareWXFriendClick,this);
        this.AddClickEvent(this.mPanel.Btn_ShareWX,egret.TouchEvent.TOUCH_END,this.Btn_ShareWXClick,this);
        this.AddClickEvent(this.mPanel.Btn_ShareQQ,egret.TouchEvent.TOUCH_END,this.Btn_ShareQQClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Copy,egret.TouchEvent.TOUCH_END,this.Btn_CopyClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ShareWXFriend,egret.TouchEvent.TOUCH_END,this.Btn_ShareWXFriendClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ShareWX,egret.TouchEvent.TOUCH_END,this.Btn_ShareWXClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ShareQQ,egret.TouchEvent.TOUCH_END,this.Btn_ShareQQClick,this);
    }
    private Btn_CloseClick(){
        this.mPanel.hide();
    }
    private Btn_CopyClick(){
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1036));
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.share_type,"1");
        DeviceUtils.setClipboard(GlobalClass.ShareInfo.DownLoadURL);
    }
    private Btn_ShareWXFriendClick(){
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.share_type,"3");
        DeviceUtils.shareUrl(GlobalClass.ShareInfo.WXShareTitle,GlobalClass.ShareInfo.WXShareURL,GlobalClass.ShareInfo.QQSharePicURL,GlobalClass.ShareInfo.WXShareContent,2);
    }
    private Btn_ShareWXClick(){
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.share_type,"2");
        DeviceUtils.shareUrl(GlobalClass.ShareInfo.WXShareTitle,GlobalClass.ShareInfo.WXShareURL,GlobalClass.ShareInfo.QQSharePicURL,GlobalClass.ShareInfo.WXShareContent,3);
    
    }
    private Btn_ShareQQClick(){
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.share_type,"4");
        DeviceUtils.shareUrl(GlobalClass.ShareInfo.QQShareTitle,GlobalClass.ShareInfo.QQShareURL,GlobalClass.ShareInfo.QQSharePicURL,GlobalClass.ShareInfo.QQShareContent,1)
    }
    
}