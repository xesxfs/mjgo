var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 这个项目是为了测试p2 0.7版本，因为api变化比较大
*/
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var testValue = 9;
        switch (testValue) {
            case 0.1:
                this.addChild(new Examples_addBasicBody0);
                break;
            case 0.11:
                this.addChild(new Examples_addBasicBody0_1());
                break;
            case 0.2:
                this.addChild(new Examples_addBasicBody());
                break;
            case 0.3:
                this.addChild(new Examples_addBasicBody3());
                break;
            case 0.4:
                this.addChild(new Examples_addBasicBody2());
                break;
            case 2:
                this.addChild(new Examples_simpleSceneEncap());
                break;
            case 3:
                this.addChild(new Examples_pivotJoint());
                break;
            case 5:
                this.addChild(new Examples_box());
                break;
            case 5.1:
                this.addChild(new Examples_capsule());
                break;
            case 6:
                this.addChild(new Examples_carWheelFrictionTest());
                break;
            case 7:
                this.addChild(new Examples_carWithMotor());
                break;
            case 8:
                this.addChild(new Examples_carWithAnglarForce());
                break;
            case 9:
                this.addChild(new Examples_worldImpact());
                break;
            case 9.1:
                this.addChild(new Examples_worldImpact2());
                break;
            case 10:
                this.addChild(new Examples_sensor());
                break;
            case 10.1:
                this.addChild(new Examples_sensor2());
                break;
            case 11:
                this.addChild(new Examples_suspension());
                break;
            case 12:
                this.addChild(new Examples_prismaticAndSpring());
                break;
            case 13:
                this.addChild(new Examples_carSuspension());
                break;
            case 14:
                this.addChild(new Examples_prismaticBasic);
                break;
            case 15:
                this.addChild(new Examples_heightField());
                break;
            case 16:
                this.addChild(new Examples_restitution());
                break;
            case 17:
                this.addChild(new Examples_p2MouseJt());
                break;
            case 19:
                this.addChild(new Examples_angleJoint());
                break;
            case 20:
                this.addChild(new Examples_rotationSpring());
                break;
            case 21:
                this.addChild(new Examples_buoyancy());
                break;
            case 21.1:
                this.addChild(new Examples_buoyancy2());
                break;
            case 22:
                this.addChild(new Examples_lock());
                break;
            case 22.1:
                this.addChild(new Examples_lockChangingLocalPt());
                break;
            case 23:
                this.addChild(new Examples_gearConstraint());
                break;
            case 24:
                this.addChild(new Examples_surfaceVelocity());
                break;
            case 24.1:
                this.addChild(new Examples_surfaceVelocity_tractor());
                break;
            case 24.2:
                this.addChild(new Examples_surfaceVelocity_tractor_capsual());
                break;
            case 25:
                this.addChild(new Examples_breakable());
                break;
            case 26:
                this.addChild(new Examples_raycast());
                break;
            case 26.1:
                this.addChild(new Examples_rayReflect());
                break;
            case 26.2:
                this.addChild(new Examples_rayRefract());
                break;
            case 27:
                this.addChild(new Examples_dirtBike());
                break;
            case 28:
                this.addChild(new Examples_dirtBike2());
                break;
            case 29:
                this.addChild(new Examples_rotationSpringDamping());
                break;
            case 30:
                this.addChild(new Examples_keyManager());
                break;
            case 31:
                this.addChild(new Examples_dirtBikeKeyCtrl());
                break;
            case 32:
                this.addChild(new Examples_frictions());
                break;
            case 33:
                this.addChild(new Examples_frictionsCar());
                break;
            case 34:
                this.addChild(new Examples_multiWheelsVehicle());
                break;
            case 35:
                this.addChild(new Examples_dirtBikeEncapsulated());
                break;
            case 36:
                this.addChild(new Examples_dirtBikeEncapsulated2());
                break;
            case 37:
                this.addChild(new Examples_dirtBikeTextured());
                break;
            case 38:
                this.addChild(new Examples_collisionGroupMask());
                break;
            case 39:
                this.addChild(new Examples_convex());
                break;
            case 40:
                this.addChild(new Examples_ccd());
                break;
            case 41:
                this.addChild(new Examples_compound());
                break;
            case 42:
                this.addChild(new Examples_distanceContraint());
                break;
            case 43:
                this.addChild(new Examples_concave());
                break;
            case 44:
                this.addChild(new Examples_fixedRotation());
                break;
            case 45:
                this.addChild(new Examples_fixedXY());
                break;
            case 46:
                this.addChild(new Examples_topdownVehicle());
                break;
            case 47:
                this.addChild(new Examples_islandSolver());
                break;
            case 48:
                this.addChild(new Examples_ragdoll());
                break;
            case 49:
                this.addChild(new Examples_character());
                break;
            case 50:
                this.addChild(new Examples_piston());
                break;
            case 51:
                this.addChild(new Examples_kinematic());
                break;
            case 52:
                this.addChild(new Examples_interplation());
                break;
            case 53:
                this.addChild(new Examples_applyForce());
                break;
            case 54:
                this.addChild(new Examples_applyImpulse());
                break;
            case 55:
                this.addChild(new Examples_toWorldFrame());
                break;
            case 56:
                this.addChild(new Examples_bodyEmitEvt());
                break;
            case 57:
                this.addChild(new Examples_forceField());
                break;
            case 58:
                //                this.addChild(new Examples_armatureToRagdoll());
                break;
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map