var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 回放数据
 * @author chenkai
 * @date 2016/11/17
 */
var ReplayInfo = (function () {
    function ReplayInfo() {
        /**是否是回放游戏*/
        this.bReplay = false;
    }
    return ReplayInfo;
}());
__reflect(ReplayInfo.prototype, "ReplayInfo");
//# sourceMappingURL=ReplayInfo.js.map