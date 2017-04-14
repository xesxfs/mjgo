/**
 * 福利面板
 * @author chenwei
 *
 */
class FuliPanel extends BasePanel{
    /**弹框背景*/
    private panelBg:PanelBg;
	/**关闭按钮*/
    private closeBtn:eui.Button;
    /**签到*/
    private openSignBtn:eui.Image;
    /**救济金*/
    private openJjjBtn: eui.Image;
    /**救济金领取次数*/
    private jjjLabel:eui.Label;
    /**领取救济金的描述信息*/
    private jjjMsgText:eui.Label;
    /**签到状态描述**/
    private signLab:eui.Label;
   
    public constructor() {
        super();
        this.skinName="FuliSkin";
     }

    protected onEnable(){
        this.setCenter();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        this.setJjjLabel();
        if(App.DataCenter.UserInfo.getMyUserVo().signFlag != 1) {
            this.signLab.text ="已签到"
        }
        
    }

    protected onRemove(){
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }

    //设置救济金领取次数
    public setJjjLabel(){
        this.jjjLabel.text = "领取(" + App.DataCenter.welfareInfo.benefit_cnt + "/" + App.DataCenter.welfareInfo.benefitMax + ")";
        this.jjjMsgText.text = "少于" +  App.DataCenter.welfareInfo.broke_money  + "金币的时候可以领取";
    }

    private onTouchTap(e:egret.TouchEvent){
        switch(e.target){
            case this.openSignBtn:
                if(App.DataCenter.UserInfo.getMyUserVo().signFlag == 1){
                    App.PanelManager.open(PanelConst.SignPanel); 
                    App.PanelManager.close(PanelConst.FuliPanel); 
                }else{
                    Tips.info("您今天已经签到过,请明天再来!");
                }    
                break;
            case this.openJjjBtn:
                if(App.DataCenter.welfareInfo.isCanApply()){
                    App.PanelManager.open(PanelConst.JjjPanel);
                }else{
                    Tips.info("您不满足领取救济金条件!");
                }
                break;
            case this.panelBg.closeBtn:
                App.PanelManager.close(PanelConst.FuliPanel);
                break;
        }
    }
   
   
}
