/**
 * 麻将牌处理插件
 * @author xiongjian 
 * @date 2017/6/29
 */
class RectPlugin extends BaseUI {

    public outGroup: eui.Group; //出牌Group，防手牌遮挡
    public cardGroup: eui.Group;    //手牌Group
    public outFlagGroup: eui.Group;    //出牌指示Group
    public outEffectGroup: eui.Group; //出牌效果Group 
    public tipGroup: eui.Group;     //打牌提示Group
    public selectActUI: SelectActUI;    //选择操作面板
    public eatComboGroup: eui.Group;    //吃牌组合
    private rectGroup: eui.Group;     //rect Group

    private eatComboUI: EatComboUI;       //吃牌组合
    //--------------逻辑--------------
    public cardFactory: CardFactory;      //麻将牌工厂
    public cardLogic: CardLogic;          //麻将牌逻辑
    public outFlag: OutFlagUI;           //当前出牌指示箭头

    //------------Card定位----------- 
    private handRectList = [];   //手牌位置
    private myHandRectList = []; //自己手牌的上面一排位置
    public takeRectList = [];   //摸牌位置
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
    private out2_start1;
    private out3_start1;
    private eat0_start;          //定位吃牌(碰杠)
    private eat1_start;
    private eat2_start;
    private eat3_start;

    private headUIPointXlist = [1, 583, 583, 1];       //开始游戏后个人头像X坐标
    private headUIPointYlist = [848, 709, 30, 137];    //开始游戏后个人头像Y坐标

    private outEffectTime: number = 2000; //出牌效果显示时间ms
    private outMoveTime: number = 200;    //出牌时，牌移动时间ms

    /**自己手牌上面一行牌的位置调整*/
    private myHandCardAdjustX = 40;
    private myHandCardAdjustY = 120;

    private handInvalXList = [-82, 0, 34, 0];     //手牌排序间隔
    private handInvalYList = [0, 32, 0, -32];
    private outInvalXList = [50, 0, 43 + 3, 0];   //出牌排序间隔
    private outInvalYList = [0, -36, 0, 36];
    private eatInvalXList = [66, 0, 38, 0];    //吃(碰杠)牌排序间隔
    private eatInvalYList = [0, 32, 0, 32];
    private multiEatInvalXList = [15, 0, 4, 0];    //吃(碰杠)牌堆间隔
    private multiEatInvalYList = [0, 10, 0, 10];
    private gangInvalXList = [-132, 0, 77, 0];   //杠牌时，第4张牌位置偏移 
    private ganeInvalYList = [-14, 57.5, -9, -69];
    private gangScaleXList = [1, 1, 0.8, 1];  //杠牌第4张缩放
    private gangScaleYlist = [1, 1, 0.85, 1];

    //----------各种列表-------------
    private actTipList: Array<ActTipUI> = new Array<ActTipUI>(); //所有玩家操作提示列表
    public handCardList = [];   //所有玩家手牌列表[pos][Card]
    private outList = [];        //所有玩家出牌列表[pos][Card]
    private eatList = [];        //所有玩家碰、杠牌列表 [pos][count][Card]
    private eatCount = [];       //所有玩家吃牌次数[pos][number]
    private pengCount = [];      //所有玩家碰牌次数[pos][number]
    private gangCount = [];      //所有玩家杠牌次数[pos][number]
    private anGangCount = [];    //所有玩家暗杠次数[pos][number]
    private eatComboList = [];   //吃牌组合列表 [n][cardValue]
    private eatComboList1 = [];    //吃牌组合列表，为了让吃的牌放在中间显示
    private gangComboList = [];  //杠牌组合列表 [n][cardValue]
    private outEffectList = [];  //出牌效果List [n][group]

    //------------游戏变量--------------
    public zhuangPos: UserPosition;     //庄家位置
    public zhuangSeat: number;           //庄家桌位号
    public bAllowOutCard: boolean;      //是否允许出牌
    public curGetCard: Card;            //当前摸牌
    public curOutCard: Card;            //当前出牌
    public curTouchCard: Card;          //玩家当前点击出的牌
    public curActCard: number = 0;      //当前玩家吃碰杠胡的那张牌的牌值 
    public curActPlayer: UserPosition;   //当前行动玩家
    private playerNum: number = 4;       //玩家人数
    public pengLimit: number = 3;       //碰牌数量，3张相同能碰
    public outRowLimit: number = 7;    //出牌时，一行的限制牌数
    public leftCardLimit: number = 108; //当前牌局剩余牌数最大值
    public curLeftCard: number = 0;     //当前剩余牌数

    /**手牌缩放比例*/
    private cardRatioXY = 1;

    /**起手胡龙骨动画 */
    private qishouDbAr: Array<dragonBones.EgretArmatureDisplay>;

    public constructor() {
        super();
        this.skinName = "rectPlugin";
    }



    /**组件创建完毕*/
    protected childrenCreated() {

        //初始化工厂和逻辑
        this.cardFactory = CardFactory.getInstance();
        this.cardLogic = CardLogic.getInstance();
        //初始化组件
        this.eatComboUI = new EatComboUI();
        this.outFlag = new OutFlagUI();
        // 创建起手胡龙骨动画
        this.qishouDbAr = this.createDBArmatureT("NewProject_ske_json", "NewProject_tex_json", "NewProject_tex_png");
        for(var i=0; i<4; i++){
            this.handCardList[i] = new Array<Card>();
            this.outList[i] = new Array<Card>();
            this.eatList[i] = [];
            this.eatCount[i] = 0;
            this.outEffectList.push(this.outEffectGroup.getChildAt(i));

        }

    }

