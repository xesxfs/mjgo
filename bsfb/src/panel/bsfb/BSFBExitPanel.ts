/**
 *
 * @author 
 *
 */
class BSFBExitPanel extends KFPanel {
    private Btn_Close:eui.Button;
    private Btn_KeepExit:eui.Button;
    private Btn_GiveUpExit:eui.Button;
    private Label_TotalScore:eui.Label;
    private Label_TodayScore:eui.Label;

    protected init() {
        this.skinName = "Panel_Exit";
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
