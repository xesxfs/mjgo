/**
 * 游戏界面
 * @author xiongjian 
 * @date 2017/7/3
 */
class ReGameScene extends BaseScene {
    protected ctrl: ReGameController;       //游戏控制模块
    public gameState: GameState;         //游戏状态
    private zhuangFlag: ZhuangFlag;      //庄家标志

    public headPlugin: HeadPlugin        //头像插件
    public footPlugin: FootPlugin       //脚部插件
    public discPlugin: DiscPlugin        //圆盘插件
    public dicePlugin: DicePlugin        //骰子插件
    public rectPlugin: RectPlugin        //麻将相关插件
    public roomTypePlugin: RoomTypePlugin  //房间类型插件
    public tuoGuanPlugin: TuoGuanPlugin  //托管插件
    public zhongNiaoPlugin: ZhongNiaoPlugin //中鸟插件
    public readyPlugin:ReadyPlugin;         //准备插件
    public btnGroupPlugin:BtnGroupPlugin;   //按钮组合插件
    public gangFenPlugin:GangFenPlugin;     //杠分插件


    private swapCardUI: SwapCardUI;       //换牌UI
    public swapCardGroup: eui.Group;  //换牌Group

    private leftCardLimit: number = 108; //当前牌局剩余牌数最大值
    public curLeftCard: number = 0;     //当前剩余牌数
    public curPlayCount: number = 0;     //当前剩余局数
    public maxPlayCount: number = 0;     //总局数
    private bTuoGuan: boolean = false;   //是否托管状态
    public bHavePlay: boolean = false;   //是否已经开始游戏过。未开始过，退出游戏时直接离开；开始过，则需要解散房间后离开

    //----------动画、计时时间-----------
    private outTimer: DateTimer = new DateTimer(1000); //出牌计时器
    private recordTime: DateTimer = new DateTimer(1000);//录音计时器
    private autoReadyTimer: DateTimer = new DateTimer(1000);//自动准备计时器
    private dismissTimer: egret.Timer = new egret.Timer(1000, 180); //解散房间3分钟cd
    public readyTime: number = 2;          //自动准备时间
    private actTime: number = 8;          //吃(碰杠)计时
    private outTime: number = 15;         //普通出牌时间
    private curOutTimeLimit = 0;         //当前出牌计时
    private zhawaitTime: number = 2000;  //扎鸟字等待时间
    private longguTime: number = 2600; //龙骨动画停留时间
    private zhaTime: number = 2000;    //扎鸟停留时间
    private waitZhaTime: number = 500;   //扎鸟特效等待时间
    private moveZhuangTime: number = 500; //移动庄家标志时间ms

    private playerNum: number = 4;       //玩家人数
    public isMan: boolean = false;    //桌子是否人满
    // private zhuangSeat: number;           //庄家桌位号
    // private zhuangPos: UserPosition;     //庄家位置
    // private curGetCard: Card;            //当前摸牌
    // private curOutCard: Card;            //当前出牌
    // private curTouchCard: Card;          //玩家当前点击出的牌
    // private curActCard: number = 0;      //当前玩家吃碰杠胡的那张牌的牌值 
    // public curActPlayer: UserPosition;   //当前行动玩家
    private qishouData: any        //起手胡数据

    //--------------逻辑--------------
    public cardFactory: CardFactory;      //麻将牌工厂
    public cardLogic: CardLogic;          //麻将牌逻辑

    public constructor() {
        super();
        this.skinName = "reGameSceme";
    }

    /**组件创建完毕*/
    protected childrenCreated() {
        //初始化完毕
        this.ctrl.inited = true;
        App.EventManager.addEvent(EventConst.GameConfigChange, this.gameConfigChange, this);
        App.EventManager.addEvent(EventConst.DiceOver, this.diceOVer, this);
        //初始化工厂和逻辑
        this.cardFactory = CardFactory.getInstance();
        this.cardLogic = CardLogic.getInstance();

        this.discPlugin.setCdLabel("");              //设置cd文本
        //加载资源  
        this.loadAsset();

        //测试
        this.showSwapCard();
    }

    /**添加到场景中*/
    protected onEnable() {

        console.log("进入游戏_________________________________________");


        this.ctrl.registerSocket();
        this.ctrl.registerEvent();

        //底部菜单栏
        if (App.DataCenter.roomInfo.roomType == RoomType.FriendRoom) {
            this.changeBottomMenu(true);
        }
        else {
            this.changeBottomMenu(false);
        }

        //非断线重连，就重置头像
        if (!App.getController(HallController.NAME).isReconnection) {
            //重置头像准备
            this.headPlugin.resetHeadUI();
        }

        //进入的房间类型
        this.sendRoomType();
        //请求游戏状态
        this.sendGameState();

        App.SoundManager.playBGM(SoundManager.bgm);

    }

    /**从场景中移除*/
    protected onRemove() {

    }


    ////////////////////////////////////////////////
    //------------------[发牌流程]-------------------
    ////////////////////////////////////////////////

    //显示庄家、风位 (游戏开始)
    public showZhuang() {
        console.log("显示庄家");
        //发送游戏状态
        // App.EventManager.sendEvent(EventConst.GameStateChange, GameState.Playing);
        var json = ProtocolData.Rev100806;
        var seatID = json.seatID;
        var dongPos = this.cardLogic.getDongPos(seatID, 4);
        console.log("dongPos" + dongPos);
        this.discPlugin.showDiceFengWei(dongPos); //东南西北四字
        //隐藏所有庄
        for (let i = 0; i < 4; i++) {
            this.headPlugin.headUIList[i].headzhuang.visible = false;
        }


        //显示庄家
        this.rectPlugin.zhuangPos = this.cardLogic.changeSeat(seatID);
        this.rectPlugin.zhuangSeat = json.seatID;
        this.zhuangFlag || (this.zhuangFlag = new ZhuangFlag());
        this.zhuangFlag.x = App.StageUtils.halfStageWidth + 96 - 10;
        this.zhuangFlag.y = App.StageUtils.halfStageHeight;
        this.headPlugin.addChild(this.zhuangFlag);
        var headUI = this.headPlugin.headUIList[this.rectPlugin.zhuangPos];
        var headImg = headUI.headImg;

        //发牌
        egret.Tween.get(this).wait(this.moveZhuangTime).call(() => {
            egret.Tween.get(this.zhuangFlag).to({ x: headUI.x + headImg.x + 96 * 0.8, y: headUI.y + headImg.y }, this.moveZhuangTime);
            //动画结束去掉flag;直接显示头像上的庄
            this.zhuangFlag.visible = false;
            headUI.headzhuang.visible = true;
            this.dealCard();
            this.discPlugin.reduceLeftCard(4 * 13);
        }, this);
        // console.log("handR", this.handRectList[1], "?1000takeT=", this.takeRectList[1].x, "outR=", this.outRectList[1].x, "eatR=", this.eatRectList[1].x)
    }

