var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 2017-3-8
 * author:xiongjian
 */
var gameResultItem = (function (_super) {
    __extends(gameResultItem, _super);
    function gameResultItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "gameResultItemSkin";
        return _this;
    }
    gameResultItem.prototype.dataChanged = function () {
        this.fenLabel.font = "win_num_fnt";
        this.fenLabel.text = "+30";
        this.nameLabel.text = "绝对罪人";
        this.IDLabel.text = "123456";
        var cardList = [0x11, 0x11, 0x11, 0x12, 0x12, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x19];
        this.setCardList(cardList);
    };
    gameResultItem.prototype.setCardList = function (cardList) {
        var len = cardList.length;
        var card;
        var cardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            card = cardFactory.getOutCard(cardList[i], UserPosition.Up);
            card.x = 34 * i;
            card.y = 0;
            this.zhongniaoLabel.addChild(card);
        }
    };
    return gameResultItem;
}(eui.ItemRenderer));
__reflect(gameResultItem.prototype, "gameResultItem");
//# sourceMappingURL=gameResultItem.js.map