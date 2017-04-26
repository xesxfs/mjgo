class Game extends eui.Component{
	public constructor() {
		super();
		this.skinName ="GameSkin";		
	}

	private cardGroup:eui.Group;
	private outCardGroup:eui.Group;

	private beginSelect:egret.DisplayObject;
	private endSelect:egret.DisplayObject;

	protected childrenCreated(){
		var nc=this.cardGroup.numChildren
		for(let i=0;i<nc;i++){
			var card = this.cardGroup.getChildAt(i);
			// card.addEventListener("touchBegin",this.touchBegin,this);
			// card.addEventListener("touchMove",this.touchMove,this);
			// card.addEventListener("touchEnd",this.touchEnd,this);
			card.addEventListener("touchTap",this.touchTap,this);
			// card.addEventListener("touchReleaseOutside",this.touchOutSide,this);

		}
		// this.cardGroup.addEventListener("touchBegin",this.touchBegin,this);
		// this.cardGroup.addEventListener("touchMove",this.touchMove,this);
		// this.cardGroup.addEventListener("touchEnd",this.touchEnd,this);
		// this.cardGroup.addEventListener("touchTap",this.touchTap,this);
		// this.cardGroup.addEventListener("touchReleaseOutside",this.touchOutSide,this);
	}

	private cur:egret.DisplayObject;
	private pre:egret.DisplayObject;

	private touchBegin(e:egret.TouchEvent){
		this.beginSelect = e.target;
		this.cur = this.beginSelect;
		console.log("touchBegin "+(<eui.Image>e.target).source);

	}

	private touchMove(e:egret.TouchEvent){
		// console.log("touchMove "+(<eui.Image>e.target).source);
		if(this.cur == e.target){
			return;
		}
		this.cur = e.target;
		var beginIndx=this.cardGroup.getChildIndex(this.beginSelect);
		var end=this.cardGroup.getChildIndex(e.target);
		if(beginIndx>end){
			var temp= beginIndx;
			beginIndx = end;
			end = temp;
		}
		console.log(beginIndx,end);
		this.setSelFlag(beginIndx,end);

	}
	private touchEnd(e:egret.TouchEvent){
		this.endSelect = e.target;
		//console.log("touchEnd "+(<eui.Image>e.target).source);
		this.getSelectCard();

	}

	private touchTap(e:egret.TouchEvent){
		// this.endSelect = e.target;
		// console.log("touchTap "+(<eui.Image>e.target).source);
		var card:eui.Image = e.target as eui.Image;
		var interx = this.outCardGroup.numChildren * 35
		console.log("x: ",interx);
		card.x=interx;
		card.y=0;
		this.outCardGroup.addChild(card);

	}

	private getSelectCard(){
		var beginIndx=this.cardGroup.getChildIndex(this.beginSelect);
		var endIndx=this.cardGroup.getChildIndex(this.endSelect);
		console.log(beginIndx,endIndx);

		if(beginIndx>endIndx){
			var temp = beginIndx;
			beginIndx = endIndx;
			endIndx = temp;
		}

		for(var i=beginIndx;i<=endIndx;i++){
			var card:eui.Image= this.cardGroup.getChildAt(i) as eui.Image;
			console.log(card.source)
		}
	}

   private touchOutSide(e:egret.TouchEvent){
		console.log("touchOutSide "+(<eui.Image>e.target).source);
	}

   private setSelFlag(start:number,end:number){
	   for(let i=0;i<this.cardGroup.numChildren;i++){
		   var card:eui.Image= this.cardGroup.getChildAt(i) as eui.Image;
		   if(i>=start && i<=end){
			   console.log("select: ", card.source)

		   }else{
			   console.log("unselect: ", card.source)
		   }
	   }
   } 

}