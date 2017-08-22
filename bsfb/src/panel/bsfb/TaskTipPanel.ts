/**
 *
 * @author 
 *
 */
class TaskTipPanel extends KFPanel {
    private Btn_Charge:eui.Button;
    private Btn_ReceiveDole:eui.Button;

    protected init() {
        this.skinName = "Panel_TaskTip";
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
