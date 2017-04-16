var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅底部菜单
 * @author chenwei
 *
 */
var BottomMenu = (function (_super) {
    __extends(BottomMenu, _super);
    function BottomMenu() {
        return _super.call(this) || this;
    }
    BottomMenu.prototype.childrenCreated = function () {
        this.btnsGroup.mask = this.bottomMask;
        this.rightArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRight, this);
        this.leftArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeft, this);
        this.ox = this.btnsGroup.x;
    };
    BottomMenu.prototype.onRight = function () {
        var _this = this;
        egret.Tween.get(this.btnsGroup).to({ x: this.ox + this.btnsGroup.width }, 500).call(function () {
            _this.rightArrow.visible = false;
            _this.leftArrow.visible = true;
        });
    };
    BottomMenu.prototype.onLeft = function () {
        var _this = this;
        egret.Tween.get(this.btnsGroup).to({ x: this.ox }, 500).call(function () {
            _this.rightArrow.visible = true;
            _this.leftArrow.visible = false;
        });
    };
    return BottomMenu;
}(BaseUI));
__reflect(BottomMenu.prototype, "BottomMenu");
//# sourceMappingURL=BottomMenu.js.map