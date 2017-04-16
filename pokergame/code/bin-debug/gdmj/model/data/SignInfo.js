var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 签到数据
 * @author chenkai
 * @date 2016/11/14
 */
var SignInfo = (function () {
    function SignInfo() {
        /**签到上限次数*/
        this.signMax = 7;
        /**签到次数*/
        this.signInCount = 0;
    }
    return SignInfo;
}());
__reflect(SignInfo.prototype, "SignInfo");
//# sourceMappingURL=SignInfo.js.map