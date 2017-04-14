var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Socket通讯协议
 * @author  chenkai
 * @date 2016/7/4
 */
var ProtocolData = (function () {
    function ProtocolData() {
    }
    return ProtocolData;
}());
/**接收准备*/
ProtocolData.Rev108_1_2 = {
    userid: 0,
    deskstation: 0,
};
/**接收取消准备*/
ProtocolData.Rev108_2_2 = {
    userid: 0,
    deskstation: 0,
};
/**玩家加入房间(to_game)*/
ProtocolData.Rev104_4_2 = {
    userid: 0,
    exp: 0,
    money: 0,
    dwBank: 0,
    deskno: 0,
    deskstation: 0,
    userstate: 0,
    sex: 0,
    wincount: 0,
    losecount: 0,
    midcount: 0,
    szName: "",
    nickname: "",
    signature: 0,
    isrobot: 0,
    avater: "",
    reconnect: 0,
    vip_rank: 0,
    build_desk_count: 0
};
/**用户信息*/
ProtocolData.toGame = {
    userid: 0,
    exp: 0,
    money: 0,
    dwBank: 0,
    deskno: 0,
    deskstation: 0,
    userstate: 0,
    sex: 0,
    wincount: 0,
    losecount: 0,
    midcount: 0,
    szName: "",
    nickname: "",
    signature: 0,
    isrobot: 0,
    avater: "",
    reconnect: 0,
    vip_rank: 0,
    build_desk_count: 0
};
/**游戏开始*/
ProtocolData.Rev180_51_0 = {
    seatID: 0,
    userID: 0,
    fengWei: 0,
    fengQuan: 0,
    changeCnt: 0,
    diceList: [] //随机庄家时需要打骰子比大小, 可选
};
/**骰子数据*/
ProtocolData.diceInfo = {
    dice1: 0,
    dice2: 0 //范围 1 - 6
};
/**游戏开始发牌每人13张*/
ProtocolData.Rev180_52_0 = {
    deleaveCard: [] //发牌信息列表 deleaveCardInfo
};
/**发牌信息*/
ProtocolData.deleaveCardInfo = {
    seatID: 0,
    userID: 0,
    cardList: [] //玩家牌列表
};
/**玩家摸牌(摸牌、吃碰杠胡)*/
ProtocolData.Rev180_53_0 = {
    seatID: 0,
    state: 0,
    cardList: [],
    cannotOutCard: [] //不能出的牌
};
/**玩家请求操作，吃、碰、胡等*/
ProtocolData.Send180_54_0 = {
    seatID: 0,
    act: 0,
    cardList: [] //吃、碰的牌，吃牌时，牌放在列表首位
};
/**通知玩家操作(其他玩家打出牌，通知玩家吃、碰等)*/
ProtocolData.Rev180_55_0 = {
    seatID: 0,
    state: 0,
    card: 0,
    isAgainstAct: false,
    isAgainstQiangGangHu: false,
};
/**响应玩家操作 (其他玩家吃、碰等，广播给另外3玩家)*/
ProtocolData.Rev180_56_0 = {
    seatID: 0,
    act: 0,
    cardList: [],
    actParam: 0 //操作的额外参数， 吃碰牌时该值为吃碰的那张牌， 杠时是牌的张数（1张是补杠， 3张是点杠， 4张是暗杠）， 胡牌时是胡的那张牌， 过牌和出牌该值不传无用
};
/**通知玩家出牌  (吃碰牌后通知出牌 ?)*/
ProtocolData.Rev180_57_0 = {
    seatID: 0,
    state: 0 //动作 enum ACT
};
/**游戏结束*/
ProtocolData.Rev180_58_0 = {
    resultList: [],
    maxPlayCount: 0,
    curPlayCount: 0,
    curTime: 0,
    isDianPao: false,
    dianPaoSeat: 0,
    isBaoSanJia: false,
    baoSanJiaType: 0,
    baoSanJiaSeat: 0,
};
/**结算信息*/
ProtocolData.resultInfo = {
    seatID: 0,
    isBanker: false,
    lossWinPoint: 0,
    cards: [],
    chiCards: [],
    pengCards: [],
    gangCards: [],
    anGangCards: [],
    huCard: 0,
    fan: 0,
    curPiont: 0,
    gangLossWinPoint: 0,
    huType: [] //胡牌类型 MJ_TYPE
};
/**游戏状态*/
ProtocolData.Rev180_2_0 = {
    gameConfig: ProtocolData.gameConfig,
    lastCardNum: 0,
    oniCard: 0,
    bankerSeat: 0,
    deskStatus: 0,
    gameSeatInfo: [],
    fengQuan: 0,
    maxPlayCount: 0,
    curPlayCount: 0,
    changeCnt: 0 //换庄次数
};
/**位置信息*/
ProtocolData.GameSeatInfo = {
    seatID: 0,
    userID: 0,
    status: 0,
    handCards: [],
    chiCards: [],
    pengCards: [],
    gangCards: [],
    anGangCards: [],
    playOutCards: [],
    point: 0,
    feiWei: 0 //风位
};
/**发送聊天*/
ProtocolData.Send111_1_0 = {
    msgType: 0,
    msg: "" //消息
};
/**接收聊天*/
ProtocolData.Rev111_1_1 = {
    msgType: 0,
    msg: "",
    sendUserID: 0,
    sendSeatID: 0 //发送玩家的位置
};
/**接受禁言 */
ProtocolData.Gag111_2_1 = {
    banPostUserID: 0,
    banType: 0 //禁言类型
};
/**接收退出房间*/
ProtocolData.Rev102_5_1 = {
    userid: 0,
    deskno: 0,
    deskstation: 0,
};
/**接收牌局信息，桌子解散时接收*/
ProtocolData.Rev180_62_0 = {
    RecordList: [],
    maxPlayCount: 0,
    curPlayCount: 0 //当前局数
};
/**牌局信息*/
ProtocolData.recordInfo = {
    userID: 0,
    point: 0,
    ziMoNum: 0,
    jiePaoNum: 0,
    dianPaoNum: 0,
    anGangNum: 0,
    mingGangNum: 0 //明杠数
};
/**发送再来一战 104_8_0*/
ProtocolData.Send104_8_0 = {
    inviterID: 0,
    inviterName: "",
    deskCode: "",
    deskno: 0,
};
/**接收再来一战 104_8_0*/
ProtocolData.Rev104_8_0 = {
    inviterID: 0,
    inviterName: 0,
    deskCode: "",
    deskno: 0,
};
/**发送测试换牌*/
ProtocolData.Send180_100_0 = {
    seatID: 0,
    preCard: 0,
    newCard: 0 //新换得的牌
};
/**接收测试换牌*/
ProtocolData.Rev180_101_0 = {
    seatID: 0,
    cardList: [] //新的手牌(不包括吃碰等，只有手牌)
};
/**测试确定下次发的牌*/
ProtocolData.Send180_99_0 = {
    seatID: 0,
    cardList: []
};
/**测试看最后一张牌，用来测试海底捞月*/
ProtocolData.Send180_102_0 = {
    cardpos: 0 //-1最后一张，0第一张
};
/**接收测试看最后一张牌*/
ProtocolData.Rev180_103_0 = {
    card: 0 //要看的牌
};
/**玩家申请解散桌子*/
ProtocolData.Send104_5_0 = {
    deskno: 0 //桌子号
};
/**接收申请解散返回*/
ProtocolData.Rev104_5_1 = {
    retCode: 0 //1 桌子直接解散， 2 等待其他玩家确认
};
/**返回询问是否同意解散*/
ProtocolData.Rev104_5_2 = {
    deskno: 0,
    solveUserID: 0,
    solveUserName: "" //解散桌子玩家名字
};
/**发送是否同意解散的回答*/
ProtocolData.Send104_5_5 = {
    deskno: 0,
    isArgee: false //是否同意
};
/**接收桌子解散广播*/
ProtocolData.Rev104_5_6 = {
    isDissolve: false,
    isOwnerRepel: false //是否是房主拒绝
};
/**买马结果*/
ProtocolData.Rev180_59_0 = {
    seatID: 0,
    cardList: [],
    hitNum: 0,
    hitCardList: [] //买中的马
};
/**通知鬼牌*/
ProtocolData.Rev180_60_0 = {
    oniCard: 0,
    diceNum1: 0,
    diceNum2: 0,
    digOutCard: 0 //实际翻出的牌 int, 可选
};
/**通知杠结算*/
ProtocolData.Rev180_61_0 = {
    gangSeatID: 0,
    actParam: 0,
    preGangSeatID: 0,
    lossWinPoint: [] //输赢的点数
};
/**接收更新玩家信息*/
ProtocolData.Rev180_5_0 = {
    playerInfoList: [] //游戏里的玩家信息 playerGameInfo
};
/**玩家信息*/
ProtocolData.playerGameInfo = {
    userID: 0,
    seatID: 0,
    point: 0 //玩家分数
};
/**接收桌子结束*/
ProtocolData.Rev104_4_0 = {
    deskID: 0,
    overType: 0 // 结束类型, 1 局数打完， 2 时间到期， 3 房主解散桌子
};
/**发送托管*/
ProtocolData.Send180_6_0 = {
    isTrship: false // 托管(true)或者取消托管(false)
};
/**接收托管*/
ProtocolData.Rev180_7_0 = {
    seatID: 0,
    isTrship: false // 托管(true)或者取消托管(false)
};
/**赠送房间*/
ProtocolData.Send104_3_0 = {
    deskno: 0,
    giftUserID: 0 //被转赠的玩家ID
};
/**转增房间返回*/
ProtocolData.Rev104_3_1 = {
    retCode: 0 // 0 成功, 1 桌子不存在， 2 不是房主， 3 被赠予玩家不在线或者不在桌子上, 4 房卡不足
};
/**接收赠送房间*/
ProtocolData.Rev104_3_2 = {
    deskno: 0,
    preDeskOwnerID: 0,
    preDeskOwnerName: "",
    newDeskOwnerID: 0,
    newDeskOwnerName: "",
};
/**回放数据*/
ProtocolData.replay = {
    PI: [],
    GC: ProtocolData.gameConfig,
    ST: 0,
    ET: 0,
    GI: {
        bseat: 0,
        fq: 0,
        fw: 0,
        dice: [],
        oni: 0,
        maNum: 0,
        maima: [],
    },
    GA: [],
    SI: ProtocolData.Rev180_58_0 //结算信息   
};
/**发送互动道具*/
ProtocolData.Send112_1_0 = {
    toUserid: 0,
    itemType: 0,
};
/**接收互动道具失败*/
ProtocolData.Rev112_1_1 = {
    retCode: 0 //失败原因， 1 货币不足， 2 玩家和接收玩家不在同一桌子上, 3 道具不存在
};
/**广播互动道具*/
ProtocolData.Rev112_1_2 = {
    sendUserid: 0,
    toUserid: 0,
    itemType: 0,
    burn: 0,
};
/**发送领取救济金*/
ProtocolData.Send113_2_0 = {
    choose: 0,
};
/**接收领取救济金*/
ProtocolData.Rev113_2_1 = {
    "retCode": 0,
    "money": 0,
    "all": [] //所有宝箱中金币的数目
};
/**接收踢人广播*/
ProtocolData.Rev102_20_1 = {
    kickByUserid: -1,
    kickUserid: 0,
    kickCause: 0 //踢人理由 KickCause
};
/**房主踢人返回**/
ProtocolData.Rev102_20_2 = {
    retCode: -1,
};
/***通知玩家被踢出*/
ProtocolData.Rev102_20_3 = {
    kickByUserid: -1,
    deskID: 0,
    ownerID: 0,
    kickCause: 0,
};
///////////////////////////////////////////////
//----------------[websocket platfrom]---------
///////////////////////////////////////////////
/**游戏服务器登录*/
ProtocolData.Send100_5_0 = {
    userid: 0,
    pass: "" //密码 md5
};
/**推送服务器登录*/
ProtocolData.Send181_0_0 = {
    userid: 0,
};
/**用户数据*/
ProtocolData.to_game = {
    userid: 0,
    exp: 0,
    money: 0,
    dwBank: 0,
    deskno: 0,
    deskstation: 0,
    userstate: 0,
    sex: 0,
    wincount: 0,
    losecount: 0,
    midcount: 0,
    szName: 0,
    nickname: "",
    signature: 0,
    isrobot: 0,
    avater: "",
    reconnect: false,
    vip_rank: 0,
    build_desk_count: 0
};
/**玩家游戏中登录或没有正常登出*/
ProtocolData.Rev100_3_8 = {
    gamename: 0,
    gameid: 0,
    roomname: 0,
    roomid: 0,
    userid: 0 //用户Id
};
/**断线重连*/
ProtocolData.Rev102_2_50 = {
    deskindex: 0,
    deskstation: 0,
    userstate: 0,
    userid: 0,
    deskowner: false,
    usermoney: 0,
    userlist: [],
    deskInfo: ProtocolData.deskInfo
};
/**创建房间*/
ProtocolData.Send104_1_0 = {
    deskName: "",
    playCount: 0,
    //        deskCode: "",// 房间暗号， string,可选
    gameConfig: {},
    isCooperate: false,
    isOneMoreHand: false,
};
/**接收创建房间*/
ProtocolData.Rev104_1_1 = {
    retCode: 0,
    deskInfo: {} //开好的房间信息
};
/**获取游戏服务器*/
ProtocolData.Send200_1_0 = {
    userid: 0,
    deskCode: "",
    serverType: 0,
    roomLevel: 0,
    gameid: 0
};
/**接收游戏服务器*/
ProtocolData.Rev200_1_1 = {
    retCode: 0,
    host: "",
    port: 0 //int,# 服务器类型， 1 创建房间， 2 加入房间 
};
//查询房间号是否存在
ProtocolData.Send200_2_0 = {
    gameid: 0,
    deskCode: 0
};
//返回房间号是否存在
ProtocolData.Rev200_2_1 = {
    isExist: false
};
/**玩家进入广播*/
ProtocolData.Rev102_4_2 = {
    user: {}
};
/**桌子信息*/
ProtocolData.deskInfo = {
    deskID: 0,
    deskName: 0,
    ownerName: 0,
    ownerID: 0,
    isHavePassword: 0,
    peoplecount: 0,
    curSitPeopleCoiunt: 0,
    curUpPeopleCount: 0,
    gameConfig: {},
    playCount: 0,
    curPlayCount: 0,
    lastTime: 0,
    deskDesc: 0,
    curTalkRoomPepCount: 0,
    talkRoomMaxPepCount: 0,
    isCooperate: false,
    deskCode: 0,
    needCard: 0,
    deskLevel: 0,
    basepoint: 0,
    gameid: 0,
};
/**游戏配置*/
ProtocolData.gameConfig = {
    gameType: 0,
    hasYiPaoSanXiang: false,
    hasHaiDiLaoYue: false,
    hasGangShangKaiHua: false,
    hasQiangGang: false,
    hasMaiMa: false,
    maiMaNum: 0,
    hasOni: false,
    hasYiPaoDuoXiang: true,
    hasFengQuan: false,
    hasFengWei: false,
    hasSanYuan: false,
    hasBuBuGao: false,
    hasGangAddFan: false //杠牌加番 
};
/**专属房修改配置 */
ProtocolData.exGameConfig = {
    gameType: 0,
    hasYiPaoSanXiang: false,
    hasHaiDiLaoYue: false,
    hasMaiMa: false,
    hasFengQuan: false,
    hasFengWei: false,
    hasSanYuan: false,
    hasGangAddFan: false //杠牌加番  
};
/**搜索房间*/
ProtocolData.Send104_2_0 = {
    deskCode: "",
};
/**接收搜索房间*/
ProtocolData.Rev104_2_1 = {
    deskList: [] // 房间列表 
};
/**进入房间*/
ProtocolData.Send102_4_0 = {
    deskCode: 0,
    deskid: 1 //桌子
};
//更改房间配置
ProtocolData.Send120_1_0 = {
    deskNo: 0,
    deskName: "",
    deskDesc: "",
    basePoint: 0,
    playCount: 0,
    chip: 0,
    deposit: 0,
    gameConfig: ProtocolData.gameConfig //游戏配置
};
/**接收进入房间**/
//    CANNOT_ENTER_KICK    //专属房     -11 不能加入原因， 被房主踢出
//    CANNOT_ENTER_FORCED //专属房    -12 不能加入原因， 强退了其他房间
//    CANNOT_ENTER_FULL  //专属房   -13 不能加入原因， 人满
ProtocolData.Rev102_4_1 = {
    retCode: 0,
    deskstation: 0,
    deskno: 0,
    deskLst: [],
    userList: [],
};
/**接收更新房卡*/
ProtocolData.Rev103_10_0 = {
    userID: 0,
    changeCardNum: 0,
    isCoop: false //是否是合作型房卡
};
/**推送消息**/
ProtocolData.pushMessage = {
    action: "",
    receiver: 0,
    param: {}
};
/**通知金币变化*/
ProtocolData.Rev103_6_0 = {
    money: 0,
    tax: 0,
    userid: 0,
    exp: 0,
    point: 0
};
/**专属房**/
ProtocolData.Rev121_1_0 = [];
//    加入桌子（从同一房间的一张桌子移动到另一张）
ProtocolData.Send102_8_0 = {
    deskno: 0
};
//    #102, 8, 1 返回加入桌子
ProtocolData.Rev102_8_1 = {
    retCode: 0,
};
//    获取指定的桌子的信息 
ProtocolData.Send104_10_0 = {
    deskNo: 0,
};
//    返回获取指定的桌子的信息
ProtocolData.Rev104_10_1 = {
    deskinfo: DeskInfo,
    userList: [],
};
//修改房间信息返回
ProtocolData.Rev120_1_1 = {
    retCode: -1 // 返回码， 0 成功， 2 不是房主或房间不存在， 3 游戏中不能修改
};
//修改房间信息广播    
ProtocolData.Rev120_1_2 = ProtocolData.Send120_1_0;
/**踢人*/
ProtocolData.Send102_20_0 = {
    kickUserID: 0 //被踢玩家
};
/**禁言*/
ProtocolData.Send111_2_0 = {
    banPostUserID: 0,
    type: 0 //禁言类型
};
/**禁言*/
ProtocolData.Rev111_2_1 = {
    banPostUserID: 0,
    type: 0 //禁言类型
};
__reflect(ProtocolData.prototype, "ProtocolData");
//# sourceMappingURL=ProtocolData.js.map