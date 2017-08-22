class PointSettingPanel extends KFPanel  {

	public Btn_Close:eui.Button;
	public Btn_BS:eui.Button;
	public Btn_Wan:eui.Button;
	public Btn_OK:eui.Button;

    public PointSetting_0:eui.Button;
    public PointSetting_1:eui.Button;
    public PointSetting_2:eui.Button;
    public PointSetting_3:eui.Button;
    public PointSetting_4:eui.Button;
    public PointSetting_5:eui.Button;
    public PointSetting_6:eui.Button;
    public PointSetting_7:eui.Button;
    public PointSetting_8:eui.Button;
    public PointSetting_9:eui.Button;

    public Label_Num:eui.Label;

    protected init() {
        this.skinName = "Panel_PointSetting";
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