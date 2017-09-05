/**
 * Gear constraint
 * @author 
 *
 */
class Examples_gearConstraint extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
    private mouseJt: MouseJointHelper;
           
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
        	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world);
                
        var wheelX: number = 400;
        var wheelY: number = 100;
        var rA: number = 40;//齿轮A半径
        var rB: number = 30;//齿轮B半径
        var bodyA:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,wheelX,wheelY,rA,0,p2.Body.DYNAMIC);//ball1
        var bodyB:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,wheelX+rA+rB,wheelY,rB,0,p2.Body.DYNAMIC);//ball1
        bodyA.allowSleep = false;
        bodyB.allowSleep = false;
        
        //创建dummyBody来实现约束到世界
        var dummyBody = new p2.Body();
        this.scene.world.addBody(dummyBody);
        
        //用Revolute固定到世界中
        var revoluteA:p2.RevoluteConstraint = new p2.RevoluteConstraint(dummyBody, bodyA, {
            worldPivot: bodyA.position
        });
        //用Revolute固定到世界中
        var revoluteB:p2.RevoluteConstraint = new p2.RevoluteConstraint(dummyBody, bodyB, {
            worldPivot: bodyB.position
        });
        this.scene.world.addConstraint(revoluteA);
        this.scene.world.addConstraint(revoluteB);
        
        // Add gear
        var gearConstraint:p2.GearConstraint = new p2.GearConstraint(bodyA,bodyB,{ ratio: -rA/rB });//负数约束两刚体方向相反，rA/rB为半径比率
        this.scene.world.addConstraint(gearConstraint);
    }
}
