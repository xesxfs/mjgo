/**
 * 聊天常用语项
 * @author chenkai
 * @date 2016/7/4
 */
class ChatItem extends eui.ItemRenderer{
    public chatID: number = 0;        //常用语id
    public type:number = 0;           //聊天类型
    public chatLabel:eui.Label;
    
	public constructor() {
    	super();
    	this.touchChildren = false;
	}
}
