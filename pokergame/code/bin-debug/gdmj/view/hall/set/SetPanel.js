/**
 * @author chenwei
 *
 * 2016-12-29
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SetPanel = (function (_super) {
    __extends(SetPanel, _super);
    function SetPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "SetPanelSkin";
        return _this;
    }
    /**组件创建完毕*/
    SetPanel.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    SetPanel.prototype.onEnable = function () {
        this.setCenter();
        this.closeBtn.addEventListener("touchTap", this.hide, this);
        this.musicSlider.addEventListener(eui.UIEvent.CHANGE, this.onMusicSlider, this);
        this.effectSlider.addEventListener(eui.UIEvent.CHANGE, this.onEffectSlider, this);
    };
    SetPanel.prototype.onMusicSlider = function (e) {
        var volume = e.target.value;
        App.SoundManager.bgmVolume = volume;
    };
    SetPanel.prototype.onEffectSlider = function (e) {
        App.SoundManager.effectVolume = e.target.value;
    };
    /**从场景中移除*/
    SetPanel.prototype.onRemove = function () {
    };
    return SetPanel;
}(BasePanel));
__reflect(SetPanel.prototype, "SetPanel");
//# sourceMappingURL=SetPanel.js.map