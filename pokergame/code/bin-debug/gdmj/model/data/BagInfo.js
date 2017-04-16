var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 背包信息
 * @author chenwei
 *
 */
var BagInfo = (function () {
    function BagInfo() {
        //场景资源组名
        this.sceneGroupList = [];
        //场景图片名
        this.scenePngList = [];
        this.init();
    }
    BagInfo.prototype.init = function () {
        this.act = ItemType.default;
        this.face = ItemType.default;
        this.scene = ItemType.default;
        this.initScene();
    };
    //初始化场景
    BagInfo.prototype.initScene = function () {
        this.sceneGroupList = ["defaultScene", "youselfScene", "vipScene"]; //新增场景，则直接增加到该列表中
        this.scenePngList = ["game_bg_jpg", "game_bg_jpg", "game_bg_jpg"];
        var sceneNum = this.sceneGroupList.length;
        for (var i = 0; i < sceneNum; i++) {
            RES.createGroup(this.sceneGroupList[i], [this.scenePngList[i]]);
        }
    };
    /**
     * 根据选择的场景ItemType,获取场景对应的groupName，用于进入游戏前加载对应的资源
     * @return 选择的场景对应资源组名
     */
    BagInfo.prototype.getSceneGroupName = function () {
        return this.sceneGroupList[this.scene];
    };
    /**
     * 根据选择的场景ItemType，获取场景对应的图片名称，用于进入游戏后，设置游戏场景image.bitmapData = RES.getRes(pngName)
     * @return 选择的场景对应图片名
     */
    BagInfo.prototype.getScenePngName = function () {
        return this.scenePngList[this.scene];
    };
    return BagInfo;
}());
__reflect(BagInfo.prototype, "BagInfo");
/**背包中物品所属类型，默认、专属、VIP*/
var ItemType;
(function (ItemType) {
    ItemType[ItemType["default"] = 0] = "default";
    ItemType[ItemType["youself"] = 1] = "youself";
    ItemType[ItemType["vip"] = 2] = "vip";
})(ItemType || (ItemType = {}));
//# sourceMappingURL=BagInfo.js.map