    //发牌
    public dealCard() {
        //移除所有弹框
        // App.PanelManager.closeAllPanel();
        // App.MsgBoxManager.recycleAllBox();
        console.log("开始发牌");
        for (var i = 0; i < this.playerNum; i++) {
            //排列牌之前，将摸牌拿出，防止摸牌被放入手牌位置
            if (this.rectPlugin.curGetCard != null && this.rectPlugin.curGetCard.userPos == i) {
                this.rectPlugin.handCardList[this.rectPlugin.curGetCard.userPos].pop();
                this.rectPlugin.showHandCard(i);
                this.rectPlugin.handCardList[this.rectPlugin.curGetCard.userPos].push(this.rectPlugin.curGetCard);
            } else {
                this.rectPlugin.showHandCard(i);
            }
        }
        this.rectPlugin.saveHandCardPosY();
        this.discPlugin.showLight(this.rectPlugin.zhuangPos);
        if (this.gameState == GameState.Qishouhu) {
            console.log("起手胡啦");
            this.showQiShouHu();

        }
    }

    /**接收发牌（游戏开始）*/
    public revDealCard(data) {
        console.log("接收发牌")
        this.gameState = GameState.DealCard;
        this.headPlugin.setGameHeadPos();  //设置头像、庄的位移、位置
        this.rectPlugin.createHandCard(data);//生成手牌
        this.readyPlugin.hideAllReady();      //隐藏准备图标
        this.discPlugin.showDisc();          //显示中间圆盘
        this.discPlugin.showLeftLabel(this.leftCardLimit, this.curPlayCount); //显示剩余牌数
        App.PanelManager.close(PanelConst.InvitePanelT);//关闭邀请面板
        //第一局，需要滚骰子
        var diceList = ProtocolData.Rev100806.dice1;
        if (diceList == null) {
            this.gameState = GameState.Playing;
            this.showZhuang();
        } else {
            var dice1 = ProtocolData.Rev100806.dice1;
            var dice2 = ProtocolData.Rev100806.dice2;
            this.dicePlugin.playDiceAnim(dice1, dice2);
        }
    }

    /**玩家摸牌*/
    public revGetCard(data, bAnim: boolean = true) {

        this.gameState = GameState.Playing; //游戏从庄家摸第一张牌开始
        var json = ProtocolData.Rev180_53_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var cardValue = json.cardList[0];
        var rect: egret.Point = this.rectPlugin.takeRectList[pos];
        var card: Card;

        card = this.cardFactory.getHandCard(cardValue, pos);

        //处理摸牌
        this.rectPlugin.handCardList[pos].push(card);
        card.x = rect.x;
        card.y = rect.y;
        card.initPosY = card.y;
        if (pos == UserPosition.R) {
            this.rectPlugin.cardGroup.addChildAt(card, 0);
        } else {
            this.rectPlugin.cardGroup.addChild(card);
        }
        this.rectPlugin.curGetCard = card;
        this.rectPlugin.curActPlayer = pos;
        //更新界面
        this.discPlugin.showLight(pos);
        this.discPlugin.reduceLeftCard();
        this.startOutTimer(this.outTime);
        this.rectPlugin.hideActUI();
        // console.log("接收摸牌,位置:",pos,"牌值:",cardValue,"状态:",json.state);

        //其他动作处理
        if (json.state != 0) {
            //自己摸牌,设置可以出牌
            if (pos == UserPosition.Down) {
                if (this.cardLogic.checkActState(json.state, ACT_state.Act_NormalDo)) {
                    this.rectPlugin.bAllowOutCard = true;
                }
                this.rectPlugin.curActCard = cardValue;
                bAnim && this.rectPlugin.showActUI(json.state);
            }

        }
    }

    //通知玩家叫牌  (能不能吃、碰、杠、胡) 180, 55, 0
    public revNoticeAct(data) {
        var json = ProtocolData.Rev180_55_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        this.rectPlugin.curActCard = json.card;
        this.rectPlugin.curActPlayer = pos;
        console.log("通知玩家叫牌,位置:", pos, "牌值:", json.card, "状态:", json.state);
        if (pos == UserPosition.Down) {    //通知的是自己，则显示操作面板
            this.rectPlugin.showActUI(json.state);
        }
        this.startOutTimer(this.actTime);
    }

    /**
     * 响应玩家操作 (其他玩家吃、碰等，广播给另外3玩家) 180, 56, 0
     * @data 操作数据
     * @bAnim 是否播放动画、声音
     */
    public revAct(data, bAnim: boolean = true) {
        var json = ProtocolData.Rev180_56_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var cardValue = json.cardList[0];
        var cardList = json.cardList;
        var act: ACT_act = json.act;
        var actParam = json.actParam;
        this.rectPlugin.hideActUI();
        var userVo: UserVO = App.DataCenter.UserInfo.getUserBySeatID(json.seatID);
        //因为没有自摸字段，这里判断是否自摸

        if (act == ACT_act.Act_Hu) {
            if (this.rectPlugin.curGetCard && (pos == this.rectPlugin.curGetCard.userPos)) {
                App.SoundManager.playAct(ACT_act.Act_zimo, userVo.sex);
            } else {
                App.SoundManager.playAct(ACT_act.Act_Hu, userVo.sex);
            }
        } else {
            App.SoundManager.playAct(act, userVo.sex);
        }

        // console.log("接收动作,位置:",pos,"动作:",act,"data:",json);
        switch (act) {
            case ACT_act.Act_NormalDo: //出牌位置
                bAnim && App.SoundManager.playOutCard(cardValue, userVo.sex);
                this.rectPlugin.actOutCard(pos, cardValue, bAnim);
                this.rectPlugin.hideAllActTip();
                this.rectPlugin.hideAllOutEffect();
                bAnim && this.rectPlugin.showOutEffect(cardValue, pos);
                break;

            case ACT_act.Act_Pass:    //过

                break;
            case ACT_act.Act_Hu:      //胡
                this.rectPlugin.showActTip(act, pos);
                break;
            case ACT_act.Act_Peng:    //碰牌
            case ACT_act.Act_Chi:     //吃牌
            case ACT_act.Act_Gang:    //杠
            case ACT_act.Act_AnGang:  //暗杠
                this.discPlugin.showLight(pos);
                this.startOutTimer(this.outTime);
                this.rectPlugin.offHandCard(pos, 1);//偏移手牌
                this.rectPlugin.eatHandler(act, pos, cardList, actParam);
                bAnim && this.rectPlugin.showActTip(act, pos);
                if (pos == UserPosition.Down) {
                    this.rectPlugin.bAllowOutCard = true;
                }
                break;
        }
    }

