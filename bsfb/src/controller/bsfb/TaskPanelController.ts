/**
 *
 * @author 
 *
 */
class TaskPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.BSFB.RECEIVE_MONEY,];
	}
	
    protected onReady() {
        
    }

    protected onShow(){
        this.updateInfo();
    }

    private on127_event(event: egret.Event): void {
        console.log("on127_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.TaskClass.str_TaskType = strArray [2];
        GlobalClass.TaskClass.str_TaskMssage = strArray [3];//1-7，7代表需要进行低保二次验证
		GlobalClass.TaskClass.str_ReceiveTimes = strArray [4];
		GlobalClass.TaskClass.str_ReceiveConditions = strArray [6];
		GlobalClass.TaskClass.str_ReceiveScore = strArray [7];
        this.updateInfo();
    }

    public updateInfo(){
        // if (GlobalClass.TaskClass.str_TaskType == "0"){
        //     if (GlobalClass.TaskClass.str_ReceiveTimes != "0"){
        //         this.mPanel.Label_ReceiveTimes.text = "今天还剩余 " + "" + GlobalClass.TaskClass.str_ReceiveTimes + " 次免费领取点数机会";
        //      }else if (GlobalClass.TaskClass.str_ReceiveTimes == "0"){
        //         this.mPanel.Label_ReceiveTimes.text = "今天免费领取次数已达上限";
        //      }

		// 	this.mPanel.Label_ReceiveConditions.text = "领取条件：绑定手机后总点数(包括银行点数)\n少于" + GlobalClass.TaskClass.str_ReceiveConditions + "并且没有摆擂台";
        //     this.mPanel.Label_ReceiveScore.text = GlobalClass.TaskClass.str_ReceiveScore + "点数";
        // }else 
        if (GlobalClass.TaskClass.str_TaskType == "1") {
             switch (GlobalClass.TaskClass.str_TaskMssage) {
                case "0":
                    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1062));
                    WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"")
                    break;
                case "1":
                    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1063));
                    break;
                case "2":
                     KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1064));
                    break;
                case "3":
                    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1065));
                    break;
                case "4":
                    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1066));
                    break;
                case "5":
                    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1067));
                    break;
                case "6":
                    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1068));
                    break;
                 case "7":
                    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1069));
                    break;
                default:
                    KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1065));
                    break;
                }   
        }

        if (GlobalClass.TaskClass.str_ReceiveTimes != "0"){
            this.mPanel.Label_ReceiveTimes.text = "今天还剩余 " + "" + GlobalClass.TaskClass.str_ReceiveTimes + " 次免费领取点数机会";
        }else if (GlobalClass.TaskClass.str_ReceiveTimes == "0"){
            this.mPanel.Label_ReceiveTimes.text = "今天免费领取次数已达上限";
        }

		this.mPanel.Label_ReceiveConditions.text = "领取条件：绑定手机后总点数(包括银行点数)\n少于" + GlobalClass.TaskClass.str_ReceiveConditions + "并且没有摆擂台";
        this.mPanel.Label_ReceiveScore.text = GlobalClass.TaskClass.str_ReceiveScore + "点数";

    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
    }
    

    private Btn_CloseClick(){
        this.mPanel.hide();
    }

    private Btn_SureClick(){
        var js = { KEY: "1"};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.RECEIVE_MONEY,JSON.stringify(js));
        if (GlobalClass.HallClass.str_OpenBindingPhone == "1" && GlobalClass.HallClass.int_OpenBinding == 1) {
			if (GlobalClass.HallClass.str_BindingPhone == "0") {
                KFControllerMgr.getCtl(PanelName.BindingPhonePanel).show();
                return ;
			}
		}
    }
}