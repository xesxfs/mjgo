var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 微信相关信息
 * @author chenkai
 * @date 2016/11/17
 */
var WxInfo = (function () {
    function WxInfo() {
        /**是否已经使用的code*/
        this.yetDeskCode = true;
    }
    return WxInfo;
}());
__reflect(WxInfo.prototype, "WxInfo");
//# sourceMappingURL=WxInfo.js.map