/**
 * 支付界面
 * @author eyanlong
 * @date 2017/2/21
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PaymentPanel = (function (_super) {
    __extends(PaymentPanel, _super);
    function PaymentPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "PaymentPanelSkin";
        return _this;
    }
    PaymentPanel.prototype.onEnable = function () {
        this.payment_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.payment_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rights, this);
        this.payment_method.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    };
    PaymentPanel.prototype.onRemove = function () {
        this.payment_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.payment_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rights, this);
        this.payment_method.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    };
    /**设置数据 */
    PaymentPanel.prototype.setData = function (data) {
        this.payment_name.text = data.name;
        this.payment_money.text = data.price;
        this.payment_method.labelDisplay.text = data.paymentname;
    };
    /**关闭 */
    PaymentPanel.prototype.close = function () {
        this.hide();
        App.PanelManager.open(PanelConst.MallPanel);
    };
    /**确认支付 */
    PaymentPanel.prototype.rights = function () {
        var ctrl = new HallController();
        ctrl.sendPay(1);
        this.hide();
    };
    /**选择支付方式 */
    PaymentPanel.prototype.method = function () {
        var ctrl = new HallController();
        ctrl.sendBuyPayment();
        this.hide();
    };
    return PaymentPanel;
}(BasePanel));
__reflect(PaymentPanel.prototype, "PaymentPanel");
//# sourceMappingURL=PaymentPanel.js.map