/**
 *
 * @author 
 *
 */
class AwakeScene extends KFScene{
	public constructor() {
    	super();
        
	}
	
	protected init(){
    	super.init();
		this.TAG = "AwakeScene";
	}
	
    public onAddToStage() {
		super.onAddToStage();
		KFControllerMgr.getCtl(PanelName.StartPanel).show();
    }
    
     
    
    
}
