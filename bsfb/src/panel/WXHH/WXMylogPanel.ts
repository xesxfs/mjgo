/**
 *
 * @author 
 *
 */
class WXMylogPanel extends KFPanel {

    private LogList:eui.List;
    private Btn_Close:eui.Button;
    private Label_NoTips:eui.Label;

    protected init() {
        this.skinName = "wxhh_MyLogPanel";
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
