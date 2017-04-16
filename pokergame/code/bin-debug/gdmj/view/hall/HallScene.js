var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅界面
 * @author chenwei
 * @date 2016/6/28
 */
var HallScene = (function (_super) {
    __extends(HallScene, _super);
    function HallScene() {
        var _this = _super.call(this) || this;
        _this.bFirstLogin = true;
        _this.skinName = "HallSceneSkin";
        return _this;
    }
    HallScene.prototype.childrenCreated = function () {
    };
    HallScene.prototype.onEnable = function () {
        var _this = this;
        var bottomMenus = App.BottomMenuManager.getBoxA();
        bottomMenus.showMenu(this);
        bottomMenus.ok = function (bottomName) {
            _this.onMenusTouch(bottomName);
        };
        this.updateCurDeskUI();
        var user = App.DataCenter.UserInfo.getMyUserVo();
        //推送服务器
        App.pushSocket.startConnect(App.DataCenter.ServerInfo.PUSH_SERVER_URL);
        if (user.isOvertime && !App.DataCenter.shareInfo.deskCode) {
            console.log("房间过期1");
            this.openReNew();
            //房间过期重置首次进入
            this.bFirstLogin = false;
        }
        else {
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSceneTouch, this);
        this.hall_friends_room.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendRoom, this);
        // this.chatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenusTouch, this);
        // this.feedBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenusTouch, this);
        // this.scoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onScoreBtnTouch,this);
        this.expandBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFullScreen, this);
        this.shrinkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFullScreen, this);
        this.deskInfoGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDeskInfo, this);
        egret.setTimeout(this.onDeskInfo, this, 10000);
        egret.ExternalInterface.addCallback("purchase", function (message) {
            var ctrl1 = new HallController();
            ctrl1.verificationPay(message);
        });
        this.getMarquee();
    };
    HallScene.prototype.onFullScreen = function (e) {
        switch (e.target) {
            case this.expandBtn:
                this.onExpand();
                break;
            case this.shrinkBtn:
                this.onShrink();
                break;
        }
    };
    HallScene.prototype.onExpand = function () {
        egret.Tween.get(this.topHeadGroup).to({ top: -this.topHeadGroup.height }, 200);
        egret.Tween.get(this.bottomMenuGroup).to({ bottom: -this.bottomMenuGroup.height }, 200);
        this.shrinkBtn.visible = true;
        this.expandBtn.visible = false;
    };
    HallScene.prototype.onShrink = function () {
        egret.Tween.get(this.topHeadGroup).to({ top: 0 }, 200);
        egret.Tween.get(this.bottomMenuGroup).to({ bottom: 0 }, 200);
        this.shrinkBtn.visible = false;
        this.expandBtn.visible = true;
    };
    /*游戏状态修改*/
    HallScene.prototype.gameStateChange = function () {
        var games = App.DataCenter.gameState;
        if (games == GameState.Playing) {
            this.pageView.hideScorller();
            this.fullScreenGroup.visible = true;
            this.option.visible = false;
            if (this.pageView.selectMainGame()) {
                Tips.info("游戏已开始,已自动返回牌桌.");
            }
        }
        else {
            this.fullScreenGroup.visible = false;
            this.option.visible = true;
            this.pageView.showScorller();
        }
    };
    HallScene.prototype.updateCurDeskInfo = function () {
        var curDesk = App.DataCenter.roomInfo.getCurDesk();
        var gameconfig = ProtocolData.gameConfig;
        gameconfig = curDesk.gameConfig;
        var ruleDict = this.getGameConfigStr(gameconfig);
        var len = this.deskInfoGroup.numChildren;
        for (var i = 2; i < len - 1; i++) {
            var item = this.deskInfoGroup.getChildAt(i);
            item.text = "";
        }
        var mjType = this.deskInfoGroup.getChildAt(1);
        if (gameconfig.gameType == GAME_TYPE.JI_PING_HU) {
            mjType.text = "鸡平胡";
        }
        else {
            mjType.text = "推到胡";
        }
        this.basePointLab.text = curDesk.basePoint.toString();
        var ruleList = [];
        for (var key in ruleDict) {
            if (ruleDict[key] == true) {
                ruleList.push(key);
            }
        }
        if (gameconfig.hasMaiMa && gameconfig.gameType == GAME_TYPE.TUI_DAO_HU)
            ruleList.push("买马数量:" + gameconfig.maiMaNum);
        for (var i = 0; i < ruleList.length; i++) {
            var item = this.deskInfoGroup.getChildAt(i + 2);
            item.text = ruleList[i];
        }
        var baseGroup = this.deskInfoGroup.getChildAt(len - 1);
        var offlen = 0;
        if (ruleList.length) {
            offlen = ruleList.length;
        }
        baseGroup.y = 64 + 30 * (offlen);
    };
    HallScene.prototype.onDeskInfo = function () {
        if (this.deskInfoGroup.left == 0) {
            egret.Tween.get(this.deskInfoGroup).to({ left: -212 }, 200);
        }
        else if (this.deskInfoGroup.left == -212) {
            egret.Tween.get(this.deskInfoGroup).to({ left: 0 }, 200);
        }
    };
    HallScene.prototype.getGameConfigStr = function (gameConfig) {
        var ruleDict = {};
        ruleDict["杠上开花"] = gameConfig.hasGangShangKaiHua;
        ruleDict["海底捞月"] = gameConfig.hasHaiDiLaoYue;
        ruleDict["抢杠胡"] = gameConfig.hasQiangGang;
        ruleDict["一炮三响"] = gameConfig.hasYiPaoSanXiang;
        ruleDict["三元牌"] = gameConfig.hasSanYuan;
        ruleDict["风位风圈刻子"] = gameConfig.hasFengQuan;
        ruleDict["步步高"] = gameConfig.hasBuBuGao;
        ruleDict["杠牌加番"] = gameConfig.hasGangAddFan;
        return ruleDict;
    };
    /**
     *  获取跑马灯
     */
    HallScene.prototype.getMarquee = function () {
        this.ctrl.sendGetMsgMarquee();
    };
    /**
     * 开始跑
     */
    HallScene.prototype.starMarquee = function () {
        this.marquee.startRolling();
    };
    HallScene.prototype.onRemove = function () {
        //注销socket
        this.ctrl.unRegistSocket();
    };
    //跑马灯
    HallScene.prototype.pushMqruee = function (msg, c) {
        if (c === void 0) { c = 1; }
        this.marquee.push(msg, c);
    };
    HallScene.prototype.sendSelfRoom = function (code) {
        if (code === void 0) { code = null; }
        this.ctrl.registerSocket();
        if (this.bFirstLogin) {
            this.bFirstLogin = false;
            var code1 = App.DataCenter.shareInfo.deskCode;
            var desk = parseInt(App.DataCenter.shareInfo.deskId);
            this.ctrl.sendSelfRoom(code1, desk);
        }
        else {
            this.ctrl.sendSelfRoom(code);
        }
    };
    /**点击场景UI*/
    HallScene.prototype.onSceneTouch = function (e) {
        var uer = App.DataCenter.UserInfo.getMyUserVo();
        switch (e.target) {
            case this.QRCodeBtn:
                if (uer.isOvertime) {
                    console.log("房间过期2");
                    App.PanelManager.open(PanelConst.ReNew);
                    return;
                }
                App.PanelManager.open(PanelConst.QRCode);
                break;
            case this.modifyDeskBtn:
                if (uer.isOvertime) {
                    console.log("房间过期3");
                    App.PanelManager.open(PanelConst.ReNew);
                    return;
                }
                if (App.DataCenter.gameState == GameState.Playing) {
                    Tips.info("游戏已正式开始,请结束后再修改房间信息");
                    return;
                }
                App.PanelManager.open(PanelConst.ExcRoom);
                break;
        }
    };
    HallScene.prototype.setGameContent = function (g) {
        this.pageView.addPageContent(g);
    };
    /**点击底部菜单栏*/
    HallScene.prototype.onMenusTouch = function (bottomName) {
        switch (bottomName) {
            case BottomName.mall:
                this.ctrl.sendShopListReq(1);
                break;
            case BottomName.knapsack:
                this.ctrl.getBackpack();
                break;
            case BottomName.share:
                App.PanelManager.open(PanelConst.SharePanel);
                break;
            case BottomName.email:
                this.ctrl.sendGetEmail();
                break;
            case BottomName.friends:
                App.PanelManager.open(PanelConst.InvitePanel);
                break;
            case BottomName.take:
                App.PanelManager.open(PanelConst.RulePanel);
                break;
            case BottomName.set:
                App.PanelManager.open(PanelConst.SetPanel);
                break;
            default:
                break;
        }
    };
    /**好友房列表 */
    HallScene.prototype.friendRoom = function () {
        App.PanelManager.open(PanelConst.FriendPanel);
    };
    /**进入聊天 */
    HallScene.prototype.inChat = function () {
        var gameScene = App.SceneManager.getScene(SceneConst.GameScene);
        if (gameScene.isGag) {
            var minute = parseInt("" + gameScene.timeNumber / 60);
            var second = parseInt("" + gameScene.timeNumber % 60);
            var secondStr;
            if (second < 9) {
                secondStr = "0" + second;
            }
            else {
                secondStr = "" + second;
            }
            Tips.info("您已被房主禁言,暂无法使用聊天功能(" + minute + ":" + secondStr + ")");
        }
        else {
            var deskInfo = App.DataCenter.roomInfo.getCurDesk();
            if (this.deskCode != deskInfo.deskCode) {
                this.deskCode = deskInfo.deskCode;
                gameScene.clearChatRecord();
            }
            App.PanelManager.open(PanelConst.ChatPanel);
        }
    };
    /**更新当前桌子信息*/
    HallScene.prototype.updateCurDeskUI = function () {
        // var deskVo: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
        // var user: UserVO = App.DataCenter.UserInfo.getMyUserVo();     
        // deskVo && (this.modifyDeskBtn.visible = ((user.userID == deskVo.ownerID)&&!user.isOvertime));       
        // this.userNameLab.text = deskVo ? decodeURIComponent(deskVo.deskName) :decodeURIComponent(user.excluroomName);
        // this.roomIdLab.text = deskVo?deskVo.deskCode.toString():user.excluroomCode.toString();       
    };
    HallScene.prototype.restPageView = function () {
        this.pageView.resetData();
    };
    /**退出大厅*/
    HallScene.prototype.quitHall = function () {
        var _this = this;
        var msgBox = App.MsgBoxManager.getBoxA();
        msgBox.ok = function () {
            App.gameSocket.close();
            App.pushSocket.close();
            _this.ctrl.sendEvent(LoginController.EVENT_SHOW_LOGIN);
        };
        msgBox.showMsg("是否确定退出登陆");
    };
    HallScene.prototype.openReNew = function () {
        var _this = this;
        App.PanelManager.open(PanelConst.ReNew, function () {
            _this.ctrl.sendShopListReq(ShopType.ReNew);
        }, this);
    };
    HallScene.prototype.openDesk = function () {
        var _this = this;
        App.PanelManager.open(PanelConst.CreateRoomPanel, function () {
            _this.ctrl.sendShopListReq(ShopType.OpenDesk);
        }, this);
    };
    /**进入游戏*/
    HallScene.prototype.intoGameDesk = function (bReplay, replayData, bReconnect) {
        if (bReplay === void 0) { bReplay = false; }
        if (bReconnect === void 0) { bReconnect = false; }
        var resArray;
        console.log("`````````````````````进入游戏,是否断线重连:", bReconnect, "是否回放:", bReplay);
        if (bReconnect || bReplay) {
            resArray = [AssetConst.Invite, AssetConst.Game, AssetConst.Card];
        }
        else {
            resArray = [AssetConst.Invite, AssetConst.Card];
        }
        //背包选择场景对应的资源组
        resArray.push(App.DataCenter.BagInfo.getSceneGroupName());
        //清空非游戏内面板
        App.PanelManager.closeAllPanel();
        //记录回放
        App.DataCenter.replayInfo.bReplay = bReplay;
        App.DataCenter.replayInfo.replayData = replayData;
        //加载游戏资源
        var preloadPanel = App.PanelManager.open(PanelConst.PreloadPanel);
        App.ResUtils.loadGroup(resArray, this, this.loadGameComplete, this.loadGameProgress);
    };
    HallScene.prototype.addPageView = function () {
        this.pageView.addOneContent();
    };
    //加载游戏资源进度
    HallScene.prototype.loadGameProgress = function (e) {
        var preloadPanel = App.PanelManager.getPanel(PanelConst.PreloadPanel);
        preloadPanel.setProgress(Math.round(e.itemsLoaded / e.itemsTotal * 100));
    };
    //加载游戏资源完成
    HallScene.prototype.loadGameComplete = function () {
        App.PanelManager.closeAllPanel();
        App.EventManager.sendEvent(GameController.EVENT_SHOW_GAME_SCENE);
    };
    return HallScene;
}(BaseScene));
__reflect(HallScene.prototype, "HallScene");
//# sourceMappingURL=HallScene.js.map