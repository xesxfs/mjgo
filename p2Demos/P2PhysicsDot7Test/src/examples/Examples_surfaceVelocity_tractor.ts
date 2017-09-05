/**
 *
 * @author 
 *
 */
class Examples_surfaceVelocity_tractor extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    private mouseJt: MouseJointHelper;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world,false);

        var mtlGround: p2.Material = new p2.Material(1001);//地面材质
        var mtlTractor: p2.Material = new p2.Material(1002);//履带材质
        
        
        var box: p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,200,100,50,50,0,p2.Body.DYNAMIC);//box1
        box.shapes[0].material = mtlGround;

        var tractor: p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,150,200,80,20,-5,p2.Body.DYNAMIC);//platform
        tractor.shapes[0].material = mtlTractor;

        
        //设定接触材质，其中参数surfaceVelocity = -.5
        var contactMaterial1 = new p2.ContactMaterial(mtlGround,mtlTractor,<p2.ContactMaterialOptions>{ surfaceVelocity: -0.5,friction: 10 });
        this.scene.world.addContactMaterial(contactMaterial1);
        

        var wallBody: p2.Body;
        wallBody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        wallBody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        
        var groundBody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        groundBody.shapes[0].material = mtlGround;
    }
}
