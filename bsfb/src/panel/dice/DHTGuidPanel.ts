class DHTGuidPanel extends KFPanel  {

	public Btn_Close:eui.Button;
    public Btn_Seting:eui.Button;
    public Btn_Help:eui.Button;
    public Btn_Log:eui.Button;
    public Btn_Buy:eui.Button;
    public Btn_Ready:eui.Button;
    public Btn_Open:eui.Button;
    public Btn_FirstCallDice:eui.Button;
    public Btn_InviteFriend:eui.Button;
    public Btn_GameAuto:eui.Button;
    public Btn_Bank:eui.Button;
    public Btn_ClubDole:eui.Button;
    public Btn_CloseFirstDice:eui.Button;

    public Label_Time:eui.Label;
    public Label_SelfName:eui.Label;
    public Label_SelfCoin:eui.Label;
    public Label_OpponentName:eui.Label;
    public Label_OpponentCoin:eui.Label;
    public Label_RoomName:eui.Label;
    public Label_RoomCode:eui.Label;
    public Label_GameModel:eui.Label;
    public Label_InputRoomPoints:eui.Label;
    public Label_OwnerCount:eui.Label;
    public Label_OpponentCount:eui.Label;
    public Label_CallDicePiont:eui.Label;
    public Label_WinLost:eui.Label;
    public Label_TimeTitle:eui.Label;
    public Label_IsReady:eui.Label;

    public Image_FirstCallDice:eui.Image;
    public Image_Self:eui.Image;
    public Image_Opponent:eui.Image;
    public Image_OwnerCount:eui.Image;
    public Image_OpponentCount:eui.Image;
    public Image_CallDicePiont:eui.Image;

    public Image_mDice0:eui.Image;
    public Image_mDice1:eui.Image;
    public Image_mDice2:eui.Image;
    public Image_mDice3:eui.Image;
    public Image_mDice4:eui.Image;
    public Image_oDice0:eui.Image;
    public Image_oDice1:eui.Image;
    public Image_oDice2:eui.Image;
    public Image_oDice3:eui.Image;
    public Image_oDice4:eui.Image;

    public mDices;
    public oDices;

    public Group_Time:eui.Group;
    public Group_FirstCallDice:eui.Group;
    public Group_OwnerDice:eui.Group;
    public Group_OpponentDice:eui.Group;
    public Group_OwnerCount:eui.Group;
    public Group_OpponentCount:eui.Group;
    public Group_CallDicePiont:eui.Group;
    public Group_PlayerOwner:eui.Group;
    public Group_PlayerOpposite:eui.Group;
    public Group_AnimationDown:eui.Group;
    public Group_AnimationUp:eui.Group;
    

    public selfArmature:dragonBones.Armature;
    public opponentArmature:dragonBones.Armature;
    public WinLostArmature:dragonBones.Armature;
    public CountDownArmature:dragonBones.Armature;

    aniIsReady:boolean;

    Group_NewBie:eui.Group;
    Group_Text:eui.Group;
    Image_Arrow:eui.Image;
    Image_NewGuid:eui.Image;
    Btn_NewBieSkip:eui.Button;
    Label_NewBie:eui.Label;

    Panel_InviteFriends:eui.Group;
    Btn_Invite:eui.Button;
    Panel_CallDice:eui.Group;
    Image_D6:eui.Image;
    Btn_Num0:eui.Button;
    Group_inviteItem:eui.Group;


    protected init() {
        this.skinName = "DHT_main";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
        this.mDices = [this.Image_mDice0,this.Image_mDice1,this.Image_mDice2,this.Image_mDice3,this.Image_mDice4,];
        this.oDices = [this.Image_oDice0,this.Image_oDice1,this.Image_oDice2,this.Image_oDice3,this.Image_oDice4,];

        this.Label_WinLost.visible = false;


        for (let i = 0; i < 5; i++)
        {
            let dice = this.mDices[i];
            dice.startScale = dice.scaleX;
            dice.startX = dice.x;
            dice.startY = dice.y;
        }
        for (let i = 0; i < 5; i++)
        {
            let dice = this.oDices[i];
            dice.startScale = dice.scaleX;
            dice.startX = dice.x;
            dice.startY = dice.y;
        }
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
        // AnimationMgr.getInstance().unloadSkeleton();
    }
}