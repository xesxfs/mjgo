/**
 * 登录界面
 * @author chenwei
 * @date 2016/6/27
 */
class LoginScene extends BaseScene{
    /**控制模块*/
    protected ctrl:LoginController;
    /**微信登录*/
    private wxLoginBtn:eui.Button;


    public constructor() {
        super();       
        this.skinName = "LoginSceneSkin";
	}
    
    protected onEnable() {    
       
        if(App.DeviceUtils.IsNative){
            this.isToken();
            this.backWXLogin();
        }else{
            WeixinSdk.getWxCofig();
        }
        
        this.wxLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onWXLogin,this);   
    }

    protected onRemove() {
        this.wxLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onWXLogin,this);
    }

    /**判断本机是否存在token */     
    private isToken(){         
        var refreshToken = egret.localStorage.getItem("refresh_token");         
        if(refreshToken != null&&refreshToken != undefined){             
            this.wxLoginBtn.visible = false;
            var ctrl1 = new LoginController();             
            // ctrl1.sendLoginAppReq("",refreshToken);         
        }else{             
            this.wxLoginBtn.visible = true;         
        }     
    }

    //原生登陆放回     
    private backWXLogin(){         
        egret.ExternalInterface.addCallback("wxLoginBack", function (message:string) {             
            // var ctrl1 = new LoginController();             
            // ctrl1.sendLoginAppReq(message,"");         
        });   
    }

    /**点击微信登录*/   
    private onWXLogin(e: egret.Event) {
		// egret.ExternalInterface.call("wxLogin","wx"); 
        this.ctrl.onLogin();
    } 

    /**Native资源更新列表*/
    private getChangeList(){
        var changeList = RES.getVersionController().getChangeList();
        var len = changeList.length;
        console.log("加载列表长度:" + len);
        for(var i=0;i<len;i++){
            console.log("加载列表" + i + ":" + changeList[i].url + "," + changeList[i].size);
        }
    }
    
    
}
