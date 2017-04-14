/**
 * 动作表情-炸弹
 * @author chenkai
 * @date 2016/9/5
 */
class ActFaceBoom extends BitmapMovie{

	public constructor() {
      super();
      this.setImgBuffer("actface_boom",0,4);
      this.delay = 120;
	}

    public playAnim(){
        this.gotoAndPlay(1);
        this.addEventListener(egret.Event.COMPLETE, this.hide, this);
    }

    public hide(){
        this.removeEventListener(egret.Event.COMPLETE, this.hide, this);
        this.parent && this.parent.removeChild(this);
    }
}
