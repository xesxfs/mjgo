/**
 *
 * @author chenwei
 * 2016/07/13
 */
class ScorePanel extends BasePanel{
	public constructor() {
    	super();    	
    	this.skinName="ScorePanelSkin"
	}
    private cmd:string ="41";
	private vs:eui.ViewStack;
	private radioRbt:eui.RadioButton;

		 /**组件创建完毕*/
    protected childrenCreated() {
        
    }

	private closeBtn:eui.Button;
	private dkScoreList:eui.List;
    /**添加到场景中*/
    protected onEnable() {
		this.setCenter();
		App.gameSocket.register(ProtocolHead.RevCmd41,this.revData,this);
		(<eui.ArrayCollection>this.dkScoreList.dataProvider).removeAll();
		this.sendData();
        this.closeBtn.addEventListener("touchTap",this.hide,this);        
		this.radioRbt.group.addEventListener(eui.UIEvent.CHANGE,this.changeViewStack,this);

    }

	private sendData(){
		var scoreData= ProtocolData.commond;
		scoreData.cmd  = this.cmd;
		scoreData.game ="-1";
		App.gameSocket.send(ProtocolData.commond)

	}

	private revData(data:Object){

		var ac:eui.ArrayCollection = this.dkScoreList.dataProvider as eui.ArrayCollection;
		// var item = new Object();
		var dataItem = data["msg"][0][0];

		ac.addItem(dataItem);


	}

	    
	private changeViewStack(e:eui.UIEvent){
      var group: eui.RadioButtonGroup=  e.target;
	  this.vs.selectedIndex=group.selectedValue;
      
	} 
    

    
   
    protected onRemove() {
		App.gameSocket.unRegister(ProtocolHead.RevCmd41);
		this.closeBtn.removeEventListener("touchTap",this.hide,this);        
		this.radioRbt.group.removeEventListener(eui.UIEvent.CHANGE,this.changeViewStack,this);
       
    }
    
  
}
