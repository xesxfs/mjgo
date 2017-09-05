var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * apply force
 * @author
 *
 */
var Examples_applyForce = (function (_super) {
    __extends(Examples_applyForce, _super);
    function Examples_applyForce() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_applyForce.prototype.onAdded2stage = function (e) {
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
    Examples_applyForce.prototype.onStageClick = function (e) {
        console.log("onStageClick");
        //Apply force to a point relative to the center of mass of the body. 
        //This could for example be a point on the RigidBody surface. 
        //Applying force this way will add to Body.force and Body.angularForce. 
        //If relativePoint is zero, the force will be applied directly on the center of mass, 
        //and the torque produced will be zero.
        this.box.applyForce([100, 200], [0.5, 0]);
    };
    return Examples_applyForce;
}(egret.Sprite));
__reflect(Examples_applyForce.prototype, "Examples_applyForce");
//# sourceMappingURL=Examples_applyForce.js.map