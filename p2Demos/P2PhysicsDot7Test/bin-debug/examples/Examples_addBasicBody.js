var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *测试添加基本物理刚体测试
 * @author
 *
 * p2添加步骤---------------------------------
 * 1:egretProperties.json中 modules添加项目 {"name": "physics","path":"../p2_libsrc"}，//../p2_libsrc表示p2_libsrc和项目目录同级
 * 2:egret build XXProj -e
 * 3:start development
 */
var Examples_addBasicBody = (function (_super) {
    __extends(Examples_addBasicBody, _super);
    function Examples_addBasicBody() {
        var _this = _super.call(this) || this;
        //debug模式，使用图形绘制
        _this.isDebug = false;
        //物理世界转换系数
        _this.factor = 50;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_addBasicBody.prototype.onAdded2stage = function (e) {
        this.createGameScene();
    };
    /**
    * 创建游戏场景
    */
    Examples_addBasicBody.prototype.createGameScene = function () {
        //创建world
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        //创建plane
        var planeShape = new p2.Plane();
        var planeBody = new p2.Body();
        planeBody.type = p2.Body.STATIC;
        planeBody.addShape(planeShape);
        planeBody.displays = [];
        this.world.addBody(planeBody);
        egret.Ticker.getInstance().register(this.p2RunStep, this);
        //鼠标点击添加刚体
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
    };
    /**
     * p2 physics run step
     */
    Examples_addBasicBody.prototype.p2RunStep = function (dt) {
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
        this.world.step(dt / 1000); //p2.World.step
        var stageHeight = egret.MainContext.instance.stage.stageHeight; //显示世界 stageHeight
        var l = this.world.bodies.length;
        for (var i = 0; i < l; i++) {
            var boxBody = this.world.bodies[i];
            if (boxBody.displays && boxBody.displays[0]) {
                var box = boxBody.displays[0];
                box.x = boxBody.position[0] * this.factor; //把物理世界的位置转换到显示世界的位置，赋值
                box.y = stageHeight - boxBody.position[1] * this.factor; //把物理世界的位置转换到显示世界的位置，赋值
                box.rotation = 360 - boxBody.angle * 180 / Math.PI; //把物理世界刚体角度转换为显示世界角度，赋值
                if (boxBody.sleepState == p2.Body.SLEEPING) {
                    box.alpha = 0.5;
                }
                else {
                    box.alpha = 1;
                }
            }
        }
    };
    /**
     * 点击鼠标，添加一个刚体
     */
    Examples_addBasicBody.prototype.addOneBox = function (e) {
        //在物理世界中的位置
        var positionX = Math.floor(e.stageX / this.factor); //显示位置变换到物理世界位置
        var positionY = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / this.factor); //显示位置变换到物理世界位置
        var display;
        var tarBody;
        if (Math.random() > 0.5) {
            //添加方形刚体
            //var boxShape: p2.Shape = new p2.Rectangle(2, 1);
            var boxShape = new p2.Box({ width: 2, height: 1 });
            tarBody = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
            tarBody.addShape(boxShape); //给刚体添加p2.Shape
            this.world.addBody(tarBody);
            if (this.isDebug) {
                display = this.createBox(boxShape.width * this.factor, boxShape.height * this.factor);
            }
            else {
                display = this.createBitmapByName("rect");
            }
            //把物理世界的尺寸换算到显示世界尺寸,并赋值给绑定的显示对象
            display.width = boxShape.width * this.factor;
            display.height = boxShape.height * this.factor;
        }
        else {
            //添加圆形刚体
            var circleShape = new p2.Circle({ radius: 1 });
            tarBody = new p2.Body({ mass: 1, position: [positionX, positionY] });
            tarBody.addShape(circleShape); //rigidBody.addShape
            this.world.addBody(tarBody); //add to p2World
            if (this.isDebug) {
                display = this.createBall(circleShape.radius * this.factor);
            }
            else {
                display = this.createBitmapByName("circle");
            }
            //把物理世界的尺寸换算到显示世界尺寸,并赋值给绑定的显示对象
            display.width = circleShape.radius * 2 * this.factor;
            display.height = circleShape.radius * 2 * this.factor;
        }
        //将显示对象的锚点移到中心位置
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        //绑定刚体和显示皮肤
        tarBody.displays = [display];
        this.addChild(display); //把皮肤添加到显示世界
    };
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    */
    Examples_addBasicBody.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
    * 创建一个圆形
    */
    Examples_addBasicBody.prototype.createBall = function (r) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawCircle(r, r, r);
        shape.graphics.endFill();
        return shape;
    };
    /**
    * 创建一个方形
    */
    Examples_addBasicBody.prototype.createBox = function (width, height) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawRect(0, 0, width, height);
        shape.graphics.endFill();
        return shape;
    };
    return Examples_addBasicBody;
}(egret.DisplayObjectContainer));
__reflect(Examples_addBasicBody.prototype, "Examples_addBasicBody");
//# sourceMappingURL=Examples_addBasicBody.js.map