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
var Examples_surfaceVelocity_tractor_capsual = (function (_super) {
    __extends(Examples_surfaceVelocity_tractor_capsual, _super);
    function Examples_surfaceVelocity_tractor_capsual() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.loop, _this);
        return _this;
    }
    Examples_surfaceVelocity_tractor_capsual.prototype.onAdded2stage = function (e) {
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
    Examples_surfaceVelocity_tractor_capsual.prototype.createObjs = function () {
        //code here
        var mtlGround = new p2.Material(1001); //地面材质
        var mtlTractor = new p2.Material(1002); //履带材质
        var box = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 200, 100, 50, 50, 0, p2.Body.DYNAMIC); //box1
        box.shapes[0].material = mtlGround;
        var tractorShape = new p2.Capsule({ length: 1, radius: 0.2 }); //new p2.Rectangle(p2Wid, p2Hei);
        var tractorBody = new p2.Body({ mass: 1, position: [3, 3], angle: 0 });
        tractorBody.type = p2.Body.DYNAMIC;
        tractorBody.addShape(tractorShape); //给刚体添加p2.Shape
        tractorBody.shapes[0].material = mtlTractor;
        this.scene.world.addBody(tractorBody);
        //设定接触材质，其中参数surfaceVelocity = -.5
        var contactMaterial1 = new p2.ContactMaterial(mtlGround, mtlTractor, { surfaceVelocity: -0.5, friction: 10 });
        this.scene.world.addContactMaterial(contactMaterial1);
        var wallBody;
        wallBody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        wallBody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        var groundBody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        groundBody.shapes[0].material = mtlGround;
    };
    Examples_surfaceVelocity_tractor_capsual.prototype.loop = function () {
        this.debugDraw.drawDebug();
        var numIslands = this.scene.world.islandManager.islands.length;
        this.tfInfo.text = "number of islands:" + numIslands;
    };
    Examples_surfaceVelocity_tractor_capsual.prototype.createDebug = function () {
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
    return Examples_surfaceVelocity_tractor_capsual;
}(egret.Sprite));
__reflect(Examples_surfaceVelocity_tractor_capsual.prototype, "Examples_surfaceVelocity_tractor_capsual");
//# sourceMappingURL=Examples_surfaceVelocity_tractor_capsual.js.map