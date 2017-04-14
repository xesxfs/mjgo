var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 牌局信息
 * @author chenkai
 * @date 2016/7/12
 */
var MatchInfoPanel = (function (_super) {
    __extends(MatchInfoPanel, _super);
    function MatchInfoPanel() {
        var _this = _super.call(this) || this;
        _this.headUIList = []; //头像
        _this.nameList = []; //名字
        _this.idList = []; //id
        _this.ziMoList = []; //自摸
        _this.jiePaoList = []; //接炮
        _this.dianPaoList = []; //点炮
        _this.anGangList = []; //暗杠
        _this.gangList = []; //明杠
        _this.zScoreList = []; //总成绩，正分
        _this.fScoreList = []; //总成绩，负分
        _this.skinName = "MatchInfoPanelSkin";
        return _this;
    }
    MatchInfoPanel.prototype.childrenCreated = function () {
        for (var i = 0; i < 4; i++) {
            this.headUIList[i] = this.uiGroup.getChildAt(i);
            this.nameList[i] = this.uiGroup.getChildAt(i + 4);
            this.idList[i] = this.uiGroup.getChildAt(i + 8);
            this.ziMoList[i] = this.uiGroup.getChildAt(i + 12);
            this.jiePaoList[i] = this.uiGroup.getChildAt(i + 16);
            this.dianPaoList[i] = this.uiGroup.getChildAt(i + 20);
            this.anGangList[i] = this.uiGroup.getChildAt(i + 24);
            this.gangList[i] = this.uiGroup.getChildAt(i + 28);
            this.zScoreList[i] = this.uiGroup.getChildAt(i + 32);
            this.fScoreList[i] = this.uiGroup.getChildAt(i + 36);
        }
    };
    MatchInfoPanel.prototype.onEnable = function () {
        this.setCenter();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.updateInfo();
    };
    MatchInfoPanel.prototype.onRemove = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    MatchInfoPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.panelBg.closeBtn:
                this.hide();
                this.clear();
                break;
        }
    };
    //更新页面
    MatchInfoPanel.prototype.updateInfo = function () {
        this.clear();
        var json = ProtocolData.Rev180_62_0;
        console.log("牌局信息:", json);
        var recordList = json.RecordList;
        if (recordList == null) {
            console.log("牌局信息不存在");
            return;
        }
        var len = recordList.length;
        for (var i = 0; i < len; i++) {
            var recordInfo = recordList[i];
            var userID = recordInfo.userID;
            var userVO = App.DataCenter.UserInfo.getUser(userID);
            if (userVO) {
                this.nameList[i].text = StringTool.formatNickName(userVO.nickName);
                this.idList[i].text = "ID：" + userVO.userID;
                this.headUIList[i].source = userVO.headUrl;
            }
            this.ziMoList[i].text = "自摸次数：" + recordInfo.ziMoNum;
            this.jiePaoList[i].text = "接炮次数：" + recordInfo.jiePaoNum;
            this.dianPaoList[i].text = "点炮次数：" + recordInfo.dianPaoNum;
            this.anGangList[i].text = "暗杠次数：" + recordInfo.anGangNum;
            this.gangList[i].text = "明杠次数：" + recordInfo.mingGangNum;
            console.log("poin=" + recordInfo.point);
            if (recordInfo.point >= 0) {
                this.zScoreList[i].text = "+" + recordInfo.point;
                this.fScoreList[i].text = "";
            }
            else {
                this.zScoreList[i].text = "";
                this.fScoreList[i].text = recordInfo.point + "";
            }
        }
    };
    //清理
    MatchInfoPanel.prototype.clear = function () {
        var len = this.headUIList.length;
        for (var i = 0; i < 4; i++) {
            this.nameList[i].text = "";
            this.idList[i].text = "";
            this.headUIList[i].bitmapData = null;
            this.ziMoList[i].text = "自摸次数：0";
            this.jiePaoList[i].text = "接炮次数：0";
            this.dianPaoList[i].text = "点炮次数：0";
            this.anGangList[i].text = "暗杠次数：0";
            this.gangList[i].text = "明杠次数：0";
            this.zScoreList[i].text = "";
            this.fScoreList[i].text = "";
        }
    };
    return MatchInfoPanel;
}(BasePanel));
__reflect(MatchInfoPanel.prototype, "MatchInfoPanel");
//# sourceMappingURL=MatchInfoPanel.js.map