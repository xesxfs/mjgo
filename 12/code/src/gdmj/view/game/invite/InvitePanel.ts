/**
 *	邀请好友列表界面
 * @author eyanlong
 *	2017/2/25
 */

class InvitePanel extends BasePanel {
	private inviteList: eui.List;		//list

	public constructor() {
		super();
        this.skinName = "InvitePanelSkin";
	}

	/**添加到场景中*/
    protected onEnable() {
		this.setData(10,false);
		
    }
    /**从场景中移除*/
    protected onRemove() {
		
    }

	/**设置数据 */
    private setData(num:number,open:boolean) {
        let ac = new eui.ArrayCollection();
        let arr = [];
        for(var i = 0; i < num; i++) {
			let dataObj = new Object();
			dataObj["selfScore"] = i;
			dataObj["selfOpen"] = open;
            arr.push(dataObj);
        }
        ac.source = arr;
        this.inviteList.dataProvider = ac;
        this.inviteList.itemRenderer = InviteItem1;
    }



}