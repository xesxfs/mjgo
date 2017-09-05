var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 这个类在DirtBike基础上修改，
 * 实现了在测试皮肤基础上更换位图皮肤
 * @author
 *
 */
var DirtBikeTextured = (function (_super) {
    __extends(DirtBikeTextured, _super);
    function DirtBikeTextured() {
        var _this = _super.call(this) || this;
        _this.chassisAnglarForceDefault = 70; //车体转动默认角力
        _this.wheelAnglarForceDefault = 20; //轮子转动默认角力
        _this.backRotationSpringStiffness = 50; //后减震硬度
        _this.backRotationSpringDamping = 100; //后减震damp
        _this.backWheelConnAndChassis_angle = Math.PI / 10; //后减震和车体的约束角度
        _this.frontSuspensionStiffness = 60; //前减震硬度
        _this.frontSuspensionDamp = 15; //前减震阻尼
        _this.frontSuspensionLimitUpper = 0; //前减震向外延伸长度（地面方向）
        _this.frontSuspensionLimitLower = -5; //前减震向内延伸长度(车把方向)
        _this.frontWheelMotor = false; //前轮是否有动力
        _this.replaceBmSkin = true; //是否替换位图皮肤
        return _this;
    }
    DirtBikeTextured.prototype.createVehicle = function (pscene) {
        this.scene = pscene;
        var chassis = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, this.chassisX, this.chassisY, this.chassisW, this.chassisH, 0, p2.Body.DYNAMIC); //box1
        if (this.replaceBmSkin) {
            this.scene.dispCtn.removeChild(chassis.displays[0]);
            var bm = jbP2.DispUtil.createBitmapByName("chassis");
            bm.anchorOffsetX = this.chassisSkinAnchor.x;
            bm.anchorOffsetY = this.chassisSkinAnchor.y;
            chassis.displays[0] = bm;
            this.scene.dispCtn.addChild(chassis.displays[0]);
        }
        this.wheelb = this.setupBackWheel(chassis);
        this.wheelf = this.setupFrontWheel(chassis, this.frontWheelPos, this.frontSuspensionPos);
        this.chassis = chassis;
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false;
        //调整显示层级
        if (this.replaceBmSkin) {
            this.scene.dispCtn.addChild(this.wheelf.displays[0]);
            this.scene.dispCtn.addChild(this.wheelb.displays[0]);
            this.scene.dispCtn.addChild(this.suspensionBackStick.displays[0]);
            this.scene.dispCtn.addChild(this.suspensionFrontStick.displays[0]);
            this.scene.dispCtn.addChild(this.chassis.displays[0]);
        }
    };
    /**
    * body1 chassis
    * wheelOffset 轮子相对车体的位置
    * suspensionStartOffset 减震开始位置相对车体的位置，从这里到轮子是减震滑槽
    */
    DirtBikeTextured.prototype.setupFrontWheel = function (chassis, wheelPos, suspensionStartPos) {
        //p2减震起始点,减震和车体结合点
        var suspensionPosP2 = new egret.Point(suspensionStartPos.x, suspensionStartPos.y);
        suspensionPosP2.x = jbP2.P2Space.convertEgretValueToP2(suspensionPosP2.x);
        suspensionPosP2.y = jbP2.P2Space.convertEgretY_To_P2Y(suspensionPosP2.y);
        //p2轮子位置
        var wheelPosP2 = new egret.Point(wheelPos.x, wheelPos.y);
        wheelPosP2.x = jbP2.P2Space.convertEgretValueToP2(wheelPosP2.x);
        wheelPosP2.y = jbP2.P2Space.convertEgretY_To_P2Y(wheelPosP2.y);
        var suspensionDirEgret = new egret.Point(wheelPos.x - suspensionStartPos.x, wheelPos.y - suspensionStartPos.y); //在显示世界减震方向
        suspensionDirEgret.normalize(1);
        var suspensionDirP2 = new egret.Point(wheelPosP2.x - suspensionPosP2.x, wheelPosP2.y - suspensionPosP2.y); //p2世界减震的方向，suspensionStartOffset到轮子的方向   
        suspensionStartPos.normalize(1);
        //var angleRadP2: number = Math.atan2(suspensionDirP2.y,suspensionDirP2.x);//减震槽的角度
        //var angleDegP2: number = angleRadP2*180 / Math.PI;//angle deg in p2
        //var angleDegEgret:number = 360 - angleRadP2 * 180 / Math.PI;//angle deg in egret
        var wheel = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, wheelPos.x, wheelPos.y, this.wheelR, 0, p2.Body.DYNAMIC); //wheel
        if (this.replaceBmSkin) {
            this.scene.dispCtn.removeChild(wheel.displays[0]);
            wheel.displays[0] = jbP2.DispUtil.createBitmapByName("frontWheel");
            this.scene.dispCtn.addChild(wheel.displays[0]);
        }
        //这里sliderMover在创建时候不需要指定angle，因为后面的约束会禁止其旋转，约束会使其按照0度沿着约束轴运动
        var sliderMover = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, wheelPos.x, wheelPos.y, 20, 10, 0, p2.Body.DYNAMIC); //减震槽
        sliderMover.allowSleep = false;
        if (this.replaceBmSkin) {
            this.scene.dispCtn.removeChild(sliderMover.displays[0]);
            var bm = jbP2.DispUtil.createBitmapByName("frontSuspension");
            bm.anchorOffsetX = this.frontSuspensionAnchor.x;
            bm.anchorOffsetY = this.frontSuspensionAnchor.y;
            sliderMover.displays[0] = bm;
            this.scene.dispCtn.addChild(sliderMover.displays[0]);
        }
        this.suspensionFrontStick = sliderMover;
        if (this.replaceBmSkin == false) {
            //在sliderShape中绘制出减震槽
            var sliderMoverShape = sliderMover.displays[0];
            var rect = new egret.Rectangle(0, 0, sliderMoverShape.width, sliderMoverShape.height);
            sliderMoverShape.graphics.lineStyle(2, 0xff0000);
            sliderMoverShape.graphics.moveTo(rect.width * .5, rect.width * .5); //移到中心点
            sliderMoverShape.graphics.lineTo(rect.width * .5 - suspensionDirEgret.x * 50, rect.height * .5 - suspensionDirEgret.y * 50); //绘制减震槽的线
            sliderMoverShape.graphics.endFill();
        }
        var localPt1 = new egret.Point(sliderMover.position[0] - chassis.position[0], sliderMover.position[1] - chassis.position[1]); //sliderMover在车体空间的位置
        var localPt2 = new egret.Point(0, 0); //sliderMover在自己空间的位置
        //prismatic constraint----------------------------------------------------------------                                
        var localAxisBodyA = [suspensionDirP2.x, suspensionDirP2.y]; //在bodyA中局部坐标系的一个Axis
        var prismaticUpper = this.frontSuspensionLimitUpper; //slider沿着localAxisA轴的最大滑动值
        var prismaticLower = this.frontSuspensionLimitLower; //slider沿着localAxisA轴的最小滑动值
        prismaticUpper = jbP2.P2Space.convertEgretValueToP2(prismaticUpper); //注意这里转换标量即可
        prismaticLower = jbP2.P2Space.convertEgretValueToP2(prismaticLower); //注意这里转换标量即可
        var prismatic = new p2.PrismaticConstraint(chassis, sliderMover, {
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
        var springlocalPtA = new egret.Point(sliderMover.position[0] - chassis.position[0], sliderMover.position[1] - chassis.position[1]); //sliderMover在车体空间的位置
        var springlocalPtB = new egret.Point(0, 0); //轮子在自己空间的位置
        var spring = new p2.LinearSpring(chassis, sliderMover, { stiffness: this.frontSuspensionStiffness,
            damping: this.frontSuspensionDamp,
            localAnchorA: [springlocalPtA.x, springlocalPtA.y],
            localAnchorB: [springlocalPtB.x, springlocalPtB.y]
        });
        this.scene.world.addSpring(spring);
        //end------------------------------------------------------------------------------------
        var p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(wheelPos.x);
        var p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(wheelPos.y);
        var pvtJtF = new p2.RevoluteConstraint(sliderMover, wheel, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtF.collideConnected = false;
        this.scene.world.addConstraint(pvtJtF);
        return wheel;
    };
    DirtBikeTextured.prototype.setupBackWheel = function (chassis) {
        var wheel;
        var p2PvtPointX;
        var p2PvtPointY;
        var pvtJtF;
        var cubePos = this.backConnCubePos; //后轮连接架 pos
        var cubeSize = this.backConnCubeSize; //后轮连接架 size
        var cubeChassisPvtPos = this.backConnPvtPos; ////后轮连接架和车体连接点
        var wheelConnCube = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, cubePos.x, cubePos.y, cubeSize.x, cubeSize.y, 0, p2.Body.DYNAMIC);
        wheelConnCube.allowSleep = false;
        if (this.replaceBmSkin) {
            this.scene.dispCtn.removeChild(wheelConnCube.displays[0]);
            wheelConnCube.displays[0] = jbP2.DispUtil.createBitmapByName("backConn");
            this.scene.dispCtn.addChild(wheelConnCube.displays[0]);
            this.suspensionBackStick = wheelConnCube;
        }
        //pivot joint of chassis and backwheel conn cube
        p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(cubeChassisPvtPos.x);
        p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(cubeChassisPvtPos.y);
        pvtJtF = new p2.RevoluteConstraint(chassis, wheelConnCube, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtF.collideConnected = false;
        pvtJtF.setLimits(0, this.backWheelConnAndChassis_angle);
        this.scene.world.addConstraint(pvtJtF);
        //setup rotation constraint 车体和后轮连接架点RotationSpring
        var rotationalSpring = new p2.RotationalSpring(chassis, wheelConnCube, { stiffness: this.backRotationSpringStiffness, damping: this.backRotationSpringDamping });
        rotationalSpring.restAngle = this.backWheelConnAndChassis_angle; //约束两个body之间的夹角，如果不指定，则默认等于约束建立时的夹角
        this.scene.world.addSpring(rotationalSpring);
        var wheelPos = new egret.Point(cubePos.x - cubeSize.x * .5, cubePos.y);
        wheel = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, wheelPos.x, wheelPos.y, this.wheelR, 0, p2.Body.DYNAMIC); //
        if (this.replaceBmSkin) {
            this.scene.dispCtn.removeChild(wheel.displays[0]);
            wheel.displays[0] = jbP2.DispUtil.createBitmapByName("backWheel");
            this.scene.dispCtn.addChild(wheel.displays[0]);
        }
        //pivot joint of backwheel and wheel conn cube
        p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(wheelPos.x);
        p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(wheelPos.y);
        pvtJtF = new p2.RevoluteConstraint(wheelConnCube, wheel, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtF.collideConnected = false;
        this.scene.world.addConstraint(pvtJtF);
        return wheel;
    };
    /**
    * 更新车体和轮子的角力
    */
    DirtBikeTextured.prototype.updateSteering = function (dirVertical, dirHorizontal) {
        if (this.chassis == null) {
            return;
        }
        if (dirVertical == -1) {
            this.chassis.angularForce = this.chassisAnglarForceDefault;
        }
        else if (dirVertical == 1) {
            this.chassis.angularForce = -this.chassisAnglarForceDefault;
        }
        if (dirHorizontal == 1) {
            if (this.frontWheelMotor) {
                this.wheelf.angularForce = -this.wheelAnglarForceDefault;
            }
            this.wheelb.angularForce = -this.wheelAnglarForceDefault;
        }
        else if (dirHorizontal == -1) {
            if (this.frontWheelMotor) {
                this.wheelf.angularForce = this.wheelAnglarForceDefault;
            }
            this.wheelb.angularForce = this.wheelAnglarForceDefault;
        }
    };
    /**
    * 跳跃
    */
    DirtBikeTextured.prototype.jump = function () {
        if (jbP2.P2Space.checkIfCanJump(this.scene.world, this.wheelb)) {
            this.chassis.applyForce([0, 20], this.chassis.position);
            console.log("DirtBike2.jump");
        }
    };
    return DirtBikeTextured;
}(egret.Sprite));
__reflect(DirtBikeTextured.prototype, "DirtBikeTextured");
//# sourceMappingURL=DirtBikeTextured.js.map