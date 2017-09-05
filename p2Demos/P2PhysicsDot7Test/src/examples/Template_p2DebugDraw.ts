/**
 * 使用p2DebugDraw来渲染的模版，方便直接测试p2js代码
 * @author 
 *
 */
class Template_p2DebugDraw extends egret.Sprite{
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
        this.debugSpr.x = this.stage.stageWidth / 2;
        this.debugSpr.y = this.stage.stageHeight / 2;

        var scale = 50;
        this.debugSpr.scaleX = scale;
        this.debugSpr.scaleY = -scale;
    }
}
