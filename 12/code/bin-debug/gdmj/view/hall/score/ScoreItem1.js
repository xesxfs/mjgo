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
 * 2107-1-14
 */
var ScoreItem1 = (function (_super) {
    __extends(ScoreItem1, _super);
    function ScoreItem1() {
        var _this = _super.call(this) || this;
        _this.skinName = "ScoreDetailItemSkin1";
        _this.touchChildren = true;
        return _this;
    }
    ScoreItem1.prototype.dataChanged = function () {
        //    console.log(this.data.time);
        this.self_img.source = this.data.selfPic;
        // this.result.text = this.data.score;
        this.deskNumber.text = this.data.deskCode;
        this.time_label.text = this.data.time;
        this.date_label.text = this.data.date;
        this.deskCode = this.data.deskCode;
        this.deskBuildDate = this.data.deskBuildDate;
        this.pid = this.data.selfPid;
        switch (this.data.score) {
            case "赢":
                this.result.text = this.data.score;
                this.result.textColor = 0xffb238;
                break;
            case "输":
                this.result.text = this.data.score;
                this.result.textColor = 0xabdbec;
                break;
            case "平":
                this.result.text = "输";
                this.result.textColor = 0xabdbec;
                break;
        }
        var selfPoint = parseInt(this.data.selfPoint);
        var user1Point = parseInt(this.data["userList"][0].point);
        var user2Point = parseInt(this.data["userList"][1].point);
        var user3Point = parseInt(this.data["userList"][2].point);
        /**
         * 分数颜色修改
         */
        if (user1Point >= 0) {
            this.use1_label.textColor = 0xffb238;
        }
        else {
            this.use1_label.textColor = 0xabdbec;
        }
        if (user2Point >= 0) {
            this.use2_label.textColor = 0xffb238;
        }
        else {
            this.use2_label.textColor = 0xabdbec;
        }
        if (user3Point >= 0) {
            this.use3_label.textColor = 0xffb238;
        }
        else {
            this.use3_label.textColor = 0xabdbec;
        }
        if (selfPoint >= 0) {
            this.self_label.textColor = 0xffb238;
        }
        else {
            this.self_label.textColor = 0xabdbec;
        }
        /**
         * 分数处理
         */
        var p1 = this.setPoint(user1Point);
        var p2 = this.setPoint(user2Point);
        var p3 = this.setPoint(user3Point);
        var p4 = this.setPoint(selfPoint);
        this.use1_label.text = p1;
        this.use2_label.text = p2;
        this.use3_label.text = p3;
        this.self_label.text = p4;
        this.user1_img.source = this.data["userList"][0].pic;
        this.user2_img.source = this.data["userList"][1].pic;
        this.user3_img.source = this.data["userList"][2].pic;
    };
    ScoreItem1.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    ScoreItem1.prototype.onTouch = function (e) {
        var _this = this;
        // console.log("deskBuildDate"+this.deskBuildDate+"----deskCode" + this.deskCode);
        App.PanelManager.open(PanelConst.ScoreDetailPanel1, function () {
            var but = App.PanelManager.getPanel(PanelConst.ScoreDetailPanel1);
            but.setParam(_this.deskBuildDate, _this.deskCode, _this.pid);
        }, this);
    };
    /**
     * 分数过万处理
     */
    ScoreItem1.prototype.setPoint = function (point) {
        var result;
        if (point > 0 && point >= 10000) {
            result = (point / 10000).toFixed(2) + "万";
        }
        else if (point < 0 && point <= -10000) {
            result = (point / 10000).toFixed(2) + "万";
        }
        else {
            result = point;
        }
        return result;
    };
    return ScoreItem1;
}(eui.ItemRenderer));
__reflect(ScoreItem1.prototype, "ScoreItem1");
//# sourceMappingURL=ScoreItem1.js.map