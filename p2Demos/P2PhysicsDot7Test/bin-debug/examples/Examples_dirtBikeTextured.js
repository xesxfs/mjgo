var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Examples_dirtBikeEncapsulated2基础上测试贴图
 * @author
 *
 */
var Examples_dirtBikeTextured = (function (_super) {
    __extends(Examples_dirtBikeTextured, _super);
    function Examples_dirtBikeTextured() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2Stage, _this);
        return _this;
    }
    Examples_dirtBikeTextured.prototype.onAdded2Stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.defaultContactMaterial.friction = 40;
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall                              
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall                              
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        /*
         *  从设计素材中获得
        chassis create pos:215.2,180.65
frontSuspension pos:247.35,196.45
frontWheel pos:254.45,210.9
backConn pos:196.05,201.75
backConnPvt pos:209.55,201.55
anchor frontSuspensionSkin:7.5,12.900000000000006
anchor chassisSkin:45,18.599999999999994
         */
        this.bike = new DirtBikeTextured();
        this.bike.chassisX = 215.2;
        this.bike.chassisY = 180.65;
        this.bike.chassisW = 30;
        this.bike.chassisH = 15;
        this.bike.wheelR = 18;
        this.bike.frontSuspensionPos = new egret.Point(247.35, 196.45);
        this.bike.frontWheelPos = new egret.Point(254.45, 210.9);
        this.bike.backConnCubePos = new egret.Point(196.05, 201.75);
        this.bike.backConnCubeSize = new egret.Point(29.5, 4);
        this.bike.backConnPvtPos = new egret.Point(209.55, 201.55);
        this.bike.chassisSkinAnchor = new egret.Point(45, 18.6);
        this.bike.frontSuspensionAnchor = new egret.Point(7.5, 12.9);
        this.bike.replaceBmSkin = true;
        this.bike.createVehicle(this.scene);
        this.steering = new VehicleSteeringCtrl();
        this.steering.vehicle = this.bike;
        this.addChild(this.steering);
    };
    return Examples_dirtBikeTextured;
}(egret.Sprite));
__reflect(Examples_dirtBikeTextured.prototype, "Examples_dirtBikeTextured");
//# sourceMappingURL=Examples_dirtBikeTextured.js.map