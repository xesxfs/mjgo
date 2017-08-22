
class StatisticalAnalysis {
	public static statisticalPoint ={
    /// <summary>
    /// 1. 激活：用户安装后启动游戏 记为一个激活
    /// </summary>
    activate : "activate",
    /// <summary>
    /// 2. 点击登录:
    /// </summary>
    login_enter:"login_enter",
    /// <summary>
    /// 3. 登录成功:
    /// </summary>
    login_success:"login_success",
    /// <summary>
    /// 4. 连环夺宝
    /// </summary>
    lhdb_enter:"lhdb_enter",
    /// <summary>
    /// 5. 选择线数
    /// </summary>
    lhdb_chooseLine:"lhdb_chooseLine",
    /// <summary>
    /// 6. 加倍(单线点数)
    /// </summary>
    lhdb_lineValue:"lhdb_lineValue",
    /// <summary>
    /// 7. 开始
    /// </summary>
    lhdb_start:"lhdb_start",
    /// <summary>
    /// 8. 绑定手机
    /// </summary>
    phone_bind:"phone_bind",
    /// <summary>
    /// 9. 获取验证码
    /// </summary>
    phone_getCode:"phone_getCode",
    /// <summary>
    /// 10. 五星宏辉
    /// </summary>
    wxhh_enter:"wxhh_enter",
    /// <summary>
    /// 11. 大话
    /// </summary>
    dice_enter:"dice_enter",
    /// <summary>
    /// 12. 石头剪刀
    /// </summary>
    arena_enter:"arena_enter",
    /// <summary>
    /// 13. 登录奖励(点击vip签到按钮)
    /// </summary>
    login_award:"login_award",
    /// <summary>
    /// 14. 工会(进入公会按钮)
    /// </summary>
    guild_enter:"guild_enter",
    /// <summary>
    /// 15. vip(点击vip购买按钮)
    /// </summary>
    vip_award:"vip_award",
    /// <summary>
    /// 16. 保险箱（点击银行）
    /// </summary>
    bank_enter:"bank_enter",
    /// <summary>
    /// 17. 低保（点击领取低保）
    /// </summary>
    assist_receive:"assist_receive",
    /// <summary>
    /// 18. 跳过新手
    /// </summary>
    lhdb_giveupGuide:"lhdb_giveupGuide",
    /// <summary>
    /// 19. 注销
    /// </summary>
    game_logout:"game_logout",
    /// <summary>
    /// 20. 显示商城面板
    /// </summary>
    show_shop:"show_shop",
    /// <summary>
    /// 21. 充值成功
    /// </summary>
    buy_success:"buy_success",
    /// <summary>
    /// 22. 充值成功
    /// </summary>
    wxhh_myrecord:"wxhh_myrecord",
    /// <summary>
    /// 23. 充值成功
    /// </summary>
    wxhh_histroyrecord:"wxhh_histroyrecord",
    /// <summary>
    /// 24. 大话骰邀请好友
    /// </summary>
    dicegame_invitefriend:"dicegame_invitefriend",
    /// <summary>
    /// 25. 大话骰邀请工会成员
    /// </summary>
    dicegame_club_invitefriend:"dicegame_club_invitefriend",
    /// <summary>
    /// 连环夺宝分享视频
    /// </summary>
    lhdb_sharevideo:"lhdb_sharevideo",
    // --[[
    // /// 点击分享按钮
    // --]]
    hall_share:"hall_share",
    
    // --[[
    // /// 分享类型type，1：复制下载链接 2：分享微信好友 3：分享朋友圈  4：分享QQ好友
    // --]]
    share_type:"share_type",

    //    --[[
    //     /// 开启游戏保护
    //     --]] 
    hall_startgameprotect:"hall_startgameprotect",
 
}

    private static _officialUrl = "http://www.wgb.cn:56789/log";
    private static _testlUrl = "http://www.wgb.cn:56790/log";
    private static _url = "http://www.wgb.cn:56789/log";

