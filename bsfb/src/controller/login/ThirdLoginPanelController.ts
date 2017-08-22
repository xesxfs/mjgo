/**
 *
 * @author 
 *
 */
class ThirdLoginPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [
            ];
	}

  protected onShow(){//在界面上显示出来
    GlobalClass.Ranklist.str_LikeOrUnLike_Group = null;
    GlobalClass.Ranklist.str_MyLikeOrUnLikeID = null;
    // GlobalClass.GameClass.isSendVIPLoginMessage = true;
    GlobalClass.HallClass.isOpenSignInPanel = true;
    SoundMgr.Instance.allowPlayBGM = LocalStorageUtil.Instance.allowMusic;
    SoundMgr.Instance.allowPlayEffect = LocalStorageUtil.Instance.allowEffect;      
    DeviceUtils.ShowFload();

  }
    
  protected onReady() {
        this.Btn_Switch_PhoneClick();
  }

//   private on90_event(event: egret.Event): void {
//         console.log("on90_event");
//         var msg: MessageStruct = <MessageStruct>event.data;
//         var datastr = msg.getDataStr();
//         var strArray = datastr.split("%");
//         var length = strArray.length;
//         if(length > 6) {
//           if (strArray [6]+"" == "0") {  //没有完成新手引导
//             GlobalClass.UserInfo.isNewbie = true;
//           }else{
//             GlobalClass.UserInfo.isNewbie = false;
//           }
    
//            //是否打开手机绑定功能
//           if (GlobalClass.HallClass.int_OpenBinding == 1) {
//             GlobalClass.HallClass.int_OpenBinding = Number (strArray [7]);
//           }
//         }
//     if (length > 11)
//     {
//       GlobalClass.UserInfo.isVGame = strArray[10]+"" == "1";
//       GlobalClass.UserInfo.vGameIpPort = strArray[11];
//     }
//     if (length > 12)
//     {
//       GlobalClass.HallClass.bIDSecurity_Binding = strArray[12]+"" == "1" ? true : false;
//     }
//     if (length > 13)
//     {
//         GlobalClass.HallClass.bAgeLegal = (Number(strArray[13]) < 18) ? false : true;
//     }
    
//     if(length > 14) //是否已设置保护口令 0位未设置 1为设置
//     {
//         GlobalClass.HallClass.bCodeProtect_Binding = strArray[14] + "" == "1" ? true : false;
//     }
//     if(length > 15) //是否已开启游戏保护 0位为设置 1为设置
//     {
//         GlobalClass.HallClass.bCodeProtect_Open = strArray[15] + "" == "1" ? true : false;
//     }
//     if(length > 16) //是否已开启密码修改 0位为关闭 1为开启
//     {
//         GlobalClass.HallClass.CanModifyPSW = strArray[16] + "" == "1" ? true : false;
//     }
//     if(length > 17) //以天数决定是否为新手 主要用于统计
//     {
//         GlobalClass.UserInfo.isNew = strArray[17] + "" == "1" ? true : false;
//     }

//     if (length > 9 && strArray [9]+""  == "1") {  //处理大话色游戏断线重连
//       console.log ("断线重连。。。");
// //      GlobalClass.DiceGameClass.offLine = true;
//      KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1002), 2);
//       var js = { id: strArray[3]};
//       WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.BEGIN_SEND,JSON.stringify(js));
//     }else{
//       if (strArray [2]+"" =="0") {
//         GlobalClass.UserInfo.str_UserID = strArray [3];
//         GlobalClass.UserInfo.str_UserNickname = strArray [4];
//         if (strArray [5]+""  == "1") {
//           GlobalClass.UserInfo.isAnonymous = true;
//         }
//         GlobalClass.HallClass.str_OpenBindingPhone = "1"; //该字段在90消息中不存在，但是在60消息中存在，用来表示是否打开手机绑定功能，所以要在90消息回调中手动置为1
//        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1003),1,0,function(event) {
//             KFSceneManager.getInstance().replaceScene(SceneName.Hall);
//           });

