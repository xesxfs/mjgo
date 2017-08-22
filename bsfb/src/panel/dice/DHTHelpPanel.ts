class DHTHelpPanel extends KFPanel  {

	public Btn_Close:eui.Button;
    
	public Label_Title:eui.Label;
	public Label_Desc:eui.Label;
    

    protected init() {
        this.skinName = "Panel_DiceHelp";
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