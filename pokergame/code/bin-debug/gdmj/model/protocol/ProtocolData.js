var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Socket通讯协议
 * @author chenwei
 * @date 2017/4/24
 */
var ProtocolData = (function () {
    function ProtocolData() {
    }
    return ProtocolData;
}());
ProtocolData.commond = {
    cmd: "",
    game: ""
};
ProtocolData.gameId = {
    //普通双扣
    normal: 0,
    //百变双扣
    variety: 1,
    //13道
    thirteenth: 2,
    //未选择
    hall: -1
};
//登录
ProtocolData.sendLogin = {
    cmd: '1',
    game: '-1',
    msg: [
        {
            openId: 'owUlNw9vcKUUlqxxSYg54i1ATAsc',
            nickname: '等风来'
        }
    ]
};
//登录返回
ProtocolData.revLogin = {
    cmd: 2,
    game: -1,
    msg: []
};
ProtocolData.cmd6 = {
    cmd: '6', msg: [{ roomId: "" }]
};
ProtocolData.cmd3 = { cmd: '3', game: '', msg: [{ level: ' ' }] };
__reflect(ProtocolData.prototype, "ProtocolData");
//# sourceMappingURL=ProtocolData.js.map