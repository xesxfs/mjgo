/**
 *
 * @author 
 *
 */
class MailPanelController extends KFController{ 
    
    private LastItem:any;
    private HasNew:boolean;
    private validTime:number;
    protected mPanel:MailPanel;
	
	protected init(){
    	super.init();
        this.EventsList = [
        MsgID.Mail.MAIL_LIST,
        MsgID.Mail.READ_MAIL,
        MsgID.Mail.DELETE_MAIL,];
	}

    protected onShow(){//在界面上显示出来

        // WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.GET_FIVEGAME_MYLOG,"");
        this.mPanel.MailList.itemRenderer = MailItem;
        let js = JSON.stringify({"userid":GlobalClass.UserInfo.str_UserID});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Mail.MAIL_LIST,js);  
    }
	
    protected onReady() {
    }

        
    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.CloseOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Get,egret.TouchEvent.TOUCH_END,this.GetOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Delete,egret.TouchEvent.TOUCH_END,this.DeleteOnClick,this);
     }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.CloseOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Get,egret.TouchEvent.TOUCH_END,this.GetOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Delete,egret.TouchEvent.TOUCH_END,this.DeleteOnClick,this);
     }
	

// --获取是否有新邮件
private on2201_event(event: egret.Event):void{
    console.log("on2201_event");
    let msg:MessageStruct = <MessageStruct>event.data;
    let datastr = msg.getDataStr();
    // let datastr = '{"info": {"validTime": 30, "hasNew": 1}, "code": 2201, "ret": 1}';
    let jd = JSON.parse(datastr);
    if (jd ["ret"] == "1") {
        //成功
        this.HasNew = jd['info']['hasNew'];
        this.validTime = jd['info']['validTime'];
        //操作红点

    }else{//失败则提示失败原因
        KFControllerMgr.showTips(jd["info"]["desc"]);
        return;
    }
}



// --获取邮件列表
private on2202_event(event: egret.Event):void{
    console.log("on2202_event");
    let msg:MessageStruct = <MessageStruct>event.data;
    let datastr = msg.getDataStr();
    // let datastr = '{"info": {"message": [{"emailID": 27, "status": 2, "userContent": [], "toUserType": 0, "awardInfo": {"0": "100000"}, "title": "\u6d4b\u8bd5", "content": "\u6240\u6709\u73a9\u5bb6\u53ef\u89c1\u7684\u5956\u52b1\u90ae\u4ef6", "type": 1, "createtime": "2017-02-16 15:53:25"}, {"emailID": 28, "status": 2, "userContent": [], "toUserType": 0, "awardInfo": {"0": "10000"}, "title": "redis\u6d4b\u8bd5", "content": "\u5956\u52b1\u90ae\u4ef6\u6d4b\u8bd5", "type": 1, "createtime": "2017-02-21 16:43:05"}]}, "code": 2202, "ret": 1}';
    let jd = JSON.parse(datastr);
    if (jd ["ret"] == "1") {
        //成功
        let dataArray = jd['info']['message'];
        //排序
        dataArray.sort(
            function(a,b){
                if(a.status % 2 != b.status % 2){
                    return a.status % 2 > b.status % 2;
                }else if(a.type != b.type){
                    return a.type > b.type
                }else{
                    return a.createtime > b.createtime;
                }
            }
        );
        //创建
        let collection = new eui.ArrayCollection();
        collection.source = dataArray;
        for(let item in dataArray){
            dataArray[item]["MailList"] = this.mPanel.MailList;
        }
        this.mPanel.MailList.dataProvider = collection;
        this.mPanel.MailList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.MailOnClick,this);

        // this.mPanel.MailList.selectedIndex = 0;
        this.mPanel.Girl_bg.visible = dataArray.length > 0;
        this.mPanel.Content.visible = dataArray.length > 0;
        

    }else{//失败则提示失败原因
        KFControllerMgr.showTips(jd["info"]["desc"]);
        return;
    }
}

// --发送读取邮件/领取奖励 请求
private on2203_event(event: egret.Event):void{
    console.log("on2203_event");
    let msg:MessageStruct = <MessageStruct>event.data;
    let datastr = msg.getDataStr();
    let jd = JSON.parse(datastr);
    if (jd ["ret"] == "1") {
        //成功
        let mailID = jd['info']['emailID']
        let money = jd['info']['money']
        let status = jd['info']['status']
        // let focusMail = <MailItem>this.mPanel.MailList.getChildAt(this.mPanel.MailList.selectedIndex);
        let focusMail = this.mPanel.MailList.selectedItem.display;
        // focusMail.Icon_UnRead.visible = false;
        // focusMail.Label_Title_Unread.visible = false;
        // focusMail.Icon_UnRead.visible = false;
        // focusMail.Label_Title_Unread.visible = false;
        focusMail.Read.visible = true;
        focusMail.Unread.visible = false;
        this.mPanel.Btn_Delete.visible = true;
        this.mPanel.Btn_Get.visible = false;
        focusMail.data.status = status;
        this.mPanel.TimeBoard.visible = status != 2 && focusMail.data.leftTime > 0
        GlobalClass.UserInfo.str_Hall_totalScore = money;
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_PROPS,"");
        let js = JSON.stringify({"userid":GlobalClass.UserInfo.str_UserID});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Mail.NEW_MAIL,js);  
        if(status == 3){
            KFControllerMgr.showTips(LocalizationMgr.getText("道具领取成功"),2);
            this.mPanel.GetGift.visible = true;
        }
        this.mPanel.MailList.dataProviderRefreshed();
    }else{//失败则提示失败原因
        KFControllerMgr.showTips(jd["info"]["desc"]);
        return;
    }
}


