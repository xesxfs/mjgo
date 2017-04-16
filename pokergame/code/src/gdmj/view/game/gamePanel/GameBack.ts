/**
 * 游戏内背包
 * @author eyanlong 
 * @date 2017/2/24
 */
class GameBack extends BasePanel {
	public constructor() {
		super();
    	this.skinName = "GameBackSkin";
	}
	protected childrenCreated() {
		this.setBottom();
	}
}