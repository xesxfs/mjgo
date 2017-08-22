/**
 *
 * @author 
 *
 */
class BindingTipPanel extends KFPanel {
    private Btn_Sure:eui.Button;
    private Label_PhoneNum:eui.Label;
    // public constructor() {
    //     super();
    //     this.skinName = "StartPanelskin";
    // }

    protected init() {
        this.skinName = "Panel_BindingTip";
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
