/**
 *	好友房间item
 * @author eyanlong
 *  2017/02/23
 */

class FriendItem extends eui.ItemRenderer {
	protected headImg:eui.Image;
	protected nickLab:eui.Label;
	protected totalLab:eui.Label;
	protected nowLab:eui.Label;
	protected fullImg:eui.Image;
	protected friendItemBt:eui.Button;
	protected timeLab:eui.Label;

	protected itemData:any;

	public constructor() {
		super();
		this.skinName = "FriendItemSkin";
	}

	public dataChanged():void{
		var iData:FriendItemData = this.itemData = this.data;
		this.nickLab.text = StringTool.formatNickName(iData.ownerName);
		this.totalLab.text = iData.totalRound.toString();
		this.nowLab.text = iData.existPlayer + "/4";
		this.timeLab.text = iData.existTime.toString();
		if(iData.existPlayer < 4) {
			this.friendItemBt.visible = true;
			this.fullImg.visible = false;
		}
		else {
			this.friendItemBt.visible = false;
			this.fullImg.visible = true;
		}
	}

	protected childrenCreated() {
        this.friendItemBt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

	/**加入好友房间 */
	private onTouch(e: egret.TouchEvent) {
		App.PanelManager.open(PanelConst.JoinRoomPanel,()=>{
            let but=  App.PanelManager.getPanel(PanelConst.JoinRoomPanel) as JoinRoomPanel;
        },this,true,true,this.itemData);
    }

}