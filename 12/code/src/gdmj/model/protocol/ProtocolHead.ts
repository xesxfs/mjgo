/**
 * Socket通讯协议头
 * @author chenkai
 * @date 2016/11/17
 */
class ProtocolHead {

    /**发送心跳*/
    public static Send1_1_0: string = "1_1_0";
    /**接收心跳*/
    public static Rev1_1_0: string = "1_1_0";
    /**广播玩家断线重连 102 2 99*/
    public static Rev102_2_99: string = "102_2_99";
    /**玩家加入房间(广播) 102 4 2*/
    public static Rev102_4_2: string = "102_4_2";
    /**发送退出房间*/
    public static Send102_5_0: string = "102_5_0";
    /**接收退出房间(广播)*/
    public static Rev102_5_1: string = "102_5_1";
    /**接收通知玩家被踢出*/
    public static Rev102_20_1: string = "102_20_1";
    /**接收更新房卡*/
    public static Rev103_10_0: string = "103_10_0";
    /**赠送房间*/
    public static Send104_3_0: string = "104_3_0";
    /**赠送返回*/
    public static Rev104_3_1: string = "104_3_1";
    /**广播房间房主变更*/
    public static Rev104_3_2: string = "104_3_2";
    /**申请解散房间*/
    public static Send104_5_0: string = "104_5_0";
    /**申请返回*/
    public static Rev104_5_1: string = "104_5_1";
    /**询问是否同意解散*/
    public static Rev104_5_2: string = "104_5_2";
    /**发送是否同意解散*/
    public static Send104_5_5: string = "104_5_5";
    /**广播桌子解散*/
    public static Rev104_5_6: string = "104_5_6";
    /**发送再来一战*/
    public static Send104_8_0: string = "104_8_0";
    /**接收再来一战*/
    public static Rev104_8_0: string = "104_8_0";
    /**长时间没有开始游戏，提示强制解散房间*/
    public static Rev104_10_0: string = "104_10_0";
    /**发送准备*/
    public static Send108_1_0: string = "108_1_0";
    /**广播玩家准备*/
    public static Rev108_1_2: string = "108_1_2";
    /**取消准备*/
    public static Send108_2_0: string = "108_2_0";
    /**接收游戏状态*/
    public static Rev180_2_0: string = "180_2_0";
    /**广播取消准备*/
    public static Rev108_2_2: string = "108_2_2";
    /**发送聊天信息*/
    public static Send111_1_0: string = "111_1_0";
    /**广播聊天室信息*/
    public static Rev111_1_1: string = "111_1_1";
    /**禁言广播 */
    public static Gag111_2_1: string = "111_2_1";
    /**发送互动表情*/
    public static Send112_1_0: string = "112_1_0";
    /**互动道具失败*/
    public static Rev112_1_1: string = "112_1_1";
    /**广播互动道具*/
    public static Rev112_1_2: string = "112_1_2";
    /**通知领取救济金*/
    public static Rev_113_1_0: string = "113_1_0";
    /**领取救济金*/
    public static Send113_2_0: string = "113_2_0";
    /**接收领取救济金结果*/
    public static Rev113_2_1: string = "113_2_1";
    /**请求游戏状态*/
    public static Send150_1: string = "150_1";
    /**广播更新玩家信息*/
    public static Rev180_5_0: string = "180_5_0";
    /**玩家(取消)托管*/
    public static Send180_6_0: string = "180_6_0";
    /**广播玩家(取消)托管 */
    public static Rev180_7_0: string = "180_7_0";
    /**游戏开始,获取庄家位置*/
    public static Rev180_51_0: string = "180_51_0";
    /**发牌*/
    public static Rev180_52_0: string = "180_52_0";
    /**摸牌*/
    public static Rev180_53_0: string = "180_53_0";
    /**玩家请求操作(吃、碰、杠、胡等)*/
    public static Send180_54_0: string = "180_54_0";
    /**通知玩家叫牌(是否能吃、碰等)*/
    public static Rev180_55_0: string = "180_55_0";
    /**相应玩家操作(广播玩家吃、碰等操作)*/
    public static Rev180_56_0: string = "180_56_0";
    /**通知玩家出牌?*/
    public static Rev180_57_0: string = "180_57_0";
    /**游戏结束，结算*/
    public static Rev180_58_0: string = "180_58_0";
    /**广播买马结果*/
    public static Rev180_59_0: string = "180_59_0";
    /**广播通知鬼牌*/
    public static Rev180_60_0: string = "180_60_0";
    /**广播杠结算*/
    public static Rev180_61_0: string = "180_61_0";
    /**接收牌局信息，桌子解散时接收 */
    public static Rev180_62_0: string = "180_62_0";
    /**广播玩家叫牌*/
    public static Rev180_63_0: string = "180_63_0";
    /**测试确定下次发的牌*/
    public static Send180_99_0: string = "180_99_0";
    /**测试换牌*/
    public static Send180_100_0: string = "180_100_0";
    /**测试换牌*/
    public static Rev180_101_0: string = "180_101_0";
    /**测试看牌 -1最后一张 0为第一张 主要用来测试海底捞月*/
    public static Send180_102_0: string = "180_102_0";
    /**接收测试最后一张牌*/
    public static Rev180_103_0: string = "180_103_0";
    /**其他玩家登陆该账号*/
    public static Rev10000_0_0: string = "10000_0_0";
    /**通知金币变化*/
    public static Rev103_6_0: string = "103_6_0";
    /**游戏中不能站起*/
    public static Rev102_8_60:string = "102_8_60";
    /**玩家离开游戏离线 */
    public static Rev102_7_0:string = "102_7_0";


