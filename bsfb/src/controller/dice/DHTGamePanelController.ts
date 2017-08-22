class DHTGamePanelController extends KFController  {
    protected mPanel:DHTGamePanel;
    
    private firstCallDice = false; //第一次叫骰
    private bReadyGame = false;
    private bAutoGame = false;
    private believeSndArray = ["believe0", "believe1", "believe2", "believe3" ];
    private unbelieveSndArray = ["disbelieve0", "disbelieve1", "disbelieve2", "disbelieve3" ];
    private winSndArray = ["win0", "win1", "win2", "win3" ];
    private isFirstSetCallDiceBtn = false;
    private guidCout = 5; //引导步数

    /// <summary>
    /// 退出（服务器推送）453 (有一方掉线了)
    /// </summary>
    /// <param name="jsonData"></param>
    private bGoToLoginWinResponse = false;

    protected init(){
    	super.init();
        this.EventsList = [
        MsgID.DiceGame.MODIFYROOMSCORE_SEND,
        MsgID.DiceGame.MODIFYROOMSCORE_RESPONSE,
        MsgID.DiceGame.EXIT_SEND,
        MsgID.DiceGame.EXIT_RESPONSE,
        MsgID.DiceGame.JOINPRIVATEROOM_RESPONSE,
        MsgID.DiceGame.READY_SEND,
        MsgID.DiceGame.READY_RESPONSE,
        MsgID.DiceGame.DICEPOINTS_RESPONSE,
        MsgID.DiceGame.CALLDICE_SEND,
        MsgID.DiceGame.CALLDICE_RESPONSE,
        MsgID.DiceGame.OPENDICE_SEND,
        MsgID.DiceGame.OPENDICE_RESPONSE,
        MsgID.DiceGame.DEPOSIT_SEND,
        MsgID.DiceGame.DEPOSIT_RESPONSE,
        MsgID.DiceGame.RELINK_RESPONSE,
        MsgID.DiceGame.ROOMCLOSE_RESPONSE,
        MsgID.DiceGame.OPPONENTOFFLINE_RESPONSE,
        MsgID.USER.UPDATE_MONEY,
        MsgID.DiceGame.UPDATAPOINTS,
        MsgID.DiceGame.AnimCallBack,
        MsgID.DiceGame.REMAINTIME,
        MsgID.DiceGame.UPDATAROOMINFO,
        MsgID.DiceGame.DrawMoneyMsg,
        MsgID.DiceGame.Msg424,
        MsgID.Hall.Msg_1020,];

        this.HidePlayerPoint(true);
        this.HidePlayerPoint(false);

        
        // this.CSInit();




        //引导设置
        // UIEventListener.Get(uiInfo.Go_Sp_NewBie1).onClick = OnClickNextGuid;
	}
    
    private CSInit(){
        //房主可用点数
        let usedOwnerPoint = DHTGamePanelController.GetOwnerUsedPoint();
        //挑战者可用点数
        let usedOpponentPoint = DHTGamePanelController.GetOpponentUsedPoint();
        if(!GlobalClass.DiceGameClass.isRoomOwner) this.mPanel.Btn_FirstCallDice.visible = false;

        if (!GlobalClass.DiceGameClass.offLine){//非掉线
            GlobalClass.DiceGameClass.opponentPlayerCallDiceCount = "2";
            GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber = "0";

            GlobalClass.DiceGameClass.ownerPlayerCallDiceCount = "2";
            GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber = "0";

            GlobalClass.DiceGameClass.ownerIsReady = "0";
            GlobalClass.DiceGameClass.opponentIsReady = "0";
            if (this.bReadyGame)
            {
                this.bReadyGame = false;
                this.mPanel.Btn_Ready.label = LocalizationMgr.getText("准备");
                // ChangeBtnTexture(uiInfo.ReadyBtn,"game_star_1");
            }
            this.ShowOrHideAutoBtn(false);
            this.ShowOrHideReadyBtn(true);

            //隐藏页面元素
            this.ShowOrHideOwnerResultDices(false);
            this.ShowOrHideOpponentResultDices(false);
            this.ShowOrHideOpenBtn(false);
            //ShowOrHideDotOpenBtn(false);
            this.ShowOrHideAutoBtn(false);
            this.HideWinInfo();
            this.HideLostInfo();
            this.HidePlayerPoint(true);
            this.HidePlayerPoint(false);

            // this.mPanel.selfArmature.animation.gotoAndStop(skeletonType[skeletonType.Dice_Self_shake]);
            // this.mPanel.opponentArmature.animation.gotoAndStop(skeletonType[skeletonType.Dice_Opponent_Shake]);

            //显示自己名字
            if (GlobalClass.DiceGameClass.isRoomOwner)
            {
                this.ShowOrHideOwnerPlayerName(/*"房主: " +*/GlobalClass.UserInfo.str_UserNickname,"fangzhu_1" ,usedOwnerPoint ,true);
                //隐藏对方名字
                if (!GlobalClass.DiceGameClass.opponentIsJoin)
                {
                    this.ShowOrHideOpponentPlayerName(null, "fangzhu_2", null, false);
                    this.mPanel.Btn_InviteFriend.visible = true;
                }
                else
                {
                    this.ShowOrHideOpponentPlayerName(GlobalClass.DiceGameClass.opponentPlayerName, "fangzhu_2",
                        usedOpponentPoint, true);
                    this.SetModiftBtnEnable(false);
                }
            }
            else
            {
                this.ShowOrHideOwnerPlayerName(GlobalClass.UserInfo.str_UserNickname, "fangzhu_2", usedOpponentPoint, true);
                this.ShowOrHideOpponentPlayerName(/*"房主：" + */GlobalClass.DiceGameClass.ownerPlayerName, "fangzhu_1",usedOwnerPoint, true); //显示房主名字
                // this.disableBut(this.mPanel.Btn_Seting);
                this.mPanel.dispatchEvent(new egret.Event("",false,false,false));
            }
            this.SetRoomPoints(GlobalClass.DiceGameClass.RoomScore);

            //只有挑战者加入后才可以准备
            if (GlobalClass.DiceGameClass.isRoomOwner)
            {
                this.switchBtn(this.mPanel.Btn_Ready , GlobalClass.DiceGameClass.opponentIsJoin)

                //调整对局点数
                this.SetModiftBtnEnable(GlobalClass.DiceGameClass.opponentIsJoin);
                this.mPanel.dispatchEvent(new egret.Event("",false,false,GlobalClass.DiceGameClass.opponentIsJoin));
            }

            this.TimeHide();
            // KFControllerMgr.getCtl(PanelName.CallDicePanel).Hide();

            //设置房间密码
            this.SetRoomCode(GlobalClass.DiceGameClass.RoomNum, GlobalClass.DiceGameClass.isRoomOwner);

            //显示起手叫骰
            if (GlobalClass.DiceGameClass.isRoomOwner && GlobalClass.DiceGameClass.opponentIsJoin)
            {
                if (GlobalClass.DiceGameClass.firstHandTag)
                {
                    this.SetFirstDiceStatue(true);
                    if (GlobalClass.DiceGameClass.allIn)
                    {
                        if (GlobalClass.DiceGameClass.gameMode == "1")
                        {
                            this.SetRoomPointALLIN();
                        }
                    }
                    else if (!this.isFirstSetCallDiceBtn)
                    {
                        this.ReadyBtn(null);
                    }
                }
                else
                {
                    this.SetFirstDiceStatue(false);
                }
            }

        }else{//掉线

            egret.log("掉线重连 ++++++++++++++++++++++++===");
            GlobalClass.DiceGameClass.offLine = false;

            //设置房间密码
            if (GlobalClass.DiceGameClass.isRoomOwner)
            {
                this.SetRoomCode(GlobalClass.DiceGameClass.RoomNum, true);
            }
            else
            {
                this.SetRoomCode(null,false);
            }
            this.SetRoomPoints(GlobalClass.DiceGameClass.RoomScore);

            //region 房主重新连上,还原房主显示状况
            if (GlobalClass.DiceGameClass.isRoomOwner) //房主重新连上
            {
                this.ShowOrHideOwnerPlayerName(/*"房主："+*/GlobalClass.DiceGameClass.ownerPlayerName,"fangzhu_1",usedOwnerPoint,true);

                if (GlobalClass.DiceGameClass.ownerIsReady == "0") //房主没有准备好
                {
                    this.SetAutoBtnStatue(GlobalClass.DiceGameClass.ownerPlayerDeposit, GlobalClass.DiceGameClass.opponentPlayerDeposit, "1");

                    this.ShowOrHideOpenBtn(false);
                    this.ShowOrHideReadyBtn(true);
                    this.ShowOrHideAutoBtn(false);
                    
                    this.SetModiftBtnEnable(true);
                    this.mPanel.dispatchEvent(new egret.Event("",false,false,true));
                    
                    this.SetModifyBtnStatue();

                    this.ShowOrHideOwnerResultDices(false);

                    this.switchBtn(this.mPanel.Btn_Ready , GlobalClass.DiceGameClass.opponentIsJoin);
                    
                    if (GlobalClass.DiceGameClass.opponentIsJoin) //挑战者加入房间
                    {
                        this.ShowOrHideOpponentPlayerName(GlobalClass.DiceGameClass.opponentPlayerName, "fangzhu_2",usedOpponentPoint,true);
                        this.ShowOrHideOpponentResultDices(false);
                        this.mPanel.Btn_InviteFriend.visible = false;
                        if (GlobalClass.DiceGameClass.opponentIsReady == "1")
                        {
                            this.SetModiftBtnEnable(false);
                            this.mPanel.dispatchEvent(new egret.Event("",false,false,false));
                        }
                    }
                    else //挑战者未加入房间
                    {
                        this.ShowOrHideOpponentPlayerName(GlobalClass.DiceGameClass.opponentPlayerName, "fangzhu_2",null,false);
                        this.ShowOrHideOpponentResultDices(false);
                        //uiInfo.ModifyRoomBtn.Content.GetComponent<UIButton>().isEnabled = false;
                        this.SetModiftBtnEnable(false);
                        this.mPanel.dispatchEvent(new egret.Event("",false,false,false));
                        this.mPanel.Btn_InviteFriend.visible = true;
                    }
                }
                else //房主准备好了
                {
                    this.SetModiftBtnEnable(false);
                    this.mPanel.dispatchEvent(new egret.Event("",false,false,false));

                    if(GlobalClass.DiceGameClass.ownerPlayerDeposit == "1")
                        this.SetAutoBtnStatue(GlobalClass.DiceGameClass.ownerPlayerDeposit, GlobalClass.DiceGameClass.opponentPlayerDeposit, "1");
                   this. ShowOrHideAutoBtn(true);

                    if (GlobalClass.DiceGameClass.isRunning) //正在游戏中
                    {
                        this.SetSakeDicePoint(GlobalClass.DiceGameClass.ownerPlayerDice, true);
                        this.SetSakeDicePoint(GlobalClass.DiceGameClass.opponentPlayerDice, false);
                        this.ShowOrHideOwnerResultDices(true);

                        this.ShowOrHideOpponentPlayerName(GlobalClass.DiceGameClass.opponentPlayerName, "fangzhu_2",usedOpponentPoint,true);
                        this.ShowOrHideOpponentResultDices(false);
                        this.ShowOrHideReadyBtn(false);
                        
                        this.mPanel.selfArmature.animation.gotoAndStopByFrame(skeletonType[skeletonType.Dice_Self_Look_1], 16);

                        if (GlobalClass.DiceGameClass.ownerCanBid) //轮到房主叫色
                        { 
                            //显示挑战者所叫点数
                            this.ShowPlayerPoint(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount, GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber, false);
                            //显示房主所剩时间
                            this.ShowOrHideTimer(true, true, Number(GlobalClass.DiceGameClass.ownerLeftTime));

                            if (GlobalClass.DiceGameClass.ownerPlayerDeposit == "0")
                            {
                                if (Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber) < 6)
                                {
                                    let CallDicePanel = <CallDicePanelController>KFControllerMgr.getCtl(PanelName.CallDicePanel);
                                    CallDicePanel.InitAndShow(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount);
                                }
                                else if (Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber) == 6 &&
                                            Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount) < 10)
                                {
                                    let CallDicePanel = <CallDicePanelController>KFControllerMgr.getCtl(PanelName.CallDicePanel);
                                    CallDicePanel.InitAndShow(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount + 1);
                                }
                            }
                        }
                        else //轮到挑战者叫色
                        {
                            //显示房主所出点数 
                            this.ShowPlayerPoint(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount, GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber,true);
                            //显示挑战者所剩时间
                            this.ShowOrHideTimer(false,true,Number(GlobalClass.DiceGameClass.opponentLeftTime));
                            
                            this.ShowOrHideOpenBtn(false);
                            KFControllerMgr.getCtl(PanelName.CallDicePanel).hide();
                        }
                    }
                    else //挑战者加入,未准备好状态
                    {
                        this.ShowOrHideReadyBtn(true);
                        this.mPanel.Btn_InviteFriend.visible=(false);
                        this.mPanel.Btn_Ready.label = LocalizationMgr.getText("取消准备");
                        // this.ChangeBtnTexture(this.mPanel.Btn_Ready,"game_star_2");
                        this.bReadyGame = true;

                        this.ShowOrHideOpenBtn(false);
                        this.ShowOrHideOpponentPlayerName(GlobalClass.DiceGameClass.opponentPlayerName, "fangzhu_2",usedOpponentPoint, false);
                        this.ShowOrHideOpponentResultDices(false);
                    }

                    this.mPanel.Btn_InviteFriend.visible=(false);
                }
            }
            //#region 挑战者重新连上,还原挑战者状态
            else if(GlobalClass.DiceGameClass.opponentIsJoin)  
            {
                this.ShowOrHideOwnerPlayerName(GlobalClass.DiceGameClass.opponentPlayerName, "fangzhu_2",usedOpponentPoint, true);
                this.ShowOrHideOpponentPlayerName(/*"房主: " +*/ GlobalClass.DiceGameClass.ownerPlayerName, "fangzhu_1",usedOwnerPoint, true);
                this.SetModiftBtnEnable(false);
                this.mPanel.dispatchEvent(new egret.Event("",false,false,false));

                if (GlobalClass.DiceGameClass.opponentIsReady == "0") //挑战者没有准备好
                {
                    //设置开与不开按钮状态
                    this.ShowOrHideOpenBtn(false);
                    //ShowOrHideDotOpenBtn(false);

                    //设置准备按钮状态
                    this.ShowOrHideReadyBtn(true);

                    //设置托管按钮状态
                    this.ShowOrHideAutoBtn(false);
                    this.SetAutoBtnStatue(GlobalClass.DiceGameClass.ownerPlayerDeposit, GlobalClass.DiceGameClass.opponentPlayerDeposit, "0");

                    //设置所摇到的点数状态
                    this.ShowOrHideOwnerResultDices(false);
                    this.ShowOrHideOpponentResultDices(false);

                    
                }
                else //挑战者已经准备
                {
                    //设置托管按钮状态
                    if(GlobalClass.DiceGameClass.opponentPlayerDeposit == "1")
                        this.SetAutoBtnStatue(GlobalClass.DiceGameClass.ownerPlayerDeposit, GlobalClass.DiceGameClass.opponentPlayerDeposit, "0");
                    this.ShowOrHideAutoBtn(true);

                    if (GlobalClass.DiceGameClass.isRunning) //正在游戏中
                    {
                        //设置准备按钮状态
                        this.ShowOrHideReadyBtn(false);

                        //设置所摇到的点数状态
                        this.SetSakeDicePoint(GlobalClass.DiceGameClass.opponentPlayerDice, true);
                        this.SetSakeDicePoint(GlobalClass.DiceGameClass.ownerPlayerDice, false);
                        this.ShowOrHideOwnerResultDices(true);
                        this.ShowOrHideOpponentResultDices(false);

                        this.mPanel.selfArmature.animation.gotoAndStopByFrame(skeletonType[skeletonType.Dice_Self_Look_1], 16);

                        if (GlobalClass.DiceGameClass.opponentCanBid) // 轮到挑战者叫色
                        {
                            //显示房主所叫点数
                            this.ShowPlayerPoint(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount, GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber, false);
                            //显示挑战者所剩时间
                            this.ShowOrHideTimer(true, true, Number(GlobalClass.DiceGameClass.opponentLeftTime));

                            if (GlobalClass.DiceGameClass.opponentPlayerDeposit == "0")
                            {
                                if (Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber) < 6)
                                {
                                    KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount);
                                }
                                else if (Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber) == 6 &&
                                            Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount) < 10)
                                {
                                    KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount+1);
                                }

                                this.ShowOrHideAutoBtn(true);
                            }
                        }
                        else //轮到房主叫色
                        {
                            //显示挑战者所出点数 
                            this.ShowPlayerPoint(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount, GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber, true);
                            //显示房主所剩时间
                            this.ShowOrHideTimer(false, true, Number(GlobalClass.DiceGameClass.ownerLeftTime));
                            
                            //设置开与不开按钮状态
                                KFControllerMgr.getCtl(PanelName.CallDicePanel).hide();
                                this.ShowOrHideOpenBtn(false);
                        }
                    }
                    else //等待房主开始游戏
                    {
                        //设置开与不开按钮状态
                        this.ShowOrHideOpenBtn(false);
                        this.ShowOrHideOpponentResultDices(false);

                        //设置准备按钮状态
                        this.ShowOrHideReadyBtn(true);
                        //SetBtnState(uiInfo.ReadyBtn, "取消准备");
                        this.mPanel.Btn_Ready.label = LocalizationMgr.getText("取消准备");
                        // this.ChangeBtnTexture(this.mPanel.Btn_Ready, "game_star_2");
                        this.bReadyGame = true;
                    }
                }
            }
            

        }


        this.SetIsReadyTitleStatue();
        this.SetModifyBtnStatue();
        this.SetGameModel();

        this.switchBtn(this.mPanel.Btn_Bank ,!GlobalClass.DiceGameClass.isRunning);
        this.switchBtn(this.mPanel.Btn_ClubDole ,!GlobalClass.DiceGameClass.isRunning);

        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            this.SetSettingBtnEnable(true);
        }
        else
        {
            this.mPanel.Btn_InviteFriend.visible=(false);
            this.SetSettingBtnEnable(false);

            this.SetRoomCode(GlobalClass.DiceGameClass.RoomNum, true);
        }

        //453消息是否推送
        this.bGoToLoginWinResponse = false;

    }
	
    protected onReady() {

    }

    protected destroy() {
        AnimationMgr.getInstance().unloadSkeleton();
        super.destroy();
    }

    protected onShow(){//在界面上显示出来
        this.mPanel.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        this.mPanel.Group_CallDicePiont.visible = false; //隐藏起手叫骰提示
        this.mPanel.Btn_Buy.visible = GlobalClass.SDKType.bShowShop;
        this.mPanel.Btn_Bank.visible = GlobalClass.SDKType.bShowBank2;
        this.mPanel.Btn_ClubDole.visible = GlobalClass.SDKType.bShowClub2;

        // dragonBones.addMovieGroup(RES.getRes("Game_anim_Project_ske_json"), RES.getRes("Game_anim_Project_tex_png")); // 添加动画数据和贴图
        // let movie:dragonBones.Movie = dragonBones.buildMovie(skeletonType[skeletonType.Dice_Self_shake]); // 创建 白鹭极速格式 的动画
        // movie.play("",0); // 播放动画
        // this.mPanel.Group_AnimationUp.addChild(movie);


        AnimationMgr.getInstance().loadSkeleton(()=>{
                    
            this.mPanel.aniIsReady = true;
            this.mPanel.selfArmature = AnimationMgr.getInstance().getSkeleton(skeletonType.Dice_Self_shake,this.mPanel.Group_OwnerDice.x-10,this.mPanel.Group_OwnerDice.y,true);
            this.mPanel.opponentArmature = AnimationMgr.getInstance().getSkeleton(skeletonType.Dice_Opponent_Shake,this.mPanel.Group_OpponentDice.x+20,this.mPanel.Group_OpponentDice.y+30,true);
            this.mPanel.WinLostArmature = AnimationMgr.getInstance().getSkeleton(skeletonType.DHT_YouWin,this.mPanel.Label_WinLost.x+100,this.mPanel.Label_WinLost.y,true);
            this.mPanel.CountDownArmature = AnimationMgr.getInstance().getSkeleton(skeletonType.DHT_CountDown,0,0,true);
            this.mPanel.Group_AnimationDown.addChild(this.mPanel.selfArmature.display);
            this.mPanel.Group_AnimationDown.addChild(this.mPanel.opponentArmature.display);
            this.mPanel.Group_AnimationUp.addChild(this.mPanel.WinLostArmature.display);
            this.mPanel.Group_AnimationUp.addChild(this.mPanel.CountDownArmature.display);
            this.mPanel.Group_AnimationUp.touchEnabled = false;
            this.mPanel.Group_AnimationDown.touchEnabled = false;
            // this.mPanel.selfArmature.display.visible = false;
            // this.mPanel.opponentArmature.display.visible = false;
            this.mPanel.WinLostArmature.display.visible = false;
            this.mPanel.CountDownArmature.display.visible = false;
            this.mPanel.selfArmature.animation.gotoAndStop(skeletonType[skeletonType.Dice_Self_shake]);
            this.mPanel.opponentArmature.animation.gotoAndStop(skeletonType[skeletonType.Dice_Opponent_Shake]);
            this.CSInit();
            KFControllerMgr.getCtl(PanelName.DHTGuidPanel).show();
        },this.mPanel);
    }

    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.AddClickEvent(this.mPanel.Btn_Seting,egret.TouchEvent.TOUCH_END,this.SetingBtn,this);
      this.AddClickEvent(this.mPanel.Btn_Help,egret.TouchEvent.TOUCH_END,this.HelpBtn,this);
      this.AddClickEvent(this.mPanel.Btn_Log,egret.TouchEvent.TOUCH_END,this.LogBtn,this);
      this.AddClickEvent(this.mPanel.Btn_Buy,egret.TouchEvent.TOUCH_END,this.AddPointBtn,this);
      this.AddClickEvent(this.mPanel.Btn_Ready,egret.TouchEvent.TOUCH_END,this.ReadyBtn,this);
      this.AddClickEvent(this.mPanel.Btn_Open,egret.TouchEvent.TOUCH_END,this.OpenBtn,this);
      this.AddClickEvent(this.mPanel.Btn_FirstCallDice,egret.TouchEvent.TOUCH_END,this.FirstCallDiceBtn,this);
      this.AddClickEvent(this.mPanel.Btn_InviteFriend,egret.TouchEvent.TOUCH_END,this.InviteFriendBtn,this);
      this.AddClickEvent(this.mPanel.Btn_GameAuto,egret.TouchEvent.TOUCH_END,this.AutoBtn,this);
      this.AddClickEvent(this.mPanel.Label_RoomName,egret.TouchEvent.TOUCH_END,this.CopyRoomNameLB,this);
      this.AddClickEvent(this.mPanel.Label_RoomCode,egret.TouchEvent.TOUCH_END,this.CopyRoomNumLB,this);
      this.AddClickEvent(this.mPanel.Btn_Bank,egret.TouchEvent.TOUCH_END,this.BankBtn,this);
      this.AddClickEvent(this.mPanel.Btn_ClubDole,egret.TouchEvent.TOUCH_END,this.ClubBtn,this);
      this.AddClickEvent(this.mPanel.Btn_CloseFirstDice,egret.TouchEvent.TOUCH_END,this.CloseFirstCallDiceBtn,this);
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
      this.RemoveClickEvent(this.mPanel.Btn_Seting,egret.TouchEvent.TOUCH_END,this.SetingBtn,this);
      this.RemoveClickEvent(this.mPanel.Btn_Help,egret.TouchEvent.TOUCH_END,this.HelpBtn,this);
      this.RemoveClickEvent(this.mPanel.Btn_Log,egret.TouchEvent.TOUCH_END,this.LogBtn,this);
      this.RemoveClickEvent(this.mPanel.Btn_Buy,egret.TouchEvent.TOUCH_END,this.AddPointBtn,this);
      this.RemoveClickEvent(this.mPanel.Btn_Ready,egret.TouchEvent.TOUCH_END,this.ReadyBtn,this);
      this.RemoveClickEvent(this.mPanel.Btn_Open,egret.TouchEvent.TOUCH_END,this.OpenBtn,this);
      this.RemoveClickEvent(this.mPanel.Btn_FirstCallDice,egret.TouchEvent.TOUCH_END,this.FirstCallDiceBtn,this);
      this.RemoveClickEvent(this.mPanel.Btn_InviteFriend,egret.TouchEvent.TOUCH_END,this.InviteFriendBtn,this);
      this.RemoveClickEvent(this.mPanel.Btn_GameAuto,egret.TouchEvent.TOUCH_END,this.AutoBtn,this);
      this.RemoveClickEvent(this.mPanel.Label_RoomName,egret.TouchEvent.TOUCH_END,this.CopyRoomNameLB,this);
      this.RemoveClickEvent(this.mPanel.Label_RoomCode,egret.TouchEvent.TOUCH_END,this.CopyRoomNumLB,this);
      this.RemoveClickEvent(this.mPanel.Btn_Bank,egret.TouchEvent.TOUCH_END,this.BankBtn,this);
      this.RemoveClickEvent(this.mPanel.Btn_ClubDole,egret.TouchEvent.TOUCH_END,this.ClubBtn,this);
      this.RemoveClickEvent(this.mPanel.Btn_CloseFirstDice,egret.TouchEvent.TOUCH_END,this.CloseFirstCallDiceBtn,this);
    }

    private on402_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
            let cPoint = jd["info"]["cPoint"];
            let oPoint = jd["info"]["oPoint"];
            GlobalClass.DiceGameClass.opponentPoint = (cPoint);
            GlobalClass.DiceGameClass.ownerPoint = (oPoint);
            GlobalClass.DiceGameClass.isRunning = false;

            if (GlobalClass.DiceGameClass.isRoomOwner)
            {
                GlobalClass.UserInfo.str_Hall_totalScore = oPoint;
            }
            else
            {
                GlobalClass.UserInfo.str_Hall_totalScore = cPoint;
            }
            if (!GlobalClass.DiceGameClass.isRoomOwner) GlobalClass.DiceGameClass.opponentIsJoin = false;
            else
            {
                GlobalClass.DiceGameClass.isRoomOwner = false;
                GlobalClass.DiceGameClass.opponentIsJoin = false;
            }


            // if(KFSceneManager.getInstance().getRuningSceneName() == SceneName[SceneName.DHS]+"Scene")
            // {
            //     this.hide();
            // }
            // else
            // {
            //     this.hide();
            //     KFSceneManager.getInstance().replaceScene(SceneName.DHS);
            // }
            this.hide();
            KFControllerMgr.getCtl(PanelName.DHTRoomListPanel).show();
        }
        // else if(jd ["ret"] == "0"){

        // }
        else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }

    }

    //修改对局点数 
    private on404_event(event: egret.Event): void {
        if (!GlobalClass.DiceGameClass.isRoomOwner)
        {
            return;
        }
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
            let roomPoint = jd["info"]["betP"];     //设置房间对局点数
            GlobalClass.DiceGameClass.RoomScore = roomPoint;
            this.SetRoomPoints(roomPoint);

            if (GlobalClass.DiceGameClass.firstHandTag /*&& GlobalClass.DiceGameClass.allIn*/ && !this.isFirstSetCallDiceBtn)
            {
                this.ReadyBtn(null);
            }
            
        }
        else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }

    }
    //修改对局点数(服务端推送)
    private on450_event(event: egret.Event): void {
        if (!this.mPanel.visible)
        {
            return;
        }
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {

            let roomPoint = jd["betP"];
            GlobalClass.DiceGameClass.RoomScore = roomPoint;
            this.SetRoomPoints(roomPoint);
           
            KFControllerMgr.showTips(jd["info"]["desc"]);

            if (GlobalClass.DiceGameClass.gameMode == "1")
            {
                KFControllerMgr.showTips("当局点数修改为: " + roomPoint, 3);
            }
            else if (GlobalClass.DiceGameClass.gameMode == "2")
            {
                KFControllerMgr.showTips("本局为最大模式，本局点数为：" + roomPoint,3);
            }
            
        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }

    }
