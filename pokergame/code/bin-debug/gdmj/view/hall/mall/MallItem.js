/**
 * 商城item
 * @author huanglong
 *  2017/03/09
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MallItem = (function (_super) {
    __extends(MallItem, _super);
    function MallItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "MallItemSkin";
        return _this;
    }
    MallItem.prototype.dataChanged = function () {
        var iData = this.itemData = this.data;
        this.iconImg.source = iData.iconUrl;
        this.nameLab.text = iData.goodsName;
        this.descLab.text = iData.descStr;
        this.priceBtn.getChildAt(3).text = iData.price.toString();
    };
    MallItem.prototype.childrenCreated = function () {
        this.priceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    MallItem.prototype.onTouch = function (e) {
        App.getController("HallController").sendBuyProp(this.itemData.goodsId);
    };
    return MallItem;
}(eui.ItemRenderer));
__reflect(MallItem.prototype, "MallItem");
//# sourceMappingURL=MallItem.js.map