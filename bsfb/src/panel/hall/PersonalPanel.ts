/**
 *
 * @author 
 *
 */
class PersonalPanel extends KFPanel {
    private Lb_nickName:eui.Label;
    private Lb_ID:eui.Label;
    private Lb_Club:eui.Label;
    private label_count:eui.Label;
    private label_privilege:eui.Label;
    private NobleGroup:eui.Group;

    private Label_none:eui.Label;
    private label_noble:eui.Label;
    private Sprite_Noble:eui.Image;
    private Sprite_VIP:eui.Image;
    private label_prize:eui.Label;

    public Btn_ClosePersonal:eui.Button;
    public Btn_Roll:eui.Button;
    public Btn_changeToNobel:eui.Button;

    protected init() {
        this.skinName = "Panel_Personal";
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
