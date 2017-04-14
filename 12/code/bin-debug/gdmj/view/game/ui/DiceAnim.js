var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 骰子动画
 * @author chenkai
 * @date 2016/6/30
 */
var DiceAnim = (function (_super) {
    __extends(DiceAnim, _super);
    function DiceAnim() {
        var _this = _super.call(this) || this;
        _this.sz0List = []; //骰子具体点数图片
        _this.sz1List = [];
        _this.bInitRes = false; //是否初始化过
        _this.skinName = "DiceAnimSkin";
        return _this;
    }
    DiceAnim.prototype.childrenCreated = function () {
        for (var i = 0; i < 6; i++) {
            this.sz0List.push(this.getChildAt(i));
            this.sz1List.push(this.getChildAt(i + 6));
        }
    };
    DiceAnim.prototype.initRes = function () {
        if (this.bInitRes == false) {
            this.bInitRes = true;
            this.anim0 = new BitmapMovie();
            this.anim0.setImgBuffer("game_sz_anim", 0, 5);
            this.anim1 = new BitmapMovie();
            this.anim1.setImgBuffer("game_sz_anim", 0, 5);
        }
    };
    /**
     * 播放骰子动画
     * @point0 骰子点数
     * @point1
     */
    DiceAnim.prototype.playAnim = function (point0, point1) {
        this.initRes();
        this.point0 = point0;
        this.point1 = point1;
        this.removeChildren();
        this.addChild(this.anim0);
        this.anim0.gotoAndPlay(0, 2);
        this.anim1.x = this.sz1List[0].x;
        this.addChild(this.anim1);
        this.anim1.gotoAndPlay(0, 2);
        this.anim1.addEventListener(egret.Event.COMPLETE, this.onAnimComplete, this);
    };
    //骰子动画播放完成
    DiceAnim.prototype.onAnimComplete = function () {
        this.anim0.stop();
        this.removeChild(this.anim0);
        this.addChild(this.sz0List[this.point0 - 1]);
        this.anim1.stop();
        this.removeChild(this.anim1);
        this.addChild(this.sz1List[this.point1 - 1]);
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    return DiceAnim;
}(eui.Component));
__reflect(DiceAnim.prototype, "DiceAnim");
//# sourceMappingURL=DiceAnim.js.map