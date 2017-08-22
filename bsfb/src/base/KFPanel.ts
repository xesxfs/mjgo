/**
 *
 * @author 
 *
 */
class KFPanel extends eui.Component{
    
    protected TAG:string = "";
    public mController: any;
	constructor() {
    	super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this); 
        this.init();
        this.percentHeight =100;
        this.percentWidth = 100;


        //  this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        // this.stage.orientation = egret.OrientationMode.LANDSCAPE;
        // this.stage.stageWidth = 1280;
        // this.stage.stageHeight = 720;
	}

    

    public bindController(ctl:KFController){

        this.mController = ctl;
    }
	
    protected init() {
        this.TAG = egret.getQualifiedClassName(this);
	}
	
    protected childrenCreated() {
        this.setOnClickListener();
        // this.localizaion();
        this.mController.onPanelReady();
        this.validateNow();
        // if(DeviceUtils.IsWeb){
        //     ShadeFont.Instance.setShadeFont(this);
        // }
        ShadeFont.Instance.setBrokeFont(this);

        var className = egret.getQualifiedClassName(this);
        // if(className=="GameHelpPanel"){
        //     this.cacheAsBitmap = true;  
        // } 
        if(className=="GamePanel"){
            this.cacheAsBitmap = true;
        } 
        // this.cacheAsBitmap = true;
    }
    
    protected onAddToStage(){
        console.log("onAddToStage");
    }
    
    protected onRemovefromStage() {
    }
    
    protected setOnClickListener() {
    }

    protected removeOnClickListener() {

    }

    public getTag(){
        return this.TAG;
    }
    
    public addToScene() {
        KFSceneManager.getInstance().getRunningScene().openPanel(this);
    }
    
    public removeFromScene(){
        this.removeOnClickListener();
        this.mController.destroy();
        this.mController = null;
        KFControllerMgr.getInstance().revomePanel(egret.getQualifiedClassName(this));
    }
	
    public hide(){
        // this.visible = false;
        // this.removeFromScene();
        if(this.parent){
            this.parent.removeChild(this);
        }
    }

    public show(){
        this.visible = true;
        this.mController.onShow();
    }

    //panel做多语言适配 其中label和sprite都有适配的需求
    protected localizaion(){
        for(var i=0,len=this.numChildren;i<len;i++){
//            console.log();
            var child = this.$children[i];
            if(child instanceof egret.TextField){
                if(child.name!=""){
                    var textField = <egret.TextField>child;
                    textField.$setText(KFPanelManager.getInstance().getLocalisedString(this.TAG,child.name));
                }
            }
            if(child instanceof egret.Sprite){
                
            }
        }
    }

    public resetLocalization(){

    }
}
