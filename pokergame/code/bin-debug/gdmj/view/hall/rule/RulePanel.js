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
var RulePanel = (function (_super) {
    __extends(RulePanel, _super);
    function RulePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "RulePanelSkin";
        return _this;
    }
    /**组件创建完毕*/
    RulePanel.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    RulePanel.prototype.onEnable = function () {
        this.setCenter();
        this.closeBtn.addEventListener("touchTap", this.hide, this);
        this.radioRbt.group.addEventListener(eui.UIEvent.CHANGE, this.changeViewStack, this);
    };
    RulePanel.prototype.changeViewStack = function (e) {
        var group = e.target;
        this.vs.selectedIndex = group.selectedValue;
    };
    /**从场景中移除*/
    RulePanel.prototype.onRemove = function () {
    };
    return RulePanel;
}(BasePanel));
__reflect(RulePanel.prototype, "RulePanel");
//# sourceMappingURL=RulePanel.js.map