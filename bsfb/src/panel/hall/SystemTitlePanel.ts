/**
 *
 * @author 
 *
 */
class SystemTitlePanel extends KFPanel {
    private label_title:eui.Label;
    private label_content:eui.Label;
    private aa:eui.Button;
    private Btn_Sure:eui.Button;
   protected init() {
        this.skinName = "Panel_SystemTitle";
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
