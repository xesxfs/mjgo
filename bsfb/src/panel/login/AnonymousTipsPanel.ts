/**
 *
 * @author 
 *
 */
class AnonymousTipsPanel extends KFPanel {

    protected init() {
        this.skinName = "Panel_AnonymousTips";
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
