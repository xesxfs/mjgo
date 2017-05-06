/**
 * 双扣游戏界面
 * @author chenwei 
 * @date 2016/6/28
 */
class DKGameScene extends BaseScene {
    protected ctrl: DKGameController;       //游戏控制模块
    public constructor() {
        super();
        this.skinName = "DKGameSceneSkin";
    }

    private backHallBtn:eui.Button;
    private okBtn:eui.Button;
    private cancelBtn:eui.Button;    
    private handCardGroup:eui.Group;//手牌
    private showCardGroup:eui.Group;//显示出牌
    private remainGroup:eui.Group;//显示剩余牌数
    private readyGroup:eui.Group;
    private actOption:DKAct;
    private downOutCardGroup:eui.Group;

    public roomIdLab:eui.Label;
    public paiJuLab:eui.Label;
    public gameDescLab:eui.Label;


    protected childrenCreated() {

    }

    protected onEnable() {
        this.backHallBtn.addEventListener("touchTap",()=>{
            this.ctrl.sendLeftRoom(App.DataCenter.UserInfo.httpUserInfo.roomId);
            App.getInstance().sendEvent(HallController.EVENT_SHOW_HALL);
        },this);
        this.okBtn.addEventListener("touchTap",this.onReadyTouch,this);
        this.cancelBtn.addEventListener("touchTap",this.onReadyTouch,this);
        this.actOption.addEventListener("touchTap",this.onActTouch,this);
        this.checkReCon();

        // this.showHandleCard([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28])
        //egret.setTimeout(()=>{this.showHandleCard([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28])},this,6000)

        console.log("进入双扣游戏_________________________________________");
        this.setRoomIdLab();

    }
    //断线重连
    private checkReCon(){
        if(App.DataCenter.GameInfo.isReCon){
            this.ctrl.sendReNewData();
        }
    }

    public setRoomIdLab(){
        var rid=App.DataCenter.UserInfo.httpUserInfo.roomId
        if(rid){
            this.roomIdLab.text =rid.toString();
        }
    }


    /**设置玩家准备标示 */
    public setReadyFlag(pos:UserPosition,ready:boolean){
        this.readyGroup.getChildAt(pos).visible = ready;
    }
    /**显示操作面板 */
    public showActUI(bShow:boolean){
        this.actOption.visible =bShow;
    }
    /**出牌提示选择牌 */
    public toUPCards(ncards:Array<number>){
        console.log("++++++++++++++++++++",ncards);
        this.tempOutCards=[]
        for(let i=0;i<this.handCardGroup.numChildren;i++){
            var card =this.handCardGroup.getChildAt(i) as Card;
            var bFinded=false;
            for(let j=0;i<ncards.length;j++){
                var value =ncards[j];
                if(card.cardValue==value){
                    bFinded =true;
                    break;
                }
            }
            if(bFinded){
                card.toChangeStatus();
            }
            // card.toDown();            

        }      

    }

    /***清除出牌区域 */
    public cleanOutCard(pos:UserPosition){
       var outGroup= this.showCardGroup.getChildAt(pos)  as eui.Group;
       outGroup.removeChildren();
    }

    public showOkOrCancel(bOk:boolean){
        this.okBtn.visible =bOk;
        this.cancelBtn.visible =!bOk;

    }

    /***显示剩余排数 */
    public showRemainCard(pos:UserPosition,remain:number){
        if(pos==0)return;
       var remainUI= this.remainGroup.getChildAt(pos-1)  as ResidueUI
       remainUI.setRemainCard(remain);
    }
    /**自己出牌显示 */
    public mySelfOutCardOK(){
        var myoutgroup=this.showCardGroup.getChildAt(0) as eui.Group;
        myoutgroup.removeChildren();
        let i=0;
        this.tempOutCards.forEach((card)=>{
            card.setOutSkin();
            myoutgroup.addChild(card);
            card.x = i*30;
            this.onRemoveCardListen(card);
            i++;
        });
        this.tempOutCards=[];
        this.reSortHandCard();
    }
    /**其他玩家出牌显示 */
    public otherOutCardShow(pos:UserPosition,cards:Array<number>,remainCard:number){
        this.showRemainCard(pos,remainCard);
        var outgroup=this.showCardGroup.getChildAt(pos) as eui.Group;
        outgroup.removeChildren();
        let i=0;
        cards.forEach((value)=>{
            var card = CardFactory.getInstance().getOutCard(value);            
            card.x=i*30;
            outgroup.addChild(card);
            i++;
        })
    }
    /**玩家交互位置 */
    public changePlayPos(pos1:UserPosition,pos2:UserPosition){

    }
/**设置操作面板状态，false passBtn 为显示 可以过牌，true 为隐藏必须出牌 */
    public setActStatus(bStatus:boolean){
        this.actOption.passBtn.visible =!bStatus;

    }
/**返回大厅 */
    private onBackToHall(){
        var roomId =App.DataCenter.UserInfo.httpUserInfo.roomId;
        this.ctrl.sendLeftRoom(roomId)
         App.getInstance().sendEvent(HallController.EVENT_SHOW_HALL);
    }
/**准备 取消 */
    private onReadyTouch(e:egret.TouchEvent){
        switch(e.target){
            case this.okBtn:                  
                 this.showOkOrCancel(false);
                 this.setReadyFlag(UserPosition.Down,false);
                 this.ctrl.sendReady();
                break;
            case this.cancelBtn:
                this.ctrl.sendCancelReady();
                this.setReadyFlag(UserPosition.Down,true);
                this.showOkOrCancel(true);
                break;
        }

    }
    private tempOutCards:Array<Card>=[];
    private onActTouch(e:egret.TouchEvent){
        switch(e.target){
            case this.actOption.passBtn:
                this.ctrl.sendActPass();
                this.showActUI(false);
                 break;
            case this.actOption.outBtn:                 
                 this.sendOutPutCard();
                break;
            case this.actOption.tipBtn:
                this.ctrl.sendOutPutCardTip();
                break;
        }
    }
/**显示手牌 */
    public showHandleCard(cards:Array<number>){
        this.readyGroup.visible =false;
        var i=0;
        cards.forEach((cardValue)=>{
           var card= CardFactory.getInstance().getHandCard(cardValue); 
           card.x=i*30;
           this.handCardGroup.addChild(card); 
           this.onAddCardListen(card);
           i++;

        })
        this.handCardGroup.validateNow();
        this.validateNow();

    }