//       }else if (strArray [2]+"" =="1") {
//             KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1004),2);
//             egret.localStorage.removeItem("account");
//             egret.localStorage.removeItem("password");
//         }else if (strArray [2]+"" =="2") {
//            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1005), 2);
//               egret.localStorage.removeItem("account");
//               egret.localStorage.removeItem("password");
//           } else if (strArray [2]+"" =="3") {
//            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1006), 2);
//             egret.localStorage.removeItem("account");
//             egret.localStorage.removeItem("password");
//           } else if (strArray [2]+"" =="4") {
//            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1007), 2);
//             egret.localStorage.removeItem("account");
//             egret.localStorage.removeItem("password");
//           } else if (strArray [2]+"" =="5" || strArray [2]+"" =="7") {
//            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1008), 2);
//             egret.localStorage.removeItem("account");
//             egret.localStorage.removeItem("password");
//           }else if (strArray [2]+"" =="6") {
//            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1009), 2);
//             egret.localStorage.removeItem("account");
//             egret.localStorage.removeItem("password");
//           }else if (strArray [2]+"" =="8") {
//            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1007), 2);
//             egret.localStorage.removeItem("account");
//             egret.localStorage.removeItem("password");
//           }else{
//            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1010), 4);
//             egret.localStorage.removeItem("account");
//             egret.localStorage.removeItem("password");
//           }


