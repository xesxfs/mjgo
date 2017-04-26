class PayPanel extends BasePanel{
	public constructor() {
		super();
		this.skinName="PayPanelSkin"
	}
	private vs:eui.ViewStack;
	private radiosRbt:eui.RadioButton;
	private closeBtn:eui.Button;

		 /**组件创建完毕*/
    protected childrenCreated() {
        this.closeBtn.addEventListener("touchTap",this.hide,this);        
		this.radiosRbt.group.addEventListener(eui.UIEvent.CHANGE,this.changeViewStack,this);
    }

	
    /**添加到场景中*/
    protected onEnable() {
		this.setCenter();

    }

	    
	private changeViewStack(e:eui.UIEvent){
      var group: eui.RadioButtonGroup=  e.target;
	  this.vs.selectedIndex=group.selectedValue;
      
	} 

    /**从场景中移除*/
    protected onRemove() {

    }
}