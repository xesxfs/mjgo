/**
 *
 * @author 
 *
 */
class AboutPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [];
	}
	
    protected onReady() {
        
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
}