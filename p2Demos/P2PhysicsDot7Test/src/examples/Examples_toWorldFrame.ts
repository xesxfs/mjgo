/**
 * 刚体坐标转换
 * @author 
 *
 */
class Examples_toWorldFrame extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    private objsCtn: egret.Sprite;
    private drawCtn: egret.Sprite;

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
        var box = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,200,50,15,p2.Body.STATIC);//box1
        
        this.drawBodyLocalPt(box,[0,0]);//绘制刚体原点
        this.drawBodyLocalPt(box,[1,0]);//绘制原点右边50像素
    }
    
    //把刚体局部空间的点，转换到世界，然后画出来
    private drawBodyLocalPt(body:p2.Body,localPt:number[]):void{
        var worldPt = [0,0];//初始化一个数组
        body.toWorldFrame(worldPt,localPt);//转换刚体局部坐标到世界
        
        //画出来
        var drawX = jbP2.P2Space.convertP2ValueToEgret(worldPt[0]);
        var drawY = jbP2.P2Space.convertP2Y_To_EgretY(worldPt[1]);
        this.drawCtn.graphics.lineStyle(1,0xff0000);
        this.drawCtn.graphics.drawCircle(drawX,drawY,5);
        this.drawCtn.graphics.endFill();
    }
}
