var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 底部菜单按钮
 * @author chenwei
 *
 */
var MenuButton = (function (_super) {
    __extends(MenuButton, _super);
    function MenuButton() {
        return _super.call(this) || this;
    }
    MenuButton.prototype.childrenCreated = function () {
        this.setNewsFlag(false);
    };
    /**
     * 设置小红点
     * @visible 是否显示
     */
    MenuButton.prototype.setNewsFlag = function (visible) {
        var news = this.getChildAt(1);
        news.visible = visible;
    };
    return MenuButton;
}(eui.Button));
__reflect(MenuButton.prototype, "MenuButton");
//# sourceMappingURL=MenuButton.js.map