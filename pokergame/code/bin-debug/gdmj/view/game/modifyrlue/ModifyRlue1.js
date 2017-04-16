var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 修改规则
 * @author eyanlong
 * @date 2017/2/25
 */
var ModifyRlue1 = (function (_super) {
    __extends(ModifyRlue1, _super);
    function ModifyRlue1() {
        var _this = _super.call(this) || this;
        _this.skinName = "ModifyRlueSkin";
        return _this;
    }
    return ModifyRlue1;
}(BasePanel));
__reflect(ModifyRlue1.prototype, "ModifyRlue1");
//# sourceMappingURL=ModifyRlue1.js.map