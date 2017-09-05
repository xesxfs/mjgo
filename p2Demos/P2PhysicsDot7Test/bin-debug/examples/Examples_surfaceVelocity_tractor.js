var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var Examples_surfaceVelocity_tractor = (function (_super) {
    __extends(Examples_surfaceVelocity_tractor, _super);
    function Examples_surfaceVelocity_tractor() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_surfaceVelocity_tractor.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage, this, this.scene.world, false);
        var mtlGround = new p2.Material(1001); //地面材质
        var mtlTractor = new p2.Material(1002); //履带材质
        var box = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 200, 100, 50, 50, 0, p2.Body.DYNAMIC); //box1
        box.shapes[0].material = mtlGround;
        var tractor = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 150, 200, 80, 20, -5, p2.Body.DYNAMIC); //platform
        tractor.shapes[0].material = mtlTractor;
        //设定接触材质，其中参数surfaceVelocity = -.5
        var contactMaterial1 = new p2.ContactMaterial(mtlGround, mtlTractor, { surfaceVelocity: -0.5, friction: 10 });
        this.scene.world.addContactMaterial(contactMaterial1);
        var wallBody;
        wallBody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        wallBody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        var groundBody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        groundBody.shapes[0].material = mtlGround;
    };
    return Examples_surfaceVelocity_tractor;
}(egret.Sprite));
__reflect(Examples_surfaceVelocity_tractor.prototype, "Examples_surfaceVelocity_tractor");
//# sourceMappingURL=Examples_surfaceVelocity_tractor.js.map