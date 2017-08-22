/**
 *
 * @author 
 *
 */
class MsgID  {
    public static getMsgEvent(MsgIDType: MsgID):string{
        return MsgIDType+"_event";
	}
	public static USER
    ={
          /// <summary>
        /// 手机验证码登录__60//新版本手机密码账号注册
        /// </summary>
        PHONELOGIN : 60,
        /// <summary>
        /// 新版本手机密码账号登录
        /// </summary>
        PHONEPSWLOGIN : 6100,
        /// <summary>
        /// 手机登录获取验证码__61//新版本手机密码账号注册获取验证码
        /// </summary>
        PHONELOGIN_GETCODE : 61,
        /// <summary>
        /// 找回手机确认
        /// </summary>
        PHONEFINDSENDMSG : 6102,
        /// <summary>
        /// 找回手机密码获取验证码__61
        /// </summary>
        PHONEFIND_GETCODE : 6101,
        /// <summary>
        /// IM登陆
        /// </summary>
        IMLOGIN : 6103,
        /// <summary>
        /// 发送验证票据
        /// </summary>
        PHONELOGIN_SENDVERIFY : 6001,
        /// <summary>
        /// 获取验证码地址
        /// </summary>
        PHONELOGIN_GETVERIFYURL : 6501,
        /// <summary>
        /// 登录__90
        /// </summary>
          LOGIN :  90 ,
        /// <summary>
        /// 获取随机昵称__91
        /// </summary>
          GET_INITDATA :  91 ,
        /// <summary>
        /// 获取随机昵称__92
        /// </summary>
          GET_ROOL_NAME :  92 ,
        /// <summary>
        /// 发送昵称__93
        /// </summary>
          SEND_NAME :  93 ,
          /// <summary>
        /// 获得修改后昵称
        /// </summary>
          GET_MODIFYNICKNAMEINFO:94,
        /// <summary>
        /// 更新个人点数__113
        /// </summary>
          UPDATE_MONEY :  113 ,
        /// <summary>
        /// 获取签到配置信息__125
        /// </summary>
          GET_SIGN_CONFIG :  125 ,
        /// <summary>
        /// 获取个人签到情况__126
        /// </summary>
          GET_USERSIGN_INFO :  126 ,
        /// <summary>
        /// 查询用户等级__128
        /// </summary>
          UPDATE_USERLEVEL :  128 ,
        /// <summary>
        /// 更新自己的道具信息__151
        /// </summary>
          UPDATE_PROPS :  151 ,
        /// <summary>
        /// 购买道具__152
        /// </summary>
          BUY_PROPS :  152 ,
        /// <summary>
        /// 使用道具__153
        /// </summary>
          USE_PROPS :  153 ,
          /// <summary>
        /// 大喇叭__154
        /// </summary>
          LOUDERSPEAKER_MSG :  154 ,
        /// <summary>
        /// 通过第三方支付购买道具__156
        /// </summary>
          BUY_PAY :  156 ,
        /// <summary>
        /// 查询玩家VIP状态__158
        /// </summary>
          CHECK_USER_VIP :  158 ,
        /// <summary>
        /// VIP登录喇叭消息__161
        /// </summary>
          VIPLOGIN_LOUDSPEAKER :  161 ,
        /// <summary>
        /// 360状态__162
        /// </summary>
          USER_STATUS_BY360 :  162 ,
        /// <summary>
        /// iOS游客账号转正式账号__181
        /// </summary>
          VISITOR_TO_PLAYER :  181 ,
        /// <summary>
        /// 90消息登录失败返回的_10000
        /// </summary>
          LOGINERROR_RETURN :  10000 ,
        /// <summary>
        /// 客户端请求退出_10001
        /// </summary>
          QUIT :  10001 ,
        /// <summary>
        /// 您的账号在其它地方登录_10002
        /// </summary>
          ANOTHER_LOCATION_LOGIN :  10002 ,
        /// <summary>
        /// 登录服务器成功回调_10009
        /// </summary>
          SERVER_LOGINSUCCESS :  10009 ,

        //        /// <summary>
        //        /// 心跳包测试
        //        /// </summary>
        //          HEARTBEATMSG :  9999 ,

        /// <summary>
        /// 查询金币
        /// </summary>
          UPDATE_GOLD :  3001 ,
        /// <summary>
        /// 货币兑换
        /// </summary>
          CHANGEMONEY :  3002 ,

    }
    public static Bank={
      //进入银行 2001
        EnterBank : 2001,
       
       // 修改密码 2002
        ModifyPassWord : 2002,
       
        //存入银行 2003
         Deposit : 2003,
       
        //从银行取钱 2004
         DrawMoney : 2004,
       //用户重置口令
          Msg_2005: 2005,
       //获取验证码
        GetCode : 2006,
       // 重置密码
        ResetPassWord : 2007,
    }
    public static Hall
    ={
        /// <summary>
        /// 签到领取__122
        /// </summary>
          SIGNIN_RECEIVE :  122 ,
        /// <summary>
        /// 获取VIP付费道具__160
        /// </summary>
          GET_VIPINFO :  160 ,
        /// <summary>
        /// 等级限制__174
        /// </summary>
          LEVEL_LIMITS :  174 ,
        /// <summary>
        /// 获取活动列表信息__176
        /// </summary>
          GET_ACTIVITY_LIST :  176 ,
        /// <summary>
        /// 领取活动奖励__177
        /// </summary>
          ACTIVITY_AWARD :  177 ,
        /// <summary>
        /// 获取公告列表信息__178
        /// </summary>
          GET_BULLETIN_LIST :  178 ,
        /// <summary>
        /// 获取公告详情__179
        /// </summary>
          BULLETIN_DETAL :  179 ,
        /// <summary>
        /// 获取道具商城列表__ 请求 返回 150
        /// </summary>
          REQUEST_MALLPROPS_LIST :  150 ,
        /// <summary>
        /// 发送手机号码  获取验证码  191
        /// </summary>
          SEND_BINDING_PHONENUMBER :  191 ,
        /// <summary>
        /// 发送绑定 验证码 192
        /// </summary>
          SEND_BINDING_CODE :  192 ,
        /// <summary>
        /// 请求解绑手机   获取验证码  193
        /// </summary>
          SEND_UNBINDING__PHONENUMBER :  193 ,
        /// <summary>
        /// 发送解锁 验证码  194
        /// </summary>
          SEND_UNBINDING_CODE :  194 ,

          SEND_BINDINGFail_CODE:195,
        /// <summary>
        /// 大厅消息提示
        /// </summary>
          Msg_1020 :  1020 ,
        /// <summary>
        /// 全局消息提示
        /// </summary>
          Msg_1021 :  1021 ,
        /// <summary>
        /// 身份认证
        /// </summary>
          Msg_1022 :  1022 ,
          /// 设置口令
          /// </summary>
          Msg_1023 : 1023,
          /// <summary>
          /// 口令保护开关
          /// </summary>
          Msg_1024 : 1024,
          /// <summary>
          /// 修改口令
          /// </summary>
          Msg_1025 : 1025,
          /// <summary>
          /// 找回口令
          /// </summary>
          Msg_1026 : 1026,
          /// <summary>
          /// 找回口令获取验证码
          /// </summary>
          Msg_1027 : 1027,
          /// <summary>
          /// 通过口令进入游戏
          /// </summary>
          Msg_1028 : 1028,

          /// <summary>
          /// 修改密码
          /// </summary>
          Msg_1030 : 1030,

         

          

          /// <summary>
          /// 手机验证失效获取认证码
          /// </summary>
          Msg_2301:2301,
          /// <summary>
          /// 手机验证失效验证手机
          /// </summary>
          Msg_2302:2302,

          /// <summary>
          /// 请求更换手机验证码
          /// </summary>
          Msg_2303 : 2303,

          /// <summary>
          /// 请求更换手机发送验证码
          /// </summary>
          Msg_2304 : 2304,

        //获取tockon
        Msg_2504 : 2504,
        Msg_2505 : 2505,
        Msg_109 : 109,
    }
    public static BSFB
    ={
        /// <summary>
        /// 进入宝石风暴__100
        /// </summary>
          BEGIN_BSFB :  100 ,
          /// <summary>
        /// 恢复进入宝石风暴__101
        /// </summary>
          RECOVERBSFB : 101,
        /// <summary>
        /// bet__102
        /// </summary>
          BET :  102 ,
        /// <summary>
        /// 龙珠探宝消息__103
        /// </summary>
          SEARCH_BEGIN :  103 ,
        /// <summary>
        /// 保存游戏点数并退出__104
        /// </summary>
          SAVEGAME_EXIT :  104 ,
          /// <summary>
        /// 下注钱不够__105
        /// </summary>
        NoEnoughMoney : 105,
        /// <summary>
        /// 退出宝石风暴
        /// </summary>
          EXIT_BSFB :  108 ,
        /// <summary>
        /// 放弃游戏点数并退出__114
        /// </summary>
          GIVE_UP_EXIT :  114 ,
        /// <summary>
        /// 用户主动放弃游戏点数
        /// </summary>
          GIVE_UP_EXIT_BYUSER :  116 ,
        /// <summary>
        /// 查询可领取救济金__127  (0表示查询剩余的可领取次数 ,1表示领取救济金)
        /// </summary>
          RECEIVE_MONEY :  127 ,
        /// <summary>
        /// 排行榜信息__170    // 1.财富排行   2.今日幸运星  3.昨日幸运星  4.累积奖  5.固定奖 6.VIP集锦
        /// </summary>
          TOP_MSG :  170 ,
        /// <summary>
        /// 排行榜赞踩消息__171
        /// </summary>
          LIKE_UNLIKE :  171 ,
        /// <summary>
        /// 昨日幸运星领取奖励__172
        /// </summary>
          AWARD_LUCKYSTAR :  172 ,
        /// <summary>
        /// 查询玩家赞踩情况__173
        /// </summary>
          CHECK_LIKE_UNLIKEINFO :  173 ,
        /// <summary>
        /// 完成新手引导请求_180
        /// </summary>
          NEWBIE_SKIP :  180 ,
        /// <summary>
        /// 获取宝石风暴游戏视频列表__182
        /// </summary>
          VEDIO_ITEMS :  182 ,
        /// <summary>
        /// 获取指定的宝石风暴游戏视频__183
        /// </summary>
          GET_VEDIOCODE :  183 ,
        /// <summary>
        /// 上传宝石风暴的视频__184
        /// </summary>
          UPLOAD_VEDIOCODE :  184 ,
        /// <summary>
        /// 上传视频评论_185
        /// </summary>
          UPLOAD_VEDIOCOMMENTS :  185 ,
        /// <summary>
        /// 获取公共评论_187
        /// </summary>
          PUBLICVEDIOCOMMENTS :  187 ,
        /// <summary>
        /// 最新评论广播推送
        /// </summary>
          NEWVEDIOCOMMENTSRESPONSE :  1531 ,
        /// <summary>
        /// 获取一条最新评论
        /// </summary>
          GETONEVEDIOCOMMENTS :  1301 ,
        /// <summary>
        /// 新手引导视频数据_188
        /// </summary>
          NEWBIE_102MSG :  188 ,
        /// <summary>
        /// 189MSG  支付成功后提示
        /// </summary>
          PAYSUCCESS_189MSG :  189 ,
    }
    
