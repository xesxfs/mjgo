var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 聊天界面
 * @author eyanlong
 * @date 2017/2/24
 */
var ChatPanel = (function (_super) {
    __extends(ChatPanel, _super);
    function ChatPanel() {
        var _this = _super.call(this) || this;
        _this.msgLimit = 30; //聊天输入限制
        _this.skinName = "ChatPanelSkin";
        return _this;
    }
    ChatPanel.prototype.childrenCreated = function () {
        this.setBottom();
        this.useBtn.group.addEventListener(eui.UIEvent.CHANGE, this.changeSelectView, this);
        this.chatViewStack.selectedIndex = 0;
        this.recordGroupLabel.height = 0;
        //this.recordLabel.text = "";
        //设置默认表情
        this.setDefaultFace();
    };
    ChatPanel.prototype.onEnable = function () {
        this.sendInput.text = "";
        this.commList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCommChange, this);
        this.faceScrollGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaceChange, this);
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SendChatText, this);
        this.recordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRecord, this);
        this.newsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showNews, this);
        this.sendInput.addEventListener(egret.FocusEvent.FOCUS_IN, this.showRecord, this);
    };
    ChatPanel.prototype.onRemove = function () {
        this.commList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCommChange, this);
        this.faceScrollGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaceChange, this);
        this.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SendChatText, this);
        this.recordBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showRecord, this);
        this.newsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showNews, this);
        this.sendInput.removeEventListener(egret.FocusEvent.FOCUS_IN, this.showRecord, this);
    };
    /**
     * 设置聊天记录
     * @chatRecordStr 聊天数据
     */
    ChatPanel.prototype.setRecord = function (chatRecordStr) {
        this.recordGroupLabel.removeChildren();
        chatRecordStr = [[null, "好1", true], [null, "好2", false], [null, "好3", true], [null, "好4", false], [null, "好5", true]];
        for (var i = 0; i < chatRecordStr.length; i++) {
            var record = new ChatRecord();
            record.x = 0;
            record.y = i * 110;
            record.setRecord(chatRecordStr[i][2], chatRecordStr[i][1], chatRecordStr[i][0]);
            this.recordGroupLabel.addChild(record);
            console.log(i);
        }
        // //文本滚动 325=scroller最大显示高度
        if (chatRecordStr.length * 110 + 55 > 325) {
            var viewport = this.recordScroller.viewport;
            viewport.scrollV = chatRecordStr.length * 110 + 55 - 325;
        }
    };
    //还原
    ChatPanel.prototype.reduction = function () {
        this.chatViewStack.selectedIndex = 0;
        this.faceBtn.visible = true;
        this.useBtn.selected = true;
        this.useBtn.visible = true;
        this.chat_iamge.visible = true;
    };
    //设置商城购买的默认表情
    ChatPanel.prototype.setDefaultFace = function () {
        var faceItemList = FaceFactory.getInstance().getFaceItemImage(ItemType.default);
        var len = faceItemList.length;
        for (var i = 0; i < len; i++) {
            this.faceScrollGroup.addChild(faceItemList[i]);
        }
        this.sortFaceGroup();
    };
    //重新排列FaceGroup，Egret的Tile布局不正确，这里只能手动排列。
    ChatPanel.prototype.sortFaceGroup = function () {
        ArrayTool.sortScrollGroup(this.faceScrollGroup, 5, 90, 80, 25, 25);
    };
    //常用语 表情 切换
    ChatPanel.prototype.changeSelectView = function (e) {
        var rdGroup = e.target;
        this.chatViewStack.selectedIndex = rdGroup.selectedValue;
    };
    /**
     * 显示聊天记录
     */
    ChatPanel.prototype.showRecord = function () {
        // var gameScene: GameScene = App.SceneManager.getScene(SceneConst.GameScene);
        // gameScene.chatRecordStr&&this.setRecord(gameScene.chatRecordStr);
        this.setRecord(null);
        this.recordBtn.visible = false;
        this.newsBtn.visible = true;
        this.chatViewStack.selectedIndex = 2;
        this.chatViewStack.width = App.StageUtils.stageWidth - 39;
        this.chatViewStack.x = 38;
        this.faceBtn.visible = false;
        this.useBtn.visible = false;
        this.chat_iamge.visible = false;
    };
    /**
     * 显示快捷用语和表情
     */
    ChatPanel.prototype.showNews = function () {
        this.recordBtn.visible = true;
        this.newsBtn.visible = false;
        if (this.useBtn.selected) {
            this.chatViewStack.selectedIndex = 0;
        }
        else {
            this.chatViewStack.selectedIndex = 1;
        }
        this.chatViewStack.width = App.StageUtils.stageWidth - 112;
        this.chatViewStack.x = 110;
        this.faceBtn.visible = true;
        this.useBtn.visible = true;
        this.chat_iamge.visible = true;
    };
    ChatPanel.prototype.onCommChange = function () {
        var msgType = CHAT_TYPE.Common;
        var msg = this.commList.selectedIndex + "";
        App.EventManager.sendEvent(GameController.EVENT_SEND_CHAT, msgType, msg);
        this.hide();
    };
    ChatPanel.prototype.onFaceChange = function (e) {
        if (e.target instanceof FaceItem) {
            var faceItem = e.target;
            var msgType = CHAT_TYPE.Face;
            var msg = faceItem.chatID + "";
            App.EventManager.sendEvent(GameController.EVENT_SEND_CHAT, msgType, msg);
            this.hide();
        }
    };
    ChatPanel.prototype.SendChatText = function () {
        var msg = StringTool.trim(this.sendInput.text);
        if (msg.length > 0) {
            if (msg.length > this.msgLimit) {
                msg = msg.substr(0, this.msgLimit);
            }
            var msgType = CHAT_TYPE.Text;
            App.EventManager.sendEvent(GameController.EVENT_SEND_CHAT, msgType, msg);
            this.sendInput.text = " ";
            this.hide();
        }
        else {
            // var messageBox:MessageBox = App.MsgBoxManager.getBoxB();
            // messageBox.showMsg("请输入聊天内容...");
            Tips.info("请输入聊天内容...");
        }
    };
    return ChatPanel;
}(BasePanel));
__reflect(ChatPanel.prototype, "ChatPanel");
//# sourceMappingURL=ChatPanel.js.map