//退出大话色游戏（服务器推送）
    private on453_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            this.bGoToLoginWinResponse = true;
            let roomId = jd["rid"];
            let player = jd["player"];
            let isOwner = jd["isOwner"];
            let cPoint = jd["cPoint"];
            let oPoint = jd["oPoint"];
         
            GlobalClass.DiceGameClass.opponentPoint = (cPoint);
            GlobalClass.DiceGameClass.ownerPoint = (oPoint);

            GlobalClass.DiceGameClass.isRunning = false;

            if (GlobalClass.DiceGameClass.isRoomOwner) //房主
            {
                this.ShowOrHideOpponentPlayerName(null, null,null, false);
                GlobalClass.DiceGameClass.opponentIsJoin = false;
                GlobalClass.UserInfo.str_Hall_totalScore = oPoint;

                if (isOwner == "1")
                {
                    if(this.mPanel.Group_Time.visible) this.TimeHide();
                    KFControllerMgr.showTips("超时未准备,房间解散！",0,1,()=>{this.GotoLoginWin()});
                    GlobalClass.UserInfo.str_Hall_totalScore = oPoint;
                   
                }
                else if(isOwner == "0")
                {
                    this.SetModiftBtnEnable(false);
                    this.mPanel.dispatchEvent(new egret.Event("",false,false,false));
                    KFControllerMgr.showTips(LocalizationMgr.getText("挑战者 {0} 已经退出该房间",GlobalClass.DiceGameClass.opponentPlayerName),0,1);
                    GlobalClass.DiceGameClass.opponentIsJoin = false;
                    this.CSInit();
                }
            }
            else //挑战者
            {
                this.ShowOrHideOpponentPlayerName(null, null,null, false);
                GlobalClass.UserInfo.str_Hall_totalScore = cPoint;
                GlobalClass.DiceGameClass.opponentIsJoin = false;
                let reason = jd["reason"];
                if (reason == "2")
                {
                    KFControllerMgr.showTips("您已经被房主请出房间!",0,1,()=>{this.GotoLoginWin()});
                }
                else
                {
                     if (isOwner == "0")
                    {
                        KFControllerMgr.showTips("超时未准备,您已被请出房间！",0,1,()=>{this.GotoLoginWin()});
                    }
                    else if (isOwner == "1")
                    {
                        if (this.mPanel.Group_Time.visible) this.TimeHide();
                        KFControllerMgr.showTips(LocalizationMgr.getText("房主 {0}  已经退出该房间，房间解散！",GlobalClass.DiceGameClass.ownerPlayerName),0,1,()=>{this.GotoLoginWin()});
                    }
                }
            }
            
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//挑战者加入房间(服务器推送)
    private on457_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            let opponentName = jd["cname"];
            GlobalClass.DiceGameClass.opponentPlayerName = opponentName;

            let cAuto = jd["cAuto"];        //是否托管
            let cReady = jd["cReady"];      //挑战者是否准备好
            let cPoint = jd["cPoint"];      //挑战者分数
            
            GlobalClass.DiceGameClass.opponentPoint = (cPoint);
            let usedOpponentPoint = this.GetOpponentUsedPoint();
            this.ShowOrHideOpponentPlayerName(opponentName,"fangzhu_2", usedOpponentPoint,true);    //显示挑战者名字

            GlobalClass.DiceGameClass.opponentIsJoin = true;
            
            //设置准备按钮
            this.switchBtn(this.mPanel.Btn_Ready , true);
            this.switchBtn(this.mPanel.Btn_FirstCallDice , true);

            if (GlobalClass.DiceGameClass.gameMode == "2")
            {
                this.ShowOrHideAllInTip(true);
            }
            this.SetModiftBtnEnable(true);
            this.mPanel.dispatchEvent(new egret.Event("",false,false,true));
            this.mPanel.Btn_InviteFriend.visible=(false);
            
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//准备或取消准备
    private on406_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
                //隐藏超时未准备时间提示
                if (this.mPanel.Group_Time.visible) this.TimeHide();

                let oReady = jd["info"]["oReady"];
                let cReady = jd["info"]["cReady"];
                if (GlobalClass.DiceGameClass.isRoomOwner)
                {
                    if (oReady == "1")
                    {
                        this.SetModiftBtnEnable(false);
                        this.mPanel.dispatchEvent(new egret.Event("",false,false,false));
                        this.ShowOrHideAutoBtn(true);

                        if (GlobalClass.DiceGameClass.ownerPlayerDeposit == "1") //取消托管
                        {
                        }
                    }
                    else if (oReady == "0")
                    {
                        this.SetModiftBtnEnable(true);
                        this.mPanel.dispatchEvent(new egret.Event("",false,false,true));
                        this.ShowOrHideAutoBtn(false);
                    }
                }
                else
                {
                    //GlobalClass.DiceGameClass.opponentIsReady = info;
                    if (cReady == "1")
                    {
                        this.ShowOrHideAutoBtn(true);

                        if (GlobalClass.DiceGameClass.opponentPlayerDeposit == "1") //取消托管
                        {
                            //GlobalClass.DiceGameClass.opponentPlayerDeposit = "0";
                            //SetAutoBtnStatue(GlobalClass.DiceGameClass.ownerPlayerDeposit, GlobalClass.DiceGameClass.opponentPlayerDeposit, "0");
                            //JsonEvent.getInstance().SendJsonMsg("rid", "id", "auto", GlobalClass.DiceGameClass.RoomNum, GlobalClass.UserInfo.str_UserID, "0", MsgID.DiceGame.DEPOSIT_SEND);
                        }
                    }
                    else if(cReady == "0")
                    {
                        this.ShowOrHideAutoBtn(false);
                    }
                }
                egret.log("ReadyMsg oReady: " + oReady + " cReady:" + cReady);
                GlobalClass.DiceGameClass.ownerIsReady = oReady;
                GlobalClass.DiceGameClass.opponentIsReady = cReady;
                
                this.SetIsReadyTitleStatue();

                if (this.CanStartGame())  //开始游戏
                {
                    this.mPanel.Btn_Ready.label = LocalizationMgr.getText("取消准备");
                    let img:eui.Image = <eui.Image>this.mPanel.Btn_Ready.getChildAt(2);
                    img.source = RES.getRes("GW_DHT_Atlas_json.game_star_2");
                    // this.ChangeBtnTexture(this.mPanel.Btn_Ready, "game_star_2");
                    this.bReadyGame = true;

                    this.StartGame();
                }
                else
                {
                    if (GlobalClass.DiceGameClass.isRoomOwner)
                    {
                        if (oReady == "1")
                        {
                            this.mPanel.Btn_Ready.label = LocalizationMgr.getText("取消准备");
                            let img:eui.Image = <eui.Image>this.mPanel.Btn_Ready.getChildAt(2);
                            img.source = RES.getRes("GW_label_tex_json.quxiaozhunbei");
                            // this.ChangeBtnTexture(this.mPanel.Btn_Ready.label, "game_star_2");
                            this.bReadyGame = true;
                        }
                        else
                        {
                            this.mPanel.Btn_Ready.label = LocalizationMgr.getText("准备");
                            let img:eui.Image = <eui.Image>this.mPanel.Btn_Ready.getChildAt(2);
                            img.source = RES.getRes("GW_label_tex_json.zhunbei");
                            // this.ChangeBtnTexture(this.mPanel.Btn_Ready.label, "game_star_1");
                            this.bReadyGame = false;
                        }
                    }
                    else
                    {
                        if (cReady == "1")
                        {
                            this.mPanel.Btn_Ready.label = LocalizationMgr.getText("取消准备");
                            let img:eui.Image = <eui.Image>this.mPanel.Btn_Ready.getChildAt(2);
                            img.source = RES.getRes("GW_label_tex_json.quxiaozhunbei");
                            // this.ChangeBtnTexture(this.mPanel.Btn_Ready.label, "game_star_2");
                            this.bReadyGame = true;
                        }
                        else
                        {
                            this.mPanel.Btn_Ready.label = LocalizationMgr.getText("准备");
                            let img:eui.Image = <eui.Image>this.mPanel.Btn_Ready.getChildAt(2);
                            img.source = RES.getRes("GW_label_tex_json.zhunbei");
                            // this.ChangeBtnTexture(this.mPanel.Btn_Ready.label, "game_star_1");
                            this.bReadyGame = false;
                        }
                    }
                }
            
        }else{//失败则提示失败原因
            let reasonType = jd["info"]["reasonType"];
            let reasonTypeDesc = DiceGameController.GetInstance().GetDescription(reasonType);
            this.bReadyGame = false;
            if (reasonType != "1000")
            {
                KFControllerMgr.showTips(reasonTypeDesc);
            }
            else
            {
                KFControllerMgr.showTips(reasonTypeDesc, 0, 1, () =>
                {
                    DiceGameController.GetInstance().GotoLoginScene();
                });
            }
            return;
        }

    }
