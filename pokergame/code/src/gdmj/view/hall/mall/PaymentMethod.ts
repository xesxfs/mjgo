/**
 * 支付选择界面
 * @author eyanlong 
 * @date 2017/2/21
 */
class PaymentMethod extends BasePanel{
	/**关闭 */
	private method_close:eui.Button;
	private purseLab:eui.Label;
	private wxLab:eui.Label;
	private aliPayLab:eui.Label;
	private puserRect:eui.Rect;
	private wxRect:eui.Rect;
	private aliPayRect:eui.Rect;

	private 

	public constructor() {
		super();
		this.skinName = "PaymentMethodSkin";
	}

	protected onEnable() {
        this.method_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
		this.puserRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
		this.wxRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
		this.aliPayRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    }

    protected onRemove() {
        this.method_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
		this.puserRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
		this.wxRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
		this.aliPayRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    }

	public setData(data:any){
		this.purseLab.text = data[0].name;
		this.wxLab.text = data[1].name;
		this.aliPayLab.text = data[2].name;
	}

	/**关闭 */
	protected close(){
		this.hide();
	}

	/**选择支付方式 */
	protected method(e:egret.Event){
		switch(e.target) {
			case this.puserRect:
				console.log("purse");
				break;
			case this.wxRect:
				console.log("wx");
				break;
			case this.aliPayRect:
				console.log("alipay");
				break;
			default:
				break;
		}
		this.hide();
	}

}