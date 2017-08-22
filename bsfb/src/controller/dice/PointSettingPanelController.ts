class PointSettingPanelController extends KFController  {
    protected mPanel:PointSettingPanel;
    
    private isFirstInput = true;

    protected init(){
    	super.init();
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.isFirstInput = true;
        this.mPanel.Label_Num.text = GlobalClass.DiceGameClass.RoomScore;

    }

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_BS,egret.TouchEvent.TOUCH_END,this.BSOnClick,this);
      this.mPanel.Btn_BS.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.BSHold,this);
      this.AddClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_END,this.OKOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Wan,egret.TouchEvent.TOUCH_END,this.NumOnClick,this);
      for(let i = 0 ; i<10;i++){
          this.AddClickEvent(this.mPanel["PointSetting_"+i],egret.TouchEvent.TOUCH_END,this.NumOnClick,this);
      }
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_BS,egret.TouchEvent.TOUCH_END,this.BSOnClick,this);
      this.mPanel.Btn_BS.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.BSHold,this);
      this.RemoveClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_END,this.OKOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Wan,egret.TouchEvent.TOUCH_END,this.NumOnClick,this);
      for(let i = 0 ; i<10;i++){
          this.RemoveClickEvent(this.mPanel["PointSetting_"+i],egret.TouchEvent.TOUCH_END,this.NumOnClick,this);
      }
    }

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        this.mPanel.hide();
    }

	// 确定
    private OKOnClick(event:egret.TouchEvent):void{
        console.log("确定");
        if (this.mPanel.Label_Num.text) //确定按钮
        {
            let result = Number(this.mPanel.Label_Num.text);

            let usedOwnerPoint = DHTGamePanelController.GetOwnerUsedPoint();
            let usedOpponentPoint = DHTGamePanelController.GetOpponentUsedPoint();

            if (result < Number(GlobalClass.DiceGameClass.GuaranteePoint))
            {
                KFControllerMgr.showTips("最低限制为5万");
                this.mPanel.Label_Num.text = "50000";
                return;
            }

            if (result > Math.min(usedOwnerPoint, usedOpponentPoint))
            {
                KFControllerMgr.showTips("设置点数不能大于房主或挑战者可用点数，请检查！");
                return;
            }

            if (usedOwnerPoint < Number(GlobalClass.DiceGameClass.GuaranteePoint))
            {
                KFControllerMgr.showTips("房主可用点数不足，请检查！");
                return;
            }

            if (GlobalClass.DiceGameClass.opponentIsJoin)
            {
                if (usedOpponentPoint < Number(GlobalClass.DiceGameClass.GuaranteePoint))
                {
                    KFControllerMgr.showTips("挑战者可用点数不足，请检查！");
                    return;
                }
            }
            KFControllerMgr.getCtl(PanelName.DHTSettingPanel).mPanel.Label_point.text = this.mPanel.Label_Num.text;
            this.hide();
        }
    }

	// 删
    private BSOnClick(event:egret.TouchEvent):void{
        console.log("删");
        if(this.mPanel.Label_Num.text.length > 0){
            this.mPanel.Label_Num.text = this.mPanel.Label_Num.text.substr(0,this.mPanel.Label_Num.text.length-1);
        }
        if(this.BSTime)this.BSTime.stop();
    }

    BSTime:egret.Timer;
    // 全删
    private BSHold(event:egret.TouchEvent):void{
        console.log("全删");
        let btn:eui.Button = event.target;
        this.BSTime = new egret.Timer(1000,1);
        this.BSTime.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
            if(btn.currentState == "down")this.mPanel.Label_Num.text = "";
        },this);
        this.BSTime.start();
    }

	// 数字
    private NumOnClick(event:egret.TouchEvent):void{
        console.log("数字");
        let btn:eui.Button = event.target;
        if(this.isFirstInput){
            this.isFirstInput = false;
            this.mPanel.Label_Num.text = ""+btn.name;
        }else{
            this.mPanel.Label_Num.text += btn.name;
        }
        let compareValue = 0;
        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            compareValue = Number(GlobalClass.DiceGameClass.ownerPoint) - Number(GlobalClass.DiceGameClass.GuaranteePoint);
        }
        else
        {
            compareValue = Number(GlobalClass.DiceGameClass.opponentPoint) - Number(GlobalClass.DiceGameClass.GuaranteePoint);
        }
        if (compareValue < 0) compareValue = 0;

        if (Number(this.mPanel.Label_Num.text) > compareValue)
        {
            this.mPanel.Label_Num.text = compareValue.toString();
        }
    }

    

}