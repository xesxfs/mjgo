var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * App主类
 * @author chenkai
 * @date 2016/7/7

 */
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**启动框架*/
    App.prototype.startUp = function () {
        //调整适配模式
        if (App.DeviceUtils.IsWeb) {
            App.StageUtils.changeScaleMode();
            App.StageUtils.runBrowserAdapt();
        }
        //通知runtime加载页面已就绪,可以关闭runtime loading
        if (App.DeviceUtils.IsNative) {
            var json = { current: 10, total: 10 };
            var jsonStr = JSON.stringify(json);
            egret.ExternalInterface.call("customLoadingFlag", jsonStr);
        }
        //定义Native访问接口
        if (App.DeviceUtils.IsNative) {
            this.setInterfaces();
        }
        //注册Controller
        this.registerController(LoginController.NAME, new LoginController());
        this.registerController(HallController.NAME, new HallController());
        this.registerController(GameController.NAME, new GameController());
        //注册场景
        var scene = App.SceneManager;
        scene.register(SceneConst.LoginScene, LoginScene); //登录界面
        scene.register(SceneConst.HallScene, HallScene); //大厅界面
        scene.register(SceneConst.GameScene, GameScene); //游戏界面
        //注册弹框
        var panel = App.PanelManager;
        //默认表情资源组，由于表情多达500张图片，得分开加载
        var defalutFace = FaceFactory.getInstance().getFaceItemGroupName(ItemType.default);
        panel.register(PanelConst.ChatPanel, ChatPanel, [AssetConst.Chat, defalutFace]); //聊天面板
        panel.register(PanelConst.ResultPanel, ResultPanel); //结算面板
        panel.register(PanelConst.ResultPanel1, ResultPanel); //结算面板
        panel.register(PanelConst.MacthInfoPanel, MatchInfoPanel); //牌局信息面板
        panel.register(PanelConst.ZhuaMaPanel, ZhuaMaPanel); //抓马面板
        panel.register(PanelConst.SharePanel, SharePanel, AssetConst.Share); //分享面板
        panel.register(PanelConst.MallPanel, MallPanel); //商城面板
        panel.register(PanelConst.PaymentPanel, PaymentPanel); //支付面板
        panel.register(PanelConst.PaymentMethod, PaymentMethod); //选择支付面板
        panel.register(PanelConst.BackpackPanel, BackpackPanel); //背包面板
        panel.register(PanelConst.FriendPanel, FriendPanel); //好友房列表
        panel.register(PanelConst.JoinRoomPanel, JoinRoomPanel); //加入房间
        panel.register(PanelConst.JoinNumber, JoinNumber); //输入加入房间
        panel.register(PanelConst.GameBack, GameBack); //游戏内背包
        panel.register(PanelConst.GameMall, GameMall); //游戏内商城
        panel.register(PanelConst.GameSet, GameSet); //游戏内设置
        panel.register(PanelConst.LookRlue, LookRlue); //游戏内查看规则
        panel.register(PanelConst.ModifyRlue1, ModifyRlue1); //游戏内修改规则
        panel.register(PanelConst.InvitePanel, InvitePanel); //邀请好友列表
        panel.register(PanelConst.SignPanel, SignInPanel, AssetConst.Sign); //签名面板
        panel.register(PanelConst.RulePanel, RulePanel, [AssetConst.Rule, AssetConst.Card]); //玩法说明面板
        panel.register(PanelConst.EmailPanel, EmailPanel); //邮件面板
        panel.register(PanelConst.EmailTwoPanel, EmailTwoPanel); //二级邮件面板
        panel.register(PanelConst.FuliPanel, FuliPanel, AssetConst.Fuli); //福利面板
        panel.register(PanelConst.NewFeedBackPanel, NewFeedBackPanel, AssetConst.Feedback); //反馈面板
        panel.register(PanelConst.JjjPanel, JjjPanel, AssetConst.Jjj); //金币场面板
        panel.register(PanelConst.RankPanel, RankPanel, AssetConst.Rank); //排行榜
        panel.register(PanelConst.CreateRoomPanel, CreateRoomPanel, AssetConst.Create); //创建房间
        panel.register(PanelConst.PreloadPanel, PreloadPanel); //加载
        panel.register(PanelConst.ExRoomOpenVipPanel, ExRoomOpenVipPanel); //非专属房提示面板
        panel.register(PanelConst.QRCode, QRCode, AssetConst.Qrcode); //二维码
        panel.register(PanelConst.InputRoom, InputRoomNumPanel, AssetConst.InputRoom); //加入房间
        panel.register(PanelConst.SetPanel, SetPanel, AssetConst.SetPanel); //设置
        panel.register(PanelConst.ExcRoom, ExcRoom, AssetConst.ExcRoom); //修改房间
        panel.register(PanelConst.RankPanel1, RankPanel1, AssetConst.Rank); //排行榜
        panel.register(PanelConst.RankNewRuleDetail, RankNewRuleDetail); //排行版规则
        panel.register(PanelConst.ScorePanel, ScorePanel1, AssetConst.Score); //算分面板
        panel.register(PanelConst.ScoreDetailPanel1, ScoreDetailPanel1, AssetConst.Score); //战绩详情
        panel.register(PanelConst.LookPswPanel, LookPswPanel); //牌局回放
        panel.register(PanelConst.ReNew, ReNew); //战局回放
        panel.register(PanelConst.ScoreSharePanel, ScoreSharePanel); //战绩分享
        //监听事件
        this.addEvent(App.EVENT_NATIVE_SHAKE, this.nativeShake, this);
        this.addEvent(App.EVENT_SET_WEB_WXSHARE, this.setWebWxShare, this);
        this.addEvent(App.EVENT_NATIVE_WXSHARE, this.nativeWxShare, this);
        //显示登录界面
        this.sendEvent(LoginController.EVENT_SHOW_LOGIN);
    };
    //Native接口
    App.prototype.setInterfaces = function () {
        //手机点击退出键
        egret.ExternalInterface.addCallback("quitApp", function (message) {
            console.log("message form native : " + message);
            var messageBox = App.MsgBoxManager.getBoxA();
            messageBox.showMsg("是否关闭游戏");
            messageBox.ok = function () {
                egret.ExternalInterface.call("quitApp", "quitApp");
            };
        });
        //Native返回微信登录请求结果
        egret.ExternalInterface.addCallback("getCode", function (code) {
            Tips.info("egret get code: " + code);
            if (code) {
                //这里回调必须用异步函数
                egret.setTimeout(function () {
                    var loginController = App.getController(LoginController.NAME);
                    loginController.sendLoginAppReq(code, "");
                }, this, 10);
            }
            else {
                Tips.error("code is null");
            }
        });
    };
    /**
     * Native分享
     * @isTimeline 是否分享到朋友圈
     */
    App.prototype.nativeWxShare = function (isTimeline) {
        egret.ExternalInterface.call("wxShare", "http://gamemj.com/mj/index.php?pid=" + App.DataCenter.UserInfo.getMyUserVo().userID + "&deskCode=" + App.DataCenter.deskInfo.deskCode + "&deskId=" + App.DataCenter.deskInfo.deskID + "&gameID=" + App.serverSocket.gameID);
    };
    /**
     * Native震动
     * @shakeTime 震动时间，默认1500ms
     */
    App.prototype.nativeShake = function (shakeTime) {
        if (shakeTime === void 0) { shakeTime = 1500; }
        egret.ExternalInterface.call("shake", shakeTime + "");
    };
    /**
     * H5分享，重置微信分享接口，传入桌子号和用户ID等
     * @userID 用户ID
     * @deskCode 桌子号
     * @replayCode 回放码
     */
    App.prototype.setWebWxShare = function (userID, deskCode, replayCode, deskId) {
        var gameID = App.serverSocket.gameID;
        console.log("调用微信分享,deskCode=" + deskCode + " userID=" + userID + " replayCode=" + replayCode
            + " gameID=" + gameID);
        if (window['wxShare']) {
            window['wxShare'](userID, deskCode, replayCode, gameID, deskId);
        }
    };
    /**
     * 获取控制模块
     * @ctrlName 控制模块名
     * @return 控制模块
     */
    App.getController = function (ctrlName) {
        return App.getInstance().getController(ctrlName);
    };
    Object.defineProperty(App, "DataCenter", {
        /**数据中心*/
        get: function () {
            return DataCenter.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DeviceUtils", {
        /**设备工具类*/
        get: function () {
            return DeviceUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StageUtils", {
        /**舞台工具类*/
        get: function () {
            return StageUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ResUtils", {
        /**资源管理类*/
        get: function () {
            return ResUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LayerManager", {
        /**图层管理类*/
        get: function () {
            return LayerManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SoundManager", {
        /**声音管理*/
        get: function () {
            return SoundManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "PopUpManager", {
        /**弹框管理类*/
        get: function () {
            return PopUpManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "MsgBoxManager", {
        /**消息框管理类*/
        get: function () {
            return MessageBoxManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "BottomMenuManager", {
        /**底部菜单管理类*/
        get: function () {
            return BottomMenuManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "EventManager", {
        /**事件管理类*/
        get: function () {
            return EventMananger.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "KeyWord", {
        /**关键词屏蔽*/
        get: function () {
            return KeyWord.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LoadingLock", {
        /**加载等待动画*/
        get: function () {
            return LoadingLock.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "PanelManager", {
        /**弹框管理类*/
        get: function () {
            return PanelManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SceneManager", {
        /**场景管理类*/
        get: function () {
            return SceneManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "gameSocket", {
        /**游戏Socket*/
        get: function () {
            return SocketManager.getInstance().gameSocket;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "serverSocket", {
        /**调度Socket*/
        get: function () {
            return SocketManager.getInstance().serverSocket;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "pushSocket", {
        /**推送Socket*/
        get: function () {
            return SocketManager.getInstance().pushSocket;
        },
        enumerable: true,
        configurable: true
    });
    return App;
}(BaseApp));
/**调用Native震动*/
App.EVENT_NATIVE_SHAKE = "EVENT_NATIVE_SHAKE";
/**设置web微信分享*/
App.EVENT_SET_WEB_WXSHARE = "EVENT_SET_WEB_WXSHARE";
/**native微信分享*/
App.EVENT_NATIVE_WXSHARE = "EVENT_NATIVE_WXSHARE";
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map