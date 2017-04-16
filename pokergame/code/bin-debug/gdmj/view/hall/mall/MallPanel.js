/**
 * 商城界面
 * @author eyanlong
 * @date 2017/2/21
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MallPanel = (function (_super) {
    __extends(MallPanel, _super);
    function MallPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "MallPanelSkin";
        return _this;
    }
    MallPanel.prototype.onEnable = function () {
        this.mall_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.setData(this.recData);
    };
    MallPanel.prototype.onRemove = function () {
        this.mall_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    /**设置数据 */
    MallPanel.prototype.setData = function (list) {
        var ac = new eui.ArrayCollection();
        var arr = [];
        for (var i = 0; i < list.length; i++) {
            var dataObj = new MallItemData();
            dataObj.setData(list[i]);
            arr.push(dataObj);
        }
        ac.source = arr;
        this.mallList.dataProvider = ac;
        this.mallList.itemRenderer = MallItem;
    };
    /**返回 */
    MallPanel.prototype.back = function () {
        this.hide();
    };
    return MallPanel;
}(BasePanel));
__reflect(MallPanel.prototype, "MallPanel");
//# sourceMappingURL=MallPanel.js.map