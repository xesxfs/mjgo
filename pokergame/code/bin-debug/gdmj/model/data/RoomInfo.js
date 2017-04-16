var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author chenwei
 *
 */
var RoomInfo = (function () {
    function RoomInfo() {
        this.deskList = [];
        this.init();
    }
    RoomInfo.prototype.clean = function () {
        this.init();
    };
    RoomInfo.prototype.getCurDesk = function () {
        return this.curDesk;
    };
    RoomInfo.prototype.init = function () {
        this.deskList = [];
        this.curDesk = null;
    };
    RoomInfo.prototype.readDeskList = function (data) {
        var _this = this;
        this.clean();
        data.forEach(function (deskInfo) {
            var desk = new DeskInfo();
            desk.readData(deskInfo);
            _this.deskList.push(desk);
        });
        this.sortDesk(this.deskList);
    };
    RoomInfo.prototype.sortDesk = function (deskList) {
        var len = deskList.length;
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (deskList[i].deskID > deskList[j].deskID) {
                    var temp = deskList[i];
                    deskList[i] = deskList[j];
                    deskList[j] = temp;
                }
            }
        }
    };
    RoomInfo.prototype.setCurDesk = function (deskNo) {
        this.curDesk = this.getDeskByNo(deskNo);
    };
    RoomInfo.prototype.setCurDeskById = function (deskId) {
        this.curDesk = this.getDeskById(deskId);
    };
    RoomInfo.prototype.addDesk = function (data) {
        var desk = new DeskInfo();
        desk.readData(data);
        this.deskList.push(desk);
    };
    RoomInfo.prototype.exCurDesk = function (data) {
        var isChange = false;
        var config;
        if (data.basePoint) {
            this.curDesk.basePoint = data.basePoint;
            isChange = true;
        }
        if (data.deskName) {
            this.curDesk.deskName = data.deskName;
        }
        config = data.gameConfig;
        if (!config)
            return;
        for (var key in config) {
            this.curDesk.gameConfig[key] = config[key];
            isChange = true;
        }
        return isChange;
    };
    RoomInfo.prototype.getDeskById = function (deskId) {
        var findDesk;
        for (var i = 0; i < this.deskList.length; i++) {
            var desk = this.deskList[i];
            if (deskId == desk.deskID) {
                findDesk = desk;
                return findDesk;
            }
        }
        console.log("no find deskId:", deskId);
    };
    RoomInfo.prototype.getDeskByNo = function (deskNo) {
        var findDesk;
        for (var i = 0; i < this.deskList.length; i++) {
            var desk = this.deskList[i];
            if (deskNo == desk.deskNo) {
                findDesk = desk;
                return findDesk;
            }
        }
        console.log("no find deskNo:", deskNo);
    };
    return RoomInfo;
}());
__reflect(RoomInfo.prototype, "RoomInfo");
//# sourceMappingURL=RoomInfo.js.map