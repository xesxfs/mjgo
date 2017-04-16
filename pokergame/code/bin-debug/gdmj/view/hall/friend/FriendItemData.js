var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FriendItemData = (function () {
    function FriendItemData(data) {
        if (data === void 0) { data = null; }
        this.init(data);
    }
    /**设置默认值或数据 */
    FriendItemData.prototype.init = function (data) {
        this.ownerName = "孤绝天下";
        this.headUrl = "game_headbg1_png";
        this.totalRound = 4;
        this.existPlayer = 1;
        this.existTime = 300;
    };
    FriendItemData.prototype.setData = function (data) {
    };
    return FriendItemData;
}());
__reflect(FriendItemData.prototype, "FriendItemData");
//# sourceMappingURL=FriendItemData.js.map