    /**登陆游戏服务器 {“userid”:int, “pass”:string} 其中pass为md5加密后的密文*/
    public static Send100_5_0: string = "100_5_0";
    /**推送服务器登录*/
    public static Send181_0_0: string = "181_0_0";
    /**登陆 当 session被占用时返回 [100, 3, 9] 消息*/
    public static Rev100_3_9: string = "100_3_9";
    /**登陆 当密码错误时返回 [100, 3, 3] 消息，无结构*/
    public static Rev100_3_3: string = "100_3_3 ";
    /**登陆 当玩家没有登录Z服务器时返回 [100,3,19]消息，无结构*/
    public static Rev100_3_19: string = "100_3_19";
    /**登陆 当玩家在其他游戏中登录或没有正常登出时*/
    public static Rev100_3_8: string = "100_3_8";
    /**登陆 断线重连*/
    public static Rev102_2_50: string = "102_2_50";
    /**登陆 登陆成功*/
    public static Rev100_2_1: string = "100_2_1";
    /**推送服务器 登录成功*/
    public static Rev182_1_0: string = "182_1_0";
    /**接收推送消息*/
    public static Rev182_0_0: string = "182_0_0"
    /**创建房间*/
    public static Send104_1_0: string = "104_1_0";
    /**创建房间*/
    public static Rev104_1_1: string = "104_1_1";
    /**搜索房间*/
    public static Send104_2_0: string = "104_2_0";
    /**接收搜索房间*/
    public static Rev104_2_1: string = "104_2_1";
    /**进入房间*/
    public static Send102_4_0: string = "102_4_0";
    /**加入房间*/
    public static Rev102_4_1: string = "102_4_1";
    /**玩家进入广播*/
    public static CC102_4_2: string = "102_4_2";
    /**获取游戏服务器地址*/
    public static Send200_1_0 = "200_1_0";
    /** 查询房间号是否存在*/
    public static Send200_2_0 = "200_2_0";
    /**返回房间是否存在*/
    public static Rev200_2_1 = "200_2_1";
    /**接收游戏服务器地址*/
    public static Rev200_1_1 = "200_1_1";
    /**金币场 玩家请求加入排队*/
    public static Send102_11_0 = "102_11_0";
    /**桌子结束*/
    public static Rev104_4_0: string = "104_4_0";
    /**通知房主房间结束*/
    public static Rev104_4_1: string = "104_4_1";
    /**金币场进入失败，金币太少*/
    public static Rev102_16_0: string = "102_16_0";
    /**金币场进入失败，金币太多*/
    public static Rev102_18_0: string = "102_18_0";
    /**专属房**/
    public static Rev121_1_0: string = "121_1_0";
    /**更改房间配置 */
    public static Send120_1_0: string = "120_1_0";
    /**加入桌子**/
    public static Send102_8_0: string ="102_8_0";
    /**返回加入桌子**/
    public static Rev102_8_1: string ="102_8_1";
    /**获取指定的桌子的信息**/
    public static Send104_10_0: string ="104_10_0";
    /**返回桌子的信息**/
    public static Rev104_10_1: string = "104_10_1";
    /**没有可用的专属房**/
    public static Rev121_2_0: string = "121_2_0";    
    /**踢人*/
    public static Send102_20_0: string = "102_20_0";
    /**踢人返回*/
    public static Rev102_20_2: string ="102_20_2";
    /**接收踢人广播*/
    public static Rev102_20_3: string = "102_20_3";
    /**禁言*/
    public static Send111_2_0: string = "111_2_0";
    /**接收禁言广播*/
    public static Rev111_2_1: string = "111_2_1";    
    /**更改房间配置返回 **/
    public static Rev120_1_1: string = "120_1_1";
    /**更改房间配置广播**/
    public static Rev120_1_2: string = "120_1_2";
    //查看是否禁言*/
    public static Send111_3_0:string = "111_3_0";
    /**返回是否被禁言*/
    public static Rev111_3_1: string = "111_3_1";
    /**聊天失败返回*/
    public static Rev111_1_2: string = "111_1_2";
    /**解除禁言返回*/
    public static Rev111_4_0: string = "111_4_0";
    /**通知房主哪个人禁言解除*/
    public static Rev111_4_1: string = "111_4_1"; 

}