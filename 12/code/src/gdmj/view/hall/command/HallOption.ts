/**
 *
 * @author chenwei
 *
 */
class HallOption extends BaseUI{
	public constructor() {
    	super()
	}
	private menuGroup:eui.Group;
	private menuMask:eui.Rect;
    private downArrow:eui.Button;
    private upArrow:eui.Button;	
	private rankBtn:eui.Button;
	private openDeskBtn:eui.Button;
	private enterRoomBtn:eui.Button;
	private goHomeBtn:eui.Button;  
    protected childrenCreated() {
        this.init();
    }
    protected onEnable() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        egret.setTimeout(() => {this.onUp() },this,10000);
    }
    
    private init(){
        this.menuGroup.mask=this.menuMask;
    }
    
    private onTouch(e:egret.TouchEvent){
        switch(e.target){
            case this.downArrow: 
                this.onDown();
                break;
            case this.upArrow: 
                this.onUp()
                break;
            case this.rankBtn:
                App.PanelManager.open(PanelConst.RankPanel1);
                break;
            case this.openDeskBtn:       
                this.openDesk();
                break;
            case this.enterRoomBtn:
            console.log("game state...",App.DataCenter.gameState);
                if(App.DataCenter.gameState==GameState.Ready){
                    
                    var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
                    messageBox.rightTitle("狠心离去");
                    messageBox.leftTitle("算了");
                    messageBox.ok = () => {
                     App.PanelManager.open(PanelConst.InputRoom);
                    };
                    messageBox.showMsg("游戏即将开始,是否确认要前往其他房间?");
                }else if(App.DataCenter.gameState==GameState.Playing){
                    Tips.info("游戏已开始,完成本局再走吧！")
                } else {
                    App.PanelManager.open(PanelConst.InputRoom);
                }
       
                break;
            case this.goHomeBtn:
                this.goHome();
                break;
        }
    }
    
    
    private onUp() {
        egret.Tween.get(this.menuGroup).to({ y: -this.menuGroup.height },400,egret.Ease.quadIn).call(() => {
            this.upArrow.visible = false;
            this.downArrow.visible = true;
        });
    }

    private onDown() {
        egret.Tween.get(this.menuGroup).to({ y: 0 },400,egret.Ease.quadOut).call(() => {
            this.upArrow.visible = true;
            this.downArrow.visible = false;
        });
    }
    
    private openDesk(){
        let curDesk:DeskInfo = App.DataCenter.roomInfo.getCurDesk();
        if(curDesk&&curDesk.ownerID != App.DataCenter.UserInfo.getMyUserVo().userID) {
            Tips.info("您在别人的房间不能开新桌!!");
            return;
        }
        let hall: HallScene = App.SceneManager.getScene(SceneConst.HallScene);
        hall.openDesk(); 
    }
    
    private goHome(){
        let curDesk: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
        if(curDesk && curDesk.ownerID == App.DataCenter.UserInfo.getMyUserVo().userID) {
            Tips.info("您现在已经在家里!!");
            return;
        }        
        if(App.DataCenter.gameState == GameState.Ready) {
            var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
            messageBox.rightTitle("狠心离去");
            messageBox.leftTitle("算了");
            messageBox.showMsg("游戏即将开始,是否确认要回家?");
            messageBox.ok = () => {
                App.EventManager.sendEvent(EventConst.GameStateChange,GameState.Free);
                let hall: HallScene = App.SceneManager.getScene(SceneConst.HallScene);
                hall.sendSelfRoom();
            };            
        } else if(App.DataCenter.gameState == GameState.Playing) {
            Tips.info("游戏已开始,完成本局再走吧！")
        } else {
            let hall: HallScene = App.SceneManager.getScene(SceneConst.HallScene);
            hall.sendSelfRoom();
        }
      
    }
    
}
