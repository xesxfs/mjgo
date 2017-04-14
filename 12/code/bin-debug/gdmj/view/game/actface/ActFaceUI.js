var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 动作表情
 * @author chenkai
 * @date 2016/9/5
 */
var ActFaceUI = (function (_super) {
    __extends(ActFaceUI, _super);
    function ActFaceUI() {
        var _this = _super.call(this) || this;
        _this.itemList = []; //道具按钮
        _this.skinName = "ActFaceUISkin";
        return _this;
    }
    ActFaceUI.prototype.childrenCreated = function () {
        for (var i = 0; i < 6; i++) {
            this.itemList.push(this.itemGroup.getChildAt(i));
        }
    };
    ActFaceUI.prototype.onEnable = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    ActFaceUI.prototype.onRemove = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    ActFaceUI.prototype.onTouch = function (e) {
        var len = this.itemList.length;
        for (var i = 0; i < len; i++) {
            if (e.target == this.itemList[i]) {
                this.sendActFace(i + 1);
                break;
            }
        }
    };
    ActFaceUI.prototype.sendActFace = function (actFaceId) {
        this.hide();
        var itemType = actFaceId;
        var toUserid = App.DataCenter.UserInfo.getUserBySeatID(this.seatID).userID;
        App.EventManager.sendEvent(GameController.EVENT_SEND_ACT_FACE, itemType, toUserid);
    };
    ActFaceUI.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return ActFaceUI;
}(BaseUI));
__reflect(ActFaceUI.prototype, "ActFaceUI");
//# sourceMappingURL=ActFaceUI.js.map