class InviteTitlePanelController extends KFController  {
    protected mPanel:InviteTitlePanel;
    
    private mRoomNum;
    private mRoomPW;

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

    public InitAndShow(inviteName,roomNum, roomPW,gameModel){
        this.show()
        this.mRoomNum = roomNum;
        this.mRoomPW = roomPW;
        this.mPanel.Label_Desc.text = LocalizationMgr.getText("公会成员{0}邀请您加入大话骰房间进行对战，是否前往？",inviteName);
        this.mPanel.Label_ID.text = roomNum;

        if (gameModel == "1")
        {
            this.mPanel.Label_Model.text = LocalizationMgr.getText("传统模式");
        }
        else if (gameModel == "2")
        {
            this.mPanel.Label_Model.text = LocalizationMgr.getText("最大模式");
        }
        else if (gameModel == "3")
        {
            this.mPanel.Label_Model.text= LocalizationMgr.getText("经典大话骰");
        }
    }

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Copy,egret.TouchEvent.TOUCH_END,this.CopyOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Reject,egret.TouchEvent.TOUCH_END,this.RejectOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_END,this.OKOnClick,this);
      this.AddClickEvent(this.mPanel.CB_Reject,egret.Event.CHANGE,this.CBOnClick,this);
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Copy,egret.TouchEvent.TOUCH_END,this.CopyOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Reject,egret.TouchEvent.TOUCH_END,this.RejectOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_END,this.OKOnClick,this);
      this.RemoveClickEvent(this.mPanel.CB_Reject,egret.Event.CHANGE,this.CBOnClick,this);
    }

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        this.hide();
    }

	// 复制
    private CopyOnClick(event:egret.TouchEvent):void{
        console.log("复制");
    }
	// 拒绝
    private RejectOnClick(event:egret.TouchEvent):void{
        console.log("拒绝");
        this.hide()
    }
	// 前往
    private OKOnClick(event:egret.TouchEvent):void{
        console.log("前往");
        let js = JSON.stringify({"rid":this.mRoomNum, "id":GlobalClass.UserInfo.str_UserID, "passwd":this.mRoomPW});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.JOINPRIVATEROOM_SEND,js);
        this.hide();
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
            this.mPanel.CB_Reject.selected = GlobalClass.DiceGameClass.bRefuseInviteMsg;
        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }
    }
    

}