var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AwardPanel = (function (_super) {
    __extends(AwardPanel, _super);
    function AwardPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "AwardSkin";
        return _this;
    }
    /**组件创建完毕*/
    AwardPanel.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    AwardPanel.prototype.onEnable = function () {
        this.setCenter();
        this.closeBtn.addEventListener("touchTap", this.hide, this);
    };
    /**从场景中移除*/
    AwardPanel.prototype.onRemove = function () {
    };
    return AwardPanel;
}(BasePanel));
__reflect(AwardPanel.prototype, "AwardPanel");
//# sourceMappingURL=AwardPanel.js.map