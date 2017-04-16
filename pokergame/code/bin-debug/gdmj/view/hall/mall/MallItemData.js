/**
 * 商城item数据
 * @author huanglong
 *  2017/03/09
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MallItemData = (function () {
    function MallItemData(data) {
        if (data === void 0) { data = null; }
        this.init(data);
    }
    /**设置默认值或数据 */
    MallItemData.prototype.init = function (data) {
        this.goodsName = "房卡x1";
        this.iconUrl = "hall_ten_card_png";
        this.descStr = "可以开设好友房牌局";
        this.price = 6;
    };
    MallItemData.prototype.setData = function (data) {
        this.goodsId = data.id;
        this.goodsName = data.name;
        this.iconUrl = App.getController("HallController").getUrl(data.id);
        this.descStr = data.desc;
        this.price = data.buy_money;
    };
    return MallItemData;
}());
__reflect(MallItemData.prototype, "MallItemData");
//# sourceMappingURL=MallItemData.js.map