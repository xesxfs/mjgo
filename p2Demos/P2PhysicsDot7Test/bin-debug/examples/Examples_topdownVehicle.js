var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * topdown vehicle
 *
 * 结论 p2.TopDownVehicle 缺少api  setSideFriction
 *      p2.WheelConstraint 缺少api setBrakeForce
 * @author
 *
 */
var Examples_topdownVehicle = (function (_super) {
    __extends(Examples_topdownVehicle, _super);
    function Examples_topdownVehicle() {
        var _this = _super.call(this) || this;
        _this.maxSteer = Math.PI / 5;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_topdownVehicle.prototype.onAdded2stage = function (e) {
        jbP2.KeyManager.init();
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.gravity = [0, 0]; //set 0 gravity
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall    
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 0, 800, 40, 0, p2.Body.STATIC); //top static
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 480, 800, 40, 0, p2.Body.STATIC); //bottom static
        this.chassis = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 100, 40, 100, 0, p2.Body.DYNAMIC); //chassis body
        // Create the vehicle
        this.p2Vehicle = new p2.TopDownVehicle(this.chassis);
        // Add one front wheel and one back wheel - we don't actually need four :)
        this.frontWheel = this.p2Vehicle.addWheel({
            localPosition: [0, 0.5] // front
        });
        this.frontWheel["setSideFriction"](4); //p2含有的api，Egret没添加
        // Back wheel
        this.backWheel = this.p2Vehicle.addWheel({
            localPosition: [0, -0.5] // back
        });
        this.backWheel["setSideFriction"](3); // Less side friction on back wheel makes it easier to drift
        this.p2Vehicle.addToWorld(this.scene.world);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onef, this);
    };
    Examples_topdownVehicle.prototype.onef = function (e) {
        this.updateKeyCtrl();
    };
    Examples_topdownVehicle.prototype.updateKeyCtrl = function () {
        // Steer value zero means straight forward. Positive is left and negative right.
        var steerValue = 0;
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            steerValue = 1;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            steerValue = -1;
        }
        else {
            steerValue = 0;
        }
        this.frontWheel.steerValue = this.maxSteer * steerValue;
        // Engine force forward
        var engineForce = 0;
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.UP)) {
            engineForce = 1;
        }
        else {
            engineForce = 0;
        }
        this.backWheel.engineForce = engineForce * 7;
        this.backWheel["setBrakeForce"](0);
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.DOWN)) {
            if (this.backWheel.getSpeed() > 0.1) {
                // Moving forward - add some brake force to slow down
                this.backWheel["setBrakeForce"](5);
            }
            else {
                // Moving backwards - reverse the engine force
                this.backWheel["setBrakeForce"](0);
                this.backWheel.engineForce = -2;
            }
        }
    };
    return Examples_topdownVehicle;
}(egret.Sprite));
__reflect(Examples_topdownVehicle.prototype, "Examples_topdownVehicle");
//# sourceMappingURL=Examples_topdownVehicle.js.map