var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 控制基类
 * @author chenkai
 * @date 2016/11/10
 */
var BaseController = (function () {
    function BaseController() {
    }
    /**注册时调用*/
    BaseController.prototype.onRegister = function () {
    };
    /**移除注册调用*/
    BaseController.prototype.onRemove = function () {
    };
    /**
     * 发送事件
     * @type 事件名
     * @args 发送数据
     */
    BaseController.prototype.sendEvent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        App.EventManager.sendEvent(type, args);
    };
    /**
     * 监听事件
     * @type 事件名
     * @listener 回调函数
     * @thisObject 执行对象
     */
    BaseController.prototype.addEvent = function (type, listener, thisObject) {
        App.EventManager.addEvent(type, listener, thisObject);
    };
    /**
     * 移除监听
     * @type 事件名
     * @listener 回调函数
     * @thisObject 执行对象
     */
    BaseController.prototype.removeEvent = function (type, listener, thisObject) {
        App.EventManager.removeEvent(type, listener, thisObject);
    };
    return BaseController;
}());
__reflect(BaseController.prototype, "BaseController");
//# sourceMappingURL=BaseController.js.map