/**
 *
 * @author 
 *
 */
class ThirdLoginPanel extends KFPanel{
    private PhoneLoginPanel:eui.Group;
    private AccountPanel:eui.Group;
    private Input_PhoneNum:eui.EditableText;
    private Input_RegCode:eui.EditableText;
    private Btn_Login_Phone:eui.Button;
    private Btn_Register:eui.Button;
    private Btn_CodeFind_Phone:eui.Button;
    private Btn_Toggle_code:eui.CheckBox;
    private Btn_ClosePhone:eui.Button;
    private Btn_Switch_Phone:eui.Button;
    private Input_Password:eui.Label;
    private Input_Account:eui.Label;
    private Btn_CodeFind_Account:eui.Button;
    private Btn_Switch_Account:eui.Button;
    private Btn_Login_Account:eui.Button;
    private Btn_CloseAccount:eui.Button;
    public constructor(){
        super();
    }
    protected init() {
        this.skinName = "PhoneLoginPanelskin";
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