    //通知玩家出牌 180, 57, 0 
    public revNoticeOutCard(data) {
        var json = ProtocolData.Rev180_57_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        console.log("通知玩家出牌,位置:", pos);
        this.discPlugin.showLight(pos);
        if (pos == UserPosition.Down) {
            this.rectPlugin.bAllowOutCard = true;
        }
    }


   //显示起手胡特效
    public showQiShouHu() {
        let index;
        var data = ProtocolData.Rev100900;
        var len = data.info.length;

        //将起手胡数据重现排序，离庄最近的人排在最前面
        var huList = [];
        for (var i = 0; i < 4; i++) {
            var zseat = (this.rectPlugin.zhuangSeat + i) % 4
            for (var j = 0; j < len; j++) {
                if (data.info[j].seatID == zseat) {
                    huList.push(data.info[j]);
                    break;
                }
            }
        }
        this.qishouData = huList[0];
        var dbI = 0;
        for (let i = 0; i < len; i++) {

            index = i;
            var json = ProtocolData.QiShouHU;
            json = data.info[i];
            console.log(json);
            var dice1 = json.dice.dice1;
            var dice2 = json.dice.dice2;
            var pos = CardLogic.getInstance().changeSeat(json.seatID);
            var userVO: UserVO = App.DataCenter.UserInfo.getMyUserVo();
            if (pos == userVO.userPos) {
                App.SoundManager.playAct(ACT_act.Act_zimo, userVO.sex);
            } else {
                App.SoundManager.playAct(ACT_act.Act_Hu, userVO.sex);
            }

            egret.Tween.get(this).wait(3000 * i).call(() => {
                var pos = CardLogic.getInstance().changeSeat(data.info[dbI].seatID);
                console.log("pos==" + pos);
                this.rectPlugin.showDbHu(pos);
                dbI++;
            });
        }
        //杠分
        egret.Tween.get(this).wait(3500).call(() => {

            var pointList = json.loseWinPoint;
            for (let i = 0; i < pointList.length; i++) {
                let seat = CardLogic.getInstance().changeSeat(i);
                var point = pointList[i];

                var userVo: UserVO = App.DataCenter.UserInfo.getUserBySeatID(i);

                //test 
                if (!(point || userVo)) {
                    console.log("数据异常，不显示加减积分");
                }

                if (userVo) {

                    this.gangFenPlugin.showGang(seat, point);
                }

            }
        })
        // console.log("我起手胡了" + pos);




        //不清楚骨骼动画什么时候结束，这里做延迟
        egret.Tween.get(this).wait(this.zhaTime * index).call(() => {
            this.rectPlugin.showDeskCard()//摊开手牌
            this.dicePlugin.playQiShouDice(dice1, dice2);
        }, this);


    }

    //扎鸟
    public showZhaNiao() {
        //播放动画后显示中鸟
        var data = ProtocolData.Rev100900;
        let len = data.info.length;

        let json = ProtocolData.QiShouHU;
        json = this.qishouData;


        var dice1 = json.dice.dice1;
        var dice2 = json.dice.dice2;
        var huSeat = json.seatID;
        var zhuangSeat = this.rectPlugin.zhuangSeat;


        if (dice1 && dice2) {
            let off1 = (dice1 - 1) % 4;
            let off2 = (dice2 - 1) % 4;
            let diceNo1 = (huSeat + off1) % 4;
            let pos1 = CardLogic.getInstance().changeSeat(diceNo1);
            let diceNo2 = (huSeat + off2) % 4;
            let pos2 = CardLogic.getInstance().changeSeat(diceNo2);
            console.log("中鸟位置" + pos1 + "    " + pos2);

            this.rectPlugin.showBirdFly(pos1);
            egret.Tween.get(this).wait(500).call(() => {
                this.rectPlugin.showBirdFly(pos2, true);
            });
            var result = ProtocolData.Rev180_58_0;
            result.dice = [];   // 清空数据
            result.zhongNiaolist = [];
            result.huSeatList = [];
            //将数据扎鸟保存
            result.isQiShouHu = true;
            result.dice.push(dice1);
            result.dice.push(dice2);
            result.zhongNiaolist.push(diceNo1);
            result.zhongNiaolist.push(diceNo2);
            result.zhuangSeat = zhuangSeat;
            for (let i = 0; i < len; i++) {
                //把所有起手胡的人放进huseatlist
                result.huSeatList.push(data.info[i].seatID);
            }

        }

        egret.Tween.get(this).wait(this.zhaTime).call(() => {
            this.zhongNiaoPlugin.hideZhongNiaoUI();
            this.gameState = GameState.GameOver;
            var json = ProtocolData.Rev180_58_0;
            this.revGameOver(json);
        }, this);



    }

    //接收新换的牌
    public revSwapCard(data) {
        var json = ProtocolData.Rev100822;
        json = data;
        console.log("新换得的牌:", json);
        var pos = this.cardLogic.changeSeat(json.seatID);
        var handList = this.rectPlugin.handCardList[pos];
        var len = handList.length;
        //非回放时，返回的数据是整付手牌，只取选中的两张替换
            for (var i = 0; i < len; i++) {
                var card: Card = handList[i];
                if (card.cardValue == this.swapCardUI.selectValue0) { //将手牌替换
                    card.setHandSkin(this.swapCardUI.selectValue1, pos);
                    break;
                }
            }
            this.rectPlugin.showHandCard(pos);
            if (i == len) {
                console.error("换牌出错");
                return;
            }
    }



