var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 当前出牌指示
 * @author chenkai
 * @date 2016/7/21
 */
var OutFlagUI = (function (_super) {
    __extends(OutFlagUI, _super);
    function OutFlagUI() {
        var _this = _super.call(this) || this;
        _this.moveDist = -10; //移动距离
        _this.bInitRes = false;
        return _this;
    }
    OutFlagUI.prototype.initRes = function () {
        if (this.bInitRes == false) {
            this.bInitRes = true;
            this.bitmapData = RES.getRes("game_outflag_png");
        }
    };
    /**
     * 指示器悬浮在指定的牌上方
     * @param card 指定的牌
     * @param doc 指示器父容器
     */
    OutFlagUI.prototype.show = function (card, pos) {
        this.initRes();
        if (pos == UserPosition.R) {
            //			this.x = card.x + (card.width - this.width)/2 - card.width;
            this.x = card.x + (card.width - this.width) / 2;
            this.y = card.y - card.height;
        }
        else if (pos == UserPosition.L) {
            this.x = card.x + (card.width - this.width) / 2;
            this.y = card.y - card.height;
        }
        else {
            this.x = card.x + (card.width - this.width) / 2;
            this.y = card.y - card.width;
        }
        this.start();
    };
    //开始上下移动的动画
    OutFlagUI.prototype.start = function () {
        var yPos = this.y;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this, { loop: true }).to({ y: yPos + this.moveDist }, 500).to({ y: yPos }, 500);
    };
    //停止移动动画
    OutFlagUI.prototype.stop = function () {
        egret.Tween.removeTweens(this);
    };
    OutFlagUI.prototype.hide = function () {
        this.stop();
        this.parent && this.parent.removeChild(this);
    };
    return OutFlagUI;
}(egret.Bitmap));
__reflect(OutFlagUI.prototype, "OutFlagUI");
//# sourceMappingURL=OutFlagUI.js.map