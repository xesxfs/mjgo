/**
 *
 * @author 
 *
 */
class LuckyPropsPanel extends KFPanel {
    private Toggle_Use_props:eui.CheckBox;
    private Btn_Sure:eui.Button;
    private Btn_Cancel:eui.Button;

    protected init() {
        this.skinName = "Props_Lucky";
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
