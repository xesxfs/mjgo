/**
* 摩托车2
* 后减震是垂直弹簧型
* @author 
*/
class Examples_dirtBike2 extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
                       
    private chassis: p2.Body;
    private wheelf: p2.Body;
    private wheelb: p2.Body;
                
    private btnHor: egret.Bitmap;
    private btnVer: egret.Bitmap;
                     
    private chassisAnglarForceDefault: number = 150;//车体转动默认角力
    private wheelAnglarForceDefault: number = 15;//轮子转动默认角力
            
    private chassisX = 200;
    private chassisY = 100;
    private chassisW = 100;
    private chassisH = 50;
    private wheelR = 25;
                
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
                    	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        var mouseJt = new MouseJointHelper(this.stage,this,this.scene.world);    
                
        //给予默认摩擦力较大值，防止轮子滑动
        this.scene.world.defaultContactMaterial.friction = 40;
                        
        var tembody: p2.Body;
                                        
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
                                
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;      
                                
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        tembody.id = 2;
                                
                                                        
        this.createVehicle();
        this.setupUI();
        egret.Ticker.getInstance().register(this.updateChassisAnglarForce, this);//
    }
                    
    private createVehicle():void{
        var chassis:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,this.chassisX,this.chassisY,this.chassisW,this.chassisH,0,p2.Body.DYNAMIC);//box1
                                                        
        var wheelOffset: egret.Point;
                                
        wheelOffset= new egret.Point(-this.chassisW*.5,this.chassisH*1.55);
        this.wheelb = this.setupBackWheel(chassis,wheelOffset);
                     
                    
        wheelOffset= new egret.Point(this.chassisW*.75,this.chassisH*1.55);
        var suspensionStart: egret.Point = new egret.Point(this.chassisW*.5,this.chassisH*.5);
        this.wheelf = this.setupFrontWheel(chassis,wheelOffset,suspensionStart);
                        
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
                
        var angleRadP2: number = Math.atan2(suspensionDirP2.y,suspensionDirP2.x);//减震槽的角度
        var angleDegP2: number = angleRadP2*180 / Math.PI;//angle deg in p2
        var angleDegEgret:number = 360 - angleRadP2 * 180 / Math.PI;//angle deg in egret
        console.log("angleDegEgret:"+angleDegEgret%360);//输出我们查看一下是多少
                
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
        chassisShape.graphics.moveTo(rect.width,rect.height);//移动到💰减震结合处
        chassisShape.graphics.lineTo(rect.width + suspensionDirEgret.x*30,rect.height + suspensionDirEgret.y*30);//绘制💰减震槽
        chassisShape.graphics.moveTo(0,this.chassisH);//后减震槽
        chassisShape.graphics.lineTo(0,this.chassisH + 30);
        chassisShape.graphics.endFill();
                                
                                
                                
        var localPt1: egret.Point = new egret.Point(sliderMover.position[0]-body1.position[0],sliderMover.position[1]-body1.position[1]);//sliderMover在车体空间的位置
        var localPt2: egret.Point = new egret.Point(0,0);//sliderMover在自己空间的位置
                
                
        //prismatic constraint----------------------------------------------------------------                                
        var localAxisBodyA = [suspensionDirP2.x,suspensionDirP2.y];//在bodyA中局部坐标系的一个Axis
        var prismaticUpper: number = this.chassisH*.5;//slider沿着localAxisA轴的最大滑动值
        var prismaticLower: number = -this.chassisH*.5;//slider沿着localAxisA轴的最小滑动值
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
        var stiff: number = 60;//弹簧硬度
        var damp: number = 10;//弹簧阻尼
        var springlocalPtA: egret.Point = new egret.Point(sliderMover.position[0]-body1.position[0],sliderMover.position[1]-body1.position[1]);//sliderMover在车体空间的位置
        var springlocalPtB: egret.Point = new egret.Point(0,0);//轮子在自己空间的位置
                                
                                                                
        var spring: p2.LinearSpring = new p2.LinearSpring(body1,sliderMover,
            { stiffness: stiff,
                damping: damp,
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
                                        
                                    
                                                
    private setupBackWheel(body1:p2.Body,wheelOffset:egret.Point):p2.Body{       
        
        var wheel:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,this.chassisX+wheelOffset.x,this.chassisY+wheelOffset.y,this.wheelR,0,p2.Body.DYNAMIC);//box1
                                                                            
        var localPt1: egret.Point = new egret.Point(wheel.position[0]-body1.position[0],wheel.position[1]-body1.position[1]);//轮子在车体空间的位置
        var localPt2: egret.Point = new egret.Point(0,0);//轮子在自己空间的位置
                                        
        //prismatic constraint----------------------------------------------------------------                                
        var localAxisBodyA = [0,1];//在bodyA中局部坐标系的一个Axis
        var prismaticUpper: number = this.chassisH*.5;//slider沿着localAxisA轴的最大滑动值
        var prismaticLower: number = -this.chassisH*.5;//slider沿着localAxisA轴的最小滑动值
        prismaticUpper = jbP2.P2Space.convertEgretValueToP2(prismaticUpper);//注意这里转换标量即可
        prismaticLower = jbP2.P2Space.convertEgretValueToP2(prismaticLower);//注意这里转换标量即可
                                           
        var prismatic: p2.PrismaticConstraint = new p2.PrismaticConstraint( body1,wheel,
            {   
                localAnchorA: [localPt1.x,localPt1.y],//约束点在BodyA局部
                localAnchorB: [localPt2.x,localPt2.y],//约束点在BodyB局部
                localAxisA: [0,1],//在BodyA局部坐标系中约束运动的轴,bodyB沿着此轴运动
                upperLimit: prismaticUpper,//轴向移动正方向极限
                lowerLimit: prismaticLower,//轴向移动副方向极限
                disableRotationalLock:true//true则bodyB可以绕其锚点旋转，false则bodyB不可旋转
            });   
        prismatic.collideConnected = false;
        this.scene.world.addConstraint(prismatic);
                                        
                                        
        //----------------------------------------------------------------   
                                        
                                      
        //spring constraint------------------------------------------------------------------------------------
        var stiff: number = 60;//弹簧硬度
        var damp: number = 10;//弹簧阻尼
        var springlocalPtA: egret.Point = new egret.Point(wheel.position[0]-body1.position[0],wheel.position[1]-body1.position[1]);//轮子在车体空间的位置
        var springlocalPtB: egret.Point = new egret.Point(0,0);//轮子在自己空间的位置
                                
                                                                
        var spring: p2.LinearSpring = new p2.LinearSpring(body1,wheel,
            { stiffness: stiff,
                damping: damp,
                localAnchorA: [springlocalPtA.x,springlocalPtA.y],
                localAnchorB: [springlocalPtB.x,springlocalPtB.y]
            });
        this.scene.world.addSpring(spring);                        
        //end------------------------------------------------------------------------------------
                        
        return wheel;
    }  
                                                    
    private setupUI():void{
        this.btnHor = jbP2.DispUtil.createBitmapByName("rect");
        this.btnHor.x = this.btnHor.width * .5;
        this.btnHor.y = this.btnHor.height * .5+100;
        this.btnHor.touchEnabled = true;
        this.addChild(this.btnHor);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBtnHorTouchBegin,this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onBtnHorTouchMove,this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_END,this.onBtnHorTouchEnd,this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onBtnHorTouchEnd,this);
                                     
        this.btnVer = jbP2.DispUtil.createBitmapByName("rect");
        this.btnVer.x = this.stage.stageWidth - this.btnHor.width * .5;
        this.btnVer.y = this.btnVer.height * .5+100;
        this.btnVer.touchEnabled = true;
        this.addChild(this.btnVer);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBtnVerTouchBegin,this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onBtnVerTouchMove,this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_END,this.onBtnVerTouchEnd,this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onBtnVerTouchEnd,this);
    }
                
    private dirHorizontal: number = 0;
    private dirVertical: number = 0;
                
    private onBtnHorTouchBegin(e:egret.TouchEvent):void{
        this.updateDirHorizontalValue(e.stageX,e.stageY);
    }
    private onBtnHorTouchMove(e:egret.TouchEvent):void{
        this.updateDirHorizontalValue(e.stageX,e.stageY);
    }
    private onBtnHorTouchEnd(e: egret.TouchEvent): void {
        this.dirHorizontal = 0; 
    }
    private updateDirHorizontalValue(stageX:number,stageY:number):void{
        var local = this.btnHor.globalToLocal(stageX,stageY);
        if(local.x > this.btnHor.width*0.5){
            this.dirHorizontal = 1;
        }else{
            this.dirHorizontal = -1;
        }
    }
                
    private onBtnVerTouchBegin(e:egret.TouchEvent):void{
        this.updateDirVerzontalValue(e.stageX,e.stageY);
    }
    private onBtnVerTouchMove(e:egret.TouchEvent):void{
        this.updateDirVerzontalValue(e.stageY,e.stageY);
    }
    private onBtnVerTouchEnd(e:egret.TouchEvent):void{
        this.dirVertical = 0;
    }
    private updateDirVerzontalValue(stageX:number,stageY:number):void{
        var local = this.btnVer.globalToLocal(stageX,stageY);
        if(local.y > this.btnVer.height*0.5){
            this.dirVertical = 1;
        }else{
            this.dirVertical = -1;
        }
    }
                
                
    private updateChassisAnglarForce():void{
        if(this.chassis == null){
            return;
        }
                                
        var chassisAnglarForce: number = this.chassisAnglarForceDefault;
        if(this.dirVertical == -1){
            this.chassis.angularForce = chassisAnglarForce;
        }else if(this.dirVertical == 1){
            this.chassis.angularForce = -chassisAnglarForce;
        }
                                
        var wheelAnglarForce: number = this.wheelAnglarForceDefault;
        if(this.dirHorizontal == 1){
            this.wheelf.angularForce = -wheelAnglarForce;
            this.wheelb.angularForce = -wheelAnglarForce;
        }else if(this.dirHorizontal == -1){
            this.wheelf.angularForce = wheelAnglarForce;
            this.wheelb.angularForce = wheelAnglarForce;
        }
    }
}
                                                        