var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 资源管理类
 * @author chenkai
 * @date 2016/9/8
 *
 * 功能：
 * 1. 设置单一加载版本 initResVersion
 * 2. 序列加载配置     loadConfig
 * 3. 加载资源组       loadGroup
 * 4. 带动画加载资源组  loadUIAsset
 */
var ResUtils = (function (_super) {
    __extends(ResUtils, _super);
    function ResUtils() {
        var _this = _super.call(this) || this;
        _this.initResVersion();
        _this.groupList = new Array();
        _this.configList = new Array();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this.onResourceLoadComplete, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, _this.onResourceLoadProgress, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, _this.onResourceLoadError, _this);
        return _this;
    }
    /**
     * Res加载使用版本号的形式
     * version在index.php页面设置
     */
    ResUtils.prototype.initResVersion = function () {
        if (window && window["version"]) {
            RES.web.Html5VersionController.prototype.getVirtualUrl = function (url) {
                var version = window["version"];
                if (url.indexOf("?") == -1) {
                    url += "?ver=" + version;
                }
                else {
                    url += "&ver=" + version;
                }
                return url;
            };
        }
    };
    /**
     * 添加一个配置文件
     * @jsonPath resource.json路径
     * @filePath 访问资源路径
     */
    ResUtils.prototype.addConfig = function (jsonPath, filePath) {
        this.configList.push([jsonPath, filePath]);
    };
    /**
     * 开始加载配置文件
     * @onConfigComplete 加载完成执行函数
     * @onConfigCompleteTarget 加载完成执行函数所属对象
     */
    ResUtils.prototype.loadConfig = function (onConfigComplete, onConfigCompleteTarget) {
        this.onConfigComplete = onConfigComplete;
        this.onConfigCompleteTarget = onConfigCompleteTarget;
        this.loadNextConfig();
    };
    /**
     * 加载下一项配置
     */
    ResUtils.prototype.loadNextConfig = function () {
        //加载完成
        if (this.configList.length == 0) {
            this.onConfigComplete.call(this.onConfigCompleteTarget);
            this.onConfigComplete = null;
            this.onConfigCompleteTarget = null;
            return;
        }
        var arr = this.configList.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    };
    /**
     * 加载配置完成
     */
    ResUtils.prototype.onConfigCompleteHandle = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    };
    /**
     * 静默加载 (无回调)
     * @group 资源组名称(支持字符串和数组)
     * @priority 加载优先级 数字越大，优先级越高
     */
    ResUtils.prototype.loadGroupQuiet = function (group, priority) {
        if (priority === void 0) { priority = 1; }
        var groupName = this.combGroupName(group);
        RES.loadGroup(groupName, priority);
    };
    /**
     * 加载资源组 (有回调)
     * @group 资源组名称(支持字符串和数组)
     * @thisObject 资源加载监听函数所属对象
     * @onComplete 资源加载完成执行函数
     * @onProgress 资源加载进度监听函数
     */
    ResUtils.prototype.loadGroup = function (group, thisObject, onComplete, onProgress, priority) {
        if (thisObject === void 0) { thisObject = null; }
        if (onComplete === void 0) { onComplete = null; }
        if (onProgress === void 0) { onProgress = null; }
        if (priority === void 0) { priority = 1; }
        var groupName = this.combGroupName(group);
        this.groupList[groupName] = [onComplete, onProgress, thisObject];
        this.loadGroupQuiet(group, priority);
    };
    /**
     * 资源组加载完成
     */
    ResUtils.prototype.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        console.log("加载资源组完成:", groupName);
        if (this.groupList[groupName]) {
            var loadComplete = this.groupList[groupName][0];
            var loadCompleteTarget = this.groupList[groupName][2];
            if (loadComplete != null) {
                loadComplete.call(loadCompleteTarget);
            }
            this.deleteCallBack(groupName);
        }
    };
    /**
     * 资源组加载进度
     */
    ResUtils.prototype.onResourceLoadProgress = function (event) {
        var groupName = event.groupName;
        if (this.groupList[groupName]) {
            var loadProgress = this.groupList[groupName][1];
            var loadProgressTarget = this.groupList[groupName][2];
            if (loadProgress != null) {
                loadProgress.call(loadProgressTarget, event);
            }
        }
    };
    /**
     * 资源组加载失败
     * @param event
     */
    ResUtils.prototype.onResourceLoadError = function (event) {
        console.error(event.groupName + "资源组加载失败");
        this.onResourceLoadComplete(event);
    };
    /**
     * 停止加载资源组的回调函数
     * @groupName 资源组名
     */
    ResUtils.prototype.deleteCallBack = function (groupName) {
        console.log("取消加载资源组回调:" + groupName);
        //删除列表中回调
        this.groupList[groupName] = null;
        delete this.groupList[groupName];
    };
    /**删除所有资源组回调*/
    ResUtils.prototype.deleteAllCallBack = function () {
        for (var key in this.groupList) {
            this.deleteCallBack(key);
        }
    };
    /**
     * 拼接资源组名
     * @group 资源数组
     * @return 资源组名
     */
    ResUtils.prototype.combGroupName = function (group) {
        var groupName = "";
        if (typeof (group) == "string") {
            groupName = group;
        }
        else {
            var len = group.length;
            for (var i = 0; i < len; i++) {
                groupName += group[i];
            }
            RES.createGroup(groupName, group);
        }
        return groupName;
    };
    return ResUtils;
}(SingleClass));
__reflect(ResUtils.prototype, "ResUtils");
//# sourceMappingURL=ResUtils.js.map