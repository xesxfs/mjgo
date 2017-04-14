/**
 *
 * @author chenwei
 *
 */
class QRCode extends BasePanel{
	public constructor() {
    	super()
      this.skinName ="QRCodeSkin"
	}
    private qrCodeImg:eui.Image;
    private closeBtn:eui.Button;
    private closeMask:eui.Group;
        
    protected onEnable(){
        this.setCenter();
        this.qrCodeImg.source = App.DataCenter.roomInfo.QrUrl;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this.closeMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
    }
    
    protected onRemove(){
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this.closeMask.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this)
    }

}
