
class LevelExpComponent extends eui.Component{

	public constructor() {
		super();	
	}

private maskShare:egret.Shape;
private showMask:eui.Image;
private levelLab:eui.Label;
private level:number;
private curExp:number;
private maxExp:number;
private offAngle:number =-90;//正上方角度
private currentPerCent =0;

protected childrenCreated(){
	this.maskShare = new egret.Shape;    
	this.addChild(this.maskShare);
	this.setExp(600,3000);
	this.setlev(5);
}

private creteExpShare(angle:number){
	this.changeGraphics(angle);
	// egret.startTick(function (timeStamp:number):boolean{
	// 	return true
	// },this)
}

private changeGraphics(angle:number){
	this.maskShare&&this.maskShare.graphics.clear();	
	this.maskShare.graphics.beginFill(0xdf5454);
	this.maskShare.graphics.moveTo(this.width/2,this.height/2);
	this.maskShare.graphics.lineTo(this.width/2,0);
	this.maskShare.graphics.drawArc(this.width/2,this.height/2,this.width/2,this.offAngle*Math.PI/180,Math.PI/180*(angle+this.offAngle));
	this.maskShare.graphics.lineTo(this.width/2,this.height/2);
	this.maskShare.graphics.endFill();	
	this.showMask.mask=this.maskShare;

}


public setlev(lev :number){
	if(this.level==lev)return;
	this.level=lev;
	this.levelLab.text = this.level.toString();
}

public setExp(curExp:number,maxExp:number){	
	if(curExp>maxExp||(curExp==this.curExp&&maxExp==this.maxExp))return;
	this.curExp = curExp;
	this.maxExp = maxExp;
	var angle:number=this.curExp/this.maxExp*360;	
	this.creteExpShare(angle);
}

public setcurExp(curExp:number){
	if(!this.maxExp)return;
	this.setExp(curExp,this.maxExp)
}

public set pValue(percent:number){
		if(percent>1){
			percent = 1;
		}
		var angle:number=percent*360;	
		this.currentPerCent = percent;
		this.creteExpShare(angle);
	}

	public get pValue():number{
		return this.currentPerCent;
	}


}