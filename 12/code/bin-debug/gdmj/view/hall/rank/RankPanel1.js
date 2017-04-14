var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author xiongjian
 * 2017-1-6
 */
var RankPanel1 = (function (_super) {
    __extends(RankPanel1, _super);
    function RankPanel1() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankPanelSkin1";
        return _this;
    }
    RankPanel1.prototype.onEnable = function () {
        this.setCenter();
        this.getScoreRank();
        this.rank_info.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankInfoTouch, this);
        this.rankScroller.addEventListener(egret.Event.CHANGE, this.onScrollerTouch, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    RankPanel1.prototype.onRemove = function () {
        this.rank_info.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankInfoTouch, this);
        this.rankScroller.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onScrollerTouch, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    /**
     * 关闭排行榜窗口
     */
    RankPanel1.prototype.close = function (e) {
        this.hide();
    };
    /**
     * 请求邀请积分榜单
     */
    RankPanel1.prototype.getScoreRank = function () {
        var http = new HttpSender();
        var data = ProtocolHttp.GetRankList;
        http.send(data, this.setScoreRank, this);
    };
    /**
     * 说明按钮点击事件
     */
    RankPanel1.prototype.onRankInfoTouch = function () {
        App.PanelManager.open(PanelConst.RankNewRuleDetail);
    };
    /**
     * Scroller滑动事件
     */
    RankPanel1.prototype.onScrollerTouch = function () {
        var i = 90;
        var j = 816;
        var sort = this.mySort + 10;
        if (this.mySort != 0 && this.mySort * i - this.rankScroller.viewport.scrollV >= 0 && this.mySort * i - this.rankScroller.viewport.scrollV <= j) {
            this.maskGroup.visible = false;
        }
        else {
            this.maskGroup.visible = true;
        }
    };
    /**
     * 数据绑定
     */
    RankPanel1.prototype.setScoreRank = function (data) {
        if (data.data) {
            var ac = new eui.ArrayCollection();
            var rankList = data["data"]["sort"];
            var arr = [];
            var myself = data["data"]["self"];
            var myselfUser = new Object();
            var h = 90;
            var h1 = 816;
            //自己的排名
            if (myself == 0) {
                var name = App.DataCenter.UserInfo.getMyUserVo();
                this.my_rank.text = "榜外";
                this.myDeskName.text = name.excluroomName;
                this.myDeskNumber.text = name.excluroomCode;
                this.myPoint.text = "0";
            }
            else {
                if (myself.sort == 0) {
                    this.my_rank.text = "榜外";
                }
                else {
                    this.my_rank.text = myself.sort;
                }
                this.mySort = myself.sort;
                // this.my_rank.text = myself.sort;
                // if(myself.deskName.length > 8 ){
                //     var myDeskName = myself.deskName;
                //     var myName = myDeskName.substring (0,7);
                //     this.myDeskName.text = myName+"...";
                // }else{
                this.myDeskName.text = myself.deskName;
                //     var name = App.DataCenter.UserInfo.getMyUserVo();
                //    // console.log( decodeURI(name.excluroomName));
                //     this.myDeskName.text = decodeURI(name.excluroomName);
                // }
                this.myDeskNumber.text = myself.deskCode;
                this.myPoint.text = myself.point;
            }
            //列表
            for (var i = 0; i <= data["data"]["sort"].length; i++) {
                var rankObj = rankList[i];
                var rankUser = new Object();
                switch (i) {
                    case 0:
                        rankUser["rankIcon"] = "rank_no1_png";
                        rankUser["rankBg"] = "rank_item1_png";
                        rankUser["pointColor"] = "0xf9c411";
                        rankUser["sort"] = "";
                        break;
                    case 1:
                        rankUser["rankIcon"] = "rank_no2_png";
                        rankUser["rankBg"] = "rank_item2_png";
                        rankUser["pointColor"] = "0xf9c411";
                        rankUser["sort"] = "";
                        break;
                    case 2:
                        rankUser["rankIcon"] = "rank_no3_png";
                        rankUser["rankBg"] = "rank_item3_png";
                        rankUser["pointColor"] = "0xf9c411";
                        rankUser["sort"] = "";
                        break;
                    default:
                        rankUser["rankIcon"] = "";
                        rankUser["pointColor"] = "0xf2ffda";
                        rankUser["rankBg"] = "rank_title2_png";
                        if (rankList[i] != undefined) {
                            rankUser["sort"] = rankList[i].sort;
                        }
                }
                if (rankList[i] != undefined) {
                    //房间名过长截取前四个字
                    // console.log(rankList[i].deskName.length);
                    // if(rankList[i].deskName.length > 8 ){
                    //     var deskName = rankList[i].deskName+"sssss";
                    //     var ss = deskName.substring (0,7);
                    //     rankUser["deskName"] = ss+"...";
                    // }else{
                    rankUser["deskName"] = rankList[i].deskName;
                    // }
                    rankUser["deskCode"] = rankList[i].deskCode;
                    rankUser["point"] = rankList[i].point;
                    arr.push(rankUser);
                }
            }
            /**
             * 排名在首页，隐藏下面的组
             */
            if (myself != 0 && myself.point * h > h1) {
                this.maskGroup.visible = false;
            }
            /**
             * 模拟数据
             */
            //  for (var i:number = 5; i < 50; i++) {
            //     arr.push({rankIcon: "",rankBg:"rank_title2_png",sort:i,deskName:"name"+i,deskCode:"code"+i,point:"code"+i,pointColor:"0xf2ffda" });
            //  } 
            //console.log(arr);
            ac.source = arr;
            this.rankList.dataProvider = ac;
        }
    };
    return RankPanel1;
}(BasePanel));
__reflect(RankPanel1.prototype, "RankPanel1");
//# sourceMappingURL=RankPanel1.js.map