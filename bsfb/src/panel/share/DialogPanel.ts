/**
 *
 * @author 
 *
 */
class DialogPanel extends KFPanel {
    private Label_Content:eui.Label;
    private Label_Title:eui.Label;
    private Btn_Yes:eui.Button;
    private Btn_OK:eui.Button;
    private Btn_Cancle:eui.Button;
    private Btn_Close:eui.Button;

    public constructor() {
        super();
        this.skinName = "TipPanelSkin";
    }

    protected init() {
        this.TAG = "DialogPanel";
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
