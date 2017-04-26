var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Http协议
 * @author chenkai
 * @date 2016/11/17
 */
var ProtocolHttp = (function () {
    function ProtocolHttp() {
    }
    return ProtocolHttp;
}());
/**http 头*/
ProtocolHttp.httpHead = {
    ver: "1.6.1",
    AssetID: 1,
    mainID: 100
};
/**接收登录*/
ProtocolHttp.rev_z_login = {
    ret: 0,
    desc: "",
    action: "",
    mainID: 0,
    AssetID: 0,
    data: {
        hadinvited: 1,
        deskTime: "",
        user: "",
        name: "",
        sex: -1,
        skey: "",
        avater_url: "",
        password: "",
        is_overtime: 0,
        last_ip: "",
        uid: 0,
        ip: "",
        port: "",
        prushport: "",
        excluroom_name: "",
        excluroom_code: ""
    }
};
/**测试账号登录*/
ProtocolHttp.send_z_login = {
    action: "Login",
    param: {}
};
/**微信授权页面登录*/
ProtocolHttp.send_z_loginweixin = {
    action: "LoginWeiXin",
    param: { code: "" }
};
/**Native微信登录*/
ProtocolHttp.send_z_loginapp = {
    action: "LoginApp",
    param: { code: "", refToken: "" }
};
/**雀神榜 {"playerID":9226}}*/
ProtocolHttp.send_z_godrank = {
    action: "Billboard",
    param: { playerID: 0 }
};
/**财富榜榜*/
ProtocolHttp.send_z_richrank = {
    action: "Wealthboard", param: { playerID: 0 }
};
/**积分榜榜*/
ProtocolHttp.send_z_scorerank = {
    action: "Integrationboard", param: { playerID: 0 }
};
/**领奖*/
ProtocolHttp.send_z_avard = {
    action: "Receiveprize", skey: "74db1b6807182ffa1bf7a04cbc6a4562", uid: 0, param: []
};
/**战绩*/
ProtocolHttp.send_z_combat = {
    action: "CombatGains",
    param: { playerID: 0 }
};
/**战绩详情*/
ProtocolHttp.send_z_combatdetail = {
    action: "CombatGainsdetail",
    param: { deskno: 0, buildDate: 0, playerID: 0, roomid: 0 }
};
/**反馈*/
ProtocolHttp.send_z_feedback = {
    skey: "",
    uid: 0,
    action: "Feedbacks",
    param: { content: "" }
};
/**购买*/
ProtocolHttp.send_z_buyprop = {
    action: "BuyProp",
    skey: "",
    uid: 0,
    param: { propid: 0 }
};
/**支付方式*/
ProtocolHttp.send_z_buypayment = {
    action: "Payment",
    skey: "",
    uid: 0,
    param: {}
};
/**获取背包*/
ProtocolHttp.get_z_back = {
    action: "GetBackpack",
    skey: "",
    uid: 0,
    param: {}
};
/**商品列表   type(1钻石，2独立型房卡，3共付型房卡)*/
ProtocolHttp.send_z_goodsList = {
    action: "GoodsList",
    skey: "",
    uid: 0,
    param: { type: 0 }
};
/**公告跑马灯*/
ProtocolHttp.send_z_marquee = {
    action: "Marquee",
    param: []
};
/**回放*/
ProtocolHttp.send_z_replayCombatGain = {
    action: "ReplayCombatGain",
    skey: "",
    uid: 0,
    param: { replaycode: 0 }
};
/**爱贝支付*/
ProtocolHttp.send_z_Pay = {
    action: "ApplyABPay",
    skey: "",
    uid: 0,
    param: { goodsid: 0, pay_type: 0 }
};
/**邮件列表*/
ProtocolHttp.send_z_emailList = {
    action: "GetEmailByUser",
    skey: "",
    uid: 0,
    param: []
};
/**邮件详情*/
ProtocolHttp.send_z_emailDetail = {
    action: "ReadEmail",
    skey: "",
    uid: 0,
    param: { eid: 0 }
};
/**获取邮件物品*/
ProtocolHttp.send_z_getEmailGoods = {
    action: "ReceiveEmail",
    skey: "",
    uid: 0,
    param: { eid: 0 }
};
/**获取所有邮件物品*/
ProtocolHttp.send_z_getAllEmailGoods = {
    action: "ReceiveEmail",
    skey: "",
    uid: 0,
    param: []
};
/**删除所有邮件*/
ProtocolHttp.send_z_delAllEmail = {
    action: "OneKeyDel",
    skey: "",
    uid: 0,
    param: []
};
/**检查邮件状态*/
ProtocolHttp.send_z_checkMail = {
    action: "CheckMail",
    skey: "",
    uid: 0,
    param: []
};
/**检查分享领取状态*/
ProtocolHttp.send_z_checkShareAward = {
    action: "CheckShare",
    skey: "",
    uid: 0,
    param: []
};
/**签到奖品列表*/
ProtocolHttp.send_z_signInList = {
    action: "SignInPriceList",
    skey: "",
    uid: 0,
    param: []
};
/**签到详情*/
ProtocolHttp.send_z_signInDetail = {
    action: "SignInPricedetail",
    skey: "",
    uid: 0,
    param: { id: 0 }
};
/**抽奖奖品列表*/
ProtocolHttp.send_z_lotteryList = {
    action: "LotteryDrawList",
    skey: "",
    uid: 0,
    param: []
};
/**抽奖详情*/
ProtocolHttp.send_z_lotteryDetail = {
    action: "LotteryDrawDetail",
    skey: "",
    uid: 0,
    param: []
};
/**背包*/
ProtocolHttp.send_z_bag = {
    action: "BackPack",
    skey: "",
    uid: 0,
    param: { type: 0 }
};
ProtocolHttp.send_z_shareCount = {
    action: "ShareCount",
    skey: "",
    uid: 0,
    param: []
};
ProtocolHttp.send_z_shareDetial = {
    action: "ShareDetail",
    skey: "",
    uid: 0,
    param: { mid: 0, type: 0, sharenum: 0 } // 1   2
};
/**当被分享进入游戏时，插入一条分享数据*/
ProtocolHttp.send_z_one_insertShare = {
    action: "InsertShare",
    skey: "",
    uid: 0,
    param: { pid: 0, sid: 0 } //pid分享链接的人，sid点击进入链接，并玩了一局游戏的人
};
/**发送点击分享链接进入，并且玩了一局游戏*/
ProtocolHttp.send_z_InsertShare = {
    action: "UpdateShare",
    skey: "",
    uid: 0,
    param: {}
};
ProtocolHttp.aibData = {
    transId: "",
    retFunc: "callback"
};
/**检查vip*/
ProtocolHttp.send_z_CheckVip = {
    action: "CheckVip",
    skey: "",
    uid: 0,
    param: []
};
/**获取福利列表*/
ProtocolHttp.send_z_WelfareList = {
    action: "WelfareList",
    skey: "",
    uid: 0,
    param: []
};
/**领取救济金*/
ProtocolHttp.send_z_AlmsList = {
    action: "AlmsList",
    skey: "",
    uid: 0,
    param: []
};
/**开通vip */
ProtocolHttp.send_z_openVip = {
    action: "ApplyABPay",
    skey: "",
    uid: 0,
    param: {
        goodsid: 0,
        pay_type: 0
    }
};
/**金币场**/
ProtocolHttp.sendGoldRoom = {
    action: "Getvenue",
    skey: "",
    uid: 0,
    param: []
};
/**金币场房间数据。部分数据是int型，发过来都是string，需要parseInt自己转*/
ProtocolHttp.GoldRoomJson = {
    GameID: "",
    base_money: "",
    id: "",
    level: "",
    max_money: "",
    min_money: "",
    versusroomcfg: {
        hasBenefit: true,
        benefitLower: 2000,
        benefitList: [2500, 3000, 3500],
        benefitMaxCnt: 3,
        gameConfig: {
            gameType: 1,
            maiMaNum: 0
        } //买马数
    }
};
/**专属房信息*/
ProtocolHttp.sendExclusiveRoom = {
    action: "GetExclusiveRoom",
    skey: "",
    uid: "",
    param: []
};
/**专属房信息修改 */
ProtocolHttp.SendEditExclusiveRoom = {
    action: "EditExclusiveRoom",
    skey: "",
    uid: "",
    param: {
        gameConfig: {},
        deskName: "",
        basePoint: 0,
        playCount: 0,
        chip: 0,
        deposit: 0
    },
};
/**二维码分享**/
ProtocolHttp.ShareByQrcode = {
    action: "ShareByQrcode",
    skey: "",
    uid: 0,
    param: {
        deskCode: "",
        deskId: 0
    }
};
/**增加桌子**/
ProtocolHttp.AddDesk = {
    action: "AddDesk",
    uid: 0,
    skey: "",
    param: {
        // gameConfig: ProtocolData.gameConfig,
        basePoint: 0,
        ip: "",
        port: 0
    }
};
/**
 * 获取排行榜
 */
ProtocolHttp.GetRankList = {
    action: "Billboard",
    skey: "",
    uid: 0,
    param: []
};
/**
 * 获取算分列表
 */
ProtocolHttp.GetScoreList = {
    action: "CombatGains",
    skey: "",
    uid: 0,
    param: []
};
/**
 * 获取战绩详情列表
 */
ProtocolHttp.GetScoreDetailList = {
    action: "CombatGainsdetail",
    skey: "",
    uid: 0,
    param: { deskBuildDate: 0, deskCode: 0 }
};
__reflect(ProtocolHttp.prototype, "ProtocolHttp");
//# sourceMappingURL=ProtocolHttp.js.map