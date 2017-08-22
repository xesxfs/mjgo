class DHTCreatRoomPanel extends KFPanel  {

    public radioGroup: eui.RadioButtonGroup;

	public Btn_Close:eui.Button;
    public Btn_OK:eui.Button;
    public Btn_model:eui.Button;

    public text_RoomName:eui.TextInput;
    public text_pwd:eui.TextInput;
    
    public RB_ShowRoom:eui.RadioButton;
    public RB_Club:eui.RadioButton;
    public RB_PrivateRoom:eui.RadioButton;

    public CB_Quick:eui.CheckBox;
    public CB_pwd:eui.CheckBox;
    
    public Group_NewBie:eui.Group;
    public Group_Text:eui.Group;
    public Image_Arrow:eui.Image;
    public Image_NewGuid:eui.Image;
    public Btn_NewBieSkip:eui.Button;
    public Label_NewBie:eui.Label;

    public Label_1:eui.Label;
    public Group_RoomName_input:eui.Group;
    public Label_2:eui.Label;
    public Group_PassWordinput:eui.Group;
    public Label_3:eui.Label;
    public Group_PopModeList:eui.Group;
    public Label_4:eui.Label;
    public Label_5:eui.Label;
    public Label_6:eui.Label;

    protected init() {
        this.skinName = "DHTRoomListCreateRoom";
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