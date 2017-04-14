var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏内商城
 * @author eyanlong
 * @date 2017/2/24
 */
var GameMall = (function (_super) {
    __extends(GameMall, _super);
    function GameMall() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameMallSkin";
        return _this;
    }
    GameMall.prototype.childrenCreated = function () {
        this.setBottom();
    };
    return GameMall;
}(BasePanel));
__reflect(GameMall.prototype, "GameMall");
//# sourceMappingURL=GameMall.js.map