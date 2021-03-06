/**
 * 服务器信息
 * @author chenkai
 * @date 2016/6/28
 */
class ServerInfo {
    /**Python调度服务器IP地址*/
    public SERVER_URL: string;
    /**Python推送服务器IP地址*/
    public PUSH_SERVER_URL: string;
    //游戏服务器
    public GAME_SERVER: string;
    //游戏断口
    public GAME_PORT: number;
    /**密码MD5码*/
    public MD5PASS: string;
    /**微信授权页面(无用)*/
    public WX_URL: string = "";
    /**正式服务器标识 */
    public HTTP_FLAG_TEST: Boolean = true;

    /**php地址*/
    public get WEB_URL() {
        // 判断是否本地测试php地址 
        if (App.DataCenter.debugInfo.isLocalPhp == 1) {
            return "http://192.168.0.222:8070/majapi/api.php";
        } else if (App.DataCenter.debugInfo.isLocalPhp == 2) {
            return "http://192.168.1.192/majapi/api.php";
        }
        else {
            return "http://"+App.DataCenter.ServerInfo.IM_LOGIN_IP+"/majapi/api.php";
        }
    }

    /**IM启动 PHP地址 */
    public get IM_LOGIN_IP() {
        var url = "119.23.66.138:8090";
		if (!App.DataCenter.ServerInfo.HTTP_FLAG_TEST) {
			url = "im.wgb.cn:8090"
		}
        return url;
    }
}
