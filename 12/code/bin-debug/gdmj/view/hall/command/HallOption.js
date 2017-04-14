var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author chenwei
 *
 */
var HallOption = (function (_super) {
    __extends(HallOption, _super);
    function HallOption() {
        return _super.call(this) || this;
    }
    HallOption.prototype.childrenCreated = function () {
        this.init();
    };
    HallOption.prototype.onEnable = function () {
        var _this = this;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        egret.setTimeout(function () { _this.onUp(); }, this, 10000);
    };
    HallOption.prototype.init = function () {
        this.menuGroup.mask = this.menuMask;
    };
    HallOption.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.downArrow:
                this.onDown();
                break;
            case this.upArrow:
                this.onUp();
                break;
            case this.rankBtn:
                App.PanelManager.open(PanelConst.RankPanel1);
                break;
            case this.openDeskBtn:
                this.openDesk();
                break;
            case this.enterRoomBtn:
                console.log("game state...", App.DataCenter.gameState);
                if (App.DataCenter.gameState == GameState.Ready) {
                    var messageBox = App.MsgBoxManager.getBoxA();
                    messageBox.rightTitle("狠心离去");
                    messageBox.leftTitle("算了");
                    messageBox.ok = function () {
                        App.PanelManager.open(PanelConst.InputRoom);
                    };
                    messageBox.showMsg("游戏即将开始,是否确认要前往其他房间?");
                }
                else if (App.DataCenter.gameState == GameState.Playing) {
                    Tips.info("游戏已开始,完成本局再走吧！");
                }
                else {
                    App.PanelManager.open(PanelConst.InputRoom);
                }
                break;
            case this.goHomeBtn:
                this.goHome();
                break;
        }
    };
    HallOption.prototype.onUp = function () {
        var _this = this;
        egret.Tween.get(this.menuGroup).to({ y: -this.menuGroup.height }, 400, egret.Ease.quadIn).call(function () {
            _this.upArrow.visible = false;
            _this.downArrow.visible = true;
        });
    };
    HallOption.prototype.onDown = function () {
        var _this = this;
        egret.Tween.get(this.menuGroup).to({ y: 0 }, 400, egret.Ease.quadOut).call(function () {
            _this.upArrow.visible = true;
            _this.downArrow.visible = false;
        });
    };
    HallOption.prototype.openDesk = function () {
        var curDesk = App.DataCenter.roomInfo.getCurDesk();
        if (curDesk && curDesk.ownerID != App.DataCenter.UserInfo.getMyUserVo().userID) {
            Tips.info("您在别人的房间不能开新桌!!");
            return;
        }
        var hall = App.SceneManager.getScene(SceneConst.HallScene);
        hall.openDesk();
    };
    HallOption.prototype.goHome = function () {
        var curDesk = App.DataCenter.roomInfo.getCurDesk();
        if (curDesk && curDesk.ownerID == App.DataCenter.UserInfo.getMyUserVo().userID) {
            Tips.info("您现在已经在家里!!");
            return;
        }
        if (App.DataCenter.gameState == GameState.Ready) {
            var messageBox = App.MsgBoxManager.getBoxA();
            messageBox.rightTitle("狠心离去");
            messageBox.leftTitle("算了");
            messageBox.showMsg("游戏即将开始,是否确认要回家?");
            messageBox.ok = function () {
                App.EventManager.sendEvent(EventConst.GameStateChange, GameState.Free);
                var hall = App.SceneManager.getScene(SceneConst.HallScene);
                hall.sendSelfRoom();
            };
        }
        else if (App.DataCenter.gameState == GameState.Playing) {
            Tips.info("游戏已开始,完成本局再走吧！");
        }
        else {
            var hall = App.SceneManager.getScene(SceneConst.HallScene);
            hall.sendSelfRoom();
        }
    };
    return HallOption;
}(BaseUI));
__reflect(HallOption.prototype, "HallOption");
//# sourceMappingURL=HallOption.js.map