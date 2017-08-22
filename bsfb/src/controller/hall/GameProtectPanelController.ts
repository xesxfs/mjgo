/**
 *
 * @author 
 *
 */
class GameProtectPanelController extends KFController{ 
    private gameProtect_CallBack;
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.Hall.Msg_1028,];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来

    }

	
    private on1028_event(event: egret.Event): void {
        console.log("on1028_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        if(ret == 1) {
            GlobalClass.HallClass.bCodeProtect_HaveChecked = true;
            this.Btn_CloseClick();
            if(this.gameProtect_CallBack!=null) { 
                this.gameProtect_CallBack();
            }
        }else{
            var desc = jsonData["info"]["desc"];
            KFControllerMgr.showTips(desc);
        }
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
        this.mPanel.Input_PhoneNum.text = "";
    }

    private Btn_SureClick(){
        var inputValue = this.mPanel.Input_PhoneNum.text;
        if(inputValue=="") {
            KFControllerMgr.showTips("口令不能为空");
        }
        var md5Str: string = new md5().hex_md5(inputValue);
        var js = {passwd: md5Str};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_1028,JSON.stringify(js));
    }
    public setCb(cbFun:Function,btnNameType?):any{
        this.gameProtect_CallBack = cbFun;
        if(btnNameType==1){
            this.mPanel.Btn_Sure.getChildAt(2).source = RES.getRes("querenjuanru");
        }else{
            this.mPanel.Btn_Sure.getChildAt(2).source = RES.getRes("jinruyouxi");
        }
        return this;
    }
}