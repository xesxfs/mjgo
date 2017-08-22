/**
 *
 * @author 
 *
 */
class ChangeNickNamePanel extends KFPanel {
    public Btn_CloseRegister:eui.Button;
    public Btn_Ok:eui.Button;
    public Btn_Roll:eui.Button;
    public Btn_recommend1:eui.Button;
    public Btn_recommend2:eui.Button;
    public Lb_oldName:eui.Label;
    public Lb_showNameLabel:eui.Label;
    public Lb_showName:eui.Group;
    public LB_title:eui.Label;
    public oldName:eui.Label;
    public needPoint:eui.Label;
    public newNameLabel:eui.Label;
    public recommend:eui.Label;
    public constructor() {
        super();
        this.skinName = "Panel_ChangeNickName";
    }

    protected init() {
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
    
}