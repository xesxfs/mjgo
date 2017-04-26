class OutTimeUI extends eui.Component{
	public constructor() {
		super();
		this.skinName ="OutTimeUISkin";
	}
	private limitTime:number=25;
	private outTimer:DateTimer;
	private cdLab:eui.BitmapLabel;
	public childrenCreated(){
		this.outTimer = new DateTimer(1000);		
	}

	public startTime(){
		this.outTimer.addEventListener(egret.TimerEvent.TIMER,this.onOutTime,this);
		this.outTimer.start();
	}

	public stopTime(){
		this.outTimer.removeEventListener(egret.TimerEvent.TIMER,this.onOutTime,this);
		this.outTimer.stop();
	}

	private onOutTime(e: egret.TimerEvent){

	 if(this.outTimer.currentCount > this.limitTime) {
            this.stopTime();
            return;
        }
        var count = this.limitTime - this.outTimer.currentCount;
		this.setCDLab(NumberTool.formatTime(count) + "");
	}

	private setCDLab(time:string){
		this.cdLab.text = time;
	}


}