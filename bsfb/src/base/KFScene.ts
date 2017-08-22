/**
 *
 * @author 
 *
 */
class KFScene extends eui.Component{
    
    protected PanelAdded:Array<KFPanel> = null;
    protected TAG:string = ";"
	public constructor() {
        super();
        this.PanelAdded = new Array<KFPanel>();
        this.percentHeight =100;
        this.percentWidth = 100;
        this.init();
	}
	
	protected init(){
	}

    private on1021_event(event: egret.Event): void {
        console.log("on1021_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsdata = JSON.parse(datastr);
        let action = jsdata["action"]+"";
        let text = jsdata["text"]+"";
        let time = Number(jsdata["time"]);
        KFControllerMgr.showTips(text);
    }

    private on10002_event(event: egret.Event): void {
        console.log("on10002_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        KFControllerMgr.showTips(datastr,2,1,()=>{
            // WebSocketMgr.getInstance().closeSocket();
            DeviceUtils.CloseGame();
        },"╮(╯﹏╰)╭");
    }

    private on92001_event(event: egret.Event): void {
        console.log("on92001_event");
        var result = <string>event.data;
         console.log("on92001_event"+result);
        if(result=="1"){
            KFControllerMgr.showTips("订单支付成功!");
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.CHECK_USER_VIP,"");
        }else if(result=="0"||result=="4000"){
            KFControllerMgr.showTips("订单支付失败!");
        }else if(result=="6001"){
            KFControllerMgr.showTips("交易取消!");
        }else{
            this.PaySuccess(result);
        }
    }

    private PaySuccess(_str_message:string){
        let str_OrderID = _str_message.split(',');

        let str_OrderID2 = str_OrderID[1].split('#' );
		SendMsgForWebService.ApplePay(str_OrderID2[0], str_OrderID2[2], GlobalClass.GameInfoForConfig.UniqueSerial, (result)=>{
            console.log("result="+result);
            if(result=="postTimeout"){
                KFControllerMgr.showTips("支付超时，请联系客服！");
                return;
            }
            if (result != "")
            {
                console.log("result2="+result);
                let _strArray = result.split('|');//用|切割
                KFControllerMgr.showTips(_strArray[1]);
                if (_strArray[0] == "0" || _strArray[0] == "4")
                {
                    console.log("result3="+_strArray[1]);
                    WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
                    WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.CHECK_USER_VIP,"");
                }
            }
        });
    }
	
    public onAddToStage() {
        NetEventMgr.getInstance().addEventListener("10002_event",this.on10002_event,this);
        NetEventMgr.getInstance().addEventListener("92001_event",this.on92001_event,this);
        NetEventMgr.getInstance().addEventListener("1021_event",this.on1021_event,this);
        
    }
	
    public onDestroy(){
        for(var i = 0;i < this.PanelAdded.length;i++) {
            if(this.PanelAdded[i]!=null){
                this.PanelAdded[i].removeFromScene();
            }
    	  }
        this.PanelAdded = null;
        NetEventMgr.getInstance().removeEventListener("10002_event",this.on10002_event,this);
        NetEventMgr.getInstance().removeEventListener("92001_event",this.on92001_event,this);
        NetEventMgr.getInstance().removeEventListener("1021_event",this.on1021_event,this);
	}

    public getPanel(className){
        for(var i = 0;i < this.PanelAdded.length;i++){
            if(className==egret.getQualifiedClassName(this.PanelAdded[i])){
                this.removeChild(this.PanelAdded[i]);
                return this.PanelAdded[i];
            }
        }
        var panel = new className();
        this.PanelAdded.push(panel);
        return panel;
    }
	
	public openPanel(panel:KFPanel){
        if(panel.$parent==this){
            this.removeChild(panel);
        }
         this.addChild(panel);
        if("DialogPanel"!=egret.getQualifiedClassName(panel)){

            this.resetChatPanel();
        }
        panel.show();
	}

    private resetChatPanel(){
        var panel;
        for(var i = 0;i < this.PanelAdded.length;i++){
            if("ChatPanel"==egret.getQualifiedClassName(this.PanelAdded[i])){
                panel = this.PanelAdded[i];
            }
        }
        if(panel!=null){
            // this.setChildIndex(panel,99);
            this.removeChild(panel);
            this.addChild(panel);
        }
    }

    public removePanel(panel:KFPanel){
        for(var i = 0;i < this.PanelAdded.length;i++){
            if(egret.getQualifiedClassName(panel)==egret.getQualifiedClassName(this.PanelAdded[i])){
                this.PanelAdded[i] = null;
                this.removeChild(panel);
                break;
            }
        }
    }

    public getTag(){
        return this.TAG;
    }
}
