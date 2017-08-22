class InviteSettingPanel extends KFPanel  {

	public Btn_Close:eui.Button;
    public CB_Invite:eui.CheckBox;

    protected init() {
        this.skinName = "Panel_InviteSetting";
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