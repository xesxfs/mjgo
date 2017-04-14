var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 麻将牌工厂，单例类
 * @author chenkai
 * @date 2016/6/29
 */
var CardFactory = (function () {
    function CardFactory() {
        this.cardPool = ObjectPool.getPool(Card.NAME);
    }
    /**
     * 获取手牌
     * @cardValue 牌值
     * @userPos 用户位置
     */
    CardFactory.prototype.getHandCard = function (cardValue, userPos) {
        var card = this.cardPool.getObject();
        card.setHandSkin(cardValue, userPos);
        //设置鼠标点击事件
        card.touchEnabled = (userPos == UserPosition.Down) ? true : false;
        return card;
    };
    /**
     * 获取出牌
     * @cardValue 牌值
     * @userPos 用户位置
     */
    CardFactory.prototype.getOutCard = function (cardValue, userPos) {
        var card = this.cardPool.getObject();
        card.setOutSkin(cardValue, userPos);
        return card;
    };
    /**
     * 获取吃牌
     * @cardValue 牌值
     * @userPos 用户位置
     */
    CardFactory.prototype.getEatCard = function (cardValue, userPos) {
        if (userPos == UserPosition.Down) {
            var card = this.cardPool.getObject();
            card.setEatSkin(cardValue, userPos);
            return card;
        }
        else {
            return this.getOutCard(cardValue, userPos);
        }
    };
    /**
     * 获取暗杠
     * @cardValue 牌值
     * @userPos 用户位置
     */
    CardFactory.prototype.getAnGangCard = function (cardValue, userPos) {
        var card = this.cardPool.getObject();
        card.setAnGangSkin(cardValue, userPos);
        return card;
    };
    CardFactory.getInstance = function () {
        if (this.instance == null) {
            this.instance = new CardFactory();
        }
        return this.instance;
    };
    return CardFactory;
}());
__reflect(CardFactory.prototype, "CardFactory");
//# sourceMappingURL=CardFactory.js.map