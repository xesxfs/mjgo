var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 图层管理类
 * @author chenkai
 * @date 2016/6/27
 *
 */
var LayerManager = (function (_super) {
    __extends(LayerManager, _super);
    function LayerManager() {
        var _this = _super.call(this) || this;
        _this.rootLayer = new eui.UILayer();
        _this.rootLayer.percentWidth = 100;
        _this.rootLayer.percentHeight = 100;
        _this.rootLayer.touchEnabled = false;
        App.StageUtils.stage.addChild(_this.rootLayer);
        _this.sceneLayer = new eui.UILayer();
        _this.sceneLayer.touchEnabled = false;
        _this.rootLayer.addChild(_this.sceneLayer);
        _this.popLayer = new eui.UILayer();
        _this.popLayer.touchEnabled = false;
        _this.rootLayer.addChild(_this.popLayer);
        _this.lockLayer = new eui.UILayer();
        _this.lockLayer.touchEnabled = false;
        _this.rootLayer.addChild(_this.lockLayer);
        _this.msgLayer = new eui.UILayer();
        _this.msgLayer.touchEnabled = false;
        _this.rootLayer.addChild(_this.msgLayer);
        _this.tipLayer = new eui.UILayer();
        _this.tipLayer.touchEnabled = false;
        _this.rootLayer.addChild(_this.tipLayer);
        return _this;
    }
    return LayerManager;
}(SingleClass));
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map