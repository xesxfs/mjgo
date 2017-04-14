var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *回放逻辑
 *@author chenkai
 *@date 2016/8/18
 *
 * 录像流程：
 * 1 大厅-战绩-输入分享码-返回录像数据-跳转到游戏，设置播放回放
 * 2 设置4人userList数据
 * 3 revGameState  模拟玩家全部准备、设置房间规则等
 * 4 revStartGame  模拟骰子数据
 * 5 revDealCard   模拟发牌，开始播放骰子，确定庄家，风圈风圈、局数，发牌等
 * 6 revGetCard    模拟摸牌
 * 7 revOutCard    模拟出牌
 * 8 revAct        模拟吃碰杠胡
 * 9 ...循环直到没有操作
 * 10 revGameOver   模拟游戏结束  (取消该步骤)
 * 11 玩家点击结算面板操作后退出   (取消该步骤)
 *
 * 控制面板:
 * 1 状态位控制当前回放状态
 * 2 在前进和后退时，跳过出牌、摸牌、吃碰杠动画
 */
var ReplayLogic = (function () {
    function ReplayLogic() {
        this.replayTimer = new egret.Timer(1000); //录像播放计时器
        this.totalActIndex = 0; //总步数,act数组长度       目前版本没有要求，所以隐藏了
        this.curActIndex = 0; //当前步数，当前重现的act数组索引
        this.replayControl = new ReplayControl();
        this.ctrl = App.getController(GameController.NAME);
        this.open();
    }
    /**
     * 开始回放
     * @gameScene 游戏场景
     * @replayData 回放数据
     */
    ReplayLogic.prototype.play = function (gameScene, revData) {
        var _this = this;
        var data = JSON.parse(revData);
        //设置GameScene
        this.gameScene = gameScene;
        this.gameScene.gameUIGroup.touchChildren = false;
        //读取回放数据
        var json = ProtocolData.replay;
        json = data;
        this.replayData = data;
        //显示回放控制
        this.gameScene.replayGroup.addChild(this.replayControl);
        this.replayControl.playBtn.visible = false;
        this.replayControl.pauseBtn.visible = true;
        this.replayControl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplayControl, this);
        this.replayStatus = ReplayStatus.Busy;
        this.totalActIndex = json.GA.length;
        this.curActIndex = 0;
        //添加用户数据
        this.setUserInfo();
        //模拟用户接收状态
        this.revGameState();
        //模拟游戏开始
        this.revStartGame();
        //模拟发牌
        this.revDealCard();
        //模拟打牌
        egret.Tween.get(this).wait(3000).call(function () {
            _this.startReplayTimer();
            _this.replayStatus = ReplayStatus.Free;
        });
    };
    //播放结束
    ReplayLogic.prototype.replayOver = function () {
        this.gameScene.bReplay = false;
        this.gameScene.gameUIGroup.touchChildren = true;
        this.resumeMyUserInfo();
        this.stopReplayTimer();
        this.replayControl.hide();
        this.replayControl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplayControl, this);
    };
    //模拟用户数据
    ReplayLogic.prototype.setUserInfo = function () {
        var replay = ProtocolData.replay;
        replay = this.replayData;
        //把自己从userList列表中移除
        var userInfo = App.DataCenter.UserInfo;
        //        userInfo.deleteUser(userInfo.httpUserInfo.userID);
        //临时保存httpUserInfo，录像播放完毕后重置
        this.tempMyUserInfo = userInfo.httpUserInfo;
        //删除所有原本存储的用户信息
        App.DataCenter.UserInfo.deleteAllUser();
        //设置录像中4人数据
        var piLen = replay.PI.length;
        for (var i = 0; i < piLen; i++) {
            var data = replay.PI[i];
            var userVo = userInfo.getUser(data.userid);
            if (userVo == null) {
                userVo = new UserVO();
                userVo.userID = data[1];
                userInfo.addUser(userVo);
            }
            userVo.nickName = data[0];
            userVo.seatID = data[2];
            userVo.sex = data[3];
            if (App.serverSocket.gameID == Game_ID.GoldRoom) {
                userVo.gold = data[4];
            }
            else {
                userVo.point = data[4];
            }
            userVo.headUrl = data[6];
        }
        //如果4人中有1人是自己，则设置httpUserInfo是自己；4人中没有自己，则设置最后一个玩家userVo为httpUserInfo
        var myUserID = App.DataCenter.UserInfo.getMyUserVo().userID;
        App.DataCenter.UserInfo.httpUserInfo = userVo;
        var userList = App.DataCenter.UserInfo.userList;
        for (var key in userList) {
            if (userList[key].userID == myUserID) {
                App.DataCenter.UserInfo.httpUserInfo = userList[key];
                break;
            }
        }
    };
    //模拟用户接收状态
    ReplayLogic.prototype.revGameState = function () {
        var replay = ProtocolData.replay;
        replay = this.replayData;
        var gameState = ProtocolData.Rev180_2_0;
        gameState.bankerSeat = replay.GI.bseat;
        gameState.curPlayCount = 0;
        gameState.deskStatus = GS_GAME_STATION.GS_WAIT_ARGEE;
        gameState.fengQuan = replay.GI.fq;
        gameState.gameConfig = replay.GC;
        gameState.gameSeatInfo = []; //空数组就可以
        //gameState.lastCardNum = ;    //为null时，会自动设置为最大值
        gameState.maxPlayCount = 1;
        //gameState.oniCard = ;        //无用
        this.ctrl.revGameState(gameState);
    };
    //模拟游戏开始
    ReplayLogic.prototype.revStartGame = function () {
        var replay = ProtocolData.replay;
        replay = this.replayData;
        var startGame = ProtocolData.Rev180_51_0;
        startGame.diceList = replay.GI.dice;
        startGame.fengQuan = replay.GI.fq;
        startGame.fengWei = replay.GI.fw;
        startGame.seatID = replay.GI.bseat;
        //startGame.userID = ;   //用不着
        this.ctrl.revStartGame(startGame);
    };
    //模拟发牌
    ReplayLogic.prototype.revDealCard = function () {
        var replay = ProtocolData.replay;
        replay = this.replayData;
        var dealCard = ProtocolData.Rev180_52_0;
        dealCard.deleaveCard = [];
        for (var i = 0; i < 4; i++) {
            var deleveCardInfo = {};
            var userInfo = replay.PI[i];
            deleveCardInfo.userID = userInfo[1];
            deleveCardInfo.seatID = userInfo[2];
            deleveCardInfo.cardList = userInfo[5];
            dealCard.deleaveCard[i] = deleveCardInfo;
        }
        this.ctrl.revDealCard(dealCard);
    };
    //模拟抓马
    ReplayLogic.prototype.revBuyHorse = function () {
        var replay = ProtocolData.replay;
        replay = this.replayData;
        var buyHorse = ProtocolData.Rev180_59_0;
        if (replay.GI.maima != null) {
            buyHorse.cardList = replay.GI.maima[0].ma;
            buyHorse.hitCardList = replay.GI.maima[0].hitMa;
            buyHorse.hitNum = replay.GI.maima[0].ma.hit;
            buyHorse.seatID = replay.GI.maima[0].seat;
            this.ctrl.revBuyHorse(buyHorse);
        }
    };
    //模拟游戏结束
    ReplayLogic.prototype.revGameOver = function () {
        var replay = ProtocolData.replay;
        replay = this.replayData;
        var gameOver = ProtocolData.Rev180_58_0;
        gameOver.curPlayCount = 1; //缺失，暂时设置为1
        gameOver.curTime = replay.ET;
        //gameOver.dianPaoSeat = ;    //缺失
        gameOver.isDianPao = true; //缺失,暂时设置为true
        gameOver.maxPlayCount = 1; //缺失，暂时设置为1
        gameOver.resultList = replay.SI.resultList;
        this.ctrl.revGameOver(gameOver);
    };
    //开始录像计时
    ReplayLogic.prototype.startReplayTimer = function () {
        this.replayTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.replayTimer.reset();
        this.replayTimer.start();
    };
    //计时处理
    ReplayLogic.prototype.onTimerHandler = function () {
        this.playAct();
    };
    //停止录像播放
    ReplayLogic.prototype.stopReplayTimer = function () {
        console.log("停止播放");
        this.replayTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.replayTimer.stop();
    };
    //播放操作
    ReplayLogic.prototype.playAct = function (bAnim) {
        if (bAnim === void 0) { bAnim = true; }
        if (this.replayStatus == ReplayStatus.Busy) {
            return;
        }
        this.replayStatus = ReplayStatus.Busy;
        var replay = ProtocolData.replay;
        replay = this.replayData;
        if (this.curActIndex < this.totalActIndex) {
            var actInfo = replay.GA[this.curActIndex];
            this.curActIndex++;
            this.replayControl.setProgress(this.curActIndex / this.totalActIndex);
            console.log("playAct数据:", actInfo);
            //摸牌
            if (actInfo[1] == ACT_act.Act_GetCard) {
                var getCard = ProtocolData.Rev180_53_0;
                getCard.seatID = actInfo[0];
                getCard.cardList = actInfo[2];
                getCard.state = 0; //什么操作不用做
                this.ctrl.revGetCard(getCard);
            }
            else if (actInfo[1] == ACT_act.Act_ChangeCard) {
                var swapCard = ProtocolData.Rev180_101_0;
                swapCard.seatID = actInfo[0];
                swapCard.cardList = actInfo[2];
                this.ctrl.revSwapCard(swapCard);
            }
            else {
                var revAct = ProtocolData.Rev180_56_0;
                revAct.seatID = actInfo[0];
                revAct.act = actInfo[1];
                revAct.cardList = actInfo[2];
                revAct.actParam = actInfo[4];
                this.ctrl.revAct(revAct, bAnim);
                //杠分
                if (actInfo[5] != null) {
                    var gangResult = ProtocolData.Rev180_61_0;
                    gangResult.actParam = revAct.actParam;
                    gangResult.gangSeatID = revAct.seatID;
                    gangResult.lossWinPoint = actInfo[5];
                    //gangResult.preGangSeatID = ;   //被杠的玩家位置，没啥用
                    this.ctrl.revGangResult(gangResult, bAnim);
                }
            }
        }
        else {
            this.stopReplayTimer();
        }
        this.replayStatus = ReplayStatus.Free;
    };
    //撤销动作
    ReplayLogic.prototype.cancelAct = function () {
        if (this.replayStatus == ReplayStatus.Busy) {
            return;
        }
        this.replayStatus = ReplayStatus.Busy;
        var replay = ProtocolData.replay;
        replay = this.replayData;
        if (this.curActIndex > 0) {
            this.curActIndex--;
            this.replayControl.setProgress(this.curActIndex / this.totalActIndex);
            var actInfo = replay.GA[this.curActIndex];
            //撤销摸牌
            if (actInfo[1] == ACT_act.Act_GetCard) {
                var getCard = ProtocolData.Rev180_53_0;
                getCard.seatID = actInfo[0];
                getCard.cardList = actInfo[2];
                getCard.state = 0; //什么操作不用做
                this.gameScene.cancelGetCard(getCard);
            }
            else if (actInfo[1] == ACT_act.Act_ChangeCard) {
                var swapCard = ProtocolData.Rev180_101_0;
                swapCard.seatID = actInfo[0];
                swapCard.cardList = actInfo[2];
                this.gameScene.cancelSwapCard(swapCard);
            }
            else {
                var revAct = ProtocolData.Rev180_56_0;
                revAct.seatID = actInfo[0];
                revAct.act = actInfo[1];
                revAct.cardList = actInfo[2];
                revAct.actParam = actInfo[4];
                var lastSeat;
                if (this.curActIndex - 1 > 0) {
                    lastSeat = replay.GA[this.curActIndex - 1][0];
                }
                this.gameScene.cancelAct(revAct, lastSeat);
                //杠分
                if (actInfo[5] != null) {
                    var gangResult = ProtocolData.Rev180_61_0;
                    gangResult.actParam = revAct.actParam;
                    gangResult.gangSeatID = revAct.seatID;
                    gangResult.lossWinPoint = actInfo[5];
                    //gangResult.preGangSeatID = ;   //被杠的玩家位置，没啥用
                    this.ctrl.revGangResult(gangResult);
                }
            }
        }
        this.replayStatus = ReplayStatus.Free;
    };
    //恢复自己的用户数据
    ReplayLogic.prototype.resumeMyUserInfo = function () {
        App.DataCenter.UserInfo.httpUserInfo = this.tempMyUserInfo;
        //由于以前版本（以前版本少excluroomCode字段）userVO信息存在不一致，所以需要删除掉所有的user重新赋值
        App.DataCenter.UserInfo.deleteAllUser();
        App.DataCenter.UserInfo.addUser(this.tempMyUserInfo);
    };
    //回放控制
    ReplayLogic.prototype.onReplayControl = function (e) {
        switch (e.target) {
            case this.replayControl.nextBtn:
                this.onNext();
                break;
            case this.replayControl.lastBtn:
                this.onLast();
                break;
            case this.replayControl.playBtn:
                this.onPlay();
                break;
            case this.replayControl.pauseBtn:
                this.onPause();
                break;
            case this.replayControl.quitBtn:
                //将自己的信息重新拿回
                this.resumeMyUserInfo();
                App.EventManager.sendEvent(EventConst.GameStateChange, GameState.Free);
                App.DataCenter.replayInfo.bReplay = false;
                this.gameScene.reconnnect();
                this.gameScene.voiceBtn.visible = true;
                var ha = App.SceneManager.getScene(SceneConst.HallScene);
                ha.sendSelfRoom();
                break;
            case this.replayControl.optionBtn:
                App.PanelManager.open(PanelConst.SetPanel);
                break;
            case this.replayControl.openReplayBtn:
                this.open();
                break;
            case this.replayControl.shrinkBtn:
                this.shrink();
                break;
        }
    };
    ReplayLogic.prototype.shrink = function () {
        var _this = this;
        var replayW = this.replayControl.width / 2;
        var thisW = App.StageUtils.stageWidth;
        egret.Tween.get(this.replayControl)
            .to({ x: thisW - this.replayControl.shrinkBtn.width }, 500, egret.Ease.quadIn)
            .call(function () {
            _this.replayControl.openReplayBtn.visible = true;
            _this.replayControl.shrinkBtn.visible = false;
        });
    };
    ReplayLogic.prototype.open = function () {
        var _this = this;
        var replayW = this.replayControl.width / 2;
        var thisW = App.StageUtils.halfStageWidth;
        egret.Tween.get(this.replayControl)
            .to({ x: thisW - replayW }, 500, egret.Ease.quadOut)
            .call(function () {
            _this.replayControl.openReplayBtn.visible = false;
            _this.replayControl.shrinkBtn.visible = true;
        });
    };
    //下一步
    ReplayLogic.prototype.onNext = function () {
        console.log("下一步,status:", this.replayStatus);
        if (this.replayStatus == ReplayStatus.Busy) {
            return;
        }
        if (this.replayControl.pauseBtn.visible == true) {
            this.replayTimer.reset();
            this.replayTimer.start();
        }
        this.playAct(false);
    };
    //上一步
    ReplayLogic.prototype.onLast = function () {
        console.log("上一步,status:", this.replayStatus);
        if (this.replayStatus == ReplayStatus.Busy) {
            return;
        }
        if (this.replayControl.pauseBtn.visible == true) {
            this.replayTimer.reset();
            this.replayTimer.start();
        }
        this.cancelAct();
    };
    //播放
    ReplayLogic.prototype.onPlay = function () {
        console.log("播放");
        this.startReplayTimer();
        this.replayControl.playBtn.visible = false;
        this.replayControl.pauseBtn.visible = true;
    };
    //暂停
    ReplayLogic.prototype.onPause = function () {
        console.log("暂停");
        this.stopReplayTimer();
        this.replayControl.playBtn.visible = true;
        this.replayControl.pauseBtn.visible = false;
    };
    return ReplayLogic;
}());
__reflect(ReplayLogic.prototype, "ReplayLogic");
/**回放状态*/
var ReplayStatus;
(function (ReplayStatus) {
    /**空闲*/
    ReplayStatus[ReplayStatus["Free"] = 0] = "Free";
    /**繁忙*/
    ReplayStatus[ReplayStatus["Busy"] = 1] = "Busy";
})(ReplayStatus || (ReplayStatus = {}));
//# sourceMappingURL=ReplayLogic.js.map