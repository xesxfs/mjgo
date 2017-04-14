var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 分享信息
 * @author chenkai
 * @date 2016/11/17
 */
var ShareInfo = (function () {
    function ShareInfo() {
    }
    Object.defineProperty(ShareInfo.prototype, "deskCode", {
        /**分享的桌子号*/
        get: function () {
            var deskCode = egret.getOption("deskCode");
            if (deskCode && deskCode != "") {
                return deskCode;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareInfo.prototype, "replayCode", {
        /**分享的回放码*/
        get: function () {
            return egret.getOption("replayCode");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareInfo.prototype, "pidID", {
        /**分享的用户ID*/
        get: function () {
            return egret.getOption("pid");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareInfo.prototype, "userID", {
        /**被分享的用户id*/
        get: function () {
            return egret.getOption("uid");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareInfo.prototype, "deskId", {
        /**分享的桌号ID*/
        get: function () {
            return egret.getOption("deskId");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareInfo.prototype, "serverType", {
        /**服务器类型*/
        get: function () {
            var _serverType = egret.getOption("serverType");
            if (_serverType) {
                return parseInt(_serverType);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareInfo.prototype, "gameID", {
        /**游戏ID*/
        get: function () {
            var _gameID = egret.getOption("gameID");
            if (_gameID) {
                return parseInt(_gameID);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareInfo.prototype, "roomId", {
        get: function () {
            return egret.getOption("roomId");
        },
        enumerable: true,
        configurable: true
    });
    return ShareInfo;
}());
__reflect(ShareInfo.prototype, "ShareInfo");
//# sourceMappingURL=ShareInfo.js.map