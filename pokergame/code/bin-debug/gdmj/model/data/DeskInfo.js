var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 桌子信息
 * @author chenkai
 * @date 2016/11/17
 */
var DeskInfo = (function () {
    function DeskInfo() {
        /**桌子ID*/
        this.deskID = 0;
        /**桌子拥有者ID*/
        this.ownerID = 0;
        //房间号还是桌子号呢???????????
        /**房间号*/
        this.deskCode = 0;
        /**游戏底分*/
        this.basePoint = 0;
        /**桌子等级*/
        this.deskLevel = 0;
        this.chip = 0;
        this.deskNo = 0;
        this.isGameRunning = false;
        this.isPlaying = false;
        this.ownerName = "";
        this.peoplecount = 0;
        this.playCount = 0;
    }
    DeskInfo.prototype.readData = function (deskInfo) {
        this.deskID = deskInfo.deskID;
        this.ownerID = deskInfo.ownerID;
        this.deskCode = deskInfo.deskCode;
        this.gameID = deskInfo.gameid;
        this.deskLevel = deskInfo.deskLevel;
        this.chip = deskInfo;
        this.curPlayCount = deskInfo;
        this.curSitPeopleCoiunt = deskInfo;
        this.deposit = deskInfo.deposit;
        this.deskDesc = deskInfo.deskDesc;
        this.deskName = deskInfo.deskName;
        this.deskNo = deskInfo.deskNo;
        this.isGameRunning = deskInfo.isGameRunning;
        this.isPlaying = deskInfo.isPlaying;
        this.ownerName = deskInfo.ownerName;
        this.peoplecount = deskInfo.peoplecount;
        this.playCount = deskInfo.playCount;
        this.gameConfig = deskInfo.gameConfig;
        //服务端有时是大写basePoint有时是小写basepoint
        if (deskInfo.basepoint) {
            this.basePoint = deskInfo.basepoint;
        }
        else if (deskInfo.basePoint) {
            this.basePoint = deskInfo.basePoint;
        }
    };
    return DeskInfo;
}());
__reflect(DeskInfo.prototype, "DeskInfo");
//# sourceMappingURL=DeskInfo.js.map