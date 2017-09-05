var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试PivotJoint约束
 * @author
 *
 */
var Examples_pivotJoint = (function (_super) {
    __extends(Examples_pivotJoint, _super);
    function Examples_pivotJoint() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2Stage, _this);
        return _this;
    }
    Examples_pivotJoint.prototype.onAdded2Stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;
        //var mouseJt = new P2MouseJointHelper(this.stage,this,this.scene.world,false);
        this.scene.createGround();
        console.log("Examples_pivotJoint.onAdded2stage");
        this.box1 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 100, 50, 50, 0, p2.Body.DYNAMIC); //box1
        this.box2 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 300, 50, 50, 0, p2.Body.DYNAMIC); //box2
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //bottom wall
        //约束点放在两个刚体中间位置,转换到p2空间点坐标
        var pivotP2X = jbP2.P2Space.convertEgretValueToP2(390);
        var pivotP2Y = jbP2.P2Space.convertEgretY_To_P2Y(200);
        //构造方法中type的值可以是Constraint.DISTANCE, Constraint.GEAR, Constraint.LOCK, Constraint.PRISMATIC or Constraint.REVOLUTE
        this.pvtJt = new p2.RevoluteConstraint(this.box1, this.box2, { worldPivot: [pivotP2X, pivotP2Y] });
        this.scene.world.addConstraint(this.pvtJt);
    };
    return Examples_pivotJoint;
}(egret.Sprite));
__reflect(Examples_pivotJoint.prototype, "Examples_pivotJoint");
//# sourceMappingURL=Examples_pivotJoint.js.map