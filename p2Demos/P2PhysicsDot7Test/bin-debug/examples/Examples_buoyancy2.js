var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试修改水面的高度
 * 结论是：可以工作
 * @author
 *
 */
var Examples_buoyancy2 = (function (_super) {
    __extends(Examples_buoyancy2, _super);
    function Examples_buoyancy2() {
        var _this = _super.call(this) || this;
        //[jbP2.P2Space.convertEgretValueToP2(0),jbP2.P2Space.convertEgretY_To_P2Y(480)]; 和 [0,0]是一样的
        _this.waterSurfacePos = [0, 4]; //注意第二个元素不能改成>0,会造成效果错误，看来和下面的计算有关系
        _this.shapePosition = [0, 0];
        _this.centerOfBouyancy = [0, 0];
        _this.liftForce = [0, 0];
        _this.viscousForce = [0, 0];
        _this.shapeAngle = 0;
        _this.k = 100; // up force per submerged "volume"
        _this.c = 0.8; // viscosity
        _this.v = [0, 0];
        _this.aabb = new p2.AABB();
        _this.waterRect = new egret.Rectangle();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_buoyancy2.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        this.buoyancyBodies = new Array();
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall                 
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 480, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 100, 50, 50, 0, p2.Body.DYNAMIC); //box1
        tembody.allowSleep = false;
        this.buoyancyBodies.push(tembody);
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 100, 100, 30, 0, p2.Body.DYNAMIC); //ball1
        tembody.allowSleep = false;
        this.buoyancyBodies.push(tembody);
        this.waterRect.left = 4; //定义水面左边界
        this.waterRect.width = 8; //定义水面宽度
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 200, 380, 10, 200, 0, p2.Body.STATIC); //pool left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 600, 380, 10, 200, 0, p2.Body.STATIC); //pool right wall 
        this.scene.world.on("postStep", this.onP2PostStep, this);
    };
    Examples_buoyancy2.prototype.onP2PostStep = function () {
        //console.log("onP2PostStep");
        for (var i = 0; i < this.buoyancyBodies.length; i++) {
            this.applyAABBBuoyancyForces(this.buoyancyBodies[i], this.waterSurfacePos, this.k, this.c);
        }
    };
    Examples_buoyancy2.prototype.applyAABBBuoyancyForces = function (body, planePosition, k, c) {
        if (body == null || body.shapes == null) {
            return;
        }
        for (var i = 0; i < body.shapes.length; i++) {
            var shape = body.shapes[i];
            // Get shape world transform
            //body.vectorToWorldFrame(this.shapePosition,shape.position);//转换到世界坐标系中相对位置body向量，不是相对世界0,0的向量
            //p2.vec2.add(this.shapePosition,this.shapePosition,body.position);//在body位置位移上个向量，则求出shapePosition
            body.toWorldFrame(this.shapePosition, shape.position); //直接使用toWorldFrame转换为世界坐标系中相对(0,0)点坐标，与上两行功能一样
            this.shapeAngle = shape.angle + body.angle;
            // Get shape AABB
            shape.computeAABB(this.aabb, this.shapePosition, this.shapeAngle);
            if (this.aabb.upperBound[0] > this.waterRect.right || this.aabb.lowerBound[0] < this.waterRect.left) {
                continue;
            }
            var areaUnderWater; //shape被淹没到水线下的部分的面积
            if (this.aabb.upperBound[1] < planePosition[1]) {
                // Fully submerged 全部淹没
                p2.vec2.copy(this.centerOfBouyancy, this.shapePosition); //使用shapePosition作为浮力中心
                areaUnderWater = shape.area; //直接使用shape面积
            }
            else if (this.aabb.lowerBound[1] < planePosition[1]) {
                // Partially submerged 部分淹没
                var width = this.aabb.upperBound[0] - this.aabb.lowerBound[0];
                //var height = 0 - this.aabb.lowerBound[1];//这个0是写死的水面位置
                var height = this.waterSurfacePos[1] - this.aabb.lowerBound[1]; //使用水面位置和aabb计算，不像上一行是写死的0
                areaUnderWater = width * height; //使用计算出来的淹没区域aabb一部分的面积
                p2.vec2.set(this.centerOfBouyancy, this.aabb.lowerBound[0] + width / 2, this.aabb.lowerBound[1] + height / 2); //使用计算出来的那部分aabb的中心作为浮力中心
            }
            else {
                continue;
            }
            // Compute lift force
            p2.vec2.subtract(this.liftForce, planePosition, this.centerOfBouyancy);
            p2.vec2.scale(this.liftForce, this.liftForce, areaUnderWater * k);
            this.liftForce[0] = 0; //手动修改浮力水平分量＝0，只保留垂直分量
            // Make center of bouycancy relative to the body
            p2.vec2.subtract(this.centerOfBouyancy, this.centerOfBouyancy, body.position);
            // Viscous force 液体粘稠力
            body.getVelocityAtPoint(this.v, this.centerOfBouyancy);
            p2.vec2.scale(this.viscousForce, this.v, -c);
            // Apply forces
            body.applyForce(this.viscousForce, this.centerOfBouyancy);
            body.applyForce(this.liftForce, this.centerOfBouyancy);
        }
    };
    return Examples_buoyancy2;
}(egret.Sprite));
__reflect(Examples_buoyancy2.prototype, "Examples_buoyancy2");
//# sourceMappingURL=Examples_buoyancy2.js.map