var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 舞台类
 * @author chenkai
 * @date 2016/10/11
 */
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    function StageUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StageUtils.prototype, "stage", {
        /**
         * 获取舞台
         */
        get: function () {
            return egret.MainContext.instance.stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils.prototype, "stageWidth", {
        /**
         * 获取舞台宽度
         */
        get: function () {
            return this.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils.prototype, "stageHeight", {
        /**
         * 获取舞台高度
         */
        get: function () {
            return this.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils.prototype, "halfStageWidth", {
        /**
         * 获取舞台一半宽度
         */
        get: function () {
            return this.stage.stageWidth / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils.prototype, "halfStageHeight", {
        /**
         * 获取舞台一半高度
         */
        get: function () {
            return this.stage.stageHeight / 2;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 启动旋转适配。解决手机浏览器旋转时的一些问题。
     * 在fixed_width模式下，手机横置并且浏览器可以旋转，游戏画面底部将会被裁剪而看不见。
     */
    StageUtils.prototype.runBrowserAdapt = function () {
        this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.changeScaleMode, this);
    };
    /**
     * 浏览器适配。浏览器竖着时fiexd_width；横着时show_all。防止横着时底端被裁剪。
     * 只有当浏览器横置时，宽高比才会超过16:9。
     */
    StageUtils.prototype.changeScaleMode = function () {
        if (egret.Capabilities.boundingClientWidth / egret.Capabilities.boundingClientHeight > 16 / 9) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        else {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
        console.log("当前适配模式:", this.stage.scaleMode);
    };
    return StageUtils;
}(SingleClass));
__reflect(StageUtils.prototype, "StageUtils");
//# sourceMappingURL=StageUtils.js.map