class DHTCreatRoomPanelController extends KFController  {
    protected mPanel:DHTCreatRoomPanel;
    

    protected init(){
    	super.init();
        this.EventsList = [
        MsgID.DiceGame.NEWCREATEROOM_SEND,];
	
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.mPanel.text_RoomName.text = GlobalClass.UserInfo.str_UserNickname + LocalizationMgr.getText("的房间");
        this.mPanel.text_RoomName.text = this.mPanel.text_RoomName.text.substr(0,10);
        GlobalClass.DiceGameClass.NewGuid_CreateRoom = Number(egret.localStorage.getItem("NewGuid_CreateRoom"));
        this.NewGuid(GlobalClass.DiceGameClass.NewGuid_CreateRoom);
        egret.Tween.get( this.mPanel.Image_Arrow, { loop:true} )
        .to( {scaleX:1.5,scaleY:1.5}, 500 )
        .to( {scaleX:1,scaleY:1}, 500 );
    }

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_END,this.OKOnClick,this);
      this.AddClickEvent(this.mPanel.CB_pwd,egret.Event.CHANGE,this.PwdOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_model,egret.TouchEvent.TOUCH_END,this.ModelOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_NewBieSkip,egret.TouchEvent.TOUCH_END,this.NewBieSkipHandler,this);
      this.AddClickEvent(this.mPanel.Image_NewGuid,egret.TouchEvent.TOUCH_END,this.OnClickNextGuid,this);     
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_END,this.OKOnClick,this);
      this.RemoveClickEvent(this.mPanel.CB_pwd,egret.Event.CHANGE,this.PwdOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_model,egret.TouchEvent.TOUCH_END,this.ModelOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_NewBieSkip,egret.TouchEvent.TOUCH_END,this.NewBieSkipHandler,this);
      this.RemoveClickEvent(this.mPanel.Image_NewGuid,egret.TouchEvent.TOUCH_END,this.OnClickNextGuid,this);           
    }

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        this.mPanel.hide();

    }

    private OKOnClick(event:egret.TouchEvent):void{
        console.log("开始");
        // KFControllerMgr.getCtl(PanelName.DHTGamePanel).show();

        // 检查房间名和密码合法性
        if(true)
        {
            let userid = GlobalClass.UserInfo.str_UserID;
            let roomName = this.mPanel.text_RoomName.text;
            let pwd = this.mPanel.text_pwd.text?this.mPanel.text_pwd.text:"";
            let mode = "1";
            let isPublish = this.mPanel.radioGroup.selection == this.mPanel.RB_ShowRoom ? "1" : "0";
            let isJustForClub = this.mPanel.radioGroup.selection == this.mPanel.RB_Club ? "1" : "0";
            let isQuickMode = this.mPanel.CB_Quick.selected  ? "1" : "0";

            GlobalClass.DiceGameClass.RoomName = roomName;
            GlobalClass.DiceGameClass.RoomPW = pwd;
            GlobalClass.DiceGameClass.gameMode = mode;
            GlobalClass.DiceGameClass.showMode = mode;

            let js = JSON.stringify({userid:userid,roomName:roomName,passwd:pwd==""?"":new md5().hex_md5(pwd),mode:mode,isPublic:isPublish,isJustForGuild:isJustForClub,isQuickMode:isQuickMode});
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.NEWCREATEROOM_SEND,js);  
            this.NewGuid(6);
        }
    }

    private on413_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log("进入大话骰游戏"+jd);
        if (jd ["ret"] == "1") {
        //成功
        let roomCode = jd["info"]["pwd"];       //房间密码
        GlobalClass.DiceGameClass.RoomNum = roomCode;
        
        let roomPoint = jd["info"]["betP"];     //设置房间对局点数
        GlobalClass.DiceGameClass.RoomScore = roomPoint;
        
        let protectPoint = jd["info"]["protectPoint"]; //保障点数
        GlobalClass.DiceGameClass.GuaranteePoint = protectPoint;

        GlobalClass.DiceGameClass.isRoomOwner = true;
        GlobalClass.DiceGameClass.ownerPoint = GlobalClass.UserInfo.str_Hall_totalScore;

        GlobalClass.DiceGameClass.waitTime = jd["info"]["waitTime"]; //等待时间
        GlobalClass.DiceGameClass.autoTime = jd["info"]["autoTime"];
        GlobalClass.DiceGameClass.gameMode = "1";

        KFControllerMgr.getCtl(PanelName.DHTRoomListPanel).NewGuid(4);
        GlobalClass.DiceGameClass.isQuickGame = jd["info"]["isQuickMode"] == 1;

        KFControllerMgr.getCtl(PanelName.DHTGamePanel).show();
        this.hide();

        }else{//失败则提示失败原因
            KFControllerMgr.showTips(DiceGameController.GetInstance().GetDescription(jd["info"]["reasonType"]));
            return;
        }

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


    public NewGuid(step)
    {
        step = Number(step);
        this.revertObj();
        switch(step)
        {
            case 0:
            step = 1;
            case 1:
            this.mPanel.Group_NewBie.visible = true;
            this.mPanel.Image_Arrow.visible = true;
            this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText(LocalizationMgr.getText("房间名称可以使用默认，也可以另行输入。"));
            this.mPanel.Group_Text.x = 475;
            this.mPanel.Group_Text.y = 191;
            this.mPanel.Image_Arrow.x = 453;
            this.mPanel.Image_Arrow.y = 206;
            this.mPanel.Image_Arrow.rotation = 180;
            this.upObj(this.mPanel.Label_1);
            this.upObj(this.mPanel.Group_RoomName_input);
            break;
            case 2:
            this.mPanel.Group_NewBie.visible = true;
            this.mPanel.Image_Arrow.visible = true;
            this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText(LocalizationMgr.getText("密码可以选择设置，也可以不设置，设置后需要密码才能加入房间。"));
            this.mPanel.Group_Text.x = 475;
            this.mPanel.Group_Text.y = 230;
            this.mPanel.Image_Arrow.x = 453;
            this.mPanel.Image_Arrow.y = 253;
            this.mPanel.Image_Arrow.rotation = 180;
            this.upObj(this.mPanel.Label_2);
            this.upObj(this.mPanel.Group_PassWordinput);
            break;
            case 3:
            this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText(LocalizationMgr.getText("公开显示为显示在所有人房间列表中，仅对公会成员显示为显示在公会成员房间列表中。"));
            this.mPanel.Group_NewBie.visible = true;
            this.mPanel.Image_Arrow.visible = true;
            this.mPanel.Group_Text.x = 396;
            this.mPanel.Group_Text.y = 335;
            this.mPanel.Image_Arrow.x = 372;
            this.mPanel.Image_Arrow.y = 349;
            this.mPanel.Image_Arrow.rotation = 180;
            this.upObj(this.mPanel.Label_4);
            this.upObj(this.mPanel.Label_5);
            this.upObj(this.mPanel.Label_6);
            this.upObj(this.mPanel.RB_ShowRoom);
            this.upObj(this.mPanel.RB_Club);
            this.upObj(this.mPanel.RB_PrivateRoom);
            break;
            case 4:
            this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText(LocalizationMgr.getText("私密房间为只能精确搜索房间号才显示的房间"));
            this.mPanel.Group_NewBie.visible = true;
            this.mPanel.Image_Arrow.visible = true;
            this.mPanel.Group_Text.x = 396;
            this.mPanel.Group_Text.y = 335;
            this.mPanel.Image_Arrow.x = 372;
            this.mPanel.Image_Arrow.y = 349;
            this.mPanel.Image_Arrow.rotation = 180;
            this.upObj(this.mPanel.Label_4);
            this.upObj(this.mPanel.Label_5);
            this.upObj(this.mPanel.Label_6);
            this.upObj(this.mPanel.RB_ShowRoom);
            this.upObj(this.mPanel.RB_Club);
            this.upObj(this.mPanel.RB_PrivateRoom);
            break;
            case 5:
            this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText(LocalizationMgr.getText("现在开始创建房间吧。"));
            this.mPanel.Group_NewBie.visible = true;
            this.mPanel.Image_Arrow.visible = true;
            this.mPanel.Group_Text.x = 476;
            this.mPanel.Group_Text.y = 350;
            this.mPanel.Image_Arrow.x = 452;
            this.mPanel.Image_Arrow.y = 396;
            this.mPanel.Image_Arrow.rotation = 0;
            this.upObj(this.mPanel.Btn_OK);
            break;
            default:
            step = 6;
            this.mPanel.Group_NewBie.visible = false;
        }
        egret.localStorage.setItem("NewGuid_CreateRoom",step.toString());        
    }

    private objList = []
    private upObj(obj:egret.DisplayObject){
        this.objList.push(obj,obj.parent,obj.parent.getChildIndex(obj));
        obj.parent.removeChild(obj);
        this.mPanel.Group_NewBie.addChild(obj);
    }

    private revertObj(){
        for(let i = 0 ; i < this.objList.length; i = i + 3){
            this.mPanel.Group_NewBie.removeChild(this.objList[i]);
            this.objList[i+1].addChildAt(this.objList[i],this.objList[i+2]);
        }
        this.objList = [];
    }

    ///// <summary>
    ///// 跳过新手引导
    ///// </summary>
    public NewBieSkipHandler(event:egret.TouchEvent):void{
        console.log("跳过新手引导");
        this.NewGuid(6);
        GlobalClass.DiceGameClass.NewGuid_CreateRoom = 6;
        egret.localStorage.setItem("NewGuid_CreateRoom",GlobalClass.DiceGameClass.NewGuid_CreateRoom.toString());
    }

    /// <summary>
    /// 下一步引导
    /// </summary>
    /// <param name="obj"></param>
    public OnClickNextGuid(event:egret.TouchEvent)
    {
        this.NewGuid(++GlobalClass.DiceGameClass.NewGuid_CreateRoom);
    }


}