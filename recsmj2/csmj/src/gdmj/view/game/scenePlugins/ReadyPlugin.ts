/**
 * 准备
 * @author xiongjian 
 * 2017-7-10
 */
class ReadyPlugin extends BaseUI {
    private gameScene: ReGameScene;

    public readyGroup: eui.Group;
    public readyBtn: eui.Button;

    /**准备按钮list*/
    private readyList1 = [];
    private readyList2 = [];

    public readyList = [];       //所有玩家准备图标

    public constructor() {
        super();
        this.skinName = "readyPlugin";
    }

    protected childrenCreated() {
        this.gameScene = <ReGameScene>App.SceneManager.getScene(SceneConst.ReGameScene);
        for (var i = 0; i < 4; i++) {
            // 准备
            this.readyList1.push(this.readyGroup.getChildAt(i));
            this.readyList2.push(this.readyGroup.getChildAt(i + 4));
        }

    }

    protected onEnable() {
        this.readyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReadyTouch, this);
        this.init();
    }

    /**
     * 初始化
     */
    public init() {
        this.hideAllReady();
    }

    /**显示准备图标*/
    public showReady(pos: UserPosition) {
        //最初状态准备按钮
        if (this.gameScene.headPlugin.headUIList[0].x != this.gameScene.headPlugin.headUIPointXlist[0]) {
            this.readyList = this.readyList1;
            this.readyGroup.addChild(this.readyList[pos]);
        } else {
            this.readyList = this.readyList2;
            this.readyGroup.addChild(this.readyList[pos]);
        }
    }

    /**隐藏准备图标*/
    public hideReady(pos: UserPosition) {
        if (this.readyList.length) {

            //最初状态准备按钮
            if (this.gameScene.headPlugin.headUIList[0].x != this.gameScene.headPlugin.headUIPointXlist[0]) {
                this.readyList = this.readyList1;
                var ready = this.readyList[pos];
                ready && ready.parent && ready.parent.removeChild(ready);
            } else {
                this.readyList = this.readyList2;
                var ready = this.readyList[pos];
                ready && ready.parent && ready.parent.removeChild(ready);
            }


        }
    }

    /**设置已进入房间玩家状态*/
    public setUserReady() {
        var userList = App.DataCenter.UserInfo.userList;
        console.log("设置玩家状态,用户列表:", userList);
        for (var key in userList) {
            var userVo: UserVO = userList[key];
            //设置准备
            if (userVo.checkState(PLAYER_STATE.READY)) {
                this.showReady(userVo.userPos);
            } else {
                if (userVo.userPos == UserPosition.Down) {
                    this.showReadyBtn();
                }
            }
        }
    }

    //隐藏准备按钮
    public hideReadyBtn() {
        this.readyBtn.parent && this.readyBtn.parent.removeChild(this.readyBtn);
    }

    /**设置准备按钮*/
    public showReadyBtn() {
        this.readyGroup.addChild(this.readyBtn);
        this.readyBtn.visible = true;
    }

    /**隐藏所有准备图标*/
    public hideAllReady() {
        this.readyGroup.removeChildren();
    }

    //设置所有准备图标的visible
    public setAllReadyVisible() {
        var len = this.readyList.length;
        for (var i = 0; i < len; i++) {
            this.readyList[i].visible = true;
        }
    }

    /**准备 */
    private onReadyTouch() {
        this.gameScene.resetGame();
        this.gameScene.rectPlugin.onInitPosition();
        this.gameScene.sendReady();
    }

        /**重置 */
    public restUI() {
        this.setAllReadyVisible();
    }
}