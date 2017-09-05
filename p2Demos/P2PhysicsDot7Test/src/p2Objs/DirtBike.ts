/**
 * DirtBike物理学系统封装
 * 用于创建车辆的点有的是相对车体位置的相对位置点
 * @author 
 *
 */
class DirtBike extends egret.EventDispatcher {
    private scene: jbP2.SimpleP2Scene;
                           
    public chassis: p2.Body;
    public wheelf: p2.Body;
    public wheelb: p2.Body;
                    
    public chassisAnglarForceDefault: number = 150;//车体转动默认角力
    public wheelAnglarForceDefault: number = 20;//轮子转动默认角力
                
    public chassisX;//chassis pos x
    public chassisY;//chassis pos y
    public chassisW;//chassis size width
    public chassisH;//chassis size height
    public wheelR;//wheel radius
    
    public frontSuspensionOffset: egret.Point;//前减震相对车体位置
    public frontWheelOffset: egret.Point;//前轮相对车体位置
    public backConnCubePos: egret.Point;//后轮减震杆绝对位置
    public backConnCubeSize: egret.Point;//后轮减震杆盒子尺寸
    public backConnPvtPos: egret.Point;//后轮减震杆与车体pivotJoint约束点，绝对位置
    
    public backRotationSpringStiffness: number = 50;//后减震硬度
    public backRotationSpringDamping: number= 100;//后减震damp
    public backWheelConnAndChassis_angle: number = Math.PI / 10;//后减震和车体的约束角度
    
    public frontSuspensionStiffness: number = 60;//前减震硬度
    public frontSuspensionDamp: number = 15;//前减震阻尼
    public frontSuspensionLimitUpper: number = 0;//前减震向外延伸长度（地面方向）
    public frontSuspensionLimitLower: number = -20;//前减震向内延伸长度(车把方向)
    
    public frontWheelMotor: Boolean = false;//前轮是否有动力

	public constructor() {
        super();
	}
	
    public createVehicle(pscene:jbP2.SimpleP2Scene):void{
        this.scene = pscene;
        
        var chassis:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,this.chassisX,this.chassisY,this.chassisW,this.chassisH,0,p2.Body.DYNAMIC);//box1
                                                                
        this.wheelb = this.setupBackWheel2(chassis);
        
        this.wheelf = this.setupFrontWheel(chassis,this.frontWheelOffset,this.frontSuspensionOffset);
                                
