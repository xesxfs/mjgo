var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 数据中心
 * @author chenkai
 * @date 2016/6/27
 */
var DataCenter = (function (_super) {
    __extends(DataCenter, _super);
    function DataCenter() {
        var _this = _super.call(this) || this;
        _this.UserInfo = new UserInfo();
        _this.ServerInfo = new ServerInfo();
        _this.GameInfo = new GameInfo();
        _this.BagInfo = new BagInfo();
        _this.signInfo = new SignInfo();
        _this.welfareInfo = new WelfareInfo();
        _this.debugInfo = new DebugInfo();
        _this.replayInfo = new ReplayInfo();
        _this.shareInfo = new ShareInfo();
        _this.wxInfo = new WxInfo();
        _this.deskInfo = new DeskInfo();
        _this.colorInfo = new ColorInfo();
        _this.goldRoomInfo = new GoldRoomInfo();
        _this.roomInfo = new RoomInfo();
        _this.marqueeInfo = new MarqueeInfo();
        return _this;
    }
    return DataCenter;
}(SingleClass));
__reflect(DataCenter.prototype, "DataCenter");
//# sourceMappingURL=DataCenter.js.map