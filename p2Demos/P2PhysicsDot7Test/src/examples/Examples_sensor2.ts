/**
 * Examples_sensor 基础上直接访问Event.contactEquation
 * 测试结论是：
 * beginContact事件中不能直接通过Event.contactEquation获得碰撞位置，
 * 想获得碰撞位置,如下方案:
 * 1 监听impact事件，然后访问Event.contactEquation,查看Examples_worldImpact2
 * 2 监听impact事件，遍历world.narrowphase.contactEquations
 * 3 监听beginContact事件，遍历world.narrowphase.contactEquations
 * @author 
 *
 */
class Examples_sensor2 extends egret.Sprite{
    public static inst: Examples_sensor2;

    private scene: jbP2.SimpleP2Scene;
    private contactDrawing: egret.Sprite;
    private objsCtn: egret.Sprite;
    private playerBodyId: number = 4

    public constructor() {
        super();
        Examples_sensor2.inst = this;

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.objsCtn = new egret.Sprite();
        this.addChild(this.objsCtn);
        this.contactDrawing = new egret.Sprite();
        this.addChild(this.contactDrawing);

        this.scene = new jbP2.SimpleP2Scene(this.stage,this.objsCtn);

        var tembody: p2.Body;

        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,10,p2.Body.STATIC);//middle static
        tembody.id = 2;

        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,100,50,40,0,p2.Body.DYNAMIC);//ball1
        tembody.id = this.playerBodyId;

        var sensor: p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,300,100,100,0,p2.Body.KINEMATIC);//
        sensor.id = 5;
        sensor.shapes[0].sensor = true;//注意如果为sensor，则刚体类型需为kinematic或者dynamic
        
        this.scene.world.on("beginContact",this.onBeginContact);//注意这里没有context参数了,不能传入this
        this.scene.world.on("endContact",this.onEndContact);//注意这里没有context参数了,不能传入this
        
        this.name = "Examples_sensor2";
    }

    private onBeginContact(event): void {
        Examples_sensor2.inst.onBeginContactCheck(event);
    }
    private onEndContact(event): void {
        var bodyA: p2.Body = event.bodyA;
        var bodyB: p2.Body = event.bodyB;

        if(bodyA.id == 5 || bodyB.id == 5) {
            console.log("on target sensor EndContact bodyA.id:" + bodyA.id + ",bodyB.id:" + bodyB.id);
        }
    }



    private onBeginContactCheck(event): void {
        var bodyA: p2.Body = event.bodyA;
        var bodyB: p2.Body = event.bodyB;

        if(bodyA.id == this.playerBodyId || bodyB.id == this.playerBodyId) {
            console.log("on target sensor BeginContact bodyA.id:" + bodyA.id + ",bodyB.id:" + bodyB.id);

            var hittedBody: p2.Body;//与playerBodyId碰撞的刚体
            if(bodyA.id == this.playerBodyId) {
                hittedBody = bodyB;
            } else if(bodyB.id == this.playerBodyId) {
                hittedBody = bodyA;
            }
            console.log("hittedBody.id:" + hittedBody.id);

            if(hittedBody.shapes[0].sensor == true) {//碰到了传感器，这里不需要计算爆炸位置，只作为传感器就好 
                //碰撞到了传感器，不是普通dynamic刚体
                console.log("碰撞到了传感器，不是普通dynamic刚体,id:" + hittedBody.id);
            } else {
                this.getPlayerContactPos(event.contactEquation);  //这里是计算和其他Body.type=dynamic的刚体碰撞的位置
            }
        }
    }

    //获得player碰撞位置
    private getPlayerContactPos(c: p2.ContactEquation): void {
        if(c == null){
            console.log("c: p2.ContactEquation is null！！！！");
            return;
        }
        if(c.bodyA.id == this.playerBodyId || c.bodyB.id == this.playerBodyId) {
            var ptA: Array<number> = c.contactPointA;//pointA delta向量，上次使用contactPointB貌似没用对，用contactPointA就对了
            var contactPos: Array<number> = [c.bodyA.position[0] + ptA[0],c.bodyA.position[1] + ptA[1]];//在BodyA位置加上delta向量，这个就是碰撞发生的p2位置
            var dispX: number = jbP2.P2Space.convertP2ValueToEgret(contactPos[0]);//转换到egret世界的位置
            var dispY: number = jbP2.P2Space.convertP2Y_To_EgretY(contactPos[1]);//转换到egret世界的位置

            //drawing the point to the graphics
            this.contactDrawing.graphics.lineStyle(1,0);
            this.contactDrawing.graphics.drawCircle(dispX,dispY,15);
            this.contactDrawing.graphics.endFill();
        }
    }
}
