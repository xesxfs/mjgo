enum PanelName {
    StartPanel,
    ThirdLoginPanel,
    LoginChoicePanel,
    HallPanel,
    GamePanel,
    DialogPanel,
    BankPanel,
    VedioPanel,
    HallSettingPanel,
    SecurityPanel,
    AboutPanel,
    BindingPhonePanel,
    BindingTipPanel,
    ChangeNickNamePanel,
    ClubDolePanel,
    ClubPanel,
    AntiAddictionPanel,
    IDAuthenticatPanel,
    MailPanel,
    MemberPanel,
    PhoneVerificationCodePanel,
    PropshopPanel,
    SharePanel,PersonalPanel,RollPanel,
    SystemTitlePanel,
    WXHHPanel,WXHistoryPanel,WXMylogPanel,
    SlotHelpPanel,
    TaskPanel,ExitPanel,
    TaskTipPanel,ChatPanel,AnonymousTipsPanel,
    LuckyPropsPanel,GameScorePanel,UploadVedioPanel,
    LZTBPanel,GameHelpPanel,GameRankPanel,BSFBExitPanel,BSFBExitSurePanel,GameSettingPanel,GameProtectPanel,StonePanel,PayChoicePanel,
    DHTRoomListPanel,DHTHelpPanel,DHTCreatRoomPanel,DHTGamePanel,DHTSettingPanel,InviteFriendsPanel,RoomLogPanel,CallDicePanel,JoinRoomPanel,PointSettingPanel,InviteTitlePanel,DHTGuidPanel,InviteSettingPanel,
} 
enum Language{
    "简体中文",
    "繁体中文",
    "英语",
    "西班牙语",
    "日语",
}
class KFPanelManager {
    private localizedData:any = null;
    private localizedLanguage:string = "简体中文";

	private static instance: KFPanelManager;
    public static getInstance(): KFPanelManager {
        if(this.instance == null) {
            this.instance = new KFPanelManager();
        }
        return this.instance;
    }
	public constructor() {
	}

    public setLocalizedDatas(data:any){
        this.localizedData = data;
    }

    public getLocalisedString(panel:string,key:string):string{
        return this.localizedData[panel][key][this.localizedLanguage];
    }

    public setLanguage(lanType:Language){
        this.localizedLanguage = Language[lanType];
    }

}