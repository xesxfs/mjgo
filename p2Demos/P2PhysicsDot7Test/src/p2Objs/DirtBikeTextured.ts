/**
 * 这个类在DirtBike基础上修改，
 * 实现了在测试皮肤基础上更换位图皮肤
 * @author 
 *
 */
class DirtBikeTextured extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
                                   
    public chassis: p2.Body;
    public wheelf: p2.Body;
    public wheelb: p2.Body;
    public suspensionBackStick: p2.Body;
    public suspensionFrontStick: p2.Body;
                            
    public chassisAnglarForceDefault: number = 70;//车体转动默认角力
    public wheelAnglarForceDefault: number = 20;//轮子转动默认角力
                        
    public chassisX;//chassis pos x
    public chassisY;//chassis pos y
    public chassisW;//chassis size width
    public chassisH;//chassis size height
    public wheelR;//wheel radius
            
    public frontSuspensionPos: egret.Point;//前减震相对车体位置
    public frontWheelPos: egret.Point;//前轮相对车体位置
    public backConnCubePos: egret.Point;//后轮减震杆相对车体位置
    public backConnCubeSize: egret.Point;//后轮减震杆盒子尺寸
    public backConnPvtPos: egret.Point;//后轮减震杆与车体pivotJoint约束点，绝对位置
            
    public backRotationSpringStiffness: number = 50;//后减震硬度
    public backRotationSpringDamping: number= 100;//后减震damp
    public backWheelConnAndChassis_angle: number = Math.PI / 10;//后减震和车体的约束角度
            
    public frontSuspensionStiffness: number = 60;//前减震硬度
    public frontSuspensionDamp: number = 15;//前减震阻尼
    public frontSuspensionLimitUpper: number = 0;//前减震向外延伸长度（地面方向）
    public frontSuspensionLimitLower: number = -5;//前减震向内延伸长度(车把方向)
            
    public frontWheelMotor: Boolean = false;//前轮是否有动力
    
    public chassisSkinAnchor: egret.Point;//皮肤锚点
    public frontSuspensionAnchor: egret.Point;//皮肤锚点
    
    public replaceBmSkin: Boolean = true;//是否替换位图皮肤
        
    public constructor() {
        super();
    }
        	
    public createVehicle(pscene:jbP2.SimpleP2Scene):void{
        this.scene = pscene;
                        
        var chassis:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,this.chassisX,this.chassisY,this.chassisW,this.chassisH,0,p2.Body.DYNAMIC);//box1
        
        if(this.replaceBmSkin){
            this.scene.dispCtn.removeChild(chassis.displays[0]);
            var bm:egret.Bitmap = jbP2.DispUtil.createBitmapByName("chassis");
            bm.anchorOffsetX = this.chassisSkinAnchor.x;
            bm.anchorOffsetY = this.chassisSkinAnchor.y;
            chassis.displays[0] = bm;
            this.scene.dispCtn.addChild(chassis.displays[0]);
        }
        
        this.wheelb = this.setupBackWheel(chassis);
                        
        this.wheelf = this.setupFrontWheel(chassis,this.frontWheelPos,this.frontSuspensionPos);
                                                
        this.chassis = chassis;
                                                
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false;
        
        
        //调整显示层级
        if(this.replaceBmSkin){
            this.scene.dispCtn.addChild(this.wheelf.displays[0]);
            this.scene.dispCtn.addChild(this.wheelb.displays[0]);
            this.scene.dispCtn.addChild(this.suspensionBackStick.displays[0]);
            this.scene.dispCtn.addChild(this.suspensionFrontStick.displays[0]);
            this.scene.dispCtn.addChild(this.chassis.displays[0]);
        }
        
    }
        
    /**
    * body1 chassis
    * wheelOffset 轮子相对车体的位置
    * suspensionStartOffset 减震开始位置相对车体的位置，从这里到轮子是减震滑槽
    */                
    private setupFrontWheel(chassis:p2.Body,wheelPos:egret.Point,suspensionStartPos:egret.Point):p2.Body{
        //p2减震起始点,减震和车体结合点
        var suspensionPosP2: egret.Point = new egret.Point(suspensionStartPos.x,suspensionStartPos.y);
        suspensionPosP2.x = jbP2.P2Space.convertEgretValueToP2(suspensionPosP2.x);
        suspensionPosP2.y = jbP2.P2Space.convertEgretY_To_P2Y(suspensionPosP2.y);
                                        
        //p2轮子位置
        var wheelPosP2: egret.Point = new egret.Point(wheelPos.x,wheelPos.y);
        wheelPosP2.x = jbP2.P2Space.convertEgretValueToP2(wheelPosP2.x);
        wheelPosP2.y = jbP2.P2Space.convertEgretY_To_P2Y(wheelPosP2.y);
                                        
                                        
        var suspensionDirEgret: egret.Point = new egret.Point(wheelPos.x-suspensionStartPos.x,wheelPos.y-suspensionStartPos.y);//在显示世界减震方向
        suspensionDirEgret.normalize(1);
                                        
                                   
        var suspensionDirP2: egret.Point = new egret.Point(wheelPosP2.x-suspensionPosP2.x,wheelPosP2.y-suspensionPosP2.y);//p2世界减震的方向，suspensionStartOffset到轮子的方向   
        suspensionStartPos.normalize(1);
                                        
        //var angleRadP2: number = Math.atan2(suspensionDirP2.y,suspensionDirP2.x);//减震槽的角度
        //var angleDegP2: number = angleRadP2*180 / Math.PI;//angle deg in p2
        //var angleDegEgret:number = 360 - angleRadP2 * 180 / Math.PI;//angle deg in egret
                                        
        var wheel:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,wheelPos.x,wheelPos.y,this.wheelR,0,p2.Body.DYNAMIC);//wheel
        if(this.replaceBmSkin){
            this.scene.dispCtn.removeChild(wheel.displays[0]);
            wheel.displays[0] = jbP2.DispUtil.createBitmapByName("frontWheel");
            this.scene.dispCtn.addChild(wheel.displays[0]);
        }
        
        //这里sliderMover在创建时候不需要指定angle，因为后面的约束会禁止其旋转，约束会使其按照0度沿着约束轴运动
        var sliderMover: p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,wheelPos.x,wheelPos.y,20,10,0,p2.Body.DYNAMIC);//减震槽
        sliderMover.allowSleep = false;
        if(this.replaceBmSkin){
            this.scene.dispCtn.removeChild(sliderMover.displays[0]);
            var bm:egret.Bitmap = jbP2.DispUtil.createBitmapByName("frontSuspension");
            bm.anchorOffsetX = this.frontSuspensionAnchor.x;
            bm.anchorOffsetY = this.frontSuspensionAnchor.y;
            sliderMover.displays[0] = bm;
            this.scene.dispCtn.addChild(sliderMover.displays[0]);
        }
        this.suspensionFrontStick = sliderMover;
        
        
        
        if(this.replaceBmSkin == false){
            //在sliderShape中绘制出减震槽
            var sliderMoverShape: egret.Shape = <egret.Shape>sliderMover.displays[0];
            var rect: egret.Rectangle = new egret.Rectangle(0,0,sliderMoverShape.width,sliderMoverShape.height);
            sliderMoverShape.graphics.lineStyle(2,0xff0000);
            sliderMoverShape.graphics.moveTo(rect.width * .5,rect.width * .5);//移到中心点
            sliderMoverShape.graphics.lineTo(rect.width*.5-suspensionDirEgret.x * 50,rect.height*.5-suspensionDirEgret.y * 50);//绘制减震槽的线
            sliderMoverShape.graphics.endFill();
        }
        
                                          
                                       
        var localPt1: egret.Point = new egret.Point(sliderMover.position[0]-chassis.position[0],sliderMover.position[1]-chassis.position[1]);//sliderMover在车体空间的位置
        var localPt2: egret.Point = new egret.Point(0,0);//sliderMover在自己空间的位置
                                                
                                                
        //prismatic constraint----------------------------------------------------------------                                
        var localAxisBodyA = [suspensionDirP2.x,suspensionDirP2.y];//在bodyA中局部坐标系的一个Axis
        var prismaticUpper: number = this.frontSuspensionLimitUpper;//slider沿着localAxisA轴的最大滑动值
        var prismaticLower: number = this.frontSuspensionLimitLower;//slider沿着localAxisA轴的最小滑动值
        prismaticUpper = jbP2.P2Space.convertEgretValueToP2(prismaticUpper);//注意这里转换标量即可
        prismaticLower = jbP2.P2Space.convertEgretValueToP2(prismaticLower);//注意这里转换标量即可
                                                                   
        var prismatic: p2.PrismaticConstraint = new p2.PrismaticConstraint( chassis,sliderMover,
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
        var springlocalPtA: egret.Point = new egret.Point(sliderMover.position[0]-chassis.position[0],sliderMover.position[1]-chassis.position[1]);//sliderMover在车体空间的位置
        var springlocalPtB: egret.Point = new egret.Point(0,0);//轮子在自己空间的位置
                                                        
                                                                                        
        var spring: p2.LinearSpring = new p2.LinearSpring(chassis,sliderMover,
            { stiffness: this.frontSuspensionStiffness,
                damping: this.frontSuspensionDamp,
                localAnchorA: [springlocalPtA.x,springlocalPtA.y],
                localAnchorB: [springlocalPtB.x,springlocalPtB.y]
            });
        this.scene.world.addSpring(spring);                        
        //end------------------------------------------------------------------------------------
                                              
                                        
        var p2PvtPointX:number= jbP2.P2Space.convertEgretValueToP2(wheelPos.x);
        var p2PvtPointY:number= jbP2.P2Space.convertEgretY_To_P2Y(wheelPos.y);
        var pvtJtF = new p2.RevoluteConstraint(sliderMover,wheel, {worldPivot: [p2PvtPointX, p2PvtPointY]});
        pvtJtF.collideConnected = false;
        this.scene.world.addConstraint(pvtJtF);
        return wheel;
    } 
                                
    private setupBackWheel(chassis:p2.Body):p2.Body{  
        var wheel: p2.Body;
                                        
        var p2PvtPointX: number;
        var p2PvtPointY: number;
        var pvtJtF: p2.RevoluteConstraint;
                                        
        var cubePos: egret.Point = this.backConnCubePos;//后轮连接架 pos
        var cubeSize: egret.Point = this.backConnCubeSize;//后轮连接架 size
                                        
        var cubeChassisPvtPos: egret.Point = this.backConnPvtPos;////后轮连接架和车体连接点
                                                                    
        var wheelConnCube: p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,cubePos.x,cubePos.y,cubeSize.x,cubeSize.y,0,p2.Body.DYNAMIC);
        wheelConnCube.allowSleep = false;
        if(this.replaceBmSkin){
            this.scene.dispCtn.removeChild(wheelConnCube.displays[0]);
            wheelConnCube.displays[0] = jbP2.DispUtil.createBitmapByName("backConn");
            this.scene.dispCtn.addChild(wheelConnCube.displays[0]);
            this.suspensionBackStick = wheelConnCube;
        }
                                        
        //pivot joint of chassis and backwheel conn cube
        p2PvtPointX= jbP2.P2Space.convertEgretValueToP2(cubeChassisPvtPos.x);
        p2PvtPointY= jbP2.P2Space.convertEgretY_To_P2Y(cubeChassisPvtPos.y);
        pvtJtF = new p2.RevoluteConstraint(chassis,wheelConnCube, {worldPivot: [p2PvtPointX, p2PvtPointY]});
        pvtJtF.collideConnected = false;
        pvtJtF.setLimits(0,this.backWheelConnAndChassis_angle);
        this.scene.world.addConstraint(pvtJtF);
                                        
        //setup rotation constraint 车体和后轮连接架点RotationSpring
        var rotationalSpring:p2.RotationalSpring = new p2.RotationalSpring(chassis, wheelConnCube, {stiffness : this.backRotationSpringStiffness, damping: this.backRotationSpringDamping });
        rotationalSpring.restAngle = this.backWheelConnAndChassis_angle;//约束两个body之间的夹角，如果不指定，则默认等于约束建立时的夹角
        this.scene.world.addSpring(rotationalSpring);
                                        
                                        
        var wheelPos: egret.Point = new egret.Point(cubePos.x-cubeSize.x*.5,cubePos.y);
        wheel = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,wheelPos.x,wheelPos.y,this.wheelR,0,p2.Body.DYNAMIC);//
        if(this.replaceBmSkin){
            this.scene.dispCtn.removeChild(wheel.displays[0]);
            wheel.displays[0] = jbP2.DispUtil.createBitmapByName("backWheel");
            this.scene.dispCtn.addChild(wheel.displays[0]);   
        }
        
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
        
    /**
    * 跳跃
    */ 
    public jump():void{
        if(jbP2.P2Space.checkIfCanJump(this.scene.world,this.wheelb)){
            this.chassis.applyForce([0,20],this.chassis.position);
            console.log("DirtBike2.jump");
        }
    }
}
