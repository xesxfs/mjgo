class ClubItem extends  eui.ItemRenderer{
	private refuse_label:eui.Label;
	private MemberNum:eui.Label;
	private ClubLevel:eui.Label;
	private ClubName:eui.Label;
	private ClubID:eui.Label;
	private Btn_JoinClub:eui.Button;

	private ClubNotice:eui.Label;

	public constructor() {
		super();
	}

	protected dataChanged(){
		this.MemberNum.text = this.data.num+"/"+this.data.maxnum;;
		this.ClubLevel.text = this.data.level;
		this.ClubName.text = this.data.name;
		this.ClubID.text = this.data.id;
		// this.ClubNotice.text = this.data.notice; //点击后下拉显示公告
		if(this.data.VerifyType== "0"){
			this.Btn_JoinClub.visible = false;
			this.refuse_label.visible = true;
		}else if(this.data.VerifyType== "1"){
			this.Btn_JoinClub.visible = true;
			var lable = <eui.Label>this.Btn_JoinClub.getChildAt(1);
			lable.text = LocalizationMgr.getText(TipTexts.A1126);
			this.refuse_label.visible = false;
		}else if(this.data.VerifyType== "2"){
			this.Btn_JoinClub.visible = true;
			this.refuse_label.visible = false;
			var lable = <eui.Label>this.Btn_JoinClub.getChildAt(1);
			lable.text = LocalizationMgr.getText(TipTexts.A1127);
		}
	}

	protected childrenCreated(){
		this.Btn_JoinClub.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_JoinClubClick,this);
	}

	private Btn_JoinClubClick(){
		var js = {guildID: this.data.id};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.JOIN_CLUB,JSON.stringify(js));  
		KFControllerMgr.getCtl(PanelName.ClubPanel).setJoinType(this.data.VerifyType);
	}


}