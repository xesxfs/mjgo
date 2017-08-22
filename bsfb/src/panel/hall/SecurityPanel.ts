/**
 *
 * @author 
 *
 */
class SecurityPanel extends KFPanel {
    private Panel_SecurityCenter1:eui.Group;
    private Panel_ChangePhone:eui.Group;
    private Panel_Code_Find:eui.Group;
    private Panel_Code_Find0:eui.Group;//密保问题 暂时不用
    private Panel_PSW_Change:eui.Group;
    private Panel_Code_Change:eui.Group;
    private Panel_Code_Setting:eui.Group;
    private Panel_Code_Open:eui.Group;
    

    private Btn_Mobile_Binding:eui.Button;
    private Btn_IDSecurity_Binding:eui.Button;
    private Btn_GameSecurity_Binding:eui.Button;
    private Btn_Code_Binding:eui.Button;
    private Btn_ChangePhone:eui.Button;
    private Btn_Close:eui.Button;

    private Btn_Close_ChangePhone:eui.Button;
    private Btn_GetCode_ChangePhone:eui.Button;
    private Btn_Sure_ChangePhone:eui.Button;
    private Input_NewPhoneNum_ChangePhone:eui.EditableText;
    private Input_Code_ChangePhone:eui.EditableText;

    private Btn_Close_CodeFind:eui.Button;
    private Btn_GetCode_CodeFind:eui.Button;
    private Btn_Sure_CodeFind:eui.Button;
    private Input_PhoneNum_CodeFind:eui.EditableText;
    private Input_CheckCode_CodeFind:eui.EditableText;
    private Input_CodeNewFirst_CodeFind:eui.EditableText;
    private Input_CodeNewSecond_CodeFind:eui.EditableText;

    private Btn_Close_PSWProtect:eui.Button;
    private Btn_Sure_PSWProtect:eui.Button;
    private Input_Queastion1_PSWProtect:eui.EditableText;
    private Input_Answer1_PSWProtect:eui.EditableText;
    private Input_Queastion2_PSWProtect:eui.EditableText;
    private Input_Answer2_PSWProtect:eui.EditableText;

    private Btn_Close_PSWChange:eui.Button;
    private Btn_Sure_PSWChange:eui.Button;
    private Input_PSWOld_PSWChange:eui.EditableText;
    private Input_PSWNewFirst_PSWChange:eui.EditableText;
    private Input_PSWNewSecond_PSWChange:eui.EditableText;

    private Btn_Close_CodeChange:eui.Button;
    private Btn_Sure_CodeChange:eui.Button;
    private Input_CodeOld_CodeChange:eui.EditableText;
    private Input_CodeNewFirst_CodeChange:eui.EditableText;
    private Input_CodeNewSecond_CodeChange:eui.EditableText;

    private Btn_Close_CodeSetting:eui.Button;
    private Btn_Sure_CodeSetting:eui.Button;
    private Input_CodeFirst_CodeSetting:eui.EditableText;
    private Input_CodeSecond_CodeSetting:eui.EditableText;

    private Btn_Close_CodeOpen:eui.Button;
    private Btn_COdeChange_CodeOpen:eui.Button;
    private Btn_Sure_CodeOpen:eui.Button;
    private Btn_CodeFind_CodeOpen:eui.Button;
    private Input_Code_CodeOpen:eui.EditableText;

    private MobileSecurity:eui.Group;
    private GameSecurity:eui.Group;
    private IDSecurity:eui.Group;
    private PSWSecurity:eui.Group;
    private ChangePhone:eui.Group;

    private Label_PhoneNum_ChangePhone:eui.Label;
    private IDtishi:eui.Image;
    private tishi:eui.Image;
    private Label_Tips_CodeOpen:eui.Label;

    protected init() {
        this.skinName = "Panel_SecurityCenter";
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
