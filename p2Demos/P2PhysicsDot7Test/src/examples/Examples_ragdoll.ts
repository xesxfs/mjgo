/**
 * ragdoll
 * 注意：想要转换为egret坐标
 * @author 
 *
 */
class Examples_ragdoll extends egret.Sprite{
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
        var shouldersDistance = 0.5,
            upperArmLength = 0.4,
            lowerArmLength = 0.4,
            upperArmSize = 0.2,
            lowerArmSize = 0.2,
            neckLength = 0.1,
            headRadius = 0.25,
            upperBodyLength = 0.6,
            pelvisLength = 0.4,
            upperLegLength = 0.5,
            upperLegSize = 0.2,
            lowerLegSize = 0.2,
            lowerLegLength = 0.5;
            
        var OTHER = Math.pow(2,1),
            BODYPARTS = Math.pow(2,2),
            GROUND = Math.pow(2,3),
            OTHER = Math.pow(2,4),
            bodyPartShapes = [];

        var headShape = new p2.Circle({ radius: headRadius }),
            upperArmShapeLeft = new p2.Box({ width: upperArmLength,height: upperArmSize }),
            upperArmShapeRight = new p2.Box({ width: upperArmLength,height: upperArmSize }),
            lowerArmShapeLeft = new p2.Box({ width: lowerArmLength,height: lowerArmSize }),
            lowerArmShapeRight = new p2.Box({ width: lowerArmLength,height: lowerArmSize }),
            upperBodyShape = new p2.Box({ width: shouldersDistance,height: upperBodyLength }),
            pelvisShape = new p2.Box({ width: shouldersDistance,height: pelvisLength }),
            upperLegShapeLeft = new p2.Box({ width: upperLegSize,height: upperLegLength }),
            upperLegShapeRight = new p2.Box({ width: upperLegSize,height: upperLegLength }),
            lowerLegShapeLeft = new p2.Box({ width: lowerLegSize,height: lowerLegLength }),
            lowerLegShapeRight = new p2.Box({ width: lowerLegSize,height: lowerLegLength });

        bodyPartShapes.push(
            headShape,
            upperArmShapeRight,
            upperArmShapeLeft,
            lowerArmShapeRight,
            lowerArmShapeLeft,
            upperBodyShape,
            pelvisShape,
            upperLegShapeRight,
            upperLegShapeLeft,
            lowerLegShapeRight,
            lowerLegShapeLeft
        );

        for(var i = 0;i < bodyPartShapes.length;i++) {
            var s = bodyPartShapes[i];
            s.collisionGroup = BODYPARTS;
            s.collisionMask = GROUND | OTHER;
        }
        
        // Lower legs
        var lowerLeftLeg = new p2.Body({
            mass: 1,
            position: [-shouldersDistance / 2,lowerLegLength / 2],
        });
        var lowerRightLeg = new p2.Body({
            mass: 1,
            position: [shouldersDistance / 2,lowerLegLength / 2],
        });
        lowerLeftLeg.addShape(lowerLegShapeLeft);
        lowerRightLeg.addShape(lowerLegShapeRight);
        this.scene.world.addBody(lowerLeftLeg);
        this.scene.world.addBody(lowerRightLeg);

        // Upper legs
        var upperLeftLeg = new p2.Body({
            mass: 1,
            position: [-shouldersDistance / 2,lowerLeftLeg.position[1] + lowerLegLength / 2 + upperLegLength / 2],
        });
        var upperRightLeg = new p2.Body({
            mass: 1,
            position: [shouldersDistance / 2,lowerRightLeg.position[1] + lowerLegLength / 2 + upperLegLength / 2],
        });
        upperLeftLeg.addShape(upperLegShapeLeft);
        upperRightLeg.addShape(upperLegShapeRight);
        this.scene.world.addBody(upperLeftLeg);
        this.scene.world.addBody(upperRightLeg);

        // Pelvis
        var pelvis = new p2.Body({
            mass: 1,
            position: [0,upperLeftLeg.position[1] + upperLegLength / 2 + pelvisLength / 2],
        });
        pelvis.addShape(pelvisShape);
        this.scene.world.addBody(pelvis);

        // Upper body
        var upperBody = new p2.Body({
            mass: 1,
            position: [0,pelvis.position[1] + pelvisLength / 2 + upperBodyLength / 2],
        });
        upperBody.addShape(upperBodyShape);
        this.scene.world.addBody(upperBody);

        // Head
        var head = new p2.Body({
            mass: 1,
            position: [0,upperBody.position[1] + upperBodyLength / 2 + headRadius + neckLength],
        });
        head.addShape(headShape);
        this.scene.world.addBody(head);

        // Upper arms
        var upperLeftArm = new p2.Body({
            mass: 1,
            position: [-shouldersDistance / 2 - upperArmLength / 2,upperBody.position[1] + upperBodyLength / 2],
        });
        var upperRightArm = new p2.Body({
            mass: 1,
            position: [shouldersDistance / 2 + upperArmLength / 2,upperBody.position[1] + upperBodyLength / 2],
        });
        upperLeftArm.addShape(upperArmShapeLeft);
        upperRightArm.addShape(upperArmShapeRight);
        this.scene.world.addBody(upperLeftArm);
        this.scene.world.addBody(upperRightArm);

