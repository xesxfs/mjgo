var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 回放控制
 * @author chenkai
 * @date 2016/9/2
 */
var ReplayControl = (function (_super) {
    __extends(ReplayControl, _super);
    function ReplayControl() {
        var _this = _super.call(this) || this;
        _this.skinName = "ReplayControlSkin";
        return _this;
    }
    ReplayControl.prototype.childrenCreated = function () {
        //		this.setCenter();
    };
    ReplayControl.prototype.onEnable = function () {
        this.setProgress(0);
    };
    ReplayControl.prototype.onRemove = function () {
    };
    /**
     * 设置进度
     * @progress 0-1
     */
    ReplayControl.prototype.setProgress = function (progress) {
        this.bar.width = this.measureGroup.width * 0.05 + this.measureGroup.width * 0.95 * progress; //0.05初始长度，否则scale过短，圆头显示变成方头
    };
    return ReplayControl;
}(BaseUI));
__reflect(ReplayControl.prototype, "ReplayControl");
//# sourceMappingURL=ReplayControl.js.map