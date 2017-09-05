var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * p2物理引擎工具类
 */
var jbP2;
(function (jbP2) {
    var P2Space = (function () {
        function P2Space() {
        }
        P2Space.checkIfCanJump = function (world, body) {
            var result = false;
            for (var i = 0; i < world.narrowphase.contactEquations.length; i++) {
                var c = world.narrowphase.contactEquations[i];
                if (c.bodyA === body || c.bodyB === body) {
                    var d = p2.vec2.dot(c.normalA, this.yAxis); // Normal dot Y-axis
                    if (c.bodyA === body)
                        d *= -1;
                    if (d > 0.5)
                        result = true;
                }
            }
            return result;
        };
        /**
         * 更新刚体的皮肤显示
         */
        P2Space.updateBodySkin = function (body) {
            if (body.displays == null || body.displays.length == 0) {
                return;
            }
            for (var i = 0; i < body.displays.length; i++) {
                var skinDisp = body.displays[i];
                if (skinDisp) {
                    //使用shape数据来更新皮肤-------------------------------------------------------------------------------------------
                    var skinWorldPos = [0, 0]; //shapeSkin在p2World中的坐标
                    body.toWorldFrame(skinWorldPos, body.shapes[i].position); //从Body局部转世界
                    skinDisp.x = this.convertP2ValueToEgret(skinWorldPos[0]); //转化为egret坐标，赋给skin
                    skinDisp.y = this.convertP2Y_To_EgretY(skinWorldPos[1]); //转化为egret坐标，赋给skin
                    skinDisp.rotation = 360 - (body.angle + body.shapes[i].angle) * 180 / Math.PI; //
                }
            }
        };
        /**
         * 物理世界的长度标量到显示世界的转换
         * 适合如 x,width,height的转换，y值不适合
         */
        P2Space.convertP2ValueToEgret = function (value) {
            return value * this.factor;
        };
        /**
         * 显示世界物理世界的长度标量到物理世界的转换
         * 适合如 x,width,height的转换，y值不适合
         */
        P2Space.convertEgretValueToP2 = function (value) {
            return value / this.factor;
        };
        /**
         * 把egretY值转换到p2Y值，仅适合y转换
         */
        P2Space.convertEgretY_To_P2Y = function (egretY) {
            return (this.worldRect.height - egretY) / this.factor;
        };
        /**
         * 把p2y值转换到egretY值，仅适合y转换
         */
        P2Space.convertP2Y_To_EgretY = function (p2Y) {
            return this.worldRect.height - p2Y * this.factor;
        };
        /**
         * 把给定egret坐标转换为p2坐标
         */
        P2Space.convertEgretPosToP2 = function (xEgret, yEgret) {
            return [xEgret / this.factor, (this.worldRect.height - yEgret) / this.factor];
        };
        /**
         * 获得p2Body的egret显示坐标
         */
        P2Space.convertBodyPosToEgret = function (body) {
            var xP2 = body.position[0];
            var yP2 = body.position[1];
            return [xP2 * this.factor, this.worldRect.height - yP2 * this.factor];
        };
        /**
         * 获得p2Body的egret显示旋转角度
         */
        P2Space.convertP2BodyAngleToEgret = function (body) {
            var result;
            result = 360 - body.angle * 180 / Math.PI;
            return result;
        };
        /**
         * 把egret deg角度转换为p2 rad角度
         */
        P2Space.convertEgretAngleToP2 = function (angle) {
            var result;
            result = (360 - angle) * Math.PI / 180;
            return result;
        };
        /**
         * 初始化
         */
        P2Space.initSpace = function (factor, rectWorld) {
            this.factor = factor;
            this.worldRect = rectWorld;
        };
        /**
         * 在物理世界创建一个矩形刚体，显示cube矢量图形
         */
        P2Space.addOneBox = function (p2World, ctn, px, py, pw, ph, pAngle, type) {
            //在物理世界中的位置
            var p2x = jbP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
            var p2y = jbP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
            var p2Wid = jbP2.P2Space.convertEgretValueToP2(pw);
            var p2Hei = jbP2.P2Space.convertEgretValueToP2(ph);
            var p2Angle = jbP2.P2Space.convertEgretAngleToP2(pAngle);
            var display;
            var bodyShape = new p2.Box({ width: p2Wid, height: p2Hei }); //new p2.Rectangle(p2Wid, p2Hei);
            var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
            body.type = type;
            body.addShape(bodyShape); //给刚体添加p2.Shape
            p2World.addBody(body);
            display = jbP2.DispUtil.createBox(pw, ph);
            //绑定刚体和显示皮肤
            body.displays = [display];
            ctn.addChild(display); //把皮肤添加到显示世界
            return body;
        };
        /**
         * 在物理世界创建一个capsule刚体，显示capsule矢量图形
         * @param p2World
         * @param ctn
         * @param px
         * @param py
         * @param pw
         * @param ph
         * @param pAngle
         * @param type
         */
        P2Space.addOneCapsule = function (p2World, ctn, px, py, pLen, pRadius, pAngle, type) {
            //在物理世界中的位置
            var p2x = jbP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
            var p2y = jbP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
            var p2Len = jbP2.P2Space.convertEgretValueToP2(pLen);
            var p2Radius = jbP2.P2Space.convertEgretValueToP2(pRadius);
            var p2Angle = jbP2.P2Space.convertEgretAngleToP2(pAngle);
            var display;
            var bodyShape = new p2.Capsule({ length: p2Len, radius: p2Radius }); //new p2.Box({ width: p2Wid,height: p2Hei }); 
            var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
            body.type = type;
            body.addShape(bodyShape); //给刚体添加p2.Shape
            p2World.addBody(body);
            display = jbP2.DispUtil.createCapsule(pLen, pRadius);
            //绑定刚体和显示皮肤
            body.displays = [display];
            ctn.addChild(display); //把皮肤添加到显示世界
            return body;
        };
        /**
        * 在物理世界创建一个圆形刚体，显示circle矢量图形
        */
        P2Space.addOneBall = function (p2World, ctn, px, py, pr, pAngle, type) {
            //在物理世界中的位置
            var p2x = jbP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
            var p2y = jbP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
            var p2R = jbP2.P2Space.convertEgretValueToP2(pr);
            var p2Angle = jbP2.P2Space.convertEgretAngleToP2(pAngle);
            var display;
            var bodyShape = new p2.Circle({ radius: p2R }); //new p2.Circle(p2R)
            var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
            body.type = type;
            body.addShape(bodyShape); //给刚体添加p2.Shape
            p2World.addBody(body);
            display = jbP2.DispUtil.createBall(pr);
            //绑定刚体和显示皮肤
            body.displays = [display];
            ctn.addChild(display); //把皮肤添加到显示世界            
            return body;
        };
        /**
         * 更新p2World的刚体皮肤显示
         */
        P2Space.updateWorldBodiesSkin = function (p2World) {
            var stageHeight = egret.MainContext.instance.stage.stageHeight; //显示世界 stageHeight
            var len = p2World.bodies.length;
            for (var i = 0; i < len; i++) {
                var temBody = p2World.bodies[i];
                jbP2.P2Space.updateBodySkin(temBody);
                if (temBody.displays == null || temBody.displays.length == 0) {
                    continue;
                }
                for (var j = 0; j < temBody.displays.length; j++) {
                    var dispSkin = temBody.displays[j];
                    if (temBody.sleepState == p2.Body.SLEEPING) {
                        dispSkin.alpha = 0.5;
                    }
                    else {
                        dispSkin.alpha = 1;
                    }
                } //end for
            } //end for
        };
        return P2Space;
    }());
    P2Space.yAxis = p2.vec2.fromValues(0, 1); //p2 y轴
    jbP2.P2Space = P2Space;
    __reflect(P2Space.prototype, "jbP2.P2Space");
})(jbP2 || (jbP2 = {}));
//# sourceMappingURL=P2SpaceUtil.js.map