var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**按钮类型 */
var BottomName;
(function (BottomName) {
    BottomName[BottomName["friends"] = 0] = "friends";
    BottomName[BottomName["mall"] = 1] = "mall";
    BottomName[BottomName["record"] = 2] = "record";
    BottomName[BottomName["knapsack"] = 3] = "knapsack";
    BottomName[BottomName["share"] = 4] = "share";
    BottomName[BottomName["set"] = 5] = "set";
    BottomName[BottomName["email"] = 6] = "email";
    BottomName[BottomName["me"] = 7] = "me";
    BottomName[BottomName["take"] = 8] = "take"; //玩法
})(BottomName || (BottomName = {}));
/**
 * 底部菜单
 * @author eyanlong
 * @date 2017/2/21
 */
var BottomMenus = (function (_super) {
    __extends(BottomMenus, _super);
    function BottomMenus() {
        var _this = _super.call(this) || this;
        _this.abc = 1;
        _this.touchEnabled = true;
        return _this;
    }
    /**
     * 将底部菜单显示到页面
     * @param page 页面
     */
    BottomMenus.prototype.showMenu = function (page) {
        page.addChild(this);
        this.x = 0;
        this.y = App.StageUtils.stageHeight - 120;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    /**底部按钮的响应 */
    BottomMenus.prototype.onTouch = function (e) {
        var buttomName;
        switch (e.target) {
            case this.hall_friends:
                buttomName = BottomName.friends;
                break;
            case this.hall_mall:
                buttomName = BottomName.mall;
                break;
            case this.hall_record:
                buttomName = BottomName.record;
                break;
            case this.hall_knapsack:
                buttomName = BottomName.knapsack;
                break;
            case this.hall_share:
                buttomName = BottomName.share;
                break;
            case this.hall_more:
                this.showPop();
                return;
            case this.hall_set:
                buttomName = BottomName.set;
                break;
            case this.hall_email:
                buttomName = BottomName.email;
                break;
            case this.hall_me:
                buttomName = BottomName.me;
                break;
            case this.hall_take:
                buttomName = BottomName.take;
                break;
        }
        this.ok(buttomName) && (this.ok.call(buttomName));
    };
    /**二级弹窗的现实关闭 */
    BottomMenus.prototype.showPop = function () {
        this.two_pop.visible = !this.two_pop.visible;
    };
    return BottomMenus;
}(eui.Component));
BottomMenus.NAME = "BottomMenus";
__reflect(BottomMenus.prototype, "BottomMenus");
//# sourceMappingURL=BottomMenus.js.map