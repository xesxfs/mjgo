var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 物理世界的碰撞事件2,因为觉得Examples_worldImpact中碰撞点获得有点绕弯，
 * 直接访问impact事件参数 event.contactEquation
 * @author
 * 想获得碰撞位置,如下方案:
 * 1 监听impact事件，然后访问Event.contactEquation,查看Examples_worldImpact2
 * 2 监听impact事件，遍历world.narrowphase.contactEquations
 * 3 监听beginContact事件，遍历world.narrowphase.contactEquations
 */
var Examples_worldImpact2 = (function (_super) {
    __extends(Examples_worldImpact2, _super);
    function Examples_worldImpact2() {
        var _this = _super.call(this) || this;
        _this.playerBodyId = 4;
        Examples_worldImpact2.inst = _this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_worldImpact2.prototype.onAdded2stage = function (e) {
        this.objsCtn = new egret.Sprite();
        this.addChild(this.objsCtn);
        this.contactDrawing = new egret.Sprite();
        this.addChild(this.contactDrawing);
        this.scene = new jbP2.SimpleP2Scene(this.stage, this.objsCtn);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 10, p2.Body.STATIC); //middle static
        tembody.id = 2;
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 400, 50, 40, 0, p2.Body.DYNAMIC); //ball1
        tembody.id = this.playerBodyId;
        this.scene.world.on("impact", this.onWorldImpact); //注意这里没有context参数了,不能传入this
    };
    Examples_worldImpact2.prototype.onWorldImpact = function (event) {
        console.log("Examples_worldImpact.onWorldImpact!");
        var bodyA = event.bodyA;
        var bodyB = event.bodyB;
        console.log("bodyA.id:" + bodyA.id + ",bodyB.id:" + bodyB.id);
        Examples_worldImpact2.inst.onBeginContactCheck(event);
    };
    Examples_worldImpact2.prototype.onBeginContactCheck = function (event) {
        var bodyA = event.bodyA;
        var bodyB = event.bodyB;
        if (bodyA.id == this.playerBodyId || bodyB.id == this.playerBodyId) {
            console.log("on target sensor BeginContact bodyA.id:" + bodyA.id + ",bodyB.id:" + bodyB.id);
            var hittedBody; //与playerBodyId碰撞的刚体
            if (bodyA.id == this.playerBodyId) {
                hittedBody = bodyB;
            }
            else if (bodyB.id == this.playerBodyId) {
                hittedBody = bodyA;
            }
            console.log("hittedBody.id:" + hittedBody.id);
            if (hittedBody.shapes[0].sensor == true) {
                //碰撞到了传感器，不是普通dynamic刚体
                console.log("碰撞到了传感器，不是普通dynamic刚体,id:" + hittedBody.id);
            }
            else {
                this.getPlayerContactPos(event.contactEquation); //这里是计算和其他Body.type=dynamic的刚体碰撞的位置
            }
        }
    };
    //获得player碰撞位置
    Examples_worldImpact2.prototype.getPlayerContactPos = function (c) {
        if (c.bodyA.id == this.playerBodyId || c.bodyB.id == this.playerBodyId) {
            var ptA = c.contactPointA; //pointA delta向量，上次使用contactPointB貌似没用对，用contactPointA就对了
            var contactPos = [c.bodyA.position[0] + ptA[0], c.bodyA.position[1] + ptA[1]]; //在BodyA位置加上delta向量，这个就是碰撞发生的p2位置
            var dispX = jbP2.P2Space.convertP2ValueToEgret(contactPos[0]); //转换到egret世界的位置
            var dispY = jbP2.P2Space.convertP2Y_To_EgretY(contactPos[1]); //转换到egret世界的位置
            //drawing the point to the graphics
            this.contactDrawing.graphics.lineStyle(1, 0);
            this.contactDrawing.graphics.drawCircle(dispX, dispY, 15);
            this.contactDrawing.graphics.endFill();
        }
    };
    return Examples_worldImpact2;
}(egret.Sprite));
__reflect(Examples_worldImpact2.prototype, "Examples_worldImpact2");
//# sourceMappingURL=Examples_worldImpact2.js.map