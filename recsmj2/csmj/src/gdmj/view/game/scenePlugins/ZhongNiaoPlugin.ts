/**
 * 中鸟插件
 * @author xiongjian 
 * @date 2017/6/29
 */
class ZhongNiaoPlugin extends BaseUI {

    public zhongniaoGroup: eui.Group;   //中鸟Group
    public zhaniaoGroup: eui.Group;     //扎鸟Group
    public zhaNiaoBg: eui.Image;        //扎鸟底图

    private zhongNiaoList = [];  //中鸟list
    private zhaniaoList = [];    //中鸟牌list

    public constructor() {
        super();
        this.skinName = "zhongNiaoPlugin";
    }

    /**组件创建完毕*/
    protected childrenCreated() {
        for (let i = 0; i < 4; i++) {
            this.zhongNiaoList.push(this.zhongniaoGroup.getChildAt(i));
        }
    }

    /**添加到场景中*/
    protected onEnable() {
        this.init();
    }


    /**
     * 初始化
     */
    private init(){
        this.hideZhongNiaoUI();
    }

    /**隐藏中鸟UI */
    public hideZhongNiaoUI() {
        this.zhaniaoGroup.visible = false;
        var cardLen = this.zhaniaoList.length;
        //清理中鸟的牌
        for (var i = 0; i < cardLen; i++) {
            let zhaniao = this.zhaniaoList[i];
            zhaniao.parent && zhaniao.parent.removeChild(zhaniao);
        }
        this.zhaniaoList = [];

        var len = this.zhongNiaoList.length;
        for (var i = 0; i < len; i++) {
            let zhongniao = this.zhongNiaoList[i];
            zhongniao.parent && zhongniao.parent.removeChild(zhongniao);
        }
    }

    /**添加中鸟的牌 */
    public addZhongNiao(cardList) {
        //显示扎鸟的牌
        var len = cardList.length;
        var card: Card;
        var cardFactory: CardFactory = CardFactory.getInstance();
        var cardScale = 1.2;
        var cardWidhth = 52 * cardScale + 2;
        var initX = (this.zhaniaoGroup.width - cardWidhth * len) / 2 - 3;
        var initY = 15;


        for (var i = 0; i < cardList.length; i++) {
            card = cardFactory.getOutCard(cardList[i], UserPosition.Down);
            card.x = initX + cardWidhth * i;
            card.y = initY;
            card.scaleX = cardScale;
            card.scaleY = cardScale;
            this.zhaniaoList.push(card);
            this.zhaniaoGroup.addChild(card);
        }
        this.zhaNiaoBg.width = cardWidhth * cardList.length + 20;
        this.zhaniaoGroup.visible = true;
    }

    /**显示中鸟 */
    public showZhongniao(pos: UserPosition) {
        //显示中鸟图片
        this.zhongniaoGroup.addChild(this.zhongNiaoList[pos]);
    }
}