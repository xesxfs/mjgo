/**
 * @author xiongjian
 * 2017-1-7
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RankNewRuleDetail = (function (_super) {
    __extends(RankNewRuleDetail, _super);
    function RankNewRuleDetail() {
        var _this = _super.call(this) || this;
        _this.timer = new egret.Timer(1000, 10);
        _this.skinName = "RankNewRuleDetailSkin";
        return _this;
    }
    RankNewRuleDetail.prototype.onEnable = function () {
        this.closeTimer();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    RankNewRuleDetail.prototype.onClose = function () {
        this.hide();
        this.timer.reset();
    };
    RankNewRuleDetail.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    RankNewRuleDetail.prototype.childrenCreated = function () {
    };
    /**
     * 关闭窗口倒计时
     */
    RankNewRuleDetail.prototype.closeTimer = function () {
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimeUpdate, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimeComplete, this);
        this.timer.start();
    };
    RankNewRuleDetail.prototype.onTimeUpdate = function () {
    };
    RankNewRuleDetail.prototype.onTimeComplete = function () {
        this.onClose();
        this.timer.reset();
    };
    return RankNewRuleDetail;
}(BasePanel));
__reflect(RankNewRuleDetail.prototype, "RankNewRuleDetail");
//# sourceMappingURL=RankNewRuleDetail.js.map