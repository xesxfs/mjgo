class NewFeedBackPanel extends BasePanel{
	//限制字数
	private numberWords:number = 150;
	private numberWord:eui.Label;
	//提示文字
	private promptLabel:eui.Label;
	//输入文字
	private feedback:eui.EditableText;
	//发送按钮
	private feedBtn: eui.Button;
	//关闭按钮
	private closeBtn:eui.Button;

	public constructor() {
		super();
        this.skinName = "NewFeedBackPanelSkin"
	}

	 /**添加场景*/
	protected onEnable(){
		//有文本输入
		this.feedback.addEventListener(egret.Event.CHANGE, this.feedbackChange, this);
		//获得焦点
		this.feedback.addEventListener(egret.FocusEvent.FOCUS_IN, this.feedbackIn, this);
		//发送按钮
		this.feedBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFeed, this);
		//关闭按钮
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBt, this);
		this.setCenter();
	}
	/**删除场景 */
    protected onRemove(){
		//有文本输入
		this.feedback.removeEventListener(egret.Event.CHANGE, this.feedbackChange, this);
		//获得焦点
		this.feedback.removeEventListener(egret.FocusEvent.FOCUS_IN, this.feedbackIn, this);
		//发送按钮
		this.feedBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFeed, this);
		//关闭按钮
		this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBt, this);
		this.closeBt();
	}

	/**限制字数*/
	private feedbackChange(){
		this.numberWords = 150 - this.feedback.text.length;
		if (this.numberWords>=0) {
			this.numberWord.text = this.numberWords+"";
		} else {
			this.feedback.text = this.feedback.text.substr(0,150);
			this.numberWord.text = "0";
		}
	}

	/**提示文字的隐藏 */
	private feedbackIn(){
		this.promptLabel.visible=false;
	}
	/**关闭按钮的相应 */
	private closeBt(){
		this.feedback.text = "";
		this.numberWords = 150;
		this.numberWord.text = "150";
		this.promptLabel.visible=true;
		this.hide();
	}

	 /**发送反馈内容 */
    private onFeed(e: egret.Event) {
        let len = this.feedback.text.length;
        if (len > 0) {
            var hall: HallController = App.getController(HallController.NAME);          
            //encode用户输入内容，避免特殊符号引起的错误
			var feedBackStr = encodeURIComponent(this.feedback.text);
			feedBackStr = encodeURIComponent(feedBackStr);
            hall.sendFeedbackReq(feedBackStr)
        } else {
            Tips.info("请先填写您的反馈内容！！")
        }
    }

    /**反馈回调 */
    public feedBack() {
        Tips.info("您的反馈内容已接收，我们会努力改进！");
		this.closeBt();
    }
}