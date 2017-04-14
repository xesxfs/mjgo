/**
 * 输入加入房间
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
var JoinNumber = (function (_super) {
    __extends(JoinNumber, _super);
    function JoinNumber() {
        var _this = _super.call(this) || this;
        _this.skinName = "JoinNumberSkin";
        return _this;
    }
    JoinNumber.prototype.onEnable = function () {
        this.joinNum_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    JoinNumber.prototype.onRemove = function () {
        this.joinNum_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    /**返回 */
    JoinNumber.prototype.back = function () {
        this.hide();
    };
    return JoinNumber;
}(BasePanel));
__reflect(JoinNumber.prototype, "JoinNumber");
//# sourceMappingURL=JoinNumber.js.map