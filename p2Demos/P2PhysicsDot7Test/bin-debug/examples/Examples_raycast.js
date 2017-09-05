var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * raycast
 * @author
 * 结论：p2.ray相关类都没，所以不能工作
 */
var Examples_raycast = (function (_super) {
    __extends(Examples_raycast, _super);
    function Examples_raycast() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.loop, _this);
        return _this;
    }
    Examples_raycast.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody.id = 2;
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 250, 50, 40, 0, p2.Body.DYNAMIC); //ball1
        tembody.id = 4;
        this.result = new p2.RaycastResult();
        this.hitPoint = p2.vec2.create();
        this.ray = new p2.Ray({
            mode: p2.Ray.CLOSEST
        });
        this.createDebug();
    };
    Examples_raycast.prototype.loop = function () {
        this.debugDraw.drawDebug();
        this.rayHitStep();
    };
    Examples_raycast.prototype.rayHitStep = function () {
        var rayDispFromX = 300;
        var rayDispFromY = 350;
        var rayDispToX = 200;
        var rayDispToY = 200;
        this.ray.from[0] = jbP2.P2Space.convertEgretValueToP2(rayDispFromX);
        this.ray.from[1] = jbP2.P2Space.convertEgretY_To_P2Y(rayDispFromY);
        this.ray.to[0] = jbP2.P2Space.convertEgretValueToP2(rayDispToX);
        this.ray.to[1] = jbP2.P2Space.convertEgretY_To_P2Y(rayDispToY);
        this.ray.update();
        if (this.scene.world.raycast(this.result, this.ray)) {
            //console.log("射线检测有碰撞");
            this.result.getHitPoint(this.hitPoint, this.ray);
            this.debugDraw.drawRay(this.ray.from, this.hitPoint, 0xff0000);
        }
        else {
            this.debugDraw.drawRay(this.ray.from, this.ray.to, 0x0000ff);
        }
        this.result.reset();
    };
    Examples_raycast.prototype.createDebug = function () {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.scene.world);
        this.debugSpr = new egret.Sprite();
        this.addChild(this.debugSpr);
        this.debugDraw.setSprite(this.debugSpr);
        this.debugDraw.setLineWidth(0.02);
        //this.debugSpr.x = this.stage.stageWidth / 2;
        this.debugSpr.y = this.stage.stageHeight;
        var scale = 50;
        this.debugSpr.scaleX = scale;
        this.debugSpr.scaleY = -scale;
    };
    return Examples_raycast;
}(egret.Sprite));
__reflect(Examples_raycast.prototype, "Examples_raycast");
//# sourceMappingURL=Examples_raycast.js.map