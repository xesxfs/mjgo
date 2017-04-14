class FriendItemData {

	/**房主名 */
	public ownerName:string;
	/**头像资源地址 */
	public headUrl:string;
	/**总局数 */
	public totalRound:number;
	/**已有人数 */
	public existPlayer:number;
	/**房间存在时间 */
	public existTime:number;

	public constructor(data = null) {
		this.init(data);
	}

	/**设置默认值或数据 */
	private init(data:any) {
		this.ownerName = "孤绝天下";
		this.headUrl = "game_headbg1_png";
		this.totalRound = 4;
		this.existPlayer = 1;
		this.existTime = 300;
	}

	public setData(data:any) {

	}
}