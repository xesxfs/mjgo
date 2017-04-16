/**
 * 救济金面板
 * @author chenwei
 *
 */
class JjjPanel extends BasePanel{
    /**弹框背景*/
    private panelBg:PanelBg;
    /**箱子Group*/
    private boxGroup:eui.Group;
    /**领取次数*/
    private countLabel:eui.Label;
    /**箱子*/
    private boxList:Array<eui.ToggleSwitch> = [];
    /**钱文本*/
    private moneyList:Array<eui.Label> = [];
    /**用户点击领取救济金的箱子*/
    private targetBox:eui.ToggleSwitch;

    public constructor() {
    	super()
        this.skinName="JjjSkin";  	
	}

    protected childrenCreated(){
        for(var i=0;i<3;i++){
            this.boxList.push(this.boxGroup.getChildAt(i) as eui.ToggleSwitch);
            this.moneyList.push(this.boxGroup.getChildAt(i+3) as eui.Label);
        }
    }
    
    protected onEnable(){
        this.resetView();
        this.panelBg.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
        this.boxGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBoxTouch, this);
    }

    protected onRemove(){   
        this.panelBg.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
        this.boxGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBoxTouch, this);
    }

    private onClose(e:egret.TouchEvent){
        App.PanelManager.close(PanelConst.JjjPanel);
    }

    /**点击箱子，领取救济金*/
    private onBoxTouch(e:egret.TouchEvent){
        if(e.target instanceof eui.ToggleSwitch){
            if(App.DataCenter.welfareInfo.isCanApply()){   //金币不足 && 领取次数<3
                this.boxGroup.touchChildren = false;
                this.targetBox = e.target;

                //请求领取救济金
                var hallControll:HallController = App.getController(HallController.NAME);
//                hallControll.sendAlmsListReq();
            }
        }
    }

    /**根据领取救济金结果，设置箱子的显示
     * @alms 奖池
     * @num 抽中的金币数
    */
    public setBoxResult(alms:Array<any>, num:number){
        //随机打乱奖池
        ArrayTool.randSort(alms);
        //将抽中金币从奖池中剔除
        var len = alms.length;
        for(var i=0;i<len;i++){
            if(alms[i] == num){
                alms.splice(i,1);
                break;
            }
        }
        //显示金币
        len = this.boxList.length;
        for(var i=0;i<len;i++){
            if(this.boxList[i] == this.targetBox){
                this.moneyList[i].text = "+" + num;
            }else{
                this.moneyList[i].text = "+" + alms.pop();
                this.moneyList[i].alpha=0.7
            }
        }
        //领取次数
        this.setCountLabel();
    }

    /**设置救济金剩余领取次数*/
    private setCountLabel(){
        this.countLabel.text = App.DataCenter.welfareInfo.benefitMax - App.DataCenter.welfareInfo.benefit_cnt + "";
    }

    /**重置界面*/
    private resetView(){
        var len = this.boxList.length;
        for(var i=0;i<len;i++){
            var box:eui.ToggleSwitch = this.boxList[i];
            box.selected = false;
            
            var label:eui.Label = this.moneyList[i];
            label.text = "";
            label.alpha = 1;
        }
        this.boxGroup.touchChildren = true;
        this.setCountLabel();
    }
    
}
