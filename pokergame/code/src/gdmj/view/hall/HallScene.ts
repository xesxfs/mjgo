/**
 * 大厅界面
 * @author chenwei
 * @date 2016/6/28
 */
class HallScene extends BaseScene { 
    
    public constructor() {
        super();
        this.skinName = "HallSceneSkin";
    }
    private msgBtn:eui.Button;
    private setBtn:eui.Button;
    private ruleBtn:eui.Button;
    private scoreBtn:eui.Button;

    private croomBtn:eui.Button;
    private eroomBtn:eui.Button;


    private userIdLab:eui.Label;
    private nickNameLab:eui.Label;
    private roomCardLab:eui.Label;
    private headImg:eui.Image;
    private payBtn:eui.Button;

    /**添加到场景中**/
    protected onEnable() {
        this.setUserInfoUI();
        this.addEventListener("touchTap",this.onTouchTap,this);
    }

         /**组件创建完毕**/
    protected childrenCreated() {
        
    }

    /**从场景中移除**/
    protected onRemove() {

    }

    private setUserInfoUI(){
        var userVo:UserVO = App.DataCenter.UserInfo.getMyUserVo();
        if(!userVo){
            return;
        }
        this.userIdLab.text = userVo.id.toString();
        this.nickNameLab.text = userVo.nickname;
        this.roomCardLab.text = userVo.roomCard.toString();
        this.headImg.source = userVo.headImgUrl;

    }


    private onTouchTap(e:egret.TouchEvent){
        switch(e.target){
            case this.msgBtn:
                App.PanelManager.open(PanelConst.MsgPanel);
                break;
            case this.setBtn:
                App.PanelManager.open(PanelConst.SetPanel);
                break;
            case this.ruleBtn:
                App.PanelManager.open(PanelConst.RulePanel);
                break;
            case this.scoreBtn:
                App.PanelManager.open(PanelConst.ScorePanel);
                break;
            case this.croomBtn:
                App.PanelManager.open(PanelConst.CroomPanle);
                break;        
            case this.eroomBtn:
                App.PanelManager.open(PanelConst.EroomPanel);
                break;
           case this.payBtn:
                App.PanelManager.open(PanelConst.PayPanel);
                break;
           case this.headImg:
                App.PanelManager.open(PanelConst.PersionInfoPanel);
                break;
        }

    }
}
