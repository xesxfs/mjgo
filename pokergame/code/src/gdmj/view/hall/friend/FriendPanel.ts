/**
 *	好友房列表界面
 * @author eyanlong
 *	2017/2/23
 */
class FriendPanel extends BasePanel{
	private friendList: eui.List;		//list
	private friend_back:eui.Button; // 返回
	/**加入房间 */
	private room_number:eui.Button;


	public constructor() {
		super();
        this.skinName = "FriendPanelSkin";
	}

		/**添加到场景中*/
    protected onEnable() {
		this.setData(20);
		this.friend_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		this.room_number.addEventListener(egret.TouchEvent.TOUCH_TAP, this.roomNumber, this);
    }

    /**从场景中移除*/
    protected onRemove() {
		this.friend_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		this.room_number.addEventListener(egret.TouchEvent.TOUCH_TAP, this.roomNumber, this);
    }


	/**设置数据 */
    private setData(num:number) {
        let ac = new eui.ArrayCollection();
        let arr = [];
        for(var i = 0; i < num; i++) {
			let dataObj = new FriendItemData();
			/**测试 */
			if(i == 4) {
				dataObj.ownerName = "孤绝天下无敌";
			}
			if(i == 7) {
				dataObj.ownerName = "孤绝";
			}
			dataObj.existTime = 300 + i%3 + 1;
			dataObj.existPlayer = i%4+1;
			dataObj.totalRound = (i%5+i)%3+1;

            arr.push(dataObj);
        }
        ac.source = arr;
		arr = this.sortFunc(arr);
        this.friendList.dataProvider = ac;
        this.friendList.itemRenderer = FriendItem;
    }

	/**多条件排序 */
	private sortFunc(arr:Array<FriendItemData>):Array<FriendItemData> {
		if(arr.length < 1) {
			return [];
		}

		arr.sort((a,b)=>{
			if (a.existPlayer == b.existPlayer) {
				if(a.existTime == b.existTime) {
					return a.totalRound - b.totalRound;
				}
				return b.existTime - a.existTime;
			}
			return b.existPlayer - a.existPlayer;
		});

		for(var i = 0;i < arr.length;i ++) {
			if(arr[0].existPlayer >= 4) {
				arr.push( arr.shift() )
			}
		}

		return arr;
	}

	/**输入加入房间 */
	private roomNumber(){
		 App.PanelManager.open(PanelConst.JoinNumber);
	}	

	/**返回 */
	private back(){
		this.hide();
	}

}