/**
 *	邀请好友列表界面
 * @author eyanlong
 *	2017/2/25
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InvitePanel = (function (_super) {
    __extends(InvitePanel, _super);
    function InvitePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "InvitePanelSkin";
        return _this;
    }
    /**添加到场景中*/
    InvitePanel.prototype.onEnable = function () {
        this.setData(10, false);
    };
    /**从场景中移除*/
    InvitePanel.prototype.onRemove = function () {
    };
    /**设置数据 */
    InvitePanel.prototype.setData = function (num, open) {
        var ac = new eui.ArrayCollection();
        var arr = [];
        for (var i = 0; i < num; i++) {
            var dataObj = new Object();
            dataObj["selfScore"] = i;
            dataObj["selfOpen"] = open;
            arr.push(dataObj);
        }
        ac.source = arr;
        this.inviteList.dataProvider = ac;
        this.inviteList.itemRenderer = InviteItem1;
    };
    return InvitePanel;
}(BasePanel));
__reflect(InvitePanel.prototype, "InvitePanel");
//# sourceMappingURL=InvitePanel.js.map