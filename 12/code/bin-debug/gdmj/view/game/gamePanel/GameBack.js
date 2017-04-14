var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏内背包
 * @author eyanlong
 * @date 2017/2/24
 */
var GameBack = (function (_super) {
    __extends(GameBack, _super);
    function GameBack() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameBackSkin";
        return _this;
    }
    GameBack.prototype.childrenCreated = function () {
        this.setBottom();
    };
    return GameBack;
}(BasePanel));
__reflect(GameBack.prototype, "GameBack");
//# sourceMappingURL=GameBack.js.map