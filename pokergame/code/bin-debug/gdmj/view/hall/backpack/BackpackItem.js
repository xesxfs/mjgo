/**
 * 背包item
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
var BackpackItem = (function (_super) {
    __extends(BackpackItem, _super);
    function BackpackItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "BackpackItemSkin";
        return _this;
    }
    BackpackItem.prototype.dataChanged = function () {
        var iData = this.itemData = this.data;
        this.goodsName.text = iData.name;
        this.descLab.text = iData.desc;
        if (iData.icon != "") {
            this.goodsImg.source = iData.icon;
        }
        else {
            this.goodsImg.source = App.getController("HallController").getUrl(Number(iData.id));
        }
        this.goodsNum.text = "X" + iData.count;
    };
    BackpackItem.prototype.childrenCreated = function () {
        this.useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    BackpackItem.prototype.onTouch = function (e) {
    };
    return BackpackItem;
}(eui.ItemRenderer));
__reflect(BackpackItem.prototype, "BackpackItem");
//# sourceMappingURL=BackpackItem.js.map