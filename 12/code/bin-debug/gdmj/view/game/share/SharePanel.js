var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *  分享
 * @author chenkai
 * @date 2016/8/15
 */
var SharePanel = (function (_super) {
    __extends(SharePanel, _super);
    function SharePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "SharePanelSkin";
        return _this;
    }
    SharePanel.prototype.onEnable = function () {
        this.share_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    SharePanel.prototype.onRemove = function () {
        this.share_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    /**关闭 */
    SharePanel.prototype.close = function () {
        this.hide();
    };
    return SharePanel;
}(BasePanel));
__reflect(SharePanel.prototype, "SharePanel");
//# sourceMappingURL=SharePanel.js.map