/**
 * 这里测试jbp2里面封装的工具
 */ 
class Examples_addBasicBody2 extends egret.DisplayObjectContainer {
    public constructor() {
        super();
                
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
    	
    //物理世界
    private world: p2.World;
        
    //物理世界转换系数
    private factor: number = 50;
        
    private onAdded2stage(e:egret.Event):void{
        this.createGameScene();
    }
    
    /**
    * 创建游戏场景
    */
    private createGameScene(): void { 
        jbP2.P2Space.initSpace(this.factor,new egret.Rectangle(0,0,this.stage.stageWidth,this.stage.stageHeight));        
        
        //创建world
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
                        
        //创建plane
        var planeShape: p2.Plane = new p2.Plane();
        var planeBody: p2.Body = new p2.Body();
        planeBody.type = p2.Body.STATIC;
        planeBody.addShape(planeShape);
        planeBody.displays = [];
        this.world.addBody(planeBody);
                        
        egret.Ticker.getInstance().register(this.p2RunStep, this);    
        
        
        jbP2.P2Space.addOneBox(this.world,this,400,300,800,25,0,p2.Body.STATIC);//ground
        jbP2.P2Space.addOneBox(this.world,this,0,240,10,480,0,p2.Body.STATIC);//left wall
        jbP2.P2Space.addOneBox(this.world,this,800,240,10,480,0,p2.Body.STATIC);//right wall
        
        jbP2.P2Space.addOneBox(this.world,this,400,400,250,5,10,p2.Body.STATIC);//middle static
        
        jbP2.P2Space.addOneBox(this.world,this,400,100,200,50,10,p2.Body.DYNAMIC);//box1
        jbP2.P2Space.addOneBall(this.world,this,400,50,40,0,p2.Body.DYNAMIC);//ball1
        jbP2.P2Space.addOneBall(this.world,this,100,100,30,0,p2.Body.DYNAMIC);//ball1
    }
       
    /**
    * p2 physics run step
    */ 
    private p2RunStep(dt) {
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
  
        this.world.step(dt / 1000);//p2.World.step
        
        //更新p2World内所有刚体皮肤显示
        jbP2.P2Space.updateWorldBodiesSkin(this.world);
    }
    
    
    
    
}
                    