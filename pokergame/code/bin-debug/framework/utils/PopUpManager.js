var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 弹框管理
 * @author chenkai
 * @date 2016/6/28
 */
var PopUpManager = (function (_super) {
    __extends(PopUpManager, _super);
    function PopUpManager() {
        var _this = _super.call(this) || this;
        _this.lockCount = 0; //黑色背景锁定次数
        _this.clickClose = []; //点击黑色背景关闭弹框
        _this.createLockBg();
        return _this;
    }
    /**
     * 显示弹框
     * @panel 弹框
     * @lock 是否锁定屏幕(增加黑色半透明背景)
     * @click 是否监听点击黑色背景关闭弹框事件
     */
    PopUpManager.prototype.addPopUp = function (panel, lock, click) {
        if (lock === void 0) { lock = true; }
        if (click === void 0) { click = true; }
        var popLayer = App.LayerManager.popLayer;
        if (lock) {
            this.lockCount++;
            popLayer.addChild(this.lockBg);
        }
        this.clickClose[this.lockCount] = click;
        popLayer.addChild(panel);
        this.curPanel = panel;
    };
    /**移除弹框*/
    PopUpManager.prototype.removePopUp = function (panel) {
        panel.parent && panel.parent.removeChild(panel);
        var popLayer = App.LayerManager.popLayer;
        this.lockCount--;
        if (this.lockCount > 0) {
            this.clickClose[this.lockCount] = false;
            popLayer.setChildIndex(this.lockBg, popLayer.numChildren - 2);
        }
        else {
            this.lockCount = 0;
            this.clickClose[this.lockCount] = false;
            this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
        }
    };
    /**移除所有弹框*/
    PopUpManager.prototype.removeAllPopUp = function () {
        var popLayer = App.LayerManager.popLayer;
        popLayer.removeChildren();
        this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
        this.lockCount = 0;
        this.clickClose.length = 0;
    };
    /**改变透明度*/
    PopUpManager.prototype.changeTransparency = function (transparency) {
        this.lockBg.alpha = transparency;
    };
    //创建黑色半透明背景
    PopUpManager.prototype.createLockBg = function () {
        this.lockBg = new egret.Sprite();
        this.lockBg.graphics.beginFill(0x000000, 0.5);
        var stage = App.StageUtils.stage;
        this.lockBg.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
        this.lockBg.graphics.endFill();
        this.lockBg.touchEnabled = true;
        this.lockBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    //点击黑色背景
    PopUpManager.prototype.onTouchTap = function () {
        if (this.clickClose[this.lockCount]) {
            this.removePopUp(this.curPanel);
        }
    };
    return PopUpManager;
}(SingleClass));
__reflect(PopUpManager.prototype, "PopUpManager");
//# sourceMappingURL=PopUpManager.js.map