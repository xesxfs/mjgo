var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 救济金面板
 * @author chenwei
 *
 */
var JjjPanel = (function (_super) {
    __extends(JjjPanel, _super);
    function JjjPanel() {
        var _this = _super.call(this) || this;
        /**箱子*/
        _this.boxList = [];
        /**钱文本*/
        _this.moneyList = [];
        _this.skinName = "JjjSkin";
        return _this;
    }
    JjjPanel.prototype.childrenCreated = function () {
        for (var i = 0; i < 3; i++) {
            this.boxList.push(this.boxGroup.getChildAt(i));
            this.moneyList.push(this.boxGroup.getChildAt(i + 3));
        }
    };
    JjjPanel.prototype.onEnable = function () {
        this.resetView();
        this.panelBg.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.boxGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBoxTouch, this);
    };
    JjjPanel.prototype.onRemove = function () {
        this.panelBg.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.boxGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBoxTouch, this);
    };
    JjjPanel.prototype.onClose = function (e) {
        App.PanelManager.close(PanelConst.JjjPanel);
    };
    /**点击箱子，领取救济金*/
    JjjPanel.prototype.onBoxTouch = function (e) {
        if (e.target instanceof eui.ToggleSwitch) {
            if (App.DataCenter.welfareInfo.isCanApply()) {
                this.boxGroup.touchChildren = false;
                this.targetBox = e.target;
                //请求领取救济金
                var hallControll = App.getController(HallController.NAME);
            }
        }
    };
    /**根据领取救济金结果，设置箱子的显示
     * @alms 奖池
     * @num 抽中的金币数
    */
    JjjPanel.prototype.setBoxResult = function (alms, num) {
        //随机打乱奖池
        ArrayTool.randSort(alms);
        //将抽中金币从奖池中剔除
        var len = alms.length;
        for (var i = 0; i < len; i++) {
            if (alms[i] == num) {
                alms.splice(i, 1);
                break;
            }
        }
        //显示金币
        len = this.boxList.length;
        for (var i = 0; i < len; i++) {
            if (this.boxList[i] == this.targetBox) {
                this.moneyList[i].text = "+" + num;
            }
            else {
                this.moneyList[i].text = "+" + alms.pop();
                this.moneyList[i].alpha = 0.7;
            }
        }
        //领取次数
        this.setCountLabel();
    };
    /**设置救济金剩余领取次数*/
    JjjPanel.prototype.setCountLabel = function () {
        this.countLabel.text = App.DataCenter.welfareInfo.benefitMax - App.DataCenter.welfareInfo.benefit_cnt + "";
    };
    /**重置界面*/
    JjjPanel.prototype.resetView = function () {
        var len = this.boxList.length;
        for (var i = 0; i < len; i++) {
            var box = this.boxList[i];
            box.selected = false;
            var label = this.moneyList[i];
            label.text = "";
            label.alpha = 1;
        }
        this.boxGroup.touchChildren = true;
        this.setCountLabel();
    };
    return JjjPanel;
}(BasePanel));
__reflect(JjjPanel.prototype, "JjjPanel");
//# sourceMappingURL=JjjPanel.js.map