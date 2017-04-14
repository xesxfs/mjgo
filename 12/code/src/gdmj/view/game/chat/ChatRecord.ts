/**聊天内容组件 */
class ChatRecord extends eui.ItemRenderer{
	/**他人头像 */
	private heHead:eui.Image;
	/**他人说话内容 */
	private heLabel:eui.Label;
	/**自己头像 */
	private meHead:eui.Image;
	/**自己说话内容 */
	private meLabel:eui.Label;
	/**视图切换 */
	private chatStack:eui.ViewStack;

	public constructor() {
		super();
		this.skinName = "ChatRecordSkin";
	}

	/**
	 * 设置内容
	 * user:是否是自己
	 * record:聊天内容
	 * hard:头像
	 */
	public setRecord(user:boolean = false,record:string,hard:string){
		if (user) {
			this.chatStack.selectedIndex = 1;
			this.meHead.source = hard;
			this.meLabel.text = record;
		} else {
			this.chatStack.selectedIndex = 0;
			this.heHead.source = hard;
			this.heLabel.text = record;
		}
	}





}