/**
 *测试添加基本物理刚体测试
 * @author
 *  
 * p2添加步骤---------------------------------
 * 1:egretProperties.json中 modules添加项目 {"name": "physics","path":"../p2_libsrc"}，//../p2_libsrc表示p2_libsrc和项目目录同级
 * 2:egret build XXProj -e
 * 3:start development
 */
class Examples_addBasicBody extends egret.DisplayObjectContainer {
	public constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
	}
	
    //debug模式，使用图形绘制
    private isDebug: boolean = false;
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
        
                
        //鼠标点击添加刚体
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
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
                                
        var stageHeight: number = egret.MainContext.instance.stage.stageHeight;//显示世界 stageHeight
        var l = this.world.bodies.length;
        
        for (var i: number = 0; i < l; i++) {//遍历所有的刚体
            var boxBody: p2.Body = this.world.bodies[i];
            
            if(boxBody.displays && boxBody.displays[0]) {//同步物理世界中物体位置和旋转状态到显示列表
                var box: egret.DisplayObject = boxBody.displays[0];
                box.x = boxBody.position[0] * this.factor;//把物理世界的位置转换到显示世界的位置，赋值
                box.y = stageHeight - boxBody.position[1] * this.factor;//把物理世界的位置转换到显示世界的位置，赋值
                box.rotation = 360 - boxBody.angle * 180 / Math.PI;//把物理世界刚体角度转换为显示世界角度，赋值
                
                if (boxBody.sleepState == p2.Body.SLEEPING) {//设置是否睡眠状态显示
                    box.alpha = 0.5;
                }else {
                    box.alpha = 1;
                }
            }
        }
    }
    
    /**
     * 点击鼠标，添加一个刚体
     */ 
    private addOneBox(e: egret.TouchEvent): void {   
        
        //在物理世界中的位置
        var positionX: number = Math.floor(e.stageX / this.factor);//显示位置变换到物理世界位置
        var positionY: number = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / this.factor);//显示位置变换到物理世界位置
        
        var display: egret.DisplayObject;
        var tarBody: p2.Body;
        if (Math.random() > 0.5) {
            //添加方形刚体
            //var boxShape: p2.Shape = new p2.Rectangle(2, 1);
            var boxShape: p2.Box = new p2.Box({width:2,height:1});
            tarBody = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
            tarBody.addShape(boxShape);//给刚体添加p2.Shape
            this.world.addBody(tarBody);
                                        
            if(this.isDebug){//创建对应的显示皮肤对象
                display = this.createBox((<p2.Box>boxShape).width * this.factor,(<p2.Box>boxShape).height * this.factor);
            }else{
                display = this.createBitmapByName("rect");
            }
            
            //把物理世界的尺寸换算到显示世界尺寸,并赋值给绑定的显示对象
            display.width = (<p2.Box>boxShape).width * this.factor;
            display.height = (<p2.Box>boxShape).height * this.factor;
        }else {
            //添加圆形刚体
            var circleShape: p2.Circle = new p2.Circle({radius:1});
            tarBody = new p2.Body({ mass: 1, position: [positionX, positionY] });
            tarBody.addShape(circleShape);//rigidBody.addShape
            this.world.addBody(tarBody);//add to p2World
                                            
            if (this.isDebug) {//创建对应的显示皮肤对象
                display = this.createBall((<p2.Circle>circleShape).radius*this.factor);
            } else {
                display = this.createBitmapByName("circle");
            }
              
            //把物理世界的尺寸换算到显示世界尺寸,并赋值给绑定的显示对象
            display.width = (<p2.Circle>circleShape).radius * 2 * this.factor;
            display.height = (<p2.Circle>circleShape).radius * 2 * this.factor;
        }
                                                     
        //将显示对象的锚点移到中心位置
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
                                    
        //绑定刚体和显示皮肤
        tarBody.displays = [display];
        this.addChild(display);//把皮肤添加到显示世界
    }
    
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
    * 创建一个圆形
    */
    private createBall(r: number): egret.Shape {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawCircle(r, r, r);
        shape.graphics.endFill();
        return shape;
    }
    /**
    * 创建一个方形
    */
    private createBox(width:number,height:number): egret.Shape {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawRect(0,0,width,height);
        shape.graphics.endFill();
        return shape;
    }
}
