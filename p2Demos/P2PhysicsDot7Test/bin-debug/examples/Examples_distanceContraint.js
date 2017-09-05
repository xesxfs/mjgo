var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var Examples_distanceContraint = (function (_super) {
    __extends(Examples_distanceContraint, _super);
    function Examples_distanceContraint() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_distanceContraint.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        this.createCase1();
        this.createCase2();
    };
    Examples_distanceContraint.prototype.createCase1 = function () {
        var bodyA = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 250, 50, 40, 0, p2.Body.DYNAMIC); //ball1
        var bodyB = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 100, 100, 30, 0, p2.Body.DYNAMIC); //ball1
        // If target distance is not given as an option, then the current distance between the bodies is used.
        var constraint1 = new p2.DistanceConstraint(bodyA, bodyB);
        this.scene.world.addConstraint(constraint1);
        constraint1.upperLimitEnabled = true;
        constraint1.lowerLimitEnabled = true;
        constraint1.upperLimit = jbP2.P2Space.convertEgretValueToP2(200);
        constraint1.lowerLimit = jbP2.P2Space.convertEgretValueToP2(100);
    };
    Examples_distanceContraint.prototype.createCase2 = function () {
        var bodyA = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 500, 300, 50, 50, 0, p2.Body.DYNAMIC); //box1
        var bodyB = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 600, 300, 50, 50, 0, p2.Body.DYNAMIC); //box1
        // If target distance is not given as an option, then the current distance between the bodies is used.
        var constraint1 = new p2.DistanceConstraint(bodyA, bodyB, { distance: .5, localAnchorA: [0.5, 0.5], localAnchorB: [-0.5, 0.5] });
        this.scene.world.addConstraint(constraint1);
        constraint1.upperLimitEnabled = true;
        constraint1.lowerLimitEnabled = true;
        constraint1.upperLimit = jbP2.P2Space.convertEgretValueToP2(100);
        constraint1.lowerLimit = jbP2.P2Space.convertEgretValueToP2(50);
    };
    return Examples_distanceContraint;
}(egret.Sprite));
__reflect(Examples_distanceContraint.prototype, "Examples_distanceContraint");
//# sourceMappingURL=Examples_distanceContraint.js.map