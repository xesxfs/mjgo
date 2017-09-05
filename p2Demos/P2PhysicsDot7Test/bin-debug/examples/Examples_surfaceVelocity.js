var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * surface velocity
 * @author
 *
 */
var Examples_surfaceVelocity = (function (_super) {
    __extends(Examples_surfaceVelocity, _super);
    function Examples_surfaceVelocity() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_surfaceVelocity.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage, this, this.scene.world, false);
        var mtlBox = new p2.Material(1001); //box 材质
        var mtlPlatform1 = new p2.Material(1002); //平台材质1
        var mtlPlatform2 = new p2.Material(1003); //平台材质2
        var box = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 200, 100, 50, 50, 0, p2.Body.DYNAMIC); //box1
        box.shapes[0].material = mtlBox;
        var platform1 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 150, 200, 200, 20, -5, p2.Body.STATIC); //platform
        platform1.shapes[0].material = mtlPlatform1;
        var platform2 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 300, 300, 400, 20, 5, p2.Body.STATIC); //platform
        platform2.shapes[0].material = mtlPlatform2;
        //设定mtlBox和mtlPlatform1接触材质，其中参数surfaceVelocity = -.5
        var contactMaterial1 = new p2.ContactMaterial(mtlBox, mtlPlatform1, { surfaceVelocity: -0.5, friction: 20 });
        this.scene.world.addContactMaterial(contactMaterial1);
        //设定mtlBox和mtlPlatform1接触材质，其中参数surfaceVelocity = 1.5
        var contactMaterial2 = new p2.ContactMaterial(mtlBox, mtlPlatform2, { surfaceVelocity: 1.5, friction: 10 });
        this.scene.world.addContactMaterial(contactMaterial2);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody.id = 2;
    };
    return Examples_surfaceVelocity;
}(egret.Sprite));
__reflect(Examples_surfaceVelocity.prototype, "Examples_surfaceVelocity");
//# sourceMappingURL=Examples_surfaceVelocity.js.map