    //接收测试看牌
    public revLookCard(data) {
        var json = ProtocolData.Rev180_103_0;
        json = data;
        var cardValue = json.card;
        if (this.swapCardUI.selectBtn3.cardImg.texture == null) {
            this.swapCardUI.selectBtn3.setOutSkin(cardValue, 0);
        }
    }


    /**游戏配置修改*/
    public gameConfigChange() {
        ProtocolData.gameConfig = App.DataCenter.roomInfo.getCurDesk().gameConfig;
        var userList = App.DataCenter.UserInfo.userList;
        this.readyPlugin.hideAllReady();
        this.readyPlugin.showReadyBtn();
        this.headPlugin.updatePoint();
    }

    /**判断进入房间的类型 */
    public sendRoomType() {
        let roomType = App.DataCenter.roomInfo.roomType;
        console.log("roomType" + roomType);
        this.roomTypePlugin.sendRoomType(roomType);
        //房间类型  1 是好友房，2是匹配房
        if (roomType == RoomType.FriendRoom) {
            //重置重连开关
            if (App.getController(HallController.NAME).isReconnection) {
                App.getController(HallController.NAME).isReconnection = false;
            }
            console.log("headPlugin+++", this.headPlugin);
            //重置头像
            this.headPlugin.resetHeadUI();
            //设置title
            this.footPlugin.setTitle(roomType);
            //房主显示
            this.roomTypePlugin.deskOwnerSet(this.isDeskOwner());
            //显示房间号
            if (App.DataCenter.deskInfo.deskCode) {
                this.roomTypePlugin.setRoomNumber("" + App.DataCenter.deskInfo.deskCode);
                this.footPlugin.setRoomNumber("" + App.DataCenter.deskInfo.deskCode);
            }

        } else if (roomType == RoomType.MatchRoom) {
            if (!App.getController(HallController.NAME).isReconnection) {
                //重置头像
                this.headPlugin.resetHeadUI();
            }
            let len = 0;
            //显示房间玩家信息
            let userList = App.DataCenter.UserInfo.userList;
            for (let key in userList) {
                len += 1;
                let user = <UserVO>userList[key];
                this.headPlugin.updateUserHead(user);
            }

            this.roomTypePlugin.loadingSet(len);
            //设置title
            this.footPlugin.setTitle(roomType);

            if (!App.getController(HallController.NAME).isReconnection) {
                //自动准备
                App.getController(HallController.NAME).isReconnection = false;
                console.log("重连状态", App.getController(HallController.NAME).isReconnection);
                this.startReadyTimer(this.readyTime);
            }


        }
    }


    //请求获取游戏状态
    private sendGameState() {
        console.log("请求获取游戏状态");
        //暂时屏蔽超时退回大厅回调
        //App.LoadingLock.lock(this.quitToHall,this);
        App.LoadingLock.lock(null, this);
        this.ctrl.sendGameState();
    }




    /**重置游戏，一局结束后，重置游戏界面和数据*/
    public resetGame() {

        this.bTuoGuan = false;
        this.rectPlugin.resetUI();//麻将插件重置
        this.discPlugin.resetUI();//圆盘重置
        this.headPlugin.restUI();//头像重置
        this.btnGroupPlugin.restUI();//按钮组合重置
        this.readyPlugin.restUI();//准备按钮组合
        this.zhongNiaoPlugin.hideZhongNiaoUI();           //隐藏中鸟UI
        this.dicePlugin.hideDiceAnim();//隐藏骰子
        this.hideAllTuoGUan();
        this.hideResultPanel();
        this.stopOutTimer();
    }

    /**重置场景，所有局结束后，重置界面和数据*/
    public resetScene() {
        this.ctrl.unRegisterSocket();
        this.ctrl.unRegisterEvent();
        this.resetGame();
        this.readyPlugin.hideAllReady();
        this.headPlugin.hideAllHeadUI();
        this.stopDismissTimer();

        App.ResUtils.deleteAllCallBack();
        App.PanelManager.closeAllPanel();
        App.MsgBoxManager.recycleAllBox();

        //删除用户信息在最后，不然大厅的战绩没法儿显示...
        //这里已经出现异步删除玩家信息情况,导致战绩信息显示不全,...未解决...
        App.DataCenter.UserInfo.deleteAllUserExcptMe();
    }

    /**结束掷骰子 */
    private diceOVer() {

    }

    /**显示换牌*/
    public showSwapCard() {
        if (App.DataCenter.debugInfo.isDebug || App.DataCenter.secret) {
            this.swapCardUI || (this.swapCardUI = new SwapCardUI());
            this.swapCardUI.init(this);
        }
    }


    //显示托管
    public showTuoGuan(pos: UserPosition) {
        if (pos == UserPosition.Down) {
            this.bTuoGuan = true;
            this.tuoGuanPlugin.tuoGuanGroup.visible = true;
            // this.tuoGuanGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuoGuanTouch, this);
        } else {
            (<HeadUI>this.headPlugin.headUIList[pos]).showTuoGuanIcon();
        }
    }


    //隐藏托管
    public hideTuoGuan(pos: UserPosition) {
        if (pos == UserPosition.Down) {
            this.bTuoGuan = false;
            this.tuoGuanPlugin.hideGroup();
        } else {
            this.headPlugin.hideTuoGuan(pos);
            this.hideUnconect(pos);
        }
    }

    //显示掉线
    public showUnConnect(pos: UserPosition) {
        this.hideTuoGuan(pos);
        this.headPlugin.showUnConnect(pos);
    }

    //隐藏掉线
    public hideUnconect(pos: UserPosition) {
        this.headPlugin.hideUnconect(pos);
    }


    //隐藏所有人托管
    private hideAllTuoGUan() {
        this.bTuoGuan = false;
        for (var i = 0; i < 4; i++) {
            this.hideTuoGuan(i);
        }
    }

