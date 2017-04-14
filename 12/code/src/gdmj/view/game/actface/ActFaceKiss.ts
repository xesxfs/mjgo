/**
 * 动作表情-飞吻
 * @author chenkai
 * @date 2016/9/5
 */
class ActFaceKiss extends egret.DisplayObjectContainer{
	private mouth:egret.Bitmap;
	private heartParticle:particle.ParticleSystem;

	public constructor() {
		super();

		this.mouth = new egret.Bitmap(RES.getRes("actface_kiss_png"));
		this.addChild(this.mouth);

		var texture = RES.getRes("actface_kissanim_png");
        var json = RES.getRes("actface_kissanim_json");
        this.heartParticle = new particle.GravityParticleSystem(texture,json);
	}

	public playAnim(){

		this.addChild(this.heartParticle);
		this.addChild(this.mouth);

		this.heartParticle.x = -740;  //粒子位置偏差太大...
		this.heartParticle.y = -300;
		this.heartParticle.start(1200);

		egret.Tween.get(this).wait(2000).call(()=>{
			this.heartParticle.stop();
			this.hide();
		});
	}

	private hide(){
		this.parent && this.parent.removeChild(this);
	}
}