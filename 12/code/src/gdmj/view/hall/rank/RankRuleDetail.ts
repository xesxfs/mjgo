/**
 *
 * @author chenwei
 *
 */
class RankRuleDetail extends BasePanel{
	public constructor() {
    	super();
      this.skinName ="RankRuleDetailSkin"
	}
    private closeBtn:eui.Button;
	protected onEnable(){
	    this.setCenter();
	    this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
	}
	
	private onClose(){
	    this.hide();
	}
	
	protected onRemove(){
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
	}
}
