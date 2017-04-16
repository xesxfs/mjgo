var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author xiongjian
 *
 * 2017-1-12
 */
var Avater = (function (_super) {
    __extends(Avater, _super);
    function Avater() {
        var _this = _super.call(this) || this;
        _this.skinName = "avaterSkin";
        return _this;
    }
    /**
     * 加载头像
     */
    Avater.prototype.loadImage = function (url) {
        if (url && url != "" && url != 1) {
            this.avater.source = url;
        }
    };
    /**组件创建完毕*/
    Avater.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    Avater.prototype.onEnable = function () {
    };
    /**从场景中移除*/
    Avater.prototype.onRemove = function () {
    };
    return Avater;
}(BaseUI));
__reflect(Avater.prototype, "Avater");
//# sourceMappingURL=Avater.js.map