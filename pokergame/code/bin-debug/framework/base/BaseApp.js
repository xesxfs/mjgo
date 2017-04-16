var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * App基类
 * @author chenkai
 * @date 2016/11/14
 */
var BaseApp = (function (_super) {
    __extends(BaseApp, _super);
    function BaseApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**控制模块列表*/
        _this.moduleList = {};
        return _this;
    }
    /**
     * 注册controller
     * @ctrlName 控制模块名
     * @ctrl 控制模块
     */
    BaseApp.prototype.registerController = function (ctrlName, ctrl) {
        this.moduleList[ctrlName] = ctrl;
        ctrl.onRegister();
    };
    /**
     * 注销controller
     * @ctrlName 控制模块名
     */
    BaseApp.prototype.unRegisterController = function (ctrlName) {
        this.moduleList[ctrlName].onRemove();
        delete this.moduleList[ctrlName];
    };
    /**
     * 获取controller
     * @ctrlName 控制模块名
     * @return 控制模块
     */
    BaseApp.prototype.getController = function (ctrlName) {
        return this.moduleList[ctrlName];
    };
    /**
     * 发送事件
     * @type 事件名
     * @args 发送数据
     */
    BaseApp.prototype.sendEvent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = App.EventManager).sendEvent.apply(_a, [type].concat(args));
        var _a;
    };
    /**
     * 监听事件
     * @type 事件名
     * @listener 回调函数
     * @thisObject 执行对象
     */
    BaseApp.prototype.addEvent = function (type, listener, thisObject) {
        App.EventManager.addEvent(type, listener, thisObject);
    };
    /**
     * 移除事件
     * @type 事件名
     * @listener 回调函数
     * @thisObject 执行对象
     */
    BaseApp.prototype.removeEvent = function (type, listener, thisObject) {
        App.EventManager.removeEvent(type, listener, thisObject);
    };
    return BaseApp;
}(SingleClass));
__reflect(BaseApp.prototype, "BaseApp");
//# sourceMappingURL=BaseApp.js.map