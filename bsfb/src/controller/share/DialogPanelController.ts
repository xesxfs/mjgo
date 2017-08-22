/**
 *
 * @author 
 *
 */
class DialogPanelController extends KFController{ 

    
    

    private cbfun:Function;
    private leftcbfun:Function;
    private step = 0;
    private originStr = "";
    private isstepping = false;
	
	protected init(){
    	super.init();
        this.EventsList = [];
	}
	
    protected onReady() {
    }

    // labelContent:提示框内容
    // durationTime:提示框显示时间 0:不会被关闭 
    // buttonState: 按钮样式， 0： 没有按钮 1：中间一个按钮 2：左右两个按钮 3 左右两个按钮加关闭按钮
    // btnCallBack：按钮回调 样式为3时为右边按钮时间
    public showTip(content: string,duringTime: number = 2,buttonState: number=0,btnCallBack?:Function,title?:string,btnLeftCallBack?:Function,rightTxt?,leftTxt?){
        this.mPanel.Label_Content.text = content;
        this.mPanel.Label_Content.size = 24;
        this.originStr = content;
        if(title!=null){
            this.mPanel.Label_Title.text = LocalizationMgr.getText(title);
        }else{  
            this.mPanel.Label_Title.text = LocalizationMgr.getText("提示");
        }
        if(leftTxt!=null){
            this.mPanel.Btn_Cancle.getChildAt(1).text = LocalizationMgr.getText(leftTxt);
        }else{  
            this.mPanel.Label_Title.text = LocalizationMgr.getText("取消");
        }
        if(rightTxt!=null){
            this.mPanel.Btn_Yes.getChildAt(1).text = LocalizationMgr.getText(rightTxt);
            this.mPanel.Btn_OK.getChildAt(1).text = LocalizationMgr.getText(rightTxt);
        }else{  
            this.mPanel.Label_Title.text = LocalizationMgr.getText("确定");
        }
        if(buttonState == 0){
            this.mPanel.Btn_Yes.visible = false;
            this.mPanel.Btn_OK.visible = false;
            this.mPanel.Btn_Cancle.visible = false;
            this.mPanel.Btn_Close.visible = false;
        }else if(buttonState == 1){
            this.mPanel.Btn_Yes.visible = true;
            this.mPanel.Btn_OK.visible = false;
            this.mPanel.Btn_Cancle.visible = false;
            this.mPanel.Btn_Close.visible = false;
        }else if(buttonState == 2){
            this.mPanel.Btn_Yes.visible = false;
            this.mPanel.Btn_OK.visible = true;
            this.mPanel.Btn_Cancle.visible = true;
            this.mPanel.Btn_Close.visible = false;
        }else if(buttonState == 3){
            this.mPanel.Btn_Yes.visible = false;
            this.mPanel.Btn_OK.visible = true;
            this.mPanel.Btn_Cancle.visible = true;
            this.mPanel.Btn_Close.visible = true;
        }else{
            this.mPanel.Btn_Yes.visible = false;
            this.mPanel.Btn_OK.visible = false;
            this.mPanel.Btn_Cancle.visible = false;
        }
        this.cbfun = btnCallBack;
        this.leftcbfun = btnLeftCallBack;
        
        if(buttonState==0&&duringTime>0){
            duringTime *=1000;
            var timer: egret.Timer = new egret.Timer(duringTime,1);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(event) {
                this.mPanel.hide();
                if(this.cbfun ){
                    this.cbfun ();
                    this.cbfun = null;
                }
            },this);
            timer.start();
        }

        //
        if(buttonState==0&&duringTime==0){
            this.invoke(0.5,this.ContentStep,this);
            this.isstepping = true;
        }else{
            this.isstepping =  false;
        }
        this.show();
    }

    public setContentSize(size){
        this.mPanel.Label_Content.size = size;
    }

    private ContentStep(){
        if(this.isstepping){
            if(this.step<3){
                this.mPanel.Label_Content.text = this.mPanel.Label_Content.text + ".";
            }else{
                this.step = 0;
                this.mPanel.Label_Content.text = this.originStr;
            }
            this.invoke(0.5,this.ContentStep,this);
            this.step++;
        }
    }
    
     protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Yes,egret.TouchEvent.TOUCH_END,this.Btn_YesClick,this);
        this.AddClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_END, this.Btn_OKClick, this);
        this.AddClickEvent(this.mPanel.Btn_Cancle,egret.TouchEvent.TOUCH_END,this.Btn_CancleClick,this);
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Yes,egret.TouchEvent.TOUCH_END,this.Btn_YesClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_OK,egret.TouchEvent.TOUCH_END, this.Btn_OKClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_Cancle,egret.TouchEvent.TOUCH_END,this.Btn_CancleClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
    }

    private Btn_CloseClick(){
        this.mPanel.hide();
        this.cbfun = null;
        this.leftcbfun = null;
    }

    private Btn_YesClick(){
        this.mPanel.hide();
        if(this.cbfun!=null){
            this.cbfun();
            this.cbfun = null;
            // this.mPanel.hide();
        }
    }

    private Btn_OKClick(){
        this.mPanel.hide();
        if(this.cbfun!=null){
            this.cbfun(); 
        }
    }

    private Btn_CancleClick(){
        this.mPanel.hide();
        if(this.leftcbfun==null){
            // this.mPanel.hide();
            this.cbfun = null;
        }else{
            this.leftcbfun();
            this.leftcbfun = null;
        }
    }
}