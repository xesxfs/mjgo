/**
 * @author xiongjian
 * 2017-1-15
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ScoreSharePanel = (function (_super) {
    __extends(ScoreSharePanel, _super);
    function ScoreSharePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ScoreShareSkin";
        return _this;
    }
    ScoreSharePanel.prototype.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnTouch, this);
        this.jt_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnTouch, this);
        this.setLabel();
    };
    ScoreSharePanel.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnTouch, this);
        this.jt_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBtnTouch, this);
    };
    ScoreSharePanel.prototype.closeBtnTouch = function () {
        this.hide();
    };
    ScoreSharePanel.prototype.setLabel = function () {
        var content;
        var tetleTextStyleJson = { "size": 40, "textColor": 0xffffff, "fontFamily": "SimHei" };
        var contentTextStyleJson = { "size": 40, "textColor": 0xff3c1c, "fontFamily": "SimHei" };
        content = [
            { text: "点击", style: tetleTextStyleJson },
            { text: "发送", style: contentTextStyleJson },
            { text: "给", style: tetleTextStyleJson },
            { text: "好友", style: contentTextStyleJson },
            { text: "，\n", style: tetleTextStyleJson },
            { text: "好友可查看游戏回放！", style: tetleTextStyleJson }
        ];
        this.share_label.textFlow = content;
    };
    return ScoreSharePanel;
}(BasePanel));
__reflect(ScoreSharePanel.prototype, "ScoreSharePanel");
//# sourceMappingURL=ScoreSharePanel.js.map