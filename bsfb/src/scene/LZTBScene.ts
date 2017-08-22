/**
 *
 * @author 
 *
 */
class LZTBScene extends KFScene{
	public constructor() {
    	super();
        
	}
	
	protected init(){
    	super.init();
		this.TAG = "WXHHScene";
	}
	
    public onAddToStage() {
		super.onAddToStage();
		KFControllerMgr.getCtl(PanelName.LZTBPanel).show();
		KFControllerMgr.getCtl(PanelName.ChatPanel).show();
    }
    
     
    
    
}
