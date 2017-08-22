/**
 *
 * @author 
 *
 */
class WXHistoryPanel extends KFPanel {
    private Btn_Close:eui.Button;
    private Btn_FirstPage:eui.Button;
    private Btn_PageUp:eui.Button;
    private Btn_PageDown:eui.Button;
    private Btn_EndPage:eui.Button;

    private Label_Time:eui.Label;
    private Label_CurrentPage:eui.Label;
    private Label_Pages:eui.Label;

    private WinCountGroup:eui.Group;


    protected init() {
        this.skinName = "wxhh_HistoryPanel";
        this.TAG = "StartPanel";
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
