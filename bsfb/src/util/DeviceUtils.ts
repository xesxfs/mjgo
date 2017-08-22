enum PanelName {
	/// <summary>
    /// Pay0 单支付固定此接口
    /// </summary>
    PAY_ALIPAY = 1001,
    /// <summary>
    /// Pay1
    /// </summary>
    PAY_BAIDUPAY = 1002,
    /// <summary>
    /// Pay2
    /// </summary>
    PAY_360PAY = 1003,
}
class LoginData{

public ret:number;
public token:string;//"920aed390cb7465284d012c80ba375cd",
public reason:string//"";
public uid:string;//"9201"
public accid:string;
public desc:string;

public init(data:Object){
	var ret = data["ret"];
	if(ret){
		this.uid = data["info"]["uid"];
		this.token = data["info"]["token"];
		this.accid = data["info"]["accid"];
	}else{
		this.reason = data["info"]["reason"];
		this.desc= data["info"]["desc"];
	}
	
	
	
	if(this.accid!=null&&this.accid!=""){
		GlobalClass.UserInfo.str_PengJiID = this.accid;
	}
}

}
class DeviceUtils extends SingleClass{


	private static keyBackCodeCall = "keyBack";
	private static closeGameCall = "closeGame";
	private static closeStartViewCall ="closeStartView";
	private static showFloadCall = "showFload";	 
	private static setClipboardCall ="setClipboard"
	private static phoneMessageCall = "phoneInfo"

	private static phoneInfoData;
	private static clipboardData:string;
	private static loginData:LoginData=new LoginData();
	private static gameId = "10001";
	 

	public static Init(){
		//监听返回键
		this.setKeyBack();
		this._getPhoneInfoCallBack();
		this._getPhoneInfo();
		this.payResultCallBack();
		this.LoginMsg3rdCB();
	}

	public static payData={
		amount:0,
    	order_id:"",
    	pay_type:0,
    	process_type: 0,
    	subject: "",
		app_id:4
	}



	public static get IsWeb(){
		return (egret.Capabilities.runtimeType == egret.RuntimeType.WEB);
	}
	
	public static get IsNative(){
		return (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE);
	}
	
	public static get IsIos(){
	    return (egret.Capabilities.os=="iOS")
	}
	
	public static get IsAndroid(){
        return (egret.Capabilities.os == "Android")
	}


	//android返回键
	private  static setKeyBack(){
		if(this.IsAndroid){
			egret.ExternalInterface.addCallback(DeviceUtils.keyBackCodeCall,(vale:string)=>{
				console.log("rev keyBack");
				KFControllerMgr.getCtl(PanelName.ExitPanel).onBackClick();
			});
		}
	}
	//关闭游戏
	public static CloseGame(){
		SoundMgr.Instance.stopBGM();
		egret.ExternalInterface.call(DeviceUtils.closeGameCall,"");
	}
	//关闭启动画面
	public static CloseStartView(){
		 egret.ExternalInterface.call(DeviceUtils.closeStartViewCall,"");
	}
	//Android 特用
	public static ShowFload(){
		if(this.IsAndroid){
			 egret.ExternalInterface.call(DeviceUtils.showFloadCall,"");
		}
	}
	//onResume
   private static onResume(){
	   	egret.ExternalInterface.addCallback("onResume",()=>{
			   WebSocketMgr.getInstance().SendOneceMsg(0,"");
			   let heart = new egret.Timer(5000,0);
				heart.addEventListener(egret.TimerEvent.TIMER,()=>{

					if(WebSocketMgr.getInstance().isClose()){
						return;
					}
					if(!GlobalClass.LoginClass.isHeartReturn){
						egret.log("没收到心跳，断线");
						KFControllerMgr.showTips("连接已断开...",1.5,0,()=>{
							WebSocketMgr.getInstance().closeSocket();
							GlobalClass.LoginClass.isFirstHeart = true;
							KFSceneManager.getInstance().replaceScene(SceneName.Awake);
							GameStartLogic.getInstance().StartConnect();
						});
							return;
					}else{
							GlobalClass.LoginClass.isHeartReturn = false;
					}	
					WebSocketMgr.getInstance().SendOneceMsg(0,"");
				},this);
			});
   }

	private static _getPhoneInfo(){
		egret.ExternalInterface.call(DeviceUtils.phoneMessageCall,"");
	}

	private static _getPhoneInfoCallBack(){
		egret.ExternalInterface.addCallback(DeviceUtils.phoneMessageCall,(value:string)=>{
				console.log("rev phoneInfo:"+value);	
				this.phoneInfoData = value;			
			});
	}

