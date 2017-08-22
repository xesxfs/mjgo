/**
 *
 * @author 
 *
 */
class AnonymousTipsPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
         this.ListenObjList = [ {event:egret.TouchEvent.TOUCH_END,items:{"Btn_OK":"","Btn_Cancle":"",
                                                    },},
                               {event:egret.TouchEvent.CHANGE,items:{
                                                    },},
                            
                            ];//添加btn名为key，值为冷却时间，然后在类中添加btn名+Click的函数，即可自动注册btn事件 ,如 Btn_MyBankClick为函数名
        this.EventsList = [
            ];
        
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        let oriText = "[ffeb0b]亲爱的玩家，[ff0600]游客模式[-]下的游戏数据（包括付费）在更换设备时将[ff0600]无法找回[-]。对此造成损失的情况 官方 将不承担任何责任。我们建议您选择注册新账号再登录游戏或者登录成功后根据提示[ff0600]完善账号信息[-]。[-]";
        this.mPanel.Label_Content.textFlow =  CommonFuc.parseColorText(LocalizationMgr.getText(oriText));
    }
    
    protected setOnClickListener() {
    }

    protected removeOnClickListener() {
    }
    

    private Btn_OKClick(){
        KFControllerMgr.showTips("登录中",0);
        if(DeviceUtils.IsAndroid)
        {
            this.AnonymourLogin();
        }else if(DeviceUtils.IsIos){
            DeviceUtils.executePluginsEvents("6001#egret");
        }else{//Web

        }
    }

    private Btn_CancleClick(){
        this.mPanel.hide();
    }

    /// <summary>
	/// Android 及编辑器匿名登录
	/// </summary>
	/// <param name="parm"></param>
	public  AnonymourLogin()
	{
		// LitJson.JsonData jsObj = new LitJson.JsonData();
		// jsObj["openid"] = ""+Random.Range(10000000, 99999999);
		// jsObj["nickename"] = "";
		// jsObj["accesstoken"] = GlobalClass.LoginClass.iosUUID;
		// LitJson.JsonData sendmsg = new LitJson.JsonData();
		// sendmsg["Code"] = "200";
		// sendmsg["ErrorStr"] = "错误";
		// sendmsg["Through"] = jsObj.ToJson();
		// GameObject.Find ("GlobalPanel").GetComponent<GlobalPanel> ().LoginMsg3rd(sendmsg.ToJson());
	}
}