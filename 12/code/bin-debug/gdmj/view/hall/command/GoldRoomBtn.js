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
 *
 */
var GoldRoomBtn = (function (_super) {
    __extends(GoldRoomBtn, _super);
    function GoldRoomBtn() {
        return _super.call(this) || this;
    }
    GoldRoomBtn.prototype.init = function () {
        this.baseMoneyLab.text = "底注：" + this.base_money.toString();
        this.configLab.text = this.game_maima ? this.game_maima.toString() + "匹马" : "无马";
        if (this.max_money == 0) {
            this.minMoneyLab.text = this.formateMoney(this.min_money) + "以上";
        }
        else {
            this.minMoneyLab.text = this.formateMoney(this.min_money) + "-" + this.formateMoney(this.max_money);
        }
    };
    GoldRoomBtn.prototype.formateMoney = function (gold) {
        var goldStr = "";
        if (gold >= 1000 && gold < 10000) {
            gold = gold / 1000;
            goldStr = gold + "千";
        }
        else if (gold >= 10000) {
            gold = gold / 10000;
            goldStr = gold + "万";
        }
        return goldStr;
    };
    return GoldRoomBtn;
}(eui.Button));
__reflect(GoldRoomBtn.prototype, "GoldRoomBtn");
//# sourceMappingURL=GoldRoomBtn.js.map