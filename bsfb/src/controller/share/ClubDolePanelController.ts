/**
 *
 * @author 
 *
 */
class ClubDolePanelController extends KFController{ 
    private positionDefineNum;
    private PositionTableDefine;
    private Json_PositionInfo;
    private Json_PositionDefine;
    private str_Receive_Times;
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.CLUB.CONTRIBUTION_DOLE,
            MsgID.CLUB.RECEIVE_DOLE,
            MsgID.CLUB.SET_RECEIVE_TIMES,
            MsgID.USER.UPDATE_MONEY,
            MsgID.CLUB.DoleLog_CLUB,

            MsgID.CLUB.CLUBMSG,
            MsgID.CLUB.QuaryClubData,];
	}
	
    protected onReady() {
        this.Json_PositionInfo = KFControllerMgr.getCtl(PanelName.ClubPanel).getJson_PositionInfo();
        this.Json_PositionDefine = KFControllerMgr.getCtl(PanelName.ClubPanel).getJson_PositionDefine();
        if(this.Json_PositionInfo==null||this.Json_PositionDefine==null){
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");
        }
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.QuaryClubData,"");
    }

    protected onShow(){//在界面上显示出来
        this.mPanel.Panel_ClubDoleInfo.visible = false;
        this.mPanel.Panel_Jurisdiction.visible = false;
        this.mPanel.Btn_Help.visible = false;
        this.mPanel.Panel_ReceiveClub_Num.visible = false;
        this.mPanel.Panel_DoleLog.visible = false;

        this.Json_PositionInfo = KFControllerMgr.getCtl(PanelName.ClubPanel).getJson_PositionInfo();
        this.Json_PositionDefine = KFControllerMgr.getCtl(PanelName.ClubPanel).getJson_PositionDefine();

        if(this.Json_PositionInfo==null||this.Json_PositionDefine==null){

        }else{
           this.initData();
        }
        this.mPanel.Lb_MyPoint.text = GlobalClass.UserInfo.str_Hall_totalScore;

        if(KFSceneManager.getInstance().getRuningSceneName()!="HallScene") {
            this.disableBut(this.mPanel.Btn_Contribution);
        }else{
            this.enableBut(this.mPanel.Btn_Contribution);
        }
    }
    private initData(){
         this.mPanel.Lb_ClubDole.text = GlobalClass.ClubClass.ClubDole + "/" + GlobalClass.ClubClass.DolelLimit;
            this.mPanel.Lb_Contribution.text = this.Json_PositionInfo[GlobalClass.ClubClass.MyPosition][4]+"";
            this.mPanel.Lb_ReceiveDole.text = this.Json_PositionInfo[GlobalClass.ClubClass.MyPosition][3]+"";
            if(GlobalClass.ClubClass.str_ReceiveTimes == "-1") {
                this.mPanel.Lb_ReceiveDoleTimes.text = "0";
            }else{
                this.mPanel.Lb_ReceiveDoleTimes.text = GlobalClass.ClubClass.str_ReceiveTimes;
            }
            var power = this.Json_PositionDefine[GlobalClass.ClubClass.MyPosition][2]+"";
            if(power == "0") {
                this.mPanel.Btn_Jurisdiction.getChildAt(1).text = "领取次数查看";
            }else if(power == "1") {
                this.mPanel.Btn_Jurisdiction.getChildAt(1).text = "领取次数设置";
            }
    }
    private on1001_event(event: egret.Event): void {
        console.log("on1001_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
         var jsonData = JSON.parse(datastr);
          var datastr = msg.getDataStr();
        // var datastr = '{"info": {"config": {"cost": 200000, "minLevel": 3}}, "code": 1001, "ret": 0}';
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"]
        GlobalClass.ClubClass.str_ClubMsgRet = ret+"";
        if(ret==1){
            GlobalClass.ClubClass.ClubDole = jsonData["info"]["details"]["pool"]+"";         //公会救济金
            GlobalClass.ClubClass.DolelLimit = jsonData["info"]["details"]["DolelLimit"]+""; //公会最大救济金
            this.Json_PositionDefine = jsonData["info"]["details"]["positionDefine"];
            this.Json_PositionInfo = jsonData["info"]["details"]["positionInfo"];//存储到该控制器中，以方便别的控制器使用该数据
            this.initData();
        }
    }
	
    private on1011_event(event: egret.Event): void {
        console.log("on1011_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
         var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc+"");
        if(ret == 1) {
             GlobalClass.ClubClass.ClubDole = jsonData["info"]["totalDole"]+"";
            this.mPanel.Lb_ClubDole.text = GlobalClass.ClubClass.ClubDole+"/"+GlobalClass.ClubClass.DolelLimit;

            if (KFSceneManager.getInstance().getRuningSceneName()=="HallScene") {
                KFControllerMgr.getCtl(PanelName.ClubPanel).SetDonateValue(jsonData["info"]["point"]);
            }
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
        }
    }
    private on1012_event(event: egret.Event): void {
        console.log("on1012_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc+"");
        if(ret == 1) {
             GlobalClass.ClubClass.ClubDole = jsonData["info"]["totalDole"]+"";
            GlobalClass.ClubClass.str_ReceiveTimes = jsonData["info"]["remainTimes"]+"";

            this.mPanel.Lb_ClubDole.text = GlobalClass.ClubClass.ClubDole;
            
            if(GlobalClass.ClubClass.str_ReceiveTimes == "-1")  {
                this.mPanel.Lb_ReceiveDoleTimes.text = "0";
            }else{
                this.mPanel.Lb_ReceiveDoleTimes.text = GlobalClass.ClubClass.str_ReceiveTimes;
            }
            
            if (KFSceneManager.getInstance().getRuningSceneName()=="HallScene") {
                 KFControllerMgr.getCtl(PanelName.ClubPanel).SetReceiveValue(jsonData["info"]["point"]);
            }
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
        }
    }
    private on1017_event(event: egret.Event): void {
        console.log("on1017_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
         var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc+"");
        if(ret == 1) {
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");
            this.mPanel.Panel_Jurisdiction.visible = false;
        }
    }
    private on113_event(event: egret.Event): void {
        console.log("on113_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        this.mPanel.Lb_MyPoint.text = strArray[2];
    }
    private on1029_event(event: egret.Event): void {
        console.log("on1029_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var logList = jsonData["datas"];
        if(logList.length == 0) {
            this.mPanel.Label_TitleInfo.visible = true;
        }else{
            this.mPanel.Label_TitleInfo.visible = false;
            var dataArr = [];
            for(let i=0;i<logList.length;i++){
                var obj = new Object();
                obj["userid"] =logList[i]["userid"]+"";
                obj["gid"] =logList[i]["gid"]+"";
                obj["nickName"] =logList[i]["nickname"]+"";
                obj["point"] = logList[i]["point"]+"";
                obj["action"] = logList[i]["action"]+"";
                obj["date"] = logList[i]["date"]+"";
                obj["time"] = CommonFuc.getDate(obj["date"]+"");
                dataArr.push(obj);
            }
            var collection = new eui.ArrayCollection();
            collection.source = dataArr;
            this.mPanel.DoleLogList.dataProvider = collection;
        }
    }
    private on1035_event(event: egret.Event): void {
        console.log("on1035_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        if(ret==1){
            GlobalClass.ClubClass.MyPosition = jsonData["info"]["position"]+"";             //自己的职位
            GlobalClass.ClubClass.MaxSetTimes = jsonData["info"]["maxSetTimes"]+"";   
            GlobalClass.ClubClass.str_ReceiveTimes = jsonData["info"]["leftTimes"]+"";       //剩余领取救济金次数
            GlobalClass.ClubClass.ClubID = jsonData["info"]["details"]["id"]+"";             //公会ID
            GlobalClass.ClubClass.ClubDole = jsonData["info"]["details"]["pool"]+"";         //公会救济金
            GlobalClass.ClubClass.DolelLimit = jsonData["info"]["details"]["DolelLimit"]+""; //公会最大救济金
            GlobalClass.ClubClass.MyClubLevel = jsonData["info"]["details"]["level"]+"";     //公会等级
            GlobalClass.ClubClass.int_VerifyType = jsonData["info"]["details"]["VerifyType"];
            GlobalClass.ClubClass.str_Notice = jsonData["info"]["details"]["Notice"]+"";
            GlobalClass.ClubClass.int_applyNum = jsonData["info"]["details"]["applyNum"];

            KFControllerMgr.getCtl(PanelName.ClubPanel).setJson_PositionInfo(jsonData["info"]["details"]["positionInfo"]);
            KFControllerMgr.getCtl(PanelName.ClubPanel).setJson_PositionDefine(jsonData["info"]["details"]["positionDefine"]);

            this.Json_PositionDefine = jsonData["info"]["details"]["positionDefine"];
            this.Json_PositionInfo = jsonData["info"]["details"]["positionInfo"];
            this.positionDefineNum = jsonData["info"]["positionDefineNum"];

            this.PositionTableDefine = new Array(this.positionDefineNum);
            for(let i=0;i<this.positionDefineNum;i++){
                this.PositionTableDefine[i] = jsonData["info"]["details"]["positionDefine"][i+1];
            }
            this.PositionTableDefine.sort(
                function(a,b){
                    return a[4] - b[4];
                }
            );
            if(GlobalClass.ClubClass.str_ReceiveTimes == "-1") {
                this.mPanel.Lb_ReceiveDoleTimes.text = "0";
            }else{
                this.mPanel.Lb_ReceiveDoleTimes.text = GlobalClass.ClubClass.str_ReceiveTimes;
            }
        }else if(ret ==0){
            GlobalClass.ClubClass.CreatClubCost = jsonData["info"]["config"]["cost"]+"";        //创建费用
            GlobalClass.ClubClass.CreatClubLevel = jsonData["info"]["config"]["minLevel"]+"";   //等级要求
        }
    }

    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_CloseClubDole,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubDoleClick,this);
        this.AddClickEvent(this.mPanel.Btn_Jurisdiction,egret.TouchEvent.TOUCH_END,this.Btn_JurisdictionClick,this);
        this.AddClickEvent(this.mPanel.Btn_Contribution,egret.TouchEvent.TOUCH_END,this.Btn_ContributionClick,this);
        this.AddClickEvent(this.mPanel.Btn_Receive,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveClick,this);
        this.AddClickEvent(this.mPanel.Btn_Receive_Contribution,egret.TouchEvent.TOUCH_END,this.Btn_Receive_ContributionClick,this);
        this.AddClickEvent(this.mPanel.Btn_ReceiveAll_Contribution,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveAll_ContributionClick,this);
        this.AddClickEvent(this.mPanel.Btn_Setting,egret.TouchEvent.TOUCH_END,this.Btn_SettingClick,this);
        this.AddClickEvent(this.mPanel.Btn_CloseJurisdictionPanel,egret.TouchEvent.TOUCH_END,this.Btn_CloseJurisdictionPanelClick,this);
        this.AddClickEvent(this.mPanel.Btn_Log,egret.TouchEvent.TOUCH_END,this.Btn_LogClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClosePanel,egret.TouchEvent.TOUCH_END,this.Btn_ClosePanelClick,this);
        this.AddClickEvent(this.mPanel.Btn_CloseClubDoleInfo,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubDoleInfoClick,this);
        this.AddClickEvent(this.mPanel.Btn_Help,egret.TouchEvent.TOUCH_END,this.Btn_HelpClick,this);
        this.AddClickEvent(this.mPanel.Btn_CloseDolelog,egret.TouchEvent.TOUCH_END,this.Btn_CloseDolelogClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_CloseClubDole,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubDoleClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Jurisdiction,egret.TouchEvent.TOUCH_END,this.Btn_JurisdictionClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Contribution,egret.TouchEvent.TOUCH_END,this.Btn_ContributionClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Receive,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Receive_Contribution,egret.TouchEvent.TOUCH_END,this.Btn_Receive_ContributionClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ReceiveAll_Contribution,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveAll_ContributionClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Setting,egret.TouchEvent.TOUCH_END,this.Btn_SettingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseJurisdictionPanel,egret.TouchEvent.TOUCH_END,this.Btn_CloseJurisdictionPanelClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Log,egret.TouchEvent.TOUCH_END,this.Btn_LogClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClosePanel,egret.TouchEvent.TOUCH_END,this.Btn_ClosePanelClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseClubDoleInfo,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubDoleInfoClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Help,egret.TouchEvent.TOUCH_END,this.Btn_HelpClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseDolelog,egret.TouchEvent.TOUCH_END,this.Btn_CloseDolelogClick,this);
    }

    private Btn_CloseDolelogClick(){
        this.mPanel.Panel_DoleLog.visible = false;
    }

    private Btn_HelpClick(){
        this.mPanel.Panel_ClubDoleInfo.visible = true;
        var dataArr = [];
        this.Json_PositionInfo = KFControllerMgr.getCtl(PanelName.ClubPanel).getJson_PositionInfo();
        for(let i =0;i<this.positionDefineNum;i++){
            var obj = new Object();
            obj["Lb_Name"] = this.Json_PositionInfo[i+""][1]+"";
            if(this.Json_PositionInfo[i+""][2] == "-1"){
                obj["Lb_Times"] = "0";
            }else{
                obj["Lb_Times"] = this.Json_PositionInfo[i+""][2]+"";
            }
            obj["Lb_EachGetPoint"] = this.Json_PositionInfo[i+""][3]+"";
            dataArr.push(obj);
        }   
        var collection = new eui.ArrayCollection();
        collection.source = dataArr;
        this.mPanel.ClubDoleList.dataProvider = collection;
    }

    private Btn_LogClick(){
        this.mPanel.Panel_DoleLog.visible = true;
        this.mPanel.Label_TitleInfo.visible = true;
        var js = {gid: GlobalClass.ClubClass.ClubID,userid: GlobalClass.UserInfo.str_UserID};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.DoleLog_CLUB,JSON.stringify(js));
    }
    private Btn_JurisdictionClick(){
        this.mPanel.Panel_Jurisdiction.visible = true;

        this.Json_PositionInfo = KFControllerMgr.getCtl(PanelName.ClubPanel).getJson_PositionInfo();
        this.Json_PositionDefine = KFControllerMgr.getCtl(PanelName.ClubPanel).getJson_PositionDefine();
        this.str_Receive_Times = {};
        var dataArr = [];
        for(let i=0;i<this.positionDefineNum;i++){
            
            var index = this.PositionTableDefine[i][0]+"";  
            if(Number(index) == 1 || Number(index) == 6) {

            }else{
                var obj = new Object();
                if(this.Json_PositionInfo[index][2] == "-1"){
                    obj["Lb_Times"] = 0;
                    this.str_Receive_Times[this.Json_PositionDefine[index][0]+""] = "0"; 
                }else{
                    obj["Lb_Times"] = this.Json_PositionInfo[index][2]+"";
                    this.str_Receive_Times[this.Json_PositionDefine[index][0]+""] = this.Json_PositionInfo[index][2]+"";
                }
                if (Number(obj["Lb_Times"]) > Number(GlobalClass.ClubClass.MaxSetTimes)) {
                    obj["Lb_Times"] = GlobalClass.ClubClass.MaxSetTimes;
                    this.str_Receive_Times[this.Json_PositionDefine[index][0]+""] = GlobalClass.ClubClass.MaxSetTimes+"";
                }

                obj["Lb_EachGet"] = this.Json_PositionInfo[index][3]+"";
                obj["Lb_Position"] = this.Json_PositionDefine[index][1]+ LocalizationMgr.getText("每月领救济金次数:");
                obj["index"] = this.Json_PositionDefine[index][0]+"";
                if (Number(GlobalClass.ClubClass.MyClubLevel) >= 6 && GlobalClass.ClubClass.MyPosition == "1") {
                    obj["buttonEnable"] = "1";
                }else{
                    obj["buttonEnable"] = "0";
                }
                dataArr.push(obj);
            }
        }
        var collection = new eui.ArrayCollection();
        collection.source = dataArr;
        this.mPanel.JurisdictionInfoList.dataProvider = collection;
         if (Number(GlobalClass.ClubClass.MyClubLevel) >= 6 && GlobalClass.ClubClass.MyPosition == "1") {
             this.enableBut(this.mPanel.Btn_Setting);
        }else{
            this.disableBut(this.mPanel.Btn_Setting);
        }
    }
    private Btn_ContributionClick(){
        var cbFun = ()=>{
                     var js = {guildID: GlobalClass.ClubClass.ClubID,point: this.mPanel.Lb_Contribution.text};
                    WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CONTRIBUTION_DOLE,JSON.stringify(js));   
                }
        if(!GlobalClass.HallClass.bCodeProtect_Open || GlobalClass.HallClass.bCodeProtect_HaveChecked) {
            var title = LocalizationMgr.getText("确认捐入{0}点数?\n\(身上必须保留{1}点数)\n\此为公会公用救济金，捐入后不可随意领取", this.mPanel.Lb_Contribution.text,GlobalClass.HallClass.str_Hall_IntLevel[3]) ;
             KFControllerMgr.showTips(title,0,2,cbFun);
        }else{
            //打开保护面板
            KFControllerMgr.getCtl(PanelName.GameProtectPanel).setCb(
                ()=>{
                    var title = LocalizationMgr.getText("确认捐入{0}点数?\n\(身上必须保留{1}点数)\n\此为公会公用救济金，捐入后不可随意领取", this.mPanel.Lb_Contribution.text,GlobalClass.HallClass.str_Hall_IntLevel[3]) ;
                    KFControllerMgr.showTips(title,0,2,cbFun);
                },1
            ).show();
        }
    }
    private Btn_ReceiveClick(){
        if (this.mPanel.Lb_ReceiveDole.text == "0") {
            KFControllerMgr.showTips("亲，你的职位太低！无法领取救济金哦，快去让会长级的大大们提拔你吧！");
            return;
        }
        if(GlobalClass.ClubClass.str_ReceiveTimes=="-1" || GlobalClass.ClubClass.str_ReceiveTimes=="0") {
            KFControllerMgr.showTips("本月已无可领取救济金次数！");
            return;
        }
        this.ShowReceiveClub_Num_Panel();
    }
    private Btn_Receive_ContributionClick(){
        var js = {guildID: GlobalClass.ClubClass.ClubID,getAll: "0"};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.RECEIVE_DOLE,JSON.stringify(js));   
        this.Btn_ClosePanelClick();
    }
    private Btn_ClosePanelClick(){
        this.mPanel.Panel_ReceiveClub_Num.visible = false;
    }
    private Btn_ReceiveAll_ContributionClick(){
        var js = {guildID: GlobalClass.ClubClass.ClubID,getAll: "1"};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.RECEIVE_DOLE,JSON.stringify(js));
        this.Btn_ClosePanelClick();
    }
    private Btn_SettingClick(){
        if (Number(GlobalClass.ClubClass.MyClubLevel) >= 6) {
         var jsonStr = JSON.stringify(this.str_Receive_Times);
         console.log("MyClubLevel: " + jsonStr);
         var js = {guildID: GlobalClass.ClubClass.ClubID,config: jsonStr};
         WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.SET_RECEIVE_TIMES,JSON.stringify(js));   
        }else{
            this.mPanel.Panel_Jurisdiction.visible = false;
        }
    }
    private Btn_CloseJurisdictionPanelClick(){
         this.mPanel.Panel_Jurisdiction.visible = false;
    }
    private Btn_CloseClubDoleClick(){
        this.mPanel.hide();
    }

    private Btn_CloseClubDoleInfoClick(){
        this.mPanel.Panel_ClubDoleInfo.visible = false;
    }

    private ShowReceiveClub_Num_Panel(){
        var times = "0";
        if(GlobalClass.ClubClass.str_ReceiveTimes) {
            if(GlobalClass.ClubClass.str_ReceiveTimes == "-1" ) {  
                times = "0";
            }else{
                times = GlobalClass.ClubClass.str_ReceiveTimes;
            }

            if (times == "0") {
                this.mPanel.Lb_OnceNum_Contribution.text = "0";
                this.mPanel.Lb_TotalNum_Contribution.text = "0";
            }else{ 
                this.mPanel.Lb_OnceNum_Contribution.text = "5000";
                this.mPanel.Lb_TotalNum_Contribution.text = ""+5000*Number(times);
            }
        }

        this.mPanel.Lb_times_Contribution.text = times;
        this.mPanel.Panel_ReceiveClub_Num.visible = true;
    }
    public updateStr_Receive_Times(index,value){
        this.str_Receive_Times[index] = value;
    }
}