//准备或取消准备(服务器推送)
    private on451_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            let oReady = jd["oReady"];
            let cReady = jd["cReady"];
            
            GlobalClass.DiceGameClass.ownerIsReady = oReady;
            GlobalClass.DiceGameClass.opponentIsReady = cReady;
            this.SetIsReadyTitleStatue();

            if (GlobalClass.DiceGameClass.isRoomOwner)
            {
                //调整对局点数
                if (oReady == "1" || cReady == "1")
                {
                    this.SetModiftBtnEnable(false);
                    this.mPanel.dispatchEvent(new egret.Event("",false,false,false));
                }

                if (oReady == "0" && cReady == "0")
                {
                    this.SetModiftBtnEnable(true);
                    this.mPanel.dispatchEvent(new egret.Event("",false,false,true));
                }

            }
            else
            {

            }
            
            if (this.CanStartGame())  //开始游戏
            {
                this.StartGame();
            }
            
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
    //摇骰结果
    //谁先叫色,1 :房主，0:挑战者  459
    private cCanBid;
    private oCanBid;
//双方摇到的色字结果(服务器推送)
    private on459_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            
            let result:string = jd["result"];
            let resultArray = result.split('-');
            let isOwnerDice = jd["isOwnerDice"];
            this.oCanBid = jd["oCanBid"];
            this.cCanBid = jd["cCanBid"];
            this.SetWhoCanDid(true,false);

            egret.log("DicePointResponseMsg: " + isOwnerDice + " oCanBid: " + this.oCanBid + "cCanBid: " + this.cCanBid);
            if (isOwnerDice == "1") //房主
            {
                for (let i = 0; i < 5; i++)
                {
                    GlobalClass.DiceGameClass.ownerPlayerDice[i] = resultArray[i];
                }

                for (let i = 5; i < 10; i++)
                {
                    GlobalClass.DiceGameClass.opponentPlayerDice[i - 5] = (resultArray[i]);
                }
            }
            else //挑战者
            {
                for (let i = 0; i < 5; i++)
                {
                    GlobalClass.DiceGameClass.opponentPlayerDice[i] = (resultArray[i]);
                }

                for (let i = 5; i < 10; i++)
                {
                    GlobalClass.DiceGameClass.ownerPlayerDice[i - 5] = (resultArray[i]);
                }
            }
            //设置摇到的色字点数
            if (GlobalClass.DiceGameClass.isRoomOwner)
            {
                this.SetSakeDicePoint(GlobalClass.DiceGameClass.ownerPlayerDice, true);
                this.SetSakeDicePoint(GlobalClass.DiceGameClass.opponentPlayerDice, false);
                
            }
            else
            {
                this.SetSakeDicePoint(GlobalClass.DiceGameClass.opponentPlayerDice, true);
                this.SetSakeDicePoint(GlobalClass.DiceGameClass.ownerPlayerDice, false);
            }
            
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//叫色
    private on407_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
            
                let oBid = jd["info"]["oBid"];
                let oPoint = oBid % 10;
                let oPointCount = Math.floor(oBid / 10);
                GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber = oPoint.toString();
                GlobalClass.DiceGameClass.ownerPlayerCallDiceCount = oPointCount.toString();

                let cBid = jd["info"]["cBid"];
                let cPoint = cBid % 10;
                let cPointCount = Math.floor(cBid / 10);
                GlobalClass.DiceGameClass.opponentPlayerCallDiceCount = cPointCount.toString();
                GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber = cPoint.toString();
                let isOwner = jd["info"]["isOwner"];
                //int time = int.Parse(jsonData["info"]["time"].ToString());
                egret.log("CallDiceResponseMsg, oPointCount: " + oPointCount + " oPoint:" + oPoint + " cPointCount: " + cPointCount + " cPoint: " + cPoint + " isOwner: " + isOwner);

                //SetWaitTime(isOwner, time);
                this.SetCallDiceFinishState(isOwner, oPointCount, oPoint, cPointCount, cPoint);
        }else{//失败则提示失败原因

            let reasonType = jd["info"]["reasonType"];
            let reasonTypeDesc = DiceGameController.GetInstance().GetDescription(reasonType);
            this.bReadyGame = false;
            if (reasonType != "1000")
            {
                KFControllerMgr.showTips(reasonTypeDesc);
            }
            else
            {
                KFControllerMgr.showTips(reasonTypeDesc, 0, 1, () =>
                {
                    DiceGameController.GetInstance().GotoLoginScene();
                });
            }
            return;

        }

    }
