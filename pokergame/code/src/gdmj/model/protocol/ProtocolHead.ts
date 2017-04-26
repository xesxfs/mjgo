/**
 * Socket通讯协议头
 * @author chenkai
 * @date 2016/11/17
 */
class ProtocolHead {

    /**发送登录*/
    public static SendCmd1: string = "cmd1";
    /**接收登录*/
    public static RevCmd2: string = "cmd2";

    /**发送创建房间*/
    public static SendCmd3: string = "cmd3";
    /**接收创建房间*/
    public static RevCmd4: string = "cmd4";
     /**接收 棒棒糖不足，创建房间失败*/
    public static RevCmd5: string = "cmd5";

     /**发送加入房间*/
    public static SendCmd6: string = "cmd6";
     /**加入房间成功,广播玩家信息*/
    public static RevCmd7: string = "cmd7";
    /**房间不存在，加入失败*/
    public static RevCmd8: string = "cmd8";

     /**发送退出房间，清楚玩家信息*/
    public static SendCmd9: string = "cmd9";

    public static SendCmd10: string = "cmd10";
   /**退掉线玩家上线，提示恢复数据*/
    public static RevCmd39: string = "cmd39";



    /**发送战绩查询*/
    public static SendCmd41: string = "cmd41";
    /**接收战绩查询*/
    public static RevCmd41: string = "cmd41";

    /**发送活动信息和反馈*/
    public static SendCmd42: string = "cmd42";
    /**接收活动信息和反馈*/
    public static RevCmd42: string = "cmd42";

    


}