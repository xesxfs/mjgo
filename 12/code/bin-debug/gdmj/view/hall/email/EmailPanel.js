var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *	邮箱界面
 * @author eyanlong
 *	2017/2/23
 */
var EmailPanel = (function (_super) {
    __extends(EmailPanel, _super);
    function EmailPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "EmailSkin";
        return _this;
    }
    /**添加到场景中*/
    EmailPanel.prototype.onEnable = function () {
        this.one_key_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteKey, this);
        this.one_key_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveKey, this);
        this.email_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    /**从场景中移除*/
    EmailPanel.prototype.onRemove = function () {
        this.one_key_delete.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteKey, this);
        this.one_key_receive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveKey, this);
        this.email_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    /**设置数据 */
    EmailPanel.prototype.setData = function (data) {
        var ac = new eui.ArrayCollection();
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            var dataObj = new Object();
            dataObj["data"] = data[i];
            if (data[i].is_read == 0) {
                this.stack_bt.selectedIndex = 0;
            }
            arr.push(dataObj);
        }
        ac.source = arr;
        this.emailList.dataProvider = ac;
        this.emailList.itemRenderer = EmailItem;
    };
    /**一键删除 */
    EmailPanel.prototype.deleteKey = function () {
    };
    /**一键领取 */
    EmailPanel.prototype.receiveKey = function () {
        this.stack_bt.selectedIndex = 1;
    };
    /**返回 */
    EmailPanel.prototype.back = function () {
        this.hide();
    };
    return EmailPanel;
}(BasePanel));
__reflect(EmailPanel.prototype, "EmailPanel");
//# sourceMappingURL=EmailPanel.js.map