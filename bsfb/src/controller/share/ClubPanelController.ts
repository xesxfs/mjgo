/**
 *
 * @author 
 *
 */
class ClubPanelController extends KFController{ 
    private Json_PositionDefine;
    private Json_PositionInfo;
    private positionDefineNum;
    private PositionTableDefine;
    private _clubdataInfoList;
    private bCanSearch = false;
    private isApplayJoin = 0;//直接加入1  申请加入2
    private TotalPages = 0;
    private Remainder = 0;
    private CurrentPage = 0;
    private CountPerPage = 100;
    private isShow = false;
    private power = 0;
    private quaryClubDataInfoList;
    private bIDAscending = false;
    private bInCoinAscending = false;
    private bOutCoinAscending = false;
    private bNickNameAscending = false;
    private bLastOnTimeAscending = false;
    private bPostsAscending = false;
    
    private bApplicatinTimeAscending = false;
    private bApplicatinIDAscending = false;
    private bApplicatinNickAscending = false;
    private isGuideOne = true;

	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.CLUB.CLUBMSG,
            MsgID.CLUB.CREAT_CLUB,
            // MsgID.CLUB.SEARCH_CLUB,
            MsgID.CLUB.JOIN_CLUB,
            MsgID.CLUB.UPGRADE_INFO_CLUB,
            MsgID.CLUB.UPGRADE_SURE_CLUB,
            MsgID.CLUB.CLUBTASKLIST_INOF,
            MsgID.CLUB.SIGNOUT_CLUB,
            MsgID.CLUB.APPLICANTION_CLUB,
            MsgID.CLUB.VERIFYTYPE_CLUB,
            MsgID.CLUB.CONTRIBUTION_DOLE,
            MsgID.CLUB.RECEIVE_DOLE,
            MsgID.CLUB.POSITIONSETTING_CLUB,
            MsgID.CLUB.clubOwnerChange,
            MsgID.CLUB.SIGNOUT_CLUB_MEMBER,
            MsgID.CLUB.MEMBER_APPLY_CLUB,
            MsgID.CLUB.SET_CLUB_BULLETIN,
            MsgID.CLUB.APPLYLIST_CLUB,
            MsgID.USER.UPDATE_MONEY,
            MsgID.CLUB.ActiveClub,
            MsgID.CLUB.ChangeActiveClub,
            MsgID.CLUB.SearchClub,
            MsgID.Client.ShowPostionSettingPanel];
	}
    private on91001_event(event: egret.Event): void {//开启自动使用道具 播放动画
        console.log("on91001_event");
        this.ShowPostionSettingPanel();
    } 

    private getHour(oristr:string){
        var utc:number = new Date().getTime();
        var da = new Date(oristr);
        var days:number = Math.floor((utc-Number(oristr))/3600000/24);
        if (days == 0)
        {
            var min = da.getMinutes()<10?"0"+da.getMinutes():da.getMinutes()+"";
            return da.getHours()+":"+min;
        }
        else if (days > 0 && days <= 30)
        {
            return days + "天前";
        }
        else
        {
            return  "超过30天";
        }
    }
    private resetButtonItem(){
        if(!this.mPanel.Btn_ClubSignOut.visible){
            this.mPanel.Btn_watting.x = this.mPanel.Btn_ClubSignOut.x;
            this.mPanel.Btn_watting0.x = this.mPanel.Btn_ClubSignOut0.x;
        }else{
             this.mPanel.Btn_watting.x = 165;
            this.mPanel.Btn_watting0.x = 165;
        }
    }

    private UpdateMemberInfo(_jsonDataMember:any){
         this.power = this.Json_PositionDefine[GlobalClass.ClubClass.MyPosition][3];
         this._clubdataInfoList = [];
         var count = _jsonDataMember.length;
         for(let i=0;i<count;i++){
            var obj =  new Object();
            obj["id"] = _jsonDataMember[i][0];
            obj["Lb_NickName"] = _jsonDataMember[i][1];
            obj["Lb_Position"] = _jsonDataMember[i][2]+"";
            obj["Lb_Donated"] = _jsonDataMember[i][3];
            obj["Lb_Received"] = _jsonDataMember[i][4];
            obj["index_Position"] = _jsonDataMember[i][6];
            obj["time"] = Date.parse(_jsonDataMember[i][5]);
            obj["Lb_LastOnTime"] = this.getHour(obj["time"]);

            this._clubdataInfoList.push(obj);
         }
  

        if(this.power == 0) {
                this.mPanel.Btn_Upgrade.visible = false;
                this.mPanel.Btn_ClubBulletin.visible = false;
                this.mPanel.Tg_ApplicantionInfo.visible = false;
                this.mPanel.Go_ApplyNum.visible = false;
                this.mPanel.Go_JurisdictionControl.visible = false;
                this.mPanel.Btn_ClubSignOut.visible = true;
                this.mPanel.Btn_ClubSignOut0.visible = true;
                this.mPanel.Btn_ClubDole.visible = true;
                this.mPanel.Btn_ClubTask.visible = true;
        }else if (this.power == 1) {
                if (GlobalClass.ClubClass.MyPosition == "1") {
                    this.mPanel.Btn_ClubSignOut.visible = false;
                    this.mPanel.Btn_ClubSignOut0.visible = false;
                }else{
                    this.mPanel.Btn_ClubSignOut.visible = true;
                }

                this.mPanel.Tg_ApplicantionInfo.visible = true;
                this.mPanel.Go_ApplyNum.visible = true;
                this.mPanel.Btn_Upgrade.visible = true;
                this.mPanel.Go_JurisdictionControl.visible = true;
                this.mPanel.Btn_ClubDole.visible = true;
                if (this.mPanel.Tg_ClubInfo.selected) {
                    this.mPanel.Btn_ClubBulletin.visible = true;
                }
                this.mPanel.Btn_ClubTask.visible = true;
        }else{
                this.mPanel.Btn_Upgrade.visible = false;
                this.mPanel.Btn_ClubBulletin.visible = false;
                this.mPanel.Tg_ApplicantionInfo.visible = false;
                this.mPanel.Go_ApplyNum.visible = false;
                this.mPanel.Go_JurisdictionControl.visible = false;
                this.mPanel.Btn_ClubSignOut.visible = true;
                this.mPanel.Btn_ClubDole.visible = true;
                this.mPanel.Btn_ClubTask.visible = true;
        }

        this.resetButtonItem();
    }
   
    private SearchMember(){
        var index = 0;
        if(""!=this.mPanel.Input_ID_Search.text&& ""==this.mPanel.Input_NickName_Search.text&& this.mPanel.UIP_SearchMemberControl.text == "不限") {
            index = 1;
        }else if(""==this.mPanel.Input_ID_Search.text&& ""!=this.mPanel.Input_NickName_Search.text&& this.mPanel.UIP_SearchMemberControl.text == "不限") {
            index = 2;
        }else if(""==this.mPanel.Input_ID_Search.text&& ""==this.mPanel.Input_NickName_Search.text&& this.mPanel.UIP_SearchMemberControl.text != "不限") {
            index = 3;
        }else if(""!=this.mPanel.Input_ID_Search.text&& ""!=this.mPanel.Input_NickName_Search.text&& this.mPanel.UIP_SearchMemberControl.text == "不限") {
            index = 4;
        }else if(""!=this.mPanel.Input_ID_Search.text&& ""==this.mPanel.Input_NickName_Search.text&& this.mPanel.UIP_SearchMemberControl.text != "不限") {
            index = 5;
        }else if(""==this.mPanel.Input_ID_Search.text&& ""!=this.mPanel.Input_NickName_Search.text&& this.mPanel.UIP_SearchMemberControl.text != "不限") {
            index = 6;
        }else if(""!=this.mPanel.Input_ID_Search.text&& ""!=this.mPanel.Input_NickName_Search.text&& this.mPanel.UIP_SearchMemberControl.text != "不限") {
            index = 7;
        }
        

        this.bIDAscending = true;
        this.bInCoinAscending = true;
        this.bOutCoinAscending = true;
        this.bNickNameAscending = true;
        this.bLastOnTimeAscending = true;
        this.bPostsAscending = false;

        if(this._clubdataInfoList == null) {
            return;
        }

        var orderFun:Function = null;
        var whereFun:Function = null;
        var _this = this;
   if (index == 0) {
    orderFun = function(item) { return item.index_Position; };
   }else if(index == 1) {
      orderFun = function(item) { return item.id; };
      whereFun = function(item){ return CommonFuc.strContains(item.id+"",_this.mPanel.Input_ID_Search.text); }
   }else if(index == 2) {
        orderFun = function(item) { return item.index_Position; };
      whereFun = function(item){ return CommonFuc.strContains(item.Lb_NickName,_this.mPanel.Input_NickName_Search.text);}
   }else if(index == 3) {
       orderFun = function(item) { return item.index_Position; };
      whereFun = function(item){ return _this.Json_PositionDefine[item.Lb_Position][1] == _this.mPanel.UIP_SearchMemberControl.text;}
   }else if(index == 4) {
       orderFun = function(item) { return item.index_Position; };
      whereFun = function(item){ 
          var a = _this.mPanel.Input_NickName_Search.text;
          return CommonFuc.strContains(item.id+"",_this.mPanel.Input_ID_Search.text) && CommonFuc.strContains(item.Lb_NickName,_this.mPanel.Input_NickName_Search.text);
        }
   }else if(index == 5) {
       orderFun = function(item) { return item.index_Position; };
      whereFun = function(item){  return CommonFuc.strContains(item.id+"", _this.mPanel.Input_ID_Search.text) && _this.Json_PositionDefine[item.Lb_Position][1] == _this.mPanel.UIP_SearchMemberControl.text; }
    }else if(index == 6) {
       orderFun = function(item) { return item.index_Position; };
      whereFun = function(item){  return CommonFuc.strContains(item.Lb_NickName,_this.mPanel.Input_NickName_Search.text) && _this.Json_PositionDefine[item.Lb_Position][1] == _this.mPanel.UIP_SearchMemberControl.text; }
    }else if(index == 7) {
       orderFun = function(item) { return item.index_Position; };
      whereFun = function(item){ return CommonFuc.strContains(item.id+"", _this.mPanel.Input_ID_Search.text) && CommonFuc.strContains(item.Lb_NickName,_this.mPanel.Input_NickName_Search.text) &&  _this.Json_PositionDefine[item.Lb_Position][1] == _this.mPanel.UIP_SearchMemberControl.text; }
   }

   if(whereFun!=null){
        this.quaryClubDataInfoList = JSLINQ(this._clubdataInfoList)
                   .Where(whereFun)
                   .OrderBy(orderFun)["items"];
   }else{
       this.quaryClubDataInfoList = JSLINQ(this._clubdataInfoList).OrderBy(orderFun)["items"];
   }
        if (this.quaryClubDataInfoList != null && this.quaryClubDataInfoList.length > 0) {
        this.isShow = true;
        this.InitRoomListData(this.quaryClubDataInfoList,true);
        }else{
            this.isShow = false;
            var dataArr = [];
            var collection = new eui.ArrayCollection();
            collection.source = dataArr;
            this.mPanel.MyClubList.dataProvider = collection;
        }
    }

    
    private InitRoomListData(clubList,bSetCurrentPage){
        var page = Math.floor( clubList.length / this.CountPerPage); 
        var remainder = clubList.length % this.CountPerPage;
   
        if(remainder != 0) {
            page = page + 1;
        }
        this.TotalPages = page;
        this.Remainder = remainder;

        if(bSetCurrentPage) {
            this.CurrentPage = 0;
        } 

        console.log("InitRoomListData: currentPage: " +this.CurrentPage + " totalPages: " +this.TotalPages + " remainder: " + this.Remainder);

        if(clubList.length == 0) {
            this.SetPage(0,1);
        }else{
            this.PacakOnePageData(this.CurrentPage, this.TotalPages, this.Remainder, clubList);
        }
    }

    private SetPage(currentPage,totalPages){
        if(totalPages == 1) {
            this.disableBut(this.mPanel.Btn_PageUp);
            this.disableBut(this.mPanel.Btn_PageDown);
            this.disableBut(this.mPanel.Btn_EndPage);
            this.disableBut(this.mPanel.Btn_FirstPage);
        }else if(totalPages > 1) {
            this.enableBut(this.mPanel.Btn_PageUp);
            this.enableBut(this.mPanel.Btn_PageDown);
            this.enableBut(this.mPanel.Btn_EndPage);
            this.enableBut(this.mPanel.Btn_FirstPage);
        }
        
        if(this.CurrentPage==0){
            this.disableBut(this.mPanel.Btn_PageUp);
        }else if(this.CurrentPage == this.TotalPages-1){
            this.disableBut(this.mPanel.Btn_PageDown);
        }
        this.mPanel.Label_Pages.text = (currentPage+1)+"/"+totalPages;
    }

    private PacakOnePageData(currentPage,totalPages,remainder,clubList){
        // if(! this.isShow) { 
        //     return; 
        // }
        

        this.SetPage(this.CurrentPage,this.TotalPages);
        var beginNum,endNum;
        if(this.CurrentPage < this.TotalPages - 1) {
            beginNum = this.CurrentPage*this.CountPerPage;
            endNum = this.CurrentPage*this.CountPerPage + this.CountPerPage;
        }else{
            if(this.Remainder == 0) {
                beginNum = this.CurrentPage*this.CountPerPage;
                endNum = this.CurrentPage*this.CountPerPage + this.CountPerPage;
            }else{
                beginNum = this.CurrentPage*this.CountPerPage;
                endNum = this.CurrentPage*this.CountPerPage + this.Remainder;
            }
        }
        var dataArr = [];
        for(let i = beginNum;i<endNum;i++){
            var obj = new Object();
            var itemData = clubList[i];
            obj["Lb_ID"] = itemData.id;
            obj["Lb_NickName"] = itemData.Lb_NickName;
            obj["Lb_Position"] = this.Json_PositionDefine[itemData.Lb_Position][1];
            obj["Lb_LastOnTime"] = itemData.Lb_LastOnTime;
            obj["Lb_Index"] = itemData.Lb_Position+"# "+itemData.id;

            obj["Lb_Donated"] = itemData.Lb_Donated;
                obj["Lb_Received"] = itemData.Lb_Received;

            // if(itemData.id==GlobalClass.UserInfo.str_UserID){
            //     obj["Lb_Donated"] = itemData.Lb_Donated;
            //     obj["Lb_Received"] = itemData.Lb_Received;
            // }

            if(this.power==1){
                if(Number(itemData.Lb_Position) > Number(GlobalClass.ClubClass.MyPosition)) {
                    obj["Btn_Modify"] = "1";
                    obj["Lb_Modify"] = "0";
                }else{
                    obj["Btn_Modify"] = "0";
                    obj["Lb_Modify"] = "1";
                }
            }else{
                obj["Btn_Modify"] = "0";
                obj["Lb_Modify"] = "1";
            }
            dataArr.push(obj);
        }
        var collection = new eui.ArrayCollection();
        collection.source = dataArr;
        this.mPanel.MyClubList.dataProvider = collection;
    }

    public SetReceiveValue(value:string){
        this.mPanel.MyClubList.$children.forEach(element => {
            if(element.data.Lb_ID == GlobalClass.UserInfo.str_UserID){
                element.Lb_Received.text = value;
            }
        });
    }

    public SetDonateValue(value:string){
        this.mPanel.MyClubList.$children.forEach(element => {
            if(element.data.Lb_ID == GlobalClass.UserInfo.str_UserID){
                element.Lb_Donated.text = value;
            }
        });
    }

    private getJson_PositionInfo(){
        return this.Json_PositionInfo;
    }
    private setJson_PositionInfo(data){
        this.Json_PositionInfo = data;
    }

     private getJson_PositionDefine(){
        return this.Json_PositionDefine;
    }
    private setJson_PositionDefine(data){
        this.Json_PositionDefine = data;
    }

    private RefreshApplicantionClub(){
        this.mPanel.Go_ClubJoinMsg.visible = true;
        this.mPanel.ClubJoinList.visible = true;

        this.mPanel.Go_ClubListInfo.visible = false;
        this.mPanel.MyClubList.visible = false;
        this.mPanel.ButtonItem.visible = false;
        this.mPanel.Go_ClubJoinAll.visible = true;
        this.mPanel.Go_Bulletin.visible = false;
        this.mPanel.Go_SearchMember.visible = false;
        this.mPanel.Btn_ClubBulletin.visible = false;

        this.CreateJoinApplyClub(this._joinClubdataList);
    }

    private CreateJoinApplyClub(dataList){
        var dataArr = [];
        for(let j=0;j<dataList.length;j++){
            var obj = new Object();
            var dataInfo = dataList[j];
            obj["Lb_ID"] = dataInfo.id;
            obj["Lb_NickName"] = dataInfo.Lb_NickName;
            obj["Lb_LastOnTime"] = dataInfo.Lb_LastOnTime;
            obj["validate"] = dataInfo.validate;
            obj["applyID"] = dataInfo.applyID;
            dataArr.push(obj);
        }
        var collection = new eui.ArrayCollection();
        collection.source = dataArr;
        this.mPanel.ClubJoinList.dataProvider = collection;
    }

    private ShowPostionSettingPanel(){
        this.mPanel.PostionSettingPanel.visible = true;
        var dataArr = [];
        for(let i=0;i<this.positionDefineNum;i++){
            var obj = new Object();
            var index = i+1;
            obj["Lb_Position"] = this.PositionTableDefine[i][1];
            obj["Lb_Num"] = this.Json_PositionInfo[this.PositionTableDefine[i][0]+""][0] + "/" + this.Json_PositionInfo[this.PositionTableDefine[i][0]+""][1];
            var times = this.Json_PositionInfo[index+""][2];
            if(times == "-1"){
                obj["Lb_Times"] = "0";
            }else{
                obj["Lb_Times"] = this.Json_PositionInfo[this.PositionTableDefine[i][0]+""][2]+"";
            }
            obj["Index"] = this.PositionTableDefine[i][0]+"";
            if (GlobalClass.ClubClass.str_PositionSettingID == this.PositionTableDefine[i][0]+""){
                obj["toggle"] = "1";
                GlobalClass.ClubClass.str_PositionID = this.PositionTableDefine[i][0]+"";
            }else{
                obj["toggle"] = "0";
            }
            dataArr.push(obj);
        }
        var collection = new eui.ArrayCollection();
        collection.source = dataArr;
        this.mPanel.MemberList.dataProvider = collection;
    }

    private on1001_event(event: egret.Event): void {
        console.log("on1001_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = '{"info": {"config": {"cost": 200000, "minLevel": 3}}, "code": 1001, "ret": 0}';
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"]
        GlobalClass.ClubClass.str_ClubMsgRet = ret+"";
        if(ret==1){
            this.mPanel.SearchClubPanel.visible = false;

            GlobalClass.ClubClass.MyPosition = jsonData["info"]["position"]+"";             //自己的职位
            GlobalClass.ClubClass.MaxSetTimes = jsonData["info"]["maxSetTimes"]+"";   
            GlobalClass.ClubClass.str_ReceiveTimes = jsonData["info"]["leftTimes"]+"";       //剩余领取救济金次数
            GlobalClass.ClubClass.ClubID = jsonData["info"]["details"]["id"]+"";             //公会ID
            GlobalClass.ClubClass.ClubDole = jsonData["info"]["details"]["pool"]+"";         //公会救济金
            GlobalClass.ClubClass.DolelLimit = jsonData["info"]["details"]["DolelLimit"]+""; //公会最大救济金
            GlobalClass.ClubClass.MyClubLevel = jsonData["info"]["details"]["level"]+"";     //公会等级

            this.mPanel.Lb_MyClubName.text = jsonData["info"]["details"]["name"]+"";          //公会名称
            this.mPanel.Lb_MyClubLevel.text = jsonData["info"]["details"]["level"]+"";        //公会等级 
            this.mPanel.Lb_MyClubID.text = jsonData["info"]["details"]["id"]+"";
            this.mPanel.Lb_MyClubMemberCount.text = jsonData["info"]["details"]["num"] +"/" + jsonData["info"]["details"]["maxnum"];  //当前公会成员

            // this.Json_PositionDefine = jsonData["info"]["details"]["positionDefine"];
            this.setJson_PositionDefine(jsonData["info"]["details"]["positionDefine"]);

            this.setJson_PositionInfo(jsonData["info"]["details"]["positionInfo"]);//存储到该控制器中，以方便别的控制器使用该数据
            // this.Json_PositionInfo = jsonData["info"]["details"]["positionInfo"]; 

            GlobalClass.ClubClass.int_VerifyType = jsonData["info"]["details"]["VerifyType"];
            GlobalClass.ClubClass.str_Notice = jsonData["info"]["details"]["Notice"];
            GlobalClass.ClubClass.int_applyNum = jsonData["info"]["details"]["applyNum"];

            //记录会员信息列表
            var _memberJsonData = jsonData["info"]["members"];
            this.UpdateMemberInfo(_memberJsonData);

            if (GlobalClass.ClubClass.int_applyNum <= 0) {
                this.mPanel.Go_ApplyNum.visible = false;
            }else{
                this.mPanel.Go_ApplyNum.visible = true;
                this.mPanel.Go_ApplyNum.getChildAt(1).text = GlobalClass.ClubClass.int_applyNum + "";
            }

            if( this.mPanel.Tg_ClubInfo.selected) {
            console.log("Tg_ClubInfo");
                this.Tg_ClubInfoClick();
            }else if(this.mPanel.Tg_ClubMember.selected){
            console.log("Tg_ClubMember")
                this.Tg_ClubMemberClick();
            }else if(this.mPanel.Tg_ApplicantionInfo.selected) {
            console.log("Tg_ApplicantionInfo");
                this.Tg_ApplicantionInfoClick();
            }

            //公会公告面板
            if(GlobalClass.ClubClass.str_Notice=="") {
                this.mPanel.Lb_ClubBulletin.text  = "会长很懒，什么都没留下！";
            }else{
                this.mPanel.Lb_ClubBulletin.text = GlobalClass.ClubClass.str_Notice;
            }

            if(GlobalClass.ClubClass.int_VerifyType == 0) {
                this.mPanel.UIP_JurisdictionControl.text = "禁止申请";
            }else if(GlobalClass.ClubClass.int_VerifyType == 1) {
                this.mPanel.UIP_JurisdictionControl.text = "需要审核";
            }else if(GlobalClass.ClubClass.int_VerifyType == 2) {
                this.mPanel.UIP_JurisdictionControl.text = "直接通过";
            }else{
                this.mPanel.UIP_JurisdictionControl.text = "需要审核";
            }

            this.mPanel.ClubInfoPanel.visible = true;
            this.mPanel.ClubChoicePanel.visible = false;

            //公会新手引导
            var power = this.Json_PositionDefine[GlobalClass.ClubClass.MyPosition][3]+"";
            if(egret.localStorage.getItem("isFinishGuide")!= "true"){
                this.playAnimation(this.mPanel.arrowAni,true);
                 this.mPanel.Go_Guide.visible = true;
                 this.mPanel.GuideOne.visible = true;
                 this.mPanel.GuideTwo.visible = false;
                 if(power == "0") {
                    this.mPanel.Lb_GuideTips.text = "点击任意位置结束指引。";
                 }else if (power == "1") {
                    this.mPanel.Lb_GuideTips.text = "点击任意位置继续指引。";
                 }else{
                    this.mPanel.Lb_GuideTips.text = "点击任意位置结束指引。";
                 }
            }

            this.positionDefineNum = jsonData["info"]["positionDefineNum"];

            this.PositionTableDefine = new Array(this.positionDefineNum);
            for (let i = 0;i< this.positionDefineNum;i++){
                this.PositionTableDefine[i] = this.Json_PositionDefine[i+1];
            }
            this.PositionTableDefine.sort(
                function(a,b){
                    return a[4]-b[4];
                }
            );
            var dataArr = [];
            this.PositionTableDefine.forEach(element => {
                dataArr.push(element[1]);
            });
           dataArr.push("不限");
           this.mPanel.UIP_SearchMemberControl.setData(dataArr);
           this.mPanel.UIP_SearchMemberControl.text = "不限";

            if(this._clubdataInfoList != null && this._clubdataInfoList.length > 0) {
                this.SearchMember();
            }
        }else if(ret==0){
             GlobalClass.ClubClass.CreatClubCost = jsonData["info"]["config"]["cost"]+"";        //创建费用
            GlobalClass.ClubClass.CreatClubLevel = jsonData["info"]["config"]["minLevel"]+"";   //等级要求
            this.ShowSearchClubPanel2( GlobalClass.ClubClass.CreatClubCost,GlobalClass.ClubClass.CreatClubLevel);
        }
        else if(ret<0){//无法进入公会
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1122));
        }
    }
    private ShowSearchClubPanel2(cost,level){
        GlobalClass.ClubClass.ClubID = "0"; 
        this.mPanel.Input_ClubID.text = "";
        this.mPanel.Input_ClubName.text = "";
        this.mPanel.GenerateNum_Label.text = cost;
        this.mPanel.SearchClubPanel.visible = true;

        // this.on1032_event(null);
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.ActiveClub,"");
    }
    private on1002_event(event: egret.Event): void {
        console.log("on1002_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        if(ret == 1) {
            this.mPanel.SearchClubPanel.visible = false;
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");
        }else{
            var desc = jsonData["info"]["desc"];
            KFControllerMgr.showTips(desc+"");
        }
    }

    //老协议
    // private on1003_event(event: egret.Event): void {
    //     console.log("on1003_event");
    //     var msg: MessageStruct = <MessageStruct>event.data;
    //     var datastr = msg.getDataStr();
    //      var jsonData = JSON.parse(datastr);
    //     var ret = jsonData["ret"];
    //     if(ret == 1) {
    //         this.mPanel.Lb_ClubName.text = jsonData["info"]["name"] + "(" + jsonData["info"]["num"] + "/" + jsonData["info"]["maxnum"] + ")";
    //         GlobalClass.ClubClass.SearchClubID = jsonData["info"]["id"]+"";
    //     }else if (ret == 0) { //sucess 0：无结果
    //         var desc = jsonData["info"]["desc"];
    //         KFControllerMgr.showTips(desc+"");
    //     }
    // }

    private setJoinType(type){
        this.isApplayJoin = type;
    }

    private on1004_event(event: egret.Event): void {
        console.log("on1004_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];

        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc+"");
        if (ret == 1) {
            this.mPanel.Input_ClubID.text = "";
            // this.mPanel.SearchClubPanel.visible = false;
            this.mPanel.ClubChoicePanel.visible = false;
            if(this.isApplayJoin == 1) {  
                console.log("申请加入 "+this.isApplayJoin);
            }else if(this.isApplayJoin == 2) {
                console.log("直接加入 "+this.isApplayJoin);
                this.mPanel.SearchClubPanel.visible = false;  
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");
            }
        }
    }
    private on1005_event(event: egret.Event): void {
        console.log("on1005_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        this.mPanel.Lb_MyScore.text = GlobalClass.UserInfo.str_Hall_totalScore;
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        if (ret == 1)  { //请求结果(0:，1：)//是否已到最高级

            this.mPanel.ClubUpgradePanel.visible = true;
            this.mPanel.Lb_NextLevel.text = jsonData["info"]["level"]+"";
            this.mPanel.Lb_ClubNum.text = jsonData["info"]["maxnum"]+"";
            this.mPanel.Lb_UpgradeCost.text = jsonData["info"]["cost"]+"";

            var posArr = [];
            for(let i=0;i<this.positionDefineNum;i++){
                var index = this.PositionTableDefine[i][0];
                var obj = new Object();
                obj["Lb_UpgradeName"] = this.Json_PositionDefine[index][1]+"";
                obj["Lb_UpgradeNum"] = jsonData["info"]["position_config"][index][0]+"";
                var positionConfig = jsonData["info"]["position_config"][index][1]+"";
                if(positionConfig == "-1"){
                    obj["Lb_Times"] = "0";
                }else{
                    obj["Lb_Times"] = positionConfig;
                }
                 obj["Lb_EachGetPoint"] = jsonData["info"]["position_config"][index][2]+"";
                 posArr.push(obj);
            }
             var collection = new eui.ArrayCollection();
            collection.source = posArr;
            this.mPanel.upgradeList.dataProvider = collection;

        }else if (ret == 0) {  //请求结果(0:，1：)//是否已到最高级
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1124));
        }
    }
    private on1006_event(event: egret.Event): void {
        console.log("on1006_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = '{"info": {"desc": 5024}, "code": 1006, "ret": 1}';
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc+"");

        if(ret == 1) {
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_MONEY,"");  
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");  
            var js = {guildID: GlobalClass.ClubClass.ClubID};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.UPGRADE_INFO_CLUB,JSON.stringify(js));   
        }else{
            console.log("升级失败");
        }
    }
    private on1007_event(event: egret.Event): void {
        console.log("on1007_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
    }
    private on1008_event(event: egret.Event): void {
        console.log("on1008_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
         var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc+"");
         if(ret == 1){
            this.mPanel.ClubInfoPanel.visible = false;
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");
            GlobalClass.ClubClass.ClubID = "0";
        }
    }

    private _joinClubdataList;
    private on1009_event(event: egret.Event): void {
        console.log("on1009_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = '{"info": {"apply": []}, "code": 1009, "ret": 1}';
        // var datastr = '{"info": {"apply": [[909469, "\u5b64\u72ec\u7684\u5f97\u6839\u53f7\u4e09", 1490247906.769, 0, 5452], [909444, "\u5c0f\u5c0f\u5973\u6c49\u5b50", 1487313721.725, 0, 2789787], [909441, "f11g31g31g", 1487312685.097, 0, 4922765], [909339, "WX4898532764", 1486367206.847, 0, 4922371], [908074, "\u8861\u8651\u9955\u992e", 1486332771.425, 0, 4921293], [907916, "WX7700743019", 1486327432.519, 0, 4857070], [907329, "\u7c97\u5927\u7684\u5927\u53d4", 1486315051.05, 0, 4914157], [907201, "\u628a\u628a\u5173\u8fc7", 1486312802.519, 0, 4872074], [905126, "bbdjd", 1486273205.206, 0, 4709025], [904503, "WX2529189983", 1486252348.644, 0, 4909207], [903634, "\u51dd\u604b\u5c0f\u4e8c", 1486228883.972, 0, 4909091], [899928, "collection", 1486146034.847, 0, 2488174], [899800, "\u91ca\u60001a", 1486143525.581, 0, 4902009], [899498, "\u9ec4\u91d1\u51b3\u6740", 1486138523.55, 0, 4720226], [898355, "\u677e\u624b\u65ad\u7bad", 1486118731.222, 0, 4743936], [898329, "\u6c5f\u6e56\u56db", 1486118163.613, 0, 4699553], [896766, "WX7775987142", 1486072397.472, 0, 4889378], [895059, "WX8682434188", 1486039147.816, 0, 4522932], [893132, "iliiiioii", 1485986964.738, 0, 4894025], [891352, "WX0451767910", 1485951026.066, 0, 4596410], [888074, "\u8bed\u67f3\u5c0f\u5c41\u5b69", 1485874829.409, 0, 4747057], [885730, "\u731c\u5fcc\u521d\u9047", 1485819902.409, 0, 2862326], [885117, "\u6881\u5c0f\u5f3a", 1485802152.066, 0, 3694802], [881839, "\u592a\u50471a", 1485724362.347, 0, 4876869], [879761, "\u6211\u59d3\u5218\u786e\u7559\u4e0d\u4f4f\u4f60\u7684\u5fc3", 1485689302.05, 0, 1885298], [877586, "\u522b\u6b3a\u8d1f\u54e51", 1485632145.628, 0, 2416993], [874754, "\u8f93\u7684\u6ca1\u6bdb", 1485579245.253, 0, 4866315], [874673, "WX6921601040", 1485577545.972, 0, 4774591], [874666, "\u591a\u5c11\u8ddd\u79bb\u611f", 1485577166.691, 0, 3908987], [872406, "\u592a\u5e73\u6d0b43", 1485529429.706, 0, 4803290], [871669, "Windson168", 1485517660.472, 0, 1746036], [870088, "WX3868510557", 1485474461.144, 0, 4744979], [869975, "\u6d12\u8131\u7ec8\u4e0d\u6094", 1485470397.441, 0, 4863348], [868649, "\u77f3\u5934\u5c71", 1485445912.003, 0, 1031971], [866081, "\u6e38\u5ba2162494", 1485387780.488, 0, 4725516], [866075, "WX6878333592", 1485387660.909, 0, 4806540], [863463, "\u5355\u604b\u8131\u8f68", 1485335480.878, 0, 4031382], [862838, "\u661f\u8bed\u5c0f\u597d", 1485321715.472, 0, 4853515], [860303, "\u8017\u7535\u7684\u6765\u4e86", 1485267496.144, 0, 4849811], [858500, "ghj8521", 1485233629.441, 0, 4734167], [856819, "WX9104313844", 1485192342.753, 0, 4776404], [855947, "\u4ebf\u5143\u5927\u793c\u5305", 1485176699.019, 0, 4843396], [854138, "\u5306\u5306\u8513\u8513\u61c2", 1485128801.128, 0, 3323627], [853394, "\u5fae\u7b11\uff20\u7eaf\u5c5e\u793c\u8c8c1", 1485109497.784, 0, 1451419], [848086, "\u660e\u786e\u574f\u574f", 1484988731.066, 0, 3540314], [847408, "WX1168515645", 1484969729.722, 0, 4799786], [846825, "WX4086434817", 1484948782.738, 0, 4823167], [845248, "\u65e0\u654c\u8001\u9f20", 1484916637.472, 0, 4728036]]}, "code": 1009, "ret": 1}';
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        var desc = jsonData["info"]["desc"];
     if(ret == 0) {
         KFControllerMgr.showTips(desc+"");
     }else if (ret == 1) {
         this.mPanel.Go_ClubJoinMsg.visible = true;
         this.mPanel.ClubJoinList.visible = true;
         this.mPanel.Go_ClubListInfo.visible = false;
         this.mPanel.MyClubList.visible = false;
         this.mPanel.ButtonItem.visible = false;
         this.mPanel.Go_ClubJoinAll.visible = true;
         this.mPanel.Go_Bulletin.visible = false;
         this.mPanel.Go_SearchMember.visible = false;
         this.mPanel.Btn_ClubBulletin.visible = false;
         this.mPanel.Btn_OpenSearchMember.visible = false;
         this._joinClubdataList = [];
        //   _joinClubdataDic = {};

         var array = jsonData["info"]["apply"];
        for(let i=0;i<array.length;i++){
           var applyId = jsonData["info"]["apply"][i][0];
           var nickName = jsonData["info"]["apply"][i][1];
           var validate = jsonData["info"]["apply"][i][3];
           var id = jsonData["info"]["apply"][i][4];
           var time = jsonData["info"]["apply"][i][2];

           var dataInfo = {};
           dataInfo["id"] = id;
           dataInfo["Lb_NickName"] = nickName;
           dataInfo["applyID"] = applyId+"";
           dataInfo["validate"] = validate;
           dataInfo["Lb_LastOnTime"] =  CommonFuc.getDate(time+"");

           this._joinClubdataList.push(dataInfo);
        } 
        this._joinClubdataList.sort(function(a,b){
                    return a.id - b.id;
        });
        
         this.CreateJoinApplyClub(this._joinClubdataList);
        
     }
    }
   
    private on1010_event(event: egret.Event): void {
        console.log("on1010_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
         if(ret == 1) {
             KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1125));
         }
    }
    private on1013_event(event: egret.Event): void {
        console.log("on1013_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc);
        if(ret == 1){
            if(this.bCanSearch){
                this.ClearSearchData();
            }
            this.setJson_PositionInfo(jsonData["info"]["positionInfo"]);
            this.ShowPostionSettingPanel();
            GlobalClass.ClubClass.str_PositionOriginID = GlobalClass.ClubClass.str_PositionSettingID;
            this.invoke(0.1,()=>{
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");
            },this);
        }
    }
    private ClearSearchData(){
        this.bCanSearch = false;
        this.mPanel.Input_ID_Search.text = "";
        this.mPanel.Input_NickName_Search.text = "";
        this.mPanel.UIP_SearchMemberControl.text = "不限";
    }
    private on1012_event(event: egret.Event): void {
        console.log("on1012_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
    }
    private on1011_event(event: egret.Event): void {
        console.log("on1011_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
    }
    private on1014_event(event: egret.Event): void {
        console.log("on1014_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc);
        if(ret == 1) {
            this.mPanel.PostionSettingPanel.visible = false;
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");
            GlobalClass.ClubClass.ClubID = "0";
        }
    }
    private on1015_event(event: egret.Event): void {
        console.log("on1015_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc);
        var js = {guildID: GlobalClass.ClubClass.ClubID};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.APPLICANTION_CLUB,JSON.stringify(js));
    }
    private on1016_event(event: egret.Event): void {
        console.log("on1016_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
         if(ret == 1){
            GlobalClass.ClubClass.str_Notice =  jsonData["info"]["notice"];
            this.mPanel.Input_ClubBulletin.text = GlobalClass.ClubClass.str_Notice;
            this.mPanel.Lb_ClubBulletin.text =  GlobalClass.ClubClass.str_Notice;
            this.mPanel.ClubBulletinPanel.visible = false;
         }else{
            var desc = jsonData["info"]["desc"];
            KFControllerMgr.showTips(desc);
         }
    }
    private on1018_event(event: egret.Event): void {
        console.log("on1018_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc);
        if(ret==1){
            var js = {guildID: GlobalClass.ClubClass.ClubID};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.APPLICANTION_CLUB,JSON.stringify(js));
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");
        }

    }
    private on1031_event(event: egret.Event): void {
        console.log("on1031_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var desc = jsonData["info"]["desc"];
        KFControllerMgr.showTips(desc);
        var ret = jsonData["ret"];
         if(ret == 1) {
            this.setJson_PositionInfo(jsonData["info"]["positionInfo"]);
            // this.Json_PositionInfo = jsonData["info"]["positionInfo"];
            this.ShowPostionSettingPanel();
             WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");
         }
    }
    private on1032_event(event: egret.Event): void {
        console.log("on1032_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();

        // var datastr = '{"info": [{"Notice": "\u674e\u998b\u998b\u998b\u998b\uff01", "num": 198, "maxnum": 260, "name": "whsb", "level": 7, "owner": "\u6d41\u82cf\u5b63\u8282", "ActiveValue": 4, "id": 2001, "VerifyType": 1}, {"Notice": "**\u52a0\u5165\u98de\u864e\u7f51\u7edc\n\u6e38\u620f\u4ea4\u6d41\u5a01\u6b23  FHWL58  \u795d\u5927\u5bb6\u6e38\u620f\u6109\u5feb", "num": 478, "maxnum": 500, "name": "\u98de\u864e\u7f51\u7edc", "level": 10, "owner": "\u98de\u864e\u7f51\u7edc", "ActiveValue": 1, "id": 2447, "VerifyType": 2}, {"Notice": "", "num": 1, "maxnum": 50, "name": "dswe32dew", "level": 2, "owner": "mdq1111", "ActiveValue": 1, "id": 3957, "VerifyType": 1}], "code": 1032, "ret": 1}';
        // datastr = datastr.replace("\n", "\\n");
        datastr = datastr.replace(/\n/g, "\\n");
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
         if(ret == 1) {
            var infos = jsonData["info"];
            this.ClubDataHandler(infos);
         }else{
             var desc = jsonData["info"]["desc"];
             KFControllerMgr.showTips(desc);
         }
    }
    private on1033_event(event: egret.Event): void {
        console.log("on1033_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
         if(ret == 1) {
            var infos = jsonData["info"];
            this.ClubDataHandler(infos);
         }else{
             var desc = jsonData["info"]["desc"];
             KFControllerMgr.showTips(desc);
         }
    }
    private on1034_event(event: egret.Event): void {
        console.log("on1034_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        var ret = jsonData["ret"];
         if(ret == 1) {
            var infos = jsonData["info"];
            this.ClubDataHandler(infos);
         }else{
             var desc = jsonData["info"]["desc"];
             KFControllerMgr.showTips(desc);
         }
    }
    private ClubDataHandler(data:any){
        var dataArr = [];
        for(let i=0;i<data.length;i++){
            var obj = new Object();
            obj["id"] = data[i]["id"]+"";
            obj["name"] =data[i]["name"]+"";
            obj["level"] = data[i]["level"]+"";
            obj["num"] = data[i]["num"]+"";
            obj["maxnum"] = data[i]["maxnum"]+"";
            obj["VerifyType"] = data[i]["VerifyType"]+"";
            obj["notice"] = data[i]["Notice"]+"";
            if(obj["notice"]=="") {
                obj["notice"] = LocalizationMgr.getText(TipTexts.A1128);
            } 
            var owner = data[i]["owner"]+"";
            dataArr.push(obj);
        }
        var collection = new eui.ArrayCollection();
        collection.source = dataArr;
        this.mPanel.ClubList.dataProvider = collection;
    }
    private on113_event(event: egret.Event): void {
        console.log("on113_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        this.mPanel.Lb_MyScore.text = strArray[3];
    }
    protected onReady() {
    }

    protected onShow(){//在界面上显示出来
        

        this.mPanel.ClubChoicePanel.visible = false;
        this.mPanel.SearchClubPanel.visible = false;
        this.mPanel.ClubInfoPanel.visible = false;
        this.mPanel.ClubUpgradePanel.visible = false;
        this.mPanel.PostionSettingPanel.visible = false;
        this.mPanel.ClubBulletinPanel.visible = false;
        this.mPanel.ClubHelpPanel.visible = false;
        this.mPanel.Go_Guide.visible = false;

        this.disableBut(this.mPanel.Btn_watting);
        
        this.mPanel.UIP_JurisdictionControl.setData(["直接通过","需要审核","禁止申请"]);

        this.mPanel.Input_ID_Search.addEventListener(egret.Event.CHANGE,this.OnSearchChange,this);
        this.mPanel.Input_NickName_Search.addEventListener(egret.Event.CHANGE,this.OnSearchChange,this);
        this.mPanel.UIP_SearchMemberControl.addChangeEvent(this.OnSearchChange,this);
        this.mPanel.UIP_JurisdictionControl.addChangeEvent(this.ChangeVerifyType,this);

        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CLUBMSG,"");



    }

    private OnSearchChange(){
        if(this.bCanSearch){
            this.SearchMember();
        }
    }
    private ChangeVerifyType(){
        if(this.mPanel.UIP_JurisdictionControl.text == "直接通过") {
            GlobalClass.ClubClass.int_VerifyTypeBackup = 2;
        }else if(this.mPanel.UIP_JurisdictionControl.text == "禁止申请") {
            GlobalClass.ClubClass.int_VerifyTypeBackup = 0;
        }else if(this.mPanel.UIP_JurisdictionControl.text == "需要审核") {
            GlobalClass.ClubClass.int_VerifyTypeBackup = 1;
        }else{
            GlobalClass.ClubClass.int_VerifyTypeBackup = 1;
        }
        var js = {guildID: GlobalClass.ClubClass.ClubID,verifyType:GlobalClass.ClubClass.int_VerifyTypeBackup+""};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.VERIFYTYPE_CLUB,JSON.stringify(js));
    }

    private Btn_CloseSearchClub3Click(){
        // this.mPanel.SearchClubPanel.visible = false;
        this.Btn_CloseClubInfoClick();
    }
    private Btn_Search2Click(){
        if(this.mPanel.Input_ClubID.text==""){
            KFControllerMgr.showTips("搜索内容不能为空.");
            return;
        }
        var js = {guildkey: this.mPanel.Input_ClubID.text};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.SearchClub,JSON.stringify(js));
    }
    private Btn_ChangeClubPanelClick(){
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.ChangeActiveClub,"");
    }
    private Btn_GenerateClubClick(){
        var clubName = this.mPanel.Input_ClubName.text;
        if(clubName==""){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1129));
            return;
        }
        if(CommonFuc.isAllint(clubName) ==true){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1130));
            return;
        }
        var js = {guildName: clubName};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.CREAT_CLUB,JSON.stringify(js));
    }
    private Btn_CloseClubBulletinClick(){
        this.mPanel.ClubBulletinPanel.visible = false;
    }
    private Btn_UpdateClubBulletinClick(){
        var js = {guildID: GlobalClass.ClubClass.ClubID,notice: this.mPanel.Input_ClubBulletin.text};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.SET_CLUB_BULLETIN,JSON.stringify(js));
    }
    private Btn_ClearClubBulletinClick(){
        this.mPanel.Input_ClubBulletin.text = "";
    }
    private Btn_UpgradeClubClick(){
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1131),0,2,()=>{
            var js = {guildID: GlobalClass.ClubClass.ClubID};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.UPGRADE_SURE_CLUB,JSON.stringify(js));
        });
    }
    private Btn_CloseClubUpgradeClick(){
        this.mPanel.ClubUpgradePanel.visible = false;
    }
    private Btn_CloseClubInfoClick(){
        this.mPanel.Tg_ClubInfo.selected = true;
        this.mPanel.Tg_JoinAll.selected = false;
        this.mPanel.Tg_ClubMember.selected = false;
        this.mPanel.hide();
        this.Btn_CloseMemberSearchClick();
    }

    private Tg_ClubInfoClick(){
        this.mPanel.ButtonItem.visible = true;
        this.mPanel.Go_ClubListInfo.visible = false;
        this.mPanel.ClubJoinList.visible = false;
        this.mPanel.MyClubList.visible = false;
        this.mPanel.Go_ClubJoinMsg.visible = false;
        this.mPanel.Go_ClubJoinAll.visible = false;
        this.mPanel.Go_Bulletin.visible = true;
        this.mPanel.Go_SearchMember.visible = false;
        this.mPanel.Btn_OpenSearchMember.visible = false;

        if (this.Json_PositionDefine[GlobalClass.ClubClass.MyPosition][2] == 1) {
            this.mPanel.Btn_ClubBulletin.visible = true;
        }
            
        this.mPanel.Page.visible = false;

        this.mPanel.Tg_ClubInfo.seleted = true;
        this.mPanel.Tg_ClubMember.seleted = false;
        this.mPanel.Tg_ApplicantionInfo.seleted = false;
    }
    private Tg_ClubMemberClick(){
        if(this.bCanSearch) {
            this.Btn_CloseMemberSearchClick();
        }

        this.mPanel.ButtonItem.visible = false;
        this.mPanel.Go_ClubListInfo.visible = true;
        this.mPanel.MyClubList.visible = true;
        this.mPanel.ClubJoinList.visible = false;
        this.mPanel.Go_ClubJoinMsg.visible = false;
        this.mPanel.Go_ClubJoinAll.visible = false;
        this.mPanel.Go_Bulletin.visible = false;
        this.mPanel.Btn_OpenSearchMember.visible = true;
        this.mPanel.Go_SearchMember.visible = false;
        this.mPanel.Btn_ClubBulletin.visible = false;
        this.mPanel.Tg_JoinAll.selected = false;
        this.mPanel.Input_ID_Search.text = null;
        this.mPanel.Input_NickName_Search.text = null;
        this.mPanel.UIP_SearchMemberControl.text = "不限";
        this.mPanel.Page.visible = true;

        this.mPanel.Tg_ClubInfo.seleted = false;
        this.mPanel.Tg_ClubMember.seleted = true;
        this.mPanel.Tg_ApplicantionInfo.seleted = false;
    }
    private Tg_ApplicantionInfoClick(){
        var js = {guildID: GlobalClass.ClubClass.ClubID};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.APPLICANTION_CLUB,JSON.stringify(js));
        // this.on1009_event(null);
        if (this.mPanel.Go_ApplyNum.visible == true) {
            this.mPanel.Go_ApplyNum.visible = false;
        }
        this.mPanel.Page.visible = false;


        this.mPanel.Tg_ClubInfo.seleted = false;
        this.mPanel.Tg_ClubMember.seleted = false;
        this.mPanel.Tg_ApplicantionInfo.seleted = true;
    }
    private Btn_ClubDoleClick(){
        KFControllerMgr.getCtl(PanelName.ClubDolePanel).show();
    }
    private Btn_ClubTaskClick(){
         KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1133),0,1,()=>{
                    },LocalizationMgr.getText(TipTexts.A1132));
    }
    private Btn_ClubSignOutClick(){
        KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1135),0,2,()=>{//确定退出公会
                        var js = {guildID: GlobalClass.ClubClass.ClubID};
                        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.SIGNOUT_CLUB,JSON.stringify(js));
                    },LocalizationMgr.getText(TipTexts.A1134));
    }
    private Btn_wattingClick(){}

    private Btn_ClubBulletinClick(){
        this.mPanel.ClubBulletinPanel.visible = true;
        this.mPanel.Input_ClubBulletin.text = GlobalClass.ClubClass.str_Notice;
        var Power = this.Json_PositionDefine[GlobalClass.ClubClass.MyPosition][2];
        if (Power == 1) {
            // this.mPanel.Input_ClubBulletin:GetComponent("BoxCollider").enabled = true;
            // this.mPanel.Btn_UpdateClubBulletin.visible = true;
        }else{
            // this.mPanel.Input_ClubBulletin:GetComponent("BoxCollider").enabled = false;
            // this.mPanel.Btn_UpdateClubBulletin.visible = false;
        }
    }
    private Btn_ClubHelpClick(){
        this.mPanel.ClubHelpPanel.visible = true;
    }
    private Btn_UpgradeClick(){
        var js = {guildID: GlobalClass.ClubClass.ClubID};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.UPGRADE_INFO_CLUB,JSON.stringify(js));
    }
    private Btn_EndPageClick(){
        if (this.CurrentPage != this.TotalPages - 1) {
         this.CurrentPage = this.TotalPages - 1;
         this.PacakOnePageData(this.CurrentPage, this.TotalPages, this.Remainder, this.quaryClubDataInfoList);
        }
    }
    private Btn_FirstPageClick(){
        if (this.CurrentPage != 0) {
            this.CurrentPage = 0;
            this.PacakOnePageData(this.CurrentPage, this.TotalPages, this.Remainder, this.quaryClubDataInfoList);
        }
    }
    private Btn_PageUpClick(){
        if (this.CurrentPage == 0) { 
            return; 
        }
        this.CurrentPage = this.CurrentPage-1;
        this.PacakOnePageData(this.CurrentPage, this.TotalPages, this.Remainder, this.quaryClubDataInfoList);
    }
    private Btn_PageDownClick(){
        if (this.CurrentPage == (this.TotalPages - 1)) {
                return;
        }

        this.CurrentPage = this.CurrentPage + 1;
        this.PacakOnePageData(this.CurrentPage, this.TotalPages, this.Remainder, this.quaryClubDataInfoList);
    }
    private Btn_ClearSearchMemberClick(){
        this.bCanSearch = false;
        this.mPanel.Input_ID_Search.text = "";
        this.mPanel.Input_NickName_Search.text = "";
        this.mPanel.UIP_SearchMemberControl.text = "不限";
        this.bCanSearch = true;
        this.SearchMember();
    }
    private Btn_CloseMemberSearchClick(){
        this.Btn_ClearSearchMemberClick();
        this.mPanel.Go_SearchMember.visible = false;
        
        this.bCanSearch = false;
    }
    private Btn_SearchMemberClick(){}
    
    private Btn_MemberIDClick(){
        if(this.quaryClubDataInfoList == null || this.quaryClubDataInfoList.length < 1) {
            return;
        }
        
        // --升序
        if(this.bIDAscending) {
            this.quaryClubDataInfoList.sort(
                function(a,b){
                    return a.id - b.id;
                }
            );
            this.bIDAscending = false;
        }else{
            this.quaryClubDataInfoList.sort(
                function(a,b){
                    return b.id - a.id;
                }
            );
            this.bIDAscending = true;
        }
        this.isShow = true;
        this.InitRoomListData(this.quaryClubDataInfoList,false);
    }
    private Btn_MemberNickNameClick(){
         if(this.quaryClubDataInfoList == null || this.quaryClubDataInfoList.length < 1) {
            return;
        }

        if(this.bNickNameAscending) {
            this.quaryClubDataInfoList.sort(
                function(a,b){
                    return a.Lb_NickName.localeCompare(b.Lb_NickName);
                }
            );
            this.bNickNameAscending = false;
        }else{
            this.quaryClubDataInfoList.sort(
                function(a,b){
                    return -(a.Lb_NickName.localeCompare(b.Lb_NickName));
                }
            );
            this.bNickNameAscending = true;
        }
        this.isShow = true;
        this.InitRoomListData(this.quaryClubDataInfoList,false);
    }
    private Btn_PostsClick(){
        if(this.quaryClubDataInfoList == null || this.quaryClubDataInfoList.length < 1) {
            return;
        }

        if(this.bPostsAscending) {
            this.quaryClubDataInfoList.sort(
                function(a,b){
                    return a.index_Position - b.index_Position;
                }
            );
            this.bPostsAscending = false;
        }else{
            this.quaryClubDataInfoList.sort(
                function(a,b){
                    return b.index_Position - a.index_Position;
                }
            );
            this.bPostsAscending = true;
        }
        this.isShow = true;
        this.InitRoomListData(this.quaryClubDataInfoList,false);
    }
    private Btn_InCoinClick(){
         if(this.quaryClubDataInfoList == null || this.quaryClubDataInfoList.length < 1) {
            return;
        }


        if(this.bInCoinAscending) {
             this.quaryClubDataInfoList.sort(
                function(a,b){
                    return a.Lb_Donated - b.Lb_Donated;
                }
            );
            this.bInCoinAscending = false;
        }else{
            this.quaryClubDataInfoList.sort(
                function(a,b){
                    return b.Lb_Donated - a.Lb_Donated;
                }
            );
            this.bInCoinAscending = true;
        }
        this.isShow = true;
        this.InitRoomListData(this.quaryClubDataInfoList,false);
    }
    private Btn_OutCoinClick(){
        if(this.quaryClubDataInfoList == null || this.quaryClubDataInfoList.length < 1) {
            return;
        }
        if(this.bOutCoinAscending) {
             this.quaryClubDataInfoList.sort(
                function(a,b){
                    return a.Lb_Received - b.Lb_Received;
                }
            );
            this.bOutCoinAscending = false;
        }else{
            this.quaryClubDataInfoList.sort(
                function(a,b){
                    return b.Lb_Received - a.Lb_Received;
                }
            );
            this.bOutCoinAscending = true;
        }
        this.isShow = true;
        this.InitRoomListData(this.quaryClubDataInfoList,false);
    }
    private Btn_LastOnTimeClick(){
        if(this.quaryClubDataInfoList == null || this.quaryClubDataInfoList.length < 1) {
            return;
        }
        if(this.bLastOnTimeAscending) {
             this.quaryClubDataInfoList.sort(
                function(a,b){
                    return a.time - b.time;
                }
            );
            this.bLastOnTimeAscending = false;
        }else{
            this.quaryClubDataInfoList.sort(
                function(a,b){
                    return b.time - a.time;
                }
            );
            this.bLastOnTimeAscending = true;
        }
        this.isShow = true;
        this.InitRoomListData(this.quaryClubDataInfoList,false);
    }
    private Btn_MemberSettingClick(){}
    private Btn_ApplicantIDClick(){
         if(this._joinClubdataList == null || this._joinClubdataList.length < 1) {
            return;
        }
        if(this.bApplicatinIDAscending) {
             this._joinClubdataList.sort(
                function(a,b){
                    return a.id - b.id;
                }
            );
            this.bApplicatinIDAscending = false;
        }else{
            this._joinClubdataList.sort(
                function(a,b){
                    return b.id - a.id;
                }
            );
            this.bApplicatinIDAscending = true;
        }
        this.RefreshApplicantionClub();
    }
    private Btn_ApplicantNickNameClick(){
         if(this._joinClubdataList == null || this._joinClubdataList.length < 1) {
            return;
        }
        if(this.bApplicatinNickAscending) {
             this._joinClubdataList.sort(
                function(a,b){
                    return a.Lb_LastOnTime - b.Lb_LastOnTime;
                }
            );
            this.bApplicatinNickAscending = false;
        }else{
            this._joinClubdataList.sort(
                function(a,b){
                    return b.Lb_LastOnTime - a.Lb_LastOnTime;
                }
            );
            this.bApplicatinNickAscending = true;
        }
        this.RefreshApplicantionClub();
    }
    private Btn_ApplicationDateClick(){
        if(this._joinClubdataList == null || this._joinClubdataList.length < 1) {
            return;
        }
        if(this.bApplicatinTimeAscending) {
             this._joinClubdataList.sort(
                function(a,b){
                    return a.Lb_LastOnTime - b.Lb_LastOnTime;
                }
            );
            this.bApplicatinTimeAscending = false;
        }else{
            this._joinClubdataList.sort(
                function(a,b){
                    return b.Lb_LastOnTime - a.Lb_LastOnTime;
                }
            );
            this.bApplicatinTimeAscending = true;
        }
        this.RefreshApplicantionClub();
    }

    private SendApplyListMsg(isAgree){
        var str_ApplyList = [];
        this.mPanel.ClubJoinList.$children.forEach(element => {
            if(element.Tg_Join.selected){
                str_ApplyList.push(element.data.applyID);
            }
        });
               
        if(str_ApplyList.length>0) {
            var js = {guildID: GlobalClass.ClubClass.ClubID,applyList: JSON.stringify(str_ApplyList),isAgree: isAgree};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.APPLYLIST_CLUB,JSON.stringify(js)); 
        }else{
            var js = {guildID: GlobalClass.ClubClass.ClubID,applyList: "",isAgree: isAgree};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.APPLYLIST_CLUB,JSON.stringify(js)); 
        }
    }
    private Btn_AuditClick(){}
    private Btn_NoAllClick(){
        this.SendApplyListMsg("0");
    }
    private Btn_YesAllClick(){
        this.SendApplyListMsg("1");
    }
    private Tg_JoinAllClick(){
        var count = this.mPanel.ClubJoinList.$children.length;
        this.mPanel.ClubJoinList.$children.forEach(element => {
            element.Tg_Join.selected = this.mPanel.Tg_JoinAll.selected;
        });
    }
    private Btn_CloseClubHelprClick(){
        this.mPanel.ClubHelpPanel.visible = false;
        this.bCanSearch = false;
    }
    private Btn_OpenSearchMemberClick(){
        this.mPanel.Go_SearchMember.visible = true;
        this.bCanSearch = true;
    }
    private Btn_ClosePostionSettingClick(){
        this.mPanel.PostionSettingPanel.visible = false;
    }
    private Btn_PostionSettingClick(){
        if(GlobalClass.ClubClass.str_PositionID=="1"){
            if(GlobalClass.ClubClass.str_PositionOriginID=="2"){
                KFControllerMgr.showTips("确定转让会长吗？",0,2,()=>{
                    var js = {new: GlobalClass.ClubClass.str_MemberSettingID,gid: GlobalClass.ClubClass.ClubID};
                    WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.clubOwnerChange,JSON.stringify(js)); 
                },"提示",()=>{
                    
                });
            }else{
                KFControllerMgr.showTips("只能转让给副会长");
            }
            
        }else{
            var js = {guildID: GlobalClass.ClubClass.ClubID,memberID: GlobalClass.ClubClass.str_MemberSettingID,position: GlobalClass.ClubClass.str_PositionID};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.POSITIONSETTING_CLUB,JSON.stringify(js)); 
        }

    }

     private Btn_MemberSignOutClick(){
         KFControllerMgr.showTips("是否确定将此会员请出公会?",0,2,()=>{
             var js = {guildID: GlobalClass.ClubClass.ClubID,memberID: GlobalClass.ClubClass.str_MemberSettingID};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CLUB.SIGNOUT_CLUB_MEMBER,JSON.stringify(js));  
         },"提示");
     }

     private Go_GuideClick(){
         if (this.isGuideOne) {
            var power = this.Json_PositionDefine[GlobalClass.ClubClass.MyPosition][2]+"";
            if(power == "0") {
                this.mPanel.Go_Guide.visible = false;
            }else if (power == "1") {
                this.mPanel.GuideOne.visible = false;
                this.mPanel.GuideTwo.visible = true;
                this.mPanel.Lb_GuideTips.text = LocalizationMgr.getText("点击任意位置结束指引。");
            }else{
                this.mPanel.Go_Guide.visible = false;
            }
            this.isGuideOne = false;
            egret.localStorage.setItem("isFinishGuide","true");
         }else{
            this.mPanel.Go_Guide.visible = false;
         }
     }

     private Input_ClubBulletinCHANGE(e:egret.Event){
         console.log(this.mPanel.Input_ClubBulletin.text);
         var len=(this.mPanel.Input_ClubBulletin.text.match(/\n/g)||[]).length;
         if(len==2){
             var s = this.mPanel.Input_ClubBulletin.text.lastIndexOf("\n");
             this.mPanel.Input_ClubBulletin.text = this.mPanel.Input_ClubBulletin.text.substr(0,s);
         }
     }

    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_CloseSearchClub3,egret.TouchEvent.TOUCH_END,this.Btn_CloseSearchClub3Click,this);
        this.AddClickEvent(this.mPanel.Btn_Search2,egret.TouchEvent.TOUCH_END,this.Btn_Search2Click,this);
        this.AddClickEvent(this.mPanel.Btn_ChangeClubPanel,egret.TouchEvent.TOUCH_END,this.Btn_ChangeClubPanelClick,this);
        this.AddClickEvent(this.mPanel.Btn_GenerateClub,egret.TouchEvent.TOUCH_END,this.Btn_GenerateClubClick,this);
        this.AddClickEvent(this.mPanel.Btn_CloseClubBulletin,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubBulletinClick,this);
        this.AddClickEvent(this.mPanel.Btn_UpdateClubBulletin,egret.TouchEvent.TOUCH_END,this.Btn_UpdateClubBulletinClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClearClubBulletin,egret.TouchEvent.TOUCH_END,this.Btn_ClearClubBulletinClick,this);
        this.AddClickEvent(this.mPanel.Btn_UpgradeClub,egret.TouchEvent.TOUCH_END,this.Btn_UpgradeClubClick,this);
        this.AddClickEvent(this.mPanel.Btn_CloseClubUpgrade,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubUpgradeClick,this);
        this.AddClickEvent(this.mPanel.Btn_CloseClubInfo,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubInfoClick,this);
        this.AddClickEvent(this.mPanel.Tg_ClubInfo,egret.TouchEvent.CHANGE,this.Tg_ClubInfoClick,this);
        this.AddClickEvent(this.mPanel.Tg_ClubMember,egret.TouchEvent.CHANGE,this.Tg_ClubMemberClick,this);
        this.AddClickEvent(this.mPanel.Tg_ApplicantionInfo,egret.TouchEvent.CHANGE,this.Tg_ApplicantionInfoClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClubDole,egret.TouchEvent.TOUCH_END,this.Btn_ClubDoleClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClubTask,egret.TouchEvent.TOUCH_END,this.Btn_ClubTaskClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClubSignOut,egret.TouchEvent.TOUCH_END,this.Btn_ClubSignOutClick,this);
        this.AddClickEvent(this.mPanel.Btn_watting,egret.TouchEvent.TOUCH_END,this.Btn_wattingClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClubDole0,egret.TouchEvent.TOUCH_END,this.Btn_ClubDoleClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClubTask0,egret.TouchEvent.TOUCH_END,this.Btn_ClubTaskClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClubSignOut0,egret.TouchEvent.TOUCH_END,this.Btn_ClubSignOutClick,this);
        this.AddClickEvent(this.mPanel.Btn_watting0,egret.TouchEvent.TOUCH_END,this.Btn_wattingClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClubBulletin,egret.TouchEvent.TOUCH_END,this.Btn_ClubBulletinClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClubHelp,egret.TouchEvent.TOUCH_END,this.Btn_ClubHelpClick,this);
        this.AddClickEvent(this.mPanel.Btn_Upgrade,egret.TouchEvent.TOUCH_END,this.Btn_UpgradeClick,this);
        this.AddClickEvent(this.mPanel.Btn_EndPage,egret.TouchEvent.TOUCH_END,this.Btn_EndPageClick,this);
        this.AddClickEvent(this.mPanel.Btn_FirstPage,egret.TouchEvent.TOUCH_END,this.Btn_FirstPageClick,this);
        this.AddClickEvent(this.mPanel.Btn_PageUp,egret.TouchEvent.TOUCH_END,this.Btn_PageUpClick,this);
        this.AddClickEvent(this.mPanel.Btn_PageDown,egret.TouchEvent.TOUCH_END,this.Btn_PageDownClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClearSearchMember,egret.TouchEvent.TOUCH_END,this.Btn_ClearSearchMemberClick,this);
        this.AddClickEvent(this.mPanel.Btn_CloseMemberSearch,egret.TouchEvent.TOUCH_END,this.Btn_CloseMemberSearchClick,this);
        this.AddClickEvent(this.mPanel.Btn_SearchMember,egret.TouchEvent.TOUCH_END,this.Btn_SearchMemberClick,this);

        this.AddClickEvent(this.mPanel.Btn_MemberID,egret.TouchEvent.TOUCH_TAP,this.Btn_MemberIDClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_MemberNickName,egret.TouchEvent.TOUCH_TAP,this.Btn_MemberNickNameClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_InCoin,egret.TouchEvent.TOUCH_TAP,this.Btn_InCoinClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_OutCoin,egret.TouchEvent.TOUCH_TAP,this.Btn_OutCoinClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_LastOnTime,egret.TouchEvent.TOUCH_TAP,this.Btn_LastOnTimeClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_MemberSetting,egret.TouchEvent.TOUCH_TAP,this.Btn_MemberSettingClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_ApplicantID,egret.TouchEvent.TOUCH_TAP,this.Btn_ApplicantIDClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_ApplicantNickName,egret.TouchEvent.TOUCH_TAP,this.Btn_ApplicantNickNameClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_ApplicationDate,egret.TouchEvent.TOUCH_TAP,this.Btn_ApplicationDateClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_Audit,egret.TouchEvent.TOUCH_TAP,this.Btn_AuditClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_Posts,egret.TouchEvent.TOUCH_END,this.Btn_PostsClick,this,0);

        this.AddClickEvent(this.mPanel.Btn_NoAll,egret.TouchEvent.TOUCH_END,this.Btn_NoAllClick,this);
        this.AddClickEvent(this.mPanel.Btn_YesAll,egret.TouchEvent.TOUCH_END,this.Btn_YesAllClick,this);
        this.AddClickEvent(this.mPanel.Tg_JoinAll,egret.TouchEvent.CHANGE,this.Tg_JoinAllClick,this);
        this.AddClickEvent(this.mPanel.Btn_OpenSearchMember,egret.TouchEvent.TOUCH_END,this.Btn_OpenSearchMemberClick,this);
        this.AddClickEvent(this.mPanel.Btn_CloseClubHelp,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubHelprClick,this);
        this.AddClickEvent(this.mPanel.Btn_ClosePostionSetting,egret.TouchEvent.TOUCH_END,this.Btn_ClosePostionSettingClick,this);
        this.AddClickEvent(this.mPanel.Btn_PostionSetting,egret.TouchEvent.TOUCH_END,this.Btn_PostionSettingClick,this);
        this.AddClickEvent(this.mPanel.Btn_MemberSignOut,egret.TouchEvent.TOUCH_END,this.Btn_MemberSignOutClick,this);
        this.AddClickEvent(this.mPanel.Go_Guide,egret.TouchEvent.TOUCH_END,this.Go_GuideClick,this);

        this.AddClickEvent(this.mPanel.Input_ClubBulletin,egret.Event.CHANGE,this.Input_ClubBulletinCHANGE,this);
        
     }
     

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_CloseSearchClub3,egret.TouchEvent.TOUCH_END,this.Btn_CloseSearchClub3Click,this);
        this.RemoveClickEvent(this.mPanel.Btn_Search2,egret.TouchEvent.TOUCH_END,this.Btn_Search2Click,this);
        this.RemoveClickEvent(this.mPanel.Btn_ChangeClubPanel,egret.TouchEvent.TOUCH_END,this.Btn_ChangeClubPanelClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_GenerateClub,egret.TouchEvent.TOUCH_END,this.Btn_GenerateClubClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseClubBulletin,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubBulletinClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_UpdateClubBulletin,egret.TouchEvent.TOUCH_END,this.Btn_UpdateClubBulletinClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClearClubBulletin,egret.TouchEvent.TOUCH_END,this.Btn_ClearClubBulletinClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_UpgradeClub,egret.TouchEvent.TOUCH_END,this.Btn_UpgradeClubClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseClubUpgrade,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubUpgradeClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseClubInfo,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubInfoClick,this);
        this.RemoveClickEvent(this.mPanel.Tg_ClubInfo,egret.TouchEvent.CHANGE,this.Tg_ClubInfoClick,this);
        this.RemoveClickEvent(this.mPanel.Tg_ClubMember,egret.TouchEvent.CHANGE,this.Tg_ClubMemberClick,this);
        this.RemoveClickEvent(this.mPanel.Tg_ApplicantionInfo,egret.TouchEvent.CHANGE,this.Tg_ApplicantionInfoClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClubDole,egret.TouchEvent.TOUCH_END,this.Btn_ClubDoleClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClubTask,egret.TouchEvent.TOUCH_END,this.Btn_ClubTaskClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClubSignOut,egret.TouchEvent.TOUCH_END,this.Btn_ClubSignOutClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_watting,egret.TouchEvent.TOUCH_END,this.Btn_wattingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClubDole0,egret.TouchEvent.TOUCH_END,this.Btn_ClubDoleClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClubTask0,egret.TouchEvent.TOUCH_END,this.Btn_ClubTaskClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClubSignOut0,egret.TouchEvent.TOUCH_END,this.Btn_ClubSignOutClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_watting0,egret.TouchEvent.TOUCH_END,this.Btn_wattingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClubBulletin,egret.TouchEvent.TOUCH_END,this.Btn_ClubBulletinClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClubHelp,egret.TouchEvent.TOUCH_END,this.Btn_ClubHelpClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Upgrade,egret.TouchEvent.TOUCH_END,this.Btn_UpgradeClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_EndPage,egret.TouchEvent.TOUCH_END,this.Btn_EndPageClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_FirstPage,egret.TouchEvent.TOUCH_END,this.Btn_FirstPageClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_PageUp,egret.TouchEvent.TOUCH_END,this.Btn_PageUpClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_PageDown,egret.TouchEvent.TOUCH_END,this.Btn_PageDownClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClearSearchMember,egret.TouchEvent.TOUCH_END,this.Btn_ClearSearchMemberClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseMemberSearch,egret.TouchEvent.TOUCH_END,this.Btn_CloseMemberSearchClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_SearchMember,egret.TouchEvent.TOUCH_END,this.Btn_SearchMemberClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_MemberID,egret.TouchEvent.TOUCH_END,this.Btn_MemberIDClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_MemberNickName,egret.TouchEvent.TOUCH_END,this.Btn_MemberNickNameClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_InCoin,egret.TouchEvent.TOUCH_END,this.Btn_InCoinClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_OutCoin,egret.TouchEvent.TOUCH_END,this.Btn_OutCoinClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_LastOnTime,egret.TouchEvent.TOUCH_END,this.Btn_LastOnTimeClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_MemberSetting,egret.TouchEvent.TOUCH_END,this.Btn_MemberSettingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ApplicantID,egret.TouchEvent.TOUCH_END,this.Btn_ApplicantIDClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ApplicantNickName,egret.TouchEvent.TOUCH_END,this.Btn_ApplicantNickNameClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ApplicationDate,egret.TouchEvent.TOUCH_END,this.Btn_ApplicationDateClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Audit,egret.TouchEvent.TOUCH_END,this.Btn_AuditClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_NoAll,egret.TouchEvent.TOUCH_END,this.Btn_NoAllClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_YesAll,egret.TouchEvent.TOUCH_END,this.Btn_YesAllClick,this);
        this.RemoveClickEvent(this.mPanel.Tg_JoinAll,egret.TouchEvent.TOUCH_END,this.Tg_JoinAllClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_OpenSearchMember,egret.TouchEvent.TOUCH_END,this.Btn_OpenSearchMemberClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseClubHelp,egret.TouchEvent.TOUCH_END,this.Btn_CloseClubHelprClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Posts,egret.TouchEvent.TOUCH_END,this.Btn_PostsClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_ClosePostionSetting,egret.TouchEvent.TOUCH_END,this.Btn_ClosePostionSettingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_PostionSetting,egret.TouchEvent.TOUCH_END,this.Btn_PostionSettingClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_MemberSignOut,egret.TouchEvent.TOUCH_END,this.Btn_MemberSignOutClick,this);
        this.RemoveClickEvent(this.mPanel.Go_Guide,egret.TouchEvent.TOUCH_END,this.Go_GuideClick,this);

        this.RemoveClickEvent(this.mPanel.Input_ClubBulletin,egret.Event.CHANGE,this.Input_ClubBulletinCHANGE,this);
    }
}