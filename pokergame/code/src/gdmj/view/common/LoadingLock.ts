/**
 * 资源加载等待时锁定动画
 * @author chenkai
 * @date 2016/9/19
 */
class LoadingLock extends SingleClass{
    /**loading动画*/
    private mc: egret.MovieClip;
    /**黑色Rect底图*/
    private rect: eui.Rect;
    /**超时计时器*/
    private overTimer:egret.Timer = new egret.Timer(10000,1);
    /**超时回调*/
    private callBack:Function;
    /**超时回调执行对象*/
    private thisObject:any;
	
    /**
     * 锁定
     * @callBack 超时回调
     * @thisObject 超时回调执行对象
     */
    public lock(callBack:Function = null, thisObject:any = null): void {
        this.callBack = callBack;
        this.thisObject = thisObject;
        this.startOverTimer();
        if(this.mc == null) {
            var data = RES.getRes("loadMc_json");
            var texture = RES.getRes("loadMc_png");
       	    var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
            this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("load"));
            this.mc.x = (App.StageUtils.stageWidth - this.mc.width) / 2;
            this.mc.y = (App.StageUtils.stageHeight - this.mc.height) / 2;
        }
        if(this.rect == null) {
            this.rect = new eui.Rect();
            this.rect.width = App.StageUtils.stageWidth;
            this.rect.height = App.StageUtils.stageHeight;
            this.rect.touchEnabled = true;
            this.rect.alpha = 0;
        }
        App.LayerManager.lockLayer.addChild(this.rect);
        App.LayerManager.lockLayer.addChild(this.mc);
        this.mc.gotoAndPlay("roll",-1);
    }

    //停止加载动画
    public unlock() {
        this.callBack = null;
        this.thisObject = null;
        this.stopOverTimer();
        this.mc && this.mc.parent && this.mc.parent.removeChild(this.mc);
        this.rect && this.rect.parent && this.rect.parent.removeChild(this.rect);
    }

    //开始超时计时
    private startOverTimer(){
        this.overTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.overTimer.reset();
        this.overTimer.start();
    }

    //停止超时计时
    private stopOverTimer(){
        this.overTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.overTimer.stop();
    }

    //超时
    private onTimerComplete(){
        if(this.callBack != null && this.thisObject != null){
            this.callBack.call(this.thisObject);
        }
        this.unlock();
    }

}
