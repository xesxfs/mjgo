/**
 *
 * @author 
 *
 */
class StartPanel extends KFPanel{
    
    public logo:eui.Image;
    
	public constructor() {
    	super();
        this.skinName = "StartPanelskin";
	}
	
    protected init() {
        this.TAG = "StartPanel";
        super.init();
    }
    
    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage"+this.TAG);
        
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }

    protected partAdded(partName:string,instance:any){
        console.log("partAdded~",instance);
    }
    
    protected setOnClickListener() {
        
    }

    protected removeOnClickListener() {

    }
    
    private butClick(){
    }
   
}
