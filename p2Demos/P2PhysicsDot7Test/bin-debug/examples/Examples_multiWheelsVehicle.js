var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试多轮车辆
 * @author
 *
 */
var Examples_multiWheelsVehicle = (function (_super) {
    __extends(Examples_multiWheelsVehicle, _super);
    function Examples_multiWheelsVehicle() {
        var _this = _super.call(this) || this;
        _this.chassisAnglarForceDefault = 50; //车体转动默认角力
        _this.wheelAnglarForceDefault = 15; //轮子转动默认角力
        _this.chassisX = 200;
        _this.chassisY = 100;
        _this.chassisW = 100;
        _this.chassisH = 40;
        _this.wheelR = 20;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_multiWheelsVehicle.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        var mouseJt = new MouseJointHelper(this.stage, this, this.scene.world, true);
        //给予默认摩擦力较大值，防止轮子滑动
        this.scene.world.defaultContactMaterial.friction = 40;
        jbP2.KeyManager.init();
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody.id = 2;
        this.createVehicle();
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this); //
    };
    Examples_multiWheelsVehicle.prototype.createVehicle = function () {
        var chassis = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, this.chassisX, this.chassisY, this.chassisW, this.chassisH, 0, p2.Body.DYNAMIC); //box1
        console.log("chassis.mass:" + chassis.mass);
        chassis.mass = 2;
        var wheelOffset;
        wheelOffset = new egret.Point(-this.chassisW * .5, this.chassisH * .5);
        this.wheelb = this.setupWheel(chassis, wheelOffset);
        wheelOffset = new egret.Point(this.chassisW * .5, this.chassisH * .5);
        this.wheelf = this.setupWheel(chassis, wheelOffset);
        wheelOffset = new egret.Point(0, this.chassisH * .5);
        this.wheelm = this.setupWheel(chassis, wheelOffset);
        this.chassis = chassis;
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false;
        this.wheelm.allowSleep = false;
    };
    Examples_multiWheelsVehicle.prototype.setupWheel = function (body1, wheelOffset) {
        var body2 = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, this.chassisX + wheelOffset.x, this.chassisY + wheelOffset.y, this.wheelR, 0, p2.Body.DYNAMIC); //box1
        var localPt1 = new egret.Point(body2.position[0] - body1.position[0], body2.position[1] - body1.position[1]); //轮子在车体空间的位置
        var localPt2 = new egret.Point(0, 0); //轮子在自己空间的位置
        //prismatic constraint----------------------------------------------------------------                                
        var localAxisBodyA = [0, 1]; //在bodyA中局部坐标系的一个Axis
        var prismaticUpper = this.chassisH * .5; //slider沿着localAxisA轴的最大滑动值
        var prismaticLower = -this.chassisH * .5; //slider沿着localAxisA轴的最小滑动值
        prismaticUpper = jbP2.P2Space.convertEgretValueToP2(prismaticUpper); //注意这里转换标量即可
        prismaticLower = jbP2.P2Space.convertEgretValueToP2(prismaticLower); //注意这里转换标量即可
        var prismatic = new p2.PrismaticConstraint(body1, body2, {
            localAnchorA: [localPt1.x, localPt1.y],
            localAnchorB: [localPt2.x, localPt2.y],
            localAxisA: [0, 1],
            upperLimit: prismaticUpper,
            lowerLimit: prismaticLower,
            disableRotationalLock: true //true则bodyB可以绕其锚点旋转，false则bodyB不可旋转
        });
        prismatic.collideConnected = false;
        this.scene.world.addConstraint(prismatic);
        //----------------------------------------------------------------   
        //spring constraint------------------------------------------------------------------------------------
        var stiff = 60; //弹簧硬度
        var damp = 10; //弹簧阻尼
        var springlocalPtA = new egret.Point(body2.position[0] - body1.position[0], body2.position[1] - body1.position[1]); //轮子在车体空间的位置
        var springlocalPtB = new egret.Point(0, 0); //轮子在自己空间的位置
        var spring = new p2.LinearSpring(body1, body2, { stiffness: stiff,
            damping: damp,
            localAnchorA: [springlocalPtA.x, springlocalPtA.y],
            localAnchorB: [springlocalPtB.x, springlocalPtB.y]
        });
        this.scene.world.addSpring(spring);
        //end------------------------------------------------------------------------------------
        return body2;
    };
    Examples_multiWheelsVehicle.prototype.updateKeyCtrl = function () {
        if (this.chassis == null) {
            return;
        }
        var chassisAnglarForce = this.chassisAnglarForceDefault;
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.UP)) {
            this.chassis.angularForce = chassisAnglarForce;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.DOWN)) {
            this.chassis.angularForce = -chassisAnglarForce;
        }
        var wheelAnglarForce = this.wheelAnglarForceDefault;
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            this.wheelf.angularForce = wheelAnglarForce;
            this.wheelb.angularForce = wheelAnglarForce;
            this.wheelm.angularForce = wheelAnglarForce;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            this.wheelf.angularForce = -wheelAnglarForce;
            this.wheelb.angularForce = -wheelAnglarForce;
            this.wheelm.angularForce = -wheelAnglarForce;
        }
    };
    return Examples_multiWheelsVehicle;
}(egret.Sprite));
__reflect(Examples_multiWheelsVehicle.prototype, "Examples_multiWheelsVehicle");
//# sourceMappingURL=Examples_multiWheelsVehicle.js.map