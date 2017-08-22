/**
 *
 * @author 
 *
 */
class GlobalClass {
    
    public static GameInfoForConfig ={
        loginServer: "bsfb10",
        wsURL : "",
        LoginMode : 0,
        UniqueSerial : "000000-001-153",
        UniqueSerialInfo: [],
        ShowWay : -1,
        registerNeedBind : 0 ,
        IsRelease: "false",
        UpdateType: 1,
        UpdateContent: "null",
        UpdateURL :"null",
        LoginWay : 1,
        ButtonType : 1,
        PayWay : 1,
        SDKType : 1,
        QuitGameType : 0,
        LogOutType : 0 ,
        QQ : "",
        isCheckBetLog : false,
        bUsingLuaPanel : true,
        progressPercentage : 0 ,
        totalUpdateFiles : 0,
        totalUpdateFilesSize :0,
        currentUpdateFiles : 0,
        openChatGuild : 1,
        openChatWorld : 1,
        IsDebug :false,
		//语言类型
		LanguageType:"简体中文",
		LanguageCode:"1001",
        //国家码
	    CountryCodeJsonData : null,
	    CountryCodeStr : null,
	    CountryCodeCount : 0,
	    CurCountryCode : "86",
    }

	public static LoginClass ={
		/// <summary>
		/// 是否显示更多游戏按钮
		/// </summary>
		IsOpenMoGame:false,
		/// <summary>
		/// 点数提醒
		/// </summary>
		BindPhoneRemind:0,
		/// <summary>
        /// 更多游戏
        /// </summary>
        games:[],
		/// <summary>
        /// 充值送称号
        /// </summary>
		SmallRecharge:"",
		iosUUID:"",

		/// <summary>
		/// 是否是美国IP
		/// </summary>
		 isUSAIP:false,

		 /// <summary>
		/// 是否收到心跳回复
		/// </summary>
		 isHeartReturn:false,

		 /// <summary>
		/// 是否第一次发心跳回复
		/// </summary>
		 isFirstHeart:true,
	}
    
    public static SDKType =
	{
		/// <summary>
		/// 是否显示石头剪布
		/// </summary>
		  bShowStone : true,
		/// <summary>
		/// 是否显示五星宏辉
		/// </summary>
		  bShowFive : true,
		/// <summary>
		/// 是否显示大话骰
		/// </summary>
		  bShowDice : true,
		/// <summary>
		/// 购买项改为钻石
		/// </summary>
		strShowDiamond : "元",
		/// <summary>
		/// 是否显示视频聊天
		/// </summary>
		  bShowVedio : true,
		/// <summary>
		/// 是否显示银行
		/// </summary>
		  bShowBank : true,
		/// <summary>
		/// 是否显示分享
		/// </summary>
		  bShowShare : false,
		/// <summary>
		/// 是否显示关于界面
		/// </summary>
		  bShowAbout : true,
		/// <summary>
		/// 是否显示客服
		/// </summary>
		  bShowCustomService : true,
		/// <summary>
		/// 是否显示公会
		/// </summary>
		  bShowClub : true,
		/// <summary>
		/// 隐藏购买功能
		/// </summary>
		  bShowShop : true,
		/// <summary>
		/// 是否显示游戏中银行
		/// </summary>
		  bShowBank2 : true,
		/// <summary>
		/// 是否显示游戏中公会
		/// </summary>
		  bShowClub2 : true,
		LoginNum : -1,
		/// <summary>
		/// 领取低保是否开启验证
		/// </summary>
        ReceiveMoneyForWeb: [] ,
		/// <summary>
		/// 是否新手引导需要验证
		/// </summary>
         IsGuildeNeedVerify:[] ,

		 
    }

