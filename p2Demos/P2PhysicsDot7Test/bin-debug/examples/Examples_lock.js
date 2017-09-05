var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * LockConstraint
 * @author
 *
 */
var Examples_lock = (function (_super) {
    __extends(Examples_lock, _super);
    function Examples_lock() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_lock.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 10, p2.Body.STATIC); //middle static
        tembody.id = 2;
        var ball1 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 100, 100, 60, 30, -10, p2.Body.DYNAMIC); //ball
        var ball2 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 200, 100, 60, 30, 10, p2.Body.DYNAMIC); //ball
        ball1.allowSleep = ball2.allowSleep = false;
        //lock 在创建时候会自动按照两个刚体角度作为约束角度，无需另外指定
        //这里的maxForce不是实现破坏的最大力量，和setStiffness得到差不多的效果
        var lock = new p2.LockConstraint(ball1, ball2, { maxForce: 1000 });
        lock.collideConnected = false;
        //如下行，可以通过localAngleB来设置在约束中BodyB相对BodyA的角度
        //var lock: p2.LockConstraint = new p2.LockConstraint(ball1,ball2,{ collideConnected: false,maxForce: 1000,localAngleB:Math.PI/8 });
        //lock.setStiffness(10);
        this.scene.world.addConstraint(lock);
        this.lockJt = lock;
    };
    return Examples_lock;
}(egret.Sprite));
__reflect(Examples_lock.prototype, "Examples_lock");
//# sourceMappingURL=Examples_lock.js.map