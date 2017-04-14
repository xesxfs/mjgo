var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 动作表情-石头
 * @author chenkai
 * @date 2016/9/5
 */
var ActFaceStone = (function (_super) {
    __extends(ActFaceStone, _super);
    function ActFaceStone() {
        var _this = _super.call(this) || this;
        _this.stone = new egret.Bitmap(RES.getRes("actface_stone_png"));
        _this.addChild(_this.stone);
        _this.grass = new egret.Bitmap(RES.getRes("actface_stone1_png"));
        var texture = RES.getRes("actface_stoneanim_png");
        var json = RES.getRes("actface_stoneanim_json");
        _this.grassParticle = new particle.GravityParticleSystem(texture, json);
        return _this;
    }
    ActFaceStone.prototype.playAnim = function () {
        var _this = this;
        this.removeChild(this.stone);
        this.grass.x = -this.grass.width / 2 + 40;
        this.grass.y = -this.grass.height / 2 + 40;
        this.addChild(this.grass);
        this.grassParticle.x = -570; //粒子位置偏差太大...
        this.grassParticle.y = -320;
        this.addChild(this.grassParticle);
        this.grassParticle.start(300);
        egret.Tween.get(this).wait(2000).call(function () {
            _this.grassParticle.stop();
            _this.hide();
        });
    };
    ActFaceStone.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return ActFaceStone;
}(egret.DisplayObjectContainer));
__reflect(ActFaceStone.prototype, "ActFaceStone");
//# sourceMappingURL=ActFaceStone.js.map