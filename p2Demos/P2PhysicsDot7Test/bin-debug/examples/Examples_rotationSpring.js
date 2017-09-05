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
var Examples_rotationSpring = (function (_super) {
    __extends(Examples_rotationSpring, _super);
    function Examples_rotationSpring() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_rotationSpring.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        //this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world,false);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody.id = 2;
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
        var rotationalSpring = new p2.RotationalSpring(box1, box2, { stiffness: 100, damping: 1000 });
        rotationalSpring.restAngle = -Math.PI / 8; //约束两个body之间的夹角，如果不指定，则默认等于约束建立时的夹角
        this.scene.world.addSpring(rotationalSpring);
        this.rotSpring = rotationalSpring;
        var btnChange = jbP2.DispUtil.createTouchTf(10, 200, 120, 20, "change");
        btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeClick, this);
        this.addChild(btnChange);
    };
    Examples_rotationSpring.prototype.onBtnChangeClick = function (e) {
        if (this.rotSpring.restAngle > 0) {
            this.rotSpring.restAngle = -Math.PI / 8;
        }
        else {
            this.rotSpring.restAngle = Math.PI / 8;
        }
    };
    return Examples_rotationSpring;
}(egret.Sprite));
__reflect(Examples_rotationSpring.prototype, "Examples_rotationSpring");
//# sourceMappingURL=Examples_rotationSpring.js.map