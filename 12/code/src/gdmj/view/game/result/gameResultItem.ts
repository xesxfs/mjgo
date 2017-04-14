/**
 * 2017-3-8
 * author:xiongjian
 */
class gameResultItem extends eui.ItemRenderer{

    public constructor(){
        super();
        this.skinName = "gameResultItemSkin";
    }

    private fenLabel :eui.BitmapLabel;
    private nameLabel :eui.Label;
    private IDLabel :eui.Label
    private huTypeLabel :eui.Label;
    private zhongniaoLabel :eui.Group;
    private hupaiGroup :eui.Group;



    public dataChanged(){
        
        this.fenLabel.font = "win_num_fnt";
        this.fenLabel.text = "+30";
        this.nameLabel.text = "绝对罪人"
        this.IDLabel.text = "123456";
        let cardList = [0x11,0x11,0x11,0x12,0x12,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x19];
        this.setCardList(cardList);
    }


    	public setCardList(cardList){
    	  var len = cardList.length;
    	  var card:Card;
          var cardFactory: CardFactory = CardFactory.getInstance();
    	  for(var i=0;i<len;i++){
              card = cardFactory.getOutCard(cardList[i], UserPosition.Up);
        	  card.x = 34*i;
			  card.y = 0;
        	  this.zhongniaoLabel.addChild(card);
    	  }

	}

}