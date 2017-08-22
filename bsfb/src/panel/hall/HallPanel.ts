/**
 *
 * @author 
 *
 */
class HallPanel extends KFPanel {
    private bsfb_btn:eui.Button;
    private WXHH_btn:eui.Button;
    private dice_btn:eui.Button;
    private JDSTB_btn:eui.Button;
    
    private Btn_bank:eui.Button;
    private Btn_Setting:eui.Button;
    private Btn_Security:eui.Button;
    private Btn_Share:eui.Button;
    private Btn_VIPHall:eui.Button;
    private Btn_Mall:eui.Button;
    private Btn_Club:eui.Button;
    private Btn_ChangeNick:eui.Button;
    private Btn_Mail:eui.Button;

    private Label_UserID:eui.Label;
    private Label_Nickname:eui.Label;
    private Label_Point:eui.Label;
    private Label_PengJi_ID:eui.Label;
    private levelExpInfo:LevelExpComponent;
    private Sprite_VIP:eui.Image;
    private Image_RedDot:eui.Image;

    private Go_BulletinTable:NoticeUI;
    public ddb:DropDownBox;

    public constructor() {
        super();
        // this.skinName = "HallPanelSkin";
        this.skinName = "HallPanelSkin3";
    }

    protected init() {
        this.TAG = "HallPanel";
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
