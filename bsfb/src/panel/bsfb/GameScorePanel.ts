/**
 *
 * @author 
 *
 */
class GameScorePanel extends KFPanel {
    private Label_TotalScore:eui.Label;
    private Label_TodayScore:eui.Label;
    private Btn_Continue:eui.Button;
    private Btn_Close:eui.Button;


    protected init() {
        this.skinName = "Panel_Clearing";
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
