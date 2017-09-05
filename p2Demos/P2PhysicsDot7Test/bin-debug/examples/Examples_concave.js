var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * concave
 * 注意：这里要设计一下如何同步concave皮肤
 * @author
 *
 */
var Examples_concave = (function (_super) {
    __extends(Examples_concave, _super);
    function Examples_concave() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_concave.prototype.onAdded2stage = function (e) {
        this.objsCtn = new egret.Sprite();
        this.addChild(this.objsCtn);
        this.drawCtn = new egret.Sprite();
        this.addChild(this.drawCtn);
        this.scene = new jbP2.SimpleP2Scene(this.stage, this.objsCtn);
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this.objsCtn, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall                 
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 480, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 100, 50, 50, 10, p2.Body.DYNAMIC); //box1
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 250, 50, 40, 0, p2.Body.DYNAMIC); //ball1
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 100, 100, 30, 0, p2.Body.DYNAMIC); //ball1
        this.createConcave();
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        //this.createDebug();
    };
    Examples_concave.prototype.loop = function () {
        var convex = this.concave.shapes[0];
        this.drawConvex(convex, this.concave);
        //this.debugDraw.drawDebug();
    };
    Examples_concave.prototype.createConcave = function () {
        // Create a concave body
        var concaveBody = new p2.Body({
            mass: 1,
            position: [8, 5]
        });
        // Give a concave path to the body.
        // Body.prototype.fromPolygon will automatically add shapes at
        // proper offsets and adjust the center of mass.
        var path = [[-1, 1],
            [-1, 0],
            [1, 0],
            [1, 1],
            [0.5, 0.5]];
        concaveBody.fromPolygon(path);
        // Add the body to the world
        this.scene.world.addBody(concaveBody);
        this.concave = concaveBody;
    };
    Examples_concave.prototype.drawConvex = function (shape, b) {
        var path = b["concavePath"];
        var l = path.length;
        var g = this.drawCtn.graphics;
        g.clear();
        var worldPoint = [b.position[0], b.position[1]];
        worldPoint[0] = jbP2.P2Space.convertP2ValueToEgret(worldPoint[0]);
        worldPoint[1] = jbP2.P2Space.convertP2Y_To_EgretY(worldPoint[1]);
        g.moveTo(worldPoint[0], worldPoint[1]); //移动到body.position
        g.lineStyle(1, 0x0000ff);
        g.drawCircle(worldPoint[0], worldPoint[1], 4); //在body.position 画圆圈
        g.lineStyle(1, 0x00ff00);
        for (var i = 0; i < l; i++) {
            b.toWorldFrame(worldPoint, path[i]);
            worldPoint[0] = jbP2.P2Space.convertP2ValueToEgret(worldPoint[0]);
            worldPoint[1] = jbP2.P2Space.convertP2Y_To_EgretY(worldPoint[1]);
            g.moveTo(worldPoint[0], worldPoint[1]);
            b.toWorldFrame(worldPoint, path[(i + 1) % l]);
            worldPoint[0] = jbP2.P2Space.convertP2ValueToEgret(worldPoint[0]);
            worldPoint[1] = jbP2.P2Space.convertP2Y_To_EgretY(worldPoint[1]);
            g.lineTo(worldPoint[0], worldPoint[1]);
        }
        g.endFill();
    };
    Examples_concave.prototype.createDebug = function () {
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
    return Examples_concave;
}(egret.Sprite));
__reflect(Examples_concave.prototype, "Examples_concave");
//# sourceMappingURL=Examples_concave.js.map