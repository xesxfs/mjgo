/**
 *
 * @author 
 *
 */
class PersonalPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
         this.ListenObjList = [ {event:egret.TouchEvent.TOUCH_END,items:{"Btn_ClosePersonal":"",
                                                                         "Btn_Roll":"",
                                                                         "Btn_changeToNobel":"",
                                                    },},
                               {event:egret.TouchEvent.CHANGE,items:{
                                                    },},
                            
                            ];//添加btn名为key，值为冷却时间，然后在类中添加btn名+Click的函数，即可自动注册btn事件 ,如 Btn_MyBankClick为函数名
        this.EventsList = [
            MsgID.USER.LOGIN,];
        
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.initView();
    }
    
    private initView(){
        this.mPanel.label_count.text = (GlobalClass.UserInfo.str_MyUserExp)+"/"+Number(GlobalClass.UserInfo.str_NextLevelExp);
        this.ShowOrHideChangeNickBtn();
        this.mPanel.Sprite_VIP.visible = GlobalClass.TaskClass.str_VIPStatus=="1";
        this.mPanel.Lb_nickName.text = GlobalClass.UserInfo.str_UserNickname;
        this.mPanel.Lb_ID.text =  GlobalClass.UserInfo.str_UserID;
        this.mPanel.Lb_Club.text = GlobalClass.ClubClass.ClubID;    
        if(GlobalClass.GameInfoForConfig.LanguageType == "简体中文"){
            this.mPanel.label_prize.text = "当月充值达到"+GlobalClass.LoginClass.SmallRecharge+"元即可在下月获得贵族称号\n赠送点数通过邮件即时发送"
        }else if (GlobalClass.GameInfoForConfig.LanguageType =="繁体中文"){
            this.mPanel.label_prize.text = "當月充值達到"+GlobalClass.LoginClass.SmallRecharge+"元即可在下月獲得貴族稱號\n贈送點數通過郵件即時發送"
        }

        console.log("vip="+GlobalClass.TaskClass.str_VIPStatus);
        this.mPanel.NobleGroup.visible = GlobalClass.TaskClass.str_VIPStatus == "1";
        // this.mPanel.Sprite_Noble.visible = Number(GlobalClass.HallClass.str_Hall_IntLevel[18])>0;

        this.mPanel.Btn_changeToNobel.visible = GlobalClass.TaskClass.str_VIPStatus == "0";
        this.mPanel.Label_none.visible = GlobalClass.TaskClass.str_VIPStatus == "0";

        this.ChangeLevelExp();
    }
	
    private on90_event(event: egret.Event): void {
        console.log("on90_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
       
    }
    
    protected setOnClickListener() {
    }

    protected removeOnClickListener() {
    }
    

    private Btn_ClosePersonalClick(){
        this.mPanel.hide();
    }
    private Btn_RollClick(){
       KFControllerMgr.getCtl(PanelName.ChangeNickNamePanel).show();
    }
    private Btn_changeToNobelClick(){
        KFControllerMgr.getCtl(PanelName.PropshopPanel).show();
    }

    private ShowOrHideChangeNickBtn(){
        this.mPanel.Btn_Roll.visible = GlobalClass.HallClass.isShowNick;
    }

    private f_LevelExp = 0;
    private f_LevelExp5 = 0;
    private ChangeLevelExp(){
        if (GlobalClass.UserInfo.str_MyUserExp !="" || GlobalClass.UserInfo.str_NextLevelExp !="") {
            this.mPanel.levelExpInfo.setlev(Number(GlobalClass.UserInfo.str_UserLevel));
            this.f_LevelExp = (Number(GlobalClass.UserInfo.str_MyUserExp) - Number(GlobalClass.UserInfo.str_LastLevelExp)) /(Number(GlobalClass.UserInfo.str_NextLevelExp) - Number(GlobalClass.UserInfo.str_LastLevelExp));
            this.f_LevelExp5 = this.f_LevelExp / 10;
            
            this.invoke(0.05,this.UpdateLevelExpSlide,this);
        }
    }

    private UpdateLevelExpSlide(){
         if ( this.mPanel.levelExpInfo.pValue <= this.f_LevelExp) {
             this.mPanel.levelExpInfo.pValue = this.mPanel.levelExpInfo.pValue+ this.f_LevelExp5;
            this.invoke(0.05,this.UpdateLevelExpSlide,this);
         }
    }
}