/**
 * 测试基本的sliderConstraint,是刚体沿着线约束运动
 * 结论：
 * disableRotationalLock=true 则bodyB可以绕约束点旋转
 * disableRotationalLock=false 则bodyB不可以绕约束点旋转
 * @author 
 * 
 */
class Examples_prismaticBasic extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
               
    private chassis: p2.Body;
    private wheel: p2.Body;
        
    private chassisX = 200;
    private chassisY = 100;
    private chassisW = 50;
    private chassisH = 50;
    private wheelR = 25;
        
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
    }
        
    private onAddedToStage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
                                 
        //给予默认摩擦力较大值，防止轮子滑动
        this.scene.world.defaultContactMaterial.friction = 100;
        
        var tembody: p2.Body;
                                
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;
                                                
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        tembody.id = 2;
                
                
        this.createVehicle();
                
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStageTouchBegin,this);
        
        this.graphics.lineStyle(1,0xff0000);
        this.graphics.drawCircle(0,0,20);
        this.graphics.endFill();
    }
        
    private onStageTouchBegin(e: egret.TouchEvent): void {
        this.chassis.wakeUp();
        this.wheel.wakeUp();
        
        if(e.stageX > this.wheel.displays[0].x){
            this.chassis.applyForce([400,300],[this.chassis.position[0],this.chassis.position[1]]);
        }else{
            this.chassis.applyForce([-400,300],[this.chassis.position[0],this.chassis.position[1]]);
        }
        
        this.wheel.angularForce = 100;
    }
        
    private createVehicle():void{
        var chassis:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,this.chassisX,this.chassisY,this.chassisW,this.chassisH,0,p2.Body.DYNAMIC);//box1
        this.chassis = chassis;
        
        var wheelOffset: egret.Point;              
        wheelOffset= new egret.Point(this.chassisW*2,0);
        this.setupWheel(chassis,wheelOffset);
    }
                    
        
    private setupWheel(body1:p2.Body,wheelOffset:egret.Point):void{       
        var body2:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,this.chassisX+wheelOffset.x,this.chassisY+wheelOffset.y,this.wheelR,0,p2.Body.DYNAMIC);//box1
                                            
        var localPt1: egret.Point = new egret.Point(body2.position[0]-body1.position[0],body2.position[1]-body1.position[1]);//轮子在车体空间的位置
        var localPt2: egret.Point = new egret.Point(0,0);//轮子在自己空间的位置
        
        //prismatic constraint----------------------------------------------------------------                                
        var localAxisBodyA = [0,1];//在bodyA中局部坐标系的一个Axis
        var prismaticUpper: number = this.chassisH*.5;//slider沿着localAxisA轴的最大滑动值
        var prismaticLower: number = -this.chassisH*.5;//slider沿着localAxisA轴的最小滑动值
        prismaticUpper = jbP2.P2Space.convertEgretValueToP2(prismaticUpper);//注意这里转换标量即可
        prismaticLower = jbP2.P2Space.convertEgretValueToP2(prismaticLower);//注意这里转换标量即可
           
        var prismatic: p2.PrismaticConstraint = new p2.PrismaticConstraint( body1,body2,
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
        //在本例中LineerSpring的弹簧区开始和结束点，定义在两个刚体的对着的两个边缘上
//        var stiff: number = 100;//弹簧硬度
//        var damp: number = 5;//弹簧阻尼
//        var springlocalPtA: egret.Point = new egret.Point(wheelOffset.x,wheelOffset.y);//轮子在车体空间的位置
//        var springlocalPtB: egret.Point = new egret.Point(0,0);//轮子在自己空间的位置
//        springlocalPtA.x = jbP2.P2Space.convertEgretValueToP2(springlocalPtA.x);//转换到物理世界坐标
//        springlocalPtA.y = jbP2.P2Space.convertEgretY_To_P2Y(springlocalPtA.y);//转换到物理世界坐标
//        springlocalPtB.x = jbP2.P2Space.convertEgretValueToP2(springlocalPtB.x);
//        springlocalPtB.y = jbP2.P2Space.convertEgretY_To_P2Y(springlocalPtB.y);
//                                
//        var spring: p2.LinearSpring = new p2.LinearSpring(body1,body2,
//            { stiffness: stiff,
//                damping: damp,
//                localAnchorA: [springlocalPtA.x,springlocalPtA.y],
//                localAnchorB: [springlocalPtB.x,springlocalPtB.y]
//            });
//        this.scene.world.addSpring(spring);     
        //end------------------------------------------------------------------------------------
            
        this.wheel = body2;
    }  
}
