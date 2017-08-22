/**
 *
 * @author 领取低保面板
 *
 */
class TaskPanel extends KFPanel {
    private Btn_Sure:eui.Button;
    private Btn_Close:eui.Button;

    private Label_ReceiveConditions:eui.Label;
    private Label_ReceiveTimes:eui.Label;
    private Label_ReceiveScore:eui.Label;

    protected init() {
        this.skinName = "Panel_Task";
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