//叫色（服务器推送）
    private on452_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            let oBid = jd["oBid"];
            let oPoint = oBid % 10;
            let oPointCount = Math.floor(oBid / 10);
            GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber = oPoint.toString();
            GlobalClass.DiceGameClass.ownerPlayerCallDiceCount = oPointCount.toString();

            let cBid = jd["cBid"];
            let cPoint = cBid % 10;
            let cPointCount = Math.floor(cBid / 10);
            GlobalClass.DiceGameClass.opponentPlayerCallDiceCount = cPointCount.toString();
            GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber = cPoint.toString();

            let isOwner = jd["isOwner"];
            egret.log("CallDiceResponseMsg, oPointCount: " + oPointCount + " oPoint:" + oPoint + " cPointCount: " + cPointCount + " cPoint: " + cPoint + " isOwner: " + isOwner);
            
            this.SetCallDiceFinishState(isOwner, oPointCount, oPoint, cPointCount, cPoint);
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//开色
    private on408_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
            
            let winner = jd["info"]["winner"];
            let loser = jd["info"]["loser"];
            let prize = jd["info"]["prize"];
            let oPoint = jd["info"]["oPoint"];
            let cPoint = jd["info"]["cPoint"];
            let isOwner = jd["info"]["isOwner"];
            egret.log("+++++++++++++++++OpenDiceSendMsg, winner: " + winner + " loser: " + loser + " prize: " + prize + " oPoint:" + oPoint + " cPoint:" + cPoint);
            GlobalClass.DiceGameClass.Prize = prize;
            GlobalClass.DiceGameClass.isWinner = this.CheckWinOrLost(winner);
            GlobalClass.DiceGameClass.ownerPoint = (oPoint);
            GlobalClass.DiceGameClass.opponentPoint = (cPoint);
            
            if (isOwner == "1") GlobalClass.DiceGameClass.openDiceIsOwner = true;
            else GlobalClass.DiceGameClass.openDiceIsOwner = false;

            this.OpponentOpenDiceAnimation();
            this.TimeHide();
        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }

    }
//开色(服务器推送)
    private on456_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            
        let winner = jd["winner"];
        let loser = jd["loser"];
        let prize = jd["prize"];
        let oPoint = jd["oPoint"];
        let cPoint = jd["cPoint"];
        let isOwner = jd["isOwner"];
        GlobalClass.DiceGameClass.Prize = prize;
        GlobalClass.DiceGameClass.isWinner = this.CheckWinOrLost(winner);
        GlobalClass.DiceGameClass.ownerPoint = (oPoint);
        GlobalClass.DiceGameClass.opponentPoint = (cPoint);

        if (isOwner == "1") GlobalClass.DiceGameClass.openDiceIsOwner = true;
        else GlobalClass.DiceGameClass.openDiceIsOwner = false;

        this.OpponentOpenDiceAnimation();
        this.TimeHide();
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//设置托管
    private on409_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
            
            let oAuto = jd["info"]["oAuto"];
            let cAuto = jd["info"]["cAuto"];
            let isOwner = jd["info"]["isOwner"];
            
            GlobalClass.DiceGameClass.ownerPlayerDeposit = oAuto;
            GlobalClass.DiceGameClass.opponentPlayerDeposit = cAuto;

            egret.log("+++++++++++++++++++++++++++++++++++++++++===DepositResponseMsg,cAuto: " + cAuto + " oAuto: " + oAuto + " isOwner: " + isOwner);
            this.SetAutoBtnStatue(oAuto, cAuto, isOwner);

            if (isOwner == "1") //房主
            {
                if (GlobalClass.DiceGameClass.isRunning)
                {
                    if (GlobalClass.DiceGameClass.ownerCanBid)
                    {
                        if (oAuto == "1") //房主托管
                        {
                            KFControllerMgr.getCtl(PanelName.CallDicePanel).hide();
                            this.mPanel.Btn_Open.visible = false;
                        }
                        else //房主取消托管
                        {
                            // Window.GetUIPanel<Panel_CallDice>().Show(2);
                            let cPoint = Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber);
                            let cPointCount = Number(GlobalClass.DiceGameClass.opponentPlayerCallDiceCount);
                            if (cPoint < 6)
                            {
                                KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(cPointCount);
                            }
                            else if (cPoint == 6 && cPointCount < 10)
                            {
                                KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(cPointCount+1);
                            }
                            this.mPanel.Btn_Open.visible = true;
                        }
                    }
                }

            }
            else //挑战者
            {
                if (GlobalClass.DiceGameClass.isRunning)
                {
                    if (GlobalClass.DiceGameClass.opponentCanBid)
                    {
                        if (cAuto == "1") //挑战者托管
                        {
                            KFControllerMgr.getCtl(PanelName.CallDicePanel).hide();
                            this.mPanel.Btn_Open.visible =(false);
                        }
                        else
                        {
                            //Window.GetUIPanel<Panel_CallDice>().Show(2, false);
                            let oPoint = Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber);
                            let oPointCount = Number(GlobalClass.DiceGameClass.ownerPlayerCallDiceCount);
                            if (oPoint < 6)
                            {
                                KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(oPointCount);
                            }
                            else if (oPoint == 6 && oPointCount < 10)
                            {
                                KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(oPointCount+1);
                            }
                            this.mPanel.Btn_Open.visible = true;
                        }
                    }
                }
                
            }
        }else{//失败则提示失败原因
            let reasonType = jd["info"]["reasonType"];
            let reasonTypeDesc = DiceGameController.GetInstance().GetDescription(reasonType);
            KFControllerMgr.showTips(reasonTypeDesc);
            this.bAutoGame = false;
            return;
        }

    }
//设置托管(服务器推送)
    private on454_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            
        let oReady = jd["oReady"];
        let cReady = jd["cReady"];
         GlobalClass.DiceGameClass.ownerIsReady = oReady;
         GlobalClass.DiceGameClass.opponentIsReady = cReady;
        let cAuto = jd["cAuto"];
        let oAuto = jd["oAuto"];
        GlobalClass.DiceGameClass.opponentPlayerDeposit = cAuto;
        GlobalClass.DiceGameClass.ownerPlayerDeposit = oAuto;
        let isOwner = jd["isOwner"];
        
        egret.log("+++++++++++++++++++++++++++++++++++++++++===DepositResponseMsg,cAuto: " + cAuto + " oAuto: " + oAuto + " isOwner: " + isOwner+" oReady: "+oReady+" cReady:"+cReady);

        if (GlobalClass.DiceGameClass.isRunning)
        {
            this.SetAutoBtnStatue(oAuto, cAuto, isOwner);
        }
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//断线重连(服务器推送)
    private on455_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            let rid = jd["rid"];
            let player = jd["player"];  //重连者用户id

            egret.log("++++++++++++++RelinkResponseMsg+++++++++++++: "+player);
            egret.setTimeout(() =>
            {
                 this.ShowOrHideIsReadyTitle(false);
                 this.SetIsReadyTitleStatue();
            },this,500);
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//房间强制解散
    private on460_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            
            if (!GlobalClass.DiceGameClass.isRoomOwner)
            {
                GlobalClass.DiceGameClass.opponentIsJoin = false;
            }
            else
            {   
                GlobalClass.DiceGameClass.isRoomOwner = false;
                this.SetModiftBtnEnable(false);
                this.mPanel.dispatchEvent(new egret.Event("",false,false,false));
            }

            let reason = jd["reason"];
            let nickName = jd["nickName"];

            if (!GlobalClass.DiceGameClass.isRoomOwner) GlobalClass.DiceGameClass.opponentIsJoin = false;
            else
            {
                GlobalClass.DiceGameClass.isRoomOwner = false;
                GlobalClass.DiceGameClass.opponentIsJoin = false;
            }

            if (reason == "0") //房主超时未准备
            {
                if(this.mPanel.Group_Time.visible) this.TimeHide();

                KFControllerMgr.showTips("房主超时未准备,房间解散",-1,1,this.GotoLoginWin);
            }
            else if (reason == "1") //房主掉线超时未重连
            {
                KFControllerMgr.showTips("房主掉线超时未重连,房间解散",-1,1,this.GotoLoginWin);
            }
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//对手掉线
    private on461_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            let isOwner = jd["isOwner"];
            let nickName = jd["nickName"];
            egret.log("对手已经掉线：" + nickName);
             
            this.ShowOrHideIsReadyTitle(true, "掉线");
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//更新个人点数
    private on113_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        // let jd = JSON.parse(datastr);
        console.log(""+datastr);
        // if (jd ["ret"] == "1") {
            
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }
        let strArray = datastr.split("%");

        let newPoint = strArray[2];
        GlobalClass.UserInfo.str_Hall_totalScore = newPoint;
        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            GlobalClass.DiceGameClass.ownerPoint = newPoint;
            let usedOwnerPoint = this.GetOwnerUsedPoint();
            this.UpDateUsablePoint(true, usedOwnerPoint);
        }
        else
        {
            GlobalClass.DiceGameClass.opponentPoint = newPoint;
            let usedOpponentPoint = this.GetOpponentUsedPoint();
            this.UpDateUsablePoint(true,usedOpponentPoint);
        }
    }
