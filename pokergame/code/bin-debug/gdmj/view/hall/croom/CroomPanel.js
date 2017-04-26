var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CroomPanel = (function (_super) {
    __extends(CroomPanel, _super);
    function CroomPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "CroomSkin";
        return _this;
    }
    /**组件创建完毕*/
    CroomPanel.prototype.childrenCreated = function () {
        this.updateRadios();
    };
    /**添加到场景中*/
    CroomPanel.prototype.onEnable = function () {
        this.setCenter();
        this.closeBtn.addEventListener("touchTap", this.hide, this);
        this.okBtn.addEventListener("touchTap", this.onOkBtn, this);
        this.jdDKRb.group.addEventListener(eui.UIEvent.CHANGE, this.selectGameType, this);
        this.fourRb.group.addEventListener(eui.UIEvent.CHANGE, this.selectGameType, this);
    };
    CroomPanel.prototype.updateRadios = function () {
        for (var i = 0; i < this.jdDKRb.group.numRadioButtons; i++) {
            this.updateRadioStatus(this.jdDKRb.group.getRadioButtonAt(i));
        }
        for (var i = 0; i < this.fourRb.group.numRadioButtons; i++) {
            this.updateRadioStatus(this.fourRb.group.getRadioButtonAt(i));
        }
    };
    CroomPanel.prototype.updateRadioStatus = function (rbtn) {
        rbtn.getChildAt(1).visible = rbtn.selected;
    };
    CroomPanel.prototype.selectGameType = function (e) {
        this.updateRadios();
    };
    CroomPanel.prototype.selectGameCount = function (e) {
        this.updateRadios();
    };
    CroomPanel.prototype.onOkBtn = function () {
        this.sendData();
        this.hide();
    };
    CroomPanel.prototype.sendData = function () {
        // {'cmd':'3','game':' ','msg':[{'level':' '}]}
        ProtocolData.cmd3.game = this.jdDKRb.group.selectedValue;
        ProtocolData.cmd3.msg[0].level = this.fourRb.group.selectedValue;
        App.gameSocket.send(ProtocolData.cmd3);
    };
    /**从场景中移除*/
    CroomPanel.prototype.onRemove = function () {
    };
    return CroomPanel;
}(BasePanel));
__reflect(CroomPanel.prototype, "CroomPanel");
//# sourceMappingURL=CroomPanel.js.map