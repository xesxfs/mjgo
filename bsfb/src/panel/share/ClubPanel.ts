/**
 *
 * @author 
 *
 */
class ClubPanel extends KFPanel {
    private ClubInfoPanel:eui.Group;
    private ClubChoicePanel:eui.Group;
    private SearchClubPanel:eui.Group;
    private ClubUpgradePanel:eui.Group;
    private PostionSettingPanel:eui.Group;
    private ClubBulletinPanel:eui.Group;


    private Input_ClubNane:eui.EditableText;
    private Input_ClubID:eui.EditableText;
    private Btn_CloseSearchClub3:eui.Button;
    private Btn_Search2:eui.Button;
    private Btn_ChangeClubPanel:eui.Button;
    private Btn_GenerateClub:eui.Button;
    private GenerateNum_Label:eui.Label;
    private ClubList:eui.List;
    private upgradeList:eui.List;

    private Btn_CloseClubBulletin:eui.Button;
    private Btn_UpdateClubBulletin:eui.Button;
    private Btn_ClearClubBulletin:eui.Button;
    private Input_ClubBulletin:eui.EditableText;
    private MemberList:eui.List;

    private Lb_MyScore:eui.Label;
    private Lb_UpgradeCost:eui.Label;
    private Lb_NextLevel:eui.Label;
    private Lb_ClubNum:eui.Label;
    private Btn_UpgradeClub:eui.Button;
    private Btn_CloseClubUpgrade:eui.Button;

    private Btn_CloseClubInfo:eui.Button;
    private Tg_ClubInfo:eui.RadioButton;
    private Tg_ClubMember:eui.RadioButton;
    private Tg_ApplicantionInfo:eui.RadioButton;
    private Btn_ClubDole:eui.Button;
    private Btn_ClubTask:eui.Button;
    private Btn_ClubSignOut:eui.Button;
    private Btn_watting:eui.Button;
    private Btn_ClubDole0:eui.Button;
    private Btn_ClubTask0:eui.Button;
    private Btn_ClubSignOut0:eui.Button;
    private Btn_watting0:eui.Button;
    private Btn_ClubBulletin:eui.Button;
    private Btn_ClubHelp:eui.Button;
    private Btn_Upgrade:eui.Button;
    private Btn_EndPage:eui.Button;
    private Btn_FirstPage:eui.Button;
    private Btn_PageUp:eui.Button;
    private Btn_PageDown:eui.Button;

    private Lb_ClubBulletin:eui.Label;
    private Lb_MyClubName:eui.Label;
    private Lb_MyClubID:eui.Label;
    private Lb_MyClubMemberCount:eui.Label;
    private Lb_MyClubLevel:eui.Label;
    private Label_Pages:eui.Label;

    private ButtonItem:eui.Group;
    private Go_ClubListInfo:eui.Group;
    private Go_ClubJoinMsg:eui.Group;
    private Go_ApplyNum:eui.Group;
    private Page:eui.Group;

    private MyClubList:eui.List;
    private ClubJoinList:eui.List;

    private ClubHelpPanel:eui.Group;
    private Go_SearchMember:eui.Group;
    private Input_ID_Search:eui.EditableText;
    private Input_NickName_Search:eui.EditableText;
    private Btn_ClearSearchMember:eui.Button;
    private Btn_CloseMemberSearch:eui.Button;
    private Btn_SearchMember:eui.Button;
    private Btn_CloseClubHelp:eui.Button;

    private Btn_MemberID:eui.Button;
    private Btn_MemberNickName:eui.Button;
    private Btn_Posts:eui.Button;
    private Btn_InCoin:eui.Button;
    private Btn_OutCoin:eui.Button;
    private Btn_LastOnTime:eui.Button;
    private Btn_MemberSetting:eui.Button;
    private Btn_ApplicantID:eui.Button;
    private Btn_ApplicantNickName:eui.Button;
    private Btn_ApplicationDate:eui.Button;
    private Btn_Audit:eui.Button;

    private Tg_JoinAll:eui.CheckBox;
    private Btn_NoAll:eui.Button;
    private Btn_YesAll:eui.Button;
    private Btn_OpenSearchMember:eui.Button;
    private Go_ClubJoinAll:eui.Group;
    private Go_Bulletin:eui.Group;
    private Go_JurisdictionControl:eui.Group;
    private UIP_JurisdictionControl:DropDownBox;
    private UIP_SearchMemberControl:DropDownBox;
    private Btn_ClosePostionSetting:eui.Button;
    private Btn_PostionSetting:eui.Button;
    private Btn_MemberSignOut:eui.Button;

    private Lb_GuideTips:eui.Label;
    private Go_Guide:eui.Group;
    private GuideOne:eui.Group;
    private GuideTwo:eui.Group;
    private arrowAni:egret.tween.TweenGroup;

     protected init() {
        this.skinName = "Panel_ClubSkin";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
        this.MyClubList.itemRenderer = ClubMemberItem;
        this.ClubJoinList.itemRenderer = ClubJoinItem;
        this.MemberList.itemRenderer = ClubPositionItem;
        this.ClubList.itemRenderer = ClubItem;
        this.upgradeList.itemRenderer = ClubUpgradeItem;
        
    }   

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}
