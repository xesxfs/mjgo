class InviteTitlePanel extends KFPanel  {

	public Btn_Close:eui.Button;
	public Btn_Copy:eui.Button;
	public Btn_Reject:eui.Button;
	public Btn_OK:eui.Button;

    public Label_ID:eui.Label;
    public Label_Model:eui.Label;
    public Label_Desc:eui.Label;

    public CB_Reject:eui.CheckBox;


    protected init() {
        this.skinName = "Panel_InviteTitle";
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