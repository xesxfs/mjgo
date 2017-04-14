var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 签到界面
 * @author chenwei
 *
 */
var SignInPanel = (function (_super) {
    __extends(SignInPanel, _super);
    function SignInPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "SignInPanelSkin";
        return _this;
    }
    SignInPanel.prototype.childrenCreated = function () {
        this.setDateLabel(0);
    };
    SignInPanel.prototype.onEnable = function () {
        this.setCenter();
        this.panelBg.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.align.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAlignStartTouch, this);
        this.openVipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openshopVip, this);
    };
    SignInPanel.prototype.onRemove = function () {
        this.panelBg.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.align.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAlignStartTouch, this);
        this.openVipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openshopVip, this);
    };
    SignInPanel.prototype.openshopVip = function () {
        var hall = App.SceneManager.getScene(SceneConst.HallScene);
        //      hall.showShopPanel(ShopView.vip);
    };
    /**
     * 设置签到天数
     * @signInCount 签到天数
     */
    SignInPanel.prototype.setDateLabel = function (signInCount) {
        this.dateLabel.text = signInCount + "";
        this.signLightLabel.text = "连签" + signInCount + "天";
    };
    /**
     * 设置每日签到奖励图标
     * @signcount 签到天数
     * @signList 签到奖励列表
     */
    SignInPanel.prototype.setSignDay = function (signcount, signList) {
        var len = signList.length;
        for (var i = 0; i < len; i++) {
            var signAward = this.signInDayGroup.getChildAt(i);
            if (signAward) {
                signAward.updateInfo(signcount, signList[i]);
            }
        }
    };
    /**
     * 设置签到结果
     * @signcount 签到天数
     */
    SignInPanel.prototype.setSignResult = function (signcount) {
        this.signInDayGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignAwardTouch, this);
        this.setDateLabel(signcount);
        this.setSigned(signcount);
    };
    //点击圆盘抽奖按钮
    SignInPanel.prototype.onAlignStartTouch = function () {
        if (App.DataCenter.signInfo.signInCount >= App.DataCenter.signInfo.signMax) {
            var hallController = App.getController(HallController.NAME);
        }
        else {
            Tips.info("连续虔诚签到7天。财神才会下凡哦!");
        }
    };
    /**
     * 开始抽奖
     * @prizeIndex 中奖奖品索引
     */
    SignInPanel.prototype.startLottery = function (prizeIndex) {
        this.align.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAlignStartTouch, this);
        this.align.setAreaIndex(prizeIndex);
        this.align.startRun();
    };
    /**允许签到*/
    SignInPanel.prototype.allowSignIn = function () {
        this.signInDayGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignAwardTouch, this);
    };
    /**点击签到*/
    SignInPanel.prototype.onSignAwardTouch = function (e) {
        if (e.target instanceof SignAward) {
            var signAward = e.target;
            //点击当天的签到图标，并且当天尚未签到，则发送签到请求
            if (signAward.id == (App.DataCenter.signInfo.signInCount + 1)) {
                if (App.DataCenter.UserInfo.getMyUserVo().signFlag == 1) {
                    var hallController = App.getController(HallController.NAME);
                }
            }
        }
    };
    /**
     * 设置已签到图标
     * @signcount 签到天数
     */
    SignInPanel.prototype.setSigned = function (signcount) {
        var signAward = this.signInDayGroup.getChildAt(signcount - 1); //签到从1开始，子对象索引从0开始
        if (signAward) {
            signAward.setSigned(true);
        }
    };
    return SignInPanel;
}(BasePanel));
__reflect(SignInPanel.prototype, "SignInPanel");
//# sourceMappingURL=SignInPanel.js.map