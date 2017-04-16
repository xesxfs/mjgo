/**
 *	好友房间item
 * @author eyanlong
 *  2017/02/23
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FriendItem = (function (_super) {
    __extends(FriendItem, _super);
    function FriendItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "FriendItemSkin";
        return _this;
    }
    FriendItem.prototype.dataChanged = function () {
        var iData = this.itemData = this.data;
        this.nickLab.text = StringTool.formatNickName(iData.ownerName);
        this.totalLab.text = iData.totalRound.toString();
        this.nowLab.text = iData.existPlayer + "/4";
        this.timeLab.text = iData.existTime.toString();
        if (iData.existPlayer < 4) {
            this.friendItemBt.visible = true;
            this.fullImg.visible = false;
        }
        else {
            this.friendItemBt.visible = false;
            this.fullImg.visible = true;
        }
    };
    FriendItem.prototype.childrenCreated = function () {
        this.friendItemBt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    /**加入好友房间 */
    FriendItem.prototype.onTouch = function (e) {
        App.PanelManager.open(PanelConst.JoinRoomPanel, function () {
            var but = App.PanelManager.getPanel(PanelConst.JoinRoomPanel);
        }, this, true, true, this.itemData);
    };
    return FriendItem;
}(eui.ItemRenderer));
__reflect(FriendItem.prototype, "FriendItem");
//# sourceMappingURL=FriendItem.js.map