    public static DiceGame =
    {
    /// <summary>
    /// 进入大话骰大厅 401
    /// </summary>
     BEGIN_SEND : 401,
    /// <summary>
    /// 退出大话色 402
    /// </summary>
     EXIT_SEND : 402,
    /// <summary>
    /// 创建房间 403
    /// </summary>
     CREATEROOM_SEND : 403,
    /// <summary>
    /// 修改游戏对局点数 404
    /// </summary>
     MODIFYROOMSCORE_SEND : 404,
    /// <summary>
    /// 加入私人房间 405
    /// </summary>
     JOINPRIVATEROOM_SEND : 405,
    /// <summary>
    /// 准备或者取消准备 406
    /// </summary>
     READY_SEND : 406,
    /// <summary>
    /// 叫色 407
    /// </summary>
     CALLDICE_SEND : 407,
    /// <summary>
    /// 开色 408
    /// </summary>
     OPENDICE_SEND : 408,
    /// <summary>
    /// 设置托管 409
    /// </summary>
     DEPOSIT_SEND : 409,
    /// <summary>
    /// 掉线重连 410
    /// </summary>
     RELINK_SEND : 410,
    /// <summary>
    /// 开始新一局游戏 411
    /// </summary>
    // REBEGIN_SEND : 411,
    /// <summary>
    /// 返回平台大厅 412
    /// </summary>
     GOTOHALL_SEND : 412,
    /// <summary>
    /// 创建房间新接口 413
    /// </summary>
     NEWCREATEROOM_SEND : 413,
    /// <summary>
    /// 搜索房间接口 414
    /// </summary>
     SEARCHROOM_SEND : 414,
    /// <summary>
    /// 查询房间信息 415
    /// </summary>
     QUEARYROOMINFO_SEND : 415,
    /// <summary>
    /// 修改房间信息 416
    /// </summary>
     SETROOMINFO_SEND : 416,
    /// <summary>
    /// 踢人消息 417
    /// </summary>
     KICKPLAYER_SEND : 417,
    /// <summary>
    /// 邀请列表数据 418
    /// </summary>
     INVITELIST_SEND : 418,
    /// <summary>
    /// 邀请好友消息 419
    /// </summary>
     INVITEFREND_SEND : 419,
    /// <summary>
    /// 邀请设置 420
    /// </summary>
     SETDICEGAMEINVITE : 420,
    /// <summary>
    /// 查询邀请设置 421
    /// </summary>
     QUERYDICEGAMEINVITE : 421,
    /// <summary>
    /// 查询房间游戏记录
    /// </summary>
     QUERYLOG : 422,

    /// <summary>
    /// 刷新压最大模式下对局点数
    /// </summary>
     Msg423 : 423,
    /// <summary>
    /// 设置首次叫骰
    /// </summary>
     Msg424 : 424,
    /// <summary>
    /// 加入房间
    /// </summary>
     Msg425 : 425,
    /// <summary>
    /// 系统维护中 449
    /// </summary>
     SYSTEMMAINTENANCE_SEND : 449,


    /// <summary>
    /// 修改对局点数 450
    /// </summary>
     MODIFYROOMSCORE_RESPONSE : 450,
    /// <summary>
    /// 准备/取消准备 451
    /// </summary>
     READY_RESPONSE : 451,
    /// <summary>
    /// 叫色 452
    /// </summary>
     CALLDICE_RESPONSE : 452,
    /// <summary>
    /// 退出游戏 453
    /// </summary>
     EXIT_RESPONSE : 453,
    /// <summary>
    /// 设置托管 454
    /// </summary>
     DEPOSIT_RESPONSE : 454,
    /// <summary>
    /// 掉线重连 455
    /// </summary>
     RELINK_RESPONSE : 455,
    /// <summary>
    /// 开骰 456
    /// </summary>
     OPENDICE_RESPONSE : 456,
    /// <summary>
    /// 挑战者加入房间 457
    /// </summary>
     JOINPRIVATEROOM_RESPONSE : 457,
    /// <summary>
    /// 双方摇到的色字结果 459
    /// </summary>
     DICEPOINTS_RESPONSE : 459,
    /// <summary>
    /// 房间强制解散 460
    /// </summary>
     ROOMCLOSE_RESPONSE : 460,
    /// <summary>
    /// 对手掉线
    /// </summary>
     OPPONENTOFFLINE_RESPONSE : 461,
    /// <summary>
    /// 更新挑战者和对手点数 462
    /// </summary>
     UPDATAPOINTS : 462,
    /// <summary>
    /// 超时剩余时间
    /// </summary>
     REMAINTIME : 463,
    /// <summary>
    /// 邀请好友服务器推送 464
    /// </summary>
     INVITEFRIEND_RESPONSE : 464,
    /// <summary>
    /// 更新房间信息 465
    /// </summary>
     UPDATAROOMINFO : 465,
    /// <summary>
    /// AnimCallBack 490
    /// </summary>
     AnimCallBack : 490,

    //取钱消息
   DrawMoneyMsg : 491,
   //聊天邀请
   InviteChat:5107,
   //聊天邀请
   PointSetting:492,

}

public static CHAT ={
    ChatCommom         : 5000,
    ChatvideoShare     : 5001,
    ChatvideoGet       : 5002,
    ChatGetClub        : 5101,
    ChatChatClub       : 5102,
    ChatGetWorld       : 5201,
    ChatChatWorld      : 5202,
    ChatVideoWorld     : 5204,
    ChatClubNewMsg     : 5051,
    ChatWorldNewMsg    : 5052,
    ChatNewInfo        : 5053,
}

