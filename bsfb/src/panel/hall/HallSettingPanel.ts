/**
 *
 * @author 
 *
 */
class HallSettingPanel extends KFPanel {
    public Btn_AboutUs:eui.Button;
    public Btn_LogOut:eui.Button;
    public Btn_CloseSetting:eui.Button;
    public Toggle_Music:eui.Button;
    public Toggle_Sound:eui.Button;
    public musicTg:eui.Image;
    public soundTg:eui.Image;

    protected init() {
        this.skinName = "Panel_HallSetting2";
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
