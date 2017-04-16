/**
 *
 * @author chenwei
 *
 */
class BagItem extends eui.ItemRenderer{
	public constructor() {
    	super();
	}	
    private useGroup:eui.Group;
    
    protected createChildren(){  
        super.createChildren();
        this.useGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUse,this);
    }
    
    protected dataChanged() {
        
//        if(this.data["state"] =="using"){
//            this.selected=true;
//            this.invalidateState();
//        }
    }
    
    protected getCurrentState():string{
        
        if(this.data.type=="props")return;
        if(this.selected){
            return "using";
        }else{
            return "unuse";
        }

    }
    
    
    private onUse(e:egret.TouchEvent){        
        switch(this.data.type){
            case "props":
                this.useProps();
                break;
            case "act":
                this.useAct();
                break;
            case "face":
                this.useFace();
                break;
            case "scene":
                this.useScene();
                break;
        }
        
    }
    
    private useProps(){
        
        switch(this.data.propname){
            case "独立型房卡":
//                App.mainModule.hallScene.onCreateRoomTouch(1);
                break;
            case "共付型房卡":
//                App.mainModule.hallScene.onCreateRoomTouch(0);
                break;
        }
    }
    
    
    private useAct(){
        
        switch(this.data.propname) {
            case "专属动作":
                App.DataCenter.BagInfo.act=ItemType.youself
                break;
            case "默认动作":
                App.DataCenter.BagInfo.act = ItemType.default
                break;
            case "VIP动作":
                App.DataCenter.BagInfo.act = ItemType.vip
                break;
        }
    }
    
    private useFace() {
        switch(this.data.propname) {
            case "专属表情":
                App.DataCenter.BagInfo.face = ItemType.youself
                break;
            case "默认表情":
                App.DataCenter.BagInfo.face = ItemType.default
                break;
            case "VIP表情":
                App.DataCenter.BagInfo.face = ItemType.vip
                break;
        }

    }
    
    private useScene() {
        
        switch(this.data.propname) {
            case "专属场景":
                App.DataCenter.BagInfo.scene = ItemType.youself;
                break;
            case "默认场景":
                App.DataCenter.BagInfo.scene = ItemType.default;
                break;
            case "VIP场景":
                App.DataCenter.BagInfo.scene = ItemType.vip;
                break;
        }

    }
    
    
}
