/**
 * 动作表情
 * @author chenkai
 * @date 2016/9/5 
 */
class ActFaceUI extends BaseUI{
    private itemGroup:eui.Group;  //道具Group
    private itemList = [];        //道具按钮
    public seatID;                //位置
    
	public constructor() {
    	super();
    	this.skinName = "ActFaceUISkin";
	}
	
    protected childrenCreated() {
        for(var i=0;i<6;i++){
            this.itemList.push(this.itemGroup.getChildAt(i));
        }
    }

    protected onEnable() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    protected onRemove() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }
    
    private onTouch(e:egret.TouchEvent){
        var len = this.itemList.length;
        for(var i=0;i<len;i++){
            if(e.target == this.itemList[i]){
                this.sendActFace(i+1);
                break;
            }
        }
    }
    
    private sendActFace(actFaceId){
        this.hide();
        var itemType:number = actFaceId;
        var toUserid:number = App.DataCenter.UserInfo.getUserBySeatID(this.seatID).userID;
        App.EventManager.sendEvent(GameController.EVENT_SEND_ACT_FACE, itemType, toUserid);
    }

    public hide(){
        this.parent && this.parent.removeChild(this);
    }
}













