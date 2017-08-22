/**
 *
 * @author 
 *
 */
class SlotHelpPanel extends KFPanel {
    private Btn_Close:eui.Button;

    protected init() {
        this.skinName = "Panel_SlotHelp";
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
