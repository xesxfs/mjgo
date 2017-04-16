var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author xiongjian
 * 2017-1-6
 */
var RankItem1 = (function (_super) {
    __extends(RankItem1, _super);
    function RankItem1() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankItemSkin1";
        return _this;
    }
    RankItem1.prototype.dataChanged = function () {
        // 将数据对应到组件上
        //  console.log("item"+this.data.rankIcon)
        // this.rankIcon.source =this.data.rankIcon;
        // this.myrank.text = this.data.sort;
        // this.deskName.text = this.data.deskName;
        // this.deskNumber.text = this.data.deskCode;
        // this.point.text = this.data.point;
        // this.rankBg.source = this.data.rankBg;
    };
    return RankItem1;
}(eui.ItemRenderer));
__reflect(RankItem1.prototype, "RankItem1");
//# sourceMappingURL=RankItem1.js.map