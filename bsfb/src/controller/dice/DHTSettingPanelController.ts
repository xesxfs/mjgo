class DHTSettingPanelController extends KFController  {
    protected mPanel:DHTSettingPanel;
    

    protected init(){
    	super.init();
        this.EventsList = [
            MsgID.DiceGame.QUEARYROOMINFO_SEND,
            MsgID.DiceGame.SETROOMINFO_SEND,
            MsgID.DiceGame.KICKPLAYER_SEND,
            MsgID.DiceGame.PointSetting,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.QUEARYROOMINFO_SEND,js);
        this.SetModifyBtnStatus();
    }

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_END,this.OKOnClick,this);
      this.AddClickEvent(this.mPanel.CB_pwd,egret.Event.CHANGE,this.PwdOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_model,egret.TouchEvent.TOUCH_END,this.ModelOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_ChangePoint,egret.TouchEvent.TOUCH_END,this.ChangeOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Kick,egret.TouchEvent.TOUCH_END,this.KickOnClick,this);
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_END,this.OKOnClick,this);
      this.RemoveClickEvent(this.mPanel.CB_pwd,egret.Event.CHANGE,this.PwdOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_model,egret.TouchEvent.TOUCH_END,this.ModelOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_ChangePoint,egret.TouchEvent.TOUCH_END,this.ChangeOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Kick,egret.TouchEvent.TOUCH_END,this.KickOnClick,this);
    }

        /// <summary>
        /// 获取房间信息处理函数 415
        /// </summary>
    private on415_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log("获取房间信息处理函数"+jd);
        if (jd ["ret"] == "1") {
        //成功
            let data = jd["info"]["result"];
            let roomNum = data[0];//房间号
            let roomName = data[1];
            let is_has_passwd = data[2];
            let diceMode = data[3];
            let prize = data[4];
            let is_has_challenger = data[5];
            let isPublic = data[6];
            let isJustForGuild = data[7];
            let isQuickMode = data[8];
            let newP = data[9];
            egret.log("roomNumber: " + roomNum + " roomName: " + roomName + " is_has_passwd: " + is_has_passwd + " diceMode: " + diceMode + " prize: " + prize + " is_has_challenger: " + is_has_challenger +
                        "isPublic: " + isPublic + " isJustForGuild: " + isJustForGuild + " isQuickMode: "+isQuickMode);
            //save
            GlobalClass.DiceGameClass.RoomName = roomName;
            GlobalClass.DiceGameClass.RoomNum = roomNum;
            GlobalClass.DiceGameClass.gameMode = diceMode;
            if (isPublic == "1") 
            {
                GlobalClass.DiceGameClass.showMode = "1";
            }
            else if(isJustForGuild=="1")
            {
                GlobalClass.DiceGameClass.showMode = "2";
            }
            else
            {
                GlobalClass.DiceGameClass.showMode = "0";
            }
            this.mPanel.text_RoomName.text = roomName;
            this.mPanel.text_pwd.text = "";
            this.mPanel.Label_point.text = GlobalClass.DiceGameClass.RoomScore;
            // SetGameMode(GameModel);
            if(GlobalClass.DiceGameClass.showMode == "0"){
                this.mPanel.RB_PrivateRoom.selected = true;
            }else if(GlobalClass.DiceGameClass.showMode == "1"){
                this.mPanel.RB_ShowRoom.selected = true;
            }else if(GlobalClass.DiceGameClass.showMode == "2"){
                this.mPanel.RB_Club.selected = true;
            }
            this.mPanel.Label_point.text = newP;

        }else{//失败则提示失败原因
            let reasonType = jd["info"]["reasonType"];
            let reasonTypeDesc = DiceGameController.GetInstance().GetDescription(reasonType);
            KFControllerMgr.showTips(reasonTypeDesc);
            return;
        }

    }


        /// <summary>
        /// 保存房间修改信息 416
        /// </summary>
    private on416_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log("保存房间修改信息"+jd);
        if (jd ["ret"] == "1") {
            KFControllerMgr.showTips("修改成功!");
            this.hide();
            egret.log("修改房间信息: "+GlobalClass.DiceGameClass.RoomName);
            (<DHTGamePanelController>KFControllerMgr.getCtl(PanelName.DHTGamePanel)).SetRoomName(GlobalClass.DiceGameClass.RoomName);
            GlobalClass.DiceGameClass.RoomScore = this.mPanel.Label_point.text;
            (<DHTGamePanelController>KFControllerMgr.getCtl(PanelName.DHTGamePanel)).SetRoomPoints(this.mPanel.Label_point.text);

        }else{//失败则提示失败原因
            let reasonType = jd["info"]["reasonType"];
            let reasonTypeDesc = DiceGameController.GetInstance().GetDescription(reasonType);
            KFControllerMgr.showTips(reasonTypeDesc);
            return;
        }

    }


        /// <summary>
        /// 踢出挑战者 417
        /// </summary>
        /// <param name="jsonData"></param>
    private on417_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log("踢出挑战者"+jd);
        if (jd ["ret"] == "1") {
        //成功
            this.hide();
            KFControllerMgr.showTips("踢出成功!");
        }else{//失败则提示失败原因
            let reasonType = jd["info"]["reasonType"];
            let reasonTypeDesc = DiceGameController.GetInstance().GetDescription(reasonType);
            KFControllerMgr.showTips(reasonTypeDesc);
            return;
        }

    }

    public SetModifyBtnStatus()
    {
        if (GlobalClass.DiceGameClass.gameMode == "1")
        {
            egret.log("owner is ready: " + GlobalClass.DiceGameClass.ownerIsReady + " opponent is ready: " + GlobalClass.DiceGameClass.opponentIsReady);
            if (GlobalClass.DiceGameClass.opponentIsJoin && GlobalClass.DiceGameClass.ownerIsReady == "0" && GlobalClass.DiceGameClass.opponentIsReady == "0")
            {
                this.enableBut(this.mPanel.Btn_ChangePoint);
            }
            else
            {
                this.disableBut(this.mPanel.Btn_ChangePoint);
            }
        }
        else if (GlobalClass.DiceGameClass.gameMode == "2")
        {
            this.disableBut(this.mPanel.Btn_ChangePoint);
        }
    }

    //修改按钮开关
    private on492_event(event: egret.Event): void {
        let msg = <boolean>event.data;
        console.log("修改按钮开关"+msg);
        //成功
        
        if (GlobalClass.DiceGameClass.gameMode == "1")
        {
            this.switchBtn(this.mPanel.Btn_ChangePoint,msg);
        }
        else if (GlobalClass.DiceGameClass.gameMode == "2")
        {
            this.disableBut(this.mPanel.Btn_ChangePoint);
        }
    }

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        this.mPanel.hide();
    }


    private OKOnClick(event:egret.TouchEvent):void{
        console.log("保存");
        // KFControllerMgr.getCtl(PanelName.DHTGamePanel).show();

        // 检查房间名和密码合法性
        if(true)
        {
            let roomId = GlobalClass.DiceGameClass.RoomNum;
            let userid = GlobalClass.UserInfo.str_UserID;
            let roomName = this.mPanel.text_RoomName.text;
            let passwd = this.mPanel.text_pwd.text;
            let mode = this.GetGameMode().toString();
            let isPublish = this.mPanel.radioGroup.selection == this.mPanel.RB_ShowRoom ? "1" : "0";
            let isJustForClubDole = this.mPanel.radioGroup.selection == this.mPanel.RB_Club ? "1" : "0";
            let isQuickMode = "0";
            GlobalClass.DiceGameClass.RoomNum = roomId;
            GlobalClass.DiceGameClass.RoomName = roomName;
            GlobalClass.DiceGameClass.RoomPW = passwd;
            GlobalClass.DiceGameClass.gameMode = mode;
            if (isPublish == "1")
            {
                GlobalClass.DiceGameClass.showMode = "1";
            }
            else if (isJustForClubDole == "2")
            {
                GlobalClass.DiceGameClass.showMode = "2";
            }
            else
            {
                GlobalClass.DiceGameClass.showMode = "0";
            }

            let js = JSON.stringify({"rid":roomId, "userid":userid, "roomName":roomName, "passwd":passwd==""?"":new md5().hex_md5(passwd), "mode":mode, "isPublic":isPublish, "isJustForGuild":isJustForClubDole, "isQuickMode":isQuickMode, "newP":this.mPanel.Label_point.text, });
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.SETROOMINFO_SEND,js);  
        }
    }

    private GetGameMode()
    {
        let mode = this.mPanel.Label_mode.text;
        if (mode == "传统模式") return 1;
        else if (mode == "最大模式") return 2;
        else if (mode == "经典大话骰") return 3;
        return 1;
    }

    private PwdOnClick(event:egret.TouchEvent):void{
        console.log("密码");
        ///获得当前复选框
        var checkBox:eui.CheckBox = <eui.CheckBox>event.target;
        if (checkBox.selected === true ) {
            this.mPanel.text_pwd.displayAsPassword =true;
        } else {
            this.mPanel.text_pwd.displayAsPassword =false;
        }
    }

    private ModelOnClick(event:egret.TouchEvent):void{
        console.log("模式");
        KFControllerMgr.showTips("传统模式：每局由房主决定当局点数是多少，1不可当其它骰子使用。\n\n",0,1,null,"模式说明"); 
    }

    private ChangeOnClick(event:egret.TouchEvent):void{
        console.log("修改");
        KFControllerMgr.getCtl(PanelName.PointSettingPanel).show();
    }

    private KickOnClick(event:egret.TouchEvent):void{
        console.log("踢出");
        KFControllerMgr.showTips("确定踢出对手？",0, 2,()=>{
            let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "userid":GlobalClass.UserInfo.str_UserID,});
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.KICKPLAYER_SEND,js);
            
        })
    }

}