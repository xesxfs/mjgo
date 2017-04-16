/**
 * 游戏内商城
 * @author eyanlong 
 * @date 2017/2/24
 */
class GameMall extends BasePanel {
	public constructor() {
		super();
    	this.skinName = "GameMallSkin";
	}
	protected childrenCreated() {
		this.setBottom();
	}
}