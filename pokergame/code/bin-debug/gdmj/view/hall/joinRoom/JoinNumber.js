/**
 * 输入加入房间
 * @author eyanlong
 * @date 2017/2/23
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JoinNumber = (function (_super) {
    __extends(JoinNumber, _super);
    function JoinNumber() {
        var _this = _super.call(this) || this;
        _this.skinName = "JoinNumberSkin";
        return _this;
    }
    JoinNumber.prototype.onEnable = function () {
        this.joinNum_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.number_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.initList();
    };
    JoinNumber.prototype.onRemove = function () {
        this.joinNum_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.number_bt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    /**初始化列表和UI */
    JoinNumber.prototype.initList = function () {
        this.fntLabelList = [];
        this.btnList = [];
        this.numList = [];
        for (var i = 0; i < 6; i++) {
            this.fntLabelList.push(this.numbers.getChildAt(i));
        }
        for (var i = 0; i < 12; i++) {
            this.btnList.push(this.number_bt.getChildAt(i));
        }
        this.showNum();
    };
    /**软键盘点击响应 */
    JoinNumber.prototype.onTouch = function (e) {
        for (var i = 0; i < 12; i++) {
            if (e.target == this.btnList[i]) {
                this.refreshNum(i);
            }
        }
    };
    /**更新数组 */
    JoinNumber.prototype.refreshNum = function (id) {
        //删除
        if (id == 11) {
            if (this.numList.length > 0) {
                this.numList.pop();
            }
            else {
                return;
            }
        }
        else if (id == 10) {
            if (this.numList.length > 0) {
                this.numList = [];
            }
            else {
                return;
            }
        }
        else {
            if (this.numList.length >= 6) {
                return;
            }
            else {
                this.numList.push(id);
            }
        }
        this.showNum();
    };
    /**根据数组显示数字 */
    JoinNumber.prototype.showNum = function () {
        for (var i = 0; i < 6; i++) {
            if (this.numList[i] || this.numList[i] == 0) {
                this.fntLabelList[i].text = this.numList[i].toString();
            }
            else {
                this.fntLabelList[i].text = "";
            }
        }
        if (this.numList.length >= 6) {
            this.getHttp();
        }
    };
    /**输入完密码请求接口 */
    JoinNumber.prototype.getHttp = function () {
        var password = "";
        for (var i = 0; i < this.numList.length; i++) {
            password += this.numList[i];
        }
        console.log("输入的密码：" + password);
    };
    /**返回 */
    JoinNumber.prototype.back = function () {
        this.hide();
    };
    /**
     * 隐藏清理
     * 清理界面的数据和显示
     * onEnable中初始化和onRemove中清理选其一
    */
    JoinNumber.prototype.clean = function () {
    };
    return JoinNumber;
}(BasePanel));
__reflect(JoinNumber.prototype, "JoinNumber");
//# sourceMappingURL=JoinNumber.js.map