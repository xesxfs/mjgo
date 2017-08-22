/**
 * 杠分
 * @author xiongjian 
 * 2017-7-10
 */
class GangFenPlugin extends BaseUI {
    private gameScene: ReGameScene;

    public gangFenGroup: eui.Group;

    private gangZhengList = [];  //杠正分
    private gangFuList = [];     //杠负分
    private gangFenYList = [];   //杠分的y轴位置

    public constructor() {
        super();
        this.skinName = "gangFenPlugin";
    }

    protected childrenCreated() {
        this.gameScene = <ReGameScene>App.SceneManager.getScene(SceneConst.ReGameScene);

              for (var i = 0; i < 4; i++) {

            this.gangZhengList.push(this.gangFenGroup.getChildAt(i));
            this.gangFuList.push(this.gangFenGroup.getChildAt(i + 4));
            this.gangFenYList.push(this.gangZhengList[i].y);

        }
    }

    protected onEnable() {
        this.init();
    }

    /**
     * 初始化
     */
    public init() {
        this.hideAllGangFen();
    }

        //显示杠分
    public showGang(pos: UserPosition, point: number) {
        var gang: eui.BitmapLabel
        if (point > 0) {
            gang = this.gangZhengList[pos];
            gang.text = "+" + point;
        } else if (point < 0) {
            gang = this.gangFuList[pos];
            gang.text = "" + point;
        }
        if (gang) {
            gang.alpha = 1;
            gang.y = this.gangFenYList[pos];
            this.gangFenGroup.addChild(gang);
            egret.Tween.get(gang).wait(1500)
                .to({ y: gang.y - 100, alpha: 0 }, 1000).call(() => {
                    gang.parent && this.gangFenGroup.removeChild(gang);
                });
        }
    }


    //隐藏所有杠分
    public hideAllGangFen() {
        var len = this.gangZhengList.length;
        for (var i = 0; i < len; i++) {
            var gang = this.gangZhengList[i];
            gang.parent && gang.parent.removeChild(gang);

            var gang = this.gangFuList[i];
            gang.parent && gang.parent.removeChild(gang);
        }
    }

        /**重置 */
    public restUI() {
        this.hideAllGangFen();
    }
}