/**
 *
 * @author 
 *
 */
class LoginChoicePanel extends KFPanel {

    protected init() {
        this.skinName = "LoginChoicePanelskin";
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
