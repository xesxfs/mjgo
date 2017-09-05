/**
 * LockConstraint
 * @author 
 *
 */
class Examples_lock extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
    private mouseJt: MouseJointHelper;
    
    private lockJt: p2.LockConstraint;
           
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
        	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world);
                
        var tembody: p2.Body;
                
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;
                                
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,10,p2.Body.STATIC);//middle static
        tembody.id = 2;
                                

        var ball1:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,100,100,60,30,-10,p2.Body.DYNAMIC);//ball
        var ball2:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,200,100,60,30,10,p2.Body.DYNAMIC);//ball
        
        ball1.allowSleep = ball2.allowSleep = false;
        
        //lock 在创建时候会自动按照两个刚体角度作为约束角度，无需另外指定
        //这里的maxForce不是实现破坏的最大力量，和setStiffness得到差不多的效果
        var lock: p2.LockConstraint = new p2.LockConstraint(ball1,ball2,{ maxForce: 1000 });
        lock.collideConnected = false;
        //如下行，可以通过localAngleB来设置在约束中BodyB相对BodyA的角度
        //var lock: p2.LockConstraint = new p2.LockConstraint(ball1,ball2,{ collideConnected: false,maxForce: 1000,localAngleB:Math.PI/8 });
        //lock.setStiffness(10);
        this.scene.world.addConstraint(lock);
        this.lockJt = lock;
    }
    
    
    
    
	
}
