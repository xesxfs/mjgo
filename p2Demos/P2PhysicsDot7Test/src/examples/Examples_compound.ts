/**
 * compound
 * 子shape皮肤各自放在displays数组中，渲染时候分别操作位置和旋转
 * @author 
 *
 */
class Examples_compound extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);        
    }

    private onAdded2stage(e: egret.Event): void {
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage,this,this.scene.world);

        var tembody: p2.Body;

        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        
        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,100,100,20,10,p2.Body.DYNAMIC);//ball1
        tembody.allowSleep = false;
        
        var cpd1 = this.createCompound_BoxBox(100,100,40,60,15,p2.Body.DYNAMIC);
        var cpd2 = this.createCompound_BallBall(200,150,20,60,0,p2.Body.DYNAMIC);
        var cpd3 = this.createCompound_BoxBall(300,200,40,60,15,p2.Body.DYNAMIC);
        var cpd4 = this.createCompound_BoxCapsule(400,250,40,20,15,p2.Body.DYNAMIC);
        var cpd5 = this.createCompound_BallCapsule(500,300,40,20,15,p2.Body.DYNAMIC);
    }
    
    private createCompound_BoxBox(px: number,py: number,pw: number,ph: number,pAngle: number,type: number):p2.Body{
        //在物理世界中的位置
        var p2x: number = jbP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
        var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
        var p2Wid: number = jbP2.P2Space.convertEgretValueToP2(pw);
        var p2Hei: number = jbP2.P2Space.convertEgretValueToP2(ph);
        var p2Angle: number = jbP2.P2Space.convertEgretAngleToP2(pAngle);

        var boxShape1: p2.Shape = new p2.Box({ width: p2Wid,height: p2Hei }); 
        var boxOffset1 = [-40,0];
        boxOffset1[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[0]);
        boxOffset1[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[1]);
        var boxSkin1 = jbP2.DispUtil.createBox(pw,ph);
        var boxAngle1 = jbP2.P2Space.convertEgretAngleToP2(10);
        
        var boxShape2: p2.Shape = new p2.Box({ width: p2Wid,height: p2Hei }); 
        var boxOffset2 = [40,0];
        boxOffset2[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[0]);
        boxOffset2[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[1]);
        var boxSkin2 = jbP2.DispUtil.createBox(pw,ph);
        var boxAngle2 = jbP2.P2Space.convertEgretAngleToP2(-10);
        
        var boxShape3: p2.Shape = new p2.Box({ width: p2Hei,height: p2Hei });
        var boxOffset3 = [0,80];
        boxOffset3[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset3[0]);
        boxOffset3[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset3[1]);
        var boxSkin3 = jbP2.DispUtil.createBox(ph,ph);
        var boxAngle3 = jbP2.P2Space.convertEgretAngleToP2(0);
        
        var body: p2.Body = new p2.Body({ mass: 1,position: [p2x,p2y],angle: p2Angle });
        body.type = type;
        body.addShape(boxShape1,boxOffset1,boxAngle1);//添加shape1
        body.addShape(boxShape2,boxOffset2,boxAngle2);//..shape2
        body.addShape(boxShape3,boxOffset3,boxAngle3);
        
        
        this.scene.dispCtn.addChild(boxSkin1);//把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin2);//把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin3);
        body.displays = [boxSkin1,boxSkin2,boxSkin3];//添加shapes对应的皮肤
        body.allowSleep = false;
        
        //Moves the shape offsets so their center of mass becomes the body center of mass.
        body.adjustCenterOfMass();
        
        //Updates.inertia, .invMass, .invInertia for this Body.Should be called when changing the structure or mass of the Body.
        body.mass = 2;
        body.updateMassProperties();
        
        this.scene.world.addBody(body);
        console.log("createCompound_BoxBox");
        return body;
    }
    

    private createCompound_BallBall(px: number,py: number,pw: number,ph: number,pAngle: number,type: number): p2.Body {
        //在物理世界中的位置
        var p2x: number = jbP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
        var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
        var p2Wid: number = jbP2.P2Space.convertEgretValueToP2(pw);
        var p2Angle: number = jbP2.P2Space.convertEgretAngleToP2(pAngle);

        var boxShape1: p2.Shape = new p2.Circle({ radius: p2Wid });
        var boxOffset1 = [-40,0];
        boxOffset1[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[0]);
        boxOffset1[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[1]);
        var boxSkin1 = jbP2.DispUtil.createBall(pw);
        

        var boxShape2: p2.Shape = new p2.Circle({radius:p2Wid});
        var boxOffset2 = [40,0];
        boxOffset2[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[0]);
        boxOffset2[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[1]);
        var boxSkin2 = jbP2.DispUtil.createBall(pw);
        

        var body: p2.Body = new p2.Body({ mass: 1,position: [p2x,p2y],angle: p2Angle });
        body.type = type;
        body.addShape(boxShape1,boxOffset1);//添加shape1
        body.addShape(boxShape2,boxOffset2);//..shape2
        
        
        this.scene.dispCtn.addChild(boxSkin1);//把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin2);//把shape皮肤添加到显示列表
        body.displays = [boxSkin1,boxSkin2];//添加shapes对应的皮肤
        body.allowSleep = false;
        
        //Moves the shape offsets so their center of mass becomes the body center of mass.
        body.adjustCenterOfMass();
        
        //Updates.inertia, .invMass, .invInertia for this Body.Should be called when changing the structure or mass of the Body.
        body.mass = 2;
        body.updateMassProperties();

        this.scene.world.addBody(body);
        console.log("createCompound_BallBall");
        return body;
    }
    
    private createCompound_BoxBall(px: number,py: number,pw: number,ph: number,pAngle: number,type: number): p2.Body {
        //在物理世界中的位置
        var p2x: number = jbP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
        var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
        var p2Wid: number = jbP2.P2Space.convertEgretValueToP2(pw);
        var p2Hei: number = jbP2.P2Space.convertEgretValueToP2(ph);
        var p2Angle: number = jbP2.P2Space.convertEgretAngleToP2(pAngle);

        var body: p2.Body = new p2.Body({ mass: 1,position: [p2x,p2y],angle: p2Angle });
        body.type = type;
        

        var boxShape1: p2.Shape = new p2.Box({ width: p2Wid,height: p2Hei });
        var boxOffset1 = [-40,0];
        boxOffset1[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[0]);
        boxOffset1[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[1]);
        var boxSkin1 = jbP2.DispUtil.createBox(pw,ph);
        var boxAngle1 = jbP2.P2Space.convertEgretAngleToP2(10);
        body.addShape(boxShape1,[2,0],boxAngle1);//添加shape1


        var boxShape2: p2.Shape = new p2.Circle({ radius: p2Wid*.5 });
        var boxOffset2 = [50,0];
        boxOffset2[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[0]);
        boxOffset2[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[1]);
        var boxSkin2 = jbP2.DispUtil.createBall(pw*.5);
        var boxAngle2 = jbP2.P2Space.convertEgretAngleToP2(-10);
        body.addShape(boxShape2,[0,0],boxAngle2);//..shape2
        

        this.scene.dispCtn.addChild(boxSkin1);//把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin2);//把shape皮肤添加到显示列表
        
        body.displays = [boxSkin1,boxSkin2];//添加shapes对应的皮肤
        body.allowSleep = false;
        
        //Moves the shape offsets so their center of mass becomes the body center of mass.
        body.adjustCenterOfMass();
        
        //Updates.inertia, .invMass, .invInertia for this Body.Should be called when changing the structure or mass of the Body.
        body.mass = 2;
        body.updateMassProperties();

        this.scene.world.addBody(body);
        console.log("createCompound_BoxBall");
        return body;
    }
 
    private createCompound_BoxCapsule(px: number,py: number,pw: number,ph: number,pAngle: number,type: number): p2.Body {
        //在物理世界中的位置
        var p2x: number = jbP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
        var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
        var p2Wid: number = jbP2.P2Space.convertEgretValueToP2(pw);
        var p2Hei: number = jbP2.P2Space.convertEgretValueToP2(ph);
        var p2Angle: number = jbP2.P2Space.convertEgretAngleToP2(pAngle);

        var boxShape1: p2.Shape = new p2.Box({ width: p2Wid,height: p2Hei });
        var boxOffset1 = [-40,0];
        boxOffset1[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[0]);
        boxOffset1[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[1]);
        var boxSkin1 = jbP2.DispUtil.createBox(pw,ph);
        var boxAngle1 = jbP2.P2Space.convertEgretAngleToP2(10);

        
        var boxShape2: p2.Shape = new p2.Capsule({ length: p2Wid,radius: p2Hei*.5 });//new p2.Box({ width: p2Wid,height: p2Hei });
        var boxOffset2 = [40,0];
        boxOffset2[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[0]);
        boxOffset2[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[1]);
        var boxSkin2 = jbP2.DispUtil.createCapsule(pw,ph*.5);
        var boxAngle2 = jbP2.P2Space.convertEgretAngleToP2(-10);



        var body: p2.Body = new p2.Body({ mass: 1,position: [p2x,p2y],angle: p2Angle });
        body.type = type;
        body.addShape(boxShape1,boxOffset1,boxAngle1);//添加shape1
        body.addShape(boxShape2,boxOffset2,boxAngle2);//..shape2

        this.scene.dispCtn.addChild(boxSkin1);//把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin2);//把shape皮肤添加到显示列表
        
        body.displays = [boxSkin1,boxSkin2];//添加shapes对应的皮肤
        body.allowSleep = false;
        
        //Moves the shape offsets so their center of mass becomes the body center of mass.
        body.adjustCenterOfMass();
        
        //Updates.inertia, .invMass, .invInertia for this Body.Should be called when changing the structure or mass of the Body.
        body.mass = 2;
        body.updateMassProperties();

        this.scene.world.addBody(body);
        console.log("createCompound_BoxCapsule");
        return body;
    }
    
    
    private createCompound_BallCapsule(px: number,py: number,pw: number,ph: number,pAngle: number,type: number): p2.Body {
        //在物理世界中的位置
        var p2x: number = jbP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
        var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
        var p2Wid: number = jbP2.P2Space.convertEgretValueToP2(pw);
        var p2Hei: number = jbP2.P2Space.convertEgretValueToP2(ph);
        var p2Angle: number = jbP2.P2Space.convertEgretAngleToP2(pAngle);

        var boxShape1: p2.Shape = new p2.Circle({ radius: p2Wid });
        var boxOffset1 = [-40,0];
        boxOffset1[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[0]);
        boxOffset1[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[1]);
        var boxSkin1 = jbP2.DispUtil.createBall(pw);


        var boxShape2: p2.Shape = new p2.Capsule({ length: p2Wid,radius: p2Hei * .5 });//new p2.Box({ width: p2Wid,height: p2Hei });
        var boxOffset2 = [40,0];
        boxOffset2[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[0]);
        boxOffset2[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[1]);
        var boxSkin2 = jbP2.DispUtil.createCapsule(pw,ph * .5);
        var boxAngle2 = jbP2.P2Space.convertEgretAngleToP2(-10);



        var body: p2.Body = new p2.Body({ mass: 1,position: [p2x,p2y],angle: p2Angle });
        body.type = type;
        body.addShape(boxShape1,boxOffset1,0);//添加shape1
        body.addShape(boxShape2,boxOffset2,boxAngle2);//..shape2

        this.scene.dispCtn.addChild(boxSkin1);//把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin2);//把shape皮肤添加到显示列表
        
        body.displays = [boxSkin1,boxSkin2];//添加shapes对应的皮肤
        body.allowSleep = false;
        
        //Moves the shape offsets so their center of mass becomes the body center of mass.
        body.adjustCenterOfMass();
        
        //Updates.inertia, .invMass, .invInertia for this Body.Should be called when changing the structure or mass of the Body.
        body.mass = 2;
        body.updateMassProperties();

        this.scene.world.addBody(body);
        console.log("createCompound_BoxCapsule");
        return body;
    }
}
