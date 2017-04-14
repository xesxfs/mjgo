var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 福利数据，可以领取的福利
 * @author chenkai
 * @date 2016/11/16
 */
var WelfareInfo = (function () {
    function WelfareInfo() {
        /**已领取救济金次数*/
        this.benefit_cnt = 0;
        /**领取次数限制。领取次数小于最大次数限制时，才可以领取救济金*/
        this.benefitMax = 3;
        /**是否可以领取救济金 0不可领取 1可领取*/
        this.benefitflag = 0;
        /**低于多少钱可以领取救济金*/
        this.broke_money = 0;
    }
    /**是否可以申请领取救济金*/
    WelfareInfo.prototype.isCanApply = function () {
        if (this.benefit_cnt >= this.benefitMax || App.DataCenter.UserInfo.getMyUserVo().gold >= this.broke_money) {
            return false;
        }
        return true;
    };
    return WelfareInfo;
}());
__reflect(WelfareInfo.prototype, "WelfareInfo");
//# sourceMappingURL=WelfareInfo.js.map