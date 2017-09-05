var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 胶囊体案例
 * @author
 *
 */
var Examples_capsule = (function (_super) {
    __extends(Examples_capsule, _super);
    function Examples_capsule() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_capsule.prototype.onAdded2stage = function (e) {
        this.objsCtn = new egret.Sprite();
        this.addChild(this.objsCtn);
        this.drawCtn = new egret.Sprite();
        this.addChild(this.drawCtn);
        this.scene = new jbP2.SimpleP2Scene(this.stage, this.objsCtn);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this.objsCtn, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall                 
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 50, 100, 50, 50, 10, p2.Body.DYNAMIC); //box1
        tembody = jbP2.P2Space.addOneCapsule(this.scene.world, this.scene.dispCtn, 400, 100, 50, 20, 10, p2.Body.DYNAMIC); //capsule
    };
    return Examples_capsule;
}(egret.Sprite));
__reflect(Examples_capsule.prototype, "Examples_capsule");
//# sourceMappingURL=Examples_capsule.js.map