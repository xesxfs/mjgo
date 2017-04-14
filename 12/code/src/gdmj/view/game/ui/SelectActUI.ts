/**
 * 操作面板，吃碰杠胡
 * @author chenkai
 * @date 2016/7/11
 */
class SelectActUI extends eui.Component{
    private eatBtn:SelectActBtn;
    private pengBtn:SelectActBtn;
    private gangBtn:SelectActBtn;
    private huBtn:SelectActBtn;
    private passBtn:SelectActBtn;
    private btnList = {};
    public panelWidth = 600; //面板宽度
    private itemWidth = 150;  //按钮宽度
	public bAnGang:boolean = false;  //用于记录暗杠,因为暗杠按钮没有
	private bInitRes:boolean = false;
    
	public constructor() {
    	super();
		this.skinName = "SelectActUISkin";
	}
	
	public childrenCreated(){
        this.btnList[ACT_state.Act_Pass] = this.passBtn;
        this.btnList[ACT_state.Act_Peng] = this.pengBtn;
        this.btnList[ACT_state.Act_Chi] = this.eatBtn;
        this.btnList[ACT_state.Act_Gang] = this.gangBtn;
		this.btnList[ACT_state.Act_AnGang] = this.gangBtn;
        this.btnList[ACT_state.Act_Hu] = this.huBtn;

		
        
        this.removeChildren();
		this.touchEnabled = false;
        
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch ,this);
	}

	private initRes(){
		if(this.bInitRes == false){
			this.bInitRes = true;
			this.passBtn.setActSkin(ACT_act.Act_Pass);
			this.eatBtn.setActSkin(ACT_act.Act_Chi);
			this.pengBtn.setActSkin(ACT_act.Act_Peng);
			this.gangBtn.setActSkin(ACT_act.Act_Gang);
			this.huBtn.setActSkin(ACT_act.Act_Hu);
		}
	}
	
	//点击按钮，传递相应动作
	private onTouch(e:egret.TouchEvent){
    	  if(e.target instanceof SelectActBtn){
        	  for(var key in this.btnList){
            	     if(this.btnList[key] == e.target){
                	     this.dispatchEventWith("sendActEvent", false, parseInt(key));
                	     break;
            	     }
        	  }
    	  }
	}
	
	/**
	 * 根据可行操作，显示操作面板
	 * @param actList 动作列表Act_state (碰、杠、胡等)
	 */ 
	public updateInfo(actList){
		this.initRes();
		var len = actList.length;
		this.bAnGang = false;
    	for(var i=len-1;i>=0;i--){
			var act = actList[i];
			var btn = this.btnList[act];
			if(btn == null){
				console.error("缺少动作操作按钮:",act);
				continue;
			}
			if(act ==ACT_state.Act_AnGang){  //因为没有暗杠的img，所以用杠的按钮，这里用bAngGang标志位表示明暗杠
				this.bAnGang = true;
			}
            this.addChild(btn);
			btn.playAnim();
    	}
    	//按钮居中显示
    	len = this.numChildren;
        var startX: number = this.panelWidth/2 - len*this.itemWidth/2;
    	for(var i=0;i<len;i++){
        	var child = this.getChildAt(i);
            child.x = startX + this.itemWidth*i;
    	}
		//选框居中显示
		
	}

	public hide(){
		for(var key in this.btnList){
			this.btnList[key].stopAnim();
		}
		this.removeChildren();
		this.parent && this.parent.removeChild(this);
	}
	
	
}
