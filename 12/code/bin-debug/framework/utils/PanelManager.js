var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 弹框管理类
 * @author chenkai
 * @date 2016/11/9
 *
 */
var PanelManager = (function (_super) {
    __extends(PanelManager, _super);
    function PanelManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**弹框*/
        _this.panelList = {};
        /**弹框类定义*/
        _this.panelClassList = {};
        /**资源组*/
        _this.assetList = {};
        return _this;
    }
    /**
     * 注册弹框
     * @panelID 弹框ID
     * @panelClass 弹框类定义
     * @group 资源组名(支持字符串和数组)
     */
    PanelManager.prototype.register = function (panelID, panelClass, group) {
        if (group === void 0) { group = null; }
        this.panelClassList[panelID] = panelClass;
        this.assetList[panelID] = group;
    };
    /**
     * 打开弹框
     * @panelID 弹框ID
     * @callBack 打开后回调(需要加载资源时，在加载完成后回调)
     * @thisObject 执行环境
     * @return 弹框
     * @click 是否监听点击黑色背景关闭弹框事件
     * @lock 是否弹出透明遮罩
     */
    PanelManager.prototype.open = function (panelID, callBack, thisObject, click, lock) {
        var _this = this;
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (click === void 0) { click = true; }
        if (lock === void 0) { lock = true; }
        var panel = this.panelList[panelID];
        if (panelID == PanelConst.ChatPanel) {
            App.PopUpManager.changeTransparency(0.0);
        }
        else if (panelID == PanelConst.RankNewRuleDetail) {
            App.PopUpManager.changeTransparency(0.0);
        }
        else if (panelID == PanelConst.GameBack) {
            App.PopUpManager.changeTransparency(0.0);
        }
        else if (panelID == PanelConst.GameMall) {
            App.PopUpManager.changeTransparency(0.0);
        }
        else if (panelID == PanelConst.GameSet) {
            App.PopUpManager.changeTransparency(0.0);
        }
        else {
            App.PopUpManager.changeTransparency(0.7);
        }
        if (panel == null) {
            var clz = this.panelClassList[panelID];
            if (clz != null) {
                panel = new clz();
                this.panelList[panelID] = panel;
            }
            else {
                return null;
            }
        }
        //加载弹框所需资源后，再打开弹框
        var group = this.assetList[panelID];
        if (group != null) {
            App.LoadingLock.lock();
            App.ResUtils.loadGroup(group, this, function () {
                App.LoadingLock.unlock();
                if (callBack != null && thisObject != null) {
                    panel.once(egret.Event.ADDED_TO_STAGE, function () {
                        callBack.call(thisObject, true);
                    }, _this);
                }
                App.PopUpManager.addPopUp(panel, lock, click);
            }, null, 10);
        }
        else {
            if (callBack != null && thisObject != null) {
                panel.once(egret.Event.ADDED_TO_STAGE, function () {
                    callBack.call(thisObject);
                }, this);
            }
            App.PopUpManager.addPopUp(panel, lock, click);
        }
        return panel;
    };
    /**
     * 关闭弹框
     * @panelID 弹框ID
     * @return 弹框
     */
    PanelManager.prototype.close = function (panelID) {
        var panel = this.panelList[panelID];
        if (panel != null) {
            App.PopUpManager.removePopUp(panel);
        }
        return panel;
    };
    /**
     * 获取弹框
     * @panelID 弹框ID
     */
    PanelManager.prototype.getPanel = function (panelID) {
        return this.panelList[panelID];
    };
    /**
     * 移除所有弹框
     */
    PanelManager.prototype.closeAllPanel = function () {
        App.ResUtils.deleteAllCallBack(); //防止当有弹框加载时，调用了该函数，加载完成后仍然会显示弹框
        App.PopUpManager.removeAllPopUp();
        App.LoadingLock.unlock();
    };
    return PanelManager;
}(SingleClass));
__reflect(PanelManager.prototype, "PanelManager");
//# sourceMappingURL=PanelManager.js.map