//         //dice game 
// //        GlobalClass.DiceGameClass.offLine = false;
//         GlobalClass.HallClass.fangChenMiEnabled = 0;
// //        GlobalClass.DiceGameClass.opponentIsJoin = false;
//         GlobalClass.HallClass.bCodeProtect_HaveChecked = false;
//         GlobalClass.HallClass.firstOpenHall = true;
//         }
//         StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.login_success);
//     }


    private Btn_Login_PhoneClick(){
      if (this.mPanel.Input_PhoneNum.text == "")
      { 
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1013));
        return;
      }
      if (this.mPanel.Input_RegCode.text == "")
      {
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1138));
        return;
      } 		
      if (this.mPanel.Input_PhoneNum.text.Length!= 11)
      {
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1139));
        return;
      }
      GlobalClass.UserInfo.str_lastUserAccount = this.mPanel.Input_Account.value;
      ServerMsg.SendPhoneLoginMSG(this.mPanel.Input_PhoneNum.text,this.mPanel.Input_RegCode.text,"",GlobalClass.GameInfoForConfig.UniqueSerial);
      StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.login_enter);
    }
    private Btn_RegisterClick(){

    }
    private Btn_CodeFind_PhoneClick(){

    }
    private Btn_Toggle_codeClick(){
      
    }
    private Btn_Switch_PhoneClick(){
      this.mPanel.AccountPanel.visible = true;
      this.mPanel.PhoneLoginPanel.visible = false;
      this.autoLogin();
    }
    private Btn_CodeFind_AccountClick(){

    }
    private Btn_Switch_AccountClick(){
      this.mPanel.AccountPanel.visible = false;
      this.mPanel.PhoneLoginPanel.visible = true;
    }
    private Btn_Login_AccountClick(){
      if (this.mPanel.Input_Account.text == "" || this.mPanel.Input_Password.text == "")
      {
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1140));
        return;
      }
      egret.localStorage.setItem("account", this.mPanel.Input_Account.text);
      egret.localStorage.setItem("password", this.mPanel.Input_Password.text);
      GlobalClass.UserInfo.str_lastUserAccount = this.mPanel.Input_Account.value;
      ServerMsg.SendAccountLoginMSG(this.mPanel.Input_Account.text,this.mPanel.Input_Password.text,GlobalClass.GameInfoForConfig.UniqueSerial);
      StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.login_enter);
    }

    private autoLogin(){
      this.mPanel.Input_Account.text = egret.localStorage.getItem("account");
      this.mPanel.Input_Password.text = egret.localStorage.getItem("password");
      //  var acc = egret.localStorage.getItem("account");
      //  var psw = egret.localStorage.getItem("password");
      //  if(acc!=null&&psw!=null&&acc!=""&&psw!=""){
      //    KFControllerMgr.showTips("自动登录中",1,0,()=>{
      //     ServerMsg.SendAccountLoginMSG(acc,psw,GlobalClass.GameInfoForConfig.UniqueSerial);
      //    });
      //  }
    }
    
    private Btn_ClosePhoneClick(){
        this.hide();
        KFControllerMgr.getCtl(PanelName.LoginChoicePanel).show();
    }
    private Btn_CloseAccountClick(){
        this.hide();
        KFControllerMgr.getCtl(PanelName.LoginChoicePanel).show();

    }
    protected setOnClickListener() {
    this.AddClickEvent(this.mPanel.Btn_Login_Phone,egret.TouchEvent.TOUCH_END,this.Btn_Login_PhoneClick,this);
    this.AddClickEvent(this.mPanel.Btn_Register,egret.TouchEvent.TOUCH_END,this.Btn_RegisterClick,this);
    this.AddClickEvent(this.mPanel.Btn_CodeFind_Phone,egret.TouchEvent.TOUCH_END,this.Btn_CodeFind_PhoneClick,this);
    this.AddClickEvent(this.mPanel.Btn_Toggle_code,egret.TouchEvent.TOUCH_END,this.Btn_Toggle_codeClick,this);
    this.AddClickEvent(this.mPanel.Btn_ClosePhone,egret.TouchEvent.TOUCH_END,this.Btn_ClosePhoneClick,this);
    this.AddClickEvent(this.mPanel.Btn_Switch_Phone,egret.TouchEvent.TOUCH_END,this.Btn_Switch_PhoneClick,this);
    this.AddClickEvent(this.mPanel.Btn_CodeFind_Account,egret.TouchEvent.TOUCH_END,this.Btn_CodeFind_AccountClick,this);
    this.AddClickEvent(this.mPanel.Btn_Switch_Account,egret.TouchEvent.TOUCH_END,this.Btn_Switch_AccountClick,this);
     this.AddClickEvent(this.mPanel.Btn_Login_Account,egret.TouchEvent.TOUCH_END,this.Btn_Login_AccountClick,this);
    this.AddClickEvent(this.mPanel.Btn_CloseAccount,egret.TouchEvent.TOUCH_END,this.Btn_CloseAccountClick,this);
}

  protected removeOnClickListener() {
    this.RemoveClickEvent(this.mPanel.Btn_Login_Phone,egret.TouchEvent.TOUCH_END,this.Btn_Login_PhoneClick,this);
    this.RemoveClickEvent(this.mPanel.Btn_Register,egret.TouchEvent.TOUCH_END,this.Btn_RegisterClick,this);
    this.RemoveClickEvent(this.mPanel.Btn_CodeFind_Phone,egret.TouchEvent.TOUCH_END,this.Btn_CodeFind_PhoneClick,this);
    this.RemoveClickEvent(this.mPanel.Btn_Toggle_code,egret.TouchEvent.TOUCH_END,this.Btn_Toggle_codeClick,this);
    this.RemoveClickEvent(this.mPanel.Btn_ClosePhone,egret.TouchEvent.TOUCH_END,this.Btn_ClosePhoneClick,this);
    this.RemoveClickEvent(this.mPanel.Btn_Switch_Phone,egret.TouchEvent.TOUCH_END,this.Btn_Switch_PhoneClick,this);
    this.RemoveClickEvent(this.mPanel.Btn_CodeFind_Account,egret.TouchEvent.TOUCH_END,this.Btn_CodeFind_AccountClick,this);
    this.RemoveClickEvent(this.mPanel.Btn_Switch_Account,egret.TouchEvent.TOUCH_END,this.Btn_Switch_AccountClick,this);
     this.RemoveClickEvent(this.mPanel.Btn_Login_Account,egret.TouchEvent.TOUCH_END,this.Btn_Login_AccountClick,this);
    this.RemoveClickEvent(this.mPanel.Btn_CloseAccount,egret.TouchEvent.TOUCH_END,this.Btn_CloseAccountClick,this);
  }

}