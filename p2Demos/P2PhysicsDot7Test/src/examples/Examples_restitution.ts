/**
 * 测试刚体反弹
 * @author 
 *
 */
class Examples_restitution extends egret.Sprite {
    //物理世界
    public world: p2.World;
                        
    //物理世界转换系数
    public factor: number = 50;
            
    //物理世界Rect
    public worldRect: egret.Rectangle;
                    
    //disp container
    public dispCtn: egret.Sprite;
            
    private box1: p2.Body;//
    private bottomGround: p2.Body;
      
    private pvtJt: p2.RevoluteConstraint;//约束
        
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
    	
    private onAdded2stage(e:egret.Event):void{
        this.setup();
    }
    	
    //setup
    public setup() {  
        this.dispCtn = new egret.Sprite();
        this.addChild(this.dispCtn);
                
        //初始化P2Space
        this.worldRect = new egret.Rectangle(0,0,this.stage.stageWidth,this.stage.stageHeight);  
                            
        //创建world
        this.world = new p2.World();
                            
        //set p2.world.sleepMode
        this.world.sleepMode = p2.World.BODY_SLEEPING;
                                                    
        egret.Ticker.getInstance().register(this.p2RunStep, this);//register update step of p2.wolrd 
                
        //p2 scene setup----------------------
        this.createSceneObjs();
        
        jbP2.KeyManager.init();
    }
        
