/**
 *
 * @author 
 *
 */
class LoginScene extends KFScene{
	public constructor() {
    	super();
	}
	
    protected init() {
        super.init();
        this.TAG = "LoginScene";
	}
	
    public onAddToStage() {
        super.onAddToStage();
        // KFControllerMgr.getCtl(PanelName.ThirdLoginPanel).show();
        KFControllerMgr.getCtl(PanelName.LoginChoicePanel).show();
        
    }
    
    private login(){
        
    }
}
