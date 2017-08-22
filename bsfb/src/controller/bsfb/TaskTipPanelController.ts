/**
 *
 * @author 
 *
 */
class TaskTipPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [];
	}
	
    protected onReady() {
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Charge,egret.TouchEvent.TOUCH_END,this.Btn_ChargeClick,this);
        this.AddClickEvent(this.mPanel.Btn_ReceiveDole,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveDoleClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Charge,egret.TouchEvent.TOUCH_END,this.Btn_ChargeClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ReceiveDole,egret.TouchEvent.TOUCH_END,this.Btn_ReceiveDoleClick,this);
    }
    

    private Btn_ChargeClick(){
        KFControllerMgr.getCtl(PanelName.PropshopPanel).show();
        this.mPanel.hide();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.show_shop, "2", "2");
    }
    private Btn_ReceiveDoleClick(){
        var js = { KEY: "0"};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.RECEIVE_MONEY,JSON.stringify(js));
        this.mPanel.hide();
    }
}