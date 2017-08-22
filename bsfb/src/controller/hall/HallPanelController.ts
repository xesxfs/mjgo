/**
 *
 * @author 
 *
 */
class HallPanelController extends KFController{ 
    private currTip = 0;
    private paticleCB;
    private particleHaveRead = false;
	private particleSystem:particle.GravityParticleSystem;
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.BSFB.BEGIN_BSFB,
            MsgID.BSFB.RECOVERBSFB,
            MsgID.Client.HallRefresh,
            MsgID.WXHH.BEGIN_WXHH,

            MsgID.USER.UPDATE_MONEY,
            MsgID.Hall.GET_BULLETIN_LIST,
            MsgID.USER.CHECK_USER_VIP,
            MsgID.USER.UPDATE_USERLEVEL,
            MsgID.USER.GET_SIGN_CONFIG,
            MsgID.USER.GET_USERSIGN_INFO,
            MsgID.Hall.LEVEL_LIMITS,
            MsgID.Hall.GET_VIPINFO,
            MsgID.Hall.REQUEST_MALLPROPS_LIST,
            MsgID.USER.UPDATE_PROPS,
            MsgID.CLUB.QuaryClubData,
            MsgID.Hall.Msg_1020,
            MsgID.DiceGame.BEGIN_SEND,
            MsgID.Hall.BULLETIN_DETAL,
            MsgID.STONE.BEGIN_STONE,
            MsgID.Mail.NEW_MAIL,
            MsgID.Hall.Msg_2504,
            MsgID.Hall.Msg_109,
        ];
	}

    protected onShow(){//在界面上显示出来
        this.mPanel.stage.scaleMode = egret.StageScaleMode.NO_BORDER;
        this.mPanel.Go_BulletinTable.setCall((id)=>{
            console.log("id="+id);
            var js = {KEY: id};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.BULLETIN_DETAL,JSON.stringify(js));
        },this);
        this.HallButtonAni();
        // this.on1020_event(null);
    }

    private on179_event(event: egret.Event): void {
        console.log("on179_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        var bulletID = strArray[2];
        var bulletDetail = strArray[3];
        this.mPanel.Go_BulletinTable.setContent(bulletID,bulletDetail);
    }

     private on2504_event(event: egret.Event): void {
        console.log("on2504_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        if(ret == 1){
            this._tockon = jsonData["info"];
            var param1 = Number(GlobalClass.UserInfo.str_UserID)*89*2;
            var param2 = 2505*97;
            var param = param1+this._tockon+param2+"";
            var js = {param:new md5().hex_md5(param)};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_2505,JSON.stringify(js));
        }else if(ret == 0){

        }
     }

     private _tockon = "";
     private on109_event(event: egret.Event): void {
        console.log("on109_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        if(ret == 1){
            this._tockon = jsonData["info"];
            this.bsfb_btnClick();
        }

     }

    private HallButtonAni(){
        var posx = this.mPanel.bsfb_btn.x;
        var posy =  this.mPanel.Go_BulletinTable.y;
        var del = 400;
        this.mPanel.bsfb_btn.x += del;
        this.mPanel.WXHH_btn.x += del;
        this.mPanel.dice_btn.x += del;
        this.mPanel.JDSTB_btn.x += del;
        this.mPanel.Go_BulletinTable.y -= del;
        this.invoke(0.5,()=>{
             egret.Tween.get(this.mPanel.bsfb_btn).to({x:posx},650,egret.Ease.backOut).call(function (){
		    },this);
        },this);
        
        this.invoke(0.6,()=>{
            egret.Tween.get(this.mPanel.JDSTB_btn).to({x:posx},650,egret.Ease.backOut).call(function (){
		    },this);
        },this);
        this.invoke(0.6,()=>{
            egret.Tween.get(this.mPanel.Go_BulletinTable).to({y:posy},650,egret.Ease.backOut).call(function (){
		    },this);
        },this);
        this.invoke(0.7,()=>{
            egret.Tween.get(this.mPanel.WXHH_btn).to({x:posx},650,egret.Ease.backOut).call(function (){
            },this);
        },this);
        this.invoke(0.8,()=>{
            egret.Tween.get(this.mPanel.dice_btn).to({x:posx},650,egret.Ease.backOut).call(function (){
            },this);
        },this); 
    }

    private on113_event(event: egret.Event): void {
        console.log("on113_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.UserInfo.str_Hall_totalScore = strArray[2];

        this.mPanel.Label_Point.text = GlobalClass.UserInfo.str_Hall_totalScore;
    }
    private on178_event(event: egret.Event): void {
        console.log("on178_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var strArray = datastr.split("%");
        // var str_BulletinInfo_Group = strArray[2].split("#");
        // for(var i=0;i<str_BulletinInfo_Group.length;i++){
        //      this.CreateBulletinItem(str_BulletinInfo_Group[i]);
        // }
        var jd = JSON.parse(datastr);
        let titles = jd["info"]["titles"];
        titles.forEach(element => {
            this.mPanel.Go_BulletinTable.pushItem(CommonFuc.subString(element["title"],18,true),Number(element["id"]));
        });
        this.mPanel.Go_BulletinTable.visible = true;
    }

    private CreateBulletinItem(data:string){
        var argsList = data.split(",");
        this.mPanel.Go_BulletinTable.pushItem(argsList[1],Number(argsList[0]));
    }
    private on158_event(event: egret.Event): void {
        console.log("on158_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if(strArray[2] == "1") {
            GlobalClass.TaskClass.str_VIPStatus = "1";
            GlobalClass.TaskClass.str_VIPDays = strArray[3];
            //  this.mPanel.Sprite_VIP.visible = true;
            CommonFuc.imgFilterFloat(this.mPanel.Sprite_VIP,[1,1,1,1]);
        }else{
            GlobalClass.TaskClass.str_VIPStatus = "0";
            // this.mPanel.Sprite_VIP.visible = false;
            CommonFuc.imgFilterFloat(this.mPanel.Sprite_VIP,[0.3,0.3,0.3,1]);
        }
    }

    private on128_event(event: egret.Event): void {
        console.log("on128_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");

        GlobalClass.UserInfo.str_UserLevel = strArray[2];
        GlobalClass.UserInfo.str_MyUserExp = strArray[3];
        GlobalClass.UserInfo.str_LastLevelExp = strArray[4];
        GlobalClass.UserInfo.str_NextLevelExp = strArray[5];
        this.ChangeLevelExp();
    }
    private on125_event(event: egret.Event): void {
        console.log("on125_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        var str0 = strArray[2].split(",");
        GlobalClass.UserInfo.str_Hall_SignIn_Group = str0;
    
        var str1 = [];
        var str2 = [];
        var str3 = [];
        for(var i=0;i<str0.length;i++){
            var _str_SignInInfo = str0[i].split("#");
            str1.push(_str_SignInInfo[0]);
            str2.push(_str_SignInInfo[1]);
            str3.push(_str_SignInInfo[2]);
        }

      GlobalClass.UserInfo.str_Hall_SignIn_PrizeType = str1;
      GlobalClass.UserInfo.str_Hall_SignIn_PrizePrices = str2;
      GlobalClass.UserInfo.str_Hall_SignIn_PrizeAmount = str3;
    }
    private on126_event(event: egret.Event): void {
        console.log("on126_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.UserInfo.str_Hall_isSignIn = strArray[2];   //是否已经领取（1表示已领取，0为未领取）
        GlobalClass.UserInfo.str_Hall_SignInDays = strArray[3]; //已连续签到的天数
    }

    private on174_event(event: egret.Event): void {
        console.log("on174_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        // 174%-1%1,1,50000,50000,0,0,0,0,0,18000,20000,1,50000,10000#100000#1000000,0,0,0, 0,2945,0.08,0
        var str1 = strArray[2].split(",");
        GlobalClass.HallClass.str_Hall_IntLevel = str1;
        GlobalClass.HallClass.str_ArenaCount = GlobalClass.HallClass.str_Hall_IntLevel [4];
		GlobalClass.HallClass.str_isOpenSlot = GlobalClass.HallClass.str_Hall_IntLevel [5];
		GlobalClass.HallClass.str_BindingPhone = GlobalClass.HallClass.str_Hall_IntLevel [8];
		GlobalClass.HallClass.str_BindingPrice = GlobalClass.HallClass.str_Hall_IntLevel [9];
		GlobalClass.HallClass.str_UnBindingPrice = GlobalClass.HallClass.str_Hall_IntLevel [10];
		GlobalClass.HallClass.str_UnBindingTips = GlobalClass.HallClass.str_Hall_IntLevel [11];
		GlobalClass.HallClass.str_SuperBetCount = GlobalClass.HallClass.str_Hall_IntLevel [12];
		GlobalClass.HallClass.str_BetCount = GlobalClass.HallClass.str_Hall_IntLevel [13].split ('#');

        GlobalClass.HallClass.isRegByMobile = Number(str1[14]);

        if( str1 [16] == "1") {
            GlobalClass.HallClass.isShowNick = true;
        }else{
            GlobalClass.HallClass.isShowNick = false;
        }

        this.ShowOrHideChangeNickBtn();

        //公会ID，用来判断是否加入公会
        GlobalClass.ClubClass.ClubID = str1[18];
        if(GlobalClass.ClubClass.ClubID == "0") {
        GlobalClass.ClubClass.str_ClubMsgRet = "0";
        }else{
        GlobalClass.ClubClass.str_ClubMsgRet = "1";
        }

        this.Hide_Sprite_Binding();

        if(GlobalClass.HallClass.firstOpenHall) {
            GlobalClass.HallClass.firstOpenHall = false;
            if(GlobalClass.HallClass.str_OpenBindingPhone == "1" && GlobalClass.HallClass.int_OpenBinding == 1) {  //开启手机绑定
                if (GlobalClass.HallClass.str_BindingPhone == "0") { 
                    // this.ShowBindingPanel();     //显示绑定手机面板
                    if (Number(GlobalClass.UserInfo.str_Hall_totalScore)>GlobalClass.LoginClass.BindPhoneRemind){
                        let lastLoginTime = egret.localStorage.getItem("lastLoginTime");
                        if(lastLoginTime==null||lastLoginTime==""){
                            lastLoginTime = "0";
                        }
                        let t = new Date();
                        egret.localStorage.setItem("lastLoginTime",t.toString());
                        var date= new Date(lastLoginTime);
                        if(date.getFullYear()==t.getFullYear()&&date.getMonth()==t.getMonth()&&date.getDate()==t.getDate()){
                            console. log("今天登录过了 ") ;
                        }else{
                             KFControllerMgr.showTips("您的账号存在安全隐患，请尽快绑定手机以保证账号安全",0,2,()=>{
                                 KFControllerMgr.getCtl(PanelName.BindingPhonePanel).show();
                             },null,null,"前往绑定","先不绑定");
                        }
                    }

                }else{ 
                    this.ShowBindingTipPanel();  //显示已经绑定手机了
                }
            }
        }

        if (GlobalClass.HallClass.isOpenSignInPanel && GlobalClass.UserInfo.isNewbie == false && GlobalClass.TaskClass.str_VIPStatus == "1" && GlobalClass.UserInfo.str_Hall_isSignIn == "0") { //打开签到面板
            this.MemberPanelSignInToggle();
        }	
        this.ShowOrHideArenaCount();

        this.setButPos();

        if (GlobalClass.HallClass.str_Hall_IntLevel.length>=21 && GlobalClass.HallClass.str_Hall_IntLevel[20]=="1"){
            KFControllerMgr.showTips("您好，您的VIP已经到期，将错失很多特权，是否立即续费？",99,2,()=>{
                KFControllerMgr.getCtl(PanelName.PropshopPanel).setToggleType(2).show();
            },null,null,"前往续费","先不续费");
                
             
        
        }

    }
    


    private on401_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        let code = jd['code'];
        console.log(""+jd);
        if(code == 401){
            if (jd ["ret"] == "1") {
                GlobalClass.UserInfo.str_Hall_totalScore = jd["info"]["ownP"];
                GlobalClass.DiceGameClass.ownerPoint = GlobalClass.UserInfo.str_Hall_totalScore;
                GlobalClass.DiceGameClass.opponentPoint = GlobalClass.UserInfo.str_Hall_totalScore;
                GlobalClass.DiceGameClass.update_interval = jd["info"]["update_interval"];
                
                KFSceneManager.getInstance().replaceScene(SceneName.DHS);
            }else{//失败则提示失败原因
                let info = jd["info"]["reasonType"];
                if(info == 1009) {
                    KFControllerMgr.showTips("Tips_102");
                }else if(info == 4022) {
                    this.ShowOpenGameTip(401);
                }else{
                    KFControllerMgr.showTips("Tips_0");    
                }
           
                // KFControllerMgr.showTips(jd["info"]["desc"]);
                return;
            }
        }
    }

    private loadParticl(){
		if(!this.particleHaveRead){
			this.paticleCB = (event:RES.ResourceEvent)=>{
			if (event.groupName == "flower") {
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.paticleCB, this);
				this.paticleCB = null;
				this.particleSystem = new particle.GravityParticleSystem(RES.getRes("flower_png"), RES.getRes("flower_json"));
                // this.particleSystem = new particle.GravityParticleSystem(this.getTex(), RES.getRes("flower_json"));
				this.particleHaveRead = true;

                //将例子系统添加到舞台
                this.mPanel.flower.addChild(this.particleSystem);
                this.particleSystem.start();
                this.particleSystem.x = -100;
                this.particleSystem.y = -100;
                this.particleSystem.anchorOffsetX = this.particleSystem.width/2;
                this.particleSystem.anchorOffsetY = this.particleSystem.height/2;
                this.particleSystem.blendMode = egret.BlendMode.ADD;
			}
			};
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.paticleCB , this);

			RES.loadGroup("flower");
		}
	}

    private getTex():egret.Texture{
        let a = Math.floor(Math.random() * 2);
        if(a==0){
            return RES.getRes("fireball_png");
        }else{
            return RES.getRes("flower_png");
        }
    }

    private MemberPanelSignInToggle(){
        KFControllerMgr.getCtl(PanelName.MemberPanel).setToggle(2).show();
    }

    private ShowPhoneVerificationCode(){
        KFControllerMgr.getCtl(PanelName.PhoneVerificationCodePanel).show();
    }

    private ShowBindingPanel(){
         KFControllerMgr.getCtl(PanelName.BindingPhonePanel).show();
    }
    private ShowBindingTipPanel(){
        KFControllerMgr.getCtl(PanelName.BindingTipPanel).show();
    }
    private ShowOrHideArenaCount(){
         if (GlobalClass.HallClass.str_ArenaCount != "0" && GlobalClass.HallClass.str_ArenaCount != "") {
            // Panel_Hall.Go_ArenaCount.transform : FindChild("Label"):GetComponent("UILabel").text = GlobalClass.HallClass.str_ArenaCount;
            // Panel_Hall.Go_ArenaCount : SetActive(true);
        }
        // Panel_Hall.Go_ArenaCount.transform : FindChild("Label"):GetComponent("UILabel").text = "";
    }

    
    private ShowOpenGameTip(msgid){
        if(this.currTip==0){
            this.currTip = msgid;
            KFControllerMgr.showTips("游戏加载中...",2);
            this.invoke(2,this.GameLoad,this);
        }else{
            this.currTip = 0;
            KFControllerMgr.showTips("游戏加载失败，请稍后再试");
        }
    }

    private GameLoad(){
        switch(this.currTip){
            case 100:
                // this.bsfb_btnClick();
                this.getToken();
            break;
            case 201://五星
                this.WXHH_btnClick();
            break;
            case 301://剪刀
                this.JDSTB_btnClick();
            break;
            case 401://大话骰
                this.DHT_btnClick(null);
            break;
        }
    }

    private getToken(){
        var js = {userid: GlobalClass.UserInfo.str_UserID,param:new md5().hex_md5("cEVEgKXd")};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_109,JSON.stringify(js));
    }


    private on160_event(event: egret.Event): void {
         console.log("on160_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        var str0 = strArray[2].split(";");
        var str_VIPID_Group=[];
        var str_VIPName_Group=[];
        var str_VIPPrice=[];
        var str_VIPType=[];
        for(var i=0;i<str0.length;i++){
            if(str0[i]!=""){
                var _str_VIPinfo = str0[i].split(",");
                str_VIPID_Group.push(_str_VIPinfo[0])
                str_VIPName_Group.push(_str_VIPinfo[1])
                str_VIPPrice.push(_str_VIPinfo[2])
                str_VIPType.push(_str_VIPinfo[4])
            }
        }
        GlobalClass.TaskClass.str_VIPInfo_Group = str0;
        GlobalClass.TaskClass.str_VIPID_Group = str_VIPID_Group;
        GlobalClass.TaskClass.str_VIPName_Group = str_VIPName_Group;
        GlobalClass.TaskClass.str_VIPPrice = str_VIPPrice;
        GlobalClass.TaskClass.str_VIPType = str_VIPType;
    }
    private on150_event(event: egret.Event): void {
         console.log("on150_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.GameClass.Str_PropsGroup = strArray[2].split(';');//"道具1ID, 道具1价格，道具1类型,道具1名称,道具1属性值; 道具2ID, 道具2价格，道具2类型,道具2名称,道具2属性值" 
        GlobalClass.GameClass.Str_ScoreGroup = strArray[3].split(';');//"点数1ID, 点数1价格，点数1数值; 点数2ID, 点数2价格，点数2数值" 
        GlobalClass.GameClass.str_PropsPrices = new Array(GlobalClass.GameClass.Str_PropsGroup.length);
        GlobalClass.GameClass.str_PropsVIPPrices = new Array(GlobalClass.GameClass.Str_PropsGroup.length);
        GlobalClass.GameClass.str_PropsType = new Array(GlobalClass.GameClass.Str_PropsGroup.length);
        GlobalClass.GameClass.str_PropsName = new Array(GlobalClass.GameClass.Str_PropsGroup.length);
        GlobalClass.GameClass.str_listData = new Array(GlobalClass.GameClass.Str_PropsGroup.length);

        GlobalClass.GameClass.str_PropsId = new Array(2);         //算出有多少组道具
        GlobalClass.GameClass.str_ScoreId = new Array(GlobalClass.GameClass.Str_ScoreGroup.length);
        GlobalClass.GameClass.str_ScorePrices = new Array(GlobalClass.GameClass.Str_ScoreGroup.length);
        GlobalClass.GameClass.str_ScoreName = new Array(GlobalClass.GameClass.Str_ScoreGroup.length);
        GlobalClass.GameClass.str_ScoreType = new Array(GlobalClass.GameClass.Str_ScoreGroup.length);

        GlobalClass.GameClass.str_listData2 = new Array(GlobalClass.GameClass.Str_ScoreGroup.length);

        //    Debug.Log("Str_PropsGroup_____" + GlobalClass.GameClass.Str_PropsGroup);
        //    Debug.Log(GlobalClass.GameClass.str_PropsId.length);
        for (var i = 0; i < GlobalClass.GameClass.Str_PropsGroup.length; i++){
            var _str_Props = GlobalClass.GameClass.Str_PropsGroup[i].split(',');

            GlobalClass.GameClass.str_PropsPrices[i] = _str_Props[1];       //对应的道具价格
            GlobalClass.GameClass.str_PropsVIPPrices[i] = _str_Props[4];       //对应的道具VIP价格
        }
        for (var j = 0; j < GlobalClass.GameClass.Str_ScoreGroup.length; j++){
            var _str_Props = GlobalClass.GameClass.Str_ScoreGroup[j].split(',');
            GlobalClass.GameClass.str_ScoreId[j] = _str_Props[0];
            GlobalClass.GameClass.str_ScorePrices[j] = _str_Props[1];
        }
    }

    private on151_event(event: egret.Event): void {
         console.log("on151_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if (strArray.length == 2) {
            GlobalClass.GameClass.str_PropsAmount = new Array(2); //初始化道具个数数组，为0个
            GlobalClass.GameClass.str_PropsId = new Array(2);         //算出有多少组道具
			GlobalClass.GameClass.str_PropsAmount [0] = "0";
			GlobalClass.GameClass.str_PropsAmount [1] = "0";
		} else {
			var _Str_PropsGroup1 = strArray [2].split (';');
			GlobalClass.GameClass.str_PropsAmount = new Array(_Str_PropsGroup1.length); //初始化道具个数数组，为0个
			GlobalClass.GameClass.str_PropsId = new Array(_Str_PropsGroup1.length);
			for (var i = 0; i < _Str_PropsGroup1.length; i++) {
				var _str_Props = _Str_PropsGroup1 [i].split (',');
				//将服务器的ID-Amount信息，与ID-price数组，改成相同的位置（同一道具在三个数组里的下标要相同）
				GlobalClass.GameClass.str_PropsId [i] = _str_Props [0];           //道具ID
				GlobalClass.GameClass.str_PropsAmount [i] = _str_Props [1];
			}
		}
    }

    private on1035_event(event: egret.Event): void {
         console.log("on1035_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
         GlobalClass.ClubClass.str_ClubMsgRet = ret+"";
         if(ret == 1) { //已经加入工会
            GlobalClass.ClubClass.MyPosition = jsonData["info"]["position"];             //自己的职位
            GlobalClass.ClubClass.MaxSetTimes = jsonData["info"]["maxSetTimes"];   
            GlobalClass.ClubClass.str_ReceiveTimes = jsonData["info"]["leftTimes"];       //剩余领取救济金次数
            GlobalClass.ClubClass.ClubID = jsonData["info"]["details"]["id"];             //公会ID
            GlobalClass.ClubClass.ClubDole = jsonData["info"]["details"]["pool"];         //公会救济金
            GlobalClass.ClubClass.DolelLimit = jsonData["info"]["details"]["DolelLimit"]; //公会最大救济金
            GlobalClass.ClubClass.MyClubLevel = jsonData["info"]["details"]["level"];     //公会等级
            GlobalClass.ClubClass.int_VerifyType = jsonData["info"]["details"]["VerifyType"];
            GlobalClass.ClubClass.str_Notice = jsonData["info"]["details"]["Notice"];
            GlobalClass.ClubClass.int_applyNum = jsonData["info"]["details"]["applyNum"];

            var clubCtrl = KFControllerMgr.getCtl(PanelName.ClubPanel);
            clubCtrl.setJson_PositionInfo(jsonData["info"]["details"]["positionInfo"]);
             clubCtrl.setJson_PositionDefine (jsonData["info"]["details"]["positionDefine"]);
         }else if(ret == 0 ) {  //还未加入公会
            GlobalClass.ClubClass.CreatClubCost = jsonData["info"]["config"]["cost"];        //创建费用
            GlobalClass.ClubClass.CreatClubLevel = jsonData["info"]["config"]["minLevel"];   //等级要求
        }
    }
    private on1020_event(event: egret.Event): void {
        console.log("on1020_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = '{"action": 3, "info": {"content": "     \u5173\u4e8e\u7981\u6b62\u79c1\u4e0b\u4e70\u5356\u6e38\u620f\u70b9\u6570\u7684\u516c\u544a\n\u4eb2\u7231\u7684\u73a9\u5bb6\uff1a\n\u6839\u636e\u6709\u5173\u6cd5\u5f8b\u89c4\u5b9a\uff0c\u672c\u6e38\u620f\u4e25\u7981\u79c1\u4e0b\u4e70\u5356\u6e38\u620f\u70b9\u6570\u7684\u884c\u4e3a\uff0c\u4e00\u7ecf\u6838\u5b9e\uff0c\u5c06\u5bf9\u4e70\u5356\u53cc\u65b9\u5747\u4e88\u4ee5\u5c01\u53f7\u5904\u7406\u3002\n\u540c\u65f6\uff0c\u5bf9\u4e8e\u6635\u79f0\u6216\u89c6\u9891\u8bc4\u8bba\u533a\u8a00\u8bba\u6709\u6d89\u5acc\u6e38\u620f\u70b9\u6570\u4e70\u5356\u7684\uff0c\u5373\u65e5\u8d77\u4e00\u5e76\u4e88\u4ee5\u5c01\u53f7\u5904\u7406\u3002", "title": "\u7cfb\u7edf\u516c\u544a"}, "code": 1020, "ret": 1}';
        // var datastr = '{"action":4,"info":{"content":"\u60a8\u7d2f\u8ba1\u6e38\u620f\u65f6\u95f4\u5df2\u6ee12\u5c0f\u65f6,\u8bf7\u9002\u5f53\u4f11\u606f!","title":"\u9632\u6c89\u8ff7\u63d0\u793a"},"code":1020,"ret":1}';
        datastr = datastr.replace(/\n/g, "\\n");
       datastr = datastr.replace(/\r/g, "\\r");
        GlobalClass.HallClass.fangChenMiResult = datastr;
        var jsdata = JSON.parse(datastr);
        if (jsdata["ret"] == "1"){
            var action = Number(jsdata["action"]);
            if(action==2){
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.GIVE_UP_EXIT,"");
            }
            if(action==3){
                KFControllerMgr.getCtl(PanelName.SystemTitlePanel).show();
            }else{
                 KFControllerMgr.getCtl(PanelName.AntiAddictionPanel).show();
            }
        }
    }
	
    protected onReady() {
        var js = {userid: GlobalClass.UserInfo.str_UserID};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Mail.NEW_MAIL,JSON.stringify(js));

        //昵称、ID、等级
        this.mPanel.Label_UserID.text = GlobalClass.UserInfo.str_UserID;
        this.mPanel.Label_Nickname.text = GlobalClass.UserInfo.str_UserNickname;
        this.mPanel.Label_PengJi_ID.text = GlobalClass.UserInfo.str_PengJiID;
        this.HallGlobalMsg();
        this.initView();
        this.loadParticl();
    }

    private HallGlobalMsg(){
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.GET_BULLETIN_LIST,"");
    
        //查询玩家VIP信息
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.CHECK_USER_VIP,"");
    
        //查询用户等级信息
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_USERLEVEL,"");
    
        //获取签到配置信息
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.GET_SIGN_CONFIG,"");
        //更新个人签到信息
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.GET_USERSIGN_INFO,"");

        //获取石头剪刀布和五星宏辉的限制等级
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.LEVEL_LIMITS,"");

        //查询VIP信息 160
        var js = {key: GlobalClass.GameInfoForConfig.UniqueSerial};
        WebSocketMgr.getInstance().SendOneceMsg( MsgID.Hall.GET_VIPINFO,JSON.stringify(js));

        //道具商城列表  请求150
        WebSocketMgr.getInstance().SendOneceMsg( MsgID.Hall.REQUEST_MALLPROPS_LIST,JSON.stringify(js));

        //玩家道具列表  请求151
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_PROPS,"");

        //公会消息
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.QuaryClubData,"");

        WebSocketMgr.getInstance().SendOneceMsg(MsgID.Hall.Msg_1020,"");

        //获取token
        WebSocketMgr.getInstance().SendOneceMsg( MsgID.Hall.Msg_2504,JSON.stringify({userid: GlobalClass.UserInfo.str_UserID}));
    }

    private initView(){
        this.mPanel.JDSTB_btn.visible = GlobalClass.SDKType.bShowStone;
        this.mPanel.Btn_Share.visible = GlobalClass.SDKType.bShowShare;
        this.mPanel.Btn_VIPHall.visible = GlobalClass.SDKType.bShowShop;
        this.mPanel.Btn_bank.visible = GlobalClass.SDKType.bShowBank2;

        this.mPanel.Btn_Club.visible = GlobalClass.SDKType.bShowClub;
        this.mPanel.WXHH_btn.visible = GlobalClass.SDKType.bShowFive;
        this.mPanel.Btn_Mall.visible = GlobalClass.SDKType.bShowShop;
        this.mPanel.dice_btn.visible = GlobalClass.SDKType.bShowDice;
        this.mPanel.visible = GlobalClass.LoginClass.IsOpenMoGame;
        // this.mPanel.Btn_ContactService.visible = GlobalClass.SDKType.bShowCustomService;

        // this.setButPos();

        
    }

    private setButPos(){
        var buttons = [this.mPanel.Btn_Setting,
        this.mPanel.Btn_Share,
        this.mPanel.Btn_Mail,
        this.mPanel.Btn_Security,
        this.mPanel.Btn_bank,
        this.mPanel.Btn_Club,
        this.mPanel.Btn_VIPHall,
        this.mPanel.Btn_Mall,]

        let beginX = buttons[0].x;
        let EndX = buttons[buttons.length-1].x;
        let count = 0;
        buttons.forEach(element => {
            if(element.visible){
                count++;
            }
        });
        

        var current = this.mPanel.Btn_Setting.x;
        var delx = (EndX-beginX)/(count-1);
        var delaytime = 0.2;
        for(var i=0;i<buttons.length;i++){
            var element = buttons[i];
            var posy = element.y;
            element.y = posy + 100;
            element.x = current;
            if(element==this.mPanel.Btn_Mail){
                this.mPanel.Image_RedDot.x = current+30;
            }
            if(element==this.mPanel.Btn_Security){
                this.mPanel.Go_Sprite_Binding.x = current+30;
            }
            if(element.visible){
                delaytime+=0.1;
            egret.Tween.get(element).to({x:current,y:posy},delaytime*1300,egret.Ease.sineIn).call(function (){
                },this);
                current +=delx;
            }
        }

        
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

    private on301_event(event: egret.Event): void {
        console.log("on301_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
         if (strArray[2] == "0") {//没有记录
             if(strArray[3]==""){
                KFSceneManager.getInstance().replaceScene(SceneName.STONE);
             }else{
                this.ShowOpenGameTip(301);
                return;
             }
         }else if (strArray[2] == "1" || strArray[2] == "2") {//有记录
            //log("剪刀石已经有记录了");
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1076));
         }                   
    }
	
    private on100_event(event: egret.Event): void {
        console.log("on100_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if(strArray.length>3&&strArray[3]=="othergame"){
            this.ShowOpenGameTip(100);
            return;
        }
        GlobalClass.UserInfo.str_Game_lastTotalScore = strArray[2];
        GlobalClass.UserInfo.str_Game_lastTodayScore = strArray[3];
        GlobalClass.GameClass.int_level = Number(strArray[4]);          
        var strs = strArray[5].split(",");
        GlobalClass.GameClass.f_brickArray = new Array(3);
        GlobalClass.GameClass.f_brickArray[0] = Number(strs[0]);
        GlobalClass.GameClass.f_brickArray[1] = Number(strs[1]);
        GlobalClass.GameClass.f_brickArray[2] = Number(strs[2]);

        GlobalClass.UserInfo.str_Game_lastSlotScore = strArray[6];

        if(strArray.length>=9){
            GlobalClass.UserInfo.useSpeedup=strArray[8];
        }
        
        KFSceneManager.getInstance().replaceScene(SceneName.BSFB);
    }

    private on201_event(event: egret.Event): void {
        console.log("on201_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if (strArray[2] == "0")//进入五星宏辉
        {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1075));
            KFSceneManager.getInstance().replaceScene(SceneName.WXHH);
         } else if (strArray[2] == "1")//进入游戏失败
         {
             KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1074));
         }else if (strArray[2] == "2")//连环夺宝未存档，不可进入
         {
             KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1076));
        }else if (strArray[2] == "3")//五星宏辉正在维护中...\r\n不可以进入...
        {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1077));
        }else if (strArray[2] == "4")
        {
            this.ShowOpenGameTip(201);
        }else//未知错误
        {
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1010));
        }
    }
    
    private on101_event(event: egret.Event): void {
        console.log("on101_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if(strArray.length>3&&strArray[3]=="othergame"){
            this.ShowOpenGameTip(100);
            return;
        }
        if(strArray[2] == "0") {
            GlobalClass.UserInfo.str_Game_lastTotalScore = strArray[4];
            GlobalClass.UserInfo.str_Game_lastTodayScore = strArray[5];
            GlobalClass.GameClass.int_level = Number(strArray[6]);
            var strs1 = strArray[7].split(",");
            GlobalClass.GameClass.f_brickArray = new Array(3);
            GlobalClass.GameClass.f_brickArray[0] = Number(strs1[0]);
            GlobalClass.GameClass.f_brickArray[1] = Number(strs1[1]);
            GlobalClass.GameClass.f_brickArray[2] = Number(strs1[2]);
            GlobalClass.UserInfo.str_Game_lastSlotScore = strArray[8];
            if(strArray.length>=10){
                GlobalClass.UserInfo.useSpeedup=strArray[9];
            }
             KFSceneManager.getInstance().replaceScene(SceneName.BSFB);
        }
        //进度为“龙珠探宝”的情况
        else if(strArray[2] == "1") {
            GlobalClass.SearchClass.str_dragonOption = strArray[3].split(",");
            GlobalClass.UserInfo.str_Search_lastTotalScore = strArray[4];
            GlobalClass.UserInfo.str_Search_lastTodayScore = strArray[5];
            GlobalClass.UserInfo.str_Search_lastSlotScore = strArray[8];
            KFSceneManager.getInstance().replaceScene(SceneName.LZTB);
        }
    }
    
    

     private on90006_event(event: egret.Event): void {
        console.log("on90006_event");
        this.mPanel.Label_UserID.text = GlobalClass.UserInfo.str_UserID;
        this.mPanel.Label_Nickname.text = GlobalClass.UserInfo.str_UserNickname;
        this.mPanel.Label_Point.text  = GlobalClass.UserInfo.str_Hall_totalScore;
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
            KFControllerMgr.getCtl(PanelName.MailPanel).HasNew = jd['info']['hasNew'];
            KFControllerMgr.getCtl(PanelName.MailPanel).validTime = jd['info']['validTime'];
            //操作红点
            this.mPanel.Image_RedDot.visible = jd['info']['hasNew'] == 1;

        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }
    }

    protected setOnClickListener() {
        // this.AddClickEvent(this.mPanel.bsfb_btn,egret.TouchEvent.TOUCH_TAP,this.getToken,this);
        this.AddClickEvent(this.mPanel.bsfb_btn,egret.TouchEvent.TOUCH_TAP,this.bsfb_btnClick,this);
        this.AddClickEvent(this.mPanel.Btn_bank,egret.TouchEvent.TOUCH_TAP, this.onClickBank, this);
        this.AddClickEvent(this.mPanel.WXHH_btn,egret.TouchEvent.TOUCH_TAP,this.WXHH_btnClick,this);
        this.AddClickEvent(this.mPanel.JDSTB_btn,egret.TouchEvent.TOUCH_TAP,this.JDSTB_btnClick,this);
        this.AddClickEvent(this.mPanel.Btn_Setting,egret.TouchEvent.TOUCH_TAP, this.Btn_SettingClick, this);
        this.AddClickEvent(this.mPanel.Btn_Security,egret.TouchEvent.TOUCH_TAP,this.Btn_SecurityClick,this);
        this.AddClickEvent(this.mPanel.Btn_Share,egret.TouchEvent.TOUCH_TAP, this.Btn_ShareClick, this);
        this.AddClickEvent(this.mPanel.Btn_VIPHall,egret.TouchEvent.TOUCH_TAP,this.Btn_VIPHallClick,this);
        this.AddClickEvent(this.mPanel.Btn_Mall,egret.TouchEvent.TOUCH_TAP, this.Btn_MallClick, this);
        this.AddClickEvent(this.mPanel.Btn_Club,egret.TouchEvent.TOUCH_TAP,this.Btn_ClubClick,this);
        this.AddClickEvent(this.mPanel.dice_btn,egret.TouchEvent.TOUCH_TAP,this.DHT_btnClick,this);
        this.AddClickEvent(this.mPanel.Btn_Mail,egret.TouchEvent.TOUCH_TAP,this.Mail_btnClick,this);
        this.AddClickEvent(this.mPanel.Btn_ChangeNick,egret.TouchEvent.TOUCH_TAP,this.Btn_ChangeNickClick,this);
        this.AddClickEvent(this.mPanel.Btn_Exit,egret.TouchEvent.TOUCH_TAP,this.Btn_ExitClick,this);
        this.AddClickEvent(this.mPanel.Btn_Enter,egret.TouchEvent.TOUCH_TAP,this.Btn_EnterClick,this);
        this.AddClickEvent(this.mPanel.Sprite_VIP,egret.TouchEvent.TOUCH_TAP,this.Sprite_VIPClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.bsfb_btn,egret.TouchEvent.TOUCH_TAP,this.bsfb_btnClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_bank,egret.TouchEvent.TOUCH_TAP, this.onClickBank, this);
        this.RemoveClickEvent(this.mPanel.WXHH_btn,egret.TouchEvent.TOUCH_TAP,this.WXHH_btnClick,this);
        this.RemoveClickEvent(this.mPanel.JDSTB_btn,egret.TouchEvent.TOUCH_TAP,this.JDSTB_btnClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Setting,egret.TouchEvent.TOUCH_TAP, this.Btn_SettingClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_Security,egret.TouchEvent.TOUCH_TAP,this.Btn_SecurityClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Share,egret.TouchEvent.TOUCH_TAP, this.Btn_ShareClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_VIPHall,egret.TouchEvent.TOUCH_TAP,this.Btn_VIPHallClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Mall,egret.TouchEvent.TOUCH_TAP, this.Btn_MallClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_Club,egret.TouchEvent.TOUCH_TAP,this.Btn_ClubClick,this);
        this.RemoveClickEvent(this.mPanel.dice_btn,egret.TouchEvent.TOUCH_TAP,this.DHT_btnClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Mail,egret.TouchEvent.TOUCH_TAP,this.Mail_btnClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ChangeNick,egret.TouchEvent.TOUCH_TAP,this.Btn_ChangeNickClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Exit,egret.TouchEvent.TOUCH_TAP,this.Btn_ExitClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Enter,egret.TouchEvent.TOUCH_TAP,this.Btn_EnterClick,this);
        this.RemoveClickEvent(this.mPanel.Sprite_VIP,egret.TouchEvent.TOUCH_TAP,this.Sprite_VIPClick,this);
    }

    private Sprite_VIPClick(){
        KFControllerMgr.getCtl(PanelName.PropshopPanel).setToggleType(2).show();
    }

    private Btn_EnterClick(){
        
    }

    private ShowOrHideChangeNickBtn(){
        this.mPanel.Btn_ChangeNick.visible = GlobalClass.HallClass.isShowNick;
    }

    private Btn_ExitClick(){
        // WebSocketMgr.getInstance().closeSocket();
        // DeviceUtils.CloseGame();
        KFControllerMgr.getCtl(PanelName.ExitPanel).show();
    }

    private Btn_ChangeNickClick(){
        KFControllerMgr.getCtl(PanelName.ChangeNickNamePanel).show();
    }

    private JDSTB_btnClick(){
        // KFSceneManager.getInstance().replaceScene(SceneName.LZTB);

        if(!GlobalClass.HallClass.bCodeProtect_Open || GlobalClass.HallClass.bCodeProtect_HaveChecked) {
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.STONE.BEGIN_STONE,"");
        } else {
            KFControllerMgr.getCtl(PanelName.GameProtectPanel).setCb(
                ()=>{
                    WebSocketMgr.getInstance().SendOneceMsg(MsgID.STONE.BEGIN_STONE,"");
                    KFControllerMgr.showTips("正在加载中…");
                }
            ).show();
        }
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.arena_enter);
        
    }
    private Btn_SettingClick(){
        KFControllerMgr.getCtl(PanelName.HallSettingPanel).show();
    }
    private Btn_SecurityClick(){
        KFControllerMgr.getCtl(PanelName.SecurityPanel).show();
        // KFControllerMgr.getCtl(PanelName.BindingPhonePanel).show();
    }
    private Btn_ShareClick(){
        KFControllerMgr.getCtl(PanelName.SharePanel).show();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.hall_share);
    }
    private Btn_VIPHallClick(){
        KFControllerMgr.getCtl(PanelName.MemberPanel).show();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.vip_award);
    }
    private Btn_MallClick(){
        KFControllerMgr.getCtl(PanelName.PropshopPanel).setToggleType(1).show();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.show_shop,"1","1");
    }
    private Btn_ClubClick(){
          KFControllerMgr.getCtl(PanelName.ClubPanel).show();
          StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.guild_enter);
    }

    private gotoBSFB(){
        var param1 = Number(GlobalClass.UserInfo.str_UserID)*89*2;
        var param2 = 100*97;
        var param = param1+this._tockon+param2+"";
         
        console.log("Panel_Hall_Ctrl.StartBtnOnClick para: "+param);
        var js = {param: new md5().hex_md5(param)};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.BEGIN_BSFB,JSON.stringify(js));
    }
    
    private bsfb_btnClick(){
        console.log("bsfb_btnClick");
        if(!GlobalClass.HallClass.bCodeProtect_Open || GlobalClass.HallClass.bCodeProtect_HaveChecked) {
            // this.gotoBSFB();
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.BEGIN_BSFB,"");
        } else {
            KFControllerMgr.getCtl(PanelName.GameProtectPanel).setCb(
                ()=>{
                    WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.BEGIN_BSFB,"");
                    // this.gotoBSFB();
                    KFControllerMgr.showTips("正在加载中…");
                }
            ).show();
        }
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.lhdb_enter);
    }

    private WXHH_btnClick(){
        if(!GlobalClass.HallClass.bCodeProtect_Open || GlobalClass.HallClass.bCodeProtect_HaveChecked) {
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.BEGIN_WXHH,"");
        } else {
            KFControllerMgr.getCtl(PanelName.GameProtectPanel).setCb(
                ()=>{
                    WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.BEGIN_WXHH,"");
                    KFControllerMgr.showTips("正在加载中…");
                }
            ).show();
        }
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.wxhh_enter);
    }

    


    private onClickBank(){         
        KFControllerMgr.getCtl(PanelName.BankPanel).show();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.bank_enter);
    } 

    private Mail_btnClick(event:egret.TouchEvent){
        egret.log("点击邮件");              
        KFControllerMgr.getCtl(PanelName.MailPanel).show();        
    }

    private DHT_btnClick(event:egret.TouchEvent){
        // egret.log("发送进入大话骰请求，eventPhase：" + event.eventPhase);             
        if(!GlobalClass.HallClass.bCodeProtect_Open || GlobalClass.HallClass.bCodeProtect_HaveChecked) {
            var js = {userid: GlobalClass.UserInfo.str_UserID};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.BEGIN_SEND,JSON.stringify(js));  
        } else {
            KFControllerMgr.getCtl(PanelName.GameProtectPanel).setCb(
                ()=>{
                    var js = {userid: GlobalClass.UserInfo.str_UserID};
                    WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.BEGIN_SEND,JSON.stringify(js));  
                    KFControllerMgr.showTips("正在加载中…");
                }
            ).show();
        }
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.dice_enter);
    }

    public Hide_Sprite_Binding(){
        if (GlobalClass.HallClass.str_BindingPhone != "0" && GlobalClass.HallClass.bIDSecurity_Binding) {  //已经绑定了手机
            this.mPanel.Go_Sprite_Binding.visible = false;
        }else{   //未绑定手机
            this.mPanel.Go_Sprite_Binding.visible = true;
        }
    }

}