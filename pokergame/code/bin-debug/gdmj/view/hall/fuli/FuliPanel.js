var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 福利面板
 * @author chenwei
 *
 */
var FuliPanel = (function (_super) {
    __extends(FuliPanel, _super);
    function FuliPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "FuliSkin";
        return _this;
    }
    FuliPanel.prototype.onEnable = function () {
        this.setCenter();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.setJjjLabel();
        if (App.DataCenter.UserInfo.getMyUserVo().signFlag != 1) {
            this.signLab.text = "已签到";
        }
    };
    FuliPanel.prototype.onRemove = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    //设置救济金领取次数
    FuliPanel.prototype.setJjjLabel = function () {
        this.jjjLabel.text = "领取(" + App.DataCenter.welfareInfo.benefit_cnt + "/" + App.DataCenter.welfareInfo.benefitMax + ")";
        this.jjjMsgText.text = "少于" + App.DataCenter.welfareInfo.broke_money + "金币的时候可以领取";
    };
    FuliPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.openSignBtn:
                if (App.DataCenter.UserInfo.getMyUserVo().signFlag == 1) {
                    App.PanelManager.open(PanelConst.SignPanel);
                    App.PanelManager.close(PanelConst.FuliPanel);
                }
                else {
                    Tips.info("您今天已经签到过,请明天再来!");
                }
                break;
            case this.openJjjBtn:
                if (App.DataCenter.welfareInfo.isCanApply()) {
                    App.PanelManager.open(PanelConst.JjjPanel);
                }
                else {
                    Tips.info("您不满足领取救济金条件!");
                }
                break;
            case this.panelBg.closeBtn:
                App.PanelManager.close(PanelConst.FuliPanel);
                break;
        }
    };
    return FuliPanel;
}(BasePanel));
__reflect(FuliPanel.prototype, "FuliPanel");
//# sourceMappingURL=FuliPanel.js.map