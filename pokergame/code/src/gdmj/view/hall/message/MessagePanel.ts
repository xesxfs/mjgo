class MessagePanel extends BasePanel{
	public constructor() {
		super();
		this.skinName="MessageSkin"
	}
	private cmd:string ="44";

	private vs:eui.ViewStack;
	private radioRbt:eui.RadioButton;
	private sysMsgLab:eui.Label;
	private newActLab:eui.Label;

		 /**组件创建完毕*/
    protected childrenCreated() {
        
    }

	private closeBtn:eui.Button;
    /**添加到场景中*/
    protected onEnable() {
		this.setCenter();
		App.gameSocket.register(ProtocolHead.RevCmd42,this.rev42Data,this);
		App.gameSocket.register(ProtocolHead.RevCmd43,this.rev43Data,this);
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
//最新活动
	private rev42Data(data:Object){
	//	{"cmd":42,"game":-1,"msg":[[{"activity_id":1,"content":"测试活动用例","endTime":"2017-04-24","startTime":"2017-04-19"}]]}
		this.newActLab.text = data["msg"][0][0]["content"]
	}
//系统消息
	private rev43Data(data:Object){
//{"cmd":43,"game":-1,"msg":[[{"content":"良好游戏，禁止作弊","system_id":1}]]}
		this.sysMsgLab.text = data["msg"][0][0]["content"]
	}

	    
	private changeViewStack(e:eui.UIEvent){
      var group: eui.RadioButtonGroup=  e.target;
	  this.vs.selectedIndex=group.selectedValue;
      
	} 

    /**从场景中移除*/
    protected onRemove() {
		App.gameSocket.unRegister(ProtocolHead.RevCmd42);		
		App.gameSocket.unRegister(ProtocolHead.RevCmd43);
        this.closeBtn.removeEventListener("touchTap",this.hide,this);        
		this.radioRbt.group.removeEventListener(eui.UIEvent.CHANGE,this.changeViewStack,this);

    }
}