var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author chenwei
 *
 */
var PageView = (function (_super) {
    __extends(PageView, _super);
    function PageView() {
        var _this = _super.call(this) || this;
        _this.curIdx = 0;
        _this.movePer = 20;
        _this.otherGame = [];
        _this.isFirst = true;
        return _this;
    }
    /**组件创建完毕*/
    PageView.prototype.childrenCreated = function () {
        //      eui.Scroller.scrollThreshold=10;
        this.pageScorller.throwSpeed = 0;
        this.offsetX = 30;
        this.pageCount = 0;
        this.movePer = 50;
        this.isMove = false;
        this.otherGamePool = ObjectPool.getPool("OtherGame", 5);
        this.pageScorller.addEventListener(eui.UIEvent.CHANGE_END, this.pageMove, this);
        this.pageScorller.addEventListener(eui.UIEvent.CHANGE_START, this.startPageMove, this);
    };
    /**添加到场景中*/
    PageView.prototype.onEnable = function () {
    };
    PageView.prototype.pageMove = function () {
        var _this = this;
        if (!this.isMove) {
            return;
        }
        var scorllH = this.pageScorller.viewport.scrollH;
        console.log(this.pageScorller.viewport.contentWidth);
        //滑动到下一个页面
        if (this.curIdx * App.StageUtils.stageWidth + this.movePer < scorllH) {
            this.isMove = true;
            this.curIdx++;
            this.movePage(this.curIdx);
        }
        else if (this.curIdx * App.StageUtils.stageWidth - this.movePer > scorllH) {
            this.isMove = true;
            this.curIdx--;
            this.movePage(this.curIdx);
        }
        else {
            this.isMove = true;
            egret.Tween.get(this.pageScorller.viewport).to({ scrollH: (this.curIdx) * App.StageUtils.stageWidth }, 30).call(function () { _this.isMove = false; }, this);
        }
    };
    PageView.prototype.movePage = function (curIdx) {
        var _this = this;
        egret.Tween.get(this.pageScorller.viewport).to({ scrollH: (curIdx) * App.StageUtils.stageWidth }, 200).call(function () { _this.isMove = false; }, this);
        this.selPageFlag(curIdx);
        this.selectOtherGame(curIdx);
    };
    PageView.prototype.startPageMove = function () {
        this.curIdx = ~~(this.pageScorller.viewport.scrollH / App.StageUtils.stageWidth);
        this.isMove = true;
        console.log("当前页面:", this.curIdx);
    };
    //设置页面数量
    PageView.prototype.setPageCount = function (count) {
        if (count > 1) {
            this.pageCount = count;
            for (var c = 1; c < count; c++)
                this.addPage();
        }
    };
    //增加页签
    PageView.prototype.addPage = function () {
        if (++this.pageCount <= 1) {
            this.hideScorller();
        }
        else {
            var p = new eui.Image(RES.getRes("hall_pageView_png"));
            this.pageGroup.addChild(p);
            p.x = this.lastIndex.x + this.offsetX;
            this.lastIndex = p;
            this.showScorller();
        }
    };
    //选择标志
    PageView.prototype.selPageFlag = function (pidx) {
        if (pidx <= this.pageCount) {
            this.selectPage.x = pidx * this.offsetX + 2;
        }
    };
    //增加内容页
    PageView.prototype.addPageContent = function (ctc) {
        this.resetData();
        var deskList = App.DataCenter.roomInfo.deskList;
        for (var i = 0; i < deskList.length; i++) {
            if (ctc && deskList[i].deskNo == App.DataCenter.roomInfo.getCurDesk().deskNo) {
                ctc.x = App.StageUtils.stageWidth * i;
                this.viewGroup.addChild(ctc);
                this.pageScorller.viewport.scrollH = ctc.x;
                ctc.percentWidth = 100;
                ctc.percentHeight = 100;
                this.selPageFlag(i);
            }
            else {
                var otg = this.otherGamePool.getObject();
                otg.deskNo = deskList[i].deskNo;
                otg.x = App.StageUtils.stageWidth * i;
                this.viewGroup.addChild(otg);
                this.otherGame.push(otg);
                otg.percentWidth = 100;
                otg.percentHeight = 100;
            }
            this.addPage();
        }
        if (!ctc) {
            this.curOtherGame = this.otherGame[0];
            this.curOtherGame.select();
        }
        var hall = App.SceneManager.getScene(SceneConst.HallScene);
        hall.updateCurDeskInfo();
    };
    PageView.prototype.resetData = function () {
        var _this = this;
        this.selPageFlag(0);
        this.otherGame.forEach(function (ogame) {
            _this.otherGamePool.returnObject(ogame);
            ogame.parent && ogame.parent.removeChild(ogame);
        });
        var pagelen = this.pageGroup.numChildren;
        this.lastIndex = this.pageGroup.getChildAt(0);
        //这里要反序删除,避免层次排序
        for (var i = pagelen - 1; i > 0; i--) {
            var reChil = this.pageGroup.getChildAt(i);
            reChil && reChil.parent && reChil.parent.removeChild(reChil);
        }
        this.curOtherGame && this.curOtherGame.unSelect();
        this.pageCount = 0;
        this.viewGroup.removeChildren();
    };
    //增加一个    
    PageView.prototype.addOneContent = function () {
        if (this.pageCount < App.DataCenter.roomInfo.deskList.length) {
            var otg = this.otherGamePool.getObject();
            otg.x = App.StageUtils.stageWidth * this.pageCount - 1;
            this.viewGroup.addChild(otg);
            this.otherGame.push(otg);
            this.addPage();
        }
    };
    PageView.prototype.selectOtherGame = function (idx) {
        console.log("选择的索引：" + idx);
        var game = this.viewGroup.getChildAt(idx);
        var roomInfo = App.DataCenter.roomInfo;
        if (game && game instanceof OtherGame) {
            this.curOtherGame && this.curOtherGame.unSelect();
            game.select();
            this.curOtherGame = game;
        }
        else {
            this.curOtherGame && this.curOtherGame.unSelect();
        }
        roomInfo.setCurDeskById(idx + 1);
        var hall = App.SceneManager.getScene(SceneConst.HallScene);
        hall.updateCurDeskInfo();
    };
    //选择游戏主界面
    PageView.prototype.selectMainGame = function () {
        var numlen = this.viewGroup.numChildren;
        for (var i = 0; i < numlen; i++) {
            var game = this.viewGroup.getChildAt(i);
            if (game instanceof GameScene) {
                if (this.curIdx == i) {
                    return false;
                }
                this.curIdx = i;
                this.movePage(this.curIdx);
                return true;
            }
        }
        return false;
    };
    PageView.prototype.hideScorller = function () {
        this.pageScorller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.selectFlagGroup.visible = false;
    };
    PageView.prototype.showScorller = function () {
        if (this.pageCount == 1) {
            return;
        }
        this.pageScorller.scrollPolicyH = eui.ScrollPolicy.ON;
        this.selectFlagGroup.visible = true;
    };
    /**从场景中移除*/
    PageView.prototype.onRemove = function () {
    };
    return PageView;
}(BaseUI));
__reflect(PageView.prototype, "PageView");
//# sourceMappingURL=PageView.js.map