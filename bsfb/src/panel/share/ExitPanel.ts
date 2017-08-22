/**
 *
 * @author 
 *
 */
class ExitPanel extends KFPanel {
    private Btn_Close:eui.Button;
    private Btn_OK:eui.Button;
    private Btn_Cancle:eui.Button;

    protected init() {
        this.skinName = "ExitPanelSkin";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}
