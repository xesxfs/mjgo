/**
 *
 * @author 
 *
 */
class AboutPanel extends KFPanel {
    private Btn_Close:eui.Button;

    protected init() {
        this.skinName = "AboutPanelSkin";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }

    protected setOnClickListener() {
        this.Btn_Close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.Btn_CloseClick,this);
    }

    protected removeOnClickListener() {
        this.Btn_Close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.Btn_CloseClick,this);
    }

    private Btn_CloseClick(){

    }
}
