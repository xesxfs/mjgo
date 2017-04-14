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
 * @author
 *
 */
var SceneItem = (function (_super) {
    __extends(SceneItem, _super);
    function SceneItem() {
        return _super.call(this) || this;
    }
    return SceneItem;
}(eui.ItemRenderer));
__reflect(SceneItem.prototype, "SceneItem");
//# sourceMappingURL=SceneItem.js.map