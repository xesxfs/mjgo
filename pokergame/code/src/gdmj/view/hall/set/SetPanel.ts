/**
 * @author chenwei
 * 
 * 2016-12-29
 */

class SetPanel extends BasePanel{
     public constructor() {
        super();
        this.skinName = "SetPanelSkin"
    }

    private musicSlider:eui.HSlider;
    private effectSlider:eui.HSlider;

	 /**组件创建完毕*/
    protected childrenCreated() {
        
    }

	private closeBtn:eui.Button;
    /**添加到场景中*/
    protected onEnable() {
        this.setCenter();
        this.closeBtn.addEventListener("touchTap",this.hide,this)
        this.musicSlider.addEventListener(eui.UIEvent.CHANGE,this.onMusicSlider,this);
        this.effectSlider.addEventListener(eui.UIEvent.CHANGE,this.onEffectSlider,this);
        
    }

    private onMusicSlider(e:eui.UIEvent){
        var volume =e.target.value;     
        // App.SoundManager.bgmVolume=volume;
    }


    private onEffectSlider(e:eui.UIEvent){
        // App.SoundManager.effectVolume=e.target.value;

    }

    /**从场景中移除*/
    protected onRemove() {

    }

}