class RoomLogPanelController extends KFController  {
    protected mPanel:RoomLogPanel;
    

    protected init(){
    	super.init();
        this.EventsList = [
        MsgID.DiceGame.QUERYLOG,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.mPanel.LogList.itemRenderer = DHTLogItem;
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.QUERYLOG,"");
            
    }

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
    }

    /// <summary>
    /// 查询房间列表信息
    /// </summary>
    /// <param name="jsonData"></param>
    private on422_event(event: egret.Event):void{
        console.log("on422_event");
        let msg:MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        if (jd ["ret"] == "1") {
            //成功
            let dataArray = jd['info'];
            let collection = new eui.ArrayCollection();
            collection.source = dataArray;
            this.mPanel.LogList.dataProvider = collection;
            this.mPanel.Label_Null.visible = dataArray.length <= 0;
        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }
    }

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        this.mPanel.hide();
    }

}