class CroomPanel extends BasePanel{
	public constructor() {
		super();
		this.skinName="CroomSkin";
	}
		 /**组件创建完毕*/
    protected childrenCreated() {
         this.updateRadios();
    }

	private closeBtn:eui.Button;
    private okBtn:eui.Button;
    private jdDKRb:eui.RadioButton;
    private fourRb:eui.RadioButton;
    /**添加到场景中*/
    protected onEnable() {
		this.setCenter();
        this.closeBtn.addEventListener("touchTap",this.hide,this);
        this.okBtn.addEventListener("touchTap",this.onOkBtn,this)
        this.jdDKRb.group.addEventListener(eui.UIEvent.CHANGE,this.selectGameType,this)
        this.fourRb.group.addEventListener(eui.UIEvent.CHANGE,this.selectGameType,this)
       
        
    }

    private updateRadios(){

        for(let i=0;i< this.jdDKRb.group.numRadioButtons;i++){
            this.updateRadioStatus( this.jdDKRb.group.getRadioButtonAt(i));
        }
         
        for(let i=0;i< this.fourRb.group.numRadioButtons;i++){
            this.updateRadioStatus(this.fourRb.group.getRadioButtonAt(i));
        }
    }

    private updateRadioStatus(rbtn:eui.RadioButton){
        rbtn.getChildAt(1).visible = rbtn.selected;
    }



    private selectGameType(e:eui.UIEvent){
        this.updateRadios();

    }

    private selectGameCount(e:eui.UIEvent){
        this.updateRadios();

    }


    private onOkBtn(){
        this.sendData();
        this.hide();
    }

    private sendData(){
        // {'cmd':'3','game':' ','msg':[{'level':' '}]}
     ProtocolData.cmd3.game= this.jdDKRb.group.selectedValue
     ProtocolData.cmd3.msg[0].level=this.fourRb.group.selectedValue
        App.gameSocket.send(ProtocolData.cmd3);
    }

    /**从场景中移除*/
    protected onRemove() {

    }
}