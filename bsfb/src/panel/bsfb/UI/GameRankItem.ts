class GameRankItem extends eui.ItemRenderer{
	private Label_Time:eui.Label;
	private Label_Count:eui.Label;
	private Label_NickName:eui.Label;
	private bg:eui.Image;
	public constructor() {
		super();
		// this.skinName = "GameRankItemSkin";
	}

	protected dataChanged(){
		this.Label_Time.text = this.data.time;
		this.Label_Count.text = this.data.count;
		this.Label_NickName.text = this.data.nickname;
	}

	protected childrenCreated(){
		
		// CommonFuc.imgFilterHex(this.bg,0xFFD079FF);
	}
}