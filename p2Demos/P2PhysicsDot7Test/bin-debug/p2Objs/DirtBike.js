var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * DirtBike物理学系统封装
 * 用于创建车辆的点有的是相对车体位置的相对位置点
 * @author
 *
 */
var DirtBike = (function (_super) {
    __extends(DirtBike, _super);
    function DirtBike() {
        var _this = _super.call(this) || this;
        _this.chassisAnglarForceDefault = 150; //车体转动默认角力
        _this.wheelAnglarForceDefault = 20; //轮子转动默认角力
        _this.backRotationSpringStiffness = 50; //后减震硬度
        _this.backRotationSpringDamping = 100; //后减震damp
        _this.backWheelConnAndChassis_angle = Math.PI / 10; //后减震和车体的约束角度
        _this.frontSuspensionStiffness = 60; //前减震硬度
        _this.frontSuspensionDamp = 15; //前减震阻尼
        _this.frontSuspensionLimitUpper = 0; //前减震向外延伸长度（地面方向）
        _this.frontSuspensionLimitLower = -20; //前减震向内延伸长度(车把方向)
        _this.frontWheelMotor = false; //前轮是否有动力
        return _this;
    }
    DirtBike.prototype.createVehicle = function (pscene) {
        this.scene = pscene;
        var chassis = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, this.chassisX, this.chassisY, this.chassisW, this.chassisH, 0, p2.Body.DYNAMIC); //box1
        this.wheelb = this.setupBackWheel2(chassis);
        this.wheelf = this.setupFrontWheel(chassis, this.frontWheelOffset, this.frontSuspensionOffset);
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
    DirtBike.prototype.setupFrontWheel = function (body1, wheelOffset, suspensionStartOffset) {
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
        //var angleRadP2: number = Math.atan2(suspensionDirP2.y,suspensionDirP2.x);//减震槽的角度
        //var angleDegP2: number = angleRadP2*180 / Math.PI;//angle deg in p2
        //var angleDegEgret:number = 360 - angleRadP2 * 180 / Math.PI;//angle deg in egret
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
        var prismaticUpper = this.frontSuspensionLimitUpper; //slider沿着localAxisA轴的最大滑动值
        var prismaticLower = this.frontSuspensionLimitLower; //slider沿着localAxisA轴的最小滑动值
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
        var springlocalPtA = new egret.Point(sliderMover.position[0] - body1.position[0], sliderMover.position[1] - body1.position[1]); //sliderMover在车体空间的位置
        var springlocalPtB = new egret.Point(0, 0); //轮子在自己空间的位置
        var spring = new p2.LinearSpring(body1, sliderMover, { stiffness: this.frontSuspensionStiffness,
            damping: this.frontSuspensionDamp,
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
    DirtBike.prototype.setupBackWheel2 = function (body1) {
        var wheel;
        var p2PvtPointX;
        var p2PvtPointY;
        var pvtJtF;
        var cubePos = this.backConnCubePos; //后轮连接架 pos
        var cubeSize = this.backConnCubeSize; //后轮连接架 size
        var cubeChassisPvtPos = this.backConnPvtPos; ////后轮连接架和车体连接点
        var wheelConnCube = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, cubePos.x, cubePos.y, cubeSize.x, cubeSize.y, 0, p2.Body.DYNAMIC);
        wheelConnCube.allowSleep = false;
        //pivot joint of chassis and backwheel conn cube
        p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(cubeChassisPvtPos.x);
        p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(cubeChassisPvtPos.y);
        pvtJtF = new p2.RevoluteConstraint(body1, wheelConnCube, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtF.collideConnected = false;
        pvtJtF.setLimits(0, this.backWheelConnAndChassis_angle);
        this.scene.world.addConstraint(pvtJtF);
        //setup rotation constraint 车体和后轮连接架点RotationSpring
        var rotationalSpring = new p2.RotationalSpring(body1, wheelConnCube, { stiffness: this.backRotationSpringStiffness, damping: this.backRotationSpringDamping });
        rotationalSpring.restAngle = this.backWheelConnAndChassis_angle; //约束两个body之间的夹角，如果不指定，则默认等于约束建立时的夹角
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
    /**
     * 更新车体和轮子的角力
     */
    DirtBike.prototype.updateSteering = function (dirVertical, dirHorizontal) {
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
    return DirtBike;
}(egret.EventDispatcher));
__reflect(DirtBike.prototype, "DirtBike");
//# sourceMappingURL=DirtBike.js.map