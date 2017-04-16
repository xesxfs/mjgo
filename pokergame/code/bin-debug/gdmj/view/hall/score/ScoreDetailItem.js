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
var ScoreDetailItem = (function (_super) {
    __extends(ScoreDetailItem, _super);
    function ScoreDetailItem() {
        return _super.call(this) || this;
    }
    ScoreDetailItem.prototype.dataChanged = function () {
        var _this = this;
        var maxLab = this.p1Lab, max = 0;
        var pdata = [this.p1Lab, this.p2Lab, this.p3Lab, this.p4Lab];
        pdata.forEach(function (lab) {
            _this.setHight(lab);
            if (max < parseInt(lab.text)) {
                max = parseInt(lab.text);
                maxLab = lab;
            }
        });
        this.setHight(maxLab, true);
    };
    ScoreDetailItem.prototype.createChildren = function () {
        this.lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLookTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareTouch, this);
    };
    ScoreDetailItem.prototype.setHight = function (lab, h) {
        if (h === void 0) { h = false; }
        if (h) {
            lab.size = 52;
            lab.textColor = 0xFFF000;
            lab.strokeColor = 0x8B0201;
            lab.stroke = 3;
            this.hightLight.y = lab.y - 26;
        }
        else {
            lab.size = 30;
            lab.textColor = 0xFFFFFF;
            lab.strokeColor = 0;
            lab.stroke = 0;
        }
    };
    ScoreDetailItem.prototype.setHightlight = function () {
    };
    ScoreDetailItem.prototype.onLookTouch = function (e) {
        var http = new HttpSender();
        var sendData = ProtocolHttp.send_z_replayCombatGain;
        sendData.param.replaycode = parseInt(this.data.replayCode);
        http.send(sendData, this.complete, this);
    };
    ScoreDetailItem.prototype.onShareTouch = function (e) {
        var sharePanel = App.PanelManager.open(PanelConst.SharePanel);
        //sharePanel.showShareReplay();
        App.getInstance().weiXinShare(null, null, this.data.replayCode);
        //        Tips.info("该局回放码为:"+this.data.replayCode)
    };
    ScoreDetailItem.prototype.complete = function (data) {
        if (!data.ret) {
            var replayData = data.data.replay;
        }
        else {
            Tips.info(data.desc);
        }
    };
    return ScoreDetailItem;
}(eui.ItemRenderer));
__reflect(ScoreDetailItem.prototype, "ScoreDetailItem");
//# sourceMappingURL=ScoreDetailItem.js.map