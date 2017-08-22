class GameSlider extends eui.HSlider{
	private oriWidth = 0;
	private light:eui.ProgressBar;
	private cbfun:Function;
	public constructor() {
		super();
	}

	protected childrenCreated(){
		// this.oriWidth = this.light.width;
		this.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
		
		this.light.maximum = this.maximum;
		this.light.minimum = this.minimum;
	}

	private changeHandler(evt: eui.UIEvent): void {
		var percent = evt.target.value/this.maximum;
		this.light.value = evt.target.value;
		// if(percent>0.01){
		// 	this.light.width = this.oriWidth*percent;
		// }else{
		// 	this.light.width = 0;
		// }
		this.cbfun(percent);
	}

	public SetChangeCB(cb:Function,thisObj:any){
		this.cbfun = (evt: any)=>{
			cb.call(thisObj,evt);
		};
	}

	public set pValue(percent:number){
		this.value = this.maximum*percent;
		this.light.value = this.value;
		// if(percent>1){
		// 	percent = 1;
		// }
		// this.value = this.maximum*percent;
		// if(percent>0.01){
		// 	this.light.width = this.oriWidth*percent;
		// }else{
		// 	this.light.width = 0;
		// }
		this.cbfun(percent);
	}

	public get pValue():number{
		return this.value/this.maximum;
	}

	public set enable(isenable:boolean){
		this.enabled = isenable;
		if(isenable){
			var colorMatrix = [
				1,0,0,0,0, 
				0,1,0,0,0,
				0,0,1,0,0,
				0,0,0,1,0
			];

			var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
			this.thumb.filters = [colorFlilter];
		}else{
			var colorMatrix = [
				0.7,0,0,0,0, 
				0,0.7,0,0,0,
				0,0,0.7,0,0,
				0,0,0,1,0
			];
			var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
			this.thumb.filters = [colorFlilter];
		}
	}
}