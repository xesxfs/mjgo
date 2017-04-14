var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Socket通讯协议头
 * @author chenkai
 * @date 2016/11/17
 */
var ProtocolHead = (function () {
    function ProtocolHead() {
    }
    return ProtocolHead;
}());
/**发送心跳*/
ProtocolHead.Send1_1_0 = "1_1_0";
/**接收心跳*/
ProtocolHead.Rev1_1_0 = "1_1_0";
/**广播玩家断线重连 102 2 99*/
ProtocolHead.Rev102_2_99 = "102_2_99";
/**玩家加入房间(广播) 102 4 2*/
ProtocolHead.Rev102_4_2 = "102_4_2";
/**发送退出房间*/
ProtocolHead.Send102_5_0 = "102_5_0";
/**接收退出房间(广播)*/
ProtocolHead.Rev102_5_1 = "102_5_1";
/**接收通知玩家被踢出*/
ProtocolHead.Rev102_20_1 = "102_20_1";
/**接收更新房卡*/
ProtocolHead.Rev103_10_0 = "103_10_0";
/**赠送房间*/
ProtocolHead.Send104_3_0 = "104_3_0";
/**赠送返回*/
ProtocolHead.Rev104_3_1 = "104_3_1";
/**广播房间房主变更*/
ProtocolHead.Rev104_3_2 = "104_3_2";
/**申请解散房间*/
ProtocolHead.Send104_5_0 = "104_5_0";
/**申请返回*/
ProtocolHead.Rev104_5_1 = "104_5_1";
/**询问是否同意解散*/
ProtocolHead.Rev104_5_2 = "104_5_2";
/**发送是否同意解散*/
ProtocolHead.Send104_5_5 = "104_5_5";
/**广播桌子解散*/
ProtocolHead.Rev104_5_6 = "104_5_6";
/**发送再来一战*/
ProtocolHead.Send104_8_0 = "104_8_0";
/**接收再来一战*/
ProtocolHead.Rev104_8_0 = "104_8_0";
/**长时间没有开始游戏，提示强制解散房间*/
ProtocolHead.Rev104_10_0 = "104_10_0";
/**发送准备*/
ProtocolHead.Send108_1_0 = "108_1_0";
/**广播玩家准备*/
ProtocolHead.Rev108_1_2 = "108_1_2";
/**取消准备*/
ProtocolHead.Send108_2_0 = "108_2_0";
/**接收游戏状态*/
ProtocolHead.Rev180_2_0 = "180_2_0";
/**广播取消准备*/
ProtocolHead.Rev108_2_2 = "108_2_2";
/**发送聊天信息*/
ProtocolHead.Send111_1_0 = "111_1_0";
/**广播聊天室信息*/
ProtocolHead.Rev111_1_1 = "111_1_1";
/**禁言广播 */
ProtocolHead.Gag111_2_1 = "111_2_1";
/**发送互动表情*/
ProtocolHead.Send112_1_0 = "112_1_0";
/**互动道具失败*/
ProtocolHead.Rev112_1_1 = "112_1_1";
/**广播互动道具*/
ProtocolHead.Rev112_1_2 = "112_1_2";
/**通知领取救济金*/
ProtocolHead.Rev_113_1_0 = "113_1_0";
/**领取救济金*/
ProtocolHead.Send113_2_0 = "113_2_0";
/**接收领取救济金结果*/
ProtocolHead.Rev113_2_1 = "113_2_1";
/**请求游戏状态*/
ProtocolHead.Send150_1 = "150_1";
/**广播更新玩家信息*/
ProtocolHead.Rev180_5_0 = "180_5_0";
/**玩家(取消)托管*/
ProtocolHead.Send180_6_0 = "180_6_0";
/**广播玩家(取消)托管 */
ProtocolHead.Rev180_7_0 = "180_7_0";
/**游戏开始,获取庄家位置*/
ProtocolHead.Rev180_51_0 = "180_51_0";
/**发牌*/
ProtocolHead.Rev180_52_0 = "180_52_0";
/**摸牌*/
ProtocolHead.Rev180_53_0 = "180_53_0";
/**玩家请求操作(吃、碰、杠、胡等)*/
ProtocolHead.Send180_54_0 = "180_54_0";
/**通知玩家叫牌(是否能吃、碰等)*/
ProtocolHead.Rev180_55_0 = "180_55_0";
/**相应玩家操作(广播玩家吃、碰等操作)*/
ProtocolHead.Rev180_56_0 = "180_56_0";
/**通知玩家出牌?*/
ProtocolHead.Rev180_57_0 = "180_57_0";
/**游戏结束，结算*/
ProtocolHead.Rev180_58_0 = "180_58_0";
/**广播买马结果*/
ProtocolHead.Rev180_59_0 = "180_59_0";
/**广播通知鬼牌*/
ProtocolHead.Rev180_60_0 = "180_60_0";
/**广播杠结算*/
ProtocolHead.Rev180_61_0 = "180_61_0";
/**接收牌局信息，桌子解散时接收 */
ProtocolHead.Rev180_62_0 = "180_62_0";
/**广播玩家叫牌*/
ProtocolHead.Rev180_63_0 = "180_63_0";
/**测试确定下次发的牌*/
ProtocolHead.Send180_99_0 = "180_99_0";
/**测试换牌*/
ProtocolHead.Send180_100_0 = "180_100_0";
/**测试换牌*/
ProtocolHead.Rev180_101_0 = "180_101_0";
/**测试看牌 -1最后一张 0为第一张 主要用来测试海底捞月*/
ProtocolHead.Send180_102_0 = "180_102_0";
/**接收测试最后一张牌*/
ProtocolHead.Rev180_103_0 = "180_103_0";
/**其他玩家登陆该账号*/
ProtocolHead.Rev10000_0_0 = "10000_0_0";
/**通知金币变化*/
ProtocolHead.Rev103_6_0 = "103_6_0";
/**游戏中不能站起*/
ProtocolHead.Rev102_8_60 = "102_8_60";
/**玩家离开游戏离线 */
ProtocolHead.Rev102_7_0 = "102_7_0";
/**登陆游戏服务器 {“userid”:int, “pass”:string} 其中pass为md5加密后的密文*/
ProtocolHead.Send100_5_0 = "100_5_0";
/**推送服务器登录*/
ProtocolHead.Send181_0_0 = "181_0_0";
/**登陆 当 session被占用时返回 [100, 3, 9] 消息*/
ProtocolHead.Rev100_3_9 = "100_3_9";
/**登陆 当密码错误时返回 [100, 3, 3] 消息，无结构*/
ProtocolHead.Rev100_3_3 = "100_3_3 ";
/**登陆 当玩家没有登录Z服务器时返回 [100,3,19]消息，无结构*/
ProtocolHead.Rev100_3_19 = "100_3_19";
/**登陆 当玩家在其他游戏中登录或没有正常登出时*/
ProtocolHead.Rev100_3_8 = "100_3_8";
/**登陆 断线重连*/
ProtocolHead.Rev102_2_50 = "102_2_50";
/**登陆 登陆成功*/
ProtocolHead.Rev100_2_1 = "100_2_1";
/**推送服务器 登录成功*/
ProtocolHead.Rev182_1_0 = "182_1_0";
/**接收推送消息*/
ProtocolHead.Rev182_0_0 = "182_0_0";
/**创建房间*/
ProtocolHead.Send104_1_0 = "104_1_0";
/**创建房间*/
ProtocolHead.Rev104_1_1 = "104_1_1";
/**搜索房间*/
ProtocolHead.Send104_2_0 = "104_2_0";
/**接收搜索房间*/
ProtocolHead.Rev104_2_1 = "104_2_1";
/**进入房间*/
ProtocolHead.Send102_4_0 = "102_4_0";
/**加入房间*/
ProtocolHead.Rev102_4_1 = "102_4_1";
/**玩家进入广播*/
ProtocolHead.CC102_4_2 = "102_4_2";
/**获取游戏服务器地址*/
ProtocolHead.Send200_1_0 = "200_1_0";
/** 查询房间号是否存在*/
ProtocolHead.Send200_2_0 = "200_2_0";
/**返回房间是否存在*/
ProtocolHead.Rev200_2_1 = "200_2_1";
/**接收游戏服务器地址*/
ProtocolHead.Rev200_1_1 = "200_1_1";
/**金币场 玩家请求加入排队*/
ProtocolHead.Send102_11_0 = "102_11_0";
/**桌子结束*/
ProtocolHead.Rev104_4_0 = "104_4_0";
/**通知房主房间结束*/
ProtocolHead.Rev104_4_1 = "104_4_1";
/**金币场进入失败，金币太少*/
ProtocolHead.Rev102_16_0 = "102_16_0";
/**金币场进入失败，金币太多*/
ProtocolHead.Rev102_18_0 = "102_18_0";
/**专属房**/
ProtocolHead.Rev121_1_0 = "121_1_0";
/**更改房间配置 */
ProtocolHead.Send120_1_0 = "120_1_0";
/**加入桌子**/
ProtocolHead.Send102_8_0 = "102_8_0";
/**返回加入桌子**/
ProtocolHead.Rev102_8_1 = "102_8_1";
/**获取指定的桌子的信息**/
ProtocolHead.Send104_10_0 = "104_10_0";
/**返回桌子的信息**/
ProtocolHead.Rev104_10_1 = "104_10_1";
/**没有可用的专属房**/
ProtocolHead.Rev121_2_0 = "121_2_0";
/**踢人*/
ProtocolHead.Send102_20_0 = "102_20_0";
/**踢人返回*/
ProtocolHead.Rev102_20_2 = "102_20_2";
/**接收踢人广播*/
ProtocolHead.Rev102_20_3 = "102_20_3";
/**禁言*/
ProtocolHead.Send111_2_0 = "111_2_0";
/**接收禁言广播*/
ProtocolHead.Rev111_2_1 = "111_2_1";
/**更改房间配置返回 **/
ProtocolHead.Rev120_1_1 = "120_1_1";
/**更改房间配置广播**/
ProtocolHead.Rev120_1_2 = "120_1_2";
//查看是否禁言*/
ProtocolHead.Send111_3_0 = "111_3_0";
/**返回是否被禁言*/
ProtocolHead.Rev111_3_1 = "111_3_1";
/**聊天失败返回*/
ProtocolHead.Rev111_1_2 = "111_1_2";
/**解除禁言返回*/
ProtocolHead.Rev111_4_0 = "111_4_0";
/**通知房主哪个人禁言解除*/
ProtocolHead.Rev111_4_1 = "111_4_1";
__reflect(ProtocolHead.prototype, "ProtocolHead");
//# sourceMappingURL=ProtocolHead.js.map