// --删除邮件
private on2204_event(event: egret.Event):void{
    console.log("on2204_event");
    let msg:MessageStruct = <MessageStruct>event.data;
    let datastr = msg.getDataStr();
    let jd = JSON.parse(datastr);
    if (jd ["ret"] == "1") {
        //成功
        this.mPanel.Btn_Get.visible = false;
        this.mPanel.Btn_Delete.visible = false;
        this.mPanel.Content.visible = false;
        let list = <eui.ArrayCollection>this.mPanel.MailList.dataProvider;
        list.removeItemAt(this.mPanel.MailList.selectedIndex);
        this.mPanel.MailList.dataProviderRefreshed();
        this.LastItem = null;
        this.mPanel.Girl_bg.visible = this.mPanel.MailList.dataProvider.length > 0;
    }else{//失败则提示失败原因
        KFControllerMgr.showTips(jd["info"]["desc"]);
        return;
    }
}

// --点击邮件
public MailOnClick(event:egret.TouchEvent):void{
    console.log("控制点击邮件",this.mPanel.MailList.selectedItem,this.mPanel.MailList.selectedIndex);
    if(this.mPanel.MailList.selectedItem.status == 0){
        //发送读取邮件
        let js = JSON.stringify({"userid":GlobalClass.UserInfo.str_UserID,"emailID":this.mPanel.MailList.selectedItem.emailID});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Mail.READ_MAIL,js);  
        // this.parent.touchChildren = false;
    }
    if(this.LastItem && this.LastItem!=this.mPanel.MailList.selectedItem){
        this.LastItem.unselectCB();
    }
    this.LastItem = this.mPanel.MailList.selectedItem;
    let mail = this.LastItem;
    let timedata = Date.now()-Date.parse(mail.createtime);
    timedata = this.validTime*60*60*24*1000 - timedata;
    mail.leftTime = timedata;
    let hour = Math.floor(timedata/(60*60*1000));
    let day = Math.floor(hour / 24);
    hour = hour % 24;
    this.mPanel.Label_Title.text = mail.title;
    this.mPanel.Label_Content.text = mail.content;
    this.mPanel.label_Time.text = (day == 0 && hour == 0) ? LocalizationMgr.getText("不足1小时") : LocalizationMgr.getText("{0}天{1}小时",day,hour);
    this.mPanel.TimeBoard.visible = mail.status != 2 && timedata > 0
    for(let i = 0; i<this.mPanel.PropsImage.length; i++){
        if(mail.awardInfo[i]){
            //type 0 钱，1 喇叭
            let arr = ["Coin04","LoudSpeaker","LuckCard","UI_Mail_icon_2"];
            this.mPanel.PropsImage[i].sorce = RES.getRes(arr[i]);
            this.mPanel.PropsLabel[i].text = i == 0 ? mail.awardInfo[i] : 'x' + mail.awardInfo[i];
            this.mPanel.PropsImage[i].parent.visible = true;
        }else{
            this.mPanel.PropsImage[i].parent.visible = false;
        }
    }
    this.mPanel.Content.visible = true;
    this.mPanel.Btn_Delete.visible = mail.status != 2;
    this.mPanel.Btn_Get.visible = mail.status == 2;
    this.mPanel.GetGift.visible = mail.status == 3;
    this.mPanel.Girl_bg.visible = false;

}

// --点击收取
private GetOnClick(event:egret.TouchEvent):void{
    console.log("点击收取");
    let js = JSON.stringify({"userid":GlobalClass.UserInfo.str_UserID,"emailID":this.mPanel.MailList.selectedItem.emailID});
    WebSocketMgr.getInstance().SendOneceMsg(MsgID.Mail.READ_MAIL,js);  
}

// --点击删除 
private DeleteOnClick(event:egret.TouchEvent):void{
    console.log("点击删除");
    let js = JSON.stringify({"userid":GlobalClass.UserInfo.str_UserID,"emailID":this.mPanel.MailList.selectedItem.emailID});
    WebSocketMgr.getInstance().SendOneceMsg(MsgID.Mail.DELETE_MAIL,js);  
}

// --点击关闭 
private CloseOnClick(event:egret.TouchEvent):void{
    console.log("点击关闭");
    this.mPanel.hide();
}

}