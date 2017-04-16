/**
 * @author xiongjian
 * 2017-1-14
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ScoreDetailPanel1 = (function (_super) {
    __extends(ScoreDetailPanel1, _super);
    function ScoreDetailPanel1() {
        var _this = _super.call(this) || this;
        _this.skinName = "ScoreDetailPanelSkin1";
        return _this;
    }
    ScoreDetailPanel1.prototype.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
        // this.getData();
    };
    ScoreDetailPanel1.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
    };
    ScoreDetailPanel1.prototype.childrenCreated = function () {
    };
    /**请求数据 */
    ScoreDetailPanel1.prototype.getData = function () {
    };
    /**设置数据 */
    ScoreDetailPanel1.prototype.setData = function (data) {
        if (data["data"]) {
            var da = data["data"];
            var arr = [];
            var ac = new eui.ArrayCollection();
            // console.log(da);
            for (var i = 0; i < da.length; i++) {
                var dataObj = new Object();
                var uList = [];
                var uinfo = JSON.parse(da[i].userinfo);
                // console.log(uinfo);
                dataObj["gameDate"] = da[i].gameDate;
                var date1 = new Date(parseInt(da[i].gameDate) * 1000);
                var minutes = date1.getMinutes() >= 10 ? date1.getMinutes() : "0" + date1.getMinutes();
                var time = date1.getHours() + ":" + minutes;
                dataObj["time"] = time;
                dataObj["replayCode"] = da[i].replayCode;
                dataObj["sort"] = da[i].sort;
                for (var j = 0; j < uinfo.length; j++) {
                    var userObj = new Object();
                    if (this.pid && this.pid == uinfo[j].playerID) {
                        dataObj["selfScore"] = uinfo[j].score;
                        dataObj["selfPic"] = uinfo[j].avater_url;
                        dataObj["selfPid"] = uinfo[j].playerID;
                    }
                    else {
                        userObj["pic"] = uinfo[j].avater_url;
                        userObj["score"] = uinfo[j].score;
                        userObj["pid"] = uinfo[j].playerID;
                        uList.push(userObj);
                    }
                }
                dataObj["userList"] = uList;
                //console.log(dataObj);
                arr.push(dataObj);
            }
            // console.log(arr);
            ac.source = arr;
            this.scoreDetailList.dataProvider = ac;
            this.scoreDetailList.itemRenderer = ScoreDetailItem1;
            /**
             * UI赋值
             */
            this.user1Img.source = uList[0].pic;
            this.user2Img.source = uList[1].pic;
            this.user3Img.source = uList[2].pic;
            // console.log(arr);
            // console.log(arr["selfPic"]);
            this.selfImg.source = arr[0]["selfPic"];
        }
    };
    ScoreDetailPanel1.prototype.setParam = function (date, code, pid) {
        this.pid = pid;
        // console.log(this.pid);
        var http = new HttpSender();
        var sendData = ProtocolHttp.GetScoreDetailList;
        sendData.param.deskBuildDate = date;
        sendData.param.deskCode = code;
        http.send(sendData, this.setData, this);
    };
    ScoreDetailPanel1.prototype.closeTouch = function (e) {
        this.hide();
    };
    return ScoreDetailPanel1;
}(BasePanel));
__reflect(ScoreDetailPanel1.prototype, "ScoreDetailPanel1");
//# sourceMappingURL=ScoreDetailPanel1.js.map