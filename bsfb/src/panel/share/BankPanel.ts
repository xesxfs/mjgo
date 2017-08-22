/**
 *
 * @author 
 *
 */
class BankPanel extends KFPanel {
    private label_numBankPoint:eui.Label;    //银行当前点数
    private label_numWalletPoint:eui.Label;  //钱包当前点数 

    private btn_close:eui.Button;       //关闭窗口    
    private btn_deposit:eui.Button;     //存入标题按钮
    private btn_withdraw:eui.Button;    //存出标题按钮

    private group_deposit:eui.Group;    //存出面板组
    private AllMoney_Btn:eui.Button;    //全部取出按钮
    private Btn_OK1:eui.Button;         //确定取出按钮
    private Checkbox_Rember:eui.CheckBox;    //记住密码复选框
    private Btn_changeBankPasswd:eui.Button; //修改密码按钮
    private Btn_findPassword:eui.Button;     //找回密码

    private group_withdrawMoney:eui.Group;   //存入面板组
    private Btn_OK:eui.Button;               //确定存入按钮
    private Btn_OK0:eui.Button;              //全部存入按钮
    private label_depositPointNum:eui.Label; //存入点数输入框      
    
    private group_helpTips:eui.Group;        //第一次进入银行时修改密码提示

    /*点数输入键盘对话框*/
    private group_keyboardDialog:eui.Group;  //点数输入键盘对话框
    private label_KDTitle:eui.Label;         //对话框标题
    private label_KDPointNum:eui.Label;      //输入的点数
    private btn_KDClose:eui.Button;          //关闭对话框按钮
    private btn_KDNumDelete:eui.Button;      //回退按钮
    private btn_KDNum_1:eui.Button;          //数字1按钮
    private btn_KDNum_2:eui.Button;  
    private btn_KDNum_3:eui.Button;
    private btn_KDNum_4:eui.Button;
    private btn_KDNum_5:eui.Button;
    private btn_KDNum_6:eui.Button;
    private btn_KDNum_7:eui.Button;
    private btn_KDNum_8:eui.Button;
    private btn_KDNum_9:eui.Button; 
    private btn_KDNum_0:eui.Button;
    private btn_KDNum_wan:eui.Button;     
    private btn_KDNum_confirm:eui.Button; 
    

    /*修改银行密码对话框*/
    private group_changeBankPassword:eui.Group;  
    private txt_CBP_oldPassword:eui.TextInput;         //旧密码
    private txt_CBP_newPassword:eui.TextInput;         //新密码
    private txt_CBP_cofirmNewPassword:eui.TextInput;   //确认新密码
    private btn_CBP_close:eui.Button;              //关闭对话框按钮
    private btn_CBP_ok:eui.Button;                 //确认修改按钮


    /*找回银行密码对话框*/
    private group_findPassword:eui.Group;      
    private txt_FP_phone:eui.TextInput;               //绑定的手机号
    private txt_FP_checkCode:eui.TextInput;           //输入验证码    
    private txt_FP_newPassword:eui.TextInput;         //新密码
    private txt_FP_confirmNewPassword:eui.TextInput;  //确认新密码
    private btn_FP_close:eui.Button;                //关闭对话框按钮
    private btn_FP_ok:eui.Button;                   //确认修改按钮
    private btn_FP_getCheckCode:eui.Button;         //获取验证码

    private Label_PassError:eui.Label;
    private Label_Deposit_Error:eui.Label;
    private Label_PWTips:eui.Label;
    private Input_Deposit:eui.EditableText;
    private InputPoints:eui.EditableText;
    private InputPassWord:eui.EditableText;

    private BottomInfo:eui.Group;


    protected init() {
        this.skinName = "bank";
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
