var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试不同接触材质的摩擦力和弹力
 * @author
 *
 */
var Examples_frictions = (function (_super) {
    __extends(Examples_frictions, _super);
    function Examples_frictions() {
        var _this = _super.call(this) || this;
        _this.wheelAnglarForceDefault = 15;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_frictions.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.defaultContactMaterial.friction = 10;
        var mouseJt = new P2MouseJointHelper(this.stage, this.scene.dispCtn, this.scene.world, false);
        jbP2.KeyManager.init();
        this.setupScene3();
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this); //
    };
    //works
    Examples_frictions.prototype.setupScene0 = function () {
        this.wheel = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 400, 100, 25, 0, p2.Body.DYNAMIC); //box1
        this.wheel.shapes[0].material = new p2.Material(1000);
        this.wheel.allowSleep = false;
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        this.bottomGround = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //bottom wall
        this.bottomGround.shapes[0].material = new p2.Material(1001);
        var mtl1 = this.bottomGround.shapes[0].material;
        var mtl2 = this.wheel.shapes[0].material;
        var cmtl = new p2.ContactMaterial(mtl1, mtl2, { restitution: 0.0, friction: 10 });
        this.scene.world.addContactMaterial(cmtl);
    };
    //based on setupScene,建立公用材质
    Examples_frictions.prototype.setupScene1 = function () {
        var wheelMtl = new p2.Material(1000);
        var groundMtl = new p2.Material(1001);
        this.wheel = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 400, 100, 25, 0, p2.Body.DYNAMIC); //box1
        this.wheel.shapes[0].material = wheelMtl;
        this.wheel.allowSleep = false;
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        this.bottomGround = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //bottom wall
        this.bottomGround.shapes[0].material = groundMtl;
        var cmtl = new p2.ContactMaterial(wheelMtl, groundMtl, { restitution: 0.0, friction: 10 });
        this.scene.world.addContactMaterial(cmtl);
    };
    //based on setupScene1，将材质变成类成员
    Examples_frictions.prototype.setupScene2 = function () {
        this.wheelMtl = new p2.Material(1000);
        this.groundMtl = new p2.Material(1001);
        this.wheel = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 400, 100, 25, 0, p2.Body.DYNAMIC); //box1
        this.wheel.shapes[0].material = this.wheelMtl;
        this.wheel.allowSleep = false;
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        this.bottomGround = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //bottom wall
        this.bottomGround.shapes[0].material = this.groundMtl;
        var cmtl = new p2.ContactMaterial(this.wheelMtl, this.groundMtl, { restitution: 0.0, friction: 10 });
        this.scene.world.addContactMaterial(cmtl);
    };
    //based on setupScene2,增加不同材质
    Examples_frictions.prototype.setupScene3 = function () {
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
        var cmtlToGround = new p2.ContactMaterial(this.wheelMtl, this.groundMtl, { restitution: 0.0, friction: 10 });
        this.scene.world.addContactMaterial(cmtlToGround);
        var ice = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 375, 150, 20, -18, p2.Body.STATIC); //ice
        ice.shapes[0].material = this.iceMtl;
        var cmtlToIce = new p2.ContactMaterial(this.wheelMtl, this.iceMtl, { restitution: 0.0, friction: 0.1 });
        this.scene.world.addContactMaterial(cmtlToIce);
    };
    Examples_frictions.prototype.updateKeyCtrl = function () {
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            this.wheel.angularForce = this.wheelAnglarForceDefault;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            this.wheel.angularForce = -this.wheelAnglarForceDefault;
        }
    };
    return Examples_frictions;
}(egret.Sprite));
__reflect(Examples_frictions.prototype, "Examples_frictions");
//# sourceMappingURL=Examples_frictions.js.map