/**
 *
 * @author 
 * 结论：可以看到浮力工作，但是现在不能改变水面高度,改变就会造成错误效果
 */
class Examples_buoyancy extends egret.Sprite {
    public static inst: Examples_buoyancy;//因为World.on中缺少context，所以建立这个变量便于访问
    
    private scene: jbP2.SimpleP2Scene;

    public bodies: Array<p2.Body>;


    public constructor() {
        super();
        Examples_buoyancy.inst = this;

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        
        //鼠标拾取工具实例
        var mouseJt: P2MouseJointHelper = new P2MouseJointHelper(this.stage,this,this.scene.world);

        var tembody: p2.Body;

        this.bodies = new Array<p2.Body>();

        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,50,50,0,p2.Body.DYNAMIC);//box1
        this.bodies.push(tembody);

        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,100,100,30,0,p2.Body.DYNAMIC);//ball1
        this.bodies.push(tembody);

        this.scene.world.on("postStep",this.onP2PostStep);
    }

    private shapePosition = [0,0];
    private centerOfBouyancy = [0,0];
    private liftForce = [0,0];
    private viscousForce = [0,0];
    private shapeAngle = 0;
    public k = 100; // up force per submerged "volume"
    public c = 0.8; // viscosity
    private v = [0,0];
    private aabb = new p2.AABB();

    private onP2PostStep(): void {
        //console.log("onP2PostStep");
        
        //[jbP2.P2Space.convertEgretValueToP2(0),jbP2.P2Space.convertEgretY_To_P2Y(480)]; 和 [0,0]是一样的
        var waterSurfacePos = [0,0]; //注意第二个元素不能改成>0,会造成效果错误，看来和下面的计算有关系
        
        for(var i = 0;i < this.bodies.length;i++) {
            //注意这里闭包环境不在Example_buoyancy中
            Examples_buoyancy.inst.applyAABBBuoyancyForces(Examples_buoyancy.inst.bodies[i],waterSurfacePos,Examples_buoyancy.inst.k,Examples_buoyancy.inst.c);
        }
    }

    public applyAABBBuoyancyForces(body: p2.Body,planePosition,k,c) {
        if(body == null || body.shapes == null) {
            return;
        }
        for(var i = 0;i < body.shapes.length;i++) {

            var shape = body.shapes[i];

            // Get shape world transform
            body.vectorToWorldFrame(this.shapePosition,shape.position);
            p2.vec2.add(this.shapePosition,this.shapePosition,body.position);
            this.shapeAngle = shape.angle + body.angle;

            // Get shape AABB
            shape.computeAABB(this.aabb,this.shapePosition,this.shapeAngle);

            var areaUnderWater;
            if(this.aabb.upperBound[1] < planePosition[1]) {
                // Fully submerged
                p2.vec2.copy(this.centerOfBouyancy,this.shapePosition);
                areaUnderWater = shape.area;
            } else if(this.aabb.lowerBound[1] < planePosition[1]) {
                // Partially submerged
                var width = this.aabb.upperBound[0] - this.aabb.lowerBound[0];
                var height = 0 - this.aabb.lowerBound[1];
                areaUnderWater = width * height;
                p2.vec2.set(this.centerOfBouyancy,this.aabb.lowerBound[0] + width / 2,this.aabb.lowerBound[1] + height / 2);
            } else {
                continue;
            }

            // Compute lift force
            p2.vec2.subtract(this.liftForce,planePosition,this.centerOfBouyancy);
            p2.vec2.scale(this.liftForce,this.liftForce,areaUnderWater * k);
            this.liftForce[0] = 0;

            // Make center of bouycancy relative to the body
            p2.vec2.subtract(this.centerOfBouyancy,this.centerOfBouyancy,body.position);

            // Viscous force
            body.getVelocityAtPoint(this.v,this.centerOfBouyancy);
            p2.vec2.scale(this.viscousForce,this.v,-c);

            // Apply forces
            body.applyForce(this.viscousForce,this.centerOfBouyancy);
            body.applyForce(this.liftForce,this.centerOfBouyancy);
        }
    }
}
