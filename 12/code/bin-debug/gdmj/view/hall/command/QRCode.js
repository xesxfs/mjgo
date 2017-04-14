var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author chenwei
 *
 */
var QRCode = (function (_super) {
    __extends(QRCode, _super);
    function QRCode() {
        var _this = _super.call(this) || this;
        _this.skinName = "QRCodeSkin";
        return _this;
    }
    QRCode.prototype.onEnable = function () {
        this.setCenter();
        this.qrCodeImg.source = App.DataCenter.roomInfo.QrUrl;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.closeMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
    };
    QRCode.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.closeMask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
    };
    return QRCode;
}(BasePanel));
__reflect(QRCode.prototype, "QRCode");
//# sourceMappingURL=QRCode.js.map