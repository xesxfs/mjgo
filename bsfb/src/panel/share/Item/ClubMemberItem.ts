class ClubMemberItem extends  eui.ItemRenderer{
	private Lb_ID:eui.Label;
	private Lb_NickName:eui.Label;
	private Lb_Position:eui.Label;
	private Lb_Donated:eui.Label;
	private Lb_Received:eui.Label;
	private Lb_LastOnTime:eui.Label;
	private Lb_Modify:eui.Label
	private Btn_Modify:eui.Button;
	private Lb_Index:eui.Label;
	private memberInfoBG:eui.Image;
	public constructor() {
		super();
	}

	protected dataChanged(){
		this.Lb_ID.text = this.data.Lb_ID;
		this.Lb_NickName.text = CommonFuc.subString(this.data.Lb_NickName,8,true);
		this.Lb_Position.text = this.data.Lb_Position;
		this.Lb_LastOnTime.text = this.data.Lb_LastOnTime;
		this.Lb_Donated.text = this.data.Lb_Donated;
		this.Lb_Received.text = this.data.Lb_Received;
		this.butOri();
		if(this.data.Lb_Modify=="1"){
			this.Lb_Modify.visible = true;
		}else{
			this.Lb_Modify.visible = false;
		}
		if(this.data.Btn_Modify=="1"){
			this.Btn_Modify.visible = true;
		}else{	
			this.Btn_Modify.visible = false;
		}
		if(this.data.Lb_ID == GlobalClass.UserInfo.str_UserID){
			this.butBright();
		}
		
	}

	protected childrenCreated(){
		this.Btn_Modify.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_ModifyClick,this);
	}

	private Btn_ModifyClick(){
		var indexInfoArry =this.data.Lb_Index.split("#");
        GlobalClass.ClubClass.str_PositionSettingID = indexInfoArry[0];
		GlobalClass.ClubClass.str_PositionOriginID = indexInfoArry[0];
        GlobalClass.ClubClass.str_MemberSettingID = indexInfoArry[1];
		NetEventMgr.getInstance().clientMsg(MsgID.Client.ShowPostionSettingPanel,"");
	}

	private butBright(){
		this.memberInfoBG.source = RES.getRes("Input_BG5");
		// CommonFuc.imgFilterFloat(this.memberInfoBG,[0.6,0.16,0.16,0.8]);
    }

	private butOri(){
		this.memberInfoBG.source = RES.getRes("Input_BG3");
        CommonFuc.imgFilterFloat(this.memberInfoBG,[1,1,1,1]);
    }



	
}