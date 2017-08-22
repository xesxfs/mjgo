class ClubPositionItem extends  eui.ItemRenderer{
	private Item_Position_pos:eui.Label;
	private Item_Position_Times:eui.Label;
	private Item_Position_Num:eui.Label;
	private Item_Position_Chosse:eui.CheckBox;

	public constructor() {
		super();
	}

	protected dataChanged(){
		this.Item_Position_pos.text = this.data.Lb_Position;
		this.Item_Position_Times.text = this.data.Lb_Times;
		this.Item_Position_Num.text = this.data.Lb_Num;
		if(this.data.toggle=="1"){
			this.Item_Position_Chosse.selected = true;
		}else{
			this.Item_Position_Chosse.selected = false;
		}
	}

	protected childrenCreated(){
		this.Item_Position_Chosse.addEventListener(egret.TouchEvent.TOUCH_END,this.toggleClick,this);
	}

	private toggleClick(){
		GlobalClass.ClubClass.str_PositionID = this.data.Index;
		GlobalClass.ClubClass.str_PositionSettingID = this.data.Index;
	}

}