var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 车辆方向控制类
 * 触控和键盘来实现控制
 * @author
 *
 */
var VehicleSteeringCtrl = (function (_super) {
    __extends(VehicleSteeringCtrl, _super);
    function VehicleSteeringCtrl() {
        var _this = _super.call(this) || this;
        _this.dirH_touch = 0;
        _this.dirV_touch = 0;
        _this.jump_touch = 0;
        _this.dirH_keyboard = 0;
        _this.dirV_keyboard = 0;
        _this.jump_keyboard = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedStage, _this);
        return _this;
    }
    VehicleSteeringCtrl.prototype.onAddedStage = function (e) {
        this.setupUI();
        jbP2.KeyManager.init();
        egret.Ticker.getInstance().register(this.update, this); //
    };
    VehicleSteeringCtrl.prototype.setupUI = function () {
        this.btnHor = jbP2.DispUtil.createBitmapByName("rect");
        this.btnHor.x = this.btnHor.width * .5;
        this.btnHor.y = this.btnHor.height * .5 + 100;
        this.btnHor.touchEnabled = true;
        this.addChild(this.btnHor);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnHorTouchBegin, this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnHorTouchMove, this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnHorTouchEnd, this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnHorTouchEnd, this);
        this.btnVer = jbP2.DispUtil.createBitmapByName("rect");
        this.btnVer.x = this.stage.stageWidth - this.btnHor.width * .5;
        this.btnVer.y = this.btnVer.height * .5 + 100;
        this.btnVer.touchEnabled = true;
        this.addChild(this.btnVer);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnVerTouchBegin, this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnVerTouchMove, this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnVerTouchEnd, this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnVerTouchEnd, this);
        this.btnJump = jbP2.DispUtil.createBitmapByName("rect");
        this.btnJump.x = this.btnHor.width * .5;
        this.btnJump.y = this.btnHor.y + this.btnHor.height + 100;
        this.btnJump.touchEnabled = true;
        this.addChild(this.btnJump);
        this.btnJump.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnJumpTouchBegin, this);
        this.btnJump.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnJumpTouchMove, this);
        this.btnJump.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnJumpTouchEnd, this);
        this.btnJump.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnJumpTouchEnd, this);
    };
    VehicleSteeringCtrl.prototype.onBtnJumpTouchBegin = function (e) {
        this.jump_touch = 1;
    };
    VehicleSteeringCtrl.prototype.onBtnJumpTouchMove = function (e) {
        this.jump_touch = 1;
    };
    VehicleSteeringCtrl.prototype.onBtnJumpTouchEnd = function (e) {
        this.jump_touch = 0;
    };
    VehicleSteeringCtrl.prototype.onBtnHorTouchBegin = function (e) {
        this.updateDirHorizontalValue(e.stageX, e.stageY);
    };
    VehicleSteeringCtrl.prototype.onBtnHorTouchMove = function (e) {
        this.updateDirHorizontalValue(e.stageX, e.stageY);
    };
    VehicleSteeringCtrl.prototype.onBtnHorTouchEnd = function (e) {
        this.dirH_touch = 0;
    };
    VehicleSteeringCtrl.prototype.updateDirHorizontalValue = function (stageX, stageY) {
        var local = this.btnHor.globalToLocal(stageX, stageY);
        if (local.x > this.btnHor.width * 0.5) {
            this.dirH_touch = 1;
        }
        else {
            this.dirH_touch = -1;
        }
    };
    VehicleSteeringCtrl.prototype.onBtnVerTouchBegin = function (e) {
        this.updateDirVerzontalValue(e.stageX, e.stageY);
    };
    VehicleSteeringCtrl.prototype.onBtnVerTouchMove = function (e) {
        this.updateDirVerzontalValue(e.stageY, e.stageY);
    };
    VehicleSteeringCtrl.prototype.onBtnVerTouchEnd = function (e) {
        this.dirV_touch = 0;
    };
    VehicleSteeringCtrl.prototype.updateDirVerzontalValue = function (stageX, stageY) {
        var local = this.btnVer.globalToLocal(stageX, stageY);
        if (local.y > this.btnVer.height * 0.5) {
            this.dirV_touch = -1;
        }
        else {
            this.dirV_touch = 1;
        }
    };
    VehicleSteeringCtrl.prototype.update = function () {
        //keyboard ctrl-----------------------
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.UP)) {
            this.dirV_keyboard = 1;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.DOWN)) {
            this.dirV_keyboard = -1;
        }
        else {
            this.dirV_keyboard = 0;
        }
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            this.dirH_keyboard = -1;
        }
        else if (jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            this.dirH_keyboard = 1;
        }
        else {
            this.dirH_keyboard = 0;
        }
        if (jbP2.KeyManager.isDown(jbP2.KeyManager.SPACE)) {
            this.jump_keyboard = 1;
        }
        else {
            this.jump_keyboard = 0;
        }
        //keyboard ctrl-----------------------
        var finalDirV;
        if (this.dirV_touch != 0) {
            finalDirV = this.dirV_touch;
        }
        if (this.dirV_keyboard != 0) {
            finalDirV = this.dirV_keyboard;
        }
        var finalDirH;
        if (this.dirH_touch != 0) {
            finalDirH = this.dirH_touch;
        }
        if (this.dirH_keyboard != 0) {
            finalDirH = this.dirH_keyboard;
        }
        var finalJump;
        if (this.jump_touch != 0) {
            finalJump = this.jump_touch;
        }
        if (this.jump_keyboard != 0) {
            finalJump = this.jump_keyboard;
        }
        //更新车辆方向
        if (this.vehicle != null) {
            this.vehicle.updateSteering(finalDirH, finalDirV);
            if (finalJump == 1 && this.vehicle.jump) {
                this.vehicle.jump();
            }
        }
    };
    return VehicleSteeringCtrl;
}(egret.Sprite));
__reflect(VehicleSteeringCtrl.prototype, "VehicleSteeringCtrl");
//# sourceMappingURL=VehicleSteeringCtrl.js.map