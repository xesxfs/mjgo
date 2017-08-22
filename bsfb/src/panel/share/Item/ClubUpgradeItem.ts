class ClubUpgradeItem extends  eui.ItemRenderer{
	private Item_Upgrade_Name:eui.Label;
	private Item_Upgrade_UpgradeNum:eui.Label;
	private Item_Upgrade_EachGetPoint:eui.Label;
	private Item_Upgrade_Times:eui.Label;

	public constructor() {
		super();
	}

	protected dataChanged(){
		this.Item_Upgrade_Name.text = this.data.Lb_UpgradeName;
		this.Item_Upgrade_UpgradeNum.text = this.data.Lb_UpgradeNum;
		this.Item_Upgrade_EachGetPoint.text = this.data.Lb_EachGetPoint;
		this.Item_Upgrade_Times.text = this.data.Lb_Times;
	}

}