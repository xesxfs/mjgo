var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 调试信息
 * @author chenkai
 * @date 2016/11/16
 */
var DebugInfo = (function () {
    function DebugInfo() {
        /**测试密码*/
        this.password = "112233";
    }
    Object.defineProperty(DebugInfo.prototype, "isDebug", {
        /**是否调试模式*/
        get: function () {
            return (egret.getOption("debug") != null && egret.getOption("debug") != "");
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DebugInfo.prototype, "isLocalPhp", {
        /**是否访问本地php，用于php访问地址设置*/
        get: function () {
            return parseInt(egret.getOption("local"));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DebugInfo.prototype, "account", {
        /**测试账号*/
        get: function () {
            return "test" + egret.getOption("debug");
        },
        enumerable: true,
        configurable: true
    });
    return DebugInfo;
}());
__reflect(DebugInfo.prototype, "DebugInfo");
//# sourceMappingURL=DebugInfo.js.map