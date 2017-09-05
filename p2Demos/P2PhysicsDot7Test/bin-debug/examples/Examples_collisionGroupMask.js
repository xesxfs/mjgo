var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试CollisionGroup and CollisionMask
 * @author
 * wheelMask 和this.Group_ground | this.Group_other | this.Group_wheel碰撞
 * chassisMask 和this.Group_ground | this.Group_other碰撞
 * defaultCollisionMask 和this.Group_ground | this.Group_other | this.Group_wheel | this.Group_chassis碰撞
 */
var Examples_collisionGroupMask = (function (_super) {
    __extends(Examples_collisionGroupMask, _super);
    function Examples_collisionGroupMask() {
        var _this = _super.call(this) || this;
        _this.Group_ground = 1; //ground
        _this.Group_wheel = 2; //wheel
        _this.Group_chassis = 4; //chassis
        _this.Group_other = 8; //other
        _this.wheelAnglarForceDefault = 15;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_collisionGroupMask.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.defaultContactMaterial.friction = 10;
        var mouseJt = new MouseJointHelper(this.stage, this.scene.dispCtn, this.scene.world, false);
        jbP2.KeyManager.init();
        this.setupScene();
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this); //
    };
    //works
    Examples_collisionGroupMask.prototype.setupScene = function () {
        var wheelMask = this.Group_ground | this.Group_other | this.Group_wheel;
        var chassisMask = this.Group_ground | this.Group_other;
        var defaultCollisionMask = this.Group_ground | this.Group_other | this.Group_wheel | this.Group_chassis;
        this.wheel = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 400, 100, 25, 0, p2.Body.DYNAMIC); //box1
        this.wheel.shapes[0].material = new p2.Material(1000);
        this.wheel.allowSleep = false;
        this.wheel.shapes[0].collisionGroup = this.Group_wheel;
        this.wheel.shapes[0].collisionMask = wheelMask;
        //另外一个轮子，用来测试轮子之间是否碰撞
        var temWheel = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 600, 100, 25, 0, p2.Body.DYNAMIC);
        temWheel.shapes[0].material = new p2.Material(1000);
        temWheel.allowSleep = false;
        temWheel.shapes[0].collisionGroup = this.Group_wheel;
        temWheel.shapes[0].collisionMask = wheelMask;
        var wall;
        wall = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 40, 480, 0, p2.Body.STATIC); //left wall
        wall.shapes[0].collisionGroup = this.Group_ground;
        wall.shapes[0].collisionMask = defaultCollisionMask;
        wall = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 40, 480, 0, p2.Body.STATIC); //right wall
        wall.shapes[0].collisionGroup = this.Group_ground;
        wall.shapes[0].collisionMask = defaultCollisionMask;
        wall = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 40, 0, p2.Body.STATIC); //bottom wall
        wall.shapes[0].collisionGroup = this.Group_ground;
        wall.shapes[0].collisionMask = defaultCollisionMask;
        var chassis = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 500, 240, 80, 40, 0, p2.Body.DYNAMIC); //chassis
        chassis.shapes[0].collisionGroup = this.Group_chassis;
        chassis.shapes[0].collisionMask = chassisMask;
        var temBox;
        temBox = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 100, 240, 40, 40, 0, p2.Body.DYNAMIC); //other
        temBox.shapes[0].collisionGroup = this.Group_other;
        temBox.shapes[0].collisionMask = defaultCollisionMask;
        temBox = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 150, 240, 40, 40, 0, p2.Body.DYNAMIC); //other
        temBox.shapes[0].collisionGroup = this.Group_other;
        temBox.shapes[0].collisionMask = defaultCollisionMask;
    };
    Examples_collisionGroupMask.prototype.updateKeyCtrl = function () {
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            this.wheel.angularForce = this.wheelAnglarForceDefault;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            this.wheel.angularForce = -this.wheelAnglarForceDefault;
        }
    };
    return Examples_collisionGroupMask;
}(egret.Sprite));
__reflect(Examples_collisionGroupMask.prototype, "Examples_collisionGroupMask");
//# sourceMappingURL=Examples_collisionGroupMask.js.map