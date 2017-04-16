/**
 * @author xiongjian
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
    SetPanel.prototype.childrenCreated = function () {
        this.initView();
    };
    /** 添加到场景*/
    SetPanel.prototype.onEnable = function () {
        this.set_guangdong_speak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.guangdongOrPTong, this);
        this.set_putong_speak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.guangdongOrPTong, this);
        this.set_music_toggle_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.set_sound_toggle_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.set_bration_toggle_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.setCenter();
        //Native下才有震动功能
        this.shakeGroup.visible = App.DeviceUtils.IsNative;
    };
    /** 从场景中移除*/
    SetPanel.prototype.onRemove = function () {
        this.set_guangdong_speak.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.guangdongOrPTong, this);
        this.set_putong_speak.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.guangdongOrPTong, this);
        this.set_music_toggle_switch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.set_sound_toggle_switch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.set_bration_toggle_switch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    };
    /**设置界面值 */
    SetPanel.prototype.initView = function () {
        this.set_music_toggle_switch.selected = App.SoundManager.allowPlayBGM;
        this.set_sound_toggle_switch.selected = App.SoundManager.allowPlayEffect;
        if (App.SoundManager.isGuangDongSpeak) {
            this.set_guangdong_speak.selected = true;
        }
        else {
            this.set_guangdong_speak.selected = false;
        }
        console.log("gdmj=" + App.SoundManager.isGuangDongSpeak);
    };
    /**设置页面（广东话和普通话按钮处理） */
    SetPanel.prototype.guangdongOrPTong = function (event) {
        switch (event.target) {
            case this.set_guangdong_speak:
                App.SoundManager.isGuangDongSpeak = true;
                //游戏中加载广东话
                if (App.SceneManager.getCurScene() instanceof GameScene) {
                    RES.loadGroup(AssetConst.Sound_GuangDong);
                }
                break;
            case this.set_putong_speak:
                App.SoundManager.isGuangDongSpeak = false;
                //游戏中加载普通话
                if (App.SceneManager.getCurScene() instanceof GameScene) {
                    RES.loadGroup(AssetConst.Sound_PuTong);
                }
                break;
            default:
                break;
        }
    };
    /** 设置页面(开关监听) */
    SetPanel.prototype.setToggleSwitchTouch = function (event) {
        switch (event.target) {
            case this.set_music_toggle_switch:
                var musicEvent = event.target;
                var music = musicEvent.selected;
                App.SoundManager.allowPlayBGM = music;
                // if (music) {
                //     (<any>this.set_music_toggle_switch).set_music_toggle_switch_open.textColor = 0xffffff;
                //     (<any>this.set_music_toggle_switch).set_music_toggle_switch_shut.textColor = 0x743d0d;
                // } else {
                //     (<any>this.set_music_toggle_switch).set_music_toggle_switch_open.textColor = 0x743d0d;
                //     (<any>this.set_music_toggle_switch).set_music_toggle_switch_shut.textColor = 0xffffff;
                // }
                //游戏中开关背景音乐
                if (App.SoundManager.allowPlayBGM && App.SceneManager.getCurScene() instanceof GameScene) {
                    RES.loadGroup(AssetConst.Sound_BGM);
                }
                else {
                    App.SoundManager.stopBGM();
                }
                console.log("music=" + ":" + music + ";" + App.SoundManager.allowPlayBGM);
                break;
            case this.set_sound_toggle_switch:
                var soundEvent = event.target;
                var sound = soundEvent.selected;
                App.SoundManager.allowPlayEffect = sound;
                // if (sound) {               
                //     (<any>this.set_sound_toggle_switch).set_sound_toggle_switch_open.textColor = 0xffffff;
                //     (<any>this.set_sound_toggle_switch).set_sound_toggle_switch_shut.textColor = 0x743d0d;
                // } else {
                //     (<any>this.set_sound_toggle_switch).set_sound_toggle_switch_open.textColor = 0x743d0d;
                //     (<any>this.set_sound_toggle_switch).set_sound_toggle_switch_shut.textColor = 0xffffff;
                // }
                //游戏中加载音效
                if (App.SoundManager.allowPlayEffect && App.SceneManager.getCurScene() instanceof GameScene) {
                    if (App.SoundManager.isGuangDongSpeak) {
                        RES.loadGroup(AssetConst.Sound_GuangDong);
                    }
                    else {
                        RES.loadGroup(AssetConst.Sound_PuTong);
                    }
                    RES.loadGroup(AssetConst.Sound_Other);
                }
                console.log("music=" + ":" + sound + ";" + App.SoundManager.allowPlayEffect);
                break;
            case this.set_bration_toggle_switch:
                var brationEvent = event.target;
                var bration = brationEvent.selected;
                // if (bration) {
                //     (<any>this.set_bration_toggle_switch).set_bration_toggle_switch_open.textColor = 0xffffff;
                //     (<any>this.set_bration_toggle_switch).set_bration_toggle_switch_shut.textColor = 0x743d0d;
                // } else {
                //     (<any>this.set_bration_toggle_switch).set_bration_toggle_switch_open.textColor = 0x743d0d;
                //     (<any>this.set_bration_toggle_switch).set_bration_toggle_switch_shut.textColor = 0xffffff;
                // }
                //发送native震动事件
                bration && App.EventManager.sendEvent(App.EVENT_NATIVE_SHAKE);
                break;
            default:
                break;
        }
    };
    /**关闭*/
    SetPanel.prototype.onCloseBtn = function (e) {
        this.hide();
    };
    return SetPanel;
}(BasePanel));
__reflect(SetPanel.prototype, "SetPanel");
//# sourceMappingURL=SetPanel.js.map