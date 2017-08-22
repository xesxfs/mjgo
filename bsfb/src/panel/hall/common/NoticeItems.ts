class NoticeItems extends eui.Component{
	public constructor() {
		super();		
	}
	private titleBG:eui.Group;
	private noticeLab:eui.Label;
	private rMask:eui.Rect;
	private titleLab:eui.Label;
	private title:string;
	private detail:string;
	public isShow:boolean=false;
	private delay:number =800;
	public id:number;
	public hasInit:boolean = false;
	protected childrenCreated(){
		this.noticeLab.y = this.titleBG.height;
		this.validateNow();
		//ShadeFont.Instance.setShade(this.titleLab,"YellowColor");
	}

	public touchTitle(){
			
		if(this.isShow){	
			egret.Tween.get(this.noticeLab).to({scaleY:0},this.delay);
		}else{			
			egret.Tween.get(this.noticeLab).to({scaleY:1},this.delay);			
		}
		this.isShow = !this.isShow;
	}

    //这里先执行，才执行childrenCreated
	public setTitle(sTitle:string){
		this.title =sTitle;
		let fontSize=20
		// if(this.title.length>8){
		// 	fontSize=this.titleLab.width/this.title.length;
		// }
		this.titleLab&&(this.titleLab.text = this.title)&&(this.titleLab.size=fontSize);
		this.titleLab.height=fontSize;		
	}

	public setDetail(sDetail:string){
		this.hasInit = true;
		this.detail =sDetail;
		this.noticeLab&&(this.noticeLab.text = this.detail)&&(this.noticeLab.scaleY = 0);

	}

	public get titleHeight():number{
		return this.titleBG.height
	}

	public set delayTime(nDelay:number){
		this.delay = nDelay;
	}

	public get nheight():number{
		return this.noticeLab.height;
	}
}