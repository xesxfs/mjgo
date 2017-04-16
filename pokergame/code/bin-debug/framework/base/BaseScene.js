var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 场景基类
 * @author chenkai
 * @date 2016/6/27
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    /**
     * 设置
     */
    BaseScene.prototype.setController = function (ctrl) {
        this.ctrl = ctrl;
    };
    return BaseScene;
}(BaseUI));
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map