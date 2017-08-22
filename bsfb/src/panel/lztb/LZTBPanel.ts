/**
 *
 * @author 
 *
 */
class LZTBPanel extends KFPanel {
    constructor(){
        super();
         console.log("LZTBPanel constructor")

    }
    private Label_TotalScore:eui.Label;
    private Label_TodayScore:eui.Label;
    private Label_SlotScore:eui.Label;
    private Btn_Start:eui.Button;

    private DiamondGroup:eui.Group;
    private bodyGroup:eui.Group;
    private club00:eui.Image;
    private club10:eui.Image;
    private club20:eui.Image;
    private club30:eui.Image;
    private club11:eui.Image;
    private club21:eui.Image;
    private club22:eui.Image;
    private club31:eui.Image;
    private club32:eui.Image;
    private club33:eui.Image;

    private fireball:eui.Group;
    private holes:eui.Group;
    protected init() {       
        super.init();
        this.skinName = "LZTB_main";
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
    }

    protected childrenCreated(){
        super.childrenCreated();
         console.log("childrenCreated")
    }
    protected  createChildren(){
        super.createChildren();
        console.log("createChildren")
    }   

    protected partAdded(partName:string ,instance:any){
        console.log(partName,instance.x)
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}
