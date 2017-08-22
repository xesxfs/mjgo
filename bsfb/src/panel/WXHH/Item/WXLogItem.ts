class WXLogItem extends eui.ItemRenderer {
	

	private Card_LabelGroup:eui.Group;

	private Label_Date:eui.Label;
	private Label_time:eui.Label;
	private Label_Result:eui.Label;
	private toggle:eui.Image;

	public constructor() {
		super();
		this.skinName = "WXLogItemSkin";
		this.childrenCreated
	}

	protected dataChanged(){
		this.Label_Date.text = this.data.date;
		this.Label_time.text = this.data.time;
		for(var i=0;i<5;i++){
			var lable = <eui.Label>this.Card_LabelGroup.getChildAt(i);
			lable.text = this.data["porker"+i];
			if(this.data["winType"]==i){
				this.toggle.visible = true;
				this.toggle.x = this.Card_LabelGroup.x+lable.x+45;
			}
		}
		var pre = "+";
		if(this.data["type"]==2){
			this.Label_Result.textColor = 0x00FF00;
		}else{
			pre = "";
			this.Label_Result.textColor = 0xFF0000;
		}
		this.Label_Result.text = pre+this.data.sum;
	}

	protected childrenCreated(){
		
	}

}