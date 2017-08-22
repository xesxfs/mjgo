/**
 *
 * @author 
 *
 */
class WXHHScene extends KFScene{
	public constructor() {
    	super();
        
	}
	
	protected init(){
    	super.init();
		this.TAG = "WXHHScene";
	}
	
    public onAddToStage() {
		super.onAddToStage();
		KFControllerMgr.getCtl(PanelName.WXHHPanel).show();
		KFControllerMgr.getCtl(PanelName.ChatPanel).show();
    }
    
     
    
    
}
