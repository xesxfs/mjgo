/**
 * 2017-3-8
 * author:xiongjian
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameResultPanel = (function (_super) {
    __extends(gameResultPanel, _super);
    function gameResultPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "gameResultSkin";
        return _this;
    }
    gameResultPanel.prototype.childrenCreated = function () {
    };
    gameResultPanel.prototype.onEnable = function () {
        this.setCenter();
        this.setData();
    };
    gameResultPanel.prototype.onRemove = function () {
    };
    gameResultPanel.prototype.setData = function () {
        var ac = new eui.ArrayCollection();
        var arr = [];
        for (var i = 0; i < 5; i++) {
            arr.push({ name: "绝对醉人", gameId: "123456", gameFen: "+60", gameType: "捉鸟", zhongniao: "", gameresult: "" });
        }
        ac.source = arr;
        this.resultList.dataProvider = ac;
    };
    return gameResultPanel;
}(BasePanel));
__reflect(gameResultPanel.prototype, "gameResultPanel");
//# sourceMappingURL=gameResultPanel.js.map