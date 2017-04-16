/**
 * App主类
 * @author chenkai
 * @date 2016/7/7 

 */
class App extends BaseApp{
    /**调用Native震动*/
    public static EVENT_NATIVE_SHAKE:string = "EVENT_NATIVE_SHAKE";
    /**设置web微信分享*/
    public static EVENT_SET_WEB_WXSHARE:string = "EVENT_SET_WEB_WXSHARE";
    /**native微信分享*/
    public static EVENT_NATIVE_WXSHARE:string = "EVENT_NATIVE_WXSHARE";

    /**启动框架*/
    public startUp(): void {
        //调整适配模式
        if(App.DeviceUtils.IsWeb) {
            App.StageUtils.changeScaleMode();
            App.StageUtils.runBrowserAdapt();
        }

        //通知runtime加载页面已就绪,可以关闭runtime loading
        if(App.DeviceUtils.IsNative){
            var json = { current: 10,total: 10 };
            var jsonStr = JSON.stringify(json);
            egret.ExternalInterface.call("customLoadingFlag",jsonStr);
        }

        //定义Native访问接口
        if(App.DeviceUtils.IsNative) {
            this.setInterfaces();
        }

        //注册Controller
        this.registerController(LoginController.NAME, new LoginController());
        this.registerController(HallController.NAME, new HallController());
        this.registerController(GameController.NAME, new GameController());

        //注册场景
        var scene: SceneManager = App.SceneManager;
        scene.register(SceneConst.LoginScene,LoginScene);      //登录界面
        scene.register(SceneConst.HallScene,HallScene);        //大厅界面
        scene.register(SceneConst.GameScene,GameScene);        //游戏界面

        //注册弹框
        var panel: PanelManager = App.PanelManager;

        //默认表情资源组，由于表情多达500张图片，得分开加载
        var defalutFace:string = FaceFactory.getInstance().getFaceItemGroupName(ItemType.default);

        panel.register(PanelConst.ChatPanel,ChatPanel, [AssetConst.Chat, defalutFace]);//聊天面板
        panel.register(PanelConst.ResultPanel,ResultPanel);                        //结算面板
        panel.register(PanelConst.ResultPanel1,ResultPanel);                        //结算面板
        panel.register(PanelConst.MacthInfoPanel,MatchInfoPanel);                  //牌局信息面板
        panel.register(PanelConst.ZhuaMaPanel,ZhuaMaPanel);                        //抓马面板
        panel.register(PanelConst.SharePanel,SharePanel,AssetConst.Share);         //分享面板
        panel.register(PanelConst.MallPanel,MallPanel);                            //商城面板
        panel.register(PanelConst.PaymentPanel,PaymentPanel);                      //支付面板
        panel.register(PanelConst.PaymentMethod,PaymentMethod);                    //选择支付面板
        panel.register(PanelConst.BackpackPanel,BackpackPanel);                    //背包面板
        panel.register(PanelConst.FriendPanel,FriendPanel);                        //好友房列表
        panel.register(PanelConst.JoinRoomPanel,JoinRoomPanel);                    //加入房间
        panel.register(PanelConst.JoinNumber,JoinNumber);                          //输入加入房间
        panel.register(PanelConst.GameBack,GameBack);                              //游戏内背包
        panel.register(PanelConst.GameMall,GameMall);                              //游戏内商城
        panel.register(PanelConst.GameSet,GameSet);                                //游戏内设置
        panel.register(PanelConst.LookRlue,LookRlue);                              //游戏内查看规则
        panel.register(PanelConst.ModifyRlue1,ModifyRlue1);                        //游戏内修改规则
        panel.register(PanelConst.InvitePanel,InvitePanel);                        //邀请好友列表


        panel.register(PanelConst.SignPanel,SignInPanel,AssetConst.Sign);          //签名面板
        panel.register(PanelConst.RulePanel,RulePanel,[AssetConst.Rule,AssetConst.Card]); //玩法说明面板
        panel.register(PanelConst.EmailPanel,EmailPanel);         //邮件面板
        panel.register(PanelConst.EmailTwoPanel,EmailTwoPanel);         //二级邮件面板
        panel.register(PanelConst.FuliPanel,FuliPanel,AssetConst.Fuli);            //福利面板
        panel.register(PanelConst.NewFeedBackPanel,NewFeedBackPanel,AssetConst.Feedback);//反馈面板
        panel.register(PanelConst.JjjPanel,JjjPanel,AssetConst.Jjj);               //金币场面板
        panel.register(PanelConst.RankPanel,RankPanel,AssetConst.Rank);            //排行榜
        panel.register(PanelConst.CreateRoomPanel,CreateRoomPanel,AssetConst.Create); //创建房间
        panel.register(PanelConst.PreloadPanel, PreloadPanel );                     //加载
        panel.register(PanelConst.ExRoomOpenVipPanel,ExRoomOpenVipPanel);            //非专属房提示面板
        panel.register(PanelConst.QRCode,QRCode,AssetConst.Qrcode);                                   //二维码
        panel.register(PanelConst.InputRoom,InputRoomNumPanel,AssetConst.InputRoom);//加入房间
        panel.register(PanelConst.SetPanel,SetPanel,AssetConst.SetPanel);//设置
        panel.register(PanelConst.ExcRoom,ExcRoom,AssetConst.ExcRoom);//修改房间

       panel.register(PanelConst.RankPanel1,RankPanel1,AssetConst.Rank);  //排行榜
       panel.register(PanelConst.RankNewRuleDetail,RankNewRuleDetail) //排行版规则
       panel.register(PanelConst.ScorePanel,ScorePanel1,AssetConst.Score) //算分面板
       panel.register(PanelConst.ScoreDetailPanel1,ScoreDetailPanel1,AssetConst.Score);//战绩详情
       panel.register(PanelConst.LookPswPanel,LookPswPanel);            //牌局回放

       panel.register(PanelConst.ReNew,ReNew);            //战局回放

       panel.register(PanelConst.ScoreSharePanel,ScoreSharePanel);       //战绩分享




        //监听事件
        this.addEvent(App.EVENT_NATIVE_SHAKE, this.nativeShake, this);
        this.addEvent(App.EVENT_SET_WEB_WXSHARE, this.setWebWxShare, this);
        this.addEvent(App.EVENT_NATIVE_WXSHARE, this.nativeWxShare, this);

        //显示登录界面
        this.sendEvent(LoginController.EVENT_SHOW_LOGIN);
    }
    
