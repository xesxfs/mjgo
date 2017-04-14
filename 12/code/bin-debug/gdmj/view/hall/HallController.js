var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅模块
 * @author chenkai
 * @date 2016/11/4
 */
var HallController = (function (_super) {
    __extends(HallController, _super);
    function HallController() {
        var _this = _super.call(this) || this;
        _this.isReconnection = false;
        return _this;
    }
    //注册时调用
    HallController.prototype.onRegister = function () {
        this.addEvent(HallController.EVENT_SHOW_HALL, this.showHallScene, this);
        this.addEvent(EventConst.GameStateChange, this.changeGameState, this);
    };
    //游戏状态更改
    HallController.prototype.changeGameState = function (state) {
        if (App.DataCenter.gameState != state) {
            App.DataCenter.gameState = state;
            this.hallScene.gameStateChange();
        }
    };
    //移除注册时调用
    HallController.prototype.onRemove = function () {
    };
    /**显示大厅*/
    HallController.prototype.showHallScene = function () {
        App.serverSocket.close();
        App.gameSocket.close();
        this.hallScene = App.SceneManager.runScene(SceneConst.HallScene, this);
    };
    //注册socket
    HallController.prototype.registerSocket = function () {
        var gameSocket = App.gameSocket;
        gameSocket.register(ProtocolHead.Rev100_3_8, this.revLoginError, this);
        gameSocket.register(ProtocolHead.Rev102_2_50, this.revReconnection, this);
        gameSocket.register(ProtocolHead.Rev100_2_1, this.revWLogin, this);
        gameSocket.register(ProtocolHead.Rev102_4_1, this.revInRoom, this);
        gameSocket.register(ProtocolHead.Rev121_1_0, this.revSelfRoom, this);
        gameSocket.register(ProtocolHead.Rev102_8_1, this.revInDesk, this);
        gameSocket.register(ProtocolHead.Rev104_10_1, this.revGetDesk, this);
        gameSocket.register(ProtocolHead.Rev121_2_0, this.onSelfRoomEmpty, this);
        gameSocket.register(ProtocolHead.Rev120_1_1, this.RevRoomChange, this);
        gameSocket.register(ProtocolHead.Rev120_1_2, this.RevBCRoomChange, this);
        App.serverSocket.register(ProtocolHead.Rev200_1_1, this.revGameServer, this);
        App.serverSocket.register(ProtocolHead.Rev200_2_1, this.revCheckRoom, this);
        App.pushSocket.register(ProtocolHead.Rev182_1_0, this.revPushLogin, this);
        App.pushSocket.register(ProtocolHead.Rev182_0_0, this.revPushMessage, this);
        //socket连接成功事件
        this.addEvent(EventConst.SocketConnect, this.onSocketConnect, this);
        //socket连接错误事件
        this.addEvent(EventConst.SocketIOError, this.onSocketError, this);
    };
    HallController.prototype.unRegistSocket = function () {
        var gameSocket = App.gameSocket;
        gameSocket.unRegister(ProtocolHead.Rev100_3_8);
        gameSocket.unRegister(ProtocolHead.Rev102_2_50);
        gameSocket.unRegister(ProtocolHead.Rev100_2_1);
        gameSocket.unRegister(ProtocolHead.Rev102_4_1);
        gameSocket.unRegister(ProtocolHead.Gag111_2_1);
        gameSocket.unRegister(ProtocolHead.Rev121_1_0);
        gameSocket.unRegister(ProtocolHead.Rev120_1_1);
        gameSocket.unRegister(ProtocolHead.Rev120_1_2);
        App.serverSocket.unRegister(ProtocolHead.Rev200_1_1);
        App.pushSocket.unRegister(ProtocolHead.Rev182_1_0);
        App.pushSocket.unRegister(ProtocolHead.Rev182_0_0);
        this.removeEvent(EventConst.SocketConnect, this.onSocketConnect, this);
        this.removeEvent(EventConst.SocketIOError, this.onSocketError, this);
    };
    /**socket连接成功*/
    HallController.prototype.onSocketConnect = function (socket) {
        console.log(socket.name + " hall connenct success");
        //调度服务器连接成功，去获取游戏服务器
        if (socket == App.serverSocket) {
            App.MsgBoxManager.recycleAllBox();
            if (this.curDeskId) {
                this.sendCheckRoom();
            }
            else {
                //加入自己房间
                if (Server_Type.createRoom == App.serverSocket.serverType) {
                    this.sendGetGameServer();
                }
                else if (Server_Type.joinRoom == App.serverSocket.serverType) {
                    this.sendCheckRoom();
                }
            }
        }
        //游戏服务器连接成功，发送登录请求
        if (socket == App.gameSocket) {
            this.sendWLogin();
        }
        //推送服务器连接成功，发送登录请求
        if (socket == App.pushSocket) {
            this.sendPushLogin();
        }
    };
    /**socket连接错误*/
    HallController.prototype.onSocketError = function (socket) {
        if (socket == App.gameSocket || socket == App.serverSocket) {
            App.MsgBoxManager.recycleAllBox();
            var messageBox = App.MsgBoxManager.getBoxB();
            messageBox.showMsg("网络连接失败，请检查您的网络。");
        }
    };
    //***********************************************************************
    //------------------------ Socket通讯-------------------------------------
    //------------------------ Socket通讯-------------------------------------
    //------------------------ Socket通讯-------------------------------------
    //************************************************************************
    /**发送获取游戏服务器*/
    HallController.prototype.sendGetGameServer = function () {
        console.log("发送获取游戏服务器");
        var data = ProtocolData.Send200_1_0;
        data.serverType = App.serverSocket.serverType;
        data.userid = App.DataCenter.UserInfo.httpUserInfo.userID;
        data.gameid = Game_ID.selfRoom;
        data.deskCode = this.curRoomid;
        //查询房间所在游戏服务器
        App.serverSocket.send(ProtocolHead.Send200_1_0, data);
    };
    /**接收获取游戏服务器*/
    HallController.prototype.revGameServer = function (data) {
        console.log("接收游戏服务器");
        //关闭调度服务器
        App.serverSocket.close();
        var json = ProtocolData.Rev200_1_1;
        json = data;
        if (!json.retCode) {
            var ip = "ws://" + json.host + ":" + json.port;
            App.DataCenter.ServerInfo.GAME_SERVER = json.host;
            App.DataCenter.ServerInfo.GAME_PORT = json.port;
            App.gameSocket.startConnect(ip);
        }
        else if (json.retCode == 1) {
            Tips.error("房主不在线,返回自己的房间");
            this.sendSelfRoom();
        }
    };
    /**查询房间是否存在**/
    HallController.prototype.sendCheckRoom = function () {
        var data = ProtocolData.Send200_2_0;
        data.deskCode = this.curRoomid;
        data.gameid = Game_ID.selfRoom;
        App.serverSocket.send(ProtocolHead.Send200_2_0, data);
    };
    /**返回房间是否存在**/
    HallController.prototype.revCheckRoom = function (data) {
        var _this = this;
        var info = ProtocolData.Rev200_2_1;
        info = data;
        if (info.isExist) {
            //必须先断开连接,房间可能在不同游戏服务器里面
            console.log("game socket close!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            App.gameSocket.close();
            egret.setTimeout(function () { _this.sendGetGameServer(); }, this, 200);
        }
        else {
            //通过链接进入,不存在将返回自己房间
            if (this.curDeskId) {
                Tips.info("房主不在线,房间已关闭,您已回到自己房间");
                this.sendSelfRoom();
            }
            else {
                Tips.info("房间不存在");
            }
        }
    };
    /**发送登录游戏服务器*/
    HallController.prototype.sendWLogin = function () {
        var data = ProtocolData.Send100_5_0;
        data.userid = App.DataCenter.UserInfo.httpUserInfo.userID;
        data.pass = App.DataCenter.ServerInfo.MD5PASS;
        App.gameSocket.send(ProtocolHead.Send100_5_0, data);
    };
    /**游戏服务器登录成功,服务器此时会发送该房间下所有的桌子信息 ,如果是断线重连则等待断线重连消息,revSelfRoom*/
    HallController.prototype.revWLogin = function (data) {
        var info = ProtocolData.to_game;
        info = data;
        console.log("登录成功,是否断线重连:" + info.reconnect);
        this.isReconnection = false;
        if (info.reconnect) {
            this.isReconnection = true;
            Tips.info("~~嗷嗷~~断线重连中~~~~~~");
        }
        else {
            App.MsgBoxManager.recycleAllBox();
        }
    };
    /***接收房间桌子列表,这里接受的是自己的桌子信息**/
    HallController.prototype.revSelfRoom = function (data) {
        var info = ProtocolData.Rev121_1_0;
        info = data;
        var roomId = this.curRoomid;
        if (!this.isReconnection) {
            console.log("当前房间号_________________:", roomId);
            var deskId = 1;
            if (this.curDeskId)
                deskId = this.curDeskId;
            this.sendInRoom(roomId, deskId);
        }
    };
    /**
 * 发送进入房间
 * @deskID 房间号
 */
    HallController.prototype.sendInRoom = function (roomId, deskId) {
        var data = ProtocolData.Send102_4_0;
        data.deskCode = roomId;
        data.deskid = deskId;
        App.gameSocket.send(ProtocolHead.Send102_4_0, data);
    };
    /**接收进入房间*/
    HallController.prototype.revInRoom = function (data) {
        var _this = this;
        //清空非游戏内面板
        App.PanelManager.closeAllPanel();
        App.DataCenter.UserInfo.deleteAllUserExcptMe();
        var info = ProtocolData.Rev102_4_1;
        info = data;
        if (!info.retCode) {
            console.log("进入房间++++++++++++++++++++++++++++++++++++++++++++++++++++++++:" + info);
            App.DataCenter.roomInfo.readDeskList(info.deskLst);
            App.DataCenter.roomInfo.setCurDesk(info.deskno);
            var cur = App.DataCenter.roomInfo.getCurDesk();
            App.DataCenter.deskInfo = cur;
            //保存to_game用户数据
            var len = info.userList.length;
            for (var i = 0; i < len; i++) {
                var to_game = ProtocolData.to_game;
                to_game = JSON.parse(info.userList[i]);
                var userVO = App.DataCenter.UserInfo.getUser(to_game.userid);
                if (userVO == null) {
                    userVO = new UserVO();
                    userVO.userID = to_game.userid;
                    App.DataCenter.UserInfo.addUser(userVO);
                }
                userVO.nickName = to_game.nickname;
                userVO.seatID = to_game.deskstation;
                userVO.headUrl = to_game.avater;
                userVO.sex = to_game.sex;
                userVO.gold = to_game.money;
            }
            this.hallScene.intoGameDesk();
            console.log("updateDesk_______________________________________________________________________________");
            this.hallScene.updateCurDeskUI();
            this.sendGetQRCode();
        }
        else if (info.retCode == -11) {
            this.sendSelfRoom();
            Tips.error(ErrorCode.getCodeText(ProtocolHead.Rev102_4_1, info.retCode));
        }
        else if (info.retCode == 2 && !this.isReconnection) {
            var nextDeskId_1 = -1;
            for (var i_1 = 0; i_1 < info.deskLst.length; i_1++) {
                var desk = info.deskLst[i_1];
                if (desk.curSitPeopleCoiunt < 4) {
                    nextDeskId_1 = desk.deskID;
                    break;
                }
            }
            if (nextDeskId_1 != -1) {
                var messageBox = App.MsgBoxManager.getBoxA();
                messageBox.ok = function () {
                    _this.sendInRoom(_this.curRoomid, nextDeskId_1);
                };
                if (this.curDeskId) {
                    App.DataCenter.roomInfo.readDeskList(info.deskLst);
                    App.DataCenter.roomInfo.setCurDeskById(this.curDeskId);
                    var cur = App.DataCenter.roomInfo.getCurDesk();
                    App.DataCenter.deskInfo = cur;
                    this.hallScene.setGameContent(null);
                    this.hallScene.updateCurDeskUI();
                    messageBox.showMsg("当前麻将桌人数已满,房主其它麻将桌有空位,是否立即前往?");
                }
                else {
                    this.sendSelfRoom(this.curRoomid, nextDeskId_1);
                }
            }
            else {
                App.DataCenter.roomInfo.readDeskList(info.deskLst);
                App.DataCenter.roomInfo.setCurDeskById(this.curDeskId);
                var cur = App.DataCenter.roomInfo.getCurDesk();
                App.DataCenter.deskInfo = cur;
                this.hallScene.setGameContent(null);
                var messageBox = App.MsgBoxManager.getBoxB();
                messageBox.showMsg("房主所有的麻将桌人数已满！");
                this.hallScene.updateCurDeskUI();
            }
        }
        else if (info.retCode == -15) {
            this.hallScene.openReNew();
            App.DataCenter.roomInfo.clean();
            this.hallScene.restPageView();
            this.hallScene.updateCurDeskUI();
        }
        else {
            console.log("进入房间:", info.retCode);
            Tips.error(ErrorCode.getCodeText(ProtocolHead.Rev102_4_1, info.retCode));
        }
    };
    /**
     *  进入专属房
     * @param deskCode 房间号;没有房间号进入自己专属房，否则进入别人专属房
     */
    HallController.prototype.sendSelfRoom = function (deskCode, deskId) {
        if (deskCode === void 0) { deskCode = null; }
        if (deskId === void 0) { deskId = null; }
        var serverType;
        App.serverSocket.gameID = Game_ID.selfRoom;
        this.curDeskId = deskId;
        //加入他人专属房
        if (deskCode) {
            serverType = Server_Type.joinRoom;
            this.curRoomid = deskCode;
        }
        else {
            //自己房间
            serverType = Server_Type.createRoom;
            this.curRoomid = App.DataCenter.UserInfo.getMyUserVo().excluroomCode;
        }
        App.serverSocket.startConnect(App.DataCenter.ServerInfo.SERVER_URL, false, serverType);
    };
    /**
     * 加入桌子
     * @param deskNo 桌子号
     */
    HallController.prototype.sendInDesk = function (deskNo) {
        var info = ProtocolData.Send102_8_0;
        info.deskno = deskNo;
        App.gameSocket.send(ProtocolHead.Send102_8_0, info);
    };
    /**
     * 接受加入桌子返回
     */
    HallController.prototype.revInDesk = function (data) {
        var info = ProtocolData.Rev102_8_1;
        info = data;
    };
    /**
     * 获取桌子信息
     * @param deskNo
     */
    HallController.prototype.sendGetDesk = function (deskNo) {
        var info = ProtocolData.Send104_10_0;
        info.deskNo = deskNo;
        App.gameSocket.send(ProtocolHead.Send104_10_0, info);
    };
    /**
     * 获取桌子信息
     */
    HallController.prototype.revGetDesk = function (data) {
        var info = ProtocolData.Rev104_10_1;
        info = data;
    };
    /**推送服务登陆成功*/
    HallController.prototype.revPushLogin = function (data) {
        console.log("推送服务器登陆成功");
    };
    /**推送消息*/
    HallController.prototype.revPushMessage = function (data) {
        console.log("收到推送！！！！" + data.action);
        if (!data.ret) {
            switch (data.action) {
                // 充值推送
                case "upcoin":
                    App.DataCenter.UserInfo.httpUserInfo.coin = data.param.coin;
                    //TODO 更新商店钻石
                    Tips.info("充值成功，当前钻石为:" + data.param.coin);
                    break;
                //vip推送   
                case "upvip":
                    App.DataCenter.UserInfo.getMyUserVo().is_vip = data.param.is_vip;
                    break;
                case "upExclusiveRoom":
                    console.log("upExchlusiveRoom" + data.param.isWork);
                    if (data.param.isWork) {
                        Tips.info("续费成功,进入游戏中...!!");
                        this.sendSelfRoom();
                    }
                    else {
                        Tips.error("续费失败!!");
                    }
                    break;
                case "buyDesk":
                    if (data.param.isBuy) {
                        Tips.info("支付成功,请稍等~~~");
                        var create = App.PanelManager.getPanel(PanelConst.CreateRoomPanel);
                        create.sendCreate();
                    }
                    else {
                        Tips.error("开新桌失败！！");
                    }
                    break;
                //跑马灯推送
                case "game_marquee":
                    //玩家名字， 桌子名， 桌子号码， 番型
                    var param = data.param;
                    var userName = param.user_name;
                    var deskName = param.desk_name;
                    var deskCode = param.desk_code;
                    var mj_type = param.mj_type;
                    var mjtype = App.DataCenter.GameInfo.huTypeList[mj_type];
                    var gameMarquee = App.DataCenter.marqueeInfo.getGameMqrquee(deskName, deskCode, userName, mjtype);
                    this.hallScene.pushMqruee(gameMarquee);
                    break;
            }
        }
        else {
            Tips.error(data.desc);
        }
        console.log("推送服务器:", data);
    };
    /**
     *  发送房间修改
     */
    HallController.prototype.sendRoomChange = function (infodata) {
        var info = ProtocolData.Send120_1_0;
        info = infodata;
        App.gameSocket.send(ProtocolHead.Send120_1_0, info);
    };
    /**
     * 房主房间修改返回
     * @param data
     */
    HallController.prototype.RevRoomChange = function (data) {
        var info = ProtocolData.Rev120_1_1;
        info = data;
        if (!info.retCode) {
        }
        else {
            Tips.error(data.desc);
        }
    };
    /**
     *  接受房间更改广播,只返回更改的属性
     * @param data
     */
    HallController.prototype.RevBCRoomChange = function (data) {
        Tips.info("房间信息已修改!!");
        if (typeof (data.gameConfig) == "string") {
            data.gameConfig = JSON.parse(data.gameConfig);
        }
        var ischange = App.DataCenter.roomInfo.exCurDesk(data);
        this.hallScene.updateCurDeskUI();
        this.hallScene.updateCurDeskInfo();
        if (ischange) {
            this.sendEvent(EventConst.GameConfigChange);
        }
    };
    /**推送服务器*/
    HallController.prototype.sendPushLogin = function () {
        var data = ProtocolData.Send181_0_0;
        data.userid = App.DataCenter.UserInfo.httpUserInfo.userID;
        App.pushSocket.send(ProtocolHead.Send181_0_0, data);
    };
    /**玩家游戏中登录或没有正常登出*/
    HallController.prototype.revLoginError = function (data) {
        var info = ProtocolData.Rev100_3_8;
        info = data;
        console.log("没有正常登出:" + info);
    };
    /**断线重连*/
    HallController.prototype.revReconnection = function (data) {
        var info = ProtocolData.Rev102_2_50;
        info = data;
        var list = [info.deskInfo];
        App.DataCenter.roomInfo.readDeskList(list);
        App.DataCenter.roomInfo.setCurDesk(info.deskindex);
        var cur = App.DataCenter.roomInfo.getCurDesk();
        App.DataCenter.deskInfo = cur;
        this.hallScene.updateCurDeskUI();
        this.sendGetQRCode();
        var userList = info.userlist;
        if (userList) {
            var len = userList.length;
            for (var i = 0; i < len; i++) {
                var toGame = ProtocolData.toGame;
                toGame = JSON.parse(userList[i]);
                var userVO = App.DataCenter.UserInfo.getUser(toGame.userid);
                if (userVO == null) {
                    userVO = new UserVO();
                    userVO.userID = toGame.userid;
                    App.DataCenter.UserInfo.addUser(userVO);
                }
                userVO.nickName = toGame.nickname;
                userVO.seatID = toGame.deskstation;
                userVO.sex = toGame.sex;
                userVO.headUrl = toGame.avater;
                userVO.gold = toGame.money;
            }
        }
        else {
            var userVO = App.DataCenter.UserInfo.getUser(info.userid);
            if (userVO == null) {
                userVO = new UserVO();
                userVO.userID = info.userid;
                App.DataCenter.UserInfo.addUser(userVO);
            }
            userVO.seatID = info.deskstation;
        }
        //进入房间
        this.hallScene.intoGameDesk(false, null, true);
    };
    HallController.prototype.onSelfRoomEmpty = function () {
        Tips.info("没有可用的专属房!!");
    };
    //************************************************************************
    //------------------------ HTTP通讯---------------------------------------
    //------------------------ HTTP通讯---------------------------------------
    //------------------------ HTTP通讯---------------------------------------
    //************************************************************************
    /**
     * 获取录像数据
     * @replayCode 录像回放码
     */
    HallController.prototype.sendReplayDataReq = function (replayCode) {
        var http = new HttpSender();
        var sendData = ProtocolHttp.send_z_replayCombatGain;
        sendData.param.replaycode = parseInt(replayCode);
        http.send(sendData, this.revReplayDataReq, this);
    };
    /**返回录像数据，并进入游戏放录音*/
    HallController.prototype.revReplayDataReq = function (data) {
        if (!data.ret) {
            var replayData = data.data;
            this.hallScene.intoGameDesk(true, replayData);
        }
        else {
            Tips.info(data.desc);
        }
    };
    /**
     * 发送购买物品请求
     * @id 商品id
     */
    HallController.prototype.sendBuyProp = function (id) {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_buyprop;
        data.param.propid = id;
        http.send(data, this.revBuyPropReq, this);
    };
    /**返回购买物品结果*/
    HallController.prototype.revBuyPropReq = function (data) {
        if (!data.ret) {
            var paymentPanel = App.PanelManager.open(PanelConst.PaymentPanel);
            paymentPanel.setData(data.data);
        }
        else {
            Tips.info(data.desc);
        }
    };
    /**
     * 选择支付方式
     * @id 商品id
     */
    HallController.prototype.sendBuyPayment = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_buypayment;
        http.send(data, this.rebBuyPayment, this);
    };
    /**选择支付方式返回 */
    HallController.prototype.rebBuyPayment = function (data) {
        if (!data.ret) {
            var paymentMethod = App.PanelManager.open(PanelConst.PaymentMethod);
            paymentMethod.setData(data.data);
        }
        else {
            Tips.info(data.desc);
        }
    };
    /**发送反馈信息 */
    HallController.prototype.sendFeedbackReq = function (contenter) {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_feedback;
        data.param.content = contenter;
        http.send(data, this.sendFeedbackReqCallback, this);
    };
    /** 发送反馈回调 */
    HallController.prototype.sendFeedbackReqCallback = function (data) {
        if (!data.ret) {
            var feed = App.PanelManager.getPanel(PanelConst.NewFeedBackPanel);
            feed.feedBack();
        }
        else {
            Tips.info(data.desc);
        }
    };
    /**接受二维码*/
    HallController.prototype.revQRCode = function (data) {
        if (!data.ret) {
            App.DataCenter.roomInfo.QrUrl = data.data.url;
        }
        else {
            Tips.error(data.desc);
        }
    };
    /*二维码*/
    HallController.prototype.sendGetQRCode = function () {
        var http = new HttpSender();
        var qr = ProtocolHttp.ShareByQrcode;
        qr.param.deskCode = App.DataCenter.roomInfo.getCurDesk().deskCode.toString();
        qr.param.deskId = App.DataCenter.roomInfo.getCurDesk().deskNo;
        http.send(qr, this.revQRCode, this);
    };
    /*获取邮件*/
    HallController.prototype.sendGetEmail = function () {
        var http = new HttpSender();
        var qr = ProtocolHttp.send_z_emailList;
        http.send(qr, this.revGetEmail, this);
    };
    /**邮件返回 */
    HallController.prototype.revGetEmail = function (data) {
        if (!data.ret) {
            var emailPanel = App.PanelManager.open(PanelConst.EmailPanel);
            emailPanel.setData(data.data);
        }
        else {
            Tips.error(data.desc);
        }
    };
    /*获取邮件详情*/
    HallController.prototype.sendEmailDetail = function (id) {
        var http = new HttpSender();
        var qr = ProtocolHttp.send_z_emailDetail;
        qr.param.eid = id;
        http.send(qr, this.revEmailDetail, this);
    };
    /**邮件详情返回 */
    HallController.prototype.revEmailDetail = function (data) {
        if (!data.ret) {
            var emailTwoPanel = App.PanelManager.open(PanelConst.EmailTwoPanel);
            emailTwoPanel.setData(data.data);
        }
        else {
            Tips.error(data.desc);
        }
    };
    /**获取邮件附件 */
    HallController.prototype.sendEmailGoods = function (id) {
        var http = new HttpSender();
        var qr = ProtocolHttp.send_z_getEmailGoods;
        qr.param.eid = id;
        http.send(qr, this.revEmailGoods, this);
    };
    /**获取附件返回 */
    HallController.prototype.revEmailGoods = function (data) {
        if (!data.ret) {
            Tips.info("获取成功！");
        }
        else {
            Tips.error(data.desc);
        }
    };
    //开新桌
    HallController.prototype.sendOpenDesk = function (dds) {
        var http = new HttpSender();
        var data = ProtocolHttp.AddDesk;
        data.param.ip = App.DataCenter.ServerInfo.GAME_SERVER;
        data.param.port = App.DataCenter.ServerInfo.GAME_PORT;
        data.param.gameConfig = dds.gameConfig;
        data.param.basePoint = dds.basePoint;
        http.send(data, this.revOpenDesk, this);
    };
    //接受开新桌
    HallController.prototype.revOpenDesk = function (data) {
        if (!data.ret) {
            Tips.info("桌子增加成功!!");
            App.DataCenter.roomInfo.addDesk(data.data);
            this.hallScene.left = 20;
            this.hallScene.top;
            this.hallScene.right;
            this.hallScene.bottom;
            this.hallScene.addPageView();
        }
        else {
            Tips.error(data.desc);
        }
        console.log(data);
    };
    /**
    * 发送商城列表请求
    * @type 请求类型
    */
    HallController.prototype.sendShopListReq = function (type) {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_goodsList;
        data.param.type = type;
        http.send(data, this.revShopListReq, this);
    };
    /**返回商城列表*/
    HallController.prototype.revShopListReq = function (data) {
        var goodsList = data.data.goodses;
        console.log("商城列表:", goodsList);
        var type = data.data.type;
        if (!data.ret) {
            var mallPanel = App.PanelManager.open(PanelConst.MallPanel);
        }
        else {
            Tips.error(data.desc);
        }
    };
    /**
    * 获取背包
    * @type 请求类型
    */
    HallController.prototype.getBackpack = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.get_z_back;
        http.send(data, this.revBackpack, this);
    };
    /**
     * 背包物品返回
     */
    HallController.prototype.revBackpack = function (data) {
        if (!data.ret) {
            var backpackPanel = App.PanelManager.open(PanelConst.BackpackPanel);
            backpackPanel.setData(data.data);
        }
        else {
            Tips.error(data.desc);
        }
    };
    /*获取公告跑马灯*/
    HallController.prototype.sendGetMsgMarquee = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_marquee;
        http.send(data, this.revMesMarquee, this);
    };
    /**接受跑马灯公告*/
    HallController.prototype.revMesMarquee = function (data) {
        console.log(data.data.marquees);
        App.DataCenter.marqueeInfo.setMsgMarquee(data.data.marquees);
        this.hallScene.starMarquee();
    };
    /**开通会员 */
    HallController.prototype.sendShopVipReq = function (gid) {
        this.sendPay(gid);
    };
    /**支付**/
    HallController.prototype.sendPay = function (id) {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_Pay;
        data.param.goodsid = id;
        //微信支付
        data.param.pay_type = 1;
        http.send(data, this.onWxPay, this);
    };
    /**拉起微信客户端支付**/
    HallController.prototype.onWxPay = function (data) {
        if (!data.ret) {
            Tips.info("支付成功！");
        }
    };
    /**验证支付 */
    HallController.prototype.verificationPay = function (bill) {
        var http = new HttpSender();
        //http.send1(bill, this.onVerificationPay, this);
    };
    /**验证回调 */
    HallController.prototype.onVerificationPay = function (data) {
        if (!data.ret) {
            console.log("支付验证成功！");
        }
    };
    return HallController;
}(BaseController));
/**控制模块名*/
HallController.NAME = "HallController";
/**显示大厅*/
HallController.EVENT_SHOW_HALL = "ShowHallScene";
__reflect(HallController.prototype, "HallController");
//# sourceMappingURL=HallController.js.map