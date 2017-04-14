var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 输特效
 * @author chenkai
 * @date 2016/9/1
 */
var LoseEffect = (function (_super) {
    __extends(LoseEffect, _super);
    function LoseEffect() {
        var _this = _super.call(this) || this;
        _this.skinName = "LoseEffectSkin";
        _this.touchEnabled = true;
        return _this;
    }
    LoseEffect.prototype.childrenCreated = function () {
    };
    LoseEffect.prototype.onEnable = function () {
        if (this.cloudParticle == null) {
            this.createParticle();
        }
        this.playAnim();
    };
    LoseEffect.prototype.onRemove = function () {
    };
    LoseEffect.prototype.playAnim = function () {
        //        this.cloudParticle.start();
        this.rainParticle.start();
        //        this.addChild(this.cloudParticle);
        this.addChild(this.loseImage);
        this.addChild(this.rainParticle);
        this.loseImage.y = -this.loseImage.height;
        var endY = (App.StageUtils.stageHeight - this.loseImage.height) / 2;
        egret.Tween.get(this.loseImage).to({ y: endY }, 1000, egret.Ease.bounceOut);
    };
    LoseEffect.prototype.stopAnim = function () {
        this.cloudParticle.stop(true);
        this.rainParticle.stop(true);
        egret.Tween.removeTweens(this.loseImage);
    };
    LoseEffect.prototype.createParticle = function () {
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
    LoseEffect.prototype.hide = function () {
        if (this.cloudParticle) {
            this.stopAnim();
        }
        this.parent && this.parent.removeChild(this);
    };
    return LoseEffect;
}(BaseUI));
__reflect(LoseEffect.prototype, "LoseEffect");
//# sourceMappingURL=LoseEffect.js.map