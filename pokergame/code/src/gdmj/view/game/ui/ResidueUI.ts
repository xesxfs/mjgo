class ResidueUI extends eui.Component{
	public constructor() {
		super();
	}
	private  remainLab:eui.BitmapLabel;
	public setRemainCard(nCount:number){
		this.remainLab.text =nCount.toString();

	}
}