class LogView extends egret.Sprite{
	tf: egret.TextField;
	org_Xpos: number;
	org_Ypos: number;
	MaxScrollV: number;
	LineHeightGap: number;
		public constructor() {
		super();
		this.touchEnabled = true;
	}
			
	drawBG(w:number,h:number): void { 
		this.graphics.beginFill(0x666666,0.8);
		this.graphics.drawRect(0,0,w,h);
		this.graphics.endFill();
	}
	initTF():void{
		this.tf = new egret.TextField();
		this.tf.touchEnabled = true;
		//this.tf.height = Main.StageHeight;            
		this.tf.height = egret.MainContext.instance.stage.stageHeight;
		this.tf.y = 70;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchStartTF,this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMoveTF,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEndTF,this);
		this.addChild(this.tf);
	}
	onTouchStartTF(event:egret.TouchEvent):void{
		this.org_Xpos = event.stageX;
		this.org_Ypos = event.stageY;
		console.log("Start");

	}
	onTouchMoveTF(event:egret.TouchEvent):void{
		let offsetY:number = event.stageY -this.org_Ypos;
		let offsetX:number = event.stageX -this.org_Xpos;
		console.log("Move");
		if(offsetY<0)
		{ 
			var gap: number = Math.abs(offsetY);
			var count:number = parseInt((gap / this.LineHeightGap).toString())+this.tf.scrollV;
			if(count>this.MaxScrollV)
			{ 
				this.tf.scrollV = this.MaxScrollV;
			}else{
				this.tf.scrollV = count;
			}
		}else{
			var gap: number = Math.abs(offsetY);
			var count:number = this.tf.scrollV - parseInt((gap / this.LineHeightGap).toString());
			if(count<1)
			{ 
				this.tf.scrollV = 1;
			}else{
				this.tf.scrollV = count;
			}
		}

		if(Math.abs(offsetX)>500){
			console.log("去死吧小虫子们！！！");
		}
	}

	onTouchEndTF(event:egret.TouchEvent):void{

	}
	addLog(word:string):void{
		this.tf.appendText("Log:"+word+"\n");

		this.LineHeightGap = this.tf.textHeight / this.tf.maxScrollV;
		
		this.tf.scrollV = parseInt(((this.tf.textHeight- egret.MainContext.instance.stage.stageHeight+150) / this.LineHeightGap).toString()) ;
		this.MaxScrollV = this.tf.scrollV;
		console.log(" Main.StageHeight"+ KFSceneManager.getInstance().getRunningScene().stage.stageHeight);
		console.log("maxScrollV"+this.tf.maxScrollV);
		console.log("scrollV"+this.tf.scrollV);
		console.log("textHeight"+this.tf.textHeight);
		//this.tf.scrollV = this.tf.maxScrollV;

		if (this.tf.numLines>50)
		{

		}
	}
	scroll():void{
		console.log(this.tf.text.toString());
	}
}
