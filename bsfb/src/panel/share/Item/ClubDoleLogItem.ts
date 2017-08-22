class ClubDoleLogItem extends  eui.ItemRenderer{
	private resultTxt:eui.Label;
	private log_times:eui.Label;
	private Label_LogResult:eui.Label;

	private resultImg:eui.Image;

	public constructor() {
		super();
	}

	protected dataChanged(){
		this.log_times.text = this.data.time;
		if(this.data.action == "Donate"){
			this.Label_LogResult.text = this.data.nickName+"捐赠了" + this.data.point+"点";
			this.resultTxt.text = "捐";
			this.resultImg.source = RES.getRes("UI_small_btn_1_1");
		}else{
			this.Label_LogResult.text = this.data.nickName+"领取了" + this.data.point+"点";
			this.resultTxt.text = "领";
			this.resultImg.source = RES.getRes("UI_small_btn_1_2");
		}
	}

}