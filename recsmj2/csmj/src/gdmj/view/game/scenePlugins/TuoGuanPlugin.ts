/**
 * 托管插件
 * @author xiongjian 
 * @date 2017/6/29
 */
class TuoGuanPlugin extends BaseUI {

    public tuoGuanGroup: eui.Group; //托管Group

    public constructor() {
        super();
        this.skinName = "tuoGuanPlugin";
    }

    /**组件创建完毕*/
    protected childrenCreated() {
        this.tuoGuanGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuoGuanTouch, this);
    }


    /**添加到场景中*/
    protected onEnable() {
        this.init();
    }


    /**
     * 初始化
     */
    private init() {
        this.hideGroup();
    }

    public showGroup() {
        this.tuoGuanGroup.visible = true;
    }

    public hideGroup() {
        this.tuoGuanGroup.visible = false;
    }
    //点击取消托管
    private onTuoGuanTouch() {
        console.log("发送取消托管");
        App.getController(ReGameController.NAME).sendTuoGuan(false);
    }
}