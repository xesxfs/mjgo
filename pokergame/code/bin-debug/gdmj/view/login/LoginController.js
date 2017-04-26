var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 登录控制模块
 * @author chenwei
 * @date 2017/4/24
 */
var LoginController = (function (_super) {
    __extends(LoginController, _super);
    function LoginController() {
        return _super.call(this) || this;
    }
    LoginController.prototype.onRegister = function () {
        this.addEvent(LoginController.EVENT_SHOW_LOGIN, this.showLoginScene, this);
        this.registerSocket();
    };
    LoginController.prototype.registerSocket = function () {
        var gameSocket = App.gameSocket;
        gameSocket.register(ProtocolHead.RevCmd2, this.revLogin, this);
        gameSocket.register(ProtocolHead.RevCmd39, this.revLogin, this);
        //socket连接成功事件
        this.addEvent(EventConst.SocketConnect, this.onSocketConnect, this);
        //socket连接错误事件
        this.addEvent(EventConst.SocketIOError, this.onSocketError, this);
    };
    /**登录成功*/
    LoginController.prototype.revLogin = function (data) {
        this.gotoHall();
    };
    /**登录*/
    LoginController.prototype.onLogin = function () {
        App.gameSocket.startConnect(App.DataCenter.ServerInfo.GAME_SERVER, false);
    };
    //连接成功
    LoginController.prototype.onSocketConnect = function (socket) {
        var loginData = ProtocolData.sendLogin;
        App.gameSocket.send(loginData);
    };
    /**socket连接错误*/
    LoginController.prototype.onSocketError = function (socket) {
        if (socket == App.gameSocket) {
            console.log("网络连接失败，请检查您的网络。");
        }
    };
    /**显示登录界面*/
    LoginController.prototype.showLoginScene = function () {
        this.startLoadLogin();
        var code = egret.getOption("code");
    };
    /**开始加载登录界面*/
    LoginController.prototype.startLoadLogin = function () {
        var preloadPanel = App.PanelManager.open(PanelConst.PreloadPanel);
        App.ResUtils.loadGroup(["hall", "common", "login"], this, this.loadLoginComplete, this.loadLoginProgress);
    };
    /**加载登录界面进度*/
    LoginController.prototype.loadLoginProgress = function (e) {
        var preloadPanel = App.PanelManager.getPanel(PanelConst.PreloadPanel);
        preloadPanel.setProgress(Math.round(e.itemsLoaded / e.itemsTotal * 100));
    };
    /**加载登录界面完成*/
    LoginController.prototype.loadLoginComplete = function () {
        App.DataCenter.UserInfo.setMyUserVo();
        App.PanelManager.close(PanelConst.PreloadPanel);
        this.loginScene = App.SceneManager.runScene(SceneConst.LoginScene);
        this.loginScene.setController(this);
    };
    /**去大厅*/
    LoginController.prototype.gotoHall = function () {
        console.log("显示大厅");
        App.getInstance().sendEvent(HallController.EVENT_SHOW_HALL);
    };
    return LoginController;
}(BaseController));
/**模块名*/
LoginController.NAME = "LoginController";
/**显示登录界面*/
LoginController.EVENT_SHOW_LOGIN = "ShowLoginScene";
__reflect(LoginController.prototype, "LoginController");
//# sourceMappingURL=LoginController.js.map