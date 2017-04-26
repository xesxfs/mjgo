var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ScoreItem = (function (_super) {
    __extends(ScoreItem, _super);
    function ScoreItem() {
        return _super.call(this) || this;
    }
    ScoreItem.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    ScoreItem.prototype.dataChanged = function () {
        this.setUIData();
    };
    ScoreItem.prototype.setUIData = function () {
        this.dateLab.text = this.data["date"];
        this.roomNoLab.text = this.data["roomId"];
        this.timeLab.text = this.data["time"];
        this.firstNickNameLab.text = this.data["firstNickName"];
        this.secondNickNameLab.text = this.data["secondNickName"];
        this.thridNickNameLab.text = this.data["thridNickName"];
        this.fourthNickNameLab.text = this.data["fourthNickName"];
        this.firstScoreLab.text = this.formatScore(this.data["firstScore"]);
        this.secondScoreLab.text = this.formatScore(this.data["secondScore"]);
        this.thridScoreLab.text = this.formatScore(this.data["thridScore"]);
        this.fourthScoreLab.text = this.formatScore(this.data["fourthScore"]);
    };
    ScoreItem.prototype.formatScore = function (score) {
        if (score > 0) {
            return "+" + score;
        }
        return "" + score;
    };
    ScoreItem.prototype.onTouch = function (e) {
    };
    return ScoreItem;
}(eui.ItemRenderer));
__reflect(ScoreItem.prototype, "ScoreItem");
//# sourceMappingURL=ScoreItem.js.map