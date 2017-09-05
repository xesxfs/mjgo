/**
 * 测试添加盒子
 * @author 
 *
 */
class Examples_box extends egret.Sprite {
	
    private scene: jbP2.SimpleP2Scene;
    private objsCtn: egret.Sprite;
    private drawCtn: egret.Sprite;
     
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
    	
    private onAdded2stage(e:egret.Event):void{
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
        
                        
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,200,50,10,p2.Body.DYNAMIC);//box1
        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,250,50,40,0,p2.Body.DYNAMIC);//ball1
        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,100,100,30,0,p2.Body.DYNAMIC);//ball1
    }
}
