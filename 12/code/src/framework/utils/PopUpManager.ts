/**
 * 弹框管理
 * @author chenkai 
 * @date 2016/6/28
 */
class PopUpManager extends SingleClass{
    private lockBg: egret.Sprite;   //半透明黑色背景
    private curPanel:BasePanel;     //当前显示的面板
    private lockCount:number = 0;   //黑色背景锁定次数
    private clickClose = [];        //点击黑色背景关闭弹框
    
	public constructor() {
        super();
    	this.createLockBg();
	}
	
    /**
     * 显示弹框
     * @panel 弹框
     * @lock 是否锁定屏幕(增加黑色半透明背景)
     * @click 是否监听点击黑色背景关闭弹框事件
     */ 
    public addPopUp(panel: BasePanel,lock: boolean = true,click:boolean = true) {
        var popLayer = App.LayerManager.popLayer;
        if(lock) {
            this.lockCount++;
            popLayer.addChild(this.lockBg);
        }
        
        this.clickClose[this.lockCount] = click;
        
        popLayer.addChild(panel);
        this.curPanel = panel;
    }

    /**移除弹框*/
    public removePopUp(panel: BasePanel) {
        panel.parent && panel.parent.removeChild(panel);
        var popLayer = App.LayerManager.popLayer;
        this.lockCount--;
        if(this.lockCount > 0){ //有多个弹框时，将黑色背景移动至其他弹框下
            this.clickClose[this.lockCount] = false;
            popLayer.setChildIndex(this.lockBg,popLayer.numChildren - 2);   
        }else{
            this.lockCount = 0;
            this.clickClose[this.lockCount] = false;
            this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
        }
    }

    /**移除所有弹框*/
    public removeAllPopUp() {
        var popLayer = App.LayerManager.popLayer;     
        popLayer.removeChildren();
        this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
        this.lockCount = 0;
        this.clickClose.length = 0;
    }
    
    /**改变透明度*/
    public changeTransparency(transparency:number){
        this.lockBg.alpha = transparency;
    }

    //创建黑色半透明背景
    private createLockBg() {
        this.lockBg = new egret.Sprite();
        this.lockBg.graphics.beginFill(0x000000,0.5);
        var stage = App.StageUtils.stage;
        this.lockBg.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight);
        this.lockBg.graphics.endFill();
        this.lockBg.touchEnabled = true;
        this.lockBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    } 
    
    //点击黑色背景
    private onTouchTap(){
        if(this.clickClose[this.lockCount]){
            this.removePopUp(this.curPanel);
        }
    }
}
