var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 操作面板，吃碰杠胡
 * @author chenkai
 * @date 2016/7/11
 */
var SelectActUI = (function (_super) {
    __extends(SelectActUI, _super);
    function SelectActUI() {
        var _this = _super.call(this) || this;
        _this.btnList = {};
        _this.panelWidth = 600; //面板宽度
        _this.itemWidth = 150; //按钮宽度
        _this.bAnGang = false; //用于记录暗杠,因为暗杠按钮没有
        _this.bInitRes = false;
        _this.skinName = "SelectActUISkin";
        return _this;
    }
    SelectActUI.prototype.childrenCreated = function () {
        this.btnList[ACT_state.Act_Pass] = this.passBtn;
        this.btnList[ACT_state.Act_Peng] = this.pengBtn;
        this.btnList[ACT_state.Act_Chi] = this.eatBtn;
        this.btnList[ACT_state.Act_Gang] = this.gangBtn;
        this.btnList[ACT_state.Act_AnGang] = this.gangBtn;
        this.btnList[ACT_state.Act_Hu] = this.huBtn;
        this.removeChildren();
        this.touchEnabled = false;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    SelectActUI.prototype.initRes = function () {
        if (this.bInitRes == false) {
            this.bInitRes = true;
            this.passBtn.setActSkin(ACT_act.Act_Pass);
            this.eatBtn.setActSkin(ACT_act.Act_Chi);
            this.pengBtn.setActSkin(ACT_act.Act_Peng);
            this.gangBtn.setActSkin(ACT_act.Act_Gang);
            this.huBtn.setActSkin(ACT_act.Act_Hu);
        }
    };
    //点击按钮，传递相应动作
    SelectActUI.prototype.onTouch = function (e) {
        if (e.target instanceof SelectActBtn) {
            for (var key in this.btnList) {
                if (this.btnList[key] == e.target) {
                    this.dispatchEventWith("sendActEvent", false, parseInt(key));
                    break;
                }
            }
        }
    };
    /**
     * 根据可行操作，显示操作面板
     * @param actList 动作列表Act_state (碰、杠、胡等)
     */
    SelectActUI.prototype.updateInfo = function (actList) {
        this.initRes();
        var len = actList.length;
        this.bAnGang = false;
        for (var i = len - 1; i >= 0; i--) {
            var act = actList[i];
            var btn = this.btnList[act];
            if (btn == null) {
                console.error("缺少动作操作按钮:", act);
                continue;
            }
            if (act == ACT_state.Act_AnGang) {
                this.bAnGang = true;
            }
            this.addChild(btn);
            btn.playAnim();
        }
        //按钮居中显示
        len = this.numChildren;
        var startX = this.panelWidth / 2 - len * this.itemWidth / 2;
        for (var i = 0; i < len; i++) {
            var child = this.getChildAt(i);
            child.x = startX + this.itemWidth * i;
        }
        //选框居中显示
    };
    SelectActUI.prototype.hide = function () {
        for (var key in this.btnList) {
            this.btnList[key].stopAnim();
        }
        this.removeChildren();
        this.parent && this.parent.removeChild(this);
    };
    return SelectActUI;
}(eui.Component));
__reflect(SelectActUI.prototype, "SelectActUI");
//# sourceMappingURL=SelectActUI.js.map