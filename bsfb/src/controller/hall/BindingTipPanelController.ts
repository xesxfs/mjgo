/**
 *
 * @author 
 *
 */
class BindingTipPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [];
	}
	
    protected onReady() {

        
    }
	
     protected onShow(){//在界面上显示出来
         this.mPanel.Label_PhoneNum.text =  GlobalClass.HallClass.str_BindingPhone;
    }

     protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END, this.Btn_SureClick,this,0.5);
    }

    protected removeOnClickListener() {
        this.mPanel.Btn_Sure.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.Btn_SureClick,this);
    }

     private Btn_SureClick(){
        this.mPanel.hide();
        if(GlobalClass.HallClass.isOpenSignInPanel && !GlobalClass.UserInfo.isNewbie && GlobalClass.TaskClass.str_VIPStatus == "1" && GlobalClass.UserInfo.str_Hall_isSignIn == "0"){
            
            KFControllerMgr.getCtl(PanelName.MemberPanel).setToggle(2).show();
        }
    }
    
}