    /**添加到场景中*/
    protected onEnable() {
        this.init();
                //点击事件
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDragCardBegin, this);
    }


    /**
     * 初始化
     */
    private init() {
       this.onInitPosition();
       this.hideActUI();
       this.hideAllActTip();
       this.hideAllOutEffect();
       this.hideAllCardRect();
    }

    /**从场景中移除*/
    protected onRemove() {

    }

    //初始化牌的位置,牌的位置在childrenCreated获取的的位置是错误的
    public onInitPosition() {

        //定位用。由于手机上egret游戏置于后台时，获取rect位置会错误。原来List保存的是rect对象，现在修改为保存rect的坐标位置。
        //直接把麻将牌全部摆在exml上，然后保存到数组里，出牌时显示该牌然后设置牌值，这样就不用计算显示位置和深度排序了,比起记录这些位置方便多了...

        //已出牌   下面的x、y坐标加减   跟outInvalXList、outInvalYList的出牌排序间隔有关 ，解决适配问题
        var out1_startX = -80;
        var out1_startY = 60;
        var out0_startX = 10;
        this.takeRectList = [];
        this.takeRectList.push(new egret.Point(this.locateGet0.x + 5, this.locateGet0.y - 10));
        this.takeRectList.push(new egret.Point(this.locateGet1.x, this.locateGet1.y + 5 - 15));
        // this.takeRectList.push(new egret.Point(this.locateGet2.x , this.locateGet2.y));
        this.takeRectList.push(new egret.Point(this.locateGet2.x + 75, this.locateGet2.y));
        this.takeRectList.push(new egret.Point(this.locateGet3.x, this.locateGet3.y + 35));


        this.outRectList = [];
        this.outRectList.push(new egret.Point(this.out0_start.x, this.out0_start.y));
        this.outRectList.push(new egret.Point(this.out1_start.x + 25 + out1_startX, this.out1_start.y - 15));
        this.outRectList.push(new egret.Point(this.out2_start.x + 15, this.out2_start.y - 20));
        this.outRectList.push(new egret.Point(this.out3_start.x, this.out3_start.y));

        this.out1RectList = [];
        this.out1RectList.push(new egret.Point(this.out0_start1.x, this.out0_start1.y + 2));
        this.out1RectList.push(new egret.Point(this.out1_start1.x + 25 + out1_startX, this.out1_start1.y));
        this.out1RectList.push(new egret.Point(this.out2_start1.x + 15, this.out2_start1.y - 16 - 4));
        this.out1RectList.push(new egret.Point(this.out3_start1.x, this.out3_start1.y));

        this.out2RectList = [];
        // this.out2RectList.push(new egret.Point(this.out0_start2.x + out0_startX,this.out0_start2.y));
        // this.out2RectList.push(new egret.Point(this.out1_start2.x + out1_startX,this.out1_start2.y + out1_startY));
        // this.out2RectList.push(new egret.Point(this.out2_start2.x,this.out2_start2.y));
        // this.out2RectList.push(new egret.Point(this.out3_start2.x,this.out3_start2.y));

        this.eatRectList = [];
        this.eatRectList.push(new egret.Point(this.eat0_start.x - 110, this.eat0_start.y - 20));
        this.eatRectList.push(new egret.Point(this.eat1_start.x + out1_startX + 25, this.eat1_start.y - 5));
        this.eatRectList.push(new egret.Point(this.eat2_start.x, this.eat2_start.y));
        this.eatRectList.push(new egret.Point(this.eat3_start.x, this.eat3_start.y + 30));

        //正常游戏设定
        this.handRectList = [];
        this.handRectList.push(new egret.Point(this.hand0_start.x - 50, this.hand0_start.y + 83 + 40));
        // //  自己手牌中第一行
        this.handRectList.push(new egret.Point(this.hand1_start.x, this.hand1_start.y - 15));
        // this.handRectList.push(new egret.Point(this.hand2_start.x , this.hand2_start.y));
        this.handRectList.push(new egret.Point(this.hand2_start.x + 70, this.hand2_start.y));
        this.handRectList.push(new egret.Point(this.hand3_start.x, this.hand3_start.y + 10 + 20));



    }

    //隐藏所有rect
    private hideAllCardRect() {
        var len = this.rectGroup.numChildren;
        for (var i = 0; i < len; i++) {
            this.rectGroup.getChildAt(i).visible = false;
        }
    }

    //************************************************************************
    //------------------------ 吃碰杠胡   扎鸟---------------------------------
    //************************************************************************

    /**显示操作提示*/
    public showActUI(state: ACT_state) {

        var actList = this.cardLogic.anylzyeActState(state);
        console.log("显示操作提示:", actList);
        this.selectActUI.updateInfo(actList);
        this.selectActUI.addEventListener("sendActEvent", this.onActUITouch, this);
        this.selectActUI.x = (App.StageUtils.stageWidth - this.selectActUI.panelWidth) / 2;
        this.tipGroup.addChild(this.selectActUI);
        this.selectActUI.show();

        //设置托管时不显示
        this.selectActUI.visible = true;
    }

    /**隐藏操作提示*/
    public hideActUI() {
        this.selectActUI.hide();
        this.eatComboUI.hide();
    }

    /**点击操作提示*/
    private onActUITouch(e: egret.TouchEvent) {
        this.selectActUI.hide();
        var state: ACT_state = e.data;
        var act: ACT_act = this.cardLogic.changeStateToAct(state);
        var cardList = [];
        var cardValue = this.curActCard;
        console.log("curActCard", this.curActCard);
        //如果是碰或胡，直接发送
        if (act == ACT_act.Act_Peng || act == ACT_act.Act_Hu) {
            cardList = [cardValue];
            this.sendAct(act, cardList);
            //如果是杠，一种杠法直接发送，多种杠需要客户端自己判断
        } else if (act == ACT_act.Act_Gang || act == ACT_act.Act_AnGang) {
            this.checkGangCombo();
            if (this.gangComboList.length == 1) {
                //判断暗杠或明杠,因为没有暗杠按钮，这里用bAnGang标志位表示明暗杠
                if (act == ACT_act.Act_Gang && this.selectActUI.bAnGang) {
                    act = ACT_act.Act_AnGang;
                }
                cardList = [this.gangComboList[0]];
                this.sendAct(act, cardList);
            } else if (this.gangComboList.length > 1) {
                this.hideActUI();
                this.tipGroup.addChild(this.eatComboUI);
                this.eatComboUI.showGangCombo(this.gangComboList, this.cardFactory, this.handInvalXList[0]);
                this.eatComboUI.addEventListener("selectComboEvent", this.onGangComboTouch, this);
                this.eatComboUI.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
                this.eatComboUI.passBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
            } else {
                console.error("手上没有能杠的牌");
            }
            //如果是吃，一种吃法则直接发送，多种吃法需要客户端自己判断
        } else if (act == ACT_act.Act_Chi) {
            this.checkEatCombo(cardValue);
            if (this.eatComboList.length == 1) {
                cardList = this.eatComboList[0];
                this.sendAct(act, cardList);
            } else if (this.eatComboList.length > 1) {
                this.hideActUI();
                this.tipGroup.addChild(this.eatComboUI);
                this.eatComboUI.showEatCombo(this.eatComboList1, this.cardFactory, this.handInvalXList[0]);
                this.eatComboUI.addEventListener("selectComboEvent", this.onEatComboTouch, this);
                this.eatComboUI.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
                this.eatComboUI.passBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
            } else {
                console.error("手上没有能吃的牌");
            }
        } else if (act == ACT_act.Act_Pass) {
            this.sendAct(ACT_act.Act_Pass);
        }
    }

    /**隐藏所有提示*/
    public hideAllActTip() {
        var len = this.actTipList.length;
        for (var i = 0; i < len; i++) {
            var tip: ActTipUI = this.actTipList[i];
            tip.hide();
        }
    }

    /**显示动作提示*/
    public showActTip(act: ACT_act, pos: UserPosition) {
        switch (act) {
            case ACT_act.Act_Chi:
                this.showDbChi(pos);
                break;
            case ACT_act.Act_Peng:
                this.showDbPeng(pos);
                break;
            case ACT_act.Act_Gang:
                this.showDbGang(pos);
                break;
            case ACT_act.Act_AnGang:
                this.showDbGang(pos);
                break;
            case ACT_act.Act_Hu:
                this.showDbHu(pos);
                break;
            default:
                var actTip: ActTipUI = this.actTipList[pos];
                actTip.showAct(act);
                this.tipGroup.addChild(actTip);
        }
    }


    /**点击吃牌组合*/
    private onEatComboTouch(e: egret.TouchEvent) {
        var comboIndex = e.data;
        if (comboIndex >= 0) {
            this.sendAct(ACT_act.Act_Chi, this.eatComboList[comboIndex]);
        }
    }

    /**点击杠组合*/
    private onGangComboTouch(e: egret.TouchEvent) {
        var comboIndex = e.data;
        if (comboIndex >= 0) {
            var cardValue = this.gangComboList[comboIndex];
            var handList = this.handCardList[UserPosition.Down];
            var bAnGang = this.cardLogic.checkSameByValue(handList, cardValue, 4);
            console.log("判断是否是暗杠:", bAnGang);
            if (bAnGang) {
                this.sendAct(ACT_act.Act_AnGang, [this.gangComboList[comboIndex]]);
            } else {
                this.sendAct(ACT_act.Act_Gang, [this.gangComboList[comboIndex]]);
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
        this.eatComboList1.length = 0;
        var cardList = [];  //同类型牌
        var handList = this.handCardList[UserPosition.Down];
        var len = handList.length;
        var card: Card;
        var L1 = 0; //吃牌组合牌值
        var L2 = 0;
        var R1 = 0;
        var R2 = 0;
        for (var i = 0; i < len; i++) {   //获取能够组合的牌
            card = handList[i];
            if (card.cardValue == (cardValue - 2)) {
                L2 = card.cardValue;
            } else if (card.cardValue == (cardValue - 1)) {
                L1 = card.cardValue;
            } else if (card.cardValue == (cardValue + 2)) {
                R2 = card.cardValue;
            } else if (card.cardValue == (cardValue + 1)) {
                R1 = card.cardValue;
            }
        }

        var combo: number = 0;
        if (L1 != 0 && L2 != 0) {
            combo++;
            this.eatComboList.push([cardValue, L2, L1]);
            //吃牌调整为统一放在中间
            this.eatComboList1.push([L2, cardValue, L1]);
        }
        if (L1 != 0 && R1 != 0) {
            combo++;
            this.eatComboList.push([cardValue, L1, R1]);
            this.eatComboList1.push([L1, cardValue, R1]);
        }
        if (R1 != 0 && R2 != 0) {
            combo++;
            this.eatComboList.push([cardValue, R1, R2]);
            this.eatComboList1.push([R1, cardValue, R2]);
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
        if (this.curGetCard != null) {
            var resultList = this.cardLogic.getSameList(handList, 4);
            //如果自己摸过牌则可以暗杠
            if (handList.length % 3 == 2) {
                this.gangComboList = this.gangComboList.concat(resultList);
            }

        }
        //获取点杠牌值
        if (this.curGetCard == null) {
            if (this.cardLogic.checkSameByValue(handList, curActCard, 3)) {
                this.gangComboList.push(curActCard);
            }
        }
        //获取补杠
        resultList = this.cardLogic.getBuGang(handList, this.eatList[UserPosition.Down]);
        //如果自己摸过牌则可以补杠
        if (handList.length % 3 == 2) {
            this.gangComboList = this.gangComboList.concat(resultList);
        }

    }

    /**清理所有牌*/
    public clearAllCard() {
        this.clearCardList(this.handCardList); //清理手牌
        this.clearCardList(this.outList);      //清理出牌
        //清理进牌
        var len = this.eatList.length;
        for (var i = 0; i < len; i++) {
            var len2 = this.eatList[i].length;
            for (var j = 0; j < len2; j++) {
                var len3 = this.eatList[i][j].length;
                for (var k = 0; k < len3; k++) {
                    var card: Card = this.eatList[i][j][k];
                    card.recycle();
                }
            }
            this.eatList[i].length = 0;
        }
        //清理吃(碰杠)次数
        for (var i = 0; i < this.playerNum; i++) {
            this.eatCount[i] = 0;
        }
    }

    /**清理手牌*/
    private clearCardList(targetList) {
        var cardList;
        var len;
        var card: Card;
        for (var i = 0; i < 4; i++) {
            cardList = targetList[i];
            len = cardList.length;
            for (var j = 0; j < len; j++) {
                card = cardList[j];
                card.recycle();
            }
            cardList.length = 0;
        }
    }

    /**玩家请求操作(吃、碰、杠、胡等) */
    public sendAct(act: ACT_act, cardList = null) {
        this.hideActUI();
        this.eatComboUI.hide();
        App.getController(ReGameController.NAME).sendAct(act, cardList);
    }

    /**龙骨-吃 */
    private showDbChi(pos: number) {
        this.showDB("chi", pos);
    }

    /**龙骨-碰 */
    private showDbPeng(pos: number) {
        this.showDB("peng", pos);
    }

    /**龙骨-杠 */
    private showDbGang(pos: number) {
        this.showDB("gang", pos);
    }

    /**龙骨-胡 */
    public showDbHu(pos: number) {
        this.showDB("hu", pos);
    }

    /**龙骨-起手胡 */
    private showDbQishouhu(pos: number) {
        this.showDB("qishohu", pos);
    }

    /**龙骨-补 */
    private showDbBu(pos: number) {
        this.showDB("bu", pos);
    }

    /**龙骨-起手胡 */
    private showDbYao(pos: number) {
        this.showDB("yao", pos);
    }

    /**龙骨-起手胡 */
    private showDbZhongtu(pos: number) {
        this.showDB("zhongtusixi", pos);
    }

    public showDB(name: string, pos: number) {
        var offsetListX = [0, 200, 0, -200];
        var offsetLIstY = [250, -150, -370, -150];
        this.qishouDbAr[pos].x = 750 / 2 + offsetListX[pos];
        this.qishouDbAr[pos].y = 1335 / 2 + offsetLIstY[pos];

        //动画过宽时的位置调整
        if (name == "qishohu") {
            if (pos == 1) {
                this.qishouDbAr[pos].x += -50;
            }
            else if (pos == 3) {
                this.qishouDbAr[pos].x += 50;
            }
        }
        else if (name == "zhongtusixi") {
            if (pos == 1) {
                this.qishouDbAr[pos].x += -70;
            }
            else if (pos == 3) {
                this.qishouDbAr[pos].x += 70;
            }
        }

        if (!this.qishouDbAr[pos].parent) {
            this.addChild(this.qishouDbAr[pos]);
        }
        this.qishouDbAr[pos].animation.play(name, 1);
    }

    /**扎鸟字动画 */
    public showZhaDb() {
        if (!this.qishouDbAr[0].parent) {
            this.addChild(this.qishouDbAr[0]);
        }
        this.qishouDbAr[0].x = 750 / 2;
        this.qishouDbAr[0].y = 1355 / 2;
        this.qishouDbAr[0].animation.play("zhaniao", 1);
    }

    /**扎鸟飞动画 */
    public showBirdFly(seat: number, isBack: boolean = false) {
        var orPosx = 308;
        var orPosy = 454;

        var birdImg = new eui.Image(RES.getRes("game_bord_png"));
        //var birdImg = new eui.Image(RES.getRes("zhongniao_png"));
        birdImg.x = orPosx;
        birdImg.y = orPosy;
        setTimeout(() => {
            birdImg.parent && birdImg.parent.removeChild(birdImg);
        }, 850);

        var parSys = new particle.GravityParticleSystem(RES.getRes("tuowie_png"), RES.getRes("tuowie_json"));
        parSys.emitterX = orPosx + 70;
        parSys.emitterY = orPosy + 60;
        parSys.start();

        this.addChild(parSys);
        this.addChild(birdImg);

        egret.Tween.get(birdImg)
            .to({ x: this.headUIPointXlist[seat], y: this.headUIPointYlist[seat] }, 400)
            .to({ alpha: 0 }, 400)
            .call(() => {
                birdImg.parent && birdImg.parent.removeChild(birdImg);
                egret.Tween.removeTweens(birdImg);
            }, this);

        egret.setTimeout(function () {
            parSys.parent && parSys.parent.removeChild(parSys);
            egret.Tween.removeTweens(parSys);
        }, this, 1500);

        egret.Tween.get(parSys).to({ emitterX: this.headUIPointXlist[seat] + 70, emitterY: this.headUIPointYlist[seat] + 60 }, 400).call(() => {
            //parSys.parent && parSys.parent.removeChild(parSys);
            //egret.Tween.removeTweens(parSys);
            parSys.stop();
            //显示中鸟图片
            // this.zhongniaoGroup.addChild(this.zhongNiaoList[seat]);
            (<ReGameScene>App.SceneManager.getScene(SceneConst.ReGameScene)).zhongNiaoPlugin.showZhongniao(seat);
            if (isBack) {
                this.hideBirdFly();
            }

        })
    }

    /**扎鸟飞回调*/
    private hideBirdFly() {

    }

    /**
     * @param dbJson  龙骨Json资源名
     * @param tetJson 图集Json资源名
     * @param tetPng  图片资源名
     * @return armature 
     */
    private createDBArmatureT(dbJson: string, tetJson: string, tetPng: string): Array<dragonBones.EgretArmatureDisplay> {
        var factory: dragonBones.EgretFactory = new dragonBones.EgretFactory;
        factory.parseDragonBonesData(RES.getRes(dbJson));
        factory.parseTextureAtlasData(RES.getRes(tetJson), RES.getRes(tetPng));
        var list = [];
        for (var i = 0; i < 4; i++) {
            var ar: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("Armature");
            list.push(ar);
        }
        return list;
    }

    //************************************************************************
    //------------------------ 吃碰杠胡   扎鸟---------------------------------
    //************************************************************************

    //************************************************************************
    //------------------------ 牌操作---------------------------------
    //************************************************************************

    /**点击界面*/
    private onTouchTap(e: egret.TouchEvent) {
        //点击自己手牌
        if (e.target instanceof Card) {
            this.checkOutCard(e.target);
            return;
        }

        // switch (e.target) {
        //     case this.readyBtn:     //准备
        //         this.resetGame();
        //         this.onInitPosition();
        //         App.ResUtils.loadGroup([AssetConst.Game, AssetConst.Card], this, this.sendReady, null, 10);
        //         break;
        //     case this.toHallBtn:    //点击返回大厅th
        //         this.quitToHall();
        //         break;
        //     default:
        //         break;
        // }
    }

    /**拖牌*/
    private dragCard: Card;
    private dragCardValue: number = 0;
    private onDragCardBegin(e: egret.TouchEvent) {
        if (e.target instanceof Card) {  //自己手牌
            var card: Card = e.target;
            if (card.parent == this.cardGroup) {
                this.dragCardValue = card.cardValue;
                App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onDragCardMove, this);
                App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onDragCardEnd, this);
            }
        }
    }

    /**拖拽移动*/
    private onDragCardMove(e: egret.TouchEvent) {
        if (this.dragCardValue != 0) {
            if (this.dragCard == null && e.stageY < this.handRectList[UserPosition.Down].y) {
                this.dragCard = this.cardFactory.getHandCard(this.dragCardValue, UserPosition.Down);
                this.cardGroup.addChild(this.dragCard);
            }
            if (this.dragCard) {
                this.dragCard.x = e.stageX - this.dragCard.width / 2;
                this.dragCard.y = e.stageY - this.dragCard.height / 2;
            }
        }
    }

    /**释放拖拽*/
    private onDragCardEnd(e: egret.TouchEvent) {
        this.dragCardValue = 0;
        if (this.dragCard == null) {
            return;
        }
        //删除拖拽牌
        var dragCardValue = this.dragCard.cardValue;
        this.clearDragCard();
        //允许出牌，则从手牌获取相同牌值的牌，并打出
        if (this.bAllowOutCard && e.stageY < this.handRectList[UserPosition.Down].y) {
            var cardList = this.handCardList[UserPosition.Down];
            var cardLen = cardList.length;
            var card: Card;
            for (var i = 0; i < cardLen; i++) {
                card = cardList[i];
                if (card.cardValue == dragCardValue) {
                    this.bAllowOutCard = false;
                    this.curTouchCard = card;
                    this.sendOutCard(card);
                    break;
                }
            }
        }
    }

    //清理拖拽牌
    public clearDragCard() {
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onDragCardMove, this);
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onDragCardEnd, this);
        this.dragCardValue = 0;
        if (this.dragCard) {
            this.dragCard.recycle();
            this.dragCard = null;
        }
    }
    //************************************************************************
    //------------------------ 牌操作---------------------------------
    //************************************************************************

    /**出牌*/
    public sendOutCard(card: Card) {
        App.getController(ReGameController.NAME).sendAct(ACT_act.Act_NormalDo, [card.cardValue]);
    }

    /**显示出牌效果*/
    public showOutEffect(cardValue: number, pos: UserPosition) {
        var group: eui.Group = this.outEffectList[pos];
        if (group.numChildren <= 1) {
            var card: Card = this.cardFactory.getHandCard(cardValue, UserPosition.Down);
            group.addChild(card);
            card.x = (group.width - card.cardBg.width) / 2 + 2; //微调
            card.y = (group.height - card.cardBg.height) / 2 + 2;
        } else {
            card = <Card>group.getChildAt(1);
            card.setHandSkin(cardValue, UserPosition.Down);
        }
        this.outEffectGroup.addChild(group);
        egret.Tween.get(group).wait(this.outEffectTime).call(() => {
            group.parent && group.parent.removeChild(group);
        });
    }

    /**隐藏所有出牌效果*/
    public hideAllOutEffect() {
        this.outEffectGroup.removeChildren();
    }

    /**手牌深度调整 */
    private handCardDepth(pos){
                    //手牌和吃(碰杠)牌深度排序
            if (pos == UserPosition.L) {
                var lenf = this.handCardList[pos].length;
                for (var i = lenf - 1; i >= 0; i--) {
                    this.cardGroup.addChild(this.handCardList[pos][i]);
                }
            } else if (pos == UserPosition.R) {
                //            //重置手牌的位置
                console.log("右家手牌调整")
                var handLen1 = this.handCardList[pos].length;
                //这块的添加手牌需要 for ++;否则会出现深度问题
                for (var e = 0; e < handLen1; e++) {
                    this.cardGroup.addChild(this.handCardList[pos][e]);
                }

                var leng = this.eatList[pos].length;
                for (var i = leng - 1; i >= 0; i--) {
                    var len2 = this.eatList[pos][i].length;
                    for (var j = len2 - 1; j >= 0; j--) {
                        this.cardGroup.addChild(this.eatList[pos][i][j]);
                    }
                }
            }
    }

    ////////////////////////////////////////////////
    //---------------[打牌流程]-----------------
    ////////////////////////////////////////////////

    //检查是否能出牌, 当是自己手牌，并且允许出牌，牌在弹起的状态时，才能出牌。
    private checkOutCard(card: Card) {

        if (card.parent == this.cardGroup) {
            if (this.bAllowOutCard) {
                if (card.bUp) {
                    this.bAllowOutCard = false;
                    this.curTouchCard = card;
                    this.sendOutCard(card);
                } else {
                    this.downAllHandCard();
                    card.toUp();
                }
            } else {
                if (card.bUp) {
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
        for (var i = 0; i < len; i++) {
            handList[i].toDown();
        }
    }

    //出牌动作
    public actOutCard(pos: UserPosition, cardValue: number, bAnim: boolean = true) {
            //非回放时，正常设置出牌
            if (pos == UserPosition.Down) {
                this.hideActUI();
                var card = this.cardFactory.getOutCard(cardValue, pos);

                if (this.curTouchCard) {  //点击出牌
                    card.x = this.curTouchCard.x;
                    card.y = this.curTouchCard.y;
                } else {   //自动出牌
                    var takeRect: egret.Point = this.takeRectList[pos];
                    card.x = takeRect.x;
                    card.y = takeRect.y;
                }
            } else {
                var card = this.cardFactory.getOutCard(cardValue, pos);
                var takeRect: egret.Point = this.takeRectList[pos];
                card.x = takeRect.x;
                card.y = takeRect.y;
            }
        

        //移动牌到出牌区域
        this.addCardToOut(pos, card, false);

        //出牌后，处理摸牌、出牌、手牌的逻辑  (录像时，所有人都要处理手牌)
        if (pos == UserPosition.Down ) {
            if (this.curTouchCard == null) {  //自动出牌
                if (this.curGetCard != null) {  //有摸牌，则自动出摸到的牌
                    this.curGetCard.recycle();
                    this.removeHandCardByCard(this.curGetCard, pos);
                } else {  //没有摸牌，则自动从手牌中挑选符合牌值的牌
                    var cardList = this.handCardList[pos];
                    var len = cardList.length;
                    for (var i = 0; i < len; i++) {
                        var card: Card = cardList[i];
                        if (card.cardValue == cardValue) {
                            card.recycle();
                            this.removeHandCardByCard(card, pos);
                            break;
                        }
                    }
                    this.showHandCard(pos);
                }
            } else if (this.curTouchCard == this.curGetCard) { //点击出牌,出牌=摸牌（有摸牌）
                this.removeHandCardByCard(this.curTouchCard, pos);
                this.curTouchCard.recycle();
            } else if (this.curTouchCard != this.curGetCard) { //点击出牌，出牌 != 摸牌
                if (this.curGetCard == null) { //没有摸牌，则删掉出牌，然后排列牌组
                    this.removeHandCardByCard(this.curTouchCard, pos);
                    this.curTouchCard.recycle();
                    this.showHandCard(pos);
                } else {  //有摸牌，则删掉出牌，然后将摸牌加入到手牌
                    this.addCardToHand(this.curGetCard, pos, bAnim);
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
    public addCardToOut(pos: UserPosition, card: Card, bAnim: boolean = true) {
        this.outGroup.addChild(card);
        var outLen = this.outList[pos].length;
        var row = Math.floor(outLen / 6);  //1行排不下，第一排6张牌
        outLen = outLen % 6;                 //第一行第几张

        //玩家在多次碰之后，会多打出几张牌，由于没有第四行，所以多出的牌放在第三行
        if (row > 1) {
            row = 1;
            outLen += 6;
        }

        var endX;
        var endY;
        //获取出牌移动的终点位置
        if (row == 0) {
            var outRect: egret.Point = this.outRectList[pos];
        } else if (row == 1) {
            var outRect: egret.Point = this.out1RectList[pos];
        } else if (row >= 2) {
            var outRect: egret.Point = this.out2RectList[pos];
        }
        if (pos == UserPosition.Down) {
            endX = outRect.x + this.outInvalXList[pos] * outLen;
            endY = outRect.y + this.outInvalYList[pos];
            // this.outGroup.setChildIndex(card, 0);
        } else if (pos == UserPosition.R) {
            endX = outRect.x + this.outInvalXList[pos] * outLen;
            endY = outRect.y + this.outInvalYList[pos] * outLen;
            if (row == 0) {
                this.outGroup.setChildIndex(card, 0);
            } else {
                var index = this.outGroup.getChildIndex(this.outList[pos][this.outList[pos].length - 1]);
                this.outGroup.setChildIndex(card, index - 1);
            }
        } else if (pos == UserPosition.Up) {
            endX = outRect.x - this.outInvalXList[pos] * outLen;
            endY = outRect.y + this.outInvalYList[pos];
            // this.outGroup.setChildIndex(card, 0);
        } else if (pos == UserPosition.L) {
            endX = outRect.x + this.outInvalXList[pos] * outLen;
            endY = outRect.y + this.outInvalYList[pos] * outLen;
        }
        // console.log("出牌位置：———————————————————————————");
        // console.log(card);
        // console.log("pos=="+pos+"##row=="+row+"##outLen=="+outLen);
        // console.log("x==="+endX+"&&y=="+endY);
        // console.log("出牌位置：============================");
        //移动牌 是否是回放
        if (bAnim) {
            this.moveCardToOut(card, endX, endY, pos, row, outLen);
        } else {
            this.setOutCardIndex(pos, card, row, outLen);
            card.x = endX;
            card.y = endY;
            this.showOutFlag(card, pos);
        }

        if (pos != UserPosition.Down) {
            this.showHandCard(pos);
        }

        //处理出牌逻辑
        this.outList[pos].push(card);
        this.curOutCard = card;
    }

    //移动牌到出牌区域
    private moveCardToOut(card, endX, endY, pos, row, outLen) {

        var moveCard = this.cardFactory.getOutCard(card.cardValue, pos);
        moveCard.x = card.x;
        moveCard.y = card.y;
        moveCard.scaleX = card.scaleY;
        moveCard.scaleY = card.scaleY;
        this.cardGroup.addChild(moveCard);
        setTimeout(() => {
            if (moveCard && moveCard.parent) {
                this.cardGroup.removeChild(moveCard);
                card.visible = true;
                card.x = endX;
                card.y = endY;
            }

        }, this.outMoveTime + 100);
        card.visible = false;
        egret.Tween.get(moveCard).to({ x: endX, y: endY }, this.outMoveTime).call(() => {
            console.log("x===" + card.x + "&&y===" + card.y);
            // console.log("最终位置：………………………………………………………………………………………………")
            if (moveCard && moveCard.parent) {
                this.cardGroup.removeChild(moveCard);
            }
            card.visible = true;
            card.x = endX;
            card.y = endY;
            this.setOutCardIndex(pos, card, row, outLen);
            this.showOutFlag(card, pos);
            egret.Tween.removeTweens(moveCard);
        });
        // card.x = endX;
        // card.y = endY;
        this.setOutCardIndex(pos, card, row, outLen);
        //this.showOutFlag(card, pos);
    }

    //出牌深度排序  出过的牌多行显示时，牌层深度需要调整，否则会出现重叠
    private setOutCardIndex(pos, card, row, outLen) {
        // if(pos == UserPosition.R) {

        //     if(card && card.parent){
        //         this.outGroup.setChildIndex(card,0);
        //      }

        // }
        // if(pos==UserPosition.Down){
        //     if(card && card.parent){
        //         this.outGroup.setChildIndex(card,0);
        //     }
        // }

    }

    //显示出牌指示器
    private showOutFlag(card, pos) {
        this.outFlag.show(card, pos);
        this.outFlagGroup.addChild(this.outFlag);
    }


    /**
     * 出牌!=摸牌时，删除出牌，将摸牌添加进手牌
     * @addCard 待加入的牌
     * @pos 位置
     * @bAnim 是否播放动画
     */
    public addCardToHand(addCard: Card, pos: UserPosition, bAnim: boolean = true) {
        console.log("添加到手牌,牌值:", addCard.cardValue + ";" + "坐标：" + addCard.x + "," + addCard.y);
        //放下所有牌
        this.downAllHandCard();
        //将出牌移除
        var touchIndex = this.handCardList[pos].indexOf(this.curTouchCard);
        this.curTouchCard.recycle();
        this.removeHandCardByCard(this.curTouchCard, pos);

        //摸牌加入动画
        if (pos == UserPosition.Down) {
            if (bAnim) {
                //找到摸牌应该加入的位置
                var intervalX = this.handInvalXList[pos];
                var intervalY = this.handInvalYList[pos];
                var startX = this.handRectList[pos].x;
                var startY = this.handRectList[pos].y;
                var handList = this.handCardList[pos];
                var joinIndex = this.cardLogic.getJoinCardPos(addCard, handList);

                //摸牌动画
                var vTime = 300; //垂直移动时间
                var hTime = 300; //水平移动时间
                //摸牌加入位置是最右边，则直接平移
                if (joinIndex == 0) {
                    egret.Tween.get(addCard).to({ x: joinX, y: joinY }, hTime).call(() => {
                        this.showHandCard(pos);
                    });
                } else {
                    //假如牌是在下面一行
                    if (joinIndex < 7) {
                        var joinX = joinIndex * intervalX + startX;
                        var joinY = joinIndex * intervalY + startY;
                        //将摸牌上移，再平移，再下移
                        egret.Tween.get(addCard).to({ y: addCard.y - addCard.height }, vTime)
                            .to({ x: joinX }, hTime).wait(hTime)
                            .to({ y: joinY }, vTime).call(() => {
                                addCard.x = joinX;
                                addCard.y = joinY;
                                this.showHandCard(pos);
                            });
                    } else if (joinIndex == 7) {
                        var joinX = (joinIndex - 7) * intervalX + startX + this.myHandCardAdjustX;
                        var joinY = (joinIndex - 7) * intervalY + startY;
                        //在上面一行 第一张牌
                        egret.Tween.get(addCard).to({ y: addCard.y - this.myHandCardAdjustY }, vTime)
                            .to({ x: joinX }, hTime).wait(hTime)
                            .to({ y: joinY - this.myHandCardAdjustY }, vTime).call(() => {
                                addCard.x = joinX;
                                addCard.y = joinY;
                                this.showHandCard(pos);
                            });
                    } else {
                        var joinX = (joinIndex - 7) * intervalX + startX + this.myHandCardAdjustX;
                        var joinY = (joinIndex - 7) * intervalY + startY;
                        //在上面一行
                        egret.Tween.get(addCard).to({ y: addCard.y - addCard.height - this.myHandCardAdjustY }, vTime)
                            .to({ x: joinX }, hTime).wait(hTime)
                            .to({ y: joinY - this.myHandCardAdjustY }, vTime).call(() => {
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
                for (var i = startIndex; i < endIndex; i++) {
                    moveCard = handList[i];
                    if (joinIndex == 0) {
                        egret.Tween.get(moveCard).to({ x: moveCard.x + intervalX }, hTime);
                    } else {
                        egret.Tween.get(moveCard).wait(hTime + vTime).to({ x: moveCard.x + intervalX }, vTime);
                    }
                }
            } else {
                //无动画，则直接排列手牌即可
                this.showHandCard(pos);
            }

        } else if (pos == UserPosition.R) {
            this.showHandCard(pos);
        } else if (pos == UserPosition.Up) {
            this.showHandCard(pos);
        } else if (pos == UserPosition.L) {
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
    public eatHandler(act: ACT_act, pos: number, cardList, actParam: number) {
        //服务端没有传送完整牌值列表，这里拼接牌值列表
        var cardValue = cardList[0];
        var eatCardList = [];    //需要显示到吃碰区域的牌
        var deleteCardList = []; //需要从手上删除的牌

        if (act == ACT_act.Act_Peng) {
            eatCardList = [cardValue, cardValue, cardValue];
            deleteCardList = [cardValue, cardValue];
        } else if (act == ACT_act.Act_Chi) {
            eatCardList = cardList;
            deleteCardList = [cardList[1], cardList[2]];
            ArrayTool.sortArr(eatCardList);
        } else if (act == ACT_act.Act_Gang) {
            if (actParam == 1) {  //1补杠
                eatCardList = [cardValue];
                deleteCardList = [cardValue];
            } else if (actParam == 3) {  //3点杠
                eatCardList = [cardValue, cardValue, cardValue, cardValue];
                deleteCardList = [cardValue, cardValue, cardValue];
            }
        } else if (act == ACT_act.Act_AnGang) { //暗杠
            eatCardList = [cardValue, cardValue, cardValue, cardValue];
            deleteCardList = [cardValue, cardValue, cardValue, cardValue];
        }

        //显示吃(碰杠)牌   
        this.addCardToEat(eatCardList, pos, act, actParam);
        //删除牌，一张场面上，其余在手牌中
        if (this.curOutCard) {
            this.outList[this.curOutCard.userPos].pop();
            this.curOutCard.recycle();
            this.curOutCard = null;
        }
        this.outFlag.hide();
        var deleteLen = deleteCardList.length;
        if (pos == UserPosition.Down) {
            var handList = this.handCardList[pos];
            for (var i = 0; i < deleteLen; i++) {
                var handLen = handList.length;
                var deleteCardValue = deleteCardList[i];
                for (var j = 0; j < handLen; j++) {
                    var handCard: Card = handList[j];
                    if (handCard.cardValue == deleteCardValue) {
                        handCard.recycle();
                        handList.splice(j, 1);
                        break;
                    }
                }
            }


            if (act == ACT_act.Act_Chi || act == ACT_act.Act_Peng) {
                this.resetHandCards(UserPosition.Down);//重新排列手牌
            } else {
                this.showHandCard(UserPosition.Down);//排列手牌
            }


        }
        else {
       

                //其他玩家重新排列手牌
                if (act == ACT_act.Act_Chi || act == ACT_act.Act_Peng) {

                    this.resetHandCards(pos);//重新排列手牌
                } else {
                    this.showHandCard(pos);//排列手牌
                }

                for (var i = 0; i < deleteLen; i++) {
                    var card: Card = this.handCardList[pos].pop();
                    card.recycle();
                }
        

        }
    }

    /**
     * 吃碰杠后重新排列手牌
     */
    private resetHandCards(pos) {
        var cardList: Array<Card> = this.handCardList[pos];
        var len = cardList.length;
        var card: Card;
        var intervalX = this.handInvalXList[pos];
        var intervalY = this.handInvalYList[pos];
        var startX = this.handRectList[pos].x;
        var startY = this.handRectList[pos].y;

        //排列手牌
        if (pos == UserPosition.Down) {
            this.cardLogic.sortHandCard(this.handCardList[pos]);

        }

        //判断玩家是哪家   自己的手牌需要放两排
        if (pos == UserPosition.Down) {
            if (cardList.length > 0) {
                if (cardList.length < this.outRowLimit + 1) {
                    for (var i = 0; i < cardList.length; i++) {
                        if (i == 0) {
                            card = cardList[i];
                            card.x = this.takeRectList[pos].x;
                            card.y = this.takeRectList[pos].y;
                            card.initPosY = card.y;
                        } else {
                            card = cardList[i];
                            card.x = startX + intervalX * (i - 1);
                            card.y = startY + intervalY * (i - 1);
                            card.initPosY = card.y
                        }

                        this.cardGroup.addChild(cardList[i]);
                    }
                } else {
                    for (var i = 0; i < this.outRowLimit + 1; i++) {
                        if (i == 0) {
                            card = cardList[i];
                            card.x = this.takeRectList[pos].x;
                            card.y = this.takeRectList[pos].y;
                            card.initPosY = card.y;
                        } else {
                            card = cardList[i];
                            card.x = startX + intervalX * (i - 1);
                            card.y = startY + intervalY * (i - 1);
                            card.initPosY = card.y
                        }
                        this.cardGroup.addChild(cardList[i]);
                    }
                    for (var j = this.outRowLimit + 1; j < cardList.length; j++) {
                        card = cardList[j];
                        card.x = startX + intervalX * (j - this.outRowLimit - 1) + this.myHandCardAdjustX;
                        card.y = startY - 20 + intervalY * (j - this.outRowLimit - 1) - this.myHandCardAdjustY;
                        card.initPosY = card.y
                        this.cardGroup.addChild(cardList[j]);
                    }
                }
            }
        } else {
            for (var i = 0; i < len; i++) {
                if (i == 0) {
                    card = cardList[i];
                    card.x = this.takeRectList[pos].x;
                    card.y = this.takeRectList[pos].y;
                    card.initPosY = card.y;
                } else {
                    card = cardList[i];
                    card.x = startX + intervalX * (i - 1);
                    card.y = startY + intervalY * (i - 1);
                    card.initPosY = card.y
                }
                this.cardGroup.addChild(cardList[i]);
            }

        }


        //左边深度排序
        if (pos == UserPosition.L) {
            var handLen = this.handCardList[pos].length;
            for (var i = handLen - 1; i >= 0; i--) {
                this.cardGroup.addChild(this.handCardList[pos][i]);
            }
        }

        //调整自己手牌深度
        if (pos == UserPosition.Down) {
            var handLen = this.handCardList[pos].length;
            for (var i = handLen - 1; i >= 0; i--) {
                this.cardGroup.addChild(this.handCardList[pos][i]);
            }
        }
    }

    /**
     * 重连时重置手牌(把摸到牌放到最边上)
     */
    public resumeResetHandCards(pos) {
        var cardList: Array<Card> = this.handCardList[pos];
        var len = cardList.length;
        var card: Card;
        var intervalX = this.handInvalXList[pos];
        var intervalY = this.handInvalYList[pos];
        var startX = this.handRectList[pos].x;
        var startY = this.handRectList[pos].y;

        //排列手牌
        if (pos == UserPosition.Down) {
            this.cardLogic.sortHandCard(this.handCardList[pos]);

        }

        //判断玩家是哪家   自己的手牌需要放两排
        if (pos == UserPosition.Down) {
            if (cardList.length > 0) {
                var count = 0;
                //将摸牌移到最右边
                for (var i = 0; i < cardList.length; i++) {
                    if (this.curGetCard != null && this.curGetCard.cardValue == cardList[i].cardValue && count == 0) {
                        card = cardList[i];
                        cardList.splice(i, 1);
                        cardList.splice(0, 0, card);
                        count += 1;
                    }
                }

                if (cardList.length > 0) {
                    if (cardList.length < this.outRowLimit + 1) {
                        for (var i = 0; i < cardList.length; i++) {
                            if (i == 0) {
                                card = cardList[i];
                                card.x = this.takeRectList[pos].x;
                                card.y = this.takeRectList[pos].y;
                                card.initPosY = card.y;
                                this.curGetCard = card;
                            } else {
                                card = cardList[i];
                                card.x = startX + intervalX * (i - 1);
                                card.y = startY + intervalY * (i - 1);
                                card.initPosY = card.y
                            }

                            this.cardGroup.addChild(cardList[i]);
                        }
                    } else {
                        //第一行牌处理
                        for (var i = 0; i < this.outRowLimit + 1; i++) {
                            if (i == 0) {
                                card = cardList[i];
                                card.x = this.takeRectList[pos].x;
                                card.y = this.takeRectList[pos].y;
                                card.initPosY = card.y;
                                this.curGetCard = card;
                            } else {
                                card = cardList[i];
                                card.x = startX + intervalX * (i - 1);
                                card.y = startY + intervalY * (i - 1);
                                card.initPosY = card.y
                            }
                            this.cardGroup.addChild(cardList[i]);
                        }
                        //第二行牌处理
                        for (var j = this.outRowLimit + 1; j < cardList.length; j++) {
                            card = cardList[j];
                            card.x = startX + intervalX * (j - this.outRowLimit - 1) + this.myHandCardAdjustX;
                            card.y = startY - 20 + intervalY * (j - this.outRowLimit - 1) - this.myHandCardAdjustY;
                            card.initPosY = card.y
                            this.cardGroup.addChild(cardList[j]);
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i < len; i++) {
                if (i == 0) {
                    card = cardList[i];
                    card.x = this.takeRectList[pos].x;
                    card.y = this.takeRectList[pos].y;
                    card.initPosY = card.y;
                } else {
                    card = cardList[i];
                    card.x = startX + intervalX * (i - 1);
                    card.y = startY + intervalY * (i - 1);
                    card.initPosY = card.y
                }
                this.cardGroup.addChild(cardList[i]);
            }

        }


        //左边深度排序
        if (pos == UserPosition.L) {
            var handLen = this.handCardList[pos].length;
            for (var i = handLen - 1; i >= 0; i--) {
                this.cardGroup.addChild(this.handCardList[pos][i]);
            }
        }

        //调整自己手牌深度
        if (pos == UserPosition.Down) {
            var handLen = this.handCardList[pos].length;
            for (var i = handLen - 1; i >= 0; i--) {
                this.cardGroup.addChild(this.handCardList[pos][i]);
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
    public addCardToEat(cardList, pos: number, act: ACT_act, actParam: number) {
        var eatNum = this.eatCount[pos];               //已吃(碰杠)次数
        this.eatList[pos][eatNum] = [];                //吃(碰杠)牌列表
        var rect: egret.Point = this.eatRectList[pos]; //吃(碰杠)定位
        var len = cardList.length;                     //吃(碰杠)牌长度
        var invalX;                                    //排列x间隔
        var invalY;                                    //排列y间隔
        var scaleX;
        var scaleY;
        var eatCard: Card;                              //当前处理的吃(碰杠)牌
        var bGang: boolean = false;                     //是否是杠牌
        //判断是否是杠
        if (act == ACT_act.Act_AnGang || act == ACT_act.Act_Gang) {
            bGang = true;
        }

        //循环吃(碰杠)牌列表，将所有牌排列到吃(碰杠)区域
        for (var i = 0; i < len; i++) {
            //暗杠。自己暗杠，第4张牌显示，其余盖着;其他人暗杠，则全部盖着
            if (act == ACT_act.Act_AnGang) {
             
                    if (i == 3 && pos == UserPosition.Down) {
                        eatCard = this.cardFactory.getEatCard(cardList[i], pos);
                    } else {
                        eatCard = this.cardFactory.getAnGangCard(cardList[i], pos);
                    }
                
            } else {
                //明杠。actParam=1补杠，只处理最后一张
                eatCard = this.cardFactory.getEatCard(cardList[i], pos);
                if (act == ACT_act.Act_Gang && (actParam == 1)) {
                    i = 3;
                    //寻找杠牌堆位置
                    var gangCardValue = cardList[0];
                    var eatLen = this.eatList[pos].length;
                    for (var j = 0; j < eatLen; j++) {
                        if (this.eatList[pos][j][0]) {
                            if (this.eatList[pos][j][0].cardValue == gangCardValue) {
                                eatNum = j;
                                break;
                            }
                        }
                    }
                    this.eatCount[pos] -= 1;
                }
            }
            //根据位置，排列牌到正确位置
            if (pos == UserPosition.Down) {
                if (eatNum > 1) {
                    invalX = this.eatInvalXList[pos] * ((eatNum - 2) * this.pengLimit + i) + this.multiEatInvalXList[pos] * (eatNum - 2);
                    invalY = this.hand0_start.y + 80 + 54;
                    scaleX = 1;
                    scaleY = 1;
                    if (bGang && i == 3) {
                        //杠牌时，位置
                        invalX += this.gangInvalXList[pos];
                        invalY += this.ganeInvalYList[pos];
                        scaleX = this.gangScaleXList[pos];
                        scaleY = this.gangScaleYlist[pos];
                    };
                    // eatCard.x = rect.x + invalX * this.cardRatioXY;    //根据下面scaleX调整，否则碰牌会遮挡手牌
                    // eatCard.y = invalY; //自己吃牌会被缩小，这里微调缩小后y位置
                    // eatCard.scaleX = 1;    //this.cardRatioXY
                    // eatCard.scaleY = 1;    //this.cardRatioXY;
                    eatCard.x = rect.x + invalX + 15;
                    eatCard.y = invalY;
                    eatCard.scaleX = scaleX;
                    eatCard.scaleY = scaleY;

                } else {
                    invalX = this.eatInvalXList[pos] * (eatNum * this.pengLimit + i) + this.multiEatInvalXList[pos] * eatNum;
                    invalY = 0;
                    scaleX = 1;
                    scaleY = 1;
                    if (bGang && i == 3) {  //杠牌时，位置
                        invalX += this.gangInvalXList[pos];
                        invalY += this.ganeInvalYList[pos];
                        scaleX = this.gangScaleXList[pos];
                        scaleY = this.gangScaleYlist[pos];
                    };
                    // eatCard.x = rect.x + invalX ;   //this.cardRatioXY;    //根据下面scaleX调整，否则碰牌会遮挡手牌
                    // eatCard.y = rect.y + invalY ;   //this.cardRatioXY; //自己吃牌会被缩小，这里微调缩小后y位 置
                    // eatCard.scaleX = 1;    //this.cardRatioXY
                    // eatCard.scaleY = 1;    //this.cardRatioXY;
                    eatCard.x = rect.x + invalX + 110;
                    eatCard.y = rect.y + invalY + 10;
                    eatCard.scaleX = scaleX;
                    eatCard.scaleY = scaleY;

                }

                //假如碰或杠或吃 有三组以上，计算他们的位置，大于那个位置重新排列碰牌位置
            } else if (pos == UserPosition.R) { //牌组从下往上牌
                invalX = -this.eatInvalXList[pos] * (eatNum * this.pengLimit + i);
                invalY = this.eatInvalYList[pos] * (-eatNum * this.pengLimit - i) - this.multiEatInvalYList[pos] * eatNum;
                scaleX = 1;
                scaleY = 1;
                if (bGang && i == 3) {  //杠牌时，位置
                    invalX = -this.eatInvalXList[pos] * (eatNum * this.pengLimit + i - 2) + this.gangInvalXList[pos];
                    invalY += this.ganeInvalYList[pos];
                    scaleX = this.gangScaleXList[pos];
                    scaleY = this.gangScaleYlist[pos];
                }
                eatCard.x = rect.x + invalX;
                eatCard.y = rect.y + invalY;
                eatCard.scaleX = scaleX;
                eatCard.scaleY = scaleY;

            } else if (pos == UserPosition.Up) {
                invalX = this.eatInvalXList[pos] * (-eatNum * this.pengLimit - i) - this.multiEatInvalXList[pos] * eatNum;
                invalY = 0;
                if (bGang && i == 3) {
                    invalX += this.gangInvalXList[pos];
                    invalY += this.ganeInvalYList[pos];
                    scaleX = this.gangScaleXList[pos];
                    scaleY = this.gangScaleYlist[pos];
                };
                eatCard.x = rect.x + invalX;
                eatCard.y = rect.y + invalY;
                //上家吃牌太大会挡住手牌，这里缩小
                eatCard.scaleX = 0.85;
                eatCard.scaleY = 0.85;


            } else if (pos == UserPosition.L) {
                invalX = this.eatInvalXList[pos] * (eatNum * this.pengLimit + i);
                invalY = this.eatInvalYList[pos] * (eatNum * this.pengLimit + i) + this.multiEatInvalYList[pos] * eatNum;
                scaleX = 1;
                scaleY = 1;
                if (bGang && i == 3) {
                    invalX = this.eatInvalXList[pos] * (eatNum * this.pengLimit + i - 2) + this.gangInvalXList[pos];
                    invalY += this.ganeInvalYList[pos];
                    scaleX = this.gangScaleXList[pos];
                    scaleY = this.gangScaleYlist[pos];
                }
                eatCard.x = rect.x + invalX;
                eatCard.y = rect.y + invalY;
                eatCard.scaleX = scaleX;
                eatCard.scaleY = scaleY;
            }
            this.cardGroup.addChild(eatCard);

            //R玩家，因为深度排序问题，特殊处理
            if (pos == UserPosition.R && bGang && i == 3) {
                this.eatList[pos][eatNum].unshift(eatCard);
            } else {
                this.eatList[pos][eatNum].push(eatCard);
            }

        }

        //手牌和吃(碰杠)牌深度排序
        if (pos == UserPosition.L) {
            var len = this.handCardList[pos].length;
            for (var i = len - 1; i >= 0; i--) {
                this.cardGroup.addChild(this.handCardList[pos][i]);
            }
        } else if (pos == UserPosition.R) {
            //            //重置手牌的位置
            console.log("杠牌通过这里" + this.hand1_start.x + ":" + this.hand1_start.y);
            var handLen = this.handCardList[pos].length;
            //这块的添加手牌需要 for ++;否则会出现深度问题
            for (var e = 0; e < handLen; e++) {
                this.cardGroup.addChild(this.handCardList[pos][e]);
            }

            var len = this.eatList[pos].length;
            for (var i = len - 1; i >= 0; i--) {
                var len2 = this.eatList[pos][i].length;
                for (var j = len2 - 1; j >= 0; j--) {
                    this.cardGroup.addChild(this.eatList[pos][i][j]);
                }
            }
        }
        //增加吃(碰杠)次数
        this.eatCount[pos] += 1;
        console.log(this.eatCount[pos], "杠牌通过111");
        // console.log("懵比eatList",this.eatList);
    }

    //根据牌值移除手牌
    private removeHandCardByValue(cardValue, pos: UserPosition) {
        var cardList = this.handCardList[pos];
        var len = cardList.length;
        var card: Card;
        for (var i = 0; i < len; i++) {
            card = cardList[i];
            if (cardValue == card.cardValue) {
                cardList.splice(i, 1);
                return card;
            }
        }
    }

    //根据牌Card移除手牌
    private removeHandCardByCard(targetCard: Card, pos: UserPosition) {
        var cardList = this.handCardList[pos];
        var len = cardList.length
        var card: Card;
        for (var i = 0; i < len; i++) {
            card = cardList[i];
            if (card == targetCard) {
                cardList.splice(i, 1);
                return card;
            }
        }
    }

    //显示桌面上的牌
    public showDeskCard() {
        var json = ProtocolData.Rev180_58_0;
        var resultList = json.resultList;
        var len = resultList.length;

        // console.log("吃碰杠牌",this.eatList);
        for (var i = 0; i < len; i++) {
            var resultInfo = ProtocolData.resultInfo;
            resultInfo = resultList[i];
            var pos = this.cardLogic.changeSeat(resultInfo.seatID);

            //摊开暗杠手牌
            // var anGangCards = resultInfo.anGangCards;
            var anGangCards = json.resultList[i].anGangCards;
            // console.log("服务端暗杠牌",anGangCards);
            if (anGangCards && anGangCards.length > 0) {
                var anGangLen = anGangCards.length;
                for (var j = 0; j < anGangLen; j++) {   //遍历游戏暗杠结果数组
                    var anGangCardValue = anGangCards[j];
                    var eatLen = this.eatList[pos].length;
                    for (var k = 0; k < eatLen; k++) {  //遍历游戏吃(碰杠)数组
                        if (this.eatList[pos][k].length == 4) {
                            // console.log("暗杠牌",this.eatList[pos][k]);
                            // console.log("最终吃碰杠牌",this.eatList);
                            if (this.eatList[pos][k][0].cardValue == anGangCardValue) {
                                //将盖着的牌替换成明牌
                                for (var m = 0; m < 4; m++) {
                                    // console.log("k",k);
                                    // console.log("m",m);
                                    //  console.log("z暗杠牌",this.eatList[pos][k]);
                                    var newCard: Card = this.cardFactory.getEatCard(anGangCardValue, pos);
                                    // console.log("暗杠单牌",this.eatList[pos][k][m]);
                                    var oldCard: Card = this.eatList[pos][k][m];
                                    newCard.x = oldCard.x;
                                    newCard.y = oldCard.y;
                                    //是自己的  按照比例缩小
                                    if (pos == 0) {
                                        newCard.scaleX = 1; //this.cardRatioXY
                                        newCard.scaleY = 1; //this.cardRatioXY;
                                    } else if (pos == UserPosition.Up) {
                                        newCard.scaleX = 0.82;
                                        newCard.scaleY = 0.82;
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

            //自己手牌需要摊开
            if (pos == UserPosition.Down) {
                
                    var handcards = this.handCardList[pos];
                    for (let key in handcards) {
                        var hCard: Card = handcards[key];
                        hCard.setEatSkin(hCard.cardValue, UserPosition.Down);
                        hCard.scaleX = 1.22;
                        hCard.scaleY = 1.22;
                    }

            } else {

                //移除当前位置玩家手牌
                var handList = this.handCardList[pos];
                var handLen = handList.length;
                for (var j = 0; j < handLen; j++) {
                    var card: Card = handList[j];
                    card.recycle();
                }
                handList.length = 0;

                //添加当前位置玩家手牌
                var cards = resultInfo.cards;
                var hucard = resultInfo.huCard;
                var endCard: Card;          //最终胡牌
                var eatNum = this.eatCount[pos];               //已吃(碰杠)次数
                this.eatList[pos][eatNum] = [];                //吃(碰杠)牌列表
                var rect: egret.Point = this.eatRectList[pos]; //吃(碰杠)定位
                var invalX;                                    //排列x间隔
                var invalY;                                    //排列y间隔

                if (hucard == undefined) {
                    this.addCardToEat(cards, pos, ACT_act.Act_Chi, 0);
                } else {
                    if (hucard != 0) {
                        for (var k = 0; k < cards.length; k++) {
                            if (cards[k] == hucard) {
                                cards.splice(k, 1);
                                console.log("剔除掉的牌", cards[k]);
                            }
                        }
                    }

                    if (resultInfo.is_zi_mo) {

                        this.addCardToEat(cards, pos, ACT_act.Act_Chi, 0);
                        if (hucard != 0) {
                            endCard = this.cardFactory.getEatCard(hucard, pos);
                            switch (pos) {
                                case UserPosition.L:
                                    invalX = this.eatInvalXList[pos] * (eatNum * this.pengLimit);
                                    invalY = this.eatInvalYList[pos] * (eatNum * this.pengLimit) + this.multiEatInvalYList[pos] * (eatNum + 1) - cards.length * this.handInvalYList[pos];
                                    console.log("真的需要你" + rect.y + invalY);
                                    endCard.x = rect.x + invalX;
                                    endCard.y = rect.y + invalY;
                                    break;
                                case UserPosition.R:
                                    invalX = -this.eatInvalXList[pos] * (eatNum * this.pengLimit);
                                    invalY = this.eatInvalYList[pos] * (-eatNum * this.pengLimit) - this.multiEatInvalYList[pos] * (eatNum + 1) - cards.length * this.handInvalYList[pos];
                                    endCard.x = rect.x + invalX;
                                    endCard.y = rect.y + invalY;
                                    break;
                                case UserPosition.Up:
                                    invalX = (this.eatInvalXList[pos] * (-eatNum * this.pengLimit) +(eatNum * 10)) - this.multiEatInvalXList[pos] * eatNum - (cards.length+1) * this.handInvalXList[pos] - this.multiEatInvalXList[pos]-20;
                                    invalY = 0;
                                    endCard.x = rect.x + invalX;
                                    endCard.y = rect.y + invalY;
                                    endCard.scaleX = 0.85;
                                    endCard.scaleY = 0.85;
                                    break;
                            }

                            this.cardGroup.addChild(endCard);
                            this.handCardList[pos].push(endCard);
                            this.handCardDepth(pos);//深度调整
                        }
                    } else {
                        this.addCardToEat(cards, pos, ACT_act.Act_Chi, 0);
                        if (hucard != 0) {
                            endCard = this.cardFactory.getEatCard(hucard, pos);
                            switch (pos) {
                                case UserPosition.L:
                                    invalX = this.eatInvalXList[pos] * (eatNum * this.pengLimit);
                                    invalY = this.eatInvalYList[pos] * (eatNum * this.pengLimit) + this.multiEatInvalYList[pos] * (eatNum + 1) - cards.length * this.handInvalYList[pos];
                                    endCard.x = rect.x + invalX;
                                    endCard.y = rect.y + invalY;
                                    break;
                                case UserPosition.R:
                                    invalX = -this.eatInvalXList[pos] * (eatNum * this.pengLimit);
                                    invalY = this.eatInvalYList[pos] * (-eatNum * this.pengLimit) - this.multiEatInvalYList[pos] * (eatNum + 1) - cards.length * this.handInvalYList[pos];
                                    endCard.x = rect.x + invalX;
                                    endCard.y = rect.y + invalY;
                                    break;
                                case UserPosition.Up:
                                    invalX = (this.eatInvalXList[pos] * (-eatNum * this.pengLimit)+(eatNum * 10)) - this.multiEatInvalXList[pos] * (eatNum + 1) - (cards.length+1) * this.handInvalXList[pos]-20 ;
                                    invalY = 0;
                                    endCard.x = rect.x + invalX;
                                    endCard.y = rect.y + invalY;
                                    endCard.scaleX = 0.85;
                                    endCard.scaleY = 0.85;
                                    break;
                            }

                            this.cardGroup.addChild(endCard);
                            this.handCardList[pos].push(endCard);
                            this.handCardDepth(pos);//深度调整
                        }
                    }

                }
            }

        }

    }



    /**保存手牌的Y位置，用于牌弹起回缩*/
    public saveHandCardPosY() {
        var handList = this.handCardList[UserPosition.Down];
        var len = handList.length;
        for (var i = 0; i < len; i++) {
            var card: Card = handList[i];
            card.initPosY = card.y;
        }
    }

    /**
     * 吃碰杠后手牌偏移
     */
    public offHandCard(pos: UserPosition, num: number) {
        if (pos == UserPosition.Up) {
            //手牌偏移
            this.handRectList[pos].x = this.handRectList[pos].x - 19 * num;
            //摸牌偏移
            this.takeRectList[pos].x = this.takeRectList[pos].x - 19 * num;

        }
    }

    /**
     * 显示玩家手牌，获取玩家手牌数组，根据起始位置和间隔，添加到指定group中
     * @pos 位置
     */
    public showHandCard(pos: UserPosition) {
        var cardList: Array<Card> = this.handCardList[pos];
        var len = cardList.length;
        var card: Card;
        var intervalX = this.handInvalXList[pos];
        var intervalY = this.handInvalYList[pos];
        var startX = this.handRectList[pos].x;
        var startY = this.handRectList[pos].y;

        //排列手牌
        if (pos == UserPosition.Down) {
            this.cardLogic.sortHandCard(this.handCardList[pos]);

        }

        //判断玩家是哪家   自己的手牌需要放两排
        if (pos == UserPosition.Down) {
            if (cardList.length > 0) {
                if (cardList.length < this.outRowLimit) {
                    for (var i = 0; i < cardList.length; i++) {
                        card = cardList[i];
                        card.x = startX + intervalX * i;
                        card.y = startY + intervalY * i;
                        card.initPosY = card.y
                        this.cardGroup.addChild(cardList[i]);
                    }
                } else {
                    for (var i = 0; i < this.outRowLimit; i++) {
                        card = cardList[i];
                        card.x = startX + intervalX * i;
                        card.y = startY + intervalY * i;
                        card.initPosY = card.y
                        this.cardGroup.addChild(cardList[i]);
                    }
                    for (var j = this.outRowLimit; j < cardList.length; j++) {
                        card = cardList[j];
                        card.x = startX + intervalX * (j - this.outRowLimit) + this.myHandCardAdjustX;
                        card.y = startY - 20 + intervalY * (j - this.outRowLimit) - this.myHandCardAdjustY;
                        card.initPosY = card.y
                        this.cardGroup.addChild(cardList[j]);
                    }
                }
            }
        } else {
            for (var i = 0; i < len; i++) {
                card = cardList[i];
                card.x = startX + intervalX * i;
                card.y = startY + intervalY * i;
                this.cardGroup.addChild(cardList[i]);
            }
        }
        //左边深度排序
        if (pos == UserPosition.L) {
            var handLen = this.handCardList[pos].length;
            for (var i = handLen - 1; i >= 0; i--) {
                this.cardGroup.addChild(this.handCardList[pos][i]);
            }
        }

        //调整自己手牌深度
        if (pos == UserPosition.Down) {
            var handLen = this.handCardList[pos].length;
            for (var i = handLen - 1; i >= 0; i--) {
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
        for (var i = 0; i < len; i++) {  //循环获取4个玩家的牌信息
            var dealCardInfo = ProtocolData.deleaveCardInfo;
            dealCardInfo = dealCardList[i];
            var pos = this.cardLogic.changeSeat(dealCardInfo.seatID);  //获取位置
            var cardList = dealCardInfo.cardList;
            var cardListLen = cardList.length;
            for (var j = 0; j < cardListLen; j++) {
          
                    card = this.cardFactory.getHandCard(cardList[j], pos);
                
                this.handCardList[pos].push(card);
                console.log("生成手牌");
            }
        }
    }


    /**清除监听 */
    public removeEvent(){
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onDragCardMove, this);
        App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onDragCardEnd, this);
    }

    /**重置 */
    public resetUI(){
        this.curActPlayer = -1;
        this.curOutCard = null;
        this.curGetCard = null;
        this.curTouchCard = null;
        this.eatComboList.length = 0;
        this.eatComboList1.length = 0;
        this.gangComboList.length = 0;

        
        this.outFlag.hide();
        this.onInitPosition();
        this.clearDragCard();
        this.hideAllOutEffect();
        this.hideAllActTip();
        this.hideActUI();
        this.clearAllCard();
    }

}
