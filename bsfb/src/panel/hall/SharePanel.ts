/**
 *
 * @author 
 *
 */
class SharePanel extends KFPanel {
    private Btn_Close:eui.Button;
    private Btn_Copy:eui.Button;
    private Btn_ShareWXFriend:eui.Button;
    private Btn_ShareWX:eui.Button;
    private Btn_ShareQQ:eui.Button;

    protected init() {
        this.skinName = "Panel_Share";
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