    //接收游戏状态
    public revGameState(data) {
        App.LoadingLock.unlock();

        var json = ProtocolData.Rev100803;
        json = data;
        var deskStatus = json.deskStatus;
        var gameSeatInfo = json.gameSeatInfo;
        var lastCardNum = json.lastCardNum;
        let count = 0;
        //游戏中就把当前局数加1
        if (deskStatus == GS_GAME_STATION.GS_GAME_PLAYING) {
            count = json.curPlayCount + 1;
        } else {
            count = json.curPlayCount;
        }
        var curPlayCount = count;
        var maxPlayCount = json.maxPlayCount;
        console.log("最大局数" + json.maxPlayCount);
        //设置游戏规则
        ProtocolData.gameConfig = json.gameConfig;

        //设置剩余牌数，非游戏状态，该值没有
        if (json.lastCardNum) {
            this.curLeftCard = lastCardNum;
        } else {
            this.curLeftCard = this.leftCardLimit;
        }
        var max;
        if (maxPlayCount == 9999) {
            max = "-";
        } else {
            max = maxPlayCount;
        }
        //设置好友房标题局数
        // this.t_jushu.text = "" + curPlayCount + "/" + max;
        //设置局数
        this.curPlayCount = curPlayCount;
        this.maxPlayCount = maxPlayCount;
        //设置是否已进行过游戏
        this.bHavePlay = (this.curPlayCount > 0 || deskStatus == GS_GAME_STATION.GS_GAME_PLAYING);
        //保存玩家状态
        this.saveGameSeatInfo(gameSeatInfo);
        console.log("接收游戏状态:", deskStatus, "游戏当前局数:", this.curPlayCount);

        switch (deskStatus) {
            case GS_GAME_STATION.GS_WAIT_SETGAME:  //等待设置游戏
                this.gameState = GameState.Free;
                break;
            case GS_GAME_STATION.GS_WAIT_ARGEE:    //等待玩家同意游戏
                if (this.curPlayCount > 0) {
                    this.gameState = GameState.GameOver;
                } else {
                    this.gameState = GameState.Free;
                }

                this.gsWaitAgree(data);
                break;
            case GS_GAME_STATION.GS_GAME_PLAYING:  //游戏中 
                this.gameState = GameState.Playing;
                this.gsGamePlaying(data);
                break;
            case GS_GAME_STATION.GS_GAME_FINSHED:  //游戏结束
                this.gameState = GameState.GameOver;
                break;
        }
    }

    //保存游戏位置信息中的用户id等数据 (由于进入房间之前，就已经传递了用户信息，这里重复传送不保存)
    private saveGameSeatInfo(gameSeatInfo) {
        var len = gameSeatInfo.length;
        for (var i = 0; i < len; i++) {
            var seatInfo = ProtocolData.GameSeatInfo;
            seatInfo = gameSeatInfo[i];
            var userVo: UserVO = App.DataCenter.UserInfo.getUser(seatInfo.userID);
            if (userVo == null) {
                userVo = new UserVO();
                userVo.userID = seatInfo.userID;
                App.DataCenter.UserInfo.addUser(userVo);
            }
            userVo.seatID = seatInfo.seatID;
            userVo.state = seatInfo.status;
            userVo.point = seatInfo.point;

        }
    }

    //进入邀请界面
    private gsWaitAgree(data) {
        var json = ProtocolData.Rev100803;
        json = data;
        var deskStatus = json.deskStatus;
        console.log("进入邀请界面，状态:", deskStatus);
        switch (deskStatus) {
            case GS_GAME_STATION.GS_WAIT_SETGAME: //等待玩家设置游戏
                break;
            case GS_GAME_STATION.GS_WAIT_ARGEE:   //等待玩家同意游戏
                this.startInvite();
                break;
            default:
                break;
        }
    }

    //游戏中
    private gsGamePlaying(data) {
        var json = ProtocolData.Rev100803;
        json = data;
        var deskStatus = json.deskStatus;

        switch (deskStatus) {
            case GS_GAME_STATION.GS_GAME_PLAYING: //游戏中，断线重连进来，重现当前游戏场景
                this.gameState = GameState.Playing;
                App.DataCenter.gameState = GameState.Playing;
                this.changeAllUserSeat();
                this.resumeDesk(data);
                this.roomTypePlugin.hideFriendRoom();
                this.roomTypePlugin.hideLoading();
                this.readyPlugin.hideAllReady();
                break;
            default:
                break;
        }
    }

    //开始进入邀请
    private startInvite() {
        this.gameState = GameState.Ready;
        this.changeAllUserSeat();         //转换已进入房间玩家的seatID
        this.showInviteUI();              //显示邀请
        this.headPlugin.setInviteUserHead();         //显示已进入房间的玩家头像
        this.readyPlugin.setUserReady();              //设置已进入房间玩家准备状态  
    }

    //转换已进入玩家的seatID
    private changeAllUserSeat() {
        var userList = App.DataCenter.UserInfo.userList;
        for (var key in userList) {
            userList[key].userPos = this.cardLogic.changeSeat(userList[key].seatID);
        }
    }



    //显示邀请面板
    private showInviteUI() {
        //一轮打完头像归位
        if (this.curPlayCount == this.maxPlayCount) {
            return;
        }
        //如果开始过游戏就不显示规则面板
        if (App.DataCenter.roomInfo.roomType == RoomType.FriendRoom) {
            if (this.bHavePlay) {
                this.roomTypePlugin.hideFriendRoom();
                this.discPlugin.showDisc();
                var json = ProtocolData.Rev100803;
                var bankerSeat = json.bankerSeat;
                var dongPos = this.cardLogic.getDongPos(bankerSeat, 4);
                this.discPlugin.showDiceFengWei(dongPos); //东南西北四字
                this.headPlugin.setPlayingHead();//设置头像



            }
        }

    }

