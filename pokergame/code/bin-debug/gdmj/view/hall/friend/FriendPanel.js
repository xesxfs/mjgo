var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *	好友房列表界面
 * @author eyanlong
 *	2017/2/23
 */
var FriendPanel = (function (_super) {
    __extends(FriendPanel, _super);
    function FriendPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "FriendPanelSkin";
        return _this;
    }
    /**添加到场景中*/
    FriendPanel.prototype.onEnable = function () {
        this.setData(20);
        this.friend_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.room_number.addEventListener(egret.TouchEvent.TOUCH_TAP, this.roomNumber, this);
    };
    /**从场景中移除*/
    FriendPanel.prototype.onRemove = function () {
        this.friend_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.room_number.addEventListener(egret.TouchEvent.TOUCH_TAP, this.roomNumber, this);
    };
    /**设置数据 */
    FriendPanel.prototype.setData = function (num) {
        var ac = new eui.ArrayCollection();
        var arr = [];
        for (var i = 0; i < num; i++) {
            var dataObj = new FriendItemData();
            /**测试 */
            if (i == 4) {
                dataObj.ownerName = "孤绝天下无敌";
            }
            if (i == 7) {
                dataObj.ownerName = "孤绝";
            }
            dataObj.existTime = 300 + i % 3 + 1;
            dataObj.existPlayer = i % 4 + 1;
            dataObj.totalRound = (i % 5 + i) % 3 + 1;
            arr.push(dataObj);
        }
        ac.source = arr;
        arr = this.sortFunc(arr);
        this.friendList.dataProvider = ac;
        this.friendList.itemRenderer = FriendItem;
    };
    /**多条件排序 */
    FriendPanel.prototype.sortFunc = function (arr) {
        if (arr.length < 1) {
            return [];
        }
        arr.sort(function (a, b) {
            if (a.existPlayer == b.existPlayer) {
                if (a.existTime == b.existTime) {
                    return a.totalRound - b.totalRound;
                }
                return b.existTime - a.existTime;
            }
            return b.existPlayer - a.existPlayer;
        });
        for (var i = 0; i < arr.length; i++) {
            if (arr[0].existPlayer >= 4) {
                arr.push(arr.shift());
            }
        }
        return arr;
    };
    /**输入加入房间 */
    FriendPanel.prototype.roomNumber = function () {
        App.PanelManager.open(PanelConst.JoinNumber);
    };
    /**返回 */
    FriendPanel.prototype.back = function () {
        this.hide();
    };
    return FriendPanel;
}(BasePanel));
__reflect(FriendPanel.prototype, "FriendPanel");
//# sourceMappingURL=FriendPanel.js.map