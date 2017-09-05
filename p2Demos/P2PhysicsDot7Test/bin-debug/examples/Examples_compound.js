var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * compound
 * 子shape皮肤各自放在displays数组中，渲染时候分别操作位置和旋转
 * @author
 *
 */
var Examples_compound = (function (_super) {
    __extends(Examples_compound, _super);
    function Examples_compound() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded2stage, _this);
        return _this;
    }
    Examples_compound.prototype.onAdded2stage = function (e) {
        this.scene = new jbP2.SimpleP2Scene(this.stage, this);
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage, this, this.scene.world);
        var tembody;
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 0, 240, 10, 480, 0, p2.Body.STATIC); //left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 800, 240, 10, 480, 0, p2.Body.STATIC); //right wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world, this.scene.dispCtn, 400, 400, 800, 20, 0, p2.Body.STATIC); //middle static
        tembody = jbP2.P2Space.addOneBall(this.scene.world, this.scene.dispCtn, 100, 100, 20, 10, p2.Body.DYNAMIC); //ball1
        tembody.allowSleep = false;
        var cpd1 = this.createCompound_BoxBox(100, 100, 40, 60, 15, p2.Body.DYNAMIC);
        var cpd2 = this.createCompound_BallBall(200, 150, 20, 60, 0, p2.Body.DYNAMIC);
        var cpd3 = this.createCompound_BoxBall(300, 200, 40, 60, 15, p2.Body.DYNAMIC);
        var cpd4 = this.createCompound_BoxCapsule(400, 250, 40, 20, 15, p2.Body.DYNAMIC);
        var cpd5 = this.createCompound_BallCapsule(500, 300, 40, 20, 15, p2.Body.DYNAMIC);
    };
    Examples_compound.prototype.createCompound_BoxBox = function (px, py, pw, ph, pAngle, type) {
        //在物理世界中的位置
        var p2x = jbP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
        var p2y = jbP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
        var p2Wid = jbP2.P2Space.convertEgretValueToP2(pw);
        var p2Hei = jbP2.P2Space.convertEgretValueToP2(ph);
        var p2Angle = jbP2.P2Space.convertEgretAngleToP2(pAngle);
        var boxShape1 = new p2.Box({ width: p2Wid, height: p2Hei });
        var boxOffset1 = [-40, 0];
        boxOffset1[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[0]);
        boxOffset1[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[1]);
        var boxSkin1 = jbP2.DispUtil.createBox(pw, ph);
        var boxAngle1 = jbP2.P2Space.convertEgretAngleToP2(10);
        var boxShape2 = new p2.Box({ width: p2Wid, height: p2Hei });
        var boxOffset2 = [40, 0];
        boxOffset2[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[0]);
        boxOffset2[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[1]);
        var boxSkin2 = jbP2.DispUtil.createBox(pw, ph);
        var boxAngle2 = jbP2.P2Space.convertEgretAngleToP2(-10);
        var boxShape3 = new p2.Box({ width: p2Hei, height: p2Hei });
        var boxOffset3 = [0, 80];
        boxOffset3[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset3[0]);
        boxOffset3[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset3[1]);
        var boxSkin3 = jbP2.DispUtil.createBox(ph, ph);
        var boxAngle3 = jbP2.P2Space.convertEgretAngleToP2(0);
        var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
        body.type = type;
        body.addShape(boxShape1, boxOffset1, boxAngle1); //添加shape1
        body.addShape(boxShape2, boxOffset2, boxAngle2); //..shape2
        body.addShape(boxShape3, boxOffset3, boxAngle3);
        this.scene.dispCtn.addChild(boxSkin1); //把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin2); //把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin3);
        body.displays = [boxSkin1, boxSkin2, boxSkin3]; //添加shapes对应的皮肤
        body.allowSleep = false;
        //Moves the shape offsets so their center of mass becomes the body center of mass.
        body.adjustCenterOfMass();
        //Updates.inertia, .invMass, .invInertia for this Body.Should be called when changing the structure or mass of the Body.
        body.mass = 2;
        body.updateMassProperties();
        this.scene.world.addBody(body);
        console.log("createCompound_BoxBox");
        return body;
    };
    Examples_compound.prototype.createCompound_BallBall = function (px, py, pw, ph, pAngle, type) {
        //在物理世界中的位置
        var p2x = jbP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
        var p2y = jbP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
        var p2Wid = jbP2.P2Space.convertEgretValueToP2(pw);
        var p2Angle = jbP2.P2Space.convertEgretAngleToP2(pAngle);
        var boxShape1 = new p2.Circle({ radius: p2Wid });
        var boxOffset1 = [-40, 0];
        boxOffset1[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[0]);
        boxOffset1[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[1]);
        var boxSkin1 = jbP2.DispUtil.createBall(pw);
        var boxShape2 = new p2.Circle({ radius: p2Wid });
        var boxOffset2 = [40, 0];
        boxOffset2[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[0]);
        boxOffset2[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[1]);
        var boxSkin2 = jbP2.DispUtil.createBall(pw);
        var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
        body.type = type;
        body.addShape(boxShape1, boxOffset1); //添加shape1
        body.addShape(boxShape2, boxOffset2); //..shape2
        this.scene.dispCtn.addChild(boxSkin1); //把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin2); //把shape皮肤添加到显示列表
        body.displays = [boxSkin1, boxSkin2]; //添加shapes对应的皮肤
        body.allowSleep = false;
        //Moves the shape offsets so their center of mass becomes the body center of mass.
        body.adjustCenterOfMass();
        //Updates.inertia, .invMass, .invInertia for this Body.Should be called when changing the structure or mass of the Body.
        body.mass = 2;
        body.updateMassProperties();
        this.scene.world.addBody(body);
        console.log("createCompound_BallBall");
        return body;
    };
    Examples_compound.prototype.createCompound_BoxBall = function (px, py, pw, ph, pAngle, type) {
        //在物理世界中的位置
        var p2x = jbP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
        var p2y = jbP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
        var p2Wid = jbP2.P2Space.convertEgretValueToP2(pw);
        var p2Hei = jbP2.P2Space.convertEgretValueToP2(ph);
        var p2Angle = jbP2.P2Space.convertEgretAngleToP2(pAngle);
        var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
        body.type = type;
        var boxShape1 = new p2.Box({ width: p2Wid, height: p2Hei });
        var boxOffset1 = [-40, 0];
        boxOffset1[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[0]);
        boxOffset1[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[1]);
        var boxSkin1 = jbP2.DispUtil.createBox(pw, ph);
        var boxAngle1 = jbP2.P2Space.convertEgretAngleToP2(10);
        body.addShape(boxShape1, [2, 0], boxAngle1); //添加shape1
        var boxShape2 = new p2.Circle({ radius: p2Wid * .5 });
        var boxOffset2 = [50, 0];
        boxOffset2[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[0]);
        boxOffset2[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[1]);
        var boxSkin2 = jbP2.DispUtil.createBall(pw * .5);
        var boxAngle2 = jbP2.P2Space.convertEgretAngleToP2(-10);
        body.addShape(boxShape2, [0, 0], boxAngle2); //..shape2
        this.scene.dispCtn.addChild(boxSkin1); //把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin2); //把shape皮肤添加到显示列表
        body.displays = [boxSkin1, boxSkin2]; //添加shapes对应的皮肤
        body.allowSleep = false;
        //Moves the shape offsets so their center of mass becomes the body center of mass.
        body.adjustCenterOfMass();
        //Updates.inertia, .invMass, .invInertia for this Body.Should be called when changing the structure or mass of the Body.
        body.mass = 2;
        body.updateMassProperties();
        this.scene.world.addBody(body);
        console.log("createCompound_BoxBall");
        return body;
    };
    Examples_compound.prototype.createCompound_BoxCapsule = function (px, py, pw, ph, pAngle, type) {
        //在物理世界中的位置
        var p2x = jbP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
        var p2y = jbP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
        var p2Wid = jbP2.P2Space.convertEgretValueToP2(pw);
        var p2Hei = jbP2.P2Space.convertEgretValueToP2(ph);
        var p2Angle = jbP2.P2Space.convertEgretAngleToP2(pAngle);
        var boxShape1 = new p2.Box({ width: p2Wid, height: p2Hei });
        var boxOffset1 = [-40, 0];
        boxOffset1[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[0]);
        boxOffset1[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[1]);
        var boxSkin1 = jbP2.DispUtil.createBox(pw, ph);
        var boxAngle1 = jbP2.P2Space.convertEgretAngleToP2(10);
        var boxShape2 = new p2.Capsule({ length: p2Wid, radius: p2Hei * .5 }); //new p2.Box({ width: p2Wid,height: p2Hei });
        var boxOffset2 = [40, 0];
        boxOffset2[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[0]);
        boxOffset2[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[1]);
        var boxSkin2 = jbP2.DispUtil.createCapsule(pw, ph * .5);
        var boxAngle2 = jbP2.P2Space.convertEgretAngleToP2(-10);
        var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
        body.type = type;
        body.addShape(boxShape1, boxOffset1, boxAngle1); //添加shape1
        body.addShape(boxShape2, boxOffset2, boxAngle2); //..shape2
        this.scene.dispCtn.addChild(boxSkin1); //把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin2); //把shape皮肤添加到显示列表
        body.displays = [boxSkin1, boxSkin2]; //添加shapes对应的皮肤
        body.allowSleep = false;
        //Moves the shape offsets so their center of mass becomes the body center of mass.
        body.adjustCenterOfMass();
        //Updates.inertia, .invMass, .invInertia for this Body.Should be called when changing the structure or mass of the Body.
        body.mass = 2;
        body.updateMassProperties();
        this.scene.world.addBody(body);
        console.log("createCompound_BoxCapsule");
        return body;
    };
    Examples_compound.prototype.createCompound_BallCapsule = function (px, py, pw, ph, pAngle, type) {
        //在物理世界中的位置
        var p2x = jbP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
        var p2y = jbP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
        var p2Wid = jbP2.P2Space.convertEgretValueToP2(pw);
        var p2Hei = jbP2.P2Space.convertEgretValueToP2(ph);
        var p2Angle = jbP2.P2Space.convertEgretAngleToP2(pAngle);
        var boxShape1 = new p2.Circle({ radius: p2Wid });
        var boxOffset1 = [-40, 0];
        boxOffset1[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[0]);
        boxOffset1[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset1[1]);
        var boxSkin1 = jbP2.DispUtil.createBall(pw);
        var boxShape2 = new p2.Capsule({ length: p2Wid, radius: p2Hei * .5 }); //new p2.Box({ width: p2Wid,height: p2Hei });
        var boxOffset2 = [40, 0];
        boxOffset2[0] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[0]);
        boxOffset2[1] = jbP2.P2Space.convertEgretValueToP2(boxOffset2[1]);
        var boxSkin2 = jbP2.DispUtil.createCapsule(pw, ph * .5);
        var boxAngle2 = jbP2.P2Space.convertEgretAngleToP2(-10);
        var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
        body.type = type;
        body.addShape(boxShape1, boxOffset1, 0); //添加shape1
        body.addShape(boxShape2, boxOffset2, boxAngle2); //..shape2
        this.scene.dispCtn.addChild(boxSkin1); //把shape皮肤添加到显示列表
        this.scene.dispCtn.addChild(boxSkin2); //把shape皮肤添加到显示列表
        body.displays = [boxSkin1, boxSkin2]; //添加shapes对应的皮肤
        body.allowSleep = false;
        //Moves the shape offsets so their center of mass becomes the body center of mass.
        body.adjustCenterOfMass();
        //Updates.inertia, .invMass, .invInertia for this Body.Should be called when changing the structure or mass of the Body.
        body.mass = 2;
        body.updateMassProperties();
        this.scene.world.addBody(body);
        console.log("createCompound_BoxCapsule");
        return body;
    };
    return Examples_compound;
}(egret.Sprite));
__reflect(Examples_compound.prototype, "Examples_compound");
//# sourceMappingURL=Examples_compound.js.map