    //游戏结束 180, 58, 0
    public revGameOver(data) {
        let ulist = App.DataCenter.UserInfo.userList;
        //隐藏托管
        this.hideAllTuoGUan();

        //保存数据
        ProtocolData.Rev180_58_0 = data;
        var json = ProtocolData.Rev180_58_0;
        //判断是否流局
        var bNoEnd: boolean = true;
        var len = json.resultList.length;
        for (var i = 0; i < len; i++) {
            var resultInfo = ProtocolData.resultInfo;
            resultInfo = json.resultList[i];
            if (resultInfo.curPiont != 0) {
                bNoEnd = false;
                break;
            }
        }
        //如果流局，不扎鸟，游戏直接结算
        if (bNoEnd) {
            this.gameState = GameState.GameOver;
            setTimeout(() => {
                this.rectPlugin.showDeskCard();//摊开手牌
            }, 1000);
        }

        if (this.gameState != GameState.GameOver && this.gameState != GameState.Qishouhu) {
            console.log("游戏状态", this.gameState);
            setTimeout(() => {
                this.rectPlugin.showDeskCard();//摊开手牌
            }, 1000);
        }

        //扎完鸟更改游戏状态为结束，然后显示结算面板
        if (this.gameState == GameState.GameOver) {

            //游戏结束将所有人准备状态改为false;
            for (let key in ulist) {
                var userVo: UserVO = ulist[key];
                userVo && (userVo.setState(PLAYER_STATE.READY, false));
            }

            // App.EventManager.sendEvent(EventConst.GameStateChange, GameState.GameOver);
            console.log("游戏结束:", data);
            this.gameState = GameState.GameOver;
            var json = ProtocolData.Rev180_58_0;
            json = data;
            //判断分享
            // this.ctrl.sendInsertShare();
            //保存数据
            ProtocolData.Rev180_58_0 = data;
            this.curPlayCount = json.curPlayCount;
            this.maxPlayCount = json.maxPlayCount;
            this.stopOutTimer();
            //玩家结算状态
            var userList = App.DataCenter.UserInfo.userList;
            for (var key in userList) {
                var userVO: UserVO = userList[key];
            }


            //判断是否流局
            var bNoEnd: boolean = true;
            var len = json.resultList.length;
            for (var i = 0; i < len; i++) {
                var resultInfo = ProtocolData.resultInfo;
                resultInfo = json.resultList[i];
                if (resultInfo.curPiont != 0) {
                    bNoEnd = false;
                    break;
                }
            }

            //判断赢家是否是自己
            var bWinIsMy: boolean = false;
            var mySeatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
            for (var i = 0; i < len; i++) {
                var resultInfo = ProtocolData.resultInfo;
                resultInfo = json.resultList[i];
                if (resultInfo.fan != null && resultInfo.seatID == mySeatID) {
                    bWinIsMy = true;
                    break;
                }
            }

            this.showResultPanel();

            //显示准备按钮
            if (this.curPlayCount == this.maxPlayCount) {
                if (this.isDeskOwner()) {
                    //续局
                    this.btnGroupPlugin.showBtnGroup(2);
                } else {
                    //继续
                    this.btnGroupPlugin.showBtnGroup(1);
                }

            } else {
                //准备
                this.btnGroupPlugin.showBtnGroup(0);
            }

            // this.showReadyBtn();

            //更新积分
            var len = json.resultList.length;
            for (var i = 0; i < len; i++) {
                var resultInfo = ProtocolData.resultInfo;
                resultInfo = json.resultList[i];
                var seat = resultInfo.seatID;
                var userVO: UserVO = App.DataCenter.UserInfo.getUserBySeatID(seat);
                userVO.point = userVO.point + resultInfo.curPiont;



            }
            this.headPlugin.updatePoint();

            //删除所有的Tween
            egret.Tween.removeAllTweens();
        }
    }

    /**接收起手胡 */
    public revQiShouHu(data) {
        var json = ProtocolData.Rev100900;
        json = data;
        ProtocolData.Rev100900 = data;
        //将数据保存，等发完牌再显示
        this.gameState = GameState.Qishouhu;

    }

    /**
     * 接收游戏结束扎鸟
     */
    public revZhaNiao(data) {
        var json = ProtocolData.Rev100901;
        json = data;
        let cardList = json.cardList;
        // let huSeat = json.seatID;
        let zhuangSeat = this.rectPlugin.zhuangSeat;
        this.gameState = GameState.ZhaNiao;
        egret.Tween.get(this).wait(this.zhawaitTime).call(() => {
            this.rectPlugin.showZhaDb();
        })

        //不清楚动画的结束时间，做延迟
        egret.Tween.get(this).wait(this.longguTime + this.zhawaitTime).call(() => {
            var len = cardList.length
            //更新牌数量
            this.discPlugin.reduceLeftCard(len);
            this.zhongNiaoPlugin.addZhongNiao(cardList);

        });

        //死亡回调 扎鸟特效
        egret.Tween.get(this).wait(this.longguTime + this.zhawaitTime + this.zhaTime).call(() => {

            var result = ProtocolData.Rev180_58_0; //结算数据
            result.zhongNiaolist = [];
            result.niaoPai = [];

            for (let i = 0; i < cardList.length; i++) {
                let offset = (cardList[i] % 16 - 1) % 4;
                let seat = (zhuangSeat + offset) % 4;
                let pos = CardLogic.getInstance().changeSeat(seat);
                console.log("seatPos" + seat);
                result.zhongNiaolist.push(seat);//将中鸟玩家添加近结算数据
                result.niaoPai.push(cardList[i]);
                var waitTime = this.waitZhaTime * i;
                //扎鸟特效 
                egret.Tween.get(this).wait(waitTime).call(() => {
                    this.rectPlugin.showBirdFly(pos);
                });

            }



        });

        //死亡回调2 游戏结算
        let waitTime = this.longguTime + this.zhawaitTime + this.zhaTime + this.zhaTime + this.waitZhaTime * cardList.length;
        egret.Tween.get(this).wait(waitTime).call(() => {
            var result = ProtocolData.Rev180_58_0; //结算数据
            this.zhongNiaoPlugin.hideZhongNiaoUI();
            this.gameState = GameState.GameOver;
            result.zhuangSeat = zhuangSeat;
            result.isQiShouHu = false;
            this.revGameOver(result);
        });

    }

    /**检查自己是否房主*/
    public isDeskOwner() {
        if (App.DataCenter.roomInfo.roomType == 1) {//如果是好友方就返回
            return (App.DataCenter.UserInfo.getMyUserVo().userID == App.DataCenter.deskInfo.ownerID);
        } else {
            return false;
        }
    }

    //退出到大厅
    public quitToHall() {
        this.ctrl.onQuitGame();
    }

        //广播玩家叫牌 (显示倒计时8s)
    public revNoticeJiao() {
        this.startOutTimer(this.actTime);
    }

    //-----------------------------------
    //-----------计时器------------------
    //-----------------------------------