	public static StoneClass = 
	{

		/// <summary>
		/// 是否打开大喇叭
		/// </summary>
		isLoudSpeaker :false,
		/// <summary>
		/// 存储大喇叭信息
		/// </summary>
		str_LoudSpeaker:"",
		/// <summary>
		/// 大喇叭信息循环次数
		/// </summary>
		int_LoudSpeakerTime:0,
		/// <summary>
		/// 大喇叭X轴坐标
		/// </summary>
		int_LoudSpeaker_x:0,
		/// <summary>
		/// 喇叭显示时间
		/// </summary>
		f_LoudSpeakerTime:0,
		/// <summary>
		/// 喇叭文本颜色
		/// </summary>
		str_LoudSpeaker_Color:"",
		/// <summary>
		/// 喇叭类型
		/// </summary>
		str_LoudSpeaker_type:"",
		str_LoudSpeaker_VIPorNO:"",

		/// <summary>
		/// 是否显示提示面板
		/// </summary>
		isshowTip:false,
		/// <summary>
		/// 是否设置申请擂台的分数的Value
		/// </summary>
		issetCurrentTotalScore:false,
		/// <summary>
		/// 是否显示擂台列表（挑战主界面）
		/// </summary>
		isshowArenaList:false,
		/// <summary>
		/// 是否登录擂台失败
		/// </summary>
		isLoginArenaWrong:false,
		/// <summary>
		/// 当前总分
		/// </summary>
		int_currentTotalScore:0,
		/// <summary>
		/// 当前页数
		/// </summary>
		int_currentPage:0,
		/// <summary>
		/// 时间 判断是否连接超时等
		/// </summary>
		f_publicTime:0,
		/// <summary>
		/// 错误信息编号
		/// </summary>
		str_errorCause:"",
		/// <summary>
		/// 挑战结果：谁赢（0为挑战者输，1为挑战者赢，2平局,3超时）
		/// </summary>
		str_betResult:"",
		/// <summary>
		/// 摆擂台人手势:（0:石头 1:剪刀 2:布）
		/// </summary>
		str_ArenaGesture:"",
		/// <summary>
		/// 挑战人手势:（0:石头 1:剪刀 2:布）
		/// </summary>
		str_ChallengeGesture:"",
		/// <summary>
		/// 挑战点数
		/// </summary>
		str_betScore:"",
		/// <summary>
		/// 手续费（收取赢的一方的手续费）
		/// </summary>
		str_Fee:"",
		/// <summary>
		/// 手势选择编码
		/// </summary>
		int_GestureChoice:0,
		/// <summary>
		/// 是否跳转页面
		/// </summary>
		ischangePanel:false,
		/// <summary>
		/// 跳转页面的ID  （0~5）
		/// </summary>
		int_panelID:0,
		/// <summary>
		/// 识别按下了擂台列表的哪列上的按钮
		/// </summary>
		int_listindex:0,
		/// <summary>
		/// 最大页数
		/// </summary>
		int_totalPage:0,
		/// <summary>
		/// 发起挑战的登录ID
		/// </summary>
		str_loginID:"",
		/// <summary>
		/// 发起挑战的登录密码
		/// </summary>
		str_loginPW:"",
		/// <summary>
		/// 数据信息列表
		/// </summary>
		str_listData: [],
		/// <summary>
		/// 数据信息列表2
		/// </summary>
		str_listData2: [],
		str_MyArenaData : [],
	}

	public static Bank = 
	{
		/// <summary>
		/// 存入银行点数
		/// </summary>
		BankPoints:0,

		/// <summary>
		/// 存入钱包点数
		/// </summary>
		WalletPoints:0,

		/// <summary>
		/// 密码输错超过5次
		/// </summary>
		bLock:false,

		/// <summary>
		/// 记住密码信息
		/// </summary>
		BankCode:"",
	}

	public static ClubClass =
	{
		isFirstSendClubMsg : true,
		str_ClubMsgRet:"",
        /// <summary>
        /// 搜索公会ID
        /// </summary>
        SearchClubID:"",


        /// <summary>
        /// 创建公会费用
        /// </summary>
        CreatClubCost:"",
        /// <summary>
        /// 创建公会等级
        /// </summary>
        CreatClubLevel:"",
        /// <summary>
        /// 自己的职位
        /// </summary>
        MyPosition:"",

        /// <summary>
        /// 设置最大值
        /// </summary>
        MaxSetTimes:"",

        /// 公会ID
        /// </summary>
        ClubID:"0",
        /// <summary>
        /// 我的公会等级
        /// </summary>
        MyClubLevel:"",
        /// <summary>
        /// 公会救济金
        /// </summary>
        ClubDole:"",
        /// <summary>
        /// 最大公会救济金
        /// </summary>
        DolelLimit:"",
        
		/// <summary>
		/// 职位定义
		/// </summary>
		Json_PositionDefine:"",
		/// <summary>
		/// 当前职位信息
		/// </summary>
		Json_PositionInfo:"",

		/// <summary>
		/// 审核类型设置0:禁止申请，1：需要审核，2：直接通过
		/// </summary>
		int_VerifyType:0,
		/// <summary>
		/// 临时备用 审核类型设置 0:禁止申请，1：需要审核，2：直接通过
		/// </summary>
		int_VerifyTypeBackup:0,

		/// <summary>
		/// 领取类型 自定义 0：捐入  1领取 2 全部领取
		/// </summary>
		int_ReceiveType:0,
		/// <summary>
		/// 领取次数
		/// </summary>
		str_ReceiveTimes:"",

		/// <summary>
		/// 未处理入会申请数
		/// </summary>
		int_applyNum:0,

		/// <summary>
		/// 公会成员设置ID
		/// </summary>
		str_MemberSettingID:"",
		str_PositionOriginID:"",
		str_PositionSettingID:"",

		/// <summary>
		/// 职位ID
		/// </summary>
		str_PositionID:"",

 
        /// <summary>
        /// 公会公告
        /// </summary>
        str_Notice:"",

        /// <summary>
        /// 领取次数
        /// </summary>
        str_Receive_Times:"",


        /// <summary>
        ///  申请ID列表  1018(批量审核入会申请)
        /// </summary>
        str_ApplyList:"",

        /// <summary>
        /// 过滤后的公会成员数据
        /// </summary>
		clubdataInfoList:[],
	}
    
