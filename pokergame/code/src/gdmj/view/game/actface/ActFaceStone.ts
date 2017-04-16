/**
 * 动作表情-石头
 * @author chenkai
 * @date 2016/9/5
 */
class ActFaceStone extends egret.DisplayObjectContainer{
	private stone:egret.Bitmap;
	private grass:egret.Bitmap;
	private grassParticle:particle.ParticleSystem;

	public constructor() {
		super();

		this.stone = new egret.Bitmap(RES.getRes("actface_stone_png"));
		this.addChild(this.stone);

		this.grass = new egret.Bitmap(RES.getRes("actface_stone1_png"));

		var texture = RES.getRes("actface_stoneanim_png");
        var json = RES.getRes("actface_stoneanim_json");
        this.grassParticle = new particle.GravityParticleSystem(texture,json);
	}

	public playAnim(){
		this.removeChild(this.stone);

		this.grass.x = -this.grass.width/2 + 40;
		this.grass.y = -this.grass.height/2 + 40;
		this.addChild(this.grass);

		this.grassParticle.x = -570;  //粒子位置偏差太大...
		this.grassParticle.y = -320;
		this.addChild(this.grassParticle);
		this.grassParticle.start(300);

		egret.Tween.get(this).wait(2000).call(()=>{
			this.grassParticle.stop();
			this.hide();
		});
	}

	private hide(){
		this.parent && this.parent.removeChild(this);
	}
}