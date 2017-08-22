/**
 *
 * @author 
 *
 */
class HallScene extends KFScene{
	public constructor() {
    	super();
	}
	
	protected init(){
        this.TAG = "HallScene";
	}
	
    public onAddToStage() {
		super.onAddToStage();
        KFControllerMgr.getCtl(PanelName.HallPanel).show();
		KFControllerMgr.getCtl(PanelName.ChatPanel).show();
    }
}
