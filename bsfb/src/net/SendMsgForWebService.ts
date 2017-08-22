/**
 *
 * @author 
 *
 */
class SendMsgForWebService {
    
    private static ThroughPsw:string = "ThroughhThroughh";
    
	public constructor() {
    	
	}
	
	private getKey():string{
        let version: number = Number(GlobalClass.GameInfoForConfig.UniqueSerialInfo[2]);
        if(version>=140){
            return "$a%flYQuZAMISIWNcUpiU%uDJOF7WYLDYL6WjCV^Uu57PWAJe3rLZz#2BgOmzvb&1NAmRXBxI7q73@gQAitXRsUv0MBKOsUJ6Z4^";
        }else{
            return "abcdefgh";
        }
	}
	
    public static setWSData(Through: string,methodName: string,cb: Function,signStr=""){
        Through = CommonFuc.AESEncryptBase64(Through,SendMsgForWebService.ThroughPsw);
        ServiceWS.getInstance().Through(methodName,signStr,"Through",Through,cb);
	}
	
    public static GetData_ServerIp(sbc:Function){
        var a = {};
        a["action"]= "GetServiceIp";
        a["UniqueSerial"] = GlobalClass.GameInfoForConfig.UniqueSerial;
        a["Flag"]= "1";
        a["NotHeadVerify"] = "1";
        a["disturb"] = Math.floor(Math.random() * (99999 + 1))+"";
        a["IsIM"]= "1";
        SendMsgForWebService.setWSData(JSON.stringify(a),"GetData",sbc);
    }
    
    public static SendPayAndroid(Product_Id: string,userID: string,userName: string,spdata:number,sbc: Function) {
        var a = {};
        a["uniqueSerial"] = GlobalClass.GameInfoForConfig.UniqueSerial;
        a["pid"] = Product_Id;
        a["userID"] = userID;
        a["userName"] = userName;
        a["spdata"] = spdata;
        a["isAmerica"] = GlobalClass.LoginClass.isUSAIP;
        a["NotHeadVerify"] = "1";
        a["disturb"] = Math.floor(Math.random() * (99999 + 1))+"";
        a["paytype"] = ""; 
        a["userID_mz"] = "";
        a["IsIM"]= "1";
        SendMsgForWebService.setWSData(JSON.stringify(a),"ThirdPayOrder",sbc);
    }
    
    public static ApplePay(Orderid: string,AppleKey: string,UniqueSerial: string,sbc: Function) {
        let infokeys = "Orderid#AppleKey#UniqueSerial#NotHeadVerify";
		let infoValues = Orderid+"#"+AppleKey+"#"+UniqueSerial+"#1";
        let signstr = "1";
        ServiceWS.getInstance().Through("ApplePayWithUnique",signstr,infokeys,infoValues, sbc,30000);
    }
    
    public static ChecekUSAIP(sbc: Function) {
        SendMsgForWebService.setWSData("","GetAmericaIp",sbc);
	}

    public static getShareInfo(sbc: Function){
        SendMsgForWebService.setWSData(GlobalClass.GameInfoForConfig.UniqueSerial,"GetShareConfig",sbc);
    }

    public static GetMoreGameList(sbc: Function){
        SendMsgForWebService.setWSData(GlobalClass.GameInfoForConfig.UniqueSerial,"GetMoreGameList",sbc);
    }

    public static GetSmallRecharge(sbc: Function){
        SendMsgForWebService.setWSData(GlobalClass.GameInfoForConfig.UniqueSerial,"GetSmallRecharge",sbc);
    }

    public static GetBindPhoneRemind(sbc: Function) {
        SendMsgForWebService.setWSData("","GetBindPhoneRemind",sbc);
	}
	
    public static SendIOSIDFA(idfa,ip,sbc: Function ){
        SendMsgForWebService.setWSData(idfa + "|" + ip,"GetIOSIDFA",sbc);
    }

    public static GetCountryCode(sbc: Function) {
         SendMsgForWebService.setWSData(GlobalClass.GameInfoForConfig.LanguageCode,"GetCountryCode",sbc);
    }
}
