var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NewFeedBackPanel = (function (_super) {
    __extends(NewFeedBackPanel, _super);
    function NewFeedBackPanel() {
        var _this = _super.call(this) || this;
        //限制字数
        _this.numberWords = 150;
        _this.skinName = "NewFeedBackPanelSkin";
        return _this;
    }
    /**添加场景*/
    NewFeedBackPanel.prototype.onEnable = function () {
        //有文本输入
        this.feedback.addEventListener(egret.Event.CHANGE, this.feedbackChange, this);
        //获得焦点
        this.feedback.addEventListener(egret.FocusEvent.FOCUS_IN, this.feedbackIn, this);
        //发送按钮
        this.feedBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFeed, this);
        //关闭按钮
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBt, this);
        this.setCenter();
    };
    /**删除场景 */
    NewFeedBackPanel.prototype.onRemove = function () {
        //有文本输入
        this.feedback.removeEventListener(egret.Event.CHANGE, this.feedbackChange, this);
        //获得焦点
        this.feedback.removeEventListener(egret.FocusEvent.FOCUS_IN, this.feedbackIn, this);
        //发送按钮
        this.feedBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFeed, this);
        //关闭按钮
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBt, this);
        this.closeBt();
    };
    /**限制字数*/
    NewFeedBackPanel.prototype.feedbackChange = function () {
        this.numberWords = 150 - this.feedback.text.length;
        if (this.numberWords >= 0) {
            this.numberWord.text = this.numberWords + "";
        }
        else {
            this.feedback.text = this.feedback.text.substr(0, 150);
            this.numberWord.text = "0";
        }
    };
    /**提示文字的隐藏 */
    NewFeedBackPanel.prototype.feedbackIn = function () {
        this.promptLabel.visible = false;
    };
    /**关闭按钮的相应 */
    NewFeedBackPanel.prototype.closeBt = function () {
        this.feedback.text = "";
        this.numberWords = 150;
        this.numberWord.text = "150";
        this.promptLabel.visible = true;
        this.hide();
    };
    /**发送反馈内容 */
    NewFeedBackPanel.prototype.onFeed = function (e) {
        var len = this.feedback.text.length;
        if (len > 0) {
            var hall = App.getController(HallController.NAME);
            //encode用户输入内容，避免特殊符号引起的错误
            var feedBackStr = encodeURIComponent(this.feedback.text);
            feedBackStr = encodeURIComponent(feedBackStr);
            hall.sendFeedbackReq(feedBackStr);
        }
        else {
            Tips.info("请先填写您的反馈内容！！");
        }
    };
    /**反馈回调 */
    NewFeedBackPanel.prototype.feedBack = function () {
        Tips.info("您的反馈内容已接收，我们会努力改进！");
        this.closeBt();
    };
    return NewFeedBackPanel;
}(BasePanel));
__reflect(NewFeedBackPanel.prototype, "NewFeedBackPanel");
//# sourceMappingURL=NewFeedBackPanel.js.map