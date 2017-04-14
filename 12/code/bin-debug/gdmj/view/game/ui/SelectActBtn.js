var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 选择操作按钮
 * @author chenkai
 * @date 2016/8/3
 */
var SelectActBtn = (function (_super) {
    __extends(SelectActBtn, _super);
    function SelectActBtn() {
        var _this = _super.call(this) || this;
        _this.imgList = []; //保存图片，0底图 1中间图 2顶层图
        _this.resList = []; //资源配置表
        _this.bInitRes = false;
        _this.skinName = "SelectActBtnSkin";
        return _this;
    }
    SelectActBtn.prototype.childrenCreated = function () {
        for (var i = 0; i < 3; i++) {
            this.imgList.push(this.getChildAt(i));
        }
        this.touchChildren = false;
        this.touchEnabled = true;
    };
    SelectActBtn.prototype.initRes = function () {
        if (this.bInitRes == false) {
            this.bInitRes = true;
            this.resList[ACT_act.Act_Pass] = "game_s_pass";
            this.resList[ACT_act.Act_Chi] = "game_s_chi";
            this.resList[ACT_act.Act_Peng] = "game_s_peng";
            this.resList[ACT_act.Act_Gang] = "game_s_gang";
            this.resList[ACT_act.Act_AnGang] = "game_s_gang";
            this.resList[ACT_act.Act_Hu] = "game_s_hu";
        }
    };
    /**
     * 根据动作设置皮肤
     */
    SelectActBtn.prototype.setActSkin = function (act) {
        this.initRes();
        var resName = this.resList[act];
        for (var i = 0; i < 3; i++) {
            this.imgList[i].bitmapData = RES.getRes(resName + (2 - i) + "_png");
        }
    };
    /**播放动画*/
    SelectActBtn.prototype.playAnim = function () {
        var _this = this;
        egret.Tween.get(this, { loop: true }).call(function () {
            var foot = _this.imgList[0]; //青色轮廓
            var top = _this.imgList[2]; //亮色字
            foot.alpha = 0;
            top.alpha = 0.5;
            top.scaleX = 1;
            top.scaleY = 1;
            top.alpha = 0.5;
            egret.Tween.get(foot).to({ alpha: 1 }, 600).to({ alpha: 0 }, 160);
            egret.Tween.get(top).to({ alpha: 0, scaleX: 1.4, scaleY: 1.4 }, 600);
        }).wait(1500);
    };
    SelectActBtn.prototype.stopAnim = function () {
        egret.Tween.removeTweens(this);
    };
    return SelectActBtn;
}(eui.Component));
__reflect(SelectActBtn.prototype, "SelectActBtn");
//# sourceMappingURL=SelectActBtn.js.map