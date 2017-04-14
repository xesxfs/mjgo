var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 结算框
 * @author chenkai
 * @date 2016/6/29
 */
var ResultPanel = (function (_super) {
    __extends(ResultPanel, _super);
    function ResultPanel() {
        var _this = _super.call(this) || this;
        //    private lightList = [];   //头像发光
        _this.headList = []; //头像列表
        _this.nameList = new Array(); //昵称列表
        _this.gangList = new Array(); //杠分列表
        _this.scoreList = new Array(); //总分列表
        _this.winList = new Array(); //赢输图片列表
        _this.dianPaoList = []; //点炮
        _this.skinName = "ResultPanelSkin1";
        return _this;
    }
    ResultPanel.prototype.childrenCreated = function () {
    };
    ResultPanel.prototype.onEnable = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.setCenter();
    };
    ResultPanel.prototype.onRemove = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    ResultPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.closeBtn:
                var game = App.SceneManager.getScene(SceneConst.GameScene);
                game.readyBtn.visible = true;
                this.hide();
                break;
            case this.continueBt:
                console.log("准备按钮");
                break;
        }
    };
    //更新页面 （别问为什么这么写，改了不知道多少次）
    ResultPanel.prototype.updateInfo = function (data) {
        console.log(data);
        var json = ProtocolData.Rev180_58_0;
        json = data;
        var len = json.resultList.length;
        var gameScene = App.SceneManager.getScene(SceneConst.GameScene);
        var curTime = json.curTime;
        var isDianPao = json.isDianPao;
        var dianPaoSeat = json.dianPaoSeat;
        var isBaoSanJia = json.isBaoSanJia;
        var baoSanJiaType = json.baoSanJiaType;
        //判断是否流局
        var bNoEnd = true;
        for (var i = 0; i < len; i++) {
            var resultInfo = ProtocolData.resultInfo;
            resultInfo = json.resultList[i];
            if (resultInfo.lossWinPoint != 0) {
                bNoEnd = false;
                break;
            }
        }
        if (bNoEnd) {
            console.log("是流局");
            this.resultViewStack.selectedIndex = 1;
            for (var i = 0; i < 4; i++) {
                this.headList[i] = this.liujuUiGroup.getChildAt(i);
                this.nameList[i] = this.liujuUiGroup.getChildAt(i + 4);
                this.gangList[i] = this.liujuUiGroup.getChildAt(i + 8);
                this.scoreList[i] = this.liujuUiGroup.getChildAt(i + 12);
            }
        }
        else {
            this.resultViewStack.selectedIndex = 0;
            for (var i = 0; i < 4; i++) {
                this.headList[i] = this.uiGroup.getChildAt(i);
                this.nameList[i] = this.uiGroup.getChildAt(i + 4);
                this.gangList[i] = this.uiGroup.getChildAt(i + 8);
                this.scoreList[i] = this.uiGroup.getChildAt(i + 12);
                //非流局状态下才有下面两项
                this.winList[i] = this.uiGroup.getChildAt(i + 16);
                this.dianPaoList[i] = this.uiGroup.getChildAt(i + 20);
            }
        }
        //判断赢家是否是自己
        var bWinIsMy = false;
        var mySeatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
        for (var i = 0; i < len; i++) {
            var resultInfo = ProtocolData.resultInfo;
            resultInfo = json.resultList[i];
            if (resultInfo.fan != null && resultInfo.seatID == mySeatID) {
                bWinIsMy = true;
                break;
            }
        }
        console.log("是否流局:", bNoEnd, "自己是否赢家：", bWinIsMy, "自己位置:", mySeatID);
        //赢家是自己或者流局，则自己排在第一位
        var newResultList = [];
        if (bWinIsMy || bNoEnd == true) {
            newResultList[0] = null;
            for (var i = 0; i < len; i++) {
                var newResultInfo = json.resultList[i];
                if (newResultInfo.seatID == mySeatID) {
                    newResultList[0] = newResultInfo;
                }
                else {
                    newResultList.push(newResultInfo);
                }
            }
        }
        else {
            //赢家不是自己，则自己排在第二位，赢家在第一位
            newResultList[0] = null;
            newResultList[1] = null;
            for (var i = 0; i < len; i++) {
                var newResultInfo = json.resultList[i];
                if (newResultInfo.fan != null && newResultList[0] == null) {
                    newResultList[0] = newResultInfo;
                }
                else if (newResultInfo.seatID == mySeatID) {
                    newResultList[1] = newResultInfo;
                }
                else {
                    newResultList.push(newResultInfo);
                }
            }
        }
        console.log("重新排列后的用户结算信息:", newResultList);
        //显示结算信息
        for (var i = 0; i < len; i++) {
            var resultInfo = ProtocolData.resultInfo;
            resultInfo = newResultList[i];
            var seatID = resultInfo.seatID;
            var score = resultInfo.lossWinPoint;
            var fan = resultInfo.fan;
            var cards = resultInfo.cards;
            var chiCards = resultInfo.chiCards;
            var pengCards = resultInfo.pengCards;
            var gangCards = resultInfo.gangCards;
            var anGangCards = resultInfo.anGangCards;
            var huCard = resultInfo.huCard;
            var curPoint = resultInfo.curPiont;
            var gangPoint = resultInfo.gangLossWinPoint;
            var huType = newResultList[i].huType; //huType可能是null，可能是数字，可能是数组，服务端没有统一类型
            //获取用户信息
            var userVo = App.DataCenter.UserInfo.getUserBySeatID(resultInfo.seatID);
            var nickName = userVo.nickName;
            //结算位置不是根据seat排列，而是根据赢家和自己位置排列
            var pos = i;
            //金币场，总分和杠分得另外算...
            if (App.serverSocket.gameID == Game_ID.GoldRoom) {
                score = gameScene.winLossMoneyList[CardLogic.getInstance().changeSeat(seatID)];
                gangPoint = gangPoint * App.DataCenter.deskInfo.basePoint;
            }
            //设置头像
            var tempUserVo = App.DataCenter.UserInfo.getUserBySeatID(seatID);
            if (tempUserVo) {
                this.headList[pos].source = tempUserVo.headUrl;
            }
            //设置昵称
            this.nameList[pos].text = StringTool.formatNickName(nickName);
            if (this.dianPaoList.length > 0) {
                this.dianPaoList[pos].visible = false;
            }
            //设置点炮
            if (ProtocolData.gameConfig.gameType != GAME_TYPE.TUI_DAO_HU && isDianPao && bNoEnd == false) {
                if (seatID == dianPaoSeat) {
                    this.dianPaoList[pos].visible = true;
                }
            }
            //设置平分的(非点炮且不是自己赢)
            if (bNoEnd == false) {
                if (score < 0) {
                    this.winList[pos].bitmapData = RES.getRes("result_lose_png");
                }
                else if (score > 0) {
                    this.winList[pos].bitmapData = RES.getRes("result_win_png");
                }
                else {
                    this.winList[pos].bitmapData = RES.getRes("");
                }
            }
            //设置番数、番型、玩法
            if (fan != null && pos == 0) {
                this.fanLabel.text = fan + "";
                //番型
                this.fanTypeLabel.text = this.getHuTypeStr(huType);
                //特殊玩法
                if (this.getPlayTypeStr(huType, isBaoSanJia, baoSanJiaType) == null || this.getPlayTypeStr(huType, isBaoSanJia, baoSanJiaType) == "") {
                    this.playTypeLabel.text = "无";
                }
                else {
                    this.playTypeLabel.text = this.getPlayTypeStr(huType, isBaoSanJia, baoSanJiaType);
                }
            }
            //设置输赢
            if (fan != null && pos == 0) {
                if (isDianPao) {
                }
                else {
                }
            }
            //设置杠分
            if (gangPoint >= 0) {
                this.gangList[pos].strokeColor = App.DataCenter.colorInfo.WinGreen;
                this.gangList[pos].text = "+" + gangPoint;
            }
            else {
                this.gangList[pos].strokeColor = App.DataCenter.colorInfo.LoseRed;
                this.gangList[pos].text = "" + gangPoint;
            }
            //设置总分   
            if (score >= 0) {
                this.scoreList[pos].strokeColor = App.DataCenter.colorInfo.WinGreen;
                this.scoreList[pos].text = "+" + score;
            }
            else {
                this.scoreList[pos].strokeColor = App.DataCenter.colorInfo.LoseRed;
                this.scoreList[pos].text = score + "";
            }
            //更新当前分数
            if (userVo) {
                if (App.serverSocket.gameID == Game_ID.GoldRoom) {
                }
                else {
                    userVo.point = curPoint;
                }
            }
        }
        //设置中马次数
        var gameConfig = ProtocolData.gameConfig;
        var zhuaMa = ProtocolData.Rev180_59_0;
        var hitNum = zhuaMa.hitNum;
        if (gameConfig.gameType == GAME_TYPE.TUI_DAO_HU && bNoEnd == false) {
            this.zhongMaLabel.visible = true;
            this.zhuaMaLabel.visible = true;
            this.zhuaMaLabel.text = hitNum + "匹";
        }
        else {
            this.zhongMaLabel.visible = false;
            this.zhuaMaLabel.visible = false;
        }
    };
    /**
     * 根据胡牌番型，获取番型的描述
     * huType  普通鸡平胡和推倒胡时是null，一种胡牌类型时是数字，多种胡牌类型时是数组
     */
    ResultPanel.prototype.getHuTypeStr = function (huType) {
        var huTypeStr = "";
        var gameConfig = ProtocolData.gameConfig;
        var cardLogic = CardLogic.getInstance();
        //胡牌类型是null时，默认基础胡牌类型
        if (huType == null) {
            if (gameConfig.gameType == GAME_TYPE.JI_PING_HU) {
                huTypeStr = cardLogic.getHuStr(MJ_TYPE.MJTYPE_JIPINGHU_JI_HU);
            }
            else {
                huTypeStr = cardLogic.getHuStr(MJ_TYPE.MJTYPE_TUIDAOHU_BASE_TYPE);
            }
        }
        else if (huType.length == 1) {
            var tempHuType = huType[0];
            //如果是自摸，则显示鸡胡
            if (gameConfig.gameType == GAME_TYPE.JI_PING_HU && tempHuType == MJ_TYPE.MJTYPE_JIPINGHU_ZI_MO) {
                tempHuType = MJ_TYPE.MJTYPE_JIPINGHU_JI_HU;
            }
            else if (gameConfig.gameType == GAME_TYPE.TUI_DAO_HU && (tempHuType == MJ_TYPE.MJTYPE_TUIDAOHU_WU_ONI || tempHuType == MJ_TYPE.MJTYPE_TUIDAOHU_MAN_ONI)) {
                tempHuType = MJ_TYPE.MJTYPE_TUIDAOHU_BASE_TYPE;
            }
            else {
                var playTypeList = App.DataCenter.GameInfo.playTypeList;
                var playTypeLen = playTypeList.length;
                for (var i = 0; i < playTypeLen; i++) {
                    if (tempHuType == playTypeList[i]) {
                        if (gameConfig.gameType == GAME_TYPE.JI_PING_HU) {
                            tempHuType = MJ_TYPE.MJTYPE_JIPINGHU_JI_HU;
                        }
                        else if (gameConfig.gameType == GAME_TYPE.TUI_DAO_HU) {
                            tempHuType = MJ_TYPE.MJTYPE_TUIDAOHU_BASE_TYPE;
                        }
                        break;
                    }
                }
            }
            //其他牌型正常显示
            huTypeStr = cardLogic.getHuStr(tempHuType);
        }
        else {
            var huTypeList = ArrayTool.copyArr(huType);
            var huTypeLen = huTypeList.length;
            //删除无鬼、满鬼、自摸
            for (var hI = huTypeLen - 1; hI >= 0; hI--) {
                if (huTypeList[hI] == MJ_TYPE.MJTYPE_TUIDAOHU_WU_ONI ||
                    huTypeList[hI] == MJ_TYPE.MJTYPE_TUIDAOHU_MAN_ONI ||
                    huTypeList[hI] == MJ_TYPE.MJTYPE_JIPINGHU_ZI_MO) {
                    huTypeList.splice(hI, 1);
                }
            }
            //删除玩法
            huTypeLen = huTypeList.length;
            var playTypeList = App.DataCenter.GameInfo.playTypeList;
            var playTypeLen = playTypeList.length;
            for (var hI = huTypeLen - 1; hI >= 0; hI--) {
                for (var i = 0; i < playTypeLen; i++) {
                    if (huTypeList[hI] == playTypeList[i]) {
                        huTypeList.splice(hI, 1);
                        break;
                    }
                }
            }
            //判断胡牌类型长度，如果删除多余类型后数组为0，则直接显示基础类型;否则显示爆胡番型
            huTypeLen = huTypeList.length;
            if (huTypeLen == 0) {
                if (gameConfig.gameType == GAME_TYPE.JI_PING_HU) {
                    huTypeList[0] = MJ_TYPE.MJTYPE_JIPINGHU_JI_HU;
                }
                else if (gameConfig.gameType == GAME_TYPE.TUI_DAO_HU) {
                    huTypeList[0] = MJ_TYPE.MJTYPE_TUIDAOHU_BASE_TYPE;
                }
                huTypeStr = cardLogic.getHuStr(huTypeList[0]);
            }
            else {
                //鸡平胡
                if (gameConfig.gameType == GAME_TYPE.JI_PING_HU) {
                    //爆胡(只显示一种番型)
                    console.log(huTypeLen + "胡牌类型长度");
                    for (var hI = 0; hI < huTypeLen; hI++) {
                        if (huTypeList[hI] >= MJ_TYPE.MJTYPE_JIPINGHU_QING_YI_SE && huTypeList[hI] <= MJ_TYPE.MJTYPE_JIPINGHU_DI_HU) {
                            huTypeStr = cardLogic.getHuStr(huTypeList[hI]);
                            break;
                        }
                    }
                    //非爆胡
                    if (huTypeStr == "") {
                        for (var hI = 0; hI < huTypeLen; hI++) {
                            console.log(huTypeList[hI] + "+" + hI + "胡牌类型");
                            huTypeStr += cardLogic.getHuStr(huTypeList[hI]) + " ";
                        }
                    }
                }
                else {
                    for (var hI = 0; hI < huTypeLen; hI++) {
                        huTypeStr += cardLogic.getHuStr(huTypeList[hI]) + " ";
                    }
                }
            }
        }
        return huTypeStr;
    };
    //获取玩法类型字符串
    ResultPanel.prototype.getPlayTypeStr = function (huType, isBaoSanJia, baoSanJiaType) {
        var playTypeStr = "";
        var cardLogic = CardLogic.getInstance();
        //从番型从筛选中玩法...
        if (huType != null) {
            var huTypeLen = huType.length;
            var playTypeList = App.DataCenter.GameInfo.playTypeList;
            var playTypeLen = playTypeList.length;
            for (var hI = huTypeLen - 1; hI >= 0; hI--) {
                for (var i = 0; i < playTypeLen; i++) {
                    //胡牌类型是玩法一种
                    if (huType[hI] == playTypeList[i]) {
                        //杠上开花和杠上开花包杠冲突，这里区分
                        if (huType[hI] == MJ_TYPE.MJTYPE_JIPINGHU_GANG_SHANG_KAI_HUA || huType[hI] == MJ_TYPE.MJTYPE_TUIDAOHU_GANG_SHANG_KAI_HUA) {
                            if (isBaoSanJia) {
                                playTypeStr += "杠上开花包杠 ";
                            }
                            else {
                                playTypeStr += cardLogic.getHuStr(huType[hI]) + " ";
                            }
                        }
                        else {
                            if (huType[hI] == MJ_TYPE.MJTYPE_JIPINGHU_GANG_ADD_FAN) {
                                playTypeStr += playTypeStr.replace("杠牌加番　", "");
                            }
                            if (huType[hI] == MJ_TYPE.MJTYPE_JIPINGHU_GANG_SHANG_KAI_HUA) {
                                playTypeStr += "杠上开花　";
                            }
                            //同时又三元牌中发白多个，只显示一次三元牌
                            if (huType[hI] == MJ_TYPE.MJTYPE_JIPINGHU_JIAN_ZHONG || huType[hI] == MJ_TYPE.MJTYPE_JIPINGHU_JIAN_BAI || huType[hI] == MJ_TYPE.MJTYPE_JIPINGHU_JIAN_FA) {
                                playTypeStr = playTypeStr.replace("三元牌 ", "");
                            }
                            playTypeStr += cardLogic.getHuStr(huType[hI]) + " ";
                        }
                    }
                }
            }
        }
        //包三家玩法
        if (isBaoSanJia) {
            //12张落地
            if (baoSanJiaType == MJ_BAO_SAN_JIA_TYPE.BAO_SAN_JIA_TYPE_12) {
                playTypeStr += "十二张落地包自摸 ";
            }
            else if (baoSanJiaType == MJ_BAO_SAN_JIA_TYPE.BAO_SAN_JIA_TYPE_DA_SAN_YUAN) {
                playTypeStr += "大三元包自摸 ";
            }
            else if (baoSanJiaType == MJ_BAO_SAN_JIA_TYPE.BAO_SAN_JIA_TYPE_DA_SI_XI) {
                playTypeStr += "大四喜包自摸 ";
            }
        }
        return playTypeStr;
    };
    //清理界面
    ResultPanel.prototype.clear = function () {
        //隐藏输赢表示
        // this.huFlag.visible = false;
        //this.ziMoFlag.visible = false;
        //this.liuJuFlag.visible = false;
        //       this.resultLabel.text = "";
        //删除头像、光圈、点炮
        var len = this.headList.length;
        for (var i = 0; i < len; i++) {
            this.headList[i].source = "";
            //            this.lightList[i].visible = false;
            if (this.dianPaoList.length > 0) {
                this.dianPaoList[i].visible = false;
            }
        }
        //买马
        this.zhuaMaLabel.text = "";
        //番数
        this.fanLabel.text = "";
        //番型
        this.fanTypeLabel.text = "";
        //玩法
        this.playTypeLabel.text = "";
    };
    return ResultPanel;
}(BasePanel));
__reflect(ResultPanel.prototype, "ResultPanel");
//# sourceMappingURL=ResultPanel.js.map