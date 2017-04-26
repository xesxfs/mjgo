/**
 *
 * @author chenwei
 * 2016/07/13
 */
class RulePanel extends BasePanel{
	public constructor() {
    	super();
    	this.skinName="RulePanelSkin"
    	
	}

	private vs:eui.ViewStack;
	private radioRbt:eui.RadioButton;

		 /**组件创建完毕*/
    protected childrenCreated() {
        
    }

	private closeBtn:eui.Button;
    /**添加到场景中*/
    protected onEnable() {
		this.setCenter();
        this.closeBtn.addEventListener("touchTap",this.hide,this);        
		this.radioRbt.group.addEventListener(eui.UIEvent.CHANGE,this.changeViewStack,this);
    }

	    
	private changeViewStack(e:eui.UIEvent){
      var group: eui.RadioButtonGroup=  e.target;
	  this.vs.selectedIndex=group.selectedValue;
      
	} 

    /**从场景中移除*/
    protected onRemove() {

    }
}
