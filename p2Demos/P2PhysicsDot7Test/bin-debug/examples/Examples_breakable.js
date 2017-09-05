var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * breakable
 * @author
 * 结论：工作
 */
var Examples_breakable = (function (_super) {
    __extends(Examples_breakable, _super);
    function Examples_breakable() {
        var _this = _super.call(this) || this;
        Examples_breakable.inst = _this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_breakable.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage, this, this.scene.world);
        this.constraints = new Array();
        this.scene.world.solver.iterations = 30;
        this.scene.world.solver.tolerance = 0.001;
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 50, 480, 0, p2.Body.STATIC); //left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 50, 480, 0, p2.Body.STATIC); //right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 50, 0, p2.Body.STATIC); //middle static
        tembody.id = 2;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 0, 800, 50, 0, p2.Body.STATIC); //top static
        tembody.id = 3;
        //------------------------------------------------------------
        //        var ball1:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,100,100,30,0,p2.Body.DYNAMIC);//ball
        //        var ball2:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,200,100,30,0,p2.Body.DYNAMIC);//ball
        //                
        //        ball1.allowSleep = ball2.allowSleep = false;
        //                
        //        //这里的maxForce不是实现破坏的最大力量，和setStiffness得到差不多的效果
        //        var lock: p2.LockConstraint = new p2.LockConstraint(ball1,ball2,{ collideConnected: false });
        //        this.scene.world.addConstraint(lock);
        //        
        //        this.constraints.push(lock);
        //------------------------------------------------------------
        //------------------------------------------------------------
        this.box1 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 100, 50, 50, 0, p2.Body.DYNAMIC); //box1
        this.box2 = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 300, 50, 50, 0, p2.Body.DYNAMIC); //box2
        this.box1.allowSleep = this.box2.allowSleep = false;
        //约束点放在两个刚体中间位置,转换到p2空间点坐标
        var pivotP2X = jbP2.P2Space.convertEgretValueToP2(390);
        var pivotP2Y = jbP2.P2Space.convertEgretY_To_P2Y(200);
        //构造方法中type的值可以是Constraint.DISTANCE, Constraint.GEAR, Constraint.LOCK, Constraint.PRISMATIC or Constraint.REVOLUTE
        var pvtJt = new p2.RevoluteConstraint(this.box1, this.box2, { worldPivot: [pivotP2X, pivotP2Y] });
        this.scene.world.addConstraint(pvtJt);
        this.constraints.push(pvtJt);
        //------------------------------------------------------------
        this.scene.world.on("postStep", this.onP2PostStep);
    };
    Examples_breakable.prototype.onP2PostStep = function () {
        Examples_breakable.inst.breakableStep();
    };
    Examples_breakable.prototype.breakableStep = function () {
        for (var i = 0; i < this.constraints.length; i++) {
            var c = this.constraints[i];
            //c.equeations;//这是个不存在的属性,egret api名称错误,不应该是equeations,应该是equations
            //正确的属性是c.equations
            var eqs = c["equations"]; //取得正确的属性
            // Equation.multiplier can be seen as the magnitude of the force
            if (Math.abs(eqs[0].multiplier) > 200) {
                // Constraint force is too large... Remove the constraint.
                this.scene.world.removeConstraint(c);
                this.constraints.splice(this.constraints.indexOf(c), 1);
            }
        }
    };
    return Examples_breakable;
}(egret.Sprite));
__reflect(Examples_breakable.prototype, "Examples_breakable");
//# sourceMappingURL=Examples_breakable.js.map