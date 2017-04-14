/**
 *	邮件item
 * @author eyanlong
 *  2017/02/23
 */
class EmailItem extends eui.ItemRenderer{
	public constructor() {
    	super();
		this.skinName = "EmailItemSkin";
        this.touchChildren = true;
	}

	/**头部信心 */
	private email_hard:eui.Label;
	/**时间 */
	private email_time:eui.Label;
	/**物品图片 */
	private email_iamge:eui.Image;
	/**底片 */
	private email_bg:eui.Image;

	public dataChanged():void{
		if(this.data.data.is_read==1){
			this.email_bg.source = RES.getRes("hall_box_gray_png");
			if(this.data.data.is_receive == undefined){
				this.email_iamge.source =  RES.getRes("open_envelope_png");
			}else if(this.data.data.is_receive == 1){
				this.email_iamge.source =  RES.getRes("open_gift_png");
			}else{
				this.email_iamge.source =  RES.getRes("gift_png");
			}
		}else{
			this.email_bg.source = RES.getRes("hall_within_box_png");
			if(this.data.data.is_receive == undefined){
				this.email_iamge.source =  RES.getRes("envelope_png");
			}else if(this.data.data.is_receive == 1){
				this.email_iamge.source =  RES.getRes("open_gift_png");
			}else{
				this.email_iamge.source =  RES.getRes("gift_png");
			}
		}
		this.email_hard.text = this.data.data.title;
		this.email_time.text = this.data.data.send_date;
	}

	protected childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }
    private onTouch(e: egret.TouchEvent) {
        var ctrl = new HallController();
		ctrl.sendEmailDetail(this.data.data.id);
    }
}
