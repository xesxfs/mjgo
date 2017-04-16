/**
 * 表情动画
 * @author chenkai 
 * @date 2016/7/5
 */
class FaceMovie extends BitmapMovie{
    public chatID: number = 0;            //表情id
    public type: number = CHAT_TYPE.Face; //聊天类型

	public constructor() {
    	super();
	}
}
