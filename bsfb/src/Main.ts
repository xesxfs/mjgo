//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        ResUtils.Instance.addConfig("resource/default.res.json", "resource/")
        ResUtils.Instance.loadConfig(this.onConfigComplete, this);
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);       
      
    }
 
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {      
        ResUtils.Instance.loadGroup("load", this, this.onLoadComplete);
    }

    private onLoadComplete(event:RES.ResourceEvent):void {    
        this.loadingView=new LoadingUI();
        this.addChild(this.loadingView);         
         DeviceUtils.CloseStartView();
         if(DeviceUtils.IsWeb){
            mouse.enable(this.stage);
         }

         var resGroups=["preload","hall","DiamondClip","bsfbclip","wxhhclip","skeleton","particle","fireball","holeAni","sound"];
         ResUtils.Instance.loadGroup(resGroups, this, this.onResourceLoadComplete,this.setProgress);
             
    }

  private onResourceLoadComplete(event:RES.ResourceEvent):void {   
      this.removeChild(this.loadingView);
      this.createScene();  
  }
  public setProgress(event:RES.ResourceEvent) {
      this.loadingView.setProgress(event);
  }

    private createScene(){   
        DeviceUtils.Init();
        this.startCreateScene();
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        // this.changeLog();
        GameStartLogic.getInstance().startGame(this);

        NetEventMgr.getInstance().addEventListener("0_event",this.on0_event,this);
        let heart = new egret.Timer(30000,0);
        heart.addEventListener(egret.TimerEvent.TIMER,()=>{

            if(WebSocketMgr.getInstance().isClose()){
                return;
            }
            if(!GlobalClass.LoginClass.isFirstHeart){
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
            }else{
                GlobalClass.LoginClass.isFirstHeart = false;
                GlobalClass.LoginClass.isHeartReturn = false;
            }
            
            egret.log("我觉得我还可以抢救一下……"+new Date());
            let js = JSON.stringify({"":""});
            WebSocketMgr.getInstance().SendOneceMsg(0,js);
            LocalizationMgr.saveTranslate();
        },this);
        // NetEventMgr.getInstance().addEventListener("0_event",(event: egret.Event)=>{
        //     let msg: MessageStruct = <MessageStruct>event.data;
        //     let datastr = msg.getDataStr();
        //     egret.log("抢救是有效的！！！"+new Date()+datastr);
        // },this);
        heart.start();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.activate);
    }

    private on0_event(event: egret.Event): void {
        console.log("on0_event");//心跳包回复
        GlobalClass.LoginClass.isHeartReturn = true;
    }

    private changeLog(){
        let logView = new LogView();
        logView.drawBG(this.stage.stageWidth,this.stage.stageHeight);
        logView.initTF();
        this.addChild(logView);

        for(var i: number = 0;i < 100;i++){
            logView.addLog("TestAbc"+i);   
        }
        logView.scroll();

        if(!DEBUG){
            console["oldLog"] = console.log;
            console.log = function(message?: any, ...optionalParams: any[])
            {
            console["oldLog"](message, ...optionalParams);
            }

            console["oldError"] = console.error;
            console.error = function(message?: any, ...optionalParams: any[])
            {
            console["oldError"](message, ...optionalParams);
            }

            console["oldWarn"] = console.warn;
            console.warn = function(message?: any, ...optionalParams: any[])
            {
            console["oldWarn"](message, ...optionalParams);
            }
        }
    }

}
