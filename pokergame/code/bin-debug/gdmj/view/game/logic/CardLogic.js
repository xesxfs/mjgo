var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌逻辑类
 * @author chenkai
 * @date 2016/6/29
 */
var CardLogic = (function () {
    function CardLogic() {
    }
    CardLogic.getInstance = function () {
        if (this.instance == null) {
            this.instance = new CardLogic();
        }
        return this.instance;
    };
    /**
     * 排序手牌, 万、索、筒字排序  (万0x11 索0x21 筒0x31  东南西北0x41 中发门0x51)
     * 由大到小排列
     * @arr 手牌数组
     */
    CardLogic.prototype.sortHandCard = function (arr) {
        var len = arr.length;
        var cardA;
        var cardB;
        var temp;
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                cardA = arr[i];
                cardB = arr[j];
                if (cardA.cardValue < cardB.cardValue) {
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    };
    /**
     * 排序手牌, 万、筒、索、字排序  (万0x11 索0x21 筒0x31  东南西北0x41 中发门0x51)
     * 由小到大排列
     * @arr 手牌数组
     */
    CardLogic.prototype.sortHandCardAB = function (arr) {
        var len = arr.length;
        var cardA;
        var cardB;
        var temp;
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                cardA = arr[i];
                cardB = arr[j];
                if (cardA.cardValue > cardB.cardValue) {
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    };
    /**
     * 转变座位号，将seatID转变成桌子固定的上下左右位置。逆时针计算，自己位置是0，右边1，对面2，左边3。
     * @seatID 座位号
     * @return 固定位置
     */
    CardLogic.prototype.changeSeat = function (seatID) {
        var mySeatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
        var pos;
        if (seatID == mySeatID) {
            pos = 0;
        }
        else if (seatID > mySeatID) {
            pos = seatID - mySeatID;
        }
        else {
            pos = 4 - mySeatID + seatID;
        }
        return pos;
    };
    /**
     * 解析Act_state为单个二进制Act_state的列表
     * @state 包含多个动作的Act_state
     * @return 单个Act_state的列表
     */
    CardLogic.prototype.anylzyeActState = function (state) {
        var actList = [];
        var act = 1;
        var result = 0;
        for (var i = 0; i < 8; i++) {
            var temp = act << i;
            result = state & temp;
            if (result != 0 && result != ACT_state.Act_NormalDo) {
                actList.push(result);
            }
        }
        return actList;
    };
    /**
     * 转换Act_state为Act_act
     * @Act_state
     * @return Act_act
     */
    CardLogic.prototype.changeStateToAct = function (state) {
        var act = 1;
        for (var i = 0; i < 8; i++) {
            var temp = act << i;
            if (temp == state) {
                break;
            }
        }
        return i;
    };
    /**
     * 判断状态里是否包含指定状态
     * @state 多个状态
     * @act_state 指定状态
     */
    CardLogic.prototype.checkActState = function (state, act_state) {
        var act = 1;
        if ((state & act_state) == 0) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * 获取cardList牌数组中有cardNum张相同牌值的牌
     * @cardList 牌数组
     * @cardNum 相同张数
     * @return 返回结果列表
     */
    CardLogic.prototype.getSameList = function (cardList, cardNum) {
        var len = cardList.length;
        var resultList = [];
        for (var i = 0; i < len; i++) {
            var count = 1;
            var cardValue = cardList[i].cardValue;
            for (var j = i + 1; j < len; j++) {
                if (cardValue == cardList[j].cardValue) {
                    count++;
                }
            }
            if (count >= cardNum) {
                resultList.push(cardValue);
            }
        }
        return resultList;
    };
    /**
     * 检查牌数组中是否有cardNum张相同牌值的牌
     * @cardList 牌数组
     * @cardValue 牌值
     * @cardNum 张数
     * @return 结果
     */
    CardLogic.prototype.checkSameByValue = function (cardList, cardValue, cardNum) {
        var len = cardList.length;
        var count = 0;
        for (var i = 0; i < len; i++) {
            if (cardList[i].cardValue == cardValue) {
                count++;
            }
        }
        if (count >= cardNum) {
            return true;
        }
        return false;
    };
    /**
     * 获取补杠牌值
     * @handList 手牌
     * @eatList  已吃(碰杠)牌列表
     * @return 能够补杠的牌值列表  [cardValue,...]
     */
    CardLogic.prototype.getBuGang = function (handList, eatList) {
        var totalEatList = [];
        var resultList = [];
        //获取多个吃牌数组的集合
        var eatLen = eatList.length;
        for (var i = 0; i < eatLen; i++) {
            totalEatList = totalEatList.concat(eatList[i]);
        }
        //遍历手牌，如果已碰牌中有相同牌值>=3张的，则可以补杠
        eatLen = totalEatList.length;
        var handLen = handList.length;
        for (var i = 0; i < handLen; i++) {
            var count = 0;
            var handValue = handList[i].cardValue;
            for (var j = 0; j < eatLen; j++) {
                if (totalEatList[j].cardValue == handValue) {
                    count++;
                }
            }
            if (count >= 3) {
                resultList.push(handValue);
            }
        }
        return resultList;
    };
    /**
     * 根据风位or风圈，获取中文
     * @feng 风位or风圈
     * @return 风位or风圈中文
     */
    CardLogic.prototype.getFengStr = function (feng) {
        switch (feng) {
            case MJ_FENG_POINT.DONG:
                return "东";
            case MJ_FENG_POINT.NAN:
                return "南";
            case MJ_FENG_POINT.XI:
                return "西";
            case MJ_FENG_POINT.BEI:
                return "北";
        }
    };
    /**
     * 根据胡牌类型，获取胡牌类型描述
     * @huType 胡牌枚举类型
     * @isBaoSanJia 是否包三家
     * @return 胡牌类型描述
     */
    CardLogic.prototype.getHuStr = function (huType) {
        var str = App.DataCenter.GameInfo.huTypeList[huType];
        if (str != null) {
            return str;
        }
        return "";
    };
    /**
     * 获取游戏配置的描述数组
     * @gameConfig 游戏配置
     * @return 描述数组
     */
    CardLogic.prototype.getGameConfigStr = function (gameConfig) {
        var ruleDict = {};
        ruleDict["杠上开花"] = gameConfig.hasGangShangKaiHua;
        ruleDict["海底捞月"] = gameConfig.hasHaiDiLaoYue;
        ruleDict["抢杠胡"] = gameConfig.hasQiangGang;
        ruleDict["一炮三响"] = gameConfig.hasYiPaoSanXiang;
        ruleDict["三元牌"] = gameConfig.hasSanYuan;
        ruleDict["风位风圈刻子"] = gameConfig.hasFengQuan;
        //ruleDict["一炮多响"] = gameConfig.hasYiPaoDuoXiang; //一炮多响不需要显示
        //ruleDict["风位刻子"] = gameConfig.hasFengWei;       //风位风圈在游戏配置中是同一个选项
        ruleDict["步步高"] = gameConfig.hasBuBuGao;
        ruleDict["杠牌加番"] = gameConfig.hasGangAddFan;
        return ruleDict;
    };
    /**
     * 根据庄家位置和风位，获取东风所在的位置
     * @seatID 庄家位置
     * @fengwei 庄家风位
     * @return 东风所在位置pos
     */
    CardLogic.prototype.getDongPos = function (seatID, fengwei) {
        var pos = this.changeSeat(seatID);
        var fengWeiOffer = fengwei - MJ_FENG_POINT.DONG; //庄家和东风位偏移 = 当前庄家风位-东风
        var dongPos = (pos - fengWeiOffer + 4) % 4; //东风位置 = 庄家位置-偏移
        return dongPos;
    };
    /**
     * 根据庄家位置和风位，获取自己的风位
     * @seatID 庄家位置
     * @fengwei 庄家风位
     * @return 自己风位
     */
    CardLogic.prototype.getMyFengWei = function (seatID, fengwei) {
        var posOffer = seatID - App.DataCenter.UserInfo.getMyUserVo().seatID; //我和庄家位置偏移
        var myFengWei = (fengwei - posOffer + 4) % 4; //我的风位
        myFengWei = (myFengWei == 0) ? 4 : myFengWei;
        return myFengWei;
    };
    /**根据换庄次数，获取当前风位 */
    CardLogic.prototype.getCurFengWei = function (changeCnt) {
        return (changeCnt % 4 + 1);
    };
    /**
     * 当摸牌加入手牌时，获取摸牌加入手牌数组排序后的索引
     * @addCard 摸牌
     * @handList 手牌数组
     * @return 索引
     */
    CardLogic.prototype.getJoinCardPos = function (addCard, handList) {
        var len = handList.length - 1; //最后一张是摸牌，不和自己比较
        var addValue = addCard.cardValue;
        var handCard;
        for (var i = 0; i < len; i++) {
            handCard = handList[i];
            if (addValue >= handCard.cardValue) {
                break;
            }
        }
        return i;
    };
    return CardLogic;
}());
__reflect(CardLogic.prototype, "CardLogic");
//# sourceMappingURL=CardLogic.js.map