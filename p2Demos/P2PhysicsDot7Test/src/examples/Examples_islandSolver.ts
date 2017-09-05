/**
 * islandSolver
 * 注意：这个demo直接使用p2空间坐标创建的，需要改成egret空间坐标创建
 * @author 
 *
 */
class Examples_islandSolver extends egret.Sprite{
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
    private createObjs():void{
        var N = 10,  // Number of circles in each rope
            M = 10,  // Number of ropes
            r = 0.1; // Circle radius 
        // Create circle ropes
        for(var j = 0;j < M;j++) {
            var lastBody;
            for(var i = N;i >= 0;i--) {
                var x = (j + 0.5 - M / 2) * r * 8;
                var y = (N / 2 - i) * r * 2.1;
                var p = new p2.Body({
                    mass: i == 0 ? 0 : 1,
                    position: [x,y]
                });
                p.addShape(new p2.Circle({ radius: r }));
                if(lastBody) {
                    // Connect the current body to the previous one
                    var dist = Math.abs(p.position[1] - lastBody.position[1]);
                    var constraint = new p2.DistanceConstraint(p,lastBody,{
                        distance: dist
                    });
                    this.scene.world.addConstraint(constraint);
                } else {
                    p.velocity[0] = 1 * i;
                }
                lastBody = p;
                this.scene.world.addBody(p);
            }
            lastBody = null;
        }
        
    }
    
    private loop(): void {
        this.debugDraw.drawDebug();
        
        var numIslands = this.scene.world.islandManager.islands.length;
        this.tfInfo.text = "number of islands:"+numIslands;
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
        this.debugSpr.y = this.stage.stageHeight/2;

        var scale = 50;
        this.debugSpr.scaleX = scale;
        this.debugSpr.scaleY = -scale;
    }
}
