class MessagePanel extends BasePanel{
	public constructor() {
		super();
		this.skinName="MessageSkin"
	}
	private cmd:string ="42";

	private vs:eui.ViewStack;
	private radioRbt:eui.RadioButton;

		 /**组件创建完毕*/
    protected childrenCreated() {
        
    }

	private closeBtn:eui.Button;
    /**添加到场景中*/
    protected onEnable() {
		this.setCenter();
		App.gameSocket.register(ProtocolHead.RevCmd42,this.revData,this);
		this.sendData();
        this.closeBtn.addEventListener("touchTap",this.hide,this);        
		this.radioRbt.group.addEventListener(eui.UIEvent.CHANGE,this.changeViewStack,this);
    }

	private sendData(){
		var scoreData= ProtocolData.commond;
		scoreData.cmd  =this.cmd;
		scoreData.game ="-1";
		App.gameSocket.send(ProtocolData.commond)

	}

	private revData(data:Object){

	}

	    
	private changeViewStack(e:eui.UIEvent){
      var group: eui.RadioButtonGroup=  e.target;
	  this.vs.selectedIndex=group.selectedValue;
      
	} 

    /**从场景中移除*/
    protected onRemove() {
		App.gameSocket.unRegister(ProtocolHead.RevCmd42);		
        this.closeBtn.removeEventListener("touchTap",this.hide,this);        
		this.radioRbt.group.removeEventListener(eui.UIEvent.CHANGE,this.changeViewStack,this);

    }
}