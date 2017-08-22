/**
 *
 * @author 
 *
 */
class AntiAddictionPanel extends KFPanel {
    private Btn_Sure:eui.Button;
    private Btn_Right:eui.Button;
    private Btn_Left:eui.Button;
    private label_title:eui.Label;
    private label_content:eui.Label;
    private label_tip:eui.Label;
    
    protected init() {
        this.skinName = "Panel_FangChenMi";
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
