/**
 * 庄家标志
 * @author chenkai 
 * @date 2016/6/30
 */
class ZhuangFlag extends egret.Bitmap{
	public constructor() {
    	super();
    	this.bitmapData = RES.getRes("game_zhuang_png");
    	this.anchorOffsetX = 23;
    	this.anchorOffsetY = 26;
	}
	
	public hide(){
    	this.parent && this.parent.removeChild(this);
	}
}
