/**
 * 选择操作按钮
 * @author chenkai
 * @date 2016/8/3
 */
class SelectActBtn extends eui.Component{
	private imgList = [];   //保存图片，0底图 1中间图 2顶层图
	private resList = [];   //资源配置表
	private bInitRes:boolean = false;

	public constructor() {
		super();
		this.skinName = "SelectActBtnSkin";
	}

	public childrenCreated(){
		for(var i=0;i<3;i++){
			this.imgList.push(this.getChildAt(i));
		
		}
		this.touchChildren = false;
		this.touchEnabled = true;
	}

	private initRes(){
		if(this.bInitRes == false){
			this.bInitRes = true;
			this.resList[ACT_act.Act_Pass] = "game_s_pass";
			this.resList[ACT_act.Act_Chi] = "game_s_chi";
			this.resList[ACT_act.Act_Peng] = "game_s_peng";
			this.resList[ACT_act.Act_Gang] = "game_s_gang";
			this.resList[ACT_act.Act_AnGang] = "game_s_gang";
			this.resList[ACT_act.Act_Hu] = "game_s_hu";
		}
	}

	/**
	 * 根据动作设置皮肤
	 */
	public setActSkin(act:ACT_act){
		this.initRes();
		var resName = this.resList[act];
		for(var i=0;i<3;i++){
			this.imgList[i].bitmapData = RES.getRes(resName + (2-i) + "_png");
		}
	}

	/**播放动画*/
	public playAnim(){
		egret.Tween.get(this,{loop:true}).call(()=>{
			var foot = this.imgList[0];  //青色轮廓
			var top = this.imgList[2];   //亮色字
			foot.alpha = 0;
			top.alpha = 0.5;
			top.scaleX = 1;
			top.scaleY = 1;
			top.alpha = 0.5;
			egret.Tween.get(foot).to({alpha:1},600).to({alpha:0},160);
			egret.Tween.get(top).to({alpha:0,scaleX:1.4,scaleY:1.4},600);
		}).wait(1500);
	}

	public stopAnim(){
		egret.Tween.removeTweens(this);
	}
}