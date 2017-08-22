class ArenaOneItem extends  eui.ItemRenderer{
	private Sprite_IsHavePassword:eui.Image;
	private Label_ArenaName_Item:eui.Label;
	private Label_ArenaCount_Item:eui.Label;
	private Label_ArenaUserItem:eui.Label;
	private Label_ChallengeUserItem:eui.Label;
	private Btn_Challenge:eui.Button;

	public constructor() {
		super();
	}

	protected dataChanged(){
		this.Label_ArenaName_Item.text = this.data.Label_ArenaName2;
		this.Label_ArenaCount_Item.text = this.data.Label_ArenaCount2;
		this.Label_ArenaUserItem.text = CommonFuc.subString(this.data.Label_ArenaUser2,12,true);
		this.Label_ChallengeUserItem.text = this.data.Label_ChallengeUser2;
		this.Sprite_IsHavePassword.visible = true;
		if(this.data.Sprite_IsHavePassword=="0"){
			this.Sprite_IsHavePassword.visible = false;
		}

	}

	protected childrenCreated(){
		CommonFuc.AddClickEvent(this.Btn_Challenge,egret.TouchEvent.TOUCH_END,this.Btn_ChallengeClick,this);
	}

	private Btn_ChallengeClick(){
		GlobalClass.StoneClass.int_listindex = this.data._index;
		GlobalClass.StoneClass.str_loginID = GlobalClass.StoneClass.str_listData[GlobalClass.StoneClass.int_listindex][0];
		if(this.data.Sprite_IsHavePassword=="0"){//不需要密码
			NetEventMgr.getInstance().clientMsg(MsgID.Client.STONECHALLENGE,"0");
		}else{
			NetEventMgr.getInstance().clientMsg(MsgID.Client.STONECHALLENGE,"1");
		}
	}
}