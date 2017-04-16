/**
 *
 * @author chenwei
 * 2016/07/12
 */

module ErrorCode {
    
     var mecthCode=[];
     var mecthProto=[];
     //登陆错误码
     mecthCode["100_3_9"] ="当前session被占用";
     mecthCode["100_3_3"] = "密码错误";    
     mecthCode["100_3_19"] = "没有登录Z服务器";
    
     //创建房间错误码
     mecthCode["104_1_1_1"] = "开房卡不足";
     mecthCode["104_1_1_2"] = "桌子数达到上限";
     mecthCode["104_1_1_3"] = "创建数量达到上限";
     mecthCode["104_1_1_4"] = "暗号已存在或为空";
     
     //进入房间错误码
     mecthCode["102_4_1_1"] = "房间不存在，请确认所输入的房间号是否正确";
     mecthCode["102_4_1_2"] = "房间人满";
     mecthCode["102_4_1_3"] = "金币不足";    
     mecthCode["102_4_1_4"] = "位置上已经有人";
     mecthCode["102_4_1_5"] = "XXX太多";
     mecthCode["102_4_1_-3"] = "资金与约定金不足!";
     mecthCode["102_4_1_-11"] = "被房主踢出!";
     mecthCode["102_4_1_-12"] = "强退了其他房间!";
     mecthCode["102_4_1_-13"] = "人满!";
     mecthCode["102_4_1_-14"] = "房主不在线!";
     mecthCode["102_4_1_-15"] = "房间已过期，请续费!";
     
     //专属房 进入房间错误码
     mecthCode["102_4_1_-11"] ="你被房主请离房间，3分钟不能进入。"
     mecthCode["102_4_1_-12"] ="你强退了其他房间，所以不能进入"
     mecthCode["102_4_1_-13"] ="房间人员已满，不能加入房间"


    //搜索房间
     mecthCode["104_2_1"] ="房间不存在，请确认所输入的房间号是否正确"
     //加入金币场
     mecthCode["102_11_1"] ="无空闲的桌子"
     
     /**********************
      **********************
      ******协议匹配码*******
      **********************
      **********************/
     mecthProto["100_5_0"] ="登录"
     mecthProto["100_3_9"] = "当前session被占用";
     mecthProto["100_3_3"] = "密码错误";
     mecthProto["100_3_19"] = "没有登录Z服务器";
     mecthProto["100_2_1"] = "登陆成功";     
     mecthProto["104_1_0"] = "创建房间";
     mecthProto["104_1_1"] = "创建房间返回";     
     mecthProto["104_2_0"] = "查找房间";
     mecthProto["104_2_1"] = "查找房间返回";     
     mecthProto["104_4_0"] = "通知桌子结束";
     mecthProto["104_4_1"] = "通知房主房间结束";     
     mecthProto["102_4_0"] = "进入房间";
     mecthProto["102_4_1"] = "进入房间返回";     
     mecthProto["102_5_0"] = "退出房间";
     mecthProto["102_5_1"] = "广播退出房间";     
     mecthProto["180_51_0"] = "获取庄家位置(游戏开始)";
     mecthProto["180_52_0"] = "发牌";
     mecthProto["180_53_0"] = "玩家摸牌(杠)";
     mecthProto["180_54_0"] = "玩家请求操作"; 
     mecthProto["180_55_0"] = "玩家叫牌";
     mecthProto["180_56_0"] = "响应玩家操作";
     mecthProto["180_57_0"] = "通知玩家出牌(吃碰牌后通知出牌)";
     mecthProto["180_58_0"] = "游戏结算";
     
     
      
     
    /**
     * 配对错误码
     * 协议
     * @param proto
     * 返回码 可选
     * @param code
     */
    export function getCodeText(proto:string,code?:number):string{
        
        let codes = proto + (code ? "_" + code.toString() : "");     
        
        return mecthCode[codes] ? mecthCode[codes]:"未定义的错误码:"+codes;        
    }
    
    
    export function cn(proto:string){
        return mecthProto[proto];
    }
    
}
