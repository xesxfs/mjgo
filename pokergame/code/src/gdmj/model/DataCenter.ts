/**
 * 数据中心
 * @author chenkai 
 * @date 2016/6/27
 */
class DataCenter extends SingleClass{
    /**用户信息*/
    public UserInfo:UserInfo;
    /**服务器信息*/
    public ServerInfo:ServerInfo;
    /**游戏信息*/
    public GameInfo:GameInfo;

    /**调试信息*/
    public debugInfo:DebugInfo;
    /**回放信息*/
    public replayInfo:ReplayInfo;

    /**登录相关信息*/
    public wxInfo:WxInfo;

    /**颜色信息*/
    public colorInfo:ColorInfo;


    /**跑马灯信息*/
    public marqueeInfo:MarqueeInfo;
  
    

    public constructor(){
        super();
        this.UserInfo = new UserInfo();
        this.ServerInfo = new ServerInfo();
        this.GameInfo = new GameInfo();       

        this.debugInfo = new DebugInfo();

        this.colorInfo = new ColorInfo();

  
        this.marqueeInfo = new MarqueeInfo();
    }
}
