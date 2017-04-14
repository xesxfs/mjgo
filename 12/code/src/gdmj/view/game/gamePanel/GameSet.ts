/**
 * 游戏内设置
 * @author eyanlong 
 * @date 2017/2/24
 */
class GameSet extends BasePanel {
	public constructor() {
		super();
    	this.skinName = "GameSetSkin";
	}
	protected childrenCreated() {
		this.setBottom();
	}
}