    public static HallClass =
	{

		/// <summary>
		/// 是否显示主菜单界面的分数
		/// </summary>
		 issetCurrentTotalScore: false,
		/// <summary>
		/// 是否加载进入石头剪刀布场景
		/// </summary>
         isloadStone: false,
		/// <summary>
		/// 是否加载进入五星宏辉场景
		/// </summary>
		 isloadFive: false,
		/// <summary>
		/// 是否显示提示信息
		/// </summary>
		 isshowTip: false,
		/// <summary>
		/// 显示信息面板
		/// </summary>
         isShowTipPanel: false,
		/// <summary>
		/// 时间 判断是否连接超时等
		/// </summary>
		 f_publicTime: 0 ,
		/// <summary>
		/// 错误信息编号
		/// </summary>
		 str_errorCause: "",
		/// <summary>
		/// 系统消息
		/// </summary>
		 str_adminMessage: "",
		/// <summary>
		/// 转换场景ID
		/// </summary>
		int_planeID : 0 ,
		/// <summary>
		/// 是否变换场景
		/// </summary>
        ischange: false,
		// isloadStone://是否进入剪刀石头
		/// <summary>
		/// 是否更新签到配置信息
		/// </summary>
        isUpdate_SystemSignInInfo: false,
		/// <summary>
		/// 是否更新个人签到信息
		/// </summary>
        isUpdate_MySignInInfo: false,
		/// <summary>
		/// 是否更新个人经验
		/// </summary>
        isUpdate_MyLevelExp: false,
		/// <summary>
		/// 是否打开签到面板（首次）
		/// </summary>
        isOpenSignInPanel: false,
		/// <summary>
		/// 石头剪刀布和五星宏辉的限制等级
		/// 0-石头剪刀布
		/// 1-五星宏辉
		/// </summary>
		str_Hall_IntLevel: [],

		/// <summary>
		/// 擂台数量
		/// </summary>
		 str_ArenaCount: "",
		/// <summary>
		/// 是否开过累积奖
		/// 0 没有开过
		/// 不等于0 开过
		/// </summary>
		 str_isOpenSlot: "",
		/// <summary>
		/// 摆擂choushui比例
		/// </summary>
		 str_ChallengeRate: "",
        /// <summary>
        /// VIP摆擂choushui比例
        /// </summary>
         str_ChallengeRateVIP: "",
		/// <summary>
		/// 是否需要修改昵称
		/// </summary>
		 need_Modify_NickName:  false,
		/// <summary>
		/// 是否  显示VIPLOGO
		/// </summary>
         isShowVIPLogo: false,
		/// <summary>
		/// 绑定手机号码  0为未绑定  其他为已绑定
		/// </summary>
		 str_BindingPhone: "",
		/// <summary>
		/// 是否启用绑定手机按钮  0为禁用  1位启用
		/// </summary>
		 CanModifyPSW:  false,
		/// <summary>
		/// 是否可修改密码 0为不可  1位可
		/// </summary>
		 str_OpenBindingPhone: "",
		/// <summary>
		/// 是否打开安全面板 0为不可  1位可
		/// </summary>
         OpenSafety: false,
		/// <summary>
		/// 绑定赠送金币
		/// </summary>
		 str_BindingPrice: "",
		/// <summary>
		/// 解绑扣除金币
		/// </summary>
		 str_UnBindingPrice: "",
		/// <summary>
		/// 提醒消耗
		/// </summary>
		 str_UnBindingTips:"",
		 str_SuperBetCount:"",
		/// <summary>
		/// 点数
		/// </summary>
         str_BetCount: [],
		/// <summary>
		/// 是否打开绑定   0不打开  1打开
		/// </summary>
		 int_OpenBinding : 1,
        /// <summary>
        /// 是否是用手机注册的
        /// </summary>
         isRegByMobile : 0,
		/// <summary>
		/// 登录验证需求
		/// </summary>
		bGetCodes:[],
        /// <summary>
        /// 是否绑定了身份证
        /// </summary>
	     bIDSecurity_Binding:false,
		/// <summary>
		/// 是否设置了口令
		/// </summary>
         bCodeProtect_Binding: false,
		/// <summary>
		/// 是否开启了口令保护
		/// </summary>
         bCodeProtect_Open: false,
		/// <summary>
		/// 是否已经验证了口令
		/// </summary>
         bCodeProtect_HaveChecked: false,
        /// <summary>
        /// 是否年满18周岁
        /// </summary>
         bAgeLegal: false,
        /// <summary>
        /// 防沉迷是否激活 ( 0：未激活 1：已经激活)
        /// </summary>
	     fangChenMiEnabled : 0,
        /// <summary>
        /// 是否改过昵称
        /// </summary>
         isShowNick : false,
		/// <summary>
		/// 是否第一次进入hall
		/// </summary>
		 firstOpenHall : true,
		 /// <summary>
        /// 防沉迷服务器回复
        /// </summary>
	     fangChenMiResult : "",

}

