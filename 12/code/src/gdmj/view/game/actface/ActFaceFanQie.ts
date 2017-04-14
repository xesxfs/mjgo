/**
 * 动作表情-西红柿
 * @author chenkai
 * @date 2016/9/5
 */
class ActFaceFanQie extends BitmapMovie{
    
	public constructor() {
      super();
      this.setImgBuffer("actface_fanqie",0,8);
      this.delay = 90;

      //番茄的图片是歪的，在左上角，这里自己对齐...
      this.anchorOffsetX = -50;
      this.anchorOffsetY = -50;
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