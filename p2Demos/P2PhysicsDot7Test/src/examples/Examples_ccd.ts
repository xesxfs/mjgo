/**
 * 测试结论是：
 * 在很快速度时候可以不穿越墙体，但是会被嵌入到墙体里
 * @author 
 *
 */
class Examples_ccd extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage,this,this.scene.world);

        var tembody: p2.Body;

        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,0,800,10,0,p2.Body.STATIC);//middle static
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,480,800,10,0,p2.Body.STATIC);//middle static
        
        
        var ball:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,250,50,15,0,p2.Body.DYNAMIC);//ball1
        ball.ccdSpeedThreshold = -0;//0 开启ccd，-1关闭ccd
    }
}
