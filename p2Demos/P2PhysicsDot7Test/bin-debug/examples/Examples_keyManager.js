var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试键盘控制
 * @author
 *
 */
var Examples_keyManager = (function (_super) {
    __extends(Examples_keyManager, _super);
    function Examples_keyManager() {
        var _this = _super.call(this) || this;
        _this.wheelAnglarForceDefault = 15; //轮子转动默认角力
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_keyManager.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //给予默认摩擦力较大值，防止轮子滑动
        this.scene.world.defaultContactMaterial.friction = 10;
        this.scene.world.defaultContactMaterial.restitution = 0.4;
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage, this, this.scene.world);
        jbP2.KeyManager.init();
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 50, 480, 0, p2.Body.STATIC); //left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 50, 480, 0, p2.Body.STATIC); //right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody.id = 2;
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 100, 100, 30, 0, p2.Body.DYNAMIC); //ball1
        tembody.id = 5;
        this.wheel = tembody;
        this.wheel.allowSleep = false;
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this); //
    };
    Examples_keyManager.prototype.updateKeyCtrl = function () {
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            this.wheel.angularForce = this.wheelAnglarForceDefault;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            this.wheel.angularForce = -this.wheelAnglarForceDefault;
        }
    };
    return Examples_keyManager;
}(egret.Sprite));
__reflect(Examples_keyManager.prototype, "Examples_keyManager");
//# sourceMappingURL=Examples_keyManager.js.map