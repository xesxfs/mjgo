/**
 * 抓马界面
 * @author chenkai
 * @date 2016/8/13 
 */
class ZhuaMaPanel extends BasePanel{
    /**中马个数*/
    private countLabel:eui.Label; 

    /**牌容器*/
    private cardGroup:eui.Group;   
    /**牌背景*/
    private cardBgList = [];       
    /**牌*/
    private cardList = [];         
    /**光圈*/
    private lightList = [];      
    
    /**中马个数*/
    private count = 0;
    
    /**牌容器*/
    private showCardGroup:eui.Group;
    
    /** =2 抓马显示牌的背景*/
    private bg1Group0:eui.Group;
    private ligh1Group0:eui.Group;
    private bg1List0 = [];
    private ligh1List0 = [];
    /** 2 < x <=4 抓马显示的牌背景*/
    private bg1Group:eui.Group;
    private ligh1Group:eui.Group;
    private bg1List = [];
    private ligh1List = [];
    /** 4 < x <=6 抓马显示的牌背景*/
    private bg2Group:eui.Group;
    private ligh2Group:eui.Group;
    private bg2List = [];
    private ligh2List = [];
    /** 6 < x <=12 抓马显示的牌背景*/
    private bg3Group:eui.Group;
    private ligh3Group:eui.Group;
    private bg3List = [];
    private ligh3List = [];
    /**12 < x <=20 抓马显示的牌背景*/
    private bg4Group:eui.Group;
    private ligh4Group:eui.Group;
    private bg4List = [];
    private ligh4List = [];
    
    /**牌的list*/
//    private cList = [];
    /**光圈list*/
    private lList = [];
    
    
    
    
    
	public constructor() {
    	super();
    	this.skinName = "ZhuaMaPanel1Skin";
	}
	
    protected childrenCreated() {

        for(var i=0;i<2;i++){
            this.bg1List0.push(this.bg1Group0.getChildAt(i));
            this.bg1List0[i].visible = false;
            this.ligh1List0.push(this.ligh1Group0.getChildAt(i));
        }
        for(var i = 0;i < 4;i++) {
            this.bg1List.push(this.bg1Group.getChildAt(i));
            this.bg1List[i].visible = false;
            this.ligh1List.push(this.ligh1Group.getChildAt(i));
        }

        for(var i = 0;i < 6;i++) {
            this.bg2List.push(this.bg2Group.getChildAt(i));
            this.bg2List[i].visible = false;
            this.ligh2List.push(this.ligh2Group.getChildAt(i));
        }

        for(var i = 0;i < 12;i++) {
            this.bg3List.push(this.bg3Group.getChildAt(i));
            this.bg3List[i].visible = false;
            this.ligh3List.push(this.ligh3Group.getChildAt(i));
        }
        for(var i = 0;i < 20;i++) {
            this.bg4List.push(this.bg4Group.getChildAt(i));
            this.bg4List[i].visible = false;
            this.ligh4List.push(this.ligh4Group.getChildAt(i));
        }


    }

    protected onEnable() {
        this.setCenter();
        this.updateInfo(ProtocolData.Rev180_59_0);
    }

    protected onRemove() {
        this.clear();
    }
    
