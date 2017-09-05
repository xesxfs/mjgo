var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试动态修改lock约束中 localpt
 * @author
 *
 */
var Examples_lockChangingLocalPt = (function (_super) {
    __extends(Examples_lockChangingLocalPt, _super);
    function Examples_lockChangingLocalPt() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_lockChangingLocalPt.prototype.onAdded2stage = function (e) {
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
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 480, 800, 20, 0, p2.Body.STATIC); //middle static
        var ball1 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 100, 100, 60, 30, -10, p2.Body.DYNAMIC); //ball
        var ball2 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 200, 100, 60, 30, 10, p2.Body.DYNAMIC); //ball
        ball1.allowSleep = ball2.allowSleep = false;
        //setup lock constraint----------------------------------------------------------------
        //lock 在创建时候会自动按照两个刚体角度作为约束角度，无需另外指定
        //这里的maxForce不是实现破坏的最大力量，和setStiffness得到差不多的效果
        var lock = new p2.LockConstraint(ball1, ball2, { maxForce: 1000 });
        lock.collideConnected = false;
        //如下行，可以通过localAngleB来设置在约束中BodyB相对BodyA的角度
        //var lock: p2.LockConstraint = new p2.LockConstraint(ball1,ball2,{ collideConnected: false,maxForce: 1000,localAngleB:Math.PI/8 });
        //lock.setStiffness(10);
        this.scene.world.addConstraint(lock);
        this.lockJt = lock;
        this.localPtAOriginal = [this.lockJt.localOffsetB[0], this.lockJt.localOffsetB[1]];
        //-------------------------------------------------------------------------------------
        this.tfSinValue = jbP2.DispUtil.createTouchTf(50, 50, 100, 18, "");
        this.addChild(this.tfSinValue);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    Examples_lockChangingLocalPt.prototype.loop = function () {
        var sinValue = Math.sin(this.scene.world.time);
        var offsetValue = sinValue * 0.5;
        this.lockJt.localOffsetB[0] = this.localPtAOriginal[0] + offsetValue; //移动lockJt.localOffsetB水平位置
        this.tfSinValue.text = String(offsetValue);
    };
    return Examples_lockChangingLocalPt;
}(egret.Sprite));
__reflect(Examples_lockChangingLocalPt.prototype, "Examples_lockChangingLocalPt");
//# sourceMappingURL=Examples_lockChangingLocalPt.js.map