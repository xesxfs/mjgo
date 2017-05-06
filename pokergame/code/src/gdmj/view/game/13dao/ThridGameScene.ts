/**
 * 13道游戏界面
 * @author chenwei 
 * @date 2016/6/28
 */
class ThridGameScene extends BaseScene {
    protected ctrl: ThridGameController;       //游戏控制模块
    public constructor() {
        super();
        this.skinName = "ThridGameSceneSkin";
    }
    private backHallBtn:eui.Button;
    protected childrenCreated() {
       }

    protected onEnable() {
         this.backHallBtn.addEventListener("touchTap",()=>{App.SceneManager.runScene(SceneConst.HallScene)},this);
        console.log("进入13道游戏_________________________________________");

    }

}



