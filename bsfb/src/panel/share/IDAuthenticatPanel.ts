/**
 *
 * @author 
 *
 */
class IDAuthenticatPanel extends KFPanel {
    private Label_name:eui.EditableText;
    private Label_number:eui.EditableText;
    private Btn_Close:eui.Button;
    private Btn_Sure:eui.Button;
    public constructor() {
        super();
        this.skinName = "Panel_IDAuthenticat";
    }

    protected init() {
        this.TAG = "IDAuthenticat";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }

    protected setOnClickListener() {
        
    }

    protected removeOnClickListener() {

    }
}
