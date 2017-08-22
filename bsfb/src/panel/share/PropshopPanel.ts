/**
 *
 * @author 
 *
 */
class PropshopPanel extends KFPanel {
    private Btn_Close:eui.Button;
    private Toggle_GameScore:eui.RadioButton;
    private Toggle_GameVIP:eui.RadioButton;
    private Toggle_GameProps:eui.RadioButton;
    private Toggle_MyProps:eui.RadioButton;
    private propsList:eui.List;
    private Label_NickName:eui.Label;
	private Label_Props_TotalScore:eui.Label;
    private PurchaseHorn:eui.Group;
    private ScoreScroller:eui.Scroller;
    private VIPScroller:eui.Scroller;
    private MyProps:eui.Group;
    private Label_LoudSpeakerAmount:eui.Label;
    private Label_LuckyAmount:eui.Label;

    private Btn_CloseChaseHorn:eui.Button;
    private Btn_Sure:eui.Button;
    private Btn_cancel:eui.Button;
    private Btn_Addcount:eui.Button;
    private Btn_Minuscount:eui.Button;
    private Panel_List:eui.Group;
    private Label_Tips:eui.Label;
    
    protected init() {
        this.skinName = "Panel_PropShop";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
        this.propsList.itemRenderer = ShopItem;
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}
