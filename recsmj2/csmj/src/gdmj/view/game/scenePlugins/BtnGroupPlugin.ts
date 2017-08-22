/**
 * 按钮插件
 * @author xiongjian
 * 2017-7-10
 */
class BtnGroupPlugin extends BaseUI {

    public btnGroup: eui.Group;
    public readyBtn1: eui.Button;
    public jixuBtn: eui.Button;
    public xujuBtn: eui.Button;

    private gameScene :ReGameScene;

    public constructor() {
        super();
        this.skinName = "btnGroupPlugin";
    }

    protected childrenCreated() {
        this.gameScene =<ReGameScene> App.SceneManager.getScene(SceneConst.ReGameScene);
    }

    protected onEnable() {
        this.jixuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJixuTouch, this);
        this.xujuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onXujuTouch, this);
        this.readyBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReady1Touch, this);
        this.init();
    }

    /**
     * 初始化
     */
    public init() {
        this.hideBtnGroup();
    }

    /**显示组合按钮 */
    public showBtnGroup(type) {
        switch (type) {
            //准备
            case 0:
                this.btnGroup.visible = true;
                this.readyBtn1.visible = true;
                this.jixuBtn.visible = false;
                this.xujuBtn.visible = false;
                break;
            //继续
            case 1:
                this.btnGroup.visible = true;
                this.readyBtn1.visible = false;
                this.jixuBtn.visible = true;
                this.xujuBtn.visible = false;
                break;
            //续局
            case 2:
                this.btnGroup.visible = true;
                this.readyBtn1.visible = false;
                this.jixuBtn.visible = false;
                this.xujuBtn.visible = true;
                break;
        }
    }
    /**隐藏按钮组合 */
    public hideBtnGroup() {
        this.btnGroup.visible = false;
    }

    /**重置 */
    public restUI() {
        this.hideBtnGroup();                //隐藏按钮组合
    }
    //结算后准备
    private onReady1Touch() {
        this.hideBtnGroup();
        this.gameScene.resetGame();
        this.gameScene.rectPlugin.onInitPosition();
        this.gameScene.sendReady();

    }
        //继续
    private onJixuTouch() {
        this.gameScene.resetGame();
        this.gameScene.headPlugin.resetHeadUI();
        this.gameScene.discPlugin.hideDisc();
        this.gameScene.roomTypePlugin.showFriendRoom();
    }

    //续局
    private onXujuTouch() {
        this.gameScene.resetGame();
        this.gameScene.headPlugin.resetHeadUI();
        this.gameScene.discPlugin.hideDisc();
        this.gameScene.roomTypePlugin.showFriendRoom();
    }

}