 public static CLUB ={
        /// <summary>
        /// 进入公会_1001
        /// </summary>
        CLUBMSG : 1001,
        /// <summary>
        /// 创建公会_1002
        /// </summary>
        CREAT_CLUB : 1002,
        /// <summary>
        /// 搜索公会_1003
        /// </summary>
        SEARCH_CLUB : 1003,
        /// <summary>
        /// 加入公会_1004
        /// </summary>
        JOIN_CLUB : 1004,
        /// <summary>
        /// 公会升级信息_1005
        /// </summary>
        UPGRADE_INFO_CLUB : 1005,
        /// <summary>
        /// 确认升级公会_1006
        /// </summary>
        UPGRADE_SURE_CLUB : 1006,
        /// <summary>
        /// 公会任务列表_1007
        /// </summary>
        CLUBTASKLIST_INOF : 1007,
        /// <summary>
        ///  退出公会_1008
        /// </summary>
        SIGNOUT_CLUB : 1008,
        /// <summary>
        /// 入会申请列表_1009
        /// </summary>
        APPLICANTION_CLUB : 1009,
        /// <summary>
        /// 公会审核设置_1010
        /// </summary>
        VERIFYTYPE_CLUB : 1010,
        /// <summary>
        /// 捐入救济金_1011
        /// </summary>
        CONTRIBUTION_DOLE : 1011,
        /// <summary>
        /// 领取救济金_1012
        /// </summary>
        RECEIVE_DOLE : 1012,
        /// <summary>
        /// 会员职位设置_1013
        /// </summary>
        POSITIONSETTING_CLUB : 1013,
        /// <summary>
        /// 踢出公会_1014
        /// </summary>
        SIGNOUT_CLUB_MEMBER : 1014,

        /// <summary>
        /// 审核入会申请_1015
        /// </summary>
        MEMBER_APPLY_CLUB : 1015,
        /// <summary>
        /// 修改公会公告_1016
        /// </summary>
        SET_CLUB_BULLETIN : 1016,
        /// <summary>
        /// 修改公会职位领取次数_1017
        /// </summary>
        SET_RECEIVE_TIMES : 1017,
        /// <summary>
        /// 批量审核入会申请
        /// </summary>
        APPLYLIST_CLUB : 1018,
		/// <summary>
		/// 查看救济金记录
		/// </summary>
		DoleLog_CLUB : 1029,

		/// <summary>
		/// 会长转让
		/// </summary>
		clubOwnerChange : 1031,

    /// <summary>
		/// 活跃值前20的公会
		/// </summary>
    ActiveClub : 1032,
        
    /// <summary>
		/// 换一批活跃值
		/// </summary>
    ChangeActiveClub : 1033,
        
    /// <summary>
		/// 搜索公会
		/// </summary>
    SearchClub : 1034,

    

        /// <summary>
        /// 查询公会记录
        /// </summary>
        QuaryClubData : 1035,
    }

