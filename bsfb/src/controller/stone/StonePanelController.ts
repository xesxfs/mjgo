/**
 *
 * @author 
 *
 */
class StonePanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.ListenObjList = [ {event:egret.TouchEvent.TOUCH_END,items:{"Btn_MyBank":"",
                                                        "Btn_Club":"",
                                                        "Btn_CloseStone":"",
                                                        "Btn_ArenaSure":"",
                                                        "Btn_MyArena":"",
                                                        "Btn_FirstPage":"",
                                                        "Btn_PageUp":"",
                                                        "Btn_PageDown":"",
                                                        "Btn_EndPage":"",
                                                        "Btn_RefreshList":"",
                                                        "Btn_Sure_ArenaPassword":"",
                                                        "Btn_Cancel_ArenaPassword":"",
                                                        "Btn_ChallengeSure":"",
                                                        "Btn_CancelChallenge":"",
                                                        "Btn_Back5":"",
                                                        "Btn_Back6":"",
                                                    },},
                               {event:egret.TouchEvent.CHANGE,items:{"Toggle_Challenge":"",
                                                        "Toggle_MyArena":"",
                                                        "Toggle_Arena":"",
                                                        "Toggle_Challenge_Scissor":"",
                                                        "Toggle_Challenge_Stone":"",
                                                        "Toggle_Challenge_Paper":"",
                                                        "Toggle_Arena_Stone":"",
                                                        "Toggle_Arena_Scissor":"",
                                                        "Toggle_Arena_Paper":"",
                                                    },},
                            
                            ];
        
        this.EventsList = [
            MsgID.Hall.Msg_1020,
            MsgID.STONE.EXIT_ARENA,
            MsgID.STONE.APPLY_ARENA,
            MsgID.STONE.LOGIN_ARENA,
            MsgID.STONE.CHALLENGE_ARENA,
            MsgID.STONE.CHECK_ARENAINFO,
            MsgID.STONE.CHECK_MYARENA,
            MsgID.USER.UPDATE_MONEY,
            MsgID.USER.LOUDERSPEAKER_MSG,
            MsgID.Client.STONECHALLENGE,
            ];
	}

    private on60001_event(event: egret.Event): void {
        console.log("on60001_event");
        var msg:string = <string>event.data;
        if(msg=="0"){
            this.changePanel(4);
        }
        if(msg == "1"){
            this.changePanel(3);
        }
    }

    private on113_event(event: egret.Event): void {
        console.log("on113_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.UserInfo.str_Hall_totalScore = strArray[2];
    }

    private on154_event(event: egret.Event): void {
        console.log("on154_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var str_Param = datastr.split("%");
        var isvip =  str_Param[6];
        var text = "[" + str_Param[4] + "]" + str_Param[3] + "[-]";
        var obj = new Object();
        obj["txt"] = text;
        obj["vip"] = Number(isvip);
        var js = [obj];
        this.mPanel.louderspeaker.pushMarquees(js);
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

    private on302_event(event: egret.Event): void {
        console.log("on302_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        KFSceneManager.getInstance().replaceScene(SceneName.Hall);
    }
    private on306_event(event: egret.Event): void {
        console.log("on306_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
         if (strArray[2] == "0")         //摆擂台失败  
          {
              var str_errorCause = strArray[3];
              if(str_errorCause=="3"){
                  KFControllerMgr.showTips("擂台点数不够最低标准");
              }
              if(str_errorCause=="4"){
                  KFControllerMgr.showTips("密码超过有限长度");
              }
              if(str_errorCause=="5"){
                  KFControllerMgr.showTips(" 请 选 择 手 势 ");
              }
              if(str_errorCause=="8"){
                //   "游戏点数少于[FFFF00]" + GlobalClass.HallClass.str_Hall_IntLevel[2] + "[-]擂台点数"
                  KFControllerMgr.showTips("游戏点数少于" + GlobalClass.HallClass.str_Hall_IntLevel[2] + "擂台点数");
              }
              if(str_errorCause=="12"){
                  KFControllerMgr.showTips("个人资产须保留\n\r" + GlobalClass.HallClass.str_Hall_IntLevel[3] + "保障点数");
              }
              if(str_errorCause=="20"){
                  KFControllerMgr.showTips("密码不能少于4位");
              }
          }
          else                     //摆擂台成功
          {
            this.changePanel(1);
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
        }
    }
    private on307_event(event: egret.Event): void {
        console.log("on307_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if (strArray[2] == "0"){
            KFControllerMgr.showTips("密码错误！");
        }else if (strArray[2] == "1")//成功
        {
            console.log("登录擂台成功");
            this.changePanel(4);
        }
    }
    private on308_event(event: egret.Event): void {
        console.log("on308_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = '308%-1%2%1%1%50000%0%0#0#0';
        var strArray = datastr.split("%");
        GlobalClass.StoneClass.str_betResult = strArray[2];       //挑战结果
        GlobalClass.StoneClass.str_ArenaGesture = strArray[3];
        GlobalClass.StoneClass.str_ChallengeGesture = strArray[4];
        GlobalClass.StoneClass.str_betScore = strArray[5];
        GlobalClass.StoneClass.str_Fee = strArray[6];
        if(GlobalClass.StoneClass.str_betResult=="4"){
            KFControllerMgr.showTips("擂台已过期");
        }else if(GlobalClass.StoneClass.str_betResult=="6"){
            KFControllerMgr.showTips("游戏点数少于擂台点数");
        }else if(GlobalClass.StoneClass.str_betResult=="7"){
            KFControllerMgr.showTips("不能挑战自己的擂台");
        }else if(GlobalClass.StoneClass.str_betResult=="8"){
            KFControllerMgr.showTips("达不到特定等级不能挑战");
        }else if(GlobalClass.StoneClass.str_betResult=="9"){
            KFControllerMgr.showTips("非VIP用户不能\n挑战有密码的擂台");
        }else if(GlobalClass.StoneClass.str_betResult=="10"){
            KFControllerMgr.showTips("达不到特定等级不能摆擂");
        }else{
            this.changePanel(5);
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
        }
    }
    private on309_event(event: egret.Event): void {
        console.log("on309_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = '309%-1%2937840,擂台18901,十威号WZF188688,50000,0,null,-1,-1,-1,2017-03-31 18:31:54,0#0,0#0%2937740,擂台18801,SX5341498,120000,0,null,-1,-1,-1,2017-03-31 18:23:25,0#0,0#0%2937911,擂台18972,加崴bsfb789,50000,1,null,-1,-1,-1,2017-03-31 18:38:49,0#0,0#0%2937910,擂台18971,加威HZ335566,50000,1,null,-1,-1,-1,2017-03-31 18:38:44';
        var strArray = datastr.split("%");
        GlobalClass.StoneClass.int_currentPage = 0;//页面置0
        if(strArray[strArray.length-1]==""){
            var collection = new eui.ArrayCollection();
            collection.source = [];
            this.mPanel.Arena1List.dataProvider = collection;
            return ;
        }
        GlobalClass.StoneClass.str_listData = new Array(strArray.length - 2);     //去掉109和-1
        if (GlobalClass.StoneClass.str_listData.length != 0){
            for (let i = 0; i < GlobalClass.StoneClass.str_listData.length; i++)
            {
                GlobalClass.StoneClass.str_listData[i] = strArray[i + 2].split( ',' );
            }
            this.changePanel(2);
        }
    }
    private on310_event(event: egret.Event): void {
        console.log("on310_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = '310%-1%擂台3,50000,1,-1,0,0,-1,-1,2017-03-31 20:39:01,0#工会2699妹子多,50000,0,0,2,0,-1,婉恋浅音,2016-06-23 10:12:28,1#擂台6272,150000,0,2,1,1,123456,婉恋浅音,2016-10-31 18:02:54,1#擂台2264,50000,0,2,1,1,901005,婉恋浅音,2016-08-08 14:09:19,1#hgftt,50000,1,0,1,1,1111111,婉恋浅音,2016-07-14 16:41:31,1#jxhhsu,80000,1,0,1,1,111111,婉恋浅音,2016-07-14 16:33:15,1#111,400000,0,2,1,1,mmm,婉恋浅音,2016-01-05 11:20:08,1#qqqqq,2700000,0,0,2,1,8899,婉恋浅音,2015-12-28 18:01:53,1#小气鬼点,1050000,2,1,1,1,poi,婉恋浅音,2015-12-28 17:02:57,1#qqqqqq,50000,0,1,0,1,qwerr,婉恋浅音,2015-12-10 17:58:49,1#qqqq,50000,0,2,1,1,qwerr,婉恋浅音,2015-12-10 17:55:58,1';
        var strArray = datastr.split("%");
        if(strArray[2]==""){return;}
        if (strArray.length > 2){
            GlobalClass.StoneClass.str_MyArenaData = strArray[2].split('#' );
            this.changePanel(7);
        }
    }


    private Toggle_Arena_StoneClick(){
        this.mPanel.Toggle_Arena_Stone.selected = true;
        GlobalClass.StoneClass.int_GestureChoice = 0;
    }
    private Toggle_Arena_ScissorClick(){
        this.mPanel.Toggle_Arena_Scissor.selected = true;
        GlobalClass.StoneClass.int_GestureChoice = 1;
    }
    private Toggle_Arena_PaperClick(){
        this.mPanel.Toggle_Arena_Paper.selected = true;
        GlobalClass.StoneClass.int_GestureChoice = 2;
    }

    private Btn_MyBankClick(){
        KFControllerMgr.getCtl(PanelName.BankPanel).show();
    }
    private Btn_ClubClick(){
        if (Number(GlobalClass.ClubClass.str_ClubMsgRet) <= 0)
        {
             KFControllerMgr.showTips("请先加入公会",0,2,()=>{
                KFControllerMgr.getCtl(PanelName.ClubPanel).show();
            }); 
            return;
        }
        KFControllerMgr.getCtl(PanelName.ClubDolePanel).show();
    }
    private Btn_ArenaSureClick(){
        if (this.mPanel.Input_ArenaName.text == "")
        {
            KFControllerMgr.showTips("擂台名不能为空");
            return;
        }

        //没有选择手势
        if (GlobalClass.StoneClass.int_GestureChoice == -1)
        {
             KFControllerMgr.showTips(" 请 选 择 手 势 ");
            return;
        }
        if (this.mPanel.Input_Arena_ArenaPassword.text != "" && this.mPanel.Input_Arena_ArenaPassword.text.length < 4)
        {
            KFControllerMgr.showTips("密码不能少于4位");
            return;
        }
        this.mPanel.Input_ArenaName.text = this.mPanel.Input_ArenaName.text.replace(',', '，');
        this.mPanel.Input_Arena_ArenaPassword.text = this.mPanel.Input_Arena_ArenaPassword.text.replace(',', '，');
        var js = {ArenaName: this.mPanel.Input_ArenaName.text,GestureChoice:GlobalClass.StoneClass.int_GestureChoice+"",ArenaScore: this.mPanel.Input_Count.text,ArenaPassword:this.mPanel.Input_Arena_ArenaPassword.text,};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.STONE.APPLY_ARENA,JSON.stringify(js));


        this.disableBut(this.mPanel.Btn_ArenaSure);
        this.invoke(0.5,()=>{
            this.enableBut(this.mPanel.Btn_ArenaSure);
        },this);
    }
    private Btn_CountClick(event){
        var but = <eui.Button>event.target;
        var str = Number(this.mPanel.Input_Count.text);
        str += Number(GlobalClass.HallClass.str_BetCount[Number(but.name)]);
        this.mPanel.Input_Count.text = str+"";
        this.ChangeInputCount();
    }
    private ChangeInputCount(){
        if (Number(this.mPanel.Input_Count.text) < 0 || this.mPanel.Input_Count.text=="")
        {
            this.mPanel.Input_Count.text = "0";
        }
        if (Number(this.mPanel.Input_Count.text) > Number(GlobalClass.UserInfo.str_Hall_totalScore))
        {
            this.mPanel.Input_Count.text = GlobalClass.UserInfo.str_Hall_totalScore;
        }
    }
    private Btn_MyArenaClick(){
        
        this.Toggle_MyArenaClick();
    }
    private Btn_FirstPageClick(){
         GlobalClass.StoneClass.int_currentPage = 0;
        this.changePanel(2);

        this.mPanel.Label_Pages.text = GlobalClass.StoneClass.int_totalPage+"";
        this.mPanel.Label_CurrentPage.text = (GlobalClass.StoneClass.int_currentPage + 1)+"";
        this.ButtonColorControl();
    }

    private Btn_ChallengeSureClick(){
        var js = {LoginID: GlobalClass.StoneClass.str_loginID,LoginPW:GlobalClass.StoneClass.str_loginPW,GestureChoice: GlobalClass.StoneClass.int_GestureChoice+""};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.STONE.CHALLENGE_ARENA,JSON.stringify(js));
    }

    private Btn_CancelChallengeClick(){
        this.changePanel(2);
    }

    private ButtonColorControl(){
         if (Number(this.mPanel.Label_CurrentPage.text) == 1)
        {
            this.disableBut(this.mPanel.Btn_PageUp);
            this.disableBut(this.mPanel.Btn_FirstPage);
        }
        else
        {
            this.enableBut(this.mPanel.Btn_PageUp);
            this.enableBut(this.mPanel.Btn_FirstPage);
        }

        if (Number(this.mPanel.Label_CurrentPage.text) == Number(this.mPanel.Label_Pages.text))
        {
            this.disableBut(this.mPanel.Btn_PageDown);
            this.disableBut(this.mPanel.Btn_PageDown);
        }
        else
        {
            this.enableBut(this.mPanel.Btn_PageDown);
            this.enableBut(this.mPanel.Btn_EndPage);
        }
    }
    private Btn_PageUpClick(){
        if (GlobalClass.StoneClass.int_currentPage > 0)
        {
            GlobalClass.StoneClass.int_currentPage -= 1;

            this.changePanel(2);

            this.mPanel.Label_Pages.text = GlobalClass.StoneClass.int_totalPage+"";
            this.mPanel.Label_CurrentPage.text = (GlobalClass.StoneClass.int_currentPage + 1)+"";
        }
        this.ButtonColorControl();
    }
    private Btn_PageDownClick(){
        GlobalClass.StoneClass.int_totalPage = 0;
        if (GlobalClass.StoneClass.str_listData.length % 8 == 0)
        {
           GlobalClass.StoneClass.int_totalPage = Math.floor( GlobalClass.StoneClass.str_listData.length / 8) ;
            if (GlobalClass.StoneClass.str_listData.length == 0)
            {
                GlobalClass.StoneClass.int_totalPage = 1;
            }
        }
        else
        {
            GlobalClass.StoneClass.int_totalPage = Math.floor( GlobalClass.StoneClass.str_listData.length / 8) + 1;
        }

        if (GlobalClass.StoneClass.int_currentPage < GlobalClass.StoneClass.int_totalPage - 1)
        {
            GlobalClass.StoneClass.int_currentPage += 1;

            this.changePanel(2);
        }
        this.mPanel.Label_Pages.text = GlobalClass.StoneClass.int_totalPage+"";
        this.mPanel.Label_CurrentPage.text = (GlobalClass.StoneClass.int_currentPage + 1)+"";
        this.ButtonColorControl();
    }
    private Btn_EndPageClick(){
         GlobalClass.StoneClass.int_totalPage = 0;
        if (GlobalClass.StoneClass.str_listData.length % 8 == 0)
        {
            GlobalClass.StoneClass.int_totalPage = Math.floor(GlobalClass.StoneClass.str_listData.length / 8);
            if (GlobalClass.StoneClass.str_listData.length == 0)
            {
                GlobalClass.StoneClass.int_totalPage = 1;
            }
        }
        else
        {
            GlobalClass.StoneClass.int_totalPage = Math.floor(GlobalClass.StoneClass.str_listData.length / 8) + 1;
        }
        GlobalClass.StoneClass.int_currentPage = GlobalClass.StoneClass.int_totalPage - 1;

         this.changePanel(2);
         
        this.mPanel.Label_Pages.text = GlobalClass.StoneClass.int_totalPage+"";
        this.mPanel.Label_CurrentPage.text = (GlobalClass.StoneClass.int_currentPage + 1)+"";
        this.ButtonColorControl();
    }
    private hideAllPanel(){
        this.mPanel.Panel_Challenge.$children.forEach(element => {
            element.visible = false;
        });
        this.mPanel.Panel_Arena.$children.forEach(element => {
            element.visible = false;
        });
    }
    private Btn_RefreshListClick(){
        GlobalClass.StoneClass.int_currentPage = 0;
        this.hideAllPanel();
        this.mPanel.Panel_Challenge.getChildAt(0).visible = true;
        this.ToggleChallengeButton();
    }
    private ToggleChallengeButton(){
        this.disableBut(this.mPanel.Btn_RefreshList);
        this.disableBut(this.mPanel.Toggle_Challenge);
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.STONE.CHECK_ARENAINFO,"");
        this.invoke(0.5,()=>{
            this.enableBut(this.mPanel.Btn_RefreshList);
            this.enableBut(this.mPanel.Toggle_Challenge);
        },this);
    }
    private Btn_Sure_ArenaPasswordClick(){
         GlobalClass.StoneClass.str_loginPW = this.mPanel.Input_Challenge_ArenaPassword.text;
        //      Debug.Log("确定密码按钮");
        //登录密码是在Arena_Challenge_Controller里获得的
        var js = {LoginID: GlobalClass.StoneClass.str_loginID,LoginPW: GlobalClass.StoneClass.str_loginPW};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.STONE.LOGIN_ARENA,JSON.stringify(js));
    }
    private Btn_Cancel_ArenaPasswordClick(){
         this.Toggle_ChallengeClick();
    }
    private Toggle_ChallengeClick(){
        this.Btn_RefreshListClick();
    }b
    private Toggle_MyArenaClick(){
        // this.on308_event(null);
        this.mPanel.Toggle_MyArena.selected = true;
        this.hideAllPanel();
        this.mPanel.Panel_Challenge.getChildAt(5).visible = true;
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.STONE.CHECK_MYARENA,"");
    }
    private Toggle_ArenaClick(){
        this.mPanel.Input_ArenaName.text = "";
        this.mPanel.Input_Arena_ArenaPassword.text = "";
        //默认为选择石头
        this.changePanel(0);
        this.Toggle_Arena_StoneClick();
    }
    private Toggle_Challenge_ScissorClick(){
        this.mPanel.Toggle_Challenge_Scissor.selected = true;
        GlobalClass.StoneClass.int_GestureChoice = 1;
    }
    private Toggle_Challenge_StoneClick(){
        this.mPanel.Toggle_Challenge_Stone.selected = true;
        GlobalClass.StoneClass.int_GestureChoice = 0;
    }
    private Toggle_Challenge_PaperClick(){
         this.mPanel.Toggle_Challenge_Paper.selected = true;
         GlobalClass.StoneClass.int_GestureChoice = 2;
    }
    private Btn_Back5Click(){
        this.mPanel.Label_CurrentPage.text = "1";
        this.ButtonColorControl();
        this.Toggle_ChallengeClick();
    }
    private Btn_Back6Click(){
        this.mPanel.Panel_Challenge.getChildAt(4).visible = false;
        this.mPanel.Panel_Challenge.getChildAt(1).visible = true;
        this.changePanel(2);
    }
	
    protected onReady() {
        super.onReady();
    }

    protected onShow(){//在界面上显示出来
        super.onShow();

        this.mPanel.Btn_MyBank.visible = GlobalClass.SDKType.bShowBank2;
        this.mPanel.Btn_Club.visible = GlobalClass.SDKType.bShowClub2;

        this.hideAllPanel();
        GlobalClass.GameClass.isquitAtOnce = false;

        // this.mPanel.Go_Sprite_LoudSpeakerBg.SetActive(false);
        GlobalClass.StoneClass.int_GestureChoice = -1;
        GlobalClass.StoneClass.int_currentPage = 0;
        GlobalClass.StoneClass.int_totalPage = 1;
        GlobalClass.StoneClass.str_loginID = "";
        GlobalClass.StoneClass.str_loginPW = "";

        this.Toggle_Arena_StoneClick();

        //查询总分
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
        this.Btn_RefreshListClick();
        //重复调用  0秒开始，每30秒执行一次
        this.mPanel.Input_Count.text = GlobalClass.HallClass.str_Hall_IntLevel[2]+"";//"#,###"
        this.ChangeInputCount()
        var a= GlobalClass.HallClass.str_Hall_IntLevel[2];
        this.ButtonColorControl();

        for(let i= 0;i<3;i++){
            var element = this.mPanel.Btn_Count.getChildAt(i);
            element.getChildAt(1).text = GlobalClass.HallClass.str_BetCount[i];
        }

        this.mPanel.Label_ArenaCount1.text = GlobalClass.HallClass.str_Hall_IntLevel[2];
        this.mPanel.Label_ArenaCount2.text = GlobalClass.HallClass.str_Hall_IntLevel[3];
        this.mPanel.Label_ArenaCount3.text = "普通用户为 " + GlobalClass.HallClass.str_Hall_IntLevel[6] + "% ,VIP用户为 " + GlobalClass.HallClass.str_Hall_IntLevel[7] + "%";
    }

    private Input_CountChange(event){
        if(this.mPanel.Input_Count.text=="0"){
            this.mPanel.Input_Count.text = "";
        }
    }
    
    protected setOnClickListener() {
        for(let i=0,len =this.mPanel.Btn_Count.$children.length;i<len;i++ ){
            var element = this.mPanel.Btn_Count.$children[i];
            element.name = ""+i;
            this.AddClickEvent(element,egret.TouchEvent.TOUCH_END,this.Btn_CountClick,this);
        }

        this.AddClickEvent(this.mPanel.Input_Count,egret.TouchEvent.CHANGE,this.Input_CountChange,this);
        
    }

    protected removeOnClickListener() {
        this.mPanel.Btn_Count.$children.forEach(element => {
            this.RemoveClickEvent(element,egret.TouchEvent.TOUCH_END,this.Btn_CountClick,this);
        });
    }
    

    private Btn_CloseStoneClick(){
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.STONE.EXIT_ARENA,""); 
    }



    private changePanel(panelID:number){
        this.hideAllPanel();
        switch (panelID){
            case 0:
                this.mPanel.Panel_Arena.getChildAt(0).visible = true;
                this.mPanel.Panel_Arena.visible = true;
                this.Toggle_Arena_StoneClick();
                break;
            case 1:
                this.mPanel.Panel_Arena.visible = true;
                this.mPanel.Panel_Arena.getChildAt(1).visible = true;
                break;
            case 2:
                
                this.mPanel.Panel_Challenge.getChildAt(0).visible = true;
                if (GlobalClass.StoneClass.str_listData != null && GlobalClass.StoneClass.str_listData.length != 0){
                    var length = -1;
                    if (GlobalClass.StoneClass.str_listData.length - GlobalClass.StoneClass.int_currentPage * 8 > 8){
                        length = 8;
                    }else{
                        length = GlobalClass.StoneClass.str_listData.length - GlobalClass.StoneClass.int_currentPage * 8;
                    }
                    var dataArr = [];
                    for (var i = GlobalClass.StoneClass.int_currentPage * 8; i < GlobalClass.StoneClass.int_currentPage * 8 + length; i++){
                        var obj = new Object();
                        obj["Label_ArenaName2"] = GlobalClass.StoneClass.str_listData[i][1];
                        obj["Label_ArenaUser2"] = GlobalClass.StoneClass.str_listData[i][2];
                        obj["Label_ArenaCount2"] = GlobalClass.StoneClass.str_listData[i][3];
                        obj["_index"] = i;
                        if (GlobalClass.StoneClass.str_listData[i][4] == "0"){
                              obj["Sprite_IsHavePassword"] = "0";
                        }
                        if (GlobalClass.StoneClass.str_listData[i][5] != "null"){
                            obj["Label_ChallengeUser2"] = GlobalClass.StoneClass.str_listData[i][5];
                        }else{
                            if (GlobalClass.StoneClass.str_listData[i][7] == "3"){
                                obj["Label_ChallengeUser2"] = "无人挑战，擂台超时";
                                obj["Label_ChallengeUser2Color"] = "white"
                            }
                        }if (GlobalClass.StoneClass.str_listData[i][6] != "-1"){
                            obj["Sprite_Challenge1"] = "1";
                            obj["Sprite_Challenge2"] = "1";
                            obj["Sprite_VS"]= "1";
                            if (GlobalClass.StoneClass.str_listData[i][7] == "1"){
                                switch (GlobalClass.StoneClass.str_listData[i][6]){
                                    case "0":
                                         obj["sprite2Name"] = "st_01";
                                        break;
                                    case "1":
                                         obj["sprite2Name"] = "jd_01";
                                        break;
                                    case "2":
                                         obj["sprite2Name"] = "b_01";
                                        break;
                                }
                                switch (GlobalClass.StoneClass.str_listData[i][8]){
                                    case "0":
                                        obj["source"] = "st_02";
                                                // this.mPanel.Sprite_Challenge1.color = new Color(0.5f, 0.5f, 0.5f);
                                        break;
                                    case "1":
                                        obj["source"] =  "jd_02";
                                                // this.mPanel.Sprite_Challenge1.color = new Color(0.5f, 0.5f, 0.5f);
                                        break;
                                    case "2":
                                        obj["source"] =  "b_02";
                                                // this.mPanel.Sprite_Challenge1.color = new Color(0.5f, 0.5f, 0.5f);
                                        break;
                                        }
                            }else if (GlobalClass.StoneClass.str_listData[i][7] == "0") {
                                switch (GlobalClass.StoneClass.str_listData[i][6]){
                                    case "0":
                                        obj["sprite2Name"]  = "st_02";
                                                // this.mPanel.Sprite_Challenge12.color = new Color(0.5f, 0.5f, 0.5f);
                                                break;
                                            case "1":
                                                obj["sprite2Name"]  = "jd_02";
                                                // this.mPanel.Sprite_Challenge12.color = new Color(0.5f, 0.5f, 0.5f);
                                                break;
                                            case "2":
                                                obj["sprite2Name"]  = "b_02";
                                                // this.mPanel.Sprite_Challenge12.color = new Color(0.5f, 0.5f, 0.5f);
                                                break;
                                    }
                                    switch (GlobalClass.StoneClass.str_listData[i][8]){
                                            case "0":
                                                obj["source"] = "st_01";
                                                break;
                                            case "1":
                                                obj["source"]  = "jd_01";
                                                break;
                                            case "2":
                                                obj["source"]  = "b_01";
                                                break;
                                        }
                            } else if (GlobalClass.StoneClass.str_listData[i][7] == "2") {
                                        switch (GlobalClass.StoneClass.str_listData[i][6])
                                        {
                                            case "0":
                                                obj["source"] = "st_02";
                                                obj["sprite2Name"] = "st_02";
                                                break;
                                            case "1":
                                                obj["source"] = "jd_02";
                                                obj["sprite2Name"] = "jd_02";
                                                break;
                                            case "2":
                                                obj["source"] = "b_02";
                                                obj["sprite2Name"] = "b_02";
                                                break;
                                        }
                                        // this.mPanel.Sprite_Challenge1.color = new Color(0.5f, 0.5f, 0.5f);
                                        // this.mPanel.Sprite_Challenge12.color = new Color(0.5f, 0.5f, 0.5f);
                                    }
                                }
                                dataArr.push(obj);

                            }
                            if (GlobalClass.StoneClass.str_listData != null)           //  "1/10"
                            {
                                GlobalClass.StoneClass.int_totalPage = 0;
                                if (GlobalClass.StoneClass.str_listData.length % 8 == 0)
                                {
                                    GlobalClass.StoneClass.int_totalPage =  Math.floor(GlobalClass.StoneClass.str_listData.length / 8) ;
                                    if (GlobalClass.StoneClass.str_listData.length == 0)
                                    {
                                        GlobalClass.StoneClass.int_totalPage = 1;
                                    }
                                }
                                else
                                {
                                    GlobalClass.StoneClass.int_totalPage = Math.floor(GlobalClass.StoneClass.str_listData.length / 8) + 1;
                                }
                                this.mPanel.Label_Pages.text = GlobalClass.StoneClass.int_totalPage+"";
                                this.mPanel.Label_CurrentPage.text = (GlobalClass.StoneClass.int_currentPage + 1)+"";
                            }
                            var collection = new eui.ArrayCollection();
                            collection.source = dataArr;
                            this.mPanel.Arena1List.dataProvider = collection;
                            this.ButtonColorControl();
                        }
                break;
            case 3:
                this.mPanel.Panel_Challenge.getChildAt(1).visible = true;
                GlobalClass.StoneClass.str_loginPW = "";
                break;    
            case 4:
                this.Toggle_Challenge_StoneClick();
                this.mPanel.Panel_Challenge.getChildAt(2).visible = true;
                this.mPanel.Label_ArenaName4.text = GlobalClass.StoneClass.str_listData[GlobalClass.StoneClass.int_listindex][1];
                this.mPanel.Label_ArenaUser4.text = GlobalClass.StoneClass.str_listData[GlobalClass.StoneClass.int_listindex][2];
                this.mPanel.Label_ArenaCount4.text = GlobalClass.StoneClass.str_listData[GlobalClass.StoneClass.int_listindex][3];
                this.mPanel.Label_ArenaTime4.text = GlobalClass.StoneClass.str_listData[GlobalClass.StoneClass.int_listindex][9];
                break;
            case 5:
                this.mPanel.Panel_Challenge.getChildAt(3).visible = true;
                this.mPanel.Label_ArenaName5.text = GlobalClass.StoneClass.str_listData[GlobalClass.StoneClass.int_listindex][1];
                this.mPanel.Label_ArenaCount5.text = GlobalClass.StoneClass.str_listData[GlobalClass.StoneClass.int_listindex][3];
                this.mPanel.Label_ArenaTime5.text = GlobalClass.StoneClass.str_listData[GlobalClass.StoneClass.int_listindex][9];

                this.mPanel.Label_ChallengeUser5.text = GlobalClass.UserInfo.str_UserNickname;
                this.mPanel.Label_ArenaUser5.text = GlobalClass.StoneClass.str_listData[GlobalClass.StoneClass.int_listindex][2];
                this.mPanel.Label_Fee5.text = "系统收取胜方" + GlobalClass.StoneClass.str_Fee + "点数手续费";

                this.mPanel.win5.visible = false;
                this.mPanel.lost5.visible = false;
                this.mPanel.Sprite_ChallengeResult5_Draw.visible = false;
                this.mPanel.Sprite_ChallengeResult5_Timeout.visible = false;
                this.mPanel.Label_ChallengeResult5.visible = false;
                this.mPanel.Label_Fee5.visible = false;
                if (GlobalClass.StoneClass.str_betResult == "0"){
                    this.mPanel.Label_Fee5.visible = true;
                    this.mPanel.lost5.visible = true;
                    this.mPanel.Label_ChallengeResult5.visible = true;
                    this.mPanel.Label_ChallengeResult5.text = GlobalClass.StoneClass.str_betScore;
                }else if (GlobalClass.StoneClass.str_betResult == "1"){
                    this.mPanel.Label_Fee5.visible = true;
                    this.mPanel.win5.visible = true;
                    this.mPanel.Label_ChallengeResult5.visible = true;
                    this.mPanel.Label_ChallengeResult5.text = (Number(GlobalClass.StoneClass.str_betScore) - Number(GlobalClass.StoneClass.str_Fee))+"";
                }else if (GlobalClass.StoneClass.str_betResult == "2"){
                    this.mPanel.Sprite_ChallengeResult5_Draw.visible = true;
                }else if (GlobalClass.StoneClass.str_betResult == "3"){
                    this.mPanel.Sprite_ChallengeResult5_Timeout.visible = true;
                }
                if (GlobalClass.StoneClass.str_ArenaGesture == "0"){
                    this.mPanel.Sprite_ArenaGesture5.source = RES.getRes("st_01");
                }else if (GlobalClass.StoneClass.str_ArenaGesture == "1") {
                    this.mPanel.Sprite_ArenaGesture5.source = RES.getRes("jd_01");
                }else if (GlobalClass.StoneClass.str_ArenaGesture == "2"){
                    this.mPanel.Sprite_ArenaGesture5.source = RES.getRes("b_01");
                 }
                 if (GlobalClass.StoneClass.str_ChallengeGesture == "0"){
                    this.mPanel.Sprite_ChallengeGesture5.source = RES.getRes("st_01");
                }else if (GlobalClass.StoneClass.str_ChallengeGesture == "1"){
                    this.mPanel.Sprite_ChallengeGesture5.source = RES.getRes("jd_01");
                }else if (GlobalClass.StoneClass.str_ChallengeGesture == "2"){
                    this.mPanel.Sprite_ChallengeGesture5.source = RES.getRes("b_01");
                }
                break;
            case 6:
                this.mPanel.Panel_Challenge.getChildAt(4).visible = true;
                var currentIndex = GlobalClass.StoneClass.int_listindex;
                var ownerChoice = GlobalClass.StoneClass.str_listData[currentIndex][8];
                var challengeChoice = GlobalClass.StoneClass.str_listData[currentIndex][6];
                var whowin = GlobalClass.StoneClass.str_listData[currentIndex][7];
                var betscore = GlobalClass.StoneClass.str_listData[currentIndex][3];
                var _fee = GlobalClass.StoneClass.str_listData[currentIndex][10];
                var _ratio = GlobalClass.StoneClass.str_listData[currentIndex][11];
      

                this.mPanel.Label_ArenaName6.text = GlobalClass.StoneClass.str_listData[currentIndex][1];
                this.mPanel.Label_ArenaCount6.text = GlobalClass.StoneClass.str_listData[currentIndex][3];
                this.mPanel.Label_ArenaTime6.text = GlobalClass.StoneClass.str_listData[currentIndex][9];

                this.mPanel.Label_ArenaUser6.text = GlobalClass.StoneClass.str_listData[currentIndex][2];
                this.mPanel.Label_ChallengeUser6.text = GlobalClass.StoneClass.str_listData[currentIndex][5];
                this.mPanel.Label_Fee6.text = "系统收取胜方" + GlobalClass.StoneClass.str_listData[currentIndex][10] + "点数手续费";

                this.mPanel.lost6.visible = false;
                this.mPanel.win6.visible = false;
                this.mPanel.Sprite_ChallengeResult6_Draw.visible = false;
                this.mPanel.Sprite_ChallengeResult6_Timeout.visible = false;
                this.mPanel.Label_ChallengeResult6.visible = false;
                this.mPanel.Label_Fee6.visible = false;

                if (whowin == "0"){
                    this.mPanel.lost6.visible = true;
                    this.mPanel.Label_Fee6.visible = true;
                    this.mPanel.Label_ChallengeResult6.visible = true;
                    this.mPanel.Label_ChallengeResult6.text = betscore;
                }else if (whowin == "1"){
                    this.mPanel.win6.visible = true;
                    this.mPanel.Label_Fee6.visible = true;
                    this.mPanel.Label_ChallengeResult6.visible = true;
                    this.mPanel.Label_ChallengeResult6.text = (Number(betscore) - Number(_fee))+"";
                }else if (whowin == "2"){
                    this.mPanel.Sprite_ChallengeResult6_Draw.visible = true;
                }else if (whowin == "3"){
                    this.mPanel.Sprite_ChallengeResult6_Timeout.visible = true;
                }

                if (ownerChoice == "0"){
                    this.mPanel.Sprite_ArenaGesture6.source = RES.getRes("st_01");
                }else if (ownerChoice == "1"){
                    this.mPanel.Sprite_ArenaGesture6.source = RES.getRes("jd_01");
                }else if (ownerChoice == "2"){
                    this.mPanel.Sprite_ArenaGesture6.source = RES.getRes("b_01");
                }

                if (challengeChoice == "0"){
                    this.mPanel.Sprite_ChallengeGesture6.source = RES.getRes("st_01");
                }else if (challengeChoice == "1"){
                    this.mPanel.Sprite_ChallengeGesture6.source = RES.getRes("jd_01");
                }else if (challengeChoice == "2"){
                    this.mPanel.Sprite_ChallengeGesture6.source = RES.getRes("b_01");
                }else if (challengeChoice == "null"){
                    // this.mPanel.Sprite_ChallengeGesture6.source = RES.getRes("null");
                     this.mPanel.Sprite_ChallengeGesture6.visible = false;
                }
                break;
            case 7:
                this.mPanel.Panel_Challenge.getChildAt(5).visible = true;
                if (GlobalClass.StoneClass.str_MyArenaData != null && GlobalClass.StoneClass.str_MyArenaData.length != 0){
                    GlobalClass.StoneClass.str_listData2 = new Array(GlobalClass.StoneClass.str_MyArenaData.length);

                    var _length = GlobalClass.StoneClass.str_MyArenaData.length;
                    var dataArr = [];
                    for (let i = 0; i < _length; i++){
                        var obj = new Object();
                        GlobalClass.StoneClass.str_listData2[i] = GlobalClass.StoneClass.str_MyArenaData[i].split( ',');
                        obj["Label_ArenaName"] = GlobalClass.StoneClass.str_listData2[i][0];
                        obj["Label_ArenaCount"] = GlobalClass.StoneClass.str_listData2[i][1];

                        if (GlobalClass.StoneClass.str_listData2[i][4] == "0"){
                            switch (GlobalClass.StoneClass.str_listData2[i][2]){
                                case "0":
                                    obj["img1"] = "st_01";
                                    break;
                                case "1":
                                    obj["img1"] = "jd_01";
                                    break;
                                case "2":
                                obj["img1"] = "b_01";
                                    break;
                                default:
                                    obj["img1"] = "-1";
                                    break;
                            }
                            switch (GlobalClass.StoneClass.str_listData2[i][3]){
                                case "0":
                                    obj["img2"] = "st_02";
                                    obj["img2Fade"] = "1";
                                    break;
                                case "1":
                                    obj["img2"] = "jd_02";
                                    obj["img2Fade"] = "1";
                                    break;
                                case "2":
                                    obj["img2"] = "b_02";
                                    obj["img2Fade"] = "1";
                                    break;
                                default:
                                    obj["img2"] = "-1";
                                    break;
                                }
                        }else if (GlobalClass.StoneClass.str_listData2[i][4] == "1"){
                            switch (GlobalClass.StoneClass.str_listData2[i][2]){
                                case "0":
                                    obj["img1"] = "st_02";
                                    obj["img1Fade"] = "1";
                                    break;
                                case "1":
                                    obj["img1"] = "jd_02";
                                    obj["img1Fade"] = "1";
                                    break;
                                case "2":
                                    obj["img1"] = "b_02";
                                    obj["img1Fade"] = "1";
                                    break;
                                default:
                                obj["img1"] = "-1";
                                    break;
                            }
                            switch (GlobalClass.StoneClass.str_listData2[i][3]){
                                case "0":
                                obj["img2"] = "st_01";
                                    break;
                                case "1":
                                obj["img2"] = "jd_01";
                                    break;
                                case "2":
                                obj["img2"] = "b_01";
                                    break;
                                default:
                                obj["img2"] = "-1";
                                    break;
                            }
                        }else if (GlobalClass.StoneClass.str_listData2[i][4] == "2"){
                            switch (GlobalClass.StoneClass.str_listData2[i][2]){
                                case "0":
                                    obj["img1"] = "st_02";
                                    obj["img2"] = "st_02";
                                    break;
                                case "1":
                                    obj["img1"] = "jd_02";
                                    obj["img2"] = "jd_02";
                                    break;
                                case "2":
                                    obj["img1"] = "b_02";
                                    obj["img2"] = "b_02";
                                    break;
                            }
                            obj["img1Fade"] = "1";
                            obj["img2Fade"] = "1";
                        }else if (GlobalClass.StoneClass.str_listData2[i][4] == "3" || GlobalClass.StoneClass.str_listData2[i][4] == "-1"){
                            switch (GlobalClass.StoneClass.str_listData2[i][2]){
                                        case "0":
                                            obj["img1"] = "st_02";
                                            break;
                                        case "1":
                                            obj["img1"] = "jd_02";
                                            break;
                                        case "2":
                                            obj["img1"] = "b_02";
                                            break;
                                    }
                        }
                        if (GlobalClass.StoneClass.str_listData2[i][5] == "0"){
                            obj["Sprite_IsHavePassword"] = "0";
                        }else{
                            obj["Sprite_IsHavePassword"] = "1";
                        }
                        if (GlobalClass.StoneClass.str_listData2[i][7] == "-1" && GlobalClass.StoneClass.str_listData2[i][9] == "1") {
                            obj["Label_ChallengeUser"] = "无人挑战，擂台超时";
                            obj["Label_ChallengeUserColor"]  = "White";
                        }else if (GlobalClass.StoneClass.str_listData2[i][7] != "-1"){
                            obj["Label_ChallengeUser"] =  GlobalClass.StoneClass.str_listData2[i][7];
                        }
                            obj["Label_ArenaTime"] = GlobalClass.StoneClass.str_listData2[i][8];
                            dataArr.push(obj);
                        }
                        var collection = new eui.ArrayCollection();
                        collection.source = dataArr;
                        this.mPanel.Arena2List.dataProvider = collection;
                    }
                break;
        }
    }

}