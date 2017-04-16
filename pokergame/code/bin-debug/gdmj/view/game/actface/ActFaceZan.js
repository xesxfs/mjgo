var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 动作表情-赞
 * @author chenkai
 * @date 2016/9/5
 */
var ActFaceZan = (function (_super) {
    __extends(ActFaceZan, _super);
    function ActFaceZan() {
        var _this = _super.call(this) || this;
        _this.light = new egret.Bitmap(RES.getRes("actface_zanlight_png"));
        _this.zan = new egret.Bitmap(RES.getRes("actface_zan_png"));
        _this.addChild(_this.zan);
        return _this;
    }
    ActFaceZan.prototype.playAnim = function () {
        var _this = this;
        this.zan.anchorOffsetX = this.light.width / 2;
        this.zan.anchorOffsetY = this.light.height / 2;
        this.zan.x = this.light.width / 2;
        this.zan.y = this.light.height / 2;
        this.zan.scaleX = 0;
        this.zan.scaleY = 0;
        egret.Tween.get(this.zan).to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.bounceOut);
        this.addChild(this.light);
        this.addChild(this.zan);
        this.light.anchorOffsetX = this.light.width / 2;
        this.light.anchorOffsetY = this.light.height / 2;
        this.light.x = this.light.width / 2;
        this.light.y = this.light.height / 2;
        this.light.scaleX = 0;
        this.light.scaleY = 0;
        egret.Tween.get(this.light).to({ scaleX: 1, scaleY: 1 }, 500).call(function () {
            egret.Tween.get(_this.light, { loop: true }).to({ rotation: 360 }, 200);
        });
        egret.Tween.get(this).wait(2000).call(function () {
            _this.hide();
        });
    };
    ActFaceZan.prototype.hide = function () {
        egret.Tween.removeTweens(this.zan);
        egret.Tween.removeTweens(this.light);
        this.parent && this.parent.removeChild(this);
    };
    return ActFaceZan;
}(egret.DisplayObjectContainer));
__reflect(ActFaceZan.prototype, "ActFaceZan");
//# sourceMappingURL=ActFaceZan.js.map