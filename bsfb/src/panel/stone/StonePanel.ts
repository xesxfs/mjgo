/**
 *
 * @author 
 *
 */
class StonePanel extends KFPanel {
    private Arena_Challenge0:eui.Group;
    private Arena_Challenge1:eui.Group;
    private Arena_Challenge2:eui.Group;
    private Arena_Challenge3:eui.Group;
    private Arena_Challenge4:eui.Group;
    private Arena_Challenge5:eui.Group;
    private Arena_Challenge6:eui.Group;
    private Arena_Challenge7:eui.Group;
    private Panel_Challenge:eui.Group;
    private Panel_Arena:eui.Group;

    private Toggle_Challenge:eui.RadioButton;
    private Toggle_MyArena:eui.RadioButton;
    private Toggle_Arena:eui.RadioButton;
    private Btn_CloseStone:eui.Button;
    private Btn_MyBank:eui.Button;
    private Btn_Club:eui.Button;

    //Arena_Challenge0
    private Btn_ArenaSure:eui.Button;
    private Btn_Count:eui.Group;
    private Input_ArenaName:eui.EditableText;
    private Input_Arena_ArenaPassword:eui.EditableText;
    private Input_Count:eui.EditableText;
    private Label_PasswordTips:eui.Label;
    private Label_ArenaCount1:eui.Label;
    private Label_ArenaCount2:eui.Label;
    private Label_ArenaCount3:eui.Label;
    private Toggle_Arena_Stone:eui.RadioButton;
    private Toggle_Arena_Scissor:eui.RadioButton;
    private Toggle_Arena_Paper:eui.RadioButton;

    //Arena_Challenge1
    private Btn_MyArena:eui.Button;

    //Arena_Challenge2
    private Btn_FirstPage:eui.Button;
    private Btn_PageUp:eui.Button;
    private Btn_PageDown:eui.Button;
    private Btn_EndPage:eui.Button;
    private Btn_RefreshList:eui.Button;
    private Label_CurrentPage:eui.Label;
    private Label_Pages:eui.Label;
    private Arena1List:eui.List;

    //Arena_Challenge3
    private Btn_Sure_ArenaPassword:eui.Button;
    private Btn_Cancel_ArenaPassword:eui.Button;
    private Input_Challenge_ArenaPassword:eui.Label;

    //Arena_Challenge4
    private Label_ArenaName4:eui.Label;
    private Label_ArenaTime4:eui.Label;
    private Label_ArenaUser4:eui.Label;
    private Label_ArenaCount4:eui.Label;
    private Toggle_Challenge_Scissor:eui.RadioButton;
    private Toggle_Challenge_Stone:eui.RadioButton;
    private Toggle_Challenge_Paper:eui.RadioButton;
    private Btn_ChallengeSure:eui.Button;
    private Btn_CancelChallenge:eui.Button;

    //Arena_Challenge5
    private Label_ArenaName5:eui.Label;
    private Label_ArenaTime5:eui.Label;
    private Label_ArenaCount5:eui.Label;
    private Label_ArenaUser5:eui.Label;
    private Label_ChallengeUser5:eui.Label;
    private Label_Fee5:eui.Label;

    private Label_ChallengeResult5:eui.Label;

    private Sprite_ChallengeResult5_Timeout:eui.Image;
    private Sprite_ChallengeResult5_Draw:eui.Image;
    private Sprite_ChallengeGesture5:eui.Image;
    private Sprite_ArenaGesture5:eui.Image;

    private lost5:eui.Group;
    private win5:eui.Group;
    private Btn_Back5:eui.Button;

    //Arena_Challenge6
    private Label_ArenaName6:eui.Label;
    private Label_ArenaTime6:eui.Label;
    private Label_ArenaUser6:eui.Label;
    private Label_ArenaCount6:eui.Label;
    private Label_ChallengeUser6:eui.Label;
    private Label_ChallengeResult6:eui.Label;
    private Label_Fee6:eui.Label;

    private Sprite_ChallengeResult6_Timeout:eui.Image;
    private Sprite_ChallengeResult6_Draw:eui.Image;
    private Sprite_ChallengeGesture6:eui.Image;
    private Sprite_ArenaGesture6:eui.Image;

    private lost6:eui.Group;
    private win6:eui.Group;
    private Btn_Back6:eui.Button;

    //Arena_Challenge7
    private Arena2List:eui.List;

    private louderspeaker:MarqueenUI;

    protected init() {
        this.skinName = "Panel_Stone";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
        this.Arena1List.itemRenderer = ArenaOneItem;
         this.Arena2List.itemRenderer = ArenaTwoItem;
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}
