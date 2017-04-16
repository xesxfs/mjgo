var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 赢特效
 * @author chenkai
 * @date 2016/9/1
 */
var WinEffect = (function (_super) {
    __extends(WinEffect, _super);
    function WinEffect() {
        var _this = _super.call(this) || this;
        _this.skinName = "WinEffectSkin";
        _this.touchEnabled = true;
        return _this;
    }
    WinEffect.prototype.childrenCreated = function () {
    };
    WinEffect.prototype.onEnable = function () {
        if (this.moneyParticle == null) {
            this.createParticle();
        }
        this.playAnim();
    };
    WinEffect.prototype.onRemove = function () {
        this.stopAnim();
    };
    WinEffect.prototype.playAnim = function () {
        this.moneyParticle.start();
        this.flashParticle.start();
        this.addChild(this.moneyParticle);
        this.addChild(this.flashParticle);
        this.addChild(this.winImage);
        this.winImage.scaleX = 0;
        this.winImage.scaleY = 0;
        egret.Tween.get(this.winImage).to({ scaleX: 1.5, scaleY: 1.5 }, 1000, egret.Ease.bounceOut);
    };
    WinEffect.prototype.stopAnim = function () {
        this.moneyParticle.stop(true);
        this.flashParticle.stop(true);
        egret.Tween.removeTweens(this.winImage);
    };
    WinEffect.prototype.createParticle = function () {
        var texture = RES.getRes("result_money_png");
        var json = RES.getRes("result_money_json");
        this.moneyParticle = new particle.GravityParticleSystem(texture, json);
        this.moneyParticle.x = -360;
        this.moneyParticle.y = 0;
        var texture = RES.getRes("result_flash_png");
        var json = RES.getRes("result_flash_json");
        this.flashParticle = new particle.GravityParticleSystem(texture, json);
        this.flashParticle.x = 160;
        this.flashParticle.y = 220;
    };
    WinEffect.prototype.hide = function () {
        if (this.moneyParticle) {
            this.stopAnim();
        }
        this.parent && this.parent.removeChild(this);
    };
    return WinEffect;
}(BaseUI));
__reflect(WinEffect.prototype, "WinEffect");
//# sourceMappingURL=WinEffect.js.map