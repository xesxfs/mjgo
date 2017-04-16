/**
 * 大厅界面
 * @author chenwei
 * @date 2016/6/28
 */
class HallScene extends BaseScene {
    /**场景控制类*/
    protected ctrl: HallController;
    private bFirstLogin:boolean=true;
    //游戏内容
    private pageView:PageView;
//    开台
    private openDeskBtn:eui.Button;
//    二维码
    private QRCodeBtn:eui.Button;
//      姓名
    private userNameLab:eui.Label;
//      房间Id
    private roomIdLab:eui.Label;
//    跑马灯
    private marquee:Marquee
//    设置按钮
    //private setBtn :eui.Button;
//    修改房间
    private modifyDeskBtn:eui.Button;
    
    //规则按钮
    //private ruleBtn : eui.Button;  

     //鄂艳龙
    // //消息按钮
    private hall_playground:eui.Button;
    /**好友房列表*/          
    private hall_friends_room:eui.Button;
     /**聊天记录房间号 */
    public deskCode:number;
    //算分按钮
    //private scoreBtn:eui.Button;
    //展开
    private expandBtn:eui.Button;
    //收缩
    private shrinkBtn:eui.Button;
    
    private topHeadGroup:eui.Group;
    
    private bottomMenuGroup:eui.Group;
    
    private fullScreenGroup:eui.Group;
    
    private option:OptionMenu;
    
    private deskInfoGroup:eui.Group;
    
    private basePointLab:eui.Label;
    
    private bottomMenus: BottomMenus;
    public constructor() {
        super();
        this.skinName = "HallSceneSkin";
    }

    protected childrenCreated() {        
    }

