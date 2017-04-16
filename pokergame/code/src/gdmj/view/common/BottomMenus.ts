/**按钮类型 */
enum BottomName{
    friends,       	//朋际
    mall,			//商城
    record,			//记录
    knapsack,		//背包
	share,			//分享
	set,			//设置
	email,			//邮箱
	me,				//我
	take			//玩法
}


/**
 * 底部菜单
 * @author eyanlong
 * @date 2017/2/21
 */

class BottomMenus extends eui.Component{
	public abc:number = 1;

	public static NAME:string = "BottomMenus";
	/**朋际 */
	private hall_friends:eui.Button;
	/**商城 */
	private hall_mall:eui.Button;
	/**记录 */
	private hall_record:eui.Button;
	/**背包 */
	private hall_knapsack:eui.Button;
	/**分享 */
	private hall_share:eui.Button;
	/**更多 */
	private hall_more:eui.Button;
	/**设置 */
	private hall_set:eui.Button;
	/**邮箱 */
	private hall_email:eui.Button;
	/**我 */
	private hall_me:eui.Button;
	/**玩法 */
	private hall_take:eui.Button;
	/**二级弹窗 */
	private two_pop:eui.Group;
	/**按钮回调 */
	public ok:Function;
	/**执行环境对象 */
	public thisObject;

	public constructor() {
		super();
		this.touchEnabled = true;
	}

	/**
     * 将底部菜单显示到页面
     * @param page 页面
     */ 
    public showMenu(page:any){
        page.addChild(this);
		this.x = 0;
		this.y = App.StageUtils.stageHeight-120;    
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

	/**底部按钮的响应 */
	private onTouch(e: egret.TouchEvent) {
		var buttomName:BottomName;
    	switch(e.target) {
            case this.hall_friends:
				buttomName = BottomName.friends;
                break;
			case this.hall_mall:
               	buttomName = BottomName.mall;
                break;
			case this.hall_record:
				buttomName = BottomName.record;
                break;
			case this.hall_knapsack:
               	buttomName = BottomName.knapsack;
                break;
			case this.hall_share:
               	buttomName = BottomName.share;
                break;
			case this.hall_more:
				this.showPop();
                return;
			case this.hall_set:
               	buttomName = BottomName.set;
                break;
			case this.hall_email:
               	buttomName = BottomName.email;
                break;
			case this.hall_me:
               	buttomName = BottomName.me;
                break;
			case this.hall_take:
               	buttomName = BottomName.take;
                break;
        }
		this.ok(buttomName) && (this.ok.call(buttomName));
    }

	/**二级弹窗的现实关闭 */
	private showPop(){
		this.two_pop.visible = !this.two_pop.visible;
	}


}