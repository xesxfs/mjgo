/**
 *
 * @author 
 *
 */
class WXMylogPanelController extends KFController{ 
    private MylogItemList;
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.WXHH.GET_FIVEGAME_MYLOG,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.GET_FIVEGAME_MYLOG,"");
        this.mPanel.LogList.itemRenderer = WXLogItem;
        var s:eui.List;
    }
	
    private on2501_event(event: egret.Event): void {
        console.log("on90_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // datastr='{"info": {"reasonType": 0, "desc": ""}, "bets": [{"UserName": "ly8899", "Heart": 20000, "Diamond": 20000, "IsAward": 1, "RecordID": "1488893446170", "ShownCardType": 0, "AwardMoney": 76000, "UserID": 222668, "InputTime": "2017-03-07 21:31:07", "Joker": 20000, "Club": 20000, "PoolID": 1, "NickName": "\u72ec\u884c\u4fa0ly", "ID": 31, "Spade": 20000},{"UserName": "ly8899", "Heart": 20000, "Diamond": 20000, "IsAward": 1, "RecordID": "1488893446170", "ShownCardType": 0, "AwardMoney": 76000, "UserID": 222668, "InputTime": "2017-03-07 21:31:07", "Joker": 20000, "Club": 20000, "PoolID": 1, "NickName": "\u72ec\u884c\u4fa0ly", "ID": 31, "Spade": 20000}], "ret": 1}';
        var jd = JSON.parse(datastr);
        if (jd ["ret"] == "0") {//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
			return;
		}
        if (jd["bets"]!=null) {
            var data = jd["bets"];
			if (this.MylogItemList != null)
            {
                this.MylogItemList.forEach(element => {
                    element.parent.removeChild(element);
                });
                this.MylogItemList=[];
            }

            if(data.length>0){
                this.mPanel.Label_NoTips.visible =false;
            }else{
                this.mPanel.Label_NoTips.visible =true;
            }
                var dataArr = [];
            for(var i = 0 ;i<data.length;i++){
                var obj = new Object();
                var itemData =  data [i];
                var betNum = new Array(5);
                betNum[0] = Number( itemData["Spade"]);
                betNum[1] = Number(itemData ["Heart"]);
                betNum[2] = Number( itemData ["Club"]);
                betNum[3] = Number( itemData ["Diamond"]);
                betNum[4] = Number( itemData ["Joker"]);
                for(var j = 0;j<5;j++){
                    var dex = j + 1;
                    var type = Number( itemData["ShownCardType"]);
                    if(j==type){
                        obj["winType"] = j;
                    }
                    obj["porker"+j] = betNum [j];
                }
                var awardNum  = Number(itemData ["AwardMoney"]);
                var sum =  awardNum - (betNum [0] + betNum [1] + betNum [2] + betNum [3] + betNum [4]) ;
                if (sum > 0) {
                    obj["type"] = 2;
                } else {
                    obj["type"] = 1;
                }
                var time = itemData ["InputTime"];
                var re = time.split (' ');
                var dateArr = re[0].split ('-');

                obj["time"] = re[1];
                obj["date"] = dateArr[1]+"-"+dateArr[2];
                obj["sum"] = sum;
                dataArr.push(obj);


            }
            var collection = new eui.ArrayCollection();
            collection.source = dataArr;
            this.mPanel.LogList.dataProvider = collection;   
	        }
        
    }

    private updateMylogTable(){

    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }
    

    private Btn_CloseClick(){
        this.mPanel.hide();
    }
}