    private onAddCardListen(card:Card){
        card.addEventListener("touchBegin",this.touchBegin,this);
		card.addEventListener("touchMove",this.touchMove,this);
		card.addEventListener("touchEnd",this.touchEnd,this);
    }
    private onRemoveCardListen(card:Card){
        card.addEventListener("touchBegin",this.touchBegin,this);
		card.addEventListener("touchMove",this.touchMove,this);
		card.addEventListener("touchEnd",this.touchEnd,this);
    }


	private cur:Card;
	private pre:Card;
    private beginSelect:Card;
	private endSelect:Card;

	private touchBegin(e:egret.TouchEvent){
		this.beginSelect = e.target;
		this.cur = this.beginSelect as Card;
        this.cur.select();
	}

	private touchMove(e:egret.TouchEvent){
		
		if(this.cur == e.target){
			return;
		}
		this.cur = e.target;
		var beginIndx=this.handCardGroup.getChildIndex(this.beginSelect);
		var end=this.handCardGroup.getChildIndex(e.target);
		if(beginIndx>end){
			var temp= beginIndx;
			beginIndx = end;
			end = temp;
		}
	/***设置选中状态 select unSelect*/
		this.setSelFlag(beginIndx,end);

	}
	private touchEnd(e:egret.TouchEvent){
		this.endSelect = e.target;
		//console.log("touchEnd "+(<eui.Image>e.target).source);
		this.changeSelectCardStatus();

	}

/**改变选择牌状态 up down */
	private changeSelectCardStatus(){
		var beginIndx=this.handCardGroup.getChildIndex(this.beginSelect);
		var endIndx=this.handCardGroup.getChildIndex(this.endSelect);	
		if(beginIndx>endIndx){
			var temp = beginIndx;
			beginIndx = endIndx;
			endIndx = temp;
		}      

		for(var i=beginIndx;i<=endIndx;i++){
			var card:Card= this.handCardGroup.getChildAt(i) as Card;
            card.toChangeStatus();            		
		}
	}
/**获取出牌 */
    private getSelectOutCard(){
        var len =this.handCardGroup.numChildren;
        this.tempOutCards=[];
        for(let i=0;i<len;i++){
            var card:Card=this.handCardGroup.getChildAt(i) as Card;
            if(card.bUp)this.tempOutCards.push(card);
        }
    }
/**发送出牌 */
    private sendOutPutCard(){
        this.getSelectOutCard();
        if(this.tempOutCards.length){                    
            var cardData=[];
            this.tempOutCards.forEach((value)=>{cardData.push(value.cardValue)},this)  
            this.ctrl.sendOutPutCard(cardData);  
        }
    }

   private setSelFlag(start:number,end:number){
	   for(let i=0;i<this.handCardGroup.numChildren;i++){
		   var card:Card = this.handCardGroup.getChildAt(i) as Card;
		   if(i>=start && i<=end){
			   card.select();

		   }else{
			   card.unSelect();
		   }
	   }
   }

    /**重新排列手牌 */
   private reSortHandCard(){
        var len =this.handCardGroup.numChildren;        
        for(let i=0;i<len;i++){
            var card:Card=this.handCardGroup.getChildAt(i) as Card;
            card.x=i*30;
            // this.handCardGroup.addChild(card); 
        }

   }


}