    public static WXHH ={
        /// <summary>
        /// 进入五星宏辉__201
        /// </summary>
        BEGIN_WXHH:201,
        /// <summary>
        /// 用于监测CS之间的通信是否正常__175
        /// </summary>
        NET_DELAY:175,
        /// <summary>
        /// 获取五星宏辉配置__202
        /// </summary>
        GET_CONFIG:202,
        /// <summary>
        /// bet 信息（花色）__203
        /// </summary>
        BET_POKER:203,
        /// <summary>
        /// 开奖 信息__204
        /// </summary>
        OPEN_POKER:204,
        /// <summary>
        /// 开局 信息__205
        /// </summary>
        START_POKER:205,
        /// <summary>
        /// 中奖 信息__206
        /// </summary>
        REWARD_POKER:206,
        /// <summary>
        /// 退出五星宏辉__207
        /// </summary>
        EXIT_ROOM:207,
        /// <summary>
        /// 获取五星宏辉排行榜信息__208
        /// </summary>
        GET_TOPLIST:208,
        /// <summary>
        /// 五星宏辉排行榜领取奖励__209
        /// </summary>
        TOP_AWARD:209,
        /// <summary>
        /// 五星宏辉所有下注额__210
        /// </summary>
        ALLBET_AWARD:210,

		/// <summary>
		/// 五星宏辉获取下注记录__2501
		/// </summary>
		GET_FIVEGAME_MYLOG:2501,
		/// <summary>
		/// 五星宏辉获取之前历史记录__2500
		/// </summary>
		GET_FIVEGAME_HISTORY:2500,

    }
    public static STONE =
    {
        /// <summary>
        /// 进入石头剪刀布__301
        /// </summary>
        BEGIN_STONE : 301,
        /// <summary>
        /// 退出擂台
        /// </summary>
        EXIT_ARENA : 302,
        /// <summary>
        /// 申请摆擂消息__306
        /// </summary>
        APPLY_ARENA : 306,
        /// <summary>
        /// 登录摆擂消息__307
        /// </summary>
        LOGIN_ARENA : 307,
        /// <summary>
        /// 挑战擂台消息__308
        /// </summary>
        CHALLENGE_ARENA : 308,
        /// <summary>
        /// 查询擂台信息__309
        /// </summary>
        CHECK_ARENAINFO : 309,
        /// <summary>
        /// 查询个人擂台__310
        /// </summary>
        CHECK_MYARENA : 310,
    }