    public static UserInfo={
        systemMsg: "",
        /// <summary>
        /// 是否使用加速
        /// </summary>
		useSpeedup:"0",
        /// <summary>
        /// 用户账号
        /// </summary>
        str_UserAccount: "",
        /// <summary>
        /// 用户昵称
        /// </summary>
        str_UserNickname: "",
		/// <summary>
        /// 朋际ID
        /// </summary>
        str_PengJiID: "100026",
        /// <summary>
        /// 用户ID
        /// </summary>
        str_UserID: "",
        /// <summary>
        /// 用户密码
        /// </summary>
        str_UserPassword: "",
        /// <summary>
        /// 最后一次登录账号
        /// </summary>
        str_lastUserAccount: "",
        /// <summary>
        /// 用户等级
        /// </summary>
        str_UserLevel: "",
        /// <summary>
        /// 用户的经验值
        /// </summary>
        str_MyUserExp: "",
        /// <summary>
        /// 升级经验值
        /// </summary>
        str_NextLevelExp: "",
        /// <summary>
        /// 上一级经验值
        /// </summary>
        str_LastLevelExp: "",
        /// <summary>
        /// 判断是否为新手（经验为0时）
        /// </summary>
        isNewbie: false,
        /// <summary>
        /// 判断是否进行验证游戏
        /// </summary>
        isVGame: false,
        /// <summary>
        /// 验证游戏地址
        /// </summary>
        vGameIpPort: "",
        /// <summary>
        /// 判断是否游客
        /// </summary>
        isAnonymous: false,
        /// <summary>
        /// 以天数决定是否为新手 主要用于统计
        /// </summary>
        isNew: false,
        /// <summary>
		/// 玩家总分数
		/// </summary>
		 str_Hall_totalScore:"0",
        /// <summary>
        /// 玩家总金币数
        /// </summary>
	     str_Hall_totalGold:"0",
        /// <summary>
        /// 玩家总钻石数目
        /// </summary>
	     str_Hall_totalDiamond:"0",
		/// <summary>
		/// 是否已经签到
		/// </summary>
         str_Hall_isSignIn: "",
		/// <summary>
		/// 已经签到的天数
		/// </summary>
         str_Hall_SignInDays: "",
		/// <summary>
		/// 签到信息的数量
		/// </summary>
         str_Hall_SignIn_Group: [],
		/// <summary>
		/// 签到奖品类型
		/// </summary>
         str_Hall_SignIn_PrizeType: [],
		/// <summary>
		/// 签到奖品  点数时是价格,道具时是ID
		/// </summary>
		 str_Hall_SignIn_PrizePrices:[],
		/// <summary>
		/// 签到奖品数量
		/// </summary>
		 str_Hall_SignIn_PrizeAmount:[],
		 /// <summary>
		/// 是否中累积奖
		/// </summary>
         Game_isSlot: false,
		 /// <summary>
		/// 是否进入龙珠探宝
		/// </summary>
         Game_isEnterLZTB: false,
		/// <summary>
		/// 累积奖数值_连环夺宝场景
		/// </summary>
         str_Game_slotScore: "0",
		/// <summary>
		/// 上轮总分
		/// </summary>
		 str_Game_lastTotalScore:"0",
		/// <summary>
		/// 目前总分
		/// </summary>
		 str_Game_currentTotalScore:"0",
		/// <summary>
		/// 上轮今天总分
		/// </summary>
		 str_Game_lastTodayScore:"0",
		/// <summary>
		/// 目前今天总分
		/// </summary>
		 str_Game_currentTodayScore:"0",
		/// <summary>
		/// 上轮累积奖分
		/// </summary>
		 str_Game_lastSlotScore:"0",
		/// <summary>
		/// 目前累计奖分
		/// </summary>
		 str_Game_currentSlotScore:"0",
		/// <summary>
		/// 上轮总分
		/// </summary>
		 str_Search_lastTotalScore:"0",
		/// <summary>
		/// 目前总分
		/// </summary>
		 str_Search_currentTotalScore:"0",
		/// <summary>
		/// 上轮今天总分
		/// </summary>
         str_Search_lastTodayScore: "0",
		/// <summary>
		/// 目前今天总分
		/// </summary>
         str_Search_currentTodayScore: "0",
		/// <summary>
		/// 上轮累积奖分_龙族探宝场景
		/// </summary>
         str_Search_lastSlotScore: "0",
		/// <summary>
		/// 目前累计奖分_龙族探宝场景
		/// </summary>
         str_Search_currentSlotScore: "0",
		/// <summary>
		/// 保存和游戏和QQ 微信账号信息
		/// </summary>
         str_GameLoginMsg: "0",


		/// <summary>
		/// 商品ID
		/// </summary>
		 Product_Id:"0",
		/// <summary>
		/// 商品名称
		/// </summary>
		 Product_Name:"0",
		/// <summary>
		/// 商品价格
		/// </summary>
		 Product_Price:"0",

		/// <summary>
		/// 获取anysdk渠道号
		/// </summary>
		 str_AnySDKChannelID:"0",

        /// <summary>
        /// 1个钻石兑换多少金币
        /// </summary>
	     DiamondToGold:1000,
        /// <summary>
        /// 1个钻石兑换多少点数
        /// </summary>
	     DiamondToPoint:1000,
        /// <summary>
        /// 1个金币兑换多少点数
        /// </summary>
        GoldToPoint:2,
	    /// <summary>
	    /// 0:没有金币  1：有金币
	    /// </summary>
	     packageType:1,
}
    
