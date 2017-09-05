var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 凸多边形测试，convex是凸多边形，如果 vertices是凹多边形会出错
 * 注意vertices在p2坐标系中要满足逆时针顺序，不然报错
 * @author
 *
 */
var Examples_convex = (function (_super) {
    __extends(Examples_convex, _super);
    function Examples_convex() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.loop, _this);
        return _this;
    }
    Examples_convex.prototype.onAdded2stage = function (e) {
        this.sceneCtn = new egret.Sprite();
        this.addChild(this.sceneCtn);
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        this.mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 100, 200, 50, 10, p2.Body.DYNAMIC); //box1
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 250, 50, 40, 0, p2.Body.DYNAMIC); //ball1
        this.createUpTriangle();
        this.createPolygon();
        this.createDebug();
    };
    //注意这里是按照p2坐标系y轴向上，x轴向右来顺时针创建vertices
    Examples_convex.prototype.createUpTriangle = function () {
        // Add a triangle convex----------------------------------------------------------------------
        var vertices = []; //顶点列表
        var vertex; // Note: vertices are added counter-clockwise
        //这三个点会形成一个方向朝上的尖角三角形
        vertex = [0, 50];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]); //注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        vertex = [-40, -40];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]); //注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        vertex = [40, -40];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]); //注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        var convexPos = [400, 250];
        convexPos[0] = jbP2.P2Space.convertEgretValueToP2(convexPos[0]);
        convexPos[1] = jbP2.P2Space.convertEgretY_To_P2Y(convexPos[1]);
        var convexShape = new p2.Convex({ vertices: vertices });
        var convexBody = new p2.Body({
            mass: 1,
            position: convexPos
        });
        convexBody.addShape(convexShape);
        this.scene.world.addBody(convexBody);
        //---------------------------------------------------------------------------------
    };
    //注意这里是按照p2坐标系y轴向上，x轴向右来顺时针创建vertices
    Examples_convex.prototype.createPolygon = function () {
        // Add a convex----------------------------------------------------------------------
        var vertices = []; //顶点列表
        var vertex; // Note: vertices are added counter-clockwise
        //这三个点会形成一个方向朝上的尖角三角形
        vertex = [0, 50];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]); //注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        vertex = [-40, 0];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]); //注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        vertex = [-40, -40];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]); //注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        vertex = [0, -60];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]); //注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        vertex = [90, -40];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]); //注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        vertex = [90, -10];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]); //注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        vertex = [80, 10];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]); //注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        var convexPos = [200, 250];
        convexPos[0] = jbP2.P2Space.convertEgretValueToP2(convexPos[0]);
        convexPos[1] = jbP2.P2Space.convertEgretY_To_P2Y(convexPos[1]);
        var convexShape = new p2.Convex({ vertices: vertices });
        var convexBody = new p2.Body({
            mass: 1,
            position: convexPos
        });
        convexBody.type = p2.Body.STATIC;
        convexBody.addShape(convexShape);
        this.scene.world.addBody(convexBody);
        //---------------------------------------------------------------------------------
    };
    Examples_convex.prototype.loop = function () {
        this.debugDraw.drawDebug();
    };
    Examples_convex.prototype.createDebug = function () {
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
    return Examples_convex;
}(egret.Sprite));
__reflect(Examples_convex.prototype, "Examples_convex");
//# sourceMappingURL=Examples_convex.js.map