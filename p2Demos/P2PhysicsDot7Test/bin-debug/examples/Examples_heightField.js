var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * p2 7.0 HeightField测试
 * 结论:
 * -------------------------------
 * 地形高度被构造参数中heights决定，
 * heightFieldBody初始化position的x可以根据需要调整，
 * 但是y不能传入>0数值,会产生错误效果
 * heightField的宽度就是根据heiFieldElemWid*heights.len来决定
 * -------------------------------
 * @author
 *
 */
var Examples_heightField = (function (_super) {
    __extends(Examples_heightField, _super);
    function Examples_heightField() {
        var _this = _super.call(this) || this;
        _this.heightsData = [];
        _this.heiFieldPos = new egret.Point(0, 430);
        _this.heiFieldElemWid = 50;
        _this.wheelAnglarForceDefault = 8;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_heightField.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        jbP2.KeyManager.init();
        this.drawing = new egret.Sprite();
        this.addChild(this.drawing);
        //给予默认摩擦力较大值，防止轮子滑动
        this.scene.world.defaultContactMaterial.friction = 50;
        this.wheelMtl = new p2.Material(1001); //wheel mtl
        this.heightFieldMtl = new p2.Material(1002); //ground mtl
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 0, 800, 20, 0, p2.Body.STATIC); //top middle static
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 450, 800, 20, 0, p2.Body.STATIC); //top middle static
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 150, 200, 30, 0, p2.Body.DYNAMIC); //ball1
        this.wheel = tembody;
        this.wheel.shapes[0].material = this.wheelMtl;
        //创建高度点------------------------------------------------------------
        this.heightsData = [326, 314, 325, 310, 348, 330, 318, 338, 307, 350, 400, 480]; //假设从外部读取
        this.numDataPoints = this.heightsData.length;
        for (var i = 0; i < this.numDataPoints; i++) {
            var temP2PosY = jbP2.P2Space.convertEgretY_To_P2Y(this.heightsData[i]);
            this.heightsData[i] = temP2PosY;
        }
        this.heiFieldPos.x = jbP2.P2Space.convertEgretValueToP2(this.heiFieldPos.x);
        this.heiFieldPos.y = jbP2.P2Space.convertEgretY_To_P2Y(this.heiFieldPos.y);
        var p2ElemWid = jbP2.P2Space.convertEgretValueToP2(this.heiFieldElemWid);
        var heightfieldShape = new p2.Heightfield({ heights: this.heightsData, elementWidth: p2ElemWid });
        var heightfield = new p2.Body({
            //注意这里的Y不能传入>0数值，会产生诡异错误
            //x根据场景需求来决定
            position: [1, 0]
        });
        heightfieldShape.material = this.heightFieldMtl;
        heightfield.addShape(heightfieldShape);
        this.scene.world.addBody(heightfield);
        this.hField = heightfield;
        //------------------------------------------------------------------------------------
        //重新定义轮子和地面的反弹系数和摩擦力
        //stiffness可以改变地面硬度，轮子可以陷入地面,friction可以改变摩擦力，二者共同决定地形特性，如泥地和公路等
        var contactMtl = new p2.ContactMaterial(this.wheelMtl, this.heightFieldMtl, { stiffness: 1000, restitution: 0.0, friction: 20 });
        this.scene.world.addContactMaterial(contactMtl);
        this.drawHeightField();
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this); //
    };
    Examples_heightField.prototype.drawHeightField = function () {
        this.drawing.graphics.clear();
        this.drawing.graphics.lineStyle(1, 0);
        var startX = jbP2.P2Space.convertP2ValueToEgret(this.hField.position[0]); //移动到heightField开始点
        var startY = jbP2.P2Space.convertP2Y_To_EgretY(this.heightsData[0]);
        this.drawing.graphics.moveTo(startX, startY);
        for (var i = 0; i < this.heightsData.length; i++) {
            var temX = startX + i * this.heiFieldElemWid;
            var temY = this.heightsData[i];
            temY = jbP2.P2Space.convertP2Y_To_EgretY(temY);
            this.drawing.graphics.lineTo(temX, temY);
            console.log("drawing pos:" + temX + "," + temY);
        }
        this.drawing.graphics.endFill();
    };
    Examples_heightField.prototype.updateKeyCtrl = function () {
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            this.wheel.angularForce = this.wheelAnglarForceDefault;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            this.wheel.angularForce = -this.wheelAnglarForceDefault;
        }
    };
    return Examples_heightField;
}(egret.Sprite));
__reflect(Examples_heightField.prototype, "Examples_heightField");
//# sourceMappingURL=Examples_heightField.js.map