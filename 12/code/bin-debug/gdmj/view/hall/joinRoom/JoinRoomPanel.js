/**
 * 加入房间界面
 * @author eyanlong
 * @date 2017/2/23
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JoinRoomPanel = (function (_super) {
    __extends(JoinRoomPanel, _super);
    function JoinRoomPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "JoinRoomPanelSkin";
        return _this;
    }
    JoinRoomPanel.prototype.onEnable = function () {
        this.joinRoom_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    JoinRoomPanel.prototype.onRemove = function () {
        this.joinRoom_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    /**返回 */
    JoinRoomPanel.prototype.back = function () {
        this.hide();
    };
    return JoinRoomPanel;
}(BasePanel));
__reflect(JoinRoomPanel.prototype, "JoinRoomPanel");
//# sourceMappingURL=JoinRoomPanel.js.map