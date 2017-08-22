/**
 *
 * @author 
 *
 */
class BSFBExitPanelController extends KFController{ 
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.USER.LOGIN,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.mPanel.Label_TodayScore.text = KFControllerMgr.getCtl(PanelName.GamePanel).getTodayScore();
        this.mPanel.Label_TotalScore.text = KFControllerMgr.getCtl(PanelName.GamePanel).getTotalScore();
       this.mPanel.tips.textFlow = CommonFuc.parseColorText("选择[ff1000]“保留点数退出”[-]后您将离开本游戏，请您在保留期间（30天）内继续本游戏，若您保留期限结束前未继续游戏，将视为您自愿退出本游戏。 选择[ff1000]“放弃点数退出”[-]将视为您自愿放弃游戏当前状态及本场点数。");
        }

    private on90_event(event: egret.Event): void {
        console.log("on90_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
       
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_KeepExit,egret.TouchEvent.TOUCH_END,this.Btn_KeepExitClick,this);
        this.AddClickEvent(this.mPanel.Btn_GiveUpExit,egret.TouchEvent.TOUCH_END,this.Btn_GiveUpExitClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_KeepExit,egret.TouchEvent.TOUCH_END,this.Btn_KeepExitClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_GiveUpExit,egret.TouchEvent.TOUCH_END,this.Btn_GiveUpExitClick,this);
    }
    
    private Btn_KeepExitClick(){

        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.SAVEGAME_EXIT,"");
        KFSceneManager.getInstance().replaceScene(SceneName.Hall);
    }
    private Btn_GiveUpExitClick(){
        KFControllerMgr.getCtl(PanelName.BSFBExitSurePanel).show();
    }

    private Btn_CloseClick(){
        this.mPanel.hide();
    }
}