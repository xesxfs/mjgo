/**
 * 支付界面
 * @author eyanlong 
 * @date 2017/2/21
 */

class PaymentPanel extends BasePanel{
	/**关闭 */
	private payment_close:eui.Button;
	/**确认支付 */
	private payment_right:eui.Button;
	/**选择支付方式 */
	private payment_method:eui.Button;
	/**支付名字 */
	private payment_name:eui.Label;
	/**支付金额 */
	private payment_money:eui.Label;
	/**商品图标 */
	public iconImg:eui.Image;

	public constructor() {
		super();
		this.skinName = "PaymentPanelSkin";
	}

	protected onEnable() {
        this.payment_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
		this.payment_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rights, this);
		this.payment_method.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    }

    protected onRemove() {
        this.payment_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
		this.payment_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rights, this);
		this.payment_method.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    }

	/**设置数据 */
	public setData(data:any){
		this.iconImg.source = App.getController("HallController").getUrl(this.recData);
		this.payment_name.text = data.name;
		this.payment_money.text = "¥"+data.price+".00";
		this.payment_method.labelDisplay.text = data.paymentname;
	}

	/**关闭 */
	protected close(){
		this.hide();
		//App.PanelManager.open(PanelConst.MallPanel)
	}

	/**确认支付 */
	protected rights(){
		var ctrl = new HallController();
		ctrl.sendPay(1);
		this.hide();
	}

	/**选择支付方式 */
	protected method(){
		App.getController("HallController").sendBuyPayment();
	}
}