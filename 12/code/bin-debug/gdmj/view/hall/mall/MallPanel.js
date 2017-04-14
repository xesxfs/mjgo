/**
 * 商城界面
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
var MallPanel = (function (_super) {
    __extends(MallPanel, _super);
    function MallPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "MallPanelSkin";
        return _this;
    }
    MallPanel.prototype.onEnable = function () {
        this.mall_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.mall_one.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy1, this);
        this.mall_ten.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy2, this);
        this.mall_some.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy3, this);
    };
    MallPanel.prototype.onRemove = function () {
        this.mall_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.mall_one.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy1, this);
        this.mall_ten.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy2, this);
        this.mall_some.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy3, this);
    };
    /**返回 */
    MallPanel.prototype.back = function () {
        this.hide();
    };
    /**购买按钮 */
    MallPanel.prototype.buy = function (id) {
        var ctrl = new HallController();
        ctrl.sendBuyProp(id);
        this.hide();
    };
    /**购买按钮 */
    MallPanel.prototype.buy1 = function () {
        this.buy(1);
    };
    /**购买按钮 */
    MallPanel.prototype.buy2 = function () {
        this.buy(2);
    };
    /**购买按钮 */
    MallPanel.prototype.buy3 = function () {
        this.buy(3);
    };
    return MallPanel;
}(BasePanel));
__reflect(MallPanel.prototype, "MallPanel");
//# sourceMappingURL=MallPanel.js.map