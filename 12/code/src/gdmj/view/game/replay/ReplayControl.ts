/**
 * 回放控制
 * @author chenkai
 * @date 2016/9/2
 */
class ReplayControl extends BaseUI{
	public lastBtn:eui.Image;        //后退
	public nextBtn:eui.Image;        //前进
	public pauseBtn:eui.Image;       //暂停
	public playBtn:eui.Image;        //播放
	public quitBtn:eui.Image;        //退出
	public optionBtn:eui.Image;      //设置
	private bar:eui.Image;            //进度条
	private measureGroup:eui.Group;   //用于计算进度条总长
    public openReplayBtn: eui.Image;    //展开按钮
    public shrinkBtn: eui.Image;        //回收按钮
	public constructor() {
		super();
		this.skinName = "ReplayControlSkin";
	}

    protected childrenCreated() {
//		this.setCenter();
    }

    protected onEnable() {
		this.setProgress(0);
    }

    protected onRemove() {

    }

	/**
	 * 设置进度
	 * @progress 0-1
	 */
	public setProgress(progress:number){
		this.bar.width = this.measureGroup.width*0.05 + this.measureGroup.width*0.95*progress;  //0.05初始长度，否则scale过短，圆头显示变成方头
	}


}