var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author chenwei
 * 2016/07/13
 */
var ScorePanel = (function (_super) {
    __extends(ScorePanel, _super);
    function ScorePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ScorePanelSkin";
        return _this;
    }
    ScorePanel.prototype.onEnable = function () {
        this.getData();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
        this.lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLookTouch, this);
        this.setCenter();
    };
    ScorePanel.prototype.childrenCreated = function () {
    };
    ScorePanel.prototype.closeTouch = function (e) {
        this.hide();
    };
    ScorePanel.prototype.onLookTouch = function (e) {
        var codebox = new LookPswPanel();
        codebox.show();
    };
    ScorePanel.prototype.setScoreListData = function (scoreArray) {
        this.scoreList.dataProvider;
    };
    ScorePanel.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
        this.lookBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLookTouch, this);
    };
    ScorePanel.prototype.getData = function () {
        var http = new HttpSender();
        var sendData = ProtocolHttp.send_z_combat;
        //        sendData.param.playerID
        http.send(sendData, this.setData, this);
    };
    ScorePanel.prototype.setData = function (data) {
        //        { "gameID":"99999999","deskno":"3","buildDate":"1470477243","ownerID":"9223","playerGameInfo":"","num":"81","deskCode":"149399" }
        if (!data.ret) {
            this.nullTipsLab.visible = false;
            var ac = new eui.ArrayCollection();
            var rList = data;
            var arr = [];
            for (var i = 0; i < rList.data.length; i++) {
                var rObj = rList.data[i];
                var dataObj = new Object();
                dataObj["ownerID"] = rObj.ownerID;
                //                dataObj["score"] = rObj.score;
                dataObj["buildDate"] = rObj.buildDate;
                dataObj["deskCode"] = rObj.deskCode;
                dataObj["num"] = rObj.num;
                dataObj["deskno"] = rObj.deskno;
                dataObj["roomid"] = rObj.roomid;
                //                let playerGameInfo: Object = JSON.parse(rObj.playerGameInfo);
                //                dataObj["playerGameInfo"] = rObj.playerGameInfo;               
                var gdate = new Date();
                gdate.setTime(rObj.buildDate * 1000);
                dataObj["time"] = gdate.getFullYear() + "-" + NumberTool.formatTime((gdate.getMonth() + 1)) + "-" + NumberTool.formatTime(gdate.getDate()) + " " + NumberTool.formatTime(gdate.getHours()) + ":" + NumberTool.formatTime(gdate.getMinutes()) + ":" + NumberTool.formatTime(gdate.getSeconds());
                dataObj["playerGameInfo"] = JSON.parse(rObj.playerGameInfo);
                dataObj["RecordList"] = dataObj["playerGameInfo"].RecordList;
                if (!dataObj["RecordList"].length) {
                    continue;
                }
                for (var i_1 = 0; i_1 < dataObj["RecordList"].length; i_1++) {
                    //4个玩家数据
                    var play = dataObj["RecordList"][i_1];
                    if (play.userID == App.DataCenter.UserInfo.httpUserInfo.userID) {
                        dataObj["mp"] = play.point;
                        if (play.point > 0) {
                            dataObj["s"] = "score_win_png";
                        }
                        else {
                            dataObj["s"] = "score_lost_png";
                        }
                    }
                }
                arr.unshift(dataObj);
            }
            ac.source = arr;
            this.scoreList.dataProvider = ac;
        }
        else {
            this.nullTipsLab.visible = true;
        }
    };
    return ScorePanel;
}(BasePanel));
__reflect(ScorePanel.prototype, "ScorePanel");
//# sourceMappingURL=ScorePanel.js.map