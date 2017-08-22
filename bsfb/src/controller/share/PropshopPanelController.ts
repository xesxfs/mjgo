/**
 *
 * @author 
 *
 */
class PropshopPanelController extends KFController{ 
    private _toggleType = 1;//1是点数 2是VIP 3是我的道具 4是购买道具
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.Hall.REQUEST_MALLPROPS_LIST,
            MsgID.USER.BUY_PROPS,
            MsgID.USER.UPDATE_PROPS,
            MsgID.USER.UPDATE_MONEY,
            MsgID.Hall.GET_VIPINFO,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        var js = {key: GlobalClass.GameInfoForConfig.UniqueSerial};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.GET_VIPINFO,JSON.stringify(js));    
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.REQUEST_MALLPROPS_LIST,JSON.stringify(js));
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_PROPS,"");
        this.mPanel.Label_NickName.text = CommonFuc.subString(GlobalClass.UserInfo.str_UserNickname,8,true) ;
        this.mPanel.MyProps.visible = false;
        if(KFSceneManager.getInstance().getRuningSceneName()=="BSFBScene"||KFSceneManager.getInstance().getRuningSceneName()=="LZTBScene") {
            var score = (Number(GlobalClass.UserInfo.str_Game_lastTotalScore) - Number(GlobalClass.UserInfo.str_Game_lastTodayScore))+"";
            this.SetUserScore(score);
            this.EnableOrDisEnablePropItem(! GlobalClass.GameClass.bsfbIsAutoPlay);
        }else if(KFSceneManager.getInstance().getRuningSceneName()=="DHSScene") {
            this.SetUserScore(GlobalClass.UserInfo.str_Hall_totalScore);
            this.EnableOrDisEnablePropItem(!GlobalClass.DiceGameClass.isRunning);
        }else{
            this.SetUserScore(GlobalClass.UserInfo.str_Hall_totalScore);
            this.EnableOrDisEnablePropItem(true);
        }
        
        if(this._toggleType == 1) {
            this.Toggle_GameScoreClick();
        }else if(this._toggleType == 2) {
            this.Toggle_GameVIPClick();
        }else if(this._toggleType == 3) {
            this.Toggle_MyPropsClick();
        }else if(this._toggleType == 4) {
            // this.Toggle_MyProps_OnClick(nil);
        }
    }
    private setToggleType(value):any{
        this._toggleType = value;
        return this;
    }
    private EnableOrDisEnablePropItem(isEnable){
        this.mPanel.Panel_List.visible = isEnable;
        this.mPanel.Label_Tips.visible = !isEnable;
    }
    private on151_event(event: egret.Event): void {
        console.log("on151_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        var length = strArray.length;
        var str_PropsAmount = [];
        if (length == 2 ){
            str_PropsAmount.push("0");
        }else{
            var str_PropsGroup1 = strArray[2].split(";");
            str_PropsGroup1.forEach(element => {
                var str_Props = element.split(",");
                str_PropsAmount.push(str_Props[1]);
            });
        }
        if(str_PropsAmount.length > 1) { 
            this.mPanel.Label_LoudSpeakerAmount.text = str_PropsAmount[0];
            this.mPanel.Label_LuckyAmount.text = str_PropsAmount[1];
        }
    }
    private on152_event(event: egret.Event): void {
        console.log("on152_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if (strArray[4] == "0") {  //购买成功
            KFControllerMgr.showTips("购买成功!");
            if(GlobalClass.UserInfo.str_Game_currentTotalScore==""){
                GlobalClass.UserInfo.str_Game_lastTodayScore = "0";
                GlobalClass.UserInfo.str_Game_lastTotalScore = "0";
            }else{
                GlobalClass.UserInfo.str_Game_lastTodayScore = GlobalClass.UserInfo.str_Game_currentTodayScore;
                GlobalClass.UserInfo.str_Game_lastTotalScore = GlobalClass.UserInfo.str_Game_currentTotalScore;
            }
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_PROPS,"");
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
        }else if(strArray[4] == "1"){//购买失败
             KFControllerMgr.showTips("购买失败!");
        }else if(strArray[4] == "2"){//金币不足
            KFControllerMgr.showTips("点数不足!");
        }else if(strArray[4] == "3"){//手气功能暂时停止开放
            KFControllerMgr.showTips("手气道具暂时停止开放...");
        }
        this.mPanel.PurchaseHorn.visible = false;
    }
    private on113_event(event: egret.Event): void {
        console.log("on113_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
       GlobalClass.UserInfo.str_Hall_totalScore = strArray[2];
        this.SetUserScore(GlobalClass.UserInfo.str_Hall_totalScore);
    }

    private SetUserScore(args){
        this.mPanel.Label_Props_TotalScore.text = args;
    }
    private on160_event(event: egret.Event): void {
        console.log("on160_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        var str0 = strArray[2].split(";");
 
        var str_VIPID_Group = [];
        var str_VIPName_Group = [];
        var str_VIPPrice = [];
        var str_VIPType = [];

        str0.forEach(element => {
            if(element!=""){
                var _str_VIPinfo = element.split(",");
                str_VIPID_Group.push(_str_VIPinfo[0]);
                str_VIPName_Group.push(_str_VIPinfo[1]);
                str_VIPPrice.push(_str_VIPinfo[2]);
                str_VIPType.push(_str_VIPinfo[4]);
            }
        });
        GlobalClass.TaskClass.str_VIPInfo_Group = str0;
        GlobalClass.TaskClass.str_VIPID_Group = str_VIPID_Group;
        GlobalClass.TaskClass.str_VIPName_Group = str_VIPName_Group;
        GlobalClass.TaskClass.str_VIPPrice = str_VIPPrice;
        GlobalClass.TaskClass.str_VIPType = str_VIPType;
    }
	
    private on150_event(event: egret.Event): void {
        console.log("on150_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        var str_PropsId = [];
        var str_PropsPrices = [];
        var str_PropsVIPPrices = [];
        var str_PropsType = [];
        var str_PropsName = [];
        var str_listData = [];
    
        var str_ScoreId = [];
        var str_ScorePrices = [];
        var str_ScoreName = [];
        var str_ScoreType = [];
        var str_listData2 = [];

        var str_PropsGroup = strArray[2].split(";"); //道具数据,道具1ID, 道具1价格，道具1类型,道具1名称,道具1属性值; 道具2ID, 道具2价格，道具2类型,道具2名称,道具2属性值
        var str_ScoreGroup = strArray[3].split(";");//点数数据,点数1ID, 点数1价格，点数1数值; 点数2ID, 点数2价格，点数2数值
        str_PropsGroup.forEach(element => {
            var _str_Props = element.split(",");
            str_PropsPrices.push(_str_Props[1]);//对应的道具价格
            str_PropsPrices.push(_str_Props[4]);//对应的道具VIP价格
        });
        GlobalClass.GameClass.str_PropsPrices = str_PropsPrices;
        GlobalClass.GameClass.str_PropsVIPPrices = str_PropsVIPPrices;

        str_ScoreGroup.forEach(element => {
            var _str_Score = element.split(",");
            str_ScoreId.push(_str_Score[0]);
            str_ScorePrices.push(_str_Score[1]);
        });
        GlobalClass.GameClass.str_ScoreId = str_ScoreId;
        GlobalClass.GameClass.str_ScorePrices = str_ScorePrices;

        GlobalClass.GameClass.Str_PropsGroup = str_PropsGroup;
        GlobalClass.GameClass.Str_ScoreGroup = str_ScoreGroup;

        // this.CreateScoreInfo();
    }
    private CreateVIPInfo(){
        //创建VIP列表
        var dataArr = [];
        for(let i=0;i<GlobalClass.TaskClass.str_VIPName_Group.length;i++){
            var obj = new Object();
            obj["Label_Name"] = GlobalClass.TaskClass.str_VIPName_Group[i];
            obj["Label_Prices"] = "价格: "+GlobalClass.TaskClass.str_VIPPrice[i]+"元";
            obj["ID"] = GlobalClass.TaskClass.str_VIPID_Group[i];
            obj["Price"] = GlobalClass.TaskClass.str_VIPPrice[i];
            if(i==0){
                obj["img"] = "Props_VIP01";
            }else if(i==1){
                obj["img"] = "Props_VIP02";
            }else if(i==2){
                obj["img"] = "Props_VIP03";
            }
            obj["type"] = 2;
            dataArr.push(obj);
        }
        var collection = new eui.ArrayCollection();
        collection.source = dataArr;
        this.mPanel.propsList.dataProvider = collection;
    }

    private CreateScoreInfo(){
        //创建点数列表
    var str_listData2 = []
    var str_ScoreId = [];
    var str_ScorePrices = [];
    var str_ScoreName = [];
    var str_ScoreType = [];
    var ScoredataArr = [];
    var VIPdataArr = [];
    GlobalClass.GameClass.Str_ScoreGroup.forEach(element => {
        if(element!=""){
            var obj = new Object();
            var arr = element.split(",");
            str_listData2.push(arr);
            obj["ID"] = arr[0];     //点数ID
            obj["Price"] = arr[1];   //对应点数充值的价格
            obj["Money"] = arr[2];   //对应的充值点数名称（接收一个数值 如1000,5000）
            obj["Label_Name"] = arr[2]+"点数";
            obj["Label_Prices"] = "价格: "+arr[1]+"元";
            if(arr[2]=="120000"){
                obj["img"] = "Coin01";
            }else if(arr[2]=="300000"){
                obj["img"] = "Coin02";
            }else{
                obj["img"] = "Coin05";
            }
            obj["type"] = 1;
            ScoredataArr.push(obj);
        }
    });
    var collection = new eui.ArrayCollection();
    collection.source = ScoredataArr;
    this.mPanel.propsList.dataProvider = collection;
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        // this.AddClickEvent(this.mPanel.Btn_CloseChaseHorn,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        // this.AddClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);

        this.AddClickEvent(this.mPanel.Toggle_GameScore,egret.TouchEvent.CHANGE,this.Toggle_GameScoreClick,this);
        this.AddClickEvent(this.mPanel.Toggle_GameVIP,egret.TouchEvent.CHANGE,this.Toggle_GameVIPClick,this);
        this.AddClickEvent(this.mPanel.Toggle_MyProps,egret.TouchEvent.CHANGE,this.Toggle_MyPropsClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_GameScore,egret.TouchEvent.CHANGE,this.Toggle_GameScoreClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_GameVIP,egret.TouchEvent.CHANGE,this.Toggle_GameVIPClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_MyProps,egret.TouchEvent.CHANGE,this.Toggle_MyPropsClick,this);
    }
    private Btn_CloseClick(){
        this.mPanel.hide();
    }
    private Toggle_GameScoreClick(){
        this.mPanel.Toggle_GameScore.selected = true;
        this.CreateScoreInfo();
        this.mPanel.MyProps.visible = false;
        this.mPanel.Panel_List.visible = true;
    }
    
    private Toggle_GameVIPClick(){
        this.mPanel.Toggle_GameScore.selected = false;
        this.mPanel.Toggle_MyProps.selected = false;
        this.mPanel.Toggle_GameVIP.selected = true;
        this.CreateVIPInfo();
        this.mPanel.MyProps.visible = false;
        this.mPanel.Panel_List.visible = true;
    }
    private Toggle_MyPropsClick(){
        this.mPanel.Toggle_MyProps.selected = true;
        this.mPanel.MyProps.visible = true;
        this.mPanel.Panel_List.visible = false;
    }
    
}