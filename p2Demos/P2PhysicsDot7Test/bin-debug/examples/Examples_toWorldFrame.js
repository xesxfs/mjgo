var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 刚体坐标转换
 * @author
 *
 */
var Examples_toWorldFrame = (function (_super) {
    __extends(Examples_toWorldFrame, _super);
    function Examples_toWorldFrame() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_toWorldFrame.prototype.onAdded2stage = function (e) {
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
        var box = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 100, 200, 50, 15, p2.Body.STATIC); //box1
        this.drawBodyLocalPt(box, [0, 0]); //绘制刚体原点
        this.drawBodyLocalPt(box, [1, 0]); //绘制原点右边50像素
    };
    //把刚体局部空间的点，转换到世界，然后画出来
    Examples_toWorldFrame.prototype.drawBodyLocalPt = function (body, localPt) {
        var worldPt = [0, 0]; //初始化一个数组
        body.toWorldFrame(worldPt, localPt); //转换刚体局部坐标到世界
        //画出来
        var drawX = jbP2.P2Space.convertP2ValueToEgret(worldPt[0]);
        var drawY = jbP2.P2Space.convertP2Y_To_EgretY(worldPt[1]);
        this.drawCtn.graphics.lineStyle(1, 0xff0000);
        this.drawCtn.graphics.drawCircle(drawX, drawY, 5);
        this.drawCtn.graphics.endFill();
    };
    return Examples_toWorldFrame;
}(egret.Sprite));
__reflect(Examples_toWorldFrame.prototype, "Examples_toWorldFrame");
//# sourceMappingURL=Examples_toWorldFrame.js.map