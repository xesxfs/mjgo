/**
 *
 * @author 
 *
 */
class VedioPanel extends KFPanel {
    private Btn_Close_GamePanel:eui.Button;
    private Btn_Close:eui.Button;
    private GamePanel:eui.Group;
    private UIPanel:eui.Group;

    private wallLeft:eui.Group;
    private wallRight:eui.Group;
    private wallBottom:eui.Group;

    private Go_groupBallance:eui.Group;
    private Sprite_jewel:eui.Image;
    private Label_groupAmount:eui.Label;
    private Label_groupScore:eui.Label;

    private Label_WinningScore:eui.Label;
    private nick:eui.Label;

    private PublicVediolist:eui.List;
    private MyVedioList:eui.List;
    private louderspeaker:MarqueenUI;
    private DiamondPanel:eui.Group;

    private LeftHide:eui.Image;
    private RightHide:eui.Image;

    private bricktipGroup:eui.Group;
    private tipBG:eui.Image;

     //newbie
    private NewBie:eui.Group;
    private newbieGroup:eui.Group;
    private arrow:eui.Image;
    private hand:eui.Image;
    private Go_Tips_NewBie:eui.Image;
    private Go_Bricks_NewBie:eui.Image;
    private Go_Add_NewBie:eui.Image;
    private Go_Minus_NewBie:eui.Image;
    private Go_Jewel_NewBie:eui.Image;
    private Go_Drill_NewBie:eui.Image;
    private Label_NewBie:eui.Label;
    private Btn_StartGame:eui.Button;
    private Btn_NoBinding:eui.Button;
    private Btn_NewBieBinding:eui.Button;
    private Btn_NewBieSkip:eui.Button;
    private Btn_CloseTrustBG:eui.Button;


    private TrustBG:eui.Group;

    private ArrowAni:egret.tween.TweenGroup;
    private HandAni:egret.tween.TweenGroup;



    protected init() {
        this.skinName = "VedioPanelskin";
        super.init();
        
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);

        this.PublicVediolist.itemRenderer = VedioItem;
        this.MyVedioList.itemRenderer = VedioItem;
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }

    protected setOnClickListener() {
        
    }

    protected removeOnClickListener() {

    }
}
