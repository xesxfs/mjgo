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
 *  2016/07/13
 */
var ScoreItem = (function (_super) {
    __extends(ScoreItem, _super);
    function ScoreItem() {
        return _super.call(this) || this;
    }
    ScoreItem.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    ScoreItem.prototype.onTouch = function (e) {
        var detail = new ScoreDetailPanel();
        detail.setDeskno(this.data.deskno, this.data.buildDate, this.data.roomid);
        detail.show();
    };
    return ScoreItem;
}(eui.ItemRenderer));
__reflect(ScoreItem.prototype, "ScoreItem");
//# sourceMappingURL=ScoreItem.js.map