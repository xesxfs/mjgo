class JoinRoomPanelController extends KFController  {
    protected mPanel:JoinRoomPanel;
    

    protected init(){
    	super.init();
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来

    }

    public showAndInit(roomName, roomNum, ownerName){
        this.show();
        this.mPanel.Label_Num.text = roomNum;
        this.mPanel.Label_Name.text = roomName;
        this.mPanel.Label_PlayerName.text = ownerName;
    }

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Enter,egret.TouchEvent.TOUCH_END,this.EnterOnClick,this);
      this.AddClickEvent(this.mPanel.Input_Pwd,egret.Event.CHANGE,this.TextOnChange,this);
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Enter,egret.TouchEvent.TOUCH_END,this.EnterOnClick,this);
      this.RemoveClickEvent(this.mPanel.Input_Pwd,egret.Event.CHANGE,this.TextOnChange,this);
    }

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        this.mPanel.hide();
    }

    /// <summary>
    /// 加入房间
    /// </summary>
    private EnterOnClick(event:egret.TouchEvent):void{
        console.log("进入");
        let passWord = this.mPanel.Input_Pwd.text;
        let roomNum = this.mPanel.Label_Num.text;
        if (!passWord)
        {
            KFControllerMgr.showTips("密码不能为空");
        }
        else
        {
            KFControllerMgr.showTips("\n\n正在进入房间...");
            let js = JSON.stringify({"rid":roomNum, "id":GlobalClass.UserInfo.str_UserID, "passwd":new md5().hex_md5(passWord)});
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.JOINPRIVATEROOM_SEND,js);
        }
    }

    /// <summary>
    /// 关闭面板
    /// </summary>
    private TextOnChange(event:egret.TouchEvent):void{
        console.log("输入");
    }

}