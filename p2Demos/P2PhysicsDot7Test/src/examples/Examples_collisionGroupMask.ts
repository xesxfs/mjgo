/**
 * 测试CollisionGroup and CollisionMask
 * @author 
 * wheelMask 和this.Group_ground | this.Group_other | this.Group_wheel碰撞
 * chassisMask 和this.Group_ground | this.Group_other碰撞
 * defaultCollisionMask 和this.Group_ground | this.Group_other | this.Group_wheel | this.Group_chassis碰撞
 */
class Examples_collisionGroupMask extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
        
    private wheel: p2.Body;
    
    private Group_ground: number = 1;//ground
    private Group_wheel: number = 2;//wheel
    private Group_chassis: number = 4;//chassis
    private Group_other: number = 8;//other
    
    private wheelAnglarForceDefault: number = 15;
        
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
                        	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
                                
        this.scene.world.defaultContactMaterial.friction = 10;
                
        var mouseJt: MouseJointHelper = new MouseJointHelper(this.stage,this.scene.dispCtn,this.scene.world,false);
                      
        jbP2.KeyManager.init();
                                                                                                     
        this.setupScene();
                
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this);//
    }
        
    //works
    private setupScene():void{
        var wheelMask: number = this.Group_ground | this.Group_other | this.Group_wheel;
        var chassisMask: number = this.Group_ground | this.Group_other;
        var defaultCollisionMask: number = this.Group_ground | this.Group_other | this.Group_wheel | this.Group_chassis;
        
        this.wheel = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,400,100,25,0,p2.Body.DYNAMIC);//box1
        this.wheel.shapes[0].material = new p2.Material(1000); 
        this.wheel.allowSleep = false;
        this.wheel.shapes[0].collisionGroup = this.Group_wheel;
        this.wheel.shapes[0].collisionMask = wheelMask;
        
        
        //另外一个轮子，用来测试轮子之间是否碰撞
        var temWheel: p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,600,100,25,0,p2.Body.DYNAMIC);
        temWheel.shapes[0].material = new p2.Material(1000);
        temWheel.allowSleep = false;
        temWheel.shapes[0].collisionGroup = this.Group_wheel;
        temWheel.shapes[0].collisionMask = wheelMask;
          
        var wall: p2.Body;
        wall = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,40,480,0,p2.Body.STATIC);//left wall
        wall.shapes[0].collisionGroup = this.Group_ground;
        wall.shapes[0].collisionMask = defaultCollisionMask;
        wall = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,40,480,0,p2.Body.STATIC);//right wall
        wall.shapes[0].collisionGroup = this.Group_ground;
        wall.shapes[0].collisionMask = defaultCollisionMask;
        wall = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,40,0,p2.Body.STATIC);//bottom wall
        wall.shapes[0].collisionGroup = this.Group_ground;
        wall.shapes[0].collisionMask = defaultCollisionMask;
        
        var chassis:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,500,240,80,40,0,p2.Body.DYNAMIC);//chassis
        chassis.shapes[0].collisionGroup = this.Group_chassis;
        chassis.shapes[0].collisionMask = chassisMask;
        
        var temBox: p2.Body;
        
        temBox = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,100,240,40,40,0,p2.Body.DYNAMIC);//other
        temBox.shapes[0].collisionGroup = this.Group_other;
        temBox.shapes[0].collisionMask = defaultCollisionMask;
        temBox = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,150,240,40,40,0,p2.Body.DYNAMIC);//other
        temBox.shapes[0].collisionGroup = this.Group_other;
        temBox.shapes[0].collisionMask = defaultCollisionMask;
    }
    
    private updateKeyCtrl():void{
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)){
            this.wheel.angularForce = this.wheelAnglarForceDefault;
        }else if(jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)){
            this.wheel.angularForce = -this.wheelAnglarForceDefault;
        }
    }
}