//更新挑战者和房主点数
    private on462_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            
        let oPoint = jd["oPoint"];
        let cPoint = jd["cPoint"];
        egret.log("opoint: " + oPoint + " cPoint: " + cPoint);

        if (GlobalClass.DiceGameClass.opponentIsJoin)
        {
            GlobalClass.DiceGameClass.ownerPoint = (oPoint);
            GlobalClass.DiceGameClass.opponentPoint = (cPoint);
            

            if (GlobalClass.DiceGameClass.isRoomOwner)
            {
                GlobalClass.UserInfo.str_Hall_totalScore = oPoint;
                //SetTotlePoints(oPoint);

                let usedOwnerPoint = this.GetOwnerUsedPoint();
                this.UpDateUsablePoint(true, usedOwnerPoint);

                let usedOpponentPoint = this.GetOpponentUsedPoint();
                this.UpDateUsablePoint(false, usedOpponentPoint);
            }
            else
            {
                GlobalClass.UserInfo.str_Hall_totalScore = cPoint;
                //SetTotlePoints(cPoint);

                let usedOwnerPoint = this.GetOwnerUsedPoint();
                this.UpDateUsablePoint(true, usedOwnerPoint);

                let usedOpponentPoint = this.GetOpponentUsedPoint();
                this.UpDateUsablePoint(true, usedOpponentPoint);
            }
        }
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//AnimCallBack
    private on490_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
            let targeTransform = this.mPanel.CountDownArmature;
            if (targeTransform != null)
            {
                targeTransform.display.visible = false;
                this.Starting();
            }
        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }

    }
//超时未准备剩余时间
    private on463_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        // if (jd ["ret"] == "1") {
            
            let remainTime = jd["remainTime"];
            egret.log("RemainTimeResponseMsg: "+remainTime);

            KFControllerMgr.showTips(LocalizationMgr.getText("距离房间解散还剩{0}秒，请点击开始游戏!",remainTime));
            this.WaitForTime(remainTime, null, 0, 0, LocalizationMgr.getText("剩余准备时间"));
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }

    }
//更新房间信息
    private on465_event(event: egret.Event): void {
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
            let roomName = jd["roomName"];
            let rid = jd["rid"];
            this.SetRoomName(roomName);
        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }

    }
//取钱消息
    private on491_event(event: egret.Event): void {
        // let msg: MessageStruct = <MessageStruct>event.data;
        // let datastr = msg.getDataStr();
        // let jd = JSON.parse(datastr);
        // console.log(""+jd);
        // if (jd ["ret"] == "1") {
            
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }
        let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "userid":GlobalClass.UserInfo.str_UserID});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.Msg423,js);
    }
//设置叫骰
    private on424_event(event: egret.Event): void {
        // let msg: MessageStruct = <MessageStruct>event.data;
        // let datastr = msg.getDataStr();
        // let jd = JSON.parse(datastr);
        // console.log(""+jd);
        // if (jd ["ret"] == "1") {
            
        // }else{//失败则提示失败原因
        //     KFControllerMgr.showTips(jd["info"]["desc"]);
        //     return;
        // }
        egret.log("首次叫骰设置");
    }
