class DHTRoomListPanelController extends KFController {
	
    protected mPanel:DHTRoomListPanel;
    
    private _roomData;
    private _pageInfo;

    protected init(){
    	super.init();
        this._pageInfo = {"itemCout" : 7,"nowPage" : 1};
        this._roomData = [];
        this.EventsList = [
        MsgID.DiceGame.SEARCHROOM_SEND,
        MsgID.DiceGame.GOTOHALL_SEND,
        MsgID.USER.UPDATE_MONEY,
        // MsgID.DiceGame.BEGIN_SEND,
        MsgID.DiceGame.JOINPRIVATEROOM_SEND,
        MsgID.DiceGame.Msg425,
        MsgID.DiceGame.INVITEFRIEND_RESPONSE,
        MsgID.Client.QuitDiceGame,
        MsgID.Hall.Msg_1020,
        ];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.mPanel.stage.scaleMode = egret.StageScaleMode.NO_BORDER;
        this.RefreshData();
        GlobalClass.DiceGameClass.NewGuid_CreateListPanel = Number(egret.localStorage.getItem("NewGuid_CreateListPanel"));
        this.NewGuid(GlobalClass.DiceGameClass.NewGuid_CreateListPanel);
        egret.Tween.get( this.mPanel.Image_Arrow, { loop:true} )
        .to( {scaleX:1.5,scaleY:1.5}, 500 )
        .to( {scaleX:1,scaleY:1}, 500 );

        // let dataArr = [LocalizationMgr.getText("显示所有房间"),LocalizationMgr.getText("显示可加入房间"),LocalizationMgr.getText("显示公会房间")];
        // this.mPanel.DDB_List.setData(dataArr);
        // this.mPanel.DDB_List.text = LocalizationMgr.getText("显示所有房间");
    }

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.CreateRoomBtn,egret.TouchEvent.TOUCH_END,this.CreateRoomOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Help,egret.TouchEvent.TOUCH_END,this.HelpOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Refresh,egret.TouchEvent.TOUCH_END,this.Btn_RefreshClick,this);
      this.AddClickEvent(this.mPanel.Btn_FirstPage,egret.TouchEvent.TOUCH_END,this.FirstPageOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_EndPage,egret.TouchEvent.TOUCH_END,this.EndPageOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_back,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_PageUp,egret.TouchEvent.TOUCH_END,this.PageUpOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_PageDown,egret.TouchEvent.TOUCH_END,this.PageDownOnClick,this);
      this.AddClickEvent(this.mPanel.RoomNum,egret.Event.CHANGE,this.SearchOnChange,this);
      this.AddClickEvent(this.mPanel.Btn_NewBieSkip,egret.TouchEvent.TOUCH_END,this.NewBieSkipHandler,this);
      this.AddClickEvent(this.mPanel.Image_NewGuid,egret.TouchEvent.TOUCH_END,this.OnClickNextGuid,this);   
      this.AddClickEvent(this.mPanel.Btn_Setting,egret.TouchEvent.TOUCH_END,this.SettingOnClick,this);   

      this.mPanel.DDB_List.addChangeEvent(this.DDBListClick,this);  
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.CreateRoomBtn,egret.TouchEvent.TOUCH_END,this.CreateRoomOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Refresh,egret.TouchEvent.TOUCH_END,this.Btn_RefreshClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Help,egret.TouchEvent.TOUCH_END,this.HelpOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_FirstPage,egret.TouchEvent.TOUCH_END,this.FirstPageOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_EndPage,egret.TouchEvent.TOUCH_END,this.EndPageOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_back,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_PageUp,egret.TouchEvent.TOUCH_END,this.PageUpOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_PageDown,egret.TouchEvent.TOUCH_END,this.PageDownOnClick,this);
      this.RemoveClickEvent(this.mPanel.RoomNum,egret.Event.CHANGE,this.SearchOnChange,this);
      this.RemoveClickEvent(this.mPanel.Btn_NewBieSkip,egret.TouchEvent.TOUCH_END,this.NewBieSkipHandler,this);
      this.RemoveClickEvent(this.mPanel.Image_NewGuid,egret.TouchEvent.TOUCH_END,this.OnClickNextGuid,this);           
      this.RemoveClickEvent(this.mPanel.Btn_Setting,egret.TouchEvent.TOUCH_END,this.SettingOnClick,this);   
    }

    private Btn_RefreshClick(){
        this.RefreshData();
    }

    // 创建房间
    private CreateRoomOnClick(event:egret.TouchEvent):void{
        console.log("创建房间");
        KFControllerMgr.getCtl(PanelName.DHTCreatRoomPanel).show();
    }

    // 帮助
    private HelpOnClick(event:egret.TouchEvent):void{
        console.log("帮助");
        KFControllerMgr.getCtl(PanelName.DHTHelpPanel).show();
    }

    // 返回
    public BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "id":GlobalClass.UserInfo.str_UserID, "passwd":""});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.GOTOHALL_SEND,js);
            
    }

    // 首页
    private FirstPageOnClick(event:egret.TouchEvent):void{
        console.log("首页");
        this._pageInfo.nowPage = 1;
        this.SetPageData();
    }

    // 末页
    private EndPageOnClick(event:egret.TouchEvent):void{
        console.log("末页");
        this._pageInfo.nowPage = Math.ceil(this._roomData.length/this._pageInfo.itemCout);
        this.SetPageData();
    }

    // 上页
    private PageUpOnClick(event:egret.TouchEvent):void{
        console.log("上页");
        this._pageInfo.nowPage -= 1;
        this.SetPageData();
    }

    // 下页
    private PageDownOnClick(event:egret.TouchEvent):void{
        console.log("下页");
        this._pageInfo.nowPage += 1;
        this.SetPageData();
    }

    // 搜索输入
    private SearchOnChange(event:egret.TouchEvent):void{
        console.log("我找");
        this.RefreshData();
    }    
    
    // 设置
    private SettingOnClick(event:egret.TouchEvent):void{
        console.log("设置");
        KFControllerMgr.getCtl(PanelName.InviteSettingPanel).show();
    }

    private on414_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
        //成功
            this.SearchRoomMsg(jd);
        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }

    }

    ///// <summary>
    ///// 搜索房间消息处理函数 414
    ///// </summary>
    ///// <param name="jsonData"></param>
    /// <summary>
    /// 初始化房间数据列表
    /// </summary>
    private SearchRoomMsg(jsonData)
    {
        // let jd = ' {"info": {"result": [["100001", "\u623f\u95f42", 3061626, "A\u73af\u740381078081", 1, 50000, 0, 1], ["100002", "\u623f\u95f43", 3061631, "B\u73af\u740381078081", 1, 50000, 0, 1], ["100003", "\u623f\u95f44", 3163613, "a\u94f6\u6cb38412685", 1, 50000, 0, 1], ["100004", "\u623f\u95f45", 3163626, "b\u94f6\u6cb38412685", 1, 50000, 0, 1], ["100005", "\u623f\u95f46", 3163634, "c\u94f6\u6cb38412685", 1, 50000, 0, 1], ["100006", "\u623f\u95f47", 3061597, "\u5927\u798f77315899", 1, 50000, 0, 1], ["100007", "\u623f\u95f48", 3061601, "1\u5927\u798f77315899", 1, 50000, 0, 1], ["100008", "\u623f\u95f49", 3061608, "2\u5927\u798f77315899", 1, 50000, 0, 1], ["100009", "\u623f\u95f410", 3065018, "0\u81f3\u5c0a87086693", 1, 50000, 0, 1], ["100010", "\u623f\u95f411", 3065026, "1\u81f3\u5c0a87086693", 1, 50000, 0, 1], ["100011", "\u623f\u95f412", 3065031, "2\u81f3\u5c0a87086693", 1, 50000, 0, 1], ["100012", "\u623f\u95f413", 3065039, "3\u81f3\u5c0a87086693", 1, 50000, 0, 1], ["100013", "\u623f\u95f46518", 5035245, "\u5de5\u4f1a2788", 1, 50000, 0, 1], ["100014", "\u623f\u95f416", 3017312, "8\u8d22\u5bcc100344466", 1, 50000, 0, 1], ["100015", "\u623f\u95f4104", 951060, "\u4e07\u4f17\u52a0WZF188688", 1, 50000, 0, 1], ["100016", "\u623f\u95f46446", 3164233, "\u65b0\u65f6\u4ee3XSD88588", 1, 50000, 0, 1], ["100017", "\u623f\u95f46307", 5234118, "\u91d1\u9a6c\u5a01jinma8060", 1, 50000, 0, 1], ["100018", "\u623f\u95f420", 3017297, "6\u8d22\u5bcc100344466", 1, 50000, 0, 1], ["100019", "\u623f\u95f44681", 2994344, "p\u90fd\u65fa\u638c\u67dcDWZG168", 2, 50000, 0, 1], ["100020", "\u623f\u95f46447", 3333188, "\u5408\u5174419950558", 1, 50000, 0, 1], ["100021", "\u623f\u95f46472", 5234065, "\u91d1\u9a6c\u5a01jinma6080", 1, 50000, 0, 1], ["100022", "\u623f\u95f493", 3854396, "C\u8fc5\u6e38236614933", 1, 50000, 0, 1], ["100023", "\u623f\u95f4120", 3469646, "\u6c38\u5229\u4ff1\u4e50\u90e8YLCZ28", 1, 50000, 0, 1], ["100024", "\u623f\u95f44392", 2994503, "b\u90fd\u65fa\u638c\u67dcDWZG168", 2, 50000, 0, 1], ["100025", "\u623f\u95f427", 3065045, "\u52a0\u516c\u4f1a3934", 1, 50000, 0, 1], ["100026", "\u623f\u95f428", 3017322, "9\u8d22\u5bcc100344466", 2, 50000, 0, 1], ["100027", "\u623f\u95f46521", 2189775, "zuanshi12888", 1, 50000, 0, 1], ["100028", "\u623f\u95f44682", 2994386, "c\u90fd\u65fa\u638c\u67dcDWZG168", 2, 50000, 0, 1], ["100029", "\u623f\u95f431", 3970085, "\u8fc5\u6e38236614933", 1, 50000, 0, 1], ["100030", "\u623f\u95f44683", 2994334, "\u4f73\u5a01DWZG168", 2, 50000, 0, 1], ["100031", "\u623f\u95f433", 3065051, "\u6765\u516c\u4f1a3934", 1, 50000, 0, 1], ["100032", "\u623f\u95f46525", 3384906, "B\u5174\u65fa\u94f6\u5e84XWYZ168", 1, 50000, 0, 1], ["100033", "\u623f\u95f436", 3065009, "D\u73af\u740381078081", 1, 50000, 0, 1], ["100034", "\u623f\u95f44393", 2994510, "r\u90fd\u65fa\u638c\u67dcDWZG168", 1, 50000, 0, 1], ["100035", "\u623f\u95f46565", 2189597, "\u94bb\u77f3zuan12888", 1, 50000, 0, 1], ["100036", "\u623f\u95f46566", 2603392, "\u52a0\u5a01zuan12888", 1, 50000, 0, 1], ["100037", "\u623f\u95f46266", 3365829, "\u6c38\u5229\u8473\u53f7YLCZ28", 1, 50000, 0, 1], ["100038", "\u623f\u95f44936", 3106012, "h\u90fd\u65fa\u638c\u67dcDWZG168", 2, 50000, 0, 1], ["100039", "\u623f\u95f46335", 2878498, "F\u5353\u8d8aZYYC1388", 2, 50000, 0, 1], ["100040", "\u623f\u95f44394", 2994525, "f\u90fd\u65fa\u638c\u67dcDWZG168", 1, 50000, 0, 1], ["100041", "\u623f\u95f45062", 2994403, "m\u90fd\u65fa\u638c\u67dcDWZG168", 2, 50000, 0, 1], ["100042", "\u623f\u95f446", 3017276, "3\u8d22\u5bcc100344466", 1, 50000, 0, 1], ["100043", "\u623f\u95f45063", 2994353, "n\u90fd\u65fa\u638c\u67dcDWZG168", 2, 50000, 0, 1], ["100044", "\u623f\u95f448", 3865313, "G\u8fc5\u6e38236614933", 1, 50000, 0, 1], ["100045", "\u623f\u95f46057", 3567565, "1\u91d1\u592a\u9633JTY2188", 1, 50000, 0, 1], ["100046", "\u623f\u95f45734", 1315535, "\u6c38\u5229\u5a01\u53f7YLCZ28", 1, 50000, 0, 1], ["100047", "\u623f\u95f46586", 5229597, "WZF188688\u4e07\u4f17\u798f", 1, 50000, 0, 1], ["100048", "\u623f\u95f46351", 5052951, "\u9f8d\u817e\u8473\u53f7LTGJ3099", 1, 50000, 0, 1], ["100049", "\u623f\u95f44395", 2994498, "a\u90fd\u65fa\u638c\u67dcDWZG168", 1, 50000, 0, 1], ["100050", "\u623f\u95f46352", 5052823, "\u9f8d\u817e\u5a01\u53f7LTGJ3099", 1, 50000, 0, 1], ["100051", "\u623f\u95f455", 3865325, "H\u8fc5\u6e38236614933", 1, 50000, 0, 1], ["100052", "\u623f\u95f42608", 2556807, "1\u62db\u8d22ZCM688886", 1, 50000, 0, 1], ["100053", "\u623f\u95f457", 3061650, "C\u73af\u740381078081", 1, 50000, 0, 1], ["100054", "\u623f\u95f46569", 1751903, "\u5413\u82ac\u5a01zuan12888", 1, 50000, 0, 1], ["100055", "\u623f\u95f44805", 2994526, "i\u90fd\u65fa\u638c\u67dcDWZG168", 1, 50000, 0, 1], ["100056", "\u623f\u95f4836", 3048116, "1\u5e73\u5eb725799662", 1, 50000, 0, 1], ["100057", "\u623f\u95f45967", 4968054, "\u5174\u5bccXFCZ6688", 1, 50000, 0, 1], ["100058", "\u623f\u95f46355", 4774047, "\u5ba2\u5174\u8d22\u5e84\u5a01\u6d69KXCZ88", 1, 50000, 0, 1], ["100059", "\u623f\u95f45696", 1544372, "HMBS336699", 1, 50000, 0, 1], ["100060", "\u623f\u95f472", 3017282, "4\u8d22\u5bcc100344466", 1, 50000, 0, 1], ["100061", "\u623f\u95f46209", 2878405, "B\u5353\u8d8aZYCC1388", 2, 50000, 0, 1], ["100062", "\u623f\u95f45017", 2878522, "H\u5353\u8d8aZYYC1388", 2, 50000, 0, 1], ["100063", "\u623f\u95f45698", 1537557, "\u5a01\u5e78HMBS336699", 1, 50000, 0, 1], ["100064", "\u623f\u95f486", 3017262, "2\u8d22\u5bcc100344466", 1, 50000, 0, 1], ["100065", "\u623f\u95f46536", 4525328, "\u767e\u5229\u5a01\u53f7BL21888", 1, 50000, 0, 1], ["100066", "\u623f\u95f4890", 3048127, "2\u5e73\u5eb725799662", 1, 50000, 0, 1], ["100067", "\u623f\u95f46532", 2878512, "G\u5353\u8d8aZYYC1388", 2, 50000, 0, 1], ["100069", "\u623f\u95f45482", 3324634, "2\u559c\u53d1XIFA5918", 1, 50000, 0, 1], ["100070", "\u623f\u95f45483", 3324652, "4\u559c\u53d1XIFA5918", 1, 50000, 0, 1], ["100071", "\u623f\u95f45484", 3324641, "3\u559c\u53d1XIFA5918", 1, 50000, 0, 1], ["100072", "\u623f\u95f45485", 3324613, "1\u559c\u53d1XIFA5918", 1, 50000, 0, 1], ["100073", "\u623f\u95f45811", 5201348, "\u52a0\u5a01HXY1366666", 1, 50000, 0, 1], ["100074", "\u623f\u95f46538", 5040718, "\u91d1\u732a\u65fa\u8d22\u5a01JZWC128", 1, 50000, 0, 1], ["100075", "\u623f\u95f46217", 2878464, "C\u5353\u8d8aZYYC1388", 2, 50000, 0, 1], ["100076", "\u623f\u95f46578", 5229159, "1\u5bcc\u8c6aDFHCZ8888", 1, 50000, 0, 1], ["100077", "\u623f\u95f46579", 5229285, "2\u5bcc\u8c6aDFHCZ8888", 1, 50000, 0, 1], ["100078", "\u623f\u95f46580", 5229319, "3\u5bcc\u8c6aDFHCZ8888", 1, 50000, 0, 1], ["100079", "\u623f\u95f4843", 3048205, "6\u5e73\u5eb725799662", 1, 50000, 0, 1], ["100080", "\u623f\u95f46583", 2578345, "A\u6c38\u5229YLCZ28", 1, 50000, 0, 1], ["100081", "\u623f\u95f46584", 5229426, "B\u6c38\u5229YLCZ28", 1, 50000, 0, 1], ["100082", "\u623f\u95f46585", 1315591, "C\u6c38\u5229YLCZ28", 1, 50000, 0, 1], ["100087", "\u623f\u95f4825", 3048095, "\u5e73\u5eb725799662", 1, 50000, 0, 1], ["100088", "\u623f\u95f4826", 3048100, "0\u5e73\u5eb725799662", 1, 50000, 0, 1]]}, "code": 414, "ret": 1}';
        // jsonData = JSON.parse(jd);

        if (jsonData.ret == 1) {
            //成功
            this._roomData = jsonData["info"]["result"];
            this.SetPageData();
        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jsonData["info"]["desc"]);
            return;
        }
    }
    
    /// <summary>
    /// 412退出
    /// </summary>
    /// <param name="jsonData"></param>
    private on412_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
            //成功
            KFSceneManager.getInstance().replaceScene(SceneName.Hall);
        }else if(jd ["ret"] == "0" && jd["code"]== MsgID.DiceGame.JOINPRIVATEROOM_SEND){//失败则提示失败原因
            KFControllerMgr.showTips(DiceGameController.GetInstance().GetDescription(jd["info"]["reasonType"]));
            return;
        }
    }
            
    /// <summary>
    /// 464邀请
    /// </summary>
    /// <param name="jsonData"></param>
    private on464_event(event: egret.Event): void {
        if (GlobalClass.DiceGameClass.bRefuseInviteMsg)return;
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
        //成功
        let ownerNickName = jd["ownerNickName"];
        let passWD = jd["passwd"];
        let gameMode = jd["diceMode"];
        let roomNum = jd["rid"];
        (<InviteTitlePanelController>KFControllerMgr.getCtl(PanelName.InviteTitlePanel)).InitAndShow(ownerNickName,roomNum,passWD,gameMode);
        // }else if(jd ["ret"] == "0" && jd["code"]== MsgID.DiceGame.JOINPRIVATEROOM_SEND){//失败则提示失败原因
        //     KFControllerMgr.showTips(DiceGameController.GetInstance().GetDescription(jd["info"]["reasonType"]));
        //     return;
        // }
    }
    private on425_event(event: egret.Event): void {
        this.on405_event(event);
    }

    //退出
    private on50001_event(event: egret.Event): void {
        KFControllerMgr.showTips("确定退出游戏？", 0, 2, ()=>{DeviceUtils.CloseGame()});
    }

    //更新点数
    private on113_event(event: egret.Event): void {       
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();        
        if (!datastr.match("%")) return;
        let strArray = datastr.split("%");

        GlobalClass.UserInfo.str_Hall_totalScore = strArray[2];
    }


    private on1020_event(event: egret.Event): void {
        console.log("on1020_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        datastr = datastr.replace(/\n/g, "\\n");
       datastr = datastr.replace(/\r/g, "\\r");
        GlobalClass.HallClass.fangChenMiResult = datastr;
        var jsdata = JSON.parse(datastr);
        if (jsdata["ret"] == "1"){
           
            var action = Number(jsdata["action"]);
            if(action==2){
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.GIVE_UP_EXIT,"");
            }
            if(action==3){
                KFControllerMgr.getCtl(PanelName.SystemTitlePanel).show();
            }else{
                 KFControllerMgr.getCtl(PanelName.AntiAddictionPanel).show();
            }
        }
    }

        /// <summary>
        /// 返回大厅
        /// </summary>
        /// <param name="jsonData"></param>
    private on405_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
            //成功

            GlobalClass.DiceGameClass.ownerPlayerName = jd["info"]["oname"];
            GlobalClass.DiceGameClass.RoomScore = (jd["info"]["betP"]);
            
            GlobalClass.UserInfo.str_Hall_totalScore = jd["info"]["cPoint"];
            GlobalClass.DiceGameClass.opponentPoint = (GlobalClass.UserInfo.str_Hall_totalScore);
            GlobalClass.DiceGameClass.ownerPoint = (jd["info"]["oPoint"]);
            GlobalClass.DiceGameClass.GuaranteePoint = (jd["info"]["protectPoint"]);

            GlobalClass.DiceGameClass.RoomNum = jd["info"]["pwd"];
            GlobalClass.DiceGameClass.opponentIsJoin = true;
            GlobalClass.DiceGameClass.isRoomOwner = false;
            GlobalClass.DiceGameClass.waitTime = (jd["info"]["waitTime"]);
            GlobalClass.DiceGameClass.autoTime = (jd["info"]["autoTime"]);
            GlobalClass.DiceGameClass.RoomName = jd["info"]["roomName"];
            GlobalClass.DiceGameClass.gameMode = jd["info"]["diceMode"];

            //快速模式
            let mode = jd["info"]["isQuickMode"];
            if (mode == "1")
            {
                GlobalClass.DiceGameClass.isQuickGame = true;
            }
            else
            {
                GlobalClass.DiceGameClass.isQuickGame = false;
            }
            this.hide();
            KFControllerMgr.getCtl(PanelName.DHTGamePanel).show();
        }else if(jd ["ret"] == "0" && jd["code"]== MsgID.DiceGame.JOINPRIVATEROOM_SEND){//失败则提示失败原因
            KFControllerMgr.showTips(DiceGameController.GetInstance().GetDescription(jd["info"]["reasonType"]));
            return;
        }
    }

    private SetPageData(){
        let collection = new eui.ArrayCollection();
        let lastCount = (this._pageInfo.nowPage) * this._pageInfo.itemCout;
        lastCount = lastCount<this._roomData.length-1?lastCount:this._roomData.length;
        for(let i = (this._pageInfo.nowPage-1) * this._pageInfo.itemCout; i < lastCount; i++){
            collection.addItem(this._roomData[i]);
        }
        this.mPanel.Room_List.dataProvider = collection;
        let totalPage = Math.ceil(this._roomData.length/this._pageInfo.itemCout);
        if(totalPage==0){
            totalPage = 1;
        }
        this.mPanel.Label_Page.text = (this._pageInfo.nowPage) + "/" + totalPage;

        this.switchBtn(this.mPanel.Btn_FirstPage , this._pageInfo.nowPage > 1);
        this.switchBtn(this.mPanel.Btn_EndPage , this._pageInfo.nowPage < Math.ceil(this._roomData.length/this._pageInfo.itemCout));
        this.switchBtn(this.mPanel.Btn_PageUp , this._pageInfo.nowPage > 1);
        this.switchBtn(this.mPanel.Btn_PageDown , this._pageInfo.nowPage < Math.ceil(this._roomData.length/this._pageInfo.itemCout));
    }

    private GetSearchMode()
    {
        // let mode = this.mPanel.DDB_List.text;
        // if (mode == LocalizationMgr.getText("显示所有房间")) return 1;
        // else if (mode == LocalizationMgr.getText("显示可加入房间")) return 2;
        // else if (mode == LocalizationMgr.getText("显示公会房间")) return 3;
        return 1;
    }

    /// <summary>
    /// 刷新列表数据
    /// </summary>
    private  RefreshData()
    {
        console.log("++++++++++++++++++++++++++++++++++++RefreshData: userId "+GlobalClass.UserInfo.str_UserID);
        let js = JSON.stringify({userid:GlobalClass.UserInfo.str_UserID, searchName:this.mPanel.RoomNum.text, searchMode:this.GetSearchMode(),isNew:"1" });
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.SEARCHROOM_SEND,js);
    }

    /// <summary>
    /// 加入房间
    /// </summary>
    /// <param name="obj"></param>
    public JoinRoomHandler(roomNumber,roomName,ownerName,isHasPasswd)
    {
        egret.log("JoinRoomHandler:  roomNumber: "+roomNumber+" roomName: "+roomName+" ownerName: "+ownerName);

            if (isHasPasswd == "0")
            {
                KFControllerMgr.showTips("\n\n正在进入房间...");
                let js = JSON.stringify({"rid":roomNumber, "id":GlobalClass.UserInfo.str_UserID, "passwd":""});
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.JOINPRIVATEROOM_SEND,js);
            }
            else
            {
                KFControllerMgr.getCtl(PanelName.JoinRoomPanel).showAndInit(roomName,roomNumber,ownerName);
            }
        
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
            this.mPanel.Image_Arrow.visible = false;
            this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText(LocalizationMgr.getText("欢迎来到大话骰，在这里您可以和其他玩家进行[FF0000]单对单[-]对战"));
            this.mPanel.Group_Text.x = 290;
            this.mPanel.Group_Text.y = 225;
            break;
            case 2:
            this.mPanel.Group_NewBie.visible = true;
            this.mPanel.Image_Arrow.visible = true;
            this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText(LocalizationMgr.getText("您可以创建一个房间，然后等待别人挑战。"));
            this.mPanel.Group_Text.x = 290;
            this.mPanel.Group_Text.y = 225;
            this.mPanel.Image_Arrow.x = 211;
            this.mPanel.Image_Arrow.y = 142;
            this.mPanel.Image_Arrow.rotation = 180;
            this.upObj(this.mPanel.CreateRoomBtn);
            break;
            case 3:
            this.mPanel.Group_NewBie.visible = true;
            this.mPanel.Image_Arrow.visible = true;
            this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText(LocalizationMgr.getText("也可以在列表中选择一个房间加入。"));
            this.mPanel.Group_Text.x = 290;
            this.mPanel.Group_Text.y = 225;
            this.mPanel.Image_Arrow.x = 256;
            this.mPanel.Image_Arrow.y = 294;
            this.mPanel.Image_Arrow.rotation = 180;
            break;
            default:
            step = 4;
            this.mPanel.Group_NewBie.visible = false;
        }
        egret.localStorage.setItem("NewGuid_CreateListPanel",step.toString());        
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
        this.NewGuid(4);
        GlobalClass.DiceGameClass.NewGuid_CreateListPanel = 4;
        egret.localStorage.setItem("NewGuid_CreateListPanel",GlobalClass.DiceGameClass.NewGuid_CreateListPanel.toString());
    }

    /// <summary>
    /// 下一步引导
    /// </summary>
    /// <param name="obj"></param>
    public OnClickNextGuid(event:egret.TouchEvent)
    {
        this.NewGuid(++GlobalClass.DiceGameClass.NewGuid_CreateListPanel);
    }

    public DDBListClick(){
        this.RefreshData();
    }
}