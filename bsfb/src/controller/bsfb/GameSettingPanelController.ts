/**
 *
 * @author 
 *
 */
class GameSettingPanelController extends KFController{ 
    
	
	protected init(){
    	super.init();
        this.EventsList = [];
	}
	
    protected onReady() {
    }

    protected onShow(){//在界面上显示出来
        this.panel.Toggle_Music.selected = LocalStorageUtil.Instance.allowMusic;
        this.panel.Toggle_Sound.selected = LocalStorageUtil.Instance.allowEffect;
    }


    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_CloseSetting,egret.TouchEvent.TOUCH_END,this.Btn_CloseSettingClick,this);
        this.AddClickEvent(this.mPanel.Toggle_Music,egret.TouchEvent.CHANGE,this.Toggle_MusicClick,this);
        this.AddClickEvent(this.mPanel.Toggle_Sound,egret.TouchEvent.CHANGE, this.Toggle_SoundClick, this);
}

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_CloseSetting,egret.TouchEvent.TOUCH_END,this.Btn_CloseSettingClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_Music,egret.TouchEvent.TOUCH_END,this.Toggle_MusicClick,this);
        this.RemoveClickEvent(this.mPanel.Toggle_Sound,egret.TouchEvent.TOUCH_END, this.Toggle_SoundClick, this);
    }

    private Btn_CloseSettingClick(){
        this.mPanel.hide();
    }

    //获取转换view
    private get panel():GameSettingPanel{
        return this.mPanel;
    }

    //背景音乐开关
    private Toggle_MusicClick(){
        SoundMgr.Instance.allowPlayBGM = this.panel.Toggle_Music.selected;        
    }
    //音效开关
    private Toggle_SoundClick(){       
        SoundMgr.Instance.allowPlayEffect = this.panel.Toggle_Sound.selected;
    }


}