var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 曲柄轴
 * @author
 *
 */
var Examples_piston = (function (_super) {
    __extends(Examples_piston, _super);
    function Examples_piston() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.loop, _this);
        return _this;
    }
    Examples_piston.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;
        this.scene.world.islandSplit = true; //使用islandSplit
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        this.createObjs();
        this.createDebug();
        this.tfInfo = new egret.TextField();
        this.addChild(this.tfInfo);
    };
    Examples_piston.prototype.createObjs = function () {
        //code here
        var R = 0.7, L = R * 3;
        // Create static dummy body that we can constrain other bodies to
        var dummyBody = new p2.Body({
            mass: 0,
        });
        this.scene.world.addBody(dummyBody);
        // Create circle
        var shape = new p2.Circle({ radius: R }), circleBody = new p2.Body({
            mass: 1,
            position: [0, 0],
        });
        circleBody.addShape(shape);
        this.scene.world.addBody(circleBody);
        // Constrain it to the world
        var c = new p2.RevoluteConstraint(circleBody, dummyBody, {
            worldPivot: [0, 0]
        });
        c.collideConnected = false;
        c.enableMotor();
        c.setMotorSpeed(5);
        this.scene.world.addConstraint(c);
        // Create arm
        var armShape = new p2.Box({ width: L, height: 0.1 * L });
        var armBody = new p2.Body({
            mass: 1,
        });
        armBody.addShape(armShape);
        this.scene.world.addBody(armBody);
        // Constrain arm to circle
        var c2 = new p2.RevoluteConstraint(circleBody, armBody, {
            localPivotA: [R * 0.7, 0],
            localPivotB: [L / 2, 0]
        });
        c2.collideConnected = false;
        this.scene.world.addConstraint(c2);
        // Piston
        var pistonShape = new p2.Box({ width: 1, height: 1 });
        var pistonBody = new p2.Body({
            mass: 1,
        });
        pistonBody.addShape(pistonShape);
        this.scene.world.addBody(pistonBody);
        // Connect piston to arm
        var c3 = new p2.RevoluteConstraint(pistonBody, armBody, {
            localPivotA: [0, 0],
            localPivotB: [-L / 2, 0]
        });
        c3.collideConnected = false;
        this.scene.world.addConstraint(c3);
        // Prismatic constraint to keep the piston along a line
        var c4 = new p2.PrismaticConstraint(dummyBody, pistonBody, {
            localAnchorA: [0, 0],
            localAnchorB: [0, 0],
            localAxisA: [1, 0]
        });
        c4.collideConnected = false;
        this.scene.world.addConstraint(c4);
    };
    Examples_piston.prototype.loop = function () {
        this.debugDraw.drawDebug();
        var numIslands = this.scene.world.islandManager.islands.length;
        this.tfInfo.text = "number of islands:" + numIslands;
    };
    Examples_piston.prototype.createDebug = function () {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.scene.world);
        this.debugSpr = new egret.Sprite();
        this.addChild(this.debugSpr);
        this.debugDraw.setSprite(this.debugSpr);
        this.debugDraw.setLineWidth(0.02);
        this.debugSpr.x = this.stage.stageWidth / 2;
        this.debugSpr.y = this.stage.stageHeight / 2;
        var scale = 50;
        this.debugSpr.scaleX = scale;
        this.debugSpr.scaleY = -scale;
    };
    return Examples_piston;
}(egret.Sprite));
__reflect(Examples_piston.prototype, "Examples_piston");
//# sourceMappingURL=Examples_piston.js.map