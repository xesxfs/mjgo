/**
 * ray reflection
 * @author 
 *
 */
class Examples_rayReflect extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    
    private start = [0,0];//rayStart
    private end = [0,0];//rayEnd
    private direction = [0,0];//rayDirection
    
    private result = new p2.RaycastResult();//RaycastResult
    private hitPoint = p2.vec2.create();//ray hitPoint
    private ray = new p2.Ray({
                                mode: p2.Ray.CLOSEST
                            });
                            
    private vec2 = p2.vec2;
    private airIndex = 1;
    private shapeIndex = 1.5;

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
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,480,800,20,0,p2.Body.STATIC);//middle static
        
                        
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,100,100,0,p2.Body.DYNAMIC);//box1
        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,250,50,40,0,p2.Body.DYNAMIC);//ball1
     
        this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
        
        this.createDebug();
    }
    private loop(): void {
        this.debugDraw.drawDebug();
        this.drawRays();
    }
    
    private drawRays() {
        var N = 1;
        for(var i = 0;i < N;i++) {
    
            this.ray.from[0] = 1;
            this.ray.from[1] = 2;
            var angle = .5 * Math.sin(this.scene.world.time * 1 - 1) - 0.005 * (i / N) * 10 + 0.1;
            this.ray.direction[0] = Math.cos(angle);
            this.ray.direction[1] = Math.sin(angle);
    
            this.ray.to[0] = this.ray.from[0] + this.ray.direction[0] * 100;
            this.ray.to[1] = this.ray.from[1] + this.ray.direction[1] * 100;
    
            this.ray.update();
    
    
            var hits = 0;
            while(this.scene.world.raycast(this.result,this.ray) && hits++ < 10) {
                this.result.getHitPoint(this.hitPoint,this.ray);
                this.debugDraw.drawRay(this.ray.from,this.hitPoint);
                //drawRayResult(result);
    
                // move start to the hit point
                p2.vec2.copy(this.ray.from,this.hitPoint);
    
                this.ray.update();
    
                
                //反射实现－－－－－－－－－
                p2.vec2.reflect(this.ray.direction,this.ray.direction,this.result.normal);
                
    
                // move out a bit
                this.ray.from[0] += this.ray.direction[0] * 0.001;
                this.ray.from[1] += this.ray.direction[1] * 0.001;
    
                this.ray.to[0] = this.ray.from[0] + this.ray.direction[0] * 100;
                this.ray.to[1] = this.ray.from[1] + this.ray.direction[1] * 100;
    
                this.result.reset();
            }
            this.debugDraw.drawRay(this.ray.from,this.ray.to);
        }
    
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
