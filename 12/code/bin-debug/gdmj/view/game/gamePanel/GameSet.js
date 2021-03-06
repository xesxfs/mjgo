var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏内设置
 * @author eyanlong
 * @date 2017/2/24
 */
var GameSet = (function (_super) {
    __extends(GameSet, _super);
    function GameSet() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameSetSkin";
        return _this;
    }
    GameSet.prototype.childrenCreated = function () {
        this.setBottom();
    };
    return GameSet;
}(BasePanel));
__reflect(GameSet.prototype, "GameSet");
//# sourceMappingURL=GameSet.js.map