    protected onEnable() {
        var bottomMenus: BottomMenus = App.BottomMenuManager.getBoxA();
        bottomMenus.showMenu(this);
        bottomMenus.ok = (bottomName) => {
            this.onMenusTouch(bottomName);
        }
        this.updateCurDeskUI();
        let user: UserVO = App.DataCenter.UserInfo.getMyUserVo();        
        //推送服务器
        App.pushSocket.startConnect(App.DataCenter.ServerInfo.PUSH_SERVER_URL);
        if(user.isOvertime&&!App.DataCenter.shareInfo.deskCode) {
            console.log("房间过期1");        
            this.openReNew();
            //房间过期重置首次进入
            this.bFirstLogin = false;
            //this.sendSelfRoom();
        }else{
            //this.sendSelfRoom();
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSceneTouch,this);
        this.hall_friends_room.addEventListener(egret.TouchEvent.TOUCH_TAP,this.friendRoom,this);
        // this.chatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenusTouch, this);
        // this.feedBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenusTouch, this);
        // this.scoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onScoreBtnTouch,this);
        this.expandBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFullScreen,this);
        this.shrinkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFullScreen,this);
        this.deskInfoGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDeskInfo,this);
        egret.setTimeout(this.onDeskInfo,this,10000);
        egret.ExternalInterface.addCallback("purchase", function (message:string) {
            var ctrl1 = new HallController();
            ctrl1.verificationPay(message);
        });
        this.getMarquee();
    }
    
    
    private onFullScreen(e:egret.Event){
        switch(e.target){
            case this.expandBtn: 
                this.onExpand();
                break;
            case this.shrinkBtn: 
                this.onShrink();
                break;
        }
    }
    
    private onExpand(){
        egret.Tween.get(this.topHeadGroup).to({ top: -this.topHeadGroup.height },200)
        egret.Tween.get(this.bottomMenuGroup).to({ bottom: -this.bottomMenuGroup.height },200)
        this.shrinkBtn.visible = true;
        this.expandBtn.visible = false;
    }
    
    private onShrink(){
        egret.Tween.get(this.topHeadGroup).to({ top: 0 },200)
        egret.Tween.get(this.bottomMenuGroup).to({ bottom: 0 },200)
        this.shrinkBtn.visible = false;
        this.expandBtn.visible = true;
    }
    
    /*游戏状态修改*/
    public gameStateChange(){
        let games=App.DataCenter.gameState;        
        if(games==GameState.Playing){
            this.pageView.hideScorller();
            this.fullScreenGroup.visible = true;
            this.option.visible = false;
            if(this.pageView.selectMainGame()){
                Tips.info("游戏已开始,已自动返回牌桌.");
            }
            
        }else{
            this.fullScreenGroup.visible = false;
            this.option.visible = true;
            this.pageView.showScorller();
        }
    }
    
    public updateCurDeskInfo(){
        let curDesk:DeskInfo = App.DataCenter.roomInfo.getCurDesk();
        let gameconfig = ProtocolData.gameConfig;
        gameconfig = curDesk.gameConfig;
        let ruleDict = this.getGameConfigStr(gameconfig);        
        
        let len = this.deskInfoGroup.numChildren;
        for(let i=2;i<len-1;i++){
            let item = this.deskInfoGroup.getChildAt(i) as eui.Label
            item.text="";
        }
        
        let mjType = this.deskInfoGroup.getChildAt(1) as eui.Label;
        if(gameconfig.gameType==GAME_TYPE.JI_PING_HU){
            mjType.text = "鸡平胡"
        }else{
            mjType.text = "推到胡"
        }
        this.basePointLab.text = curDesk.basePoint.toString();    
        let ruleList=[];
        for(let key in ruleDict){ 
            if(ruleDict[key]==true){
                ruleList.push(key)
            }  
        }
        if(gameconfig.hasMaiMa&&gameconfig.gameType==GAME_TYPE.TUI_DAO_HU)ruleList.push("买马数量:"+gameconfig.maiMaNum);
        
        for(let i=0;i<ruleList.length;i++){
          let item= this.deskInfoGroup.getChildAt(i+2) as eui.Label
            item.text = ruleList[i]
        }
       let baseGroup= this.deskInfoGroup.getChildAt(len-1) as eui.Group;
       
       let offlen=0;
       if(ruleList.length){
           offlen=ruleList.length;
       }
        baseGroup.y= 64+30*(offlen);        
      
    }
    private onDeskInfo(){
        if(this.deskInfoGroup.left == 0){
            egret.Tween.get(this.deskInfoGroup).to({ left: -212 },200);  
        }else if(this.deskInfoGroup.left == -212){
            egret.Tween.get(this.deskInfoGroup).to({ left: 0 },200);
        }       
    }
        
    public getGameConfigStr(gameConfig) {
        var ruleDict = {};
        ruleDict["杠上开花"] = gameConfig.hasGangShangKaiHua;
        ruleDict["海底捞月"] = gameConfig.hasHaiDiLaoYue;
        ruleDict["抢杠胡"] = gameConfig.hasQiangGang;
        ruleDict["一炮三响"] = gameConfig.hasYiPaoSanXiang;
        ruleDict["三元牌"] = gameConfig.hasSanYuan;
        ruleDict["风位风圈刻子"] = gameConfig.hasFengQuan;
        ruleDict["步步高"] = gameConfig.hasBuBuGao;
        ruleDict["杠牌加番"] = gameConfig.hasGangAddFan;
        return ruleDict;
    }

    /**
     *  获取跑马灯
     */
    private getMarquee(){
        this.ctrl.sendGetMsgMarquee();        
    }
    /**
     * 开始跑
     */
    public starMarquee(){
        this.marquee.startRolling();
    }
    protected onRemove() {
        //注销socket
       this.ctrl.unRegistSocket();
    }
    //跑马灯
    public pushMqruee(msg:string,c:number=1){
        this.marquee.push(msg,c)
    }
    
    public sendSelfRoom(code=null){
        this.ctrl.registerSocket();
        if(this.bFirstLogin){
            this.bFirstLogin = false;            
           var code1= App.DataCenter.shareInfo.deskCode;
           var desk = parseInt(App.DataCenter.shareInfo.deskId);
           this.ctrl.sendSelfRoom(code1,desk);  
        }else{
            this.ctrl.sendSelfRoom(code);              
        }          
    }

    /**点击场景UI*/
    private onSceneTouch(e: egret.TouchEvent) {
        
        let uer = App.DataCenter.UserInfo.getMyUserVo();
        
        switch (e.target) {
            case this.QRCodeBtn:  
              
                if(uer.isOvertime) {
                    console.log("房间过期2");
                    App.PanelManager.open(PanelConst.ReNew)
                    return
                }
                App.PanelManager.open(PanelConst.QRCode);
                break;
            case this.modifyDeskBtn:             
             
                if(uer.isOvertime) {
                    console.log("房间过期3");
                    App.PanelManager.open(PanelConst.ReNew)
                    return
                }
                if(App.DataCenter.gameState == GameState.Playing) {
                    Tips.info("游戏已正式开始,请结束后再修改房间信息")
                        return;
                    }
                App.PanelManager.open(PanelConst.ExcRoom)
                break;            
        }
    }
    
    public setGameContent(g:BaseScene){   
        this.pageView.addPageContent(g);           
    }

    /**点击底部菜单栏*/
    private onMenusTouch(bottomName:BottomName) {
        switch (bottomName) {
            case BottomName.mall:
                this.ctrl.sendShopListReq(1);  
                break;
            case BottomName.knapsack:
                this.ctrl.getBackpack();  
                break;
            case BottomName.share:
                App.PanelManager.open(PanelConst.SharePanel);   
                break;
            case BottomName.email:
                this.ctrl.sendGetEmail();
                break;
            case BottomName.friends:
                App.PanelManager.open(PanelConst.InvitePanel);   
                break;
            case BottomName.take:
                App.PanelManager.open(PanelConst.RulePanel);
                break;
            case BottomName.set:
                App.PanelManager.open(PanelConst.SetPanel);
                break;
            default:
                break;
        }
    }
    /**好友房列表 */
    private friendRoom(){
        App.PanelManager.open(PanelConst.FriendPanel);
    }


    /**进入聊天 */
    public inChat(){
        var gameScene: GameScene = App.SceneManager.getScene(SceneConst.GameScene);
        if (gameScene.isGag) {
            var minute = parseInt("" + gameScene.timeNumber / 60);
            var second = parseInt(""+gameScene.timeNumber % 60);
            var secondStr: string;
            if(second < 9) {
                secondStr = "0" + second;
            } else {
                secondStr = "" + second;
            }
            Tips.info("您已被房主禁言,暂无法使用聊天功能(" + minute + ":" + secondStr + ")"); 
        } else {
            var deskInfo:DeskInfo = App.DataCenter.roomInfo.getCurDesk();
            if(this.deskCode!=deskInfo.deskCode){
                this.deskCode = deskInfo.deskCode;
                gameScene.clearChatRecord();
            }
            App.PanelManager.open(PanelConst.ChatPanel);
        }
    }
    /**更新当前桌子信息*/
    public updateCurDeskUI() {
        // var deskVo: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
        // var user: UserVO = App.DataCenter.UserInfo.getMyUserVo();     
        
        // deskVo && (this.modifyDeskBtn.visible = ((user.userID == deskVo.ownerID)&&!user.isOvertime));       
        // this.userNameLab.text = deskVo ? decodeURIComponent(deskVo.deskName) :decodeURIComponent(user.excluroomName);
        // this.roomIdLab.text = deskVo?deskVo.deskCode.toString():user.excluroomCode.toString();       
    }
    public restPageView(){
        this.pageView.resetData();
    }

    /**退出大厅*/
    private quitHall() {
        let msgBox = App.MsgBoxManager.getBoxA();
        msgBox.ok = () => {
            App.gameSocket.close();
            App.pushSocket.close();
            this.ctrl.sendEvent(LoginController.EVENT_SHOW_LOGIN);
        }
        msgBox.showMsg("是否确定退出登陆");
    }
    
    public openReNew(){        
        App.PanelManager.open(PanelConst.ReNew,() => {
            this.ctrl.sendShopListReq(ShopType.ReNew);
        },this);
    }
    
    public openDesk(){
        App.PanelManager.open(PanelConst.CreateRoomPanel,() => {
            this.ctrl.sendShopListReq(ShopType.OpenDesk);
        },this);
    }

    /**进入游戏*/
    public intoGameDesk(bReplay: boolean = false, replayData?: any, bReconnect: boolean = false) {
        var resArray;
        console.log("`````````````````````进入游戏,是否断线重连:", bReconnect, "是否回放:", bReplay);
        if (bReconnect || bReplay) {
            resArray = [AssetConst.Invite, AssetConst.Game, AssetConst.Card];
        } else {
            resArray = [AssetConst.Invite, AssetConst.Card];
        }
        //背包选择场景对应的资源组
        resArray.push(App.DataCenter.BagInfo.getSceneGroupName());

        //清空非游戏内面板
        App.PanelManager.closeAllPanel();

        //记录回放
        App.DataCenter.replayInfo.bReplay = bReplay;
        App.DataCenter.replayInfo.replayData = replayData;

        //加载游戏资源
        var preloadPanel: PreloadPanel = App.PanelManager.open(PanelConst.PreloadPanel);
        App.ResUtils.loadGroup(resArray, this, this.loadGameComplete, this.loadGameProgress);
   
    }
    
    public addPageView(){
        this.pageView.addOneContent();
    }

    //加载游戏资源进度
    private loadGameProgress(e: RES.ResourceEvent) {
        var preloadPanel: PreloadPanel = App.PanelManager.getPanel(PanelConst.PreloadPanel);
        preloadPanel.setProgress(Math.round(e.itemsLoaded / e.itemsTotal * 100));
    }

    //加载游戏资源完成
    private loadGameComplete() {
        App.PanelManager.closeAllPanel();
        App.EventManager.sendEvent(GameController.EVENT_SHOW_GAME_SCENE);
    }

}
