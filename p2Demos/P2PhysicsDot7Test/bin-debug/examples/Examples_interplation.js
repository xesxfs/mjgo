var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * interplation 插值的位置和旋转，用于显示，这个案例目的可以演示物理世界更新很慢，但是显示世界可以用插值演算来显示顺畅的位置和旋转
 * 蓝色圆圈是差值位置，黑色圆圈是长间隔更新物理世界的位置，可以看到差值位置做显示会很平滑
 * Body.interpolatedPosition The interpolated position of the body. Use this for rendering.
 * Body.interpolatedAngle The interpolated angle of the body. Use this for rendering.
 * @author
 *
 */
var Examples_interplation = (function (_super) {
    __extends(Examples_interplation, _super);
    function Examples_interplation() {
        var _this = _super.call(this) || this;
        //物理世界转换系数
        _this.factor = 50;
        _this.lastCallTime = -1; //in seconds
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.loop, _this);
        return _this;
    }
    Examples_interplation.prototype.onAdded2stage = function (e) {
        //初始化P2Space
        jbP2.P2Space.initSpace(this.factor, new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));
        //创建world
        this.world = new p2.World();
        //set p2.world.sleepMode
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.objsCtn = new egret.Sprite();
        this.addChild(this.objsCtn);
        this.drawCtn = new egret.Sprite();
        this.addChild(this.drawCtn);
        this.drawCtn.x = this.stage.stageWidth / 2;
        this.drawCtn.y = -this.stage.stageHeight / 2;
        this.world.sleepMode = p2.World.NO_SLEEPING;
        this.world.gravity = [0, 0];
        this.world.islandSplit = true; //使用islandSplit
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this.objsCtn, this.world);
        this.createObjs();
        this.createDebug();
        this.tfInfo = new egret.TextField();
        this.addChild(this.tfInfo);
        this.lastCallTime = egret.getTimer() / 1000; //in seconds
        egret.Ticker.getInstance().register(this.p2RunStep, this); //register update step of p2.wolrd  
    };
    Examples_interplation.prototype.createObjs = function () {
        //code here
        // Add a circle
        var circleShape = new p2.Circle({ radius: 1 });
        var velo = [0, 0], pos = [-3, 3];
        this.circleBody = new p2.Body({ mass: 1, velocity: velo, position: pos });
        this.circleBody.damping = 0;
        this.circleBody.addShape(circleShape);
        this.world.addBody(this.circleBody);
        this.circleBody.interpolatedPosition = [pos[0], pos[1]]; //给插值位置做初始化
    };
    Examples_interplation.prototype.drawCircles = function () {
        this.circleBody.velocity[0] = .5; //
        this.circleBody.velocity[1] = 0; //
        var radius = this.circleBody.shapes[0].radius;
        radius = jbP2.P2Space.convertP2ValueToEgret(radius);
        var g = this.drawCtn.graphics;
        g.clear();
        // Draw the blue circle at the interpolated position
        g.lineStyle(1, 0x0000ff);
        g.drawCircle(jbP2.P2Space.convertP2ValueToEgret(this.circleBody.interpolatedPosition[0]), jbP2.P2Space.convertP2Y_To_EgretY(this.circleBody.interpolatedPosition[1]), radius);
        // Draw the black circle at the fixed step position
        g.lineStyle(1, 0);
        g.drawCircle(jbP2.P2Space.convertP2ValueToEgret(this.circleBody.position[0]), jbP2.P2Space.convertP2Y_To_EgretY(this.circleBody.position[1]), radius);
        g.endFill();
    };
    //update step
    Examples_interplation.prototype.p2RunStep = function (dt) {
        // Fixed time step to use for physics. We use a huge timestep of 0.5 to see what's going on.
        // NOTE: For most games, fixedTimeStep=1/60 is a good choice.
        var fixedTimeStep = 0.5; // seconds
        // Max number of fixed physics timesteps to do in one .step(). We choose a large number to see what is going on.
        // NOTE: for most games, maxSubSteps=3 is probably a good choice.
        var maxSubSteps = 10;
        var currTime = egret.getTimer() / 1000; //in seconds
        var timeSinceLastCall = currTime - this.lastCallTime;
        this.lastCallTime = currTime;
        // Now step the world.
        // This will do integration at a fixed time step, but compute interpolated positions
        // which are stored in body.interpolatedPosition.
        this.world.step(fixedTimeStep, timeSinceLastCall, maxSubSteps);
        jbP2.P2Space.updateWorldBodiesSkin(this.world); //更新p2World内所有刚体皮肤显示
    };
    Examples_interplation.prototype.loop = function () {
        this.debugDraw.drawDebug();
        this.drawCircles();
        var numIslands = this.world.islandManager.islands.length;
        this.tfInfo.text = "number of islands:" + numIslands;
    };
    Examples_interplation.prototype.createDebug = function () {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
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
    return Examples_interplation;
}(egret.Sprite));
__reflect(Examples_interplation.prototype, "Examples_interplation");
//# sourceMappingURL=Examples_interplation.js.map