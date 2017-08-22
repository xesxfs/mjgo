/**
 *
 * @author 
 *
 */
class GameHelpPanelController extends KFController{
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.Client.BSFBHELPCHANGE,];
	}
	
    protected onReady() {
    }

    private changeType(value){
        if(value=="返还系数"){
            this.israte = true;
        }else{
            this.israte = false;
        }
        this.showPage();
    }

    protected onShow(){//在界面上显示出来
        this.Toogle_IntroduceClick();
        this.mPanel.DropDown.visible = false;
        this.mPanel.page5Tip.visible = false;
    }
	
    private on80008_event(event: egret.Event): void {
        console.log("on80008_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        // var datastr = msg.getDataStr();
        this.changeType(msg);
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.AddClickEvent(this.mPanel.Toogle_Introduce,egret.TouchEvent.CHANGE,this.Toogle_IntroduceClick,this,0);
        this.AddClickEvent(this.mPanel.Toggle_Explain,egret.TouchEvent.CHANGE,this.Toggle_ExplainClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_PageDown,egret.TouchEvent.TOUCH_END,this.Btn_PageDownClick,this,0);
        this.AddClickEvent(this.mPanel.Btn_PageUp,egret.TouchEvent.TOUCH_END,this.Btn_PageUpClick,this,0);

    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.Btn_CloseClick,this);
        this.RemoveClickEvent(this.mPanel.Toogle_Introduce,egret.TouchEvent.CHANGE,this.Toogle_IntroduceClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_Explain,egret.TouchEvent.CHANGE,this.Toggle_ExplainClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_PageDown,egret.TouchEvent.TOUCH_END,this.Btn_PageDownClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_PageUp,egret.TouchEvent.TOUCH_END,this.Btn_PageUpClick,this);
    }
    
    private currentPage = 1;
    private israte = true;
    private Toogle_IntroduceClick(){
        this.currentPage = 1;
        this.showPage();
        this.disableBut(this.mPanel.Btn_PageUp);
        this.enableBut(this.mPanel.Btn_PageDown);
    }
    private Toggle_ExplainClick(){
        this.currentPage = 2;
        this.showPage();
        this.enableBut(this.mPanel.Btn_PageUp);
        this.enableBut(this.mPanel.Btn_PageDown);
    }
    private Btn_PageDownClick(){
        this.currentPage++;
        if(this.currentPage>=5){
            this.currentPage =5;
            this.disableBut(this.mPanel.Btn_PageDown);
        }
        this.enableBut(this.mPanel.Btn_PageUp);
        this.showPage();
    }
    private Btn_PageUpClick(){
        this.currentPage--;
        if(this.currentPage<=1){
            this.currentPage = 1;
            this.disableBut(this.mPanel.Btn_PageUp);
        }
         this.enableBut(this.mPanel.Btn_PageDown);
        this.showPage();
    }


    private showPage(){
        this.mPanel.page5Tip.visible = false;
        if(this.currentPage==1){
            this.mPanel.pageGroups.visible = false;
            this.mPanel.textScroller.visible = true;
            this.mPanel.Toogle_Introduce.selected = true;
        }else if(this.currentPage==5){
            this.mPanel.pageGroups.visible = true;
            this.mPanel.textScroller.visible = false;
            this.mPanel.Toggle_Explain.selected = true;
            this.mPanel.page5Tip.visible = true;
            var len = this.mPanel.pageGroups.numChildren;
            for(var i=0;i<len;i++){
                this.mPanel.pageGroups.getChildAt(i).visible = false;
            }
             this.mPanel.pageGroups.getChildAt(3).visible = true;
        }else{
            this.mPanel.pageGroups.visible = true;
            this.mPanel.textScroller.visible = false;
            this.mPanel.Toggle_Explain.selected = true;

            var len = this.mPanel.pageGroups.numChildren;
            for(var i=0;i<len;i++){
                this.mPanel.pageGroups.getChildAt(i).visible = false;
            }
            if(this.israte){
                this.mPanel.pageGroups.getChildAt(this.currentPage-2).visible = true;
            }else{
                this.mPanel.pageGroups.getChildAt(this.currentPage+2).visible = true;
            }
            this.mPanel.DropDown.visible = true;
            
        }
        if(this.currentPage==5||this.currentPage==1){
                this.mPanel.DropDown.visible = false;
            }
        this.mPanel.pages.text = this.currentPage+"/5";
    }

    private Btn_CloseClick(){
        this.mPanel.hide();
    }
}