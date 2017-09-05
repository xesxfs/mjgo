
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/physics/physics.js",
	"libs/modules/dragonBones/dragonBones.js",
	"bin-debug/examples/Examples_keyManager.js",
	"bin-debug/examples/Examples_addBasicBody.js",
	"bin-debug/examples/Examples_addBasicBody0.js",
	"bin-debug/examples/Examples_addBasicBody2.js",
	"bin-debug/examples/Examples_addBasicBody3.js",
	"bin-debug/examples/Examples_angleJoint.js",
	"bin-debug/examples/Examples_applyForce.js",
	"bin-debug/examples/Examples_applyImpulse.js",
	"bin-debug/examples/Examples_armatureToRagdoll.js",
	"bin-debug/examples/Examples_bodyEmitEvt.js",
	"bin-debug/examples/Examples_box.js",
	"bin-debug/examples/Examples_breakable.js",
	"bin-debug/examples/Examples_buoyancy.js",
	"bin-debug/examples/Examples_buoyancy2.js",
	"bin-debug/examples/Examples_capsule.js",
	"bin-debug/examples/Examples_carSuspension.js",
	"bin-debug/examples/Examples_carWheelFrictionTest.js",
	"bin-debug/examples/Examples_carWithAnglarForce.js",
	"bin-debug/examples/Examples_carWithMotor.js",
	"bin-debug/examples/Examples_ccd.js",
	"bin-debug/examples/Examples_character.js",
	"bin-debug/examples/Examples_collisionGroupMask.js",
	"bin-debug/examples/Examples_compound.js",
	"bin-debug/examples/Examples_concave.js",
	"bin-debug/examples/Examples_convex.js",
	"bin-debug/examples/Examples_dirtBike.js",
	"bin-debug/examples/Examples_dirtBike2.js",
	"bin-debug/examples/Examples_dirtBikeEncapsulated.js",
	"bin-debug/examples/Examples_dirtBikeEncapsulated2.js",
	"bin-debug/examples/Examples_dirtBikeKeyCtrl.js",
	"bin-debug/examples/Examples_dirtBikeTextured.js",
	"bin-debug/examples/Examples_distanceContraint.js",
	"bin-debug/examples/Examples_fixedRotation.js",
	"bin-debug/examples/Examples_fixedXY.js",
	"bin-debug/examples/Examples_forceField.js",
	"bin-debug/examples/Examples_frictions.js",
	"bin-debug/examples/Examples_frictionsCar.js",
	"bin-debug/examples/Examples_gearConstraint.js",
	"bin-debug/examples/Examples_heightField.js",
	"bin-debug/examples/Examples_interplation.js",
	"bin-debug/examples/Examples_islandSolver.js",
	"bin-debug/examples/Examples_addBasicBody0_1.js",
	"bin-debug/examples/Examples_kinematic.js",
	"bin-debug/examples/Examples_lock.js",
	"bin-debug/examples/Examples_lockChangingLocalPt.js",
	"bin-debug/examples/Examples_multiWheelsVehicle.js",
	"bin-debug/examples/Examples_p2MouseJt.js",
	"bin-debug/examples/Examples_piston.js",
	"bin-debug/examples/Examples_pivotJoint.js",
	"bin-debug/examples/Examples_prismaticAndSpring.js",
	"bin-debug/examples/Examples_prismaticBasic.js",
	"bin-debug/examples/Examples_ragdoll.js",
	"bin-debug/examples/Examples_raycast.js",
	"bin-debug/examples/Examples_rayReflect.js",
	"bin-debug/examples/Examples_rayRefract.js",
	"bin-debug/examples/Examples_restitution.js",
	"bin-debug/examples/Examples_rotationSpring.js",
	"bin-debug/examples/Examples_rotationSpringDamping.js",
	"bin-debug/examples/Examples_sensor.js",
	"bin-debug/examples/Examples_sensor2.js",
	"bin-debug/examples/Examples_simpleSceneEncap.js",
	"bin-debug/examples/Examples_surfaceVelocity_tractor_capsual.js",
	"bin-debug/examples/Examples_surfaceVelocity_tractor.js",
	"bin-debug/examples/Examples_surfaceVelocity.js",
	"bin-debug/examples/Examples_suspension.js",
	"bin-debug/examples/Examples_topdownVehicle.js",
	"bin-debug/examples/Examples_toWorldFrame.js",
	"bin-debug/examples/Examples_worldImpact.js",
	"bin-debug/examples/Examples_worldImpact2.js",
	"bin-debug/examples/Template_p2DebugDraw.js",
	"bin-debug/jbP2/DispUtil.js",
	"bin-debug/jbP2/KeyManager.js",
	"bin-debug/jbP2/MouseJointHelper.js",
	"bin-debug/jbP2/P2MouseJointHelper.js",
	"bin-debug/jbP2/P2SpaceUtil.js",
	"bin-debug/jbP2/SimpleP2Scene.js",
	"bin-debug/jbP2/VehicleSteeringCtrl.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/p2DebugDraw.js",
	"bin-debug/p2Objs/DirtBike.js",
	"bin-debug/p2Objs/DirtBike2.js",
	"bin-debug/p2Objs/DirtBikeTextured.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 800,
		contentHeight: 480,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};