/**
 *
 * @author 
 *
 */
class AntiAddictionPanelController extends KFController{ 
    private exitToHall = false;
	protected init(){
    	super.init();
        this.EventsList = [
            ];
	}
	
    protected onReady() {

    }

    protected onShow(){//在界面上显示出来
        this.exitToHall = false;
        var jsonData = JSON.parse(GlobalClass.HallClass.fangChenMiResult);
        if (jsonData["ret"] == 1){
            var action = jsonData["action"]+"";
            this.mPanel.label_title.text = jsonData["info"]["title"];
            this.mPanel.label_content.text = jsonData["info"]["content"];

            if (action == "0") //仅显示
           {     this.mPanel.Btn_Left.visible = false;
                this.mPanel.Btn_Right.visible = false;
                this.mPanel.Btn_Sure.visible = true;
                this.mPanel.label_tip.visible = false;
                this.exitToHall = false;
            }else if (action == "4") ////防沉迷提示
            {
                this.mPanel.Btn_Left.visible = false;
                this.mPanel.Btn_Right.visible = false;
                this.mPanel.Btn_Sure.visible = true;
                this.mPanel.label_tip.visible = false;
                this.exitToHall = false;
            }else if (action == "2"||action == "5"){
                if (!GlobalClass.HallClass.bIDSecurity_Binding) //还没有进行身份认证
                {
                    this.mPanel.label_tip.text = LocalizationMgr.getText(TipTexts.A1102);
                    this.mPanel.Btn_Left.visible = true;
                    this.mPanel.Btn_Right.visible = true;
                    this.mPanel.Btn_Sure.visible = false;
                    this.mPanel.label_tip.visible = true;
                    this.mPanel.Btn_Left.getChildAt(1).text = LocalizationMgr.getText("身份认证");
                    this.exitToHall = true;
                }else if (!GlobalClass.HallClass.bAgeLegal) //进行了身份认证，但是未满18周岁
                {
                       this.mPanel.label_tip.text = LocalizationMgr.getText(TipTexts.A1101);

                        this.mPanel.Btn_Left.visible = false;
                        this.mPanel.Btn_Right.visible = false;
                        this.mPanel.Btn_Sure.visible = true;
                        this.mPanel.label_tip.visible = true;
                        this.exitToHall = true;
                }
            }
        }
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
        this.AddClickEvent(this.mPanel.Btn_Right,egret.TouchEvent.TOUCH_END,this.Btn_RightClick,this);
        this.AddClickEvent(this.mPanel.Btn_Left,egret.TouchEvent.TOUCH_END,this.Btn_LeftClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Sure,egret.TouchEvent.TOUCH_END,this.Btn_SureClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Right,egret.TouchEvent.TOUCH_END,this.Btn_RightClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_Left,egret.TouchEvent.TOUCH_END,this.Btn_LeftClick,this);
    }
    

    private Btn_SureClick(){
        if(KFSceneManager.getInstance().getRuningSceneName()=="HallScene"){
            this.mPanel.hide();
        }else{
            if(this.exitToHall){
                KFSceneManager.getInstance().replaceScene(SceneName.Hall);
            }else{
                this.mPanel.hide();
            }
        }
    }
    private Btn_RightClick(){
        if(KFSceneManager.getInstance().getRuningSceneName()!="HallScene"){
            if(this.exitToHall){
                KFSceneManager.getInstance().replaceScene(SceneName.Hall);
            }else{
                this.mPanel.hide();
            }
        }else{
            this.mPanel.hide();
        }
    }
    private Btn_LeftClick(){
        KFControllerMgr.getCtl(PanelName.IDAuthenticatPanel).setCB(()=>{
            this.mPanel.hide();
        },this).show();
    }
}