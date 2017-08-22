/**
 *
 * @author 
 *
 */
class HallSettingPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [
            MsgID.USER.LOGIN,];
	}
	
    protected onReady() {
        // this.panel.Toggle_Music.selected=LocalStorageUtil.Instance.allowMusic;   
        // this.panel.Toggle_Sound.selected= LocalStorageUtil.Instance.allowEffect;
    }

    protected onShow(){//在界面上显示出来
        // var a = egret.localStorage.getItem("Toggle_Music");
		// this.mPanel.musicTg.visible = !!!a;
        // var b = egret.localStorage.getItem("Toggle_Effect");
		// this.mPanel.soundTg.visible = !!!b;
        this.mPanel.musicTg.visible = LocalStorageUtil.Instance.allowMusic;
        this.mPanel.soundTg.visible = LocalStorageUtil.Instance.allowEffect;
    }
	
    private on90_event(event: egret.Event): void {
        console.log("on90_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
    }


    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_AboutUs,egret.TouchEvent.TOUCH_END,this.Btn_AboutUsClick,this);
        this.AddClickEvent(this.mPanel.Btn_LogOut,egret.TouchEvent.TOUCH_END, this.Btn_LogOutClick, this);
        this.AddClickEvent(this.mPanel.Btn_CloseSetting,egret.TouchEvent.TOUCH_END,this.Btn_CloseSettingClick,this);
        this.AddClickEvent(this.mPanel.Toggle_Music,egret.TouchEvent.TOUCH_END,this.Toggle_MusicClick,this);
        this.AddClickEvent(this.mPanel.Toggle_Sound,egret.TouchEvent.TOUCH_END, this.Toggle_SoundClick, this);
        this.AddClickEvent(this.mPanel.Btn_CloseGame,egret.TouchEvent.TOUCH_END,this.Btn_CloseGameClick,this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_AboutUs,egret.TouchEvent.TOUCH_END,this.Btn_AboutUsClick,this);
        this.RemoveClickEvent(this.mPanel.Btn_LogOut,egret.TouchEvent.TOUCH_END, this.Btn_LogOutClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseSetting,egret.TouchEvent.TOUCH_END,this.Btn_CloseSettingClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_Music,egret.TouchEvent.TOUCH_END,this.Toggle_MusicClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_Sound,egret.TouchEvent.TOUCH_END, this.Toggle_SoundClick, this);
        this.RemoveClickEvent(this.mPanel.Btn_CloseGame,egret.TouchEvent.TOUCH_END,this.Btn_CloseGameClick,this);
    }

    private Btn_CloseGameClick(){
        DeviceUtils.CloseGame();
    }
    private Btn_AboutUsClick(){
        KFControllerMgr.getCtl(PanelName.AboutPanel).show();
    }
    private Btn_CloseSettingClick(){
        this.mPanel.hide();
    }

    //获取转换view
    private get panel():HallSettingPanel{
        return this.mPanel;
    }
    ///登出
    private Btn_LogOutClick(){
        // egret.localStorage.setItem("","");
        // egret.localStorage.setItem("","");

        KFControllerMgr.showTips("断开连接...",1,0,()=>{
             WebSocketMgr.getInstance().closeSocket();
        });
        StatisticalAnalysis.UploadData(StatisticalAnalysis.statisticalPoint.game_logout);
    }

    //背景音乐开关
    private Toggle_MusicClick(){
        this.mPanel.musicTg.visible = !this.mPanel.musicTg.visible;
        // SoundMgr.Instance.allowPlayBGM = this.panel.Toggle_Music.selected;  
        SoundMgr.Instance.allowPlayBGM = this.mPanel.musicTg.visible;
    }
    //音效开关
    private Toggle_SoundClick(){       
        this.mPanel.soundTg.visible = !this.mPanel.soundTg.visible;
    //    SoundMgr.Instance.allowPlayEffect = this.panel.Toggle_Sound.selected;        
       SoundMgr.Instance.allowPlayEffect = this.mPanel.soundTg.visible;
    }


}