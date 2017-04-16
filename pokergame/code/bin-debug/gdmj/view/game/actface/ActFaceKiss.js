var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 动作表情-飞吻
 * @author chenkai
 * @date 2016/9/5
 */
var ActFaceKiss = (function (_super) {
    __extends(ActFaceKiss, _super);
    function ActFaceKiss() {
        var _this = _super.call(this) || this;
        _this.mouth = new egret.Bitmap(RES.getRes("actface_kiss_png"));
        _this.addChild(_this.mouth);
        var texture = RES.getRes("actface_kissanim_png");
        var json = RES.getRes("actface_kissanim_json");
        _this.heartParticle = new particle.GravityParticleSystem(texture, json);
        return _this;
    }
    ActFaceKiss.prototype.playAnim = function () {
        var _this = this;
        this.addChild(this.heartParticle);
        this.addChild(this.mouth);
        this.heartParticle.x = -740; //粒子位置偏差太大...
        this.heartParticle.y = -300;
        this.heartParticle.start(1200);
        egret.Tween.get(this).wait(2000).call(function () {
            _this.heartParticle.stop();
            _this.hide();
        });
    };
    ActFaceKiss.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return ActFaceKiss;
}(egret.DisplayObjectContainer));
__reflect(ActFaceKiss.prototype, "ActFaceKiss");
//# sourceMappingURL=ActFaceKiss.js.map