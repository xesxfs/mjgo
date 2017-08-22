/**
 *
 * @author 
 *
 */
class GameProtectPanel extends KFPanel {
    private  Btn_Close:eui.Button;
    private  Btn_Sure:eui.Button;
    private  Input_PhoneNum:eui.EditableText;

    protected init() {
        this.skinName = "Panel_GameProtect";
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
