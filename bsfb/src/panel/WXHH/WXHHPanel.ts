/**
 *
 * @author 
 *
 */
class WXHHPanel extends KFPanel {
    private Btn_MyLog:eui.Button;
    private Btn_History:eui.Button;
    private Btn_Help:eui.Button;
    private Btn_Pay:eui.Button;
    private Btn_MyBank:eui.Button;
    private Btn_ClubDole:eui.Button;
    private UIP_LnningControl:eui.Button;
    private Btn_QuitFive:eui.Button;

    private Btn_closeHelp:eui.Button;
    private Btn_closeRank:eui.Button;
    private Btn_ranking:eui.Button;

    private Label_MyCount:eui.Label;
    

    private HelpPanel:eui.Group;
    private FivePanel:eui.Group;
    private RanklingPanel:eui.Group;
    private NetDelayPanel:eui.Group;
    private Go_WinInfo:eui.Group;
    private Go_Time:eui.Group;
    private LabelInningGroup:eui.Group;

    private Go_CountToggle:eui.Group;
    private Go_BetButton:eui.Group;
    private Go_BetCountLabel:eui.Group;
    private Go_AllCountLabel:eui.Group;
    private Lb_OddsGroup:eui.Group;

    private Sprite_LotteryResult:eui.Image;
    private Sprite_Border:eui.Image;
    private Sprite_PokerBorder:eui.Image;
    private Label_time:eui.Label;

    private RanklistPanel0:eui.Group;
    private RanklistPanel1:eui.Group;
    private Label_midTip:eui.Label;
    private Label_bottom:eui.Label;
    private Btn_Receive:eui.Button;
    private Label_WinCount:eui.Label;

    private LnningControl:WXDropDownBOX;

    private Label_MyRanklistInfo0:eui.Label;
    private Label_MyRanklistInfo1:eui.Label;
    private Label_MyRanklistInfo2:eui.Label;

    private Label_RanklistPanel0:eui.Group;
    private Label_RanklistPanel1:eui.Group;

    private Ranklist0:eui.List;
    private Ranklist1:eui.List;

    private Toggle_Ranklist0:eui.RadioButton;
    private Toggle_Ranklist1:eui.RadioButton;

    private louderspeaker:MarqueenUI;

    private ResultGroup:eui.Group;
    private Label_LotteryNum0:eui.Label;
    private Label_LotteryNum1:eui.Label;
    private Sprite_LotteryColor0:eui.Image;
    private Sprite_LotteryColor1:eui.Image;
    private Label_AddCount:eui.Label;
    
    protected init() {
        this.skinName = "WXHHPanelskin";
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
