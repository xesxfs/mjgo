var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 庄家标志
 * @author chenkai
 * @date 2016/6/30
 */
var ZhuangFlag = (function (_super) {
    __extends(ZhuangFlag, _super);
    function ZhuangFlag() {
        var _this = _super.call(this) || this;
        _this.bitmapData = RES.getRes("game_zhuang_png");
        _this.anchorOffsetX = 23;
        _this.anchorOffsetY = 26;
        return _this;
    }
    ZhuangFlag.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return ZhuangFlag;
}(egret.Bitmap));
__reflect(ZhuangFlag.prototype, "ZhuangFlag");
//# sourceMappingURL=ZhuangFlag.js.map