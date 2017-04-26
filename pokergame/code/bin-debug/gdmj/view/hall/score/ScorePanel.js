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
 * 2016/07/13
 */
var ScorePanel = (function (_super) {
    __extends(ScorePanel, _super);
    function ScorePanel() {
        var _this = _super.call(this) || this;
        _this.cmd = "41";
        _this.skinName = "ScorePanelSkin";
        return _this;
    }
    /**组件创建完毕*/
    ScorePanel.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    ScorePanel.prototype.onEnable = function () {
        this.setCenter();
        App.gameSocket.register(ProtocolHead.RevCmd41, this.revData, this);
        this.dkScoreList.dataProvider.removeAll();
        this.sendData();
        this.closeBtn.addEventListener("touchTap", this.hide, this);
        this.radioRbt.group.addEventListener(eui.UIEvent.CHANGE, this.changeViewStack, this);
    };
    ScorePanel.prototype.sendData = function () {
        var scoreData = ProtocolData.commond;
        scoreData.cmd = this.cmd;
        scoreData.game = "-1";
        App.gameSocket.send(ProtocolData.commond);
    };
    ScorePanel.prototype.revData = function (data) {
        var ac = this.dkScoreList.dataProvider;
        // var item = new Object();
        var dataItem = data["msg"][0][0];
        ac.addItem(dataItem);
    };
    ScorePanel.prototype.changeViewStack = function (e) {
        var group = e.target;
        this.vs.selectedIndex = group.selectedValue;
    };
    ScorePanel.prototype.onRemove = function () {
        App.gameSocket.unRegister(ProtocolHead.RevCmd41);
        this.closeBtn.removeEventListener("touchTap", this.hide, this);
        this.radioRbt.group.removeEventListener(eui.UIEvent.CHANGE, this.changeViewStack, this);
    };
    return ScorePanel;
}(BasePanel));
__reflect(ScorePanel.prototype, "ScorePanel");
//# sourceMappingURL=ScorePanel.js.map