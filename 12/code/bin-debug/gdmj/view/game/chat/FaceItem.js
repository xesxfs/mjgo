var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 表情选项
 * @author chenkai
 * @date 2016/7/5
 */
var FaceItem = (function (_super) {
    __extends(FaceItem, _super);
    function FaceItem() {
        var _this = _super.call(this) || this;
        _this.chatID = 0; //表情id
        _this.type = CHAT_TYPE.Face; //聊天类型
        return _this;
    }
    return FaceItem;
}(eui.Image));
__reflect(FaceItem.prototype, "FaceItem");
//# sourceMappingURL=FaceItem.js.map