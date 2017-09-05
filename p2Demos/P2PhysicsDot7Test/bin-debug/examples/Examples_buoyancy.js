var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 * 结论：可以看到浮力工作，但是现在不能改变水面高度,改变就会造成错误效果
 */
var Examples_buoyancy = (function (_super) {
    __extends(Examples_buoyancy, _super);
    function Examples_buoyancy() {
        var _this = _super.call(this) || this;
        _this.shapePosition = [0, 0];
        _this.centerOfBouyancy = [0, 0];
        _this.liftForce = [0, 0];
        _this.viscousForce = [0, 0];
        _this.shapeAngle = 0;
        _this.k = 100; // up force per submerged "volume"
        _this.c = 0.8; // viscosity
        _this.v = [0, 0];
        _this.aabb = new p2.AABB();
        Examples_buoyancy.inst = _this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_buoyancy.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        this.bodies = new Array();
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 100, 50, 50, 0, p2.Body.DYNAMIC); //box1
        this.bodies.push(tembody);
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 100, 100, 30, 0, p2.Body.DYNAMIC); //ball1
        this.bodies.push(tembody);
        this.scene.world.on("postStep", this.onP2PostStep);
    };
    Examples_buoyancy.prototype.onP2PostStep = function () {
        //console.log("onP2PostStep");
        //[jbP2.P2Space.convertEgretValueToP2(0),jbP2.P2Space.convertEgretY_To_P2Y(480)]; 和 [0,0]是一样的
        var waterSurfacePos = [0, 0]; //注意第二个元素不能改成>0,会造成效果错误，看来和下面的计算有关系
        for (var i = 0; i < this.bodies.length; i++) {
            //注意这里闭包环境不在Example_buoyancy中
            Examples_buoyancy.inst.applyAABBBuoyancyForces(Examples_buoyancy.inst.bodies[i], waterSurfacePos, Examples_buoyancy.inst.k, Examples_buoyancy.inst.c);
        }
    };
    Examples_buoyancy.prototype.applyAABBBuoyancyForces = function (body, planePosition, k, c) {
        if (body == null || body.shapes == null) {
            return;
        }
        for (var i = 0; i < body.shapes.length; i++) {
            var shape = body.shapes[i];
            // Get shape world transform
            body.vectorToWorldFrame(this.shapePosition, shape.position);
            p2.vec2.add(this.shapePosition, this.shapePosition, body.position);
            this.shapeAngle = shape.angle + body.angle;
            // Get shape AABB
            shape.computeAABB(this.aabb, this.shapePosition, this.shapeAngle);
            var areaUnderWater;
            if (this.aabb.upperBound[1] < planePosition[1]) {
                // Fully submerged
                p2.vec2.copy(this.centerOfBouyancy, this.shapePosition);
                areaUnderWater = shape.area;
            }
            else if (this.aabb.lowerBound[1] < planePosition[1]) {
                // Partially submerged
                var width = this.aabb.upperBound[0] - this.aabb.lowerBound[0];
                var height = 0 - this.aabb.lowerBound[1];
                areaUnderWater = width * height;
                p2.vec2.set(this.centerOfBouyancy, this.aabb.lowerBound[0] + width / 2, this.aabb.lowerBound[1] + height / 2);
            }
            else {
                continue;
            }
            // Compute lift force
            p2.vec2.subtract(this.liftForce, planePosition, this.centerOfBouyancy);
            p2.vec2.scale(this.liftForce, this.liftForce, areaUnderWater * k);
            this.liftForce[0] = 0;
            // Make center of bouycancy relative to the body
            p2.vec2.subtract(this.centerOfBouyancy, this.centerOfBouyancy, body.position);
            // Viscous force
            body.getVelocityAtPoint(this.v, this.centerOfBouyancy);
            p2.vec2.scale(this.viscousForce, this.v, -c);
            // Apply forces
            body.applyForce(this.viscousForce, this.centerOfBouyancy);
            body.applyForce(this.liftForce, this.centerOfBouyancy);
        }
    };
    return Examples_buoyancy;
}(egret.Sprite));
__reflect(Examples_buoyancy.prototype, "Examples_buoyancy");
//# sourceMappingURL=Examples_buoyancy.js.map