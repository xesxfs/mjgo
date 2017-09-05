/**
 *
 * @author 
 *
 */
class Examples_p2MouseJt extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
    private mouseBody: p2.Body;
    private mouseConstraint: p2.RevoluteConstraint;


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);

        var tembody: p2.Body;

        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,10,p2.Body.STATIC);//middle static
        tembody.id = 2;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,200,50,10,p2.Body.DYNAMIC);//box1
        tembody.id = 3;
        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,400,50,40,0,p2.Body.DYNAMIC);//ball1
        tembody.id = 4;
        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,100,100,30,0,p2.Body.DYNAMIC);//ball1
        tembody.id = 5;

        this.mouseBody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,20,20,0,p2.Body.KINEMATIC);//mouseBody
        this.mouseBody.shapes[0].collisionMask = 0;
        this.mouseBody.id = 6;

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStageTouchBegin1,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onStageTouchMove,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onStageTouchEnd,this);
    }

    
    private onStageTouchBegin1(e: egret.TouchEvent): void {
        var p2x: number = jbP2.P2Space.convertEgretValueToP2(e.stageX);
        var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(e.stageY);
        
        // Check if the cursor is inside the box
        var hitBodies = this.scene.world.hitTest([p2x,p2y],this.scene.world.bodies,5);

        if(hitBodies.length) {
            var temBody: p2.Body = hitBodies[0];
            this.mouseBody.position[0] = p2x;
            this.mouseBody.position[1] = p2y;

            this.mouseConstraint = new p2.RevoluteConstraint(this.mouseBody,temBody,{ worldPivot: [p2x,p2y] });
            this.mouseConstraint.collideConnected = false;

            this.scene.world.addConstraint(this.mouseConstraint);
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
        if(this.mouseConstraint) {
            this.scene.world.removeConstraint(this.mouseConstraint);
            this.mouseConstraint.bodyA = null;
            this.mouseConstraint.bodyB = null;
            this.mouseConstraint = null;
        }
    }
    
    /**
     * 获得显示对象对应的刚体
     */
    private getDispP2Body(disp: egret.DisplayObject): p2.Body {
        var result: p2.Body;
        for(var i = 0;i < this.scene.world.bodies.length;i++) {
            if(this.scene.world.bodies[i].displays == null) {
                continue;
            }
            if(this.scene.world.bodies[i].displays[0] == disp) {
                result = this.scene.world.bodies[i];
                break;
            }
        }
        return result;
    }
}
