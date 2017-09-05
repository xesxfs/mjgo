var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 在Examples_frictions基础上测试轮子共享物理材质
 * 并且测试动态修改ContactMaterial的摩擦力
 * @author
 *
 */
var Examples_frictionsCar = (function (_super) {
    __extends(Examples_frictionsCar, _super);
    function Examples_frictionsCar() {
        var _this = _super.call(this) || this;
        _this.wheelAnglarForceDefault = 10;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_frictionsCar.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.defaultContactMaterial.friction = 10;
        var mouseJt = new MouseJointHelper(this.stage, this.scene.dispCtn, this.scene.world, false);
        jbP2.KeyManager.init();
        this.setupMtls();
        this.setupSceneObjs();
        this.setupVehicle();
        this.setupUI();
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this); //
    };
    Examples_frictionsCar.prototype.setupUI = function () {
        this.inputFric = jbP2.DispUtil.createTouchTf(10, 100, 100, 20, "1");
        this.inputFric.type = egret.TextFieldType.INPUT;
        this.inputFric.border = true;
        this.addChild(this.inputFric);
        var btnChange = jbP2.DispUtil.createTouchTf(10, 150, 100, 20, "changeFric");
        btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChange_click, this);
        this.addChild(btnChange);
    };
    Examples_frictionsCar.prototype.onBtnChange_click = function (e) {
        var fric = Number(this.inputFric.text);
        this.cmtl_wheelIce.friction = fric;
    };
    //初始化材质
    Examples_frictionsCar.prototype.setupMtls = function () {
        this.wheelMtl = new p2.Material(1000);
        this.groundMtl = new p2.Material(1001);
        this.iceMtl = new p2.Material(1002);
        this.cmtl_wheelGround = new p2.ContactMaterial(this.wheelMtl, this.groundMtl, { restitution: 0.0, friction: 100 });
        this.scene.world.addContactMaterial(this.cmtl_wheelGround);
        this.cmtl_wheelIce = new p2.ContactMaterial(this.wheelMtl, this.iceMtl, { restitution: 0.0, friction: 0.1 });
        this.scene.world.addContactMaterial(this.cmtl_wheelIce);
    };
    Examples_frictionsCar.prototype.setupVehicle = function () {
        var chassisX = 200; //chassis init x
        var chassisY = 200; //...y
        var chassisW = 80; //...width
        var chassisH = 40; //...height
        var wheelR = 20; //wheel radius
        var wheelFPos = new egret.Point(Math.floor(chassisX + chassisW * .5), Math.floor(chassisY + chassisH * .5)); //front wheel position
        var wheelBPos = new egret.Point(Math.floor(chassisX - chassisW * .5), Math.floor(chassisY + chassisH * .5)); //back wheel position
        var chassisBody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, chassisX, chassisY, chassisW, chassisH, 0, p2.Body.DYNAMIC); //chassis body
        var wheelFrontBody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, wheelFPos.x, wheelFPos.y, wheelR, 0, p2.Body.DYNAMIC); //wheel body
        var wheelBackBody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, wheelBPos.x, wheelBPos.y, wheelR, 0, p2.Body.DYNAMIC); //wheel body
        chassisBody.mass = 1;
        wheelFrontBody.shapes[0].material = this.wheelMtl;
        wheelBackBody.shapes[0].material = this.wheelMtl;
        var pvtJtF; //constraint for wheel and body. front
        var pvtJtB; //... back
        var p2PvtPointX; //物理世界的轮子位置x
        var p2PvtPointY; //物理世界的轮子位置y
        //setup constraint for wheelFront
        p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(wheelFPos.x);
        p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(wheelFPos.y);
        pvtJtF = new p2.RevoluteConstraint(wheelFrontBody, chassisBody, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtF.collideConnected = false;
        this.scene.world.addConstraint(pvtJtF);
        //setup constraint for wheelBack
        p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(wheelBPos.x);
        p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(wheelBPos.y);
        pvtJtB = new p2.RevoluteConstraint(wheelBackBody, chassisBody, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtB.collideConnected = false;
        this.scene.world.addConstraint(pvtJtB);
        this.chassis = chassisBody;
        this.wheelf = wheelFrontBody;
        this.wheelb = wheelBackBody;
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false;
    };
    Examples_frictionsCar.prototype.setupSceneObjs = function () {
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 50, 480, 0, p2.Body.STATIC); //left wall
        jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 50, 480, 0, p2.Body.STATIC); //right wall
        this.bottomGround = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //bottom wall
        this.bottomGround.shapes[0].material = this.groundMtl;
        this.iceCube = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 375, 150, 20, -18, p2.Body.STATIC); //ice
        this.iceCube.shapes[0].material = this.iceMtl;
    };
    Examples_frictionsCar.prototype.updateKeyCtrl = function () {
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            this.wheelf.angularForce = this.wheelAnglarForceDefault;
            this.wheelb.angularForce = this.wheelAnglarForceDefault;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            this.wheelf.angularForce = -this.wheelAnglarForceDefault;
            this.wheelb.angularForce = -this.wheelAnglarForceDefault;
        }
    };
    return Examples_frictionsCar;
}(egret.Sprite));
__reflect(Examples_frictionsCar.prototype, "Examples_frictionsCar");
//# sourceMappingURL=Examples_frictionsCar.js.map