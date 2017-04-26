var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅模块
 * @author chenwei
 * @date 2017/4/24
 */
var HallController = (function (_super) {
    __extends(HallController, _super);
    function HallController() {
        var _this = _super.call(this) || this;
        _this.isReconnection = false;
        return _this;
    }
    //注册时调用
    HallController.prototype.onRegister = function () {
        this.addEvent(HallController.EVENT_SHOW_HALL, this.showHallScene, this);
        this.registerSocket();
    };
    HallController.prototype.registerSocket = function () {
        var gameSocket = App.gameSocket;
        gameSocket.register(ProtocolHead.RevCmd4, this.revCRoom, this);
        gameSocket.register(ProtocolHead.RevCmd5, this.revCRoomErr, this);
        gameSocket.register(ProtocolHead.RevCmd7, this.revERoom, this);
        gameSocket.register(ProtocolHead.RevCmd8, this.revERoomErr, this);
        //socket连接成功事件
        this.addEvent(EventConst.SocketConnect, this.onSocketConnect, this);
        //socket连接错误事件
        this.addEvent(EventConst.SocketIOError, this.onSocketError, this);
    };
    //连接成功
    HallController.prototype.onSocketConnect = function (socket) {
        //  var loginData = ProtocolData.sendLogin         
        //  App.gameSocket.send(loginData);
    };
    /**socket连接错误*/
    HallController.prototype.onSocketError = function (socket) {
        if (socket == App.gameSocket) {
            console.log("网络连接失败，请检查您的网络。");
        }
    };
    /**进入房间成功*/
    HallController.prototype.revERoom = function (data) {
    };
    /**进入房间失败*/
    HallController.prototype.revERoomErr = function (data) {
    };
    /**创建房间成功*/
    HallController.prototype.revCRoom = function (data) {
    };
    /**创建房间失败*/
    HallController.prototype.revCRoomErr = function (data) {
    };
    //移除注册时调用
    HallController.prototype.onRemove = function () {
    };
    /**显示大厅*/
    HallController.prototype.showHallScene = function () {
        this.hallScene = App.SceneManager.runScene(SceneConst.HallScene, this);
    };
    return HallController;
}(BaseController));
/**控制模块名*/
HallController.NAME = "HallController";
/**显示大厅*/
HallController.EVENT_SHOW_HALL = "ShowHallScene";
__reflect(HallController.prototype, "HallController");
//# sourceMappingURL=HallController.js.map