class InviteFriendsPanelController extends KFController  {
    protected mPanel:InviteFriendsPanel;
    

    protected init(){
    	super.init();
        this.EventsList = [
        MsgID.DiceGame.INVITELIST_SEND,
        MsgID.DiceGame.INVITEFREND_SEND,
        MsgID.DiceGame.InviteChat,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.mPanel.List_Invite.itemRenderer = InvitelItem;
        this.RefreshBtnHandler(null);  
    }

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Club,egret.TouchEvent.TOUCH_END,this.InviteClubBtnHandler,this);
      this.AddClickEvent(this.mPanel.Btn_Refresh,egret.TouchEvent.TOUCH_END,this.RefreshBtnHandler,this);
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Club,egret.TouchEvent.TOUCH_END,this.InviteClubBtnHandler,this);
      this.RemoveClickEvent(this.mPanel.Btn_Refresh,egret.TouchEvent.TOUCH_END,this.RefreshBtnHandler,this);
    }

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        this.mPanel.hide();
    }

    /// <summary>
    /// 刷新按钮
    /// </summary>
    private RefreshBtnHandler(event:egret.TouchEvent):void{
        let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "userid":GlobalClass.UserInfo.str_UserID});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.INVITELIST_SEND,js);
            
    }

    /// <summary>
    /// 聊天发邀请
    /// </summary>
    private InviteClubBtnHandler(event:egret.TouchEvent):void{
        KFControllerMgr.showTips("邀请后，任意公会成员将会无需密码直接加入，是否确认邀请？ ", 0, 2,()=>{
            if (GlobalClass.ClubClass.ClubID == "0")
            {
                 KFControllerMgr.showTips("请先加入公会",0,2,()=>{
                    KFControllerMgr.getCtl(PanelName.ClubPanel).show();
                });               
            }else{
                let js = JSON.stringify({"userid":GlobalClass.UserInfo.str_UserID, "guildid":GlobalClass.ClubClass.ClubID, "rid":GlobalClass.DiceGameClass.RoomNum,});
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.InviteChat,js);

            }
        });
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.dicegame_club_invitefriend);

    }

    private on418_event(event: egret.Event):void{
        console.log("on418_event");
        let msg:MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        if (jd ["ret"] == "1") {
            //成功
            let list = jd["info"]["result"];
            this.mPanel.Label_Null.visible = list.length<=0;
            let collection = new eui.ArrayCollection();
            collection.source = list;
            this.mPanel.List_Invite.dataProvider = collection;

        }else{//失败则提示失败原因
            let reasonType = jd["info"]["reasonType"];
            let reasonTypeDesc = DiceGameController.GetInstance().GetDescription(reasonType);
            KFControllerMgr.showTips(reasonTypeDesc);
            return;
        }
    }

    private on419_event(event: egret.Event):void{
        console.log("on419_event");
        let msg:MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        if (jd ["ret"] == "1") {
            //成功
            KFControllerMgr.showTips("邀请信息已发送，请耐心等候。");    
        }else{//失败则提示失败原因
            let reasonType = jd["info"]["reasonType"];
            if (reasonType == "1002")
            {
                KFControllerMgr.showTips("邀请玩家已离开大话骰大厅，无法邀请");
            }
            else
            {
                let reasonTypeDesc = DiceGameController.GetInstance().GetDescription(reasonType);
                KFControllerMgr.showTips(reasonTypeDesc);
            }
            return;
        }
    }

    private on5107_event(event: egret.Event):void{
        console.log("on5107_event");
        let msg:MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        if (jd ["ret"] == "1") {
            //成功
            KFControllerMgr.showTips("发送邀请成功"); 
        }else{//失败则提示失败原因
            let errstr = jd["info"]["desc"];
            if(!errstr)
            {
                errstr = "发送邀请失败";
            }
            KFControllerMgr.showTips(errstr); 
            return;
        }
    }

}