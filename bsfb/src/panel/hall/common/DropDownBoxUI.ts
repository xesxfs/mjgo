
class DropDownBox extends eui.Component{

	public constructor() {
		
		super();
	}

	private dropDownImg:eui.Image;
	private showTxtLab:eui.Label;
	private showDropDown:eui.Group;
	 //滚动的列表
    private scroller: eui.Scroller;
    //滚动列表上的遮罩
    private spMask: egret.Shape;
    //列表是否展开了
    private isShow: boolean = false;
     //滚动区域消失位置的 y 坐标
    private posScrollerClose: number;
	//列表选项
	private itemList:eui.List;
	//下拉显示长度
	private showHeight:number ;
	//下拉显示数量，超过滚动
	private maxShowItemNum:number =10;
	private gapTop:number = 5;
	private gap:number =5;

	


	protected childrenCreated(){				
		// let arr=[];
		// for(let i=0;i<16;i++){
		// 	arr.push("明星"+i);

		// }
		// this.setData(arr)
		this.showTxtLab.width = this.width;
		this.showTxtLab.height = this.height;
		this.showTxtLab.size = 16;
		this.showTxtLab.fontFamily = "unity";
		this.name = "sfsaf";
		this.touchEnabled = true;
		
	}

	private shouldHide = false;
	private receiStageClick(data){
		console.log("afs");
		this.shouldHide = true;
		var timer: egret.Timer = new egret.Timer(100,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
			if(this.shouldHide){
				this.showDropDown.visible = false;
				this.isShow = false;
			}
        },this);
		timer.start();
	}

	private selectItem(e:egret.Event){
		this.shouldHide = false;
		let lab= e.target as eui.Label;
		if(lab instanceof eui.Label){
		 this.showTxtLab.text = lab.text;	
		 this.changeListType();	
		 if(this._cb){
			 this._cb();
		 }
		}
	}


	private onTouch(e:egret.Event){
		this.shouldHide = false;
		switch(e.target){
			case this.dropDownImg:						
			case this.showTxtLab:
				this.changeListType();	
				break;			     
			default:	
		}
	}

	private init(){
        this.itemList = new eui.List();
        this.itemList.width = this.showTxtLab.width;     
		let verticalLayout = new eui.VerticalLayout();
		//间隙
		verticalLayout.gap=this.gap;
		//距离顶端的间隙
		verticalLayout.paddingTop =this.gapTop;
		this.itemList.layout =verticalLayout;
		this.itemList.itemRenderer= DropItem;

        var scroller = new eui.Scroller();	
		this.scroller = scroller;
		scroller.scrollPolicyH = eui.ScrollPolicy.OFF;					
        scroller.height = this.showHeight;
        scroller.viewport = this.itemList;       
		this.showDropDown.y= -scroller.height;	

		//下拉背景
        var spBack = new egret.Shape();
        spBack.graphics.beginFill(0x000000);
        spBack.graphics.drawRoundRect(0, 0,this.width, this.scroller.height,20);
        spBack.graphics.endFill();
		spBack.alpha =0.5;
		spBack.touchEnabled = false;
		this.showDropDown.addChild(spBack);
		this.showDropDown.addChild(scroller);

		//列表上面的遮罩
        var spMask = new egret.Shape();
        spMask.graphics.beginFill(0x0fff00);
        spMask.graphics.drawRect(0, 0, this.width, this.showHeight);
        spMask.graphics.endFill();
        this.addChild(spMask);
        this.showDropDown.mask = spMask;
        this.scroller = scroller;
        this.spMask = spMask;
		this.spMask.y = this.showTxtLab.height;

		if(this.rotation == 180){
			this.showTxtLab.rotation = 180;
			this.showTxtLab.x += this.showTxtLab.width;
			this.showTxtLab.y += this.showTxtLab.height;
			this.showTxtLab.textAlign = "right";
		}
	}

	public setData(arr:Array<string>){
	 if(arr&&arr.length){	

		//  if(arr.length>this.maxShowItemNum){
		// 	 this.showHeight = this.height*this.maxShowItemNum+this.gapTop;
		//  }else{
		// 	 this.showHeight = this.height*arr.length+this.gapTop;
		//  }
		this.showHeight = 21*arr.length+this.gapTop;
		this.init();	
		this.addEventListener("touchTap",this.onTouch,this)	
		this.scroller.addEventListener("touchTap",this.selectItem,this);
		this.showTxtLab.text=arr[0]
		this.itemList.dataProvider = new eui.ArrayCollection(arr);		

		NetEventMgr.getInstance().addEventListener(MsgID.Client.StageClick+"_event",this.receiStageClick,this);
	  }
	}

	private changeListType(): void {
		this.showDropDown.visible = true;
            if (!this.isShow) {
				this.showDropDown.y = -this.scroller.height;
                egret.Tween.get(this.showDropDown).to({y:this.showTxtLab.height}, 200);
                this.isShow = true;
            } else {				
                egret.Tween.get(this.showDropDown).to({y:-this.scroller.height}, 200);
                this.isShow = false;
            }
        }


  public getCurItem():string{
	  return this.showTxtLab.text;
  	}

  public set text(value:string){
	 this.showTxtLab.text = value;
	}

  public get text():string{
		if(this.showTxtLab){
			return this.showTxtLab.text;
		}
		else{
			return "";
		}
	}

	private _cb;
	public addChangeEvent(cbFun:Function,thisObj:any){
		this._cb = ()=>{
			cbFun.call(thisObj);
		};
	}
}

class DropItem extends eui.ItemRenderer{
    private labelDisplay:eui.Label;
    public constructor(){
        super();
		this.skinName ="DropItemSkin"
        this.touchChildren = true;
        this.labelDisplay = new eui.Label();
        this.addChild( this.labelDisplay );
		// this.labelDisplay.width = this.width;
		this.labelDisplay.textAlign = "center";
		this.labelDisplay.size = 16;
		this.labelDisplay.fontFamily = "unity";
    }
    protected dataChanged():void{
        //显示数据中的 label 值
        this.labelDisplay.text = this.data;
		this.rotation = this.parent.parent.parent.parent.rotation;
    }
}