class ClubDoleInfoItem extends  eui.ItemRenderer{
	private Lb_Name:eui.Label;
	private Lb_EachGetPoint:eui.Label;
	private Lb_Times1:eui.Label;

	public constructor() {
		super();
	}

	protected dataChanged(){
		this.Lb_Name.text = this.data.Lb_Name;
		this.Lb_EachGetPoint.text = this.data.Lb_EachGetPoint;
		this.Lb_Times1.text = this.data.Lb_Times;
	}

}