/**
 *
 * @author chenwei
 * 2016/08/03
 */
class ScoreDetailItem extends eui.ItemRenderer{
	public constructor() {
    	super();

	}
    private lookBtn: eui.Image;
    private shareBtn: eui.Image;
    private hightLight:eui.Image;
    private p1Lab:eui.Label;
    private p2Lab: eui.Label;
    private p3Lab: eui.Label;
    private p4Lab: eui.Label;    

    
    
    protected dataChanged(){
        
        let maxLab=this.p1Lab,max=0;
        let pdata = [this.p1Lab,this.p2Lab,this.p3Lab,this.p4Lab];      
        pdata.forEach((lab)=>{
            this.setHight(lab)
            if(max<parseInt(lab.text)){
                max=parseInt(lab.text)
                maxLab=lab;
            }            
            })                
            this.setHight(maxLab,true);        
    }
    
    protected createChildren(){
        this.lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLookTouch,this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareTouch,this);
    }
    
    private setHight(lab:eui.Label,h:Boolean=false){        
        if(h){
            lab.size = 52;
            lab.textColor = 0xFFF000;
            lab.strokeColor = 0x8B0201;
            lab.stroke = 3;
            this.hightLight.y = lab.y - 26;
        }else{
            lab.size = 30;
            lab.textColor = 0xFFFFFF;
            lab.strokeColor = 0;
            lab.stroke = 0;
        }

    }
    
    private setHightlight(){        
    }
    
    
    private onLookTouch(e: egret.TouchEvent) {
        
        var http = new HttpSender();
        var sendData = ProtocolHttp.send_z_replayCombatGain;
        sendData.param.replaycode = parseInt(this.data.replayCode);
        http.send(sendData,this.complete,this);        

    }
    
    private onShareTouch(e: egret.TouchEvent) {
        var sharePanel:SharePanel = App.PanelManager.open(PanelConst.SharePanel);
        //sharePanel.showShareReplay();
        App.getInstance().weiXinShare(null,null,this.data.replayCode);        
//        Tips.info("该局回放码为:"+this.data.replayCode)
    }
    
    private complete(data) {

        if(!data.ret) {
            let replayData = data.data.replay;
//            App.mainModule.hallScene.intoGameDesk(true,replayData);

        } else {
            Tips.info(data.desc);
        }

    }
}
