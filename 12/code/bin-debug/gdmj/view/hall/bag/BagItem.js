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
 *
 */
var BagItem = (function (_super) {
    __extends(BagItem, _super);
    function BagItem() {
        return _super.call(this) || this;
    }
    BagItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.useGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUse, this);
    };
    BagItem.prototype.dataChanged = function () {
        //        if(this.data["state"] =="using"){
        //            this.selected=true;
        //            this.invalidateState();
        //        }
    };
    BagItem.prototype.getCurrentState = function () {
        if (this.data.type == "props")
            return;
        if (this.selected) {
            return "using";
        }
        else {
            return "unuse";
        }
    };
    BagItem.prototype.onUse = function (e) {
        switch (this.data.type) {
            case "props":
                this.useProps();
                break;
            case "act":
                this.useAct();
                break;
            case "face":
                this.useFace();
                break;
            case "scene":
                this.useScene();
                break;
        }
    };
    BagItem.prototype.useProps = function () {
        switch (this.data.propname) {
            case "独立型房卡":
                //                App.mainModule.hallScene.onCreateRoomTouch(1);
                break;
            case "共付型房卡":
                //                App.mainModule.hallScene.onCreateRoomTouch(0);
                break;
        }
    };
    BagItem.prototype.useAct = function () {
        switch (this.data.propname) {
            case "专属动作":
                App.DataCenter.BagInfo.act = ItemType.youself;
                break;
            case "默认动作":
                App.DataCenter.BagInfo.act = ItemType.default;
                break;
            case "VIP动作":
                App.DataCenter.BagInfo.act = ItemType.vip;
                break;
        }
    };
    BagItem.prototype.useFace = function () {
        switch (this.data.propname) {
            case "专属表情":
                App.DataCenter.BagInfo.face = ItemType.youself;
                break;
            case "默认表情":
                App.DataCenter.BagInfo.face = ItemType.default;
                break;
            case "VIP表情":
                App.DataCenter.BagInfo.face = ItemType.vip;
                break;
        }
    };
    BagItem.prototype.useScene = function () {
        switch (this.data.propname) {
            case "专属场景":
                App.DataCenter.BagInfo.scene = ItemType.youself;
                break;
            case "默认场景":
                App.DataCenter.BagInfo.scene = ItemType.default;
                break;
            case "VIP场景":
                App.DataCenter.BagInfo.scene = ItemType.vip;
                break;
        }
    };
    return BagItem;
}(eui.ItemRenderer));
__reflect(BagItem.prototype, "BagItem");
//# sourceMappingURL=BagItem.js.map