var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * socket管理类
 * @author chenkai
 * @date
 */
var SocketManager = (function (_super) {
    __extends(SocketManager, _super);
    function SocketManager() {
        var _this = _super.call(this) || this;
        _this.gameSocket = new ClientSocket();
        _this.gameSocket.name = "gameSocket";
        _this.pushSocket = new ClientSocket();
        _this.pushSocket.name = "pushSocket";
        _this.serverSocket = new ClientSocket();
        _this.serverSocket.name = "serverSocket";
        return _this;
    }
    return SocketManager;
}(SingleClass));
__reflect(SocketManager.prototype, "SocketManager");
//# sourceMappingURL=SocketManager.js.map