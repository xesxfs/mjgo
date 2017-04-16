var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 动作表情-炸弹
 * @author chenkai
 * @date 2016/9/5
 */
var ActFaceBoom = (function (_super) {
    __extends(ActFaceBoom, _super);
    function ActFaceBoom() {
        var _this = _super.call(this) || this;
        _this.setImgBuffer("actface_boom", 0, 4);
        _this.delay = 120;
        return _this;
    }
    ActFaceBoom.prototype.playAnim = function () {
        this.gotoAndPlay(1);
        this.addEventListener(egret.Event.COMPLETE, this.hide, this);
    };
    ActFaceBoom.prototype.hide = function () {
        this.removeEventListener(egret.Event.COMPLETE, this.hide, this);
        this.parent && this.parent.removeChild(this);
    };
    return ActFaceBoom;
}(BitmapMovie));
__reflect(ActFaceBoom.prototype, "ActFaceBoom");
//# sourceMappingURL=ActFaceBoom.js.map