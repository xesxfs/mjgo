/**
 *
 * @author 
 *
 */
class BindingPhonePanel extends KFPanel {
    public Btn_GetCode:eui.Button;
    public Btn_Sure:eui.Button;
    public Btn_Close:eui.Button;
    public Label_GetCode:eui.Label;
    public Label_Tips:eui.Label;
    public Label_Title:eui.Label;
    public Input_PhoneNum:eui.EditableText;
    public Input_SecurityCode:eui.EditableText;
    private AreaCode:DropDownBox;

    protected init() {
        this.skinName = "Panel_BindingPhone";
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
