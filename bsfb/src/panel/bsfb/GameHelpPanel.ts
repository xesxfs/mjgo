/**
 *
 * @author 
 *
 */
class GameHelpPanel extends KFPanel {

    private Btn_Close:eui.Button;
    private Toogle_Introduce:eui.Button;
    private Toggle_Explain:eui.Button;
    private Btn_PageDown:eui.Button;
    private Btn_PageUp:eui.Button;

    private pages:eui.Label;
    private pageGroups:eui.Group;
    private helpContent:eui.Label;
    private textScroller:eui.Scroller;
    private DropDown:BSHelpDropDownBOX;

    protected init() {
        this.skinName = "Panel_Help";
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
