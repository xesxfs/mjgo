/**
 *
 * @author 
 *
 */
class RollPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
         this.ListenObjList = [ {event:egret.TouchEvent.TOUCH_END,items:{"Btn_MyBank":"",
                                                    },},
                               {event:egret.TouchEvent.CHANGE,items:{"Toggle_Challenge":"",
                                                    },},
                            
                            ];//添加btn名为key，值为冷却时间，然后在类中添加btn名+Click的函数，即可自动注册btn事件 ,如 Btn_MyBankClick为函数名
        this.EventsList = [
            MsgID.USER.LOGIN,];
        
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来

    }
	
    private on90_event(event: egret.Event): void {
        console.log("on90_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
       
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