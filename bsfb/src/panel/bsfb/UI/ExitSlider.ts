class ExitSlider extends eui.HSlider{
	private thumbBG:eui.Image;
	private percent = 0;
	public constructor() {
		super();
	}

	protected childrenCreated(){
		this.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchenEnd, this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchenEnd, this);
	}

	private changeHandler(evt: eui.UIEvent): void {
		if(evt.target.value<0){
			evt.target.value = 0;
		}
		if(evt.target.value>197){
			evt.target.value = 197;
		}
		this.percent = evt.target.value/this.maximum;
		if(evt.target.value>=197){
			this.thumbBG.source = RES.getRes("UIBtn_13");
		}else{
			this.thumbBG.source = RES.getRes("UIBtn_12");
		}
	}

	private onTouchenEnd(){
		if(this.percent>=197/200){
			WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.GIVE_UP_EXIT,"");
        	KFSceneManager.getInstance().replaceScene(SceneName.Hall);
		}
		else{
			this.value = 0;
			this.thumbBG.source = RES.getRes("UIBtn_12");
		}
	}

	
}