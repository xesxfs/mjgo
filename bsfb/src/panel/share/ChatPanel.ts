/**
 *
 * @author 
 *
 */
class ChatPanel extends KFPanel {
    private SwitchShow:eui.Button;
    private Btn_CloseTips:eui.Button;
    private Btn_OpenShop:eui.Button;
    private PageWorld:eui.Button;
    private SwitchHide:eui.Button;
    private PageClub:eui.Button;

    private Btn_Send_Delete:eui.Button;
    private Btn_Send_MSN:eui.Button;

    private ChatCont:eui.Group;
    private PanelSelect:eui.Group;
    private textSend:eui.Group;
    private TipsPanel:eui.Group;

    private chatWorldList:eui.List;
    private chatClubList:eui.List;
    private chatWolrdScroller:eui.Scroller;
    private chatClubScroller:eui.Scroller;

    private InputChar:eui.EditableText;

    protected init() {
        this.skinName = "Panel_Chat";
        super.init();
        this.chatClubList.itemRenderer = ChatItem;
        this.chatWorldList.itemRenderer = ChatItem;
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}
