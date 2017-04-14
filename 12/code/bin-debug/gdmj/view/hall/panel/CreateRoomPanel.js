var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 创建房间界面
 * @author chenwei
 * @date 2016/6/28
 */
var CreateRoomPanel = (function (_super) {
    __extends(CreateRoomPanel, _super);
    function CreateRoomPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "CreateRoomPanelSkin";
        return _this;
    }
    CreateRoomPanel.prototype.childrenCreated = function () {
        this.maCG = [this.ma2Rad, this.ma4Rad, this.ma6Rad];
    };
    CreateRoomPanel.prototype.onEnable = function () {
        this.setCenter();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.ptJpRBtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChangeMjType, this);
        this.minKey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinKeyBorad, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.ma2Rad.addEventListener(egret.Event.CHANGE, this.maOperation, this);
        this.ma4Rad.addEventListener(egret.Event.CHANGE, this.maOperation, this);
        this.ma6Rad.addEventListener(egret.Event.CHANGE, this.maOperation, this);
    };
    CreateRoomPanel.prototype.setDesk = function (data) {
        this.confirmBtn.label = "￥" + data.buy_money;
        this.id = data.id;
    };
    CreateRoomPanel.prototype.onChangeMjType = function (evt) {
        var radioGroup = evt.target;
        this.typeViewStack.selectedIndex = radioGroup.selectedValue;
        this.gameType = parseInt(radioGroup.selectedValue) + 1;
    };
    //    抓马选择
    CreateRoomPanel.prototype.maOperation = function (e) {
        var len = this.maCG.length;
        var hasSelec = false;
        for (var i = 0; i < len; i++) {
            var r = this.maCG[i];
            if (r != e.target)
                r.selected = false;
            if (r.selected)
                hasSelec = true;
        }
        this.ptBubuGaoRb.enabled = hasSelec;
    };
    CreateRoomPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.swMinKeyboardBtn:
                this.minKey.visible = !this.minKey.visible;
                break;
            case this.editBtn:
                break;
            case this.confirmBtn:
                if (App.DataCenter.debugInfo.isDebug) {
                    this.sendCreate();
                }
                else {
                    this.sendPay();
                }
                break;
            default:
                this.minKey.visible = false;
        }
    };
    CreateRoomPanel.prototype.sendCreate = function () {
        var gconfig = this.getGameOperation();
        var basePoint = parseInt(this.basePointLab.text);
        var config = new Object();
        config["gameConfig"] = gconfig;
        config["basePoint"] = basePoint;
        var ctc = App.getController(HallController.NAME);
        ctc.sendOpenDesk(config);
    };
    CreateRoomPanel.prototype.sendPay = function () {
        var ctc = App.getController(HallController.NAME);
        ctc.sendPay(this.id);
        this.hide();
    };
    /**
     * 获取游戏配置
     */
    CreateRoomPanel.prototype.getGameOperation = function () {
        var dataConfig = ProtocolData.gameConfig;
        //重置数据
        dataConfig.hasMaiMa = false;
        dataConfig.hasOni = false;
        dataConfig.hasYiPaoSanXiang = false;
        dataConfig.hasHaiDiLaoYue = false;
        dataConfig.hasGangShangKaiHua = false;
        dataConfig.hasQiangGang = false;
        dataConfig.hasYiPaoDuoXiang = true;
        dataConfig.hasFengQuan = false; // 是否有风圈刻子
        dataConfig.hasFengWei = false; // 是否有风位刻子
        dataConfig.hasSanYuan = false; // 是否有三元牌刻子
        dataConfig.hasBuBuGao = false; //是否步步高
        dataConfig.hasGangAddFan = false; //是否杠牌加番
        dataConfig.maiMaNum = 0;
        if (this.gameType == GAME_TYPE.JI_PING_HU) {
            dataConfig.hasYiPaoSanXiang = this.ptHasYiPaoSanXiangCk.selected;
            dataConfig.hasHaiDiLaoYue = this.ptHasHaiDiLaoYueCk.selected;
            dataConfig.hasFengQuan = dataConfig.hasFengWei = this.ptHasFenWeiFengQuangCk.selected;
            dataConfig.hasSanYuan = this.ptHasSanYuanCk.selected; // 是否有三元牌刻子
            dataConfig.hasGangAddFan = this.ptHasGangAddFan.selected; // 是否杠牌加番
        }
        else {
            dataConfig.hasGangShangKaiHua = this.ptHasGangShangKaiHuaCk.selected;
            dataConfig.hasQiangGang = this.ptHasQiangGangCk.selected;
            var mainMaNum = this.getMaCount();
            if (this.ptBubuGaoRb.enabled && this.ptBubuGaoRb.selected) {
                dataConfig.hasBuBuGao = true;
            }
            //没有买马返回null           
            if (mainMaNum) {
                dataConfig.maiMaNum = mainMaNum;
                dataConfig.hasMaiMa = true;
            }
        }
        return dataConfig;
    };
    //获取抓马数量
    CreateRoomPanel.prototype.getMaCount = function () {
        var count;
        if (this.gameType == GAME_TYPE.JI_PING_HU) {
            count = null;
        }
        else {
            for (var i = 0; i < this.maCG.length; i++) {
                if (this.maCG[i].selected)
                    count = this.maCG[i].label;
            }
        }
        var c = parseInt(count);
        return c;
    };
    CreateRoomPanel.prototype.onMinKeyBorad = function (e) {
        if (e.target instanceof eui.Button) {
            var btn = e.target;
            this.basePointLab.text = btn.label;
        }
    };
    CreateRoomPanel.prototype.onRemove = function () {
    };
    CreateRoomPanel.prototype.onDestroy = function () {
    };
    return CreateRoomPanel;
}(BasePanel));
__reflect(CreateRoomPanel.prototype, "CreateRoomPanel");
//# sourceMappingURL=CreateRoomPanel.js.map