/**
 * 非vip用户点击专属房的弹窗面板
 */

class ExRoomOpenVipPanel extends BasePanel {

    private PanelBgCSkin: PanelBg;
    private exRoomCancel: eui.Button;
    private ExRoomConfirm: eui.Button;
    public constructor() {
        super();
        this.skinName = "ExRoomOpenVipPanelSkin";
    }

    protected childrenCreated() {

    }

    protected onEnable() {
        this.setCenter();

        this.PanelBgCSkin.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.exRoomCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.ExRoomConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goOpenVip, this);
    }

    protected onRemove() {

        this.PanelBgCSkin.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.exRoomCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.ExRoomConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goOpenVip, this);
    }

private ha:HallScene;
    private goOpenVip() {
   var hall:HallScene= App.SceneManager.getScene(SceneConst.HallScene) as HallScene;
//        hall.showShopPanel(ShopView.vip);
    }
}