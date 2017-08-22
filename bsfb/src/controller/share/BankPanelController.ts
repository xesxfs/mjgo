/**
 *
 * @author 
 *
 */
class BankPanelController extends KFController{   
	private cbfun:Function;
    public KD_source:number;                //对话框是从哪部分打开
    public KD_inputMax:number;              //输入框输入的最大数字
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.Bank.EnterBank,
            MsgID.Bank.ModifyPassWord,
            MsgID.Bank.Deposit,
            MsgID.Bank.DrawMoney,
            MsgID.Bank.Msg_2005,
            MsgID.Bank.GetCode,
            MsgID.Bank.ResetPassWord,
            ];
	}
	
    protected onReady() {
    } 

    protected onShow(){//在界面上显示出来
        if(KFSceneManager.getInstance().getRuningSceneName() == SceneName[SceneName.Hall]+"Scene"){
              this.onClickBtnDepositTitle();
        }else{
            this.mPanel.btn_withdraw.x  = this.mPanel.btn_deposit.x;
             this.mPanel.btn_deposit.visible = false;
            this.onClickBtnWithdrawTitle();
        }
        // if(this.showtype==1){
        //     this.onClickBtnDepositTitle();
        // }else{
        //     this.mPanel.btn_deposit.visible = false;
        //     this.mPanel.btn_withdraw.x  = this.mPanel.btn_deposit.x;
        //     this.onClickBtnWithdrawTitle();
        // }
        var js = {userid: GlobalClass.UserInfo.str_UserID};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Bank.EnterBank,JSON.stringify(js)); 
        
        this.initTimer();
        
    }

    /**
     * 更新银行面板。         
     * @param isLock  银行是否已被锁住
     * @param bChangedPasswd 
     * @param aPoint  可用点数 
     * @param bPoint  当前银行中存在点数     
    */
    public setBankPanel(aPoint:number, bPoint:number,isLock?:number, bChangedPasswd?:number){        
        this.mPanel.label_numBankPoint.$setText(""+bPoint);
        this.mPanel.label_numWalletPoint.$setText(""+aPoint);
        if (bChangedPasswd == 0) {    //没有修改过密码
            this.mPanel.Label_PWTips.visible = true;
        }else{
            this.mPanel.Label_PWTips.visible = false;
        }
    }     

    private SetPassError(isError){
        if (isError) {
            this.mPanel.BottomInfo.visible = false;
            this.mPanel.Label_PassError.visible = true;
            this.mPanel.Label_Deposit_Error.visible = true;
        }else{
            this.mPanel.BottomInfo.visible = true;
            this.mPanel.Label_PassError.visible = false;
        }
    }

    private SetBankPoints(args){
        this.mPanel.label_numBankPoint.text = CommonFuc.stringDivide(args+"");
    }

    private SetWalletPoints(args){
        this.mPanel.label_numWalletPoint.text = CommonFuc.stringDivide(args+"");
    }

    private on2001_event(event: egret.Event): void {        
        console.log("on2001_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        console.log(msg.getDataStr());
        var jsonData = JSON.parse(msg.getDataStr());
        var ret = jsonData["ret"];
        if(ret == 1) {
            var bPoint = jsonData["info"]["bPoint"];      //银行中的点数
            GlobalClass.Bank.BankPoints = bPoint;

            var aPoint = jsonData["info"]["aPoint"];      //钱包中的点数
            GlobalClass.Bank.WalletPoints = aPoint;
                
            var bLock = jsonData["info"]["isLock"];       //是否被锁定
            if (bLock == 1) {
                GlobalClass.Bank.bLock = true;
            }else{
                GlobalClass.Bank.bLock = false;
            }   
            this.SetPassError(GlobalClass.Bank.bLock);

            var bChangedPasswd = jsonData["info"]["bChangedPasswd"];
            if (bChangedPasswd == 0) {    //没有修改过密码
                this.mPanel.Label_PWTips.visible = true;
            }else{
                this.mPanel.Label_PWTips.visible = false;
            }

            this.SetBankPoints(bPoint);
            this.SetWalletPoints(aPoint);
        }else if (ret == 0) {
            var reasonType = jsonData["info"]["reasonType"];
            KFControllerMgr.showTips(reasonType+"");
        }
        
    }
    
    /**修改密码回调*/
    private on2002_event(event: egret.Event): void {        
        console.log("on2002_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        console.log(msg.getDataStr());
        var jsonData = JSON.parse(msg.getDataStr());
        if(jsonData.ret == 0){
            //请求返回错误
            var reasonType = jsonData["info"]["reasonType"];
            if (reasonType == 1002) {
                KFControllerMgr.showTips("原始密码错误");
            }else if (reasonType == 1009) {
                GlobalClass.Bank.bLock = true;
                var _this = this;
                KFControllerMgr.showTips("密码错误超过5次，请明日再试",0,1,()=>{
                    _this.onClickBtnCBPClose();
                    _this.SetPassError(true);
                })
            }else{
                KFControllerMgr.showTips(reasonType+"");
            }
        }
        else{      
            KFControllerMgr.showTips("修改密码成功!");  
            this.onClickBtnCBPClose();
            this.mPanel.Label_PWTips.visible = false;
        }        
    }

    /**点数存入银行事件回调*/
    private on2003_event(event: egret.Event): void {        
        console.log("on2003_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        console.log(msg.getDataStr());
        var jsonData = JSON.parse(msg.getDataStr());
        if(jsonData.ret == 0){
            //请求返回错误
            KFControllerMgr.showTips(jsonData.info.desc);
        }
        else{            
            let aPoint:number = jsonData.info.aPoint;
            let bPoint:number = jsonData.info.bPoint;
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
            this.setBankPanel(jsonData.info.aPoint, jsonData.info.bPoint);
            var _this = this;
            KFControllerMgr.showTips("存入成功！",1,0,()=>{
                _this.onClickBtnClose();
            });
        }        
    }

    /**从银行取出点数事件回调*/
    private on2004_event(event: egret.Event): void {        
        console.log("on2004_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        console.log(msg.getDataStr());
        var data = msg.getDataStr();
        // var data = '{"info": {"errorCount": 4, "reasonType": 1009, "desc": "Bank is locked!"}, "code": 2004, "ret": 0}';
        var jsonData = JSON.parse(data);
        if(jsonData.ret == 0){
            //请求返回错误
            var reasonType = jsonData["info"]["reasonType"];
            if (reasonType == 1009) {  //密码错误超过上限
                GlobalClass.Bank.bLock = true;
                this.SetPassError(true);
            }else if (reasonType == 1002 || reasonType == 1004) {
                var errorCount = Number(jsonData["info"]["errorCount"]);
                var title = "密码错误" + errorCount + "次，错误5次后当天将不能再取出!";
                 KFControllerMgr.showTips(title,1);
                if(errorCount == 5) {
                    GlobalClass.Bank.bLock = true;
                    this.SetPassError(true);
                }
            }else{
                KFControllerMgr.showTips(jsonData.info.desc+"");
            }
        }
        else if(jsonData.ret == 1){          
            let aPoint:number = jsonData.info.aPoint;
            let bPoint:number = jsonData.info.bPoint; 
            GlobalClass.Bank.BankPoints = bPoint;
            GlobalClass.Bank.WalletPoints = aPoint;
            this.setBankPanel(jsonData.info.aPoint, jsonData.info.bPoint);
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
            let _this = this;
            KFControllerMgr.showTips("取出成功!",1,0,()=>{
                _this.onClickBtnClose();
            });
        }        
    }

    /**修改密码事件回调*/
    private on2005_event(event: egret.Event): void {        
        console.log("on2005_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        console.log(msg.getDataStr());
        var jsonData = JSON.parse(msg.getDataStr());
        if(jsonData.ret == 0){
            //请求返回错误
            KFControllerMgr.showTips(jsonData.info.desc);
        }
        else{
            let isLock:number = jsonData.info.isLock;
            let bChangedPasswd:number = jsonData.info.bChangedPasswd;
            let aPoint:number = jsonData.info.aPoint;
            let bPoint:number = jsonData.info.bPoint; 
            this.setBankPanel( jsonData.info.isLock, jsonData.info.bChangedPasswd, jsonData.info.aPoint, jsonData.info.bPoint);
        }        
    }

    /**获取验证码事件回调*/
    private on2006_event(event: egret.Event): void {        
        console.log("on2006_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        console.log(msg.getDataStr());
        var jsonData = JSON.parse(msg.getDataStr());
        if(jsonData.ret == 0){
            //请求返回错误
            KFControllerMgr.showTips(jsonData.info.desc);
            this.ResendOver();
        }
        else{
            KFControllerMgr.showTips("验证码已发送，请注意查收");
        }        
    }

    /**忘记银行密码验证事件回调*/
    private on2007_event(event: egret.Event): void {        
        console.log("on2007_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        console.log(msg.getDataStr());
        var jsonData = JSON.parse(msg.getDataStr());
        if(jsonData.ret == 0){
            //请求返回错误
            KFControllerMgr.showTips(jsonData.info.desc);
        }
        else{
            KFControllerMgr.showTips("修改成功",0,1,()=>{
                this.onClickBtnFPClose();
            });
        }        
    }

    private Timer:egret.Timer;
    private int_SendTime = 60;
    private int_SendTime_ori = 60;

    private Resend(){
        this.int_SendTime = this.int_SendTime_ori;
        this.disableBut( this.mPanel.btn_FP_getCheckCode);
        this.Timer.start();
    }

    private ResendOver(){
        this.enableBut( this.mPanel.btn_FP_getCheckCode);
        this.mPanel.btn_FP_getCheckCode.getChildAt(1).text =  LocalizationMgr.getText(TipTexts.A1035);
        this.int_SendTime = 0;
        this.Timer.reset();
    }

    private initTimer(){
        this.Timer = new egret.Timer(1000,60);
        this.Timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
            this.ResendOver();
        },this);
        this.Timer.addEventListener(egret.TimerEvent.TIMER,()=>{
            this.int_SendTime --;
            this.mPanel.btn_FP_getCheckCode.getChildAt(1).text = LocalizationMgr.getText(TipTexts.A1041)+"(" + this.int_SendTime + ")";
        },this);
    }

    protected setOnClickListener() {        
       this.AddClickEvent(this.mPanel.btn_close,egret.TouchEvent.TOUCH_TAP,this.onClickBtnClose,this);
        this.AddClickEvent(this.mPanel.btn_deposit,egret.TouchEvent.CHANGE,this.onClickBtnDepositTitle,this);
        this.AddClickEvent(this.mPanel.btn_withdraw,egret.TouchEvent.CHANGE,this.onClickBtnWithdrawTitle,this);
        this.AddClickEvent(this.mPanel.AllMoney_Btn,egret.TouchEvent.TOUCH_TAP,this.onClickBtnAllWithdraw,this);

        this.AddClickEvent(this.mPanel.Btn_OK1,egret.TouchEvent.TOUCH_TAP,this.onClickBtnEnsureWithdraw,this);
        this.AddClickEvent(this.mPanel.Checkbox_Rember,egret.TouchEvent.TOUCH_TAP,this.onClickCheckboxRember,this);
        this.AddClickEvent(this.mPanel.Btn_changeBankPasswd,egret.TouchEvent.TOUCH_TAP,this.onClickBtnChangePasswd,this);
        this.AddClickEvent(this.mPanel.Btn_findPassword,egret.TouchEvent.TOUCH_TAP,this.onClickBtnFindPasswd,this);
        this.AddClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_TAP,this.onClickBtnEnsureDeposit,this);
        this.AddClickEvent(this.mPanel.Btn_OK0,egret.TouchEvent.TOUCH_TAP,this.onClickBtnAllDeposit,this);
        //数字键盘对话框
        this.AddClickEvent(this.mPanel.btn_KDClose,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDClose,this);
        this.AddClickEvent(this.mPanel.btn_KDNum_0,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNum0,this,0);  
        this.AddClickEvent(this.mPanel.btn_KDNum_1,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNum1,this,0); 
        this.AddClickEvent(this.mPanel.btn_KDNum_2,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNum2,this,0); 
        this.AddClickEvent(this.mPanel.btn_KDNum_3,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNum3,this,0); 
        this.AddClickEvent(this.mPanel.btn_KDNum_4,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNum4,this,0); 
        this.AddClickEvent(this.mPanel.btn_KDNum_5,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNum5,this,0); 
        this.AddClickEvent(this.mPanel.btn_KDNum_6,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNum6,this,0); 
        this.AddClickEvent(this.mPanel.btn_KDNum_7,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNum7,this,0); 
        this.AddClickEvent(this.mPanel.btn_KDNum_8,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNum8,this,0);    
        this.AddClickEvent(this.mPanel.btn_KDNum_9,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNum9,this,0);    
        this.AddClickEvent(this.mPanel.btn_KDNum_wan,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNumWan,this,0); 
        this.AddClickEvent(this.mPanel.btn_KDNum_confirm,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDOk,this); 


        
        // this.AddClickEvent(this.mPanel.btn_KDNumDelete,egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNumBack,this); 
        // this.AddClickEvent(this.mPanel.btn_KDNumDelete,egret.TouchEvent.TOUCH_BEGIN,this.BtnKDNumBackBegin,this); 
        // this.AddClickEvent(this.mPanel.btn_KDNumDelete,egret.TouchEvent.TOUCH_END,this.BtnKDNumBackEnd,this);
        this.mPanel.btn_KDNumDelete.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickBtnKDNumBack,this);
        this.mPanel.btn_KDNumDelete.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.BtnKDNumBackBegin,this);
        this.mPanel.btn_KDNumDelete.addEventListener(egret.TouchEvent.TOUCH_END,this.BtnKDNumBackEnd,this);

        //修改密码对话框
        this.AddClickEvent(this.mPanel.btn_CBP_close,egret.TouchEvent.TOUCH_TAP,this.onClickBtnCBPClose,this);
        this.AddClickEvent(this.mPanel.btn_CBP_ok,egret.TouchEvent.TOUCH_TAP,this.onClickBtnCBPOk,this); 

        //修改密码对话框
        this.AddClickEvent(this.mPanel.btn_FP_close,egret.TouchEvent.TOUCH_TAP,this.onClickBtnFPClose,this);
        this.AddClickEvent(this.mPanel.btn_FP_ok,egret.TouchEvent.TOUCH_TAP,this.onClickBtnFPOk,this); 
        this.AddClickEvent(this.mPanel.btn_FP_getCheckCode,egret.TouchEvent.TOUCH_TAP,this.onClickBtnFPGetCheckCode,this); 

        this.AddClickEvent(this.mPanel.Input_Deposit,egret.TouchEvent.TOUCH_TAP,this.Input_DepositClick,this);
        this.AddClickEvent(this.mPanel.InputPoints,egret.TouchEvent.TOUCH_TAP,this.InputPointsClick,this); 
    }

    private BtnKDNumBackBegin(){
        SoundMgr.Instance.playEffect(SoundMgr.buttonEffect);
        this.butFade2(this.mPanel.btn_KDNumDelete,0.7);
        this.invoke(0.8,this.longClickBtnKDNum,this);
    }
    private BtnKDNumBackEnd(){
        this.butBright(this.mPanel.btn_KDNumDelete);
        this.cancelInvoke(this.longClickBtnKDNum,this);
    }

    private longClickBtnKDNum(){
        this.mPanel.label_KDPointNum.text = "";
        this.openNumberPanel();
    }

    private Input_DepositClick(){
        if (GlobalClass.Bank.WalletPoints == 0) {
            KFControllerMgr.showTips("钱包点数为0，无法存入！");
            return;
        }
        this.openNumberPanel();
    }
    
    private InputPointsClick(){
        if (GlobalClass.Bank.BankPoints == 0) {
            KFControllerMgr.showTips("银行点数为0，无法取出！");
            return;
        }
        this.openNumberPanel();
    }

    private openNumberPanel(){
        this.mPanel.group_keyboardDialog.visible = true;
        var num = "";
        if(this.KD_source==1){
            if(this.mPanel.Input_Deposit.text!=""){
                num = this.mPanel.Input_Deposit.text;
                this.mPanel.label_KDPointNum.textColor = 0x000000;
            }else{
                num = "本次最多"+this.mPanel.label_numWalletPoint.text;
                this.mPanel.label_KDPointNum.textColor = 0x635C5C;
            }
        }else{
            if(this.mPanel.InputPoints.text!=""){
                num = this.mPanel.InputPoints.text;
                this.mPanel.label_KDPointNum.textColor = 0x000000;
            }else{
                num = "本次最多"+this.mPanel.label_numBankPoint.text;
                this.mPanel.label_KDPointNum.textColor = 0x635C5C;
            }
        }
        this.mPanel.label_KDPointNum.text = num;
    }

    protected removeOnClickListener() {      
    }  

      private onClickBtnClose(){        
        this.mPanel.hide();
        this.SavePassWord();
    }

    /*点击存入面板按钮*/
    private onClickBtnDepositTitle(){     
        this.mPanel.btn_deposit.selected = true;
        this.mPanel.group_withdrawMoney.$setVisible(false);
        this.mPanel.group_deposit.$setVisible(true);       
        this.clearData();
        this.SavePassWord();
        this.KD_source = 1;
        
    }

    private SavePassWord(){
        if(this.mPanel.Checkbox_Rember.selected) {
            GlobalClass.Bank.BankCode = this.mPanel.InputPassWord.text;
        }else{
            GlobalClass.Bank.BankCode = "";
        }
    }

    /*点击存出面板按钮*/
    private onClickBtnWithdrawTitle(){
        this.mPanel.btn_withdraw.selected = true;
        this.mPanel.group_withdrawMoney.$setVisible(true);
        this.mPanel.group_deposit.$setVisible(false);

        this.mPanel.InputPassWord.text = GlobalClass.Bank.BankCode;
        this.clearData();
    
        if(GlobalClass.Bank.BankCode == "" || GlobalClass.Bank.BankCode == "") {
            this.mPanel.Checkbox_Rember.selected = false;
        }else{
            this.mPanel.Checkbox_Rember.selected  = true;
        }

        this.KD_source = 2;
    }

    private clearData(){
        this.mPanel.Input_Deposit.text = "";
        this.mPanel.InputPoints.text = "";

        // this.mPanel.InputOld.text = "";
        // this.mPanel.InputNew.text = "";
        // this.mPanel.InputNew2.text = "";
    }

    /*点击全部取出按钮*/
    private onClickBtnAllWithdraw(){        
        if (GlobalClass.Bank.BankPoints == 0) {
            KFControllerMgr.showTips("银行点数为0，无法取出！");
            return;
        }
        this.mPanel.InputPoints.text = this.mPanel.label_numBankPoint.text;
    }

    /*点击确认取出按钮*/
    private onClickBtnEnsureWithdraw(){
        var drawMoney = this.mPanel.InputPoints.text.replace(/,/g, "");
        if(drawMoney == "") {
            KFControllerMgr.showTips("取出点数不能为空");
            return;
        }
        if(drawMoney == "0") {
            KFControllerMgr.showTips("取出点数不能为0");
            return;
        }

        var password = this.mPanel.InputPassWord.text;
        if(password == "") {
            KFControllerMgr.showTips("密码不能为空");
            return;
        }

        KFControllerMgr.showTips("确定取出?",0,2,()=>{
             var js = {userid: GlobalClass.UserInfo.str_UserID, passwd:new md5().hex_md5(password), point:drawMoney};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.Bank.DrawMoney,JSON.stringify(js));
        });
    }

    /*点击记住密码*/
    private onClickCheckboxRember(){        
        // this.Checkbox_Rember.$setSelected(false);
    }

    /*点击修改密码按钮*/
    private onClickBtnChangePasswd(){
        this.clearData();
        this.mPanel.group_changeBankPassword.$setVisible(true);
    }

    /*点击忘记密码按钮*/
    private onClickBtnFindPasswd(){
         if (GlobalClass.HallClass.str_BindingPhone == "0") { 
             KFControllerMgr.showTips("绑定手机后才能找回密码");
            return;
         }
        this.mPanel.group_findPassword.$setVisible(true);
    }

    /*点击确认存入按钮*/
    private onClickBtnEnsureDeposit(){
        if (this.mPanel.Input_Deposit.text == "0") { 
             KFControllerMgr.showTips("存入点数不能为0");
            return;
         }
        var numPoint = Number(this.mPanel.Input_Deposit.text.replace(/,/g, ''));
        var numwalletPoint = Number(this.mPanel.label_numWalletPoint.$getText());
        if(0>=numPoint || numPoint>numwalletPoint){
            return;
        }
        this.mPanel.Input_Deposit.text = "";
        KFControllerMgr.showTips("确定存入?",0,2,()=>{
              var js = {userid: GlobalClass.UserInfo.str_UserID, passwd:this.mPanel.InputPassWord.text, point:numPoint};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.Bank.Deposit,JSON.stringify(js));
         })
    }

    /*点击全部存入按钮*/
    private onClickBtnAllDeposit(){
        this.mPanel.Input_Deposit.$setText(this.mPanel.label_numWalletPoint.$getText());
    }

    /*关闭数字键盘对话框*/
    private onClickBtnKDClose(){
        this.mPanel.group_keyboardDialog.$setVisible(false);
    }

    /*更新输入的数字*/
    private updateLabelNum(strNumber:string){
        let curNum:string = this.mPanel.label_KDPointNum.$getText()
        var a = curNum.indexOf("本次最多");
        if(curNum.indexOf("本次最多")>=0){
            curNum = "";
        }
        curNum = curNum.replace(/,/g, "");
        let newNum:number = Number(curNum+strNumber);
        let max = 0;
        if(this.KD_source==1){
            max = Number(this.mPanel.label_numWalletPoint.text.replace(/,/g, ""));
        }else{
            max = Number(this.mPanel.label_numBankPoint.text.replace(/,/g, ""));
        }
                    
        
        newNum = max< newNum ? max:newNum;        
        this.mPanel.label_KDPointNum.$setText(CommonFuc.stringDivide(""+newNum));
        this.mPanel.label_KDPointNum.textColor = 0x000000;
    }

    /* 点击数字按钮*/
    private onClickBtnKDNum0(){
        this.updateLabelNum("0");
    }
    private onClickBtnKDNum1(){
        this.updateLabelNum("1");
    }
    private onClickBtnKDNum2(){
        this.updateLabelNum("2");
    }
    private onClickBtnKDNum3(){
        this.updateLabelNum("3");
    }
    private onClickBtnKDNum4(){
        this.updateLabelNum("4");
    }
    private onClickBtnKDNum5(){
        this.updateLabelNum("5");
    }
    private onClickBtnKDNum6(){
        this.updateLabelNum("6");
    }
    private onClickBtnKDNum7(){
        this.updateLabelNum("7");
    }    
    private onClickBtnKDNum8(){
        this.updateLabelNum("8");
    }
    private onClickBtnKDNum9(){
        this.updateLabelNum("9");
    }
    private onClickBtnKDNumWan(){
        this.updateLabelNum("0000");
    }

    /*删除最近一位输入的数字*/
    private onClickBtnKDNumBack(){
        SoundMgr.Instance.playEffect(SoundMgr.buttonEffect);
        this.butBright(this.mPanel.btn_KDNumDelete);
        var a = this.mPanel.label_KDPointNum.text.indexOf("本次最多");
        if(a>=0){
           return;
        }
        var curNum:string = this.mPanel.label_KDPointNum.$getText()
        var newstr = curNum.substr(0, curNum.length-1);
        newstr = newstr.replace(/,/g, "");
        var newNum = Number(newstr);
        if(0<curNum.length){
            this.mPanel.label_KDPointNum.$setText(CommonFuc.stringDivide(newNum+""));
            this.mPanel.label_KDPointNum.textColor = 0x000000;
        }
    }

    /*确认输入完成*/
    private onClickBtnKDOk(){
        var curNum = this.mPanel.label_KDPointNum.$getText();
        this.mPanel.label_KDPointNum.textColor = 0x000000;
        this.mPanel.group_keyboardDialog.$setVisible(false);
        if(this.KD_source==1){
            this.mPanel.Input_Deposit.$setText(curNum);
        }else{
            this.mPanel.InputPoints.$setText(curNum);
        }
    }

    /*修改密码对话框确认*/
    private onClickBtnCBPOk(){
        let oldPasswd = this.mPanel.txt_CBP_oldPassword.text.trim();
        let newPasswd = this.mPanel.txt_CBP_newPassword.text.trim();
        let confirmPasswd = this.mPanel.txt_CBP_cofirmNewPassword.text.trim();
        if(oldPasswd==""){
            KFControllerMgr.showTips("原始密码不能为空");
            return;
        }
        if(newPasswd==""||confirmPasswd==""){
            KFControllerMgr.showTips("新密码不能为空");
            return;
        }
        if(6>confirmPasswd.length || 16<confirmPasswd.length){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1037));
            return;
        }
        if(newPasswd != confirmPasswd){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1038));
            return;
        }

        var js = {userid: GlobalClass.UserInfo.str_UserID, passwd:new md5().hex_md5(oldPasswd), newPasswd:new md5().hex_md5(newPasswd)};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Bank.ModifyPassWord,JSON.stringify(js));
    }

    /*修改密码对话框关闭*/
    private onClickBtnCBPClose(){
        this.mPanel.group_changeBankPassword.$setVisible(false);
    }

    /*找回密码对话框确认*/
    private onClickBtnFPOk(){
        let checkcode = this.mPanel.txt_FP_checkCode.text.trim();
        let newPasswd = this.mPanel.txt_FP_newPassword.text.trim();
        let confirmPasswd = this.mPanel.txt_FP_confirmNewPassword.text.trim();
        if(6>confirmPasswd.length || 16<confirmPasswd.length){
            KFControllerMgr.showTips("长度为6-16位");
            return;
        }
        if(newPasswd != confirmPasswd){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1038));
            return;
        }
        if(newPasswd=="" || confirmPasswd=="" || checkcode=="") {
            KFControllerMgr.showTips("验证码或新密码不能为空");
            return;
        }

        var js = {userid: GlobalClass.UserInfo.str_UserID, code:checkcode, newpasswd:new md5().hex_md5(newPasswd)};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Bank.ResetPassWord,JSON.stringify(js));
    }

    /*找回密码对话框关闭*/
    private onClickBtnFPClose(){
        this.mPanel.group_findPassword.$setVisible(false);
    }

    /*找回密码发送验证码*/
    private onClickBtnFPGetCheckCode(){
        let phone = this.mPanel.txt_FP_phone.text.trim();        
        if(11!= phone.length||!CommonFuc.checkePhone(phone)){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1039));
            return;
        }        

        var js = {userid: GlobalClass.UserInfo.str_UserID, phonenum:phone};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Bank.GetCode,JSON.stringify(js));
        this.Resend();
    }  
}