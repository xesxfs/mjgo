/**
 * 动作表情-玫瑰
 * @author chenkai
 * @date 2016/9/5
 */
class ActFaceFlower extends egret.DisplayObjectContainer{
	private flower:egret.Bitmap;
	private lightParticle:particle.ParticleSystem;

	public constructor() {
		super();

		this.flower = new egret.Bitmap(RES.getRes("actface_flower_png"));
		this.addChild(this.flower);

		var texture = RES.getRes("actface_floweranim_png");
        var json = RES.getRes("actface_floweranim_json");
        this.lightParticle = new particle.GravityParticleSystem(texture,json);
	}

	public playAnim(){

		this.addChild(this.lightParticle);
		this.addChild(this.flower);

		this.lightParticle.x = -150;  //粒子位置偏差太大...
		this.lightParticle.y = -150;
		this.lightParticle.start(1200);

		egret.Tween.get(this).wait(2000).call(()=>{
			this.lightParticle.stop();
			this.hide();
		});
	}

	private hide(){
		this.parent && this.parent.removeChild(this);
	}
}