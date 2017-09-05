/**
 *
 * @author 
 *
 */
class Examples_surfaceVelocity_tractor_capsual extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    private tfInfo: egret.TextField;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);

        this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;

        this.scene.world.islandSplit = true;//使用islandSplit
        
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage,this,this.scene.world);

        this.createObjs();

        this.createDebug();

        this.tfInfo = new egret.TextField();
        this.addChild(this.tfInfo);
    }

    private createObjs(): void {
        //code here
        
        var mtlGround: p2.Material = new p2.Material(1001);//地面材质
        var mtlTractor: p2.Material = new p2.Material(1002);//履带材质
        
        
        var box: p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,200,100,50,50,0,p2.Body.DYNAMIC);//box1
        box.shapes[0].material = mtlGround;

        
        
        var tractorShape: p2.Shape = new p2.Capsule({ length: 1,radius: 0.2 }); //new p2.Rectangle(p2Wid, p2Hei);
        var tractorBody: p2.Body = new p2.Body({ mass: 1,position: [3,3],angle: 0 });
        tractorBody.type = p2.Body.DYNAMIC;
        tractorBody.addShape(tractorShape);//给刚体添加p2.Shape
        tractorBody.shapes[0].material = mtlTractor;
        this.scene.world.addBody(tractorBody);

        
        //设定接触材质，其中参数surfaceVelocity = -.5
        var contactMaterial1 = new p2.ContactMaterial(mtlGround,mtlTractor,<p2.ContactMaterialOptions>{ surfaceVelocity: -0.5,friction: 10 });
        this.scene.world.addContactMaterial(contactMaterial1);


        var wallBody: p2.Body;
        wallBody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        wallBody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        
        var groundBody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        groundBody.shapes[0].material = mtlGround;
    }

    private loop(): void {
        this.debugDraw.drawDebug();

        var numIslands = this.scene.world.islandManager.islands.length;
        this.tfInfo.text = "number of islands:" + numIslands;
    }


    private debugDraw: p2DebugDraw;
    private debugSpr: egret.Sprite;
    private createDebug(): void {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.scene.world);
        this.debugSpr = new egret.Sprite();
        this.addChild(this.debugSpr);
        this.debugDraw.setSprite(this.debugSpr);

        this.debugDraw.setLineWidth(0.02);
        //this.debugSpr.x = this.stage.stageWidth / 2;
        this.debugSpr.y = this.stage.stageHeight;

        var scale = 50;
        this.debugSpr.scaleX = scale;
        this.debugSpr.scaleY = -scale;
    }
}
