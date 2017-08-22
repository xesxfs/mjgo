class JoinRoomPanel extends KFPanel  {

	public Btn_Close:eui.Button;
    public Btn_Enter:eui.Button;
    public Input_Pwd:eui.TextInput;

    public Label_Num:eui.Label;
    public Label_Name:eui.Label;
    public Label_PlayerName:eui.Label;
    

    protected init() {
        this.skinName = "DHT_RoomList_JoinRoom";
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