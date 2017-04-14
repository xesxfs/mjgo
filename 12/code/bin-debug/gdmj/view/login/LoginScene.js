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
        this.startCloudAnim();
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
            ctrl1.sendLoginAppReq("", refreshToken);
        }
        else {
            this.wxLoginBtn.visible = true;
        }
    };
    //原生登陆放回     
    LoginScene.prototype.backWXLogin = function () {
        egret.ExternalInterface.addCallback("wxLoginBack", function (message) {
            var ctrl1 = new LoginController();
            ctrl1.sendLoginAppReq(message, "");
        });
    };
    /**点击微信登录*/
    LoginScene.prototype.onWXLogin = function (e) {
        egret.ExternalInterface.call("wxLogin", "wx");
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
    /**测试账号按钮*/
    LoginScene.prototype.debugBtns = function () {
        var _this = this;
        var row = 2;
        var column = 6;
        var xoffset = 450;
        var yoffset = 40;
        for (var i = 1; i <= 16; i++) {
            var b = new eui.Label();
            var ii = i - 1;
            b.background = true;
            b.backgroundColor = 0x000000;
            b.text = "test" + i.toString();
            b.x = ii % column * 100 + xoffset;
            b.y = yoffset + ~~(ii / column) * 60;
            b.x = ~~(ii / row) * 80 + xoffset;
            b.y = yoffset + (ii % row) * 60;
            this.addChild(b);
            b.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                var lab = e.target;
                _this.ctrl.sendDebugLoginReq(lab.text, App.DataCenter.debugInfo.password);
            }, this);
        }
    };
    /**?*/
    LoginScene.prototype.createPrticle = function () {
        if (!this.particleSys) {
            var txtute = RES.getRes("blink_png");
            var json = RES.getRes("blink_json");
            this.particleSys = new particle.GravityParticleSystem(txtute, json);
            this.particleSys.x = -200;
            this.particleSys.y = -30;
            this.addChild(this.particleSys);
        }
        if (!this.particleFlower) {
            var txtute = RES.getRes("fly_flower_png");
            var json = RES.getRes("fly_flower_json");
            this.particleFlower = new particle.GravityParticleSystem(txtute, json);
            this.addChild(this.particleFlower);
        }
    };
    /**云飘动画*/
    LoginScene.prototype.startCloudAnim = function () {
        //云浮动
        var c2x = this.clund2.x;
        var c4x = this.clund4.x;
        var ttime = 2500;
        egret.Tween.get(this.clund2, { loop: true }).to({ x: -10 }, ttime).to({ x: c2x }, ttime);
        egret.Tween.get(this.clund4, { loop: true }).wait(300).to({ x: -10 }, ttime).to({ x: c4x }, ttime);
        var c1x = this.clund1.x;
        var c5x = this.clund5.x;
        egret.Tween.get(this.clund1, { loop: true }).to({ x: c1x - 30 }, ttime).to({ x: c1x }, ttime);
        egret.Tween.get(this.clund5, { loop: true }).wait(300).to({ x: c5x - 40 }, ttime).to({ x: c5x }, ttime);
        var s1x = this.sclund1.x;
        egret.Tween.get(this.sclund1, { loop: true }).wait(300).to({ x: s1x - 30 }, ttime).to({ x: s1x }, ttime);
    };
    return LoginScene;
}(BaseScene));
__reflect(LoginScene.prototype, "LoginScene");
//# sourceMappingURL=LoginScene.js.map