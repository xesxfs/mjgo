/**
 *
 * @author 
 *
 */
class PhoneVerificationCodePanel extends KFPanel {
    private Btn_Close:eui.Button;
    private Btn_GetCode:eui.Button;
    private Btn_Sure:eui.Button;
    private Label_number:eui.Label;
    private Input_identifying:eui.EditableText;
    protected init() {
        this.skinName = "Panel_PhoneVerificationCode";
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
