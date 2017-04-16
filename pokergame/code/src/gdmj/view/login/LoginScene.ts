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
    /**光*/
    private particleSys:particle.ParticleSystem;
    /**花瓣*/    
    private particleFlower: particle.ParticleSystem;    
    /**云*/
    private clund1:eui.Image;
    private clund2: eui.Image;
    private clund4: eui.Image;
    private clund5: eui.Image;
    private sclund1:eui.Image;

    public constructor() {
        super();       
        this.skinName = "LoginSceneSkin";
	}
    
    protected onEnable() {    
        this.startCloudAnim();
        if(App.DeviceUtils.IsNative){
            this.isToken();
            this.backWXLogin();
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
            ctrl1.sendLoginAppReq("",refreshToken);         
        }else{             
            this.wxLoginBtn.visible = true;         
        }     
    }

    //原生登陆放回     
    private backWXLogin(){         
        egret.ExternalInterface.addCallback("wxLoginBack", function (message:string) {             
            var ctrl1 = new LoginController();             
            ctrl1.sendLoginAppReq(message,"");         
        });   
    }

    /**点击微信登录*/   
    private onWXLogin(e: egret.Event) {
		egret.ExternalInterface.call("wxLogin","wx"); 
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
    
    

   /**测试账号按钮*/
   private debugBtns(){
        var row=2;
        var column=6;
        var xoffset=450;
        var yoffset=40
        
        for(var i = 1;i <= 16;i++) {
            let b=new eui.Label();
            let ii=i-1;
            b.background=true;
            b.backgroundColor=0x000000;
            b.text = "test" +i.toString();
            
            b.x = ii % column * 100 + xoffset
            b.y = yoffset + ~~(ii / column) * 60;
           
            b.x=~~(ii/row)*80+xoffset
            b.y=yoffset+(ii%row)*60;
            this.addChild(b);
            b.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{   
            let lab= <eui.Label>e.target;                 
            
            this.ctrl.sendDebugLoginReq(lab.text, App.DataCenter.debugInfo.password);
            },this)
        }
    }
    
   

    /**?*/
    private createPrticle(){
        if(!this.particleSys){
            var txtute = RES.getRes("blink_png");
            var json = RES.getRes("blink_json");
            this.particleSys = new particle.GravityParticleSystem(txtute,json);
            this.particleSys.x = -200;
            this.particleSys.y = -30;

            this.addChild(this.particleSys);
        }
        if(!this.particleFlower){            
            var txtute = RES.getRes("fly_flower_png");
            var json = RES.getRes("fly_flower_json");
            this.particleFlower = new particle.GravityParticleSystem(txtute,json);
            this.addChild(this.particleFlower);
        }
    }

    /**云飘动画*/
    private startCloudAnim(){
        //云浮动
        let c2x=this.clund2.x;
        let c4x=this.clund4.x;
    
        let ttime=2500;
        egret.Tween.get(this.clund2,{ loop: true }).to({ x: -10 },ttime).to({ x: c2x },ttime);
        egret.Tween.get(this.clund4,{ loop: true }).wait(300).to({ x: -10 },ttime).to({ x: c4x },ttime);
        
        let c1x=this.clund1.x;
        let c5x=this.clund5.x;
        
        egret.Tween.get(this.clund1,{ loop: true }).to({ x: c1x - 30 },ttime).to({ x: c1x },ttime);
        egret.Tween.get(this.clund5,{ loop: true }).wait(300).to({ x: c5x - 40 },ttime).to({ x: c5x },ttime);        
        let s1x=this.sclund1.x;
        egret.Tween.get(this.sclund1,{ loop: true }).wait(300).to({ x: s1x - 30 },ttime).to({ x: s1x },ttime);
    }
}
