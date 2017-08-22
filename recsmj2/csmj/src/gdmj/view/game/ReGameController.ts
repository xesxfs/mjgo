/**
 * 重构的游戏控制模块
 * @author xiongjian 
 * @date 2017/7/3
 */
class ReGameController extends BaseController {
    /**游戏模块名*/
    public static NAME: string = "ReGameController";
    /**游戏场景是否初始化完成，用于scene组件创建完毕之前就收到socket消息，此时不能更新组件*/
    public inited: boolean = false;
    /**游戏场景*/
    public gameScene: ReGameScene;

    private hallController: HallController;

    /**显示游戏场景*/
    public static EVENT_SHOW_GAME_SCENE: string = "EVENT_SHOW_GAME_SCENE";
    
    //是否解散房间
    public isJieSan: boolean = false;

    public constructor() {
        super();
    }

    //注册模块时调用
    public onRegister() {
        this.addEvent(ReGameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);

    }

    //注销模块时调用
    public onRemove() {
        this.removeEvent(ReGameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
    }

    /**显示游戏*/
    private showGameScene() {
        this.gameScene = <ReGameScene>App.SceneManager.runScene(SceneConst.ReGameScene, this);
    }

    //注册socket
    public registerSocket() {
        console.log("注册gameSocket");
        var socket: ClientSocket = App.gameSocket;

        socket.register(ProtocolHead.Rev100145, this.revUserJoin, this);        //用户进入
        socket.register(ProtocolHead.Rev100165, this.revReady, this);         //接收其他人准备返回
        socket.register(ProtocolHead.Send100162, this.revSelfReady, this);         //发送准备返回
        socket.register(ProtocolHead.Send100164, this.sendCamcelReady, this)        //发送取消准备
        socket.register(ProtocolHead.Rev100802, this.revUpdatInfo, this);     //更新玩家信息
        socket.register(ProtocolHead.Rev100806, this.revStartGame, this);      //开始游戏
        socket.register(ProtocolHead.Rev100808, this.revDealCard, this);       //发牌
        socket.register(ProtocolHead.Rev100809, this.revGetCard, this);        //摸牌
        socket.register(ProtocolHead.Rev100811, this.revNoticeAct, this);      //通知吃碰杠胡动作
        socket.register(ProtocolHead.Rev100812, this.revAct, this);            //吃碰杠胡动作
        socket.register(ProtocolHead.Rev100813, this.revNoticeOutCard, this);  //出牌
        socket.register(ProtocolHead.Rev100900, this.revQiShouHu, this);        //起手胡
        socket.register(ProtocolHead.Rev100814, this.revGameOver, this);       //游戏结束
        socket.register(ProtocolHead.Rev101003, this.revUserJoin, this);       //广播通知有玩家进入好友房桌子
        socket.register(ProtocolHead.Send100121, this.revTCMatchRoom, this);  //接收退出匹配房返回
        socket.register(ProtocolHead.Send101002, this.revTCFriendRoom, this); //接收退出好友房返回
        socket.register(ProtocolHead.Rev100012, this.revDuanxian, this);              //好友房接收玩家断线
        socket.register(ProtocolHead.Rev100011, this.revChongLian, this);     //接收重连
        socket.register(ProtocolHead.Send100102, this.RevSetRule, this);  //接受修改规则返回
        socket.register(ProtocolHead.Rev100901, this.revZhaNiao, this);      //接收游戏结束扎鸟
        socket.register(ProtocolHead.Send100151, this.revJieSanRoom, this)    //请求好友房解散房间返回
        socket.register(ProtocolHead.Rev100155, this.revPushJieshan, this);     //广播通知有玩家请求解散桌子
        socket.register(ProtocolHead.Rev100159, this.revPushJieshanBack, this)    //广播通知某玩家对解散桌子的回应
        socket.register(ProtocolHead.Rev100160, this.revJiesanSuccess, this);     //广播通知解散桌子
        socket.register(ProtocolHead.Rev100047, this.revOutRoom, this);           //广播有玩家离开房间
        socket.register(ProtocolHead.Rev100818, this.revGameEnd, this);              //广播一轮游戏结束通知
        socket.register(ProtocolHead.Rev100161, this.rev100161, this);            //广播拒绝解散房间
        socket.register(ProtocolHead.Send100128, this.revSendKick, this)          //发送踢人返回
        socket.register(ProtocolHead.Rev100129, this.RevByKick, this);            //广播有人被踢出
        socket.register(ProtocolHead.Rev100133, this.RevKick, this);                   //接收自己被踢出
        socket.register(ProtocolHead.Send100124, this.revChangeDesk, this);       //接受换桌
        socket.register(ProtocolHead.Rev100108, this.rev100108, this)                 //广播当前局数
        socket.register(ProtocolHead.Rev100803, this.revGameState, this);     //游戏状态    10
        socket.register(ProtocolHead.Rev100822, this.revSwapCard, this);    //测试换牌
        socket.register(ProtocolHead.Rev100819, this.revNoticeJiao, this);   //通知叫牌
        socket.register(ProtocolHead.Send100823, this.revLookCard, this);    //测试看牌
        socket.register(ProtocolHead.Rev104_4_0, this.revDeskOver, this);      //桌子结束
        socket.register(ProtocolHead.Rev100805, this.revTuoGuan, this);       //托管
        socket.register(ProtocolHead.Rev100013, this.revOtherLogin, this);  //其他人登录，被挤下线
        socket.register(ProtocolHead.Send100117, this.rev100117, this);         //查看规则
        socket.register(ProtocolHead.Send100118, this.rev100118, this);         //修改规则初始值
        socket.register(ProtocolHead.Send100119, this.rev100119, this);         //发送邀请好友
        socket.register(ProtocolHead.Rev100103, this.revChangeRule, this);
        socket.register(ProtocolHead.Rev100167, this.revUnRedy, this);
        socket.register(ProtocolHead.Send101004, this.rev101004, this);
    }

    //取消注册socket
    public unRegisterSocket() {
        console.log("移除gameSoket")
        var socket: ClientSocket = App.gameSocket;
        socket.unRegister(ProtocolHead.Rev100145);        //用户进入
        socket.unRegister(ProtocolHead.Rev100165);         //接收其他人准备返回
        socket.unRegister(ProtocolHead.Send100162);         //发送准备返回
        socket.unRegister(ProtocolHead.Send100164)        //发送取消准备
        socket.unRegister(ProtocolHead.Rev100802);     //更新玩家信息
        socket.unRegister(ProtocolHead.Rev100806);      //开始游戏
        socket.unRegister(ProtocolHead.Rev100808);       //发牌
        socket.unRegister(ProtocolHead.Rev100809);        //摸牌
        socket.unRegister(ProtocolHead.Rev100811);      //通知吃碰杠胡动作
        socket.unRegister(ProtocolHead.Rev100812);            //吃碰杠胡动作
        socket.unRegister(ProtocolHead.Rev100813);  //出牌
        socket.unRegister(ProtocolHead.Rev100814);       //游戏结束
        socket.unRegister(ProtocolHead.Rev100900);        //起手胡
        socket.unRegister(ProtocolHead.Rev100814);       //游戏结束
        socket.unRegister(ProtocolHead.Rev101003);       //广播通知有玩家进入好友房桌子
        socket.unRegister(ProtocolHead.Send100121);  //接收退出匹配房返回
        socket.unRegister(ProtocolHead.Send101002); //接收退出好友房返回
        socket.unRegister(ProtocolHead.Rev100012);              //好友房接收玩家断线
        socket.unRegister(ProtocolHead.Rev100011);     //接收重连
        socket.unRegister(ProtocolHead.Rev100819);
        socket.unRegister(ProtocolHead.Rev180_103_0);
        socket.unRegister(ProtocolHead.Rev100805);
        socket.unRegister(ProtocolHead.Rev100103);
        socket.unRegister(ProtocolHead.Rev100167);
    }

    /**注册事件*/
    public registerEvent() {

    }

    /**注销事件*/
    public unRegisterEvent() {

    }


    /**接收用户进入*/
    public revUserJoin(data) {
        var json = ProtocolData.Rev104_4_2;
        json = data;
        var userVo: UserVO = App.DataCenter.UserInfo.getUserBySeatID(json.deskstation);
        if (userVo == null) {
            userVo = new UserVO();
            userVo.userID = json.userid;
            App.DataCenter.UserInfo.addUser(userVo);
        }
        userVo.userID = json.userid;
        userVo.seatID = json.deskstation;
        userVo.nickName = json.nickname;
        userVo.headUrl = json.avater;
        userVo.sex = json.sex;
        userVo.gold = json.money;
        if (App.DataCenter.roomInfo.roomType == RoomType.MatchRoom) {
            userVo.point = json.point;
        } else {
            userVo.point = 0;
        }

        userVo.userPos = CardLogic.getInstance().changeSeat(userVo.seatID);

        //匹配房显示loading
        if (App.DataCenter.roomInfo.roomType == RoomType.MatchRoom) {
            let userlist = App.DataCenter.UserInfo.userList
            let len = 0;
            for (let key in userlist) {
                len++;
            }
            console.log("退出" + len);
            this.gameScene.roomTypePlugin.loadingSet(len);
        }


        if (this.inited) {
            //更新头像

            this.gameScene.headPlugin.updateUserHead(userVo);
            //显示准备按钮
            if (userVo.userPos == UserPosition.Down) {
                this.gameScene.readyPlugin.showReadyBtn();
            }
            //播放进入声音
            App.SoundManager.playEffect(SoundManager.enter);
        }
        console.log("用户加入，用户ID:", userVo.userID, " 用户位置:", userVo.userPos);
    }

  /**接收游戏开始*/
    public revStartGame(data) {
        // this.gameScene.hideOverShutupUI();
        this.gameScene.resetGame();
        //将data保存，等待手牌数据到了之后，再处理data
        this.gameScene.bHavePlay = true;
        // ProtocolData.Rev100806.dice1 = null;
        ProtocolData.Rev100806 = data;
        console.log("接收庄家,位置:", CardLogic.getInstance().changeSeat(ProtocolData.Rev100806.seatID));

        this.gameScene.roomTypePlugin.hideFriendRoom();              //隐藏好友房邀请面板
        this.gameScene.roomTypePlugin.hideLoading();
    }

    /**游戏开始发牌每人13张*/
    public revDealCard(data) {
        console.log("接收发牌:", data);
        this.gameScene.revDealCard(data);
    }

    /**接收玩家摸牌*/
    public revGetCard(data) {
        //刚开始发牌等手牌显示再显示
        if (this.gameScene.gameState == GameState.DealCard) {
            egret.Tween.get(this).wait(3000).call(() => {
                this.gameScene.revGetCard(data);
            });
        } else {
            this.gameScene.revGetCard(data);
        }

    }

    /**通知玩家叫牌*/
    public revNoticeAct(data) {
        this.gameScene.revNoticeAct(data);
    }

    /**
     * 玩家请求操作(吃、碰、杠、胡等) 
     * @act 玩家动作
     * @cardList 动作牌列表
     */
    public sendAct(act: ACT_act, cardList = null) {
        var json = ProtocolData.Send100810;
        json.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
        json.act = act;
        json.cardList = cardList;
        App.gameSocket.send(ProtocolHead.Send100810, json);
        console.log("提交动作,act:", act, "cardList:", cardList);
    }

    /**接收响应玩家操作 (其他玩家吃、碰等，广播给另外3玩家) 180, 56, 0*/
    public revAct(data, bAnim: boolean) {
        this.gameScene.revAct(data);
    }

    /**通知玩家出牌 180, 57, 0*/
    public revNoticeOutCard(data) {
        this.gameScene.revNoticeOutCard(data);
    }

    /**游戏结束 180, 58, 0*/
    public revGameOver(data) {
        this.gameScene.revGameOver(data);
    }

    /**发送离开房间*/
    public sendQuitRoom() {
        App.gameSocket.send(ProtocolHead.Send102_5_0);
    }

    /**接收离开房间*/
    public revQuitRoom(data) {
        var json = ProtocolData.Rev102_5_1;
        json = data;
        var userID = json.userid;       //离开玩家id
        var seatID = json.deskstation;
        var pos = CardLogic.getInstance().changeSeat(seatID);
        console.log("用户离开,位置:", pos);
        var user: UserVO = App.DataCenter.UserInfo.getMyUserVo()
        //踢出的不是自己，删除被踢出人的信息
        if (userID != user.userID) {
            if (App.DataCenter.UserInfo.isExist(userID)) {
                App.DataCenter.UserInfo.deleteUser(userID)
            }
        }

        this.gameScene.headPlugin.hideZhuangFlag();
        //自己离开。金币场可以直接离开；非金币场最后一局直接离开就看不了战绩了
        if (pos == UserPosition.Down) {
            var ha: HallScene = App.SceneManager.getScene(SceneConst.HallScene);
            ha.sendSelfRoom();
            //            console.log("离开房间")
            //            var a=[]
            //            a.push(App.DataCenter.UserInfo.deleteUser(userID));
            //            App.DataCenter.UserInfo.userList = a
            //            if(App.serverSocket.gameID == Game_ID.GoldRoom){
            //                this.onQuitGame();
            //            }else{
            //                if(this.inited){
            //                    if(this.gameScene.curPlayCount != this.gameScene.maxPlayCount){
            //                        this.onQuitGame();
            //                    }
            //                }else{
            //                    this.onQuitGame();
            //                }
            //            }            
            //其他用户离开
        } else {
            this.gameScene.gameConfigChange();
            //如果游戏已开始，则不能删除用户信息，否则游戏声音等无法获取用户信息
            if (this.inited) {

                this.gameScene.headPlugin.hideHeadUI(pos);
                this.gameScene.readyPlugin.hideReady(pos);
                if (this.gameScene.bHavePlay == false) {
                    App.DataCenter.UserInfo.deleteUser(userID);
                }
                App.SoundManager.playEffect(SoundManager.user_left);
            } else {
                App.DataCenter.UserInfo.deleteUser(userID);
            }
        }
    }

    /**
     * 接收通知有玩家掉线
     */
    private revDuanxian(data) {
        var userList = App.DataCenter.UserInfo.userList;
        if (userList[data.userid + ""]) {
            TipsLog.gameInfo("【" + userList[data.userid + ""].nickName + "】" + "玩家离线");
            this.gameScene.showUnConnect(userList[data.userid + ""].userPos);
        }
    }

    /**
     * 接收通知由玩家重连
     */
    private revChongLian(data) {
        var userList = App.DataCenter.UserInfo.userList;
        if (userList[data.userid + ""]) {
            TipsLog.gameInfo("【" + userList[data.userid + ""].nickName + "】" + "玩家已重新回到牌局");
            console.log("重连进来的人", userList[data.userid + ""].userPos, "ssss", userList);
            this.gameScene.hideUnconect(userList[data.userid + ""].userPos);
        }
    }

    /**接收更新玩家信息*/
    public revUpdatInfo(data) {
        var json = ProtocolData.Rev180_5_0;
        json = data;
        console.log("更新分数:", json);
        var playerInfoList = json.playerInfoList;
        var len = playerInfoList.length;

        //如果房间坐满人，关掉匹配中loading
        if (len >= 4) {
            this.gameScene.isMan = true;
            this.gameScene.roomTypePlugin.showStartText(); //显示牌局即将开始

        }

        for (var i = 0; i < len; i++) {
            var playerInfo = ProtocolData.playerGameInfo;
            playerInfo = playerInfoList[i];
            var userVo: UserVO = App.DataCenter.UserInfo.getUser(playerInfo.userID);
            if (userVo == null) {
                userVo = new UserVO();
                userVo.userID = playerInfo.userID;
                App.DataCenter.UserInfo.addUser(userVo);
            }
            userVo.seatID = playerInfo.seatID;
            userVo.userPos = CardLogic.getInstance().changeSeat(userVo.seatID);

            if (this.inited) {
                //更新用户UI, 金币场由103_6_0更新
                if (App.serverSocket.gameID == Game_ID.CardRoom || App.serverSocket.gameID == Game_ID.selfRoom) {
                    userVo.point = playerInfo.point;
                    // this.gameScene.headUIList[userVo.userPos].scoreLabel.text = userVo.point + "";
                    this.gameScene.headPlugin.updatePointByPos(userVo.userPos, userVo.point);//更新积分
                }
            }
        }
    }

    /**接收游戏状态*/
    public revGameState(data) {
        this.gameScene.revGameState(data);
    }


    /**接收测试换牌*/
    public revSwapCard(data) {
        this.gameScene.revSwapCard(data);
    }

    /**接收起手胡 */
    public revQiShouHu(data) {
        this.gameScene.revQiShouHu(data);

    }

    /**发送申请解散房间*/
    public sendApplyDismiss() {
        var json = ProtocolData.Send104_5_0;
        json.deskno = App.DataCenter.deskInfo.deskID;
        App.gameSocket.send(ProtocolHead.Send104_5_0, json);
    }

    /**接收房间解散*/
    public revApplyDismiss(data) {
        var json = ProtocolData.Rev104_5_1;
        json = data;
        var retCode = json.retCode;  //1直接解散 2等待确认
        console.log("接收解散房间申请:", retCode);
        if (retCode == 1) {
            this.gameScene.quitToHall();
        } else if (retCode == 2) {
            TipsLog.gameInfo("等待其他玩家确认");
        }
    }

    /**接收询问是否同意房间解散*/
    public revAskDismiss(data) {
        var json = ProtocolData.Rev104_5_2;
        json = data;
        var nickName = json.solveUserName;
        var userID = json.solveUserID;
        console.log("接收询问是否同意房间解散,发起人:", nickName);

        //自己申请不需同意
        if (userID == App.DataCenter.UserInfo.getMyUserVo().userID) {
            return;
        }
    }

	/**
	 * 发送回复是否同意解散房间
	 * @isAgree 是否同意
	 */
    public sendReplayDismiss(isAgree: boolean) {
        var json = ProtocolData.Send104_5_5;
        json.deskno = App.DataCenter.deskInfo.deskID;
        json.isArgee = isAgree;
        App.gameSocket.send(ProtocolHead.Send104_5_5, json);
        console.log("发送是否同意解散，桌子号:", json.deskno, "同意:", json.isArgee);
    }

    /**接收广播玩家叫牌*/
    public revNoticeJiao() {
        this.gameScene.revNoticeJiao();
    }

    /**接收测试看牌*/
    public revLookCard(data) {
        this.gameScene.revLookCard(data);
    }

    /**接收桌子结束*/
    public revDeskOver(data) {
        var json = ProtocolData.Rev104_4_0;
        json = data;
        if (json.overType == 1) {  //结束类型, 1 局数打完， 2 时间到期， 3 房主解散桌子， 11 不知道什么东西
            var ha: HallScene = App.SceneManager.getScene(SceneConst.HallScene);
            this.gameScene.resetScene();
            // App.EventManager.sendEvent(EventConst.GameStateChange, GameState.Free);
            TipsLog.gameInfo("房主不在线，房间已关闭，您已回到自己的房间。")
            ha.sendSelfRoom();
            var messageBox: MessageBox = App.MsgBoxManager.getBoxB();
            messageBox.showMsg("房主已解散房间");
        } else if (json.overType == 2) {
            this.onQuitGame();
            //一局未开时，房主主动解散房间，其他玩家显示提示(房主主动解散房间，服务端返回的overType不是3，而是2...)
            if (this.gameScene.bHavePlay == false && this.gameScene.isDeskOwner() == false) {
                var messageBox: MessageBox = App.MsgBoxManager.getBoxB();
                messageBox.showMsg("房主已解散房间");
            }
        } else {
            this.onQuitGame();
        }
    }

    /**
     * 发送托管
     * @isTrshop true请求托管，false取消托管
     */
    public sendTuoGuan(isTrship: boolean) {
        if (this.gameScene.gameState != GameState.Playing) {
            return;
        }
        var json = ProtocolData.Send180_6_0;
        json.isTrship = isTrship;
        App.gameSocket.send(ProtocolHead.Send100804, json);
    }

    /**接收托管*/
    public revTuoGuan(data) {
        var json = ProtocolData.Rev180_7_0;
        json = data;
        var seatID = json.seatID;
        var pos = CardLogic.getInstance().changeSeat(seatID);
        var isTrship = json.isTrship;
        console.log("接收托管,位置:", pos, "托管:", isTrship);
        //托管
        if (isTrship == true) {
            if (pos == UserPosition.Down) {
                this.gameScene.rectPlugin.hideActUI();
            }
            this.gameScene.showTuoGuan(pos);
            App.SoundManager.playEffect(SoundManager.tuoGuan);
            //取消托管
        } else {
            this.gameScene.hideTuoGuan(pos);
            if (pos == UserPosition.Down && this.gameScene.rectPlugin.curActPlayer == UserPosition.Down) {
                this.gameScene.rectPlugin.selectActUI.visible = true;
            }
        }
    }

    /**接收其他玩家登陆，导致玩家离线*/
    public revOtherLogin() {
        console.log("账号在其它设备登录");
        App.gameSocket.close();
        this.onQuitGame();
        var messageBoxB: MessageBox = App.MsgBoxManager.getBoxB();
        messageBoxB.showMsg("您的账号在其他设备登录，已与服务器断开连接。");
    }

    private backLogin() {
        if (App.getInstance().indepFlag) {
            App.NativeBridge.sendCancle();

            App.PanelManager.closeAllPanel();
            var loginScene = App.SceneManager.runScene(SceneConst.LoginScene) as LoginScene;
		    loginScene.setController(App.getController(LoginController.NAME));

            App.PanelManager.open(PanelConst.LoginChoosePanel,null,null,false,false);
        }
    }

    /**发送准备 */
    public sendReady() {
        var data = ProtocolData.Send100162;
        data.userid = App.DataCenter.UserInfo.getMyUserVo().userID,
            data.deviceID = "111"
        App.gameSocket.send(ProtocolHead.Send100162, data);
    }

    /**发送取消准备 */
    public sendCamcelReady() {
        App.gameSocket.send(ProtocolHead.Send100164);
    }

    /**自己准备返回 */
    public revSelfReady(data) {
        var json = ProtocolData.Rev100162;
        json = data;
        if (json.code == 200) {
            var pos = CardLogic.getInstance().changeSeat(json.info.deskstation);
            this.gameScene.readyPlugin.showReady(pos);
            if (pos == UserPosition.Down) {
                this.gameScene.readyPlugin.hideReadyBtn();
                this.gameScene.readyPlugin.setAllReadyVisible();
                // App.EventManager.sendEvent(EventConst.GameStateChange, GameState.Ready);
            } else {
                //如果是摊牌界面，则不显示其他玩家准备
                // if (this.gameScene.handCardList[UserPosition.Down].length > 0) {
                //     this.gameScene.readyList[pos].visible = false;
                // }
            }
            App.SoundManager.playEffect(SoundManager.ready);
        }

        if (json.code == 1002) {
            TipsLog.gameInfo("局数卡不足，请购买");
            this.sendShopListReq(1);
        }

    }

    /**接收准备*/
    public revReady(data) {
        var json = ProtocolData.Rev108_1_2;
        json = data;
        console.log("接收准备,位置:", CardLogic.getInstance().changeSeat(json.deskstation));
        var pos = CardLogic.getInstance().changeSeat(json.deskstation);
        var userVo: UserVO = App.DataCenter.UserInfo.getUser(json.userid);
        userVo && (userVo.setState(PLAYER_STATE.READY, true));

        if (this.inited) {
            this.gameScene.readyPlugin.showReady(pos);
            if (pos == UserPosition.Down) {
                this.gameScene.readyPlugin.hideReadyBtn();
                this.gameScene.readyPlugin.setAllReadyVisible();
                // App.EventManager.sendEvent(EventConst.GameStateChange, GameState.Ready);
            } 
            // else {
            //     //如果是摊牌界面，则不显示其他玩家准备
            //     if (this.gameScene.handCardList[UserPosition.Down].length > 0) {
            //         this.gameScene.readyList[pos].visible = false;
            //     }
            // }
            App.SoundManager.playEffect(SoundManager.ready);
        }

    }

    /**发送请求游戏状态*/
    public sendGameState() {
        var json = ProtocolData.Send100150;
        json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
        let room_type = App.DataCenter.roomInfo.roomType;

        var hallController: HallController = App.getController(HallController.NAME);
        if (hallController.isReconnection) {
            json.room_name = "";
        } else {
            if (room_type == RoomType.FriendRoom) {
                json.room_name = "csmj_room_friend_1"
            } else if (room_type == RoomType.MatchRoom) {
                json.room_name = "csmj_room_match_1"
            }
        }

        App.gameSocket.send(ProtocolHead.Send100150, json);
    }

    /**
     * 接受修改规则
     */
    private RevSetRule(data) {
        var json = ProtocolData.Rev100102;
        json = data;
        if (json.code == 200) {
            TipsLog.gameInfo("房间信息修改成功!");
             var modifyRlueT:ModifyRlueT=   App.PanelManager.getPanel(PanelConst.ModifyRlueT) as ModifyRlueT;
             var count = modifyRlueT.getRoundNum();
             this.setMaxPlayCount(count);
            App.PanelManager.closeAllPanel();
        } else {
            if (json.code == 1011) {
                TipsLog.gameInfo("游戏正在进行中，无法修改规则");
            } else {
                TipsLog.gameInfo(data.info.desc);
            }
        }

    }

    /**
     * 游戏结束扎鸟
     */
    private revZhaNiao(data) {
        //If you don't understand the code, please don't move it.
        egret.Tween.get(this).wait(10).call(
            ()=>{
                this.gameScene.revZhaNiao(data);
            }
        )
    }

    /**踢人返回*/
    private kickBack(data) {
        switch (data.retCode) {
            case 0:

                console.log("踢人成功");
                //                console.log(data);
                break;
            case 1:
                console.log("不在桌子上");
                break;
            case 2:
                console.log("被踢的玩家不存在");
                break;
            case 3:
                console.log("玩家现在还不能被踢");
                break;
        }
    }
    /**
     * 测试规则发送
     */
    public send100117() {
        var data = ProtocolData.Send100117;
        data.desk_id = App.DataCenter.deskInfo.deskNo;
        App.gameSocket.send(ProtocolHead.Send100117, data);
    }

    /**
     * 接收规则测试
     */
    private rev100117(data) {
        // console.log(data);
        var json = ProtocolData.Rev100117;
        json = data;
        if (json.code == 200) {
            App.PanelManager.open(PanelConst.LookRlue);
            let LookRlue = App.PanelManager.getPanel(PanelConst.LookRlue) as LookRlue;
            LookRlue.updataView(data);
        } else {
            if (json.code == 3002 || json.code == 3003) {
                TipsLog.gameInfo(data.info.desc);
            }
        }
    }

    /**
     * 修改规则初始值发送
     */
    public send100118() {
        var data = ProtocolData.Send100117;
        data.desk_id = App.DataCenter.deskInfo.deskNo;
        App.gameSocket.send(ProtocolHead.Send100118, data);
    }

    /**
     * 接收修改规则初始值
     */
    private rev100118(data) {
        console.log("修改规则初始值：", data);
        var json = ProtocolData.Rev100117;
        json = data;
        if (json.code == 200) {
            App.PanelManager.open(PanelConst.ModifyRlueT, null, null, true, true, data);
        } else {
            if (json.code == 3002 || json.code == 3003) {
                TipsLog.gameInfo(data.info.desc);
            }
        }
    }

    /**
     * 好友房邀请发送
     */
    public send100119() {
        var data = ProtocolData.Send100117;
        data.desk_id = App.DataCenter.deskInfo.deskNo;
        App.gameSocket.send(ProtocolHead.Send100119, data);
    }

    /**
     * 接收邀请好友返回规则
     */
    private rev100119(data) {
        console.log("邀请好友准备数据：", data);
        var json = ProtocolData.Rev100117;
        json = data;
        if (json.code == 200) {
            App.PanelManager.open(PanelConst.InvitePanelT, null, null, true, true, data);
        } else {
            if (json.code == 3002 || json.code == 3003) {
                TipsLog.gameInfo(data.info.desc);
            }
        }
    }

    //接收解散房间返回
    private revJieSanRoom(data) {
        var json = ProtocolData.Rev100151;
        json = data;
        if (json.code == 200) {
            App.PanelManager.close(PanelConst.SendjiesanPanel);
            if (data.info.is_dissolve == 1) {

            }
            // if (this.gameScene.gameState == GameState.Playing || this.gameScene.gameState == GameState.DealCard || this.gameScene.gameState == GameState.GameOver || this.gameScene.gameState == GameState.Ready) {
            //     if (this.gameScene.curPlayCount != this.gameScene.maxPlayCount) {
            if (data.info.openWIndows) {
                TipsLog.gameInfo("等待其他玩家同意");
                App.PanelManager.open(PanelConst.JieSanPanel, null, null, false);
                let jiesanPanel = App.PanelManager.getPanel(PanelConst.JieSanPanel) as JieSanPanel;
                var s = ProtocolData.Rev100155;
                s.info.solveUserName = App.DataCenter.UserInfo.getMyUserVo().nickName;
                s.info.solveUserID = App.DataCenter.UserInfo.getMyUserVo().userID;
                s.info.deskno = App.DataCenter.UserInfo.getMyUserVo().seatID;
                jiesanPanel.btnGroup.visible = false;
                jiesanPanel.waitLabel.visible = true;
                jiesanPanel.updateUser(s);
                jiesanPanel.timerStart();
            }


            // }
            // }


        }

    }

    //发送解散房间
    public sendJieSan() {
        let json = ProtocolData.Send100151;
        json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
        json.deviceID = "111";
        App.gameSocket.send(ProtocolHead.Send100151, json);
    }

    /**
     * 广播通知由玩家请求解散桌子
     */
    public revPushJieshan(data) {
        var json = ProtocolData.Rev100155;
        json = data;
        var uid = App.DataCenter.UserInfo.getMyUserVo().userID;

        if (json.code == 200) {
            App.PanelManager.open(PanelConst.JieSanPanel, null, null, false);
            let jiesanPanel = App.PanelManager.getPanel(PanelConst.JieSanPanel) as JieSanPanel;
            if (json.info.solveUserID == uid) {
                // this.sendJieSanBack(IsAgree.agree);
                jiesanPanel.btnGroup.visible = false;
                jiesanPanel.waitLabel.visible = true;
            } else {
                jiesanPanel.btnGroup.visible = true;
                jiesanPanel.waitLabel.visible = false;
            }

            jiesanPanel.updateUser(json);
            jiesanPanel.timerStart();

        }
    }

    /**
     * 发送是否同意解散
     */
    public sendJieSanBack(data) {
        var json = ProtocolData.Send100156;
        json.deviceID = "111";
        json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
        json.isArgee = data;
        App.gameSocket.send(ProtocolHead.Send100156, json);

    }

    /**
     * 广播通知某玩家对解散桌子的回应
     */
    private revPushJieshanBack(data) {
        var json = ProtocolData.Rev100159;
        json = data;
        if (json.code == 200) {
            let jiesanPanel: JieSanPanel = App.PanelManager.getPanel(PanelConst.JieSanPanel) as JieSanPanel;
            if (jiesanPanel) {
                jiesanPanel.updateState(json);
            }

        }
    }

    /**
     * 广播通知解散桌子
     */
    private revJiesanSuccess(data) {
        var json = ProtocolData.Rev100160;
        json = data;
        //退出房间tween被移除，延迟处理
        setTimeout(() => {
            TipsLog.hallInfo("房间已解散，自动返回大厅");
        }, 200);
        this.isJieSan = true;


        if (json.code == 200) {
            if (json.info.overType == 1) {
                this.onQuitGame();

            }
        }
    }

    /**
     * 广播通知拒绝解散房间
     */
    private rev100161(data) {
        var json = ProtocolData.Rev100160;
        json = data;
        if (json.code == 200) {
            if (json.info.overType == 0) {
                TipsLog.gameInfo("多数玩家拒绝解散房间");
                //移除所有弹框
                App.PanelManager.closeAllPanel();
                App.MsgBoxManager.recycleAllBox();
            }
        }
    }

    /**
     * 广播通知有玩家离开房间
     */
    private revOutRoom(data) {
        var json = ProtocolData.Rev100047;
        json = data;

        if (this.gameScene.gameState == GameState.DealCard || this.gameScene.gameState == GameState.Playing || this.gameScene.gameState == GameState.Qishouhu || this.gameScene.gameState == GameState.ZhaNiao) {

            return;
        }

        let myuid = App.DataCenter.UserInfo.getMyUserVo().userID;
        let seat = json.deskstation;
        let pos = CardLogic.getInstance().changeSeat(seat);
        this.gameScene.readyPlugin.hideReady(pos);

        if (json.userid == myuid) {
            // var userVo: UserVO = App.DataCenter.UserInfo.getMyUserVo();
            // userVo && (userVo.setState(PLAYER_STATE.READY, false));

            if (App.DataCenter.roomInfo.roomType == RoomType.FriendRoom) {
                this.onQuitGame();
            } 

            let jiesanPanel = App.PanelManager.getPanel(PanelConst.JieSanPanel) as JieSanPanel;
            if (jiesanPanel) {
                jiesanPanel.close();
            }



        } else {
            //删除被踢人员的信息
            if (App.DataCenter.UserInfo.isExist(json.userid)) {
                // this.gameScene.hideReady(pos);
                App.DataCenter.UserInfo.deleteUser(json.userid);
                this.gameScene.headPlugin.hideAllHeadUI();
                this.gameScene.headPlugin.setInviteUserHead();
            }

            //匹配房显示loading
            if (App.DataCenter.roomInfo.roomType == RoomType.MatchRoom) {
                let userlist = App.DataCenter.UserInfo.userList
                let len = 0;
                for (let key in userlist) {
                    len++;
                }
                console.log("加入" + len);
                this.gameScene.roomTypePlugin.loadingSet(len);
            }
        }
    }

    /**
     * 总战绩
     */
    private revGameEnd(data) {
        var json = ProtocolData.Rev100818;
        json = data;
        //保存数据
        ProtocolData.Rev100818 = data;
        console.log("解散结算", this.isJieSan);
        if (this.isJieSan) {
            //解散房间弹出总结算面板
            var result = ProtocolData.Rev100818;
            var len = result.info.RecordList.length;
            if (len > 0) {
                this.isJieSan = false;
                console.log("结算面板");
                App.PanelManager.open(PanelConst.AllRecord);
                var allRecord: AllRecord = App.PanelManager.getPanel(PanelConst.AllRecord) as AllRecord;
                allRecord.updateZongList();
            }
        }


    }

    /**
     * 接收房间规则修改广播
     */
    private revChangeRule(data) {
        console.log("接收规则修改");
        if (data.code == 200) {
            this.gameScene.maxPlayCount = data.info.play_times_limit;
            this.setMaxPlayCount(data.info.play_times_limit);
            TipsLog.gameInfo("房主已修改房间规则，详情请查看房间规则");
        }
    }

    /**
     * 接收取消准备广播
     */
    private revUnRedy(data) {
        console.log("接收取消准备");
        var pos = CardLogic.getInstance().changeSeat(data.deskstation);
        var userVo: UserVO = App.DataCenter.UserInfo.getUser(data.userid);
        userVo && (userVo.setState(PLAYER_STATE.READY, false));

        if (this.inited) {
            this.gameScene.readyPlugin.hideReady(pos);
            if (pos == UserPosition.Down) {
                this.gameScene.readyPlugin.showReadyBtn();
                this.gameScene.readyPlugin.setAllReadyVisible();
                // App.EventManager.sendEvent(EventConst.GameStateChange, GameState.Free);
            } else {
                //如果是摊牌界面，则不显示其他玩家准备
                // if (this.gameScene.handCardList[UserPosition.Down].length > 0) {
                //     this.gameScene.readyList[pos].visible = false;
                // }
            }
        }
    }

    /**发送好友房记录 */
    public send101004() {
        var json = ProtocolData.Send101004;
        App.gameSocket.send(ProtocolHead.Send101004, json);
    }

    /**接收好友房内记录 */
    private rev101004(data) {
        if (data.code != 200) {
            data.desc && TipsLog.gameInfo(data.desc);
            data.info && data.info.desc && TipsLog.gameInfo(data.desc);
        }
        else {
            App.PanelManager.open(PanelConst.GameRecordPanel, null, null, true, true, data.info);
        }
    }

    /**发送踢人 */
    public sendKick(uid) {

        if (this.gameScene.curPlayCount > 0) {
            TipsLog.gameInfo("房间已开局，不能踢人了哦！");
        } else {
            var data = ProtocolData.Send100128;
            data.kickUserID = uid;
            App.gameSocket.send(ProtocolHead.Send100128, data);
        }

    }

    /**
     * 接受发送踢人
     */
    private revSendKick(data) {
        if (data.code == 1018) {
            TipsLog.gameInfo("房间已开局，不能踢人了哦！");
        }
    }

    /**
     * 广播有人踢出
     */
    private RevByKick() {
        App.DataCenter.gameState = GameState.Free;
    }

    /**
     * 通知自己被踢出
     */
    private RevKick() {
        TipsLog.hallInfo("您已被房主请离房间");
    }

    /**
     * 发送换桌
     */
    public sendChangeDesk() {
        var json = ProtocolData.Send100124;
        json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
        App.gameSocket.send(ProtocolHead.Send100124, json);
    }

    /**
     * 接受换桌
     */
    private revChangeDesk(data) {
        var json = ProtocolData.Rev100120;
        json = data;

        console.log("room+++++++++++++++");
        console.log(json.info);
        if (json && json.info && json.info.chat_room_id) {
            App.NativeBridge.sendQuitRoom();
            App.NativeBridge.sendJoinRoom({ roomId: json.info.chat_room_id });
        }

        if (data.code == 200) {
            App.DataCenter.UserInfo.deleteAllUser();
            this.gameScene.headPlugin.hideAllHeadUI();
            this.gameScene.readyPlugin.hideAllReady();
            console.log("换桌成功")
            var len = json.info.userList.length
            var info = json.info;
            for (var i = 0; i < len; i++) {
                var to_game = ProtocolData.to_game;
                to_game = JSON.parse(info.userList[i])
                var userVO: UserVO = App.DataCenter.UserInfo.getUser(to_game.userid);
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
                userVO.state = to_game.userstate;
                userVO.point = to_game.point;
            }

            //重设头像
            let headlen = 0;
            let userList = App.DataCenter.UserInfo.userList;
            for (let key in userList) {
                headlen += 1;
                let user = <UserVO>userList[key];
                this.gameScene.headPlugin.updateUserHead(user);
                //  console.log("userVO",user);

            }

            this.gameScene.readyPlugin.setUserReady();

            console.log("len", len);
            this.gameScene.roomTypePlugin.loadingSet(headlen);
            if (!App.getController(HallController.NAME).isReconnection) {
                //自动准备
                App.getController(HallController.NAME).isReconnection = false;
                console.log("重连状态", App.getController(HallController.NAME).isReconnection);
                this.gameScene.startReadyTimer(this.gameScene.readyTime);
            }

        } else {
            var desc = data.info.desc;
            TipsLog.hallInfo(desc);
        };

    }

    /**离开游戏*/
    public onQuitGame() {
        App.NativeBridge.sendQuitRoom();

        //移除所有弹框
        App.PanelManager.closeAllPanel();
        App.MsgBoxManager.recycleAllBox();
        //重置头像
        egret.Tween.removeAllTweens();
        this.gameScene.headPlugin.resetHeadUI();
        this.gameScene.resetScene();
        if (App.DataCenter && App.DataCenter.deskInfo) {
            App.DataCenter.deskInfo.ownerID = 0;
        }
        App.DataCenter.UserInfo.deleteAllUserExcptMe();
        var userVo: UserVO = App.DataCenter.UserInfo.getMyUserVo();
        userVo && (userVo.setState(PLAYER_STATE.READY, false));
        App.getInstance().sendEvent(HallController.EVENT_SHOW_HALL);
    }

    /**广播当前局数 */
    private rev100108(data) {
        this.gameScene.curPlayCount = data.curPlayCount + 1;
        this.gameScene.maxPlayCount = data.maxPlayCount;
        var max;
        if (data.maxPlayCount == 9999) {
            max = "-";
        } else {
            max = data.maxPlayCount;
        }

        // this.gameScene.t_jushu.text = "" + data.curPlayCount + "/" + max;
        this.gameScene.footPlugin.setJushu("" + data.curPlayCount + "/" + max);
        //一轮结束积分清零
        if (this.gameScene.curPlayCount == 1) {
            //更新积分
            var userlist = App.DataCenter.UserInfo.userList;
            for (let key in userlist) {
                var userVO: UserVO = userlist[key];
                userVO.point = 0;
            }
            this.gameScene.headPlugin.updatePoint();
        }

    }

    /**发送心跳消息 */
    public sendHeartMsg() {
        var data = ProtocolHead.Send100000;
        App.gameSocket.send(data);
    }

    /**修改局数 */
    public setMaxPlayCount(count) {
        this.gameScene.maxPlayCount = count;
        var max;
        if (count == 9999) {
            max = "-";
        } else {
            max = count;
        }
        // this.gameScene.t_jushu.text=""+this.gameScene.curPlayCount+"/"+max;
        this.gameScene.footPlugin.setJushu("" + this.gameScene.curPlayCount + "/" + max);
    }

    /**
     * 好友房发送退出房间
     */
    public SendTCRoom() {
        let room_type = App.DataCenter.roomInfo.roomType;
        if (room_type == RoomType.FriendRoom) {
            //好友房改为申请房间解散
            //扎鸟时执行了很多异步操作，退出房间再进会继续执行，这里不让退出
            if (this.gameScene.gameState == GameState.ZhaNiao || this.gameScene.gameState == GameState.Qishouhu) {
                TipsLog.gameInfo("扎鸟中")
                return
            }

            if (this.gameScene.gameState == GameState.Playing || this.gameScene.gameState == GameState.DealCard || this.gameScene.gameState == GameState.GameOver) {
                if (this.gameScene.curPlayCount == this.gameScene.maxPlayCount || this.gameScene.curPlayCount == 0) {
                    if (this.gameScene.isDeskOwner()) {
                        var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
                        messageBox.showMsg("牌局还未开始，\n房主解散房间，不消耗房卡。");
                        messageBox.ok = () => {
                            this.sendJieSan();
                        }
                    } else {
                        this.sendJieSan();
                    }

                } else {
                    App.PanelManager.open(PanelConst.SendjiesanPanel);
                }

            } else {
                if (this.gameScene.isDeskOwner() && (this.gameScene.curPlayCount == this.gameScene.maxPlayCount || this.gameScene.curPlayCount == 0)) {
                    var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
                    messageBox.showMsg("牌局还未开始，\n房主解散房间，不消耗房卡。");
                    messageBox.ok = () => {
                        this.sendJieSan();
                    }
                } else {
                    this.sendJieSan();
                }

            }





        } else if (room_type == RoomType.MatchRoom) {
            let json = ProtocolData.Send100121;
            json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
            json.deviceID = "111";


            if (this.gameScene.gameState == GameState.GameOver || this.gameScene.gameState == GameState.Free || this.gameScene.gameState == GameState.Ready) {
                App.gameSocket.send(ProtocolHead.Send100121, json);
            }
            else {
                TipsLog.gameInfo("请在游戏结束后退出房间");
            }
        }
    }

    /**接收退出匹配房返回 */
    private revTCMatchRoom(data) {
        var json = ProtocolData.Rev100121;
        json = data;
        if (json.code == 200) {
            this.onQuitGame();
        }

    }

    /**接收退出好友房返回 */
    private revTCFriendRoom(data) {
        var json = ProtocolData.Rev101002;
        json = data;
        if (json.code == 200) {
            this.onQuitGame();
        }
    }

    /**----------------------------------Http----------------------------- */
    /**
    * 发送商城列表请求
    * @type 请求类型
    */
    public sendShopListReq(type: ShopType) {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_goodsList;
        data.param.type = type;
        http.send(data, this.revShopListReq, this);
    }

    /**返回商城列表*/
    private revShopListReq(data) {
        var goodsList: Array<any> = data.data.goodses;
        var type: number = data.data.type;
        if (!data.ret) {
            var mallPanel: MallPanel = App.PanelManager.open(PanelConst.MallPanel, null, this, true, true, goodsList, true);
        } else {
            TipsLog.gameInfo(data.desc);
        }
    }

    /**
    * 获取背包
    * @type 请求类型
    */
    public getBackpack() {
        var http = new HttpSender();
        var data = ProtocolHttp.get_z_back;
        http.send(data, this.revBackpack, this);
    }
    /**
     * 背包物品返回
     */
    private revBackpack(data) {
        if (!data.ret) {
            var backpackPanel: BackpackPanel = App.PanelManager.open(PanelConst.BackpackPanel, null, this, true, true, data.data, true);
        } else {
            TipsLog.gameInfo(data.desc);
        }
    }

}