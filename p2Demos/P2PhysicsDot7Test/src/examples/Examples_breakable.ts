/**
 * breakable 
 * @author 
 * 结论：工作
 */
class Examples_breakable extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    private mouseJt: MouseJointHelper;
    
    private constraints: Array<p2.Constraint>;
    
    private box1: p2.Body;
    private box2: p2.Body;
    
    public static inst:Examples_breakable;
           
    public constructor() {
        super();
        Examples_breakable.inst = this;
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
        	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //鼠标拾取工具实例
        this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world);
                
        this.constraints = new Array<p2.Constraint>();
        
        (<p2.GSSolver>this.scene.world.solver).iterations = 30;
        (<p2.GSSolver>this.scene.world.solver).tolerance = 0.001;

        
        var tembody: p2.Body;
                
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,50,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,50,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;                        
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,50,0,p2.Body.STATIC);//middle static
        tembody.id = 2;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,0,800,50,0,p2.Body.STATIC);//top static
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
        this.box1 = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,50,50,0,p2.Body.DYNAMIC);//box1
        this.box2 = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,300,50,50,0,p2.Body.DYNAMIC);//box2
        this.box1.allowSleep = this.box2.allowSleep = false;
               
        //约束点放在两个刚体中间位置,转换到p2空间点坐标
        var pivotP2X: number = jbP2.P2Space.convertEgretValueToP2(390);
        var pivotP2Y: number = jbP2.P2Space.convertEgretY_To_P2Y(200);
                
        //构造方法中type的值可以是Constraint.DISTANCE, Constraint.GEAR, Constraint.LOCK, Constraint.PRISMATIC or Constraint.REVOLUTE
        var pvtJt:p2.RevoluteConstraint = new p2.RevoluteConstraint(this.box1, this.box2, {worldPivot: [pivotP2X, pivotP2Y]});
                
        this.scene.world.addConstraint(pvtJt);
        
        this.constraints.push(pvtJt);
        //------------------------------------------------------------
        
        this.scene.world.on("postStep",this.onP2PostStep);
    }
    
    private onP2PostStep():void{
        Examples_breakable.inst.breakableStep();
    }
    private breakableStep():void{
        for(var i = 0;i < this.constraints.length;i++) {
            var c = this.constraints[i];
            
            //c.equeations;//这是个不存在的属性,egret api名称错误,不应该是equeations,应该是equations
            //正确的属性是c.equations
            var eqs: p2.Equation[] = c["equations"];//取得正确的属性
            
            // Equation.multiplier can be seen as the magnitude of the force
            if(Math.abs(eqs[0].multiplier) > 200) {
                // Constraint force is too large... Remove the constraint.
                this.scene.world.removeConstraint(c);
                this.constraints.splice(this.constraints.indexOf(c),1);
            }
        }
    }
}
