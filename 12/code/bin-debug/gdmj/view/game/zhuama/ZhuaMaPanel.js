var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 抓马界面
 * @author chenkai
 * @date 2016/8/13
 */
var ZhuaMaPanel = (function (_super) {
    __extends(ZhuaMaPanel, _super);
    function ZhuaMaPanel() {
        var _this = _super.call(this) || this;
        /**牌背景*/
        _this.cardBgList = [];
        /**牌*/
        _this.cardList = [];
        /**光圈*/
        _this.lightList = [];
        /**中马个数*/
        _this.count = 0;
        _this.bg1List0 = [];
        _this.ligh1List0 = [];
        _this.bg1List = [];
        _this.ligh1List = [];
        _this.bg2List = [];
        _this.ligh2List = [];
        _this.bg3List = [];
        _this.ligh3List = [];
        _this.bg4List = [];
        _this.ligh4List = [];
        /**牌的list*/
        //    private cList = [];
        /**光圈list*/
        _this.lList = [];
        _this.turnTime = 300; //翻转时间
        _this.skinName = "ZhuaMaPanel1Skin";
        return _this;
    }
    ZhuaMaPanel.prototype.childrenCreated = function () {
        for (var i = 0; i < 2; i++) {
            this.bg1List0.push(this.bg1Group0.getChildAt(i));
            this.bg1List0[i].visible = false;
            this.ligh1List0.push(this.ligh1Group0.getChildAt(i));
        }
        for (var i = 0; i < 4; i++) {
            this.bg1List.push(this.bg1Group.getChildAt(i));
            this.bg1List[i].visible = false;
            this.ligh1List.push(this.ligh1Group.getChildAt(i));
        }
        for (var i = 0; i < 6; i++) {
            this.bg2List.push(this.bg2Group.getChildAt(i));
            this.bg2List[i].visible = false;
            this.ligh2List.push(this.ligh2Group.getChildAt(i));
        }
        for (var i = 0; i < 12; i++) {
            this.bg3List.push(this.bg3Group.getChildAt(i));
            this.bg3List[i].visible = false;
            this.ligh3List.push(this.ligh3Group.getChildAt(i));
        }
        for (var i = 0; i < 20; i++) {
            this.bg4List.push(this.bg4Group.getChildAt(i));
            this.bg4List[i].visible = false;
            this.ligh4List.push(this.ligh4Group.getChildAt(i));
        }
    };
    ZhuaMaPanel.prototype.onEnable = function () {
        this.setCenter();
        this.updateInfo(ProtocolData.Rev180_59_0);
    };
    ZhuaMaPanel.prototype.onRemove = function () {
        this.clear();
    };
    ZhuaMaPanel.prototype.updateInfo = function (json) {
        var _this = this;
        //显示抓马次数和抓中次数
        var zhuaMaCount = json.cardList.length;
        console.log("抓马数" + zhuaMaCount);
        this.countLabel.text = "0个";
        // this.hitLabel.text = "0";
        //隐藏所有光圈
        this.hideAllLight();
        //显示抓马牌容器
        if (zhuaMaCount == 2) {
            this.bg1Group0.visible = true;
            this.bg1Group.visible = false;
            this.bg2Group.visible = false;
            this.bg3Group.visible = false;
            this.bg4Group.visible = false;
        }
        if (zhuaMaCount > 2 && zhuaMaCount <= 4) {
            this.bg1Group0.visible = false;
            this.bg1Group.visible = true;
            this.bg2Group.visible = false;
            this.bg3Group.visible = false;
            this.bg4Group.visible = false;
        }
        if (zhuaMaCount > 4 && zhuaMaCount <= 6) {
            this.bg1Group0.visible = false;
            this.bg1Group.visible = false;
            this.bg2Group.visible = true;
            this.bg3Group.visible = false;
            this.bg4Group.visible = false;
        }
        if (zhuaMaCount > 6 && zhuaMaCount <= 12) {
            this.bg1Group0.visible = false;
            this.bg1Group.visible = false;
            this.bg2Group.visible = false;
            this.bg3Group.visible = true;
            this.bg4Group.visible = false;
        }
        if (zhuaMaCount > 12 && zhuaMaCount <= 20) {
            this.bg1Group0.visible = false;
            this.bg1Group.visible = false;
            this.bg2Group.visible = false;
            this.bg3Group.visible = false;
            this.bg4Group.visible = true;
        }
        var bglist = [];
        var lgList = [];
        if (zhuaMaCount == 2) {
            bglist = this.bg1List0;
            lgList = this.ligh1List0;
        }
        else if (zhuaMaCount > 2 && zhuaMaCount <= 4) {
            bglist = this.bg1List;
            0;
            lgList = this.ligh1List;
        }
        else if (zhuaMaCount > 4 && zhuaMaCount <= 6) {
            bglist = this.bg2List;
            lgList = this.ligh2List;
        }
        else if (zhuaMaCount > 6 && zhuaMaCount <= 12) {
            bglist = this.bg3List;
            lgList = this.ligh3List;
        }
        else if (zhuaMaCount > 12 && zhuaMaCount <= 20) {
            bglist = this.bg4List;
            lgList = this.ligh4List;
        }
        //显示抓马牌
        var bCount = (zhuaMaCount <= 6); //大牌
        if (bCount) {
            for (var i = 0; i < zhuaMaCount; i++) {
                //背面牌
                var cardBg = new egret.Bitmap(RES.getRes("card_bg0_png"));
                cardBg.width = bglist[i].width;
                cardBg.height = bglist[i].height;
                cardBg.x = bglist[i].x;
                cardBg.y = bglist[i].y;
                this.cardGroup.addChild(cardBg);
                this.cardBgList.push(cardBg);
                //正面牌
                var card = new Card();
                card.setHandSkin(json.cardList[i], 0);
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
                if (json.hitCardList != null) {
                    if (json.cardList[i] == json.hitCardList[0]) {
                        json.hitCardList.splice(0, 1);
                        this.lightList.push(lgList[i]);
                    }
                    else {
                        this.lightList.push(null);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < zhuaMaCount; i++) {
                //背面牌
                var cardBg = new egret.Bitmap(RES.getRes("card_big_bg_3_png"));
                cardBg.width = bglist[i].width;
                cardBg.height = bglist[i].height;
                cardBg.x = bglist[i].x;
                cardBg.y = bglist[i].y;
                this.cardGroup.addChild(cardBg);
                this.cardBgList.push(cardBg);
                //正面牌
                var card = new Card();
                card.setHandSkin(json.cardList[i], 0);
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
                if (json.hitCardList != null) {
                    if (json.cardList[i] == json.hitCardList[0]) {
                        json.hitCardList.splice(0, 1);
                        this.lightList.push(lgList[i]);
                    }
                    else {
                        this.lightList.push(null);
                    }
                }
            }
        }
        //显示抓马动画
        var cardLen = this.cardList.length;
        console.log(cardLen + "抓马个数");
        for (var i = 0; i < cardLen; i++) {
            this.showCardAnim(i);
        }
        //翻牌完成，显示中马数
        egret.Tween.get(this).wait(cardLen * this.turnTime * 2);
        //TODO 等待动画播放完成，并多等待2s，发送动画播放完成事件
        egret.Tween.get(this).wait(cardLen * this.turnTime * 2 + 1000).call(function () {
            _this.dispatchEventWith("ZhuaMaComplete");
        });
    };
    /**
     * 显示抓马动画
     * @index 第几张牌动画
     */
    ZhuaMaPanel.prototype.showCardAnim = function (index) {
        var _this = this;
        var cardBg = this.cardBgList[index];
        var card = this.cardList[index];
        var light = this.lightList[index];
        card.scaleX = 0;
        egret.Tween.get(cardBg).wait(index * this.turnTime * 2).to({ scaleX: 0 }, this.turnTime).call(function () {
            card.visible = true;
            cardBg.visible = false;
        });
        egret.Tween.get(card).wait(index * this.turnTime * 2 + this.turnTime).to({ scaleX: 1 }, this.turnTime).call(function () {
            if (light) {
                _this.count++;
                _this.countLabel.text = _this.count + "个";
                light.visible = true;
            }
        });
    };
    //隐藏所有光圈
    ZhuaMaPanel.prototype.hideAllLight = function () {
        for (var i = 0; i < 5; i++) {
            var group = this.showCardGroup.getChildAt(i + 5);
            var num = group.numChildren;
            for (var j = 0; j < num; j++) {
                group.getChildAt(j).visible = false;
            }
        }
    };
    //清理
    ZhuaMaPanel.prototype.clear = function () {
        this.cardGroup.removeChildren();
        this.cardList.length = 0;
        this.cardBgList.length = 0;
        this.lightList.length = 0;
        this.countLabel.text = "0个";
        this.count = 0;
    };
    return ZhuaMaPanel;
}(BasePanel));
__reflect(ZhuaMaPanel.prototype, "ZhuaMaPanel");
//# sourceMappingURL=ZhuaMaPanel.js.map