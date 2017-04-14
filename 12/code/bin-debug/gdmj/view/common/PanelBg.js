var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 面板背景
 * @author chenkai
 * @date 2016/11/18
 */
var PanelBg = (function (_super) {
    __extends(PanelBg, _super);
    function PanelBg() {
        return _super.call(this) || this;
    }
    return PanelBg;
}(eui.Component));
__reflect(PanelBg.prototype, "PanelBg");
//# sourceMappingURL=PanelBg.js.map