/**
* 头像UI
* 加载微信头像图片，并显示
* @author chenkai
* @date 2016/6/29
*
* Example:
* 1. 拖拽HeadUI自定义组件到exml，并为其设置自定义皮肤HeadUISkin
* 2. this.headUI.loadImg(headUrl); //加载图片
*
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HeadUI = (function (_super) {
    __extends(HeadUI, _super);
    function HeadUI() {
        var _this = _super.call(this) || this;
        _this.userID = 0; //用户ID
        _this.skinName = "HeadUISkin";
        return _this;
    }
    HeadUI.prototype.childrenCreated = function () {
        this.hideTuoGuanIcon();
        this.headShutup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickShutup, this);
    };
    HeadUI.prototype.onclickShutup = function () {
        this.gameScene = App.SceneManager.getScene(SceneConst.GameScene);
        for (var i = 0; i < this.gameScene.headUIList.length; i++) {
            if (this.userID == this.gameScene.headUIList[i].userID) {
                this.setHeadUiShutup(this.userID);
            }
        }
    };
    /**禁言处理*/
    HeadUI.prototype.setHeadUiShutup = function (userId) {
        var _this = this;
        if (this.headShutup.source == "game_say1_png")
            return;
        //禁言
        var messageBox = App.MsgBoxManager.getBoxA();
        messageBox.showMsg("将此玩家禁言，3分钟内无法使用语音及聊天功能，是否确定禁言?");
        messageBox.ok = function () {
            console.log("发送禁言:___________", userId);
            _this.headShutup.source = "game_say1_png";
            ProtocolData.Send111_2_0.banPostUserID = userId;
            ProtocolData.Send111_2_0.type = 1; //1 禁言3分钟  2本局禁言
            _this.gameScene.sendGameShutup();
        };
        messageBox.cancel = function () {
            messageBox.hide();
        };
    };
    /**
     * 加载头像图片
     * @param headUrl 图片地址
     */
    HeadUI.prototype.loadImg = function (headUrl) {
        if (headUrl && headUrl != "" && headUrl != 1) {
            this.headImg.source = headUrl;
            this.headQuestionImg.visible = false;
        }
    };
    //是否为空
    HeadUI.prototype.isEmpty = function () {
        if (this.headImg.bitmapData == null) {
            return true;
        }
        return false;
    };
    //显示托管图标
    HeadUI.prototype.showTuoGuanIcon = function () {
        console.log("托管状态");
        this.tuoGuanIcon.visible = true;
        this.headShade.visible = true;
    };
    //隐藏托管图标
    HeadUI.prototype.hideTuoGuanIcon = function () {
        this.tuoGuanIcon.visible = false;
        this.headShade.visible = false;
    };
    //清理数据
    HeadUI.prototype.clear = function () {
        this.headImg.bitmapData = null;
        this.headImg.texture = null;
        this.headImg.source = null;
        this.userID = -1;
        this.nameLabel.text = "";
        this.scoreLabel.text = "";
        this.tuoGuanIcon.visible = false;
        this.headQuestionImg.visible = true;
    };
    //隐藏
    HeadUI.prototype.hide = function () {
        this.headShutup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickShutup, this);
        this.parent && this.parent.removeChild(this);
    };
    return HeadUI;
}(eui.Component));
__reflect(HeadUI.prototype, "HeadUI");
//# sourceMappingURL=HeadUI.js.map