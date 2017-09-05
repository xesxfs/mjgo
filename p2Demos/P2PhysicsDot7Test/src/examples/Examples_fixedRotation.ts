/**
 * fixed rotation
 * @author 
 *
 */
class Examples_fixedRotation  extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;
        
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage,this,this.scene.world);

        var tembody: p2.Body;

        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall                 
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,40,0,p2.Body.STATIC);//middle static
        
                        
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,200,50,0,p2.Body.DYNAMIC);//box1
        tembody.fixedRotation = true;
    }
}
