class DHTSettingPanel extends KFPanel  {
    public radioGroup: eui.RadioButtonGroup;

	public Btn_Close:eui.Button;
    public Btn_OK:eui.Button;
    public Btn_model:eui.Button;
    public Btn_ChangePoint:eui.Button;
    public Btn_Kick:eui.Button;

    public text_RoomName:eui.TextInput;
    public text_pwd:eui.TextInput;
    public Label_point:eui.Label;
    public Label_mode:eui.Label;
    
    
    public RB_ShowRoom:eui.RadioButton;
    public RB_Club:eui.RadioButton;
    public RB_PrivateRoom:eui.RadioButton;

    public CB_pwd:eui.CheckBox;

    protected init() {
        this.skinName = "Panel_RoomSetting";
        super.init();
        this.radioGroup = new eui.RadioButtonGroup();
        this.RB_ShowRoom.group = this.radioGroup;
        this.RB_Club.group = this.radioGroup;
        this.RB_PrivateRoom.group = this.radioGroup;
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}