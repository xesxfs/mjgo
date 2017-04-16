/**
 * 换牌UI
 * @author chenkai 
 * @date 2016/9/5
 */
class SwapCardUI extends BaseUI{
    //显示交换牌的选择面板
    private selectGroup: eui.Group = new eui.Group(); //弹出选择牌Group
    private selectGroup0: eui.Group;
    private selectGroup1: eui.Group;
    private selectGroup2: eui.Group;
    private selectGroup3: eui.Group;
    private selectGroup4: eui.Group;
    private selectGroup5: eui.Group;
    private swapCardGroup: eui.Group;//换牌Group
    private selectBtn0: Card;   //选择希望去掉的牌
    private selectBtn1: Card;   //选择希望得到的牌
    private selectBtn2: Card;   //下一张摸到的牌
    public selectBtn3: Card;   //最后一张牌
    private selectBtn4: Card;   //凑成胡牌
    private selectBtn5:Card;   //主动断线
    public selectValue0: number;   //交换的牌值
    public selectValue1: number;
    private curSelcet: number; //当前选中的按钮
    
    private cardFactory:CardFactory;
    private gameScene:GameScene;
    
    
	public constructor() {
    	super();
    	this.skinName = "SwapCardUISkin";
	}
	
    protected childrenCreated() {
        
    }

    protected onEnable() {
        
    }

    protected onRemove() {
        
    }
    
    public init(gameScene:GameScene) {
        this.gameScene = gameScene;
        this.cardFactory = this.gameScene.cardFactory;
        this.gameScene.swapCardGroup.addChild(this);
        this.swapCardGroup = this.gameScene.swapCardGroup;
        
        this.selectBtn0 = new Card();
        this.selectBtn0.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup0.addChild(this.selectBtn0);
        this.selectBtn0.touchEnabled = true;
        this.selectBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.curSelcet = 0;
            this.showSwapCard();
        },this);

        this.selectBtn1 = new Card();
        this.selectBtn1.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup1.addChild(this.selectBtn1);
        this.selectBtn1.touchEnabled = true;
        this.selectBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.curSelcet = 1;
            this.showSwapCard();
        },this);

        this.selectBtn2 = new Card();
        this.selectBtn2.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup2.addChild(this.selectBtn2);
        this.selectBtn2.touchEnabled = true;
        this.selectBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.curSelcet = 2;
            this.showSwapCard();
        },this);

        this.selectBtn3 = new Card();
        this.selectBtn3.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup3.addChild(this.selectBtn3);
        this.selectBtn3.touchEnabled = true;
        this.selectBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.sendLookCard();
        },this);

        this.selectBtn4 = new Card();
        this.selectBtn4.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup4.addChild(this.selectBtn4);
        this.selectBtn4.touchEnabled = true;
        this.selectBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.sendHuCard();
        },this);

        this.selectBtn5 = new Card();
        this.selectBtn5.cardBg.bitmapData = RES.getRes("card_small_bg0_png");
        this.selectGroup5.addChild(this.selectBtn5);
        this.selectBtn5.touchEnabled = true;
        this.selectBtn5.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            App.gameSocket.close();
            App.EventManager.sendEvent(EventConst.SocketClose ,App.gameSocket);
        },this);
    }


    private showSwapCard() {
        if(this.selectGroup.numChildren > 0) {
            this.addChild(this.selectGroup);
            return;
        }
        var groupWidth = 45 * 9;
        var groupHeight = 60 * 4;
        this.selectGroup.width = groupWidth;
        this.selectGroup.height = groupHeight;
        this.selectGroup.x = 0;
        this.selectGroup.y =  80;
        var sp: egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(0,0.5);
        sp.graphics.drawRect(0,0,groupWidth,groupHeight + 100);
        sp.touchEnabled = true;
        sp.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.selectGroup.parent && this.removeChild(this.selectGroup);
        },this);
        this.selectGroup.addChild(sp);
        this.addChild(this.selectGroup);

        var card: Card;
        for(var i = 0;i < 9;i++) {
            card = this.cardFactory.getOutCard(0x11 + i,0);
            card.x = card.width * i;
            card.y = 0;
            card.touchEnabled = true;
            this.selectGroup.addChild(card);
        }
        for(var i = 0;i < 9;i++) {
            card = this.cardFactory.getOutCard(0x21 + i,0);
            card.x = card.width * i;
            card.y = card.height;
            card.touchEnabled = true;
            this.selectGroup.addChild(card);
        }
        for(var i = 0;i < 9;i++) {
            card = this.cardFactory.getOutCard(0x31 + i,0);
            card.x = card.width * i;
            card.y = card.height * 2;
            card.touchEnabled = true;
            this.selectGroup.addChild(card);
        }
        for(var i = 0;i < 4;i++) {
            card = this.cardFactory.getOutCard(0x41 + i,0);
            card.x = card.width * i;
            card.y = card.height * 3;
            card.touchEnabled = true;
            this.selectGroup.addChild(card);
        }
        for(var i = 0;i < 3;i++) {
            card = this.cardFactory.getOutCard(0x51 + i,0);
            card.x = card.width * (i + 4);
            card.y = card.height * 3;
            card.touchEnabled = true;
            this.selectGroup.addChild(card);
        }
        this.selectGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSelect,this);
    }

    private onSelect(e: egret.TouchEvent) {
        if(e.target instanceof Card) {
            var card: Card = e.target;
            if(this.curSelcet == 0) {
                this.selectValue0 = card.cardValue;
                this.selectBtn0.cardImg.y = 0;
                this.selectBtn0.setOutSkin(card.cardValue,0);
            } else if(this.curSelcet == 1) {
                this.selectValue1 = card.cardValue;
                this.selectBtn1.cardImg.y = 0;
                this.selectBtn1.setOutSkin(card.cardValue,0);
                var json = ProtocolData.Send180_100_0;
                json.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
                json.preCard = this.selectValue0;
                json.newCard = this.selectValue1;
                App.gameSocket.send(ProtocolHead.Send180_100_0,json);
                console.log("发送换牌:",this.selectValue0,this.selectValue1);
            } else if(this.curSelcet == 2) {
                this.selectBtn2.cardImg.y = 0;
                this.selectBtn2.setOutSkin(card.cardValue,0);
                var nextCardJson = ProtocolData.Send180_99_0;
                nextCardJson.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
                nextCardJson.cardList = [card.cardValue];
                App.gameSocket.send(ProtocolHead.Send180_99_0,nextCardJson);
                console.log("发送确认下一张牌，牌值",card.cardValue);
            }
            this.selectGroup.parent && this.removeChild(this.selectGroup);
        }
    }

    //发送换牌，换成能胡的牌
    private sendHuCard() {
        var nextCardJson = ProtocolData.Send180_99_0;
        nextCardJson.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
        nextCardJson.cardList = [0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x21,0x21,0x21,0x22,0x22];
        App.gameSocket.send(ProtocolHead.Send180_99_0,nextCardJson);

        console.log("发送确认下14张牌值");
        Tips.info("发送成功");
    }
    
    //发送看最后一张牌
    private sendLookCard() {
        var json = ProtocolData.Send180_102_0;
        json.cardpos = -1;
        App.gameSocket.send(ProtocolHead.Send180_102_0,json);
    }
	
}
