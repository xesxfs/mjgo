var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameSkin";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        var nc = this.cardGroup.numChildren;
        for (var i = 0; i < nc; i++) {
            var card = this.cardGroup.getChildAt(i);
            // card.addEventListener("touchBegin",this.touchBegin,this);
            // card.addEventListener("touchMove",this.touchMove,this);
            // card.addEventListener("touchEnd",this.touchEnd,this);
            card.addEventListener("touchTap", this.touchTap, this);
        }
        // this.cardGroup.addEventListener("touchBegin",this.touchBegin,this);
        // this.cardGroup.addEventListener("touchMove",this.touchMove,this);
        // this.cardGroup.addEventListener("touchEnd",this.touchEnd,this);
        // this.cardGroup.addEventListener("touchTap",this.touchTap,this);
        // this.cardGroup.addEventListener("touchReleaseOutside",this.touchOutSide,this);
    };
    Game.prototype.touchBegin = function (e) {
        this.beginSelect = e.target;
        this.cur = this.beginSelect;
        console.log("touchBegin " + e.target.source);
    };
    Game.prototype.touchMove = function (e) {
        // console.log("touchMove "+(<eui.Image>e.target).source);
        if (this.cur == e.target) {
            return;
        }
        this.cur = e.target;
        var beginIndx = this.cardGroup.getChildIndex(this.beginSelect);
        var end = this.cardGroup.getChildIndex(e.target);
        if (beginIndx > end) {
            var temp = beginIndx;
            beginIndx = end;
            end = temp;
        }
        console.log(beginIndx, end);
        this.setSelFlag(beginIndx, end);
    };
    Game.prototype.touchEnd = function (e) {
        this.endSelect = e.target;
        //console.log("touchEnd "+(<eui.Image>e.target).source);
        this.getSelectCard();
    };
    Game.prototype.touchTap = function (e) {
        // this.endSelect = e.target;
        // console.log("touchTap "+(<eui.Image>e.target).source);
        var card = e.target;
        var interx = this.outCardGroup.numChildren * 35;
        console.log("x: ", interx);
        card.x = interx;
        card.y = 0;
        this.outCardGroup.addChild(card);
    };
    Game.prototype.getSelectCard = function () {
        var beginIndx = this.cardGroup.getChildIndex(this.beginSelect);
        var endIndx = this.cardGroup.getChildIndex(this.endSelect);
        console.log(beginIndx, endIndx);
        if (beginIndx > endIndx) {
            var temp = beginIndx;
            beginIndx = endIndx;
            endIndx = temp;
        }
        for (var i = beginIndx; i <= endIndx; i++) {
            var card = this.cardGroup.getChildAt(i);
            console.log(card.source);
        }
    };
    Game.prototype.touchOutSide = function (e) {
        console.log("touchOutSide " + e.target.source);
    };
    Game.prototype.setSelFlag = function (start, end) {
        for (var i = 0; i < this.cardGroup.numChildren; i++) {
            var card = this.cardGroup.getChildAt(i);
            if (i >= start && i <= end) {
                console.log("select: ", card.source);
            }
            else {
                console.log("unselect: ", card.source);
            }
        }
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map