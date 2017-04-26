class ScoreItem extends eui.ItemRenderer{
	public constructor() {
		super();	
	}

	private dateLab:eui.Label;
	private roomNoLab:eui.Label;
	private timeLab:eui.Label;

	private firstNickNameLab:eui.Label;
	private secondNickNameLab:eui.Label;
	private thridNickNameLab:eui.Label;
	private fourthNickNameLab:eui.Label;

	private firstScoreLab:eui.Label;
	private secondScoreLab:eui.Label;
	private thridScoreLab:eui.Label;
	private fourthScoreLab:eui.Label;

	protected childrenCreated(){
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);		
    }

	protected dataChanged(){
		this.setUIData();
	}

	private setUIData(){
		this.dateLab.text = this.data["date"];
		this.roomNoLab.text = this.data["roomId"];
		this.timeLab.text = this.data["time"];

		this.firstNickNameLab.text = this.data["firstNickName"];
		this.secondNickNameLab.text = this.data["secondNickName"];
		this.thridNickNameLab.text = this.data["thridNickName"];
		this.fourthNickNameLab.text = this.data["fourthNickName"];

		this.firstScoreLab.text = this.formatScore(this.data["firstScore"]);
		this.secondScoreLab.text = this.formatScore(this.data["secondScore"]);
		this.thridScoreLab.text = this.formatScore(this.data["thridScore"]);
		this.fourthScoreLab.text = this.formatScore(this.data["fourthScore"]);

	}

	private formatScore(score:number):string{
		if(score>0){
			return "+"+score
		}
		return ""+score;


	}

	private onTouch(e:egret.TouchEvent){

	}
}