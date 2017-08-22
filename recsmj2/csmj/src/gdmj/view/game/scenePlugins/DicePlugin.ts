/**
 * 骰子插件
 * @author xiongjian 
 * @date 2017/7/3
 */
class DicePlugin extends BaseUI {

    public diceGroup: eui.Group;
    public game_dice: DiceAnim;

    private diceStayTime: number = 2000;  //筛子播放完成后停留的时间ms

    private gameScene :ReGameScene 

    public constructor() {
        super();
        this.skinName = "dicePlugin";
    }

    protected childrenCreated() {
        this.gameScene = App.SceneManager.getScene(SceneConst.ReGameScene);
    }

    /**添加到场景中*/
    protected onEnable() {
        this.init();
    }

        /**
     * 初始化
     */
    public init (){
        this.hideDiceAnim();
    }

    //播放骰子动画
    public playDiceAnim(d1,d2) {
        console.log("滚骰子");
        var dice1 = d1;
        var dice2 = d2;
        if (dice1 != null) {
            this.game_dice.playAnimation(dice1, dice2);
            this.diceGroup.addChild(this.game_dice);
            this.game_dice.addEventListener(egret.Event.COMPLETE, this.onDiceAnimComplete, this);
            App.SoundManager.playEffect(SoundManager.shazi);
        } else {
            console.error("骰子数据为null");
        }
    }


    //骰子播放结束，分配庄家
    private onDiceAnimComplete() {
        egret.Tween.get(this).wait(this.diceStayTime).call(() => {
            this.hideDiceAnim();
            this.gameScene.showZhuang();
        }, this);
    }

    //起手胡打骰子
    public playQiShouDice(dice1, dice2) {
        if (dice1 && dice2) {
            this.game_dice.playAnimation(dice1, dice2);
            this.diceGroup.addChild(this.game_dice);
            this.game_dice.addEventListener(egret.Event.COMPLETE, this.onDiceAnimCompleteX, this);
        }
    }

    //起手胡播放结束，扎鸟
    private onDiceAnimCompleteX() {
        egret.Tween.get(this).wait(this.diceStayTime).call(() => {
            this.hideZhaNiaoDiceAnim();
            this.gameScene.showZhaNiao();
        }, this);
    }

    //隐藏筛子动画
    public hideDiceAnim() {
        this.game_dice.removeEventListener(egret.Event.COMPLETE, this.onDiceAnimComplete, this);
        // this.diceAnimList[0].removeEventListener(egret.Event.COMPLETE,this.onDiceAnimComplete,this);
        this.diceGroup.removeChildren();
    }

    //隐藏扎鸟筛子动画
    public hideZhaNiaoDiceAnim() {
        this.game_dice.removeEventListener(egret.Event.COMPLETE, this.onDiceAnimCompleteX, this);
        // this.diceAnimList[0].removeEventListener(egret.Event.COMPLETE,this.onDiceAnimComplete,this);
        this.diceGroup.removeChildren();
    }


}