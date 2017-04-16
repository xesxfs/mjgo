var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**聊天内容组件 */
var ChatRecord = (function (_super) {
    __extends(ChatRecord, _super);
    function ChatRecord() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChatRecordSkin";
        return _this;
    }
    /**
     * 设置内容
     * user:是否是自己
     * record:聊天内容
     * hard:头像
     */
    ChatRecord.prototype.setRecord = function (user, record, hard) {
        if (user === void 0) { user = false; }
        if (user) {
            this.chatStack.selectedIndex = 1;
            this.meHead.source = hard;
            this.meLabel.text = record;
        }
        else {
            this.chatStack.selectedIndex = 0;
            this.heHead.source = hard;
            this.heLabel.text = record;
        }
    };
    return ChatRecord;
}(eui.ItemRenderer));
__reflect(ChatRecord.prototype, "ChatRecord");
//# sourceMappingURL=ChatRecord.js.map