    /**
    * 创建场景物体
    */ 
    private createSceneObjs():void{
//        var wheelMtl: p2.Material = new p2.Material(100);
//        var groundMtl: p2.Material = new p2.Material(101);
        
        this.box1 = this.addOneBall(this.world,this.dispCtn,400,100,25,0,p2.Body.DYNAMIC);//box1
        this.box1.shapes[0].material = new p2.Material(1000); 
        this.box1.allowSleep = false;
        
        this.addOneBox(this.world,this.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        this.addOneBox(this.world,this.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        
        this.bottomGround = this.addOneBox(this.world,this.dispCtn,400,400,800,20,0,p2.Body.STATIC);//bottom wall
        this.bottomGround.shapes[0].material = new p2.Material(1001);
        
                                
        var mtl1: p2.Material = this.bottomGround.shapes[0].material;
        var mtl2: p2.Material = this.box1.shapes[0].material;
        
        var cmtl: p2.ContactMaterial = new p2.ContactMaterial(mtl1,mtl2,<p2.ContactMaterialOptions>{restitution:1.0,friction:10});
        this.world.addContactMaterial(cmtl);
    }
                
    //update step
    protected p2RunStep(dt) {
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
                              
        this.world.step(dt / 1000);//p2.World.step                                 
        this.updateWorldBodiesSkin(this.world);//更新p2World内所有刚体皮肤显示
        
        this.updateKeyCtrl();
    }
    
    private wheelAnglarForceDefault: number = 15;
    private updateKeyCtrl():void{
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)){
            this.box1.angularForce = this.wheelAnglarForceDefault;
            
        }else if(jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)){
            this.box1.angularForce = -this.wheelAnglarForceDefault;
            
        }
    }
              
    /**
    * 更新p2.World里面所有刚体的皮肤
    */ 
    public updateWorldBodiesSkin(p2World:p2.World):void{
        var stageHeight: number = egret.MainContext.instance.stage.stageHeight;//显示世界 stageHeight
        var len = p2World.bodies.length;
                                                            
        for (var i: number = 0; i < len; i++) {//遍历所有的刚体
            var temBody: p2.Body = p2World.bodies[i];
            this.updateBodySkin(temBody);
                                                    
            var dispSkin: egret.DisplayObject = temBody.displays[0];
            if (dispSkin) {//同步物理世界中物体位置和旋转状态到显示列
                if (temBody.sleepState == p2.Body.SLEEPING) {//设置是否睡眠状态显示
                    dispSkin.alpha = 0.5;
                }else {
                    dispSkin.alpha = 1;
                }
            }//endif
        }//end for
    }
        
    /**
    * 更新目标刚体的皮肤
    */ 
    public updateBodySkin(body:p2.Body):void{
        var skinDisp: egret.DisplayObject = body.displays[0];
        if(skinDisp){
            skinDisp.x = this.convertP2ValueToEgret(body.position[0]);//把物理世界的位置转换到显示世界的位置，赋值
            skinDisp.y = this.convertP2Y_To_EgretY(body.position[1]);//把物理世界的位置转换到显示世界的位置，赋值
            skinDisp.rotation = this.convertP2BodyAngleToEgret(body);//把物理世界刚体角度转换为显示世界角度，赋值
        }
    }
        
    /**
    * 获得p2Body的egret显示旋转角度
    */ 
    public convertP2BodyAngleToEgret(body:p2.Body):number{
        var result: number;
        result = 360 - body.angle * 180 / Math.PI;
        return result;
    }
                
    /**
    * 把egret角度转换为p2角度
    */ 
    public convertEgretAngleToP2(angle:number):number{
        var result: number;
        result = (360-angle)*Math.PI/180;
        return result;
    }
            
    /**
    * 物理世界的长度标量到显示世界的转换
    * 适合如 x,width,height的转换，y值不适合
    */ 
    public  convertP2ValueToEgret(value:number):number {
        return value * this.factor;
    }
        
    /**
    * 显示世界物理世界的长度标量到物理世界的转换
    * 适合如 x,width,height的转换，y值不适合
    */ 
    public  convertEgretValueToP2(value:number):number {
        return value / this.factor;
    }
        
    /**
    * 把egretY值转换到p2Y值，仅适合y转换
    */ 
    public  convertEgretY_To_P2Y(egretY:number):number{
        return ( this.worldRect.height - egretY ) / this.factor;
    }
                
                
    /**
    * 把p2y值转换到egretY值，仅适合y转换
    */ 
    public  convertP2Y_To_EgretY(p2Y:number):number{
        return this.worldRect.height - p2Y * this.factor;
    }
        
    /**
    * 在物理世界创建一个矩形刚体，显示cube矢量图形
    */ 
    public addOneBox(p2World:p2.World,ctn:egret.DisplayObjectContainer,px:number,py:number,pw:number,ph:number,pAngle:number,type:number): p2.Body {   
                                                    
        //在物理世界中的位置
        var p2x: number = this.convertEgretValueToP2(px);//显示位置变换到物理世界位置
        var p2y: number = this.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
        var p2Wid: number = this.convertEgretValueToP2(pw);
        var p2Hei: number = this.convertEgretValueToP2(ph);
        var p2Angle: number = this.convertEgretAngleToP2(pAngle);
                                                    
        var display: egret.DisplayObject;             
                                            
        var bodyShape: p2.Shape = new p2.Box({width:p2Wid,height:p2Hei});//new p2.Rectangle(p2Wid, p2Hei);
        var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y],angle:p2Angle });
        body.type = type;
        body.addShape(bodyShape);//给刚体添加p2.Shape
        p2World.addBody(body);
                                                                                    
        display = this.createBoxSkin(pw,ph);
                                                                               
        //绑定刚体和显示皮肤
        body.displays = [display];
        ctn.addChild(display);//把皮肤添加到显示世界
                            
        return body;
    }
        
    /**
    * 创建一个方形皮肤
    * 返回的图形锚点位于图形中心
    */
    public createBoxSkin(width:number,height:number): egret.Shape {
        console.log("createBoxSkin "+width+","+height);
        var shape = new egret.Shape();
        shape.graphics.lineStyle(1,0);
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawRect(0,0,width,height);
        shape.graphics.endFill();
        //将显示对象的锚点移到中心位置
        shape.anchorOffsetX = shape.width / 2;
        shape.anchorOffsetY = shape.height / 2;
        return shape;
    }
    
    public addOneBall(p2World:p2.World,ctn:egret.DisplayObjectContainer,px:number,py:number,pr:number,pAngle:number,type:number): p2.Body {   
                                                                    
        //在物理世界中的位置
        var p2x: number = this.convertEgretValueToP2(px);//显示位置变换到物理世界位置
        var p2y: number = this.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
        var p2R: number = this.convertEgretValueToP2(pr);
                                            
        var p2Angle: number = this.convertEgretAngleToP2(pAngle);
                                                                    
        var display: egret.DisplayObject;             
                                                            
        var bodyShape: p2.Shape = new p2.Circle({ radius: p2R });
        var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y],angle:p2Angle });
        body.type = type;
        body.addShape(bodyShape);//给刚体添加p2.Shape
        p2World.addBody(body);
                                                                                                    
        display = this.createBallSkin(pr);
                                                                                               
        //绑定刚体和显示皮肤
        body.displays = [display];
        ctn.addChild(display);//把皮肤添加到显示世界
                                    
        return body;
    }
        
    public createBallSkin(r: number): egret.Shape {
        var shape = new egret.Shape();
        shape.graphics.lineStyle(1,0);
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawCircle(r, r, r);
        shape.graphics.moveTo(r,r);
        shape.graphics.lineTo(2*r,r);
            shape.graphics.endFill();
            //将显示对象的锚点移到中心位置
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;
            return shape;
        }
}
