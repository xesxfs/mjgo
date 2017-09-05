/**
 *
 * @author 
 *
 */
class Examples_bodyEmitEvt extends egret.Sprite{
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
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,10,p2.Body.STATIC);//middle static
        
                        
        this.box = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,200,50,10,p2.Body.DYNAMIC);//box1
        this.box.on("myEvent",this.onMyEvent,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStageClick,this);
        console.log("this.box.id:" + this.box.id);
    }

    private onStageClick(e: egret.Event): void {
        console.log("onStageClick");
        
        this.box.emit({ type: "myEvent",data:"helloU" });
    }
    
    private onMyEvent(event):void{
        var body: p2.Body = event.target;
        var type = event.type;
        var data = event.data;
        console.log("onMyEvent body.id:"+body.id+",type:"+type+",data:"+data+",this.box,id:"+this.box.id);
    }
}
