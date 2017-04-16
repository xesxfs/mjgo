var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 服务器信息
 * @author chenkai
 * @date 2016/6/28
 */
var ServerInfo = (function () {
    function ServerInfo() {
        /**微信授权页面(无用)*/
        this.WX_URL = "";
    }
    Object.defineProperty(ServerInfo.prototype, "WEB_URL", {
        /**php地址*/
        get: function () {
            //判断是否本地测试php地址 
            // if(App.DataCenter.debugInfo.isLocalPhp == 1){
            //     return "http://192.168.0.222:8090/majapi/api.php";
            // }else if(App.DataCenter.debugInfo.isLocalPhp == 2){
            return "http://192.168.1.192/majapi/api.php";
            // }else{
            //  return  "http://gamemj.com/majapi/api.php";
            // }
        },
        enumerable: true,
        configurable: true
    });
    return ServerInfo;
}());
__reflect(ServerInfo.prototype, "ServerInfo");
//# sourceMappingURL=ServerInfo.js.map