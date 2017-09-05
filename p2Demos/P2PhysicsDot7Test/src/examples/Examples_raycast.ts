/**
 * raycast
 * @author 
 * 结论：p2.ray相关类都没，所以不能工作
 */
class Examples_raycast extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
    private mouseJt: MouseJointHelper;
           
    private ray:p2.Ray;
    private hitPoint:number[];
    private result: p2.RaycastResult;
    
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
    }
        	
    
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world);
                
        var tembody: p2.Body;

        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;

        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        tembody.id = 2;

        
        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,250,50,40,0,p2.Body.DYNAMIC);//ball1
        tembody.id = 4;
        
        
        this.result = new p2.RaycastResult();
        this.hitPoint = p2.vec2.create();
        this.ray = new p2.Ray({
            mode: p2.Ray.CLOSEST
        });
        
        this.createDebug();
    }
    private loop(): void {
        this.debugDraw.drawDebug();
        this.rayHitStep();
    }
    
    public rayHitStep() {
        var rayDispFromX: number = 300;
        var rayDispFromY: number = 350;
        var rayDispToX: number = 200;
        var rayDispToY: number = 200;
        
        this.ray.from[0] = jbP2.P2Space.convertEgretValueToP2(rayDispFromX);
        this.ray.from[1] = jbP2.P2Space.convertEgretY_To_P2Y(rayDispFromY);
        this.ray.to[0] = jbP2.P2Space.convertEgretValueToP2(rayDispToX);
        this.ray.to[1] = jbP2.P2Space.convertEgretY_To_P2Y(rayDispToY);
        this.ray.update();
        
        if( this.scene.world.raycast( this.result,this.ray ) ){
            //console.log("射线检测有碰撞");
            this.result.getHitPoint(this.hitPoint,this.ray);
            this.debugDraw.drawRay(this.ray.from,this.hitPoint,0xff0000);
        }else{
            this.debugDraw.drawRay(this.ray.from,this.ray.to,0x0000ff);
        }
        
        this.result.reset();
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
