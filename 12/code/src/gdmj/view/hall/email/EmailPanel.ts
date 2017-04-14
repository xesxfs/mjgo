/**
 *	邮箱界面
 * @author eyanlong
 *	2017/2/23
 */
class EmailPanel extends BasePanel {
	private one_key_delete: eui.Button;	//一键删除
	private one_key_receive: eui.Button;	//一键领取
	private emailList: eui.List;		//list
	private email_back:eui.Button; // 返回
	private stack_bt:eui.ViewStack;

	public constructor() {
		super();
        this.skinName = "EmailSkin";
	}

	/**添加到场景中*/
    protected onEnable() {
		this.one_key_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteKey, this);
		this.one_key_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveKey, this);
		this.email_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    }

    /**从场景中移除*/
    protected onRemove() {
        this.one_key_delete.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteKey, this);
		this.one_key_receive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveKey, this);
		this.email_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    }

	/**设置数据 */
    public setData(data:any) {
        let ac = new eui.ArrayCollection();
        let arr = [];
        for(var i = 0; i < data.length; i++) {
			let dataObj = new Object();
			dataObj["data"] = data[i];
			if(data[i].is_read == 0){
				this.stack_bt.selectedIndex = 0;
			}
            arr.push(dataObj);
        }
        ac.source = arr;
        this.emailList.dataProvider = ac;
        this.emailList.itemRenderer = EmailItem;
    }

	/**一键删除 */
	private deleteKey(){

	}

	/**一键领取 */
	private receiveKey(){
		this.stack_bt.selectedIndex = 1;
	}

	/**返回 */
	private back(){
		this.hide();
	}
	
}