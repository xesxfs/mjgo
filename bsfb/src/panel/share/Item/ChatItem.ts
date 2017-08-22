class ChatItem extends  eui.ItemRenderer{
	private nickname:eui.Label;
	private time:eui.Label;
	private content:eui.Label;
	private Btn_join:eui.Button;
	private vipIcon:eui.Image;

	private ClubNotice:eui.Label;

	public constructor() {
		super();
	}

	protected dataChanged(){
		var isSystem = false;
		var a:string;
		if(CommonFuc.strContains(this.data.name,"系统消息")){
			isSystem = true;
			this.nickname.textFlow = CommonFuc.parseColorText(this.data.name);
		}else{
			this.nickname.text = CommonFuc.subString(this.data.name,12,true);
		}
		this.nickname.textFlow
		this.time.text = this.data.time;
		if(this.data.type==3){ //type
			this.Btn_join.visible = true;
			this.content.text = LocalizationMgr.getText("大话骰求对手，速来一战！");
		}else{
			this.Btn_join.visible = false;
			if(isSystem == true){
				this.content.textFlow = CommonFuc.parseColorText(this.data.content+"[-]");
			}else{
				this.content.text = this.data.content;
			}
			
		}
		if(this.data.VIPLevel>0){
			this.vipIcon.visible = true;
		}else{
			this.vipIcon.visible = false;
		}
	}

	protected childrenCreated(){
		this.Btn_join.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_joinClick,this);
	}

	private Btn_joinClick(){
		var diceNum= Number(this.data.name)
		var sceneName = KFSceneManager.getInstance().getRuningSceneName();
		if (sceneName=="STONEScene"|| sceneName=="DHSScene" || sceneName=="HallScene"|| sceneName=="WXHHScene"||sceneName=="BSFBScene"){
                var inviterID1 = this.data.userid;
                var roomid1= this.data.roomid;
				var js = {userid: GlobalClass.UserInfo.str_UserID,inviterID:inviterID1+"",roomid:roomid1+""};
            	WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.Msg425,JSON.stringify(js));  
 
		}else if (KFSceneManager.getInstance().getRuningSceneName()=="DHSScene") {
            KFControllerMgr.showTips("连环夺宝游戏中，无法加入房间。",0,1);
		}else{
            KFControllerMgr.showTips("当前场景不能进大话骰",0,1);
		}
	}


}