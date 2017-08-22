class ClubJoinItem extends  eui.ItemRenderer{
	private Lb_ID2:eui.Label;
	private Lb_NickName2:eui.Label;
	private Lb_Time:eui.Label;
	private Lb_Tips:eui.Label;
	private Btn_Yes:eui.Button;
	private Btn_No:eui.Button;
	private Tg_Join:eui.CheckBox;
	public constructor() {
		super();
	}

	protected dataChanged(){
		this.Lb_ID2.text = this.data.Lb_ID;
		this.Lb_NickName2.text = this.data.Lb_NickName;
		this.Lb_Time.text = this.data.Lb_LastOnTime;
		if(this.data.validate == 0) {
            this.Btn_No.visible = true;
            this.Btn_Yes.visible = true;
            this.Tg_Join.visible = true;
            this.Lb_Tips.visible = false;
		}else if(this.data.validate == 1) {
            this.Btn_No.visible = false;
            this.Btn_Yes.visible = false;
            this.Tg_Join.visible = false;
            this.Lb_Tips.visible = true;
            this.Lb_Tips.text = LocalizationMgr.getText(TipTexts.A1136);
		}else if(this.data.validate == 2) {
            this.Btn_No.visible = false;
            this.Btn_Yes.visible = false;
            this.Tg_Join.visible = false;
            this.Lb_Tips.visible = true;
            this.Lb_Tips.text = LocalizationMgr.getText(TipTexts.A1137);
		} 
	}

	protected childrenCreated(){
		this.Btn_Yes.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_YesClick,this);
		this.Btn_No.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_NoClick,this);
		this.Tg_Join.addEventListener(egret.TouchEvent.TOUCH_END,this.Tg_JoinClick,this);
	}

	private Btn_YesClick(){
		var js = {guildID: GlobalClass.ClubClass.ClubID,applyID:this.data.applyID,isAgree:"1"};
        	WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.MEMBER_APPLY_CLUB,JSON.stringify(js)); 
	}
	private Btn_NoClick(){
		var js = {guildID: GlobalClass.ClubClass.ClubID,applyID:this.data.applyID,isAgree:"0"};
        	WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.MEMBER_APPLY_CLUB,JSON.stringify(js)); 
	}
	private Tg_JoinClick(){

	}

}