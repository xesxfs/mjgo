var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author chenwei
 *
 */
var ShareItem = (function (_super) {
    __extends(ShareItem, _super);
    function ShareItem() {
        return _super.call(this) || this;
    }
    /**
     * 设置领取状态
     * @param flag TRUE 已领取，FALSE未领取
     */
    ShareItem.prototype.setReceive = function (flag) {
        this.receiveImg.visible = flag;
    };
    //设置光柱 TRUE显示光柱，FALSE隐藏光柱
    ShareItem.prototype.setLight = function (flag) {
        this.lightImg.visible = flag;
    };
    //是否显示光柱
    ShareItem.prototype.isLight = function () {
        return this.lightImg.visible;
    };
    //是否领取
    ShareItem.prototype.isReceive = function () {
        return this.receiveImg.visible;
    };
    /**
     * 设置奖励数据
     * @param data
     */
    ShareItem.prototype.setContent = function (data) {
        this.target = data.target;
        this.mid = data.mid;
        this.targetLab.text = this.target.toString() + "人";
        if (this.acout1) {
            this.ibg1.visible = true;
            this.acout1.text = data.ac1;
            this.aImg1.source = data.ai1;
        }
        if (data.ac2) {
            this.ibg2.visible = true;
            this.acout2.text = data.ac2;
            this.aImg2.source = data.ai2;
        }
    };
    return ShareItem;
}(BaseUI));
__reflect(ShareItem.prototype, "ShareItem");
//# sourceMappingURL=ShareItem.js.map