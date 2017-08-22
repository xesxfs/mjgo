/**
 *
 * @author 
 *
 */
class BSFBExitSurePanelController extends KFController{ 
	
	protected init(){
    	super.init();
        this.EventsList = [];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        egret.Tween.removeTweens(this.mPanel.hand);
        this.mPanel.hand.x = 290;
        this.handMove();
    }

    private handMove(){
        egret.Tween.get(this.mPanel.hand).to({x:560},2500,egret.Ease.backOut).call(function (){
			this.mPanel.hand.x = 290;
            this.handMove();
		},this);
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }
    
    private Btn_CloseClick(){
        this.mPanel.hide();
    }

    protected destroy() {
        egret.Tween.removeTweens(this.mPanel.hand);
        super.destroy();
    }
}