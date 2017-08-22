/**
 *
 * @author 
 *
 */
class GamePanel extends KFPanel {
    private Btn_ExitGame:eui.Button;
    private Btn_HelpGame:eui.Button;
    private Btn_Setting:eui.Button;
    private Btn_Ranklist:eui.Button;
    private Btn_VedioGame:eui.Button;
    private Btn_TaskGame:eui.Button;
    private Btn_Lucky:eui.Button;
    private Btn_MakeSure:eui.Button;
    private Btn_Trusteeship:eui.Button;
    private Btn_PropsGame:eui.Button;
    private Btn_MyBank:eui.Button;
    private Btn_ClubDole:eui.Button;
    private Btn_SuperBet:eui.Button;
    private Btn_Addline:eui.Button;
    private Btn_Minusline:eui.Button;
    private Btn_Addcount:eui.Button;
    private Btn_Minuscount:eui.Button;
    private Btn_TrusteeshipCancel:eui.Button;
    private Btn_SoltHelp:eui.Button;
    private Btn_Speed:eui.Button;

    private Label_CountGroup:eui.Group;
    private Sprite_Line:eui.Group;
    

    private Label_Line:eui.Label;
    private Label_Count:eui.Label;
    private Label_TotalScore:eui.Label;
    private Label_TodayScore:eui.Label;
    private Label_LuckyAmount:eui.Label;

    private Toggle_Count0:eui.Button;
    private Toggle_Count1:eui.Button;
    private Toggle_Count2:eui.Button;
    private Toggle_Count3:eui.Button;
    private label_SuperbetTip:eui.Label;
    private Label_Speed:eui.Label;
    
    private GamePanel:eui.Group;
    private SuperBetGroup:eui.Group;
    private superBetBG:eui.Group;

    private gslider:GameSlider;
    private Bg_Gauanqia:eui.Image;

    protected init() {
        this.skinName = "GamePanelskin";
        this.TAG = "GamePanel";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);

        // ShadeFont.Instance.setShade(this.Btn_PropsGame.getChildAt(1),"buttonGrayColor",true);     
        
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }

    protected setOnClickListener() {
        
    }

    protected removeOnClickListener() {

    }
}
