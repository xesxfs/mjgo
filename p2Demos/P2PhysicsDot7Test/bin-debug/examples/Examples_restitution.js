var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试刚体反弹
 * @author
 *
 */
var Examples_restitution = (function (_super) {
    __extends(Examples_restitution, _super);
    function Examples_restitution() {
        var _this = _super.call(this) || this;
        //物理世界转换系数
        _this.factor = 50;
        _this.wheelAnglarForceDefault = 15;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_restitution.prototype.onAdded2stage = function (e) {
        this.setup();
    };
    //setup
    Examples_restitution.prototype.setup = function () {
        this.dispCtn = new egret.Sprite();
        this.addChild(this.dispCtn);
        //初始化P2Space
        this.worldRect = new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        //创建world
        this.world = new p2.World();
        //set p2.world.sleepMode
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        egret.Ticker.getInstance().register(this.p2RunStep, this); //register update step of p2.wolrd 
        //p2 scene setup----------------------
        this.createSceneObjs();
        jbP2.KeyManager.init();
    };
    /**
    * 创建场景物体
    */
    Examples_restitution.prototype.createSceneObjs = function () {
        //        var wheelMtl: p2.Material = new p2.Material(100);
        //        var groundMtl: p2.Material = new p2.Material(101);
        this.box1 = this.addOneBall(this.world, this.dispCtn, 400, 100, 25, 0, p2.Body.DYNAMIC); //box1
        this.box1.shapes[0].material = new p2.Material(1000);
        this.box1.allowSleep = false;
        this.addOneBox(this.world, this.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        this.addOneBox(this.world, this.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        this.bottomGround = this.addOneBox(this.world, this.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //bottom wall
        this.bottomGround.shapes[0].material = new p2.Material(1001);
        var mtl1 = this.bottomGround.shapes[0].material;
        var mtl2 = this.box1.shapes[0].material;
        var cmtl = new p2.ContactMaterial(mtl1, mtl2, { restitution: 1.0, friction: 10 });
        this.world.addContactMaterial(cmtl);
    };
    //update step
    Examples_restitution.prototype.p2RunStep = function (dt) {
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
        this.world.step(dt / 1000); //p2.World.step                                 
        this.updateWorldBodiesSkin(this.world); //更新p2World内所有刚体皮肤显示
        this.updateKeyCtrl();
    };
    Examples_restitution.prototype.updateKeyCtrl = function () {
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            this.box1.angularForce = this.wheelAnglarForceDefault;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            this.box1.angularForce = -this.wheelAnglarForceDefault;
        }
    };
    /**
    * 更新p2.World里面所有刚体的皮肤
    */
    Examples_restitution.prototype.updateWorldBodiesSkin = function (p2World) {
        var stageHeight = egret.MainContext.instance.stage.stageHeight; //显示世界 stageHeight
        var len = p2World.bodies.length;
        for (var i = 0; i < len; i++) {
            var temBody = p2World.bodies[i];
            this.updateBodySkin(temBody);
            var dispSkin = temBody.displays[0];
            if (dispSkin) {
                if (temBody.sleepState == p2.Body.SLEEPING) {
                    dispSkin.alpha = 0.5;
                }
                else {
                    dispSkin.alpha = 1;
                }
            } //endif
        } //end for
    };
    /**
    * 更新目标刚体的皮肤
    */
    Examples_restitution.prototype.updateBodySkin = function (body) {
        var skinDisp = body.displays[0];
        if (skinDisp) {
            skinDisp.x = this.convertP2ValueToEgret(body.position[0]); //把物理世界的位置转换到显示世界的位置，赋值
            skinDisp.y = this.convertP2Y_To_EgretY(body.position[1]); //把物理世界的位置转换到显示世界的位置，赋值
            skinDisp.rotation = this.convertP2BodyAngleToEgret(body); //把物理世界刚体角度转换为显示世界角度，赋值
        }
    };
    /**
    * 获得p2Body的egret显示旋转角度
    */
    Examples_restitution.prototype.convertP2BodyAngleToEgret = function (body) {
        var result;
        result = 360 - body.angle * 180 / Math.PI;
        return result;
    };
    /**
    * 把egret角度转换为p2角度
    */
    Examples_restitution.prototype.convertEgretAngleToP2 = function (angle) {
        var result;
        result = (360 - angle) * Math.PI / 180;
        return result;
    };
    /**
    * 物理世界的长度标量到显示世界的转换
    * 适合如 x,width,height的转换，y值不适合
    */
    Examples_restitution.prototype.convertP2ValueToEgret = function (value) {
        return value * this.factor;
    };
    /**
    * 显示世界物理世界的长度标量到物理世界的转换
    * 适合如 x,width,height的转换，y值不适合
    */
    Examples_restitution.prototype.convertEgretValueToP2 = function (value) {
        return value / this.factor;
    };
    /**
    * 把egretY值转换到p2Y值，仅适合y转换
    */
    Examples_restitution.prototype.convertEgretY_To_P2Y = function (egretY) {
        return (this.worldRect.height - egretY) / this.factor;
    };
    /**
    * 把p2y值转换到egretY值，仅适合y转换
    */
    Examples_restitution.prototype.convertP2Y_To_EgretY = function (p2Y) {
        return this.worldRect.height - p2Y * this.factor;
    };
    /**
    * 在物理世界创建一个矩形刚体，显示cube矢量图形
    */
    Examples_restitution.prototype.addOneBox = function (p2World, ctn, px, py, pw, ph, pAngle, type) {
        //在物理世界中的位置
        var p2x = this.convertEgretValueToP2(px); //显示位置变换到物理世界位置
        var p2y = this.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
        var p2Wid = this.convertEgretValueToP2(pw);
        var p2Hei = this.convertEgretValueToP2(ph);
        var p2Angle = this.convertEgretAngleToP2(pAngle);
        var display;
        var bodyShape = new p2.Box({ width: p2Wid, height: p2Hei }); //new p2.Rectangle(p2Wid, p2Hei);
        var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
        body.type = type;
        body.addShape(bodyShape); //给刚体添加p2.Shape
        p2World.addBody(body);
        display = this.createBoxSkin(pw, ph);
        //绑定刚体和显示皮肤
        body.displays = [display];
        ctn.addChild(display); //把皮肤添加到显示世界
        return body;
    };
    /**
    * 创建一个方形皮肤
    * 返回的图形锚点位于图形中心
    */
    Examples_restitution.prototype.createBoxSkin = function (width, height) {
        console.log("createBoxSkin " + width + "," + height);
        var shape = new egret.Shape();
        shape.graphics.lineStyle(1, 0);
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawRect(0, 0, width, height);
        shape.graphics.endFill();
        //将显示对象的锚点移到中心位置
        shape.anchorOffsetX = shape.width / 2;
        shape.anchorOffsetY = shape.height / 2;
        return shape;
    };
    Examples_restitution.prototype.addOneBall = function (p2World, ctn, px, py, pr, pAngle, type) {
        //在物理世界中的位置
        var p2x = this.convertEgretValueToP2(px); //显示位置变换到物理世界位置
        var p2y = this.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
        var p2R = this.convertEgretValueToP2(pr);
        var p2Angle = this.convertEgretAngleToP2(pAngle);
        var display;
        var bodyShape = new p2.Circle({ radius: p2R });
        var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
        body.type = type;
        body.addShape(bodyShape); //给刚体添加p2.Shape
        p2World.addBody(body);
        display = this.createBallSkin(pr);
        //绑定刚体和显示皮肤
        body.displays = [display];
        ctn.addChild(display); //把皮肤添加到显示世界
        return body;
    };
    Examples_restitution.prototype.createBallSkin = function (r) {
        var shape = new egret.Shape();
        shape.graphics.lineStyle(1, 0);
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawCircle(r, r, r);
        shape.graphics.moveTo(r, r);
        shape.graphics.lineTo(2 * r, r);
        shape.graphics.endFill();
        //将显示对象的锚点移到中心位置
        shape.anchorOffsetX = shape.width / 2;
        shape.anchorOffsetY = shape.height / 2;
        return shape;
    };
    return Examples_restitution;
}(egret.Sprite));
__reflect(Examples_restitution.prototype, "Examples_restitution");
//# sourceMappingURL=Examples_restitution.js.map