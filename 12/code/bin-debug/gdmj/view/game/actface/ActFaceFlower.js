var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 动作表情-玫瑰
 * @author chenkai
 * @date 2016/9/5
 */
var ActFaceFlower = (function (_super) {
    __extends(ActFaceFlower, _super);
    function ActFaceFlower() {
        var _this = _super.call(this) || this;
        _this.flower = new egret.Bitmap(RES.getRes("actface_flower_png"));
        _this.addChild(_this.flower);
        var texture = RES.getRes("actface_floweranim_png");
        var json = RES.getRes("actface_floweranim_json");
        _this.lightParticle = new particle.GravityParticleSystem(texture, json);
        return _this;
    }
    ActFaceFlower.prototype.playAnim = function () {
        var _this = this;
        this.addChild(this.lightParticle);
        this.addChild(this.flower);
        this.lightParticle.x = -150; //粒子位置偏差太大...
        this.lightParticle.y = -150;
        this.lightParticle.start(1200);
        egret.Tween.get(this).wait(2000).call(function () {
            _this.lightParticle.stop();
            _this.hide();
        });
    };
    ActFaceFlower.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return ActFaceFlower;
}(egret.DisplayObjectContainer));
__reflect(ActFaceFlower.prototype, "ActFaceFlower");
//# sourceMappingURL=ActFaceFlower.js.map