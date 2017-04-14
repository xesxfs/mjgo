var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 事件名
 * @author chenkai
 * @date 2016/9/27
 */
var EventConst = (function () {
    function EventConst() {
    }
    return EventConst;
}());
/**Socket连接成功*/
EventConst.SocketConnect = "SocketConnect";
/**socket开始重连*/
EventConst.StartReconnect = "StartReconnect";
/**send数据时，socket未连接*/
EventConst.SocketNotConnect = "SocketNotConnect";
/**socket 连接错误*/
EventConst.SocketIOError = "SocketIOError";
/**socket 关闭*/
EventConst.SocketClose = "SocketClose";
/**游戏状态更改*/
EventConst.GameStateChange = "GameStateChange";
/**游戏配置修改*/
EventConst.GameConfigChange = "GameConfigChange";
__reflect(EventConst.prototype, "EventConst");
//# sourceMappingURL=EventConst.js.map