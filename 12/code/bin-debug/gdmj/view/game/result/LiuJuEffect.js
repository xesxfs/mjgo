var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 流局特效
 * @author chenkai
 * @date 2016/9/6
 */
var LiuJuEffect = (function (_super) {
    __extends(LiuJuEffect, _super);
    function LiuJuEffect() {
        var _this = _super.call(this) || this;
        _this.skinName = "LiuJuEffectSkin";
        _this.touchEnabled = true;
        return _this;
    }
    LiuJuEffect.prototype.childrenCreated = function () {
        this.initImage0X = this.image0.x;
        this.initImage1X = this.image1.x;
    };
    LiuJuEffect.prototype.onEnable = function () {
        if (this.cloudParticle == null) {
            this.createParticle();
        }
        this.playAnim();
    };
    LiuJuEffect.prototype.onRemove = function () {
    };
    LiuJuEffect.prototype.playAnim = function () {
        this.cloudParticle.start();
        this.rainParticle.start();
        this.addChild(this.cloudParticle);
        this.addChild(this.image0);
        this.addChild(this.image1);
        this.addChild(this.rainParticle);
        var image0EndX = this.initImage0X;
        this.image0.x = this.initImage0X - this.image0.width;
        this.image0.alpha = 0;
        egret.Tween.get(this.image0).to({ x: image0EndX, alpha: 1 }, 300);
        var image1EndX = this.initImage1X;
        this.image1.x = this.initImage1X - this.image1.width;
        this.image1.alpha = 0;
        this.image1.rotation = 0;
        egret.Tween.get(this.image1).wait(300).to({ x: image1EndX, alpha: 1 }, 300).to({ rotation: 90 }, 1900, egret.Ease.bounceOut);
    };
    LiuJuEffect.prototype.stopAnim = function () {
        this.cloudParticle.stop(true);
        this.rainParticle.stop(true);
        egret.Tween.removeTweens(this.image0);
        egret.Tween.removeTweens(this.image1);
    };
    LiuJuEffect.prototype.createParticle = function () {
        var texture = RES.getRes("result_cloud_png");
        var json = RES.getRes("result_cloud_json");
        this.cloudParticle = new particle.GravityParticleSystem(texture, json);
        this.cloudParticle.x = -360;
        this.cloudParticle.y = 200;
        var texture = RES.getRes("result_rain_png");
        var json = RES.getRes("result_rain_json");
        this.rainParticle = new particle.GravityParticleSystem(texture, json);
        this.rainParticle.x = 160;
        this.rainParticle.y = 220;
    };
    LiuJuEffect.prototype.hide = function () {
        if (this.cloudParticle) {
            this.stopAnim();
        }
        this.parent && this.parent.removeChild(this);
    };
    return LiuJuEffect;
}(BaseUI));
__reflect(LiuJuEffect.prototype, "LiuJuEffect");
//# sourceMappingURL=LiuJuEffect.js.map