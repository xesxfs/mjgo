var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MessagePanel = (function (_super) {
    __extends(MessagePanel, _super);
    function MessagePanel() {
        var _this = _super.call(this) || this;
        _this.cmd = "42";
        _this.skinName = "MessageSkin";
        return _this;
    }
    /**组件创建完毕*/
    MessagePanel.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    MessagePanel.prototype.onEnable = function () {
        this.setCenter();
        App.gameSocket.register(ProtocolHead.RevCmd42, this.revData, this);
        this.sendData();
        this.closeBtn.addEventListener("touchTap", this.hide, this);
        this.radioRbt.group.addEventListener(eui.UIEvent.CHANGE, this.changeViewStack, this);
    };
    MessagePanel.prototype.sendData = function () {
        var scoreData = ProtocolData.commond;
        scoreData.cmd = this.cmd;
        scoreData.game = "-1";
        App.gameSocket.send(ProtocolData.commond);
    };
    MessagePanel.prototype.revData = function (data) {
    };
    MessagePanel.prototype.changeViewStack = function (e) {
        var group = e.target;
        this.vs.selectedIndex = group.selectedValue;
    };
    /**从场景中移除*/
    MessagePanel.prototype.onRemove = function () {
        App.gameSocket.unRegister(ProtocolHead.RevCmd42);
        this.closeBtn.removeEventListener("touchTap", this.hide, this);
        this.radioRbt.group.removeEventListener(eui.UIEvent.CHANGE, this.changeViewStack, this);
    };
    return MessagePanel;
}(BasePanel));
__reflect(MessagePanel.prototype, "MessagePanel");
//# sourceMappingURL=MessagePanel.js.map