/**
 * P2MouseJointHelper 鼠标PvtJoint
 * @author 
 *
 */
class P2MouseJointHelper {
    private world: p2.World;
    private stage: egret.Stage;
    private sceneCtn: egret.DisplayObjectContainer;
    private mouseBody: p2.Body;
    private mouseConstraint: p2.RevoluteConstraint;


    public constructor(stageRef: egret.Stage,pSceneCtn: egret.DisplayObjectContainer,pWorld: p2.World,hasDisplaySkin: Boolean = true) {
        this.stage = stageRef;
        this.world = pWorld;
        this.sceneCtn = pSceneCtn;

        if(hasDisplaySkin) {//是否有显示皮肤
            this.mouseBody = jbP2.P2Space.addOneBox(this.world,this.sceneCtn,400,400,20,20,0,p2.Body.KINEMATIC);//mouseBody
            this.mouseBody.shapes[0].collisionMask = 0;
        } else {
            this.mouseBody = new p2.Body();
        }

        this.mouseBody.allowSleep = false;

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStageTouchBegin,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onStageTouchMove,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onStageTouchEnd,this);

    }


    private onStageTouchBegin(e: egret.TouchEvent): void {
        this.clearConstraint();
        
        var p2x: number = jbP2.P2Space.convertEgretValueToP2(e.stageX);
        var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(e.stageY);
        
        // Check if the cursor is inside the box
        var hitBodies = this.world.hitTest([p2x,p2y],this.world.bodies,5);

        if(hitBodies.length) {
            var temBody: p2.Body = hitBodies[0];
            this.mouseBody.position[0] = p2x;
            this.mouseBody.position[1] = p2y;

            this.mouseConstraint = new p2.RevoluteConstraint(this.mouseBody,temBody,{ worldPivot: [p2x,p2y] });
            this.mouseConstraint.collideConnected = false;

            this.world.addConstraint(this.mouseConstraint);
        }  
    }

    private onStageTouchMove(e: egret.TouchEvent): void {
        if(this.mouseConstraint) {
            var p2x: number = jbP2.P2Space.convertEgretValueToP2(e.stageX);
            var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(e.stageY);
            this.mouseBody.position[0] = p2x;
            this.mouseBody.position[1] = p2y;
        }
    }
    private onStageTouchEnd(e: egret.TouchEvent): void {
        this.clearConstraint();
    }
    
    private clearConstraint():void{
        if(this.mouseConstraint) {
            this.world.removeConstraint(this.mouseConstraint);
            this.mouseConstraint.bodyA = null;
            this.mouseConstraint.bodyB = null;
            this.mouseConstraint = null;
        }
    }
       
}
