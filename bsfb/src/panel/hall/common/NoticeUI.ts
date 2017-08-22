class NoticeUI extends eui.Component{
	public constructor() {
		super();		
	}

	private itemList:Array<NoticeItems>=[];
	private itemsGroup:eui.Group;
	private itemScroller:eui.Scroller;
	private delay:number =200;//展开时间
	private topGap:number =10;//距离顶部距离
	private gap:number =7;//组件间隔
	private selCall:Function;
	private thisObj:any;
	private isTweening:boolean=false;//是否缓动中
	private title:eui.Label;

	protected childrenCreated(){
	
		// this.pushItems();
	}

	public pushItems(){

		for(let i=0;i<10;i++){
			this.pushItem("itemTitle地方"+i,i);
		}
	}

	public setCall(call:Function,thisObj:any){
		this.selCall = call;
		this.thisObj = thisObj;
	}

	public pushItem(title:string,id:number){
		let item = new NoticeItems();
		item.delayTime=this.delay;
		item.addEventListener("touchTap",this.selectItems,this);
		item.skinName="NoticeItem";
		item.horizontalCenter =0;
		item.setTitle(title);
		item.id = id;		
		this.itemList.push(item);
		this.itemsGroup.addChild(item)
		item.y =(this.itemList.length-1)*(this.gap+item.titleHeight)+this.topGap;
		//this.setContent(id,"121333333333333333333333333333332");

	}

	public setContent(id:number,content:string){
		if(this.isTweening)return;
		let item = this.findItemById(id);	
		if(!item||item.hasInit)return;
		item.setDetail(content);		
		let i=this.itemsGroup.getChildIndex(item);
		this.tweens(++i,item.nheight,item.isShow);
		item.touchTitle();
	}

	private findItemById(id:number):NoticeItems{
		let len=this.itemsGroup.numChildren;
		for(let i=0;i<len;i++){
			let item = this.itemsGroup.getChildAt(i) as NoticeItems;
			if(id == item.id){
				return item;
			}
		}
		return null;
	}
	
	private selectItems(e:egret.TouchEvent){
		if(this.isTweening)return;
		let target =e.currentTarget	
		if(target instanceof NoticeItems){		
			let item = target as NoticeItems;
			if(!item.hasInit){
				this.selCall&&this.selCall.call(this.thisObj,item.id);
			}else{
				let i=this.itemsGroup.getChildIndex(item);		
				this.tweens(++i,item.nheight,item.isShow);	
				item.touchTitle();
			}			
		}
	}

	private tweens(i:number,sheight:number,isShow:boolean){
		//最后一个Item，让scroller滚动一下,有个小Bug（向上展开，向下展开的时机问题）
		if(i>=this.itemList.length){
			// this.tweens(0,sheight,!isShow);
			let sv;
			if(isShow){
				sv=this.itemScroller.viewport.scrollV-sheight
			}else{
				sv=this.itemScroller.viewport.scrollV+sheight
			}
			egret.Tween.get(this.itemScroller.viewport).call(()=>{this.isTweening = true;}).to({scrollV:sv},this.delay).call(()=>{this.isTweening = false;});			 
		}

		for(;i<this.itemList.length;i++){
				this.tween(this.itemList[i],sheight,isShow);
			}
	}

	private tween(item:NoticeItems,sheight:number,isShow:boolean){
		let offy;
		let ease;
		if(!isShow){
			offy = item.y +sheight;
			ease = egret.Ease.backOut;
		}else{
			offy = item.y -sheight;
			ease = egret.Ease.backIn;
		}
		egret.Tween.get(item).call(()=>{this.isTweening = true;}).to({y:offy},this.delay).call(()=>{this.isTweening = false;});
	}
}