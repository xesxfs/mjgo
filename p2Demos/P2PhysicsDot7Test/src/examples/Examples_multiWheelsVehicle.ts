/**
 * 测试多轮车辆
 * @author 
 *
 */
class Examples_multiWheelsVehicle extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
                   
    private chassis: p2.Body;
    private wheelf: p2.Body;
    private wheelb: p2.Body;
    private wheelm: p2.Body;
            
    private btnHor: egret.Bitmap;
    private btnVer: egret.Bitmap;
                 
    private chassisAnglarForceDefault: number = 50;//车体转动默认角力
    private wheelAnglarForceDefault: number = 15;//轮子转动默认角力
        
    private chassisX = 200;
    private chassisY = 100;
    private chassisW = 100;
    private chassisH = 40;
    private wheelR = 20;
            
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
                	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        var mouseJt = new MouseJointHelper(this.stage,this,this.scene.world,true);    
        //给予默认摩擦力较大值，防止轮子滑动
        this.scene.world.defaultContactMaterial.friction = 40;
        
        jbP2.KeyManager.init();
                
        var tembody: p2.Body;
                                
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
                        
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;      
                        
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        tembody.id = 2;
                        
                                                
        this.createVehicle();
        
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this);//
    }
                
    private createVehicle():void{
        var chassis:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,this.chassisX,this.chassisY,this.chassisW,this.chassisH,0,p2.Body.DYNAMIC);//box1
        console.log("chassis.mass:"+chassis.mass);   
        chassis.mass = 2;
        
        var wheelOffset: egret.Point;
                        
        wheelOffset= new egret.Point(-this.chassisW*.5,this.chassisH*.5);
        this.wheelb = this.setupWheel(chassis,wheelOffset);
                            
        wheelOffset= new egret.Point(this.chassisW*.5,this.chassisH*.5);
        this.wheelf = this.setupWheel(chassis,wheelOffset);
        
        wheelOffset= new egret.Point(0,this.chassisH*.5);
        this.wheelm = this.setupWheel(chassis,wheelOffset);
                
        this.chassis = chassis;
                
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false;
        this.wheelm.allowSleep = false;
    }
                            
                            
    private setupWheel(body1:p2.Body,wheelOffset:egret.Point):p2.Body{       
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
        var stiff: number = 60;//弹簧硬度
        var damp: number = 10;//弹簧阻尼
        var springlocalPtA: egret.Point = new egret.Point(body2.position[0]-body1.position[0],body2.position[1]-body1.position[1]);//轮子在车体空间的位置
        var springlocalPtB: egret.Point = new egret.Point(0,0);//轮子在自己空间的位置
                        
                                                        
        var spring: p2.LinearSpring = new p2.LinearSpring(body1,body2,
            { stiffness: stiff,
                damping: damp,
                localAnchorA: [springlocalPtA.x,springlocalPtA.y],
                localAnchorB: [springlocalPtB.x,springlocalPtB.y]
            });
        this.scene.world.addSpring(spring);                        
        //end------------------------------------------------------------------------------------
                
        return body2;
    }  
     
    private updateKeyCtrl():void{
        if(this.chassis == null){
            return;
        }
                                                
        var chassisAnglarForce: number = this.chassisAnglarForceDefault;
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.UP)){
            this.chassis.angularForce = chassisAnglarForce;
        }else if(jbP2.KeyManager.isDown(jbP2.KeyManager.DOWN)){
            this.chassis.angularForce = -chassisAnglarForce;
        }
                                                
        var wheelAnglarForce: number = this.wheelAnglarForceDefault;
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)){
            this.wheelf.angularForce = wheelAnglarForce;
            this.wheelb.angularForce = wheelAnglarForce;
            this.wheelm.angularForce = wheelAnglarForce;
        }else if(jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)){   
            this.wheelf.angularForce = -wheelAnglarForce;
            this.wheelb.angularForce = -wheelAnglarForce;
            this.wheelm.angularForce = -wheelAnglarForce;
        }
    }
                    
}