    private static _GetJsonData(point, values)
    {
        var json = {};
        json["topic"] = point.toString();
        json["serial"] = GlobalClass.GameInfoForConfig.UniqueSerial;
        try
        {
            switch (point)
            {
                case StatisticalAnalysis.statisticalPoint.activate:
                    json["deviceID"] = GlobalClass.LoginClass.iosUUID;
                    break;
                case StatisticalAnalysis.statisticalPoint.login_enter:
                    json["deviceID"] = GlobalClass.LoginClass.iosUUID;
                    json["account"] = GlobalClass.UserInfo.str_UserAccount;
                    json["loginType"] = GlobalClass.GameInfoForConfig.LoginMode;
                    break;
                case StatisticalAnalysis.statisticalPoint.login_success:
                    json["deviceID"] = GlobalClass.LoginClass.iosUUID;
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["loginType"] = GlobalClass.GameInfoForConfig.LoginMode;
                    break;
                case StatisticalAnalysis.statisticalPoint.lhdb_enter:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.lhdb_chooseLine:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    json["line"] = values[0];
                    break;
                case StatisticalAnalysis.statisticalPoint.lhdb_lineValue:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    json["line"] = values[0];
                    break;
                case StatisticalAnalysis.statisticalPoint.lhdb_start:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.phone_bind:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    json["source"] = values[0];
                    json["phone"] = values[1];
                    json["isBind"] = values[2];
                    break;
                case StatisticalAnalysis.statisticalPoint.phone_getCode:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    json["source"] = values[0];
                    json["phone"] = values[1];
                    break;
                case StatisticalAnalysis.statisticalPoint.wxhh_enter:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.dice_enter:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.arena_enter:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.login_award:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.guild_enter:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.vip_award:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.bank_enter:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.assist_receive:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.lhdb_giveupGuide:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.game_logout:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["isNew"] = GlobalClass.UserInfo.isNew;
                    break;
                case StatisticalAnalysis.statisticalPoint.show_shop:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["fromwhere"] = values[0];  //1.大厅内充值   2.连环夺宝内充值 3.五星宏辉充值 4.大话骰充值
                    json["opentype"] = values[1];   //1.主动点击充值  2.系统弹出充值  
                    break;
                case StatisticalAnalysis.statisticalPoint.buy_success:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    json["fromwhere"] = values[0]; //1.大厅内充值   2.连环夺宝内充值 3.五星宏辉充值 4.大话骰充值
                    json["money"] = values[1];     //充值金额
                    break;
                case StatisticalAnalysis.statisticalPoint.wxhh_myrecord:
                    json["userid"] = GlobalClass.UserInfo.str_UserID; 
                    break;
                case StatisticalAnalysis.statisticalPoint.wxhh_histroyrecord:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    break;
                case StatisticalAnalysis.statisticalPoint.lhdb_sharevideo:
                    json["userid"] = GlobalClass.UserInfo.str_UserID;
                    break;
                case StatisticalAnalysis.statisticalPoint.hall_share:
                    break;
                case StatisticalAnalysis.statisticalPoint.share_type:
                    break;
                case StatisticalAnalysis.statisticalPoint.hall_startgameprotect:
                    break;
                default:
                    break;
            }
        }
        catch (e)
        {
            egret.log("_GetJsonData Error " + e);
        }
        egret.log("统计数据" + JSON.stringify(json));
        return json;
    }


    /// <summary>
    /// 上传数据
    /// </summary>
    /// <param name="point"></param>
    /// <param name="values"></param>
    public static UploadData(point, ...values)
    {
        var json = this._GetJsonData(point, values);
        this._StartPostRequest(json);
    }


	public static _StartPostRequest(json){
        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        request.open(this._url,egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(JSON.stringify(json));
        request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
        // request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
	}

    private static onPostComplete(event:egret.Event):void {
        let request = <egret.HttpRequest>event.currentTarget;
        console.log("post data : ",request.response);
    }

    private static onPostIOError(event:egret.IOErrorEvent):void {
        console.log("post error : " + event);
    }


}