class ShopItem extends  eui.ItemRenderer{
	private ItemImg:eui.Image;
	private Btn_BuyProps:eui.Button;
	private Label_price:eui.Label;
	private Label_Name:eui.Label;
	

	public constructor() {
		super();
	}

	protected dataChanged(){
		this.Label_Name.text = this.data.Label_Name;
		this.Label_price.text = this.data.Label_Prices;
		this.ItemImg.source = RES.getRes(this.data.img);
	}

	protected childrenCreated(){
		// this.Btn_BuyProps.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_BuyPropsClick,this);
		CommonFuc.AddClickEvent(this.Btn_BuyProps,egret.TouchEvent.TOUCH_END,this.Btn_BuyPropsClick,this);
	}
	private Btn_BuyPropsClick(){
		GlobalClass.GameClass.isBuyScore = false;
		GlobalClass.GameClass.isBuyVip = false;
		if(this.data.type=="1"){//Score
			GlobalClass.GameClass.str_ScoreIDindex = this.data.ID;
			GlobalClass.GameClass.str_ScoreIDprices = this.data.Price;
			GlobalClass.GameClass.str_RealMoney = this.data.Money;
			GlobalClass.GameClass.isBuyScore = true;
			GlobalClass.GameClass.isBuyVip = false;
		}else if(this.data.type=="2"){//VIP
			GlobalClass.TaskClass.str_VIPID = this.data.ID;
      		GlobalClass.TaskClass.str_VIP_Price = this.data.Price;
			  GlobalClass.GameClass.isBuyScore = false;
			GlobalClass.GameClass.isBuyVip = true;
		}
		KFControllerMgr.getCtl(PanelName.PayChoicePanel).show();
	}

}