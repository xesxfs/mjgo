var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *	邮件item
 * @author eyanlong
 *  2017/02/23
 */
var EmailItem = (function (_super) {
    __extends(EmailItem, _super);
    function EmailItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "EmailItemSkin";
        _this.touchChildren = true;
        return _this;
    }
    EmailItem.prototype.dataChanged = function () {
        if (this.data.data.is_read == 1) {
            this.email_bg.source = RES.getRes("hall_box_gray_png");
            if (this.data.data.is_receive == undefined) {
                this.email_iamge.source = RES.getRes("open_envelope_png");
            }
            else if (this.data.data.is_receive == 1) {
                this.email_iamge.source = RES.getRes("open_gift_png");
            }
            else {
                this.email_iamge.source = RES.getRes("gift_png");
            }
        }
        else {
            this.email_bg.source = RES.getRes("hall_within_box_png");
            if (this.data.data.is_receive == undefined) {
                this.email_iamge.source = RES.getRes("envelope_png");
            }
            else if (this.data.data.is_receive == 1) {
                this.email_iamge.source = RES.getRes("open_gift_png");
            }
            else {
                this.email_iamge.source = RES.getRes("gift_png");
            }
        }
        this.email_hard.text = this.data.data.title;
        this.email_time.text = this.data.data.send_date;
    };
    EmailItem.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    EmailItem.prototype.onTouch = function (e) {
        var ctrl = new HallController();
        ctrl.sendEmailDetail(this.data.data.id);
    };
    return EmailItem;
}(eui.ItemRenderer));
__reflect(EmailItem.prototype, "EmailItem");
//# sourceMappingURL=EmailItem.js.map