    public static GameClass = {
        /// <summary>
		/// 是否打开大喇叭
		/// </summary>
		 isLoudSpeaker:false,
		 /// <summary>
		/// 是否第一次退出
		/// </summary>
		isquitAtOnce:false,
		/// <summary>
		/// 存储大喇叭信息
		/// </summary>
		str_LoudSpeaker:"",
		/// <summary>
		/// 大喇叭信息循环次数
		/// </summary>
		int_LoudSpeakerTime:0,
		/// <summary>
		/// 大喇叭X轴坐标
		/// </summary>
		int_LoudSpeaker_x:0,
		/// <summary>
		/// 喇叭文本颜色
		/// </summary>
        str_LoudSpeaker_Color: "",
		/// <summary>
		/// 喇叭类型
		/// </summary>
        str_LoudSpeaker_type: "",
		/// <summary>
		/// 判断是否VIP
		/// </summary>
        str_LoudSpeaker_VIPorNO: "",
		/// <summary>
		/// 喇叭消息——识别用户名 只有喇叭类型是中奖喇叭时才获取
		/// </summary>
        str_LoudSpeaker_userName: "",
		/// <summary>
		/// 打开中奖喇叭
		/// </summary>
		 isOpenWinLoudSpeaker:false,
        /// <summary>
		/// 当前关卡
		/// </summary>
		int_level:1,
        /// <summary>
        /// 砖块图
        /// </summary>
        f_brickArray:[],
		// <summary>
        ///  宝石风暴游戏托管状态
        /// </summary>
		bsfbIsAutoPlay:false,
		// <summary>
        ///  宝石风暴游戏自动使用手气卡
        /// </summary>
		bsfbIsAutoUseProp:false,

		/// <summary>
		/// 初始数据 （源）
		/// </summary>
		str_init : "",
		/// <summary>
		/// 补充（源）
		/// </summary>
		str_suppliment:"",
		/// <summary>
		/// 组合结算数据（源）
		/// </summary>
		str_groupBallanceData:"",
		/// <summary>
		/// 组合消除数据（源）
		/// </summary>
		str_turnDesData:"",
		/// <summary>
		/// 几行几列
		/// </summary>
		int_grid :0,

		/// <summary>
		/// 每个道具的ID
		/// </summary>
		str_PropsId:[],
		/// <summary>
		/// 每个道具的价格
		/// </summary>
		str_PropsPrices:[],
		/*每个道具的价格*/
		/// <summary>
		/// 每个道具的VIP价格
		/// </summary>
		str_PropsVIPPrices:[],
		/*每个道具的VIP价格*/
		/// <summary>
		/// 每个道具的类型
		/// </summary>
		str_PropsType:[],
		/// <summary>
		/// 每个道具的名称
		/// </summary>
		str_PropsName:[],
		/// <summary>
		/// 每个道具的数量
		/// </summary>
		str_PropsAmount:[],/*每个道具的数量*/


		// <summary>
		/// 每个点数的ID
		/// </summary>
		str_ScoreId:[],
		/// <summary>
		/// 每个点数的价格
		/// </summary>
		str_ScorePrices:[],
		/// <summary>
		/// 每个点数的名称
		/// </summary>
		str_ScoreName:[],
		/// <summary>
		/// 充值平台
		/// </summary>
		str_ScoreType:[],

		/// <summary>
		/// 道具组的数量
		/// </summary>
		Str_PropsGroup:[],
		/// <summary>
		/// 充值点数组的数量
		/// </summary>
		Str_ScoreGroup:[],

		/// <summary>
		/// 数据信息列表(用于道具)
		/// </summary>
		str_listData:[],
		/// <summary>
		/// 数据信息列表（用于点数）
		/// </summary>
		str_listData2:[],
		/// <summary>

		/// <summary>
		/// 识别当前购买道具按钮的ID
		/// </summary>
		str_PropsIDindex:"",
		/// <summary>
		/// 识别当前购买点数按钮的ID
		/// </summary>
		str_ScoreIDindex:"",
		/// <summary>
		/// 识别当前购买点数的虚拟价格
		/// </summary>
		str_ScoreIDprices:"",
		/// <summary>
		/// 真实价格
		/// </summary>
		str_RealMoney:"",

		/// <summary>
		/// 新手引导  102数据
		/// </summary>
		str_Newbie_102Data:[],

		/// <summary>
		/// 购买点数
		/// </summary>
		isBuyScore:false,

		/// <summary>
		/// 购买VIP
		/// </summary>
		isBuyVip:false,
    }
    
    public static SearchClass={
        /// <summary>
		/// 龙珠探宝的选项
		/// </summary>
        str_dragonOption:[],
        /// <summary>
        /// 是否显示提示信息
        /// </summary>
        isshowTip:false,
        /// <summary>
        /// 是否开始龙珠探宝
        /// </summary>
        issearchBegin: false,
        /// <summary>
        /// 是否打开监听
        /// </summary>
        isbeginListen: false,

    }

