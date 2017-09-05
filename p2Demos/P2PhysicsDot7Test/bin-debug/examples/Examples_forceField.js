var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * ForceField测试
 * @author
 *
 */
var Examples_forceField = (function (_super) {
    __extends(Examples_forceField, _super);
    function Examples_forceField() {
        var _this = _super.call(this) || this;
        _this.wheelAnglarForceDefault = 15;
        _this.forceOn = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_forceField.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.defaultContactMaterial.friction = 10;
        //var mouseJt = new P2MouseJointHelper(this.stage,this.scene.dispCtn,this.scene.world,false);
        jbP2.KeyManager.init();
        this.setupScene3();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEff, this);
    };
    Examples_forceField.prototype.onEff = function (e) {
        this.updateKeyCtrl();
        if (this.forceOn) {
            this.wheel.applyForce([20, 0], [0, 0]);
        }
    };
    Examples_forceField.prototype.setupScene3 = function () {
        this.wheelMtl = new p2.Material(1000);
        this.groundMtl = new p2.Material(1001);
        this.iceMtl = new p2.Material(1002);
        this.wheel = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 400, 100, 25, 0, p2.Body.DYNAMIC); //box1
        this.wheel.shapes[0].material = this.wheelMtl;
        this.wheel.allowSleep = false;
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        this.bottomGround = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //bottom wall
        this.bottomGround.shapes[0].material = this.groundMtl;
        this.forceField = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 300, 300, 200, 50, 0, p2.Body.KINEMATIC); //
        this.forceField.shapes[0].sensor = true; //注意如果为sensor，则刚体类型需为kinematic或者dynamic
        var cmtlToGround = new p2.ContactMaterial(this.wheelMtl, this.groundMtl, { restitution: 0.0, friction: 10 });
        this.scene.world.addContactMaterial(cmtlToGround);
        var ice = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 375, 150, 20, -18, p2.Body.STATIC); //ice
        ice.shapes[0].material = this.iceMtl;
        var cmtlToIce = new p2.ContactMaterial(this.wheelMtl, this.iceMtl, { restitution: 0.0, friction: 0.1 });
        this.scene.world.addContactMaterial(cmtlToIce);
        this.scene.world.on("beginContact", this.onBeginContact, this); //
        this.scene.world.on("endContact", this.onEndContact, this); //
    };
    Examples_forceField.prototype.onBeginContact = function (event) {
        var bodyA = event.bodyA;
        var bodyB = event.bodyB;
        if (bodyA.id == this.forceField.id || bodyB.id == this.forceField.id) {
            console.log("on forceField sensor onBeginContact bodyA.id:" + bodyA.id + ",bodyB.id:" + bodyB.id);
            this.forceOn = true;
        }
    };
    Examples_forceField.prototype.onEndContact = function (event) {
        var bodyA = event.bodyA;
        var bodyB = event.bodyB;
        if (bodyA.id == this.forceField.id || bodyB.id == this.forceField.id) {
            console.log("on forceField sensor EndContact bodyA.id:" + bodyA.id + ",bodyB.id:" + bodyB.id);
            this.forceOn = false;
        }
    };
    Examples_forceField.prototype.updateKeyCtrl = function () {
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            this.wheel.angularForce = this.wheelAnglarForceDefault;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            this.wheel.angularForce = -this.wheelAnglarForceDefault;
        }
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.UP) && jbP2.P2Space.checkIfCanJump(this.scene.world, this.wheel)) {
            this.wheel.applyForce([0, 400], [0, 0]);
        }
    };
    return Examples_forceField;
}(egret.Sprite));
__reflect(Examples_forceField.prototype, "Examples_forceField");
//# sourceMappingURL=Examples_forceField.js.map