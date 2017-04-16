/**
 * @author xiongjian
 * 
 * 2016-12-29
 */

class SetPanel extends BasePanel{
     public constructor() {
        super();
        this.skinName = "SetPanelSkin"
    }

    private closeBtn: eui.Button;
  
    private limitLab: eui.Label;

    private set_guangdong_speak: eui.RadioButton;
    private set_putong_speak: eui.RadioButton;

    private set_music_toggle_switch: eui.ToggleSwitch; //音乐开关
 

    private set_sound_toggle_switch: eui.ToggleSwitch;   //音效开关
 

    private set_bration_toggle_switch: eui.ToggleSwitch; //震动开关

   
  

    /**震动选项容器 Native下才会显示*/
    private shakeGroup:eui.Group;

   protected childrenCreated() {
        
        this.initView();
    }

    /** 添加到场景*/
    protected onEnable() {
   
        this.set_guangdong_speak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.guangdongOrPTong, this);
        this.set_putong_speak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.guangdongOrPTong, this);
        this.set_music_toggle_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.set_sound_toggle_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.set_bration_toggle_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);

        
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
       

       
        this.setCenter();
        //Native下才有震动功能
        this.shakeGroup.visible = App.DeviceUtils.IsNative;
    }

    /** 从场景中移除*/
    protected onRemove() {
      
        this.set_guangdong_speak.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.guangdongOrPTong, this);
        this.set_putong_speak.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.guangdongOrPTong, this);
        this.set_music_toggle_switch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.set_sound_toggle_switch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.set_bration_toggle_switch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);

       
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        
       
    }

    /**设置界面值 */
    private initView() {
        this.set_music_toggle_switch.selected = App.SoundManager.allowPlayBGM;
        this.set_sound_toggle_switch.selected = App.SoundManager.allowPlayEffect;

        if (App.SoundManager.isGuangDongSpeak) {
            this.set_guangdong_speak.selected = true
        } else {
            this.set_guangdong_speak.selected = false;
        }

        console.log("gdmj=" + App.SoundManager.isGuangDongSpeak)
    }

     /**设置页面（广东话和普通话按钮处理） */
    private guangdongOrPTong(event: egret.TouchEvent) {
        switch (event.target) {
            case this.set_guangdong_speak:
                App.SoundManager.isGuangDongSpeak = true;

                //游戏中加载广东话
                if(App.SceneManager.getCurScene() instanceof GameScene){
                    RES.loadGroup(AssetConst.Sound_GuangDong);
                }
                break;

            case this.set_putong_speak:
                App.SoundManager.isGuangDongSpeak = false;

                //游戏中加载普通话
                if(App.SceneManager.getCurScene() instanceof GameScene){
                    RES.loadGroup(AssetConst.Sound_PuTong);
                }
                break;

            default:
                break;
        }
    }


    /** 设置页面(开关监听) */
    private setToggleSwitchTouch(event: egret.TouchEvent) {
        switch (event.target) {
            case this.set_music_toggle_switch:  //背景音乐

                var musicEvent = event.target;
                var music = musicEvent.selected;
                App.SoundManager.allowPlayBGM = music;
                // if (music) {
                //     (<any>this.set_music_toggle_switch).set_music_toggle_switch_open.textColor = 0xffffff;
                //     (<any>this.set_music_toggle_switch).set_music_toggle_switch_shut.textColor = 0x743d0d;
                // } else {
                //     (<any>this.set_music_toggle_switch).set_music_toggle_switch_open.textColor = 0x743d0d;
                //     (<any>this.set_music_toggle_switch).set_music_toggle_switch_shut.textColor = 0xffffff;
                // }

                //游戏中开关背景音乐
                if(App.SoundManager.allowPlayBGM && App.SceneManager.getCurScene() instanceof GameScene){
                    RES.loadGroup(AssetConst.Sound_BGM);
//                    App.ResUtils.loadGroupQuiet(AssetConst.Sound_BGM,2);
                }else{
                    App.SoundManager.stopBGM();
                }

                console.log("music=" + ":" + music + ";" + App.SoundManager.allowPlayBGM);
                break;


            case this.set_sound_toggle_switch:  //音效

                var soundEvent = event.target;
                var sound = soundEvent.selected;
                App.SoundManager.allowPlayEffect = sound;
                // if (sound) {               
                //     (<any>this.set_sound_toggle_switch).set_sound_toggle_switch_open.textColor = 0xffffff;
                //     (<any>this.set_sound_toggle_switch).set_sound_toggle_switch_shut.textColor = 0x743d0d;
                // } else {
                //     (<any>this.set_sound_toggle_switch).set_sound_toggle_switch_open.textColor = 0x743d0d;
                //     (<any>this.set_sound_toggle_switch).set_sound_toggle_switch_shut.textColor = 0xffffff;
                // }

                //游戏中加载音效
                if(App.SoundManager.allowPlayEffect && App.SceneManager.getCurScene() instanceof GameScene){
                    if(App.SoundManager.isGuangDongSpeak){
                        RES.loadGroup(AssetConst.Sound_GuangDong);
                    }else{
                        RES.loadGroup(AssetConst.Sound_PuTong);
                    }
                    RES.loadGroup(AssetConst.Sound_Other);
                }


                console.log("music=" + ":" + sound + ";" + App.SoundManager.allowPlayEffect);
                break;


            case this.set_bration_toggle_switch:   //震动
                var brationEvent = event.target;
                var bration = brationEvent.selected;

                // if (bration) {
                //     (<any>this.set_bration_toggle_switch).set_bration_toggle_switch_open.textColor = 0xffffff;
                //     (<any>this.set_bration_toggle_switch).set_bration_toggle_switch_shut.textColor = 0x743d0d;
                // } else {
                //     (<any>this.set_bration_toggle_switch).set_bration_toggle_switch_open.textColor = 0x743d0d;
                //     (<any>this.set_bration_toggle_switch).set_bration_toggle_switch_shut.textColor = 0xffffff;
                // }

                //发送native震动事件
                bration && App.EventManager.sendEvent(App.EVENT_NATIVE_SHAKE);

                break;

            default:
                break;
        }
    }
  /**关闭*/
    private onCloseBtn(e: egret.Event) {
        this.hide()
    }

}