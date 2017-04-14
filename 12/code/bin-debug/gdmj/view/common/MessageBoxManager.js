/**
 * 消息弹出框管理类
 * @author chenkai
 * @date 2016/7/22
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MessageBoxManager = (function (_super) {
    __extends(MessageBoxManager, _super);
    function MessageBoxManager() {
        var _this = _super.call(this) || this;
        _this.boxPool = ObjectPool.getPool(MessageBox.NAME);
        return _this;
    }
    /**获取一个消息弹框A，有确定和取消按钮 */
    MessageBoxManager.prototype.getBoxA = function () {
        var box = this.boxPool.getObject();
        box.skinName = "MessageBoxASkin";
        return box;
    };
    /**获取一个消息弹框B，只有确定按钮 */
    MessageBoxManager.prototype.getBoxB = function () {
        var box = this.boxPool.getObject();
        box.skinName = "MessageBoxBSkin";
        return box;
    };
    /**获取一个消息弹框C, 无任何按钮*/
    MessageBoxManager.prototype.getBoxC = function () {
        var box = this.boxPool.getObject();
        box.skinName = "MessageBoxCSkin";
        return box;
    };
    /**获取一个消息弹框A，有确定和取消按钮 */
    MessageBoxManager.prototype.getBoxD = function () {
        var box = this.boxPool.getObject();
        box.skinName = "MessageBoxDSkin";
        return box;
    };
    /**回收 */
    MessageBoxManager.prototype.recycle = function (msgBox) {
        this.boxPool.returnObject(msgBox);
    };
    /**回收所有弹框*/
    MessageBoxManager.prototype.recycleAllBox = function () {
        var layer = App.LayerManager.msgLayer;
        var len = layer.numChildren;
        for (var i = len - 1; i >= 0; i--) {
            var box = layer.getChildAt(i);
            if (box && box instanceof MessageBox) {
                box.hideAndRecycle();
            }
        }
    };
    return MessageBoxManager;
}(SingleClass));
__reflect(MessageBoxManager.prototype, "MessageBoxManager");
//# sourceMappingURL=MessageBoxManager.js.map