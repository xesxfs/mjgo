/**
 * 游戏界面
 * @author chenkai 
 * @date 2016/6/28
 */
class GameScene extends BaseScene {
    protected ctrl: GameController;       //游戏控制模块

    private gameSceneBg: eui.Image;      //游戏背景
    //-----------桌面UI------------

    private voiceUI: VoiceUI;             //语音提示
    private zhuangFlag: ZhuangFlag;      //庄家标志
    public voiceBtn: eui.Button;         //语音按钮
    private leftCardLabel: eui.Label;     //剩余多少张
    //    private leftJuLabel: eui.Label;       //剩余多少局
    private leftJuPreLabel: eui.Label;    //剩局前缀
    private fengQuanLabel: eui.Label;     //风圈
    public selectActUI: SelectActUI;      //选择操作面板
    private cdLabel: eui.BitmapLabel;     //cd倒计时文本
    private outFlag: OutFlagUI;           //当前出牌指示箭头
    private readyBtn: eui.Group;          //准备按钮
    private toHallBtn: eui.Group;         //返回大厅按钮
    private eatComboUI: EatComboUI;       //吃牌组合
    //    private optionMenu: OptionMenu;       //左上下拉菜单
    private winEffect: WinEffect;         //赢特效
    private loseEffect: LoseEffect;       //输特效
    private liuJuEffect: LiuJuEffect;     //流局特效
    private swapCardUI: SwapCardUI;       //换牌UI
    //    private gameSceneBg: eui.Image;       //游戏场景背景
    public zsBtn: eui.Button;             //赠送房间按钮
    public inviteGroup: eui.Group;          //邀请Group
    private inviteBtn: eui.Button;        //邀请按钮
    private deskLogo: eui.Image;          //桌子上Logo
    private overShutupGroup: eui.Group;     //踢人、禁言Group

    //------------Card定位----------- 
    private handRectList = [];   //手牌位置
    //    private myHandRectList = []; //自己手牌的上面一排位置
    private takeRectList = [];   //摸牌位置
    private outRectList = [];    //出牌位置(第一行)
    private out1RectList = [];   //出牌位置(第二行)
    private out2RectList = [];   //出牌位置(第三行)
    private eatRectList = [];    //吃(碰杠)牌位置
    private hand0_start1;        //定位自己手牌(第一行)
    private hand0_start;         //定位手牌(第二行)
    private hand1_start;
    private hand2_start;
    private hand3_start;
    private locateGet0;          //定位摸牌
    private locateGet1;
    private locateGet2;
    private locateGet3;
    private out0_start;          //定位出牌
    private out1_start;
    private out2_start;
    private out3_start;
    private out0_start1;         //定位出牌第二行
    private out1_start1;
    private out0_start2;
    private out1_start2;
    private out2_start1;
    private out2_start2;
    private out3_start2;
    private out3_start1;
    private eat0_start;          //定位吃牌(碰杠)
    private eat1_start;
    private eat2_start;
    private eat3_start;


    private testChatId: eui.Label;   //聊天文字显示

    private handInvalXList = [-72,0,37,0];     //手牌排序间隔
    private handInvalYList = [0,20,0,-20];
    private outInvalXList = [34,0,34,0];   //出牌排序间隔
    private outInvalYList = [0,-35,0,35];
    private eatInvalXList = [72,0,36,0];    //吃(碰杠)牌排序间隔
    private eatInvalYList = [0,35,0,35];
    private multiEatInvalXList = [8,0,4,0];    //吃(碰杠)牌堆间隔
    private multiEatInvalYList = [0,10,0,10];
    private gangInvalXList = [-144,0,72,0];   //杠牌时，第4张牌位置偏移 
    private ganeInvalYList = [-26,60,-10,-72];

    //-----------头像----------------
    public headUIList: Array<HeadUI> = new Array<HeadUI>();     //所有玩家头像列表

    private headUIPointXlist = [0,600,600,0];       //开始游戏后个人头像X坐标
    private headUIPointYlist = [820,720,180,285];    //开始游戏后个人头像Y坐标
    private headScaleX = 0.7;   //游戏开始之后头像X缩小
    private headScaleY = 0.7;   //游戏开始之后头像Y缩小

    //----------各种列表-------------
    private actTipList: Array<ActTipUI> = new Array<ActTipUI>(); //所有玩家操作提示列表
    public handCardList = [];   //所有玩家手牌列表[pos][Card]
    private outList = [];        //所有玩家出牌列表[pos][Card]
    private eatList = [];        //所有玩家碰、杠牌列表 [pos][count][Card]
    private eatCount = [];       //所有玩家吃牌次数[pos][number]
    private pengCount = [];      //所有玩家碰牌次数[pos][number]
    private gangCount = [];      //所有玩家杠牌次数[pos][number]
    private anGangCount = [];    //所有玩家暗杠次数[pos][number]
    public readyList = [];       //所有玩家准备图标
    private redDiscList = [];    //圆盘红色指示块 
    private fengList = [];       //风位字列表
    private eatComboList = [];   //吃牌组合列表 [n][cardValue]
    private gangComboList = [];  //杠牌组合列表 [n][cardValue]
    private faceList = [];       //表情列表
    private commLabelList = [];  //常用语文本
    private outEffectList = [];  //出牌效果List [n][group]
    private diceAnimList = [];   //骰子动画列表
    private gangZhengList = [];  //杠正分
    private gangFuList = [];     //杠负分
    private gangFenYList = [];   //杠分的y轴位置
    private actFaceUIList = [];  //动作表情UI
    public winLossMoneyList = [];//金币场结算的最终金币。由103_6_0获取结算金币，而不是180_58_0获取结算金币。
    public gameKickList = [];   //踢人List
    public gameShutupList = [];  //禁言Lit
    
    //-----------图层------------
    public gameUIGroup: eui.Group;    //游戏UIGroup
    public topGroup: eui.Group;       //顶层Group
    private footGroup: eui.Group;     //底层Group
    private cardGroup: eui.Group;     //手牌Group
    private floatGroup: eui.Group;    //悬浮Group
    private headGroup: eui.Group;     //头像Group
    private optionGroup: eui.Group;   //设置Group
    private readyGroup: eui.Group;    //准备图标Group
    private discGroup: eui.Group;     //中间圆盘Group
    private juGroup: eui.Group;       //剩余多少盘多少局Group
    private tipGroup: eui.Group;      //打牌提示Group
    private rectGroup: eui.Group;     //rect Group
    private outGroup: eui.Group;      //出牌Group，防手牌遮挡
    private chatGroup: eui.Group;     //聊天Group
    private tuoGuanGroup: eui.Group;  //托管Group
    private outEffectGroup: eui.Group;//出牌效果Group 
    private outFlagGroup: eui.Group;  //出牌指示Group
    private diceGroup: eui.Group;     //骰子Group
    private gangFenGroup: eui.Group;  //杠分Group
    private actFaceGroup: eui.Group;  //动作表情Group
    public swapCardGroup: eui.Group;  //换牌Group
    public replayGroup: eui.Group;    //回放菜单Group

    //--------------逻辑--------------
    public cardFactory: CardFactory;      //麻将牌工厂
    public cardLogic: CardLogic;          //麻将牌逻辑
    public replayLogic: ReplayLogic;      //回放逻辑

    //------------游戏变量--------------
    private zhuangPos: UserPosition;     //庄家位置
    private bAllowOutCard: boolean;      //是否允许出牌
    private curGetCard: Card;            //当前摸牌
    private curOutCard: Card;            //当前出牌
    private curTouchCard: Card;          //玩家当前点击出的牌
    private curActCard: number = 0;      //当前玩家吃碰杠胡的那张牌的牌值 
    public curActPlayer: UserPosition;   //当前行动玩家
    private playerNum: number = 4;       //玩家人数
    private pengLimit: number = 3;       //碰牌数量，3张相同能碰
    private outRowLimit: number = 7;    //出牌时，一行的限制牌数
    private leftCardLimit: number = 136; //当前牌局剩余牌数最大值
    private curLeftCard: number = 0;     //当前剩余牌数
    public curPlayCount: number = 0;     //当前剩余局数
    public maxPlayCount: number = 0;     //总局数
    private bTuoGuan: boolean = false;   //是否托管状态
    public bHavePlay: boolean = false;   //是否已经开始游戏过。未开始过，退出游戏时直接离开；开始过，则需要解散房间后离开
    public bReplay: boolean = false;     //是否是回放
    public bShowMatchInfo: boolean = false;//是否显示战绩信息，战绩要求显示到大厅里去了...保存退到大厅时，要不要显示战绩
    public replayData;                  //回放数据
    private bAllowDismiss: boolean = true; //是否允许解散，3分钟cd
    public chatRecordStr: any[];  //聊天记录
    public gameState: GameState;         //游戏状态

    //----------动画、计时时间-----------
    private outTimer: DateTimer = new DateTimer(1000); //出牌计时器
    private recordTime: DateTimer = new DateTimer(1000);//录音计时器
    private dismissTimer: egret.Timer = new egret.Timer(1000,180); //解散房间3分钟cd
    private actTime: number = 8;          //吃(碰杠)计时
    private outTime: number = 15;         //普通出牌时间
    private curOutTimeLimit = 0;         //当前出牌计时
    private moveZhuangTime: number = 500; //移动庄家标志时间ms
    private outMoveTime: number = 300;    //出牌时，牌移动时间ms
    private chatShowtTime: number = 5000; //聊天显示时间ms
    private outEffectTime: number = 3000; //出牌效果显示时间ms
    private lightFlashTime: number = 1000;  //中间圆盘光的闪烁时间ms
    private cardUpTime: number = 100;     //牌弹起和缩回的时间ms
    private diceStayTime: number = 2000;  //筛子播放完成后停留的时间ms
    /**禁言倒计时 */
    private gagTimer: egret.Timer = new egret.Timer(1000,180);
    /**倒计时 */
    public timeNumber: number = 180;
    /**是否被禁言 */
    public isGag: boolean = false;
    /**禁言房间号 */
    public gagNumber: number = 0;
    /**返回禁言的执行方法 */
    public gagFunction: Function;

    /**文本聊天聊天list*/
    private commLabelList1 = [];
    private commLabelList2 = [];
    private chatGroup0: eui.Group;//文本聊天窗口（游戏没开始之前）

    /**准备按钮list*/
    private readyList1 = [];
    private readyList2 = [];

    /**自己手牌上面一行牌的位置调整*/
    private myHandCardAdjustX = 40;
    private myHandCardAdjustY = 120;
    
    /**手牌缩放比例*/
    private cardRatioXY = 0.6;


    public constructor() {
        super();
        this.skinName = "GameSceneSkin";
    }

    protected childrenCreated() {
        if(App.DeviceUtils.IsWeb){
            this.headUIPointYlist = [920,820,180,285];
        }
        console.log("游戏场景组件初始化完成");
        //和index.php互调时使用
        window["gameScene"] && (window["gameScene"] = this);
        //立即验证
        this.validateNow();
        //初始化工厂和逻辑
        this.cardFactory = CardFactory.getInstance();
        this.cardLogic = CardLogic.getInstance();
        //初始化组件
        this.eatComboUI = new EatComboUI();
        this.outFlag = new OutFlagUI();
        //初始化UI列表
        for(var i = 0;i < this.playerNum;i++) {
            this.handCardList[i] = new Array<Card>();
            this.actTipList.push(<ActTipUI>this.tipGroup.getChildAt(i));
            this.outList[i] = new Array<Card>();
            this.eatList[i] = [];
            this.headUIList.push(<HeadUI>this.headGroup.getChildAt(i));
            //            this.readyList.push(this.readyGroup.getChildAt(i));
            this.redDiscList.push(this.discGroup.getChildAt(i + 1));
            this.fengList.push(this.discGroup.getChildAt(i + 5));
            this.eatCount[i] = 0;
            this.faceList.push(this.chatGroup.getChildAt(i));
            this.outEffectList.push(this.outEffectGroup.getChildAt(i));
            this.diceAnimList.push(this.diceGroup.getChildAt(i));
            this.gangZhengList.push(this.gangFenGroup.getChildAt(i));
            this.gangFuList.push(this.gangFenGroup.getChildAt(i + 4));
            this.gangFenYList.push(this.gangZhengList[i].y);
            this.actFaceUIList[i] = this.actFaceGroup.getChildAt(i);
            //文本聊天list
            this.commLabelList1.push(this.chatGroup.getChildAt(i + 4));
            this.commLabelList2.push(this.chatGroup0.getChildAt(i));

            //准备
            this.readyList1.push(this.readyGroup.getChildAt(i));
            this.readyList2.push(this.readyGroup.getChildAt(i + 4));

        }
        //初始化
        for(var j = 0;j < 3;j++) {
            this.gameKickList.push(this.overShutupGroup.getChildAt(j));
            this.gameShutupList.push(this.overShutupGroup.getChildAt(j + 3))
        }

        //初始化完毕
        this.ctrl.inited = true;
        App.EventManager.addEvent(EventConst.GameConfigChange,this.gameConfigChange,this);
    }

