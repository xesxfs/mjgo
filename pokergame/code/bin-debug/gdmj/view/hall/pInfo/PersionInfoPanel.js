var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var PersionInfoPanel = (function (_super) {
    __extends(PersionInfoPanel, _super);
    function PersionInfoPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "PersonInfoSkin";
        return _this;
    }
    /**组件创建完毕*/
    PersionInfoPanel.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    PersionInfoPanel.prototype.onEnable = function () {
        this.setCenter();
        this.setUserInfoUI();
        this.closeBtn.addEventListener("touchTap", this.hide, this);
    };
    PersionInfoPanel.prototype.setUserInfoUI = function () {
        var userVo = App.DataCenter.UserInfo.getMyUserVo();
        if (!userVo) {
            return;
        }
        this.userIdLab.text = userVo.id.toString();
        this.nickNameLab.text = userVo.nickname;
        this.roomCardLab.text = userVo.roomCard.toString();
        this.headImg.source = userVo.headImgUrl;
    };
    /**从场景中移除*/
    PersionInfoPanel.prototype.onRemove = function () {
    };
    return PersionInfoPanel;
}(BasePanel));
__reflect(PersionInfoPanel.prototype, "PersionInfoPanel");
//# sourceMappingURL=PersionInfoPanel.js.map