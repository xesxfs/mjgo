var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Gear constraint
 * @author
 *
 */
var Examples_gearConstraint = (function (_super) {
    __extends(Examples_gearConstraint, _super);
    function Examples_gearConstraint() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_gearConstraint.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage, this, this.scene.world);
        var wheelX = 400;
        var wheelY = 100;
        var rA = 40; //齿轮A半径
        var rB = 30; //齿轮B半径
        var bodyA = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, wheelX, wheelY, rA, 0, p2.Body.DYNAMIC); //ball1
        var bodyB = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, wheelX + rA + rB, wheelY, rB, 0, p2.Body.DYNAMIC); //ball1
        bodyA.allowSleep = false;
        bodyB.allowSleep = false;
        //创建dummyBody来实现约束到世界
        var dummyBody = new p2.Body();
        this.scene.world.addBody(dummyBody);
        //用Revolute固定到世界中
        var revoluteA = new p2.RevoluteConstraint(dummyBody, bodyA, {
            worldPivot: bodyA.position
        });
        //用Revolute固定到世界中
        var revoluteB = new p2.RevoluteConstraint(dummyBody, bodyB, {
            worldPivot: bodyB.position
        });
        this.scene.world.addConstraint(revoluteA);
        this.scene.world.addConstraint(revoluteB);
        // Add gear
        var gearConstraint = new p2.GearConstraint(bodyA, bodyB, { ratio: -rA / rB }); //负数约束两刚体方向相反，rA/rB为半径比率
        this.scene.world.addConstraint(gearConstraint);
    };
    return Examples_gearConstraint;
}(egret.Sprite));
__reflect(Examples_gearConstraint.prototype, "Examples_gearConstraint");
//# sourceMappingURL=Examples_gearConstraint.js.map