	public static TaskClass={

		/// <summary>
		/// 是否更新任务信息
		/// </summary>
		  isUpdateTaskInfo:false,

		/// <summary>
		/// 任务类型（2014年10月11日11:53:47——目前只有低保功能）
		/// </summary>
		 str_TaskType:"",
		/// <summary>
		/// 任务返回信息（2014年10月11日11:53:47——目前只有低保功能）
		/// </summary>
		 str_TaskMssage:"",
		/// <summary>
		/// 领取次数
		/// </summary>
		 str_ReceiveTimes:"",
		/// <summary>
		/// 领取条件
		/// </summary>
		 str_ReceiveConditions:"",
		/// <summary>
		/// 领取分数
		/// </summary>
		 str_ReceiveScore:"",

		/// <summary>
		/// VIP信息
		/// </summary>
		 str_VIPInfo_Group:[],
		/// <summary>
		/// VIP价格组
		/// </summary>
		 str_VIPPrice:[],
		/// <summary>
		/// VIP类型
		/// </summary>
		 str_VIPType:[],
		/// <summary>
		/// VIP价格
		/// </summary>
		 str_VIP_Price:"",
		/// <summary>
		/// VIP信息的ID（购买时识别）
		/// </summary>
		 str_VIPID:"",
		/// <summary>
		/// VIP信息的ID组合
		/// </summary>
		 str_VIPID_Group:[],
		/// <summary>
		/// VIP信息的命名组合
		/// </summary>
		 str_VIPName_Group:[],
		/// <summary>
		/// VIP身份
		/// 0-不是vip，1-是vip
		/// </summary>
		 str_VIPStatus:"",
		/// <summary>
		/// VIP天数
		/// </summary>
		 str_VIPDays:"",
		/// <summary>
		/// VIP等级
		/// </summary>
		 str_VIPLevel:"",


		/// <summary>
		/// 活动信息
		/// </summary>
		 str_ActivityInfo_Group:[],
		/// <summary>
		/// 活动ID
		/// </summary>
		 str_Activity_ID:[],
		/// <summary>
		/// 活动标题
		/// </summary>
		 str_Activity_Title:[],
		/// <summary>
		/// 活动开始时间
		/// </summary>
		 str_Activity_StartTime:[],
		/// <summary>
		/// 活动结束时间
		/// </summary>
		 str_Activity_EndTime:[],
		/// <summary>
		/// 活动介绍
		/// </summary>
		 str_Activity_Info:[],
		/// <summary>
		/// (活动) 是否置顶
		/// 1——置顶
		/// 0——不需置顶
		/// </summary>
		 str_Activity_isTop:[],
		/// <summary>
		/// 是否达到条件可领取奖励(活动)
		/// 1——可领取
		/// 0——不可领取
		/// </summary>
		 str_Activity_isReceive:[],
		/// <summary>
		/// 是否已经领取奖励(活动)
		/// 1——已领取
		/// 0——未领取
		/// </summary>
		 str_Activity_HasReceive:[],
		/// <summary>
		/// 完成进度(活动)
		/// </summary>
		 str_Activity_Progress:[],
		/// <summary>
		/// 图标ID(活动)
		/// </summary>
		 str_Activity_IconID:[],
		/// <summary>
		/// 创建活动的开关
		/// </summary>
		  isCreatActivity:"",
		/// <summary>
		/// 公告信息
		/// </summary>
		 str_BulletinInfo_Group:"",
		/// <summary>
		/// 公告ID
		/// </summary>
		 str_Bulletin_ID:"",
		/// <summary>
		/// 公告标题
		/// </summary>
		 str_Bulletin_Title:"",
		/// <summary>
		/// 是否显示公告详情
		/// </summary>
		  isShowBulletinInfo:false,
		/// <summary>
		/// 存储公告ID
		/// </summary>
		 str_InputBulletinID:"",
	}

	public static Speed=
    {
        /// <summary>
        /// 掉落速度
        /// </summary>
         fallSpeed:0,
		 /// <summary>
        /// 天女散花速度
        /// </summary>
		 splitSpeed:0,
		 /// <summary>
        /// 天女散花启动等待时间
        /// </summary>
		 OnSplitBegin:0,
        /// <summary>
        /// 初始画片停顿，再开始消除组合 三关
        /// </summary>
         StartNewGroup0:0,
         StartNewGroup1:0,
         StartNewGroup2:0,

        /// <summary>
        /// 重新开局
        /// </summary>
         NewGroup:0,
        
        /// <summary>
        /// 局结算时间  初始
        /// </summary>
         StartShowRoundBallance0:0,
         StartShowRoundBallance1:0,
         StartShowRoundBallance2:0,

		 /// <summary>
        /// 动画播放帧率
        /// </summary>
		 diggerframeRate:0,
		 /// <summary>
        /// 砖头播放帧率
        /// </summary>
		 brickframeRate:0,
        /// <summary>
        /// 消除和下落之间相隔
        /// </summary>
         ShowUpFall:0,
        /// <summary>
        /// 判断钻头爆炸后下落的下一步
        /// </summary>
         DiggerFallBallance:0,
        /// <summary>
        /// 判断本次下落的下一步
        /// </summary>
         FallBallance:0,
        /// <summary>
        /// 托管时间
        /// </summary>
         OnPayPress:0,
        /// <summary>
        /// 源宝石掉落的时间间隔
        /// </summary>
         FallTime0:0,
        /// <summary>
        /// 补充宝石掉落的时间间隔
        /// </summary>
         FallTime1:0,

		 /// <summary>
        /// DiggerFallBallance函数里常量时间
        /// </summary>
        DiggerFallBallanceTime:0,

		 /// <summary>
        /// FallBallance函数里常量时间
        /// </summary>
		FallBallanceTime:0,

		/// <summary>
        /// 播放下落音效等待时间
        /// </summary>
		playDownEffect:0,

		/// <summary>
        /// 播放累计奖动画等待时间
        /// </summary>
		showWinSlot:0,
    }

