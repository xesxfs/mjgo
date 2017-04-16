/**
 * 非vip用户点击专属房的弹窗面板
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExRoomOpenVipPanel = (function (_super) {
    __extends(ExRoomOpenVipPanel, _super);
    function ExRoomOpenVipPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ExRoomOpenVipPanelSkin";
        return _this;
    }
    ExRoomOpenVipPanel.prototype.childrenCreated = function () {
    };
    ExRoomOpenVipPanel.prototype.onEnable = function () {
        this.setCenter();
        this.PanelBgCSkin.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.exRoomCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.ExRoomConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goOpenVip, this);
    };
    ExRoomOpenVipPanel.prototype.onRemove = function () {
        this.PanelBgCSkin.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.exRoomCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.ExRoomConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goOpenVip, this);
    };
    ExRoomOpenVipPanel.prototype.goOpenVip = function () {
        var hall = App.SceneManager.getScene(SceneConst.HallScene);
        //        hall.showShopPanel(ShopView.vip);
    };
    return ExRoomOpenVipPanel;
}(BasePanel));
__reflect(ExRoomOpenVipPanel.prototype, "ExRoomOpenVipPanel");
//# sourceMappingURL=ExRoomOpenVipPanel.js.map