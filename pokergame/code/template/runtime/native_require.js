
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/socket/socket.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/particle/particle.js",
	"libs/modules/md5/md5.js",
	"libs/cryptoJS/base64.js",
	"libs/cryptoJS/rc4.js",
	"bin-debug/framework/base/BaseUI.js",
	"bin-debug/framework/base/SingleClass.js",
	"bin-debug/framework/base/BaseApp.js",
	"bin-debug/framework/base/BaseController.js",
	"bin-debug/framework/base/BasePanel.js",
	"bin-debug/framework/base/BaseScene.js",
	"bin-debug/gdmj/model/data/RoomInfo.js",
	"bin-debug/framework/adapter/AssetAdapter.js",
	"bin-debug/framework/display/BitmapMovie.js",
	"bin-debug/framework/net/ClientSocket.js",
	"bin-debug/framework/net/CryptoUtils.js",
	"bin-debug/framework/net/SocketManager.js",
	"bin-debug/framework/utils/ArrayTool.js",
	"bin-debug/framework/utils/DateTimer.js",
	"bin-debug/framework/utils/DeviceUtils.js",
	"bin-debug/framework/utils/EffectUtils.js",
	"bin-debug/framework/utils/EventMananger.js",
	"bin-debug/framework/utils/Jsconfig.js",
	"bin-debug/framework/utils/LayerManager.js",
	"bin-debug/framework/utils/NumberTool.js",
	"bin-debug/framework/utils/ObjectPool.js",
	"bin-debug/framework/utils/PanelManager.js",
	"bin-debug/framework/utils/PopUpManager.js",
	"bin-debug/framework/utils/ResUtils.js",
	"bin-debug/framework/utils/SceneManager.js",
	"bin-debug/framework/utils/SoundManager.js",
	"bin-debug/framework/utils/StageUtils.js",
	"bin-debug/framework/utils/StringTool.js",
	"bin-debug/framework/utils/Tips.js",
	"bin-debug/gdmj/App.js",
	"bin-debug/gdmj/constant/AssetConst.js",
	"bin-debug/gdmj/constant/EventConst.js",
	"bin-debug/gdmj/constant/PanelConst.js",
	"bin-debug/gdmj/constant/SceneConst.js",
	"bin-debug/gdmj/model/data/BagInfo.js",
	"bin-debug/gdmj/model/data/ColorInfo.js",
	"bin-debug/gdmj/model/data/DebugInfo.js",
	"bin-debug/gdmj/model/data/DeskInfo.js",
	"bin-debug/gdmj/model/data/ErrorCode.js",
	"bin-debug/gdmj/model/data/GameInfo.js",
	"bin-debug/gdmj/model/data/GoldRoomInfo.js",
	"bin-debug/gdmj/model/data/MarqueeInfo.js",
	"bin-debug/gdmj/model/data/ReplayInfo.js",
	"bin-debug/framework/adapter/ThemeAdapter.js",
	"bin-debug/gdmj/model/data/ServerInfo.js",
	"bin-debug/gdmj/model/data/ShareInfo.js",
	"bin-debug/gdmj/model/data/ShopInfo.js",
	"bin-debug/gdmj/model/data/SignInfo.js",
	"bin-debug/gdmj/model/data/UserInfo.js",
	"bin-debug/gdmj/model/data/WelfareInfo.js",
	"bin-debug/gdmj/model/data/WxInfo.js",
	"bin-debug/gdmj/model/DataCenter.js",
	"bin-debug/gdmj/model/protocol/ProtocolData.js",
	"bin-debug/gdmj/model/protocol/ProtocolHead.js",
	"bin-debug/gdmj/model/protocol/ProtocolHttp.js",
	"bin-debug/gdmj/model/vo/UserVO.js",
	"bin-debug/gdmj/view/common/BottomMenuManager.js",
	"bin-debug/gdmj/view/common/BottomMenus.js",
	"bin-debug/gdmj/view/common/LoadingLock.js",
	"bin-debug/gdmj/view/common/MessageBox.js",
	"bin-debug/gdmj/view/common/MessageBoxManager.js",
	"bin-debug/gdmj/view/common/PanelBg.js",
	"bin-debug/gdmj/view/game/doublek/DKGameController.js",
	"bin-debug/gdmj/view/game/doublek/DKGameScene.js",
	"bin-debug/gdmj/view/game/GameController.js",
	"bin-debug/gdmj/view/game/GameScene.js",
	"bin-debug/gdmj/view/game/ui/HeadUI.js",
	"bin-debug/gdmj/view/game/ui/OutTimeUI.js",
	"bin-debug/gdmj/view/game/ui/ResidueUI.js",
	"bin-debug/gdmj/view/hall/award/AwardPanel.js",
	"bin-debug/gdmj/view/hall/croom/CroomPanel.js",
	"bin-debug/gdmj/view/hall/eroom/ERoomPanel.js",
	"bin-debug/gdmj/view/hall/HallController.js",
	"bin-debug/gdmj/view/hall/HallScene.js",
	"bin-debug/gdmj/view/hall/marquee/Marquee.js",
	"bin-debug/gdmj/view/hall/message/MessagePanel.js",
	"bin-debug/gdmj/view/hall/pay/PayPanel.js",
	"bin-debug/gdmj/view/hall/pInfo/PersionInfoPanel.js",
	"bin-debug/gdmj/view/hall/rule/RulePanel.js",
	"bin-debug/gdmj/view/hall/score/ScoreItem.js",
	"bin-debug/gdmj/view/hall/score/ScorePanel.js",
	"bin-debug/gdmj/view/hall/set/SetPanel.js",
	"bin-debug/gdmj/view/load/PreloadPanel.js",
	"bin-debug/gdmj/view/login/LoginController.js",
	"bin-debug/gdmj/view/login/LoginScene.js",
	"bin-debug/Main.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedHeight",
		contentWidth: 960,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};