/**
 *
 * @author 
 *
 */
class WXHistoryPanelController extends KFController{ 
    
	private historyRecordArray;
    private HistoryRecordList = [];
    private currentRecodePage = 2;
    
	protected init(){
    	super.init();
        this.EventsList = [
           MsgID.WXHH.GET_FIVEGAME_HISTORY,];
	}
	
    protected onReady() {
       
    }

    protected onShow(){//在界面上显示出来
        this.currentRecodePage = 2;
         WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.GET_FIVEGAME_HISTORY,"");
    }
	
    private on2500_event(event: egret.Event):void  {
        console.log("on2500_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // datastr=' {"info": {"reasonType": 0, "desc": ""}, "cards": [[7, "2017-03-07 20:02:22"], [35, "2017-03-07 20:01:50"], [2, "2017-03-07 20:01:18"], [5, "2017-03-07 20:00:46"], [23, "2017-03-07 20:00:14"], [7, "2017-03-07 19:59:42"], [44, "2017-03-07 19:59:10"], [33, "2017-03-07 19:58:38"], [41, "2017-03-07 19:58:06"], [12, "2017-03-07 19:57:34"], [66, "2017-03-07 19:57:02"], [23, "2017-03-07 19:56:30"], [10, "2017-03-07 19:55:58"], [18, "2017-03-07 19:55:25"], [58, "2017-03-07 19:54:53"], [50, "2017-03-07 19:54:21"], [61, "2017-03-07 19:53:49"], [26, "2017-03-07 19:53:17"], [29, "2017-03-07 19:52:45"], [6, "2017-03-07 19:52:13"], [33, "2017-03-07 19:51:41"], [25, "2017-03-07 19:51:09"], [9, "2017-03-07 19:50:37"], [66, "2017-03-07 19:50:05"], [50, "2017-03-07 19:49:33"], [58, "2017-03-07 19:49:01"], [66, "2017-03-07 19:48:29"], [57, "2017-03-07 19:47:57"], [2,"2017-03-07 19:47:25"], [20, "2017-03-07 19:46:53"], [3, "2017-03-07 19:46:21"], [24, "2017-03-07 19:45:49"], [27, "2017-03-07 19:45:17"], [10, "2017-03-07 19:44:45"], [34, "2017-03-07 19:44:13"], [36, "2017-03-07 19:43:41"], [37, "2017-03-07 19:43:09"], [24, "2017-03-07 19:42:37"], [29, "2017-03-07 19:42:05"], [59, "2017-03-07 19:41:33"], [50, "2017-03-07 19:41:01"], [37, "2017-03-07 19:40:29"], [2, "2017-03-07 19:39:57"], [18, "2017-03-07 19:39:25"], [21, "2017-03-07 19:38:53"], [11, "2017-03-07 19:38:21"], [36, "2017-03-07 19:37:49"], [13, "2017-03-07 19:37:17"], [6, "2017-03-07 19:36:45"], [24, "2017-03-07 19:36:13"], [36, "2017-03-07 19:35:41"], [61, "2017-03-07 19:35:09"], [11, "2017-03-07 19:34:37"], [36, "2017-03-07 19:34:05"], [66, "2017-03-07 19:33:33"], [34, "2017-03-07 19:33:01"], [21, "2017-03-07 19:32:29"], [3, "2017-03-07 19:31:57"], [41, "2017-03-07 19:31:25"], [65, "2017-03-07 19:30:53"], [18, "2017-03-07 19:30:21"], [23, "2017-03-07 19:29:49"], [55, "2017-03-07 19:29:17"], [51, "2017-03-07 19:28:45"], [19, "2017-03-07 19:28:13"], [17, "2017-03-07 19:27:41"], [37, "2017-03-07 19:27:09"], [3, "2017-03-07 19:26:37"], [35, "2017-03-07 19:26:05"], [50, "2017-03-07 19:25:33"], [66, "2017-03-07 19:25:01"], [60, "2017-03-07 19:24:29"], [57, "2017-03-07 19:23:57"], [4, "2017-03-07 19:23:25"], [36, "2017-03-07 19:22:53"], [44, "2017-03-07 19:22:21"], [61, "2017-03-07 19:21:49"], [1, "2017-03-07 19:21:17"], [34, "2017-03-07 19:20:45"], [43, "2017-03-07 19:20:13"], [40, "2017-03-07 19:19:41"], [17, "2017-03-07 19:19:09"], [44, "2017-03-07 19:18:37"], [42, "2017-03-07 19:18:05"], [66, "2017-03-07 19:17:33"], [19, "2017-03-07 19:17:01"], [28, "2017-03-07 19:16:29"], [41, "2017-03-07 19:15:57"], [7, "2017-03-07 19:15:25"], [51, "2017-03-07 19:14:53"], [55, "2017-03-07 19:14:21"], [7, "2017-03-07 19:13:49"], [59, "2017-03-07 19:13:17"], [8, "2017-03-07 19:12:45"], [24, "2017-03-07 19:12:13"], [35, "2017-03-07 19:11:41"], [24, "2017-03-07 19:11:09"], [12, "2017-03-07 19:10:37"], [66, "2017-03-07 19:10:05"], [54, "2017-03-07 19:09:33"], [66, "2017-03-07 19:09:01"], [28, "2017-03-07 19:08:29"], [59, "2017-03-07 19:07:57"], [35, "2017-03-07 19:07:25"], [34, "2017-03-07 19:06:53"], [59, "2017-03-07 19:06:21"], [54, "2017-03-07 19:05:49"], [3, "2017-03-07 19:05:17"], [10, "2017-03-07 19:04:45"], [61, "2017-03-07 19:04:13"], [6, "2017-03-07 19:03:41"], [39, "2017-03-07 19:03:09"], [40, "2017-03-07 19:02:37"], [20, "2017-03-07 19:02:05"], [57, "2017-03-07 19:01:33"], [39, "2017-03-07 19:01:01"], [20, "2017-03-07 19:00:29"], [56, "2017-03-07 18:59:57"], [49, "2017-03-07 18:59:24"], [26, "2017-03-07 18:58:52"], [42, "2017-03-07 18:58:20"], [45, "2017-03-07 18:57:48"], [54, "2017-03-07 18:57:16"], [27, "2017-03-07 18:56:43"], [20, "2017-03-07 18:56:11"], [29, "2017-03-07 18:55:39"], [2, "2017-03-07 18:55:07"], [41, "2017-03-07 18:54:34"], [1, "2017-03-07 18:54:02"], [21, "2017-03-07 18:53:30"], [2, "2017-03-07 18:52:58"], [57, "2017-03-07 18:52:25"], [34, "2017-03-07 18:51:53"], [8, "2017-03-07 18:51:21"], [17, "2017-03-07 18:50:49"], [10, "2017-03-07 18:50:16"], [65, "2017-03-07 18:49:44"], [39, "2017-03-07 18:49:12"], [59, "2017-03-07 18:48:40"], [54, "2017-03-07 18:48:08"], [66, "2017-03-07 18:47:35"], [20, "2017-03-07 18:47:03"], [4, "2017-03-07 18:46:31"], [49, "2017-03-07 18:45:59"], [6, "2017-03-07 18:45:26"], [2, "2017-03-07 18:44:54"], [9, "2017-03-07 18:44:22"], [39, "2017-03-07 18:43:50"], [7, "2017-03-07 18:43:17"], [11, "2017-03-07 18:42:45"], [59, "2017-03-07 18:42:13"], [18, "2017-03-07 18:41:41"], [53, "2017-03-07 18:41:08"], [26, "2017-03-07 18:40:36"], [45, "2017-03-07 18:40:04"], [58, "2017-03-07 18:39:32"], [5, "2017-03-07 18:39:00"], [34, "2017-03-07 18:38:28"], [66, "2017-03-07 18:37:56"], [53, "2017-03-07 18:37:24"], [33, "2017-03-07 18:36:52"], [54, "2017-03-07 18:36:20"], [42, "2017-03-07 18:35:48"], [60, "2017-03-07 18:35:16"], [10, "2017-03-07 18:34:44"], [3, "2017-03-07 18:34:11"], [59, "2017-03-07 18:33:39"], [51, "2017-03-07 18:33:07"], [65, "2017-03-07 18:32:35"], [52, "2017-03-07 18:32:03"], [58, "2017-03-07 18:31:31"], [53, "2017-03-07 18:30:59"], [53, "2017-03-07 18:30:27"], [53, "2017-03-07 18:29:55"], [7, "2017-03-07 18:29:23"], [19, "2017-03-07 18:28:51"], [42, "2017-03-07 18:28:19"], [41, "2017-03-07 18:27:47"], [6, "2017-03-07 18:27:15"], [42, "2017-03-07 18:26:43"], [1, "2017-03-07 18:26:11"], [39, "2017-03-07 18:25:39"], [53, "2017-03-07 18:25:07"], [50, "2017-03-07 18:24:35"], [43, "2017-03-07 18:24:03"], [59, "2017-03-07 18:23:31"], [10, "2017-03-07 18:22:59"], [34, "2017-03-07 18:22:27"], [55, "2017-03-07 18:21:55"], [38, "2017-03-07 18:21:23"], [17, "2017-03-07 18:20:51"], [13, "2017-03-07 18:20:19"]], "ret": 1}';
        var jd = JSON.parse(datastr);
        if (jd ["ret"] == "0") {//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
			return;
		}
        if (jd["cards"]!=null) {
            this.historyRecordArray = jd["cards"].reverse();
			this.updateHistoryTable ();
		}
    }

    private updateHistoryTable(){
        var availabeNum = this.historyRecordArray.length - GlobalClass.FiveClass.str_LotteryRecord_Group.length;
		//清除开奖记录
		if (this.HistoryRecordList != null)
		{
            this.HistoryRecordList.forEach(element => {
                element.parent.removeChild(element);
            });
			this.HistoryRecordList=[];
		}

		this.mPanel.Label_CurrentPage.text = (this.currentRecodePage+1)+"";
        this.mPanel.Label_Pages.text = Math.floor(availabeNum/48) +"";

		var begindex = 0;

		if(availabeNum>48*3){
			begindex = availabeNum - 48 * 3;
		}

		var begvarime = "";
		var endTime = "";

        var cardNum = [0,0,0,0,0];
		for(var i = 0;i<48;i++){

			var dex = this.currentRecodePage * 48 + i+begindex;
			//计算概率
			var cardType = (this.historyRecordArray[dex][0]>>4); //牌型0-4
		    var num = (this.historyRecordArray[dex][0] & 0x0f);   //数字
            
			cardNum[cardType]++;

            var colunm = Math.floor(i / 8);
			var row = i % 8;

            var startx = 180;
            var starty = 175;
            var posx = startx + (row * 77.5);
            var posy = starty + (colunm * 43);
            var imgName = "";
             if (cardType == 4 && num == 1) //大王
		    {
                imgName = "Five_poker_4";
            }
		    else if(cardType == 4 && num == 2) //小王
		    {
                imgName = "Five_poker_5";
            }
		    else
		    {
		        imgName = "Five_poker_" + cardType;
		    }
            var img = new eui.Image(RES.getRes(imgName));
            img.x = posx;
            img.y = posy;
            this.HistoryRecordList.push(img);
            this.mPanel.addChild(img);
			if(i==0){
				var re = this.historyRecordArray [dex] [1].split (' ');
				var re2 = re[1].split (':');
				begvarime = re2[0]+":"+re2[1];
			}
			if(i==47){
				var re = this.historyRecordArray [dex] [1].split (' ');
				var re2 = re[1].split (':');
				endTime = re2[0]+":"+re2[1];
			}
		}
		for(var i=0;i<5;i++){
			this.mPanel.WinCountGroup.getChildAt(i).text = ((cardNum[i]/ 48 )* 100).toFixed(2)+"%";
		}
		

		this.mPanel.Label_Time.text = begvarime+"~"+endTime;
    }

    /// <summary>
	/// 上一页
	/// </summary>
	/// <param name="_go"></param>
	private Btn_FirstPageClick(){
		this.currentRecodePage = 0;
		this.updateHistoryTable ();
	}

	/// <summary>
	/// 最后一页
	/// </summary>
	/// <param name="_go"></param>
	private  Btn_EndPageClick(){
		this.currentRecodePage = 2;
		this.updateHistoryTable ();
	}

	/// <summary>
	/// 上一页
	/// </summary>
	/// <param name="_go"></param>
	private  Btn_PageUpClick(){
		this.currentRecodePage --;
		if (this.currentRecodePage < 0) {
			this.currentRecodePage = 0;
		}
		this.updateHistoryTable ();
	}

	/// <summary>
	/// 下一页
	/// </summary>
	/// <param name="_go"></param>
	private  Btn_PageDownClick(){
		this.currentRecodePage ++;
		if (this.currentRecodePage > 2) {
			this.currentRecodePage = 2;
		}
		this.updateHistoryTable ();
	}
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_FirstPage,egret.TouchEvent.TOUCH_END,this.Btn_FirstPageClick,this);
        this.AddClickEvent(this.mPanel.Btn_PageUp,egret.TouchEvent.TOUCH_END,this.Btn_PageUpClick,this);
        this.AddClickEvent(this.mPanel.Btn_PageDown,egret.TouchEvent.TOUCH_END,this.Btn_PageDownClick,this);
        this.AddClickEvent(this.mPanel.Btn_EndPage,egret.TouchEvent.TOUCH_END,this.Btn_EndPageClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_FirstPage,egret.TouchEvent.TOUCH_END,this.Btn_FirstPageClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_PageUp,egret.TouchEvent.TOUCH_END,this.Btn_PageUpClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_PageDown,egret.TouchEvent.TOUCH_END,this.Btn_PageDownClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_EndPage,egret.TouchEvent.TOUCH_END,this.Btn_EndPageClick,this);
    }
    

    private Btn_CloseClick(){
        this.mPanel.hide();
    }
}