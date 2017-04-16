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
 *5/1/2017
 */
var ExcRoom = (function (_super) {
    __extends(ExcRoom, _super);
    function ExcRoom() {
        var _this = _super.call(this) || this;
        _this.skinName = "ExcRoomSkin";
        return _this;
    }
    /**组件创建完毕*/
    ExcRoom.prototype.childrenCreated = function () {
        this.maCG = [this.ma2Rad, this.ma4Rad, this.ma6Rad];
    };
    /**添加到场景中*/
    ExcRoom.prototype.onEnable = function () {
        this.setCenter();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.minKey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinKeyBorad, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.ptJpRBtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChangeMjType, this);
        this.ma2Rad.addEventListener(egret.Event.CHANGE, this.maOperation, this);
        this.ma4Rad.addEventListener(egret.Event.CHANGE, this.maOperation, this);
        this.ma6Rad.addEventListener(egret.Event.CHANGE, this.maOperation, this);
        this.initDesk();
        this.bubugaoState();
    };
    /**从场景中移除*/
    ExcRoom.prototype.onRemove = function () {
        this.minKey.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinKeyBorad, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    /**步步高状态*/
    ExcRoom.prototype.bubugaoState = function () {
        var len = this.maCG.length;
        var hasSelec = false;
        for (var i = 0; i < len; i++) {
            var r = this.maCG[i];
            if (r.selected)
                hasSelec = true;
        }
        this.ptBubuGaoRb.enabled = hasSelec;
    };
    ExcRoom.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.swMinKeyboardBtn:
                this.minKey.visible = !this.minKey.visible;
                break;
            case this.editBtn:
                break;
            case this.confirmBtn:
                this.sendChange();
                break;
            default:
                this.minKey.visible = false;
        }
    };
    //    初始化
    ExcRoom.prototype.initDesk = function () {
        var deskInfo = App.DataCenter.roomInfo.getCurDesk();
        if (!deskInfo) {
            Tips.error("未能获取房间信息！！");
            this.hide();
            return;
        }
        this.deskInfo = deskInfo;
        this.roomNumLab.text = deskInfo.deskCode.toString();
        this.roomNameLab.text = decodeURIComponent(deskInfo.deskName);
        this.basePointLab.text = deskInfo.basePoint.toString();
        this.setGameConfig(deskInfo.gameConfig);
    };
    //     设置游戏
    ExcRoom.prototype.setGameConfig = function (gameConfig) {
        var config = ProtocolData.gameConfig;
        config = gameConfig;
        this.selView(config.gameType);
        this.ptHasYiPaoSanXiangCk.selected = config.hasYiPaoSanXiang;
        this.ptHasHaiDiLaoYueCk.selected = config.hasHaiDiLaoYue;
        this.ptHasSanYuanCk.selected = config.hasSanYuan;
        this.ptHasFenWeiFengQuangCk.selected = (config.hasFengWei && config.hasFengQuan);
        this.ptHasGangAddFan.selected = config.hasGangAddFan;
        this.ptHasGangShangKaiHuaCk.selected = config.hasGangShangKaiHua;
        this.ptHasQiangGangCk.selected = config.hasQiangGang;
        this.ptBubuGaoRb.selected = config.hasBuBuGao;
        this.ptBubuGaoRb.enabled = config.hasMaiMa;
        if (config.hasMaiMa)
            this.setMaCount(config.maiMaNum);
    };
    //    设置抓马数量
    ExcRoom.prototype.setMaCount = function (mac) {
        var len = this.maCG.length;
        for (var i = 0; i < len; i++) {
            var r = this.maCG[i];
            if (parseInt(r.label) == mac) {
                r.selected = true;
                break;
            }
        }
    };
    //    抓马选择
    ExcRoom.prototype.maOperation = function (e) {
        var len = this.maCG.length;
        var hasSelec = false;
        for (var i = 0; i < len; i++) {
            var r = this.maCG[i];
            if (r != e.target)
                r.selected = false;
            if (r.selected)
                hasSelec = true;
            if (r.enabled)
                hasSelec = true;
        }
        this.ptBubuGaoRb.enabled = hasSelec;
    };
    /**
     * 获取游戏配置
     */
    ExcRoom.prototype.getGameOperation = function () {
        //       let  dataConfig = new Object();
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
        dataConfig.gameType = this.gameType;
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
    ExcRoom.prototype.getMaCount = function () {
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
    ExcRoom.prototype.sendChange = function () {
        if (App.DataCenter.gameState == GameState.Playing) {
            Tips.info("游戏已正式开始,请结束后再修改房间信息");
        }
        else {
            App.DataCenter.GameInfo;
            var info = ProtocolData.Send120_1_0;
            info.basePoint = parseInt(this.basePointLab.text);
            info.deskName = encodeURIComponent(this.roomNameLab.text);
            info.deskNo = this.deskInfo.deskNo;
            info.gameConfig = this.getGameOperation();
            var ctc = App.getController(HallController.NAME);
            ctc.sendRoomChange(info);
            this.hide();
        }
    };
    ExcRoom.prototype.onChangeMjType = function (evt) {
        var radioGroup = evt.target;
        this.typeViewStack.selectedIndex = radioGroup.selectedValue;
        this.gameType = parseInt(radioGroup.selectedValue) + 1;
    };
    ExcRoom.prototype.selView = function (type) {
        this.gameType = type;
        this.typeViewStack.selectedIndex = this.gameType - 1;
        if (type == GAME_TYPE.JI_PING_HU) {
            this.ptJpRBtn.selected = true;
        }
        else {
            this.ptTdRBtn.selected = true;
        }
    };
    ExcRoom.prototype.onMinKeyBorad = function (e) {
        if (e.target instanceof eui.Button) {
            var btn = e.target;
            this.basePointLab.text = btn.label;
        }
    };
    return ExcRoom;
}(BasePanel));
__reflect(ExcRoom.prototype, "ExcRoom");
//# sourceMappingURL=ExcRoom.js.map