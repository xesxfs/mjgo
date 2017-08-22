/**
 *
 * @author 
 *
 */
class ChangeNickNamePanelController extends KFController{ 
    
    private newNamesArray;
    private cost:number = 0;
    private showBtnClose = true;
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.USER.GET_ROOL_NAME,
            MsgID.USER.SEND_NAME,
            MsgID.USER.GET_MODIFYNICKNAMEINFO,
            ];
	}
	
    protected onReady() {
    }

    public isShowBtnClose(isshow):any{
        this.showBtnClose = isshow;
        return this;
    }

    protected onShow(){//在界面上显示出来
        this.mPanel.Lb_oldName.text = GlobalClass.UserInfo.str_UserNickname;
        this.mPanel.Lb_showNameLabel.visible = true;
        this.ShowOrHideRecommend(false);
        this.ShowOrHideCloseBtn(this.showBtnClose);
        var js = {userid: GlobalClass.UserInfo.str_UserID};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.GET_MODIFYNICKNAMEINFO,JSON.stringify(js));
        this.newNamesArray = [];
    }

	private ShowOrHideCloseBtn(isShow){
        this.mPanel.Btn_CloseRegister.visible = isShow;
        if(isShow){
            this.mPanel.needPoint.visible = true;
            this.mPanel.oldName.visible = true;
            this.mPanel.Lb_oldName.visible = true;
            this.mPanel.LB_title.text = LocalizationMgr.getText("修改昵称");

            this.mPanel.newNameLabel.text = LocalizationMgr.getText("新昵称：");
        }else{
            this.mPanel.needPoint.visible = false;
            this.mPanel.oldName.visible = false;
            this.mPanel.Lb_oldName.visible = false;
            this.mPanel.LB_title.text = LocalizationMgr.getText("设置昵称");

            this.mPanel.newNameLabel.text = LocalizationMgr.getText("昵称：");
        }
    }

    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_CloseRegister,egret.TouchEvent.TOUCH_END,this.Btn_CloseRegisterClick,this);
        this.AddClickEvent(this.mPanel.Btn_Ok,egret.TouchEvent.TOUCH_END,this.Btn_OkClick,this);
        this.AddClickEvent(this.mPanel.Btn_Roll,egret.TouchEvent.TOUCH_END,this.Btn_RollClick,this);
        this.AddClickEvent(this.mPanel.Btn_recommend1,egret.TouchEvent.TOUCH_END,this.Btn_recommendClick1,this);
        this.AddClickEvent(this.mPanel.Btn_recommend2,egret.TouchEvent.TOUCH_END,this.Btn_recommendClick2,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_CloseRegister,egret.TouchEvent.TOUCH_END,this.Btn_CloseRegisterClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Ok,egret.TouchEvent.TOUCH_END,this.Btn_OkClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Roll,egret.TouchEvent.TOUCH_END,this.Btn_RollClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_recommend1,egret.TouchEvent.TOUCH_END,this.Btn_recommendClick1,this);
        this.RemoveClickEvent(this.mPanel.Btn_recommend2,egret.TouchEvent.TOUCH_END,this.Btn_recommendClick2,this);
    }

    private Btn_CloseRegisterClick(){
        this.mPanel.hide();
    }

    private Btn_OkClick(){
        this.mPanel.Lb_showName.visible = false;
        var js = {userid: GlobalClass.UserInfo.str_UserID,nickname:this.mPanel.Lb_showNameLabel.text};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.SEND_NAME,JSON.stringify(js));   
        var mTimer = new egret.Timer(5000,1);
        mTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(){
            this.mPanel.Lb_showName.visible = true;
        },this);
        mTimer.start();
    }

    private Btn_RollClick(){
        if(this.mPanel.Lb_showName.visible){
            this.ShowOrHideRecommend(false);
            if(this.newNamesArray.length==0){
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.GET_ROOL_NAME,"");        
            }else{
                this.UseNewName();
            }
        }
    }

    private Btn_recommendClick1(){
         if(this.mPanel.Lb_showName.visible){
             this.mPanel.Lb_showNameLabel.text = this.mPanel.Btn_recommend1.bsfb_btn.getChildAt(1).text;
             this.ShowOrHideRecommend(false);
         }
    }

    private Btn_recommendClick2(){
        if(this.mPanel.Lb_showName.visible){
             this.mPanel.Lb_showNameLabel.text = this.mPanel.Btn_recommend2.bsfb_btn.getChildAt(1).text;
             this.ShowOrHideRecommend(false);
         }
    }

    private ShowOrHideRecommend(isShow:boolean){
        this.mPanel.Btn_recommend1.visible=isShow;
        this.mPanel.Btn_recommend2.visible=isShow;
        this.mPanel.recommend.visible=isShow;
    }

    private UseNewName(){
        var newName = this.newNamesArray[this.newNamesArray.length-1];
        this.mPanel.Lb_showNameLabel.text = newName;
        this.newNamesArray.pop();
    }

    private on92_event(event: egret.Event): void {
        console.log("on92_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        if(jsonData["ret"] ==1){
            var namejd = jsonData["info"]["nickname"];
            for(var i=0;i<namejd.length;i++){
                console.log(namejd[i]);
                this.newNamesArray.push(namejd[i]);
            }
            this.UseNewName();
        }else{
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1014));
        }
        
    }
    
    private on93_event(event: egret.Event): void {
        console.log("on101_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        this.mPanel.Lb_showName.visible = true;
        if(jsonData["ret"] ==1){
            //更新大厅点数和昵称
            GlobalClass.UserInfo.str_UserNickname = this.mPanel.Lb_showNameLabel.text;
            this.mPanel.Lb_oldName.text = GlobalClass.UserInfo.str_UserNickname;
            var num = Number(GlobalClass.UserInfo.str_Hall_totalScore) - this.cost;
            GlobalClass.UserInfo.str_Hall_totalScore = num+"";
            var js = {userid: GlobalClass.UserInfo.str_UserID};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.GET_MODIFYNICKNAMEINFO,JSON.stringify(js));   //更新点数
            GlobalClass.HallClass.isShowNick = false;
            GlobalClass.HallClass.need_Modify_NickName = false;
            this.mPanel.hide(); 
            NetEventMgr.getInstance().clientMsg(MsgID.Client.HallRefresh,"");
        }else{
            var reasonType = jsonData["info"]["reasonType"];
            if(reasonType==103){
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1015));
                if(this.mPanel.Lb_showNameLabel.text.length<12){
                    this.mPanel.Btn_recommend1.getChildAt(1).text = this.mPanel.Lb_showNameLabel.text+"1";
                    this.mPanel.Btn_recommend2.getChildAt(1).text = this.mPanel.Lb_showNameLabel.text+"a";
                  this.ShowOrHideRecommend(true);
                }
            }else if(reasonType == 101){
                 KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1016));
            }else if(reasonType == 102){
                 KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1017));
            }else if(reasonType == 104){
                 KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1018));
            }else if(reasonType == 105){
                 KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1019));
            }else if(reasonType == 106){
                 KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1020));
            }
        }
    }

    private on94_event(event: egret.Event): void {
        console.log("on101_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        if(jsonData["ret"] ==1){
            // var isRegByMobile = jsonData["info"]["isRegByMobile"];
            // var changeTimes = jsonData["info"]["changeTimes"];
            this.mPanel.needPoint.text = LocalizationMgr.getText(TipTexts.A1048);
            this.cost = 0;
        }
    }
}