        this.chassis = chassis;
                                
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false;
    }
    
    /**
    * body1 chassis
    * wheelOffset 轮子相对车体的位置
    * suspensionStartOffset 减震开始位置相对车体的位置，从这里到轮子是减震滑槽
    */                
    private setupFrontWheel(body1:p2.Body,wheelOffset:egret.Point,suspensionStartOffset:egret.Point):p2.Body{
        //p2减震起始点,减震和车体结合点
        var suspensionPosP2: egret.Point = new egret.Point(this.chassisX + suspensionStartOffset.x,this.chassisY + suspensionStartOffset.y);
        suspensionPosP2.x = jbP2.P2Space.convertEgretValueToP2(suspensionPosP2.x);
        suspensionPosP2.y = jbP2.P2Space.convertEgretY_To_P2Y(suspensionPosP2.y);
                        
        //p2轮子位置
        var wheelPosP2: egret.Point = new egret.Point(this.chassisX+wheelOffset.x,this.chassisY+wheelOffset.y);
        wheelPosP2.x = jbP2.P2Space.convertEgretValueToP2(wheelPosP2.x);
        wheelPosP2.y = jbP2.P2Space.convertEgretY_To_P2Y(wheelPosP2.y);
                        
                        
        var suspensionDirEgret: egret.Point = new egret.Point(wheelOffset.x-suspensionStartOffset.x,wheelOffset.y-suspensionStartOffset.y);//在显示世界减震方向
        suspensionDirEgret.normalize(1);
                        
                   
        var suspensionDirP2: egret.Point = new egret.Point(wheelPosP2.x-suspensionPosP2.x,wheelPosP2.y-suspensionPosP2.y);//p2世界减震的方向，suspensionStartOffset到轮子的方向   
        suspensionStartOffset.normalize(1);
                        
        //var angleRadP2: number = Math.atan2(suspensionDirP2.y,suspensionDirP2.x);//减震槽的角度
        //var angleDegP2: number = angleRadP2*180 / Math.PI;//angle deg in p2
        //var angleDegEgret:number = 360 - angleRadP2 * 180 / Math.PI;//angle deg in egret
                        
        var wheel:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,this.chassisX+wheelOffset.x,this.chassisY+wheelOffset.y,this.wheelR,0,p2.Body.DYNAMIC);//wheel
                        
        //这里sliderMover在创建时候不需要指定angle，因为后面的约束会禁止其旋转，约束会使其按照0度沿着约束轴运动
        var sliderMover: p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,this.chassisX + wheelOffset.x,this.chassisY + wheelOffset.y,20,10,0,p2.Body.DYNAMIC);//减震槽
        sliderMover.allowSleep = false;
                        
        //在sliderShape中绘制出减震槽
        var sliderMoverShape: egret.Shape = <egret.Shape>sliderMover.displays[0];
        var rect: egret.Rectangle = new egret.Rectangle(0,0,sliderMoverShape.width,sliderMoverShape.height);
        sliderMoverShape.graphics.lineStyle(2,0xff0000);
        sliderMoverShape.graphics.moveTo(rect.width * .5,rect.width * .5);//移到中心点
        sliderMoverShape.graphics.lineTo(rect.width*.5-suspensionDirEgret.x * 50,rect.height*.5-suspensionDirEgret.y * 50);//绘制减震槽的线
        sliderMoverShape.graphics.endFill();
                                
        //在车体中绘制减震槽
        var chassisShape: egret.Shape = <egret.Shape>body1.displays[0];
        rect = new egret.Rectangle(0,0,chassisShape.width,chassisShape.height);
        chassisShape.graphics.lineStyle(6,0x0000ff);//绘制颜色
        chassisShape.graphics.moveTo(rect.width,rect.height);//移动到减震结合处
        chassisShape.graphics.lineTo(rect.width + suspensionDirEgret.x*30,rect.height + suspensionDirEgret.y*30);//绘制减震槽
        chassisShape.graphics.endFill();
                        
                        
                        
        var localPt1: egret.Point = new egret.Point(sliderMover.position[0]-body1.position[0],sliderMover.position[1]-body1.position[1]);//sliderMover在车体空间的位置
        var localPt2: egret.Point = new egret.Point(0,0);//sliderMover在自己空间的位置
                        
                        
        //prismatic constraint----------------------------------------------------------------                                
        var localAxisBodyA = [suspensionDirP2.x,suspensionDirP2.y];//在bodyA中局部坐标系的一个Axis
        var prismaticUpper: number = this.frontSuspensionLimitUpper;//slider沿着localAxisA轴的最大滑动值
        var prismaticLower: number = this.frontSuspensionLimitLower;//slider沿着localAxisA轴的最小滑动值
        prismaticUpper = jbP2.P2Space.convertEgretValueToP2(prismaticUpper);//注意这里转换标量即可
        prismaticLower = jbP2.P2Space.convertEgretValueToP2(prismaticLower);//注意这里转换标量即可
                                                   
        var prismatic: p2.PrismaticConstraint = new p2.PrismaticConstraint( body1,sliderMover,
            {   
                localAnchorA: [localPt1.x,localPt1.y],//约束点在BodyA局部
                localAnchorB: [localPt2.x,localPt2.y],//约束点在BodyB局部
                localAxisA: localAxisBodyA,//在BodyA局部坐标系中约束运动的轴,bodyB沿着此轴运动
                upperLimit: prismaticUpper,//轴向移动正方向极限
                lowerLimit: prismaticLower,//轴向移动副方向极限
                disableRotationalLock:false//true则bodyB可以绕其锚点旋转，false则bodyB不可旋转
            });   
        prismatic.collideConnected = false;
        this.scene.world.addConstraint(prismatic);
                                                
                                                
        //----------------------------------------------------------------   
                                                
                                              
        //spring constraint------------------------------------------------------------------------------------
        var springlocalPtA: egret.Point = new egret.Point(sliderMover.position[0]-body1.position[0],sliderMover.position[1]-body1.position[1]);//sliderMover在车体空间的位置
        var springlocalPtB: egret.Point = new egret.Point(0,0);//轮子在自己空间的位置
                                        
                                                                        
        var spring: p2.LinearSpring = new p2.LinearSpring(body1,sliderMover,
            { stiffness: this.frontSuspensionStiffness,
                damping: this.frontSuspensionDamp,
                localAnchorA: [springlocalPtA.x,springlocalPtA.y],
                localAnchorB: [springlocalPtB.x,springlocalPtB.y]
            });
        this.scene.world.addSpring(spring);                        
        //end------------------------------------------------------------------------------------
                              
                        
        var p2PvtPointX:number= jbP2.P2Space.convertEgretValueToP2(this.chassisX+wheelOffset.x);
        var p2PvtPointY:number= jbP2.P2Space.convertEgretY_To_P2Y(this.chassisY+wheelOffset.y);
        var pvtJtF = new p2.RevoluteConstraint(sliderMover,wheel, {worldPivot: [p2PvtPointX, p2PvtPointY]});
        pvtJtF.collideConnected = false;
        this.scene.world.addConstraint(pvtJtF);
        return wheel;
    }  
                                
    private setupBackWheel2(body1:p2.Body):p2.Body{  
        var wheel: p2.Body;
                        
        var p2PvtPointX: number;
        var p2PvtPointY: number;
        var pvtJtF: p2.RevoluteConstraint;
                        
        var cubePos: egret.Point = this.backConnCubePos;//后轮连接架 pos
        var cubeSize: egret.Point = this.backConnCubeSize;//后轮连接架 size
                        
        var cubeChassisPvtPos: egret.Point = this.backConnPvtPos;////后轮连接架和车体连接点
                                                    
        var wheelConnCube: p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,cubePos.x,cubePos.y,cubeSize.x,cubeSize.y,0,p2.Body.DYNAMIC);
        wheelConnCube.allowSleep = false;
                        
        //pivot joint of chassis and backwheel conn cube
        p2PvtPointX= jbP2.P2Space.convertEgretValueToP2(cubeChassisPvtPos.x);
        p2PvtPointY= jbP2.P2Space.convertEgretY_To_P2Y(cubeChassisPvtPos.y);
        pvtJtF = new p2.RevoluteConstraint(body1,wheelConnCube, {worldPivot: [p2PvtPointX, p2PvtPointY]});
        pvtJtF.collideConnected = false;
        pvtJtF.setLimits(0,this.backWheelConnAndChassis_angle);
        this.scene.world.addConstraint(pvtJtF);
                        
        //setup rotation constraint 车体和后轮连接架点RotationSpring
        var rotationalSpring:p2.RotationalSpring = new p2.RotationalSpring(body1, wheelConnCube, {stiffness : this.backRotationSpringStiffness, damping: this.backRotationSpringDamping });
        rotationalSpring.restAngle = this.backWheelConnAndChassis_angle;//约束两个body之间的夹角，如果不指定，则默认等于约束建立时的夹角
        this.scene.world.addSpring(rotationalSpring);
                        
                        
        var wheelPos: egret.Point = new egret.Point(cubePos.x-cubeSize.x*.5,cubePos.y);
        wheel = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,wheelPos.x,wheelPos.y,this.wheelR,0,p2.Body.DYNAMIC);//
                        
        //pivot joint of backwheel and wheel conn cube
        p2PvtPointX= jbP2.P2Space.convertEgretValueToP2(wheelPos.x);
        p2PvtPointY= jbP2.P2Space.convertEgretY_To_P2Y(wheelPos.y);
        pvtJtF = new p2.RevoluteConstraint(wheelConnCube,wheel, {worldPivot: [p2PvtPointX, p2PvtPointY]});
        pvtJtF.collideConnected = false;
        this.scene.world.addConstraint(pvtJtF);
                        
        return wheel;
    }
    
    
    /**
     * 更新车体和轮子的角力
     */ 
    public updateSteering(dirVertical:number,dirHorizontal:number):void{
        if(this.chassis == null){
            return;
        }
                                        
        if(dirVertical == -1){
            this.chassis.angularForce = this.chassisAnglarForceDefault;
        }else if(dirVertical == 1){
            this.chassis.angularForce = -this.chassisAnglarForceDefault;
        }
                                        
        if(dirHorizontal == 1){
            if(this.frontWheelMotor){
                this.wheelf.angularForce = -this.wheelAnglarForceDefault;
            }
            this.wheelb.angularForce = -this.wheelAnglarForceDefault;
        }else if(dirHorizontal == -1){
            if(this.frontWheelMotor){
                this.wheelf.angularForce = this.wheelAnglarForceDefault;
            }
            this.wheelb.angularForce = this.wheelAnglarForceDefault;
        }
    }
}
