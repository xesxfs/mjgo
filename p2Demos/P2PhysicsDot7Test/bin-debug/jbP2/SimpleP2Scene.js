var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 封装出来一个简单的物理场景
 * @author
 *
 */
var jbP2;
(function (jbP2) {
    var SimpleP2Scene = (function () {
        function SimpleP2Scene(pStage, pDispCtn) {
            //物理世界转换系数
            this.factor = 50;
            this.stage = pStage; //ref of stage
            this.dispCtn = pDispCtn; //ref of disp container
            //初始化P2Space
            jbP2.P2Space.initSpace(this.factor, new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));
            //创建world
            this.world = new p2.World();
            //set p2.world.sleepMode
            this.world.sleepMode = p2.World.BODY_SLEEPING;
            egret.Ticker.getInstance().register(this.p2RunStep, this); //register update step of p2.wolrd
            //this.stage.addEventListener(egret.Event.ENTER_FRAME,this.p2Step,this);
        }
        //update step
        SimpleP2Scene.prototype.p2RunStep = function (dt) {
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            this.world.step(dt / 1000); //p2.World.step                                 
            jbP2.P2Space.updateWorldBodiesSkin(this.world); //更新p2World内所有刚体皮肤显示
        };
        SimpleP2Scene.prototype.p2Step = function (e) {
            this.world.step(1 / 60);
            jbP2.P2Space.updateWorldBodiesSkin(this.world); //更新p2World内所有刚体皮肤显示
        };
        /**
         * creage ground
         */
        SimpleP2Scene.prototype.createGround = function () {
            //创建plane
            var planeShape = new p2.Plane();
            var planeBody = new p2.Body();
            planeBody.type = p2.Body.STATIC;
            planeBody.addShape(planeShape);
            planeBody.displays = [];
            this.world.addBody(planeBody);
        };
        return SimpleP2Scene;
    }());
    jbP2.SimpleP2Scene = SimpleP2Scene;
    __reflect(SimpleP2Scene.prototype, "jbP2.SimpleP2Scene");
})(jbP2 || (jbP2 = {}));
//# sourceMappingURL=SimpleP2Scene.js.map