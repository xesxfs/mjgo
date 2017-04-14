/**
 * 底部菜单管理类
 * @author eyanlong
 * @date 2017/2/21
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BottomMenuManager = (function (_super) {
    __extends(BottomMenuManager, _super);
    function BottomMenuManager() {
        var _this = _super.call(this) || this;
        _this.bottomMenu = ObjectPool.getPool(BottomMenus.NAME);
        return _this;
    }
    /**获取一个消息弹框A，有确定和取消按钮 */
    BottomMenuManager.prototype.getBoxA = function () {
        var menu = this.bottomMenu.getObject();
        menu.skinName = "BottomMenuASkin";
        return menu;
    };
    /**获取一个消息弹框B，只有确定按钮 */
    BottomMenuManager.prototype.getBoxB = function () {
        var menu = this.bottomMenu.getObject();
        menu.skinName = "BottomMenuBSkin";
        return menu;
    };
    /**获取一个消息弹框C, 无任何按钮*/
    BottomMenuManager.prototype.getBoxC = function () {
        var menu = this.bottomMenu.getObject();
        menu.skinName = "BottomMenuCSkin";
        return menu;
    };
    return BottomMenuManager;
}(SingleClass));
__reflect(BottomMenuManager.prototype, "BottomMenuManager");
//# sourceMappingURL=BottomMenuManager.js.map