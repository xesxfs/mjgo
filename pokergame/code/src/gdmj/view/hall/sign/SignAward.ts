/**
 * 每日签到奖励图标
 * @author chenwei
 *
 */
class SignAward extends BaseUI{
   public id:number = 0;              //id (1代表第一天)	
   private dateLabel:eui.Label;       //第x天
   private prizeImg:eui.Image;        //奖品图片
   private signedImg:eui.Image;       //已签到图标(红色的勾)
   private blueFrame:eui.Image;       //被选中时的蓝色外框

   public constructor() {
    	super();
	}

	protected childrenCreated(){
		this.touchChildren = false;
		this.signedImg.visible = false;
		this.blueFrame.visible = false;
	}
   
   /**
	* 更新UI
	* @signcount 签到天数
	* @info 奖励列表
    */
   public updateInfo(signcount:number, info:any){   
	   var id:string = info.id;                     //id 1代表第一天
	   var title:string = info.title;               //邮件标题
	   var rewardname:string = info.reward[0].name; //奖品名
	   var count:number = info.reward[0].count;     //奖品数量

	   this.id = parseInt(id);
	   this.dateLabel.text = "第" + NumberTool.formatCapital(parseInt(id)) + "天";
	   this.prizeImg.source = ItemIcon.getLotteryIcon(rewardname);
	   this.signedImg.visible = (this.id <= signcount);
	   if (this.id == signcount+1){
	       this.setNowSigning(true)
	   }
   }

   /**
	* 设置签到状态
	* @signed 是否已签到
    */
   public setSigned(signed:boolean){       
	   this.signedImg.visible = true;
       this.blueFrame.visible=false
   }  
   
   /**
    * 当前签到状态
    * @param signed
    */
   public setNowSigning(signed: boolean){
       this.blueFrame.visible = true;
   }
   
}
