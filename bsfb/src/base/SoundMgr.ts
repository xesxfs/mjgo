class SoundMgr extends SingleClass{

	public constructor() {
		super();
	}
	public static get Instance():SoundMgr{
		return this.getInstance();
	}

	private bgmChannel:egret.SoundChannel;
	private bgmChannel2:egret.SoundChannel;
	private _allowPlayEffect:boolean = true;
	private _allowPlayBGM:boolean = true;
	private _bgmVolume:number =1;
	private _effectVolume:number=1;
	private suffix:string="mp3"

	///////////////BGM//////////////////
	public static newbgm:string ="NewBGM_mp3";
	public static lztbbgm:string = "lztbBGM_mp3"

	//////////////Effect/////////////////////
	public static dragonBallToEffect = "DragonBallToEffect_mp3";
	public static gemSpreadOutEffect = "GemSpreadOutEffect_mp3";
	public static openEffect         = "OpenEffect_mp3";
	public static winEffect          = "WinEffect_mp3";
	public static bombeEffect        = "BombeEffect_mp3";
	public static downEffect     	 = "downEffect_mp3";
	public static helpEffect         = "Help_mp3";
	public static betEffect	         = "Bet_mp3";
	public static buttonEffect	     = "button_mp3";
	public static chooseEffect	     = "choose_mp3";
	


	public playNewBgm(){
		if(!this.allowPlayBGM){
			return;
		}
		this.playBGM(SoundMgr.newbgm);
	}

	public playLztbBgm(){
		if(!this.allowPlayBGM){
			return;
		}
		this.playBGM(SoundMgr.lztbbgm);	
	}

	public playDragonBallToEffect(){
		if(!this.allowPlayEffect){
			return;
		}
		this.playEffect(SoundMgr.dragonBallToEffect);
	}

	public palyGemSpreadOutEffect(){
		if(!this.allowPlayEffect){
			return;
		}
		this.playEffect(SoundMgr.gemSpreadOutEffect);
	}

	public playOpenEffect(){
		if(!this.allowPlayEffect){
			return;
		}
		this.playEffect(SoundMgr.openEffect);
	}

	public playHelpEffect(){
		this.playEffect(SoundMgr.helpEffect);
	}

	public playBetEffect(){
		this.playEffect(SoundMgr.betEffect);
	}

	public playWinEffect(){
		if(!this.allowPlayEffect){
			return;
		}
		this.playEffect(SoundMgr.winEffect);
	}

	public playBombeEffect(){
		if(!this.allowPlayEffect){
			return;
		}
		this.playEffect(SoundMgr.bombeEffect);
	}

	public playDownEffect(){
		if(!this.allowPlayEffect||this.bgmChannel2)return;		
		var bgm:egret.Sound=RES.getRes(SoundMgr.downEffect);
		if(bgm){
			bgm.type =egret.Sound.MUSIC;	
			this.bgmChannel2=bgm.play(0,1);
			this.bgmChannel2.volume=this.bgmVolume;
		}
		
	}
	public stopDownEffect(){
		if(this.bgmChannel2){
			this.bgmChannel2.stop();
			this.bgmChannel2 = null;
		}
	}

	public playBGM(bgmName:string,startTime:number=0,loops:number=Number.MAX_VALUE){
		//不允许播放 或者 正在播放
		if(!this.allowPlayBGM||this.bgmChannel)return;		
		var bgm:egret.Sound=RES.getRes(bgmName);
		if(bgm){
			bgm.type =egret.Sound.MUSIC;	
			this.bgmChannel=bgm.play(startTime,loops);
			this.bgmChannel.volume=this.bgmVolume;
		}
	}

	public stopBGM(){
		if(this.bgmChannel){
			this.bgmChannel.stop();
			this.bgmChannel =null;
		}
	}

	public playEffect(soundName:string,startTime:number=0,loops:number=1){

		if(!this.allowPlayEffect)return;
		var sound:egret.Sound = RES.getRes(soundName);
		if(sound){			
			sound.type=egret.Sound.EFFECT;
			this.effectVolume = this.effectVolume;
			sound.play(startTime,loops);
		}
	}

	public set allowPlayBGM(bAllow:boolean){
		this._allowPlayBGM =bAllow;
		if(this.allowPlayBGM){
			this.playBGM(SoundMgr.newbgm);
		}else{
			this.stopBGM();
		}
		LocalStorageUtil.Instance.allowMusic = bAllow;
	}

	public get allowPlayBGM():boolean{
		return this._allowPlayBGM;
	}

	public set allowPlayEffect(bAllow:boolean){
		this._allowPlayEffect = bAllow;
		LocalStorageUtil.Instance.allowEffect = bAllow;
	}

	public get allowPlayEffect():boolean{
		return this._allowPlayEffect
	}

	public get bgmVolume():number{
		return this._bgmVolume;
	}

	public set bgmVolume(nVolume:number){
		this._bgmVolume =nVolume;
		if(this.bgmChannel){
			this.bgmChannel.volume =nVolume;
		}
	}

	public set effectVolume(nVolume:number){
		this._effectVolume =nVolume;
	}

	public get effectVolume():number{
		return this._effectVolume;
	}

	public set musicToggle(value:boolean){
		var a = Number(value);
		egret.localStorage.setItem("Toggle_Music",a+"");
	}

	public get musicToggle():boolean{
		var a = egret.localStorage.getItem("Toggle_Music");
		this.allowPlayBGM = !!!a
		return this.allowPlayBGM;
	}

	public set effectToggle(value:boolean){
		var a = Number(value);
		egret.localStorage.setItem("Toggle_Effect",a+"");
	}

	public get effectToggle():boolean{
		var a = egret.localStorage.getItem("Toggle_Effect");
		this.allowPlayEffect = a=="1"?true:false;
		return this.allowPlayEffect;
	}

}