	public static FiveClass ={

		/// <summary>
		/// bet点数组
		/// </summary>
		str_Count_Group :[],
		/// <summary>
		/// bet点数
		/// </summary>
		str_BetCount :"",
		/// <summary>
		/// betID
		/// </summary>
		str_BetID:"",
		/// <summary>
		/// 花色ID
		/// </summary>
		int_PokerID : 0,
		/// <summary>
		/// 开奖记录组
		/// </summary>
		str_LotteryRecord_Group:[],
		/// <summary>
		/// 开奖记录数字
		/// </summary>
		str_LotteryRecordNum_Group:[],
		/// <summary>
		/// bet时间组
		/// </summary>
		str_BetTime_Group:[],
		/// <summary>
		/// 局数信息组
		/// </summary>
		str_Inning_Group:[],
		/// <summary>
		/// bet点数组
		/// </summary>
		str_BetCount_Group:[],
		/// <summary>
		/// 我的点数
		/// </summary>
		str_MyCount:"",
		int_AddMyCount:0,

		

		/// <summary>
		/// 开牌数值
		/// </summary>
		str_LotteryNum:"",
		/// <summary>
		/// 开牌花色
		/// </summary>
		str_LotteryPocker_Color:"",
		/// <summary>
		/// 是否第一次加载
		/// </summary>
		isFirstInitSet:false,
		/// <summary>
		/// 中奖金额
		/// </summary>
		str_WinCount:"",
		/// <summary>
		/// 退出操作消息
		/// </summary>
		str_QuitMsg:"",
		/// <summary>
		/// 系统维护提示
		/// </summary>
		str_SystemMaintenance:"",
		/// <summary>
		/// 
		/// </summary>
		str_dataObj:"",
		/// <summary>
		/// 喇叭消息
		/// </summary>
		str_LoudSpeaker:"",
		/// <summary>
		/// 喇叭颜色
		/// </summary>
		str_LoudSpeaker_Color:"",
		/// <summary>
		/// 喇叭类型
		/// </summary>
		str_LoudSpeaker_type:"",
		str_LoudSpeaker_VIPorNO:"",
		/// <summary>
		/// 跑马灯X轴坐标
		/// </summary>
		int_LoudSpeaker_x:0,
		/// <summary>
		/// 跑马灯时间
		/// </summary>
		f_LoudSpeakerTime:0,

	}


    
	public static ServerInfo ={
		/// <summary>
		/// 网络延迟时间
		/// </summary>
		f_NetDelayTime : 0,
		/// <summary>
		/// 测试网络延迟开关
		/// </summary>
		isNetDelayTest : false,
	}
    
	public static Ranklist = {
		/// <summary>
		/// 财富排行信息组合
		/// </summary>
		str_CFPH_Info_Group:[],
		/// <summary>
		/// 今日幸运星排行信息组合
		/// </summary>
		str_JRXYX_Info_Group:[],
		/// <summary>
		/// 昨日幸运星排行信息组合
		/// </summary>
		str_ZRXYX_Info_Group:[],
		/// <summary>
		/// 大奖幸运星排行信息组合
		/// </summary>
		str_DJXYX_Info_Group:[],


		/// <summary>
		/// 排行版信息组合
		/// </summary>
		str_RanklistInfo_Group:[],
		str_RanklistData:[],
		str_Ranklist_Type:"",

		/// <summary>
		/// 个人排行信息
		/// </summary>
		str_MyRanklistInfo:[],
		/// <summary>
		/// 个人排行
		/// </summary>
		str_Ranklist_MyRanklist:"",
		/// <summary>
		/// 个人与前一名相差的点数
		/// </summary>
		str_Ranklist_MyLessCount:"",
		/// <summary>
		/// 个人人缘值
		/// </summary>
		str_Ranklist_MyCP:"",

		/// <summary>
		/// 是否创建排行榜信息
		/// </summary>
		isCreatRanklistInfo:false,
		/// <summary>
		/// 是否可以领取
		/// </summary>
		isReceive:false,
		/// <summary>
		/// 领取昨日幸运星的操作类型
		/// </summary>
		str_ReceiveType:"",

		/// <summary>
		/// 排行版——排名
		/// </summary>
		str_Ranklist:[],
		/// <summary>
		/// 排行版——玩家ID
		/// </summary>
		str_UserID:[],
		/// <summary>
		/// 排行版——玩家昵称
		/// </summary>
		str_NickName:[],
		/// <summary>
		/// 排行版——玩家点数
		/// </summary>
		str_UserCount:[],
		/// <summary>
		/// 排行版——玩家魅力值
		/// </summary>
		str_UserCP:[],

		/// <summary>
		/// VIP信息
		/// </summary>
		str_LikeOrUnLike_Group:[],
		str_MyLikeOrUnLikeID:[],
		int_MyLikeOrUnLikeTime :0,
	}
    
	public constructor() {
	}
	
