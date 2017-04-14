var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author chenwei
 *
 */
var RoomBtn = (function (_super) {
    __extends(RoomBtn, _super);
    function RoomBtn() {
        var _this = _super.call(this) || this;
        _this.bounceTime = 1500;
        _this.skinName = "RoomBtnSkin";
        return _this;
    }
    RoomBtn.prototype.childrenCreated = function () {
        this.dwonGroupx = this.dwonGroup.x;
        this.dwonGroupy = this.dwonGroup.y;
        this.ox = this.x;
        this.oy = this.y;
    };
    Object.defineProperty(RoomBtn.prototype, "roomSource", {
        set: function (s) {
            this.roomBtn.source = s;
        },
        enumerable: true,
        configurable: true
    });
    RoomBtn.prototype.onEnable = function () {
        this.roomBtn.mask = this.maskRect;
        this.down();
    };
    RoomBtn.prototype.down = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        egret.Tween.get(this.dwonGroup).wait(500).to({ y: 130 }, this.bounceTime, egret.Ease.bounceOut);
        //        egret.Tween.get(this).wait(500).to({ y: this.oy+50 },this.bounceTime,egret.Ease.bounceOut);
    };
    RoomBtn.prototype.onTouch = function (e) {
        this.clickFun && this.clickFun.call(this.thisObj);
    };
    RoomBtn.prototype.up = function () {
        egret.Tween.get(this.dwonGroup).to({ y: this.dwonGroupy }, this.bounceTime, egret.Ease.bounceOut);
        egret.Tween.get(this).to({ y: this.oy }, this.bounceTime, egret.Ease.bounceOut).call(this.callBack, this);
    };
    RoomBtn.prototype.addCallBack = function (call, thisObj) {
        this.callFun = call;
        this.thisObj = thisObj;
    };
    RoomBtn.prototype.addClickCall = function (call, thisObj) {
        this.clickFun = call;
        this.thisObj = thisObj;
    };
    RoomBtn.prototype.callBack = function () {
        this.callFun && this.callFun.call(this.thisObj);
    };
    RoomBtn.prototype.onRemove = function () {
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.dwonGroup);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.dwonGroup.x = this.dwonGroupx;
        this.dwonGroup.y = this.dwonGroupy;
        this.x = this.ox;
        this.y = this.oy;
    };
    return RoomBtn;
}(BaseUI));
__reflect(RoomBtn.prototype, "RoomBtn");
//# sourceMappingURL=RoomBtn.js.map