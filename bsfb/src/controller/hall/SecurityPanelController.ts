/**
 *
 * @author 
 *
 */
class SecurityPanelController extends KFController{ 
    private characterLimit = 16;
    private _startCout = 0;
    private changePhoneStep = 1;
    // private 
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.Client.BindingIDMsg,
            MsgID.Client.BindingPhoneMsg,
            MsgID.Hall.Msg_1023,
            MsgID.Hall.Msg_1024,
            MsgID.Hall.Msg_1025,
            MsgID.Hall.Msg_1026,
            MsgID.Hall.Msg_1027,
            MsgID.Hall.Msg_1030,
            MsgID.Hall.Msg_2303,
            MsgID.Hall.Msg_2304,];
	}
	
    protected onReady() {
       
    }

    protected onShow(){//在界面上显示出来
         this.initView();
        this.initTimer();
    }

    private refreshView(){
        this.startFade(this.mPanel.Star_1);
        this.startFade(this.mPanel.Star_2);
        this.startFade(this.mPanel.Star_3);
         if(this._startCout==1){
            this.startBright(this.mPanel.Star_1)
        }else if(this._startCout==2){
            this.startBright(this.mPanel.Star_1)
            this.startBright(this.mPanel.Star_2)
        }else if(this._startCout==3){
            this.startBright(this.mPanel.Star_1);
            this.startBright(this.mPanel.Star_2);
            this.startBright(this.mPanel.Star_3);
        }else if(this._startCout==4){
            this.startBright(this.mPanel.Star_1);
            this.startBright(this.mPanel.Star_2);
            this.startBright(this.mPanel.Star_3);
        }
    }

    private startBright(img){
        CommonFuc.imgFilterHex(img,0xFFED00FF);
    }

    private startFade(img:eui.Image){
        CommonFuc.imgFilterHex(img,0x7D5D48FF);
    }

    private initView(){
        this.startFade(this.mPanel.Star_1);
        this.startFade(this.mPanel.Star_2);
        this.startFade(this.mPanel.Star_3);

        this.mPanel.Panel_ChangePhone.visible = false;
        this.mPanel.Panel_Code_Find.visible = false;
        this.mPanel.Panel_Code_Find0.visible = false;
        this.mPanel.Panel_PSW_Change.visible = false;
        this.mPanel.Panel_Code_Change.visible = false;
        this.mPanel.Panel_Code_Setting.visible = false;
        this.mPanel.Panel_Code_Open.visible = false;

        this._startCout = 0;
        this.moveToUngrid();
        this.SetPhoneBinding();
        this.SetIDBinding();
        this.SetCodeBinding();
        this.SetPSWBinding();
        this.SetChangePhone();

        this.refreshView();
        this.resetInput();
    }

    private currentY = 10;
    private delY = 65;
    private moveToGrid(item){
        if(!item.visible){
             item.y = this.currentY;
            item.visible = true;
            this.currentY += this.delY;
        }
    }
    private moveToUngrid(){
        this.mPanel.GameSecurity.visible = false;
        this.mPanel.IDSecurity.visible = false;
        this.mPanel.MobileSecurity.visible = false;
        this.mPanel.PSWSecurity.visible = false;
        this.mPanel.ChangePhone.visible = false;

        this.mPanel.GameSecurity.y = 0;
        this.mPanel.IDSecurity.y = 0;
        this.mPanel.MobileSecurity.y = 0;
        this.mPanel.PSWSecurity.y = 0;
        this.mPanel.ChangePhone.y = 0;

        this.currentY = 10;
    }
    public SetPhoneBinding(){
        if (GlobalClass.HallClass.str_OpenBindingPhone == "0" || GlobalClass.HallClass.int_OpenBinding != 1) {
            this.mPanel.Btn_Mobile_Binding.touchEnabled = false;//禁用按钮
        }else{ 
            this.mPanel.Btn_Mobile_Binding.touchEnabled = true;//启用按钮
            // this.mPanel.MobileSecurity.visible = true;
            this.moveToGrid(this.mPanel.MobileSecurity);
        }
        if (GlobalClass.HallClass.str_BindingPhone == "0") { //未绑定
            // this.mPanel.Btn_Mobile_Binding.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1058);
            this.mPanel.Btn_Mobile_Binding.getChildAt(2).source = RES.getRes("lijibangding");
            this.mPanel.Btn_Mobile_Binding.getChildAt(0).source = RES.getRes("UIBtn_1_1");
            this.mPanel.tishi.visible = true;
        }else{
            this._startCout = this._startCout + 1;
            // this.mPanel.Btn_Mobile_Binding.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1047);
            this.mPanel.Btn_Mobile_Binding.getChildAt(2).source = RES.getRes("jiechubangding");
            this.mPanel.Btn_Mobile_Binding.getChildAt(0).source = RES.getRes("UIBtn_3");
            this.mPanel.tishi.visible = false;
        }
    }
    private SetIDBinding(){
        console.log("SetIDBinding");
        if (GlobalClass.HallClass.bIDSecurity_Binding){
            // this.mPanel.Btn_IDSecurity_Binding.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1057);
            // this.mPanel.Btn_IDSecurity_Binding.touchEnabled = false;
            this.mPanel.Btn_IDSecurity_Binding.getChildAt(2).source = RES.getRes("yirenzheng");
            this.disableBut(this.mPanel.Btn_IDSecurity_Binding);
            this._startCout = this._startCout + 1;
            this.mPanel.IDtishi.visible = false;
        }else{
            // this.mPanel.Btn_IDSecurity_Binding.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1056);
            // this.mPanel.Btn_IDSecurity_Binding.touchEnabled = true;

            this.enableBut(this.mPanel.Btn_IDSecurity_Binding);
            this.mPanel.Btn_IDSecurity_Binding.getChildAt(2).source = RES.getRes("lijirenzheng");
            this.mPanel.IDtishi.visible = true;
        }
        // this.mPanel.IDSecurity.visible = true;
        this.moveToGrid(this.mPanel.IDSecurity);
    }
    private SetCodeBinding(){
        this.mPanel.Btn_GameSecurity_Binding.touchEnabled = true;
        if(GlobalClass.HallClass.bCodeProtect_Binding) { //口令已设置
            if(! GlobalClass.HallClass.bCodeProtect_Open){
                // this.mPanel.Btn_GameSecurity_Binding.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1055);
                // this.mPanel.Btn_Sure_CodeOpen.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1055);
                this.mPanel.Btn_GameSecurity_Binding.getChildAt(2).source = RES.getRes("kaiqibaohu");
                this.mPanel.Btn_Sure_CodeOpen.getChildAt(2).source = RES.getRes("kaiqibaohu");
                this.mPanel.Label_Tips_CodeOpen.visible = true;
            } else{
                // this.mPanel.Btn_GameSecurity_Binding.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1054);
                // this.mPanel.Btn_Sure_CodeOpen.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1054);
                this.mPanel.Btn_GameSecurity_Binding.getChildAt(2).source = RES.getRes("guanbibaohu");
                this.mPanel.Btn_Sure_CodeOpen.getChildAt(2).source = RES.getRes("guanbibaohu");
                this.mPanel.Label_Tips_CodeOpen.visible =  false;
                this._startCout =this._startCout + 1;
            }
        }else{
            this.mPanel.Btn_GameSecurity_Binding.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1053);
        }
        this.mPanel.Btn_GetCode_CodeFind.getChildAt(1).text =  LocalizationMgr.getText(TipTexts.A1035);
        // this.mPanel.GameSecurity.visible = true;
        this.moveToGrid(this.mPanel.GameSecurity);
    }
    private SetPSWBinding(){
        if(GlobalClass.HallClass.CanModifyPSW){ //可修改密码
            this.mPanel.Btn_Code_Binding.touchEnabled = true;
            // this.mPanel.PSWSecurity.visible = true;
            this.moveToGrid(this.mPanel.PSWSecurity);
        }else{
            this.mPanel.Btn_Code_Binding.touchEnabled = false;
        }

        this.mPanel.Btn_Code_Binding.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1051);
    }
    private SetChangePhone(){
        this.mPanel.Label_PhoneNum_ChangePhone.text = LocalizationMgr.getText(TipTexts.A1052)+GlobalClass.HallClass.str_BindingPhone;
        if (GlobalClass.HallClass.str_OpenBindingPhone == "0" && GlobalClass.HallClass.int_OpenBinding != 1) {
            this.mPanel.Btn_ChangePhone.touchEnabled = true;
            // this.mPanel.ChangePhone.visible = true;
            this.moveToGrid(this.mPanel.ChangePhone);
        }else{
            this.mPanel.Btn_ChangePhone.touchEnabled = false;
        }
        this.mPanel.Btn_GetCode_ChangePhone.getChildAt(1).text =  LocalizationMgr.getText(TipTexts.A1035);
        this.mPanel.Btn_Code_Binding.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1051);
    }
    private resetInput(){
        this.mPanel.Input_PhoneNum_CodeFind.text = "";
        this.mPanel.Input_CheckCode_CodeFind.text = "";
        this.mPanel.Input_CodeNewFirst_CodeFind.text = "";
        this.mPanel.Input_CodeNewSecond_CodeFind.text = "";

        // this.mPanel.Input_Answer1_PSWProtect.text = "";
        // this.mPanel.Input_Answer2_PSWProtect.text = "";
        this.mPanel.Input_CheckCode_CodeFind.text = "";
        this.mPanel.Input_CodeFirst_CodeSetting.text = "";

        this.mPanel.Input_CodeNewFirst_CodeChange.text = "";
        this.mPanel.Input_CodeNewFirst_CodeFind.text = "";
        this.mPanel.Input_CodeNewSecond_CodeChange.text = "";
        this.mPanel.Input_CodeNewSecond_CodeFind.text = "";

        this.mPanel.Input_CodeOld_CodeChange.text = "";
        this.mPanel.Input_CodeSecond_CodeSetting.text = "";
        this.mPanel.Input_Code_CodeOpen.text = "";
        this.mPanel.Input_PhoneNum_CodeFind.text = "";

        this.mPanel.Input_PSWNewFirst_PSWChange.text = "";
        this.mPanel.Input_PSWNewSecond_PSWChange.text = "";
        this.mPanel.Input_PSWOld_PSWChange.text = "";
    }
    private resetCodeOpenLabel(){
        if (GlobalClass.HallClass.bCodeProtect_Open) {
            this.mPanel.Label_Notice.text = LocalizationMgr.getText(TipTexts.A1050);
        }else{
            this.mPanel.Label_Notice.text = LocalizationMgr.getText(TipTexts.A1049);
        }
    }
	
    private on90001_event(event: egret.Event): void {
        console.log("on90001_event");
        this.SetIDBinding();
    }
    private on90002_event(event: egret.Event): void {
        console.log("on90002_event");
        this.SetPhoneBinding();
    }
    private on1023_event(event: egret.Event): void {
        console.log("on1023_event"); //初始化设置口令
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jd = JSON.parse(datastr);
        if(jd ["ret"] == 0){
            KFControllerMgr.showTips(jd["info"]["desc"],3);
            return;
        }
        GlobalClass.HallClass.bCodeProtect_Binding = true;
        GlobalClass.HallClass.bCodeProtect_Open = false;
        this.mPanel.Panel_Code_Setting.visible =  false;
        this.mPanel.Panel_Code_Open.visible = true;
        this.SetCodeBinding ();
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1021),1);
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.hall_startgameprotect);
    }
    private on1024_event(event: egret.Event): void {
        console.log("on1024_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jd = JSON.parse(datastr);
        if(jd ["ret"] == 0){
            KFControllerMgr.showTips(jd["info"]["desc"],3);
            return;
        }
        if (! GlobalClass.HallClass.bCodeProtect_Open) {
            GlobalClass.HallClass.bCodeProtect_Open = true;
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1022),1);
        }
        else{
            GlobalClass.HallClass.bCodeProtect_Open = false;
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1023),1);
        }
        this.mPanel.Panel_Code_Open.visible = false;
        this.initView();
        this.SetCodeBinding ();
        this.resetCodeOpenLabel ();
    }
    private on1025_event(event: egret.Event): void {
        console.log("on1025_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jd = JSON.parse(datastr);
        if(jd ["ret"] == 0){
            KFControllerMgr.showTips(jd["info"]["desc"],3);
            return;
        }
        this.mPanel.Panel_Code_Change.visible = false;
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1024),1);
        this.initView();
    }
    private on1026_event(event: egret.Event): void {
        console.log("on1026_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jd = JSON.parse(datastr);
        if(jd ["ret"] == 0){
            KFControllerMgr.showTips(jd["info"]["desc"],3);
            return;
        }
        this.mPanel.Panel_Code_Find.visible = false;
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1024),1);
    }
    private on1027_event(event: egret.Event): void {
        console.log("on1027_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jd = JSON.parse(datastr);
        if(jd ["ret"] == 0){
            KFControllerMgr.showTips(jd["info"]["desc"],3);
            this.ResendOver();
            return;
        }
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1025),1);
    }
    private on1030_event(event: egret.Event): void {
        console.log("on1030_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jd = JSON.parse(datastr);
        if(jd ["ret"] == 0){
            KFControllerMgr.showTips(jd["info"]["desc"],3);
            return;
        }
        this.mPanel.Panel_PSW_Change.visible = false;
        this.initView();
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1026),1);
    }
    private on2303_event(event: egret.Event): void {
        console.log("on2303_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jd = JSON.parse(datastr);
        if(jd ["ret"] == 0){
            KFControllerMgr.showTips(jd["info"]["desc"],3);
            this.ResendOver_ChangePhone();
            return;
        }
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1025),1);
    }
    private on2304_event(event: egret.Event): void {
        console.log("on2304_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jd = JSON.parse(datastr);
        if(jd ["ret"] == 0){
            KFControllerMgr.showTips(jd["info"]["desc"],3);
            return;
        }
        if(this.changePhoneStep==1){
            this.changeStep(2);
        }else{
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1027),1);
            GlobalClass.HallClass.str_BindingPhone = this.mPanel.Input_NewPhoneNum_ChangePhone.text;
            this.mPanel.Panel_ChangePhone.visible = false;
            this.initView();
        }
    }

    private showError(jd:any){
        
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Btn_Mobile_Binding,egret.TouchEvent.TOUCH_END,this.Btn_Mobile_BindingClick,this);
        this.AddClickEvent(this.mPanel.Btn_IDSecurity_Binding,egret.TouchEvent.TOUCH_END,this.Btn_IDSecurity_BindingClick,this);
        this.AddClickEvent(this.mPanel.Btn_GameSecurity_Binding,egret.TouchEvent.TOUCH_END,this.Btn_GameSecurity_BindingClick,this);
        this.AddClickEvent(this.mPanel.Btn_Code_Binding,egret.TouchEvent.TOUCH_END,this.Btn_Code_BindingClick,this);
        this.AddClickEvent(this.mPanel.Btn_ChangePhone,egret.TouchEvent.TOUCH_END,this.Btn_ChangePhoneClick,this);
        
        this.AddClickEvent(this.mPanel.Btn_Close_ChangePhone,egret.TouchEvent.TOUCH_END,this.Btn_Close_ChangePhoneClick,this);
        this.AddClickEvent(this.mPanel.Btn_GetCode_ChangePhone,egret.TouchEvent.TOUCH_END,this.Btn_GetCode_ChangePhoneClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure_ChangePhone,egret.TouchEvent.TOUCH_END,this.Btn_Sure_ChangePhoneClick,this);
        
        this.AddClickEvent(this.mPanel.Btn_Close_CodeFind,egret.TouchEvent.TOUCH_END,this.Btn_Close_CodeFindClick,this);
        this.AddClickEvent(this.mPanel.Btn_GetCode_CodeFind,egret.TouchEvent.TOUCH_END,this.Btn_GetCode_CodeFindClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure_CodeFind,egret.TouchEvent.TOUCH_END,this.Btn_Sure_CodeFindClick,this);
        
        this.AddClickEvent(this.mPanel.Btn_Close_PSWProtect,egret.TouchEvent.TOUCH_END,this.Btn_Close_PSWProtectClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure_PSWProtect,egret.TouchEvent.TOUCH_END,this.Btn_Sure_PSWProtectClick,this);
        
        this.AddClickEvent(this.mPanel.Btn_Close_PSWChange,egret.TouchEvent.TOUCH_END,this.Btn_Close_PSWChangeClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure_PSWChange,egret.TouchEvent.TOUCH_END,this.Btn_Sure_PSWChangeClick,this);
        
        this.AddClickEvent(this.mPanel.Btn_Close_CodeChange,egret.TouchEvent.TOUCH_END,this.Btn_Close_CodeChangeClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure_CodeChange,egret.TouchEvent.TOUCH_END,this.Btn_Sure_CodeChangeClick,this);
        
        this.AddClickEvent(this.mPanel.Btn_Close_CodeSetting,egret.TouchEvent.TOUCH_END,this.Btn_Close_CodeSettingClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure_CodeSetting,egret.TouchEvent.TOUCH_END,this.Btn_Sure_CodeSettingClick,this);
        
        this.AddClickEvent(this.mPanel.Btn_Close_CodeOpen,egret.TouchEvent.TOUCH_END,this.Btn_Close_CodeOpenClick,this);
        this.AddClickEvent(this.mPanel.Btn_COdeChange_CodeOpen,egret.TouchEvent.TOUCH_END,this.Btn_COdeChange_CodeOpenClick,this);
        this.AddClickEvent(this.mPanel.Btn_Sure_CodeOpen,egret.TouchEvent.TOUCH_END,this.Btn_Sure_CodeOpenClick,this);
        this.AddClickEvent(this.mPanel.Btn_CodeFind_CodeOpen,egret.TouchEvent.TOUCH_END,this.Btn_CodeFind_CodeOpenClick,this);
    }

    protected removeOnClickListener() {
       this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Mobile_Binding,egret.TouchEvent.TOUCH_END,this.Btn_Mobile_BindingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_IDSecurity_Binding,egret.TouchEvent.TOUCH_END,this.Btn_IDSecurity_BindingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_GameSecurity_Binding,egret.TouchEvent.TOUCH_END,this.Btn_GameSecurity_BindingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Code_Binding,egret.TouchEvent.TOUCH_END,this.Btn_Code_BindingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ChangePhone,egret.TouchEvent.TOUCH_END,this.Btn_ChangePhoneClick,this);
        
        this.RemoveClickEvent(this.mPanel.Btn_Close_ChangePhone,egret.TouchEvent.TOUCH_END,this.Btn_Close_ChangePhoneClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_GetCode_ChangePhone,egret.TouchEvent.TOUCH_END,this.Btn_GetCode_ChangePhoneClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure_ChangePhone,egret.TouchEvent.TOUCH_END,this.Btn_Sure_ChangePhoneClick,this);
        
        this.RemoveClickEvent(this.mPanel.Btn_Close_CodeFind,egret.TouchEvent.TOUCH_END,this.Btn_Close_CodeFindClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_GetCode_CodeFind,egret.TouchEvent.TOUCH_END,this.Btn_GetCode_CodeFindClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure_CodeFind,egret.TouchEvent.TOUCH_END,this.Btn_Sure_CodeFindClick,this);
        
        this.RemoveClickEvent(this.mPanel.Btn_Close_PSWProtect,egret.TouchEvent.TOUCH_END,this.Btn_Close_PSWProtectClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure_PSWProtect,egret.TouchEvent.TOUCH_END,this.Btn_Sure_PSWProtectClick,this);
        
        this.RemoveClickEvent(this.mPanel.Btn_Close_PSWChange,egret.TouchEvent.TOUCH_END,this.Btn_Close_PSWChangeClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure_PSWChange,egret.TouchEvent.TOUCH_END,this.Btn_Sure_PSWChangeClick,this);
        
        this.RemoveClickEvent(this.mPanel.Btn_Close_CodeChange,egret.TouchEvent.TOUCH_END,this.Btn_Close_CodeChangeClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure_CodeChange,egret.TouchEvent.TOUCH_END,this.Btn_Sure_CodeChangeClick,this);
        
        this.RemoveClickEvent(this.mPanel.Btn_Close_CodeSetting,egret.TouchEvent.TOUCH_END,this.Btn_Close_CodeSettingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure_CodeSetting,egret.TouchEvent.TOUCH_END,this.Btn_Sure_CodeSettingClick,this);
        
        this.RemoveClickEvent(this.mPanel.Btn_Close_CodeOpen,egret.TouchEvent.TOUCH_END,this.Btn_Close_CodeOpenClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_COdeChange_CodeOpen,egret.TouchEvent.TOUCH_END,this.Btn_COdeChange_CodeOpenClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Sure_CodeOpen,egret.TouchEvent.TOUCH_END,this.Btn_Sure_CodeOpenClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_CodeFind_CodeOpen,egret.TouchEvent.TOUCH_END,this.Btn_CodeFind_CodeOpenClick,this);
    }
    private Btn_CloseClick(){
        this.mPanel.hide();
    }
    private Btn_Mobile_BindingClick(){
        KFControllerMgr.getCtl(PanelName.BindingPhonePanel).setCB(()=>{
            this.initView();
        }).show();
    } 
    private Btn_IDSecurity_BindingClick(){
        KFControllerMgr.getCtl(PanelName.IDAuthenticatPanel).show();
    } 
    private Btn_GameSecurity_BindingClick(){
        if(GlobalClass.HallClass.bCodeProtect_Binding){ //口令已设置
            if(!GlobalClass.HallClass.bCodeProtect_Open){
                this.mPanel.Panel_Code_Open.visible = true;
            }else{
                this.mPanel.Panel_Code_Open.visible = true;;
            }
            this.resetCodeOpenLabel ();
        }else{
            this.mPanel.Panel_Code_Setting.visible = true;
        }
    } 
    private Btn_Code_BindingClick(){
        this.mPanel.Panel_PSW_Change.visible = true;
    } 


    private changeStep(step){
        this.changePhoneStep = step;
        if(step==2){
            this.mPanel.Panel_ChangePhone.visible = false;
            this.ResendOver_ChangePhone();
        }
        if(step==1){
            this.mPanel.Panel_ChangePhone.visible = true;
            this.mPanel.label1_ChangePhone.text = LocalizationMgr.getText("当前手机号");
            this.mPanel.label2_ChangePhone.text = LocalizationMgr.getText("手机验证码");
            this.mPanel.Input_NewPhoneNum_ChangePhone.prompt = LocalizationMgr.getText("请输入当前绑定手机号码");
            this.mPanel.Input_Code_ChangePhone.prompt = LocalizationMgr.getText("请输入验证码");
            this.mPanel.Btn_Sure_ChangePhone.getChildAt(1).text=LocalizationMgr.getText("下一步");
        }
        if(step==2){
            this.mPanel.label1_ChangePhone.text = LocalizationMgr.getText("新手机号码");
            this.mPanel.label2_ChangePhone.text = LocalizationMgr.getText("新手机验证码");
            this.mPanel.Input_NewPhoneNum_ChangePhone.prompt = LocalizationMgr.getText("请输入需要绑定的新手机");
            this.mPanel.Input_Code_ChangePhone.prompt = LocalizationMgr.getText("请输入新手机验证码");
            this.mPanel.Btn_Sure_ChangePhone.getChildAt(1).text=LocalizationMgr.getText("确定更换");
             this.invoke(0.3,()=>{
                this.mPanel.Panel_ChangePhone.visible = true;
            },this);
        }
        this.mPanel.Input_NewPhoneNum_ChangePhone.text = "";
        this.mPanel.Input_Code_ChangePhone.text = "";
    }
    private Btn_ChangePhoneClick(){
        this.changeStep(1);
    }
    private Btn_Close_ChangePhoneClick(){
        this.mPanel.Panel_ChangePhone.visible = false;
    } 
    private Btn_GetCode_ChangePhoneClick(){
        if (this.mPanel.Input_NewPhoneNum_ChangePhone.text == "" ){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1029),2);
            return;
        }
        var step = 1;
        if(this.changePhoneStep==1){
            step = 1;
        }else{
            step = 0;
        }
        this.mPanel.Btn_GetCode_ChangePhone.touchEnabled = false;
        var js = {phone: this.mPanel.Input_NewPhoneNum_ChangePhone.text,firststep:step};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_2303,JSON.stringify(js));  
        this.Resend_ChangePhone();
    } 
    private Btn_Sure_ChangePhoneClick(){
        if (this.mPanel.Input_NewPhoneNum_ChangePhone.text == "" ){
            if(this.changePhoneStep == 1){
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1029),2);
            }else{
                KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1028),2);
            }
            return;
        }
        if (this.mPanel.Input_Code_ChangePhone.text == "" ){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1030),2);
            return;
        }
        var step = 1;
        if(this.changePhoneStep==1){
            step = 1;
        }else{
            step = 0;
        }
        var js = {code: this.mPanel.Input_Code_ChangePhone.text,firststep:step};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_2304,JSON.stringify(js));
    }
    private Btn_Close_CodeFindClick(){
        this.initView();
    } 
    private Btn_Close_CodeSettingClick(){
        this.initView();
    }
    private Btn_Close_CodeChangeClick(){
        this.initView();
    }
    private Btn_Close_PSWChangeClick(){
        this.initView();
    }
    private Btn_Close_CodeOpenClick(){
        this.initView();
    }
    private Btn_Close_PSWProtectClick(){
        this.initView();
    }
    private Btn_GetCode_CodeFindClick(){
        if (this.mPanel.Input_PhoneNum_CodeFind.text == "" ){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1013),2);
            return;
        }
        this.Resend();
        this.mPanel.Btn_GetCode_CodeFind.touchEnabled = false;
         var js = {phonenum: this.mPanel.Input_PhoneNum_CodeFind.text};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_1027,JSON.stringify(js));
    
    } 
    private Btn_Sure_CodeFindClick(){
        if (this.mPanel.Input_PhoneNum_CodeFind.text == ""){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1013),2);
            return;
        }
        if (this.mPanel.Input_CheckCode_CodeFind.text == ""){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1030),2);
            return;
        }
        if (this.mPanel.Input_CodeNewFirst_CodeFind.text == ""|| this.mPanel.Input_CodeNewSecond_CodeFind.text == ""){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1031),2);
            return;
        }
        if (! (this.mPanel.Input_CodeNewFirst_CodeFind.text==this.mPanel.Input_CodeNewSecond_CodeFind.text)){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1032),2);
            return;
        }
        if(! this.checkPSWForm(this.mPanel.Input_CodeNewFirst_CodeFind.text,false)){
            return;
        }
        var md5Str: string = new md5().hex_md5(this.mPanel.Input_CodeNewFirst_CodeFind.text);
        var js = {newpasswd: md5Str,code:this.mPanel.Input_CheckCode_CodeFind.text};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_1026,JSON.stringify(js));
    }
     private Btn_Sure_PSWProtectClick(){} 
    private Btn_Sure_PSWChangeClick(){
            if (this.mPanel.Input_PSWOld_PSWChange.text == ""|| this.mPanel.Input_PSWNewFirst_PSWChange.text == "" || this.mPanel.Input_PSWNewSecond_PSWChange.text == "")
        {
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1033),2);
        return;
        }
        if ( ! (this.mPanel.Input_PSWNewFirst_PSWChange.text == this.mPanel.Input_PSWNewSecond_PSWChange.text))
        {      
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1034),2);
        return;
        }
        if(! this.checkPSWForm(this.mPanel.Input_PSWNewFirst_PSWChange.text,true)){
        return;
        }
        var md5Str: string = new md5().hex_md5(this.mPanel.Input_PSWOld_PSWChange.text);
        var md5Str2: string = new md5().hex_md5(this.mPanel.Input_PSWNewFirst_PSWChange.text);
        var js = {passwd: md5Str,newpass:md5Str2};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_1030,JSON.stringify(js));
    } 
     private Btn_Sure_CodeChangeClick(){
        if (this.mPanel.Input_CodeOld_CodeChange.text == ""|| this.mPanel.Input_CodeNewFirst_CodeChange.text == "" || this.mPanel.Input_CodeNewSecond_CodeChange.text == "")
        {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1031),2);
            return;
        }
        if (! (this.mPanel.Input_CodeNewFirst_CodeChange.text==this.mPanel.Input_CodeNewSecond_CodeChange.text))
        {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1032),2);
            return;
        }    
            if(! this.checkPSWForm(this.mPanel.Input_CodeNewFirst_CodeChange.text,false)){
            return;
        }
        var md5Str: string = new md5().hex_md5(this.mPanel.Input_CodeOld_CodeChange.text);
        var md5Str2: string = new md5().hex_md5(this.mPanel.Input_CodeNewSecond_CodeChange.text);
        var js = {passwd: md5Str,newpasswd:md5Str2};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_1025,JSON.stringify(js));
     }
    private Btn_COdeChange_CodeOpenClick(){
        this.mPanel.Panel_Code_Open.visible = false;
        this.mPanel.Panel_Code_Change.visible = true;
    } 
    private Btn_CodeFind_CodeOpenClick(){
        if (GlobalClass.HallClass.str_BindingPhone == "0") //未绑定
      {
          KFControllerMgr.showTips("请绑定手机后再找回口令");
      }else{
        this.mPanel.Panel_Code_Open.visible = false;
        this.mPanel.Panel_Code_Find.visible = true;
        this.mPanel.Input_PhoneNum_CodeFind.text = "";
      }
    }
    private Btn_Sure_CodeOpenClick(){
        if (this.mPanel.Input_Code_CodeOpen.text == "" ){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1031),2);
        return;
        }
        var enable = "";
        if(! GlobalClass.HallClass.bCodeProtect_Open){ //开启
            enable = "1";
        } else{ //--关闭
            enable = "0";
        }
        var md5Str: string = new md5().hex_md5(this.mPanel.Input_Code_CodeOpen.text);
        var js = {passwd: md5Str,enable:enable};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_1024,JSON.stringify(js));
    }
     private Btn_Sure_CodeSettingClick(){
         if (this.mPanel.Input_CodeFirst_CodeSetting.text == ""|| this.mPanel.Input_CodeSecond_CodeSetting.text == "")
        {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1031),2);
            return;
        }
        if (! (this.mPanel.Input_CodeFirst_CodeSetting.text ==this.mPanel.Input_CodeSecond_CodeSetting.text))
        {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1032),2);
            return;
        }
        if(! this.checkPSWForm(this.mPanel.Input_CodeFirst_CodeSetting.text,false)){
            return;
        }
        var md5Str: string = new md5().hex_md5(this.mPanel.Input_CodeFirst_CodeSetting.text);
        var js = {passwd: md5Str};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_1023,JSON.stringify(js));
      
     } 

    private ChangePhoneTimer:egret.Timer;
    private Timer:egret.Timer;
    private int_SendTime = 60;
    private int_SendTime_ori = 60;
    private int_SendTime_ChangePhone = 60;
    private initTimer(){
        this.Timer = new egret.Timer(1000,60);
        this.Timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
            this.ResendOver();
        },this);
        this.Timer.addEventListener(egret.TimerEvent.TIMER,()=>{
            this.int_SendTime --;
            this.mPanel.Btn_GetCode_CodeFind.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1041)+"(" + this.int_SendTime + ")";
        },this);

        this.ChangePhoneTimer = new egret.Timer(1000,60);
        this.ChangePhoneTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
            this.ResendOver_ChangePhone();
        },this);
        this.ChangePhoneTimer.addEventListener(egret.TimerEvent.TIMER,()=>{
            this.int_SendTime_ChangePhone --;
            this.mPanel.Btn_GetCode_ChangePhone.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1041)+"(" + this.int_SendTime_ChangePhone + ")";
        },this);
    }
     private Resend(){
        this.int_SendTime = this.int_SendTime_ori;
        this.disableBut( this.mPanel.Btn_GetCode_CodeFind);
        this.Timer.start();
    }

    private ResendOver(){
        this.enableBut( this.mPanel.Btn_GetCode_CodeFind);
        this.mPanel.Btn_GetCode_CodeFind.getChildAt(1).text =  LocalizationMgr.getText(TipTexts.A1035);
        this.int_SendTime = 0;
        this.Timer.reset();
    }
    private Resend_ChangePhone(){
        this.int_SendTime_ChangePhone = this.int_SendTime_ori;
        this.disableBut( this.mPanel.Btn_GetCode_ChangePhone);
        this.ChangePhoneTimer.start();
    }

    private ResendOver_ChangePhone(){
        this.enableBut( this.mPanel.Btn_GetCode_ChangePhone);
        this.mPanel.Btn_GetCode_ChangePhone.getChildAt(1).text =  LocalizationMgr.getText(TipTexts.A1035);
        this.int_SendTime_ChangePhone = 0;
        this.ChangePhoneTimer.reset();
    }

    private checkPSWForm(PSW:string,isPsw:boolean):boolean{
        var prefix = isPsw ? "密码" : "口令";
        var len = PSW.length;
        if(len<6 || len>16){
            KFControllerMgr.showTips(LocalizationMgr.getText(prefix+"长度为6-16位"));
            return false;
        }

        var regex = /^[A-Za-z0-9!@#$%^&*.~_]+$/;
        var regex2 = /^[0-9]+$/;
        var regex3 = /^[A-Za-z]+$/;
        if(isPsw){
            if (regex2.test(PSW)||regex3.test(PSW)) { 
                KFControllerMgr.showTips(LocalizationMgr.getText(prefix+"必须包含字母和数字!"));
                return false;
            }
        }
        if(!regex.test(PSW)){
            KFControllerMgr.showTips(LocalizationMgr.getText(prefix+"格式不正确"));
            return false;
        }else{
            return  true;
            // local i,j = string.find(PSW, regex);
            // if(1==1){
            //     return  true;
            // }else{
            //     KFControllerMgr.showTips(LocalizationMgr.getText(prefix+"格式不正确"));

            //     return  false;
            // }
        }
    }
}