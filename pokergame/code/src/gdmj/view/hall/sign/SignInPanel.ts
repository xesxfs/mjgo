/**
 * 签到界面
 * @author chenwei
 *
 */
class SignInPanel extends BasePanel{
    /**弹框背景*/
    private panelBg:PanelBg;
    /**每日签到奖励图标容器*/ 
    public signInDayGroup:eui.Group;
    /**抽奖转盘*/
    public align:Align;
    /**连续签到天数*/
    private dateLabel:eui.Label;
    /**签到灯笼*/
    private signLightLabel:eui.Label;
    /**vip**/
    private openVipBtn:eui.Button

	public constructor() {
    	super();
        this.skinName ="SignInPanelSkin";
	}

    protected childrenCreated(){
        this.setDateLabel(0);
    }
    
    protected onEnable(){       
        this.setCenter(); 
        this.panelBg.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this.align.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAlignStartTouch,this); 
        this.openVipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openshopVip,this); 
    }

    protected onRemove() {
         this.panelBg.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
         this.align.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAlignStartTouch,this); 
         this.openVipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openshopVip,this); 
    }
    
    private openshopVip(){
      var hall:HallScene=  App.SceneManager.getScene(SceneConst.HallScene) as HallScene;
//      hall.showShopPanel(ShopView.vip);
    }

    /**
     * 设置签到天数
     * @signInCount 签到天数
     */
    public setDateLabel(signInCount:number){
        this.dateLabel.text = signInCount + "";
        this.signLightLabel.text = "连签" + signInCount + "天";
    }

    /**
     * 设置每日签到奖励图标
     * @signcount 签到天数
     * @signList 签到奖励列表
     */
    public setSignDay(signcount:number, signList:Array<any>){
        var len = signList.length;
        for(var i=0;i<len;i++){
            var signAward: SignAward = this.signInDayGroup.getChildAt(i) as SignAward;
            if(signAward){
                signAward.updateInfo(signcount, signList[i]);
            }
        }
    }

    /**
     * 设置签到结果
     * @signcount 签到天数
     */
    public setSignResult(signcount){
        this.signInDayGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignAwardTouch, this);
        this.setDateLabel(signcount);
        this.setSigned(signcount);      
    }

    //点击圆盘抽奖按钮
    private onAlignStartTouch(){
        
    if(App.DataCenter.signInfo.signInCount >= App.DataCenter.signInfo.signMax) {
        
         var hallController:HallController = App.getController(HallController.NAME);
//         hallController.sendLotteryReq();
         
        }else{
            Tips.info("连续虔诚签到7天。财神才会下凡哦!") 
        }
    }

    /**
     * 开始抽奖
     * @prizeIndex 中奖奖品索引
     */
    public startLottery(prizeIndex:number){
        this.align.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAlignStartTouch, this);
	    this.align.setAreaIndex(prizeIndex);
        this.align.startRun();
    }

    /**允许签到*/
    public allowSignIn(){
        this.signInDayGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignAwardTouch, this);
    }

    /**点击签到*/
    private onSignAwardTouch(e:egret.TouchEvent){
        if(e.target instanceof SignAward){
            var signAward:SignAward = e.target;
            //点击当天的签到图标，并且当天尚未签到，则发送签到请求
            if(signAward.id == (App.DataCenter.signInfo.signInCount + 1)){ //签到奖励ID从1开始，签到天数从0开始，所以需要+1
                if(App.DataCenter.UserInfo.getMyUserVo().signFlag == 1){
                    var hallController:HallController = App.getController(HallController.NAME);
//                    hallController.sendSignInReq(signAward.id);
                }
		    }
        }
    }

    /**
     * 设置已签到图标
     * @signcount 签到天数
     */
    public setSigned(signcount:number){
        var signAward: SignAward = this.signInDayGroup.getChildAt(signcount - 1) as SignAward; //签到从1开始，子对象索引从0开始
        if(signAward){
            signAward.setSigned(true);
        }
    }

   

}
