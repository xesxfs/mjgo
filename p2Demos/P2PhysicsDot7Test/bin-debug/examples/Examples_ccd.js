var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试结论是：
 * 在很快速度时候可以不穿越墙体，但是会被嵌入到墙体里
 * @author
 *
 */
var Examples_ccd = (function (_super) {
    __extends(Examples_ccd, _super);
    function Examples_ccd() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_ccd.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 0, 800, 10, 0, p2.Body.STATIC); //middle static
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 480, 800, 10, 0, p2.Body.STATIC); //middle static
        var ball = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 250, 50, 15, 0, p2.Body.DYNAMIC); //ball1
        ball.ccdSpeedThreshold = -0; //0 开启ccd，-1关闭ccd
    };
    return Examples_ccd;
}(egret.Sprite));
__reflect(Examples_ccd.prototype, "Examples_ccd");
//# sourceMappingURL=Examples_ccd.js.map