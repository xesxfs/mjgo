/**
 *
 * @author 
 *
 */
class GameRankPanel extends KFPanel {
    private Btn_wealth:eui.Button;
    private Btn_Close:eui.Button;
    private Btn_luck:eui.Button;
    private luckscroll:eui.Scroller;
    private wealthscroll:eui.Scroller;
    private lucklist:eui.List;
    private wealthlist:eui.List;

    protected init() {
        this.skinName = "Panel_Ranklist";
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
