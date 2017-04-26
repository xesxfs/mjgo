/**
 * 游戏界面
 * @author chenkai 
 * @date 2016/6/28
 */
class DKGameScene extends BaseScene {
    protected ctrl: DKGameController;       //游戏控制模块
    public constructor() {
        super();
        this.skinName = "GameSceneSkin";
    }

    protected childrenCreated() {
       }

    protected onEnable() {

        console.log("进入游戏_________________________________________");

    }

}



