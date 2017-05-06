class WeixinSdk {
	public constructor() {
		
	}
	private  static imgUrl:string;
	private  static isInit:boolean=false;

	public static getWxCofig(){
		App.HttpSender.send(new Object(),this.init,this)
	}

	public static init(wxData:Object){

		var bodyConfig:BodyConfig = new BodyConfig();
		bodyConfig.appId = wxData["appId"];
		bodyConfig.timestamp = wxData["timestamp"];
		bodyConfig.nonceStr = wxData["nonceStr"];
		bodyConfig.signature =wxData["signature"];
		this.imgUrl=wxData["imgUrlSt"];
		bodyConfig.jsApiList=[
			'onMenuShareTimeline', 
			'onMenuShareAppMessage',
			'startRecord',
			'stopRecord',
			'playVoice',
			'onVoiceRecordEnd',
			'uploadVoice',
			'downloadVoice']

        bodyConfig.debug = true;

        /// ... 其他的配置属性赋值
        /// 通过config接口注入权限验证配置
        if(wx) {
            wx.config(bodyConfig);
            wx.ready(function () {							
                /// 在这里调用微信相关功能的 API
			WeixinSdk.wxShare();
            });
        }

	}


	//微信分享配置
	public static wxShare(){
			var titleStr = "熊猫棋牌【双扣】【十三道】";
			var descStr = "最好玩的棋牌游戏";
			var linkStr = "http://baidu.com" 
			var imgUrlStr =this.imgUrl;
			
			// if(deskCode > 0){
			// 	titleStr += " 房号:" + deskCode;
			// }

			console.log("微信分享" );
			var bodyMenuShare:BodyMenuShareAppMessage =new BodyMenuShareAppMessage();
			bodyMenuShare.title = titleStr;
			bodyMenuShare.desc = descStr;
			bodyMenuShare.link = linkStr;
			bodyMenuShare.imgUrl = imgUrlStr;
			bodyMenuShare.success =()=>{};
			wx.onMenuShareAppMessage(bodyMenuShare);

			var bodyMenuShareTimeline:BodyMenuShareTimeline =new BodyMenuShareTimeline();
			bodyMenuShareTimeline.title = titleStr;			
			bodyMenuShareTimeline.link = linkStr;
			bodyMenuShareTimeline.imgUrl = imgUrlStr;
			bodyMenuShareTimeline.success =()=>{};
			wx.onMenuShareTimeline(bodyMenuShareTimeline);
		}


}