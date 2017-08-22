class Diamond extends egret.MovieClip{ 

    public  type:number;
	public targetX:string;
	public targetY:string ;
	public currentY:string ;

    public isFall:boolean;
	public isSuppliment:boolean;
	public isRotate:boolean;
	public initFall:boolean;
    public supplimentFall:boolean;

	public static startX = 55;
	public static startX2 = 58;
	public static startY = 370;
	public static initY = -300;
	public static Diamondwidth = 55;
	public static suppliStartY = 0;

    private Interval:number = 40;

	private delTime = 0;
	// private Transform tfMy;
	// private Vector3 v3ForRotate = new Vector3 (0, 0, 0);
    public startFall(delayTime:number){
		this.isFall = true;
		this.visible = true;
		

        var timer: egret.Timer = new egret.Timer(delayTime*1000,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(event) {
            this.falling();
        },this);
        timer.start();
    } 

    public UpdateTargetY(){
        this.targetY = (Number(this.targetY) - 1) + "";
		this.name = "x" + this.targetX + "y" + this.targetY;
    }

    public falling(){
        if (this.isFall) {
			var targetPOS = Diamond.startY - Number(this.targetY) * Diamond.Diamondwidth;   //场内宝石

			console.log("grid="+GlobalClass.GameClass.int_grid);
			if (Number (this.targetY) == GlobalClass.GameClass.int_grid) {        //上面的那一排补充宝石
                targetPOS = Diamond.suppliStartY;
			}

			var del = targetPOS - this.y;
			var time = del*1000/GlobalClass.Speed.fallSpeed;
			this.currentY = this.targetY;     //更新宝石的当前位置
			egret.Tween.get(this).to({y : targetPOS},time,egret.Ease.sineIn).call(function (){
				
				this.isFall = false;
			},this)
		}
    }

	private VelX = 0;
	private VelY = 0;
	private acc = 0.8;
	//天女散花
	public beginpSplit(){
		var ratio = 1.5;
		var baseVx = 15;
		var baseVy = -15*ratio;
		this.VelY = Math.random()*baseVy;
		if(Math.random()>0.5){
			this.VelX = Math.random()*baseVx*(-1);
		}else{
			
			this.VelX = Math.random()*baseVx;
		}

		// this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		// this.intervalKey =egret.setInterval(this.onEnterFrame,this,1000/120)
		this.timer = new DateTimer(GlobalClass.Speed.splitSpeed);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onEnterFrame,this);
		this.timer.start();

	}

	private intervalKey;
	private timer:DateTimer;

	private onEnterFrame(event:egret.Event) { 
		this.delTime ++;
		this.x = this.x + this.VelX;
		this.y = this.y + (this.VelY+this.acc*this.delTime);

		if(this.y>400){
			this.visible = false;
			// egret.clearInterval(this.intervalKey);
			this.parent.removeChild(this);
			this.timer.stop();
			this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onEnterFrame,this);
			// this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}
	}

}