        // lower arms
        var lowerLeftArm = new p2.Body({
            mass: 1,
            position: [upperLeftArm.position[0] - lowerArmLength / 2 - upperArmLength / 2,
                upperLeftArm.position[1]],
        });
        var lowerRightArm = new p2.Body({
            mass: 1,
            position: [upperRightArm.position[0] + lowerArmLength / 2 + upperArmLength / 2,
                upperRightArm.position[1]],
        });
        lowerLeftArm.addShape(lowerArmShapeLeft);
        lowerRightArm.addShape(lowerArmShapeRight);
        this.scene.world.addBody(lowerLeftArm);
        this.scene.world.addBody(lowerRightArm);


        // Neck joint
        var neckJoint = new p2.RevoluteConstraint(head,upperBody,{
            localPivotA: [0,-headRadius - neckLength / 2],
            localPivotB: [0,upperBodyLength / 2],
        });
        neckJoint.setLimits(-Math.PI / 8,Math.PI / 8);
        this.scene.world.addConstraint(neckJoint);

        // Knee joints
        var leftKneeJoint = new p2.RevoluteConstraint(lowerLeftLeg,upperLeftLeg,{
            localPivotA: [0,lowerLegLength / 2],
            localPivotB: [0,-upperLegLength / 2],
        });
        var rightKneeJoint = new p2.RevoluteConstraint(lowerRightLeg,upperRightLeg,{
            localPivotA: [0,lowerLegLength / 2],
            localPivotB: [0,-upperLegLength / 2],
        });
        leftKneeJoint.setLimits(-Math.PI / 8,Math.PI / 8);
        rightKneeJoint.setLimits(-Math.PI / 8,Math.PI / 8);
        this.scene.world.addConstraint(leftKneeJoint);
        this.scene.world.addConstraint(rightKneeJoint);

        // Hip joints
        var leftHipJoint = new p2.RevoluteConstraint(upperLeftLeg,pelvis,{
            localPivotA: [0,upperLegLength / 2],
            localPivotB: [-shouldersDistance / 2,-pelvisLength / 2],
        });
        var rightHipJoint = new p2.RevoluteConstraint(upperRightLeg,pelvis,{
            localPivotA: [0,upperLegLength / 2],
            localPivotB: [shouldersDistance / 2,-pelvisLength / 2],
        });
        leftHipJoint.setLimits(-Math.PI / 8,Math.PI / 8);
        rightHipJoint.setLimits(-Math.PI / 8,Math.PI / 8);
        this.scene.world.addConstraint(leftHipJoint);
        this.scene.world.addConstraint(rightHipJoint);

        // Spine
        var spineJoint = new p2.RevoluteConstraint(pelvis,upperBody,{
            localPivotA: [0,pelvisLength / 2],
            localPivotB: [0,-upperBodyLength / 2],
        });
        spineJoint.setLimits(-Math.PI / 8,Math.PI / 8);
        this.scene.world.addConstraint(spineJoint);

        // Shoulders
        var leftShoulder = new p2.RevoluteConstraint(upperBody,upperLeftArm,{
            localPivotA: [-shouldersDistance / 2,upperBodyLength / 2],
            localPivotB: [upperArmLength / 2,0],
        });
        var rightShoulder = new p2.RevoluteConstraint(upperBody,upperRightArm,{
            localPivotA: [shouldersDistance / 2,upperBodyLength / 2],
            localPivotB: [-upperArmLength / 2,0],
        });
        leftShoulder.setLimits(-Math.PI / 3,Math.PI / 3);
        rightShoulder.setLimits(-Math.PI / 3,Math.PI / 3);
        this.scene.world.addConstraint(leftShoulder);
        this.scene.world.addConstraint(rightShoulder);

        // Elbow joint
        var leftElbowJoint = new p2.RevoluteConstraint(lowerLeftArm,upperLeftArm,{
            localPivotA: [lowerArmLength / 2,0],
            localPivotB: [-upperArmLength / 2,0],
        });
        var rightElbowJoint = new p2.RevoluteConstraint(lowerRightArm,upperRightArm,{
            localPivotA: [-lowerArmLength / 2,0],
            localPivotB: [upperArmLength / 2,0],
        });
        leftElbowJoint.setLimits(-Math.PI / 8,Math.PI / 8);
        rightElbowJoint.setLimits(-Math.PI / 8,Math.PI / 8);
        this.scene.world.addConstraint(leftElbowJoint);
        this.scene.world.addConstraint(rightElbowJoint);

        // Create ground
        var planeShape = new p2.Plane();
        var plane = new p2.Body({
            position: [0,-1],
        });
        plane.addShape(planeShape);
        planeShape.collisionGroup = GROUND;
        planeShape.collisionMask = BODYPARTS | OTHER;
        this.scene.world.addBody(plane);

        
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
