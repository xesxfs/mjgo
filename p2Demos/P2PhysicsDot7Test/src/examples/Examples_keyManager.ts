/**
 * 测试键盘控制
 * @author 
 *
 */
class Examples_keyManager extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
    private mouseJt: MouseJointHelper;
    
    private wheel: p2.Body;
    
    private wheelAnglarForceDefault: number = 15;//轮子转动默认角力
        
           
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
        	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //给予默认摩擦力较大值，防止轮子滑动
        this.scene.world.defaultContactMaterial.friction = 10;
        this.scene.world.defaultContactMaterial.restitution = 0.4;
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world);
        
        jbP2.KeyManager.init();
                
        var tembody: p2.Body;
                
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,50,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,50,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;
                                
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        tembody.id = 2;
                                
        
        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,100,100,30,0,p2.Body.DYNAMIC);//ball1
        tembody.id = 5;
        this.wheel = tembody;
        this.wheel.allowSleep = false;
        
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this);//
    }
    
    private updateKeyCtrl():void{
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)){
            this.wheel.angularForce = this.wheelAnglarForceDefault;
        }else if(jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)){
            this.wheel.angularForce = -this.wheelAnglarForceDefault;
        }
    }
}
