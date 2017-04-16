var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 商城信息
 * @author chenkai
 * @date 2016/11/18
 */
var ShopInfo = (function () {
    function ShopInfo() {
    }
    return ShopInfo;
}());
__reflect(ShopInfo.prototype, "ShopInfo");
/**商城物品栏类型*/
var ShopType;
(function (ShopType) {
    /**钻石*/
    ShopType[ShopType["Diamon"] = 1] = "Diamon";
    /**道具*/
    ShopType[ShopType["Item"] = 2] = "Item";
    /**vip*/
    ShopType[ShopType["Vip"] = 7] = "Vip";
    /**金币*/
    ShopType[ShopType["Gold"] = 8] = "Gold";
    /**续费*/
    ShopType[ShopType["ReNew"] = 9] = "ReNew";
    /**开新桌*/
    ShopType[ShopType["OpenDesk"] = 10] = "OpenDesk";
})(ShopType || (ShopType = {}));
//# sourceMappingURL=ShopInfo.js.map