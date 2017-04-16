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
 * 2016/08/03
 */
var LookPswPanel = (function (_super) {
    __extends(LookPswPanel, _super);
    function LookPswPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "LookPswPanelSkin1";
        return _this;
    }
    LookPswPanel.prototype.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
        //        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTouch,this);
        this.cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkTouch, this);
        this.lookCodeEdt.addEventListener(egret.FocusEvent.FOCUS_IN, this.lookCodeEditTouch, this);
        this.lookCodeEdt.addEventListener(egret.FocusEvent.FOCUS_OUT, this.lookCodeEditOutTouch, this);
        this.setCenter();
    };
    LookPswPanel.prototype.closeTouch = function (e) {
        this.hide();
    };
    LookPswPanel.prototype.onOkTouch = function (e) {
        if (this.lookCodeEdt.text.length) {
            var code = this.lookCodeEdt.text;
            var http = new HttpSender();
            var sendData = ProtocolHttp.send_z_replayCombatGain;
            sendData.param.replaycode = parseInt(code);
            http.send(sendData, this.complete, this);
        }
        else {
            Tips.info("请输入回放码");
        }
    };
    /***
     * 输入框点击
     */
    LookPswPanel.prototype.lookCodeEditTouch = function () {
        this.editLabel.visible = false;
    };
    LookPswPanel.prototype.lookCodeEditOutTouch = function () {
        if (this.lookCodeEdt.text.length == 0) {
            this.editLabel.visible = true;
        }
    };
    LookPswPanel.prototype.complete = function (data) {
        if (!data.ret) {
            var replayData = data.data.replay;
            var hallScene = App.SceneManager.getScene(SceneConst.HallScene);
            hallScene.intoGameDesk(true, replayData);
        }
        else {
            Tips.info(data.desc);
        }
    };
    return LookPswPanel;
}(BasePanel));
__reflect(LookPswPanel.prototype, "LookPswPanel");
//# sourceMappingURL=LookPswPanel.js.map