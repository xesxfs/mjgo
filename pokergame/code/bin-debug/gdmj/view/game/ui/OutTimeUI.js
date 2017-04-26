var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OutTimeUI = (function (_super) {
    __extends(OutTimeUI, _super);
    function OutTimeUI() {
        var _this = _super.call(this) || this;
        _this.limitTime = 25;
        _this.skinName = "OutTimeUISkin";
        return _this;
    }
    OutTimeUI.prototype.childrenCreated = function () {
        this.outTimer = new DateTimer(1000);
    };
    OutTimeUI.prototype.startTime = function () {
        this.outTimer.addEventListener(egret.TimerEvent.TIMER, this.onOutTime, this);
        this.outTimer.start();
    };
    OutTimeUI.prototype.stopTime = function () {
        this.outTimer.removeEventListener(egret.TimerEvent.TIMER, this.onOutTime, this);
        this.outTimer.stop();
    };
    OutTimeUI.prototype.onOutTime = function (e) {
        if (this.outTimer.currentCount > this.limitTime) {
            this.stopTime();
            return;
        }
        var count = this.limitTime - this.outTimer.currentCount;
        this.setCDLab(NumberTool.formatTime(count) + "");
    };
    OutTimeUI.prototype.setCDLab = function (time) {
        this.cdLab.text = time;
    };
    return OutTimeUI;
}(eui.Component));
__reflect(OutTimeUI.prototype, "OutTimeUI");
//# sourceMappingURL=OutTimeUI.js.map