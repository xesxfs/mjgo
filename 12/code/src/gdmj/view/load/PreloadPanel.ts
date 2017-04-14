/**
 * 预加载面板
 * @author chenwei
 * @date 2016/07/14
 */
class PreloadPanel extends BaseScene{
    /**进度文本*/
    private percentLab:eui.Label;
	/**进度条*/
//    private loadProgress:eui.ProgressBar;
    /*加载动画*/
    private mc:egret.MovieClip;
    
    private mcGroup:eui.Group;
	
    public constructor() {
    	super();
    	this.skinName = "PreloadPanelSkin";
	}

    protected onEnable() {
        this.setProgress(0);
        
        if(this.mc == null) {
            var data = RES.getRes("pload_json");
            var texture = RES.getRes("pload_png");
       	    var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
            this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("pload"));
            this.mc.x = (App.StageUtils.stageWidth - this.mc.width) / 2;
            this.mc.y = (App.StageUtils.stageHeight - this.mc.height) *0.6;
        }
        this.addChild(this.mc);
        this.mc.gotoAndPlay("load",-1);
        
    }

    protected onRemove() {
        this.setProgress(0);
    }   
    
    /**
     * 设置加载进度
     * @value 进度 0-100
     */
    public setProgress(value:number){
        this.percentLab.text = value + "%";
//        this.loadProgress.value = value;
    }

}
