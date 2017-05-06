/**
 * 服务器信息
 * @author chenwei
 * @date 2017/4/24
 */
class ServerInfo {
    /**Python调度服务器IP地址*/
    public SERVER_URL: string;
    /**Python推送服务器IP地址*/
    public PUSH_SERVER_URL: string;
    //游戏服务器
    public GAME_SERVER:string="ws://118.89.22.251:3350";
    //游戏断口
    public GAME_PORT:number;
    /**密码MD5码*/
    public MD5PASS:string;    
    /**微信授权页面(无用)*/
    public WX_URL:string = "";

    /**php地址*/
    public get WEB_URL(){
        //判断是否本地测试php地址 
        // if(App.DataCenter.debugInfo.isLocalPhp == 1){
        //     return "http://192.168.0.222:8090/majapi/api.php";
        // }else if(App.DataCenter.debugInfo.isLocalPhp == 2){
        return "http://hjwl.tunnel.qydev.com/LoginServer/share?url=http://hjwl.tunnel.qydev.com/LoginServer/index.jsp";
        // }else{
        //  return  "http://gamemj.com/majapi/api.php";
        // }
    }
}
