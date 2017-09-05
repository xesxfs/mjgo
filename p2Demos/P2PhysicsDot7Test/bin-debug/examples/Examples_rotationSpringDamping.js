var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试旋转弹性的damp属性
 * @author
 *
 */
var Examples_rotationSpringDamping = (function (_super) {
    __extends(Examples_rotationSpringDamping, _super);
    function Examples_rotationSpringDamping() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_rotationSpringDamping.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;
        //鼠标拾取工具实例
        //this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world,false);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall                 
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 10, p2.Body.STATIC); //middle static
        var box1 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 100, 100, 100, 50, 0, p2.Body.STATIC); //box1
        var box2 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 200, 100, 100, 50, 0, p2.Body.DYNAMIC); //box2
        box1.allowSleep = box2.allowSleep = false;
        var pvtJtF; //constraint
        var p2PvtPointX; //物理世界的位置x
        var p2PvtPointY; //物理世界的位置y
        //setup revolute constraint
        p2PvtPointX = jbP2.P2Space.convertEgretValueToP2(150); //两个刚体中间点
        p2PvtPointY = jbP2.P2Space.convertEgretY_To_P2Y(100); //两个刚体中间点
        pvtJtF = new p2.RevoluteConstraint(box1, box2, { worldPivot: [p2PvtPointX, p2PvtPointY] });
        pvtJtF.collideConnected = false;
        pvtJtF.setLimits(-Math.PI / 4, Math.PI / 4);
        this.scene.world.addConstraint(pvtJtF);
        //setup rotation constraint
        var rotationalSpring = new p2.RotationalSpring(box1, box2, { stiffness: 60, damping: 60 });
        rotationalSpring.restAngle = -Math.PI / 8; //约束两个body之间的夹角，如果不指定，则默认等于约束建立时的夹角
        this.scene.world.addSpring(rotationalSpring);
        this.rotSpring = rotationalSpring;
        this.inputDamp = jbP2.DispUtil.createTouchTf(10, 150, 120, 20, "");
        this.inputDamp.border = true;
        this.inputDamp.type = egret.TextFieldType.INPUT;
        this.addChild(this.inputDamp);
        var btnChange = jbP2.DispUtil.createTouchTf(10, 200, 120, 20, "changeDamp");
        btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeClick, this);
        this.addChild(btnChange);
    };
    Examples_rotationSpringDamping.prototype.onBtnChangeClick = function (e) {
        if (isNaN(Number(this.inputDamp.text))) {
            console.log("onBtnChangeClick isNaN!");
            return;
        }
        var num = Number(this.inputDamp.text);
        this.rotSpring.damping = num;
        console.log("onBtnChangeClick damp value:" + this.rotSpring.damping);
    };
    return Examples_rotationSpringDamping;
}(egret.Sprite));
__reflect(Examples_rotationSpringDamping.prototype, "Examples_rotationSpringDamping");
//# sourceMappingURL=Examples_rotationSpringDamping.js.map