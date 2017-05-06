/**
 * 麻将牌工厂，单例类
 * @author chenkai
 * @date 2016/6/29
 */
class CardFactory {
    private cardPool:ObjectPool;   //牌对象池
    
	public constructor() {
    	 this.cardPool = ObjectPool.getPool(Card.NAME);
	}
	
	/**
	 * 获取手牌
	 * @cardValue 牌值
	 * @userPos 用户位置
	 */ 
    public getHandCard(cardValue: number):Card{
    	  var card:Card = this.cardPool.getObject();
          card.setHandSkin(cardValue);
          //设置鼠标点击事件
          card.touchEnabled = true;
    	  return card;
	}
	
	/**
	 * 获取出牌
	 * @cardValue 牌值
	 * @userPos 用户位置
	 */
	public getOutCard(cardValue:number):Card{
        var card: Card = this.cardPool.getObject();
		card.setHandSkin(cardValue);
        card.setOutSkin();
        return card;
	}
	
	
    private static instance: CardFactory;
    public static getInstance(): CardFactory {
        if(this.instance == null) {
            this.instance = new CardFactory();
        }
        return this.instance;
    }
}
