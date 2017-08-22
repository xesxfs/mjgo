/**
 *
 * @author 
 *
 */
class RollPanel extends KFPanel {
    private Btn_CloseRoll:eui.Button;
    private 
    protected init() {
        this.skinName = "Panel_Roll";
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
