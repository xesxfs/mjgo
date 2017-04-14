/**
 *
 * @author chenwei
 *  2016/07/13
 */
class ScoreItem extends eui.ItemRenderer{
	public constructor() {
    	super();
	}
	private result:string;
	private roomNum:string;
	private playersScore:string;
	private startTime:string;
	
	
    protected childrenCreated(){
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
    }
	
    private onTouch(e:egret.TouchEvent){
        var detail=new ScoreDetailPanel()
        detail.setDeskno(this.data.deskno,this.data.buildDate,this.data.roomid);
        detail.show();
    }
}
