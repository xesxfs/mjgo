var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 声音管理类
 * @author chenkai
 * @date 2016/6/30
 */
var SoundManager = (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        var _this = _super.call(this) || this;
        _this.soundList = {}; //声音列表
        _this._allowPlayEffect = true; //是否允许播放音效
        _this._allowPlayBGM = true; //是否允许播放背景音乐
        _this._effectVolume = 1; //音效音量
        _this._bgmVolume = 1; //背景音量
        _this.girlCard = []; //女生出牌
        _this.girlAct = []; //女生动作
        _this.boyCard = []; //男生出牌
        _this.boyAct = []; //男生动作
        _this.gd_girlCard = []; //广东话
        _this.gd_girlAct = [];
        _this.gd_boyCard = [];
        _this.gd_boyAct = [];
        _this.boyChat = []; //聊天语音
        _this.girlChat = [];
        _this.gd_boyChat = [];
        _this.gd_girlChat = [];
        _this.isGuangDongSpeak = true; //游戏广东话、普通话
        //筒索万
        for (var i = 0; i < 9; i++) {
            _this.boyCard[0x11 + i] = "man" + (i + 11) + "_mp3";
            _this.boyCard[0x21 + i] = "man" + (i + 31) + "_mp3";
            _this.boyCard[0x31 + i] = "man" + (i + 21) + "_mp3";
            _this.girlCard[0x11 + i] = "woman" + (i + 11) + "_mp3";
            _this.girlCard[0x21 + i] = "woman" + (i + 31) + "_mp3";
            _this.girlCard[0x31 + i] = "woman" + (i + 21) + "_mp3";
            _this.gd_boyCard[0x11 + i] = "gd_man" + (i + 11) + "_mp3";
            _this.gd_boyCard[0x21 + i] = "gd_man" + (i + 31) + "_mp3";
            _this.gd_boyCard[0x31 + i] = "gd_man" + (i + 21) + "_mp3";
            _this.gd_girlCard[0x11 + i] = "gd_woman" + (i + 11) + "_mp3";
            _this.gd_girlCard[0x21 + i] = "gd_woman" + (i + 31) + "_mp3";
            _this.gd_girlCard[0x31 + i] = "gd_woman" + (i + 21) + "_mp3";
        }
        //东南西北
        for (var i = 0; i < 4; i++) {
            _this.boyCard[0x41 + i] = "man" + (i + 41) + "_mp3";
            _this.girlCard[0x41 + i] = "woman" + (i + 41) + "_mp3";
            _this.gd_boyCard[0x41 + i] = "gd_man" + (i + 41) + "_mp3";
            _this.gd_girlCard[0x41 + i] = "gd_woman" + (i + 41) + "_mp3";
        }
        //中发门
        for (var i = 0; i < 3; i++) {
            _this.boyCard[0x51 + i] = "man" + (i + 51) + "_mp3";
            _this.girlCard[0x51 + i] = "woman" + (i + 51) + "_mp3";
            _this.gd_boyCard[0x51 + i] = "gd_man" + (i + 51) + "_mp3";
            _this.gd_girlCard[0x51 + i] = "gd_woman" + (i + 51) + "_mp3";
        }
        //吃碰杠胡，每个声音3种
        _this.boyAct[ACT_act.Act_Chi] = [];
        _this.boyAct[ACT_act.Act_AnGang] = [];
        _this.boyAct[ACT_act.Act_Gang] = [];
        _this.boyAct[ACT_act.Act_Hu] = [];
        _this.boyAct[ACT_act.Act_Peng] = [];
        _this.boyAct[ACT_act.Act_zimo] = [];
        _this.girlAct[ACT_act.Act_Chi] = [];
        _this.girlAct[ACT_act.Act_AnGang] = [];
        _this.girlAct[ACT_act.Act_Gang] = [];
        _this.girlAct[ACT_act.Act_Hu] = [];
        _this.girlAct[ACT_act.Act_Peng] = [];
        _this.girlAct[ACT_act.Act_zimo] = [];
        _this.gd_boyAct[ACT_act.Act_Chi] = [];
        _this.gd_boyAct[ACT_act.Act_AnGang] = [];
        _this.gd_boyAct[ACT_act.Act_Gang] = [];
        _this.gd_boyAct[ACT_act.Act_Hu] = [];
        _this.gd_boyAct[ACT_act.Act_Peng] = [];
        _this.gd_boyAct[ACT_act.Act_zimo] = [];
        _this.gd_girlAct[ACT_act.Act_Chi] = [];
        _this.gd_girlAct[ACT_act.Act_AnGang] = [];
        _this.gd_girlAct[ACT_act.Act_Gang] = [];
        _this.gd_girlAct[ACT_act.Act_Hu] = [];
        _this.gd_girlAct[ACT_act.Act_Peng] = [];
        _this.gd_girlAct[ACT_act.Act_zimo] = [];
        for (var i = 0; i < 3; i++) {
            _this.boyAct[ACT_act.Act_Chi][i] = "man_chi" + i + "_mp3";
            _this.boyAct[ACT_act.Act_AnGang][i] = "man_gang" + i + "_mp3";
            _this.boyAct[ACT_act.Act_Gang][i] = "man_gang" + i + "_mp3";
            _this.boyAct[ACT_act.Act_Hu][i] = "man_hu" + i + "_mp3";
            _this.boyAct[ACT_act.Act_Peng][i] = "man_peng" + i + "_mp3";
            _this.boyAct[ACT_act.Act_zimo][i] = "man_zimo" + i + "_mp3";
            _this.girlAct[ACT_act.Act_Chi][i] = "woman_chi" + i + "_mp3";
            _this.girlAct[ACT_act.Act_AnGang][i] = "woman_gang" + i + "_mp3";
            _this.girlAct[ACT_act.Act_Gang][i] = "woman_gang" + i + "_mp3";
            _this.girlAct[ACT_act.Act_Hu][i] = "woman_hu" + i + "_mp3";
            _this.girlAct[ACT_act.Act_Peng][i] = "woman_peng" + i + "_mp3";
            _this.girlAct[ACT_act.Act_zimo][i] = "woman_zimo" + i + "_mp3";
            _this.gd_boyAct[ACT_act.Act_Chi][i] = "gd_man_chi" + i + "_mp3";
            _this.gd_boyAct[ACT_act.Act_AnGang][i] = "gd_man_gang" + i + "_mp3";
            _this.gd_boyAct[ACT_act.Act_Gang][i] = "gd_man_gang" + i + "_mp3";
            _this.gd_boyAct[ACT_act.Act_Hu][i] = "gd_man_hu" + i + "_mp3";
            _this.gd_boyAct[ACT_act.Act_Peng][i] = "gd_man_peng" + i + "_mp3";
            _this.gd_boyAct[ACT_act.Act_zimo][i] = "gd_man_zimo" + i + "_mp3";
            _this.gd_girlAct[ACT_act.Act_Chi][i] = "gd_woman_chi" + i + "_mp3";
            _this.gd_girlAct[ACT_act.Act_AnGang][i] = "gd_woman_gang" + i + "_mp3";
            _this.gd_girlAct[ACT_act.Act_Gang][i] = "gd_woman_gang" + i + "_mp3";
            _this.gd_girlAct[ACT_act.Act_Hu][i] = "gd_woman_hu" + i + "_mp3";
            _this.gd_girlAct[ACT_act.Act_Peng][i] = "gd_woman_peng" + i + "_mp3";
            _this.gd_girlAct[ACT_act.Act_zimo][i] = "gd_woman_zimo" + i + "_mp3";
        }
        //聊天语音
        for (var i = 0; i <= 7; i++) {
            _this.boyChat.push("man_chat" + i + "_mp3");
            _this.gd_boyChat.push("gd_man_chat" + i + "_mp3");
            _this.girlChat.push("woman_chat" + i + "_mp3");
            _this.gd_girlChat.push("gd_woman_chat" + i + "_mp3");
        }
        return _this;
    }
    /**
     * 播放出牌声音
     * @cardValue 牌值
     * @sex 性别
     */
    SoundManager.prototype.playOutCard = function (cardValue, sex) {
        if (sex === void 0) { sex = SEX_TYPE.boy; }
        if (sex == SEX_TYPE.boy) {
            if (this.isGuangDongSpeak) {
                this.playEffect(this.gd_boyCard[cardValue]);
            }
            else {
                this.playEffect(this.boyCard[cardValue]);
            }
        }
        else {
            if (this.isGuangDongSpeak) {
                this.playEffect(this.gd_girlCard[cardValue]);
            }
            else {
                this.playEffect(this.girlCard[cardValue]);
            }
        }
    };
    /**
     * 播放动作声音
     * @act 吃碰杠胡等动作
     * @sex 性别
     */
    SoundManager.prototype.playAct = function (act, sex) {
        if (sex === void 0) { sex = SEX_TYPE.boy; }
        var rand = NumberTool.getRandInt(0, 2);
        if (sex == SEX_TYPE.boy) {
            if (this.isGuangDongSpeak) {
                this.gd_boyAct[act] && this.playEffect(this.gd_boyAct[act][rand]);
            }
            else {
                this.boyAct[act] && this.playEffect(this.boyAct[act][rand]);
            }
        }
        else {
            if (this.isGuangDongSpeak) {
                this.gd_girlAct[act] && this.playEffect(this.gd_girlAct[act][rand]);
            }
            else {
                this.girlAct[act] && this.playEffect(this.girlAct[act][rand]);
            }
        }
    };
    /**
     * 播放聊天语音
     * @chatType 聊天类型0-7
     * @sex 性别
     */
    SoundManager.prototype.playChat = function (chatType, sex) {
        if (sex === void 0) { sex = SEX_TYPE.boy; }
        if (sex == SEX_TYPE.boy) {
            if (this.isGuangDongSpeak) {
                this.gd_boyChat[chatType] && this.playEffect(this.gd_boyChat[chatType]);
            }
            else {
                this.boyChat[chatType] && this.playEffect(this.boyChat[chatType]);
            }
        }
        else {
            if (this.isGuangDongSpeak) {
                this.gd_girlChat[chatType] && this.playEffect(this.gd_girlChat[chatType]);
            }
            else {
                this.girlChat[chatType] && this.playEffect(this.girlChat[chatType]);
            }
        }
    };
    /**
     * 播放音效
     * @param soundName 声音名
     * @param startTime 播放起始位置
     * @param loops 循环次数
     */
    SoundManager.prototype.playEffect = function (soundName, startTime, loops) {
        if (startTime === void 0) { startTime = 0; }
        if (loops === void 0) { loops = 1; }
        if (this.allowPlayEffect == false) {
            return;
        }
        //从声音列表中获取,声音列表中不存在，则从加载资源中获取
        var sound = this.soundList[soundName];
        if (sound == null) {
            sound = RES.getRes(soundName);
            if (sound != null) {
                this.soundList[soundName] = sound;
            }
            else {
            }
        }
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            var channel = sound.play(startTime, loops);
            channel.volume = this._effectVolume;
        }
    };
    /**
     * 播放背景音乐
     * @param bgmName 背景音名
     * @param startTime 播放起始位置
     * @param loops 循环次数
     */
    SoundManager.prototype.playBGM = function (bgmName, startTime, loops) {
        if (startTime === void 0) { startTime = 0; }
        if (loops === void 0) { loops = Number.MAX_VALUE; }
        if (this.allowPlayBGM == false || this.bgmChannel != null) {
            return;
        }
        this.stopBGM();
        var bgm = this.soundList[bgmName];
        if (bgm == null) {
            bgm = RES.getRes(bgmName);
            bgm && (this.soundList[bgmName] = bgm);
        }
        if (bgm) {
            bgm.type = egret.Sound.MUSIC;
            this.bgmChannel = bgm.play(startTime, loops);
            this.bgmChannel.volume = this._bgmVolume;
        }
    };
    /**停止背景音乐*/
    SoundManager.prototype.stopBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    };
    Object.defineProperty(SoundManager.prototype, "allowPlayEffect", {
        /**获取是否允许播放音效*/
        get: function () {
            return this._allowPlayEffect;
        },
        /**设置是否允许播放音效*/
        set: function (bAllow) {
            this._allowPlayEffect = bAllow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "allowPlayBGM", {
        /**获取是否允许播放背景音*/
        get: function () {
            return this._allowPlayBGM;
        },
        /**设置是否允许播放背景音*/
        set: function (bAllow) {
            this._allowPlayBGM = bAllow;
            if (this._allowPlayBGM == false) {
                this.stopBGM();
            }
            else {
                this.playBGM(SoundManager.bgm);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "effectVolume", {
        /**获取音效音量*/
        get: function () {
            return this._effectVolume;
        },
        /**设置音效音量*/
        set: function (value) {
            this._effectVolume = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "bgmVolume", {
        /**获取BGM音量*/
        get: function () {
            return this._bgmVolume;
        },
        /**设置BGM音量*/
        set: function (value) {
            this._bgmVolume = value;
            if (this.bgmChannel) {
                this.bgmChannel.volume = this._bgmVolume;
            }
        },
        enumerable: true,
        configurable: true
    });
    return SoundManager;
}(SingleClass));
SoundManager.win = "audio_win_mp3"; //胜利
SoundManager.lose = "audio_lose_mp3"; //输
SoundManager.warn = "audio_warn_mp3"; //倒计时小于3秒
SoundManager.hall_click = "audio_button_click_mp3"; //大厅点击按钮
SoundManager.clickCard = "audio_card_click_mp3"; //点击牌
SoundManager.enter = "audio_enter_mp3"; //玩家进入
SoundManager.bgm = "Audio_Game_Back_mp3"; //背景音乐
SoundManager.user_left = "audio_left_mp3"; //玩家离开
SoundManager.liuju = "audio_liuju_mp3"; //流局
SoundManager.ready = "audio_ready_mp3"; //准备
SoundManager.shazi = "audio_shaizi_mp3"; //骰子
SoundManager.tuoGuan = "audio_tuo_guan_mp3"; //托管
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map