    //Native接口
    private setInterfaces() {
        //手机点击退出键
        egret.ExternalInterface.addCallback("quitApp",function(message: string) {
            console.log("message form native : " + message);
            var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
            messageBox.showMsg("是否关闭游戏"); 
            messageBox.ok = () => {
                egret.ExternalInterface.call("quitApp","quitApp");
            }
        });

        //Native返回微信登录请求结果
        egret.ExternalInterface.addCallback("getCode",function(code:string){
            Tips.info("egret get code: "+code);
            if(code) {
                //这里回调必须用异步函数
                egret.setTimeout(() => { 
                    var loginController:LoginController = App.getController(LoginController.NAME);
                    loginController.sendLoginAppReq(code,"");
                },this,10);
            } else {
                Tips.error("code is null");
            }  
        });
    }

    /**
     * Native分享
     * @isTimeline 是否分享到朋友圈
     */
    public nativeWxShare(isTimeline: boolean) {
        egret.ExternalInterface.call("wxShare","http://gamemj.com/mj/index.php?pid="+App.DataCenter.UserInfo.getMyUserVo().userID+"&deskCode="+App.DataCenter.deskInfo.deskCode+"&deskId="+App.DataCenter.deskInfo.deskID+"&gameID="+App.serverSocket.gameID);
    }

    /**
     * Native震动
     * @shakeTime 震动时间，默认1500ms
     */
    public nativeShake(shakeTime:number = 1500){
        egret.ExternalInterface.call("shake", shakeTime + "");
    }

    /**
     * H5分享，重置微信分享接口，传入桌子号和用户ID等
     * @userID 用户ID
     * @deskCode 桌子号
     * @replayCode 回放码
     */
    public setWebWxShare(userID: number,deskCode: number, replayCode:string,deskId:number) {
        var gameID:Game_ID = App.serverSocket.gameID;
        console.log("调用微信分享,deskCode=" + deskCode + " userID=" + userID + " replayCode=" + replayCode 
                    + " gameID=" + gameID);
        if(window['wxShare']) {
            window['wxShare'](userID,deskCode,replayCode,gameID,deskId);
        }
    }
    
    /**
     * 获取控制模块
     * @ctrlName 控制模块名
     * @return 控制模块
     */
    public static getController(ctrlName:string){
        return App.getInstance().getController(ctrlName);
    }

    /**数据中心*/
    public static get DataCenter():DataCenter{
        return DataCenter.getInstance();
    }

    /**设备工具类*/
    public static get DeviceUtils():DeviceUtils{
        return DeviceUtils.getInstance();
    }   

    /**舞台工具类*/
    public static get StageUtils():StageUtils{
        return StageUtils.getInstance();
    }

    /**资源管理类*/
    public static get ResUtils():ResUtils{
        return ResUtils.getInstance();
    }

    /**图层管理类*/
    public static get LayerManager():LayerManager{
        return LayerManager.getInstance();
    }

    /**声音管理*/
    public static get SoundManager():SoundManager{
        return SoundManager.getInstance();
    }

    /**弹框管理类*/
    public static get PopUpManager():PopUpManager{
        return PopUpManager.getInstance();
    }

    /**消息框管理类*/
    public static get MsgBoxManager():MessageBoxManager{
        return MessageBoxManager.getInstance();
    }

    /**底部菜单管理类*/
    public static get BottomMenuManager():BottomMenuManager{
        return BottomMenuManager.getInstance();
    }

    /**事件管理类*/
    public static get EventManager():EventMananger{
        return EventMananger.getInstance();
    }

    /**关键词屏蔽*/
    public static get KeyWord():KeyWord{
        return KeyWord.getInstance();
    }

    /**加载等待动画*/
    public static get LoadingLock():LoadingLock{
        return LoadingLock.getInstance();
    }
    
    /**弹框管理类*/
    public static get PanelManager(): PanelManager{
        return PanelManager.getInstance();
    }

    /**场景管理类*/
    public static get SceneManager():SceneManager{
        return SceneManager.getInstance();
    }
    
    /**游戏Socket*/
    public static get gameSocket():ClientSocket{
        return SocketManager.getInstance().gameSocket;
    }
    
    /**调度Socket*/
    public static get serverSocket(): ClientSocket {
        return SocketManager.getInstance().serverSocket;
    }
    
    /**推送Socket*/
    public static get pushSocket(): ClientSocket {
        return SocketManager.getInstance().pushSocket;
    }
    
    
}
