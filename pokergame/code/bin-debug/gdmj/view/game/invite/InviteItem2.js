var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 邀请好友item2
 * @author eyanlong
 *  2017/02/25
 */
var InviteItem2 = (function (_super) {
    __extends(InviteItem2, _super);
    function InviteItem2() {
        var _this = _super.call(this) || this;
        _this.skinName = "InviteItem2Skin";
        return _this;
    }
    InviteItem2.prototype.dataChanged = function () {
    };
    InviteItem2.prototype.childrenCreated = function () {
    };
    return InviteItem2;
}(eui.ItemRenderer));
__reflect(InviteItem2.prototype, "InviteItem2");
//# sourceMappingURL=InviteItem2.js.map