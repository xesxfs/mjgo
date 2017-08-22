/**
 *
 * @author 
 *
 */
class ExitPanelController extends KFController{ 
    private isShow = false;
	
	protected init(){
    	super.init();
        this.ListenObjList = [ {event:egret.TouchEvent.TOUCH_END,items:{
                                                                        "Btn_Close":"",
                                                                        "Btn_OK":"",
                                                                        "Btn_Cancle":"",
                                                                    },},
                            ];
        this.EventsList = [
            MsgID.USER.LOGIN,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.isShow = true;
    }
	
    private on90_event(event: egret.Event): void {
        console.log("on90_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
       
    }
    
    protected setOnClickListener() {
        // this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }

    protected removeOnClickListener() {
        // this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }
    
    public onBackClick(){
        if(!this.isShow){
            if(KFSceneManager.getInstance().getRuningSceneName()=="DHSScene"){
                NetEventMgr.getInstance().clientMsg(MsgID.Client.QuitDiceGame,"");
            }else{
                this.show();
            }
            
        }else{
            this.Btn_CloseClick();
        }
    }

    private Btn_CloseClick(){
        this.mPanel.hide();
        this.isShow = false;
    }
    private Btn_OKClick(){
        WebSocketMgr.getInstance().closeSocket();
        DeviceUtils.CloseGame();
    }
    private Btn_CancleClick(){
        this.mPanel.hide();
        this.isShow = false;
    }
}