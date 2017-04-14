/**
 *  分享
 * @author chenkai
 * @date 2016/8/15 
 */
class SharePanel extends BasePanel{
    /**关闭 */
	private share_close:eui.Button;
    
	public constructor() {
    	super();
    	this.skinName = "SharePanelSkin";
	}
	
    protected onEnable() {
       this.share_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }

    protected onRemove() {
        this.share_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }

    /**关闭 */
	protected close(){
		this.hide();
	} 
	
}
