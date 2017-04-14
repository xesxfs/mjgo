/**
 * 动作表情-赞
 * @author chenkai
 * @date 2016/9/5
 */
class ActFaceZan extends egret.DisplayObjectContainer{
	private zan:egret.Bitmap;
	private light:egret.Bitmap;

	public constructor() {
		super();

		this.light = new egret.Bitmap(RES.getRes("actface_zanlight_png"));

		this.zan = new egret.Bitmap(RES.getRes("actface_zan_png"));
		this.addChild(this.zan);

	}

	public playAnim(){
		this.zan.anchorOffsetX = this.light.width/2;
		this.zan.anchorOffsetY = this.light.height/2;
		this.zan.x = this.light.width/2;
		this.zan.y = this.light.height/2;
		this.zan.scaleX = 0;
		this.zan.scaleY = 0;
		egret.Tween.get(this.zan).to({scaleX:1, scaleY:1},800,egret.Ease.bounceOut);

		this.addChild(this.light);
		this.addChild(this.zan);
		this.light.anchorOffsetX = this.light.width/2;
		this.light.anchorOffsetY = this.light.height/2;
		this.light.x = this.light.width/2;
		this.light.y = this.light.height/2;
		this.light.scaleX = 0;
		this.light.scaleY = 0;
		egret.Tween.get(this.light).to({scaleX:1,scaleY:1},500).call(()=>{
			egret.Tween.get(this.light,{loop:true}).to({rotation:360},200);
		});
		
		egret.Tween.get(this).wait(2000).call(()=>{
			this.hide();
		});

	}

	private hide(){
		egret.Tween.removeTweens(this.zan);
		egret.Tween.removeTweens(this.light);
		this.parent && this.parent.removeChild(this);
	}
}