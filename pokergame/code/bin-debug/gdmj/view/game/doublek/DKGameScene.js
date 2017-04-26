var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏界面
 * @author chenkai
 * @date 2016/6/28
 */
var DKGameScene = (function (_super) {
    __extends(DKGameScene, _super);
    function DKGameScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameSceneSkin";
        return _this;
    }
    DKGameScene.prototype.childrenCreated = function () {
    };
    DKGameScene.prototype.onEnable = function () {
        console.log("进入游戏_________________________________________");
    };
    return DKGameScene;
}(BaseScene));
__reflect(DKGameScene.prototype, "DKGameScene");
//# sourceMappingURL=DKGameScene.js.map