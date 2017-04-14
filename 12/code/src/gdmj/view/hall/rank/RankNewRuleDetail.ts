/**
 * @author xiongjian
 * 2017-1-7
 */

class RankNewRuleDetail extends BasePanel {
    public constructor() {
        super();
        this.skinName = "RankNewRuleDetailSkin";
    }

    private closeBtn: eui.Button;
    private timer: egret.Timer = new egret.Timer(1000, 10);
    

    protected onEnable() {
        this.closeTimer();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    }

    private onClose() {
        this.hide();
        this.timer.reset();
    }

    protected onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    }

    protected childrenCreated() {
        
    }

    /**
     * 关闭窗口倒计时
     */
    private closeTimer() {
        
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimeUpdate, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimeComplete, this);
        this.timer.start();
    }

    private onTimeUpdate(): void {
       
    }

    private onTimeComplete(): void {
         
        this.onClose();
        this.timer.reset();        
    }

}