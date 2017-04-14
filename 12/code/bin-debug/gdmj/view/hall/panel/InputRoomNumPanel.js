var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 创建房间界面
 * @author chenwei
 * @date 2016/6/30
 */
var InputRoomNumPanel = (function (_super) {
    __extends(InputRoomNumPanel, _super);
    function InputRoomNumPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "InputRoomNumPanelSkin";
        return _this;
    }
    /**
     *  数字输入
     * @param e
     */
    InputRoomNumPanel.prototype.onNumBtnTouch = function (e) {
        if (this.isFirst) {
            this.isFirst = false;
            this.restData();
        }
        if (this.roomNumLab.text.length > 5) {
            return;
        }
        if (e.target instanceof eui.Button) {
            var numBtn = e.target;
            if (numBtn.label != "") {
                this.roomNumLab.text += numBtn.label;
            }
            if (this.roomNumLab.text.length == App.DataCenter.UserInfo.getMyUserVo().excluroomCode.length) {
                this.deskCode = this.roomNumLab.text;
                this.sendSearchRoom();
                this.roomNumLab.text = "";
            }
        }
    };
    //发送搜索房间。之前已进入大厅就连接gamesocket。现在在大厅时gameSocket一定是断开的，所以得先去连接调度服务器。
    InputRoomNumPanel.prototype.sendSearchRoom = function () {
        var hscene = App.SceneManager.getScene(SceneConst.HallScene);
        hscene.sendSelfRoom(this.deskCode);
    };
    /**
     *  删除数字
     * @param e
     */
    InputRoomNumPanel.prototype.onDelBtnTouch = function (e) {
        this.delNum();
    };
    InputRoomNumPanel.prototype.delNum = function () {
        if (this.roomNumLab.text.length > 0) {
            this.roomNumLab.text = this.roomNumLab.text.slice(0, this.roomNumLab.text.length - 1);
        }
    };
    InputRoomNumPanel.prototype.onResetBtnTouch = function (e) {
        this.restData();
    };
    /**
    *  重置数字
    *
    */
    InputRoomNumPanel.prototype.restData = function () {
        this.roomNumLab.text = "";
    };
    InputRoomNumPanel.prototype.onEnable = function () {
        this.roomNumLab.text = "请输入房间号...";
        this.isFirst = true;
        this.resetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResetBtnTouch, this);
        this.delBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDelBtnTouch, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.numberGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNumBtnTouch, this);
        this.setCenter();
    };
    InputRoomNumPanel.prototype.onRemove = function () {
        this.numberGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNumBtnTouch, this);
        this.resetBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onResetBtnTouch, this);
        this.delBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDelBtnTouch, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
    };
    InputRoomNumPanel.prototype.onDestroy = function () {
    };
    return InputRoomNumPanel;
}(BasePanel));
__reflect(InputRoomNumPanel.prototype, "InputRoomNumPanel");
//# sourceMappingURL=InputRoomNumPanel.js.map