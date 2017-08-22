/**
 *
 * @author 
 *
 */
class MemberPanel extends KFPanel {

    private Toggle_VIP:eui.RadioButton;
    private Toggle_Sign:eui.RadioButton;
    private Btn_Close:eui.Button;
    private Btn_Receive:eui.Button;
    private Btn_RenewVIP:eui.Button;
    private Btn_BecomeVIP:eui.Button;

    private VIPPanel:eui.Group;
    private SignInPanel:eui.Group;
    private PrizePics:eui.Group;
    private PrizeLabels:eui.Group;
    private prizebgs:eui.Group;
    private VIPPrices:eui.Group;

    private Label_SignInInfo:eui.Label;
    private Label_VIPTimes:eui.Label;

    private Btn_VIPYear:eui.CheckBox;
    private Btn_VIPQuarter:eui.CheckBox;
    private Btn_VIPMonth:eui.CheckBox;

    protected init() {
        this.skinName = "Panel_Member";
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
