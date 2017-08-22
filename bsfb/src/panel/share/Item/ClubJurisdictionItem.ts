class ClubJurisdictionItem extends  eui.ItemRenderer{
	private Lb_Times:eui.Label;
	private Lb_EachGet:eui.Label;
	private Btn_Add:eui.Button;
	private Btn_Minus:eui.Button;
	private Lb_Position:eui.Label;
	public constructor() {
		super();
	}

	protected dataChanged(){
		this.Lb_Times.text = this.data.Lb_Times;
		this.Lb_EachGet.text = this.data.Lb_EachGet;
		this.Lb_Position.text = this.data.Lb_Position;
		if(this.data.buttonEnable=="1"){
			this.enableBut(this.Btn_Add);
			this.enableBut(this.Btn_Minus);
		}
		if(this.data.buttonEnable=="0"){
			this.disableBut(this.Btn_Add);
			this.disableBut(this.Btn_Minus);
		}
	}
	protected childrenCreated(){
		this.Btn_Add.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_AddClick,this);
		this.Btn_Minus.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_MinusClick,this);
	}

	private Btn_AddClick(){
		if (Number(this.Lb_Times.text) < 300) {
				this.Lb_Times.text = Number(this.Lb_Times.text) + 1+"";
		}
		KFControllerMgr.getCtl(PanelName.ClubDolePanel).updateStr_Receive_Times(this.data.index,this.Lb_Times.text);
	}

	private Btn_MinusClick(){
		if (Number(this.Lb_Times.text) >= 1)  {
			this.Lb_Times.text = Number(this.Lb_Times.text) -1+"";
		}
		KFControllerMgr.getCtl(PanelName.ClubDolePanel).updateStr_Receive_Times(this.data.index,this.Lb_Times.text);
	}

	protected disableBut(obj:any){
        obj.enabled = false;
        var image: eui.Image = <eui.Image>obj.getChildAt(0);
        CommonFuc.imgFilterFloat(image,[0.7,0.7,0.7,1]);
    }

    protected enableBut(obj:any){
        obj.enabled = true;
        var image: eui.Image = <eui.Image>obj.getChildAt(0);
        CommonFuc.imgFilterFloat(image,[1,1,1,1]);
    }

}