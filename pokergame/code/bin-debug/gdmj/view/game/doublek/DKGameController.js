var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏控制模块
 * @author chenkai
 * @date 2016/11/18
 */
var DKGameController = (function (_super) {
    __extends(DKGameController, _super);
    function DKGameController() {
        var _this = _super.call(this) || this;
        /**游戏场景是否初始化完成，用于scene组件创建完毕之前就收到socket消息，此时不能更新组件*/
        _this.inited = false;
        return _this;
    }
    //注册模块时调用
    DKGameController.prototype.onRegister = function () {
        this.addEvent(GameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
    };
    //注销模块时调用
    DKGameController.prototype.onRemove = function () {
        this.removeEvent(GameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
    };
    /**显示游戏*/
    DKGameController.prototype.showGameScene = function () {
    };
    return DKGameController;
}(BaseController));
/**游戏模块名*/
DKGameController.NAME = "DKGameController";
/**领取救济金*/
DKGameController.EVENT_REV_ALMS = "EVENT_REV_ALMS";
/**离开游戏*/
DKGameController.EVENT_QUIT_GAME = "EVENT_QUIT_GAME";
/**发送聊天*/
DKGameController.EVENT_SEND_CHAT = "EVENT_SEND_CHAT";
/**发送动作表情*/
DKGameController.EVENT_SEND_ACT_FACE = "EVENT_SEND_ACT_FACE";
/**显示游戏场景*/
DKGameController.EVENT_SHOW_GAME_SCENE = "EVENT_SHOW_GAME_SCENE";
__reflect(DKGameController.prototype, "DKGameController");
//# sourceMappingURL=DKGameController.js.map