/**
 *
 * @author 
 *
 */
class ServerMsg {
    
	public constructor() {
	}
	
    public static SendAccountLoginMSG(account: string,psw: string,token: string){
        var md5Str: string = new md5().hex_md5(psw);
        var js = {
            account: account,
            password: md5Str,
            mac: "123",
            ptid: "-1",
            deviceID: GlobalClass.LoginClass.iosUUID,
            token: token,
        }; 
        GlobalClass.UserInfo.str_UserAccount = account;
        GlobalClass.UserInfo.str_UserPassword = psw;
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.LOGIN,JSON.stringify(js));
	}

    public static SendPhoneLoginMSG(phone: string,psw: string,checkCode:string,token: string){
        var md5Str: string = new md5().hex_md5(psw);
        var js = {
            phone: phone,
            checkcode: checkCode,
            codeToken:"",
            mac: "123",
            ptid: "-1",
            deviceID: GlobalClass.LoginClass.iosUUID,
            token: token,
            passwd:md5Str,
        }; 
        
        GlobalClass.UserInfo.str_lastUserAccount = phone;
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.USER.LOGIN,JSON.stringify(js));
	}
}
