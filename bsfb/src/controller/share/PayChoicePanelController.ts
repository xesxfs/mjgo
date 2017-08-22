/**
 *
 * @author 
 *
 */

enum SendPlugins{
     /// <summary>
        /// Pay0 单支付固定此接口
        /// </summary>
        PAY_ALIPAY = 1001,
        /// <summary>
        /// Pay1
        /// </summary>
        PAY_BAIDUPAY = 1002,
        /// <summary>
        /// Pay2
        /// </summary>
        PAY_360PAY = 1003,
}
class PayChoicePanelController extends KFController{ 
    private Btn_PayClick = [];
    private data ;
    private sendPlugins;
    private jsonHaveLoaded = false;
    private childrenHaveReady = false;
    private haveInit = false;
	
	protected init(){
    	super.init();
        this.EventsList = [
        ];
            
        this.parsePayInfoText();
}


    public parsePayInfoText(){
        RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this ); 
        RES.addEventListener( RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this ); 
        RES.getResByUrl("resource/config/BtnPayType.json",this.onConfigComplete,this,RES.ResourceItem.TYPE_JSON);
    }

    private onConfigComplete(event:RES.ResourceEvent):void {
        this.data = event;
        this.jsonHaveLoaded = true;
        if(this.jsonHaveLoaded&&this.childrenHaveReady){
            this.initButton();
        }
    }

    private onConfigLoadErr(event:RES.ResourceEvent):void {
        console.log("onConfigLoadErr");
    }
	
    protected onReady() {
        this.Btn_PayClick = [this.mPanel.Btn_PayClick0,this.mPanel.Btn_PayClick1,this.mPanel.Btn_PayClick2];
        this.childrenHaveReady = true;
    }

    protected onShow(){//在界面上显示出来
        if(GlobalClass.GameInfoForConfig.PayWay<=0){
            this.sendPlugins = 1001;
            this.payClick(0);
            this.hide();
            return;
        }
        if(this.jsonHaveLoaded&&this.childrenHaveReady){
            this.initButton();
        }
    }

    private initButton(){

        if(this.haveInit){
            return;
        }
        this.haveInit = true;

        for(let i=0;i<3;i++){
            this.Btn_PayClick[i].visible = false;
        }
        var iBtnColor = GlobalClass.GameInfoForConfig.PayWay;
        var JDataOut = this.data;
         var src = new Array(3);
        src[2] = (iBtnColor >> 24) & 0xFF;
        src[1] = (iBtnColor >> 16) & 0xFF;
        src[0] = (iBtnColor >> 8) & 0xFF;
        var ibtncolor = iBtnColor & 0xFF;

        //获取按钮配置
        var type = ibtncolor & 0x7;
        var length = Number(JDataOut["ButtonNum"][type]["showBtnNum"]+"");

        //按钮配置赋值
        for (var x = 0; x < length; x++)
        {
            //获取需要显示的按钮
            var i = Number(JDataOut["ButtonNum"][type]["showBtn" + x]+"");


            console.log("ShowPayButton " + i);
            this.Btn_PayClick[i].visible = true;
            //赋值显示文字
            if (JDataOut["ButtonSetting"][src[i]]["BtnName"]=="None")
            {
                this.Btn_PayClick[i].getChildAt(1).visible = false;
            }
            else
            {
                this.Btn_PayClick[i].getChildAt(1).text = JDataOut["ButtonSetting"][src[i]]["BtnName"];
            }
            //赋值按钮显示图标
            if (JDataOut["ButtonSetting"][src[i]]["BtnIcom"]=="None")
            {
                this.Btn_PayClick[i].getChildAt(2).visible = false;
            }
            else
            {
                // this.Btn_PayClick[i].getChildAt(3).visible = false;
                console.log(JDataOut["ButtonSetting"][src[i]]["BtnIcom"]+"");
                 this.Btn_PayClick[i].getChildAt(2).source = RES.getRes(JDataOut["ButtonSetting"][src[i]]["BtnIcom"]+"") ;
            }
			//赋值按钮事件
            var s = "";
			if(JDataOut["ButtonSetting"][src[i]]["BtnPayType"]==null||JDataOut["ButtonSetting"][src[i]]["BtnPayType"]==""){
                let a = i +1;
				this.AddClickEvent(this.Btn_PayClick[i],egret.TouchEvent.TOUCH_TAP,()=>{
                    // this.sendPlugins = SendPlugins[i];
                    this.sendPlugins = 1000+a;
					this.payClick(a);
                },this);
			}else{
				var typs = Number (JDataOut ["ButtonSetting"] [src [i]] ["BtnPayType"]);
                this.AddClickEvent(this.Btn_PayClick[i],egret.TouchEvent.TOUCH_TAP,()=>{
                    // this.sendPlugins = SendPlugins[typs];
                    this.sendPlugins = 1001+typs;
					this.payClick(typs + 1);
                },this);
			}
        }
    }

    private payClick(getData){
        console.log("getData="+getData);
        let PayID = "";
         if (GlobalClass.GameClass.isBuyScore)
        {
            
            PayID = GlobalClass.GameClass.str_ScoreIDindex;
        }
        if (GlobalClass.GameClass.isBuyVip)
        {
            PayID = GlobalClass.TaskClass.str_VIPID;
        }

        KFControllerMgr.showTips("支付中",0);
        SendMsgForWebService.SendPayAndroid(PayID, GlobalClass.UserInfo.str_UserID, GlobalClass.UserInfo.str_UserNickname, getData,(result)=>{
            console.log("payorder="+result);
            // if(getData==1){
            //     this.payOneParse(result);
            // }else if(getData==2){
            //     this.payTwoParse(result);
            // }else if(getData==3){
            //     this.payThreeParse(result);
            // }
            if(result=="postTimeout"){
                KFControllerMgr.showTips("支付超时");
                return;
            }
            let a = this.sendPlugins+"#"+result;
            DeviceUtils.executePluginsEvents(this.sendPlugins+"#"+result);
        });
    }

    private payOneParse(data){
        data = data.replace(/&amp;/g, ',');
        var jd = JSON.parse(data);
        if(jd["Code"]!="200"){
            KFControllerMgr.showTips(LocalizationMgr.getText("支付失败"));
            return;
        }
        var dataArr = jd["Message"].split(",");
        var dataDic = {};
        dataArr.forEach(element => {
            var Arr = element.split("=");
            dataDic[Arr[0]] = Arr[1].replace(/"/g, '');
        });
        var amount = Number(dataDic["total_fee"])*100;
        var orderID = dataDic["out_trade_no"];
        var subject = dataDic["subject"];
        DeviceUtils.IMPay(amount,orderID,subject,1,0);
    }

    private payTwoParse(data){
        var jd = JSON.parse(data);
        if(jd["Code"]!="200"){
            KFControllerMgr.showTips(LocalizationMgr.getText("支付失败"));
            return;
        }
        var mes = JSON.parse(jd["Message"]);
        var amount = Number(mes["paymoney"])*100;
        var orderID = mes["orderno"];
        var subject = "宝石风暴支付";
        DeviceUtils.IMPay(amount,orderID,subject,0,0);
    }

    private payThreeParse(data){
        var jd = JSON.parse(data);
        if(jd["Code"]!="200"){
            KFControllerMgr.showTips(LocalizationMgr.getText("支付失败"));
            return;
        }
        console.log("");
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