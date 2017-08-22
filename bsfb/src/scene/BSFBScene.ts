/**
 *
 * @author 
 *
 */
class BSFBScene extends KFScene{
	public constructor() {
    	super();
	}
	
	protected init(){
		this.TAG = "BSFBScene";
	}
	
    public onAddToStage() {
		super.onAddToStage();
		KFControllerMgr.getCtl(PanelName.GamePanel).show();
		KFControllerMgr.getCtl(PanelName.ChatPanel).show();
    }
}
