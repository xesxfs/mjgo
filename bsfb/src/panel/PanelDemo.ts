/**
 *
 * @author 
 *
 */
class PanelDemo extends KFPanel {

    protected init() {
        this.skinName = "StartPanelskin";
        this.TAG = "StartPanel";
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
