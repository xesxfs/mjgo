/**
 * mouse joint helper
 * @author 
 *
 */
class MouseJointHelper extends egret.EventDispatcher {
    
    private world: p2.World;
    private stage: egret.Stage;
    private sceneCtn: egret.DisplayObjectContainer;
    private mouseBody: p2.Body;
    private mouseConstraint: p2.RevoluteConstraint;
    
    
	public constructor(stageRef:egret.Stage,pSceneCtn:egret.DisplayObjectContainer,pWorld:p2.World,hasDisplaySkin:Boolean = true) {
    	super();
	    this.stage = stageRef;
        this.world = pWorld;
        this.sceneCtn = pSceneCtn;
           
        if(hasDisplaySkin){//是否有显示皮肤
            this.mouseBody = jbP2.P2Space.addOneBox(this.world,this.sceneCtn,400,400,20,20,0,p2.Body.KINEMATIC);//mouseBody
            this.mouseBody.shapes[0].collisionMask = 0;
        }else{
            this.mouseBody = new p2.Body();
        }
        
        this.mouseBody.allowSleep = false;
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStageTouchBegin,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onStageTouchMove,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onStageTouchEnd,this);
        
        super();
	}

    
    private onStageTouchBegin(e:egret.TouchEvent):void{
        for(var i = 0;i < this.sceneCtn.numChildren;i++){
            var disp: egret.DisplayObject = this.sceneCtn.getChildAt(i);
            if(disp.hitTestPoint( e.stageX,e.stageY,true)){
                console.log("hit disp");
                var temBody: p2.Body = this.getDispP2Body(disp);
                if(temBody == this.mouseBody){
                    return;
                }
                if(temBody == null){
                    return;
                }
                                
                console.log("hit bodyType:"+temBody.type);
                if(temBody.type == p2.Body.DYNAMIC){
                    temBody.wakeUp();
                                        
                    var p2x: number = jbP2.P2Space.convertEgretValueToP2(e.stageX);
                    var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(e.stageY);
                    this.mouseBody.position[0] = p2x;
                    this.mouseBody.position[1] = p2y;
                                        
                    if(this.mouseConstraint){
                        this.world.removeConstraint(this.mouseConstraint);
                        this.mouseConstraint.bodyA = null;
                        this.mouseConstraint.bodyB = null;
                        this.mouseConstraint = null;
                    }
                    
                    this.mouseConstraint = new p2.RevoluteConstraint(this.mouseBody,temBody,{ worldPivot: [p2x,p2y] });
                                      
                    this.world.addConstraint(this.mouseConstraint);
                    
                    if(this.mouseBody.displays){
                        this.sceneCtn.addChild(this.mouseBody.displays[0]);
                    }
                    
                }
            }
        }
    }
        
    private onStageTouchMove(e:egret.TouchEvent):void{
        if(this.mouseConstraint){
            var p2x: number = jbP2.P2Space.convertEgretValueToP2(e.stageX);
            var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(e.stageY);
            this.mouseBody.position[0] = p2x;
            this.mouseBody.position[1] = p2y;
        }
    }
    private onStageTouchEnd(e:egret.TouchEvent):void{
        if(this.mouseConstraint){
            this.world.removeConstraint(this.mouseConstraint);
            this.mouseConstraint.bodyA = null;
            this.mouseConstraint.bodyB = null;
            this.mouseConstraint = null;
        }
    }
        
    /**
    * 获得显示对象对应的刚体
    */ 
    private getDispP2Body(disp:egret.DisplayObject):p2.Body{
        var result: p2.Body;
        for(var i = 0;i < this.world.bodies.length;i++){
            if(this.world.bodies[i].displays == null){
                continue;
            }
            if(this.world.bodies[i].displays[0] == disp){
                result = this.world.bodies[i];
                break;
            }
        }
        return result;
    }
}