    protected onEnable() {

        console.log("进入游戏_________________________________________");

        this.gameState = GameState.Free;
        //移除所有弹框
        App.PopUpManager.removeAllPopUp();
        App.MsgBoxManager.recycleAllBox();
        this.tipGroup.removeChildren();

        this.bHavePlay = false;              //重置标志位

        this.bShowMatchInfo = false;
        this.bReplay = App.DataCenter.replayInfo.bReplay;
                //立即验证
        this.validateNow();
        this.hideAllCardRect();           //隐藏所有rect
        this.hideAllHeadUI();             //隐藏所有头像
        this.hideAllReady();              //隐藏所有准备图标
        this.hideAllLight();              //隐藏所有圆盘光指示
        this.hideLeftLabel();             //隐藏剩余计数
        this.hideAllActTip();             //隐藏操作提示
        this.hideActUI();                 //隐藏操作UI
        this.hideAllTuoGUan();            //隐藏托管
        this.hideAllFace();               //隐藏所有表情
        this.hideAllOutEffect();          //隐藏所有出牌效果
        this.hideDiceAnim();              //隐藏骰子动画
        this.hideAllFengWei();            //隐藏风位
        this.hideDisc();                  //隐藏圆盘
        this.hideAllGangFen();            //隐藏杠分
        this.hideAllActFaceUI();          //隐藏所有动作表情UI
        this.hideFanTypeUI();             //隐藏番型
        this.hideChatPanel();             //隐藏聊天
//        this.hideOptionPanel();           //隐藏feedback设置
        this.clearChatRecord();           //清理聊天记录
        this.setGameSceneBg();            //设置游戏背景
        this.setVoice();                  //设置语音聊天
        this.setOutTime();                //设置出牌时间
        this.checkInviteBtn();            //检查是否需要显示邀请按钮
        this.hideKickShutup();            //隐藏所有的踢人、禁言按钮

        this.setCdLabel("");              //设置cd文本
        this.fengQuanLabel.text = "";     //设置风位风圈文本
        this.ctrl.registerSocket();
        this.ctrl.registerEvent();

        this.isGameOrReplay();
        //加载资源  
        this.loadAsset();
        //测试
        this.showSwapCard();


        //点击事件
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onDragCardBegin,this);
        this.voiceBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onVoiceBegin,this);
        //踢人、禁言点击事件
        this.overShutupGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.overShutupGroupTouch,this)
    }
    
    //初始化牌的位置,牌的位置在childrenCreated获取的的位置是错误的
    public onInitPosition(){

        //定位用。由于手机上egret游戏置于后台时，获取rect位置会错误。原来List保存的是rect对象，现在修改为保存rect的坐标位置。
        //直接把麻将牌全部摆在exml上，然后保存到数组里，出牌时显示该牌然后设置牌值，这样就不用计算显示位置和深度排序了,比起记录这些位置方便多了...

        //已出牌   下面的x、y坐标加减   跟outInvalXList、outInvalYList的出牌排序间隔有关 ，解决适配问题
        var out1_startX = -50;
        var out1_startY = 60;
        var out0_startX = 10;
        this.takeRectList=[];
        this.takeRectList.push(new egret.Point(this.locateGet0.x,this.locateGet0.y));
        this.takeRectList.push(new egret.Point(this.locateGet1.x,this.locateGet1.y));
        this.takeRectList.push(new egret.Point(this.locateGet2.x,this.locateGet2.y));
        this.takeRectList.push(new egret.Point(this.locateGet3.x,this.locateGet3.y));

        this.outRectList=[];
        this.outRectList.push(new egret.Point(this.out0_start.x + out0_startX,this.out0_start.y));
        this.outRectList.push(new egret.Point(this.out1_start.x + out1_startX,this.out1_start.y + out1_startY));
        this.outRectList.push(new egret.Point(this.out2_start.x,this.out2_start.y));
        this.outRectList.push(new egret.Point(this.out3_start1.x,this.out3_start.y));

        this.out1RectList=[];
        this.out1RectList.push(new egret.Point(this.out0_start1.x + out0_startX,this.out0_start1.y));
        this.out1RectList.push(new egret.Point(this.out1_start1.x + out1_startX,this.out1_start1.y + out1_startY));
        this.out1RectList.push(new egret.Point(this.out2_start1.x,this.out2_start1.y));
        this.out1RectList.push(new egret.Point(this.out3_start.x,this.out3_start1.y));

        this.out2RectList=[];
        this.out2RectList.push(new egret.Point(this.out0_start2.x + out0_startX,this.out0_start2.y));
        this.out2RectList.push(new egret.Point(this.out1_start2.x + out1_startX,this.out1_start2.y + out1_startY));
        this.out2RectList.push(new egret.Point(this.out2_start2.x,this.out2_start2.y));
        this.out2RectList.push(new egret.Point(this.out3_start2.x,this.out3_start2.y));

        this.eatRectList=[];
        this.eatRectList.push(new egret.Point(this.eat0_start.x - 70,this.eat0_start.y));
        this.eatRectList.push(new egret.Point(this.eat1_start.x + out1_startX,this.eat1_start.y + 50));
        this.eatRectList.push(new egret.Point(this.eat2_start.x,this.eat2_start.y));
        this.eatRectList.push(new egret.Point(this.eat3_start.x,this.eat3_start.y));
        
        //回放时需要重新赋值handRectList(暂时) 自己手牌的位置
        if(this.bReplay){
            this.handRectList = [];
            this.handRectList.push(new egret.Point(this.hand0_start.x,this.hand0_start.y));
            //  自己手牌中第一行
            this.handRectList.push(new egret.Point(this.eat1_start.x + out1_startX,this.hand1_start.y - out1_startY));
            this.handRectList.push(new egret.Point(this.hand2_start.x,this.hand2_start.y));
            this.handRectList.push(new egret.Point(this.eat3_start.x,this.hand3_start.y + 120));
            
            this.takeRectList = [];
            this.takeRectList.push(new egret.Point(this.locateGet0.x,this.locateGet0.y));
            this.takeRectList.push(new egret.Point(this.eat1_start.x + out1_startX,this.locateGet1.y - out1_startY));
            this.takeRectList.push(new egret.Point(this.locateGet2.x,this.locateGet2.y));
            this.takeRectList.push(new egret.Point(this.eat3_start.x,this.locateGet3.y + 120));
        }else{
            //正常游戏设定
            this.handRectList = [];
            this.handRectList.push(new egret.Point(this.hand0_start.x,this.hand0_start.y));
            //  自己手牌中第一行
            this.handRectList.push(new egret.Point(this.hand1_start.x,this.hand1_start.y));
            this.handRectList.push(new egret.Point(this.hand2_start.x,this.hand2_start.y));
            this.handRectList.push(new egret.Point(this.hand3_start.x,this.hand3_start.y));
        }

    }

    /**游戏配置修改*/
    public gameConfigChange() {
        ProtocolData.gameConfig = App.DataCenter.roomInfo.getCurDesk().gameConfig;
        var userList = App.DataCenter.UserInfo.userList;
        this.hideAllReady();
        this.showReadyBtn();
        for(var key in userList) {
            var userVo: UserVO = userList[key];
            userVo.point = 0;
            this.headUIList[userVo.userPos].scoreLabel.text = NumberTool.formatMoney(userVo.point);
        }
    }

    /**判断是正常游戏还是回放状态*/
    public isGameOrReplay() {
        //回放
        if(this.bReplay) {
            this.gameState = GameState.Replay;
            RES.loadGroup(AssetConst.Replay,10);
            this.startReplay();
            //正常游戏
        } else {
            this.sendGameState();
        }
    }

    //踢人、禁言
    public overShutupGroupTouch(egret: egret.TouchEvent) {

        let idx = this.overShutupGroup.getChildIndex(egret.target);
        let idx1 = idx % 3;
        var head: HeadUI = this.headUIList[idx1+1] as HeadUI
            
        if(!head.userID) {
            return
        }
        //踢人
        if(idx < 3) {
            //            if(this.headUIList[0].x != this.headUIPointXlist[0]) //踢人两种不同提示框的判断（暂时弃用）
            var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
            messageBox.showMsg("踢出此玩家，此玩家3分钟内无法进入，确定将玩家踢出？");
            messageBox.ok = () => {
                console.log("发送踢人:___________",head.userID)
                ProtocolData.Send102_20_0.kickUserID = head.userID
                this.sendGameKick()
            };
            messageBox.cancel = () => {
                messageBox.hide();
            }
        } else {
            //禁言
            var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
            messageBox.showMsg("将此玩家禁言，3分钟内无法使用语音及聊天功能，是否确定禁言?");
            messageBox.ok = () => {
                head.headShutup.source = "game_say1_png"         
                console.log("发送禁言:___________",head.userID)
                var shutup: eui.Image = <eui.Image>this.overShutupGroup.getChildAt(idx);
                shutup.bitmapData = RES.getRes("game_shutup_ing_png");
                ProtocolData.Send111_2_0.banPostUserID = head.userID;
                ProtocolData.Send111_2_0.type = 1//1 禁言3分钟  2本局禁言
                this.sendGameShutup();
            };
            messageBox.cancel = () => {
                messageBox.hide();
            }
        }

    }

    //隐藏所有踢人、禁言按钮
    public hideKickShutup() {
        var len = this.overShutupGroup.numChildren;
        for(var i = 0;i < len;i++) {
            this.overShutupGroup.getChildAt(i).visible = false;
        }
    }

    protected onRemove() {
        App.SoundManager.stopBGM();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        this.voiceBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onVoiceBegin,this);
        this.overShutupGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.overShutupGroupTouch,this)
    }

    /**重置游戏，一局结束后，重置游戏界面和数据*/
    public resetGame() {
        App.LayerManager.tipLayer.removeChildren();
        //      egret.Tween.removeAllTweens();
        this.topGroup.removeChildren();

        this.bAllowOutCard = false;
        this.bTuoGuan = false;
        this.curActPlayer = -1;
        this.curOutCard = null;
        this.curGetCard = null;
        this.curTouchCard = null;
        this.replayData = null;
        this.eatComboList.length = 0;
        this.gangComboList.length = 0;
        this.winLossMoneyList = [0,0,0,0];
        this.setCdLabel("");

        this.outFlag.hide();
        this.hideAllGangFen();
        this.hideInviteUI();
        this.hideResultPanel();
        this.hideAllLight();
        //this.hideLeftLabel();
        this.hideAllActTip();
        this.hideActUI();
        this.clearAllCard();
        this.stopOutTimer();
        this.hideZhuangFlag();
        this.hideAllFace();
        this.hideAllTuoGUan();
        this.hideAllOutEffect();
        this.hideDiceAnim();
        this.hideZhuaMaPanel();
        this.hideToHallBtn();
        this.hideAllActFaceUI();
        this.setAllReadyVisible();
        this.clearDragCard();

        this.updatePoint();
        this.showInviteUI();
    }
    /**判断玩家是否掉线，发请解散房间*/
    private judgeCollocation() {

    }

    /**重置场景，所有局结束后，重置界面和数据*/
    public resetScene() {
        this.ctrl.unRegisterSocket();
        this.ctrl.unRegisterEvent();
        this.resetGame();
        this.hideAllReady();
        this.hideAllHeadUI();
        this.hideInviteUI();
        this.stopDismissTimer();
        this.resetReplay();

        App.ResUtils.deleteAllCallBack();
        App.PopUpManager.removeAllPopUp();
        App.MsgBoxManager.recycleAllBox();
        //战绩跑到大厅里去...
        if(this.bShowMatchInfo) {
            this.showMatchInfoPanel();
        }

        //删除用户信息在最后，不然大厅的战绩没法儿显示...
        //这里已经出现异步删除玩家信息情况,导致战绩信息显示不全,...未解决...
        App.DataCenter.UserInfo.deleteAllUserExcptMe();
    }

    /**重新连接后，重置界面和数据*/
    public reconnnect() {
        this.resetScene();
        this.onEnable();
    }



    //发送踢人
    private sendGameKick() {
        var data = ProtocolData.Send102_20_0;
        App.gameSocket.send(ProtocolHead.Send102_20_0,data);
    }
    //发送禁言
    public sendGameShutup() {
        var data = ProtocolData.Send111_2_0;
        App.gameSocket.send(ProtocolHead.Send111_2_0,data);
    }

    //重连时查看是否被禁言
    public sendIsGameShutup() {
        console.log("查看禁言信息")
        App.gameSocket.send(ProtocolHead.Send111_3_0);
    }

    //显示换牌
    private showSwapCard() {
        if(App.DataCenter.debugInfo.isDebug) {
            this.swapCardUI || (this.swapCardUI = new SwapCardUI());
            this.swapCardUI.init(this);
        }
    }

    //加载资源
    private loadAsset() {
        //加载游戏其他资源
        App.ResUtils.loadGroupQuiet(AssetConst.Game,5); //游戏
        App.ResUtils.loadGroupQuiet(AssetConst.Result,4); //结算

        //加载打牌语音
        if(App.SoundManager.allowPlayEffect) {
            if(App.SoundManager.isGuangDongSpeak) {
                App.ResUtils.loadGroupQuiet(AssetConst.Sound_GuangDong);
            } else {
                App.ResUtils.loadGroupQuiet(AssetConst.Sound_PuTong);
            }
            App.ResUtils.loadGroupQuiet(AssetConst.Sound_Other);
        }
        //加载背景音乐
        if(App.SoundManager.allowPlayBGM) {
            App.ResUtils.loadGroupQuiet(AssetConst.Sound_BGM,2);
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComplete,this);
    }

    //加载资源完成
    private onGroupComplete(event: RES.ResourceEvent) {
        if(event.groupName == AssetConst.Sound_BGM) {
            App.SoundManager.playBGM(SoundManager.bgm);
        } else if(event.groupName == AssetConst.Card) {
            this.showSwapCard();
        }
    }

    //退出到大厅
    public quitToHall() {
        this.ctrl.onQuitGame();
    }

    //开始回放
    private startReplay() {
        this.voiceBtn.visible = false;
        this.replayLogic || (this.replayLogic = new ReplayLogic());
        this.onInitPosition();
        console.log("回放数据" + App.DataCenter.replayInfo.replayData + "回放数据");
        this.replayLogic.play(this,App.DataCenter.replayInfo.replayData);
    }

    //重置回放
    private resetReplay() {

        if(this.replayLogic && this.bReplay) {  //最后清理回放数据，防止清理其他ui时，找不到userVO
            this.replayLogic.replayOver();
            console.log("回放停止了")
        }

    }

    //回放，撤销摸牌
    public cancelGetCard(data) {
        var json = ProtocolData.Rev180_53_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var cardValue = json.cardList[0];
        var card: Card;
        //删除摸牌，排列手牌
        var handList = this.handCardList[pos];
        var len = handList.length;
        for(var i = 0;i < len;i++) {
            card = handList[i];
            if(card.cardValue == cardValue) {
                handList.splice(i,1);
                card.recycle();
                break;
            }
        }

        this.showHandCard(pos);
        //更新界面
        this.showLight(pos);
        this.addLeftCard("撤销摸牌");
        this.hideActUI();
    }

    //回放中 撤销换牌
    public cancelSwapCard(data) {
        var json = ProtocolData.Rev180_101_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var handList = this.handCardList[pos];
        var len = handList.length;

        //将换牌的数据倒过来...即可完成撤销换牌操作
        var cardList = json.cardList;
        for(var i = 0;i < len;i++) {
            var card: Card = handList[i];
            if(card.cardValue == cardList[1]) { //将手牌替换
                if(pos == UserPosition.Down) {
                    card.setHandSkin(cardList[0],pos);
                } else {
                    card.setOutSkin(cardList[0],pos);
                }
                break;
            }
        }
        this.showHandCard(pos);
        if(i == len) {
            console.error("撤销换牌出错");
            return;
        }
    }

    //撤销操作
    public cancelAct(data,lastSeat) {
        var json = ProtocolData.Rev180_56_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var lastPos = this.cardLogic.changeSeat(lastSeat);
        var cardValue = json.cardList[0];
        var cardList = json.cardList;
        var act: ACT_act = json.act;
        var actParam = json.actParam;
        this.hideActUI();
        var userVo: UserVO = App.DataCenter.UserInfo.getUserBySeatID(json.seatID);
        switch(act) {
            case ACT_act.Act_NormalDo:
                this.cancelOutCard(json.seatID,cardValue);
                break;

            case ACT_act.Act_Pass:    //过
                break;
            case ACT_act.Act_Hu:      //胡
                break;
            case ACT_act.Act_Peng:    //碰牌
            case ACT_act.Act_Chi:     //吃牌
            case ACT_act.Act_Gang:    //杠
            case ACT_act.Act_AnGang:  //暗杠
                this.showLight(lastPos);
                this.cancelEat(act,pos,cardList,actParam,lastSeat);
                break;
        }
    }

    //撤销出牌
    private cancelOutCard(seatID,cardValue) {
        var pos = this.cardLogic.changeSeat(seatID);
        //将出牌从出牌区域移除
        var card: Card = this.outList[pos].pop();
        card.recycle();
        //将出牌添加入手牌
        var json = ProtocolData.Rev180_53_0;
        json.cardList = [cardValue];
        json.seatID = seatID;
        this.revGetCard(json,false);
        this.addLeftCard("撤销出牌");
    }

    //撤销吃牌
    private cancelEat(act: ACT_act,pos: number,cardList,actParam: number,lastSeat) {
        //服务端没有传送完整牌值列表，这里拼接牌值列表
        var lastPos = this.cardLogic.changeSeat(lastSeat);
        var cardValue = cardList[0];
        var eatCardList = [];    //需要显示到吃碰区域的牌
        var deleteCardList = []; //需要从手上删除的牌

        if(act == ACT_act.Act_Peng) {
            eatCardList = [cardValue,cardValue,cardValue];
            deleteCardList = [cardValue,cardValue];
        } else if(act == ACT_act.Act_Chi) {
            eatCardList = cardList;
            deleteCardList = [cardList[1],cardList[2]];
            ArrayTool.sortArr(eatCardList);
        } else if(act == ACT_act.Act_Gang) {
            if(actParam == 1) {  //1补杠
                eatCardList = [cardValue];
                deleteCardList = [cardValue];
            } else if(actParam == 3) {  //3点杠
                eatCardList = [cardValue,cardValue,cardValue,cardValue];
                deleteCardList = [cardValue,cardValue,cardValue];
            }
        } else if(act == ACT_act.Act_AnGang) { //暗杠
            eatCardList = [cardValue,cardValue,cardValue,cardValue];
            deleteCardList = [cardValue,cardValue,cardValue,cardValue];
        }

        //删除最后吃碰杠的牌
        var eatNum = this.eatList[pos].length - 1;
        var eatLen = this.eatList[pos][eatNum].length;
        for(var i = 0;i < eatLen;i++) {
            var eatCard: Card = this.eatList[pos][eatNum][i];
            eatCard.recycle();
        }
        this.eatList[pos].pop();
        this.eatCount[pos]--;

        //将手上删除的牌还原到手中
        var addCard: Card;
        var addLen = deleteCardList.length;
        for(var i = 0;i < addLen;i++) {
            var addCardValue = deleteCardList[i];
            if(this.bReplay == true && pos != UserPosition.Down) {
                addCard = this.cardFactory.getOutCard(addCardValue,pos);
            } else {
                addCard = this.cardFactory.getHandCard(addCardValue,pos);
            }
            //处理摸牌
            this.handCardList[pos].push(addCard);
            if(pos == UserPosition.R) {
                this.cardGroup.addChildAt(addCard,0);
            } else {
                this.cardGroup.addChild(addCard);
            }
        }
        this.showHandCard(pos);
        //非暗杠，则必有一张在场上，是lastSeat位置玩家出的牌。将该牌还原到场上
        if(act != ACT_act.Act_AnGang) {
            var lastOutCard = this.cardFactory.getOutCard(cardValue,lastPos);
            this.addCardToOut(lastPos,lastOutCard,false);
            this.curOutCard = lastOutCard;
        }
    }


    //进入邀请界面
    private gsWaitAgree(data) {
        var json = ProtocolData.Rev180_2_0;
        json = data;
        var deskStatus = json.deskStatus;
        console.log("进入邀请界面，状态:",deskStatus);
        switch(deskStatus) {
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
        var json = ProtocolData.Rev180_2_0;
        json = data;
        var deskStatus = json.deskStatus;

        switch(deskStatus) {
            case GS_GAME_STATION.GS_GAME_PLAYING: //游戏中，断线重连进来，重现当前游戏场景
                this.gameState = GameState.Playing;
                App.DataCenter.gameState = GameState.Playing;
                this.changeAllUserSeat();
                this.resumeDesk(data);
                this.hideInviteUI();
                break;
            default:
                break;
        }
    }

    //保存游戏位置信息中的用户id等数据 (由于进入房间之前，就已经传递了用户信息，这里重复传送不保存)
    private saveGameSeatInfo(gameSeatInfo) {
        var len = gameSeatInfo.length;
        for(var i = 0;i < len;i++) {
            var seatInfo = ProtocolData.GameSeatInfo;
            seatInfo = gameSeatInfo[i];
            var userVo: UserVO = App.DataCenter.UserInfo.getUser(seatInfo.userID);
            if(userVo == null) {
                userVo = new UserVO();
                userVo.userID = seatInfo.userID;
                App.DataCenter.UserInfo.addUser(userVo);
            }
            userVo.seatID = seatInfo.seatID;
            userVo.state = seatInfo.status;
            if(App.serverSocket.gameID == Game_ID.GoldRoom) {
                //金币场由102_4_1获取金币
            } else {
                userVo.point = seatInfo.point;
            }
        }
    }

    //恢复桌子场景
    private resumeDesk(data) {
        this.onInitPosition()
        var json = ProtocolData.Rev180_2_0;
        json = data;
        var bankerSeat = json.bankerSeat;
        var gameSeatInfo = json.gameSeatInfo;
        var oniCard = json.oniCard;
        var dongFengPos;  //东风位玩家位置
        var fengWei;      //当前风位
        var fengQuan = json.fengQuan;
        var changeCnt = json.changeCnt;
        //头像
        var userList: any = App.DataCenter.UserInfo.userList;
        for(var key in userList) {
            this.updateUserHead(userList[key]);
        }
        //牌
        var seatInfoLen = gameSeatInfo.length;
        for(var i = 0;i < seatInfoLen;i++) {
            var seatInfo = ProtocolData.GameSeatInfo;
            seatInfo = gameSeatInfo[i];
            var seatID = seatInfo.seatID;
            var pos = this.cardLogic.changeSeat(seatID);

            //东风位玩家位置
            if(seatInfo.feiWei == MJ_FENG_POINT.DONG) {
                dongFengPos = pos;
                this.showDiceFengWei(dongFengPos);
            }
            //庄家风位
            if(seatInfo.seatID == bankerSeat) {
                fengWei = this.cardLogic.getCurFengWei(changeCnt);
                this.showTextFengWei(fengWei,fengQuan);
            }

            //吃牌
            var chiCards = seatInfo.chiCards;
            if(chiCards != null) {

                var chiCardLen = chiCards.length;
                var chiNum = chiCardLen / 3;
                for(var j = 0;j < chiNum;j++) {
                    var chiList = [chiCards[j * 3],chiCards[j * 3 + 1],chiCards[j * 3 + 2]]
                    ArrayTool.sortArr(chiList); //排序
                    this.addCardToEat(chiList,pos,ACT_act.Act_Chi,0);
                }
            }
            //碰牌
            var pengCards = seatInfo.pengCards;
            if(pengCards != null) {
                var pengCardLen = pengCards.length;
                for(var j = 0;j < pengCardLen;j++) {
                    var cardValue = pengCards[j];
                    var pengList = [cardValue,cardValue,cardValue];
                    this.addCardToEat(pengList,pos,ACT_act.Act_Peng,0);
                }
            }
            //杠牌
            var gangCards = seatInfo.gangCards;
            if(gangCards != null) {
                var gangCardLen = gangCards.length;
                for(var j = 0;j < gangCardLen;j++) {
                    var cardValue = gangCards[j];
                    var gangList = [cardValue,cardValue,cardValue,cardValue];
                    this.addCardToEat(gangList,pos,ACT_act.Act_Gang,0);
                }
            }

            //暗杠
            var anGangCards = seatInfo.anGangCards;
            if(anGangCards != null) {
                var anGangCardLen = anGangCards.length;
                for(var j = 0;j < anGangCardLen;j++) {
                    var cardValue = anGangCards[j];
                    var anGangList = [cardValue,cardValue,cardValue,cardValue];
                    this.addCardToEat(anGangList,pos,ACT_act.Act_AnGang,0);
                }
            }
            //出牌
            var playOutCards = seatInfo.playOutCards;
            if(playOutCards != null) {
                var outCardLen = playOutCards.length;
                for(j = 0;j < outCardLen;j++) {
                    var card: Card = this.cardFactory.getOutCard(playOutCards[j],pos);
                    console.log("出牌：",playOutCards[j],"——————位置：",pos)
                    this.addCardToOut(pos,card,false);
                }
            }
            //手牌
            var handCards = seatInfo.handCards;
            if(handCards != null) {
                var handCardLen = handCards.length;
                for(var j = 0;j < handCardLen;j++) {
                    var cardValue = handCards[j];
                    var card: Card = this.cardFactory.getHandCard(cardValue,pos);
                    this.handCardList[pos].push(card);
                }
                this.showHandCard(pos);
            }
            this.saveHandCardPosY();
        }
        //设置庄家
        this.zhuangPos = this.cardLogic.changeSeat(bankerSeat);
        this.showZhuangFlag(this.zhuangPos);
        //显示圆盘
        this.showDisc();
        //设置剩余牌数
        this.showLeftLabel(this.curLeftCard,this.curPlayCount);
        //隐藏当前出牌指示
        this.outFlag.hide();
        //开始计时
        this.startOutTimer(this.outTime);
        if(this.isDeskOwner) {
            //查看是否被禁言
            //this.sendIsGameShutup();
            this.hideOverShutupUI();
        }
    }

    //开始进入邀请
    private startInvite() {
        this.gameState = GameState.Ready;
        this.changeAllUserSeat();         //转换已进入房间玩家的seatID
        this.showInviteUI();              //显示邀请
        this.checkInviteBtn();            //检查是否需要显示邀请按钮
        this.setInviteUserHead();         //显示已进入房间的玩家头像
        this.setUserReady();              //设置已进入房间玩家准备状态  
    }



    ////////////////////////////////////////////////
    //------------------[界面点击操作]----------------
    ////////////////////////////////////////////////

    //点击界面
    private onTouchTap(e: egret.TouchEvent) {
        //点击自己手牌
        if(e.target instanceof Card) {
            this.checkOutCard(e.target);
            return;
        }

        switch(e.target) {
            case this.readyBtn:     //准备
                this.resetGame();
                this.onInitPosition();
                App.ResUtils.loadGroup([AssetConst.Game,AssetConst.Card],this,this.sendReady,null,10);
                break;
            case this.toHallBtn:    //点击返回大厅th
                this.quitToHall();
                break;
            default:
                break;
        }
    }

    //拖牌
    private dragCard: Card;
    private dragCardValue: number = 0;
    private onDragCardBegin(e: egret.TouchEvent) {
        if(e.target instanceof Card) {  //自己手牌
            var card: Card = e.target;
            if(card.parent == this.cardGroup) {
                this.dragCardValue = card.cardValue;
                App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onDragCardMove,this);
                App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onDragCardEnd,this);
            }
        }
    }

    //拖拽移动
    private onDragCardMove(e: egret.TouchEvent) {
        if(this.dragCardValue != 0) {
            if(this.dragCard == null && e.stageY < this.handRectList[UserPosition.Down].y) {
                this.dragCard = this.cardFactory.getHandCard(this.dragCardValue,UserPosition.Down);
                this.cardGroup.addChild(this.dragCard);
            }
            if(this.dragCard) {
                this.dragCard.x = e.stageX - this.dragCard.width / 2;
                this.dragCard.y = e.stageY - this.dragCard.height / 2;
            }
        }
    }

    //释放拖拽
    private onDragCardEnd(e: egret.TouchEvent) {
        this.dragCardValue = 0;
        if(this.dragCard == null) {
            return;
        }
        //删除拖拽牌
        var dragCardValue = this.dragCard.cardValue;
        this.clearDragCard();
        //允许出牌，则从手牌获取相同牌值的牌，并打出
        if(this.bAllowOutCard && e.stageY < this.handRectList[UserPosition.Down].y) {
            var cardList = this.handCardList[UserPosition.Down];
            var cardLen = cardList.length;
            var card: Card;
            for(var i = 0;i < cardLen;i++) {
                card = cardList[i];
                if(card.cardValue == dragCardValue) {
                    this.bAllowOutCard = false;
                    this.curTouchCard = card;
                    this.sendOutCard(card);
                    break;
                }
            }
        }
    }

    //清理拖拽牌
    private clearDragCard() {
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onDragCardMove,this);
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onDragCardEnd,this);
        this.dragCardValue = 0;
        if(this.dragCard) {
            this.dragCard.recycle();
            this.dragCard = null;
        }
    }

    //点击退出按钮
    public quitBtnTouch() {
        //金币场
        if(App.serverSocket.gameID == Game_ID.GoldRoom) {
            var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
            messageBox.showMsg("是否返回大厅？");
            messageBox.ok = () => {
                //游戏中需申请离开；游戏结束时，可以直接离开
                if(this.gameState == GameState.GameOver) {
                    this.ctrl.onQuitGame();
                } else {
                    this.ctrl.sendQuitRoom();
                }
            }
            //录像中、一局未开
        } else if(this.bReplay == true || (this.curPlayCount == this.maxPlayCount)) {
            var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
            messageBox.showMsg("是否返回大厅？");
            messageBox.ok = () => {
                this.quitToHall();
            }
            //如果不是房主，且未开始游戏
        } else {
            if(this.isDeskOwner() == false && this.bHavePlay == false) {
                var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
                messageBox.showMsg("是否离开房间");
                messageBox.ok = () => {
                    this.sendApplyDismiss();
                }
                return;
            }

            //如果是房主，或者无论是否房主且已开始游戏
            if(this.bAllowDismiss == true) {
                var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
                if(this.bHavePlay == false) {
                    messageBox.showMsg("游戏未开始解散房间不扣除房卡，是否确认解散？");
                } else {
                    messageBox.showMsg("2人同意即可解散房间，解散房间不会退回房卡，是否确认解散房间？");
                }
                messageBox.ok = () => {
                    this.sendApplyDismiss();
                    this.bHavePlay && this.startDismissTimer();
                }
            } else {
                Tips.info("申请解散房间的间隔时间为3分钟");
            }
        }
    }

    /**发送申请解散房间*/
    private sendApplyDismiss() {
        this.ctrl.sendApplyDismiss();
    }

    /**被禁言的提示消息*/
    public shutupHint() {
        var minute = parseInt("" + this.timeNumber / 60);
        var second = parseInt("" + this.timeNumber % 60);
        var secondStr: string;
        if(second < 9) {
            secondStr = "0" + second;
        } else {
            secondStr = "" + second;
        }
        Tips.info("您已被房主禁言,暂无法使用聊天功能(" + minute + ":" + secondStr + ")");
    }

    /**接受禁言数据 */
    public gagChat() {
        console.log("接收禁言");
        this.isGag = true;
        this.gagTimer.addEventListener(egret.TimerEvent.TIMER,this.onTimeUpdate,this);
        this.gagTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimeComplete,this);
        this.gagTimer.start();
    }

    /**倒计时结束 */
    private onTimeComplete(): void {
        this.isGag = false;
        this.timeNumber = 180;
        this.gagTimer.reset();
    }
    /**每一秒 */
    private onTimeUpdate(): void {
        this.timeNumber--;
    }


    //点击语音按钮，判断是否被禁言
    public onVoiceBegin() {
        egret.log("开始录音" + this.isGag);
        var deskInfo: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
        if(this.gagNumber != deskInfo.deskCode || this.gagNumber == 0) {
            this.gagFunction = this.onVoiceBegin1;
            this.sendIsGameShutup();
        } else {
            this.onVoiceBegin1();
        }
    }

    //点击语音按钮,播放录音
    public onVoiceBegin1() {
        if(this.isGag) {
            this.shutupHint();
            return;
        }
        if(this.bReplay) {
            return;
        }
        App.ResUtils.loadGroup(AssetConst.Voice,this,() => {
            if(this.voiceUI == null) {
                this.voiceUI = new VoiceUI();
            }
            this.topGroup.addChild(this.voiceUI);
            this.voiceUI.timeLabel.text = "00:00";
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onVoiceEnd,this);
            this.recordTime.addEventListener(egret.TimerEvent.TIMER,this.onRecordTimeHandler,this);
            this.recordTime.reset();
            this.recordTime.start();
            window["startRecord"] && window["startRecord"]();
        },null,10);

    }

    //语音计时处理，微信录音时间不能大于60s，并且不能超过2m。这里取59s限制。
    private onRecordTimeHandler() {
        if(this.recordTime.currentCount >= 59) {
            this.onVoiceEnd();
        }
        if(this.voiceUI) {
            this.voiceUI.timeLabel.text = "00:" + NumberTool.formatTime(this.recordTime.currentCount);
        }
    }

    //释放语音按钮，停止录音
    private onVoiceEnd() {
        egret.log("录音结束,时间:",this.recordTime.currentCount);
        App.ResUtils.deleteCallBack(AssetConst.Voice);
        this.voiceUI.hide();
        this.recordTime.removeEventListener(egret.TimerEvent.TIMER,this.onRecordTimeHandler,this);
        this.recordTime.stop();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onVoiceEnd,this);
        if(this.recordTime.currentCount >= 1) {
            window["stopRecordAndUpload"] && window["stopRecordAndUpload"]();
        } else {
            Tips.info("录音小于1秒，自动撤销录音");
            window["stopRecord"] && window["stopRecord"]();
        }
    }

    //发送录音到服务端
    private sendRecord(serverId) {
        egret.log("上传录音成功，广播语音信息");
        this.ctrl.sendChat(CHAT_TYPE.Voice,serverId);
    }


    ////////////////////////////////////////////////
    //------------------[发牌流程]-------------------
    ////////////////////////////////////////////////

    //显示庄家、风位 (游戏开始)
    public showZhuang() {
        console.log("显示庄家");
        //发送游戏状态
        App.EventManager.sendEvent(EventConst.GameStateChange,GameState.Playing);
        var json = ProtocolData.Rev180_51_0;
        var seatID = json.seatID;
        var fengWei = json.fengWei;
        var fengQuan = json.fengQuan;
        var diceList = json.diceList;
        var dongPos = this.cardLogic.getDongPos(seatID,fengWei);
        var changeCnt = json.changeCnt; //换庄次数
        //        var curFenWei = this.cardLogic.getCurFengWei(changeCnt);

        this.showDiceFengWei(dongPos); //东南西北四字
        this.showTextFengWei(fengWei,fengQuan);  //圆盘下方小字

        //显示庄家
        this.zhuangPos = this.cardLogic.changeSeat(seatID);
        this.zhuangFlag || (this.zhuangFlag = new ZhuangFlag());
        this.zhuangFlag.x = App.StageUtils.halfStageWidth;
        this.zhuangFlag.y = App.StageUtils.halfStageHeight;
        this.headGroup.addChild(this.zhuangFlag);
        var headUI = this.headUIList[this.zhuangPos];
        var headImg = headUI.headImg;

        //发牌
        egret.Tween.get(this).wait(this.moveZhuangTime).call(() => {
            egret.Tween.get(this.zhuangFlag).to({ x: headUI.x + headImg.x,y: headUI.y + headImg.y },this.moveZhuangTime);
            this.dealCard();
            this.reduceLeftCard(4 * 13);
        },this);
        console.log("handR",this.handRectList[1],"?1000takeT=",this.takeRectList[1].x,"outR=",this.outRectList[1].x,"eatR=",this.eatRectList[1].x)
    }

    //播放骰子动画
    public playDiceAnim() {
        console.log("滚骰子");
        var diceList = ProtocolData.Rev180_51_0.diceList;
        if(diceList != null) {
            var len = diceList.length;
            for(var i = 0;i < len;i++) {
                var diceInfo = ProtocolData.diceInfo;
                diceInfo = diceList[i];
                var pos = this.cardLogic.changeSeat(i);
                this.diceAnimList[pos].playAnim(diceInfo.dice1,diceInfo.dice2);
                this.diceGroup.addChild(this.diceAnimList[pos]);
            }
            this.diceAnimList[0].addEventListener(egret.Event.COMPLETE,this.onDiceAnimComplete,this);
            App.SoundManager.playEffect(SoundManager.shazi);
        } else {
            console.error("骰子数据为null");
        }
    }

    //骰子播放结束，分配庄家
    private onDiceAnimComplete() {
        egret.Tween.get(this).wait(this.diceStayTime).call(() => {
            this.hideDiceAnim();
            this.showZhuang();
        },this);
    }

    //隐藏筛子动画
    private hideDiceAnim() {
        this.diceAnimList[0].removeEventListener(egret.Event.COMPLETE,this.onDiceAnimComplete,this);
        this.diceGroup.removeChildren();
    }

    //发牌
    public dealCard() {
        //移除所有弹框
        App.PopUpManager.removeAllPopUp();
        App.MsgBoxManager.recycleAllBox();
        console.log("开始发牌");
        for(var i = 0;i < this.playerNum;i++) {
            //排列牌之前，将摸牌拿出，防止摸牌被放入手牌位置
            if(this.curGetCard != null && this.curGetCard.userPos == i) {
                this.handCardList[this.curGetCard.userPos].pop();
                this.showHandCard(i);
                this.handCardList[this.curGetCard.userPos].push(this.curGetCard);
            } else {
                this.showHandCard(i);
            }
        }
        this.saveHandCardPosY();
        this.showLight(this.zhuangPos);
    }

    /**保存手牌的Y位置，用于牌弹起回缩*/
    private saveHandCardPosY() {
        var handList = this.handCardList[UserPosition.Down];
        var len = handList.length;
        for(var i = 0;i < len;i++) {
            var card: Card = handList[i];
            card.initPosY = card.y;
        }
    }

    /**
     * 显示玩家手牌，获取玩家手牌数组，根据起始位置和间隔，添加到指定group中
     * @pos 位置
     */
    private showHandCard(pos: UserPosition) {
        var cardList: Array<Card> = this.handCardList[pos];
        var len = cardList.length;
        var card: Card;
        var intervalX = this.handInvalXList[pos];
        var intervalY = this.handInvalYList[pos];
        var startX = this.handRectList[pos].x;
        var startY = this.handRectList[pos].y;

        //回放时，所有人需要排列手牌
        if(pos == UserPosition.Down || this.bReplay == true) {
            this.cardLogic.sortHandCard(this.handCardList[pos]);
            
        }
        //回放时，手牌间隔会增大
        if(this.bReplay) {
            if(pos == UserPosition.R) {
                intervalX = this.eatInvalXList[pos];
                intervalY = this.eatInvalYList[pos];
            } else if(pos == UserPosition.L) {
                intervalX = -this.eatInvalXList[pos];
                intervalY = -this.eatInvalYList[pos];
            }
        }
        //判断玩家是哪家   自己的手牌需要放两排
        if(pos == UserPosition.Down) {
            if(cardList.length > 0) {
                if(cardList.length<this.outRowLimit){
                    for(var i = 0;i < cardList.length;i++) {
                        card = cardList[i];
                        card.x = startX + intervalX * i;
                        card.y = startY + intervalY * i;
                        card.initPosY = card.y
                        this.cardGroup.addChild(cardList[i]);
                    }
                }else{
                    for(var i = 0;i < this.outRowLimit;i++) {
                        card = cardList[i];
                        card.x = startX + intervalX * i;
                        card.y = startY + intervalY * i;
                        card.initPosY = card.y
                        this.cardGroup.addChild(cardList[i]);
                    }
                    for(var j = this.outRowLimit;j < cardList.length;j++) {
                        card = cardList[j];
                        card.x = startX + intervalX * (j - this.outRowLimit) + this.myHandCardAdjustX;
                        card.y = startY + intervalY * (j - this.outRowLimit) - this.myHandCardAdjustY;
                        card.initPosY = card.y
                        this.cardGroup.addChild(cardList[j]);
                    }
                }
            }
        } else {
            for(var i = 0;i < len;i++) {
                card = cardList[i];
                card.x = startX + intervalX * i;
                card.y = startY + intervalY * i;
                this.cardGroup.addChild(cardList[i]);
            }
        }
        //左边深度排序
        if(pos == UserPosition.L) {
            var handLen = this.handCardList[pos].length;
            for(var i = handLen - 1;i >= 0;i--) {
                this.cardGroup.addChild(this.handCardList[pos][i]);
            }
        }

    }

    //根据手牌数据，生成Card手牌
    public createHandCard(data) {
        var json = ProtocolData.Rev180_52_0;
        json = data;
        var dealCardList = json.deleaveCard;
        var len = dealCardList.length;
        var card: Card;
        for(var i = 0;i < len;i++) {  //循环获取4个玩家的牌信息
            var dealCardInfo = ProtocolData.deleaveCardInfo;
            dealCardInfo = dealCardList[i];
            var pos = this.cardLogic.changeSeat(dealCardInfo.seatID);  //获取位置
            var cardList = dealCardInfo.cardList;
            var cardListLen = cardList.length;
            for(var j = 0;j < cardListLen;j++) {
                //回放时，其他玩家手牌是明牌
                if(this.bReplay == true && pos != UserPosition.Down) {
                    card = this.cardFactory.getOutCard(cardList[j],pos);
                } else {
                    card = this.cardFactory.getHandCard(cardList[j],pos);
                }
                this.handCardList[pos].push(card);
                console.log("生成手牌");
            }
        }
    }

    ////////////////////////////////////////////////
    //---------------[打牌流程]-----------------
    ////////////////////////////////////////////////

    //检查是否能出牌, 当是自己手牌，并且允许出牌，牌在弹起的状态时，才能出牌。
    private checkOutCard(card: Card) {

        if(card.parent == this.cardGroup) {
            if(this.bAllowOutCard) {
                if(card.bUp) {
                    this.bAllowOutCard = false;
                    this.curTouchCard = card;
                    this.sendOutCard(card);
                } else {
                    this.downAllHandCard();
                    card.toUp();
                }
            } else {
                if(card.bUp) {
                    card.toDown();
                } else {
                    this.downAllHandCard();
                    card.toUp();
                }
            }
            App.SoundManager.playEffect(SoundManager.clickCard);
        }
    }

    //回缩所有手牌
    private downAllHandCard() {
        var handList = this.handCardList[UserPosition.Down];
        var len = handList.length;
        for(var i = 0;i < len;i++) {
            handList[i].toDown();
        }
    }

    //出牌动作
    private actOutCard(pos: UserPosition,cardValue: number,bAnim: boolean = true) {
        //如果是回放，则出牌设置为touchCard，模拟该牌是被点击出牌的
        if(this.bReplay) {
            var handList = this.handCardList[pos];
            var handLen = handList.length;
            var handCard: Card;
            for(var i = 0;i < handLen;i++) {
                handCard = handList[i];
                if(handCard.cardValue == cardValue) {
                    break;
                }
            }
            if(handCard == null) {
                console.error("回放出牌不存在:",cardValue);
                return;
            } else {
                this.curTouchCard = handCard;
            }
            var card = this.cardFactory.getOutCard(cardValue,pos);
            card.x = this.curTouchCard.x;
            card.y = this.curTouchCard.y;
        } else {
            //非回放时，正常设置出牌
            if(pos == UserPosition.Down) {
                this.hideActUI();
                var card = this.cardFactory.getOutCard(cardValue,pos);
                if(this.curTouchCard) {  //点击出牌
                    card.x = this.curTouchCard.x;
                    card.y = this.curTouchCard.y;
                } else {   //自动出牌
                    var takeRect: egret.Point = this.takeRectList[pos];
                    card.x = takeRect.x;
                    card.y = takeRect.y;
                }
            } else {
                var card = this.cardFactory.getOutCard(cardValue,pos);
                var takeRect: egret.Point = this.takeRectList[pos];
                card.x = takeRect.x;
                card.y = takeRect.y;
            }
        }

        //移动牌到出牌区域
        this.addCardToOut(pos,card,bAnim);

        //出牌后，处理摸牌、出牌、手牌的逻辑  (录像时，所有人都要处理手牌)
        if(pos == UserPosition.Down || this.bReplay == true) {
            if(this.curTouchCard == null) {  //自动出牌
                if(this.curGetCard != null) {  //有摸牌，则自动出摸到的牌
                    this.curGetCard.recycle();
                    this.removeHandCardByCard(this.curGetCard,pos);
                } else {  //没有摸牌，则自动从手牌中挑选符合牌值的牌
                    var cardList = this.handCardList[pos];
                    var len = cardList.length;
                    for(var i = 0;i < len;i++) {
                        var card: Card = cardList[i];
                        if(card.cardValue == cardValue) {
                            card.recycle();
                            this.removeHandCardByCard(card,pos);
                            break;
                        }
                    }
                    this.showHandCard(pos);
                }
            } else if(this.curTouchCard == this.curGetCard) { //点击出牌,出牌=摸牌（有摸牌）
                this.removeHandCardByCard(this.curTouchCard,pos);
                this.curTouchCard.recycle();
            } else if(this.curTouchCard != this.curGetCard) { //点击出牌，出牌 != 摸牌
                if(this.curGetCard == null) { //没有摸牌，则删掉出牌，然后排列牌组
                    this.removeHandCardByCard(this.curTouchCard,pos);
                    this.curTouchCard.recycle();
                    this.showHandCard(pos);
                } else {  //有摸牌，则删掉出牌，然后将摸牌加入到手牌
                    this.addCardToHand(this.curGetCard,pos,bAnim);
                }
            }
        } else {
            //其他人出牌，直接出最后一张
            var card: Card = this.handCardList[pos].pop();
            card && card.recycle();
        }
        this.curGetCard = null;
        this.curTouchCard = null;
    }

    /**
     * 添加牌到出牌区
     * @pos 位置
     * @card 出牌
     * @bAnim 是否需要移动牌的动画
     */
    public addCardToOut(pos: UserPosition,card: Card,bAnim: boolean = true) {
        this.outGroup.addChild(card);
        var outLen = this.outList[pos].length;
        var row = Math.floor(outLen / this.outRowLimit);  //1行排不下，超过n张时，排到第2行
        outLen = outLen % this.outRowLimit;                 //第一行第几张

        //玩家在多次碰之后，会多打出几张牌，由于没有第四行，所以多出的牌放在第三行
        if(row > 2) {
            row = 2;
            outLen += this.outRowLimit;
        }

        var endX;
        var endY;
        //获取出牌移动的终点位置
        if(row == 0) {
            var outRect: egret.Point = this.outRectList[pos];
        } else if(row == 1) {
            var outRect: egret.Point = this.out1RectList[pos];
        } else if(row >= 2) {
            var outRect: egret.Point = this.out2RectList[pos];
        }
        if(pos == UserPosition.Down) {
            endX = outRect.x + this.outInvalXList[pos] * outLen;
            endY = outRect.y + this.outInvalYList[pos];
        } else if(pos == UserPosition.R) {
            endX = outRect.x + this.outInvalXList[pos] * outLen;
            endY = outRect.y + this.outInvalYList[pos] * outLen;
            if(row == 0) {
                this.outGroup.setChildIndex(card,0);
            } else if(row == 1 && outLen == 0) {

            } else {
                var index = this.outGroup.getChildIndex(this.outList[pos][this.outList[pos].length - 1]);
                this.outGroup.setChildIndex(card,index - 1);
            }
        } else if(pos == UserPosition.Up) {
            endX = outRect.x - this.outInvalXList[pos] * outLen;
            endY = outRect.y + this.outInvalYList[pos];
        } else if(pos == UserPosition.L) {
            endX = outRect.x + this.outInvalXList[pos] * outLen;
            endY = outRect.y + this.outInvalYList[pos] * outLen;
        }
        //移动牌 是否是回放
        if(bAnim) {
            this.moveCardToOut(card,endX,endY,pos,row,outLen);
        } else {
            this.setOutCardIndex(pos,card,row,outLen);
            card.x = endX;
            card.y = endY;
            this.showOutFlag(card,pos);
        }

        //处理出牌逻辑
        this.outList[pos].push(card);
        this.curOutCard = card;
    }

    //移动牌到出牌区域
    private moveCardToOut(card,endX,endY,pos,row,outLen) {
        egret.Tween.get(card).to({ x: endX,y: endY },this.outMoveTime).call(() => {
            this.setOutCardIndex(pos,card,row,outLen);
            this.showOutFlag(card,pos);
        });
    }

    //出牌深度排序  出过的牌多行显示时，牌层深度需要调整，否则会出现重叠
    private setOutCardIndex(pos,card,row,outLen) {
        if(pos == UserPosition.Up) {
            this.outGroup.setChildIndex(card,0);
        }
    }

    //显示出牌指示器
    private showOutFlag(card,pos) {
        this.outFlag.show(card,pos);
        this.outFlagGroup.addChild(this.outFlag);
    }


    /**
     * 出牌!=摸牌时，删除出牌，将摸牌添加进手牌
     * @addCard 待加入的牌
     * @pos 位置
     * @bAnim 是否播放动画
     */
    public addCardToHand(addCard: Card,pos: UserPosition,bAnim: boolean = true) {
        console.log("添加到手牌,牌值:",addCard.cardValue + ";" + "坐标：" + addCard.x + "," + addCard.y);
        //放下所有牌
        this.downAllHandCard();
        //将出牌移除
        var touchIndex = this.handCardList[pos].indexOf(this.curTouchCard);
        this.curTouchCard.recycle();
        this.removeHandCardByCard(this.curTouchCard,pos);

        //摸牌加入动画
        if(pos == UserPosition.Down) {
            if(bAnim) {
                //找到摸牌应该加入的位置
                var intervalX = this.handInvalXList[pos];
                var intervalY = this.handInvalYList[pos];
                var startX = this.handRectList[pos].x;
                var startY = this.handRectList[pos].y;
                var handList = this.handCardList[pos];
                var joinIndex = this.cardLogic.getJoinCardPos(addCard,handList);

                //摸牌动画
                var vTime = 300; //垂直移动时间
                var hTime = 300; //水平移动时间
                //摸牌加入位置是最右边，则直接平移
                if(joinIndex == 0) {
                    egret.Tween.get(addCard).to({ x: joinX,y: joinY },hTime).call(() => {
                        this.showHandCard(pos);
                    });
                } else {
                    //假如牌是在下面一行
                    if(joinIndex < 7) {
                        var joinX = joinIndex * intervalX + startX;
                        var joinY = joinIndex * intervalY + startY;
                        //将摸牌上移，再平移，再下移
                        egret.Tween.get(addCard).to({ y: addCard.y - addCard.height },vTime)
                            .to({ x: joinX },hTime).wait(hTime)
                            .to({ y: joinY },vTime).call(() => {
                                addCard.x = joinX;
                                addCard.y = joinY;
                                this.showHandCard(pos);
                            });
                    } else if(joinIndex == 7) {
                        var joinX = (joinIndex - 7) * intervalX + startX + this.myHandCardAdjustX;
                        var joinY = (joinIndex - 7) * intervalY + startY;
                        //在上面一行 第一张牌
                        egret.Tween.get(addCard).to({ y: addCard.y - this.myHandCardAdjustY },vTime)
                            .to({ x: joinX },hTime).wait(hTime)
                            .to({ y: joinY - this.myHandCardAdjustY },vTime).call(() => {
                                addCard.x = joinX;
                                addCard.y = joinY;
                                this.showHandCard(pos);
                            });
                    } else {
                        var joinX = (joinIndex - 7) * intervalX + startX + this.myHandCardAdjustX;
                        var joinY = (joinIndex - 7) * intervalY + startY;
                        //在上面一行
                        egret.Tween.get(addCard).to({ y: addCard.y - addCard.height - this.myHandCardAdjustY },vTime)
                            .to({ x: joinX },hTime).wait(hTime)
                            .to({ y: joinY - this.myHandCardAdjustY },vTime).call(() => {
                                addCard.x = joinX;
                                addCard.y = joinY;
                                this.showHandCard(pos);
                            });
                    }
                }

                //将手牌移动，空出加入位置
                var handLen = handList.length;
                var moveCard: Card;
                var startIndex = (touchIndex > joinIndex) ? joinIndex : (touchIndex);
                var endIndex = (touchIndex > joinIndex) ? (touchIndex) : joinIndex;
                var intervalX = (touchIndex > joinIndex) ? this.handInvalXList[pos] : -this.handInvalXList[pos];
                for(var i = startIndex;i < endIndex;i++) {
                    moveCard = handList[i];
                    if(joinIndex == 0) {
                        egret.Tween.get(moveCard).to({ x: moveCard.x + intervalX },hTime);
                    } else {
                        egret.Tween.get(moveCard).wait(hTime + vTime).to({ x: moveCard.x + intervalX },vTime);
                    }
                }
            } else {
                //无动画，则直接排列手牌即可
                this.showHandCard(pos);
            }

        } else if(pos == UserPosition.R) {
            this.showHandCard(pos);
        } else if(pos == UserPosition.Up) {
            this.showHandCard(pos);
        } else if(pos == UserPosition.L) {
            this.showHandCard(pos);
        }

    }

    /**
     * 动作处理，吃(碰杠)牌后将进牌和手牌排列
     * @act 动作类型
     * @pos 位置
     * @cardList 吃碰杠的牌列表
     * @actParam 特殊牌值
     */
    private eatHandler(act: ACT_act,pos: number,cardList,actParam: number) {
        //服务端没有传送完整牌值列表，这里拼接牌值列表
        var cardValue = cardList[0];
        var eatCardList = [];    //需要显示到吃碰区域的牌
        var deleteCardList = []; //需要从手上删除的牌

        if(act == ACT_act.Act_Peng) {
            eatCardList = [cardValue,cardValue,cardValue];
            deleteCardList = [cardValue,cardValue];
        } else if(act == ACT_act.Act_Chi) {
            eatCardList = cardList;
            deleteCardList = [cardList[1],cardList[2]];
            ArrayTool.sortArr(eatCardList);
        } else if(act == ACT_act.Act_Gang) {
            if(actParam == 1) {  //1补杠
                eatCardList = [cardValue];
                deleteCardList = [cardValue];
            } else if(actParam == 3) {  //3点杠
                eatCardList = [cardValue,cardValue,cardValue,cardValue];
                deleteCardList = [cardValue,cardValue,cardValue];
            }
        } else if(act == ACT_act.Act_AnGang) { //暗杠
            eatCardList = [cardValue,cardValue,cardValue,cardValue];
            deleteCardList = [cardValue,cardValue,cardValue,cardValue];
        }

        //显示吃(碰杠)牌   
        this.addCardToEat(eatCardList,pos,act,actParam);
        //删除牌，一张场面上，其余在手牌中
        if(this.curOutCard) {
            this.outList[this.curOutCard.userPos].pop();
            this.curOutCard.recycle();
            this.curOutCard = null;
        }
        this.outFlag.hide();
        var deleteLen = deleteCardList.length;
        if(pos == UserPosition.Down) {
            var handList = this.handCardList[pos];
            for(var i = 0;i < deleteLen;i++) {
                var handLen = handList.length;
                var deleteCardValue = deleteCardList[i];
                for(var j = 0;j < handLen;j++) {
                    var handCard: Card = handList[j];
                    if(handCard.cardValue == deleteCardValue) {
                        handCard.recycle();
                        handList.splice(j,1);
                        break;
                    }
                }
            }
            this.showHandCard(UserPosition.Down);
        }
        else {
            //非回放时，删除末尾牌；回放时，删出指定牌
            if(this.bReplay == false) {
                for(var i = 0;i < deleteLen;i++) {
                    var card: Card = this.handCardList[pos].pop();
                    card.recycle();
                }
            } else {
                var handList = this.handCardList[pos];
                var handLen = handList.length;
                for(var i = 0;i < deleteLen;i++) {
                    var deleteCardValue = deleteCardList[i];
                    for(var j = 0;j < handLen;j++) {
                        var card: Card = handList[j];
                        if(card.cardValue == deleteCardValue) {
                            handList.splice(j,1);
                            card.recycle();
                            break;
                        }
                    }
                }
            }

        }
    }

    /**
     * 添加吃碰等牌到吃碰区域
     * @cardList 吃(碰杠)的牌
     * @pos 位置
     * @act 动作
     * @actParam 特殊牌值
     */
    private addCardToEat(cardList,pos: number,act: ACT_act,actParam: number) {
        var eatNum = this.eatCount[pos];               //已吃(碰杠)次数
        this.eatList[pos][eatNum] = [];                //吃(碰杠)牌列表
        var rect: egret.Point = this.eatRectList[pos]; //吃(碰杠)定位
        var len = cardList.length;                     //吃(碰杠)牌长度
        var invalX;                                    //排列x间隔
        var invalY;                                    //排列y间隔
        var eatCard: Card;                              //当前处理的吃(碰杠)牌
        var bGang: boolean = false;                     //是否是杠牌
        //判断是否是杠
        if(act == ACT_act.Act_AnGang || act == ACT_act.Act_Gang) {
            bGang = true;
        }

        //循环吃(碰杠)牌列表，将所有牌排列到吃(碰杠)区域
        for(var i = 0;i < len;i++) {
            //暗杠。自己暗杠，第4张牌显示，其余盖着;其他人暗杠，则全部盖着
            if(act == ACT_act.Act_AnGang) {
                //回放时，暗杠都是明牌  
                if(this.bReplay) {
                    eatCard = this.cardFactory.getEatCard(cardList[i],pos);
                } else {
                    if(i == 3 && pos == UserPosition.Down) {
                        eatCard = this.cardFactory.getEatCard(cardList[i],pos);
                    } else {
                        eatCard = this.cardFactory.getAnGangCard(cardList[i],pos);
                    }
                }
            } else {
                //明杠。actParam=1补杠，只处理最后一张
                eatCard = this.cardFactory.getEatCard(cardList[i],pos);
                if(act == ACT_act.Act_Gang && (actParam == 1)) {
                    i = 3;
                    //寻找杠牌堆位置
                    var gangCardValue = cardList[0];
                    var eatLen = this.eatList[pos].length;
                    for(var j = 0;j < eatLen;j++) {
                        if(this.eatList[pos][j][0]) {
                            if(this.eatList[pos][j][0].cardValue == gangCardValue) {
                                eatNum = j;
                                break;
                            }
                        }
                    }
                    this.eatCount[pos] -= 1;
                }
            }
            //根据位置，排列牌到正确位置
            if(pos == UserPosition.Down) {
                if(eatNum > 2) {
                    invalX = this.eatInvalXList[pos] * ((eatNum - 3) * this.pengLimit + i) + this.multiEatInvalXList[pos] * (eatNum - 3);
                    invalY = this.hand0_start.y;
                    if(bGang && i == 3) {  //杠牌时，位置
                        invalX += this.gangInvalXList[pos];
                        invalY += this.ganeInvalYList[pos];
                    };
                    eatCard.x = rect.x + invalX * this.cardRatioXY;    //根据下面scaleX调整，否则碰牌会遮挡手牌
                    eatCard.y = invalY; //自己吃牌会被缩小，这里微调缩小后y位置
                    eatCard.scaleX = this.cardRatioXY
                    eatCard.scaleY = this.cardRatioXY;
                } else {
                    invalX = this.eatInvalXList[pos] * (eatNum * this.pengLimit + i) + this.multiEatInvalXList[pos] * eatNum;
                    invalY = 0;
                    if(bGang && i == 3) {  //杠牌时，位置
                        invalX += this.gangInvalXList[pos];
                        invalY += this.ganeInvalYList[pos];
                    };
                    eatCard.x = rect.x + invalX * this.cardRatioXY;    //根据下面scaleX调整，否则碰牌会遮挡手牌
                    eatCard.y = rect.y + invalY * this.cardRatioXY; //自己吃牌会被缩小，这里微调缩小后y位 置
                    eatCard.scaleX = this.cardRatioXY
                    eatCard.scaleY = this.cardRatioXY;
                }

                //假如碰或杠或吃 有三组以上，计算他们的位置，大于那个位置重新排列碰牌位置
            } else if(pos == UserPosition.R) { //牌组从下往上牌
                invalX = -this.eatInvalXList[pos] * (eatNum * this.pengLimit + i);
                invalY = this.eatInvalYList[pos] * (-eatNum * this.pengLimit - i) - this.multiEatInvalYList[pos] * eatNum;
                if(bGang && i == 3) {  //杠牌时，位置
                    invalX = -this.eatInvalXList[pos] * (eatNum * this.pengLimit + i - 2) + this.gangInvalXList[pos];
                    invalY += this.ganeInvalYList[pos];
                }
                eatCard.x = rect.x + invalX;
                eatCard.y = rect.y + invalY;

            } else if(pos == UserPosition.Up) {
                invalX = this.eatInvalXList[pos] * (-eatNum * this.pengLimit - i) - this.multiEatInvalXList[pos] * eatNum;
                invalY = 0;
                if(bGang && i == 3) {
                    invalX += this.gangInvalXList[pos];
                    invalY += this.ganeInvalYList[pos];
                };
                eatCard.x = rect.x + invalX;
                eatCard.y = rect.y + invalY;
            } else if(pos == UserPosition.L) {
                invalX = this.eatInvalXList[pos] * (eatNum * this.pengLimit + i);
                invalY = this.eatInvalYList[pos] * (eatNum * this.pengLimit + i) + this.multiEatInvalYList[pos] * eatNum;
                if(bGang && i == 3) {
                    invalX = this.eatInvalXList[pos] * (eatNum * this.pengLimit + i - 2) + this.gangInvalXList[pos];
                    invalY += this.ganeInvalYList[pos];
                }
                eatCard.x = rect.x + invalX;
                eatCard.y = rect.y + invalY;
            }
            this.cardGroup.addChild(eatCard);

            //R玩家，因为深度排序问题，特殊处理
            if(pos == UserPosition.R && bGang && i == 3) {
                this.eatList[pos][eatNum].unshift(eatCard);
            } else {
                this.eatList[pos][eatNum].push(eatCard);
            }

        }

        //手牌和吃(碰杠)牌深度排序
        if(pos == UserPosition.L) {
            var len = this.handCardList[pos].length;
            for(var i = len - 1;i >= 0;i--) {
                this.cardGroup.addChild(this.handCardList[pos][i]);
            }
        } else if(pos == UserPosition.R) {
            //            //重置手牌的位置
            console.log("杠牌通过这里" + this.hand1_start.x + ":" + this.hand1_start.y);
            var handLen = this.handCardList[pos].length;
            //这块的添加手牌需要 for ++;否则会出现深度问题
            for(var e = 0;e <handLen;e++) {
                this.cardGroup.addChild(this.handCardList[pos][e]);
            }

            var len = this.eatList[pos].length;
            for(var i = len - 1;i >= 0;i--) {
                var len2 = this.eatList[pos][i].length;
                for(var j = len2 - 1;j >= 0;j--) {
                    this.cardGroup.addChild(this.eatList[pos][i][j]);
                }
            }
        }
        //增加吃(碰杠)次数
        this.eatCount[pos] += 1;
        console.log(this.eatCount[pos],"杠牌通过111")
    }

    //根据牌值移除手牌
    private removeHandCardByValue(cardValue,pos: UserPosition) {
        var cardList = this.handCardList[pos];
        var len = cardList.length;
        var card: Card;
        for(var i = 0;i < len;i++) {
            card = cardList[i];
            if(cardValue == card.cardValue) {
                cardList.splice(i,1);
                return card;
            }
        }
    }

    //根据牌Card移除手牌
    private removeHandCardByCard(targetCard: Card,pos: UserPosition) {
        var cardList = this.handCardList[pos];
        var len = cardList.length
        var card: Card;
        for(var i = 0;i < len;i++) {
            card = cardList[i];
            if(card == targetCard) {
                cardList.splice(i,1);
                return card;
            }
        }
    }

    //显示桌面上的牌
    private showDeskCard() {
        var json = ProtocolData.Rev180_58_0;
        var resultList = json.resultList;
        var len = resultList.length;
        for(var i = 0;i < len;i++) {
            var resultInfo = ProtocolData.resultInfo;
            resultInfo = resultList[i];
            var pos = this.cardLogic.changeSeat(resultInfo.seatID);

            //摊开暗杠手牌
            var anGangCards = resultInfo.anGangCards;
            if(anGangCards && anGangCards.length > 0) {
                var anGangLen = anGangCards.length;
                for(var j = 0;j < anGangLen;j++) {   //遍历游戏暗杠结果数组
                    var anGangCardValue = anGangCards[j];
                    var eatLen = this.eatList[pos].length;
                    for(var k = 0;k < eatLen;k++) {  //遍历游戏吃(碰杠)数组
                        if(this.eatList[pos][k].length == 4) {
                            if(this.eatList[pos][k][0].cardValue == anGangCardValue) {
                                //将盖着的牌替换成明牌
                                for(var m = 0;m < 4;m++) {
                                    var newCard: Card = this.cardFactory.getEatCard(anGangCardValue,pos);
                                    var oldCard: Card = this.eatList[pos][k][m];
                                    newCard.x = oldCard.x;
                                    newCard.y = oldCard.y;
                                    //是自己的  按照比例缩小
                                    if(pos==0){
                                        newCard.scaleX = this.cardRatioXY
                                        newCard.scaleY = this.cardRatioXY;
                                    }
                                    oldCard.recycle();
                                    this.cardGroup.addChild(newCard);
                                    this.eatList[pos][k][m] = newCard; 
                                }
                            }
                        }
                    }
                }
            }

            //自己手牌不需要摊开
            if(pos == UserPosition.Down) {
                continue;
            }

            //移除当前位置玩家手牌
            var handList = this.handCardList[pos];
            var handLen = handList.length;
            for(var j = 0;j < handLen;j++) {
                var card: Card = handList[j];
                card.recycle();
            }
            handList.length = 0;

            //添加当前位置玩家手牌
            var cards = resultInfo.cards;
            this.addCardToEat(cards,pos,ACT_act.Act_Chi,0);

        }
    }

    //显示出牌效果
    private showOutEffect(cardValue: number,pos: UserPosition) {
        var group: eui.Group = this.outEffectList[pos];
        if(group.numChildren <= 1) {
            var card: Card = this.cardFactory.getHandCard(cardValue,UserPosition.Down);
            group.addChild(card);
            card.x = (group.width - card.cardBg.width) / 2 + 2; //微调
            card.y = (group.height - card.cardBg.height) / 2 + 2;
        } else {
            card = <Card>group.getChildAt(1);
            card.setHandSkin(cardValue,UserPosition.Down);
        }
        this.outEffectGroup.addChild(group);
        egret.Tween.get(group).wait(this.outEffectTime).call(() => {
            group.parent && group.parent.removeChild(group);
        });
    }

    //隐藏所有出牌效果
    private hideAllOutEffect() {
        this.outEffectGroup.removeChildren();
    }

    //开始出牌计时器
    private startOutTimer(time) {
        if(this.bReplay) {  //回放不使用出牌计时
            return;
        }
        this.outTimer.addEventListener(egret.TimerEvent.TIMER,this.onOutTime,this);
        this.outTimer.repeatCount = time;
        this.curOutTimeLimit = time;
        this.outTimer.reset();
        this.outTimer.start();
        this.setCdLabel(NumberTool.formatTime(time) + "");
    }

    //出牌计时处理
    private onOutTime(e: egret.TimerEvent) {
        if(this.outTimer.currentCount > this.curOutTimeLimit) {
            this.stopOutTimer();
            return;
        }
        var count = this.curOutTimeLimit - this.outTimer.currentCount;
        this.setCdLabel(NumberTool.formatTime(count) + "");
        if(count <= 3) {
            App.SoundManager.playEffect(SoundManager.warn);
        }
    }

    //停止出牌计时
    private stopOutTimer() {
        this.outTimer.removeEventListener(egret.TimerEvent.TIMER,this.onOutTime,this);
        this.outTimer.stop();
        this.setCdLabel("");
    }

    //开始解散计时器
    private startDismissTimer() {
        this.bAllowDismiss = false;
        this.dismissTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.stopDismissTimer,this);
        this.dismissTimer.reset();
        this.dismissTimer.start();
    }

    //停止解散计时器
    private stopDismissTimer() {
        this.bAllowDismiss = true;
        this.dismissTimer.removeEventListener(egret.TimerEvent.COMPLETE,this.stopDismissTimer,this);
        this.dismissTimer.stop();
    }

    ////////////////////////////////////////////////
    //---------------[界面相关操作]-----------------
    ////////////////////////////////////////////////

    //显示邀请面板
    private showInviteUI() {
        //金币场
        if(App.serverSocket.gameID == Game_ID.GoldRoom) {
            this.zsBtn.visible = false;
            //非金币场
        } else {
            //显示赠送按钮
            if(this.isDeskOwner() == true) {
                //只有房卡场才有赠送
                if(App.serverSocket.gameID == Game_ID.CardRoom) {
                    this.zsBtn.visible = true;
                }
                //显示踢人、禁言
                this.showOverShutupUI();

            } else {
                //其他玩家，第一局之前可以离开，第一局之后需要申请解散房间才能离开
                this.zsBtn.visible = false;
            }
        }
        this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showSharePanel,this);
    }

    //隐藏邀请面板
    private hideInviteUI() {
        this.zsBtn.visible = false;
        this.inviteBtn.visible = false;
    }

    //显示踢人、禁言 面板
    private showOverShutupUI() {
        if(this.isDeskOwner() == true) {
            this.overShutupGroup.visible = true;
        } else {
            this.overShutupGroup.visible = false;
        }
    }
    //隐藏踢人、禁言 面板
    public hideOverShutupUI() {
        //        this.overShutupGroup.visible = false;
        for(var i = 0;i < this.overShutupGroup.numChildren;i++) {
            this.overShutupGroup.getChildAt(i).visible = false;
        }
    }


    /**检查人满后隐藏邀请按钮*/
    public checkInviteBtn() {
        //金币场无邀请好友
        if(App.serverSocket.gameID == Game_ID.CardRoom || App.serverSocket.gameID == Game_ID.selfRoom) {
            var userNum = App.DataCenter.UserInfo.getUserNum();
            if(userNum >= 4) {
                this.inviteBtn.visible = false;
            } else {
                this.inviteBtn.visible = true;
            }
        } else {
            this.inviteBtn.visible = false;
        }
    }

    //显示结算面板
    public showResultPanel() {
        console.log("显示结算面板");
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onDragCardMove,this);
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onDragCardEnd,this);
        App.PanelManager.open(PanelConst.ResultPanel,() => {
            console.log("结算面板添加到舞台");
            this.readyBtn.visible = false;
            var resultPanel: ResultPanel = App.PanelManager.getPanel(PanelConst.ResultPanel);
            resultPanel.continueBt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.autoReady,this);
            resultPanel.updateInfo(ProtocolData.Rev180_58_0);
            this.hideZhuaMaPanel();
            this.updatePoint();
        },this,false);
    }

    //隐藏结算面板
    private hideResultPanel() {
        var resultPanel: ResultPanel = App.PanelManager.close(PanelConst.ResultPanel);
        if(resultPanel) {
            this.readyBtn.visible = true;
            resultPanel.continueBt.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.autoReady,this);
        }
    }

    //播放赢特效
    private showWinEffect() {
        this.winEffect || (this.winEffect = new WinEffect());
        this.topGroup.addChild(this.winEffect);
    }

    //隐藏赢特效
    private hideWinEffect() {
        if(this.winEffect) {
            this.winEffect.hide();
        }
    }

    //播放输特效
    private showLoseEffect() {
        this.loseEffect || (this.loseEffect = new LoseEffect());
        this.topGroup.addChild(this.loseEffect);
    }

    //隐藏输特效
    private hideLoseEffect() {
        if(this.loseEffect) {
            this.loseEffect.hide();
        }
    }

    //播放流局特效
    private showLiuJuEffect() {
        this.liuJuEffect || (this.liuJuEffect = new LiuJuEffect());
        this.topGroup.addChild(this.liuJuEffect);
    }

    //播放流局特效
    private hideLiuJuEffect() {
        if(this.liuJuEffect) {
            this.liuJuEffect.hide();
        }
    }

    //自动准备
    private autoReady() {
        App.PanelManager.close(PanelConst.ResultPanel);
        this.hideTuoGuan(UserPosition.Down);
        this.hideActUI();

        if(this.curPlayCount != this.maxPlayCount || App.serverSocket.gameID == Game_ID.GoldRoom) {
            this.resetGame();
            this.sendReady();
        } else {
            this.gameUIGroup.touchChildren = true;
            this.showToHallBtn();
        }
    }

    //继续游戏
    private onContinue() {
        App.PanelManager.close(PanelConst.ResultPanel);
        this.hideTuoGuan(UserPosition.Down);
        this.hideActUI();
        if(this.curPlayCount != this.maxPlayCount || App.serverSocket.gameID == Game_ID.GoldRoom) {
            this.showReadyBtn();
        } else {
            this.gameUIGroup.touchChildren = true;
            this.showToHallBtn();
        }
    }

    //显示牌局信息
    public showMatchInfoPanel() {
        egret.Tween.get(this).wait(600);
        App.PanelManager.open(PanelConst.MacthInfoPanel);
    }

    //隐藏牌局信息
    private hideMatchInfoPanel() {
        App.PanelManager.close(PanelConst.MacthInfoPanel);
    }

    //显示抓马面板
    private showZhuaMaPanel() {
        var zhuaMaPanel: ZhuaMaPanel = App.PanelManager.open(PanelConst.ZhuaMaPanel,null,null,null,true);
        zhuaMaPanel.addEventListener("ZhuaMaComplete",this.showResultPanel,this);
    }

    //隐藏抓马面板
    private hideZhuaMaPanel() {
        App.PanelManager.close(PanelConst.ZhuaMaPanel);
    }

    //显示分享
    private showSharePanel() {
        if(App.DeviceUtils.IsWeb) {
            var sharePanel: SharePanel = App.PanelManager.open(PanelConst.SharePanel);
            //sharePanel.showShareFriend();
        } else {
            App.EventManager.sendEvent(App.EVENT_NATIVE_WXSHARE,false);
        }
    }

    //显示番型说明
    private showFanTypeUI() {
        App.PanelManager.open(PanelConst.RulePanel);
    }

    //隐藏番型说明
    private hideFanTypeUI() {
        App.PanelManager.close(PanelConst.RulePanel);
    }




    //点击聊天按钮 
    private showChatPanel() {
        App.PanelManager.open(PanelConst.ChatPanel,() => {
            var chatPanel: ChatPanel = App.PanelManager.getPanel(PanelConst.ChatPanel);
            if(chatPanel) {
                chatPanel.setRecord(this.chatRecordStr);
            }
        },this);
    }

    //隐藏聊天面板
    private hideChatPanel() {
        App.PanelManager.close(PanelConst.ChatPanel);
    }

    //显示准备图标
    public showReady(pos: UserPosition) {
        //最初状态准备按钮
        if(this.headUIList[0].x != this.headUIPointXlist[0]) {
            this.readyList = this.readyList1;
            this.readyGroup.addChild(this.readyList[pos]);
        } else {
            this.readyList = this.readyList2;
            this.readyGroup.addChild(this.readyList[pos]);
        }
    }

    //隐藏准备图标
    public hideReady(pos: UserPosition) {
        if(this.readyList.length) {
            var ready = this.readyList[pos];
            ready.parent && ready.parent.removeChild(ready);
        }
    }

    //隐藏所有准备图标
    public hideAllReady() {
        this.readyGroup.removeChildren();
    }

    //设置所有准备图标的visible
    public setAllReadyVisible() {
        var len = this.readyList.length;
        for(var i = 0;i < len;i++) {
            this.readyList[i].visible = true;
        }
    }

    //设置准备按钮
    public showReadyBtn() {
        this.readyGroup.addChild(this.readyBtn);
    }

    //隐藏准备按钮
    public hideReadyBtn() {
        this.readyBtn.parent && this.readyBtn.parent.removeChild(this.readyBtn);
    }

    //显示返回大厅按钮
    private showToHallBtn() {
        this.readyGroup.addChild(this.toHallBtn);
    }

    //隐藏返回大厅按钮
    private hideToHallBtn() {
        this.toHallBtn.parent && this.toHallBtn.parent.removeChild(this.toHallBtn);
    }

    //转换已进入玩家的seatID
    private changeAllUserSeat() {
        var userList = App.DataCenter.UserInfo.userList;
        for(var key in userList) {
            userList[key].userPos = this.cardLogic.changeSeat(userList[key].seatID);
        }
    }

    //显示已进入房间的玩家头像和准备
    private setInviteUserHead() {
        var userList = App.DataCenter.UserInfo.userList;
        console.log("设置已进入邀请界面玩家的头像,用户列表:",userList);
        for(var key in userList) {
            this.updateUserHead(userList[key]);
        }
    }

    //设置已进入房间玩家状态
    private setUserReady() {
        var userList = App.DataCenter.UserInfo.userList;
        console.log("设置玩家状态,用户列表:",userList);
        for(var key in userList) {
            var userVo: UserVO = userList[key];
            //设置准备
            if(userVo.checkState(PLAYER_STATE.READY)) {
                this.showReady(userVo.userPos);
            } else {
                if(userVo.userPos == UserPosition.Down) {
                    this.showReadyBtn();
                }
            }
        }
    }
    


    /**显示玩家头像、昵称等信息*/
    public updateUserHead(userVo: UserVO) {
        if(userVo) {
            var deskVo: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
            userVo.userPos = this.cardLogic.changeSeat(userVo.seatID);
            var headUI: HeadUI = this.headUIList[userVo.userPos];

            headUI.loadImg(userVo.headUrl);
            headUI.nameLabel.text = StringTool.formatNickName(userVo.nickName);
            headUI.scoreLabel.text = NumberTool.formatMoney(userVo.point);

            headUI.userID = userVo.userID;
            headUI.seatID = userVo.seatID;
            //显示房主标识
            deskVo && (headUI.headOwner.visible = userVo.userID == deskVo.ownerID);
            this.headGroup.addChild(headUI);
            //显示踢人、禁言(当是自己是房主的时候才可以显示踢人、禁言)
            if(this.isDeskOwner() == true) {
                if(userVo.userPos != UserPosition.Down) {
                    this.gameKickList[userVo.userPos - 1].visible = true;
                    if(App.DataCenter.gameState == GameState.Playing || App.DataCenter.gameState == GameState.DealCard){
                        //禁言显示
                        headUI.headShutup.visible = true;
                    }
                    if(this.headUIList[0].x != this.headUIPointXlist[0]) {
                        this.gameShutupList[userVo.userPos - 1].visible = true
                    } else {
                        var shuImage: eui.Image = this.gameShutupList[userVo.userPos - 1];
                        shuImage.bitmapData = RES.getRes("game_shutup0_png");
                        this.gameShutupList[userVo.userPos - 1].visible = false;

                    }
                } else {
                    headUI.headShutup.visible = false;
                }
            } else {
                headUI.headShutup.visible = false;
            }
            this.ctrl.registerSocket();
            //头像设置表情动画
            //            headUI.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showActFaceUI, this);
        }
    }

    /**离线玩家3分钟后被自动踢出弹出提示框*/
    private evShowPlayerKick() {
        var msg = App.MsgBoxManager.getBoxB();
        msg.showMsg("玩家因离线3分钟未准备，被自动请离房间!")
    }

    /**更新积分(金币)*/
    public updatePoint() {
        var userList = App.DataCenter.UserInfo.userList;
        for(var key in userList) {
            var userVo: UserVO = userList[key];
            this.headUIList[userVo.userPos].scoreLabel.text = NumberTool.formatMoney(userVo.point);

        }
    }

    //隐藏玩家头像
    public hideHeadUI(pos) {
        var headUI: HeadUI = this.headUIList[pos];
        headUI.clear();
        headUI.headShutup.visible = false;
//        headUI.hide();
    }

    //清理头像UI
    private hideAllHeadUI() {
        var len = this.headUIList.length;
        var headUI: HeadUI;
        for(var i = 0;i < len;i++) {
            headUI = this.headUIList[i];
            headUI.clear();
            headUI.headShutup.visible = false;
//            headUI.hide();
        }
    }


    //隐藏所有rect
    private hideAllCardRect() {
        var len = this.rectGroup.numChildren;
        for(var i = 0;i < len;i++) {
            this.rectGroup.getChildAt(i).visible = false;
        }
    }

    //显示中间圆盘
    private showDisc() {
        this.discGroup.visible = true;
        //        this.deskLogo.visible = false;
    }

    //隐藏中间圆盘
    private hideDisc() {
        this.discGroup.visible = false;
        //        this.deskLogo.visible = true;
    }

    //显示中间圆盘光
    private showLight(pos: UserPosition) {
        this.hideAllLight();
        this.redDiscList[pos].visible = true;
        egret.Tween.get(this.redDiscList[pos],{ loop: true }).to({ alpha: 0.1 },this.lightFlashTime).to({ alpha: 1 },this.lightFlashTime);
    }

    //隐藏所有光
    private hideAllLight() {
        var len = this.redDiscList.length;
        var light;
        for(var i = 0;i < len;i++) {
            this.redDiscList[i].alpha = 1;
            this.redDiscList[i].visible = false;
            egret.Tween.removeTweens(this.redDiscList[i]);
        }
    }

    //显示圆盘上的风位(东南西北)
    private showDiceFengWei(pos: UserPosition) {
        this.hideAllFengWei();
        this.fengList[pos].visible = true;
    }

    //显示桌子（圆盘下方）的风位风圈字
    private showTextFengWei(fengWei,fengQuan) {
        var fengWeiStr = this.cardLogic.getFengStr(fengWei);
        var fengQuanStr = this.cardLogic.getFengStr(fengQuan);
        this.fengQuanLabel.text = fengQuanStr + "风" + fengWeiStr + "局";
    }

    //隐藏所有风位
    private hideAllFengWei() {
        var len = this.fengList.length;
        for(var i = 0;i < len;i++) {
            this.fengList[i].visible = false;
        }
    }
    
    //显示表情
    private faceMovie: FaceMovie;
    private showChatFace(seatID: number,id: number) {
        var pos = this.cardLogic.changeSeat(seatID);
        console.log(id+"=表情id");
        if(this.faceMovie){
            this.faceMovie.parent && this.faceMovie.parent.removeChild(this.faceMovie);
        }        
        this.faceMovie = FaceFactory.getInstance().getFaceMovie(id);
        this.faceMovie.play(3);
        this.chatGroup.addChild(this.faceMovie);
        this.faceMovie.once(egret.Event.COMPLETE,() => {
            this.faceMovie.stop();
            this.faceMovie.parent && this.faceMovie.parent.removeChild(this.faceMovie);
        },this);

        var headUI = this.headUIList[pos];
        var headImg = headUI.headImg;
        this.faceMovie.x = headUI.x + headImg.x + (headImg.width - this.faceMovie.width) + 50;
        this.faceMovie.y = headUI.y + headImg.y + (headImg.height - this.faceMovie.height) / 2;
//        var faceMovie: FaceMovie = FaceFactory.getInstance().getFaceMovie(id);
//        faceMovie.play(3);
//        this.chatGroup.addChild(faceMovie);
//        faceMovie.once(egret.Event.COMPLETE,() => {
//            faceMovie.stop();
//            faceMovie.parent && faceMovie.parent.removeChild(faceMovie);
//        },this);
//
//        var headUI = this.headUIList[pos];
//        var headImg = headUI.headImg;
//        faceMovie.x = headUI.x + headImg.x + (headImg.width - faceMovie.width) + 50;
//        faceMovie.y = headUI.y + headImg.y + (headImg.height - faceMovie.height) / 2;
    }

    //隐藏聊天表情
    private hideChatFace(seatID: number) {
        var pos = this.cardLogic.changeSeat(seatID);
        var face: eui.Image = this.faceList[pos];
        face.parent && face.parent.removeChild(face);
    }

    //显示聊天常用语
    private showChatText(seatID: number,msg: string,msgType) {
        console.log("显示聊天记录");
        var pos = this.cardLogic.changeSeat(seatID);
        var chatIndex = parseInt(msg);

        if(this.headUIList[0].x != this.headUIPointXlist[0]) {
            this.commLabelList = this.commLabelList2;
        } else {
            this.commLabelList = this.commLabelList1;
        }

        //显示聊天
        var labelGroup: eui.Group = this.commLabelList[pos];
        var label: eui.Label = this.commLabelList[pos].getChildAt(1);
        if(msgType == CHAT_TYPE.Common) {
            label.text = App.DataCenter.GameInfo.Chat_Msg[chatIndex];
            var userVo: UserVO = App.DataCenter.UserInfo.getUserBySeatID(seatID);
            if(userVo) {
                App.SoundManager.playChat(chatIndex,userVo.sex);
            }
        } else if(msgType == CHAT_TYPE.Text) {
            label.text = msg;
        }
        this.recoredChat(seatID,label.text);

        this.chatGroup.addChild(labelGroup);
        egret.Tween.removeTweens(labelGroup);
        egret.Tween.get(labelGroup).wait(this.chatShowtTime).call(() => {
            labelGroup.parent && labelGroup.parent.removeChild(labelGroup);
        });

    }

    //记录聊天记录
    private recoredChat(seatID,msg) {
        console.log("聊天记录");
        var deskInfo: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
        var hallScene: HallScene = App.SceneManager.getScene(SceneConst.HallScene);
        if(hallScene.deskCode != deskInfo.deskCode) {
            hallScene.deskCode = deskInfo.deskCode;
            this.clearChatRecord();
        }
        if(!this.chatRecordStr) {
            this.chatRecordStr = new Array();
        }
        var userVO: UserVO = App.DataCenter.UserInfo.getUserBySeatID(seatID);
        var user: boolean;
        if(this.cardLogic.changeSeat(seatID) == 0) {
            user = true;
        } else {
            user = false;
        }
        var recores = [userVO.headUrl,msg,user,userVO.nickName];
        this.chatRecordStr.push(recores);
        if(this.chatRecordStr.length > 50) {
            this.chatRecordStr.splice(0,1)
        }
        var chatPanel: ChatPanel = App.PanelManager.getPanel(PanelConst.ChatPanel);
        if(chatPanel) {
            chatPanel.setRecord(this.chatRecordStr);
        }
    }

    //清理聊天记录
    public clearChatRecord() {
        console.log("清空聊天记录");
        var chatPanel: ChatPanel = App.PanelManager.getPanel(PanelConst.ChatPanel);
        chatPanel && chatPanel.recordGroupLabel.removeChildren();
        chatPanel;
        this.chatRecordStr = null;
    }

    //隐藏聊天文本
    private hideChatText(seatID: number) {
        var pos = this.cardLogic.changeSeat(seatID);
        if(this.commLabelList.length > 0) {
            var label: eui.Label = this.commLabelList[pos];
            label.parent && label.parent.removeChild(label);
        }
    }

    //显示表情UI
    public showActFaceUI(e: egret.TouchEvent) {
        if(e.target instanceof HeadUI) {
            var headUI: HeadUI = e.target;
            var userVo: UserVO = App.DataCenter.UserInfo.getUser(headUI.userID);
            if(userVo) {
                var seatID = userVo.seatID;
                var pos = this.cardLogic.changeSeat(seatID);
                if(pos != UserPosition.Down) {
                    var actFaceUI: ActFaceUI = this.actFaceUIList[pos];
                    actFaceUI.seatID = seatID;
                    if(actFaceUI.parent) {
                        actFaceUI.hide();
                    } else {
                        App.ResUtils.loadGroup(AssetConst.ActFace,this,() => {
                            this.actFaceGroup.addChild(actFaceUI);

                        },null,10);
                    }
                }
            }
        }
    }

    //隐藏所有聊天UI
    private hideAllActFaceUI() {
        var len = this.actFaceUIList.length;
        for(var i = 0;i < len;i++) {
            this.actFaceUIList[i].hide();
        }
    }

    /**
     * 动作表情
     * @seatID 发送者位置
     * @revSeatID 接收者位置(已转换的位置)
     * @actFaceID 动作表情id  0-5
     */
    public showActFace(seatID,revSeatID,actFaceId) {
        var actFace;
        switch(actFaceId) {
            case ACT_FACE.Boom:
                actFace = new ActFaceBoom();
                break;
            case ACT_FACE.FanQie:
                actFace = new ActFaceFanQie();
                break;
            case ACT_FACE.Stone:
                actFace = new ActFaceStone();
                break;
            case ACT_FACE.Zan:
                actFace = new ActFaceZan();
                break;
            case ACT_FACE.Flower:
                actFace = new ActFaceFlower();
                break;
            case ACT_FACE.Kiss:
                actFace = new ActFaceKiss();
                break;
        }
        if(actFace) {
            var moveTime = 300;
            var revPos = this.cardLogic.changeSeat(revSeatID);
            var sendPos = this.cardLogic.changeSeat(seatID);
            var revHead: HeadUI = this.headUIList[revPos];
            var sendHead: HeadUI = this.headUIList[sendPos];
            actFace.x = sendHead.x + sendHead.headImg.x - (actFace.width - sendHead.headImg.width) / 2;
            actFace.y = sendHead.y + sendHead.headImg.y - (actFace.height - sendHead.headImg.height) / 2;
            this.chatGroup.addChild(actFace);
            var xPos = revHead.x + revHead.headImg.x - (actFace.width - revHead.headImg.width) / 2;
            var yPos = revHead.y + revHead.headImg.y - (actFace.height - revHead.headImg.height) / 2;

            egret.Tween.get(actFace).to({ x: xPos,y: yPos },moveTime).call(() => {
                actFace.playAnim();
            });
        }
    }

    //隐藏所有表情
    private hideAllFace() {
        this.chatGroup.removeChildren();
        this.chatGroup0.removeChildren();
    }

    //显示托管
    public showTuoGuan(pos: UserPosition) {
        if(pos == UserPosition.Down) {
            this.bTuoGuan = true;
            this.tuoGuanGroup.visible = true;
            this.tuoGuanGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTuoGuanTouch,this);
        } else {
            (<HeadUI>this.headUIList[pos]).showTuoGuanIcon();
        }
    }

    //点击取消托管
    private onTuoGuanTouch() {
        console.log("发送取消托管");
        this.tuoGuanGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTuoGuanTouch,this);
        this.ctrl.sendTuoGuan(false);
    }

    //隐藏托管
    public hideTuoGuan(pos: UserPosition) {
        if(pos == UserPosition.Down) {
            this.bTuoGuan = false;
            this.tuoGuanGroup.visible = false;
        } else {
            (<HeadUI>this.headUIList[pos]).hideTuoGuanIcon();
        }
    }

    //隐藏所有人托管
    private hideAllTuoGUan() {
        this.bTuoGuan = false;
        for(var i = 0;i < 4;i++) {
            this.hideTuoGuan(i);
        }
    }

    //显示剩余多少张计数
    private showLeftLabel(lastCardNum,curPlayCount) {
        this.leftCardLabel.text = NumberTool.formatTime(lastCardNum) + "张";
        this.curLeftCard = lastCardNum;
        this.juGroup.visible = true;
    }


    //减少剩余牌数
    private reduceLeftCard(reduceNum: number = 1) {
        this.curLeftCard -= reduceNum;
        this.leftCardLabel.text = NumberTool.formatTime(this.curLeftCard) + "张";
    }

    //增加剩余牌数
    private addLeftCard(a:any=1) {
        console.log(a+"增加数")
        this.curLeftCard =this.curLeftCard+1
        this.leftCardLabel.text = NumberTool.formatTime(this.curLeftCard) + "张";
    }

    //隐藏剩余计数
    private hideLeftLabel() {
        this.juGroup.visible = false;
    }

    //显示庄家图标
    private showZhuangFlag(pos: UserPosition) {
        this.setGameHeadPos(pos);
    }

    //隐藏庄家图标
    public hideZhuangFlag() {
        if(this.zhuangFlag) {
            this.zhuangFlag.parent && this.zhuangFlag.parent.removeChild(this.zhuangFlag);
        }
    }

    //显示杠分
    private showGang(pos: UserPosition,point: number) {
        var gang: eui.BitmapLabel
        if(point > 0) {
            gang = this.gangZhengList[pos];
            gang.text = "+" + point;
        } else if(point < 0) {
            gang = this.gangFuList[pos];
            gang.text = "-" + point;
        }
        if(gang) {
            gang.alpha = 1;
            gang.y = this.gangFenYList[pos];
            this.gangFenGroup.addChild(gang);
            egret.Tween.get(gang).to({ y: gang.y - 100,alpha: 0 },4000).call(() => {
                gang.parent && this.gangFenGroup.removeChild(gang);
            });
        }
    }

    /**金币场结算的最终金币。由103_6_0获取结算金币，而不是180_58_0获取结算金币。*/
    public saveWinLossMoney(userID: number,money: number) {
        var userVO: UserVO = App.DataCenter.UserInfo.getUser(userID);
        if(userVO) {
            var pos: UserPosition = this.cardLogic.changeSeat(userVO.seatID);
            this.winLossMoneyList[pos] = money;
        }
    }

    //隐藏所有杠分
    private hideAllGangFen() {
        var len = this.gangZhengList.length;
        for(var i = 0;i < len;i++) {
            var gang = this.gangZhengList[i];
            gang.parent && gang.parent.removeChild(gang);

            var gang = this.gangFuList[i];
            gang.parent && gang.parent.removeChild(gang);
        }
    }

    //显示动作提示
    private showActTip(act: ACT_act,pos: UserPosition) {
        var actTip: ActTipUI = this.actTipList[pos];
        actTip.showAct(act);
        this.tipGroup.addChild(actTip);
    }

    //隐藏所有提示
    private hideAllActTip() {
        var len = this.actTipList.length;
        for(var i = 0;i < len;i++) {
            var tip: ActTipUI = this.actTipList[i];
            tip.hide();
        }
    }

    //显示操作提示
    private showActUI(state: ACT_state) {

        var actList = this.cardLogic.anylzyeActState(state);
        console.log("显示操作提示:",actList);
//        //最后一张牌的时候假如有杠牌则不显示杠牌
//        if(this.curLeftCard == 0){
//            this.selectActUI.updateInfo(actList);
//        }
        this.selectActUI.updateInfo(actList);
        this.selectActUI.addEventListener("sendActEvent",this.onActUITouch,this);
        this.selectActUI.x = (App.StageUtils.stageWidth - this.selectActUI.panelWidth) / 2;
        this.tipGroup.addChild(this.selectActUI);

        //设置托管时不显示
        this.selectActUI.visible = true;
//        if(this.bTuoGuan || this.curLeftCard ==0) {
//            this.selectActUI.visible = false;
//        }
    }

    //隐藏操作提示
    public hideActUI() {
        this.selectActUI.hide();
        this.eatComboUI.hide();
    }

    //点击操作提示
    private onActUITouch(e: egret.TouchEvent) {
        this.selectActUI.hide();
        var state: ACT_state = e.data;
        var act: ACT_act = this.cardLogic.changeStateToAct(state);
        var cardList = [];
        var cardValue = this.curActCard;

        //如果是碰或胡，直接发送
        if(act == ACT_act.Act_Peng || act == ACT_act.Act_Hu) {
            cardList = [cardValue];
            this.sendAct(act,cardList);
            //如果是杠，一种杠法直接发送，多种杠需要客户端自己判断
        } else if(act == ACT_act.Act_Gang || act == ACT_act.Act_AnGang) {
            this.checkGangCombo();
            if(this.gangComboList.length == 1) {
                //判断暗杠或明杠,因为没有暗杠按钮，这里用bAnGang标志位表示明暗杠
                if(act == ACT_act.Act_Gang && this.selectActUI.bAnGang) {
                    act = ACT_act.Act_AnGang;
                }
                cardList = [this.gangComboList[0]];
                this.sendAct(act,cardList);
            } else if(this.gangComboList.length > 1) {
                this.hideActUI();
                this.tipGroup.addChild(this.eatComboUI);
                this.eatComboUI.showGangCombo(this.gangComboList,this.cardFactory,this.handInvalXList[0]);
                this.eatComboUI.addEventListener("selectComboEvent",this.onGangComboTouch,this);
                this.eatComboUI.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEatComboUIPass,this);
                this.eatComboUI.passBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEatComboUIPass,this);
            } else {
                console.error("手上没有能杠的牌");
            }
            //如果是吃，一种吃法则直接发送，多种吃法需要客户端自己判断
        } else if(act == ACT_act.Act_Chi) {
            this.checkEatCombo(cardValue);
            if(this.eatComboList.length == 1) {
                cardList = this.eatComboList[0];
                this.sendAct(act,cardList);
            } else if(this.eatComboList.length > 1) {
                this.hideActUI();
                this.tipGroup.addChild(this.eatComboUI);
                this.eatComboUI.showEatCombo(this.eatComboList,this.cardFactory,this.handInvalXList[0]);
                this.eatComboUI.addEventListener("selectComboEvent",this.onEatComboTouch,this);
                this.eatComboUI.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEatComboUIPass,this);
                this.eatComboUI.passBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEatComboUIPass,this);
            } else {
                console.error("手上没有能吃的牌");
            }
        } else if(act == ACT_act.Act_Pass) {
            this.sendAct(ACT_act.Act_Pass);
        }
    }

    //点击吃牌组合
    private onEatComboTouch(e: egret.TouchEvent) {
        var comboIndex = e.data;
        if(comboIndex >= 0) {
            this.sendAct(ACT_act.Act_Chi,this.eatComboList[comboIndex]);
        }
    }

    //点击杠组合
    private onGangComboTouch(e: egret.TouchEvent) {
        var comboIndex = e.data;
        if(comboIndex >= 0) {
            var cardValue = this.gangComboList[comboIndex];
            var handList = this.handCardList[UserPosition.Down];
            var bAnGang = this.cardLogic.checkSameByValue(handList,cardValue,4);
            console.log("判断是否是暗杠:",bAnGang);
            if(bAnGang) {
                this.sendAct(ACT_act.Act_AnGang,[this.gangComboList[comboIndex]]);
            } else {
                this.sendAct(ACT_act.Act_Gang,[this.gangComboList[comboIndex]]);
            }
        }
    }

    //点击吃牌组合时的过
    private onEatComboUIPass() {
        this.sendAct(ACT_act.Act_Pass);
    }

    /**
     * 检查手牌中有几种吃牌可能
     * @param cardValue 待吃的牌
     */
    private checkEatCombo(cardValue: number) {
        this.eatComboList.length = 0;
        var cardList = [];  //同类型牌
        var handList = this.handCardList[UserPosition.Down];
        var len = handList.length;
        var card: Card;
        var L1 = 0; //吃牌组合牌值
        var L2 = 0;
        var R1 = 0;
        var R2 = 0;
        for(var i = 0;i < len;i++) {   //获取能够组合的牌
            card = handList[i];
            if(card.cardValue == (cardValue - 2)) {
                L2 = card.cardValue;
            } else if(card.cardValue == (cardValue - 1)) {
                L1 = card.cardValue;
            } else if(card.cardValue == (cardValue + 2)) {
                R2 = card.cardValue;
            } else if(card.cardValue == (cardValue + 1)) {
                R1 = card.cardValue;
            }
        }

        var combo: number = 0;
        if(L1 != 0 && L2 != 0) {
            combo++;
            this.eatComboList.push([cardValue,L2,L1]);
        }
        if(L1 != 0 && R1 != 0) {
            combo++;
            this.eatComboList.push([cardValue,L1,R1]);
        }
        if(R1 != 0 && R2 != 0) {
            combo++;
            this.eatComboList.push([cardValue,R1,R2]);
        }
    }

    /**
     * 检查当前有几种杠牌组合
     * @comboList 保存能杠的牌值列表
     */
    private checkGangCombo() {
        this.gangComboList.length = 0;
        var curActCard = this.curActCard;
        var handList = this.handCardList[UserPosition.Down];
        //获取暗杠牌值
        if(this.curGetCard != null) {
            var resultList = this.cardLogic.getSameList(handList,4);
            this.gangComboList = this.gangComboList.concat(resultList);
        }
        //获取点杠牌值
        if(this.curGetCard == null) {
            if(this.cardLogic.checkSameByValue(handList,curActCard,3)) {
                this.gangComboList.push(curActCard);
            }
        }
        //获取补杠
        resultList = this.cardLogic.getBuGang(handList,this.eatList[UserPosition.Down]);
        this.gangComboList = this.gangComboList.concat(resultList);
    }

    //清理所有牌
    private clearAllCard() {
        this.clearCardList(this.handCardList); //清理手牌
        this.clearCardList(this.outList);      //清理出牌
        //清理进牌
        var len = this.eatList.length;
        for(var i = 0;i < len;i++) {
            var len2 = this.eatList[i].length;
            for(var j = 0;j < len2;j++) {
                var len3 = this.eatList[i][j].length;
                for(var k = 0;k < len3;k++) {
                    var card: Card = this.eatList[i][j][k];
                    card.recycle();
                }
            }
            this.eatList[i].length = 0;
        }
        //清理吃(碰杠)次数
        for(var i = 0;i < this.playerNum;i++) {
            this.eatCount[i] = 0;
        }
    }

    //清理手牌
    private clearCardList(targetList) {
        var cardList;
        var len;
        var card: Card;
        for(var i = 0;i < 4;i++) {
            cardList = targetList[i];
            len = cardList.length;
            for(var j = 0;j < len;j++) {
                card = cardList[j];
                card.recycle();
            }
            cardList.length = 0;
        }
    }

    //设置cd文本
    private setCdLabel(time: string) {
        this.cdLabel.text = time;
    }


    //设置游戏背景
    public setGameSceneBg() {
        //        this.gameSceneBg.bitmapData = RES.getRes(App.DataCenter.BagInfo.getScenePngName());
        if(App.DataCenter.gameState == GameState.Playing || App.DataCenter.gameState == GameState.Replay) {
            this.gameSceneBg.bitmapData = RES.getRes("game_bg_bottom_jpg");
        } else {
            this.gameSceneBg.bitmapData = RES.getRes("game_bg_jpg");
        }
        if(App.DataCenter.gameState == GameState.Playing || App.DataCenter.gameState == GameState.DealCard){
            if(this.isDeskOwner()){
                for(var i = 1;i < this.headUIList.length;i++) {
                    var headUI: HeadUI = this.headUIList[i];
                    headUI.headShutup.visible = true;
                }
            }
        }
    }

    /**设置语音聊天*/
    private setVoice() {
        if(App.serverSocket.gameID == Game_ID.GoldRoom) {
            this.voiceBtn.visible = false;
        } else {
            this.voiceBtn.visible = true;
        }
    }

    /**设置出牌时间*/
    private setOutTime() {
        if(App.serverSocket.gameID == Game_ID.GoldRoom) {
            this.outTime = 10;
            this.actTime = 6;
        } else {
            this.outTime = 15;
            this.actTime = 8;
        }
    }

    /**检查自己是否房主*/
    public isDeskOwner() {
        return (App.DataCenter.UserInfo.getMyUserVo().userID == App.DataCenter.deskInfo.ownerID);
    }

    //设置房主标志



    /////////////////////////////////////////
    //-------------[Socket]--------------
    /////////////////////////////////////////

    /**接收发牌（游戏开始）*/
    public revDealCard(data) {
        console.log("接收发牌")
        this.gameState = GameState.DealCard;
        this.hideInviteUI();      //隐藏邀请界面
        this.setGameHeadPos();  //设置头像、庄的位移、位置
        this.createHandCard(data);//生成手牌
        this.hideAllReady();      //隐藏准备图标
        this.showDisc();          //显示中间圆盘
        this.showLeftLabel(this.leftCardLimit,this.curPlayCount); //显示剩余牌数

        //第一局，需要滚骰子
        var diceList = ProtocolData.Rev180_51_0.diceList;
        if(diceList == null) {
            this.showZhuang();
        } else {
            this.playDiceAnim();
        }
    }

    /**设置头像位置*/
    private setGameHeadPos(pos = null) {
        console.log("设置头像")
        var time = 500;
        //此处不能用循环处理
        egret.Tween.get(<HeadUI>this.headUIList[0]).to({ x: this.headUIPointXlist[0],y: this.headUIPointYlist[0] },time).call(() => {
            this.headUIList[0].scaleX = this.headScaleX;
            this.headUIList[0].scaleY = this.headScaleY;
        });
        egret.Tween.get(<HeadUI>this.headUIList[1]).to({ x: this.headUIPointXlist[1],y: this.headUIPointYlist[1] },time).call(() => {
            this.headUIList[1].scaleX = this.headScaleX;
            this.headUIList[1].scaleY = this.headScaleY;
        });
        egret.Tween.get(<HeadUI>this.headUIList[2]).to({ x: this.headUIPointXlist[2],y: this.headUIPointYlist[2] },time).call(() => {
            this.headUIList[2].scaleX = this.headScaleX;
            this.headUIList[2].scaleY = this.headScaleY;
        });
        egret.Tween.get(<HeadUI>this.headUIList[3]).to({ x: this.headUIPointXlist[3],y: this.headUIPointYlist[3] },time).call(() => {
            this.headUIList[3].scaleX = this.headScaleX;
            this.headUIList[3].scaleY = this.headScaleY;
            //需要做延时处理 怕资源未被加载  显示庄
            egret.Tween.get(this).wait(700).call(() => {
                if(pos != null) {
                    var headUI = this.headUIList[pos];
                    var headImg = headUI.headImg;
                    this.zhuangFlag || (this.zhuangFlag = new ZhuangFlag());
                    this.zhuangFlag.x = headUI.x + headImg.x;
                    this.zhuangFlag.y = headUI.y + headImg.y;
                    this.headGroup.addChild(this.zhuangFlag);
                }
            })
        });
    }


    /**玩家摸牌*/
    public revGetCard(data,bAnim: boolean = true) {
        this.gameState = GameState.Playing; //游戏从庄家摸第一张牌开始
        var json = ProtocolData.Rev180_53_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var cardValue = json.cardList[0];
        var rect: egret.Point = this.takeRectList[pos];
        var card: Card;
        //回放时，其他玩家的摸牌是明牌
        if(this.bReplay == true && pos != UserPosition.Down) {
            card = this.cardFactory.getOutCard(cardValue,pos);
        } else {
            card = this.cardFactory.getHandCard(cardValue,pos);
        }
        //处理摸牌
        this.handCardList[pos].push(card);
        card.x = rect.x;
        card.y = rect.y;
        card.initPosY = card.y;
        if(pos == UserPosition.R) {
            this.cardGroup.addChildAt(card,0);
        } else {
            this.cardGroup.addChild(card);
        }
        this.curGetCard = card;
        this.curActPlayer = pos;
        //更新界面
        this.showLight(pos);
        this.reduceLeftCard();
        this.startOutTimer(this.outTime);
        this.hideActUI();
        console.log("接收摸牌,位置:",pos,"牌值:",cardValue,"状态:",json.state);

        //其他动作处理
        if(json.state != 0) {
            //自己摸牌,设置可以出牌
            if(pos == UserPosition.Down) {
                if(this.cardLogic.checkActState(json.state,ACT_state.Act_NormalDo)) {
                    this.bAllowOutCard = true;
                }
                this.curActCard = cardValue;
                bAnim && this.showActUI(json.state);
            }

        }
    }

    //通知玩家叫牌  (能不能吃、碰、杠、胡) 180, 55, 0
    public revNoticeAct(data) {
        var json = ProtocolData.Rev180_55_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        this.curActCard = json.card;
        this.curActPlayer = pos;
        console.log("通知玩家叫牌,位置:",pos,"牌值:",json.card,"状态:",json.state);
        if(pos == UserPosition.Down) {    //通知的是自己，则显示操作面板
            this.showActUI(json.state);
        }
        this.startOutTimer(this.actTime);
    }

    /**
     * 响应玩家操作 (其他玩家吃、碰等，广播给另外3玩家) 180, 56, 0
     * @data 操作数据
     * @bAnim 是否播放动画、声音
     */
    public revAct(data,bAnim: boolean = true) {
        var json = ProtocolData.Rev180_56_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var cardValue = json.cardList[0];
        var cardList = json.cardList;
        var act: ACT_act = json.act;
        var actParam = json.actParam;
        this.hideActUI();
        var userVo: UserVO = App.DataCenter.UserInfo.getUserBySeatID(json.seatID);
        //因为没有自摸字段，这里判断是否自摸
        if(bAnim) {
            console.log(userVo,"userVo")
            if(act == ACT_act.Act_Hu) {
                if(this.curGetCard && (pos == this.curGetCard.userPos)) {
                    App.SoundManager.playAct(ACT_act.Act_zimo,userVo.sex);
                }
            } else {
                App.SoundManager.playAct(act,userVo.sex);
            }
        }
        console.log("接收动作,位置:",pos,"动作:",act,"data:",json);
        switch(act) {
            case ACT_act.Act_NormalDo: //出牌位置
                bAnim && App.SoundManager.playOutCard(cardValue,userVo.sex);
                this.actOutCard(pos,cardValue,bAnim);
                this.hideAllActTip();
                bAnim && this.showOutEffect(cardValue,pos);
                break;

            case ACT_act.Act_Pass:    //过

                break;
            case ACT_act.Act_Hu:      //胡
                this.showActTip(act,pos);
                break;
            case ACT_act.Act_Peng:    //碰牌
            case ACT_act.Act_Chi:     //吃牌
            case ACT_act.Act_Gang:    //杠
            case ACT_act.Act_AnGang:  //暗杠
                this.showLight(pos);
                this.startOutTimer(this.outTime);
                this.eatHandler(act,pos,cardList,actParam);
                bAnim && this.showActTip(act,pos);
                if(pos == UserPosition.Down) {
                    this.bAllowOutCard = true;
                }
                break;
        }
    }



    //通知玩家出牌 180, 57, 0 
    public revNoticeOutCard(data) {
        var json = ProtocolData.Rev180_57_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        console.log("通知玩家出牌,位置:",pos);
        this.showLight(pos);
        if(pos == UserPosition.Down) {
            this.bAllowOutCard = true;
        }
    }

    //游戏结束 180, 58, 0
    public revGameOver(data) {

        //查看自己是否是房主判断是否显示踢人按钮
        if(this.isDeskOwner()) {
            for(var i = 0;i < this.gameKickList.length;i++) {
                this.gameKickList[i].visible = true;
                if(i == 0 || i == 1) {
                    this.gameKickList[i].x = this.headUIList[i + 1].x - this.gameKickList[i].width
                }
                if(i == 2) {
                    this.gameKickList[i].x = this.headUIList[i + 1].x + 120
                }
                this.gameKickList[i].y = this.headUIList[i + 1].y + 30
            }
        }

        App.EventManager.sendEvent(EventConst.GameStateChange,GameState.GameOver);
        console.log("游戏结束:",data);
        this.gameState = GameState.GameOver;
        var json = ProtocolData.Rev180_58_0;
        json = data;
        //判断分享
        this.ctrl.sendInsertShare();
        //保存数据
        ProtocolData.Rev180_58_0 = data;
        this.curPlayCount = json.curPlayCount;
        this.maxPlayCount = json.maxPlayCount;
        this.stopOutTimer();
        //玩家结算状态
        var userList = App.DataCenter.UserInfo.userList;
        for(var key in userList) {
            var userVO: UserVO = userList[key];
        }

        //判断是否流局
        var bNoEnd: boolean = true;
        var len = json.resultList.length;
        for(var i = 0;i < len;i++) {
            var resultInfo = ProtocolData.resultInfo;
            resultInfo = json.resultList[i];
            if(resultInfo.lossWinPoint != 0) {
                bNoEnd = false;
                break;
            }
        }

        //判断赢家是否是自己
        var bWinIsMy: boolean = false;
        var mySeatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
        for(var i = 0;i < len;i++) {
            var resultInfo = ProtocolData.resultInfo;
            resultInfo = json.resultList[i];
            if(resultInfo.fan != null && resultInfo.seatID == mySeatID) {
                bWinIsMy = true;
                break;
            }
        }
        App.ResUtils.loadGroup(AssetConst.Result,this,() => {
            //播放输赢特效
            if(bNoEnd == true) {
                App.SoundManager.playEffect(SoundManager.liuju);
                this.showLiuJuEffect();
            } else if(bWinIsMy == true) {
                App.SoundManager.playEffect(SoundManager.win);
                this.showWinEffect();
            } else {
                App.SoundManager.playEffect(SoundManager.lose);
                this.showLoseEffect();
            }

            egret.Tween.get(this).wait(4500).call(() => {
                //隐藏特效
                this.hideWinEffect();
                this.hideLoseEffect();
                this.hideLiuJuEffect();

                //推倒胡，非流局，有抓马
                var hasMaiMa = ProtocolData.gameConfig.hasMaiMa;
                if(ProtocolData.gameConfig.gameType == GAME_TYPE.TUI_DAO_HU && bNoEnd == false && hasMaiMa) {
                    this.showZhuaMaPanel();
                } else {
                    this.showResultPanel();
                }

                //将桌面上牌摊开
                this.showDeskCard();
                //显示准备按钮
                this.showReadyBtn();
                this.updatePoint();
            });
        },null,10);
    }

    /**
     * 广播杠立刻结算
     * @data 杠数据
     * @bAnim 是否播放杠分动画
     */
    public revGangResult(data,bAnim: boolean = true) {
        var json = ProtocolData.Rev180_61_0;
        json = data;
        var pointList = json.lossWinPoint;
        var pos = this.cardLogic.changeSeat(json.gangSeatID);
        console.log("杠立刻结算,杠牌玩家位置:",pos," 数据:",json);
        var len = pointList.length;
        for(var i = 0;i < len;i++) {
            var point = pointList[i];
            var pos = this.cardLogic.changeSeat(i);
            var userVo: UserVO = App.DataCenter.UserInfo.getUserBySeatID(i);
            if(userVo) {
                if(App.serverSocket.gameID == Game_ID.GoldRoom) {
                    //金币场杠没有立刻计算..所有金币结算都通过103_6_0
                } else {
                    userVo.point += point;
                    this.headUIList[pos].scoreLabel.text = userVo.point + "";
                }
                bAnim && this.showGang(pos,point);
            }
        }
    }


    //广播玩家叫牌 (显示倒计时8s)
    public revNoticeJiao() {
        this.startOutTimer(this.actTime);
    }

    //玩家请求操作(吃、碰、杠、胡等) 
    public sendAct(act: ACT_act,cardList = null) {
        this.hideActUI();
        this.eatComboUI.hide();
        this.ctrl.sendAct(act,cardList);
    }

    //出牌
    public sendOutCard(card: Card) {
        this.ctrl.sendAct(ACT_act.Act_NormalDo,[card.cardValue]);
    }

    //接收聊天数据
    public revChat(data) {
        var json = ProtocolData.Rev111_1_1;
        json = data;
        console.log("接收聊天:",json);
        var msgType: CHAT_TYPE = json.msgType;
        var msg: string = json.msg;
        var seatID = json.sendSeatID;

        //隐藏之前的聊天信息
        this.hideChatFace(seatID);
        this.hideChatText(seatID);

        if(msgType == CHAT_TYPE.Common) {       //聊天常用语
            if(App.SoundManager.isGuangDongSpeak) {
                RES.loadGroup("gd_chat");
            } else {
                RES.loadGroup("putong_chat");
            }
            this.showChatText(seatID,msg,msgType);
        } else if(msgType == CHAT_TYPE.Face) {   //聊天表情
            var id = parseInt(msg);
            var faceGroupName = FaceFactory.getInstance().getFaceMovieGroupName(id);
            App.ResUtils.loadGroup(faceGroupName,this,() => {
                this.showChatFace(seatID,id);
            });
        } else if(msgType == CHAT_TYPE.Text) {   //打字
            App.ResUtils.loadGroup(AssetConst.Chat,this,() => {
                console.log("显示打字");
                var filteMsg = App.KeyWord.filteString(msg);
                this.showChatText(seatID,filteMsg,msgType);
            });
        } else if(msgType == CHAT_TYPE.Voice) {   //微信语音
            window["downloadVoice"] && window["downloadVoice"](msg);
        }
    }

    //发送准备 108_1_0
    private sendReady() {
        this.ctrl.sendReady();
    }

    //接收牌局信息
    public revRecordInfo(data) {
        ProtocolData.Rev180_62_0 = data;
        var json = ProtocolData.Rev180_62_0;
        json = data;
        //提前解散房间，不是最后一局，且已经开始游戏，显示战绩
        if(this.bHavePlay == true && json.curPlayCount != 0 && json.curPlayCount != json.maxPlayCount) {
            this.bShowMatchInfo = true;
            //专属房没有发送房间解散消息
            if(App.serverSocket.gameID == Game_ID.selfRoom) {
                this.quitToHall()
            }
            else {
                this.showMatchInfoPanel();
            }

        }
    }

    //请求获取游戏状态
    private sendGameState() {
        console.log("请求获取游戏状态");
        App.LoadingLock.lock(this.quitToHall,this);
        this.ctrl.sendGameState();
    }

    //接收游戏状态
    public revGameState(data) {
        App.LoadingLock.unlock();

        var json = ProtocolData.Rev180_2_0;
        json = data;
        var deskStatus = json.deskStatus;
        var gameSeatInfo = json.gameSeatInfo;
        var lastCardNum = json.lastCardNum;
        var curPlayCount = json.curPlayCount;
        var maxPlayCount = json.maxPlayCount;
        console.log("最大局数" + json.maxPlayCount);
        //设置分享房间号
        var userID: number = App.DataCenter.UserInfo.getMyUserVo().userID;
        var deskCode: number = App.DataCenter.deskInfo.deskCode;
        var deskId: number = App.DataCenter.deskInfo.deskID;
        App.EventManager.sendEvent(App.EVENT_SET_WEB_WXSHARE,userID,deskCode,null,deskId);

        //设置游戏规则
        ProtocolData.gameConfig = json.gameConfig;

        //设置剩余牌数，非游戏状态，该值没有
        if(json.lastCardNum) {
            this.curLeftCard = lastCardNum;
        } else {
            this.curLeftCard = this.leftCardLimit;
        }
        //设置局数
        this.curPlayCount = curPlayCount;
        this.maxPlayCount = maxPlayCount;
        //设置是否已进行过游戏
        this.bHavePlay = (this.curPlayCount > 0 || deskStatus == GS_GAME_STATION.GS_GAME_PLAYING);
        //保存玩家状态
        this.saveGameSeatInfo(gameSeatInfo);
        console.log("接收游戏状态:",deskStatus,"游戏当前局数:",this.curPlayCount);

        switch(deskStatus) {
            case GS_GAME_STATION.GS_WAIT_SETGAME:  //等待设置游戏

                break;
            case GS_GAME_STATION.GS_WAIT_ARGEE:    //等待玩家同意游戏
                this.gsWaitAgree(data);
                break;
            case GS_GAME_STATION.GS_GAME_PLAYING:  //游戏中 
                this.gsGamePlaying(data);
                break;
            case GS_GAME_STATION.GS_GAME_FINSHED:  //游戏结束
                break;
        }
    }


    //接收新换的牌
    public revSwapCard(data) {
        var json = ProtocolData.Rev180_101_0;
        json = data;
        console.log("新换得的牌:",json);
        var pos = this.cardLogic.changeSeat(json.seatID);
        var handList = this.handCardList[pos];
        var len = handList.length;
        //非回放时，返回的数据是整付手牌，只取选中的两张替换
        if(this.bReplay == false) {
            for(var i = 0;i < len;i++) {
                var card: Card = handList[i];
                if(card.cardValue == this.swapCardUI.selectValue0) { //将手牌替换
                    card.setHandSkin(this.swapCardUI.selectValue1,pos);
                    break;
                }
            }
            this.showHandCard(pos);
            if(i == len) {
                console.error("换牌出错");
                return;
            }
        } else {
            //回放时，返回的数据是替换和被替换的牌
            var cardList = json.cardList;
            for(var i = 0;i < len;i++) {
                var card: Card = handList[i];
                if(card.cardValue == cardList[0]) { //将手牌替换
                    if(pos == UserPosition.Down) {
                        card.setHandSkin(cardList[1],pos);
                    } else {
                        card.setOutSkin(cardList[1],pos);
                    }
                    break;
                }
            }
            this.showHandCard(pos);
            if(i == len) {
                console.error("换牌出错");
                return;
            }
        }

    }



    //接收测试看牌
    public revLookCard(data) {
        var json = ProtocolData.Rev180_103_0;
        json = data;
        var cardValue = json.card;
        if(this.swapCardUI.selectBtn3.cardImg.texture == null) {
            this.swapCardUI.selectBtn3.setOutSkin(cardValue,0);
        }
    }



}



