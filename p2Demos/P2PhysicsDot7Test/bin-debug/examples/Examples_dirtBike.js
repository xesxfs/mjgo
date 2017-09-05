var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* 摩托车
* 后减震是真实软尾型
* @author
*/
var Examples_dirtBike = (function (_super) {
    __extends(Examples_dirtBike, _super);
    function Examples_dirtBike() {
        var _this = _super.call(this) || this;
        _this.chassisAnglarForceDefault = 150; //车体转动默认角力
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
    Examples_dirtBike.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        var mouseJt = new MouseJointHelper(this.stage, this, this.scene.world);
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
    Examples_dirtBike.prototype.createVehicle = function () {
        var chassis = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, this.chassisX, this.chassisY, this.chassisW, this.chassisH, 0, p2.Body.DYNAMIC); //box1
        var wheelOffset;
        wheelOffset = new egret.Point(-this.chassisW * .5, this.chassisH * .5);
        this.wheelb = this.setupBackWheel2(chassis, wheelOffset);
        wheelOffset = new egret.Point(this.chassisW * .75, this.chassisH * 1.55);
        var suspensionStart = new egret.Point(this.chassisW * .5, this.chassisH * .5);
        this.wheelf = this.setupFrontWheel(chassis, wheelOffset, suspensionStart);
        this.chassis = chassis;
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false;
    };
    /**
     * body1 chassis
     * wheelOffset 轮子相对车体的位置
     * suspensionStartOffset 减震开始位置相对车体的位置，从这里到轮子是减震滑槽
     */
    Examples_dirtBike.prototype.setupFrontWheel = function (body1, wheelOffset, suspensionStartOffset) {
        //p2减震起始点,减震和车体结合点
        var suspensionPosP2 = new egret.Point(this.chassisX + suspensionStartOffset.x, this.chassisY + suspensionStartOffset.y);
        suspensionPosP2.x = jbP2.P2Space.convertEgretValueToP2(suspensionPosP2.x);
        suspensionPosP2.y = jbP2.P2Space.convertEgretY_To_P2Y(suspensionPosP2.y);
        //p2轮子位置
        var wheelPosP2 = new egret.Point(this.chassisX + wheelOffset.x, this.chassisY + wheelOffset.y);
        wheelPosP2.x = jbP2.P2Space.convertEgretValueToP2(wheelPosP2.x);
        wheelPosP2.y = jbP2.P2Space.convertEgretY_To_P2Y(wheelPosP2.y);
        var suspensionDirEgret = new egret.Point(wheelOffset.x - suspensionStartOffset.x, wheelOffset.y - suspensionStartOffset.y); //在显示世界减震方向
        suspensionDirEgret.normalize(1);
        var suspensionDirP2 = new egret.Point(wheelPosP2.x - suspensionPosP2.x, wheelPosP2.y - suspensionPosP2.y); //p2世界减震的方向，suspensionStartOffset到轮子的方向   
        suspensionStartOffset.normalize(1);
        var angleRadP2 = Math.atan2(suspensionDirP2.y, suspensionDirP2.x); //减震槽的角度
        var angleDegP2 = angleRadP2 * 180 / Math.PI; //angle deg in p2
        var angleDegEgret = 360 - angleRadP2 * 180 / Math.PI; //angle deg in egret
        console.log("angleDegEgret:" + angleDegEgret % 360); //输出我们查看一下是多少
        var wheel = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, this.chassisX + wheelOffset.x, this.chassisY + wheelOffset.y, this.wheelR, 0, p2.Body.DYNAMIC); //wheel
        //这里sliderMover在创建时候不需要指定angle，因为后面的约束会禁止其旋转，约束会使其按照0度沿着约束轴运动
        var sliderMover = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, this.chassisX + wheelOffset.x, this.chassisY + wheelOffset.y, 20, 10, 0, p2.Body.DYNAMIC); //减震槽
        sliderMover.allowSleep = false;
        //在sliderShape中绘制出减震槽
        var sliderMoverShape = sliderMover.displays[0];
        var rect = new egret.Rectangle(0, 0, sliderMoverShape.width, sliderMoverShape.height);
        sliderMoverShape.graphics.lineStyle(2, 0xff0000);
        sliderMoverShape.graphics.moveTo(rect.width * .5, rect.width * .5); //移到中心点
        sliderMoverShape.graphics.lineTo(rect.width * .5 - suspensionDirEgret.x * 50, rect.height * .5 - suspensionDirEgret.y * 50); //绘制减震槽的线
        sliderMoverShape.graphics.endFill();
        //在车体中绘制减震槽
        var chassisShape = body1.displays[0];
        rect = new egret.Rectangle(0, 0, chassisShape.width, chassisShape.height);
        chassisShape.graphics.lineStyle(6, 0x0000ff); //绘制颜色
        chassisShape.graphics.moveTo(rect.width, rect.height); //移动到减震结合处
        chassisShape.graphics.lineTo(rect.width + suspensionDirEgret.x * 30, rect.height + suspensionDirEgret.y * 30); //绘制减震槽
        chassisShape.graphics.endFill();
        var localPt1 = new egret.Point(sliderMover.position[0] - body1.position[0], sliderMover.position[1] - body1.position[1]); //sliderMover在车体空间的位置
        var localPt2 = new egret.Point(0, 0); //sliderMover在自己空间的位置
        //prismatic constraint----------------------------------------------------------------                                
        var localAxisBodyA = [suspensionDirP2.x, suspensionDirP2.y]; //在bodyA中局部坐标系的一个Axis
        var prismaticUpper = this.chassisH * .5; //slider沿着localAxisA轴的最大滑动值
        var prismaticLower = -this.chassisH * .5; //slider沿着localAxisA轴的最小滑动值
        prismaticUpper = jbP2.P2Space.convertEgretValueToP2(prismaticUpper); //注意这里转换标量即可
        prismaticLower = jbP2.P2Space.convertEgretValueToP2(prismaticLower); //注意这里转换标量即可
        var prismatic = new p2.PrismaticConstraint(body1, sliderMover, {
            localAnchorA: [localPt1.x, localPt1.y],
            localAnchorB: [localPt2.x, localPt2.y],
            localAxisA: localAxisBodyA,
            upperLimit: prismaticUpper,
            lowerLimit: prismaticLower,
            disableRotationalLock: false //true则bodyB可以绕其锚点旋转，false则bodyB不可旋转
        });
        prismatic.collideConnected = false;
        this.scene.world.addConstraint(prismatic);
        //----------------------------------------------------------------   
        //spring constraint------------------------------------------------------------------------------------
        var stiff = 60; //弹簧硬度
        var damp = 10; //弹簧阻尼
        var springlocalPtA = new egret.Point(sliderMover.position[0] - body1.position[0], sliderMover.position[1] - body1.position[1]); //sliderMover在车体空间的位置
        var springlocalPtB = new egret.Point(0, 0); //轮子在自己空间的位置
        var spring = new p2.LinearSpring(body1, sliderMover, { stiffness: stiff,
            damping: damp,
            localAnchorA: [springlocalPtA.x, springlocalPtA.y],
            localAnchorB: [springlocalPtB.x, springlocalPtB.y]
        });
        this.scene.world.addSpring(spring);
        //end------------------------------------------------------------------------------------
        var p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(this.chassisX + wheelOffset.x);
        var p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(this.chassisY + wheelOffset.y);
        var pvtJtF = new p2.RevoluteConstraint(sliderMover, wheel, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtF.collideConnected = false;
        this.scene.world.addConstraint(pvtJtF);
        return wheel;
    };
    Examples_dirtBike.prototype.setupBackWheel2 = function (body1, wheelOffset) {
        var wheel;
        var p2PvtPointX;
        var p2PvtPointY;
        var pvtJtF;
        var cubePos = new egret.Point(this.chassisX + wheelOffset.x, this.chassisY + wheelOffset.y); //后轮连接架 pos
        var cubeSize = new egret.Point(60, 10); //后轮连接架 size
        var cubeChassisPvtPos = new egret.Point(cubePos.x + cubeSize.x * .5, cubePos.y); //后轮连接架和车体连接点
        var wheelConnCube = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, cubePos.x, cubePos.y, cubeSize.x, cubeSize.y, 0, p2.Body.DYNAMIC);
        wheelConnCube.allowSleep = false;
        //pivot joint of chassis and backwheel conn cube
        p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(cubeChassisPvtPos.x);
        p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(cubeChassisPvtPos.y);
        pvtJtF = new p2.RevoluteConstraint(body1, wheelConnCube, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtF.collideConnected = false;
        pvtJtF.setLimits(0, Math.PI / 10);
        this.scene.world.addConstraint(pvtJtF);
        //setup rotation constraint 车体和后轮连接架点RotationSpring
        var rotationalSpring = new p2.RotationalSpring(body1, wheelConnCube, { stiffness: 50, damping: 100 });
        rotationalSpring.restAngle = Math.PI / 10; //约束两个body之间的夹角，如果不指定，则默认等于约束建立时的夹角
        this.scene.world.addSpring(rotationalSpring);
        var wheelPos = new egret.Point(cubePos.x - cubeSize.x * .5, cubePos.y);
        wheel = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, wheelPos.x, wheelPos.y, this.wheelR, 0, p2.Body.DYNAMIC); //
        //pivot joint of backwheel and wheel conn cube
        p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(wheelPos.x);
        p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(wheelPos.y);
        pvtJtF = new p2.RevoluteConstraint(wheelConnCube, wheel, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtF.collideConnected = false;
        this.scene.world.addConstraint(pvtJtF);
        return wheel;
    };
    Examples_dirtBike.prototype.setupUI = function () {
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
    Examples_dirtBike.prototype.onBtnHorTouchBegin = function (e) {
        this.updateDirHorizontalValue(e.stageX, e.stageY);
    };
    Examples_dirtBike.prototype.onBtnHorTouchMove = function (e) {
        this.updateDirHorizontalValue(e.stageX, e.stageY);
    };
    Examples_dirtBike.prototype.onBtnHorTouchEnd = function (e) {
        this.dirHorizontal = 0;
    };
    Examples_dirtBike.prototype.updateDirHorizontalValue = function (stageX, stageY) {
        var local = this.btnHor.globalToLocal(stageX, stageY);
        if (local.x > this.btnHor.width * 0.5) {
            this.dirHorizontal = 1;
        }
        else {
            this.dirHorizontal = -1;
        }
    };
    Examples_dirtBike.prototype.onBtnVerTouchBegin = function (e) {
        this.updateDirVerzontalValue(e.stageX, e.stageY);
    };
    Examples_dirtBike.prototype.onBtnVerTouchMove = function (e) {
        this.updateDirVerzontalValue(e.stageY, e.stageY);
    };
    Examples_dirtBike.prototype.onBtnVerTouchEnd = function (e) {
        this.dirVertical = 0;
    };
    Examples_dirtBike.prototype.updateDirVerzontalValue = function (stageX, stageY) {
        var local = this.btnVer.globalToLocal(stageX, stageY);
        if (local.y > this.btnVer.height * 0.5) {
            this.dirVertical = 1;
        }
        else {
            this.dirVertical = -1;
        }
    };
    Examples_dirtBike.prototype.updateChassisAnglarForce = function () {
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
    return Examples_dirtBike;
}(egret.Sprite));
__reflect(Examples_dirtBike.prototype, "Examples_dirtBike");
//# sourceMappingURL=Examples_dirtBike.js.map