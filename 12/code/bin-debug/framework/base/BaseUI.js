var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 自定义UI
 * @author chenkai
 * @date 2016/7/5
 */
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onEnable, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    /**组件创建完毕*/
    BaseUI.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    BaseUI.prototype.onEnable = function () {
    };
    /**从场景中移除*/
    BaseUI.prototype.onRemove = function () {
    };
    /**设置居中对齐*/
    BaseUI.prototype.setCenter = function () {
        this.x = (App.StageUtils.stageWidth - this.width) / 2;
        this.y = (App.StageUtils.stageHeight - this.height) / 2;
    };
    /**设置底部对齐*/
    BaseUI.prototype.setBottom = function () {
        this.x = (App.StageUtils.stageWidth - this.width) / 2;
        this.y = (App.StageUtils.stageHeight - this.height);
    };
    /**隐藏*/
    BaseUI.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    /**销毁*/
    BaseUI.prototype.onDestroy = function () {
    };
    return BaseUI;
}(eui.Component));
__reflect(BaseUI.prototype, "BaseUI");
//# sourceMappingURL=BaseUI.js.map