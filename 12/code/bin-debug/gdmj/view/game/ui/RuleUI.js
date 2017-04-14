var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 规则UI
 * @author chenkai
 * @date 2016/9/1
 *
 */
var RuleUI = (function (_super) {
    __extends(RuleUI, _super);
    function RuleUI() {
        var _this = _super.call(this) || this;
        /**游戏规则*/
        _this.ruleList = [];
        /**menuGroup初始位置*/
        _this.initMenuGroupY = 0;
        _this.skinName = "RuleUISkin";
        _this.upArrow.touchEnabled = false;
        _this.downArrow.touchEnabled = false;
        _this.systemTimeUI.touchEnabled = false;
        _this.ruleLabel.touchEnabled = false;
        return _this;
    }
    RuleUI.prototype.childrenCreated = function () {
        this.menuGroup.mask = this.menuMask;
        for (var i = 2; i < 10; i++) {
            this.ruleList.push(this.menuGroup.getChildAt(i));
            this.ruleList[i - 2].text = "";
        }
        this.downArrow.visible = false;
        this.upArrow.visible = true;
        this.initMenuGroupY = this.menuGroup.y;
    };
    RuleUI.prototype.onEnable = function () {
        this.systemTimeUI.start();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    RuleUI.prototype.onRemove = function () {
        this.systemTimeUI.stop();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    RuleUI.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.menuBg:
            case this.downArrow:
            case this.upArrow:
                this.foldMenu();
                break;
            case this.modifyBtn:
                this.onModify();
                break;
        }
    };
    /**折叠菜单*/
    RuleUI.prototype.foldMenu = function () {
        var _this = this;
        if (this.upArrow.visible) {
            egret.Tween.get(this.menuGroup).to({ y: this.initMenuGroupY - this.menuMask.height }, 500).call(function () {
                _this.upArrow.visible = false;
                _this.downArrow.visible = true;
            });
        }
        if (this.downArrow.visible) {
            egret.Tween.get(this.menuGroup).to({ y: this.initMenuGroupY }, 500).call(function () {
                _this.upArrow.visible = true;
                _this.downArrow.visible = false;
            });
        }
    };
    /**修改规则*/
    RuleUI.prototype.onModify = function () {
    };
    return RuleUI;
}(BaseUI));
__reflect(RuleUI.prototype, "RuleUI");
//# sourceMappingURL=RuleUI.js.map