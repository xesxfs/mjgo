class CallDicePanelController extends KFController  {
    protected mPanel:CallDicePanel;

    private playerPoint =
    {
        diceCount : 0, //色子个数
        dicePoint : 0 //色字点数
    }

    //开始显示的叫色个数
    private startFromNum = 2;
    //开始显示的叫色点数
    private startFromPoint = 1;

    //页数
    private page = 0;

    private bShowAddBtn = false;
    

    protected init(){
    	super.init();
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来

    }

    public FirstCallDiceShow()
    {
        this.show();
        this.SetInitData();

        if (this.startFromNum == 10 && this.startFromPoint == 6) this.hide();

        this.SetDiceNumActive();
        this.HideAllDicePoint();

        this.mPanel.Btn_Close.visible=(true);
        this.mPanel.LabelTitle.visible=(true);
    } 

    public InitAndShow(num, showAddBtn = true){
        this.show();
        this.SetInitData();
        this.bShowAddBtn = showAddBtn;

        if (this.startFromNum == 10 && this.startFromPoint == 6) this.hide();

        this.SetDiceNumActive();
        this.HideAllDicePoint();

        this.mPanel.Btn_Close.visible=(false);
        this.mPanel.LabelTitle.visible=(false);

        if (num == 1) num = 2;
        let index = -1;
        this.mPanel.Btn_Nums.forEach((v,i,s)=>{
            if(v.label==num)index = i;
        })
        let targeTransform = this.mPanel.Btn_Nums[index];
        let event = new egret.TouchEvent(egret.TouchEvent.TOUCH_END);
        targeTransform.dispatchEvent(event);
        // this.DiceNumBtnHandler(targeTransform.gameObject);
	}

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Receive0,egret.TouchEvent.TOUCH_END,this.PageOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Receive7,egret.TouchEvent.TOUCH_END,this.PageOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Add,egret.TouchEvent.TOUCH_END,this.AddOnClick,this);
      for(let i = 0; i < 5; i++){
          this.AddClickEvent(this.mPanel["Btn_Num"+i],egret.TouchEvent.TOUCH_END,this.CountOnClick,this);
      }
        for(let i = 1; i < 7; i++){
          this.AddClickEvent(this.mPanel["Image_D"+i],egret.TouchEvent.TOUCH_END,this.DiceOnClick,this);
      }
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Receive0,egret.TouchEvent.TOUCH_END,this.PageOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Receive7,egret.TouchEvent.TOUCH_END,this.PageOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Add,egret.TouchEvent.TOUCH_END,this.AddOnClick,this);
      for(let i = 0; i < 5; i++){
          this.RemoveClickEvent(this.mPanel["Btn_Num"+i],egret.TouchEvent.TOUCH_END,this.CountOnClick,this);
      }
        for(let i = 1; i < 7; i++){
          this.RemoveClickEvent(this.mPanel["Image_D"+i],egret.TouchEvent.TOUCH_END,this.DiceOnClick,this);
      }
	}

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        this.mPanel.hide();
        //修改了设置起手叫骰取消问题
        if (this.mPanel.Btn_Close.visible) GlobalClass.DiceGameClass.firstHandTag = false;
    }

    // 骰子
    private DiceOnClick(event:egret.TouchEvent):void{
        console.log("骰子");
        let btn = <eui.Button>event.target;
        this.FirstHandPoint=this.DiceCount+btn.name;
        this.playerPoint.dicePoint = Number(btn.name);
        let result = this.FirstHandPoint;
        if (GlobalClass.DiceGameClass.firstHandTag && !GlobalClass.DiceGameClass.isRunning)
        {
            KFControllerMgr.getInstance().getCtl(PanelName.DHTGamePanel).ShowFirstDiceTips(this.FirstHandPoint);
        }
        else
        {
            let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "id":GlobalClass.UserInfo.str_UserID, "bid":result});
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.CALLDICE_SEND,js);  
        }
        
        this.hide();
    }

    // 个数
    private CountOnClick(event:egret.TouchEvent):void{
        console.log("个数");
        let btn = <eui.Button>event.target;

        for (let i = 0, iMax = this.mPanel.Btn_Nums.length; i < iMax; i++)
        {
            let targetTransform = this.mPanel.Btn_Nums[i];
            this.switchBtn(targetTransform,true);
        }
        this.switchBtn(btn,false);

        this.playerPoint.diceCount = Number(btn.label);
        let num = Number(btn.label);
        this.DiceCount=btn.label;

        if (num == this.startFromNum)   //选择和上次一样的叫色个数
        {
            if (GlobalClass.DiceGameClass.isRoomOwner)
            {
                this.ShowDicePoint(this.startFromPoint+1);
            }
            else
            {
                this.ShowDicePoint(this.startFromPoint + 1);
            }
        }
        else if (num > this.startFromNum)
        {
            this.ShowDicePoint(1);
        }
    }

    // 
    private AddOnClick(event:egret.TouchEvent):void{
        console.log("加一");
        let btn = <eui.Button>event.target;
        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            if (Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount) < 10)
            {
                this.playerPoint.diceCount = (Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount) + 1);
            }
            else
            {
                this.playerPoint.diceCount = Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount);
            }
            this.playerPoint.dicePoint = Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber);
        }
        else
        {
            if (Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount) < 10)
            {
                this.playerPoint.diceCount = (Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount) + 1);
            }
            else
            {
                this.playerPoint.diceCount = Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount);
            }
            this.playerPoint.dicePoint = Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber);
        }
        let result = this.playerPoint.diceCount.toString() + this.playerPoint.dicePoint.toString();

        let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "id":GlobalClass.UserInfo.str_UserID, "bid":result});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.CALLDICE_SEND,js);  
        
        this.hide();
    }

    //翻页  
    private PageOnClick(event:egret.TouchEvent):void{
        console.log("翻页");
        let btn = <eui.Button>event.target;
        this.page = btn.label == "<"?0:1;

        for(let item in this.mPanel.Btn_Nums){
            this.mPanel.Btn_Nums[item].visible =false;
        }

        let startIndex;
        if (this.startFromPoint == 6) startIndex = this.startFromNum + 1;
        else startIndex = this.startFromNum;

        let count = 10 - startIndex + 1;
        if (count > 0 && count <= 5) //不需要向后翻页
        {
            for (let i = 0; i < count; i++)
            {
                let targetTransform = this.mPanel.Btn_Nums[i];
                let num = (i + startIndex);
                targetTransform.label = num;
                targetTransform.visible = (true);
            }
            this.mPanel.Btn_Add.visible=(true);
            this.mPanel.Btn_Receive0.visible =(false);
            this.mPanel.Btn_Receive7.visible =(false);
        }
        else if (count > 5) //需要向后翻页
        {
            if (this.page == 0)
            {
                for (let i = 0; i < 5; i++)
                {
                    let targetTransform = this.mPanel.Btn_Nums[i];
                    let num="";
                    if (i == 4)
                    {
                        num = "10";
                    }
                    else
                    {
                        num = (i + startIndex);
                    }   
                    targetTransform.label = num;
                    targetTransform.visible=(true);
                }
                if (this.bShowAddBtn)
                {
                    this.mPanel.Btn_Add.visible=(true);
                }
                else
                {
                    this.mPanel.Btn_Add.visible=(false);
                }
                this.mPanel.Btn_Receive0.visible =(false);
                this.mPanel.Btn_Receive7.visible =(true);
            }
            else if (this.page == 1)
            {
                for (let i = 0; i < count - 4; i++)
                {
                    let targetTransform = this.mPanel.Btn_Nums[i];
                    let num = (i + 4 + startIndex);
                    targetTransform.name = num;
                    targetTransform.label = num;
                    targetTransform.visible=(true);
                }
                this.mPanel.Btn_Add.visible=(false);
                this.mPanel.Btn_Receive0.visible =(true);
                this.mPanel.Btn_Receive7.visible =(false);
            }
        }
        else if (count == 0) //10个
        {
            let targetTransform = this.mPanel.Btn_Nums[0];
            let num = startIndex;
            targetTransform.label = num;
            targetTransform.visible=(true);

            this.mPanel.Btn_Receive0.visible =(false);
            this.mPanel.Btn_Receive7.visible =(false);
        }

        this.SetAutoCallBtnState();

    }
    
    /// <summary>
    /// 设置自动叫骰按钮状态
    /// </summary>
    private SetAutoCallBtnState()
    {
        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            if (GlobalClass.DiceGameClass.opponentPlayerCallDiceCount == "10")
            {
                this.mPanel.Btn_Add.visible=(false);
            }
        }
        else
        {
            if (GlobalClass.DiceGameClass.ownerPlayerCallDiceCount == "10")
            {
                this.mPanel.Btn_Add.visible=(false);
            }
        }
    }

    /// <summary>
    /// 显示点数按钮
    /// </summary>
    /// <param name="fromPoint"></param>
    private ShowDicePoint(fromPoint)
    {
        if (fromPoint < 1 && fromPoint > 6) return;

        this.mPanel.Group_Dice.visible = (true);
        for (let i = 0; i < this.mPanel.Image_Dices.length; i++)
        {
            let targetTransform = this.mPanel.Image_Dices[i];
            targetTransform.visible = (false);
        }


        for (let j = fromPoint; j < 7; j++)
        {
            let targetTransform = this.mPanel.Image_Dices[j-1];
            targetTransform.visible = (true);
        }

    }

    private SetInitData()
    {
        this.page = 0;
        this.startFromNum = 2;

        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            if (Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount) > 1) this.startFromNum = Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount); //从2开始起叫
            
            this.startFromPoint = Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber);
        }
        else
        {
            if (Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount) > 1) this.startFromNum = Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount);   //从2开始起叫

            this.startFromPoint = Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber);
        }
    }

    
    private SetDiceNumActive()
    {
        for (let i = 0, iMax = this.mPanel.Btn_Nums.length; i < iMax; i++)
        {
            let targetTransform = this.mPanel.Btn_Nums[i];
            targetTransform.visible = (false);
            this.switchBtn(targetTransform, true);
        }

        let startIndex;
        if (this.startFromPoint == 6) startIndex = this.startFromNum + 1;
        else startIndex = this.startFromNum;

        let count = 10 - startIndex + 1;
        if (count > 0 && count <= 5) //不需要向后翻页
        {
            for (let i = 0; i < count; i++)
            {
                let targetTransform = this.mPanel.Btn_Nums[i];
                let num = (i + startIndex);
                targetTransform.name = num;
                targetTransform.label = num;
                targetTransform.visible = (true);
            }
            this.mPanel.Btn_Add.visible = (true);
            this.mPanel.Btn_Receive0.visible = (false);
            this.mPanel.Btn_Receive7.visible = (false);
        }
        else if (count > 5) //需要向后翻页
        {
            if (this.page == 0)
            {
                for (let i = 0; i < 5; i++)
                {
                    let targetTransform = this.mPanel.Btn_Nums[i];
                    let num="";
                    if (i == 4)
                    {
                        num = "10";
                    }
                    else
                    {
                        num = (i + startIndex);
                    }   
                    targetTransform.name = num;
                    targetTransform.label = num;
                    targetTransform.visible = (true);
                }
                if (this.bShowAddBtn)
                {
                    this.mPanel.Btn_Add.visible = (true);
                }
                else
                {
                    this.mPanel.Btn_Add.visible = (false);
                }
                this.mPanel.Btn_Receive0.visible = (false);
                this.mPanel.Btn_Receive7.visible = (true);
            }
            else if (this.page == 1)
            {
                for (let i = 0; i < count - 4; i++)
                {
                    let targetTransform = this.mPanel.Btn_Nums[i];
                    let num = (i + 4 + startIndex);
                    targetTransform.name = num;
                    targetTransform.label = num;
                    targetTransform.visible = (true);
                }
                this.mPanel.Btn_Add.visible = (false);
                this.mPanel.Btn_Receive0.visible = (true);
                this.mPanel.Btn_Receive7.visible = (false);
            }
        }
        else if (count == 0) //10个
        {
            let targetTransform = this.mPanel.Btn_Nums[0];
            let num = startIndex;
            targetTransform.name = num;
            targetTransform.label = num;
            targetTransform.visible=(true);

            this.mPanel.Btn_Receive0.visible = (false);
            this.mPanel.Btn_Receive7.visible = (false);
        }

        this.SetAutoCallBtnState();
    }

    /// <summary>
    /// 隐藏所有点数
    /// </summary>
    private HideAllDicePoint()
    {
        this.mPanel.Group_Dice.visible=(false);
    }

    /// <summary>
    /// 得到起手叫骰点数
    /// </summary>
    public DiceCount = "";
    public FirstHandPoint = "";
    public GetFirstHandPoint(){
        return this.FirstHandPoint;
    }

}