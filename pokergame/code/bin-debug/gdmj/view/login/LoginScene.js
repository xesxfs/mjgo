var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 登录界面
 * @author chenwei
 * @date 2016/6/27
 */
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "LoginSceneSkin";
        return _this;
    }
    LoginScene.prototype.onEnable = function () {
        if (App.DeviceUtils.IsNative) {
            this.isToken();
            this.backWXLogin();
        }
        this.wxLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWXLogin, this);
    };
    LoginScene.prototype.onRemove = function () {
        this.wxLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWXLogin, this);
    };
    /**判断本机是否存在token */
    LoginScene.prototype.isToken = function () {
        var refreshToken = egret.localStorage.getItem("refresh_token");
        if (refreshToken != null && refreshToken != undefined) {
            this.wxLoginBtn.visible = false;
            var ctrl1 = new LoginController();
        }
        else {
            this.wxLoginBtn.visible = true;
        }
    };
    //原生登陆放回     
    LoginScene.prototype.backWXLogin = function () {
        egret.ExternalInterface.addCallback("wxLoginBack", function (message) {
            // var ctrl1 = new LoginController();             
            // ctrl1.sendLoginAppReq(message,"");         
        });
    };
    /**点击微信登录*/
    LoginScene.prototype.onWXLogin = function (e) {
        // egret.ExternalInterface.call("wxLogin","wx"); 
        this.ctrl.onLogin();
    };
    /**Native资源更新列表*/
    LoginScene.prototype.getChangeList = function () {
        var changeList = RES.getVersionController().getChangeList();
        var len = changeList.length;
        console.log("加载列表长度:" + len);
        for (var i = 0; i < len; i++) {
            console.log("加载列表" + i + ":" + changeList[i].url + "," + changeList[i].size);
        }
    };
    return LoginScene;
}(BaseScene));
__reflect(LoginScene.prototype, "LoginScene");
//# sourceMappingURL=LoginScene.js.map