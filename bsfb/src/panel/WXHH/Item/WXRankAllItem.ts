class WXRankAllItem extends eui.ItemRenderer {

	private Label_Rank:eui.Label;
	private Label_NickName:eui.Label;

	private medal:eui.Image;
	private bg:eui.Image;

	public constructor() {
		super();
		this.skinName = "WXRankAllItemSkin";
	}

	protected dataChanged(){
		this.Label_Rank.text = this.data.rank;
		this.Label_NickName.text = this.data.NickName;
		this.bg.visible = true;
		if(this.data.rank<4){
			this.medal.visible = true;
			this.medal.source = RES.getRes("jz_"+this.data.rank);
		}else{
			this.medal.visible = false;
		}
		if (this.data.rank % 2 == 0){
           	// this.bg.source = RES.getRes("UI——bg_2");
			this.bg.visible = false;
       }
	}

	protected childrenCreated(){
		this.bg.visible = true;
	}


}