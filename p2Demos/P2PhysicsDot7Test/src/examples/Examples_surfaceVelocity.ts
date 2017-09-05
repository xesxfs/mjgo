/**
 * surface velocity
 * @author 
 *
 */
class Examples_surfaceVelocity extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    private mouseJt: MouseJointHelper;
           
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
        	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world,false);
                
        var mtlBox: p2.Material = new p2.Material(1001);//box 材质
        var mtlPlatform1: p2.Material = new p2.Material(1002);//平台材质1
        var mtlPlatform2: p2.Material = new p2.Material(1003);//平台材质2
        
        var box:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,200,100,50,50,0,p2.Body.DYNAMIC);//box1
        box.shapes[0].material = mtlBox;
        
        var platform1:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,150,200,200,20,-5,p2.Body.STATIC);//platform
        platform1.shapes[0].material = mtlPlatform1;
         
        var platform2:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,300,300,400,20,5,p2.Body.STATIC);//platform
        platform2.shapes[0].material = mtlPlatform2;
        
        //设定mtlBox和mtlPlatform1接触材质，其中参数surfaceVelocity = -.5
        var contactMaterial1 = new p2.ContactMaterial(mtlBox,mtlPlatform1,<p2.ContactMaterialOptions>{surfaceVelocity:-0.5,friction:20});
        this.scene.world.addContactMaterial(contactMaterial1);
        
        //设定mtlBox和mtlPlatform1接触材质，其中参数surfaceVelocity = 1.5
        var contactMaterial2 = new p2.ContactMaterial(mtlBox,mtlPlatform2,<p2.ContactMaterialOptions>{ surfaceVelocity: 1.5,friction:10 });
        this.scene.world.addContactMaterial(contactMaterial2);
        
        
        var tembody: p2.Body;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;                               
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        tembody.id = 2;
    }
}