    public static  Mail={
        //获取是否有新邮件
        NEW_MAIL : 2201,
        //获取邮件列表
        MAIL_LIST : 2202,
        //发送读取邮件/领取奖励 请求
        READ_MAIL : 2203,
        //删除邮件
        DELETE_MAIL:2204,
    }


    public static Client
    ={
       StageClick : 99001,//点击舞台
       BindingIDMsg :     90001,
       BindingPhoneMsg :  90002,
       ShowGetNamePanel : 90003,
       OutOffNetLine :    90004, 
       ShowGetName2Panel : 90005,
       HallRefresh : 90006,
       ShowPostionSettingPanel:91001,//公会面板打开设置职位面板
       PayOver : 92001,
       BSFBButtonDisable:80001,
       BSFBButtonEnable:80002,
       BSFBUpdateScore :80003,
       BSFBTurnFinish:80004,
       BSFBAutoUseON:80005,//自动使用道具开启
       BSFBSlotEnd:80006,//累积奖动画结束
       BSFBSplitEnd:80007,//天女散花结束
       BSFBHELPCHANGE:80008,//帮助面板类型选择
       WXHHLnningSwitch:83001,//五星宏辉切换概率或局数
       STONECHALLENGE:60001,//五星宏辉切换概率或局数
        LuaUpdatePanel : 70001,
        LuaUpdateFinish : 70002,
        ApkUpdatePercent : 70003,
        ApkUpdateFinish : 70004,

        OpenQuitPanel : 70100,
        GameBalance : 71001,

        QuitDiceGame:50001,//退出大话骰
    }
}
