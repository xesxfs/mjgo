var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 系统时间UI
 * 游戏中显示系统时间，例如21:36，冒号每秒钟闪烁一次
 * @author chenkai
 * @date 2016/6/29
 *
 * Example:
 * 1. 拖拽SystemTimeUI自定义组件到exml，并设置自定义皮肤SystemTimeUISkin
 * 2. this.systemTimeUI.startTimer(); //开始计时
 *
 */
var SystemTimeUI = (function (_super) {
    __extends(SystemTimeUI, _super);
    function SystemTimeUI() {
        var _this = _super.call(this) || this;
        _this.timeCount = 0; //计数，超过1分钟后更新一次时间
        _this.timeLimit = 120; //每分钟闪烁120次
        _this.timer = new egret.Timer(500); //计时器
        _this.skinName = "SystemTimeUISkin";
        _this.touchChildren = false;
        _this.touchEnabled = false;
        return _this;
    }
    //开始计时
    SystemTimeUI.prototype.start = function () {
        this.timeCount = 0;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.reset();
        this.timer.start();
        this.updateInfo();
    };
    //计时处理
    SystemTimeUI.prototype.onTimerHandler = function () {
        this.colonLabel.visible = !this.colonLabel.visible;
        this.timeCount++;
        if (this.timeCount >= this.timeLimit) {
            this.timeCount = 0;
            this.updateInfo();
        }
    };
    //停止计时
    SystemTimeUI.prototype.stop = function () {
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.stop();
    };
    //更新时间
    SystemTimeUI.prototype.updateInfo = function () {
        this.date = new Date();
        this.hourLabel.text = NumberTool.formatTime(this.date.getHours());
        this.minLabel.text = NumberTool.formatTime(this.date.getMinutes());
    };
    return SystemTimeUI;
}(eui.Component));
__reflect(SystemTimeUI.prototype, "SystemTimeUI");
//# sourceMappingURL=SystemTimeUI.js.map