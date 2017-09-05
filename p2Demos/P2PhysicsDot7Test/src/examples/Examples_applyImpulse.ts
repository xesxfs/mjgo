/**
 * apply impulse
 * @author 
 *
 */
class Examples_applyImpulse extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    private objsCtn: egret.Sprite;
    private drawCtn: egret.Sprite;
    private box: p2.Body;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.objsCtn = new egret.Sprite();
        this.addChild(this.objsCtn);
        this.drawCtn = new egret.Sprite();
        this.addChild(this.drawCtn);

        this.scene = new jbP2.SimpleP2Scene(this.stage,this.objsCtn);
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage,this.objsCtn,this.scene.world);

        var tembody: p2.Body;

        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall                 
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        
                        
        this.box = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,50,50,10,p2.Body.DYNAMIC);//box1
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStageClick,this);
    }

    private onStageClick(e: egret.Event): void {
        console.log("onStageClick");

        //Apply impulse to a point relative to the body.
        //This could for example be a point on the Body surface.
        //An impulse is a force added to a body during a short period of time (impulse = force * time).
        //Impulses will be added to Body.velocity and Body.angularVelocity.
        this.box.applyImpulse([10,10],[0.5,0]);
    }
}
