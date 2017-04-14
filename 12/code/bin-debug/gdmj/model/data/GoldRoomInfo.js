var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 金币场房间信息
 * @author chenkai
 * @date 2016/12/6
 */
var GoldRoomInfo = (function () {
    function GoldRoomInfo() {
        /**金币场信息列表*/
        this.infoList = [];
    }
    /**
     * 读取http数据
     * @data
     */
    GoldRoomInfo.prototype.readData = function (data) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var obj = ProtocolHttp.GoldRoomJson;
            obj = data[i];
            obj.versusroomcfg = JSON.parse(data[i].versusroomcfg);
            this.infoList.push(obj);
        }
    };
    /**
     * 获取金币场信息
     * @gameID 游戏类型 1鸡平胡 2推倒胡
     * @level 房间等级
     * @return 返回金币场信息
     */
    GoldRoomInfo.prototype.getData = function (gameID, level) {
        var len = this.infoList.length;
        for (var i = 0; i < len; i++) {
            var obj = this.infoList[i];
            if ((obj.GameID == (gameID + "")) && obj.level == (level + "")) {
                return obj;
            }
        }
        return null;
    };
    return GoldRoomInfo;
}());
__reflect(GoldRoomInfo.prototype, "GoldRoomInfo");
//# sourceMappingURL=GoldRoomInfo.js.map