var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏中设置菜单
 * @author chenkai
 * @date 2016/8/31
 */
var OptionMenu = (function (_super) {
    __extends(OptionMenu, _super);
    function OptionMenu() {
        var _this = _super.call(this) || this;
        _this.skinName = "OptionMenuSkin";
        return _this;
    }
    OptionMenu.prototype.childrenCreated = function () {
        this.optionGroup.mask = this.bgMask;
        this.groupInitX = this.optionGroup.x;
        this.groupInitY = this.optionGroup.y;
        this.rightArrow.visible = true;
        this.leftArrow.visible = false;
    };
    OptionMenu.prototype.onEnable = function () {
        this.rightArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightArrowTouch, this);
        this.leftArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftArrowTouch, this);
    };
    OptionMenu.prototype.onRemove = function () {
        this.rightArrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightArrowTouch, this);
        this.leftArrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftArrowTouch, this);
    };
    //回缩菜单
    OptionMenu.prototype.onRightArrowTouch = function () {
        var _this = this;
        egret.Tween.get(this.optionGroup).to({ x: this.groupInitX + this.optionGroup.width - 70 }, 500).call(function () {
            _this.rightArrow.visible = false;
            _this.leftArrow.visible = true;
        });
    };
    //展开菜单
    OptionMenu.prototype.onLeftArrowTouch = function () {
        var _this = this;
        egret.Tween.get(this.optionGroup).to({ x: this.groupInitX }, 500).call(function () {
            _this.rightArrow.visible = true;
            _this.leftArrow.visible = false;
        });
    };
    return OptionMenu;
}(BaseUI));
__reflect(OptionMenu.prototype, "OptionMenu");
//# sourceMappingURL=OptionMenu.js.map