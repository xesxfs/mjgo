var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 微信语音UI
 * @author chenkai
 * @date 2016/8/30
 */
var VoiceUI = (function (_super) {
    __extends(VoiceUI, _super);
    function VoiceUI() {
        var _this = _super.call(this) || this;
        _this.blueList = []; //蓝色音量方块
        _this.skinName = "VoiceUISkin";
        return _this;
    }
    VoiceUI.prototype.childrenCreated = function () {
        for (var i = 0; i < 5; i++) {
            this.blueList.push(this.blueGroup.getChildAt(i));
        }
    };
    VoiceUI.prototype.onEnable = function () {
        this.setCenter();
        this.playAnim();
    };
    VoiceUI.prototype.onRemove = function () {
        this.stopAnim();
    };
    VoiceUI.prototype.playAnim = function () {
        var _this = this;
        //时间文本
        this.timeLabel.text = "00:00";
        //波纹动画
        this.wave0.scaleX = 0.7;
        this.wave0.scaleY = 0.7;
        this.wave0.alpha = 1;
        this.wave1.scaleX = 0.7;
        this.wave1.scaleY = 0.7;
        this.wave1.alpha = 1;
        egret.Tween.get(this.wave0, { loop: true }).to({ scaleX: 1, scaleY: 1, alpha: 0 }, 1200).to({ scaleX: 0.7, scaleY: 0.7, alpha: 1 });
        egret.Tween.get(this).wait(600).call(function () {
            egret.Tween.get(_this.wave1, { loop: true }).to({ scaleX: 1, scaleY: 1, alpha: 0 }, 1200).to({ scaleX: 0.7, scaleY: 0.7, alpha: 1 });
        });
        //蓝色音量动画
        var flashTime = 30;
        egret.Tween.get(this, { loop: true }).wait(flashTime).call(function () {
            _this.blueList[1].visible = false; //1亮
            _this.blueList[2].visible = false;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //12亮
            _this.blueList[2].visible = false;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //123亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //1234亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = true;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //123亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //12亮
            _this.blueList[2].visible = false;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //123亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //1234亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = true;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //12345亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = true;
            _this.blueList[4].visible = true;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //1234亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = true;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //123亮
            _this.blueList[2].visible = true;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        }).wait(flashTime).call(function () {
            _this.blueList[1].visible = true; //12亮
            _this.blueList[2].visible = false;
            _this.blueList[3].visible = false;
            _this.blueList[4].visible = false;
        });
    };
    VoiceUI.prototype.stopAnim = function () {
        egret.Tween.removeTweens(this.wave0);
        egret.Tween.removeTweens(this.wave1);
        egret.Tween.removeTweens(this);
    };
    VoiceUI.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return VoiceUI;
}(BaseUI));
__reflect(VoiceUI.prototype, "VoiceUI");
//# sourceMappingURL=VoiceUI.js.map