var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * ray refraction
 * @author
 *
 */
var Examples_rayRefract = (function (_super) {
    __extends(Examples_rayRefract, _super);
    function Examples_rayRefract() {
        var _this = _super.call(this) || this;
        _this.start = [0, 0]; //rayStart
        _this.end = [0, 0]; //rayEnd
        _this.direction = [0, 0]; //rayDirection
        _this.result = new p2.RaycastResult(); //RaycastResult
        _this.hitPoint = p2.vec2.create(); //ray hitPoint
        _this.ray = new p2.Ray({
            mode: p2.Ray.CLOSEST
        });
        _this.vec2 = p2.vec2;
        _this.airIndex = 1;
        _this.shapeIndex = 1.5;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_rayRefract.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall                 
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 480, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 100, 100, 100, 0, p2.Body.DYNAMIC); //box1
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 250, 50, 40, 0, p2.Body.DYNAMIC); //ball1
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.createDebug();
    };
    Examples_rayRefract.prototype.loop = function () {
        this.debugDraw.drawDebug();
        this.drawRays();
    };
    Examples_rayRefract.prototype.drawRays = function () {
        var N = 1;
        for (var i = 0; i < N; i++) {
            this.ray.from[0] = 1;
            this.ray.from[1] = 2;
            var angle = .5 * Math.sin(this.scene.world.time * 1 - 1) - 0.005 * (i / N) * 10 + 0.1;
            this.ray.direction[0] = Math.cos(angle);
            this.ray.direction[1] = Math.sin(angle);
            this.ray.to[0] = this.ray.from[0] + this.ray.direction[0] * 100;
            this.ray.to[1] = this.ray.from[1] + this.ray.direction[1] * 100;
            this.ray.update();
            var hits = 0;
            while (this.scene.world.raycast(this.result, this.ray) && hits++ < 10) {
                this.result.getHitPoint(this.hitPoint, this.ray);
                this.debugDraw.drawRay(this.ray.from, this.hitPoint);
                //drawRayResult(result);
                // move start to the hit point
                p2.vec2.copy(this.ray.from, this.hitPoint);
                this.ray.update();
                //折射实现－－－－－－－－－－
                this.refract(this.ray.direction, this.ray.direction, this.result.normal, this.airIndex, this.shapeIndex);
                // move out a bit
                this.ray.from[0] += this.ray.direction[0] * 0.001;
                this.ray.from[1] += this.ray.direction[1] * 0.001;
                this.ray.to[0] = this.ray.from[0] + this.ray.direction[0] * 100;
                this.ray.to[1] = this.ray.from[1] + this.ray.direction[1] * 100;
                this.result.reset();
            }
            this.debugDraw.drawRay(this.ray.from, this.ray.to);
        }
    };
    Examples_rayRefract.prototype.refract = function (out, direction, normal, airIndex, shapeIndex) {
        var dot = p2.vec2.dot(normal, direction);
        var tangent = p2.vec2.fromValues(normal[0], normal[1]);
        p2.vec2.rotate(tangent, tangent, -Math.PI / 2);
        var outAngle;
        var inAngle;
        var side = p2.vec2.dot(tangent, direction);
        if (dot < 0) {
            // Into the material
            dot = p2.vec2.dot(normal, direction);
            inAngle = Math.acos(dot);
            p2.vec2.scale(normal, normal, -1);
            var a = airIndex / shapeIndex * Math.sin(inAngle);
            if (a <= 1) {
                outAngle = Math.asin(a);
                // Construct new refracted direction - just rotate the negative normal
                p2.vec2.rotate(out, normal, outAngle * (side < 0 ? -1 : 1));
            }
            else {
                p2.vec2.reflect(out, direction, normal);
            }
        }
        else {
            // Out of the material - flip the indices
            dot = p2.vec2.dot(normal, direction);
            inAngle = Math.acos(dot);
            var a = shapeIndex / airIndex * Math.sin(inAngle);
            if (a <= 1) {
                outAngle = Math.asin(a);
                // Construct new refracted direction - just rotate the negative normal
                p2.vec2.rotate(out, normal, outAngle * (side < 0 ? 1 : -1));
            }
            else {
                p2.vec2.reflect(out, direction, normal);
            }
        }
    };
    Examples_rayRefract.prototype.createDebug = function () {
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
    };
    return Examples_rayRefract;
}(egret.Sprite));
__reflect(Examples_rayRefract.prototype, "Examples_rayRefract");
//# sourceMappingURL=Examples_rayRefract.js.map