	private static _applyLogin(callBack:Function,thisObj:any){
		egret.ExternalInterface.addCallback("applyLogin",(value:string)=>{
				console.log("rev applyLogin:"+value);	
				var data=JSON.parse(value);		
				this.loginData.init(data);
				callBack.call(thisObj,this.loginData);					
			});		
	}

	private static _getAccount(){
		var data = {gameId:this.gameId}
		egret.ExternalInterface.call("applyLogin",JSON.stringify(data));
	}

	public static executePluginsEvents(data:string){
		egret.ExternalInterface.call("executePulginsEvent",data);
	}

	//手机的唯一标识
	public static getPhoneImei():string{
		if(this.phoneInfoData){
			//每次调用刷新一下
			this._getPhoneInfo();
			return this.phoneInfoData;
		}
		return "";
	}

	// 分享 (share 0,朋际，1，qq，2，微信，3，朋友圈)
	public static shareUrl(title:string,url:string,imageUrl:string,description:string,share:number=0,gameName:string="宝石风暴"){

		var data = {
			title:title,
			url:url,
			gameId:this.gameId,
			imageUrl:imageUrl,
			share:share,	
			gameName:gameName,
			description:description
		}
		egret.ExternalInterface.call("ShareUrl",JSON.stringify(data));
	}

	//获取登录账户信息
	public static setLoginCallBack(callBack:Function,thisObj:any){
		this._applyLogin(callBack,thisObj);
		this._getAccount();		
	}


	//设置剪切板
	public static setClipboard(copyData:string){
		this.clipboardData = copyData
		egret.ExternalInterface.call(DeviceUtils.setClipboardCall,this.clipboardData);
	}
	//获取剪切板
	public static getClipboard():string{
		if(this.clipboardData){
			return this.clipboardData;
		}
		return "";
	}

	//amount 订单金额 分，order_id 订单号，subject 商品描述 ，pay_type 0微信 1支付宝，process_type 0直接购买 1充值
	public static IMPay(amount:number,order_id:string,subject:string,pay_type:number=0,process_type:number=0){
		this.payData.amount=amount;
		this.payData.order_id=order_id;
		this.payData.subject=subject;
		this.payData.pay_type=pay_type;
		this.payData.process_type=process_type;
		egret.ExternalInterface.call("IMPay",JSON.stringify(this.payData));
	}

	//支付返回
	public static payResultCallBack(){
		//value 失败0  成功1
		egret.ExternalInterface.addCallback("PayResult",(value:string)=>{
			console.log("PayResult"+value);
			NetEventMgr.getInstance().clientMsg(MsgID.Client.PayOver,value);
		});
	}

	public static LoginMsg3rdCB(){
		egret.ExternalInterface.addCallback("LoginMsg3rd",(_str:string)=>{
		let jd2 = JSON.parse(_str)
        let Code = jd2["Code"]+"";
        console.log("Code == " + Code);
        if (Code == "200")
        {
            let Through = jd2["Through"]+"";
            let jd3 = JSON.parse(Through);
            let openid = jd3["openid"]+"";
            // GlobalClass.UserInfo.openid = openid;

            //添加推广商id  修改为唯一标识符
            jd3["UniqueSerial"] = GlobalClass.GameInfoForConfig.UniqueSerial;
			console.log("UniqueSerial == " + GlobalClass.GameInfoForConfig.UniqueSerial);
            jd3["platformid"] = 0;
			jd3["mac"]= GlobalClass.LoginClass.iosUUID;
			jd3["NotHeadVerify"] = "1";
			SendMsgForWebService.setWSData(JSON.stringify(jd3),"ThirdLogin",(_str)=>{
				console.log(_str);
				let jd = JSON.parse(_str);
				let Code = jd["Code"]+"";
				let Msg = jd["Msg"]+"";
				let UserName = jd["UserName"]+"";
				let Ts = jd["Ts"]+"";
				let Data = jd["Data"]+"";
				let AccountId = jd["AccountId"]+"";
				if (Code == "200")
				{
					ServerMsg.SendAccountLoginMSG(UserName,openid + CommonFuc.AESEncryptBase64(Ts, Data),GlobalClass.GameInfoForConfig.UniqueSerial);
				}
				else
				{
					KFControllerMgr.showTips(Msg);
				}

			},"1");
		}else{
				let ErrorStr = jd2["ErrorStr"]+"";
				console.log("ErrorStr == " + ErrorStr);
				KFControllerMgr.showTips(ErrorStr);
		}
		});
	}



}