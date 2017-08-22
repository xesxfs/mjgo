/**
 *
 * @author 
 *
 */
class GameSettingPanel extends KFPanel {
    public Btn_CloseSetting:eui.Button;
    public Toggle_Music:eui.CheckBox;
    public Toggle_Sound:eui.CheckBox;
    protected init() {
        this.skinName = "Panel_GameSetting";
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
