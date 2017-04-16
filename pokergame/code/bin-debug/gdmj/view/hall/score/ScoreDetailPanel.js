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
 * 2016/08/03
 */
var ScoreDetailPanel = (function (_super) {
    __extends(ScoreDetailPanel, _super);
    function ScoreDetailPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ScoreDetailPanelSkin";
        return _this;
    }
    ScoreDetailPanel.prototype.onEnable = function () {
        this.setCenter();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
    };
    ScoreDetailPanel.prototype.closeTouch = function (e) {
        this.hide();
    };
    ScoreDetailPanel.prototype.setDeskno = function (desk, buildDate, roomid) {
        this.deskno = desk;
        this.buildDate = buildDate;
        this.roomid = roomid;
        this.getData();
    };
    ScoreDetailPanel.prototype.childrenCreated = function () {
    };
    ScoreDetailPanel.prototype.getData = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_combatdetail;
        data.param.deskno = this.deskno;
        data.param.buildDate = this.buildDate;
        data.param.playerID = App.DataCenter.UserInfo.httpUserInfo.userID;
        data.param.roomid = this.roomid;
        http.send(data, this.setData, this);
    };
    ScoreDetailPanel.prototype.setData = function (data) {
        //       { "playerID":"9218","score":"-20","deskno":"3","gamelog":"{\"test\": \"test\"}","gameDate":"1470364426","replayCode":"0","num":"605" }
        if (!data.ret) {
            var ac = new eui.ArrayCollection();
            var rList = data;
            var arr = [];
            var ix = 1;
            for (var i = 0; i < rList.data.length; i++) {
                var rObj = rList.data[i];
                var dataObj = new Object();
                dataObj["n"] = "第" + (ix++) + "局";
                dataObj["playerID"] = rObj.playerID;
                dataObj["score"] = rObj.score;
                dataObj["gameDate"] = rObj.gameDate;
                dataObj["deskno"] = rObj.deskno;
                dataObj["num"] = rObj.num;
                dataObj["deskno"] = rObj.deskno;
                dataObj["replayCode"] = rObj.replayCode;
                dataObj["avater_url"] = rObj.avater_url;
                var gamelog_1 = JSON.parse(rObj.gamelog);
                dataObj["gamelog"] = rObj.gamelog;
                var gdate = new Date();
                gdate.setTime(rObj.gameDate * 1000);
                dataObj["time"] = gdate.getHours() + ":" + (gdate.getMinutes() > 9 ? gdate.getMinutes() : "0" + gdate.getMinutes());
                dataObj["p1"] = gamelog_1[gamelog_1["seat0"]];
                dataObj["p2"] = gamelog_1[gamelog_1["seat1"]];
                dataObj["p3"] = gamelog_1[gamelog_1["seat2"]];
                dataObj["p4"] = gamelog_1[gamelog_1["seat3"]];
                dataObj["banker"] = gamelog_1["banker"];
                arr.push(dataObj);
            }
            //为累加数据,需要减掉前一个数据
            for (var i = arr.length - 1; i > 0; i--) {
                arr[i]["p1"] -= arr[i - 1]["p1"];
                arr[i]["p2"] -= arr[i - 1]["p2"];
                arr[i]["p3"] -= arr[i - 1]["p3"];
                arr[i]["p4"] -= arr[i - 1]["p4"];
            }
            var userinfo = JSON.parse(rList.data[0].userinfo);
            var gamelog = JSON.parse(rList.data[0].gamelog);
            this.p1head.source = userinfo[gamelog.seat0].avater_url == "1" ? "" : userinfo[gamelog.seat0].avater_url;
            this.p1name.text = userinfo[gamelog.seat0].name;
            this.p2head.source = userinfo[gamelog.seat1].avater_url == "1" ? "" : userinfo[gamelog.seat1].avater_url;
            this.p2name.text = userinfo[gamelog.seat1].name;
            this.p3head.source = userinfo[gamelog.seat2].avater_url == "1" ? "" : userinfo[gamelog.seat2].avater_url;
            this.p3name.text = userinfo[gamelog.seat2].name;
            this.p4head.source = userinfo[gamelog.seat3].avater_url == "1" ? "" : userinfo[gamelog.seat3].avater_url;
            this.p4name.text = userinfo[gamelog.seat3].name;
            ac.source = arr;
            this.scoreDetailList.dataProvider = ac;
        }
        else {
        }
    };
    return ScoreDetailPanel;
}(BasePanel));
__reflect(ScoreDetailPanel.prototype, "ScoreDetailPanel");
//# sourceMappingURL=ScoreDetailPanel.js.map