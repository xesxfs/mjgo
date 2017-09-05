var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * fixed X and fixed Y
 * @author
 *
 */
var Examples_fixedXY = (function (_super) {
    __extends(Examples_fixedXY, _super);
    function Examples_fixedXY() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_fixedXY.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall                 
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        var fixedX = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 250, 50, 40, 0, p2.Body.DYNAMIC); //ball
        fixedX.fixedX = true;
        var fixedY = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 100, 100, 30, 0, p2.Body.DYNAMIC); //ball
        fixedY.fixedY = true;
    };
    return Examples_fixedXY;
}(egret.Sprite));
__reflect(Examples_fixedXY.prototype, "Examples_fixedXY");
//# sourceMappingURL=Examples_fixedXY.js.map