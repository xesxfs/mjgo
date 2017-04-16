var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 每日签到奖励图标
 * @author chenwei
 *
 */
var SignAward = (function (_super) {
    __extends(SignAward, _super);
    function SignAward() {
        var _this = _super.call(this) || this;
        _this.id = 0; //id (1代表第一天)	
        return _this;
    }
    SignAward.prototype.childrenCreated = function () {
        this.touchChildren = false;
        this.signedImg.visible = false;
        this.blueFrame.visible = false;
    };
    /**
     * 更新UI
     * @signcount 签到天数
     * @info 奖励列表
     */
    SignAward.prototype.updateInfo = function (signcount, info) {
        var id = info.id; //id 1代表第一天
        var title = info.title; //邮件标题
        var rewardname = info.reward[0].name; //奖品名
        var count = info.reward[0].count; //奖品数量
        this.id = parseInt(id);
        this.dateLabel.text = "第" + NumberTool.formatCapital(parseInt(id)) + "天";
        this.prizeImg.source = ItemIcon.getLotteryIcon(rewardname);
        this.signedImg.visible = (this.id <= signcount);
        if (this.id == signcount + 1) {
            this.setNowSigning(true);
        }
    };
    /**
     * 设置签到状态
     * @signed 是否已签到
     */
    SignAward.prototype.setSigned = function (signed) {
        this.signedImg.visible = true;
        this.blueFrame.visible = false;
    };
    /**
     * 当前签到状态
     * @param signed
     */
    SignAward.prototype.setNowSigning = function (signed) {
        this.blueFrame.visible = true;
    };
    return SignAward;
}(BaseUI));
__reflect(SignAward.prototype, "SignAward");
//# sourceMappingURL=SignAward.js.map