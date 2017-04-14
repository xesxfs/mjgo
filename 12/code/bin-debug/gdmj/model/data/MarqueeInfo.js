var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author chenwei
 *  2017/01/16
 * 跑马灯信息
 */
var MarqueeInfo = (function () {
    function MarqueeInfo() {
        this.init();
    }
    MarqueeInfo.prototype.init = function () {
        this.gameMarquee = [
            "%1【%2】的%3牌技果然精湛，竟然以%4结束了这场牌局！",
            "%1【%2】的%3出其不意的以%4力压群雄！",
            "%1【%2】惊现%4牌型,%3在牌技的道路上又更近了一步！"
        ];
        this.messageMarquee = [];
    };
    MarqueeInfo.prototype.setMsgMarquee = function (data) {
        for (var i = 0; i < data.length; i++) {
            this.messageMarquee.push(data[i]["content"]);
        }
    };
    //获取游戏跑马灯
    MarqueeInfo.prototype.getGameMqrquee = function (roomName, roomNo, userName, mjType) {
        var marquee = this.gameMarquee[NumberTool.getRandInt(0, this.gameMarquee.length - 1)];
        marquee = marquee.replace("%1", decodeURIComponent(roomName));
        marquee = marquee.replace("%2", roomNo.toString());
        marquee = marquee.replace("%3", userName);
        marquee = marquee.replace("%4", mjType);
        return marquee;
    };
    return MarqueeInfo;
}());
__reflect(MarqueeInfo.prototype, "MarqueeInfo");
//# sourceMappingURL=MarqueeInfo.js.map