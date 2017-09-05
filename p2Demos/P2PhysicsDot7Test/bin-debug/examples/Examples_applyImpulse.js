var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * apply impulse
 * @author
 *
 */
var Examples_applyImpulse = (function (_super) {
    __extends(Examples_applyImpulse, _super);
    function Examples_applyImpulse() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_applyImpulse.prototype.onAdded2stage = function (e) {
        this.objsCtn = new egret.Sprite();
        this.addChild(this.objsCtn);
        this.drawCtn = new egret.Sprite();
        this.addChild(this.drawCtn);
        this.scene = new jbP2.SimpleP2Scene(this.stage, this.objsCtn);
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this.objsCtn, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall                 
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        this.box = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 100, 50, 50, 10, p2.Body.DYNAMIC); //box1
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageClick, this);
    };
    Examples_applyImpulse.prototype.onStageClick = function (e) {
        console.log("onStageClick");
        //Apply impulse to a point relative to the body.
        //This could for example be a point on the Body surface.
        //An impulse is a force added to a body during a short period of time (impulse = force * time).
        //Impulses will be added to Body.velocity and Body.angularVelocity.
        this.box.applyImpulse([10, 10], [0.5, 0]);
    };
    return Examples_applyImpulse;
}(egret.Sprite));
__reflect(Examples_applyImpulse.prototype, "Examples_applyImpulse");
//# sourceMappingURL=Examples_applyImpulse.js.map