/**
 *
 * @author 
 *
 */
class PayChoicePanel extends KFPanel {
    private Btn_Close:eui.Button;
    private Btn_PayClick0:eui.Group;
    private Btn_PayClick1:eui.Group;
    private Btn_PayClick2:eui.Group;

    protected init() {
        this.skinName = "Panel_PayChoice";
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
