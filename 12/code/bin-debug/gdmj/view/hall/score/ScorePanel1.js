var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author xiongjian
 * 2016-1-13
 *
 */
var ScorePanel1 = (function (_super) {
    __extends(ScorePanel1, _super);
    function ScorePanel1() {
        var _this = _super.call(this) || this;
        _this.skinName = "ScorePanelSkin1";
        return _this;
    }
    /**添加到场景中*/
    ScorePanel1.prototype.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
        this.seeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.seeTouch, this);
        this.getData();
    };
    /**从场景中移除*/
    ScorePanel1.prototype.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouch, this);
        this.seeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.seeTouch, this);
    };
    /**组件创建完毕*/
    ScorePanel1.prototype.childrenCreated = function () {
    };
    /**关闭弹窗 */
    ScorePanel1.prototype.closeTouch = function (e) {
        this.hide();
    };
    /**
     * 查看回放
     */
    ScorePanel1.prototype.seeTouch = function () {
        App.PanelManager.open(PanelConst.LookPswPanel);
    };
    /**请求数据 */
    ScorePanel1.prototype.getData = function () {
        var http = new HttpSender();
        var sendData = ProtocolHttp.GetScoreList;
        http.send(sendData, this.setData, this);
    };
    /**设置数据 */
    ScorePanel1.prototype.setData = function (data) {
        var ac = new eui.ArrayCollection();
        var rList = data;
        var pid = "";
        var sList = [];
        var arr = [];
        for (var key in data.data) {
            console.log(key);
            //   console.log(data.data[key]);
            if (key == "playerID") {
                pid = data.data[key];
            }
            else {
                sList.push(data.data[key]);
            }
        }
        //console.log(pid);
        //console.log(sList[0]);
        // console.log(sList[0]["userinfo"]);
        // console.log(sList.length);
        if (sList && pid && sList.length > 0) {
            for (var i = 0; i < sList.length; i++) {
                var dataObj = new Object();
                var uList = [];
                if (sList[i]["userinfo"]) {
                    var uinfo = JSON.parse(sList[i]["userinfo"]);
                }
                // console.log(uinfo);
                for (var j = 0; j < uinfo.length; j++) {
                    var userObj = new Object();
                    //console.log(uinfo[j]["playerID"])
                    if (pid == uinfo[j]["playerID"]) {
                        dataObj["selfName"] = uinfo[j]["name"];
                        dataObj["selfPic"] = uinfo[j]["pic"];
                        dataObj["selfPoint"] = uinfo[j]["point"];
                        dataObj["selfPid"] = pid;
                    }
                    else {
                        //console.log("else " + uinfo[j]["name"]);
                        userObj["name"] = uinfo[j]["name"];
                        userObj["pic"] = uinfo[j]["pic"];
                        userObj["point"] = uinfo[j]["point"];
                        uList.push(userObj);
                    }
                }
                //时间处理
                var deskBuildDate = parseInt(sList[i]["deskBuildDate"]);
                var time = new Date(deskBuildDate * 1000);
                // console.log(time.getSeconds());
                var month = time.getMonth() + 1;
                // var m = month>=10?month:"0"+month
                var date = time.getFullYear() + "." + month + "." + time.getDate();
                var minutes = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
                var seconds = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
                var utime = time.getHours() + ":" + minutes + ":" + seconds;
                dataObj["time"] = utime;
                dataObj["date"] = date;
                dataObj["deskCode"] = sList[i]["deskCode"];
                dataObj["score"] = sList[i]["score"];
                dataObj["userList"] = uList;
                dataObj["deskBuildDate"] = deskBuildDate;
                arr.push(dataObj);
            }
        }
        ac.source = arr;
        this.scoreList.dataProvider = ac;
        this.scoreList.itemRenderer = ScoreItem1;
    };
    return ScorePanel1;
}(BasePanel));
__reflect(ScorePanel1.prototype, "ScorePanel1");
//# sourceMappingURL=ScorePanel1.js.map