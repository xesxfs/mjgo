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
        this.puserRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
        this.wxRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
        this.aliPayRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    };
    PaymentMethod.prototype.onRemove = function () {
        this.method_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.puserRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
        this.wxRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
        this.aliPayRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    };
    PaymentMethod.prototype.setData = function (data) {
        this.purseLab.text = data[0].name;
        this.wxLab.text = data[1].name;
        this.aliPayLab.text = data[2].name;
    };
    /**关闭 */
    PaymentMethod.prototype.close = function () {
        this.hide();
    };
    /**选择支付方式 */
    PaymentMethod.prototype.method = function (e) {
        switch (e.target) {
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
    };
    return PaymentMethod;
}(BasePanel));
__reflect(PaymentMethod.prototype, "PaymentMethod");
//# sourceMappingURL=PaymentMethod.js.map