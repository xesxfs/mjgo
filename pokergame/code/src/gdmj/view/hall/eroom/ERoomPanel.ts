class ERoomPanel extends BasePanel{
	public constructor() {
		super();
		this.skinName="ERoomSkin"
	}
    private resetBtn:eui.Button;
    private delBtn:eui.Button;
    private noGroup:eui.Group;
    private roomNoGroup:eui.Group;
		 /**组件创建完毕*/
    protected childrenCreated() {
        
    }

	private closeBtn:eui.Button;
    /**添加到场景中*/
    protected onEnable() {
		this.setCenter();
        this.closeBtn.addEventListener("touchTap",this.hide,this)
        this.resetBtn.addEventListener("touchTap",this.onReset,this);
        this.delBtn.addEventListener("touchTap",this.onDel,this);
        this.noGroup.addEventListener("touchTap",this.onNoGroup,this);
        this.onReset();
        
    }

    private onReset(){
        var countIndex= this.roomNoGroup.numChildren;
        for(let i=countIndex-1;i>=countIndex-5;i--){
            var noLab:eui.Label= this.roomNoGroup.getChildAt(i) as eui.Label;
            if(noLab.text!=""&&noLab.text!=null){
                noLab.text="";
            }
        }

    }

    private onDel(){
        var countIndex= this.roomNoGroup.numChildren;
        for(let i=countIndex-1;i>=countIndex-5;i--){
            var noLab:eui.Label= this.roomNoGroup.getChildAt(i) as eui.Label;
            if(noLab.text!=""&&noLab.text!=null){
                noLab.text="";
                break;
            }
        }
    }

    private onNoGroup(e:egret.TouchEvent){    
        if((e.target instanceof eui.Button)){
            var noBtn:eui.Button = e.target;
            console.log(noBtn.label)
            if(noBtn.label!=null&&noBtn.label!=""){

            var countIndex= this.roomNoGroup.numChildren;
            for(let i=5;i<countIndex;i++){
            var noLab:eui.Label= this.roomNoGroup.getChildAt(i) as eui.Label;
            if(noLab.text==""||noLab.text==null){
                noLab.text=noBtn.label;
                if(i==(countIndex-1)){
                   // App.SceneManager.runScene(SceneConst.ThridGameScene);
                    this.sendData();
                }
                break;
            }
        }

            }
        }

    }



    private sendData(){
         // {'cmd':'6','msg':[{'roomId':" "}]}
        var roomId:string="";
        var countIndex= this.roomNoGroup.numChildren;
         for(let i=5;i<countIndex;i++){
             var noLab:eui.Label= this.roomNoGroup.getChildAt(i) as eui.Label;
             roomId+=noLab.text;
        }         
        ProtocolData.cmd6.msg[0].roomId=roomId;
        App.gameSocket.send(ProtocolData.cmd6);
        this.hide();        
    }

    /**从场景中移除*/
    protected onRemove() {

    }
}