/**
 * 测试PivotJoint约束
 * @author 
 *
 */
class Examples_pivotJoint extends egret.Sprite {
      private scene: jbP2.SimpleP2Scene;
      private box1: p2.Body;
      private box2: p2.Body;
      private pvtJt: p2.RevoluteConstraint;
    
      public constructor() {
          super();
          this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2Stage,this);
      }

	
	private onAdded2Stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;
        
        //var mouseJt = new P2MouseJointHelper(this.stage,this,this.scene.world,false);
        
        this.scene.createGround();
   
        console.log("Examples_pivotJoint.onAdded2stage");       
        
        this.box1 = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,50,50,0,p2.Body.DYNAMIC);//box1
        this.box2 = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,300,50,50,0,p2.Body.DYNAMIC);//box2
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//bottom wall
        
        
        //约束点放在两个刚体中间位置,转换到p2空间点坐标
        var pivotP2X: number = jbP2.P2Space.convertEgretValueToP2(390);
        var pivotP2Y: number = jbP2.P2Space.convertEgretY_To_P2Y(200);
        
        //构造方法中type的值可以是Constraint.DISTANCE, Constraint.GEAR, Constraint.LOCK, Constraint.PRISMATIC or Constraint.REVOLUTE
        this.pvtJt = new p2.RevoluteConstraint(this.box1, this.box2, {worldPivot: [pivotP2X, pivotP2Y]});
        
        this.scene.world.addConstraint(this.pvtJt);
        
	}
}
