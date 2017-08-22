class InviteSettingPanelController extends KFController  {
    protected mPanel:InviteSettingPanel;
    

    protected init(){
    	super.init();
        this.EventsList = [
        MsgID.DiceGame.QUERYDICEGAMEINVITE,
        MsgID.DiceGame.SETDICEGAMEINVITE,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        let js = JSON.stringify({"userid":GlobalClass.UserInfo.str_UserID});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.QUERYDICEGAMEINVITE,js);
    }

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.AddClickEvent(this.mPanel.CB_Invite,egret.Event.CHANGE,this.CBOnClick,this);
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.RemoveClickEvent(this.mPanel.CB_Invite,egret.Event.CHANGE,this.CBOnClick,this);
	}

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        this.mPanel.hide();
    }

    // 设置拒绝邀请
    private CBOnClick(event:egret.TouchEvent):void{
        console.log("设置拒绝邀请");
        let CB:eui.CheckBox = event.target;
        GlobalClass.DiceGameClass.bRefuseInviteMsg = CB.selected;
        let js = JSON.stringify({"userid":GlobalClass.UserInfo.str_UserID, "inviteConfig":CB.selected?"0":"1",});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.SETDICEGAMEINVITE,js);
            
    }   

        /// <summary>
        /// 设置是否接受邀请 420 
        /// 0：不接受邀请 1：接受邀请
        /// </summary>
        /// <param name="jsonData"></param>
    private on420_event(event: egret.Event):void{
        console.log("on420_event");
        let msg:MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        if (jd ["ret"] == "1") {
            //成功

        }else{//失败则提示失败原因
            let reasonType = jd["info"]["reasonType"];
            let reasonTypeDesc = DiceGameController.GetInstance().GetDescription(reasonType);
            KFControllerMgr.showTips(reasonTypeDesc);
            return;
        }
    }

        /// <summary>
        /// 查询是否接受邀请 421
        /// </summary>
        /// <param name="jsonData"></param>
    private on421_event(event: egret.Event):void{
        console.log("on421_event");
        let msg:MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        if (jd ["ret"] == "1") {
            //成功
            GlobalClass.DiceGameClass.bRefuseInviteMsg = !(jd["info"]["config"]==1);
            this.mPanel.CB_Invite.selected = GlobalClass.DiceGameClass.bRefuseInviteMsg;
        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }
    }

}