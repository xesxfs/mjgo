var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 在Examples_suspension基础上，继续封装车辆，测试控制车体旋转
 * @author
 */
var Examples_carSuspension = (function (_super) {
    __extends(Examples_carSuspension, _super);
    function Examples_carSuspension() {
        var _this = _super.call(this) || this;
        _this.chassisAnglarForceDefault = 50; //车体转动默认角力
        _this.wheelAnglarForceDefault = 15; //轮子转动默认角力
        _this.chassisX = 200;
        _this.chassisY = 100;
        _this.chassisW = 100;
        _this.chassisH = 50;
        _this.wheelR = 25;
        _this.dirHorizontal = 0;
        _this.dirVertical = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_carSuspension.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //给予默认摩擦力较大值，防止轮子滑动
        this.scene.world.defaultContactMaterial.friction = 40;
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody.id = 2;
        this.createVehicle();
        this.setupUI();
        egret.Ticker.getInstance().register(this.updateChassisAnglarForce, this); //
    };
    Examples_carSuspension.prototype.createVehicle = function () {
        var chassis = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, this.chassisX, this.chassisY, this.chassisW, this.chassisH, 0, p2.Body.DYNAMIC); //box1
        var wheelOffset;
        wheelOffset = new egret.Point(-this.chassisW * .5, this.chassisH * .5);
        this.wheelb = this.setupWheel(chassis, wheelOffset);
        wheelOffset = new egret.Point(this.chassisW * .5, this.chassisH * .5);
        this.wheelf = this.setupWheel(chassis, wheelOffset);
        this.chassis = chassis;
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false;
    };
    Examples_carSuspension.prototype.setupWheel = function (body1, wheelOffset) {
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
    Examples_carSuspension.prototype.setupUI = function () {
        this.btnHor = jbP2.DispUtil.createBitmapByName("rect");
        this.btnHor.x = this.btnHor.width * .5;
        this.btnHor.y = this.btnHor.height * .5 + 100;
        this.btnHor.touchEnabled = true;
        this.addChild(this.btnHor);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnHorTouchBegin, this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnHorTouchMove, this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnHorTouchEnd, this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnHorTouchEnd, this);
        this.btnVer = jbP2.DispUtil.createBitmapByName("rect");
        this.btnVer.x = this.stage.stageWidth - this.btnHor.width * .5;
        this.btnVer.y = this.btnVer.height * .5 + 100;
        this.btnVer.touchEnabled = true;
        this.addChild(this.btnVer);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnVerTouchBegin, this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnVerTouchMove, this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnVerTouchEnd, this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnVerTouchEnd, this);
    };
    Examples_carSuspension.prototype.onBtnHorTouchBegin = function (e) {
        this.updateDirHorizontalValue(e.stageX, e.stageY);
    };
    Examples_carSuspension.prototype.onBtnHorTouchMove = function (e) {
        this.updateDirHorizontalValue(e.stageX, e.stageY);
    };
    Examples_carSuspension.prototype.onBtnHorTouchEnd = function (e) {
        this.dirHorizontal = 0;
    };
    Examples_carSuspension.prototype.updateDirHorizontalValue = function (stageX, stageY) {
        var local = this.btnHor.globalToLocal(stageX, stageY);
        if (local.x > this.btnHor.width * 0.5) {
            this.dirHorizontal = 1;
        }
        else {
            this.dirHorizontal = -1;
        }
    };
    Examples_carSuspension.prototype.onBtnVerTouchBegin = function (e) {
        this.updateDirVerzontalValue(e.stageX, e.stageY);
    };
    Examples_carSuspension.prototype.onBtnVerTouchMove = function (e) {
        this.updateDirVerzontalValue(e.stageY, e.stageY);
    };
    Examples_carSuspension.prototype.onBtnVerTouchEnd = function (e) {
        this.dirVertical = 0;
    };
    Examples_carSuspension.prototype.updateDirVerzontalValue = function (stageX, stageY) {
        var local = this.btnVer.globalToLocal(stageX, stageY);
        if (local.y > this.btnVer.height * 0.5) {
            this.dirVertical = 1;
        }
        else {
            this.dirVertical = -1;
        }
    };
    Examples_carSuspension.prototype.updateChassisAnglarForce = function () {
        if (this.chassis == null) {
            return;
        }
        var chassisAnglarForce = this.chassisAnglarForceDefault;
        if (this.dirVertical == -1) {
            this.chassis.angularForce = chassisAnglarForce;
        }
        else if (this.dirVertical == 1) {
            this.chassis.angularForce = -chassisAnglarForce;
        }
        var wheelAnglarForce = this.wheelAnglarForceDefault;
        if (this.dirHorizontal == 1) {
            this.wheelf.angularForce = -wheelAnglarForce;
            this.wheelb.angularForce = -wheelAnglarForce;
        }
        else if (this.dirHorizontal == -1) {
            this.wheelf.angularForce = wheelAnglarForce;
            this.wheelb.angularForce = wheelAnglarForce;
        }
    };
    return Examples_carSuspension;
}(egret.Sprite));
__reflect(Examples_carSuspension.prototype, "Examples_carSuspension");
//# sourceMappingURL=Examples_carSuspension.js.map