/**
 * 创建房间界面
 * @author chenwei
 * @date 2016/6/30
 */
class InputRoomNumPanel extends BasePanel{
	public constructor() {
    	super();
        this.skinName = "InputRoomNumPanelSkin";
	}
	
    /**
     *  6位数字显示 Lab
     */
    private roomNumLab:eui.Label;

    
    /**
     * 0~9 数字按钮
     */
    private oneBtn: eui.Button;
    private twoBtn: eui.Button;
    private threeBtn: eui.Button;
    private fourBtn: eui.Button;
    private fiveBtn: eui.Button;
    private sixBtn: eui.Button;
    private sevenBtn: eui.Button;
    private eightBtn: eui.Button;
    private nineBtn: eui.Button;
    private zeroBtn: eui.Button;
    
    private numberGroup:eui.Group;
    
    /**
     *  重置 删除按钮
     */
    private resetBtn: eui.Button;
    private delBtn: eui.Button;  
    private closeBtn:eui.Button;
    private isFirst:boolean;
    

    private deskCode:string;

    /**
     *  数字输入
     * @param e
     */
    private onNumBtnTouch(e:egret.TouchEvent){      
        
        if(this.isFirst){
            this.isFirst = false;
            this.restData();
        }
        
        if(this.roomNumLab.text.length>5){
            return
        }
        
        if (e.target instanceof eui.Button){
            let numBtn:eui.Button = e.target;
            
            if(numBtn.label!=""){
                this.roomNumLab.text += numBtn.label;
            }
            
            if(this.roomNumLab.text.length == App.DataCenter.UserInfo.getMyUserVo().excluroomCode.length){
                this.deskCode =this.roomNumLab.text;
                this.sendSearchRoom();
                this.roomNumLab.text=""
//                this.roomNumLab.text = this.roomNumLab.text.substr(0,this.roomNumLab.text.length-1);
//                this.hide();
            }
            
        }
    }
    
    //发送搜索房间。之前已进入大厅就连接gamesocket。现在在大厅时gameSocket一定是断开的，所以得先去连接调度服务器。
    private sendSearchRoom(){
       let hscene:HallScene= App.SceneManager.getScene(SceneConst.HallScene);
        hscene.sendSelfRoom(this.deskCode)
    }
    
    /**
     *  删除数字
     * @param e
     */
    private onDelBtnTouch(e: egret.TouchEvent) {      
        this.delNum();
    }
    
    private delNum(){
        
        if (this.roomNumLab.text.length>0){
            this.roomNumLab.text = this.roomNumLab.text.slice(0,this.roomNumLab.text.length-1);
        }

    }

    private onResetBtnTouch(e: egret.TouchEvent) {
        this.restData();
    }
     /**
     *  重置数字
     *   
     */
    private restData(){
        this.roomNumLab.text = ""
    }

    
    protected onEnable() {       
        this.roomNumLab.text ="请输入房间号...";
        this.isFirst = true;
        this.resetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onResetBtnTouch,this);
        this.delBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDelBtnTouch,this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this.numberGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNumBtnTouch,this);
        this.setCenter();

    }

    protected onRemove() {
        this.numberGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onNumBtnTouch,this);
        this.resetBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onResetBtnTouch,this);
        this.delBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onDelBtnTouch,this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
    }

    protected onDestroy() {

    }
}