    public updateInfo(json){
        //显示抓马次数和抓中次数
        var zhuaMaCount = json.cardList.length;
        console.log("抓马数"+zhuaMaCount);
        this.countLabel.text = "0个";
       // this.hitLabel.text = "0";
        //隐藏所有光圈
        this.hideAllLight();
        //显示抓马牌容器

        if(zhuaMaCount ==2){
            this.bg1Group0.visible = true;
            this.bg1Group.visible = false;
            this.bg2Group.visible = false;
            this.bg3Group.visible = false;
            this.bg4Group.visible = false;
        }
        if(zhuaMaCount>2 && zhuaMaCount<=4){
            this.bg1Group0.visible = false;
            this.bg1Group.visible = true;
            this.bg2Group.visible = false;
            this.bg3Group.visible = false;
            this.bg4Group.visible = false;
        }
        if(zhuaMaCount > 4 && zhuaMaCount <= 6) {
            this.bg1Group0.visible = false;
            this.bg1Group.visible = false;
            this.bg2Group.visible = true;
            this.bg3Group.visible = false;
            this.bg4Group.visible = false;
        }
        if(zhuaMaCount > 6 && zhuaMaCount <= 12) {
            this.bg1Group0.visible = false;
            this.bg1Group.visible = false;
            this.bg2Group.visible = false;
            this.bg3Group.visible = true;
            this.bg4Group.visible = false;
        }
        if(zhuaMaCount > 12 && zhuaMaCount <= 20) {
            this.bg1Group0.visible = false;
            this.bg1Group.visible = false;
            this.bg2Group.visible = false;
            this.bg3Group.visible = false;
            this.bg4Group.visible = true;
        }
        
        var bglist = [];
        var lgList = [];
        if(zhuaMaCount==2){
            bglist = this.bg1List0;
            lgList = this.ligh1List0;
        }else if(zhuaMaCount>2 && zhuaMaCount <= 4){
            bglist = this.bg1List;0
            lgList = this.ligh1List;
        } else if(zhuaMaCount > 4 && zhuaMaCount <=6 ) {
            bglist = this.bg2List;
            lgList = this.ligh2List;
        } else if(zhuaMaCount > 6 && zhuaMaCount <= 12) {
            bglist = this.bg3List;
            lgList = this.ligh3List;
        } else if(zhuaMaCount > 12 && zhuaMaCount <= 20) {
            bglist = this.bg4List;
            lgList = this.ligh4List;
        }
        //显示抓马牌
        var bCount:boolean = (zhuaMaCount<=6); //大牌

        if(bCount){
            for(var i = 0;i < zhuaMaCount;i++) {
                //背面牌
                var cardBg: egret.Bitmap = new egret.Bitmap(RES.getRes("card_bg0_png"));
                cardBg.width = bglist[i].width;
                cardBg.height = bglist[i].height;
                cardBg.x = bglist[i].x;
                cardBg.y = bglist[i].y;
                this.cardGroup.addChild(cardBg);
                this.cardBgList.push(cardBg);
                //正面牌
                var card: Card = new Card();
                card.setHandSkin(json.cardList[i],0);
                card.width = bglist[i].width;
                card.height = bglist[i].height;
                card.cardBg.width = card.width;
                card.cardBg.height = card.height;
                card.cardImg.width = card.width;
                card.cardImg.height = card.height;
                card.x = cardBg.x;
                card.y = cardBg.y;
                card.visible = false;
                this.cardGroup.addChild(card);
                this.cardList.push(card);
                //光圈
                if(json.hitCardList != null) {
                    if(json.cardList[i] == json.hitCardList[0]) {
                        json.hitCardList.splice(0,1);
                        this.lightList.push(lgList[i]);
                    } else {
                        this.lightList.push(null);
                    }
                }
            }
        } else {
            for(var i = 0;i < zhuaMaCount;i++) {
                //背面牌
                var cardBg: egret.Bitmap = new egret.Bitmap(RES.getRes("card_big_bg_3_png"));
                cardBg.width = bglist[i].width;
                cardBg.height = bglist[i].height;

                cardBg.x = bglist[i].x;
                cardBg.y = bglist[i].y;
                this.cardGroup.addChild(cardBg);
                this.cardBgList.push(cardBg);
                //正面牌
                var card: Card = new Card();
                card.setHandSkin(json.cardList[i],0);
                card.width = bglist[i].width;
                card.height = bglist[i].height;
                card.cardBg.width = card.width;
                card.cardBg.height = card.height;
                card.cardImg.width = card.width;
                card.cardImg.height = card.height;
                card.x = cardBg.x;
                card.y = cardBg.y;
                card.visible = false;
                this.cardGroup.addChild(card);
                this.cardList.push(card);
                //光圈
                if(json.hitCardList != null) {
                    if(json.cardList[i] == json.hitCardList[0]) {
                        json.hitCardList.splice(0,1);
                        this.lightList.push(lgList[i]);
                    } else {
                        this.lightList.push(null);
                    }
                }
            }

        }
        //显示抓马动画
        var cardLen = this.cardList.length;
        console.log(cardLen+"抓马个数")
        for(var i=0;i<cardLen;i++){
            this.showCardAnim(i);
           
        }
        
        //翻牌完成，显示中马数
        egret.Tween.get(this).wait(cardLen*this.turnTime*2);

        //TODO 等待动画播放完成，并多等待2s，发送动画播放完成事件
        egret.Tween.get(this).wait(cardLen*this.turnTime*2 + 1000).call(()=>{
            this.dispatchEventWith("ZhuaMaComplete");
        });
    }


    private turnTime = 300; //翻转时间
    /**
     * 显示抓马动画
     * @index 第几张牌动画
     */
    private showCardAnim(index){
        var cardBg = this.cardBgList[index];
        var card = this.cardList[index];
        var light = this.lightList[index];
        
        card.scaleX = 0;
        egret.Tween.get(cardBg).wait(index * this.turnTime * 2).to({ scaleX: 0 },this.turnTime).call(() => {
            card.visible = true;
            cardBg.visible = false;
        });
        egret.Tween.get(card).wait(index * this.turnTime * 2 + this.turnTime).to({ scaleX: 1 },this.turnTime).call(() => {
            if(light) {
                this.count ++;
                this.countLabel.text = this.count+"个";
                light.visible = true;
            }
        });
    }
    
    //隐藏所有光圈
    private hideAllLight(){
        for(var i=0;i<5;i++){
            var group:eui.Group =<eui.Group>this.showCardGroup.getChildAt(i+5);
            var num = group.numChildren;
            for(var j=0;j<num;j++){
                group.getChildAt(j).visible = false;
            }
        }
    }
    
    //清理
    public clear(){
        this.cardGroup.removeChildren();
        this.cardList.length = 0;
        this.cardBgList.length = 0;
        this.lightList.length = 0;
        this.countLabel.text = "0个";
        this.count = 0;
    }
}
