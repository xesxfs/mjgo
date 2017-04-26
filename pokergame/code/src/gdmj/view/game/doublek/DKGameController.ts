/**
 * 游戏控制模块
 * @author chenkai
 * @date 2016/11/18
 */
class DKGameController extends BaseController{
	/**游戏模块名*/
	public static NAME:string = "DKGameController";
    /**游戏场景是否初始化完成，用于scene组件创建完毕之前就收到socket消息，此时不能更新组件*/
    public inited:boolean = false;
	/**游戏场景*/
	public gameScene:DKGameScene;
    /**领取救济金*/
    public static EVENT_REV_ALMS:string = "EVENT_REV_ALMS";
    /**离开游戏*/
    public static EVENT_QUIT_GAME:string = "EVENT_QUIT_GAME";
    /**发送聊天*/
    public static EVENT_SEND_CHAT:string = "EVENT_SEND_CHAT";
    /**发送动作表情*/
    public static EVENT_SEND_ACT_FACE:string = "EVENT_SEND_ACT_FACE";
    /**显示游戏场景*/
    public static EVENT_SHOW_GAME_SCENE:string = "EVENT_SHOW_GAME_SCENE";    
    
	public constructor() {
		super();
	}

    //注册模块时调用
	public onRegister(){
		this.addEvent(GameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);

	}

    //注销模块时调用
	public onRemove(){
        this.removeEvent(GameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
	}
	
	/**显示游戏*/
	private showGameScene(){
		
	}

}