//防沉迷消息
    private on1020_event(event: egret.Event): void {
        egret.log("这里还缺...防沉迷");
        let msg: MessageStruct = <MessageStruct>event.data;
        let datastr = msg.getDataStr();
        let jd = JSON.parse(datastr);
        console.log(""+jd);
        if (jd ["ret"] == "1") {
            
        }else{//失败则提示失败原因
            KFControllerMgr.showTips(jd["info"]["desc"]);
            return;
        }

    }
    

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        // this.mPanel.hide();
        let title = LocalizationMgr.getText("确定退出房间?");
        if (GlobalClass.DiceGameClass.opponentIsReady == "1" && GlobalClass.DiceGameClass.ownerIsReady == "1")
        {
            title = LocalizationMgr.getText("中途退出游戏，将被扣除分数：") + GlobalClass.DiceGameClass.RoomScore;
        }
        let func = ()=>{
            let js = JSON.stringify({rid:GlobalClass.DiceGameClass.RoomNum,userid:GlobalClass.UserInfo.str_UserID});
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.EXIT_SEND,js);  
        }
        KFControllerMgr.showTips(title,0,2,func);
    }

    private GotoLoginWin()
        {
            GlobalClass.DiceGameClass.firstHandTag = false;
            GlobalClass.DiceGameClass.allIn = false;

            if(GlobalClass.HallClass.fangChenMiEnabled == 0) 
            {
                if(KFSceneManager.getInstance().getRuningSceneName() == SceneName[SceneName.DHS])
                {
                    this.mPanel.hide();
                }
                else
                {
                    this.mPanel.hide();
                    KFSceneManager.getInstance().replaceScene(SceneName.DHS);
                }
            }
            else if(GlobalClass.HallClass.fangChenMiEnabled == 1)
            {
                KFSceneManager.getInstance().replaceScene(SceneName.Hall);
            }
        }

    private AddPointBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏充值");
        KFControllerMgr.getCtl(PanelName.PropshopPanel).show();
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.show_shop,"4","1");
    }

    private HelpBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏帮助");
        KFControllerMgr.getCtl(PanelName.DHTHelpPanel).InitAndShow("游戏规则","(1)开始游戏时，各参加者需要摇骰，然后自己看骰盅里面的骰子，不让其他人看到。\r\n\r\n(2)由房主先喊出“X个Y”。下一位参加者喊出新的骰子数目和点数，X必须大于或等于上一次叫喊的，但如果X与上一位的相同的话，Y的点数必须大于上一位；如果X大于上一位的，Y的点数无须大于上一位。\r\n\r\n(3)每一位玩家叫喊新的骰子数目和点数，直至有玩家开骰上一位叫骰者，清点所有玩家叫喊过的“Y点”的骰子。如果Y点骰子数目等于或大于上一位玩家叫喊过的X，即开骰玩家输，反之则赢，结算游戏点数后，游戏重新开始。\r\n\r\n(4)一点不可以代替其他点数。\r\n\r\n(5)每局对战点数只能由房主修改，至少为50000点数。\r\n\r\n(6)玩家身上必须保留50000保底点数。");
    }

    private SetingBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏设置");
        KFControllerMgr.getCtl(PanelName.DHTSettingPanel).show();
    }

    /// <summary>
    /// 准备开始游戏
    /// </summary>
    private bReadyBtnEnabled = true;
    private ReadyBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏准备");
        if (this.bReadyBtnEnabled)
        {
            this.bReadyBtnEnabled = false;
            this.switchBtn(this.mPanel.Btn_Ready , false);
            egret.setTimeout(()=>{
                this.bReadyBtnEnabled = true;
                this.switchBtn(this.mPanel.Btn_Ready , true);
            },this,0.5)

            if (this.guidStep == 2)
            {
                this.NewBieSkipHandler();
            }

            if (!this.CheckCanReady() || GlobalClass.DiceGameClass.isRunning)
            {
                return;
            }

            let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "id":GlobalClass.UserInfo.str_UserID, "isReady":this.bReadyGame?"0":"1"});
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.READY_SEND,js);  

        }
    }

    /// <summary>
    /// 自动游戏
    /// </summary>
    private AutoBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏托管");
        if (!this.bAutoGame)
        {
            let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "id":GlobalClass.UserInfo.str_UserID, "auto":"1"});
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.DEPOSIT_SEND,js);  
        }
        else
        {
            let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "id":GlobalClass.UserInfo.str_UserID, "auto":"0"});
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.DEPOSIT_SEND,js);  ;
        }
    }

    /// <summary>
    /// 游戏开杀
    /// </summary>
    private OpenBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏开骰");
        this.switchBtn(this.mPanel.Btn_Open , false);
        this.HidePlayerPoint(true);
        this.HidePlayerPoint(false);

        this.PlayOpenSound();

        //开色
        let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "id":GlobalClass.UserInfo.str_UserID});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.OPENDICE_SEND,js);
        
    }

    private CopyRoomNameLB(event:egret.TouchEvent):void{
        console.log("大话骰游戏房间名");
        DeviceUtils.setClipboard(this.mPanel.Label_RoomName.text);
        KFControllerMgr.showTips(LocalizationMgr.getText("房间名复制成功"));
    }

    private CopyRoomNumLB(event:egret.TouchEvent):void{
        console.log("大话骰游戏房间号");
        DeviceUtils.setClipboard(this.mPanel.Label_RoomCode.text);        
        KFControllerMgr.showTips(LocalizationMgr.getText("房间号复制成功"));
    }

    /// <summary>
    /// 设置起手叫骰
    /// </summary>
    private FirstCallDiceBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏首次叫骰");
        if (!GlobalClass.DiceGameClass.isRunning)
        {
            GlobalClass.DiceGameClass.firstHandTag = true;
            this.isFirstSetCallDiceBtn = true;
            KFControllerMgr.getCtl(PanelName.CallDicePanel).FirstCallDiceShow();
        }
    }
    /// <summary>
    /// 取消起手叫骰
    /// </summary>
    private CloseFirstCallDiceBtn()
    {
        GlobalClass.DiceGameClass.firstHandTag = false;
        this.mPanel.Group_CallDicePiont.visible = false;
        this.mPanel.Btn_FirstCallDice.label = LocalizationMgr.getText("首次叫骰");
        let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "userid": GlobalClass.UserInfo.str_UserID, "bid":"-1"});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.Msg424,js);  
    }

    private InviteFriendBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏邀请");
        KFControllerMgr.getCtl(PanelName.InviteFriendsPanel).show();        
    }

    private LogBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏记录");
        KFControllerMgr.getCtl(PanelName.RoomLogPanel).show();
    }

    private BankBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏银行");
        KFControllerMgr.getCtl(PanelName.BankPanel).show();
    }

    private ClubBtn(event:egret.TouchEvent):void{
        console.log("大话骰游戏工会");
        if (Number(GlobalClass.ClubClass.str_ClubMsgRet) <= 0)
        {
            KFControllerMgr.showTips("请先加入公会",0,2,()=>{
                KFControllerMgr.getCtl(PanelName.ClubPanel).show();
            });
            return;
        }
        KFControllerMgr.getCtl(PanelName.ClubDolePanel).show();
    }

    /// <summary>
    /// 隐藏玩家所出点数
    /// </summary>
    public HidePlayerPoint(type:boolean)
    {
        if(type){
            //自己点数隐藏
            this.mPanel.Group_OwnerCount.visible = false;
        }else{
            //对手点数隐藏
            this.mPanel.Group_OpponentCount.visible = false;
        }
    }

    /// <summary>
    /// 得到房主可用点数
    /// </summary>
    /// <returns></returns>
    public static GetOwnerUsedPoint()
    {
        let temp = Number(GlobalClass.DiceGameClass.ownerPoint) - Number(GlobalClass.DiceGameClass.GuaranteePoint);
        if (temp > 0)
            return temp;
        else
            return 0;
    }

    /// <summary>
    /// 得到挑战者可用点数
    /// </summary>
    /// <returns></returns>
    public static GetOpponentUsedPoint()
    {
        let temp = Number(GlobalClass.DiceGameClass.opponentPoint) - Number(GlobalClass.DiceGameClass.GuaranteePoint);
        if (temp > 0)
            return temp;
        else
            return 0;
    }

    /// <summary>
    /// 显示或隐藏托管按钮
    /// </summary>
    /// <param name="bShow"></param>
    private ShowOrHideAutoBtn(bShow)
    {
        
        if(bShow == false) return;

        if(!GlobalClass.DiceGameClass.isRoomOwner)  this.mPanel.Btn_GameAuto.visible = bShow;
    }

    /// <summary>
    /// 显示或隐藏准备按钮
    /// </summary>
    /// <param name="bShow"></param>
    private ShowOrHideReadyBtn(bShow)
    {
        this.mPanel.Btn_Ready.visible = bShow;
    }

    
    /// <summary>
    /// 显示或隐藏房主的色字
    /// </summary>
    /// <param name="bShow"></param>
    private ShowOrHideOwnerResultDices( bShow)
    {
        if (!bShow)
        {
            this.ResetDicePos();
        }
        this.mPanel.Group_OwnerDice.visible = bShow;
    }

    /// <summary>
    /// 显示或隐藏挑战者色字
    /// </summary>
    /// <param name="bShow"></param>
    private ShowOrHideOpponentResultDices( bShow)
    {
        this.mPanel.Group_OpponentDice.visible = bShow;
    }

    /// <summary>
    /// 还原房子中间的色子回蛊中
    /// </summary>WW
    private ResetDicePos()
    {
        //还原房主色子
        for (let i = 0; i < 5; i++)
        {
            let dice = this.mPanel.mDices[i];
            dice.scaleX = dice.scaleY = dice.startScale;
            dice.x = dice.startX;
            dice.y = dice.startY;
        }

        //还原对手色子
        for (let i = 0; i < 5; i++)
        {
            let dice = this.mPanel.oDices[i];
            dice.scaleX = dice.scaleY = dice.startScale;
            dice.x = dice.startX;
            dice.y = dice.startY;
        }
    }

    /// <summary>
    /// 显示或隐藏开按钮
    /// </summary>
    /// <param name="bShow"></param>
    private ShowOrHideOpenBtn( bShow)
    {
        this.mPanel.Btn_Open.visible = bShow;
        if (bShow)
        {
            this.enableBut(this.mPanel.Btn_Open);
        }
    }

    /// <summary>
    /// 显示赢信息
    /// </summary>
    public ShowWinInfo(info)
    {
        this.mPanel.WinLostArmature.display.visible = true;
        this.mPanel.WinLostArmature.animation.gotoAndPlay(skeletonType[skeletonType.DHT_YouWin]);
        this.mPanel.Label_WinLost.visible = true;
        this.mPanel.Label_WinLost.text = info;
        // uiInfo.Win.GetComponent<UIPlaySound>().Play();
    }

    /// <summary>
    /// 隐藏赢信息
    /// </summary>
    public HideWinInfo()
    {
        this.mPanel.WinLostArmature.display.visible = false;
        this.mPanel.Label_WinLost.visible = false;
    }

    /// <summary>
    /// 显示输的信息
    /// </summary>
    public ShowLostInfo( info)
    {
        this.mPanel.WinLostArmature.display.visible = true;
        this.mPanel.WinLostArmature.animation.play(skeletonType[skeletonType.DHT_youlose],1);
        this.mPanel.Label_WinLost.visible = true;
        this.mPanel.Label_WinLost.text = info;
        // uiInfo.Win.GetComponent<UIPlaySound>().Play();
    }

    /// <summary>
    /// 隐藏输信息
    /// </summary>
    public HideLostInfo()
    {
        this.mPanel.WinLostArmature.display.visible = false;
        this.mPanel.Label_WinLost.visible = false;
    }

    /// <summary>
    /// 显示或隐藏玩家名字
    /// </summary>
    /// <param name="name"></param>
    /// <param name="usablePoint"></param>
    /// <param name="bEnabled"></param>
    public ShowOrHideOwnerPlayerName(name, iconName, usablePoint, bEnabled: boolean = true)
    {
        this.mPanel.Group_PlayerOwner.visible = bEnabled;
        this.mPanel.Label_SelfName.text = name;
        this.mPanel.Image_Self.source = RES.getRes(iconName);
        //设置可用点数
        this.mPanel.Label_SelfCoin.text = usablePoint;

    }

    /// <summary>
    /// 显示或隐藏对手玩家名字
    /// </summary>
    /// <param name="name"></param>
    /// <param name="bEnabled"></param>
    public ShowOrHideOpponentPlayerName(name, iconName, usablePoint, bEnabled: boolean = true)
    {
        this.mPanel.Group_PlayerOpposite.visible = bEnabled;
        this.mPanel.Label_OpponentName.text = name;
        this.mPanel.Image_Opponent.source = RES.getRes(iconName);
        //设置可用点数
        this.mPanel.Label_OpponentCoin.text = usablePoint;

    }

    /// <summary>
    /// 设置对局点数
    /// </summary>
    /// <param name="roomPoints"></param>
    public SetRoomPoints(roomPoints)
    {
        this.mPanel.Label_InputRoomPoints.text = roomPoints;
        
        if (GlobalClass.DiceGameClass.gameMode == "1")
        {
            this.ShowOrHideAllInTip(GlobalClass.DiceGameClass.allIn);
        }
        else if(GlobalClass.DiceGameClass.gameMode == "2")
        {
            this.ShowOrHideAllInTip(true);
        }   
    }

    /// <summary>
    /// 显示或隐藏ALLIN提示
    /// </summary>
    /// <param name="isShow"></param>
    private ShowOrHideAllInTip(isShow)
    {
        egret.log("这里还缺...");
        // if (isShow)
        // {
        //     if (GlobalClass.DiceGameClass.isRoomOwner)
        //     {
        //         if (GlobalClass.DiceGameClass.opponentIsJoin)
        //         {
        //             uiInfo.AllIn_Label.text = "";
        //         }
        //         else
        //         {
        //             uiInfo.AllIn_Label.text = "";
        //         }
        //     }
        //     else
        //     {
        //         uiInfo.AllIn_Label.text = "";
        //     }
            
        // }
        // uiInfo.AllIn_Label.Content.SetActive(isShow);
    }

    /// <summary>
    /// 设置修改按钮的可用性
    /// </summary>
    /// <param name="enable"></param>
    private SetModiftBtnEnable(enable)
    {
        if (GlobalClass.DiceGameClass.gameMode == "1")
        {
            this.mPanel.Btn_Seting.visible = enable;
        }
        else if(GlobalClass.DiceGameClass.gameMode == "2")
        {
            this.mPanel.Btn_Seting.visible = false;
        }
    }

    /// <summary>
    /// 显示房间密码
    /// </summary>
    /// <param name="code"></param>
    /// <param name="showOrHide"></param>
    private SetRoomCode(code, showOrHide)
    {
        this.mPanel.Label_RoomCode.visible = showOrHide;
        this.mPanel.Label_RoomName.visible = showOrHide;

        if (showOrHide)
        {
            this.mPanel.Label_RoomCode.text = code;
            this.SetRoomName(GlobalClass.DiceGameClass.RoomName);
        }
    }

    /// <summary>
    /// 设置房间名字
    /// </summary>
    /// <param name="roomName"></param>
    public SetRoomName(roomName)
    {
        this.mPanel.Label_RoomName.text = roomName;
    }

    /// <summary>
    /// 设置手起叫骰状态
    /// </summary>
    /// <param name="active"></param>
    public SetFirstDiceStatue(active)
    {
        GlobalClass.DiceGameClass.firstHandTag = active;
    }

    /// <summary>
    /// 设置房间的对局点数为ALLIN
    /// </summary>
    private SetRoomPointALLIN()
    {
        let roomPoint = Math.min(Number(GlobalClass.DiceGameClass.ownerPoint) - Number(GlobalClass.DiceGameClass.GuaranteePoint),
        Number(GlobalClass.DiceGameClass.opponentPoint) - Number(GlobalClass.DiceGameClass.GuaranteePoint));
        if (this.CheckTransPointEnabled(roomPoint))
        {
            let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "id":GlobalClass.UserInfo.str_UserID, "newP":roomPoint});
            WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.MODIFYROOMSCORE_SEND,js);  
        }
    }

    /// <summary>
    /// 检查设置对局点数的合法性
    /// </summary>
    /// <returns></returns>
    private CheckTransPointEnabled(result)
    {
        let usedOwnerPoint = DHTGamePanelController.GetOwnerUsedPoint();
        let usedOpponentPoint = DHTGamePanelController.GetOpponentUsedPoint();

        if (result < GlobalClass.DiceGameClass.GuaranteePoint)
        {
            KFControllerMgr.showTips("设置点数不能小于50000，请检查！")
            return false;
        }

        if (result > Math.min(usedOwnerPoint, usedOpponentPoint))
        {
            KFControllerMgr.showTips("设置点数不能大于房主或挑战者可用点数，请检查！");
            return false;
        }

        if (usedOwnerPoint < Number(GlobalClass.DiceGameClass.GuaranteePoint))
        {
            KFControllerMgr.showTips("房主可用点数不足，请检查！");
            return false;
        }

        if (GlobalClass.DiceGameClass.opponentIsJoin)
        {
            if (usedOpponentPoint < Number(GlobalClass.DiceGameClass.GuaranteePoint))
            {
                KFControllerMgr.showTips("挑战者可用点数不足，请检查！");
                return false;
            }
        }

        return true;
    }

    //新手引导
    /// <summary>
    /// 下一步引导
    /// </summary>
    /// <param name="obj"></param>
    private guidStep;
    public OnClickNextGuid()
    {
        this.guidStep++;
        this.Setp(this.guidStep);
    }

    private Setp(guidStep)
    {
        if (guidStep == 1)
        {
            // Guid_1();
        }
        else if (guidStep == 2)
        {
            // Guid_2();
        }
        else if (guidStep == 3)
        {
            // NewBieSkipHandler(null);
        }
    }

    ///// <summary>
    ///// 跳过新手引导
    ///// </summary>
    public NewBieSkipHandler()
    {
        egret.log("这里还缺...");
        // PlayerPrefs.SetString("Panel_Main", guidStep.ToString());
        // uiInfo.NewGuide.SetActive(false);
    }

    
    /// <summary>
    /// 判断能否准备能否
    /// </summary>
    /// <returns></returns>
    private CheckCanReady()
    {
        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            let usedOwnerPoint = DHTGamePanelController.GetOwnerUsedPoint();
            egret.log("GuaranteePoint: " + GlobalClass.DiceGameClass.GuaranteePoint + " RoomScore:" + GlobalClass.DiceGameClass.RoomScore);
            if (usedOwnerPoint < Math.max(Number(GlobalClass.DiceGameClass.GuaranteePoint),Number(GlobalClass.DiceGameClass.RoomScore)))
            {
                KFControllerMgr.showTips("房主可用点数不足，请检查！");
                return false;
            }

        }
        else
        {
            let usedOpponentPoint = DHTGamePanelController.GetOpponentUsedPoint();
            if (usedOpponentPoint < Math.max(Number(GlobalClass.DiceGameClass.GuaranteePoint),Number(GlobalClass.DiceGameClass.RoomScore)))
            {
                KFControllerMgr.showTips("挑战者可用点数不足，请检查！");
                return false;
            }
        }
        return true;
    }

    /// <summary>
    /// 设置按钮状态
    /// </summary>
    /// <param name="target"></param>
    /// <param name="spriteName"></param>
    private ChangeBtnTexture(target, spriteName)
    {
        target.source = RES.getRes(spriteName);
        if(spriteName == "unauto"){
            target.label = LocalizationMgr.getText("取消托管");
        }else{
            target.label = LocalizationMgr.getText("托管");
        }

    }

    /// <summary>
    /// 设置托管按钮状态
    /// </summary>
    /// <param name="ownerAuto"></param>
    /// <param name="opponentAuto"></param>
    /// <param name="isOwner"></param>
    private SetAutoBtnStatue(ownerAuto, opponentAuto, isOwner)
    {
        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            if (isOwner == "1")
            {
                if (ownerAuto == "1")
                {
                    this.bAutoGame = true;
                    this.ChangeBtnTexture(this.mPanel.Btn_GameAuto,"unauto");
                }
                else
                {
                    this.bAutoGame = false;
                    this.ChangeBtnTexture(this.mPanel.Btn_GameAuto,"auto");
                }
            }
        }
        else
        {
            if (isOwner == "0")
            {
                if (opponentAuto == "1")
                {
                    this.bAutoGame = true;
                    //SetBtnState(uiInfo.AutoBtn, "取消自动游戏",false);
                    this.ChangeBtnTexture(this.mPanel.Btn_GameAuto, "unauto");
                }
                else
                {
                    this.bAutoGame = false;
                    //SetBtnState(uiInfo.AutoBtn, "自动游戏",false);
                    this.ChangeBtnTexture(this.mPanel.Btn_GameAuto, "auto");
                }
            }
        }
    }
    
    /// <summary>
    /// 设置修改按钮状态
    /// </summary>
    private SetModifyBtnStatue()
    {
        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            if (GlobalClass.DiceGameClass.ownerIsReady == "1" || GlobalClass.DiceGameClass.opponentIsReady == "1" || !GlobalClass.DiceGameClass.opponentIsJoin)
            {
                this.SetModiftBtnEnable(false);
                this.mPanel.dispatchEvent(new egret.Event("",false,false,false));
            }
            else
            {
                this.SetModiftBtnEnable(true);
                this.mPanel.dispatchEvent(new egret.Event("",false,false,true));
            }
        }
        else
        {
            this.SetModiftBtnEnable(false);
            this.mPanel.dispatchEvent(new egret.Event("",false,false,false));
        }
    }

    /// <summary>
    /// 设置摇色摇出的点数
    ///  
    /// </summary>
    private SetSakeDicePoint(points, type)
    {
        let go = type?this.mPanel.mDices:this.mPanel.oDices;
        for (let i = 0; i < 5; i++)
        {
            let dice:eui.Image = go[i];
            dice.source = RES.getRes("DiceNum_"+points[i]);
            dice.name = points[i];
        }

    }

    /// <summary>
    /// 显示玩家所出点数
    /// </summary>
    /// <param name="diceNum"></param>
    /// <param name="dicePoint"></param>
    /// <param name="type"></param>
    public ShowPlayerPoint(diceNum, dicePoint, type)
    {
        if (diceNum == "1" && dicePoint == "1")
        {
            //  egret.log("diceNum: "+diceNum+" dicePoint:"+dicePoint);
            return;
        }

        if(type){
            this.mPanel.Group_OwnerCount.visible = true;
            this.mPanel.Label_OwnerCount.text = diceNum+" "+LocalizationMgr.getText("个");
            this.mPanel.Image_OwnerCount.source = RES.getRes("dices_tex_" + dicePoint);
        }else{
            this.mPanel.Group_OpponentCount.visible = true;
            this.mPanel.Label_OpponentCount.text = diceNum+" "+LocalizationMgr.getText("个");
            this.mPanel.Image_OpponentCount.source = RES.getRes("dices_tex_" + dicePoint);
        }

    }

    private ShowOrHideTimer(type, enable, time = 30)
    {
        if (type)
        {

            if (enable)
            {
                this.WaitForTime(time, null, this.mPanel.Group_PlayerOwner.x-110, this.mPanel.Group_PlayerOwner.y-130);
            }
            else
            {
                this.TimeHide();
            }
        }
        else
        {
            if (enable)
            {
                this.WaitForTime(time, null, this.mPanel.Group_PlayerOpposite.x+290, this.mPanel.Group_PlayerOpposite.y);
            }
            else
            {
                this.TimeHide();
            }
        }
    }

    
    /// <summary>
    /// 设置起手叫骰成功
    /// </summary>
    /// <param name="tips"></param>
    public ShowFirstDiceTips(tips)
    {
        let cBid = tips;
        let cPoint = cBid % 10;
        let cPointCount = Math.floor(cBid / 10);

        let target = this.mPanel.Group_CallDicePiont;
        this.mPanel.Label_CallDicePiont.text = cPointCount.toString()+LocalizationMgr.getText("个");
        this.mPanel.Image_CallDicePiont.source = RES.getRes("DiceNum_" + cPoint);
        target.visible=(true);

        this.mPanel.Btn_FirstCallDice.label = "";
       
        let result = this.GetFirstHandPoint();
        egret.log("起手叫骰 calldice_send：" + result);
        let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "userid":GlobalClass.UserInfo.str_UserID, "bid":result});
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.Msg424,js);
    }

    /// <summary>
    /// 得到起手叫骰点数
    /// </summary>
    private GetFirstHandPoint()
    {
        // let cPointCount = this.mPanel.Label_CallDicePiont.text;
        // let spriteName = this.mPanel.Image_CallDicePiont.source.toString();
        // let cPoint = spriteName[spriteName.length - 1];

        // return cPointCount + cPoint;
        return KFControllerMgr.getCtl(PanelName.CallDicePanel).GetFirstHandPoint();
    }
    
    private SetIsReadyTitleStatue()
    {
        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            if (GlobalClass.DiceGameClass.opponentIsReady == "1")
            {
                this.ShowOrHideIsReadyTitle(true);
            }
            else if(GlobalClass.DiceGameClass.opponentIsReady == "0")
            {
                this.ShowOrHideIsReadyTitle(false);
            }
        }
        else
        {
            if (GlobalClass.DiceGameClass.ownerIsReady == "1")
            {
                this.ShowOrHideIsReadyTitle(true);
            }
            else if (GlobalClass.DiceGameClass.ownerIsReady == "0")
            {
                this.ShowOrHideIsReadyTitle(false);
            }
            
        } 
        
        //双方都已经准备好
        if (GlobalClass.DiceGameClass.ownerIsReady == "1" && GlobalClass.DiceGameClass.opponentIsReady == "1")
        {
            this.ShowOrHideIsReadyTitle(false);
        }
    }

    /// <summary>
    /// 显示对方是否准备好标签
    /// </summary>
    /// <param name="bShow"></param>
    private ShowOrHideIsReadyTitle(bShow, title = "已准备")
    {
        this.mPanel.Label_IsReady.text = LocalizationMgr.getText(title);
        this.mPanel.Label_IsReady.visible=(bShow);
    }

    private SetGameModel()
    {
        if (GlobalClass.DiceGameClass.gameMode == "1")
        {
            this.mPanel.Label_GameModel.text = LocalizationMgr.getText("传统模式");
        }
        else if (GlobalClass.DiceGameClass.gameMode == "2")
        {
            this.mPanel.Label_GameModel.text = LocalizationMgr.getText("传统模式");
        }
        else if (GlobalClass.DiceGameClass.gameMode == "3")
        {
            this.mPanel.Label_GameModel.text = LocalizationMgr.getText("经典大话骰");
        }
    }

    private SetSettingBtnEnable(enable)
    {
        this.mPanel.Btn_Seting.visible = enable;
    }

    /// <summary>
    /// 得到挑战者可用点数
    /// </summary>
    /// <returns></returns>
    public GetOpponentUsedPoint()
    {
        let temp = Number(GlobalClass.DiceGameClass.opponentPoint) - Number(GlobalClass.DiceGameClass.GuaranteePoint);
        if (temp > 0)
            return temp;
        else
            return 0;
    }

    private mCount = 60;
    private mInterval = 1;
    private mTimeFinishCallback;
    private timekey;

    public TimeHide(){
        this.mPanel.Group_Time.visible = false;
        egret.clearTimeout(this.timekey);
    }
    
    public WaitForTime(timeLength = 60, finishedCallback = null, posX = 0, posY = 0,title="")
    {
        this.mPanel.Group_Time.visible = true;
        this.mPanel.Label_TimeTitle.text = title;
        this.mPanel.Group_Time.x = posX;
        this.mPanel.Group_Time.y = posY;
        this.mCount = timeLength;
        this.mInterval = 1;
        this.mTimeFinishCallback = finishedCallback;
        this.SetLabelAndRodio(timeLength, 1);
        this.timekey=egret.setTimeout(()=>  {this.TimerCallBack()},this,1000);
    }

    private SetLabelAndRodio(label, fillAmount)
    {
        this.mPanel.Label_Time.text = label;
        // uiInfo.Ratio.sprite.fillAmount = fillAmount;
    }

    private TimerCallBack()
    {
        let rodio = this.mInterval/this.mCount;
        let num = this.mCount - this.mInterval;

        if (num == 0)
        {
            if (this.mTimeFinishCallback != null) this.mTimeFinishCallback();
            this.TimeHide();
        }
        this.SetLabelAndRodio(num, 1 - rodio);
        if (num == 3 || num == 2 || num == 1)
        {
            // this.RunAnimation();
        }
        this.mInterval++;

        if(num>=0){
            this.timekey=egret.setTimeout(this.TimerCallBack,this,1000);
        }

    }

    private CanStartGame()
    {
        if (GlobalClass.DiceGameClass.ownerIsReady == "1" && GlobalClass.DiceGameClass.opponentIsReady == "1")
            return true;
        else
            return false;
    }

    private StartGame()
    {
        egret.log("StartGame...");

        this.Starting();
    }

    private Starting()
    {
        GlobalClass.DiceGameClass.isRunning = true;
        this.firstCallDice = true;

        this.switchBtn(this.mPanel.Btn_Bank , false);
        this.switchBtn(this.mPanel.Btn_ClubDole , false);
        this.switchBtn(this.mPanel.Btn_FirstCallDice , false);
        
        //开始摇色动画
        this.ShakeDiceAnimation();
    }
    
    /// <summary>
    /// 双方摇色动画
    /// </summary>
    public ShakeDiceAnimation()
    {
        if (GlobalClass.DiceGameClass.isQuickGame) //取消游戏动画
        {
            this.mPanel.selfArmature.animation.gotoAndStopByFrame(skeletonType[skeletonType.Dice_Self_Look_1], 16);
            this.oCanBid = "1";
            this.cCanBid = "0";
            this.SakeDiceAnimationCallBack(null);
        }
        else
        {
            let ownerTransform = this.mPanel.selfArmature;
            if (ownerTransform != null)
            {
                this.RunSpriteAnimation(ownerTransform, 20, false, skeletonType[skeletonType.Dice_Self_shake], ()=>{this.RunSpriteAnimation(ownerTransform, 20, false, skeletonType[skeletonType.Dice_Self_Look_1])});
                // ownerTransform.GetComponent<UIPlaySound>().Play();
            }

            let opponentTransform = this.mPanel.opponentArmature;
            if (opponentTransform != null)
            {
                this.RunSpriteAnimation(opponentTransform, 20, false, skeletonType[skeletonType.Dice_Opponent_Shake], ()=>{this.SakeDiceAnimationCallBack(null)});
                //opponentTransform.GetComponent<UIPlaySound>().Play();
            }
        }
    }

    /// <summary>
    /// 对方开色动画
    /// </summary>
    private OpponentOpenDiceAnimation()
    {
        let opponentTransform = this.mPanel.opponentArmature;
        if (opponentTransform != null)
        {
            if (GlobalClass.DiceGameClass.isQuickGame)
            {
                opponentTransform.animation.gotoAndStopByFrame(skeletonType[skeletonType.Dice_Opponent_Open],13);
                this.OpponentOpenDiceAnimationCallBack(null);
            }
            else
            {
                // opponentTransform.GetComponent<UIPlaySound>().Play();
                let func = ()=>{
                    this.OpponentOpenDiceAnimationCallBack(null);
                    opponentTransform.removeEventListener(dragonBones.Event.LOOP_COMPLETE,func,this);
                }
                opponentTransform.addEventListener(dragonBones.Event.LOOP_COMPLETE,func,this);                
                opponentTransform.animation.play(skeletonType[skeletonType.Dice_Opponent_Open],1);
            }
        }
    }

    /// <summary>
    /// 关键帧动画
    /// </summary>
    /// <param name="go">对象</param>
    /// <param name="fps">帧速</param>
    /// <param name="loop">是否循环</param>
    /// <param name="namePrefix">前缀名称</param>
    /// <param name="argCallback">回调</param>
    private RunSpriteAnimation(go:dragonBones.Armature, fps =20, loop = false, namePrefix = "",
        argCallback = null)
    {
        if(argCallback){
            let func = ()=>{
                argCallback(null);
                go.removeEventListener(dragonBones.Event.LOOP_COMPLETE,func,this);
            }
            go.addEventListener(dragonBones.Event.LOOP_COMPLETE,func,this);
        }
        go.animation.play(namePrefix,loop?0:1);
    }

    /// <summary>
    /// 摇色结束，回调函数
    /// </summary>
    /// <param name="go"></param>
    private SakeDiceAnimationCallBack(go)
    {
        egret.log("++++++++++++++++++++++SakeDiceAnimationCallBack, cCanBid: " + this.cCanBid + " oCanBid: " + this.oCanBid + " isRoomOwner: " + GlobalClass.DiceGameClass.isRoomOwner + " ownerPlayerDeposit: " + GlobalClass.DiceGameClass.ownerPlayerDeposit + " firstCallDice: "+this.firstCallDice);
        this.ShowOrHideOwnerResultDices(true);
        this.ShowOrHideReadyBtn(false);
        
        if (GlobalClass.DiceGameClass.isRoomOwner && this.oCanBid == "1") 
        {
            if (GlobalClass.DiceGameClass.firstHandTag && this.firstCallDice) 
            {
                if (GlobalClass.DiceGameClass.ownerPlayerDeposit == "0") //未设置托管
                {
                    this.firstCallDice = false;
                    let result = this.GetFirstHandPoint();
                    egret.log("起手叫骰 calldice_send：" + result);
                    let js = JSON.stringify({"rid":GlobalClass.DiceGameClass.RoomNum, "id":GlobalClass.UserInfo.str_UserID, "bid":result});
                    WebSocketMgr.getInstance().SendOneceMsg(MsgID.DiceGame.CALLDICE_SEND,js);

                }
                else //设置了托管
                {
                }
            }
            else
            {
                if (GlobalClass.DiceGameClass.ownerPlayerDeposit == "0")
                {
                    KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(2, false);
                }
                else
                {
                    KFControllerMgr.getCtl(PanelName.CallDicePanel).hide();
                }
            }

            this.ShowOrHideTimer(false, false);
            this.ShowOrHideTimer(true, true, Number(GlobalClass.DiceGameClass.waitTime));
        }
        else
        {
            this.ShowOrHideTimer(true, false);
            this.ShowOrHideTimer(false, true, Number(GlobalClass.DiceGameClass.waitTime));
        }
    }

    /// <summary>
    /// 开色动画结束，回调函数
    /// </summary>
    /// <param name="go"></param>
    private OpponentOpenDiceAnimationCallBack(go)
    {
        this.ShowOrHideOpponentResultDices(true);

        let ownerPoint;
        let opponentPoint;
        let indexOwner = 0;
        let indexOpponent = 0;
        let resultTargetDice = null;

        ownerPoint = GlobalClass.DiceGameClass.ownerPlayerCallDiceNumber;
        opponentPoint = GlobalClass.DiceGameClass.opponentPlayerCallDiceNumber;
        if (GlobalClass.DiceGameClass.openDiceIsOwner) //房主开色
            resultTargetDice = opponentPoint;
        else
            resultTargetDice = ownerPoint;

        let resulTransform = this.mPanel.mDices;
        for (let i = 0; i < 5; i++)
        {
            let dice:eui.Image = resulTransform[i];
            if (dice.name == resultTargetDice)
            {
                this.MoveDiceToCenter(dice, {x:285 + indexOwner * 42, y:55}, {scaleX:dice.scaleX*2,scaleY:dice.scaleY*2});
                indexOwner++;
            }
        }

        let resulOpponentTransform = this.mPanel.oDices;
        for (let i = 0; i < 5; i++)
        {
            let dice:eui.Image = resulOpponentTransform[i];
            if (dice.name == resultTargetDice)
            {
                this.MoveDiceToCenter(dice, {x:-295 + indexOpponent * 42, y:11}, {scaleX:dice.scaleX*2,scaleY:dice.scaleY*2});
                indexOpponent++;
            }
        }

        if (GlobalClass.DiceGameClass.isQuickGame)
        {
            this.ShowWinOrLoseScore(null);
        }
        else
        {
            egret.setTimeout(()=>(this.ShowWinOrLoseScore(null)),this,1500)
        }
    }
    
    /// <summary>
    /// 缓动色字对象到桌子中间
    /// </summary>
    /// <param name="go"></param>
    /// <param name="position"></param>
    /// <param name="scale"></param>
    private MoveDiceToCenter(go:eui.Image, position, scale)
    {
        if (GlobalClass.DiceGameClass.isQuickGame)
        {
            go.x = position.x;
            go.y = position.y;
            go.scaleX = scale.scaleX;
            go.scaleY = scale.scaleY;
        }
        else
        {
            //tween position
            egret.Tween.get( go ).to( position, 1000, egret.Ease.sineOut );

            //tween scale
            egret.Tween.get( go ).to( scale, 1000, egret.Ease.sineOut );
        }
    }
    
    /// <summary>
    /// 显示输赢点数
    /// </summary>
    private ShowWinOrLoseScore(arg)
    {
        KFControllerMgr.getCtl(PanelName.CallDicePanel).hide();

        if (GlobalClass.DiceGameClass.isWinner) //赢方
        {
            this.ShowWinInfo("+" + GlobalClass.DiceGameClass.Prize);

        }
        else
        {

            this.ShowLostInfo("-" + GlobalClass.DiceGameClass.Prize);
        }


        if (GlobalClass.DiceGameClass.isRoomOwner)
        {
            GlobalClass.UserInfo.str_Hall_totalScore = GlobalClass.DiceGameClass.ownerPoint;
        }
        else
        {
            GlobalClass.UserInfo.str_Hall_totalScore = GlobalClass.DiceGameClass.opponentPoint;
        }
        
        this.EndGame();

        egret.setTimeout(()=>(this.CSInit()),this,2500);
    }
    
    /// <summary>
    /// 一轮游戏结束
    /// </summary>
    private EndGame()
    {
        GlobalClass.DiceGameClass.isRunning = false;
        // ShowOrHideReadyBtn(true);
        this.ShowOrHideOpenBtn(false);
        this.isFirstSetCallDiceBtn = false;

        this.switchBtn(this.mPanel.Btn_Bank , true);
        this.switchBtn(this.mPanel.Btn_ClubDole , true);
        this.switchBtn(this.mPanel.Btn_FirstCallDice , true);
    }

    /// <summary>
    /// 设置轮到谁叫骰了
    /// </summary>
    /// <param name="owner"></param>
    /// <param name="opponent"></param>
    private SetWhoCanDid(owner, opponent)
    {
        GlobalClass.DiceGameClass.ownerCanBid = owner;
        GlobalClass.DiceGameClass.opponentCanBid = opponent;
    }

    
    /// <summary>
    /// 设置叫色结束后的状态，包含了房主和挑战者
    /// </summary>
    /// <param name="isOwner">是否房主刚刚叫完骰 1：房主刚刚叫完骰 0：挑战者叫完骰</param>
    /// <param name="oPointCount"></param>
    /// <param name="oPoint"></param>
    /// <param name="cPointCount"></param>
    /// <param name="cPoint"></param>
    private SetCallDiceFinishState(isOwner, oPointCount, oPoint, cPointCount, cPoint)
    {
        //egret.log("+++++++++++++++++SetCallDiceFinishState, isOwner: "+isOwner+" oPointCount: "+oPointCount+" oPoint: "+oPoint+ " cPointCount: "+cPointCount+" cPoint: "+cPoint);

        if (GlobalClass.DiceGameClass.isRoomOwner) //房主
        {
            let waitTime;
            if (isOwner == "1") //房主刚刚加完骰，轮到挑战者叫骰
            {
                // Panel_CallDice.PlaySound(oPointCount.ToString(), oPoint.ToString());

                if (GlobalClass.DiceGameClass.opponentPlayerDeposit == "1")
                {
                    waitTime = GlobalClass.DiceGameClass.autoTime;
                }
                else
                {
                    waitTime = GlobalClass.DiceGameClass.waitTime;
                }
                this.SetCallDiceFinishStatus_LeftDown(oPointCount, oPoint,waitTime);  
                KFControllerMgr.getCtl(PanelName.CallDicePanel).hide();
                this.ShowOrHideOpenBtn(false);

                //房主叫完骰，轮到挑战者叫了
                this.SetWhoCanDid(false,true);
            }
            else //挑战者刚刚叫完骰，轮到房主叫骰
            {
                // Panel_CallDice.PlaySound(cPointCount.ToString(), cPoint.ToString());

                if (GlobalClass.DiceGameClass.ownerPlayerDeposit == "1")
                {
                    waitTime = GlobalClass.DiceGameClass.autoTime;
                }
                else
                {
                    waitTime = GlobalClass.DiceGameClass.waitTime;
                }

                this.SetCallDiceFinishStatus_RightUp(cPointCount, cPoint,waitTime);   //挑战者叫色
                if (cPointCount == 10 && cPoint == 6 && !this.bAutoGame)
                {
                    egret.setTimeout( () =>
                    {
                        this.OpenBtn(null);
                    },this,1000);
                }
                else /*if(!bAutoGame)*/
                {
                    if (GlobalClass.DiceGameClass.ownerPlayerDeposit == "0")
                    {
                        if (cPoint < 6)
                        {
                            KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(cPointCount);
                        }
                        else if (cPoint == 6 && cPointCount < 10)
                        {
                            KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(cPointCount+1);
                        }
                        this.ShowOrHideOpenBtn(true);
                    }
                    else
                    {
                        KFControllerMgr.getCtl(PanelName.CallDicePanel).hide();
                    }
                }

                //挑战者叫完骰，轮到房主叫了
                this.SetWhoCanDid(true, false);
            }
        }
        else //挑战者
        {
            let waitTime;
            if (isOwner == "1")  //房主刚刚叫完骰，轮到挑战者叫骰
            {
                // Panel_CallDice.PlaySound(oPointCount.ToString(), oPoint.ToString());

                if (GlobalClass.DiceGameClass.opponentPlayerDeposit == "1")
                {
                    waitTime = GlobalClass.DiceGameClass.autoTime;
                }
                else
                {
                    waitTime = GlobalClass.DiceGameClass.waitTime;
                }
                this.SetCallDiceFinishStatus_RightUp(oPointCount, oPoint, waitTime);
                if (oPointCount == 10 && oPoint == 6 && !this.bAutoGame)
                {
                    egret.setTimeout( () =>
                    {
                        this.OpenBtn(null);
                    },this,1000);
                }
                else /*if(!bAutoGame)*/
                {
                    if (GlobalClass.DiceGameClass.opponentPlayerDeposit == "0")
                    {
                        if (oPoint < 6)
                        {
                            KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(oPointCount);
                        }
                        else if (oPoint == 6 && oPointCount < 10)
                        {
                            KFControllerMgr.getCtl(PanelName.CallDicePanel).InitAndShow(oPointCount+1);
                        }
                        this.ShowOrHideOpenBtn(true);
                    }
                    else
                    {
                        KFControllerMgr.getCtl(PanelName.CallDicePanel).hide();
                    }
                }

                //轮到挑战者叫骰
                this.SetWhoCanDid(false,true);
            }
            else  //挑战者刚刚叫完骰，轮到房主叫骰
            {
                if (GlobalClass.DiceGameClass.ownerPlayerDeposit == "1")
                {
                    waitTime = GlobalClass.DiceGameClass.autoTime;
                }
                else
                {
                    waitTime = GlobalClass.DiceGameClass.waitTime;
                }

                // Panel_CallDice.PlaySound(cPointCount.ToString(), cPoint.ToString());

                this.SetCallDiceFinishStatus_LeftDown(cPointCount, cPoint, waitTime);
                KFControllerMgr.getCtl(PanelName.CallDicePanel).hide();
                this.ShowOrHideOpenBtn(false);

                //轮到房主叫骰
                this.SetWhoCanDid(true,false);
            }
        }
    }
    
    /// <summary>
    /// 设置叫色操作完成后的显示状态，左下角
    /// </summary>
    private SetCallDiceFinishStatus_LeftDown(pointCount, point, waitForTime = 30)
    {
        //显示或隐藏所叫点数
        this.ShowPlayerPoint(pointCount, point, true);
        
        //定时器
        this.ShowOrHideTimer(true, false); //隐藏自己时间
        this.ShowOrHideTimer(false, true, waitForTime); //显示对手等待时间
    }

    /// <summary>
    /// 叫色操作，右上角
    /// </summary>
    private SetCallDiceFinishStatus_RightUp(pointCount, point, waitForTime = 30)
    {
        //显示或隐藏所叫点数
        this.ShowPlayerPoint(pointCount, point, false);
        
        //定时器
        this.ShowOrHideTimer(false, false);
        this.ShowOrHideTimer(true, true, waitForTime);
    }

    /// <summary>
    ///播放开声音 
    /// </summary>
    private PlayOpenSound()
    {
        egret.log("这里还缺...");
        // let unbelieveSndArray = ["disbelieve0", "disbelieve1", "disbelieve2", "disbelieve3"];
        // let soundPath = null;
        // let soundName = null;
        // if (GlobalClass.DiceGameClass.isRoomOwner)
        // {
        //     soundPath = "Sound/putong/man/";
        // }
        // else
        // {
        //     soundPath = "Sound/putong/wom/";
        // }

        // let index = Math.floor(Math.random()*unbelieveSndArray.length);
        // soundName = unbelieveSndArray[index];
        // SoundMgr.Instance.playEffect(soundPath+soundName);
    }
            
    /// <summary>
    /// 判断当前玩家是输还是赢
    /// </summary>
    /// <param name="winnerID"></param>
    /// <param name="lostID"></param>
    /// <returns></returns>
    private CheckWinOrLost(winnerID)
    {
        if (winnerID == GlobalClass.UserInfo.str_UserID) return true;
        else return false;
    }

    /// <summary>
    /// 得到房主可用点数
    /// </summary>
    /// <returns></returns>
    public GetOwnerUsedPoint()
    {
        let temp = Number(GlobalClass.DiceGameClass.ownerPoint) - Number(GlobalClass.DiceGameClass.GuaranteePoint);
        if (temp > 0)
            return temp;
        else
            return 0;
    }

    /// <summary>
    /// 更新可用点数
    /// </summary>
    /// <param name="position"></param>
    /// <param name="point"></param>
    public UpDateUsablePoint(position, point)
    {
        if (position == true)
        {
            this.mPanel.Label_SelfCoin.text = point;
        }
        else if (position == false)
        {
            this.mPanel.Label_OpponentCoin.text = point;
        }
    }

}