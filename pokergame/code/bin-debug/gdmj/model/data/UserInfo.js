var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用户数据
 * @author chenkai
 * @date 2016/6/28
 */
var UserInfo = (function () {
    function UserInfo() {
        /**[userID][userVO] 全部用户列表(包括自己)  对应to_game,由于to_game大量数据冗余，只选择保存需要的*/
        this.userList = {};
    }
    /**
     * 添加用户
     * @param userVo 用户数据Vo
     */
    UserInfo.prototype.addUser = function (userVo) {
        if (this.userList[userVo.id]) {
            console.log("用户重复添加:", userVo.id);
        }
        else {
            this.userList[userVo.id] = userVo;
        }
    };
    /**获取自己用户信息*/
    UserInfo.prototype.getMyUserVo = function () {
        return this.getUser(this.httpUserInfo.id);
    };
    UserInfo.prototype.setMyUserVo = function () {
        this.httpUserInfo = new UserVO();
        var playStr = egret.getOption("play");
        if (playStr) {
            var playObj = JSON.parse(playStr);
            this.httpUserInfo.banker = playObj["banker"];
            this.httpUserInfo.headImgUrl = playObj["headImgUrl"];
            this.httpUserInfo.id = playObj["id"];
            this.httpUserInfo.nickname = playObj["nickname"];
            this.httpUserInfo.playerId = playObj["playerId"];
            this.httpUserInfo.roomCard = playObj["roomCard"];
            this.httpUserInfo.roomId = playObj["roomId"];
            this.httpUserInfo.status = playObj["status"];
        }
    };
    /**
     * 获取用户
     * @param userId 用户userId
     * @returns 返回用户信息
     */
    UserInfo.prototype.getUser = function (userID) {
        return this.userList[userID];
    };
    /**
     * 判断用户是否存在
     * @userID 用户ID
     * @return 是否存在
     */
    UserInfo.prototype.isExist = function (userID) {
        if (this.getUser(userID)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 根据座位号获取用户信息
     * @param seatID 座位号
     * @returns 返回用户信息
     */
    UserInfo.prototype.getUserBySeatID = function (seatID) {
        for (var key in this.userList) {
            if (this.userList[key].seatID == seatID) {
                return this.userList[key];
            }
        }
    };
    /**
     * 删除用户信息
     * @param userID 用户ID
     */
    UserInfo.prototype.deleteUser = function (userID) {
        delete this.userList[userID];
    };
    /**删除所有用户信息，除了自己*/
    UserInfo.prototype.deleteAllUserExcptMe = function () {
        for (var key in this.userList) {
            if (parseInt(key) != this.httpUserInfo.id) {
                delete this.userList[key];
            }
        }
    };
    /**删除所有用户信息*/
    UserInfo.prototype.deleteAllUser = function () {
        for (var key in this.userList) {
            delete this.userList[key];
        }
    };
    /**获取用户数量*/
    UserInfo.prototype.getUserNum = function () {
        return ArrayTool.getObjectLength(this.userList);
    };
    return UserInfo;
}());
__reflect(UserInfo.prototype, "UserInfo");
//# sourceMappingURL=UserInfo.js.map