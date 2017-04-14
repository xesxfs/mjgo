/**
 * 游戏控制模块
 * @author chenkai
 * @date 2016/11/18
 */
class GameController extends BaseController{
	/**游戏模块名*/
	public static NAME:string = "GameController";
    /**游戏场景是否初始化完成，用于scene组件创建完毕之前就收到socket消息，此时不能更新组件*/
    public inited:boolean = false;
	/**游戏场景*/
	public gameScene:GameScene;
    /**领取救济金*/
    public static EVENT_REV_ALMS:string = "EVENT_REV_ALMS";
    /**离开游戏*/
    public static EVENT_QUIT_GAME:string = "EVENT_QUIT_GAME";
    /**发送聊天*/
    public static EVENT_SEND_CHAT:string = "EVENT_SEND_CHAT";
    /**发送动作表情*/
    public static EVENT_SEND_ACT_FACE:string = "EVENT_SEND_ACT_FACE";
    /**显示游戏场景*/
    public static EVENT_SHOW_GAME_SCENE:string = "EVENT_SHOW_GAME_SCENE";
    
    private hallController:HallController;
	public constructor() {
		super();
	}

    //注册模块时调用
	public onRegister(){
		this.addEvent(GameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
		this.addEvent(EventConst.GameStateChange,this.changeGameBg,this);
        //游戏尚在加载中时，服务端就会发送消息，此时游戏尚未准备就绪，这里单独将服务端会提前发送的消息额外处理。
        //客户端应当在准备就绪后通过sendGameState通知服务端，服务端再发送游戏相关消息。但是并没有这样的设定。
        var socket: ClientSocket = App.gameSocket;
        socket.register(ProtocolHead.Rev102_4_2,this.revUserJoin,this);        //用户进入
        socket.register(ProtocolHead.Rev108_1_2, this.revReady, this);         //准备
        socket.register(ProtocolHead.Rev102_5_1, this.revQuitRoom, this);      //离开房间
        //socket.register(ProtocolHead.Rev180_5_0, this.revUpdatInfo, this);     //更新玩家信息
	}

    //注销模块时调用
	public onRemove(){
        this.removeEvent(GameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
	}

	/**游戏改变状态时改变其背景*/
	private changeGameBg(state:GameState){
            this.gameScene.setGameSceneBg();
	}
	
	/**显示游戏*/
	private showGameScene(){
        this.gameScene = new GameScene();//App.SceneManager.getScene(SceneConst.GameScene);
        this.gameScene.setController(this);
        App.SceneManager.setScene(SceneConst.GameScene,this.gameScene);
		var hallScene:HallScene= App.SceneManager.getScene(SceneConst.HallScene);
		hallScene.setGameContent(this.gameScene);
		
	}

	//注册socket
    public registerSocket() {
        console.log("注册gameSocket");
        var socket: ClientSocket = App.gameSocket;
        //socket.register(ProtocolHead.Rev102_4_2,this.revUserJoin,this);      //用户进入
        socket.register(ProtocolHead.Rev180_51_0,this.revStartGame,this);      //开始游戏
        socket.register(ProtocolHead.Rev180_52_0,this.revDealCard,this);       //发牌
        socket.register(ProtocolHead.Rev180_53_0,this.revGetCard,this);        //摸牌
        socket.register(ProtocolHead.Rev180_55_0,this.revNoticeAct,this);      //通知吃碰杠胡动作
        socket.register(ProtocolHead.Rev180_56_0,this.revAct,this);            //吃碰杠胡动作
        socket.register(ProtocolHead.Rev180_57_0,this.revNoticeOutCard,this);  //出牌
        socket.register(ProtocolHead.Rev180_58_0,this.revGameOver,this);       //游戏结束
        socket.register(ProtocolHead.Rev111_1_1,this.revChat,this);            //聊天
        socket.register(ProtocolHead.Gag111_2_1,this.gagChat,this);             //禁言
        socket.register(ProtocolHead.Rev180_2_0, this.revGameState, this);     //游戏状态    10
//        socket.register(ProtocolHead.Rev102_5_1, this.revQuitRoom, this);    //离开房间
        //socket.register(ProtocolHead.Rev108_1_2, this.revReady, this);       //准备
        socket.register(ProtocolHead.Rev180_62_0, this.revRecordInfo, this);   //牌局信息
        socket.register(ProtocolHead.Rev180_101_0, this.revSwapCard, this);    //测试换牌
        socket.register(ProtocolHead.Rev104_5_1, this.revApplyDismiss, this);  //申请解散
        socket.register(ProtocolHead.Rev104_5_2, this.revAskDismiss, this);    //询问解散
        socket.register(ProtocolHead.Rev104_5_6, this.revDeskDismiss, this);   //桌子解散
        socket.register(ProtocolHead.Rev180_59_0, this.revBuyHorse, this);     //买马
        socket.register(ProtocolHead.Rev180_60_0, this.revOni, this);          //鬼牌
        socket.register(ProtocolHead.Rev180_61_0, this.revGangResult, this);   //杠牌         20
        //socket.register(ProtocolHead.Rev180_5_0, this.revUpdatInfo, this);     //更新玩家信息
        socket.register(ProtocolHead.Rev180_63_0, this.revNoticeJiao, this);   //通知叫牌
        socket.register(ProtocolHead.Rev180_103_0, this.revLookCard, this);    //测试看牌
        socket.register(ProtocolHead.Rev104_4_0, this.revDeskOver, this);      //桌子结束
        socket.register(ProtocolHead.Rev180_7_0, this.revTuoGuan, this);       //托管
        socket.register(ProtocolHead.Rev104_3_1, this.revZengSong, this);      //赠送
        socket.register(ProtocolHead.Rev104_3_2, this.revZengSongBroad, this); //赠送
        socket.register(ProtocolHead.Rev104_10_0, this.revForceDismiss, this); //强制解散
        socket.register(ProtocolHead.Rev103_10_0, this.revUpdateCardRoom,this);//更新房卡
        socket.register(ProtocolHead.Rev100_2_1,this.revWLogin,this);          //重连登录     30 
        socket.register(ProtocolHead.Rev112_1_2, this.revActFace, this);       //动作表情
        socket.register(ProtocolHead.Rev112_1_1, this.revActFaceFail, this);   //动作表情发送失败
        socket.register(ProtocolHead.Rev102_2_50,this.revReconnection,this);   //断线重连
        socket.register(ProtocolHead.Rev10000_0_0, this.revOtherLogin ,this);  //其他人登录，被挤下线
        socket.register(ProtocolHead.Rev104_1_1,this.revCreateRoom,this);      //重连创建房间
        socket.register(ProtocolHead.Rev102_4_1,this.revInRoom,this);          //重连进入房间
        socket.register(ProtocolHead.Rev104_2_1,this.revSearchRoom,this);      //重连查找房间
        socket.register(ProtocolHead.Rev_113_1_0, this.revNoticeAlms, this);   //救济金
        socket.register(ProtocolHead.Rev113_2_1, this.revGetAlms, this);       //领取救济金结果
        socket.register(ProtocolHead.Rev102_20_1,this.revKickPlayer,this);   //通知玩家被踢        40
        socket.register(ProtocolHead.Rev102_20_2,this.kickBack,this);         //踢人返回
        socket.register(ProtocolHead.Rev103_6_0, this.revMoneyChange, this);   //金币变化
        socket.register(ProtocolHead.Rev102_8_60, this.revStandUp, this);      //游戏中不能站起
        socket.register(ProtocolHead.Rev102_7_0,null,this);                    //中途退出游戏，离线
        socket.register(ProtocolHead.Rev102_2_99,null,this);                   //游戏过程重新连接
        socket.register(ProtocolHead.Rev111_2_1,this.revShutup,this);          //禁言广播
        socket.register(ProtocolHead.Rev111_3_1,this.shutupBack,this);         //接收查看是否被禁言
        socket.register(ProtocolHead.Rev102_20_3,this.byKick,this);            //接收被踢出房间
        socket.register(ProtocolHead.Rev111_1_2,this.chatError,this);          //聊天失败返回
//        socket.register(ProtocolHead.Rev111_4_0,this.unShutupBack,this);                    //解除禁言返回
        socket.register(ProtocolHead.Rev111_4_1,this.unShutupBack,this);                    //房主看到解除禁言返回
    }

	//取消注册socket
    public unRegisterSocket() {
        console.log("移除gameSoket")
        var socket: ClientSocket = App.gameSocket;
        //socket.unRegister(ProtocolHead.Rev102_4_2);
        socket.unRegister(ProtocolHead.Rev180_51_0);
        socket.unRegister(ProtocolHead.Rev180_52_0);
        socket.unRegister(ProtocolHead.Rev180_53_0);
        socket.unRegister(ProtocolHead.Rev180_55_0);
        socket.unRegister(ProtocolHead.Rev180_56_0);
        socket.unRegister(ProtocolHead.Rev180_57_0);
        socket.unRegister(ProtocolHead.Rev180_58_0);
        socket.unRegister(ProtocolHead.Rev111_1_1);
        socket.unRegister(ProtocolHead.Gag111_2_1);
        socket.unRegister(ProtocolHead.Rev180_2_0);   //10
        //socket.unRegister(ProtocolHead.Rev102_5_1);
        //socket.unRegister(ProtocolHead.Rev108_1_2);
        socket.unRegister(ProtocolHead.Rev180_62_0);
        socket.unRegister(ProtocolHead.Rev180_101_0);
        socket.unRegister(ProtocolHead.Rev104_5_1);
        socket.unRegister(ProtocolHead.Rev104_5_2);
        socket.unRegister(ProtocolHead.Rev104_5_6);
        socket.unRegister(ProtocolHead.Rev180_59_0);
        socket.unRegister(ProtocolHead.Rev180_60_0);
        socket.unRegister(ProtocolHead.Rev180_61_0);   //20
        //socket.unRegister(ProtocolHead.Rev180_5_0);
        socket.unRegister(ProtocolHead.Rev180_63_0);
        socket.unRegister(ProtocolHead.Rev180_103_0);
        socket.unRegister(ProtocolHead.Rev104_4_0);
        socket.unRegister(ProtocolHead.Rev180_7_0);
        socket.unRegister(ProtocolHead.Rev104_3_1);
        socket.unRegister(ProtocolHead.Rev104_3_2);
        socket.unRegister(ProtocolHead.Rev104_10_0);
        socket.unRegister(ProtocolHead.Rev103_10_0);
        socket.unRegister(ProtocolHead.Rev100_2_1);    //30
        socket.unRegister(ProtocolHead.Rev112_1_2);
        socket.unRegister(ProtocolHead.Rev112_1_1);
        socket.unRegister(ProtocolHead.Rev102_2_50); 
        socket.unRegister(ProtocolHead.Rev10000_0_0); 
        socket.unRegister(ProtocolHead.Rev104_1_1);   
        socket.unRegister(ProtocolHead.Rev102_4_1);
        socket.unRegister(ProtocolHead.Rev104_2_1);  
        socket.unRegister(ProtocolHead.Rev102_20_2);
        socket.unRegister(ProtocolHead.Rev_113_1_0);
        socket.unRegister(ProtocolHead.Rev113_2_1); 
        socket.unRegister(ProtocolHead.Rev102_20_1);    //40
        socket.unRegister(ProtocolHead.Rev103_6_0);
        socket.unRegister(ProtocolHead.Rev102_8_60); 
        socket.unRegister(ProtocolHead.Rev111_2_1);  
        socket.unRegister(ProtocolHead.Rev111_3_1);                       
        socket.unRegister(ProtocolHead.Rev102_20_3);   
//        socket.unRegister(ProtocolHead.Rev111_4_0); 
        socket.unRegister(ProtocolHead.Rev111_4_1); 
    }

    /**注册事件*/
    public registerEvent(){
        this.addEvent(EventConst.SocketConnect, this.onSocketConnect, this);       //socket连接
		this.addEvent(EventConst.SocketIOError, this.onSocketError, this);         //socket连接错误
		this.addEvent(EventConst.SocketClose, this.onSocketClose, this);           //socket关闭
		this.addEvent(EventConst.StartReconnect, this.onStartReconnect, this);     //socket重连

        this.addEvent(GameController.EVENT_QUIT_GAME, this.onQuitGame, this);      //退出游戏
        this.addEvent(GameController.EVENT_SEND_CHAT, this.sendChat, this);        //发送聊天
        this.addEvent(GameController.EVENT_SEND_ACT_FACE, this.sendActFace, this); //发送动作表情
        this.addEvent(GameController.EVENT_REV_ALMS, this.revAlms,this);           //php领取救济金成功
    }

    /**注销事件*/
    public unRegisterEvent(){
        this.removeEvent(EventConst.SocketConnect, this.onSocketConnect, this);
		this.removeEvent(EventConst.SocketIOError, this.onSocketError, this);
		this.removeEvent(EventConst.SocketClose, this.onSocketClose, this);
		this.removeEvent(EventConst.StartReconnect, this.onStartReconnect, this);

        this.removeEvent(GameController.EVENT_QUIT_GAME, this.onQuitGame, this);
        this.removeEvent(GameController.EVENT_SEND_CHAT, this.sendChat, this);
        this.removeEvent(GameController.EVENT_SEND_ACT_FACE, this.sendActFace, this);
        this.removeEvent(GameController.EVENT_REV_ALMS, this.revAlms,this);         
    }

    /**通过分享链接进入，并玩了一次游戏 （第二次插入数据）*/
	public sendInsertShare(){
        var userVO: UserVO = App.DataCenter.UserInfo.getMyUserVo();
                var http = new HttpSender();
                var sendData = ProtocolHttp.send_z_InsertShare;
                sendData.uid = userVO.userID;
                http.send(sendData, this.revInsertShare, this); 
                console.log("游戏结束，第二次：发送用户分享链接玩了一次游戏");               
    }

    /**返回分享*/
    public revInsertShare(data){
        //貌似无返回..
    }

	/**接收用户进入*/
    public revUserJoin(data) {
        var json = ProtocolData.Rev104_4_2;
        json = data;

        var userVo: UserVO = App.DataCenter.UserInfo.getUserBySeatID(json.deskstation);  
        if(userVo == null){
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
        userVo.userPos =  CardLogic.getInstance().changeSeat(userVo.seatID);
        
        //判断是否是进入了游戏，进入别人的房间显示房间内有几个人（数据是加入房间时Rev102_4_1返回的）
        if(this.gameScene){
            for(var key in App.DataCenter.UserInfo.userList) {
                console.log(App.DataCenter.UserInfo.userList[key])
                this.gameScene.updateUserHead(App.DataCenter.UserInfo.userList[key]);
            }
        }


        if(this.inited){
            //更新头像
            this.gameScene.updateUserHead(userVo);
            //显示准备按钮
            if(userVo.userPos == UserPosition.Down){
                this.gameScene.showReadyBtn();
            }
            //播放进入声音
            App.SoundManager.playEffect(SoundManager.enter);
        }
        console.log("用户加入，用户ID:",userVo.userID," 用户位置:", userVo.userPos);
    }

	/**接收游戏开始*/
    public revStartGame(data) {
        this.gameScene.hideOverShutupUI();
        this.gameScene.resetGame();
        //将data保存，等待手牌数据到了之后，再处理data
        this.gameScene.bHavePlay = true;
        ProtocolData.Rev180_51_0.diceList = null;
        ProtocolData.Rev180_51_0 = data;
        console.log("接收庄家,位置:", CardLogic.getInstance().changeSeat(ProtocolData.Rev180_51_0.seatID));
    }

	/**游戏开始发牌每人13张*/
    public revDealCard(data) {
        console.log("接收发牌:",data);
        this.gameScene.revDealCard(data);   
    }

	/**接收玩家摸牌*/
	public revGetCard(data){
		this.gameScene.revGetCard(data);
	}
	
	/**通知玩家叫牌*/
	public revNoticeAct(data){
		this.gameScene.revNoticeAct(data);
	}

    /**
     * 玩家请求操作(吃、碰、杠、胡等) 
     * @act 玩家动作
     * @cardList 动作牌列表
     */
    public sendAct(act:ACT_act, cardList = null){
        var json = ProtocolData.Send180_54_0;
        json.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
        json.act = act;
        json.cardList = cardList;
        App.gameSocket.send(ProtocolHead.Send180_54_0,json);
        console.log("提交动作,act:",act,"cardList:",cardList);
    }

	/**接收响应玩家操作 (其他玩家吃、碰等，广播给另外3玩家) 180, 56, 0*/
	public revAct(data, bAnim:boolean){
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

    /**
     * 发送聊天数据
     * @msgType 聊天类型
     * @msg 聊天信息
     */
    public sendChat(msgType:CHAT_TYPE , msg:string){
        var data = ProtocolData.Send111_1_0;
        data.msgType = msgType;
        data.msg = msg;
        App.gameSocket.send(ProtocolHead.Send111_1_0,data);
    }

	/**接收聊天数据*/
    public revChat(data){
		this.gameScene.revChat(data);
	}

    /**接受禁言数据 */
    public gagChat(data){
        
    }

    /**发送请求游戏状态*/
    public sendGameState(){
        App.gameSocket.send(ProtocolHead.Send150_1);
    }

	/**接收游戏状态*/
    public revGameState(data){
		this.gameScene.revGameState(data);
	}
 
    /**发送离开房间*/
    public sendQuitRoom(){
        App.gameSocket.send(ProtocolHead.Send102_5_0);
    }

	/**接收离开房间*/
	public revQuitRoom(data){
		var json = ProtocolData.Rev102_5_1;
        json = data;
        var userID = json.userid;       //离开玩家id
        var seatID = json.deskstation;  
        var pos = CardLogic.getInstance().changeSeat(seatID);
        console.log("用户离开,位置:",pos);
        var user :UserVO= App.DataCenter.UserInfo.getMyUserVo()
        //踢出的不是自己，删除被踢出人的信息
        if(userID != user.userID){
            if(App.DataCenter.UserInfo.isExist(userID)) {
                App.DataCenter.UserInfo.deleteUser(userID)
            }
        }

        this.gameScene.hideZhuangFlag();
        //自己离开。金币场可以直接离开；非金币场最后一局直接离开就看不了战绩了
        if(pos == UserPosition.Down){
            var ha:HallScene = App.SceneManager.getScene(SceneConst.HallScene);
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
        }else{
            this.gameScene.gameConfigChange();
            //如果游戏已开始，则不能删除用户信息，否则游戏声音等无法获取用户信息
            if(this.inited){
             
                this.gameScene.hideHeadUI(pos);
                this.gameScene.hideReady(pos);
                if(this.gameScene.bHavePlay == false){
                    App.DataCenter.UserInfo.deleteUser(userID);
                }
                App.SoundManager.playEffect(SoundManager.user_left);
                //踢人、禁言不显示
                this.gameScene.gameKickList[pos - 1].visible = false;
                this.gameScene.gameShutupList[pos - 1].visible = false;
            }else{
                //踢人、禁言不显示
                this.gameScene.gameKickList[pos - 1].visible = false;
                this.gameScene.gameShutupList[pos - 1].visible = false;
                App.DataCenter.UserInfo.deleteUser(userID);
            }
        }
	}

    /**发送准备 108_1_0*/
    public sendReady(){
        App.gameSocket.send(ProtocolHead.Send108_1_0);
    }

	/**接收准备*/
    public revReady(data){
		var json = ProtocolData.Rev108_1_2;
        json = data;
        console.log("接收准备,位置:", CardLogic.getInstance().changeSeat(json.deskstation));
        var pos = CardLogic.getInstance().changeSeat(json.deskstation);
        var userVo: UserVO = App.DataCenter.UserInfo.getUser(json.userid);
        userVo && (userVo.setState(PLAYER_STATE.READY, true));

        if(this.inited){
            this.gameScene.showReady(pos);
            if(pos == UserPosition.Down){
                this.gameScene.hideReadyBtn();
                this.gameScene.setAllReadyVisible();
                App.EventManager.sendEvent(EventConst.GameStateChange,GameState.Ready);
            }else{
                //如果是摊牌界面，则不显示其他玩家准备
                if(this.gameScene.handCardList[UserPosition.Down].length > 0){
                    this.gameScene.readyList[pos].visible = false;
                }
            }
            App.SoundManager.playEffect(SoundManager.ready);
        }
        
	}

	/**接收牌局信息*/
    public revRecordInfo(data){
		this.gameScene.revRecordInfo(data);
	}

    /**接收测试换牌*/
	public revSwapCard(data){
		this.gameScene.revSwapCard(data);
	}

	/**发送申请解散房间*/
    public sendApplyDismiss(){
        var json = ProtocolData.Send104_5_0;
        json.deskno = App.DataCenter.deskInfo.deskID;
        App.gameSocket.send(ProtocolHead.Send104_5_0, json);
    }

	/**接收房间解散*/
    public revApplyDismiss(data){
		var json = ProtocolData.Rev104_5_1;
        json = data;
        var retCode = json.retCode;  //1直接解散 2等待确认
        console.log("接收解散房间申请:",retCode);
        if(retCode == 1){
            this.gameScene.quitToHall();
        }else if(retCode == 2){
            Tips.info("等待其他玩家确认");
        }
	}

	/**接收询问是否同意房间解散*/
    public revAskDismiss(data){
		var json = ProtocolData.Rev104_5_2;
        json = data;
        var nickName = json.solveUserName;
        var userID = json.solveUserID;
        console.log("接收询问是否同意房间解散,发起人:",nickName);

        //自己申请不需同意
        if(userID == App.DataCenter.UserInfo.getMyUserVo().userID){ 
            return;
        }
	}

	/**
	 * 发送回复是否同意解散房间
	 * @isAgree 是否同意
	 */
	public sendReplayDismiss(isAgree:boolean){
		var json = ProtocolData.Send104_5_5;
		json.deskno = App.DataCenter.deskInfo.deskID;
		json.isArgee = isAgree;
		App.gameSocket.send(ProtocolHead.Send104_5_5, json);
		console.log("发送是否同意解散，桌子号:",json.deskno,"同意:",json.isArgee);
	}

	/**接收桌子解散广播*/
    public revDeskDismiss(data){
		var json = ProtocolData.Rev104_5_6;
        json = data;
        console.log("广播桌子解散,是否房主拒绝:",json.isOwnerRepel, "是否解散成功:",json.isDissolve);
        if(json.isDissolve){                  
//             this.gameScene.quitToHall();
             var messageBox:MessageBox = App.MsgBoxManager.getBoxB();
             messageBox.showMsg("房间已解散");
        }else{
           if(json.isOwnerRepel){
                Tips.info("房主拒绝解散房间");

            }else{
                Tips.info("超过2人拒绝解散房间");
            }
        }
	}

	/**接收广播买马结果*/
    public revBuyHorse(data){
		console.log("买马结果:", data);
        ProtocolData.Rev180_59_0 = data;
	}

	/**接收广播鬼牌*/
    public revOni(data){
		var json = ProtocolData.Rev180_60_0;
        json = data;
	}

	/**接收广播杠立刻结算*/
    public revGangResult(data,bAnim:boolean = true){
		this.gameScene.revGangResult(data);
	}

	/**接收更新玩家信息*/
    public revUpdatInfo(data){
		var json = ProtocolData.Rev180_5_0;
        json = data;
        console.log("更新分数:",json);
        var playerInfoList = json.playerInfoList;
        var len = playerInfoList.length;
        for(var i=0;i<len;i++){
            var playerInfo = ProtocolData.playerGameInfo;
            playerInfo = playerInfoList[i];
            var userVo: UserVO = App.DataCenter.UserInfo.getUser(playerInfo.userID);
            if(userVo == null){
                userVo = new UserVO();
                userVo.userID = playerInfo.userID;
                App.DataCenter.UserInfo.addUser(userVo);
            }
            userVo.seatID =  playerInfo.seatID;
            userVo.userPos = CardLogic.getInstance().changeSeat(userVo.seatID);

            if(this.inited){
                //更新用户UI, 金币场由103_6_0更新
                if(App.serverSocket.gameID == Game_ID.CardRoom || App.serverSocket.gameID == Game_ID.selfRoom){
                    userVo.point = playerInfo.point;
                    this.gameScene.headUIList[userVo.userPos].scoreLabel.text = userVo.point + "";
                }
            }
        }
	}

	/**接收广播玩家叫牌*/
    public revNoticeJiao(){
		this.gameScene.revNoticeJiao();
	}

	/**接收测试看牌*/
    public revLookCard(data){
		this.gameScene.revLookCard(data);
	}

	/**接收桌子结束*/
    public revDeskOver(data){
		var json = ProtocolData.Rev104_4_0;
        json = data;
        if(json.overType == 1){  //结束类型, 1 局数打完， 2 时间到期， 3 房主解散桌子， 11 不知道什么东西
            var ha: HallScene = App.SceneManager.getScene(SceneConst.HallScene);
            this.gameScene.resetScene();
            App.EventManager.sendEvent(EventConst.GameStateChange,GameState.Free);
            Tips.info("房主不在线，房间已关闭，您已回到自己的房间。")
            ha.sendSelfRoom();
            var messageBox: MessageBox = App.MsgBoxManager.getBoxB();
            messageBox.showMsg("房主已解散房间");
        }else if(json.overType == 2){
            this.onQuitGame();
            //一局未开时，房主主动解散房间，其他玩家显示提示(房主主动解散房间，服务端返回的overType不是3，而是2...)
            if(this.gameScene.bHavePlay == false && this.gameScene.isDeskOwner() == false){
                var messageBox:MessageBox = App.MsgBoxManager.getBoxB();
                messageBox.showMsg("房主已解散房间");
            }
        }else {
            this.onQuitGame();
        }
	}

    /**
     * 发送托管
     * @isTrshop true请求托管，false取消托管
     */
    public sendTuoGuan(isTrship:boolean){
        if(this.gameScene.gameState != GameState.Playing){
            return;
        }
        var json = ProtocolData.Send180_6_0;
        json.isTrship = isTrship;
        App.gameSocket.send(ProtocolHead.Send180_6_0, json);
    }

	/**接收托管*/
    public revTuoGuan(data){
		var json = ProtocolData.Rev180_7_0;
        json = data;
        var seatID = json.seatID;
        var pos = CardLogic.getInstance().changeSeat(seatID);
        var isTrship = json.isTrship;
         console.log("接收托管,位置:",pos,"托管:",isTrship);
        //托管
        if(isTrship == true){  
            if(pos == UserPosition.Down){
                this.gameScene.hideActUI();
            }
            this.gameScene.showTuoGuan(pos);
            App.SoundManager.playEffect(SoundManager.tuoGuan);
        //取消托管
        }else{
            this.gameScene.hideTuoGuan(pos);
            if(pos == UserPosition.Down && this.gameScene.curActPlayer == UserPosition.Down){
                this.gameScene.selectActUI.visible = true;
            }
        }
	}

	/**赠送房间*/
	public sendZengSong( userID){
		var json = ProtocolData.Send104_3_0;
        json.deskno = App.DataCenter.deskInfo.deskID;
        json.giftUserID =userID;
        App.gameSocket.send(ProtocolHead.Send104_3_0, json);
        console.log("发送赠送请求,桌子号:",json.deskno,"用户ID:",json.giftUserID);
	} 

	/**接收赠送返回*/
    public revZengSong(data){
		console.log("接收转增:",data);
        var json = ProtocolData.Rev104_3_1;
        json = data;
        switch(json.retCode){  //0 成功, 1 桌子不存在， 2 不是房主， 3 被赠予玩家不在线或者不在桌子上, 4 房卡不足
            case 0:
                Tips.info("转增成功");
            break;
            case 1:
                Tips.info("桌子不存在");
            break;
            case 2:
                Tips.info("您不是房主");
            break;
            case 3:
                Tips.info("被赠予玩家不存在");
            break;
            case 4:
                Tips.info("房卡不足");
            break;
        } 
	}

	/**接收赠送返回广播*/
    public revZengSongBroad(data){
		console.log("接收转增广播:",data);
        var json = ProtocolData.Rev104_3_2;
        json = data;
        var deskno = json.deskno;
        var newDeskOwnerID = json.newDeskOwnerID;
        var preDeskOwnerID = json.preDeskOwnerID;
        //保存新的桌子拥有者ID，并显示or隐藏赠送按钮
        if(deskno == App.DataCenter.deskInfo.deskID){
            App.DataCenter.deskInfo.ownerID = newDeskOwnerID;
            if(App.DataCenter.UserInfo.getMyUserVo().userID == newDeskOwnerID){
                this.gameScene.zsBtn.visible = true;
            }
            if(App.DataCenter.UserInfo.getMyUserVo().userID == preDeskOwnerID){
                this.gameScene.zsBtn.visible = false;
            }
            //自己接收赠送后，弹出提示
            if(newDeskOwnerID == App.DataCenter.UserInfo.getMyUserVo().userID){
                var userVO:UserVO = App.DataCenter.UserInfo.getUser(preDeskOwnerID);
                if(userVO){
                    var messageBox:MessageBox = App.MsgBoxManager.getBoxB();
                    messageBox.showMsg(userVO.nickName + "已将房间赠送给您,您已是当前房间的房主。");
                }
            }
        }
	}

	/**超时离线*/
    public revForceDismiss(){
        var msgBox:MessageBox = App.MsgBoxManager.getBoxB();
        msgBox.showMsg("由于您长时间未开始游戏，即将退出房间。");
        msgBox.ok = ()=>{
            this.onQuitGame();
        };
	}
	
	/**接收更新房卡*/
	public revUpdateCardRoom(data){
		var json = ProtocolData.Rev103_10_0;
        json = data;
        var userVo: UserVO = App.DataCenter.UserInfo.getUser(json.userID);
        if(userVo){
            if(json.isCoop){
                userVo.roomCardCoop += json.changeCardNum;
            }else{
                userVo.roomCard += json.changeCardNum;
            }
        }
	}
      
	/**登录服务器成功*/
	public revWLogin(){
		this.gameScene.reconnnect();
	}

    /**
     * 发送互动表情
     * @itemType 表情类型 
     * @toUserid 被施放表情用户ID
     */
    public sendActFace(itemType:number, toUserid:number){
        var data = ProtocolData.Send112_1_0;
        data.itemType = itemType;
        data.toUserid = toUserid;
        App.gameSocket.send(ProtocolHead.Send112_1_0,data);
    }

	 /**接收互动道具*/
	public revActFace(data){
		var json = ProtocolData.Rev112_1_2;
        json = data;
        var burn = json.burn;
        var itemType = json.itemType;
        var sendId = json.sendUserid;
        var revId = json.toUserid;
        var seatID = App.DataCenter.UserInfo.getUser(sendId).seatID;
        var revSeatID = App.DataCenter.UserInfo.getUser(revId).seatID;

        //实时加载互动表情
        App.ResUtils.loadGroup(AssetConst.ActFace,this, ()=>{
            this.gameScene.showActFace(seatID, revSeatID, itemType); 
        },null,10);

        //消耗金币
        var myUserVo: UserVO = App.DataCenter.UserInfo.getMyUserVo();
        var lastGold = myUserVo.gold;
        if(sendId == myUserVo.userID){
           myUserVo.gold -= burn;
           this.gameScene.updatePoint();
           console.log("金币变化:",lastGold,"=>" ,myUserVo.gold);
        }
	} 

    /**领取救济金成功，进入最低匹配场次*/
    public revAlms(){
       
    }

	/**接收互动道具失败*/
	public revActFaceFail(data){
		var json = ProtocolData.Rev112_1_1;
        json = data;
        var retCode = json.retCode; //失败原因， 1 货币不足， 2 玩家和接收玩家不在同一桌子上, 3 道具不存在
        switch(retCode){
            case 1:
                Tips.error("金币不足,无法使用互动道具");
            break;
            case 2:
                Tips.error("发送失败");
            break;
            case 3:
                Tips.error("道具不存在");
            break;
        }
	} 

	/**断线重连*/
	public revReconnection(data){
		var info = ProtocolData.Rev102_2_50;
        info = data;
        App.DataCenter.deskInfo.readData(info.deskInfo);
        var userList = info.userlist;
        if(userList){ //多人时userList才有数据；只有1人时，userList是null...
            var len = userList.length;
            for(var i=0;i<len;i++){
                var toGame = ProtocolData.toGame;
                toGame = JSON.parse(userList[i]);
                var userVO: UserVO = App.DataCenter.UserInfo.getUser(toGame.userid);
                if(userVO == null){
                    userVO = new UserVO();
                    userVO.userID = toGame.userid;
                    App.DataCenter.UserInfo.addUser(userVO);
                }
                userVO.nickName = toGame.nickname;
                userVO.seatID = toGame.deskstation;
                userVO.sex=toGame.sex;
                userVO.headUrl=toGame.avater;
                
            }
        }else{ 
            var userVO: UserVO = App.DataCenter.UserInfo.getUser(info.userid);
            if(userVO == null){
                userVO = new UserVO();
                userVO.userID = info.userid;
                App.DataCenter.UserInfo.addUser(userVO);
            }
            userVO.seatID = info.deskstation;
        }
	} 
      
	/**接收其他玩家登陆，导致玩家离线*/
	public revOtherLogin(){
        console.log("账号在其它设备登录");
        App.gameSocket.close();
        this.onQuitGame();
        var messageBoxB:MessageBox = App.MsgBoxManager.getBoxB();
        messageBoxB.showMsg("您的账号在其他设备登录，已与服务器断开连接。");
	} 

	/**接收创建房间*/
	public revCreateRoom(data){
		var info = ProtocolData.Rev104_1_1;
        info = data;
        if(info.retCode){           
            console.log("创建房间:",info.retCode);
            Tips.error(ErrorCode.getCodeText(ProtocolHead.Rev104_1_1,info.retCode));
            return;
        }
        console.log("创建房间:" + info);
        this.sendFightAgain();
	} 

	/**接收进入房间*/
	public revInRoom(data){
        var info = ProtocolData.Rev102_4_1;
        info = data;
        if(!info.retCode){
            console.log("进入房间:" , info);
            App.DataCenter.roomInfo.readDeskList(info.deskLst);
            App.DataCenter.roomInfo.setCurDesk(info.deskno);
            let cur: DeskInfo = App.DataCenter.roomInfo.getCurDesk();     
            //保存to_game用户数据
            var len = info.userList.length;
            console.log(len+"多少玩家")
            for(var i=0;i<len;i++){
                var to_game = ProtocolData.to_game;
                to_game=JSON.parse(info.userList[i])
                var userVO: UserVO = App.DataCenter.UserInfo.getUser(to_game.userid);
                if(userVO == null){
                    userVO = new UserVO();
                    userVO.userID = to_game.userid;
                    App.DataCenter.UserInfo.addUser(userVO);
                }
                userVO.nickName = to_game.nickname;
                userVO.seatID = to_game.deskstation;
                userVO.headUrl=to_game.avater;
                userVO.sex=to_game.sex;     
                
            }
            
            //重置游戏   
            this.gameScene.reconnnect();
        }else{
            console.log("进入房间:",info.retCode);
            Tips.error(ErrorCode.getCodeText(ProtocolHead.Rev102_4_1,info.retCode));
        }
	} 

	/**接收搜索房间*/
	public revSearchRoom(data){
		var info = ProtocolData.Rev104_2_1;
        info = data;
        console.log("搜索房间:" + info);
        if(info.deskList.length) {
            let deskInfo = ProtocolData.deskInfo;
            deskInfo = info.deskList[0];
            //共付房卡
            if(deskInfo.isCooperate){
                let msgBox=App.MsgBoxManager.getBoxA();    
                msgBox.showMsg("此房间为共付型房间，需要消耗" + deskInfo.needCard+"张房卡(共付型)" );            
                msgBox.ok=()=>{    
                    if(App.DataCenter.UserInfo.httpUserInfo.roomCardCoop){
                        let data = ProtocolData.Send102_4_0;
                        data.deskCode = deskInfo.deskID;
                        App.gameSocket.send(ProtocolHead.Send102_4_0,data);
                    }else{
                        Tips.info("房卡(共付型),不足!!")
                    }
                }
            //独立房卡
            }else{
                let data = ProtocolData.Send102_4_0;
                data.deskCode = deskInfo.deskID;
                App.gameSocket.send(ProtocolHead.Send102_4_0,data);
            }
        } else {
            Tips.error(ErrorCode.getCodeText(ProtocolHead.Rev104_2_1));
        }
	} 

	/**接收通知领取救济金*/
	public revNoticeAlms(){
        //钱少时，并没有收到该命令，而是直接被t出房间。
	} 
	
	/**接收领取救济金结果*/
	public revGetAlms(){
		//TODO 没有用到该命令
	} 
        
    /**接收踢人*/
	public revKickPlayer(data){
		var json = ProtocolData.Rev102_20_1;
        json = data;
        var kickByUserid = json.kickByUserid; //被踢玩家
        var kickCause = json.kickCause;       //踢人理由
        var kickUserid = json.kickUserid;       //踢人玩家
        var myUserID: number = App.DataCenter.UserInfo.getMyUserVo().userID;
        //删除被踢人员的信息
        if(App.DataCenter.UserInfo.isExist(kickUserid)){
            App.DataCenter.UserInfo.deleteUser(kickUserid);
        }

        switch(kickCause){
            case KickCause.MONEY_TOO_LITTLE:    //钱太少
               Tips.info("对不起，由于您金币太少，被请出房间!")
            break;
            case KickCause.MONEY_TOO_MORE:      //钱太多
               Tips.info("对不起，由于您金币太多，被请出房间!")
            break;
            case KickCause.PREPARE_TIME_OUT:    //超时
               Tips.info("对不起，您进入房间超时，被请出房间!")
            break;
        }

	}   
	//接收禁言消息
	private revShutup(data){
        var uid = data.banPostUserID;
        var shutupType = data.type;
        var userid: UserVO = App.DataCenter.UserInfo.getMyUserVo();
        console.log("禁言" + uid + ";"+shutupType+";"+userid.userID);
        //看是否是自己被禁言
        if(uid == userid.userID){
            Tips.info("您被房主狠狠地封住了嘴巴3分钟!")
            var deskInfo:DeskInfo = App.DataCenter.roomInfo.getCurDesk();
            this.gameScene.gagNumber = deskInfo.deskCode;
            this.gameScene.gagChat();
        }else{
            var userList=App.DataCenter.UserInfo.userList;
            for(var key in userList) {
                var user: UserVO = userList[key];
                if(user.userID == uid) {
                    Tips.info("玩家‘" + user.nickName + "’被房主禁言,请文明娱乐，注意言行。")
                }
            }    
        }
        
	}
 
    /**接收金币变化*/
    public revMoneyChange(data){
        var json = ProtocolData.Rev103_6_0;
        json = data;
        var userVO:UserVO = App.DataCenter.UserInfo.getUser(json.userid);
        //台费已经计算在内
//        userVO.gold += (json.money);
        this.gameScene.updatePoint();
//        this.gameScene.saveWinLossMoney(json.userid, json.money);
    }

    /**接收游戏不能站起*/
    public revStandUp(){
        Tips.info("游戏中不能离开");
    }

	/**发送再来一战*/
    public sendFightAgain(){
        var data = ProtocolData.Send104_8_0; 
        data.inviterID = App.DataCenter.UserInfo.getMyUserVo().userID;      //邀请者ID
        data.inviterName = App.DataCenter.UserInfo.getMyUserVo().nickName;  //邀请者名称
        data.deskCode = "";                                                 //邀请进入的房间
        data.deskno = App.DataCenter.deskInfo.deskCode;                     //邀请进入的房间号
        App.gameSocket.send(ProtocolHead.Send104_8_0, data);
    }

    /**接收再来一战*/
    private revFightAgain(data){
        ProtocolData.Rev104_8_0 = data;
        var inviterID = data.inviterID;     //邀请者ID
        var inviterName = data.inviterName; //邀请者名称
        var deskno = data.deskno;           //邀请进入的房间号
        
        var messageBox:MessageBox = App.MsgBoxManager.getBoxA();
        messageBox.showMsg("上一局的房主" + inviterName + ",邀请您再来一战,是否应邀");
        messageBox.ok = ()=>{
            var data = ProtocolData.Send104_2_0
            data.deskCode = deskno;
            App.gameSocket.send(ProtocolHead.Send104_2_0,data);
        }
    }



	/**游戏内断线重连成功*/
    private onSocketConnect(socket:ClientSocket){
        var hallController:HallController = App.getController(HallController.NAME);

        //调度服务器连接成功，去获取游戏服务器
        if (socket == App.serverSocket) {
            App.MsgBoxManager.recycleAllBox();
//            hallController.sendGetGameServer();
        }

        //游戏服务器连接成功，发送登录请求
        if (socket == App.gameSocket) {
//            hallController.sendWLogin();
        }

        //推送服务器连接成功，发送登录请求
        if (socket == App.pushSocket) {
//            hallController.sendPushLogin();
        }
    }
	
	/**socket重连错误*/
    private onSocketError(socket:ClientSocket){
        if(socket != App.gameSocket){
            return;
        }
    }

    /**socket断开*/
    private onSocketClose(socket:ClientSocket){
        console.log(socket.name + " close");

        //停止加载
        App.ResUtils.deleteAllCallBack();

        //断线重连失败
        if(socket == App.serverSocket){
            this.gameScene.quitToHall();
        }

        //非游戏服务器关闭事件，则不处理
        if(socket != App.gameSocket){
            return;
        }

        //未玩过游戏，则直接退出到大厅。因为未玩过游戏的情况下，重连后获取游戏状态服务端是不响应的。所以重连也没用。
        if(this.gameScene.bHavePlay == false){
            this.gameScene.quitToHall();
            var messageBoxB:MessageBox = App.MsgBoxManager.getBoxB();
            messageBoxB.showMsg("网络连接中断。");
            return;
        }
        
        //已玩过游戏，断线，则开始重连
        if(this.gameScene.bHavePlay == true){
            App.serverSocket.startConnect(App.DataCenter.ServerInfo.SERVER_URL,true,1);
        }
    }

    /**开始断线重连*/
    private onStartReconnect(socket:ClientSocket){
        console.log("开始断线重连");
        if(socket != App.serverSocket){
            return;
        }

        //已玩过游戏，才会重连；未玩过游戏，没有游戏数据，重连也没有用，没法恢复桌面
        if(this.gameScene.bHavePlay){
            App.MsgBoxManager.recycleAllBox();
            var messageBox:MessageBox = App.MsgBoxManager.getBoxC();
            messageBox.showMsg("网络不稳定，正在尝试重新连接   ");
            egret.Tween.get(App.gameSocket,{loop:true}).wait(500).call(()=>{
                messageBox.showMsg("网络不稳定，正在尝试重新连接.  ");
            }).wait(500).call(()=>{
                messageBox.showMsg("网络不稳定，正在尝试重新连接.. ");
            }).wait(500).call(()=>{
                messageBox.showMsg("网络不稳定，正在尝试重新连接...");
            });
        }
    }

    /**离开游戏*/
    public onQuitGame(){
//        this.gameScene.resetScene();
//        App.getInstance().sendEvent(HallController.EVENT_SHOW_HALL);
    }
    
    /**禁言返回*/
    private shutupBack(data){
        console.log("禁言返回"+data.isBanPost+"+"+data.lastTime)
        var deskInfo:DeskInfo = App.DataCenter.roomInfo.getCurDesk();
        this.gameScene.gagNumber = deskInfo.deskCode;
        this.gameScene.isGag = data.isBanPost;
        if(data.isBanPost){
            this.gameScene.timeNumber = data.lastTime;
            this.gameScene.gagChat();
        } 
        this.gameScene.gagFunction();
    }
    
    
    /**踢人返回*/
    private kickBack(data){
        switch(data.retCode){
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
    
    /**被踢*/
    private byKick(){        
        App.DataCenter.gameState = GameState.Free
        this.gameScene.resetScene();
        let ha:HallScene = App.SceneManager.getScene(SceneConst.HallScene);
        ha.sendSelfRoom();
        Tips.info("您被房主踢出房间!");
    }
    
    /**聊天失败返回*/
    private chatError(data){
        if(data.retCode == 1){
            this.gameScene.isGag = true;
            this.gameScene.timeNumber = data.lastTime;
            this.gameScene.shutupHint();
        }
    }
    /**解除禁言*/
    private unShutupBack(data){
        for(var i =0;i<this.gameScene.headUIList.length;i++){
            if(this.gameScene.headUIList[i].userID == data.userid){
                this.gameScene.headUIList[i].headShutup.source = "head_shutup1_png";
            }
        }
    }
}