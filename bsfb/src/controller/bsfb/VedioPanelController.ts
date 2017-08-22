/**
 *
 * @author 
 *
 */


class PStruct  {
    public name:string;
    public type:number;
    public x:string;
    public y:string;
    constructor(_x:string,_y:string,_name?:string,_type?:number){
        this.x = _x;
        this.y = _y;
        this.name = _name;
        this.type = _type;
    }
}

class VedioPanelController extends KFController{ 
    private isAutoPay:boolean = false;
    private haveInited:boolean = false;
    private levelHaveShow:boolean = false;
    private pieceList = [];
    private pieceListDic = null;
    private groupBallanceList = null;
    private VedioKeyList = null;
    private int_currentGroup = 0;//
    private int_currentTurn = 0;//
    private int_groupInRound = 0;//
    private int_turnsThisRound = 0;//
    private showType = 1; //1 正常押注 2 播放公共视频 3 播放个人视频 4 直接进入龙珠探宝
    private betData :string;//押注数据
    public Go_digger_obj;
    private turnDesData;
    private f_upFallDelayTime;
    private publicVedioItemList:Array<Object>;
    private myVedioItemList:Array<Object>;
    private currentPage = 0;
    private awardTex;
    private slotWinDisplay;
    private SlotTimer:egret.Timer;
    private f_brickBeforeVedio;
    private playScore;
	
	protected init(){
    	super.init();
        this.initData();
        this.EventsList = [
            MsgID.BSFB.VEDIO_ITEMS,
            MsgID.BSFB.GET_VEDIOCODE,
            MsgID.USER.LOUDERSPEAKER_MSG,
        ];
	}

    private paticleCB;
	private particleHaveRead = false;
	private particleSystem:particle.GravityParticleSystem;
	private loadParticl(){
		if(!this.particleHaveRead){
			this.paticleCB = (event:RES.ResourceEvent)=>{
			if (event.groupName == "particle") {
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.paticleCB, this);
				this.paticleCB = null;
				this.particleSystem = new particle.GravityParticleSystem(RES.getRes("zhongjiang_png"), RES.getRes("zhongjiang_json"));
				this.particleHaveRead = true;
                //将例子系统添加到舞台
                this.mPanel.ParticleGroup.addChild(this.particleSystem);
                this.particleSystem.x = -600;
                this.particleSystem.y = -200;
			}
			};
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.paticleCB , this);