    public static DiceGameClass =
    {

        /// <summary>
        /// 房间名字
        /// </summary>
        RoomName:"",
        /// <summary>
        /// 房间号
        /// </summary>
        RoomNum:"",
        /// <summary>
        /// 房间密码
        /// </summary>
        RoomPW:"",
        /// <summary>
        /// 每局设置的点数
        /// </summary>
        RoomScore:"",
        /// <summary>
        /// 保障点数 默认50000
        /// </summary>
        GuaranteePoint: "50000",
        /// <summary>
        /// 是否为房主
        /// </summary>
        isRoomOwner:false,
        /// <summary>
        /// 是否复制了房间密码
        /// </summary>
        isCopyRoomNum:false,
        /// <summary>
        /// 是输是赢 true:赢 false:输
        /// </summary>
        isWinner:false,
        /// <summary>
        /// 奖励
        /// </summary>
        Prize:"",
        /// <summary>
        /// 叫色等待时间
        /// </summary>
        waitTime:"",
        /// <summary>
        /// 托管等待时间
        /// </summary>
        autoTime:"",
        /// <summary>
        /// 是否掉线 true:掉线，false，没有掉线
        /// </summary>
        offLine:false,
        /// <summary>
        /// 是否正在游戏
        /// </summary>
        isRunning:false,
        /// <summary>
        /// 是否房主开色
        /// </summary>
        openDiceIsOwner:false,
        /// <summary>
        /// 游戏模式 1:普通模式 2：最大模式 3:经典大话骰模式
        /// </summary>
        gameMode : "1",
        /// <summary>
        /// 显示模式 1:公开显示 2：仅对公会成员显示 0：私密房间
        /// </summary>
        showMode : "1",
        /// <summary>
        /// 房间列表刷新时间
        /// </summary>
        update_interval : 5,
        /// <summary>
        /// 是否取消游戏动画
        /// </summary>
        isQuickGame : false,


        /// <summary>
        /// 房主叫色字个数，范围（2--10）
        /// </summary>
        ownerPlayerCallDiceCount:"",
        /// <summary>
        /// 房主所叫色字点数，范围（1--6）
        /// </summary>
        ownerPlayerCallDiceNumber:"",
        /// <summary>
        /// 房主摇到的点数
        /// </summary>
        ownerPlayerDice:[],
        /// <summary>
        /// 房主名字
        /// </summary>
        ownerPlayerName:"",
        /// <summary>
        /// 房主是否准备好 1:准备好 0：未准备好
        /// </summary>
        ownerIsReady:"",
        /// <summary>
        /// 房主是否托管 1：托管 0:取消托管
        /// </summary>
        ownerPlayerDeposit : "0",
        /// <summary>
        /// 房主剩余等待时间
        /// </summary>
        ownerLeftTime:"",
        /// <summary>
        /// 房主是否可以叫色(断线重连)
        /// </summary>
        ownerCanBid:false,
        /// <summary>
        /// 房主所拥有的点数
        /// </summary>
        ownerPoint:"0",


        /// <summary>
        /// 挑战者叫色字个数，范围（2--10）
        /// </summary>
        opponentPlayerCallDiceCount:"",
        /// <summary>
        /// 挑战者所叫色字点数，范围（1--6）
        /// </summary>
        opponentPlayerCallDiceNumber:"",
        /// <summary>
        /// 挑战者摇到的点数
        /// </summary>
        opponentPlayerDice:[],
        /// <summary>
        /// 挑战者名字
        /// </summary>
        opponentPlayerName:"",
        /// <summary>
        /// 挑战者是否准备好 1:准备好 0：未准备好
        /// </summary>
        opponentIsReady:"",
        /// <summary>
        /// 挑战者是否加入房间 true:加入 false：未加入
        /// </summary>
        opponentIsJoin:false,
        /// <summary>
        /// 挑战者是否托管 1：托管 0:取消托管
        /// </summary>
        opponentPlayerDeposit : "0",
        /// <summary>
        /// 挑战者剩余等待时间
        /// </summary>
        opponentLeftTime:"",
        /// <summary>
        /// 挑战者是否可以叫色(断线重连)
        /// </summary>
        opponentCanBid:false,
        /// <summary>
        /// 挑战者所拥有的点数
        /// </summary>
        opponentPoint:"",
        /// <summary>
        /// 点数设置All In
        /// </summary>
        allIn:false,
        /// <summary>
        /// 起手叫骰
        /// </summary>
        firstHandTag:false,

        bRefuseInviteMsg : false,

        /// <summary>
        /// 创建房间列表面板
        /// </summary>
        NewGuid_CreateListPanel : 0,
        /// <summary>
        /// 创建房间面板
        /// </summary>
        NewGuid_CreateRoom : 0,
        /// <summary>
        /// 大话骰游戏面板
        /// </summary>
        NewGuid_MainPanel : 0,
        //newGuidStep : 0:"", //（1:欢迎来到新手 2:显示 3房间列表） ----- （11：用户名 12：  13： 14:  15）  

    }

	public static ShareInfo = 
	{
		//分享面板是否开启
		 ShowSharePanel : false,
		//微信分享跳转网址
		 WXShareURL : "",
		//微信分享标题
		 WXShareTitle : "",
		//微信分享内容
		 WXShareContent : "",
		//QQ分享跳转网址
		 QQShareURL : "",
		//QQ分享标题
		 QQShareTitle : "",
		//QQ分享内容
		 QQShareContent : "",
		//QQ分享缩略图地址
		 QQSharePicURL : "",
		//下载地址
		 DownLoadURL : "",
	}

}
