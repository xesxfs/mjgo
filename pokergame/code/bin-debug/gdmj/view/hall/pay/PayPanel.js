var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PayPanel = (function (_super) {
    __extends(PayPanel, _super);
    function PayPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "PayPanelSkin";
        return _this;
    }
    /**组件创建完毕*/
    PayPanel.prototype.childrenCreated = function () {
        this.closeBtn.addEventListener("touchTap", this.hide, this);
        this.radiosRbt.group.addEventListener(eui.UIEvent.CHANGE, this.changeViewStack, this);
    };
    /**添加到场景中*/
    PayPanel.prototype.onEnable = function () {
        this.setCenter();
    };
    PayPanel.prototype.changeViewStack = function (e) {
        var group = e.target;
        this.vs.selectedIndex = group.selectedValue;
    };
    /**从场景中移除*/
    PayPanel.prototype.onRemove = function () {
    };
    return PayPanel;
}(BasePanel));
__reflect(PayPanel.prototype, "PayPanel");
//# sourceMappingURL=PayPanel.js.map