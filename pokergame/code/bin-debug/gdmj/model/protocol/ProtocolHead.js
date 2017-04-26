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
/**发送登录*/
ProtocolHead.SendCmd1 = "cmd1";
/**接收登录*/
ProtocolHead.RevCmd2 = "cmd2";
/**发送创建房间*/
ProtocolHead.SendCmd3 = "cmd3";
/**接收创建房间*/
ProtocolHead.RevCmd4 = "cmd4";
/**接收 棒棒糖不足，创建房间失败*/
ProtocolHead.RevCmd5 = "cmd5";
/**发送加入房间*/
ProtocolHead.SendCmd6 = "cmd6";
/**加入房间成功,广播玩家信息*/
ProtocolHead.RevCmd7 = "cmd7";
/**房间不存在，加入失败*/
ProtocolHead.RevCmd8 = "cmd8";
/**发送退出房间，清楚玩家信息*/
ProtocolHead.SendCmd9 = "cmd9";
ProtocolHead.SendCmd10 = "cmd10";
/**退掉线玩家上线，提示恢复数据*/
ProtocolHead.RevCmd39 = "cmd39";
/**发送战绩查询*/
ProtocolHead.SendCmd41 = "cmd41";
/**接收战绩查询*/
ProtocolHead.RevCmd41 = "cmd41";
/**发送活动信息和反馈*/
ProtocolHead.SendCmd42 = "cmd42";
/**接收活动信息和反馈*/
ProtocolHead.RevCmd42 = "cmd42";
__reflect(ProtocolHead.prototype, "ProtocolHead");
//# sourceMappingURL=ProtocolHead.js.map