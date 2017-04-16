var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 邀请好友item1
 * @author eyanlong
 *  2017/02/25
 */
var InviteItem1 = (function (_super) {
    __extends(InviteItem1, _super);
    function InviteItem1() {
        var _this = _super.call(this) || this;
        _this.skinName = "InviteItem1Skin";
        return _this;
    }
    InviteItem1.prototype.dataChanged = function () {
    };
    InviteItem1.prototype.childrenCreated = function () {
    };
    return InviteItem1;
}(eui.ItemRenderer));
__reflect(InviteItem1.prototype, "InviteItem1");
//# sourceMappingURL=InviteItem1.js.map