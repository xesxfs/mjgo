/**
 *
 * @author 
 *
 */
class BSFBExitSurePanel extends KFPanel {
    private hand:eui.Image;
    protected init() {
        this.skinName = "Panel_ExitSure";
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
