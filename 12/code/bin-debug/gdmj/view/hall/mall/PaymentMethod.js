var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 支付选择界面
 * @author eyanlong
 * @date 2017/2/21
 */
var PaymentMethod = (function (_super) {
    __extends(PaymentMethod, _super);
    function PaymentMethod() {
        var _this = _super.call(this) || this;
        _this.skinName = "PaymentMethodSkin";
        return _this;
    }
    PaymentMethod.prototype.onEnable = function () {
        this.method_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.method_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    };
    PaymentMethod.prototype.onRemove = function () {
        this.method_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.method_bt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    };
    PaymentMethod.prototype.setData = function (data) {
        this.payment_method.labelDisplay.text = data[0].name;
    };
    /**关闭 */
    PaymentMethod.prototype.close = function () {
        this.hide();
        App.PanelManager.open(PanelConst.MallPanel);
    };
    /**选择支付方式 */
    PaymentMethod.prototype.method = function () {
        this.hide();
        App.PanelManager.open(PanelConst.PaymentPanel);
    };
    return PaymentMethod;
}(BasePanel));
__reflect(PaymentMethod.prototype, "PaymentMethod");
//# sourceMappingURL=PaymentMethod.js.map