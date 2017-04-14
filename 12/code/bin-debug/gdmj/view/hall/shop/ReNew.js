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
 * 2017/01/13
 */
var ReNew = (function (_super) {
    __extends(ReNew, _super);
    function ReNew() {
        var _this = _super.call(this) || this;
        _this.skinName = "ReNewSkin";
        return _this;
    }
    /**组件创建完毕*/
    ReNew.prototype.childrenCreated = function () {
    };
    /**添加到场景中*/
    ReNew.prototype.onEnable = function () {
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openVip, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.setCenter();
    };
    ReNew.prototype.setVip = function (list) {
        var radioNum = this.vipRadioGroup.numChildren;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var btn = this.vipRadioGroup.getChildAt(i);
            var vipOb = list[i];
            btn.label = vipOb.name;
            btn.value = vipOb.id;
        }
    };
    /**
 * 更新vip购买限制 弃用
 * @vipData vip显示数据
 */
    ReNew.prototype.updateBuyVip = function (vipData) {
        //禁用所有按钮
        var radioNum = this.vipRadioGroup.numChildren;
        for (var i = 0; i < radioNum; i++) {
            var btn = this.vipRadioGroup.getChildAt(i);
            btn.enabled = false;
        }
        //启用允许显示的按钮
        var len = vipData.length;
        for (var i = 0; i < len; i++) {
            var childIndex = vipData[i] - 1; //目标radiobButton索引
            if (childIndex < radioNum) {
                var btn = this.vipRadioGroup.getChildAt(childIndex);
                btn.enabled = true;
            }
        }
        //默认单选按钮
        if (vipData.length > 0) {
            var btn = this.vipRadioGroup.getChildAt(vipData[0] - 1);
            btn.selected = true;
        }
    };
    //开通会员
    ReNew.prototype.openVip = function (event) {
        var vip = App.getController(HallController.NAME);
        var radioNum = this.vipRadioGroup.numChildren;
        for (var i = 0; i < radioNum; i++) {
            var btn = this.vipRadioGroup.getChildAt(i);
            if (btn.selected) {
                var v = btn.value;
                vip.sendShopVipReq(v);
                break;
            }
        }
    };
    /**从场景中移除*/
    ReNew.prototype.onRemove = function () {
    };
    return ReNew;
}(BasePanel));
__reflect(ReNew.prototype, "ReNew");
//# sourceMappingURL=ReNew.js.map