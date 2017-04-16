var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 聊天常用语项
 * @author chenkai
 * @date 2016/7/4
 */
var ChatItem = (function (_super) {
    __extends(ChatItem, _super);
    function ChatItem() {
        var _this = _super.call(this) || this;
        _this.chatID = 0; //常用语id
        _this.type = 0; //聊天类型
        _this.touchChildren = false;
        return _this;
    }
    return ChatItem;
}(eui.ItemRenderer));
__reflect(ChatItem.prototype, "ChatItem");
//# sourceMappingURL=ChatItem.js.map