/**
 * 背包界面
 * @author eyanlong 
 * @date 2017/2/22
 */
class BackpackPanel extends BasePanel{
	/**返回按钮 */
	private mall_back:eui.Button;
	/**项目名字 */
	private backName:eui.Label;
	public backpackList:eui.List;

	public constructor() {
		super();
		this.skinName = "BackpackPanelSkin";
	}

	protected onEnable() {
        this.mall_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    }

    protected onRemove() {
        this.mall_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    }

	public setData(list: Array<any>){
		let ac = new eui.ArrayCollection();
        ac.source = list;
        this.backpackList.dataProvider = ac;
        this.backpackList.itemRenderer = BackpackItem;
	}

	/**返回 */
	protected back(){
		this.hide();
	}

}