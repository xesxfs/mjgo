class AwardPanel extends BasePanel{
	public constructor() {
		super();
		this.skinName="AwardSkin";
	}
	 /**组件创建完毕*/
    protected childrenCreated() {
        
    }

	private closeBtn:eui.Button;
    /**添加到场景中*/
    protected onEnable() {
		this.setCenter();
        this.closeBtn.addEventListener("touchTap",this.hide,this)
        
    }

    /**从场景中移除*/
    protected onRemove() {

    }
}