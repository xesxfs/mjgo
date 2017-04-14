var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 操作消息UI，吃碰杠胡等，动画提示
 * @author chenkai
 * @date 2016/7/8
 */
var ActTipUI = (function (_super) {
    __extends(ActTipUI, _super);
    function ActTipUI() {
        var _this = _super.call(this) || this;
        _this.bmList = []; //位图缓存
        _this.imgList = []; //显示的图片
        _this.bInitRes = false;
        _this.skinName = "ActTipSkin";
        return _this;
    }
    ActTipUI.prototype.childrenCreated = function () {
        for (var i = 0; i < 5; i++) {
            this.imgList.push(this.getChildAt(i));
        }
    };
    ActTipUI.prototype.initRes = function () {
        if (this.bInitRes == false) {
            this.bInitRes = true;
            this.bmList[ACT_act.Act_Chi] = RES.getRes("game_s_chi1_png");
            this.bmList[ACT_act.Act_Peng] = RES.getRes("game_s_peng1_png");
            this.bmList[ACT_act.Act_Gang] = RES.getRes("game_s_gang1_png");
            this.bmList[ACT_act.Act_Hu] = RES.getRes("game_s_hu1_png");
            this.bmList[ACT_act.Act_AnGang] = RES.getRes("game_s_gang1_png");
        }
    };
    /**
     * 设置提示皮肤
     * @act 动作类型
     */
    ActTipUI.prototype.showAct = function (act) {
        var _this = this;
        this.initRes();
        this.imgList[3].bitmapData = this.bmList[act];
        this.imgList[4].bitmapData = this.bmList[act];
        var foot = this.imgList[0]; //底层黑红色
        foot.scaleX = 0.3;
        foot.scaleY = 0.3;
        foot.alpha = 0;
        egret.Tween.get(foot).wait(200).to({ scaleX: 0.8, scaleY: 0.8, alpha: 0.3 }, 200);
        var mid = this.imgList[1]; //底层黑色烟圈
        mid.scaleX = 0.6;
        mid.scaleY = 0.6;
        mid.alpha = 1;
        egret.Tween.get(mid).wait(200).to({ scaleX: 1.4, scaleY: 1.4, alpha: 0 }, 300);
        var top = this.imgList[2]; //底层黑色雾状
        top.visible = false;
        egret.Tween.get(top).wait(200).call(function () { top.visible = true; }, this);
        var font0 = this.imgList[3]; //不变化的字
        font0.visible = true;
        egret.Tween.get(font0).wait(240).call(function () { font0.visible = false; }, this);
        var font = this.imgList[4]; //变化的字
        font.scaleX = 1.7;
        font.scaleY = 1.7;
        font.alpha = 0;
        egret.Tween.get(font).wait(40).to({ scaleX: 0.85, scaleY: 0.85, alpha: 1 }, 200).to({ scaleX: 1, scaleY: 1 }, 160).wait(1000).call(function () {
            _this.hide();
        }, this);
    };
    ActTipUI.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return ActTipUI;
}(eui.Component));
__reflect(ActTipUI.prototype, "ActTipUI");
//# sourceMappingURL=ActTipUI.js.map