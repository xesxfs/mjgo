/**
 *
 * @author 
 *
 */
class UploadVedioPanel extends KFPanel {
    private Input_VedioTitle:eui.EditableText;
    private Btn_Close:eui.Button;
    private Btn_Up:eui.Button;

    protected init() {
        this.skinName = "Panel_UpLoading";
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
