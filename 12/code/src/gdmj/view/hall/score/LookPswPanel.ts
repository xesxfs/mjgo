/**
 *
 * @author chenwei
 * 2016/08/03
 */
class LookPswPanel extends BasePanel{
	public constructor() {
    	super();
        this.skinName ="LookPswPanelSkin1";
	}
    protected onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTouch,this);
//        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTouch,this);
        this.cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTouch,this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOkTouch,this);

        this.lookCodeEdt.addEventListener(egret.FocusEvent.FOCUS_IN,this.lookCodeEditTouch,this);
        this.lookCodeEdt.addEventListener(egret.FocusEvent.FOCUS_OUT,this.lookCodeEditOutTouch,this);
        
        this.setCenter();
    }
    private closeBtn: eui.Button;
    private okBtn: eui.Button;
    private cancleBtn: eui.Button;
    private lookCodeEdt:eui.EditableText;
    private editLabel :eui.Label;

    private closeTouch(e: egret.Event) {

      
        
        this.hide();
    }
    
    private onOkTouch(e:egret.Event){

        if(this.lookCodeEdt.text.length){
            let code=this.lookCodeEdt.text;
            var http = new HttpSender();
            var sendData = ProtocolHttp.send_z_replayCombatGain;
            sendData.param.replaycode =parseInt(code);
            http.send(sendData,this.complete,this);
            
        }else{
            Tips.info("请输入回放码");
        }
        
    }
    
    
    /***
     * 输入框点击
     */
    private lookCodeEditTouch(){
        this.editLabel.visible=false;
    }

    private lookCodeEditOutTouch(){
        if(this.lookCodeEdt.text.length==0){
            this.editLabel.visible=true;
        }
         
    }

    private complete(data){
        
        if(!data.ret){ 
            let replayData = data.data.replay;
           let hallScene:HallScene= App.SceneManager.getScene(SceneConst.HallScene) ;
           hallScene.intoGameDesk(true,replayData);   
                 
            
        }else{
            Tips.info(data.desc);
        }
        
    }
    
}