    //开始出牌计时器
    private startOutTimer(time) {
        if (App.DataCenter.roomInfo.roomType == RoomType.FriendRoom) { //好友场不倒计时
            return;
        }
        this.outTimer.addEventListener(egret.TimerEvent.TIMER, this.onOutTime, this);
        this.outTimer.repeatCount = time;
        this.curOutTimeLimit = time;
        this.outTimer.reset();
        this.outTimer.start();
        this.discPlugin.setCdLabel(NumberTool.formatTime(time) + "");
    }

    //出牌计时处理
    private onOutTime(e: egret.TimerEvent) {
        if (this.outTimer.currentCount > this.curOutTimeLimit) {
            this.stopOutTimer();
            return;
        }
        var count = this.curOutTimeLimit - this.outTimer.currentCount;
        this.discPlugin.setCdLabel(NumberTool.formatTime(count) + "");
        if (count <= 3) {
            App.SoundManager.playEffect(SoundManager.warn);
        }
    }

    //停止出牌计时
    private stopOutTimer() {
        this.outTimer.removeEventListener(egret.TimerEvent.TIMER, this.onOutTime, this);
        this.outTimer.stop();
        this.discPlugin.setCdLabel("");
    }

    //开始解散计时器
    private startDismissTimer() {
        this.dismissTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.stopDismissTimer, this);
        this.dismissTimer.reset();
        this.dismissTimer.start();
    }

    //停止解散计时器
    private stopDismissTimer() {
        this.dismissTimer.removeEventListener(egret.TimerEvent.COMPLETE, this.stopDismissTimer, this);
        this.dismissTimer.stop();
    }

    //开始自动准备倒计时
    public startReadyTimer(time) {
        this.autoReadyTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onAutoReadyTime, this);
        this.autoReadyTimer.repeatCount = time;
        this.autoReadyTimer.reset();
        this.autoReadyTimer.start();
    }

    //停止自动准备倒计时
    private stopReadyTimer() {
        this.autoReadyTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onAutoReadyTime, this);
        this.autoReadyTimer.stop();
    }

    //计时结束自动准备
    private onAutoReadyTime() {
        this.autoReady();
    }

    //自动准备
    private autoReady() {
        this.resetGame();
        this.rectPlugin.onInitPosition();
        this.sendReady();
    }

    //发送准备 108_1_0
    public sendReady() {
        this.ctrl.sendReady();
    }

    //显示结算面板
    public showResultPanel() {
        console.log("显示结算面板");
        this.rectPlugin.removeEvent();
        App.PanelManager.open(PanelConst.GameResultPanel, () => {
            console.log("结算面板添加到舞台");
            this.readyPlugin.hideReadyBtn();
            var resultPanel: GameResultPanel = App.PanelManager.getPanel(PanelConst.GameResultPanel);
            // resultPanel.continueBt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.autoReady,this);
            resultPanel.updateInfo(ProtocolData.Rev180_58_0);
            resultPanel.resultScoller.visible = true;
            resultPanel.zongScroller.visible = false;
            // this.hideZhuaMaPanel();
            this.headPlugin.updatePoint();
        }, this, false);
    }

    //隐藏结算面板
    private hideResultPanel() {
        var resultPanel: ResultPanel = App.PanelManager.close(PanelConst.ResultPanel);
        if (resultPanel) {
            this.readyPlugin.showReadyBtn();
            resultPanel.continueBt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.autoReady, this);
        }
    }

    //恢复桌子场景
    private resumeDesk(data) {
        this.rectPlugin.onInitPosition()
        var json = ProtocolData.Rev100803;
        json = data;
        var bankerSeat = json.bankerSeat;
        var gameSeatInfo = json.gameSeatInfo;
        var oniCard = json.oniCard;
        var dongFengPos;  //东风位玩家位置
        var fengWei;      //当前风位
        var fengQuan = json.fengQuan;
        var changeCnt = json.changeCnt;

        var curCanDoAct = json.curCanDoAct;//游戏动作状态
        this.rectPlugin.curActCard = json.pre_op_card;//最后一张打出的牌
        var pre_speaker_seat = json.pre_speaker_seat; // 最后一个出牌的人
        // var speakSeat = (pre_speaker_seat + 1) % 4; //最后一个出牌人的下家
        // var lastpos = CardLogic.getInstance().changeSeat(speakSeat);//当前出牌人pos
        var lastpos = 0;

        //房间号
        //清理所有牌
        this.rectPlugin.clearAllCard();
        //头像
        var userList: any = App.DataCenter.UserInfo.userList;
        for (var key in userList) {
            this.headPlugin.updateUserHead(userList[key]);
        }
        //牌
        var seatInfoLen = gameSeatInfo.length;
        for (var i = 0; i < seatInfoLen; i++) {
            var seatInfo = ProtocolData.GameSeatInfo;
            seatInfo = gameSeatInfo[i];
            var seatID = seatInfo.seatID;
            var pos = this.cardLogic.changeSeat(seatID);
            if (pos == App.DataCenter.UserInfo.getMyUserVo().userPos) {
                var card: Card = this.cardFactory.getHandCard(seatInfo.last_card, pos);
                if (seatInfo.handCards.length % 3 == 2) {
                    this.rectPlugin.curGetCard = card;
                } else {
                    this.rectPlugin.curGetCard = null;
                }

            }

            if (seatInfo.handCards.length % 3 == 2) {
                lastpos = pos;
            }

            //吃牌
            var chiCards = seatInfo.chiCards;
            if (chiCards != null) {

                var chiCardLen = chiCards.length;
                var chiNum = chiCardLen / 3;
                for (var j = 0; j < chiNum; j++) {
                    var chiList = [chiCards[j * 3], chiCards[j * 3 + 1], chiCards[j * 3 + 2]]
                    ArrayTool.sortArr(chiList); //排序
                    this.rectPlugin.addCardToEat(chiList, pos, ACT_act.Act_Chi, 0);
                }
            }
            //碰牌
            var pengCards = seatInfo.pengCards;
            if (pengCards != null) {
                var pengCardLen = pengCards.length;
                for (var j = 0; j < pengCardLen; j++) {
                    var cardValue = pengCards[j];
                    var pengList = [cardValue, cardValue, cardValue];
                    this.rectPlugin.addCardToEat(pengList, pos, ACT_act.Act_Peng, 0);
                }
            }
            //杠牌
            var gangCards = seatInfo.gangCards;
            if (gangCards != null) {
                var gangCardLen = gangCards.length;
                for (var j = 0; j < gangCardLen; j++) {
                    var cardValue = gangCards[j];
                    var gangList = [cardValue, cardValue, cardValue, cardValue];
                    this.rectPlugin.addCardToEat(gangList, pos, ACT_act.Act_Gang, 0);
                }
            }

            //暗杠
            var anGangCards = seatInfo.anGangCards;
            if (anGangCards != null) {
                var anGangCardLen = anGangCards.length;
                for (var j = 0; j < anGangCardLen; j++) {
                    var cardValue = anGangCards[j];
                    var anGangList = [cardValue, cardValue, cardValue, cardValue];
                    this.rectPlugin.addCardToEat(anGangList, pos, ACT_act.Act_AnGang, 0);
                }
            }
            //出牌
            var playOutCards = seatInfo.playOutCards;
            if (playOutCards != null) {
                var outCardLen = playOutCards.length;
                for (j = 0; j < outCardLen; j++) {
                    var card: Card = this.cardFactory.getOutCard(playOutCards[j], pos);
                    console.log("出牌：", playOutCards[j], "——————位置：", pos)
                    this.rectPlugin.addCardToOut(pos, card, false);
                }
            }
            //手牌
            var handCards = seatInfo.handCards;
            if (handCards != null) {
                var handCardLen = handCards.length;
                for (var j = 0; j < handCardLen; j++) {
                    var cardValue = handCards[j];
                    var card: Card = this.cardFactory.getHandCard(cardValue, pos);
                    this.rectPlugin.handCardList[pos].push(card);
                }

                //如果有14张手牌，允许出牌
                let len = chiCards.length + handCardLen + pengCards.length * 3 + gangCards.length * 4 + anGangCards.length * 4;
                console.log("handcards", len);

                //吃碰杠后手牌偏移
                var actlen = Math.floor(handCardLen / 3);
                console.log("actlen", actlen);
                switch (actlen) {
                    case 0:
                        this.rectPlugin.offHandCard(pos, 4);
                        break;
                    case 1:
                        this.rectPlugin.offHandCard(pos, 3);
                        break;
                    case 2:
                        this.rectPlugin.offHandCard(pos, 2);
                        break;
                    case 3:
                        this.rectPlugin.offHandCard(pos, 1);
                        break;
                    case 4:
                        break;
                }

                var speakeLen = handCardLen % 3;
                if (speakeLen == 2) {
                    if (pos == UserPosition.Down) {
                        this.rectPlugin.bAllowOutCard = true;
                    }
                    this.rectPlugin.resumeResetHandCards(pos);

                } else {

                    this.rectPlugin.showHandCard(pos);
                }


            }
            this.rectPlugin.saveHandCardPosY();
        }
        //设置庄家
        this.rectPlugin.zhuangPos = this.cardLogic.changeSeat(bankerSeat);
        this.rectPlugin.zhuangSeat = bankerSeat;

        var dongPos = this.cardLogic.getDongPos(bankerSeat, 4);
        this.discPlugin.showDiceFengWei(dongPos); //东南西北四字

        this.rectPlugin.showActUI(curCanDoAct);    //设置动作
        this.discPlugin.showLight(lastpos);           //设置灯
        this.headPlugin.showZhuangFlag(this.rectPlugin.zhuangPos);
        //显示圆盘
        this.discPlugin.showDisc();
        //设置剩余牌数
        this.discPlugin.showLeftLabel(this.curLeftCard, this.curPlayCount);
        //隐藏当前出牌指示
        this.rectPlugin.outFlag.hide();
        //开始计时
        this.startOutTimer(this.outTime);
    }

    //加载资源
    private loadAsset() {
        //加载游戏其他资源
        App.ResUtils.loadGroupQuiet(AssetConst.Game, 5); //游戏
        App.ResUtils.loadGroupQuiet(AssetConst.Result, 4); //结算

        //加载打牌语音
        if (App.SoundManager.allowPlayEffect) {
            if (App.SoundManager.isGuangDongSpeak) {
                App.ResUtils.loadGroupQuiet(AssetConst.Sound_GuangDong);
            } else {
                App.ResUtils.loadGroupQuiet(AssetConst.Sound_PuTong);
            }
            App.ResUtils.loadGroupQuiet(AssetConst.Sound_Other);
        }
        //加载背景音乐
        if (App.SoundManager.allowPlayBGM) {
            App.ResUtils.loadGroupQuiet(AssetConst.Sound_BGM, 2);
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
    }

    //加载资源完成
    private onGroupComplete(event: RES.ResourceEvent) {
        if (event.groupName == AssetConst.Sound_BGM) {
            App.SoundManager.playBGM(SoundManager.bgm);
        } else if (event.groupName == AssetConst.Card) {
            this.showSwapCard();
        }
    }

    /**底部菜单变换 */
    public changeBottomMenu(bSkin: boolean) {
        var bottomMenus: BottomMenus;
        if (bSkin) {
            bottomMenus = App.BottomMenuManager.getBoxB();
        }
        else {
            bottomMenus = App.BottomMenuManager.getBoxC();
        }
        bottomMenus.showMenu(this);
        bottomMenus.ok = (bottomName) => {
            this.onMenusTouch(bottomName);
        }
    }

    /**点击底部菜单栏*/
    private onMenusTouch(bottomName: BottomName) {
        switch (bottomName) {
            case BottomName.mall:
                this.ctrl.sendShopListReq(1);
                break;
            case BottomName.knapsack:
                this.ctrl.getBackpack();
                break;
            case BottomName.set:
                App.PanelManager.open(PanelConst.SetPanel, null, this, true, true, null, true);
                break;
            case BottomName.record:
                this.ctrl.send101004();
                break;
            case BottomName.tc:
                this.ctrl.SendTCRoom();
                this.ctrl.sendHeartMsg();//发送心跳
                this.stopReadyTimer();//停止自动准备计时
                break;
            case BottomName.talk:
                App.PanelManager.open(PanelConst.TapePanel);
                break;
            case BottomName.take:
                App.PanelManager.open(PanelConst.RulePanel, null, this, true, true, null, true);
                break;
            default:
                break;
        }
    }

}