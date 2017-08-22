/**
 *
 * @author 
 *
 */
class GameScorePanelController extends KFController{ 
    
	private showType = 1;//1为从游戏场景进入，2为从龙珠场景进去
    private _tockon = "";

	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.BSFB.BEGIN_BSFB,
            MsgID.BSFB.RECOVERBSFB,
            MsgID.Hall.Msg_109,
            ];
	}

    private setType(type):any{
        this.showType =type;
        return this;
    }
     private on109_event(event: egret.Event): void {
        console.log("on109_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        if(ret == 1){
            this._tockon = jsonData["info"];
            this.gotoBSFB();
        }

     }

     private gotoBSFB(){
        var param1 = Number(GlobalClass.UserInfo.str_UserID)*89*2;
        var param2 = 100*97;
        var param = param1+this._tockon+param2+"";
         
        console.log("Panel_Hall_Ctrl.StartBtnOnClick para: "+param);
        var js = {param: new md5().hex_md5(param)};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.BEGIN_BSFB,JSON.stringify(js));
    }

    private on100_event(event: egret.Event): void {
        console.log("on100_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.UserInfo.str_Game_lastTotalScore = strArray[2];
        GlobalClass.UserInfo.str_Game_lastTodayScore = strArray[3];
        GlobalClass.GameClass.int_level = Number(strArray[4]);          
        var strs = strArray[5].split(",");
        GlobalClass.GameClass.f_brickArray = new Array(3);
        GlobalClass.GameClass.f_brickArray[0] = Number(strs[0]);
        GlobalClass.GameClass.f_brickArray[1] = Number(strs[1]);
        GlobalClass.GameClass.f_brickArray[2] = Number(strs[2]);

        GlobalClass.UserInfo.str_Game_lastSlotScore = strArray[6];

        if(strArray.length>=9){
            GlobalClass.UserInfo.useSpeedup=strArray[8];
        }
        
        KFSceneManager.getInstance().replaceScene(SceneName.BSFB);
    }
    
    private on101_event(event: egret.Event): void {
        console.log("on101_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if(strArray[2] == "0") {
            GlobalClass.UserInfo.str_Game_lastTotalScore = strArray[4];
            GlobalClass.UserInfo.str_Game_lastTodayScore = strArray[5];
            GlobalClass.GameClass.int_level = Number(strArray[6]);
            var strs1 = strArray[7].split(",");
            GlobalClass.GameClass.f_brickArray = new Array(3);
            GlobalClass.GameClass.f_brickArray[0] = Number(strs1[0]);
            GlobalClass.GameClass.f_brickArray[1] = Number(strs1[1]);
            GlobalClass.GameClass.f_brickArray[2] = Number(strs1[2]);
            GlobalClass.UserInfo.str_Game_lastSlotScore = strArray[8];
            if(strArray.length>=10){
                GlobalClass.UserInfo.useSpeedup=strArray[9];
            }
        }
        //进度为“龙珠探宝”的情况
        else if(strArray[2] == "1") {
            GlobalClass.SearchClass.str_dragonOption = strArray[3].split(",");
            GlobalClass.UserInfo.str_Search_lastTotalScore = strArray[4];
            GlobalClass.UserInfo.str_Search_lastTodayScore = strArray[5];
            GlobalClass.UserInfo.str_Search_lastSlotScore = strArray[8];
        }
        KFSceneManager.getInstance().replaceScene(SceneName.BSFB);
    }
    
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        if(this.showType==1){
            this.mPanel.Label_TotalScore.text = GlobalClass.UserInfo.str_Game_currentTotalScore;
            this.mPanel.Label_TodayScore.text = GlobalClass.UserInfo.str_Game_currentTodayScore;
        }else{
            this.mPanel.Label_TotalScore.text = GlobalClass.UserInfo.str_Search_currentTotalScore;
            this.mPanel.Label_TodayScore.text = GlobalClass.UserInfo.str_Search_currentTodayScore;
        }
        
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_Continue,egret.TouchEvent.TOUCH_END,this.Btn_ContinueClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Continue,egret.TouchEvent.TOUCH_END,this.Btn_ContinueClick,this);
    }
    

    private Btn_CloseClick(){
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.EXIT_BSFB,"");
        KFSceneManager.getInstance().replaceScene(SceneName.Hall);
    }

    private Btn_ContinueClick(){
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.EXIT_BSFB,"");
        // this.invoke(1,()=>{
        //     WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.BEGIN_BSFB,"");
        // },this);
        this.getToken();
    }

    private getToken(){
        var js = {userid: GlobalClass.UserInfo.str_UserID,param:new md5().hex_md5("cEVEgKXd")};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_109,JSON.stringify(js));
    }
}