var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 这里测试jbp2里面封装的工具
 */
var Examples_addBasicBody2 = (function (_super) {
    __extends(Examples_addBasicBody2, _super);
    function Examples_addBasicBody2() {
        var _this = _super.call(this) || this;
        //物理世界转换系数
        _this.factor = 50;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_addBasicBody2.prototype.onAdded2stage = function (e) {
        this.createGameScene();
    };
    /**
    * 创建游戏场景
    */
    Examples_addBasicBody2.prototype.createGameScene = function () {
        jbP2.P2Space.initSpace(this.factor, new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));
        //创建world
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        //创建plane
        var planeShape = new p2.Plane();
        var planeBody = new p2.Body();
        planeBody.type = p2.Body.STATIC;
        planeBody.addShape(planeShape);
        planeBody.displays = [];
        this.world.addBody(planeBody);
        egret.Ticker.getInstance().register(this.p2RunStep, this);
        jbP2.P2Space.addOneBox(this.world, this, 400, 300, 800, 25, 0, p2.Body.STATIC); //ground
        jbP2.P2Space.addOneBox(this.world, this, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        jbP2.P2Space.addOneBox(this.world, this, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        jbP2.P2Space.addOneBox(this.world, this, 400, 400, 250, 5, 10, p2.Body.STATIC); //middle static
        jbP2.P2Space.addOneBox(this.world, this, 400, 100, 200, 50, 10, p2.Body.DYNAMIC); //box1
        jbP2.P2Space.addOneBall(this.world, this, 400, 50, 40, 0, p2.Body.DYNAMIC); //ball1
        jbP2.P2Space.addOneBall(this.world, this, 100, 100, 30, 0, p2.Body.DYNAMIC); //ball1
    };
    /**
    * p2 physics run step
    */
    Examples_addBasicBody2.prototype.p2RunStep = function (dt) {
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
        this.world.step(dt / 1000); //p2.World.step
        //更新p2World内所有刚体皮肤显示
        jbP2.P2Space.updateWorldBodiesSkin(this.world);
    };
    return Examples_addBasicBody2;
}(egret.DisplayObjectContainer));
__reflect(Examples_addBasicBody2.prototype, "Examples_addBasicBody2");
//# sourceMappingURL=Examples_addBasicBody2.js.map