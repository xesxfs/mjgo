
class BSHelpDropDownBOX extends eui.Component{

	public constructor() {
		
		super();
	}

	private dropDownImg:eui.Image;
	private showTxtLab:eui.Label;
	private showDropDown:eui.Group;
    //滚动列表上的遮罩
    private spMask: egret.Shape;
    //列表是否展开了
    private isShow: boolean = false;
	private _mcb;

	protected childrenCreated(){	
		this.init();	
		this.addEventListener("touchTap",this.onTouch,this)	
		this.labelHeights = 0;
		let arr=["返还系数","出现几率"];
		this.setData(arr);
		NetEventMgr.getInstance().addEventListener(MsgID.Client.StageClick+"_event",this.receiStageClick,this);
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
		 NetEventMgr.getInstance().clientMsg(MsgID.Client.BSFBHELPCHANGE,this.showTxtLab.text);
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
			 //下拉背景
            var spBack = new egret.Shape();
            spBack.graphics.beginFill(0x000000);
            spBack.graphics.drawRect(0, 0,this.width, 60);
            spBack.graphics.endFill();
			spBack.alpha =0.5;
			spBack.touchEnabled = false;
			this.showDropDown.addChild(spBack);


            //列表上面的遮罩
            var spMask = new egret.Shape();
            spMask.graphics.beginFill(0xFFED00);
            spMask.graphics.drawRect(0, 0, this.width, 60);
            spMask.graphics.endFill();
            this.addChild(spMask);
            this.showDropDown.mask = spMask;
            this.spMask = spMask;
			this.spMask.y = this.showTxtLab.height;
	}

	public setData(arr:Array<string>){		
	 if(arr&&arr.length){		
		this.showTxtLab.text=arr[0]
		for(var i=0;i<arr.length;i++){
			var lable = new eui.Label(arr[i]);
			lable.y = this.labelHeights;
			this.labelHeights+=30;
			lable.size = 18;
			lable.width = this.width;
			lable.textColor = 0xFFCF1C;
			lable.addEventListener("touchTap",this.selectItem,this);
			this.showDropDown.addChild(lable);
		}
		this.showDropDown.y= -this.labelHeights;
	  }
	}

	private labelHeights = 0;

	private changeListType(): void {
		this.showDropDown.visible = true;
            if (!this.isShow) {
                egret.Tween.get(this.showDropDown).to({y:35}, 300);
                this.isShow = true;
            } else {				
                egret.Tween.get(this.showDropDown).to({y:-this.labelHeights}, 300);
                this.isShow = false;
            }
        }

}