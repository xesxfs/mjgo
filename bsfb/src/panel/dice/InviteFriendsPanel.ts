class InviteFriendsPanel extends KFPanel  {

	public Btn_Close:eui.Button;
    public Btn_Club:eui.Button;
    public Btn_Refresh:eui.Button;

    public List_Invite:eui.List;

    public Label_Null:eui.Label;

    protected init() {
        this.skinName = "Panel_InviteFriends";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}


class InvitelItem extends eui.ItemRenderer {

Label_UserID:eui.Label;
Label_NickName:eui.Label;
Label_InHall:eui.Label;
Label_Wait:eui.Label;

Btn_Invite:eui.Button;

    public constructor() {
        super();
        // this.setOnClickListener();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.setOnClickListener, this); 
    }


    protected dataChanged():void{
        let idata = this.data
        
        let userid =     idata[0];
        let nickName =   idata[1];
        let status =     idata[2];
        egret.log("userid: "+userid+" nickName: "+nickName+" status: "+status);
        let isRunning = status == "0";
        this.Label_UserID.text = userid;
        this.Label_NickName.text = nickName;
        this.Label_InHall.visible = isRunning;
        this.Label_Wait.visible = false;
        this.Btn_Invite.visible = !isRunning;
    }

    private InviteOnClick(event:egret.TouchEvent):void{
        console.log("点击邀请",this.data);
        let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "userid":this.Label_UserID.text, "diceMode":GlobalClass.DiceGameClass.gameMode});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.INVITEFREND_SEND,js);
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.dicegame_invitefriend);
    }

    protected setOnClickListener() {
        this.Btn_Invite.addEventListener(egret.TouchEvent.TOUCH_END,this.InviteOnClick,this);
    }

    protected removeOnClickListener() {
        this.Btn_Invite.removeEventListener(egret.TouchEvent.TOUCH_END,this.InviteOnClick,this);
    }
}