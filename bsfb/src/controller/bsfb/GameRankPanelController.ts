/**
 *
 * @author 
 *
 */
class GameRankPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.BSFB.TOP_MSG,];
	}
	
    protected onReady() {
        this.mPanel.lucklist.itemRenderer = GameRankItem;
        this.mPanel.wealthlist.itemRenderer = GameRankItem;
        this.lucklistArr = [];
        this.wealthlistArr = [];
    }

    protected onShow(){//在界面上显示出来
        this.Btn_luckClick();
    }
	
    private on170_event(event: egret.Event): void {
        console.log("on170_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.Ranklist.str_Ranklist_Type = strArray [2];
		GlobalClass.Ranklist.str_MyRanklistInfo = strArray [4].split (',');
		GlobalClass.Ranklist.str_Ranklist_MyRanklist = GlobalClass.Ranklist.str_MyRanklistInfo [0];
		GlobalClass.Ranklist.str_Ranklist_MyLessCount = GlobalClass.Ranklist.str_MyRanklistInfo [1];
		GlobalClass.Ranklist.str_Ranklist_MyCP = GlobalClass.Ranklist.str_MyRanklistInfo [2];
		if (strArray [3] != null && strArray [3] != "null") {
			GlobalClass.Ranklist.str_RanklistInfo_Group = strArray [3].split (';');
			GlobalClass.Ranklist.isCreatRanklistInfo = true;
		}
        this.CreateRanklistInfo();
    }

    private CreateRanklistInfo(){
        GlobalClass.Ranklist.str_RanklistData = new Array(GlobalClass.Ranklist.str_RanklistInfo_Group.length);
        GlobalClass.Ranklist.str_Ranklist = new Array(GlobalClass.Ranklist.str_RanklistInfo_Group.length);
        GlobalClass.Ranklist.str_UserID = new Array(GlobalClass.Ranklist.str_RanklistInfo_Group.length);
        GlobalClass.Ranklist.str_NickName = new Array(GlobalClass.Ranklist.str_RanklistInfo_Group.length);
        GlobalClass.Ranklist.str_UserCount = new Array(GlobalClass.Ranklist.str_RanklistInfo_Group.length);
        GlobalClass.Ranklist.str_UserCP = new Array(GlobalClass.Ranklist.str_RanklistInfo_Group.length);
        var _int_Ranklist = GlobalClass.Ranklist.str_RanklistInfo_Group.length;
        var _intType = Number(GlobalClass.Ranklist.str_Ranklist_Type) - 1;
        for (var i = 0; i < _int_Ranklist; i++)
        {
            if(GlobalClass.Ranklist.str_RanklistInfo_Group[i]==""){
                continue;
            }
            GlobalClass.Ranklist.str_RanklistData[i] = GlobalClass.Ranklist.str_RanklistInfo_Group[i].split(',');
            GlobalClass.Ranklist.str_Ranklist[i] = GlobalClass.Ranklist.str_RanklistData[i][0];
            GlobalClass.Ranklist.str_UserID[i] = GlobalClass.Ranklist.str_RanklistData[i][1];
            GlobalClass.Ranklist.str_NickName[i] = GlobalClass.Ranklist.str_RanklistData[i][2];
            GlobalClass.Ranklist.str_UserCount[i] = GlobalClass.Ranklist.str_RanklistData[i][3];
            GlobalClass.Ranklist.str_UserCP[i] = GlobalClass.Ranklist.str_RanklistData[i][4];
            var obj = new Object();
            obj["nickname"] = GlobalClass.Ranklist.str_NickName[i];
            obj["count"] = GlobalClass.Ranklist.str_UserCount[i];
            obj["time"] = GlobalClass.Ranklist.str_UserCP[i];
            if (_intType == 4)
            {
                this.lucklistArr.push(obj);
            }
            else if (_intType == 3)
            {
               this.wealthlistArr.push(obj);;
            }
        }
        if(_intType==4){
            this.mPanel.luckscroll.visible = true;
            this.mPanel.wealthscroll.visible = false;
            var collection = new eui.ArrayCollection();
            collection.source = this.lucklistArr;
            this.mPanel.lucklist.dataProvider = collection;  
        }
        if(_intType==3){
            this.mPanel.luckscroll.visible = false;
            this.mPanel.wealthscroll.visible = true;
            var collection2 = new eui.ArrayCollection();
            collection2.source = this.wealthlistArr;
            this.mPanel.wealthlist.dataProvider = collection2;  
        }
        

       
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_luck,egret.TouchEvent.TOUCH_END,this.Btn_luckClick,this);
        this.AddClickEvent(this.mPanel.Btn_wealth,egret.TouchEvent.TOUCH_END,this.Btn_wealthClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_luck,egret.TouchEvent.TOUCH_END,this.Btn_luckClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_wealth,egret.TouchEvent.TOUCH_END,this.Btn_wealthClick,this);
    }
    
    private lucklistArr:Array<Object>;
    private wealthlistArr:Array<Object>;
    private Btn_luckClick(){
        if(this.lucklistArr.length==null||this.lucklistArr.length==0){
            var js = { TopType: 5};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.TOP_MSG,JSON.stringify(js));
        }else{
            this.mPanel.luckscroll.visible = true;
            this.mPanel.wealthscroll.visible = false;
        }
        this.mPanel.Btn_luck.filters = [new egret.GlowFilter(0xFFD800,0.8,2,2)];
        this.mPanel.Btn_wealth.filters = [];
    }
    private Btn_wealthClick(){
       if(this.wealthlistArr.length==null||this.wealthlistArr.length==0){
            var js = { TopType: 4};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.TOP_MSG,JSON.stringify(js));
        }else{
            this.mPanel.luckscroll.visible = false;
            this.mPanel.wealthscroll.visible = true;
        }
        this.mPanel.Btn_wealth.filters = [new egret.GlowFilter(0xFFD800,0.8,2,2)];
        this.mPanel.Btn_luck.filters = [];
    }
    private Btn_CloseClick(){
        this.mPanel.hide();
    }
}