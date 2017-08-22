/**
 *
 * @author 
 *
 */
  let ChatProtocol = 
    {
        getMsgNum : 50,
        worldCost : 0,
        clubCost : 0,
        timeOutWorld : 5,
        timeOutGuild : 5,
        LoudNum : 0
    }
class ChatPanelController extends KFController{ 
    private worldCost = ChatProtocol.worldCost;
    private clubCost = ChatProtocol.clubCost;
    private timeOutWorld = ChatProtocol.timeOutWorld;
    private timeOutGuild = ChatProtocol.timeOutGuild;
    private sendWorldTime = 0;
    private sendGuildTime = 0;
    private PanelChatCurr = 1;

    private ChatType_character=0;
    private ChatType_vedio=1;
    private ChatType_Sound=2;
    private ChatType_JoinDice=3;

    private chatClub;
    private chatWorld;
    
	
	protected init(){
    	super.init();
        this.ListenObjList = [ {event:egret.TouchEvent.TOUCH_END,items:{"SwitchShow":"",
                                                        "PageWorld":"",
                                                        "SwitchHide":"",
                                                        "PageClub":"",
                                                        "Btn_CloseTips":"",
                                                        "Btn_OpenShop":"",
                                                        "Btn_Send_Delete":"",
                                                        "Btn_Send_MSN":"",
                                                    },},
                            
                            ];
        this.EventsList = [
            MsgID.USER.UPDATE_PROPS,
            MsgID.CHAT.ChatCommom,
            MsgID.CHAT.ChatvideoShare,
            MsgID.CHAT.ChatvideoGet,
            MsgID.CHAT.ChatGetClub,
            MsgID.CHAT.ChatChatClub,
            MsgID.CHAT.ChatGetWorld,
            MsgID.CHAT.ChatChatWorld,
            MsgID.CHAT.ChatClubNewMsg,
            MsgID.CHAT.ChatWorldNewMsg,
            MsgID.CHAT.ChatNewInfo,
            MsgID.CHAT.ChatVideoWorld,
            MsgID.DiceGame.BEGIN_SEND,
            MsgID.DiceGame.Msg425,
            MsgID.WXHH.EXIT_ROOM
            ];
	}
     private on425_event(event: egret.Event): void {
        console.log("on425_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        if(jsonData.ret == 1){
            this.ChangeShow(false)
            if (KFSceneManager.getInstance().getRuningSceneName()=="WXHHScene") {
                this.ChangeShow(true)
            	WebSocketMgr.getInstance().SendOneceMsg(MsgID.WXHH.EXIT_ROOM,"");  
            }else if (KFSceneManager.getInstance().getRuningSceneName()!="DHSScene"){
                var js = {userid: GlobalClass.UserInfo.str_UserID};
            	WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.BEGIN_SEND,JSON.stringify(js));  
            }
        }else{
            this.OutServerErrorBox(jsonData)
        }       
    }
    private on401_event(event: egret.Event): void {
        if(KFSceneManager.getInstance().getRuningSceneName() == "DHSScene")return;
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
                KFControllerMgr.getCtl(PanelName.DHTGamePanel).show();
            }else{//失败则提示失败原因
                let info = jd["info"]["reasonType"];
                // if(info == 1009) {
                //     KFControllerMgr.showTips("Tips_102");
                // }else{
                //     KFControllerMgr.showTips("Tips_0");    
                // }
           
                KFControllerMgr.showTips(jd["info"]["desc"]);
                return;
            }
        }else if(code == 410){
            //掉线重连
            let ret = jd["ret"];
            if(ret == 1) {

                GlobalClass.DiceGameClass.offLine = true;

                let pwd = jd["info"]["pwd"];        //房间密码
                GlobalClass.DiceGameClass.RoomNum = pwd;

                let betP = jd["info"]["betP"];      //默认对局点数
                GlobalClass.DiceGameClass.RoomScore = (betP);

                let protectPoint = jd["info"]["protectPoint"];
                GlobalClass.DiceGameClass.GuaranteePoint = (protectPoint);

                let waitTime = jd["info"]["waitTime"]; //正常状态下的最大叫骰思考时间
                GlobalClass.DiceGameClass.waitTime = (waitTime);

                let autoTime = jd["info"]["autoTime"];  //托管状态下的最大叫骰子思考时间
                GlobalClass.DiceGameClass.autoTime = (autoTime);

                let oLeftTime = jd["info"]["oLeftTime"];  //房主剩余思考时间
                GlobalClass.DiceGameClass.ownerLeftTime = (oLeftTime);

                let cLeftTime = jd["info"]["cLeftTime"];   //挑战者剩余思考时间
                GlobalClass.DiceGameClass.opponentLeftTime = (cLeftTime);

                let isOwner = jd["info"]["isOwner"];    //是否房主
                if(isOwner == "1") { 
                    GlobalClass.DiceGameClass.isRoomOwner = true;
                }

                let oName = jd["info"]["oName"];     //房主昵称
                GlobalClass.DiceGameClass.ownerPlayerName = oName;

                let cName = jd["info"]["cName"];    //挑战者昵称
                GlobalClass.DiceGameClass.opponentPlayerName = cName;

                let owner = jd["info"]["owner"];  //房主ID
                let challenger = jd["info"]["challenger"];  //挑战者ID,负数表示不存在
                if ((challenger) > 0) {
                    GlobalClass.DiceGameClass.opponentIsJoin = true;
                }
                    
                if (isOwner == "1") {
                    GlobalClass.UserInfo.str_UserID = owner;
                    GlobalClass.UserInfo.str_UserNickname = oName;
                }else{
                    GlobalClass.UserInfo.str_UserID = challenger;
                    GlobalClass.UserInfo.str_UserNickname = cName;
                }   
                    
                let oAuto = jd["info"]["oAuto"];   //房主是否托管
                GlobalClass.DiceGameClass.ownerPlayerDeposit = oAuto;

                let cAuto = jd["info"]["cAuto"];   //挑战者是否托管
                GlobalClass.DiceGameClass.opponentPlayerDeposit = cAuto;

                let oReady = jd["info"]["oReady"];    //房主是否准备好
                GlobalClass.DiceGameClass.ownerIsReady = oReady;

                let cReady = jd["info"]["cReady"];    //挑战者是否准备好
                GlobalClass.DiceGameClass.opponentIsReady = cReady;

                let oBidstr = jd["info"]["oBid"];    //房主最近一次叫骰内容
                let oBid = (oBidstr);
                let oPoint = oBid % 10;
                let oPointCount = Math.floor(oBid / 10);
                GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber = oPoint.toString();
                GlobalClass.DiceGameClass.ownerPlayerCallDiceCount = oPointCount.toString();

                let cBidstr = jd["info"]["cBid"];    //挑战者最近一次叫骰内容
                let cBid = (cBidstr);
                let cPoint = cBid % 10;
                let cPointCount = Math.floor(cBid / 10);
                GlobalClass.DiceGameClass.opponentPlayerCallDiceCount = cPointCount.toString();
                GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber = cPoint.toString();

                let oTotalPoint = jd["info"]["oPoint"];   //双方总分数
                let cTotalPoint = jd["info"]["cPoint"];
                
                GlobalClass.DiceGameClass.ownerPoint=oTotalPoint
                GlobalClass.DiceGameClass.opponentPoint=cTotalPoint

                if (isOwner == "1") {
                    GlobalClass.UserInfo.str_Hall_totalScore = oTotalPoint;
                }else{
                    GlobalClass.UserInfo.str_Hall_totalScore = cTotalPoint;
                }

                let isRunning = jd["info"]["isRunning"];
                if (isRunning == 0 || isRunning == "0") {
                    GlobalClass.DiceGameClass.isRunning = false;
                }else{
                    GlobalClass.DiceGameClass.isRunning = true;
                }
                
                let diceContent:string = jd["info"]["diceContent"];
                if (diceContent != null && diceContent.length!=0) {
                    let resultArray = diceContent.split("-");
                    if (GlobalClass.DiceGameClass.isRoomOwner) {
                            let paraArray = [];
                            for (let i = 0;i < 5;i++) {
                                paraArray[i] = resultArray[i];
                            }
                            GlobalClass.DiceGameClass.ownerPlayerDice = paraArray;

                            paraArray = [];
                            for (let i = 5; i<10;i++) {
                                paraArray[i-5] = resultArray[i];
                            }
                            GlobalClass.DiceGameClass.opponentPlayerDice = paraArray;
                        }else{
                            let paraArray = [];
                            for (let i = 0;i < 5;i++) {
                                paraArray[i] = resultArray[i];
                            }
                            GlobalClass.DiceGameClass.opponentPlayerDice = paraArray;
                            
                            paraArray = [];
                            for (let i = 5; i<10;i++) {
                                paraArray[i-5] = resultArray[i];
                            }
                            GlobalClass.DiceGameClass.ownerPlayerDice = paraArray;
                        }
                }  
                    
                let oCanBid = jd["info"]["oCanBid"];
                if (oCanBid == "1") {
                    GlobalClass.DiceGameClass.ownerCanBid = true;
                    }

                let cCanBid = jd["info"]["cCanBid"];
                if (cCanBid == "1") {
                    GlobalClass.DiceGameClass.opponentCanBid = true;
                }

                let roomName = jd["info"]["roomName"];
                GlobalClass.DiceGameClass.RoomName = roomName;

                let gameMode = jd["info"]["diceMode"];
                GlobalClass.DiceGameClass.gameMode = gameMode;

                //快速模式
                let mode = jd["info"]["isQuickMode"];
                if (mode == "1") {
                    GlobalClass.DiceGameClass.isQuickGame = true;
                }else{
                    GlobalClass.DiceGameClass.isQuickGame = false;
                }
                KFSceneManager.getInstance().replaceScene(SceneName.DHS);
                KFControllerMgr.getCtl(PanelName.DHTGamePanel).show();             
            }else{
                KFControllerMgr.showTips(jd["info"]["desc"]);
            }
        }
    }
     private on207_event(event: egret.Event): void {
        console.log("on207_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if(this.mPanel.SwitchShow.visible) {
                    console.log("从五星到大厅");
        }else{
            if (strArray.length >= 3 && strArray[2]=="1"){
                var js = {userid: GlobalClass.UserInfo.str_UserID};
            	WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.BEGIN_SEND,JSON.stringify(js)); 
            }else{
                KFControllerMgr.showTips("退出五星失败",0,1)
            }          
        }                
    }

    private on151_event(event: egret.Event): void {
        console.log("on151_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if(strArray.length>=3){
            var _Str_PropsGroup1 = strArray[2].split( ';');
            var _Str_PropsGroup2 = _Str_PropsGroup1[0].split(',' );
            this.setLoudNum(_Str_PropsGroup2[1]);
            this.refreshText();
        }
    }

    private on5052_event(event: egret.Event): void {
        console.log("on5052_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        this.GetChats(1,ChatProtocol.getMsgNum);
    }

    private on5053_event(event: egret.Event): void {
        console.log("on5053_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        this.setLoudNum(jsonData["loudNum"]);
        this.refreshText();
    }

    private on5202_event(event: egret.Event): void {
        console.log("on5202_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        if(jsonData.ret == 1){
            if(this.worldCost>0){
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_PROPS,"");
            }
        }else{
            this.OutServerError(jsonData);
        }
    }

    private setLoudNum(arg){
        ChatProtocol.LoudNum=Number(arg);
    }
    private on5201_event(event: egret.Event): void {
        console.log("on5201_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();                
        // var datastr = '{"info": {"message": [{"ctime": 1492531200001, "type": 0, "userid": 1, "content": "[85F501]\u4e3a\u8425\u9020\u5065\u5eb7\u4f11\u95f2\u7684\u6e38\u620f\u73af\u5883\uff0c\u672c\u6e38\u620f\u4e25\u7981\u79c1\u4e0b\u4ea4\u6613\uff0c\u8bf7\u5e7f\u5927\u73a9\u5bb6\u5408\u7406\u5b89\u6392\u6e38\u620f\u65f6\u95f4\uff0c\u9002\u5ea6\u6e38\u620f\uff0c\u4eab\u53d7\u5065\u5eb7\u751f\u6d3b\u3002", "isVip": 0, "nickname": "[FF00FF]\u7cfb\u7edf\u516c\u544a[-]"},{"ctime": 1483188217, "type": 0, "userid": 1, "content": "[85F501]\u4e3a\u8425\u9020\u5065\u5eb7\u4f11\u95f2\u7684\u6e38\u620f\u73af\u5883\uff0c\u672c\u6e38\u620f\u4e25\u7981\u79c1\u4e0b\u4ea4\u6613\uff0c\u8bf7\u5e7f\u5927\u73a9\u5bb6\u5408\u7406\u5b89\u6392\u6e38\u620f\u65f6\u95f4\uff0c\u9002\u5ea6\u6e38\u620f\uff0c\u4eab\u53d7\u5065\u5eb7\u751f\u6d3b\u3002", "isVip": 0, "nickname": "[FF00FF]\u7cfb\u7edf\u516c\u544a[-]"} ]}, "code": 5201, "ret": 1}';
        var jsonData = JSON.parse(datastr);
        if(jsonData.ret == 1){
            var arr  = this.RemakeMsg(jsonData["info"]["message"]);
            this.refreshMsg(arr,1);
        }
    }
    private on5051_event(event: egret.Event): void {
        console.log("on5051_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        this.GetChats(2, ChatProtocol.getMsgNum);
    }
    private on5000_event(event: egret.Event): void {
        console.log("on5000_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
          if(jsonData.ret == 1){
            //请求返回错误
            this.worldCost = Number(jsonData["info"]["worldCost"]);
            this.clubCost = Number(jsonData["info"]["guildCost"]);
            this.timeOutWorld = Number(jsonData["info"]["worldMinInterval"]); 
            this.timeOutGuild = Number(jsonData["info"]["guildMinInterval"]);
            this.ChangeShowEditorBack();
            this.refreshText();
        }     
    }
    private on5001_event(event: egret.Event): void {
        console.log("on5001_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        if(jsonData.ret == 1){
            KFControllerMgr.showTips("分享成功",0,1);
        }else{
            this.OutServerErrorBox(jsonData);
        
        }

    }
    private on5002_event(event: egret.Event): void {
        console.log("on5002_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        this.vedioPlay(datastr);
    }
    private on5204_event(event: egret.Event): void {
        console.log("on5204_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        this.vedioPlay(datastr);
    }
    private on5101_event(event: egret.Event): void {
        console.log("on5101_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        if(jsonData.ret == 1){
           var arr  = this.RemakeMsg(jsonData["info"]);
           this.refreshMsg(arr,2);
        }else{
            
        }
    }
    private on5102_event(event: egret.Event): void {
        console.log("on5102_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var jsonData = JSON.parse(datastr);
        if(jsonData.ret == 1){
            if (this.clubCost > 0){
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_PROPS,"");
            }       
        }else{
            this.OutServerError(jsonData);
        }
    }

    private RemakeMsg(cis):any{
        var newArr = [];
        cis.forEach(jd => {
            var ctime;//服务端发的时间有可能jd["createTime"]也有可能jd["cTime"]
            if(jd["createTime"]&&jd["createTime"]!=""){
                ctime = jd["createTime"];
            }else if(jd["ctime"]&&jd["ctime"]+""!=""){
                ctime = jd["ctime"];
            }else{
                console.log("服务端没发时间");
            }
            var a = jd["ctime"];
                                
            var roomid=0;
            if(jd["params"]&&jd["params"]!=""){
                var jsd = jd["params"];
                var jsda =JSON.parse(jsd);
                if(jsda!="")  { //兼容老服务器
                    roomid=jsda["roomid"]
                }
            }
            if(ctime!=null){
                var ci = {Type:Number(jd["type"]),text:jd["content"],soundData:null,name:jd["nickname"],VIPLevel:jd["isVip"],time:ctime,userid:jd["userid"],roomid:roomid};
                newArr.push(ci);
            }
        });
        newArr.sort(
                function(a,b){
                    return a["time"] - b["time"];
                }
            );
        return newArr;
    }



    private addMsg(name,VIPLevel,type,content,time){
         var obj =  new Object();
        obj["name"] = name;
        obj["VIPLevel"] = VIPLevel;
        obj["type"] = type;
        obj["content"] = content;
        obj["time"] = this.getDate(time+"");
        var dataArr:eui.ArrayCollection;
        if(this.PanelChatCurr==1){
            dataArr = <eui.ArrayCollection>this.mPanel.chatWorldList.dataProvider;
        }else if(this.PanelChatCurr==2){
            dataArr = <eui.ArrayCollection>this.mPanel.chatClubList.dataProvider;
        }
        dataArr.addItem(obj);
        if(dataArr.length>50){
            dataArr.removeItemAt(0);
        }
        if(this.PanelChatCurr==1){
            this.mPanel.chatWorldList.dataProviderRefreshed();
            this.mPanel.chatWorldList.validateNow ();
            if(this.mPanel.chatWorldList.measuredHeight>this.mPanel.chatWorldList.height){
             this.mPanel.chatWorldList.scrollV = this.mPanel.chatWorldList.measuredHeight-this.mPanel.chatWorldList.height;
            }
        }else if(this.PanelChatCurr==2){
            this.mPanel.chatClubList.dataProviderRefreshed();
            this.mPanel.chatClubList.validateNow ();
            if(this.mPanel.chatClubList.measuredHeight>this.mPanel.chatClubList.height){
                this.mPanel.chatClubList.scrollV = this.mPanel.chatClubList.measuredHeight-this.mPanel.chatClubList.height;
            }
        }

    }

     private  getDate(oristr:string):string{
        var arr = oristr.replace(".","");
        var del = 13 - arr.length;
        for(let i = 0;i<del;i++){
            arr+="0";
        }
        var date = new Date(Number(arr));
        var nowDate =  new Date();
        // var arr2 = nowDate.toLocaleDateString().split("-");
        // var month2 = nowDate.getMonth()+1;
        // var day2 = nowDate.getDate();
        // var b = nowDate.getFullYear()+"/"+month2+"/"+day2;
        // var todayDate = new Date(b);

        var arr1 = date.toLocaleDateString().split("-");
        var hours = date.getHours()>=10?date.getHours():"0"+date.getHours();
        var minutes = date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes();
        
        if(date.getFullYear()==nowDate.getFullYear()&&date.getMonth()==nowDate.getMonth()&&date.getDate()==nowDate.getDate()){
            var re2 = "今天"+" "+hours+":"+minutes;
            return re2;
        }else{
            var month = arr1[1].length==2?arr1[1]:"0"+arr1[1];
            var day = arr1[2].length==2?arr1[2]:"0"+arr1[2];
            var re = arr1[0]+"-"+month+"-"+day+" "+hours+":"+minutes;
            return re;
        }
    }
	

    private refreshMsg(cis,type){
        // if (#cis >ChatProtocol.getMsgNum )then
        //     table.remove(cis, 1)  
        // end

        if(type==1){
            this.chatClub = cis;
        }else if(type==2){
            this.chatWorld = cis;
        }

        var dataArr = [];
        cis.forEach(ci => {
            var obj =  new Object();
            obj["name"] = ci.name;
            obj["VIPLevel"] = ci.VIPLevel;
            obj["type"] = ci.Type;
            obj["content"] = ci.text;
            obj["time"] = this.getDate(ci.time+"");
            obj["roomid"] = ci.roomid;
            obj["userid"] = ci.userid;
            dataArr.push(obj);
        });
        var collection = new eui.ArrayCollection();
        collection.source = dataArr;
        if(type==1){
            this.mPanel.chatWorldList.dataProvider = collection;
            this.mPanel.chatWorldList.validateNow ();
            if(this.mPanel.chatWorldList.measuredHeight>this.mPanel.chatWorldList.height){
             this.mPanel.chatWorldList.scrollV = this.mPanel.chatWorldList.measuredHeight-this.mPanel.chatWorldList.height;
            }
        }else{
            this.mPanel.chatClubList.dataProvider = collection;
            this.mPanel.chatClubList.validateNow ();
            if(this.mPanel.chatClubList.measuredHeight>this.mPanel.chatClubList.height){
                this.mPanel.chatClubList.scrollV = this.mPanel.chatClubList.measuredHeight-this.mPanel.chatClubList.height;
            }
        }

    }

    private ChangeShowEditorBack(){
        this.mPanel.SwitchShow.visible = false;
        this.mPanel.ChatCont.visible = true;
    }
    private refreshText(){
        if(this.PanelChatCurr==1){
             if (this.worldCost == 0){
                this.mPanel.InputChar.prompt = "[请输入20字以内的发言]";
             }else{
                this.mPanel.InputChar.prompt = "[每次消耗" + this.worldCost + "个喇叭，剩余" + ChatProtocol.LoudNum + "]";
             }
        }else {
             if(this.clubCost==0){
                if (GlobalClass.GameInfoForConfig.openChatWorld==0) {
                    this.mPanel.InputChar.prompt = "";
                }else{
                    this.mPanel.InputChar.prompt = "[请输入20字以内的发言]";
                }
             }else{
                this.mPanel.InputChar.prompt = "[每次消耗" + this.clubCost + "个喇叭，剩余"+ ChatProtocol.LoudNum + "]";
             }
        }
        // else{
        //     this.mPanel.InputChar.prompt = "[免费发送]";
        // }
    }

    private vedioPlay(datastr){
        var jsonData = JSON.parse(datastr);
        if(jsonData.ret == 1){
            // if(GamePanelController_Phone.gamepanelcontroller~=nil and VedioPanel.vedioPanel~=nil)then
            //             if (GamePanelController_Phone.gamepanelcontroller.GameUI.Btn_VedioGame:GetComponent("UIButton").isEnabled)then
            //                 GamePanelController_Phone.gamepanelcontroller:OnBtn_VedioGameClick(nil);
            //                 this.mPanel_Ctrl:ChangeShowEditor(nil);
            //                 VedioPanel.vedioPanel:playVedio(jsonData["info"]["videoCode"]);
            //             else
            //                 dialogBox.SetTipsPanel("游戏中不支持视频",0,1);
            //             end
            //        else
            //             dialogBox.SetTipsPanel("当前场景不支持连环夺宝视频",0,1);
            //         end
        }else{
            this.OutServerErrorBox(jsonData);
        }
    }

    private OutServerError(jsonData,){
        var errors = jsonData["info"]["desc"];
        var date = new Date().getTime();
        this.addMsg("发送失败",0,this.ChatType_character,errors,date);
    }

    private OutServerErrorBox(jsonData){
        var errors = jsonData["info"]["desc"];
        if(errors==null||errors.length==0){
            errors =LocalizationMgr.getText("未定义的错误");
        }
        KFControllerMgr.showTips(errors,0,1);
    }

    private SwitchShowClick(){
        var cid =0;
        var a = GlobalClass.ClubClass.ClubID;
        if (GlobalClass.ClubClass.ClubID!=""&&GlobalClass.ClubClass.ClubID!="0") {
            cid  = Number(GlobalClass.ClubClass.ClubID)
        }
        if (GlobalClass.GameInfoForConfig.openChatWorld==0 && GlobalClass.GameInfoForConfig.openChatGuild==0 ){
            KFControllerMgr.showTips("聊天未开放");
        }else if(GlobalClass.GameInfoForConfig.openChatWorld==0 && cid==0)  {
             KFControllerMgr.showTips("请先加入公会",0,2,()=>{
                KFControllerMgr.getCtl(PanelName.ClubPanel).show();
            }); 
        }else{
            var js = {userid: GlobalClass.UserInfo.str_UserID};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CHAT.ChatCommom,JSON.stringify(js));  
            if (GlobalClass.GameInfoForConfig.openChatWorld==1 ){
                this.GetChats(1, ChatProtocol.getMsgNum);
            }
            if (GlobalClass.GameInfoForConfig.openChatGuild==1 ){
                this.GetChats(2, ChatProtocol.getMsgNum);
            }
            this.firstEnterPage();
        }


        
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.UPDATE_PROPS,"");
    }

    private ChangeShow(show){
        this.mPanel.SwitchShow.visible = !show;
        this.mPanel.ChatCont.visible = show;
    }

    private GetChats(type,msgNum){
        if(type==1){
            if(GlobalClass.UserInfo.str_UserID==""){

            }else{
                var js = {userid: GlobalClass.UserInfo.str_UserID,num:msgNum};
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.CHAT.ChatGetWorld,JSON.stringify(js));  
            }
        }else{
            if(GlobalClass.UserInfo.str_UserID==""){

            }else if(GlobalClass.ClubClass.ClubID=="0"){

            }else{
                var js2 = {userid: GlobalClass.UserInfo.str_UserID,num:msgNum,guildid:GlobalClass.ClubClass.ClubID};
                WebSocketMgr.getInstance().SendOneceMsg(MsgID.CHAT.ChatGetClub,JSON.stringify(js2));  
            }
        }
    }

    private firstEnterPage(){
        if (GlobalClass.GameInfoForConfig.openChatWorld==1){
            this.EnterPage(1);
        }else{
            if (GlobalClass.GameInfoForConfig.openChatGuild==1){
                this.EnterPage(2);

                this.mPanel.PageWorld.visible = false;
                this.mPanel.PageClub.x = this.mPanel.PageWorld.x;
            }
        }

        // if(GlobalClass.GameInfoForConfig.openChatWorld==0){
        //     this.mPanel.PageWorld.visible = false;
        //     this.mPanel.PageClub.x = this.mPanel.PageWorld.x;
        // }else if(GlobalClass.GameInfoForConfig.openChatGuild == 0){
        //     this.mPanel.PageClub.visible = false;
        // }else{
            
        // }
    }

    private EnterPage(type){
        this.PanelChatCurr = type;
        if(type==1){//世界
            this.mPanel.chatWolrdScroller.visible = true;
            this.mPanel.chatClubScroller.visible = false;
            this.mPanel.PageWorld.seleted = true;
        }else{//公会
            this.mPanel.chatClubScroller.visible = true;
            this.mPanel.chatWolrdScroller.visible = false;
            this.mPanel.PageClub.seleted = true;
        }

        this.refreshText();
    }

    private Btn_CloseTipsClick(){
        this.mPanel.TipsPanel.visible = false;
    }
    private PageWorldClick(){
        this.EnterPage(1);
    }
    private SwitchHideClick(){
        this.mPanel.SwitchShow.visible = true;
        this.mPanel.ChatCont.visible = false;
        this.mPanel.InputChar.text = "";
    }
    private PageClubClick(){
        if(GlobalClass.GameInfoForConfig.openChatGuild==1&&GlobalClass.ClubClass.ClubID!="0"){
            this.EnterPage(2);
        }else{
             KFControllerMgr.showTips("请先加入公会",0,2,()=>{
                KFControllerMgr.getCtl(PanelName.ClubPanel).show();
            }); 
        }
    }
    private Btn_OpenShopClick(){
        
    }
    private Btn_Send_DeleteClick(){
        this.mPanel.InputChar.text = "";
        this.InputCharChange();
    }
    private Btn_Send_MSNClick(){
         if(this.mPanel.InputChar.text.length==0){
             KFControllerMgr.showTips("请输入聊天内容",0,1);
            return;
         }
        if((this.PanelChatCurr==1 && this.worldCost>0) || (this.PanelChatCurr == 2 && this.clubCost > 0)){
            if (ChatProtocol.LoudNum<=0){
                KFControllerMgr.showTips("你没有喇叭了",0,1);
                return;
            }
        }
        var date = new Date().getTime();
        if(this.PanelChatCurr==1){
             if(date - this.sendWorldTime < this.timeOutWorld) {
                KFControllerMgr.showTips("世界聊天冷却中",0,1);
                return ;
             }
        }else if(this.PanelChatCurr==2){
            if(date - this.sendGuildTime < this.timeOutGuild) {
                KFControllerMgr.showTips("公会聊天冷却中",0,1);
                return ;
             }
        }
        
        if(this.PanelChatCurr==1){
            var js = {userid: GlobalClass.UserInfo.str_UserID,content:this.mPanel.InputChar.text};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CHAT.ChatChatWorld,JSON.stringify(js));
            this.sendWorldTime = date;
        }else if(this.PanelChatCurr==2){
            var js2 = {userid: GlobalClass.UserInfo.str_UserID,content:this.mPanel.InputChar.text,guildid:GlobalClass.ClubClass.ClubID};
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.CHAT.ChatChatClub,JSON.stringify(js2));
            this.sendGuildTime = date;
        }
        this.addMsg(GlobalClass.UserInfo.str_UserNickname,GlobalClass.TaskClass.str_VIPStatus,this.ChatType_character,this.mPanel.InputChar.text,date);

        this.mPanel.InputChar.text = "";
    }
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.mPanel.ChatCont.visible = false;
        this.mPanel.TipsPanel.visible = false;

        this.mPanel.BtnSoundSwitch.visible = false;
        this.mPanel.Btn_Send_fast.visible = false;

        
        

        this.ChangeShow(false);
    }

    private InputCharChange(){
        // this.mPanel.Btn_Send_fast.visible =  this.mPanel.InputChar.text.length == 0 ;
        this.mPanel.Btn_Send_Delete.visible = this.mPanel.InputChar.text.length != 0 ;
        this.mPanel.PanelSelect.visible =false;
    }
	
    
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.InputChar,egret.Event.CHANGE,this.InputCharChange,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.InputChar,egret.Event.CHANGE,this.InputCharChange,this);
    }
    

    
}