/**
 *
 * @author 
 *
 */
class ClubDolePanel extends KFPanel {
    private Btn_CloseClubDole:eui.Button;
    private Btn_CloseClubDoleInfo:eui.Button;
    private Btn_Jurisdiction:eui.Button;
    private Btn_Contribution:eui.Button;
    private Btn_Receive:eui.Button;
    private Btn_ClosePanel:eui.Button;
    private Btn_Help:eui.Button;
    private Btn_CloseDolelog:eui.Button;

    private Lb_ClubDole:eui.Label;
    private Lb_Contribution:eui.Label;
    private Lb_ReceiveDole:eui.Label;
    private Lb_ReceiveDoleTimes:eui.Label;
    private Lb_MyPoint:eui.Label;

    private Label_TitleInfo:eui.Label;
    private Lb_OnceNum_Contribution:eui.Label;
    private Lb_TotalNum_Contribution:eui.Label;
    private Lb_times_Contribution:eui.Label;
    private Btn_Receive_Contribution:eui.Button;
    private Btn_ReceiveAll_Contribution:eui.Button;
    

    private Panel_ClubDoleInfo:eui.Group;
    private Panel_Jurisdiction:eui.Group;
    private Panel_ReceiveClub_Num:eui.Group;
    private Panel_DoleLog:eui.Group;

    private Btn_Setting:eui.Button;
    private Btn_CloseJurisdictionPanel:eui.Button;
    private Btn_Log:eui.Button;
    
    private JurisdictionInfoList:eui.List;
    private DoleLogList:eui.List;
    private ClubDoleList:eui.List;

    protected init() {
        this.skinName = "Panel_ClubDole";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
        this.DoleLogList.itemRenderer = ClubDoleLogItem;
        this.JurisdictionInfoList.itemRenderer = ClubJurisdictionItem;
        this.ClubDoleList.itemRenderer = ClubDoleInfoItem;
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}
