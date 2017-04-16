var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author chenwei
 * 2016/07/18
 */
var Marquee = (function (_super) {
    __extends(Marquee, _super);
    function Marquee() {
        var _this = _super.call(this) || this;
        _this.skinName = "MarqueeSkin";
        return _this;
    }
    Marquee.prototype.childrenCreated = function () {
        this.init();
    };
    Marquee.prototype.init = function () {
        this.rollingArray = [];
        this.IsRolling = false;
        this.rockLab.mask = this.rockMark;
        this.rockLab.x = this.width;
        this.v = 0.07;
    };
    Marquee.prototype.onEnable = function () {
    };
    Marquee.prototype.startRolling = function () {
        var self = this;
        //固定跑马灯
        var msgMarq = App.DataCenter.marqueeInfo.messageMarquee;
        var rock = function () {
            //跑马灯播放完毕
            if (self.rollingArray.length <= 0) {
                //插入固定跑马灯
                if (msgMarq.length) {
                    msgMarq.forEach(function (msgg) {
                        self.rollingArray.push(msgg);
                    });
                }
                else {
                    self.IsRolling = false;
                    return;
                }
            }
            self.IsRolling = true;
            var msg = self.rollingArray.shift();
            self.rockLab.text = msg;
            var tw = egret.Tween.get(self.rockLab);
            tw.to({ x: self.rockMark.x - self.rockLab.width }, (self.rockMark.width + self.rockLab.width) / self.v);
            tw.to({ x: self.rockMark.x + self.rockMark.width });
            tw.call(rock, self);
        };
        rock();
    };
    /**
     *
     * @param msg 跑马灯消息
     * @param count 播放次数
     */
    Marquee.prototype.push = function (msg, count) {
        if (count === void 0) { count = 1; }
        for (var i = 0; i < count; i++) {
            this.rollingArray.unshift(msg);
        }
        if (!this.IsRolling)
            this.startRolling();
    };
    Marquee.prototype.stopRolling = function () {
        egret.Tween.removeTweens(this.rockLab);
        this.IsRolling = false;
    };
    Marquee.prototype.onRemove = function () {
        this.stopRolling();
    };
    return Marquee;
}(BaseUI));
__reflect(Marquee.prototype, "Marquee");
//# sourceMappingURL=Marquee.js.map