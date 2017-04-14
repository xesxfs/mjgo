var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 排行榜界面
 * @author chenwei
 * @date 2016/07/04
 */
var RankPanel = (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankPanelSkin";
        return _this;
    }
    RankPanel.prototype.childrenCreated = function () {
        this.setRuleText();
    };
    RankPanel.prototype.close = function (e) {
        App.PopUpManager.removePopUp(this);
    };
    /**
     *  领取奖励
     * @param e
     */
    RankPanel.prototype.onGetAward = function (e) {
        if (e.target == this.getAwardBtn) {
            var http = new HttpSender();
            var data = ProtocolHttp.send_z_avard;
            http.send(data, this.awardBack, this);
        }
        else {
        }
    };
    RankPanel.prototype.setRuleText = function () {
        var txt = "今日巅峰(榜)前3名可领取奖励：\n\n   第一名:\n   第二名:\n   第三名:\n\n每天24点后可以领取前一天排行榜的奖励，并清空当天的积分数据。";
        var parser = new egret.HtmlTextParser();
        var textFlow = parser.parser(txt);
        this.ruleLab.textFlow = textFlow;
    };
    RankPanel.prototype.getGodRank = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_godrank;
        http.send(data, this.setGodRank, this);
    };
    RankPanel.prototype.awardBack = function (data) {
        if (!data.ret) {
            App.DataCenter.UserInfo.httpUserInfo.roomCard = data.data.room_card;
            App.DataCenter.UserInfo.httpUserInfo.roomCardCoop = data.data.room_card_coop;
            //            (<HallScene>App.layerMgr.curscene).updataUserUI();
            Tips.info("恭喜你，领奖成功!!!");
        }
        else {
        }
    };
    //神榜
    RankPanel.prototype.setGodRank = function (data) {
        if (!data.ret) {
            var ac = new eui.ArrayCollection();
            var rankList = data;
            var arr = [];
            var myself = rankList.data.pop();
            var myselfUser = new Object();
            //            myselfUser["coin"] = myself.point;
            myselfUser["name"] = App.DataCenter.UserInfo.httpUserInfo.nickName;
            myselfUser["rankIcon"] = "rank_self_icon_png";
            myselfUser["desc"] = "赢" + myself.point;
            myselfUser["head"] = App.DataCenter.UserInfo.httpUserInfo.headUrl;
            myselfUser["bg"] = "rank_selfitem_bg_png";
            if (myself.rank == "未入围") {
                myselfUser["sn"] = "rank_nohave_png";
            }
            else {
                myselfUser["n"] = myself.rank;
            }
            arr.push(myselfUser);
            //            this.rankGodLab.text = myself.rank;
            //            this.godLab.text = myself.point;   
            //            
            for (var i = 0; i < rankList.data.length; i++) {
                var rankObj = rankList.data[i];
                var rankUser = new Object();
                switch (i) {
                    case 0:
                        rankUser["rankIcon"] = "rank_one_icon_png";
                        break;
                    case 1:
                        rankUser["rankIcon"] = "rank_two_icon_png";
                        break;
                    case 2:
                        rankUser["rankIcon"] = "rank_three_icon_png";
                        break;
                    default:
                        rankUser["rankIcon"] = "rank_default_icon_png";
                }
                rankUser["n"] = rankObj.num;
                if (i < 3) {
                    rankUser["n"] = "";
                }
                rankUser["tclor"] = "0xFFD200";
                rankUser["bg"] = "hall_com_item_png";
                rankUser["win"] = rankObj.win; //胜利积分
                rankUser["lose"] = rankObj.lose; //输的积分
                rankUser["draw"] = rankObj.draw; //平的积分
                rankUser["name"] = rankObj.name; //名字
                rankUser["head"] = rankObj.avater == "1" ? "" : rankObj.avater; //头像
                rankUser["id"] = rankObj.id; //id 
                rankUser["desc"] = "赢:" + rankObj.win + "输:" + rankObj.lose + "平:" + rankObj.draw;
                arr.push(rankUser);
            }
            ac.source = arr;
            this.godList.dataProvider = ac;
        }
        else {
        }
    };
    RankPanel.prototype.getRichData = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_richrank;
        http.send(data, this.setRichData, this);
    };
    //财富榜
    RankPanel.prototype.setRichData = function (data) {
        if (!data.ret) {
            var ac = new eui.ArrayCollection();
            var rankList = data;
            var arr = [];
            var myself = rankList.data.pop();
            var myselfUser = new Object();
            myselfUser["coin"] = myself.point;
            myselfUser["name"] = App.DataCenter.UserInfo.httpUserInfo.nickName;
            myselfUser["rankIcon"] = "rank_self_icon_png";
            myselfUser["desc"] = App.DataCenter.UserInfo.httpUserInfo.coin + "钻石";
            myselfUser["head"] = App.DataCenter.UserInfo.httpUserInfo.headUrl;
            myselfUser["bg"] = "rank_selfitem_bg_png";
            if (myself.rank == "未入围") {
                myselfUser["sn"] = "rank_nohave_png";
            }
            else {
                myselfUser["n"] = myself.rank;
            }
            arr.push(myselfUser);
            //            this.rankCoinLab.text = myself.rank;
            //            this.coinLab.text = myself.point;                 
            for (var i = 0; i < rankList.data.length; i++) {
                var rankObj = rankList.data[i];
                var rankUser = new Object();
                switch (i) {
                    case 0:
                        rankUser["rankIcon"] = "rank_one_icon_png";
                        break;
                    case 1:
                        rankUser["rankIcon"] = "rank_two_icon_png";
                        break;
                    case 2:
                        rankUser["rankIcon"] = "rank_three_icon_png";
                        break;
                    default:
                        rankUser["rankIcon"] = "rank_default_icon_png";
                }
                rankUser["n"] = rankObj.num;
                if (i < 3) {
                    rankUser["n"] = "";
                }
                rankUser["tclor"] = "0xFFD200";
                rankUser["bg"] = "hall_com_item_png";
                rankUser["coin"] = rankObj.coin; //金币
                rankUser["name"] = rankObj.name; //名字
                rankUser["head"] = rankObj.avater == "1" ? "" : rankObj.avater; //头像
                rankUser["id"] = rankObj.id; //id 
                rankUser["desc"] = rankObj.coin + "钻石";
                arr.push(rankUser);
            }
            ac.source = arr;
            this.richerList.dataProvider = ac;
        }
        else {
        }
    };
    RankPanel.prototype.getScoreRank = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_scorerank;
        http.send(data, this.setScoreRank, this);
    };
    RankPanel.prototype.setScoreRank = function (data) {
        if (!data.ret) {
            var ac = new eui.ArrayCollection();
            var rankList = data;
            var myself = rankList.data.pop();
            var arr = [];
            var myselfUser = new Object();
            myselfUser["name"] = App.DataCenter.UserInfo.httpUserInfo.nickName;
            myselfUser["rankIcon"] = "rank_self_icon_png";
            myselfUser["desc"] = myself.point + "分";
            myselfUser["head"] = App.DataCenter.UserInfo.httpUserInfo.headUrl;
            myselfUser["bg"] = "rank_selfitem_bg_png";
            if (myself.rank == "未入围") {
                myselfUser["sn"] = "rank_nohave_png";
            }
            else {
                myselfUser["n"] = myself.rank;
            }
            arr.push(myselfUser);
            for (var i = 0; i < rankList.data.length; i++) {
                var rankObj = rankList.data[i];
                var rankUser = new Object();
                switch (i) {
                    case 0:
                        rankUser["rankIcon"] = "rank_one_icon_png";
                        break;
                    case 1:
                        rankUser["rankIcon"] = "rank_two_icon_png";
                        break;
                    case 2:
                        rankUser["rankIcon"] = "rank_three_icon_png";
                        break;
                    default:
                        rankUser["rankIcon"] = "rank_default_icon_png";
                }
                rankUser["n"] = rankObj.num;
                if (i < 3) {
                    rankUser["n"] = "";
                }
                rankUser["tclor"] = "0xFFD200";
                rankUser["bg"] = "hall_com_item_png";
                rankUser["point"] = rankObj.point; //积分
                rankUser["name"] = rankObj.name; //名字
                rankUser["head"] = rankObj.avater == "1" ? "" : rankObj.avater; //头像
                rankUser["id"] = rankObj.user_id; //id 
                rankUser["desc"] = rankObj.point + "分";
                arr.push(rankUser);
            }
            ac.source = arr;
            this.dayList.dataProvider = ac;
        }
        else {
        }
    };
    /**
     *  切换排行榜
     * @param evt
     */
    RankPanel.prototype.onChangeRankType = function (evt) {
        var radioGroup = evt.target;
        this.rankViewStack.selectedIndex = radioGroup.selectedValue;
    };
    RankPanel.prototype.onEnable = function () {
        this.setCenter();
        this.ruleDesc.visible = false;
        this.getGodRank();
        this.getRichData();
        this.getScoreRank();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        //        this.getAwardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGetAward,this);
        //        this.openRuleImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGetAward,this);
        this.openRuleImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ruleTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.ruleTouchEnd, this);
        this.dayRBtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChangeRankType, this);
        //        this.scoreLab.text=DataCenter.UserInfo.httpUserInfo.point.toString();     
        //        this.rankViewStack.selectedIndex=0;
    };
    RankPanel.prototype.ruleTouchBegin = function (e) {
        this.ruleDesc.visible = true;
    };
    RankPanel.prototype.ruleTouchEnd = function (e) {
        this.ruleDesc.visible = false;
    };
    RankPanel.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        //        this.getAwardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGetAward,this);
        this.dayRBtn.group.removeEventListener(eui.UIEvent.CHANGE, this.onChangeRankType, this);
        this.ruleDesc.visible = false;
    };
    RankPanel.prototype.onDestroy = function () {
    };
    return RankPanel;
}(BasePanel));
__reflect(RankPanel.prototype, "RankPanel");
//# sourceMappingURL=RankPanel.js.map