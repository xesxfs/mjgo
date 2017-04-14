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
 *
 */
var Align = (function (_super) {
    __extends(Align, _super);
    function Align() {
        var _this = _super.call(this) || this;
        _this.skinName = "AlignSkin";
        _this.textFiles = [];
        _this.images = [];
        return _this;
    }
    /**
     * 初始化数据
     * @prizeList  奖品列表
     * @ringCount
     * @perRingTime
     */
    Align.prototype.initData = function (prizeList, ringCount, perRingTime) {
        this.ringCount = ringCount;
        this.perRingTime = perRingTime;
        this.textFiles.forEach(function (txt) { txt.parent && txt.parent.removeChild(txt); });
        this.images.forEach(function (img) { img.parent && img.parent.removeChild(img); });
        this.textFiles.length = 0;
        this.images.length = 0;
        this.setAreaData(prizeList);
    };
    /**
     * 设置中奖奖品
     * @prizeIndex 奖品索引
     */
    Align.prototype.setAreaIndex = function (prizeIndex) {
        this.areaIndex = prizeIndex;
    };
    //设置区域
    Align.prototype.setAreaData = function (prizeList) {
        //区域数量
        var len = this.areasCount = prizeList.length;
        //        console.log(dataSrc);
        //每一个区域的角度大小
        var perAngle = 360 / len;
        //文字位置半径长度  背景的一半的
        var r = this.bgImg.width / 2 * 0.45;
        //图片位置半径长度  背景的一半的60%
        var r0 = this.bgImg.width / 2 * 0.58;
        //圆的原点 为指针图片的坐标，此时指针图片的锚点为该大小的一半
        var x0 = this.runPointImg.x;
        var y0 = this.runPointImg.y;
        //        let offAngle=perAngle*(len-1);
        //        console.log(offAngle)
        //指针从正上方开始,所以从270度开始,算出偏移下标
        var offIndex = 0;
        for (var i = offIndex; i < len + offIndex; i++) {
            var txt = new egret.TextField();
            var img = new eui.Image();
            var name = prizeList[i - offIndex].reward[0].name;
            var imgSrc = prizeList[i - offIndex].reward[0].imgSrc;
            var count = prizeList[i - offIndex].reward[0].count;
            //字体大小
            txt.size = 16;
            //取得文本
            txt.text = name + "x" + count;
            img.source = imgSrc;
            //文本颜色
            txt.textColor = 0xffffff;
            txt.bold = true;
            //文本旋转角度  开始角度+区域角度大小的/2
            txt.rotation = (i * perAngle) + perAngle / 2;
            img.rotation = (i * perAngle) + perAngle / 2;
            //文本长度偏移角度 ,不同文长度的文本位置不一样，尽量居中           
            var lenAngle = perAngle / (txt.text.length + 1);
            //实际偏移角度
            var offAngle = (i * perAngle + 270) + perAngle / 2;
            var offAngleImg = (i * perAngle + 270) + perAngle / 2;
            //文字x,y坐标
            var x1 = x0 + r * Math.cos(offAngle * 3.14 / 180);
            var y1 = y0 + r * Math.sin(offAngle * 3.14 / 180);
            //图片x,y坐标
            var x2 = x0 + r0 * Math.cos(offAngleImg * 3.14 / 180);
            var y2 = y0 + r0 * Math.sin(offAngleImg * 3.14 / 180);
            //        console.log("img :",img.source,",x:",x2,",y:",y2);
            txt.x = x1;
            txt.y = y1;
            img.x = x2;
            img.y = y2;
            this.textFiles.push(txt);
            this.images.push(img);
            this.prizeGroup.addChild(img);
            this.prizeGroup.addChild(txt);
            txt.anchorOffsetX = txt.width / 2;
            txt.anchorOffsetY = txt.height / 2;
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
        }
    };
    /**
     *
     * @param area 区域
     */
    Align.prototype.startRun = function () {
        var _this = this;
        if (!this.areaIndex) {
            Tips.info("真.没有中奖~~~");
            return;
        }
        var PP = 360;
        //加速度圈数
        var pAdd = ~~(this.ringCount * 0.7);
        //每个区域的角度
        var perAngle = ~~(PP / this.areasCount);
        //偏移角度=最后一圈的角度+随机角度 30%~70%
        //let offAngle=~~(this.areaIndex*perAngle+perAngle*(0.3+Math.random()*(1-0.3)));
        var offAngle = ~~(this.areaIndex * perAngle - perAngle / 2);
        //加速度所需的时间
        var startDuring = pAdd * this.perRingTime;
        //减速度所需的时间  需要加上偏移角度需要的时间
        var stopDuring = ~~((this.ringCount - pAdd) * this.perRingTime + (offAngle / 360) * this.perRingTime);
        //加速旋转的角度数   
        var startRota = pAdd * PP;
        //减速旋转的角度数
        var stopRota = (this.ringCount - pAdd) * PP + offAngle;
        //抽奖区间，不可点击
        this.touchChildren = false;
        this.touchEnabled = false;
        //指针旋转 先加速后减速
        egret.Tween.get(this.runPointImg, { onChange: this.onChange, onChangeObj: this })
            .to({ rotation: startRota }, startDuring, egret.Ease.quadIn)
            .to({ rotation: startRota + stopRota }, stopDuring, egret.Ease.quadOut)
            .call(function () {
            egret.Tween.removeTweens(_this.runPointImg);
        });
    };
    //重置
    Align.prototype.resetData = function () {
        this.runPointImg.rotation = 0;
        this.touchChildren = true;
        this.touchEnabled = true;
    };
    Align.prototype.onChange = function () {
        var perAngle = 360 / this.areasCount;
        var rota = Math.floor(this.runPointImg.rotation / perAngle);
    };
    return Align;
}(eui.Component));
__reflect(Align.prototype, "Align");
//# sourceMappingURL=Align.js.map