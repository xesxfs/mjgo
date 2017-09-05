var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Body kinematic
 * @author
 *
 */
var Examples_kinematic = (function (_super) {
    __extends(Examples_kinematic, _super);
    function Examples_kinematic() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.loop, _this);
        return _this;
    }
    Examples_kinematic.prototype.onAdded2stage = function (e) {
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
    Examples_kinematic.prototype.createObjs = function () {
        //code here
        // Create ground
        var planeShape = new p2.Plane();
        var plane = new p2.Body({
            position: [0, -2]
        });
        plane.addShape(planeShape);
        this.scene.world.addBody(plane);
        // Create kinematic, moving box
        var kinematicBody = new p2.Body({
            type: p2.Body.KINEMATIC,
            position: [0, 0.5]
        });
        var boxShape = new p2.Box({ width: 2, height: 0.5 });
        kinematicBody.addShape(boxShape);
        this.scene.world.addBody(kinematicBody);
        // Create dynamic box
        var boxBody = new p2.Body({
            mass: 1,
            position: [0, 2]
        });
        boxBody.addShape(new p2.Box({ width: 0.5, height: 0.5 }));
        this.scene.world.addBody(boxBody);
        // Create dynamic circle connected to the kinematic body
        var circleBody = new p2.Body({
            mass: 1,
            position: [0, -0.5],
            velocity: [-1, 0]
        });
        circleBody.addShape(new p2.Circle({ radius: 0.25 }));
        this.scene.world.addBody(circleBody);
        this.scene.world.addConstraint(new p2.DistanceConstraint(kinematicBody, circleBody));
        var worldInClusure = this.scene.world; //在闭包中的world
        this.scene.world.on("postStep", function () {
            // Kinematic bodies are controlled via velocity.
            kinematicBody.velocity[1] = 2 * Math.sin(worldInClusure.time * 2);
        });
    };
    Examples_kinematic.prototype.loop = function () {
        this.debugDraw.drawDebug();
        var numIslands = this.scene.world.islandManager.islands.length;
        this.tfInfo.text = "number of islands:" + numIslands;
    };
    Examples_kinematic.prototype.createDebug = function () {
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
    return Examples_kinematic;
}(egret.Sprite));
__reflect(Examples_kinematic.prototype, "Examples_kinematic");
//# sourceMappingURL=Examples_kinematic.js.map