			RES.loadGroup("particle");
		}
	}

    private playWinParticle(){
        if(this.particleHaveRead ){
             this.particleSystem.start();
             this.particleSystem.visible = true;
        }
    }

    private hideWinParticle(){
        if(this.particleHaveRead&&this.particleSystem!=null){
             this.particleSystem.stop();
             this.particleSystem.visible = false;
        }
    }

    private on154_event(event: egret.Event): void {
        console.log("on154_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        // var datastr = "data=154%-1%-1%恭喜玩家[FFFF00]独行侠ly[-]在本轮获得最高点数[FFFF00]80000[-]点%FF0000%0%0";
        var str_Param = datastr.split("%");
        var isvip =  str_Param[6];
        var text = "[" + str_Param[4] + "]" + str_Param[3] + "[-]";
        if (str_Param [2] == GlobalClass.UserInfo.str_UserAccount && str_Param[5] == "2") {
			//中奖消息，延迟到结算之后
             var obj = new Object();
            obj["txt"] = text;
            obj["vip"] = Number(isvip);
            this.awardTex = [obj];
		} else {
             var obj = new Object();
            obj["txt"] = text;
            obj["vip"] = Number(isvip);
            var js = [obj];
            this.mPanel.louderspeaker.show();
            this.mPanel.louderspeaker.pushMarquees(js);
		}
    }

    private on182_event(event: egret.Event): void {
        console.log("on182_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if(this.publicVedioItemList.length>0){
            this.publicVedioItemList.pop();
        }
        if (strArray.length > 2&&strArray[2]!=""){
            var str_VedioInfo_Group = strArray[2].split( ";");
            var str_VedioID_Group = [];
            var str_VedioNickName_Group = [];
            var str_VedioTitle_Group = [];
            var str_VedioPlayTimes_Group = [];
            for (var i = 0,len = str_VedioInfo_Group.length; i < len; i++) {
                var _str_VIPinfo = str_VedioInfo_Group[i].split("#");
                var obj = new Object();
                obj["ID"] = _str_VIPinfo[0];
                obj["NickName"] = _str_VIPinfo[1];
                obj["Title"] = _str_VIPinfo[2];
                obj["PlayTimes"] = _str_VIPinfo[3];
                obj["type"] = 1;
                this.publicVedioItemList.push(obj);
            }
            if (Number(strArray[1]) < 0){
                var obj = new Object();
                obj["type"] = 3;
                this.publicVedioItemList.push(obj);
            }else{
                var obj = new Object();
                obj["type"] = 2;
                this.publicVedioItemList.push(obj);
            }
        }else{
            if( this.publicVedioItemList.length>0){
                if (Number(strArray[1]) < 0){
                    var obj = new Object();
                    obj["type"] = 3;
                    this.publicVedioItemList.push(obj);
                }
            }
            
        }
         
        var collection = new eui.ArrayCollection();
        collection.source = this.publicVedioItemList;
        this.mPanel.PublicVediolist.dataProvider = collection;   
    }
    private on183_event(event: egret.Event): void {
        console.log("on183_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        if(strArray[2]=="-1"){
            KFControllerMgr.showTips(LocalizationMgr.getText(TipTexts.A1070),2);
        }else{
            this.PlayPublicVedio(strArray[2]);
        }
    }

    public PlaySelfVedio(vedioData:string){
        this.showNick(GlobalClass.UserInfo.str_UserNickname);
        this.PlayVedio(vedioData);
    }

    public PlayPublicVedio(vedioData:string){
       
        var data = vedioData.replace(/&/g, '%');
        this.PlayVedio(data);
    }

    public showNick(nickName){
         this.mPanel.nick.visible =  true;
        this.mPanel.nick.text = nickName;
    }

    private resetPanel(){
        this.hideWinSLot();
        this.ShowLevel();
    }

    public show(){
        super.show();
    }

    public setType(type:number):any{

        this.showType = type;
        return this;
    }

    private startPlaying(){
        console.log("startPlaying");
        this.resetPanel();
        if (this.showType!=1)
        {
            this.mPanel.LeftHide.visible = true;
            this.mPanel.RightHide.visible = true;
        }

        if(this.showType!=1){
            this.disableBut(this.mPanel.Btn_Close);
        }
        this.mPanel.Label_WinningScore.visible = false;
        this.initLevel();
        this.ShowBrick();
        if(this.pieceList!=null&&this.pieceList.length>0){
            this.ShowSpit();
        }else{
            this.Playing();
        }
    }
	
    protected onReady() {
        this.mPanel.NewBie.visible = false;
        if(!this.haveInited){

        
        AnimationMgr.getInstance().loadDiamond(()=>{
            KFControllerMgr.getCtl(PanelName.GamePanel).diamondReady();
        },this);
            AnimationMgr.getInstance().loadSkeleton(()=>{
                // this.showWinSlot();
                // this.showEnterLZTB();
                if(!GlobalClass.UserInfo.isNewbie){
                    this.ShowLevel();
                }
                KFControllerMgr.getCtl(PanelName.GamePanel).ShowSLotAni();
            },this);
        }
        this.ShowBrick();
        
        this.loadParticl();

        this.mPanel.LeftHide.visible = false;
        this.mPanel.RightHide.visible = false;
        this.mPanel.Label_Go_Slot.visible = false;
    }

    private showEnterLZTB(){
        var s = AnimationMgr.getInstance().getSkeleton(skeletonType.BSFB_go_Lztb,160,200);
        this.mPanel.GamePanel.addChild(s .display);
         s.addEventListener( dragonBones.AnimationEvent.LOOP_COMPLETE, ()=>{
                dragonBones.WorldClock.clock.remove(s );
                this.mPanel.GamePanel.removeChild(s .display);
                 KFSceneManager.getInstance().replaceScene(SceneName.LZTB);
            },this);
        
        s.animation.play();
    }
     private showWinSlot(){
        this.slotWinDisplay = AnimationMgr.getInstance().getSkeleton(skeletonType.Bsfb_Go_Slot,160,320);
        this.mPanel.winslotGroup.addChild(this.slotWinDisplay.display);
        this.invoke(GlobalClass.Speed.showWinSlot,()=>{
            this.slotWinDisplay.animation.stop("Bsfb_Go_Slot");
            this.playWinParticle();
            this.mPanel.Label_Go_Slot.visible = true;
            this.mPanel.Label_Go_Slot.text = GlobalClass.UserInfo.str_Game_slotScore;
        },this);

        this.slotWinDisplay.addEventListener( dragonBones.AnimationEvent.LOOP_COMPLETE, ()=>{
                dragonBones.WorldClock.clock.remove(this.slotWinDisplay);
                this.mPanel.winslotGroup.removeChild(this.slotWinDisplay.display);
                this.slotWinDisplay = null;
            },this);
        
        this.slotWinDisplay.animation.play();

        this.SlotTimer = new egret.Timer(20*1000,1);
        this.SlotTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
            this.ContinueWinSLot();
        },this);
        this.SlotTimer.start();
    }
    private ContinueWinSLot(){
        if(this.slotWinDisplay!=null){
            this.slotWinDisplay.animation.play();
            this.hideWinParticle();
            this.mPanel.Label_Go_Slot.visible = false;
        }
        NetEventMgr.getInstance().clientMsg(MsgID.Client.BSFBSlotEnd,"");
    }

    private hideWinSLot(){
         if(this.slotWinDisplay!=null){
            this.slotWinDisplay.animation.stop();
            dragonBones.WorldClock.clock.remove(this.slotWinDisplay);
            this.mPanel.winslotGroup.removeChild(this.slotWinDisplay.display);
            this.slotWinDisplay = null;
            this.hideWinParticle();
            this.mPanel.Label_Go_Slot.visible = false;
        }
        if(this.SlotTimer!=null){
            this.SlotTimer.reset();
            this.SlotTimer = null;
        }
    }

    protected onShow(){
        this.mPanel.GamePanel.visible = false;
        this.mPanel.UIPanel.visible = false;
        if(this.showType==1){
            this.mPanel.GamePanel.visible = true;
        }else{
            this.mPanel.UIPanel.visible = true;
             this.mPanel.GamePanel.visible = true;
        }
        this.mPanel.Label_WinningScore.visible = false;
        this.mPanel.nick.visible = false;

        if(this.showType==2||this.showType==3){
            this.currentPage = 0;
            this.initList();

            this.f_brickBeforeVedio = new Array(3);
            this.f_brickBeforeVedio[0] = GlobalClass.GameClass.f_brickArray[0];
            this.f_brickBeforeVedio[1] = GlobalClass.GameClass.f_brickArray[1];
            this.f_brickBeforeVedio[2] = GlobalClass.GameClass.f_brickArray[2];
        }
        this.mPanel.bricktipGroup.visible = false;
    }

    public initNewbie(){
        this.initLevel();

        this.playAnimation(this.mPanel.ArrowAni,true);
        this.playAnimation(this.mPanel.HandAni,true);

        this.mPanel.louderspeaker.visible = false;

        this.mPanel.newbieGroup.visible = true;
        this.mPanel.NewBie.visible = true;

        this.mPanel.Go_Tips_NewBie.visible = false;
        this.mPanel.hand.visible = false;
        this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]欢迎闯入新手引导！[-]");
        this.mPanel.Btn_NewBieBinding.visible = false;
        this.mPanel.Btn_NoBinding.visible = false;
		this.mPanel.Btn_StartGame.visible = false;
        this.mPanel.arrow.visible = false;
        this.mPanel.Go_Add_NewBie.visible = false;
        this.mPanel.Go_Minus_NewBie.visible = false;
        this.mPanel.Go_Drill_NewBie.visible = false;
        this.mPanel.Go_Bricks_NewBie.visible = false;
        this.mPanel.Go_Jewel_NewBie.visible = false;

        this.mPanel.Btn_NewBieSkip.visible = true;

        this.mPanel.newbieGroup.x = 306;
        this.mPanel.newbieGroup.y = 150;
    }

    // 拍出4个        连线\n横竖相邻不少于4个时即可获得奖励
    public NewBie(){
        this.mPanel.newbieGroup.x = 580;
        this.mPanel.newbieGroup.y = 170;
        this.mPanel.Go_Add_NewBie.visible = true;
        this.mPanel.Go_Minus_NewBie.visible = true;
        this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]点击     或     选择线数到5[-]");
        this.mPanel.arrow.x = 776;
        this.mPanel.arrow.y = 270;
        this.mPanel.arrow.visible = true;
    }

    public onSliderChange(){
        this.mPanel.hand.visible = false;
        this.mPanel.arrow.visible = true;
        this.mPanel.newbieGroup.x = 562;
        this.mPanel.newbieGroup.y = 282;
        this.mPanel.arrow.x = 677;
        this.mPanel.arrow.y = 391;
        this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]开始游戏[-]");
    }

    public AddlineClick(){
        this.mPanel.Go_Add_NewBie.visible = false;
        this.mPanel.Go_Minus_NewBie.visible = false;
        this.mPanel.hand.visible = true;
        this.mPanel.arrow.visible = false;
        this.mPanel.newbieGroup.x = 358;
        this.mPanel.newbieGroup.y = 324;
        this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]拖动滑块选择单线点数！[-]");         
    }

    public CreatMyVedioData(){
        this.myVedioItemList = new Array<Object>();
        var s2 = egret.localStorage.getItem(GlobalClass.UserInfo.str_UserID + "MyVedioKey");
        if(s2==null){
            s2 = "";
        }
        // var s2 = "2971002265&null";
		var _str = s2.split("&");
        for (var i = 0 ,len = _str.length; i < len; i++)
        {
            if(_str[i]!=""&&_str[i]!="null"){
                var value = egret.localStorage.getItem(_str[i]);
                // var value = '102%-1%408633%0%2295552%409163%530%2295552%0%5,5,1,3;2,2,2,2;30,2,2,3;5,2,1,2;%2,5,3,2,3,5,1,3,1,2,3,1,;1,5,4,4,2,4,1,1,5,4,3,4,;5,5,4,5,1,1,3,3,2,3,2,3,;4,3,5,4,5,1,2,3,4,2,2,5,;%1%2,0%4,15,15%2,8,30,30;5,7,500,500;%1,0;1,1;2,1;1,2;3,1;2,2;1,3;3,0;#$0,0;1,0;0,1;2,0;2,1;2,2;3,2;#$$%0%0%1493016498@636286421007240801';
                var obj = new Object();
                obj["vedioKey"] =_str[i];
                obj["vedioData"] = value;
                obj["type"] = 0;
                if(value!=null&&value!=""){
                    if(value.indexOf("@")>=0){
                        var strArray = value.split("@");
                        obj["Time"] = CommonFuc.getDateString(strArray[1]);
                    }else{
                        obj["Time"] = "未知时间";
                    }
                }
            
                this.myVedioItemList.push(obj);
            }
        }
        var collection = new eui.ArrayCollection();
        collection.source = this.myVedioItemList;
        this.mPanel.MyVedioList.dataProvider = collection;  
    }

    public LoadMorePublicVedio(){
        this.currentPage ++;
        var a = this.currentPage+"";
        var js = { Page: a};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.VEDIO_ITEMS,JSON.stringify(js));
    }

    public RenewPublicVedio(){
        this.publicVedioItemList = new Array<Object>();
        this.currentPage = 0;
        this.LoadMorePublicVedio();
    }

    private initList(){
        this.LoadMorePublicVedio();
       this.CreatMyVedioData();
    }

    

    public initData():any{
        this.pieceList = [];
        this.pieceListDic = {};
        this.groupBallanceList = [];
        this.VedioKeyList = [];
        this.haveInited = true;
        this.int_currentGroup = 0;
        this.int_currentTurn = 0;
        this.int_groupInRound = 0;
        this.int_turnsThisRound = 0;
        this.isAutoPay = false;

        this.publicVedioItemList = new Array<Object>();
        this.myVedioItemList = new Array<Object>();
        this.currentPage = 0;
        return this;
    }

    //天女散花
    private ShowSpit(){
        SoundMgr.Instance.palyGemSpreadOutEffect();
        this.pieceList.forEach(ps => {
            ps.beginpSplit();
        });
        
        
        this.invoke(GlobalClass.Speed.OnSplitBegin,this.Playing,this);
        this.initData();
    }

    private Playing(){
        if (GlobalClass.UserInfo.isNewbie)
        {
            this.disableBut(this.mPanel.Btn_NewBieSkip);
        }

        NetEventMgr.getInstance().clientMsg(MsgID.Client.BSFBSplitEnd,"");
        this.turnDesData = this.GetTurnDesData(GlobalClass.GameClass.str_turnDesData);
        this.CreateAndShow(GlobalClass.GameClass.str_init,GlobalClass.GameClass.str_suppliment);
        // this.ShowBrick();
        this.int_groupInRound = 0;


         if (GlobalClass.UserInfo.isNewbie){
            switch (this.int_NewBitID){
                case 2:
                       this.invoke(1,()=>{
                            this.mPanel.newbieGroup.visible = true;
                            this.mPanel.arrow.x = 440;
                            this.mPanel.arrow.y = 240;
                            this.mPanel.newbieGroup.x = 300;
                            this.mPanel.newbieGroup.y = 120;
                            this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]拍出[F6FF00]4个[-]        连线\n横竖相邻不少于4个时即可获得奖励[-]"); 
                            this.mPanel.Go_Tips_NewBie.visible = true;
                            this.mPanel.Go_Jewel_NewBie.visible = true;
                            this.mPanel.Go_Drill_NewBievisible = false;
                            this.mPanel.Go_Bricks_NewBievisible = false;
                            this.invoke(2,()=>{
                                this.groupDispear();
                                this.mPanel.Go_Tips_NewBie.visible = false;
                            },this);
                       },this);
                            
                            break;
                        case 3:
                         this.invoke(1,()=>{
                            this.mPanel.newbieGroup.visible = true;
                            this.mPanel.arrow.visible = true;
                            this.mPanel.arrow.x = 465;
                            this.mPanel.arrow.y = 240;
                            this.mPanel.newbieGroup.x = 300;
                            this.mPanel.newbieGroup.y = 120;
                            this.mPanel.Go_Bricks_NewBie.x = 194;
                            this.mPanel.Go_Bricks_NewBie.y = 30;
                            this.mPanel.Go_Drill_NewBie.x = 58;
                            this.mPanel.Go_Drill_NewBie.y = 16;
                            this.mPanel.Go_Drill_NewBie.visible = true;
                            this.mPanel.Go_Bricks_NewBie.visible = true;
                            this.mPanel.Go_Jewel_NewBievisible = false;
                            this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]爆炸消除一个[-]");
                              this.invoke(3,()=>{   
                                this.mPanel.arrow.x = 628;
                                this.mPanel.arrow.y = 120;
                                this.mPanel.Go_Bricks_NewBie.x = 115;
                                this.mPanel.Go_Bricks_NewBie.y = 30;
                                this.mPanel.Go_Drill_NewBie.x = 31;
                                this.mPanel.Go_Drill_NewBie.y = 20;
                                this.mPanel.arrow.rotation = 90;
                                this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]   爆完[F6FF00]15个[-]     杀入下一关[-]");
                                this.groupDispear();
                            },this);
                       },this);
                           
                            break;
                        default:
                            this.groupDispear();
                            break;
                    }

        }else{
             //有东西可以消除
            this.groupDispear();
        }
       
    }

    private groupDispear(){
        if((this.turnDesData!=null) || (this.turnDesData ==null && this.Go_digger_obj!=null)){
            if (GlobalClass.GameClass.int_level == 0){
                this.invoke(GlobalClass.Speed.StartNewGroup0,this.NewGroup,this)
            }else if (GlobalClass.GameClass.int_level == 1){
                this.invoke(GlobalClass.Speed.StartNewGroup1,this.NewGroup,this)
            }else if (GlobalClass.GameClass.int_level == 2){
                this.invoke(GlobalClass.Speed.StartNewGroup2,this.NewGroup,this) //6.2f
             }
        }else{
            if (GlobalClass.GameClass.int_level == 0){
                this.invoke(GlobalClass.Speed.StartShowRoundBallance0,this.ShowRoundBallance,this)
            }else if (GlobalClass.GameClass.int_level == 1){
                this.invoke(GlobalClass.Speed.StartShowRoundBallance1,this.ShowRoundBallance,this)
            }else if (GlobalClass.GameClass.int_level == 2){
                this.invoke(GlobalClass.Speed.StartShowRoundBallance2,this.ShowRoundBallance,this) //6.2f
             }
        }
    }

    private NewGroup(){
        console.log("NewGroup");
        if(this.Go_digger_obj!=null){//有钻头的情况
            console.log("self.Go_digger_obj ~= nil");
            this.ShowDiggerExplosion();
            this.PlayBrickAnim();
            this.ShowBrick();
            this.invoke(GlobalClass.Speed.ShowUpFall,this.ShowUpFall,this);
            this.invoke(GlobalClass.Speed.DiggerFallBallance,this.DiggerFallBallance,this);
        }else{//无钻头的情况
            this.ShowGroupExplosion();
            this.ShowGroupBallance();
            this.int_currentGroup++;
            this.int_groupInRound++;
            //本回合未结束(继续消除，并不下落)
            if (this.int_currentGroup < this.turnDesData[this.int_currentTurn].length)   //当前组合跟本回合的总组合数比较
            {
                this.invoke(GlobalClass.Speed.NewGroup,this.NewGroup,this); //1.0f   //连消组合之间相隔1s
            }//本回合结束
            else{//上方宝石下落.回合结算
                this.invoke(GlobalClass.Speed.ShowUpFall,this.ShowUpFall,this); //1.0f   //消除和下落之间相隔1s
                this.invoke(GlobalClass.Speed.FallBallance,this.FallBallance,this); //1.0f
            }
        }
    }

    public showTrustBG(){
        this.mPanel.TrustBG.visible = true;
    }

    public hideTrustBG(){
        this.mPanel.TrustBG.visible = false;
    }

    private Btn_CloseTrustBGClick(){
        this.hideTrustBG();
    }

    private ShowGroupBallance(){
        var scoreItem = new ScoreItem(this.GetGroupPieceAmount() + "",this.GetGroupTotalScore() + "",this.GetGroupType());

        this.mPanel.scoreGroup.addChild(scoreItem);
        scoreItem.x = 170;
        scoreItem.y = 265;
        scoreItem.scaleX = 0.01;
        scoreItem.scaleY = 0.01;

        scoreItem.anchorOffsetX = scoreItem.width/2;
        scoreItem.anchorOffsetY = scoreItem.height/2;
        egret.Tween.get(scoreItem).to({scaleX:0.8,scaleY:0.8,y : 210},200).to({scaleX:1.1,scaleY:1.1,y : 180},100).to({scaleX:1.16,scaleY:1.16,y : 150},100).to({scaleX:0.8,scaleY:0.8,y : 0},800).to({y : -200},1200).call(function (){
				scoreItem.visible = false;
                this.mPanel.scoreGroup.removeChild(scoreItem);
		},this);
    }

    private UpdateCurrentScore(){
        NetEventMgr.getInstance().clientMsg(MsgID.Client.BSFBUpdateScore,"");
    }

    private ShowRoundBallance(){
        var i = Number(GlobalClass.UserInfo.str_Game_currentTodayScore) - Number(GlobalClass.UserInfo.str_Game_lastTodayScore);

        //本局得分
        if (i != 0||this.showType!=1)
        {
            this.mPanel.Label_WinningScore.visible = true;

            this.mPanel.Label_WinningScore.text = i + "";

            if(this.showType!=1){
                this.mPanel.Label_WinningScore.text = this.playScore + "";
            }
            
            if (this.showType==1)
            {
                 if(this.awardTex!=null){
                    this.mPanel.louderspeaker.pushMarquees(this.awardTex);
                    this.awardTex = null;
                }
            }
        }
        if (this.showType==1)
        {
            this.UpdateCurrentScore();

            if (GlobalClass.GameClass.int_level==0&&GlobalClass.GameClass.f_brickArray[0] == 0 && GlobalClass.GameClass.f_brickArray[1] ==15)
            {
                GlobalClass.GameClass.int_level = 1;
                this.showLevelAni(1);
            }
            else if (GlobalClass.GameClass.int_level==1&& GlobalClass.GameClass.f_brickArray[1] == 0 && GlobalClass.GameClass.f_brickArray[2] == 15)
            {
                GlobalClass.GameClass.int_level=2;
                this.showLevelAni(2);
            }

             if (GlobalClass.UserInfo.Game_isEnterLZTB)
            {
                this.mPanel.Label_WinningScore.visible = false;
                this.showEnterLZTB();
            }
        }else{
            this.mPanel.LeftHide.visible = false;
            this.mPanel.RightHide.visible = false;
            this.enableBut(this.mPanel.Btn_Close);
        }

        if(GlobalClass.UserInfo.Game_isSlot){
            this.showWinSlot();
        }
        
        if (GlobalClass.UserInfo.isNewbie){//新手教程
            switch (this.int_NewBitID)
            {
                case 2:
                    this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]恭喜您赢得[F6FF00]100点数[-]！\n请继续游戏![-]");
                    this.mPanel.arrow.x = 677;
                    this.mPanel.arrow.y = 391;
                    KFControllerMgr.getCtl(PanelName.GamePanel).newBieBallance();
                    this.enableBut(this.mPanel.Btn_NewBieSkip);
                    this.mPanel.Go_Jewel_NewBie.visible = false;
                    this.mPanel.Go_Tips_NewBie.visible = false;
                    break;
                case 3:
                    this.mPanel.arrow.visible = true;
                    KFControllerMgr.getCtl(PanelName.GamePanel).newBieBallance();
                    this.enableBut(this.mPanel.Btn_NewBieSkip);
                    break;
                case 4:
                    KFControllerMgr.getCtl(PanelName.GamePanel).newBieBallance();
                    this.enableBut(this.mPanel.Btn_NewBieSkip);
                    break;
                case 5:
                    KFControllerMgr.getCtl(PanelName.GamePanel).newBieBallance();
                    this.enableBut(this.mPanel.Btn_NewBieSkip);
                    break;
                case 6:
                    KFControllerMgr.getCtl(PanelName.GamePanel).newBieBallance();
                    this.enableBut(this.mPanel.Btn_NewBieSkip);
                    break;
                case 7:
                    this.invoke(1,this.NewbieOver,this);
                    break;
                default:
                    break;
            }
        }
         if (this.showType==1){
              NetEventMgr.getInstance().clientMsg(MsgID.Client.BSFBTurnFinish,"")
        }
    }

    private NewbieOver(){
        this.mPanel.newbieGroup.visible = true;
        this.mPanel.newbieGroup.x = 300;
        this.mPanel.newbieGroup.y = 125;
        this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]哇!居然连续中了三次！\n\r恭喜您完成新手引导！[-]");
        this.mPanel.Go_Drill_NewBie.visible = false;
        this.mPanel.Go_Bricks_NewBie.visible = false;
        this.mPanel.arrow.visible =true;
        this.mPanel.arrow.x = 20;
        this.mPanel.arrow.y = 20;
        this.mPanel.arrow.rotation = 0;
       if(GlobalClass.HallClass.str_OpenBindingPhone == "1" && GlobalClass.HallClass.int_OpenBinding == 1&&GlobalClass.HallClass.str_BindingPhone == "0")
        {
            this.invoke(4,()=>{
                this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]绑定手机即可保留新手引导\n\r中获得的点数。[-]");
                this.mPanel.Btn_NoBinding.visible =true;
                this.mPanel.Btn_NewBieBinding.visible =true;
                this.mPanel.newbieGroup.x = 300;
                this.mPanel.newbieGroup.y = 95;

                 this.enableBut(this.mPanel.Btn_NewBieSkip);
                this.mPanel.Btn_NewBieSkip.visible = false;
                this.mPanel.Go_Jewel_NewBie.visible = false;
                this.mPanel.arrow.visible = false;
                // GlobalClass.UserInfo.str_Game_lastSlotScore = this.str_SlotScore;
                // this.mPanel.Label_SlotScore.text = this.str_SlotScore;
            },this);
            
		}
		else
		{
			this.mPanel.Btn_StartGame.visible =true;

            this.enableBut(this.mPanel.Btn_NewBieSkip);
            this.mPanel.Btn_NewBieSkip.visible = false;
            this.mPanel.Go_Jewel_NewBie.visible = false;
            this.mPanel.arrow.visible = false;
            // GlobalClass.UserInfo.str_Game_lastSlotScore = this.str_SlotScore;
        // this.mPanel.Label_SlotScore.text = this.str_SlotScore;
		}
       

        

    }

    private int_NewBitID = 1;
    public newbieBet(id){
         switch (this.int_NewBitID)
            {
                //2线100点  出现钻头 赢钱200
                case 1:
                    this.mPanel.newbieGroup.visible = false;
                    
                    this.int_NewBitID = 2;
                    break;
                case 2:
                    this.mPanel.newbieGroup.visible = false;
                    this.mPanel.arrow.visible = false;
                    this.int_NewBitID = 3;
                    break;
                case 3:
                    this.mPanel.newbieGroup.visible = false;
                    this.mPanel.arrow.visible = false;
                    this.int_NewBitID = 4;
                    break;
                case 4:
                    this.mPanel.arrow.visible = false;
                    this.int_NewBitID = 5;
                    break;
                case 5:
                    this.mPanel.arrow.visible = false;
                    this.int_NewBitID = 6;
                    break;
                //5线100点  赢了8000
                case 6:
                    this.mPanel.newbieGroup.visible = false;
                    this.int_NewBitID = 7;
                    break;

            }
    }

    private PlayBrickAnim(){
        var posx,posy;
        if (GlobalClass.GameClass.int_level == 0 && GlobalClass.GameClass.f_brickArray[0] > 0)
        {
            var index = 15-GlobalClass.GameClass.f_brickArray[0];
            posx = this.mPanel.wallRight.getChildAt(index).x+this.mPanel.wallRight.x-40;
            posy = this.mPanel.wallRight.getChildAt(index).y+this.mPanel.wallRight.y-40;
            GlobalClass.GameClass.f_brickArray[0]--;
         }
        else if (GlobalClass.GameClass.int_level == 1 && GlobalClass.GameClass.f_brickArray[1] > 0)
        {
            var index = 15-GlobalClass.GameClass.f_brickArray[1];
            posx = this.mPanel.wallLeft.getChildAt(index).x+this.mPanel.wallLeft.x-40;
            posy = this.mPanel.wallLeft.getChildAt(index).y+this.mPanel.wallLeft.y-40;
            GlobalClass.GameClass.f_brickArray[1]--;
         }
        else if (GlobalClass.GameClass.int_level == 2 && GlobalClass.GameClass.f_brickArray[2] > 0)
        {
            var index = 15-GlobalClass.GameClass.f_brickArray[2];
            posx = this.mPanel.wallBottom.getChildAt(index).x+this.mPanel.wallBottom.x-45;
            posy = this.mPanel.wallBottom.getChildAt(index).y+this.mPanel.wallBottom.y-40;
            GlobalClass.GameClass.f_brickArray[2]--;
        }
        var ani = AnimationMgr.getInstance().getDiamond(DiamondType.brick,posx,posy,0.5);
        ani.frameRate = GlobalClass.Speed.brickframeRate;
        ani.play();
        this.mPanel.DiamondPanel.addChild(ani);
    }

    private DiggerFallBallance(){
        if (GlobalClass.GameClass.str_turnDesData != "null$")          //有宝石消除 
        {
            var a = 0;
            console.log("有宝石消除");
            this.invoke(this.f_upFallDelayTime + a,this.FallSoundStop,this);//下落音效停止,此时upFallDelayTime已被赋值
            this.invoke(this.f_upFallDelayTime + GlobalClass.Speed.DiggerFallBallanceTime + a,this.NewGroup,this);//0.6f //1.0f     //0.4f    //下落和下一次爆炸之间相隔1s
        }
        else                                    //无宝石消除
        {
            this.invoke(this.f_upFallDelayTime + a,this.FallSoundStop,this); //下落音效停止
            this.invoke(this.f_upFallDelayTime + GlobalClass.Speed.DiggerFallBallanceTime,this.ShowRoundBallance,this);//0.6f
        }
    }

    private FallBallance()
    {
        this.int_currentTurn++;
        this.int_currentGroup = 0;

        //本局结束(没有下一回合了)
        if (this.int_currentTurn > (this.int_turnsThisRound - 1))
        {
            this.invoke(this.f_upFallDelayTime + GlobalClass.Speed.FallBallanceTime,this.ShowRoundBallance,this);//0.3f
            this.invoke(this.f_upFallDelayTime,this.FallSoundStop,this); //下落音效停止
        }
        //进入下一回合
        else
        {
            this.invoke(this.f_upFallDelayTime,this.FallSoundStop,this); //下落音效停止
            this.invoke(this.f_upFallDelayTime + GlobalClass.Speed.FallBallanceTime,this.NewGroup,this);//0.3f
        }
    }

    private CreateAndShow(initStr:string,supplimentStr:string){
        console.log("initStr="+initStr);
        this.invoke(GlobalClass.Speed.playDownEffect,()=>{
            SoundMgr.Instance.playDownEffect();
        },this);
        var tmpList = this.GetInitPieces(initStr);
        var str = "init:";
        var startY = Diamond.initY;
        tmpList.forEach(ps => {
            var px = Number(ps.x);
            var x = this.getPosX(px);
            var y = startY;
            var mode = this.getMode(ps.type);
            if(ps.type==30){
                mode = DiamondType.digger;
                this.Go_digger_obj = AnimationMgr.getInstance().getDiamond(mode,x,y);
                this.Go_digger_obj.name = "digger";
                this.Go_digger_obj.targetX = ps.x;
                this.Go_digger_obj.targetY = ps.y;
                this.Go_digger_obj.currentY = 10+"";
                this.Go_digger_obj.type = ps.type;
                this.pieceList.push(this.Go_digger_obj);
                this.mPanel.DiamondPanel.addChild(this.Go_digger_obj);
            }else{
                var clip = AnimationMgr.getInstance().getDiamond(mode,x,y);
                clip.name = ps.name;
                clip.targetX = ps.x;
                clip.targetY = ps.y;
                clip.currentY = 10+"";
                clip.type = ps.type;
                clip.isSuppliment = false;
                this.pieceList.push(clip);
                str += ps.x + ":" + ps.y + ":" + ps.type + ";";
                this.mPanel.DiamondPanel.addChild(clip);
            }
        });

        console.log("supplimentStr="+supplimentStr);
        var supplementList = this.GetSuppliment(supplimentStr);
        supplementList.forEach(ps => {
            var px = Number(ps.x);
            var x = this.getPosX(px);
            var y = startY;
            var mode = this.getMode(ps.type);
            //起点坐标：（左下角）(-1,-2.1)  右上角：(2.5,1.4) Xper0.7 Yper0.7
        
            var clip = AnimationMgr.getInstance().getDiamond(mode,x,y);
            clip.name = ps.name;
            clip.targetX = ps.x;
            clip.targetY = ps.y;
            clip.currentY = ps.y;
            clip.type = ps.type;
            clip.isSuppliment = true;
            this.pieceList.push(clip);
            this.mPanel.DiamondPanel.addChild(clip);
        });

        this.pieceList.forEach(g => {
            g.visible = false;
        });

         //场内宝石随机下落
        var counter = 0;
        var DelayTime = 0;
        var randomIndex;
        var find = false;

        var count = GlobalClass.GameClass.int_grid * GlobalClass.GameClass.int_grid;
        for (var i = 0; i < count; i++)
        {
            find = false;
            while (!find)
            {
                if (counter < GlobalClass.GameClass.int_grid * (GlobalClass.GameClass.int_grid - 1))
                {
                    randomIndex = Math.floor(Math.random() * (counter + GlobalClass.GameClass.int_grid));
                }
                else
                {
                    randomIndex = Math.floor(Math.random() * (GlobalClass.GameClass.int_grid * GlobalClass.GameClass.int_grid));
                }

                var p = this.pieceList[randomIndex];
                var belowAllFall = true;               //下面的是否都已下落
                for (var j = 0; j < Number(p.targetY); j++)
                {
                    var g = this.GetPieceByTargetXY(p.targetX, j + "");
                    if (!g.initFall)
                    {
                        belowAllFall = false;
                        break;
                    }
                }
                if (!p.initFall && belowAllFall)       //自身还没下落，且下面的都已下落
                {
                    p.startFall(DelayTime);
                    p.initFall = true;
                    counter++;
                    DelayTime += GlobalClass.Speed.FallTime1;      //0.1f   调整宝石掉落的时间间隔
                    find = true;
                }
            }
        }

        //第一排补充宝石依次下落
        var f1 = Math.random() ;
        if (f1 < 0.5)
        {
            for (var j = 0; j < GlobalClass.GameClass.int_grid; j++)
            {
                var targetObject = this.GetPieceByTargetXY(j + "", GlobalClass.GameClass.int_grid + "");
                targetObject.startFall( DelayTime);
                DelayTime += GlobalClass.Speed.FallTime1; //0.1f
            }
        }
        else
        {
            for (var j = GlobalClass.GameClass.int_grid - 1; j >= 0; j--)
            {
                var targetObject = this.GetPieceByTargetXY(j + "", GlobalClass.GameClass.int_grid + "");
                targetObject.startFall(DelayTime);
                DelayTime += GlobalClass.Speed.FallTime1;
            }
        }

        this.invoke(DelayTime,this.FallSoundStop,this);
    }

    
    private showLevelAni(level:number=1){
        var s = AnimationMgr.getInstance().getSkeleton(level,160,180);
        this.mPanel.GamePanel.addChild(s.display);
        s.addEventListener( dragonBones.AnimationEvent.LOOP_COMPLETE, ()=>{
                dragonBones.WorldClock.clock.remove(s);
                this.mPanel.GamePanel.removeChild(s.display);
            },this);
        s.animation.play();
        KFControllerMgr.getCtl(PanelName.GamePanel).showLevel(level+1+"");
    }

    private initLevel(){
        switch (GlobalClass.GameClass.int_level)
        {
            case 0:
                GlobalClass.GameClass.int_grid = 4;
                break;
            case 1:
                GlobalClass.GameClass.int_grid = 5;
                break;
            case 2:
                GlobalClass.GameClass.int_grid = 6;
                break;
        }
    }

    public ShowLevel(){
        this.initLevel();
        if(!this.levelHaveShow){
             this.showLevelAni(GlobalClass.GameClass.int_level);
            this.levelHaveShow = true;
        }
    }

    private getMode(type:DiamondType){
        var mode;
            switch (type)
            {
                case 1: //白玉
                    mode = DiamondType.jewel1_White;
                    break;
                case 2: //碧玉
                    mode = DiamondType.jewel1_Green;
                    break;
                case 3: //墨玉
                    mode = DiamondType.jewel1_Black;
                    break;
                case 4: //玛瑙
                    mode = DiamondType.jewel1_Agate;
                    break;
                case 5: //琥珀
                    mode = DiamondType.jewel1_Amber; 
                    break;
                case 11: //祖母绿
                    mode = DiamondType.jewel2_emerald;
                    break;
                case 12: //猫眼石
                    mode = DiamondType.jewel2_CatEye;
                    break;
                case 13: //紫水晶
                    mode = DiamondType.jewel2_Amethyst;
                    break;
                case 14: //翡翠
                    mode = DiamondType.jewel2_Jade;
                    break;
                case 15: //珍珠
                    mode = DiamondType.jewel2_Pearl;
                    break;
                case 21: //红宝石
                    mode = DiamondType.jewel3_Ruby;
                    break;
                case 22: //绿宝石
                    mode = DiamondType.jewel3_Green;
                    break;
                case 23: //黄宝石
                    mode = DiamondType.jewel3_Topaz;
                    break;
                case 24: //蓝宝石
                    mode = DiamondType.jewel3_Sapphire;
                    break;
                case 25: //钻石
                    mode = DiamondType.jewel3_Diamond;
                    break;
            }
        return mode;
    }

    private findAndRemoveByCurrentXY(posX:string,posY:string){
        var len = this.pieceList.length;
         for(var i = 0;i<len;i++){
             var ps = this.pieceList[i];
             if(ps.targetX==posX && ps.currentY ==posY){
                this.mPanel.DiamondPanel.removeChild(ps);
                this.pieceList =  CommonFuc.removeElementAtIndex(i,this.pieceList);
                return;
            }
         }
    }

    private getPosX(px:number):number{
         if (GlobalClass.GameClass.int_level == 2){
              return  Diamond.startX + (px-1) * Diamond.Diamondwidth;
         }else{
              return  Diamond.startX2 + px * Diamond.Diamondwidth;
         }
    }

    private getPosY(py:number):number{
         return Diamond.startY - py * Diamond.Diamondwidth;
    }

    private ShowGroupExplosion(){
        var len = this.turnDesData[this.int_currentTurn][this.int_currentGroup].length;
        for (var i = 0; i < len; i++)
        {
            var desP = this.turnDesData[this.int_currentTurn][this.int_currentGroup][i];
            //删除待消除的目标宝石
            this.findAndRemoveByCurrentXY(desP.x, desP.y);//从实时列表中删除

            //爆炸动画(自动播放) 
            var px = Number(desP.x);
            var py = Number(desP.y);
            
            // var posx,poxy;
            var posx = this.getPosX(px)-10;
            var posy = this.getPosY(py)-10;

            var boomAni = AnimationMgr.getInstance().getDiamond(DiamondType.boom,posx,posy);
            this.mPanel.DiamondPanel.addChild(boomAni);
            boomAni.frameRate = GlobalClass.Speed.diggerframeRate;
            boomAni.play();
        }
        SoundMgr.Instance.playBombeEffect();

        //修改上方珠宝的targetY坐标(-1） (包括场内的和补充的)
        for (var i = 0; i < len; i++)
        {
            var desP = this.turnDesData[this.int_currentTurn][this.int_currentGroup][i];

            if (this.pieceList != null)
            {
                var listLen = this.pieceList.length;
                for(var j =0;j<listLen;j++){
                    var p1 = this.pieceList[j];
                    if (desP.x == p1.targetX && Number(desP.y) < Number(p1.currentY)){
                        p1.UpdateTargetY();
                     }

                }
            }
        }
        console.log("ShowGroupExplosion finish");
    }

    private ShowUpFall(){
        console.log("ShowUpFall");
        SoundMgr.Instance.playDownEffect();
        this.f_upFallDelayTime = 0;            //到底要下落多久，有计时器
        //使上方宝石下落（包括场内和补充）
        var randomcounter = 0;
        var randomIndex;
        var upList = [];
        for (var a = 0; a < GlobalClass.GameClass.int_grid + 1; a++)          //
        {
            for (var b = 0; b < GlobalClass.GameClass.int_grid; b++)
            {
                var p2 = this.GetPieceByTargetXY(b + "", a + "");
                if (Number(p2.targetY) < Number(p2.currentY)){
                     upList.push(p2);
                }
            }
        }

        var len = upList.length;
        for (var i = 0; i < len; i++)
        {
            var find = false;
            while (!find)
            {
                randomIndex = Math.floor(Math.random() * len);
                var currentP = upList[randomIndex];
                randomcounter++;
                //下面的是否都已下落
                var belowAllFall = true;
                upList.forEach(p1 => {
                    if ((Number(p1.targetY) < Number(currentP.targetY)) && !p1.supplimentFall)
                    {
                        belowAllFall = false;
                    }
                });
                //自身还没下落，且下面的都已下落
                if (!currentP.supplimentFall && belowAllFall)
                {
                    currentP.startFall(this.f_upFallDelayTime);
                    currentP.supplimentFall = true;

                    this.f_upFallDelayTime += GlobalClass.Speed.FallTime0;  //0.1f  调整宝石爆炸后掉落的速度


                    find = true;
                }
            }
        }

        //重置判断开关
        upList.forEach(p => {
            p.supplimentFall = false;
        });
    }

    private ShowDiggerExplosion(){
        //通知上方宝石更新坐标
        var len = this.pieceList.length;
        var pieceIndex = 0;;
        for(var i=0;i<len;i++){
            var p1 = this.pieceList[i];
             if (this.Go_digger_obj.targetX == p1.targetX && Number(this.Go_digger_obj.targetY) < Number(p1.currentY))
            {
                p1.UpdateTargetY();
            }
            if (this.Go_digger_obj.targetX == p1.targetX && Number(this.Go_digger_obj.targetY) == Number(p1.currentY))
            {
                pieceIndex = i;
            }
        }

        //爆炸动画
        this.pieceList = CommonFuc.removeElementAtIndex(pieceIndex,this.pieceList);

        this.Go_digger_obj.visible = false;

        //爆炸动画
        var px = Number(this.Go_digger_obj.targetX);
        var py = Number(this.Go_digger_obj.targetY);
        var posX = this.getPosX(px)-10;
        var posY = this.getPosY(py)-10;

        var _digger_ani = AnimationMgr.getInstance().getDiamond(DiamondType.boom,posX,posY);
        _digger_ani.name = "digger_ani";
        this.mPanel.DiamondPanel.addChild(_digger_ani);
        _digger_ani.frameRate = GlobalClass.Speed.diggerframeRate;
        _digger_ani.play();
        SoundMgr.Instance.playBombeEffect();
        
        
        this.Go_digger_obj = null;
    }

    

    private DeleteDiggerAni(){
        this.Go_digger_obj.visible =false;
        this.mPanel.removeChild(this.Go_digger_obj);
        this.Go_digger_obj = null;
        //  aniList.Clear();
    }


    private FallSoundStop(delayTime:number){
        // MusicSwitch.stopAudio(GlobalClass.MusicInfo.Go_Radio_Down);
        SoundMgr.Instance.stopDownEffect();
    }

    private GetPieceByTargetXY(posX:string,posY:string):Diamond{
        var diamonde;
        this.pieceList.forEach(ps => {
            
            if(ps.targetX==posX && ps.targetY ==posY){
                diamonde = ps;
            }
        });
        return diamonde;
    }

    private GetPieceByCurrentXY(posX:string,posY:string){
        var diamonde;
        this.pieceList.forEach(ps => {
            if(ps.targetX==posX && ps.currentY ==posY){
                // return ps;
                diamonde = ps;
            }
        });
        return diamonde;
    }

    private GetInitPieces(datastr:string){
        console.log("GetInitPieces="+datastr);
        var resultList = [];
        var s1 = datastr.split(";");
        var len = s1.length;
        for (var i = 0; i < len; i++) //第几行
        {
            if(s1[i]!=""){
                var s2 = s1[i].split(",");
                var len2 = s2.length;
                for (var j = 0; j < len2; j++)
                {
                    var name = "x" + j + "y" + i;
                    var p = new PStruct( j + "", i + "",name, Number(s2[j]));
                    resultList.push(p);
                }
            }
        }
        return resultList;
    }

    private GetSuppliment(str:string){
        var resultList = [];
        var s1 = str.split(";");
        var len = s1.length;
        for (var i = 0; i < len; i++) //第几列
        {
            if(s1[i]!=""){
                var s2 = s1[i].split(",");
                var len2 = s2.length;
                for (var j = 0; j < len2; j++)
                {
                    if(s2[j]!=""){
                         var tmpJ:number;
                        //场内宝石如果是4*4，补充宝石的targetY就是从5开始往上加
                        if (GlobalClass.GameClass.int_level == 0)
                        {
                            tmpJ = j + 4;
                        }
                        else if (GlobalClass.GameClass.int_level == 1)
                        {
                            tmpJ = j + 5;
                        }
                        else
                        {
                            tmpJ = j + 6;
                        }
                        var name = "x" + i + "y" + tmpJ;
                        var p = new PStruct( i + "", tmpJ + "",name, Number(s2[j]));
                        resultList.push(p);
                    }
                }
            }
            
        }
        return resultList;
    }

    private ShowBrick(){
        var a = GlobalClass.GameClass.f_brickArray[0];
        var b = GlobalClass.GameClass.f_brickArray[1];
        var c = GlobalClass.GameClass.f_brickArray[2];
        for(let i = 0;i<15;i++){
             this.mPanel.wallRight.getChildAt(i).visible = true;
             this.mPanel.wallLeft.getChildAt(i).visible = true;
             this.mPanel.wallBottom.getChildAt(i).visible = true;
        }

        if (GlobalClass.GameClass.f_brickArray[0] >= 0)
        {
            for(var i=0;i<15-GlobalClass.GameClass.f_brickArray[0];i++){
                this.mPanel.wallRight.getChildAt(i).visible = false;
            }
        }
        if (GlobalClass.GameClass.f_brickArray[1] >= 0)
        {
            for(var i=0;i<15-GlobalClass.GameClass.f_brickArray[1];i++){
                this.mPanel.wallLeft.getChildAt(i).visible = false;
            }
        }
        if (GlobalClass.GameClass.f_brickArray[2] >= 0)
        {
            for(var i=0;i<15-GlobalClass.GameClass.f_brickArray[2];i++){
                this.mPanel.wallBottom.getChildAt(i).visible = false;
            }
        }
    }

    private GetTurnDesData(dataStr:string):Array<any>{
        console.log("Panel_Vedio_Ctrl:GetTurnDesData="+dataStr);
        if(dataStr==null||dataStr=="null$"||dataStr==""){
            console.log("str is nil");
            return null;
        }
        var tmpTurnData =  dataStr.split("$");
        var turnLen = tmpTurnData.length;
        var result = [];
        for(var i=0;i<turnLen;i++){
            if(tmpTurnData[i]!=""){
                var tmpGroupData =  tmpTurnData[i].split("#");
                var p1 = [];
                var grouplen = tmpGroupData.length;
                for(var j=0;j<grouplen;j++){
                    if(tmpGroupData[j]!=""){
                        var tmpPieceData =  tmpGroupData[j].split(";");
                        var p2 = [];
                        var pieceLen = tmpPieceData.length
                        for(var k=0;k<pieceLen;k++){
                            if(tmpPieceData[k]!=""){
                                var pos = tmpPieceData[k].split(",");
                                var p = new PStruct(pos[1], pos[0]);
                                p2[k] = p;
                            }
                        }
                        p1[j] = p2;    
                    }
                    
                }
                result[i] = p1;
            }
                
        }
        this.int_turnsThisRound = result.length;
        return result;
    }

    private brickTimer:egret.Timer = null;
    private wallClick(){
        this.mPanel.bricktipGroup.visible = true;
        this.brickTimer = new egret.Timer(10000,0);
        this.brickTimer.addEventListener(egret.TimerEvent.TIMER,()=>{
            this.wallDispear();
            
        },this);
        this.brickTimer.start();
    }

    private wallDispear(){
        this.mPanel.bricktipGroup.visible = false;
        this.brickTimer.stop();
        this.brickTimer = null;
    }

    private Btn_StartGameClick(){
        this.ShowNewBie();
    }
    private Btn_NoBindingClick(){
        this.SkipNewBie();
        this.mPanel.Btn_NewBieBinding.visible = false;
        this.mPanel.Btn_NoBinding.visible = false;

        KFControllerMgr.getCtl(PanelName.GamePanel).SetDefaultLineAndSliderCount();
    }
    private Btn_NewBieBindingClick(){
        KFControllerMgr.getCtl(PanelName.BindingPhonePanel).show();
    }
    private Btn_NewBieSkipClick(){
        this.ShowNewBie();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.lhdb_giveupGuide);
    }

    private SkipNewBie(){
        this.mPanel.Label_NewBie.textFlow = CommonFuc.parseColorText("[00FF00]如果想要获取点数,可以在\n\r游戏大厅界面继续绑定。[-]");
        this.invoke(4,()=>{
            this.ShowNewBie();
        },this);
        
    }

    private ShowNewBie(){
        this.enterLHDB();
        this.mPanel.louderspeaker.visible = true;
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.NEWBIE_SKIP,"");
        KFControllerMgr.getCtl(PanelName.GamePanel).SetDefaultLineAndSliderCount();
    }

    private enterLHDB(){
        this.mPanel.NewBie.visible = false;
        this.ShowBrick();
        GlobalClass.UserInfo.str_Game_lastTotalScore = GlobalClass.UserInfo.str_Hall_totalScore;
        this.mPanel.Label_WinningScore.visible = false;
        this.ClearList();
        GlobalClass.UserInfo.str_Game_lastTodayScore = "0";
        GlobalClass.UserInfo.isNewbie = false;
        this.mPanel.Btn_NewBieSkip.visible = false;
        this.mPanel.Btn_NewBieBinding.visible = false;
        this.mPanel.Btn_NoBinding.visible = false;
		this.mPanel.Btn_StartGame.visible = false;
        this.ShowLevel();
        KFControllerMgr.getCtl(PanelName.GamePanel).enterLHDB();
    }

    protected setOnClickListener() {
       this.AddClickEvent(this.mPanel.Btn_Close_GamePanel,egret.TouchEvent.TOUCH_END,this.Btn_Close_GamePanelClick,this);
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END, this.Btn_CloseClick, this);
        this.AddClickEvent(this.mPanel.wallRight,egret.TouchEvent.TOUCH_TAP, this.wallClick, this);
        this.AddClickEvent(this.mPanel.wallLeft,egret.TouchEvent.TOUCH_TAP, this.wallClick, this);
        this.AddClickEvent(this.mPanel.wallBottom,egret.TouchEvent.TOUCH_TAP, this.wallClick, this);
        this.AddClickEvent(this.mPanel.bricktipGroup,egret.TouchEvent.TOUCH_TAP, this.wallDispear, this);

        this.AddClickEvent(this.mPanel.Btn_StartGame,egret.TouchEvent.TOUCH_TAP, this.Btn_StartGameClick, this);
        this.AddClickEvent(this.mPanel.Btn_NoBinding,egret.TouchEvent.TOUCH_TAP, this.Btn_NoBindingClick, this);
        this.AddClickEvent(this.mPanel.Btn_NewBieBinding,egret.TouchEvent.TOUCH_TAP, this.Btn_NewBieBindingClick, this);
        this.AddClickEvent(this.mPanel.Btn_NewBieSkip,egret.TouchEvent.TOUCH_TAP, this.Btn_NewBieSkipClick, this);
        this.AddClickEvent(this.mPanel.Btn_CloseTrustBG,egret.TouchEvent.TOUCH_TAP, this.Btn_CloseTrustBGClick, this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close_GamePanel,egret.TouchEvent.TOUCH_END,this.Btn_Close_GamePanelClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END, this.Btn_CloseClick, this);
        this.RemoveClickEvent(this.mPanel.wallRight,egret.TouchEvent.TOUCH_TAP, this.wallClick, this);
        this.RemoveClickEvent(this.mPanel.wallLeft,egret.TouchEvent.TOUCH_TAP, this.wallClick, this);
        this.RemoveClickEvent(this.mPanel.wallBottom,egret.TouchEvent.TOUCH_TAP, this.wallClick, this);
        this.RemoveClickEvent(this.mPanel.bricktipGroup,egret.TouchEvent.TOUCH_TAP, this.wallDispear, this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseTrustBG,egret.TouchEvent.TOUCH_TAP, this.Btn_CloseTrustBGClick, this);
    }

    private Btn_CloseClick(){
       this.mPanel.UIPanel.visible = false;
       this.mPanel.nick.visible = false;
       this.setType(1);
       this.ClearList();
       this.resetPanel();

        GlobalClass.GameClass.f_brickArray[0] = this.f_brickBeforeVedio[0];
        GlobalClass.GameClass.f_brickArray[1] = this.f_brickBeforeVedio[1];
        GlobalClass.GameClass.f_brickArray[2] = this.f_brickBeforeVedio[2];
        this.ShowBrick();
    }

    private ClearList(){
        this.pieceList.forEach(ps => {
            ps.parent.removeChild(ps);
        });
        this.initData();
        this.mPanel.Label_WinningScore.visible = false;
    }

    private Btn_Close_GamePanelClick(){
        this.mPanel.hide();
        this.resetPanel();
    }

    private GetGroupType():number
    {
        var result = 21;
        var strs1 = GlobalClass.GameClass.str_groupBallanceData.split(";");
        var strs2 = strs1[this.int_groupInRound].split( ",");
        result = Number(strs2[0]);
        return result;
    }

    private GetGroupPieceAmount():number
    {
        var result = 11;
        var strs1 = GlobalClass.GameClass.str_groupBallanceData.split(";");
        var strs2 = strs1[this.int_groupInRound].split(",");
        result = Number(strs2[1]);
        return result;
    }

    private GetGroupTotalScore():number
    {
        var result = 250;
        var strs1 = GlobalClass.GameClass.str_groupBallanceData.split(";");
        var strs2 = strs1[this.int_groupInRound].split( ",");
        result = Number(strs2[3]);
        return result;
    }

    private PlayVedio(data:string){
        var strArray = data.split("%");
         if(strArray.length<=2){
             KFControllerMgr.showTips("视频播放错误");
             return;
         }
       	// GlobalClass.UserInfo.str_Game_lastTotalScore = strArray [2];
		// GlobalClass.UserInfo.str_Game_lastTodayScore = strArray [3];
		// // GlobalClass.UserInfo.str_Game_lastSlotScore = strArray [4];
		// GlobalClass.UserInfo.str_Game_currentTotalScore = strArray [5];
		// GlobalClass.UserInfo.str_Game_currentTodayScore = strArray [6];
		// GlobalClass.UserInfo.str_Game_currentSlotScore = strArray [7];
        this.playScore = Number(strArray [6]) - Number(strArray [3]);
		GlobalClass.GameClass.int_level = Number (strArray [8]);
		GlobalClass.GameClass.str_init = strArray [9];        //初始
		GlobalClass.GameClass.str_suppliment = strArray [10]; //补充
		var tmpstrs = strArray [13].split (',');      //砖地图
		GlobalClass.GameClass.f_brickArray =  [];
        GlobalClass.GameClass.f_brickArray.push(Number (tmpstrs [0]));
        GlobalClass.GameClass.f_brickArray.push(Number (tmpstrs [1]));
        GlobalClass.GameClass.f_brickArray.push(Number (tmpstrs [2]));
		GlobalClass.GameClass.str_groupBallanceData = strArray [14];           //本局成绩结算
		GlobalClass.GameClass.str_turnDesData = strArray [15];                 //消除组合
        //是否中累积奖
		if (strArray [16] != "0") {
			GlobalClass.UserInfo.Game_isSlot = true;
			var strs1 = strArray [16].split (",");
			GlobalClass.UserInfo.str_Game_slotScore = strs1 [1];
		}
        // this.ShowBrick();
        this.startPlaying();
    }

    protected destroy(){
        this.initData();
        this.haveInited = false;
        AnimationMgr.getInstance().unloadDiamond();
        AnimationMgr.getInstance().unloadSkeleton();
        this.mPanel.ParticleGroup.removeChild(this.particleSystem);
        this.particleSystem = null;
        super.destroy();
    }
}