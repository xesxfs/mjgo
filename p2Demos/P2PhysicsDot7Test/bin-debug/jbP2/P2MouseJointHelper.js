var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * P2MouseJointHelper 鼠标PvtJoint
 * @author
 *
 */
var P2MouseJointHelper = (function () {
    function P2MouseJointHelper(stageRef, pSceneCtn, pWorld, hasDisplaySkin) {
        if (hasDisplaySkin === void 0) { hasDisplaySkin = true; }
        this.stage = stageRef;
        this.world = pWorld;
        this.sceneCtn = pSceneCtn;
        if (hasDisplaySkin) {
            this.mouseBody = jbP2.P2Space.addOneBox(this.world, this.sceneCtn, 400, 400, 20, 20, 0, p2.Body.KINEMATIC); //mouseBody
            this.mouseBody.shapes[0].collisionMask = 0;
        }
        else {
            this.mouseBody = new p2.Body();
        }
        this.mouseBody.allowSleep = false;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
    }
    P2MouseJointHelper.prototype.onStageTouchBegin = function (e) {
        this.clearConstraint();
        var p2x = jbP2.P2Space.convertEgretValueToP2(e.stageX);
        var p2y = jbP2.P2Space.convertEgretY_To_P2Y(e.stageY);
        // Check if the cursor is inside the box
        var hitBodies = this.world.hitTest([p2x, p2y], this.world.bodies, 5);
        if (hitBodies.length) {
            var temBody = hitBodies[0];
            this.mouseBody.position[0] = p2x;
            this.mouseBody.position[1] = p2y;
            this.mouseConstraint = new p2.RevoluteConstraint(this.mouseBody, temBody, { worldPivot: [p2x, p2y] });
            this.mouseConstraint.collideConnected = false;
            this.world.addConstraint(this.mouseConstraint);
        }
    };
    P2MouseJointHelper.prototype.onStageTouchMove = function (e) {
        if (this.mouseConstraint) {
            var p2x = jbP2.P2Space.convertEgretValueToP2(e.stageX);
            var p2y = jbP2.P2Space.convertEgretY_To_P2Y(e.stageY);
            this.mouseBody.position[0] = p2x;
            this.mouseBody.position[1] = p2y;
        }
    };
    P2MouseJointHelper.prototype.onStageTouchEnd = function (e) {
        this.clearConstraint();
    };
    P2MouseJointHelper.prototype.clearConstraint = function () {
        if (this.mouseConstraint) {
            this.world.removeConstraint(this.mouseConstraint);
            this.mouseConstraint.bodyA = null;
            this.mouseConstraint.bodyB = null;
            this.mouseConstraint = null;
        }
    };
    return P2MouseJointHelper;
}());
__reflect(P2MouseJointHelper.prototype, "P2MouseJointHelper");
//# sourceMappingURL=P2MouseJointHelper.js.map