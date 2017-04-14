/**
 *	二级邮箱界面
 * @author eyanlong
 *	2017/2/23
 */
class EmailTwoPanel extends BasePanel {
	/**返回 */
	private email_two_back:eui.Button;
	/**领取 */
	private email_two_receive:eui.Button;
	/**附件 */
	private enclosure:eui.Group;
	/**领取按钮切换 */
	private emailTwoStack:eui.ViewStack;
	/**邮件标题 */
	private email_title:eui.Label;
	/**邮件内容 */
	private email_content:eui.Label;
	/**附件标题 */
	private email_name:eui.Label;

	public constructor() {
		super();
        this.skinName = "EmailTwoSkin";
	}

	/**添加到场景中*/
    protected onEnable() {
		this.email_two_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		this.email_two_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receive, this);
    }

    /**从场景中移除*/
    protected onRemove() {
        this.email_two_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		this.email_two_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receive, this);
    }

	/**设置内容 */
	public setData(data:any){
		console.log(data.reward.length);
		if(data.reward.length<1){
			this.enclosure.visible = false;
		}else{
			this.enclosure.visible = true;
			this.email_name.text = data.reward[0].name+"("+data.reward[0].quantity+")";
		}
		if(data.is_receive == 0){
			this.emailTwoStack.selectedIndex = 0;
		}else{
			this.emailTwoStack.selectedIndex = 1;
		}
		this.email_title.text = data.title;
		this.email_content.text = data.content;
	}

	/**领取附件 */
	protected receive(){
		this.emailTwoStack.selectedIndex = 1;
		var ctrl = new HallController();
		ctrl.sendEmailGoods(1);
	}

	protected back(){
		this.hide();
	}
}