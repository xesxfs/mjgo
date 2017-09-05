/**
 * Body kinematic
 * @author 
 *
 */
class Examples_kinematic extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    private tfInfo: egret.TextField;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);

        this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;

        this.scene.world.islandSplit = true;//使用islandSplit
        
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage,this,this.scene.world);

        this.createObjs();

        this.createDebug();

        this.tfInfo = new egret.TextField();
        this.addChild(this.tfInfo);
    }

    private createObjs(): void {
        //code here
        
        // Create ground
        var planeShape = new p2.Plane();
        var plane = new p2.Body({
            position: [0,-2]
        });
        plane.addShape(planeShape);
        this.scene.world.addBody(plane);


        // Create kinematic, moving box
        var kinematicBody = new p2.Body({
            type: p2.Body.KINEMATIC,
            position: [0,0.5]
        });
        var boxShape = new p2.Box({ width: 2,height: 0.5 });
        kinematicBody.addShape(boxShape);
        this.scene.world.addBody(kinematicBody);


        // Create dynamic box
        var boxBody = new p2.Body({
            mass: 1,
            position: [0,2]
        });
        boxBody.addShape(new p2.Box({ width: 0.5,height: 0.5 }));
        this.scene.world.addBody(boxBody);

        // Create dynamic circle connected to the kinematic body
        var circleBody = new p2.Body({
            mass: 1,
            position: [0,-0.5],
            velocity: [-1,0]
        });
        circleBody.addShape(new p2.Circle({ radius: 0.25 }));
        this.scene.world.addBody(circleBody);

        this.scene.world.addConstraint(new p2.DistanceConstraint(kinematicBody,circleBody));

        var worldInClusure = this.scene.world;//在闭包中的world
        this.scene.world.on("postStep",function() {
            // Kinematic bodies are controlled via velocity.
            kinematicBody.velocity[1] = 2 * Math.sin(worldInClusure.time * 2);
        });
    }

    private loop(): void {
        this.debugDraw.drawDebug();

        var numIslands = this.scene.world.islandManager.islands.length;
        this.tfInfo.text = "number of islands:" + numIslands;
    }


    private debugDraw: p2DebugDraw;
    private debugSpr: egret.Sprite;
    private createDebug(): void {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.scene.world);
        this.debugSpr = new egret.Sprite();
        this.addChild(this.debugSpr);
        this.debugDraw.setSprite(this.debugSpr);

        this.debugDraw.setLineWidth(0.02);
        this.debugSpr.x = this.stage.stageWidth / 2;
        this.debugSpr.y = this.stage.stageHeight / 2;

        var scale = 50;
        this.debugSpr.scaleX = scale;
        this.debugSpr.scaleY = -scale;
    }
}
