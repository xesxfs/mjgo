var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 颜色信息
 * @author chenkai
 * @date 2016/12/1
 */
var ColorInfo = (function () {
    function ColorInfo() {
        /**输赢分数 红色*/
        this.LoseRed = 0xEC0312;
        /**输赢分数 绿色*/
        this.WinGreen = 0x4AE740;
    }
    return ColorInfo;
}());
__reflect(ColorInfo.prototype, "ColorInfo");
//# sourceMappingURL=ColorInfo.js.map