var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 动作表情-西红柿
 * @author chenkai
 * @date 2016/9/5
 */
var ActFaceFanQie = (function (_super) {
    __extends(ActFaceFanQie, _super);
    function ActFaceFanQie() {
        var _this = _super.call(this) || this;
        _this.setImgBuffer("actface_fanqie", 0, 8);
        _this.delay = 90;
        //番茄的图片是歪的，在左上角，这里自己对齐...
        _this.anchorOffsetX = -50;
        _this.anchorOffsetY = -50;
        return _this;
    }
    ActFaceFanQie.prototype.playAnim = function () {
        this.gotoAndPlay(1);
        this.addEventListener(egret.Event.COMPLETE, this.hide, this);
    };
    ActFaceFanQie.prototype.hide = function () {
        this.removeEventListener(egret.Event.COMPLETE, this.hide, this);
        this.parent && this.parent.removeChild(this);
    };
    return ActFaceFanQie;
}(BitmapMovie));
__reflect(ActFaceFanQie.prototype, "ActFaceFanQie");
//# sourceMappingURL=ActFaceFanQie.js.map