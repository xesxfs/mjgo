var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* 测试车辆轮子的摩擦力，默认车辆沿着下坡的运动时候，轮子运动状况
* @author
*
*/
var Examples_carWheelFrictionTest = (function (_super) {
    __extends(Examples_carWheelFrictionTest, _super);
    function Examples_carWheelFrictionTest() {
        var _this = _super.call(this) || this;
        _this.dir = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_carWheelFrictionTest.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //给予默认摩擦力较大值，防止轮子滑动
        this.scene.world.defaultContactMaterial.friction = 100;
        //this.scene.world.defaultContactMaterial.restitution = .3;
        //this.scene.world.defaultContactMaterial.stiffness =100;
        //this.scene.world.gravity
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage, this, this.scene.world);
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 10, p2.Body.STATIC); //middle static
        this.setupVehicle();
    };
    Examples_carWheelFrictionTest.prototype.setupVehicle = function () {
        var chassisX = 200; //chassis init x
        var chassisY = 200; //...y
        var chassisW = 80; //...width
        var chassisH = 40; //...height
        var wheelR = 20; //wheel radius
        var wheelFPos = new egret.Point(Math.floor(chassisX + chassisW * .5), Math.floor(chassisY + chassisH * .5)); //front wheel position
        var wheelBPos = new egret.Point(Math.floor(chassisX - chassisW * .5), Math.floor(chassisY + chassisH * .5)); //back wheel position
        var chassisBody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, chassisX, chassisY, chassisW, chassisH, 0, p2.Body.DYNAMIC); //chassis body
        var wheelFrontBody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, wheelFPos.x, wheelFPos.y, wheelR, 0, p2.Body.DYNAMIC); //wheel body
        var wheelBackBody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, wheelBPos.x, wheelBPos.y, wheelR, 0, p2.Body.DYNAMIC); //wheel body
        chassisBody.mass = 1;
        var pvtJtF; //constraint for wheel and body. front
        var pvtJtB; //... back
        var p2PvtPointX; //物理世界的轮子位置x
        var p2PvtPointY; //物理世界的轮子位置y
        //setup constraint for wheelFront
        p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(wheelFPos.x);
        p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(wheelFPos.y);
        pvtJtF = new p2.RevoluteConstraint(wheelFrontBody, chassisBody, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtF.collideConnected = false;
        this.scene.world.addConstraint(pvtJtF);
        //setup constraint for wheelBack
        p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(wheelBPos.x);
        p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(wheelBPos.y);
        pvtJtB = new p2.RevoluteConstraint(wheelBackBody, chassisBody, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtB.collideConnected = false;
        this.scene.world.addConstraint(pvtJtB);
        //setup motor--------------------
        //注意如果enableMotor开启，切设置motorSpeed＝0，则产生了刹闸效果，motor本身具有阻力
        //所以如果需要让轮子能自由转动，就要控制motor的开启
        //        pvtJtF.enableMotor();
        //        pvtJtB.enableMotor();
        //        pvtJtF.setMotorSpeed(0);
        //        pvtJtB.setMotorSpeed(0);
        //-------------------------------
        this.chassis = chassisBody;
        this.wheelf = wheelFrontBody;
        this.wheelb = wheelBackBody;
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false;
    };
    return Examples_carWheelFrictionTest;
}(egret.Sprite));
__reflect(Examples_carWheelFrictionTest.prototype, "Examples_carWheelFrictionTest");
//# sourceMappingURL=Examples_carWheelFrictionTest.js.map