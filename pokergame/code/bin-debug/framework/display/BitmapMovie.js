var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 自定义位图影片动画
 * 从配置文件中获取序列图，使用Timer计时播放
 * @author chenkai
 * @date 2016/8/4
 */
var BitmapMovie = (function (_super) {
    __extends(BitmapMovie, _super);
    function BitmapMovie() {
        var _this = _super.call(this) || this;
        _this.bmdList = []; //bitmapdata图片列表
        _this.curFrame = 0; //当前帧 第一帧从0开始
        _this.totalFrame = 0; //总帧数
        _this.delay = 33; //播放间隔 ms
        _this.loop = 1; //循环次数
        return _this;
    }
    /**
     * 资源配置表从获取序列帧动画图片，并保存
     * @imgName 图片名称
     * @startIndex 起始索引
     * @endIndex 结束索引
     */
    BitmapMovie.prototype.setImgBuffer = function (imgName, startIndex, endIndex) {
        var len = endIndex - startIndex;
        for (var i = 0; i <= len; i++) {
            this.bmdList.push(RES.getRes(imgName + i + "_png"));
        }
        this.curFrame = 0;
        this.bitmapData = this.bmdList[0];
        this.totalFrame = this.bmdList.length;
    };
    /**
     * 播放动画
     * @loop 循环次数(默认1)
     */
    BitmapMovie.prototype.play = function (loop) {
        if (loop === void 0) { loop = 1; }
        this.loop = loop;
        this.startTimer();
    };
    /**
     * 跳转并播放
     * @frame 跳转到的帧
     * @loop 循环次数(默认1)
     */
    BitmapMovie.prototype.gotoAndPlay = function (frame, loop) {
        if (loop === void 0) { loop = 1; }
        this.curFrame = frame;
        this.bitmapData = this.bmdList[this.curFrame];
        this.play(loop);
    };
    /**
     * 停止动画
     */
    BitmapMovie.prototype.stop = function () {
        this.stopTimer();
    };
    /**开始计时*/
    BitmapMovie.prototype.startTimer = function () {
        this.animTimer || (this.animTimer = new egret.Timer(this.delay));
        this.animTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.animTimer.delay = this.delay;
        this.animTimer.reset();
        this.animTimer.start();
    };
    /**
     * 处理函数
     */
    BitmapMovie.prototype.onTimer = function () {
        if (this.curFrame == this.totalFrame) {
            this.loop--;
            if (this.loop > 0) {
                this.gotoAndPlay(0, this.loop);
            }
            else {
                this.stopTimer();
                this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                return;
            }
        }
        this.bitmapData = this.bmdList[this.curFrame];
        this.curFrame++;
    };
    /**
     * 停止计时
     */
    BitmapMovie.prototype.stopTimer = function () {
        if (this.animTimer) {
            this.animTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.animTimer.stop();
        }
    };
    return BitmapMovie;
}(egret.Bitmap));
__reflect(BitmapMovie.prototype, "BitmapMovie");
//# sourceMappingURL=BitmapMovie.js.map