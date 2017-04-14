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
var RankRuleDetail = (function (_super) {
    __extends(RankRuleDetail, _super);
    function RankRuleDetail() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankRuleDetailSkin";
        return _this;
    }
    RankRuleDetail.prototype.onEnable = function () {
        this.setCenter();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    RankRuleDetail.prototype.onClose = function () {
        this.hide();
    };
    RankRuleDetail.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    return RankRuleDetail;
}(BasePanel));
__reflect(RankRuleDetail.prototype, "RankRuleDetail");
//# sourceMappingURL=RankRuleDetail.js.map