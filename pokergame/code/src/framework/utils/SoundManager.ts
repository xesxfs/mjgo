/**
 * 声音管理类
 * @author chenkai
 * @date 2016/6/30
 */
class SoundManager extends SingleClass{
    private soundList = {};                    //声音列表
    private bgmChannel:egret.SoundChannel;     //背景音声道
    private _allowPlayEffect:boolean = true;   //是否允许播放音效
    private _allowPlayBGM:boolean = true;      //是否允许播放背景音乐
    private _effectVolume:number = 1;          //音效音量
    private _bgmVolume:number = 1;             //背景音量

    private girlCard = [];                     //女生出牌
    private girlAct = [];                      //女生动作
    private boyCard = [];                      //男生出牌
    private boyAct = [];                       //男生动作

    private gd_girlCard = [];                  //广东话
    private gd_girlAct = [];
    private gd_boyCard = [];
    private gd_boyAct = [];

    private boyChat = [];                      //聊天语音
    private girlChat = [];
    private gd_boyChat = [];
    private gd_girlChat = [];

    public isGuangDongSpeak:boolean = true; //游戏广东话、普通话

    public static win:string = "audio_win_mp3";                  //胜利
    public static lose:string = "audio_lose_mp3";                //输
    public static warn:string = "audio_warn_mp3";                //倒计时小于3秒
    public static hall_click:string = "audio_button_click_mp3";  //大厅点击按钮
    public static clickCard:string = "audio_card_click_mp3";     //点击牌
    public static enter:string = "audio_enter_mp3";              //玩家进入
    public static bgm:string = "Audio_Game_Back_mp3";            //背景音乐
    public static user_left:string = "audio_left_mp3";           //玩家离开
    public static liuju:string = "audio_liuju_mp3";              //流局
    public static ready:string = "audio_ready_mp3";              //准备
    public static shazi:string = "audio_shaizi_mp3";             //骰子
    public static tuoGuan:string = "audio_tuo_guan_mp3";         //托管

    public constructor(){
        super();
        //筒索万
        for(var i=0;i<9;i++){
            this.boyCard[0x11+i] = "man" + (i+11) + "_mp3";
            this.boyCard[0x21+i] = "man" + (i+31) + "_mp3";
            this.boyCard[0x31+i] = "man" + (i+21) + "_mp3";
            this.girlCard[0x11+i] = "woman" + (i+11) + "_mp3";
            this.girlCard[0x21+i] ="woman" + (i+31) + "_mp3";
            this.girlCard[0x31+i] = "woman" + (i+21) + "_mp3";

            this.gd_boyCard[0x11+i] = "gd_man" + (i+11) + "_mp3";
            this.gd_boyCard[0x21+i] = "gd_man" + (i+31) + "_mp3";
            this.gd_boyCard[0x31+i] = "gd_man" + (i+21) + "_mp3";
            this.gd_girlCard[0x11+i] = "gd_woman" + (i+11) + "_mp3";
            this.gd_girlCard[0x21+i] ="gd_woman" + (i+31) + "_mp3";
            this.gd_girlCard[0x31+i] = "gd_woman" + (i+21) + "_mp3";
        }
        //东南西北
        for(var i=0;i<4;i++){
            this.boyCard[0x41 + i] = "man" + (i+41) + "_mp3";
            this.girlCard[0x41 + i] = "woman" + (i+41) + "_mp3";

            this.gd_boyCard[0x41 + i] = "gd_man" + (i+41) + "_mp3";
            this.gd_girlCard[0x41 + i] = "gd_woman" + (i+41) + "_mp3";
        }
        //中发门
        for(var i=0;i<3;i++){
            this.boyCard[0x51 + i] = "man" + (i+51) + "_mp3";
            this.girlCard[0x51 + i] = "woman" + (i+51) + "_mp3";

            this.gd_boyCard[0x51 + i] = "gd_man" + (i+51) + "_mp3";
            this.gd_girlCard[0x51 + i] = "gd_woman" + (i+51) + "_mp3";
        }


        for(var i=0;i<3;i++){

        }

        //聊天语音
        for(var i=0;i<=7;i++){
            this.boyChat.push("man_chat" + i +"_mp3");
            this.gd_boyChat.push("gd_man_chat" + i +"_mp3");
            this.girlChat.push("woman_chat" + i + "_mp3");
            this.gd_girlChat.push("gd_woman_chat" + i + "_mp3");
        }
        
    }




}
