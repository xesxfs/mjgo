var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author chenwei
 *
 */
var OtherGame = (function (_super) {
    __extends(OtherGame, _super);
    function OtherGame() {
        var _this = _super.call(this) || this;
        _this.delayTime = 2000;
        _this.skinName = "OtherGameSkin";
        return _this;
    }
    /**组件创建完毕*/
    OtherGame.prototype.childrenCreated = function () {
        this.resetHead();
    };
    /**添加到场景中*/
    OtherGame.prototype.onEnable = function () {
        this.overShutupGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOverShutup, this);
    };
    OtherGame.prototype.select = function () {
        var gameSocket = App.gameSocket;
        gameSocket.register(ProtocolHead.Rev104_10_1, this.revGetDesk, this);
        //gameSocket.register(ProtocolHead.Rev102_20_1,this.revKickPlayer,this);
        gameSocket.register(ProtocolHead.Rev111_2_1, this.revGameShutup, this);
        gameSocket.register(ProtocolHead.Rev102_5_1, this.revKickPlayer, this);
        this.sendGetDesk();
        this.keyInter = egret.setInterval(this.sendGetDesk, this, this.delayTime);
        this.hideOverShutupUI();
    };
    OtherGame.prototype.unSelect = function () {
        if (this.keyInter)
            egret.clearInterval(this.keyInter);
    };
    OtherGame.prototype.onOverShutup = function (e) {
        var gameSocket = App.gameSocket;
        //需要的时候注册
        gameSocket.register(ProtocolHead.Rev102_20_1, this.revKickPlayer, this);
        gameSocket.register(ProtocolHead.Rev111_2_1, this.revGameShutup, this);
        var idx = this.overShutupGroup.getChildIndex(e.target);
        var idx1 = idx % 4;
        var head = this.headGroup.getChildAt(idx1);
        if (!head.userID) {
            return;
        }
        //踢人
        if (idx < 4) {
            console.log("发送踢人:___________", head.userID);
            ProtocolData.Send102_20_0.kickUserID = head.userID;
            this.sendGameKick();
        }
        else {
            //禁言
            console.log("发送禁言:___________", head.userID);
            ProtocolData.Send111_2_0.banPostUserID = head.userID;
            ProtocolData.Send111_2_0.type = 1; //1 禁言3分钟  2本局禁言
            this.sendGameShutup();
        }
    };
    //    private 
    /**
 * 获取桌子信息
 * @param deskNo
 */
    OtherGame.prototype.sendGetDesk = function () {
        if (this.deskNo != null) {
            var info = ProtocolData.Send104_10_0;
            info.deskNo = this.deskNo;
            App.gameSocket.send(ProtocolHead.Send104_10_0, info);
        }
    };
    /**
     * 获取桌子信息
     */
    OtherGame.prototype.revGetDesk = function (data) {
        var info = ProtocolData.Rev104_10_1;
        info = data;
        var desk = new DeskInfo();
        desk.readData(info.deskinfo);
        this.gstateLab.visible = desk.isPlaying;
        this.desk = desk;
        var len = info.userList.length;
        if (!len) {
            this.resetHead();
        }
        for (var i = 0; i < len; i++) {
            // "{"money": 203661, "sex": 1, "win_point": 0, "room_card_coop": 1386, "reconnect": false, "losecount": 0, "dwBank": 0, "build_desk_count": 0, "deskno": 4, "deskstation": 0, "wincount": 0, "room_card": 763, "vip_rank": 0, "nickname": "test9", "szName": "test9", "midcount": 0, "userstate": 2, "isrobot": 0, "userid": 9235, "exp": 0, "signature": "signature11111111111", "avater": "http://192.168.0.252:9090/zjhscript/headimg/head.png"}"
            var user = info.userList[i];
            if (typeof user == "string") {
                user = JSON.parse(user);
            }
            var headUi = this.headGroup.getChildAt(i);
            headUi.nameLabel.text = user.nickname;
            headUi.scoreLabel.text = user.win_point;
            headUi.loadImg(user.avater);
            headUi.userID = user.userid;
            var shutupImg = this.overShutupGroup.getChildAt(this.headGroup.numChildren + i);
            shutupImg.visible = true;
            var gameKickImg = this.overShutupGroup.getChildAt(i);
            gameKickImg.visible = true;
        }
    };
    //发送踢人
    OtherGame.prototype.sendGameKick = function () {
        var data = ProtocolData.Send102_20_0;
        App.gameSocket.send(ProtocolHead.Send102_20_0, data);
    };
    /**接收踢人广播*/
    OtherGame.prototype.revKickPlayer = function (data) {
        var json = ProtocolData.Rev102_5_1;
        json = data;
        var kickByUserid = json.userid; //踢人的玩家
        //ps 当前玩家只能是在主桌子，不可能在其它桌子
        //var myUserID: number = App.DataCenter.UserInfo.getMyUserVo().userID;    
        for (var i = 0; i < this.headGroup.numChildren; i++) {
            var head = this.headGroup.getChildAt(i);
            if (head.userID == json.userid) {
                head.clear();
                break;
            }
        }
    };
    //发送禁言
    OtherGame.prototype.sendGameShutup = function () {
        var data = ProtocolData.Send111_2_0;
        App.gameSocket.send(ProtocolHead.Send111_2_0, data);
    };
    //接受禁言
    OtherGame.prototype.revGameShutup = function (data) {
        var json = ProtocolData.Rev111_2_1;
        json = data;
        for (var i = 0; i < this.headGroup.numChildren; i++) {
            var head = this.headGroup.getChildAt(i);
            if (head.userID == json.banPostUserID) {
                var shutupImg = this.overShutupGroup.getChildAt(this.headGroup.numChildren + i);
                shutupImg.source = "game_shutup_ing_png";
                break;
            }
        }
    };
    /**隐藏踢人、禁言按钮*/
    OtherGame.prototype.hideOverShutupUI = function () {
        for (var i = 0; i < this.overShutupGroup.numChildren; i++) {
            this.overShutupGroup.getChildAt(i).visible = false;
        }
    };
    /**判断房主*/
    OtherGame.prototype.isDeskOwner = function () {
        return (App.DataCenter.UserInfo.getMyUserVo().userID == App.DataCenter.deskInfo.ownerID);
    };
    /**重置头像*/
    OtherGame.prototype.resetHead = function () {
        var len = this.headGroup.numChildren;
        for (var i = 0; i < len; i++) {
            var head = this.headGroup.getChildAt(i);
            head.clear();
        }
    };
    /**从场景中移除*/
    OtherGame.prototype.onRemove = function () {
    };
    return OtherGame;
}(BasePanel));
__reflect(OtherGame.prototype, "OtherGame");
//# sourceMappingURL=OtherGame.js.map