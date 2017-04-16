/**
 * 骰子动画
 * @author chenkai 
 * @date 2016/6/30
 */
class DiceAnim extends eui.Component{
	private anim0:BitmapMovie;//骰子动画
	private anim1:BitmapMovie;
	private sz0List = [];     //骰子具体点数图片
	private sz1List = [];   
	private point0:number;    //骰子点数
	private point1:number;    //骰子点数
	private bInitRes:boolean = false; //是否初始化过

	public constructor() {
    	super();
    	this.skinName = "DiceAnimSkin";
	}
	
	public childrenCreated(){
		for(var i=0;i<6;i++){
			this.sz0List.push(this.getChildAt(i));
			this.sz1List.push(this.getChildAt(i+6));
		}
	}

	private initRes(){
		if(this.bInitRes == false){
			this.bInitRes = true;
			this.anim0 = new BitmapMovie();
			this.anim0.setImgBuffer("game_sz_anim",0,5);
			this.anim1 = new BitmapMovie();
			this.anim1.setImgBuffer("game_sz_anim",0,5);
		}
	}

	/**
	 * 播放骰子动画
	 * @point0 骰子点数
	 * @point1 
	 */
	public playAnim(point0:number, point1:number){
		this.initRes();

		this.point0 = point0;
		this.point1 = point1;
		this.removeChildren();

		this.addChild(this.anim0);
		this.anim0.gotoAndPlay(0,2);
		
		this.anim1.x = this.sz1List[0].x;
		this.addChild(this.anim1);
		this.anim1.gotoAndPlay(0,2);
		this.anim1.addEventListener(egret.Event.COMPLETE, this.onAnimComplete, this);
	}

	//骰子动画播放完成
	private onAnimComplete(){
		this.anim0.stop();
		this.removeChild(this.anim0);
		this.addChild(this.sz0List[this.point0-1]);

		this.anim1.stop();
		this.removeChild(this.anim1);
		this.addChild(this.sz1List[this.point1-1]);

		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}



}
