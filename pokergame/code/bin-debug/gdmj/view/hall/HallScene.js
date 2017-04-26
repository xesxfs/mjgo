var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅界面
 * @author chenwei
 * @date 2016/6/28
 */
var HallScene = (function (_super) {
    __extends(HallScene, _super);
    function HallScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "HallSceneSkin";
        return _this;
    }
    /**添加到场景中**/
    HallScene.prototype.onEnable = function () {
        this.setUserInfoUI();
        this.addEventListener("touchTap", this.onTouchTap, this);
    };
    /**组件创建完毕**/
    HallScene.prototype.childrenCreated = function () {
    };
    /**从场景中移除**/
    HallScene.prototype.onRemove = function () {
    };
    HallScene.prototype.setUserInfoUI = function () {
        var userVo = App.DataCenter.UserInfo.getMyUserVo();
        if (!userVo) {
            return;
        }
        this.userIdLab.text = userVo.id.toString();
        this.nickNameLab.text = userVo.nickname;
        this.roomCardLab.text = userVo.roomCard.toString();
        this.headImg.source = userVo.headImgUrl;
    };
    HallScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.msgBtn:
                App.PanelManager.open(PanelConst.MsgPanel);
                break;
            case this.setBtn:
                App.PanelManager.open(PanelConst.SetPanel);
                break;
            case this.ruleBtn:
                App.PanelManager.open(PanelConst.RulePanel);
                break;
            case this.scoreBtn:
                App.PanelManager.open(PanelConst.ScorePanel);
                break;
            case this.croomBtn:
                App.PanelManager.open(PanelConst.CroomPanle);
                break;
            case this.eroomBtn:
                App.PanelManager.open(PanelConst.EroomPanel);
                break;
            case this.payBtn:
                App.PanelManager.open(PanelConst.PayPanel);
                break;
            case this.headImg:
                App.PanelManager.open(PanelConst.PersionInfoPanel);
                break;
        }
    };
    return HallScene;
}(BaseScene));
__reflect(HallScene.prototype, "HallScene");
//# sourceMappingURL=HallScene.js.map