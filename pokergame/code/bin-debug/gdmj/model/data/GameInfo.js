var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏数据
 * @author chenkai
 * @date 2016/6/29
 */
var GameInfo = (function () {
    function GameInfo() {
        //聊天信息
        this.Chat_Msg = [
            "大家好，很高兴见到各位！",
            "快点吧,我等到花儿都谢了！",
            "不要走，决战到天亮！",
            "你是帅哥还是美女啊？",
            "君子报仇，十盘不算晚!",
            "快放炮啊，我都等得不耐烦了。",
            "真不好意思，又胡了。",
            "打错了...呜呜呜"
        ];
        //特殊玩法：一炮三响，三元牌，风位风圈刻字，海底捞月，抢杠胡，杠上开花，杠上开花包杠,大三元包自摸,大四喜包自摸、十二张落地包自摸
        //胡牌类型
        this.huTypeList = [
            "",
            "鸡胡",
            "平胡",
            "自摸",
            "风位",
            "风圈",
            "三元牌",
            "三元牌",
            "三元牌",
            "碰碰胡",
            "混一色",
            "一炮三响",
            "杠上开花",
            "海底捞月",
            "清一色",
            "混碰",
            "清碰",
            "混幺九",
            "小三元",
            "小四喜",
            "字一色",
            "清幺九",
            "大三元",
            "大四喜",
            "九莲宝灯",
            "十三幺",
            "抢杠胡",
            "天胡",
            "人胡",
            "地胡",
            "小胡",
            "无鬼",
            "杠上开花",
            "满鬼",
            "清一色",
            "字一色",
            "七对子",
            "四暗刻",
            "十八罗汉",
            "大三元",
            "小四喜",
            "大四喜",
            "十三幺",
            "抢杠胡",
            "杠牌加番"
        ];
        /**包三家玩法*/
        this.BaoSanJia = [
            "杠上开花包杠",
            "12张落地",
            "大三元包自摸",
            "大四喜包自摸",
            "抢杠胡"
        ];
        /**玩法列表，有些胡牌类型属于玩法，而不是番型*/
        this.playTypeList = [
            MJ_TYPE.MJTYPE_JIPINGHU_FENG_WEI,
            MJ_TYPE.MJTYPE_JIPINGHU_FENG_QUAN,
            MJ_TYPE.MJTYPE_JIPINGHU_JIAN_ZHONG,
            MJ_TYPE.MJTYPE_JIPINGHU_JIAN_BAI,
            MJ_TYPE.MJTYPE_JIPINGHU_JIAN_FA,
            MJ_TYPE.MJTYPE_JIPINGHU_YI_PAO_SAN_XIANG,
            MJ_TYPE.MJTYPE_JIPINGHU_GANG_SHANG_KAI_HUA,
            MJ_TYPE.MJTYPE_JIPINGHU_HAI_DI_LAO_YUE,
            MJ_TYPE.MJTYPE_JIPINGHU_QIANG_GANG_HU,
            MJ_TYPE.MJTYPE_TUIDAOHU_GANG_SHANG_KAI_HUA,
            MJ_TYPE.MJTYPE_TUIDAOHU_QIANG_GANG,
            MJ_TYPE.MJTYPE_JIPINGHU_GANG_ADD_FAN //杠牌加番                  
        ];
    }
    return GameInfo;
}());
__reflect(GameInfo.prototype, "GameInfo");
//动作
var ACT_state;
(function (ACT_state) {
    ACT_state[ACT_state["Act_Pass"] = 1] = "Act_Pass";
    ACT_state[ACT_state["Act_NormalDo"] = 2] = "Act_NormalDo";
    ACT_state[ACT_state["Act_Ting"] = 4] = "Act_Ting";
    ACT_state[ACT_state["Act_Chi"] = 8] = "Act_Chi";
    ACT_state[ACT_state["Act_Peng"] = 16] = "Act_Peng";
    ACT_state[ACT_state["Act_Gang"] = 32] = "Act_Gang";
    ACT_state[ACT_state["Act_AnGang"] = 64] = "Act_AnGang";
    ACT_state[ACT_state["Act_Hu"] = 128] = "Act_Hu"; //胡
})(ACT_state || (ACT_state = {}));
;
var ACT_act;
(function (ACT_act) {
    ACT_act[ACT_act["Act_ChangeCard"] = -2] = "Act_ChangeCard";
    ACT_act[ACT_act["Act_GetCard"] = -1] = "Act_GetCard";
    ACT_act[ACT_act["Act_Pass"] = 0] = "Act_Pass";
    ACT_act[ACT_act["Act_NormalDo"] = 1] = "Act_NormalDo";
    ACT_act[ACT_act["Act_Ting"] = 2] = "Act_Ting";
    ACT_act[ACT_act["Act_Chi"] = 3] = "Act_Chi";
    ACT_act[ACT_act["Act_Peng"] = 4] = "Act_Peng";
    ACT_act[ACT_act["Act_Gang"] = 5] = "Act_Gang";
    ACT_act[ACT_act["Act_AnGang"] = 6] = "Act_AnGang";
    ACT_act[ACT_act["Act_Hu"] = 7] = "Act_Hu";
    ACT_act[ACT_act["Act_zimo"] = 8] = "Act_zimo"; //自摸,额外添加
})(ACT_act || (ACT_act = {}));
;
//胡牌类型
var MJ_TYPE;
(function (MJ_TYPE) {
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_JI_HU"] = 1] = "MJTYPE_JIPINGHU_JI_HU";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_PING_HU"] = 2] = "MJTYPE_JIPINGHU_PING_HU";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_ZI_MO"] = 3] = "MJTYPE_JIPINGHU_ZI_MO";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_FENG_WEI"] = 4] = "MJTYPE_JIPINGHU_FENG_WEI";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_FENG_QUAN"] = 5] = "MJTYPE_JIPINGHU_FENG_QUAN";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_JIAN_ZHONG"] = 6] = "MJTYPE_JIPINGHU_JIAN_ZHONG";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_JIAN_BAI"] = 7] = "MJTYPE_JIPINGHU_JIAN_BAI";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_JIAN_FA"] = 8] = "MJTYPE_JIPINGHU_JIAN_FA";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_PENG_PENG_HU"] = 9] = "MJTYPE_JIPINGHU_PENG_PENG_HU";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_HUN_YI_SE"] = 10] = "MJTYPE_JIPINGHU_HUN_YI_SE";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_YI_PAO_SAN_XIANG"] = 11] = "MJTYPE_JIPINGHU_YI_PAO_SAN_XIANG";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_GANG_SHANG_KAI_HUA"] = 12] = "MJTYPE_JIPINGHU_GANG_SHANG_KAI_HUA";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_HAI_DI_LAO_YUE"] = 13] = "MJTYPE_JIPINGHU_HAI_DI_LAO_YUE";
    // 下面是爆胡
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_QING_YI_SE"] = 14] = "MJTYPE_JIPINGHU_QING_YI_SE";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_HUN_PENG"] = 15] = "MJTYPE_JIPINGHU_HUN_PENG";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_QING_PENG"] = 16] = "MJTYPE_JIPINGHU_QING_PENG";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_HUN_YAO_JIU"] = 17] = "MJTYPE_JIPINGHU_HUN_YAO_JIU";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_XIAO_SAN_YUAN"] = 18] = "MJTYPE_JIPINGHU_XIAO_SAN_YUAN";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_XIAO_SI_XI"] = 19] = "MJTYPE_JIPINGHU_XIAO_SI_XI";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_ZI_YI_SE"] = 20] = "MJTYPE_JIPINGHU_ZI_YI_SE";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_QING_YAO_JIU"] = 21] = "MJTYPE_JIPINGHU_QING_YAO_JIU";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_DA_SAN_YUAN"] = 22] = "MJTYPE_JIPINGHU_DA_SAN_YUAN";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_DA_SI_XI"] = 23] = "MJTYPE_JIPINGHU_DA_SI_XI";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_JIU_LIAN_BAO_DENG"] = 24] = "MJTYPE_JIPINGHU_JIU_LIAN_BAO_DENG";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_SHI_SAN_YAO"] = 25] = "MJTYPE_JIPINGHU_SHI_SAN_YAO";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_QIANG_GANG_HU"] = 26] = "MJTYPE_JIPINGHU_QIANG_GANG_HU";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_TIAN_HU"] = 27] = "MJTYPE_JIPINGHU_TIAN_HU";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_REN_HU"] = 28] = "MJTYPE_JIPINGHU_REN_HU";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_DI_HU"] = 29] = "MJTYPE_JIPINGHU_DI_HU";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_BASE_TYPE"] = 30] = "MJTYPE_TUIDAOHU_BASE_TYPE";
    // 下面是大胡
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_WU_ONI"] = 31] = "MJTYPE_TUIDAOHU_WU_ONI";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_GANG_SHANG_KAI_HUA"] = 32] = "MJTYPE_TUIDAOHU_GANG_SHANG_KAI_HUA";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_MAN_ONI"] = 33] = "MJTYPE_TUIDAOHU_MAN_ONI";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_QING_YI_SE"] = 34] = "MJTYPE_TUIDAOHU_QING_YI_SE";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_ZI_YI_SE"] = 35] = "MJTYPE_TUIDAOHU_ZI_YI_SE";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_QI_DUI_ZI"] = 36] = "MJTYPE_TUIDAOHU_QI_DUI_ZI";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_SI_AN_KE"] = 37] = "MJTYPE_TUIDAOHU_SI_AN_KE";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_SHI_BA_LOU_HAN"] = 38] = "MJTYPE_TUIDAOHU_SHI_BA_LOU_HAN";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_DA_SAN_YUAN"] = 39] = "MJTYPE_TUIDAOHU_DA_SAN_YUAN";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_XIAO_SI_XI"] = 40] = "MJTYPE_TUIDAOHU_XIAO_SI_XI";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_DA_SI_XI"] = 41] = "MJTYPE_TUIDAOHU_DA_SI_XI";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_SHI_SAN_YAO"] = 42] = "MJTYPE_TUIDAOHU_SHI_SAN_YAO";
    MJ_TYPE[MJ_TYPE["MJTYPE_TUIDAOHU_QIANG_GANG"] = 43] = "MJTYPE_TUIDAOHU_QIANG_GANG";
    MJ_TYPE[MJ_TYPE["MJTYPE_JIPINGHU_GANG_ADD_FAN"] = 44] = "MJTYPE_JIPINGHU_GANG_ADD_FAN"; //杠牌加番
})(MJ_TYPE || (MJ_TYPE = {}));
;
//游戏状态
var GS_GAME_STATION;
(function (GS_GAME_STATION) {
    GS_GAME_STATION[GS_GAME_STATION["GS_WAIT_SETGAME"] = 0] = "GS_WAIT_SETGAME";
    GS_GAME_STATION[GS_GAME_STATION["GS_WAIT_ARGEE"] = 1] = "GS_WAIT_ARGEE";
    GS_GAME_STATION[GS_GAME_STATION["GS_GAME_PLAYING"] = 2] = "GS_GAME_PLAYING";
    GS_GAME_STATION[GS_GAME_STATION["GS_GAME_FINSHED"] = 3] = "GS_GAME_FINSHED";
})(GS_GAME_STATION || (GS_GAME_STATION = {}));
;
//游戏配置中，游戏类型
var GAME_TYPE;
(function (GAME_TYPE) {
    GAME_TYPE[GAME_TYPE["JI_PING_HU"] = 1] = "JI_PING_HU";
    GAME_TYPE[GAME_TYPE["TUI_DAO_HU"] = 2] = "TUI_DAO_HU";
})(GAME_TYPE || (GAME_TYPE = {}));
;
//牌值
var MJ_CARD_VAL;
(function (MJ_CARD_VAL) {
    MJ_CARD_VAL[MJ_CARD_VAL["BLACK"] = 0] = "BLACK";
    MJ_CARD_VAL[MJ_CARD_VAL["WAN_1"] = 17] = "WAN_1";
    MJ_CARD_VAL[MJ_CARD_VAL["WAN_2"] = 18] = "WAN_2";
    MJ_CARD_VAL[MJ_CARD_VAL["WAN_3"] = 19] = "WAN_3";
    MJ_CARD_VAL[MJ_CARD_VAL["WAN_4"] = 20] = "WAN_4";
    MJ_CARD_VAL[MJ_CARD_VAL["WAN_5"] = 21] = "WAN_5";
    MJ_CARD_VAL[MJ_CARD_VAL["WAN_6"] = 22] = "WAN_6";
    MJ_CARD_VAL[MJ_CARD_VAL["WAN_7"] = 23] = "WAN_7";
    MJ_CARD_VAL[MJ_CARD_VAL["WAN_8"] = 24] = "WAN_8";
    MJ_CARD_VAL[MJ_CARD_VAL["WAN_9"] = 25] = "WAN_9";
    MJ_CARD_VAL[MJ_CARD_VAL["TIAO_1"] = 33] = "TIAO_1";
    MJ_CARD_VAL[MJ_CARD_VAL["TIAO_2"] = 34] = "TIAO_2";
    MJ_CARD_VAL[MJ_CARD_VAL["TIAO_3"] = 35] = "TIAO_3";
    MJ_CARD_VAL[MJ_CARD_VAL["TIAO_4"] = 36] = "TIAO_4";
    MJ_CARD_VAL[MJ_CARD_VAL["TIAO_5"] = 37] = "TIAO_5";
    MJ_CARD_VAL[MJ_CARD_VAL["TIAO_6"] = 38] = "TIAO_6";
    MJ_CARD_VAL[MJ_CARD_VAL["TIAO_7"] = 39] = "TIAO_7";
    MJ_CARD_VAL[MJ_CARD_VAL["TIAO_8"] = 40] = "TIAO_8";
    MJ_CARD_VAL[MJ_CARD_VAL["TIAO_9"] = 41] = "TIAO_9";
    MJ_CARD_VAL[MJ_CARD_VAL["BING_1"] = 49] = "BING_1";
    MJ_CARD_VAL[MJ_CARD_VAL["BING_2"] = 50] = "BING_2";
    MJ_CARD_VAL[MJ_CARD_VAL["BING_3"] = 51] = "BING_3";
    MJ_CARD_VAL[MJ_CARD_VAL["BING_4"] = 52] = "BING_4";
    MJ_CARD_VAL[MJ_CARD_VAL["BING_5"] = 53] = "BING_5";
    MJ_CARD_VAL[MJ_CARD_VAL["BING_6"] = 54] = "BING_6";
    MJ_CARD_VAL[MJ_CARD_VAL["BING_7"] = 55] = "BING_7";
    MJ_CARD_VAL[MJ_CARD_VAL["BING_8"] = 56] = "BING_8";
    MJ_CARD_VAL[MJ_CARD_VAL["BING_9"] = 57] = "BING_9";
    MJ_CARD_VAL[MJ_CARD_VAL["FENG_DONG"] = 65] = "FENG_DONG";
    MJ_CARD_VAL[MJ_CARD_VAL["FENG_NAN"] = 66] = "FENG_NAN";
    MJ_CARD_VAL[MJ_CARD_VAL["FENG_XI"] = 67] = "FENG_XI";
    MJ_CARD_VAL[MJ_CARD_VAL["FENG_BEI"] = 68] = "FENG_BEI";
    MJ_CARD_VAL[MJ_CARD_VAL["JIAN_ZHONG"] = 81] = "JIAN_ZHONG";
    MJ_CARD_VAL[MJ_CARD_VAL["JIAN_FA"] = 82] = "JIAN_FA";
    MJ_CARD_VAL[MJ_CARD_VAL["JIAN_BAI"] = 83] = "JIAN_BAI";
    MJ_CARD_VAL[MJ_CARD_VAL["HUA_CHUN"] = 97] = "HUA_CHUN";
    MJ_CARD_VAL[MJ_CARD_VAL["HUA_XIA"] = 98] = "HUA_XIA";
    MJ_CARD_VAL[MJ_CARD_VAL["HUA_QOU"] = 99] = "HUA_QOU";
    MJ_CARD_VAL[MJ_CARD_VAL["HUA_DONG"] = 100] = "HUA_DONG";
    MJ_CARD_VAL[MJ_CARD_VAL["HUA_MEI"] = 101] = "HUA_MEI";
    MJ_CARD_VAL[MJ_CARD_VAL["HUA_LAN"] = 102] = "HUA_LAN";
    MJ_CARD_VAL[MJ_CARD_VAL["HUA_ZHU"] = 103] = "HUA_ZHU";
    MJ_CARD_VAL[MJ_CARD_VAL["HUA_JU"] = 104] = "HUA_JU";
})(MJ_CARD_VAL || (MJ_CARD_VAL = {}));
;
//玩家状态  1111二进制表示，可多种状态叠加
var PLAYER_STATE;
(function (PLAYER_STATE) {
    PLAYER_STATE[PLAYER_STATE["TRSHIP"] = 1] = "TRSHIP";
    PLAYER_STATE[PLAYER_STATE["ESC"] = 2] = "ESC";
    PLAYER_STATE[PLAYER_STATE["READY"] = 4] = "READY";
    PLAYER_STATE[PLAYER_STATE["SETTLE"] = 8] = "SETTLE";
})(PLAYER_STATE || (PLAYER_STATE = {}));
;
//人物坐的实际位置，上下左右
var UserPosition;
(function (UserPosition) {
    UserPosition[UserPosition["NULL"] = -1] = "NULL";
    UserPosition[UserPosition["Down"] = 0] = "Down";
    UserPosition[UserPosition["R"] = 1] = "R";
    UserPosition[UserPosition["Up"] = 2] = "Up";
    UserPosition[UserPosition["L"] = 3] = "L";
})(UserPosition || (UserPosition = {}));
//聊天类型
var CHAT_TYPE;
(function (CHAT_TYPE) {
    CHAT_TYPE[CHAT_TYPE["Common"] = 0] = "Common";
    CHAT_TYPE[CHAT_TYPE["Face"] = 1] = "Face";
    CHAT_TYPE[CHAT_TYPE["Text"] = 2] = "Text";
    CHAT_TYPE[CHAT_TYPE["Voice"] = 3] = "Voice"; //语音
})(CHAT_TYPE || (CHAT_TYPE = {}));
/**性别类型*/
var SEX_TYPE;
(function (SEX_TYPE) {
    SEX_TYPE[SEX_TYPE["boy"] = 1] = "boy";
    SEX_TYPE[SEX_TYPE["girl"] = 2] = "girl";
    SEX_TYPE[SEX_TYPE["unknow"] = 3] = "unknow";
})(SEX_TYPE || (SEX_TYPE = {}));
/**风牌*/
var MJ_FENG_POINT;
(function (MJ_FENG_POINT) {
    MJ_FENG_POINT[MJ_FENG_POINT["DONG"] = 1] = "DONG";
    MJ_FENG_POINT[MJ_FENG_POINT["NAN"] = 2] = "NAN";
    MJ_FENG_POINT[MJ_FENG_POINT["XI"] = 3] = "XI";
    MJ_FENG_POINT[MJ_FENG_POINT["BEI"] = 4] = "BEI";
})(MJ_FENG_POINT || (MJ_FENG_POINT = {}));
;
/**动作表情*/
var ACT_FACE;
(function (ACT_FACE) {
    ACT_FACE[ACT_FACE["Boom"] = 1] = "Boom";
    ACT_FACE[ACT_FACE["FanQie"] = 2] = "FanQie";
    ACT_FACE[ACT_FACE["Stone"] = 3] = "Stone";
    ACT_FACE[ACT_FACE["Zan"] = 4] = "Zan";
    ACT_FACE[ACT_FACE["Kiss"] = 5] = "Kiss";
    ACT_FACE[ACT_FACE["Flower"] = 6] = "Flower";
})(ACT_FACE || (ACT_FACE = {}));
//包三家类型
var MJ_BAO_SAN_JIA_TYPE;
(function (MJ_BAO_SAN_JIA_TYPE) {
    MJ_BAO_SAN_JIA_TYPE[MJ_BAO_SAN_JIA_TYPE["BAO_SAN_JIA_TYPE_GANG_KAI"] = 0] = "BAO_SAN_JIA_TYPE_GANG_KAI";
    MJ_BAO_SAN_JIA_TYPE[MJ_BAO_SAN_JIA_TYPE["BAO_SAN_JIA_TYPE_12"] = 1] = "BAO_SAN_JIA_TYPE_12";
    MJ_BAO_SAN_JIA_TYPE[MJ_BAO_SAN_JIA_TYPE["BAO_SAN_JIA_TYPE_DA_SAN_YUAN"] = 2] = "BAO_SAN_JIA_TYPE_DA_SAN_YUAN";
    MJ_BAO_SAN_JIA_TYPE[MJ_BAO_SAN_JIA_TYPE["BAO_SAN_JIA_TYPE_DA_SI_XI"] = 3] = "BAO_SAN_JIA_TYPE_DA_SI_XI";
    MJ_BAO_SAN_JIA_TYPE[MJ_BAO_SAN_JIA_TYPE["BAO_SAN_JIA_TYPE_QIANG_GANG"] = 4] = "BAO_SAN_JIA_TYPE_QIANG_GANG";
})(MJ_BAO_SAN_JIA_TYPE || (MJ_BAO_SAN_JIA_TYPE = {}));
;
/**房间类型*/
var Game_ID;
(function (Game_ID) {
    Game_ID[Game_ID["CardRoom"] = 99999999] = "CardRoom";
    Game_ID[Game_ID["GoldRoom"] = 99999997] = "GoldRoom";
    Game_ID[Game_ID["selfRoom"] = 99999995] = "selfRoom";
})(Game_ID || (Game_ID = {}));
;
/**金币场等级*/
var Room_Level;
(function (Room_Level) {
    Room_Level[Room_Level["Level1"] = 1] = "Level1";
    Room_Level[Room_Level["Level2"] = 2] = "Level2";
    Room_Level[Room_Level["Level3"] = 3] = "Level3";
    Room_Level[Room_Level["Level4"] = 4] = "Level4"; //富豪
})(Room_Level || (Room_Level = {}));
/**服务器类型*/
var Server_Type;
(function (Server_Type) {
    Server_Type[Server_Type["createRoom"] = 1] = "createRoom";
    Server_Type[Server_Type["joinRoom"] = 2] = "joinRoom"; //加入房间  (金币场时为推倒胡，专属房时为加入其它人房间)
})(Server_Type || (Server_Type = {}));
//踢人理由
var KickCause;
(function (KickCause) {
    KickCause[KickCause["PREPARE_TIME_OUT"] = 1] = "PREPARE_TIME_OUT";
    KickCause[KickCause["MONEY_TOO_LITTLE"] = 2] = "MONEY_TOO_LITTLE";
    KickCause[KickCause["MONEY_TOO_MORE"] = 3] = "MONEY_TOO_MORE"; //钱太多
})(KickCause || (KickCause = {}));
/**游戏状态*/
var GameState;
(function (GameState) {
    GameState[GameState["Free"] = 0] = "Free";
    GameState[GameState["Ready"] = 1] = "Ready";
    GameState[GameState["DealCard"] = 2] = "DealCard";
    GameState[GameState["Playing"] = 3] = "Playing";
    GameState[GameState["GameOver"] = 4] = "GameOver";
    GameState[GameState["Replay"] = 5] = "Replay"; //回放
})(GameState || (GameState = {}));
/**专属房信息 */
var ExRoomInformation = {
    deskCode: 0,
    hasYiPaoSanXiang: "一炮三响",
    hasHaiDiLaoYue: "海底捞月",
    hasMaiMa: "买马",
    hasFengQuan: "风位风圈刻子",
    hasFengWei: "风位刻子",
    hasSanYuan: "三元牌",
    hasGangAddFan: "杠牌加番",
    hasQiangGang: "抢杠",
    hasBuBuGao: "步步高",
    hasGangShangKaiHua: "杠上开花",
    vipDate: 0,
    timelimit: "",
    basePoint: 0,
    deposit: 0,
    ownerName: "",
    playCount: 0,
    chip: 0
};
//# sourceMappingURL=GameInfo.js.map