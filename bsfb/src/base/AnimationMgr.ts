enum DiamondType{
	jewel1_Agate = 0,jewel1_Amber,jewel1_Black,jewel1_Green,jewel1_White,
	jewel2_Amethyst,jewel2_CatEye,jewel2_emerald,jewel2_Jade,jewel2_Pearl,
	jewel3_Diamond,jewel3_Green,jewel3_Ruby,jewel3_Sapphire,jewel3_Topaz,digger,boom,brick
}

enum aniType{
	useProps=0,dropdown,pocker0,pocker1,pocker2,pocker3,pocker4,pocker5,boom,holeCover
}
enum skeletonType{
	BSFB_label_1,//第一关
	BSFB_label_2,//第二关
	BSFB_label_3,//第三关
	Bsfb_Go_Slot,//五星获胜/宝石累积奖
	BSFB_go_Lztb,//进入龙珠探宝
	BSFB_ZhongJiang,//宝石累积奖
	BSFB_Slot,
	Wxhh_TimeCountDown,//五星倒计时
	Wxhh_win,
	Wxhh_kuang_1,
	Wxhh_kuang_2,
	DHT_CountDown,
	DHT_youlose,
	DHT_YouWin,
	Dice_Opponent_Shake,
	Dice_Opponent_Open,
	Dice_Self_shake,
	Dice_Self_Open,
	Dice_Self_Look_1,
	Dice_Self_Look_2,
}
class AnimationMgr {
	private static instance: AnimationMgr;
	private mcDataFactory1:egret.MovieClipDataFactory;
	private mcDataFactory2:egret.MovieClipDataFactory;
	private mcDataFactory3:egret.MovieClipDataFactory;
	private mcDataFactory4:egret.MovieClipDataFactory;
	private mcDataFactory5:egret.MovieClipDataFactory;
	private mcDataFactory6:egret.MovieClipDataFactory;

	private mcDataFactory7:egret.MovieClipDataFactory;//自动使用道具，硬币爆开动画

	private mcDataFactory8:egret.MovieClipDataFactory;
	private mcDataFactory9:egret.MovieClipDataFactory;

	private dragonFactory:dragonBones.EgretFactory;


    private scaleNum = 0.33;
    public static getInstance(): AnimationMgr {
        if(this.instance == null) {
            this.instance = new AnimationMgr();
        }
        return this.instance;
    }

	private BSFBCB;
	private BSFBHaveRead = false;
	public loadbsfbAni(cb:Function,thisobj:any){
		if(!this.BSFBHaveRead){
			this.BSFBCB = (event:RES.ResourceEvent)=>{
			if (event.groupName == "bsfbclip") {
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.BSFBCB, this);
				this.BSFBCB = null;
				this.mcDataFactory7 = new egret.MovieClipDataFactory(RES.getRes("bsfbClip_json"), RES.getRes("bsfbClip_png"));
				cb.call(thisobj);
				this.BSFBHaveRead = true;
			}
			};
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.BSFBCB , this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onDiamondResourceLoadError, this);
			RES.loadGroup("bsfbclip");
		}
	}
	public unloadBSFBAni(){
		this.mcDataFactory7 = null;
		this.BSFBHaveRead = false;
	}

	private wxCb;
	private WXRead = false;
	public loadwxAni(cb:Function,thisobj:any){
		if(!this.WXRead){
			this.wxCb = (event:RES.ResourceEvent)=>{
			if (event.groupName == "wxhhclip") {
			 RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.wxCb, this);
			 this.wxCb = null;
			 this.mcDataFactory8 = new egret.MovieClipDataFactory(RES.getRes("WXHH1_json"), RES.getRes("WXHH1_png"));
			 this.mcDataFactory9 = new egret.MovieClipDataFactory(RES.getRes("WXHH2_json"), RES.getRes("WXHH2_png"));
			 cb.call(thisobj);
			 this.WXRead = true;
			}
			};
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.wxCb , this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onDiamondResourceLoadError, this);
			RES.loadGroup("wxhhclip");
		}
	}
	public unloadwxAni(){
		this.mcDataFactory8 = null;
		this.mcDataFactory9 = null;
		this.WXRead = false;
	}

	

	private DiamondCB;
	private diamondHaveRead = false;
	public loadDiamond(cb?:Function,thisobj?:any){
		if(!this.diamondHaveRead){
			this.DiamondCB = (event:RES.ResourceEvent)=>{
			if (event.groupName == "DiamondClip") {
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.DiamondCB, this);
				this.DiamondCB = null;
				console.log("diamondhaveLoad");
				this.mcDataFactory1 = new egret.MovieClipDataFactory(RES.getRes("diamondclip1_json"), RES.getRes("diamondclip1_png"));
				this.mcDataFactory2 = new egret.MovieClipDataFactory(RES.getRes("diamondclip2_json"), RES.getRes("diamondclip2_png"));
				this.mcDataFactory3 = new egret.MovieClipDataFactory(RES.getRes("diamondclip3_json"), RES.getRes("diamondclip3_png"));
				this.mcDataFactory4 = new egret.MovieClipDataFactory(RES.getRes("diamondclip4_json"), RES.getRes("diamondclip4_png"));
				this.mcDataFactory5 = new egret.MovieClipDataFactory(RES.getRes("diamondclip5_json"), RES.getRes("diamondclip5_png"));
				this.mcDataFactory6 = new egret.MovieClipDataFactory(RES.getRes("brick_json"), RES.getRes("brick_png"));
				this.mcDataFactory1.enableCache = true;
				this.mcDataFactory2.enableCache = true;
				this.mcDataFactory3.enableCache = true;
				this.mcDataFactory4.enableCache = true;
				this.mcDataFactory5.enableCache = true;
				this.mcDataFactory6.enableCache = true;
				if(cb!=null){
					cb.call(thisobj);
				}
				this.diamondHaveRead = true;
			}
			};
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.DiamondCB , this);

			RES.loadGroup("DiamondClip");
		}else{
			if(cb!=null){
				cb.call(thisobj);
			}
		}
    }
	public unloadDiamond(){
		this.mcDataFactory1 = null;
		this.mcDataFactory2 = null;
		this.mcDataFactory3 = null;
		this.mcDataFactory4 = null;
		this.mcDataFactory5 = null;
		this.mcDataFactory6 = null;
		this.diamondHaveRead = false;
	}

	private skeletonCB;
	private skeletonHaveRead = false;
	public loadSkeleton(cb?:Function,thisobj?:any){
		if(!this.skeletonHaveRead){
			this.skeletonCB = (event:RES.ResourceEvent)=>{
			if (event.groupName == "skeleton") {
				
			 RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.skeletonCB, this);
			 this.skeletonCB = null;
            this.dragonFactory = new dragonBones.EgretFactory();
			this.dragonFactory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(RES.getRes("BS_Project_ske_json")));
			this.dragonFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(RES.getRes("BS_Project_tex_png"), RES.getRes("BS_Project_tex_json")));
			this.skeletonHaveRead = true;
			if(cb!=null){
				cb.call(thisobj);
			}
		 }
		};
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.skeletonCB, this);

		egret.Ticker.getInstance().register(  
      		this.skeletonTickeFun,this
			);
        RES.loadGroup("skeleton");
		}
	}
	private skeletonTickeFun(frameTime:number){
		dragonBones.WorldClock.clock.advanceTime(0.02);
	}
	public unloadSkeleton(){
		this.dragonFactory = null;
		this.skeletonHaveRead = false;
		egret.Ticker.getInstance().unregister(this.skeletonTickeFun,this);
	}
    private onDiamondResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        // this.onDiamondResourceLoadComplete(event);
    }

	public getSkeleton(Type:skeletonType,posx:number=0,posy:number=0,FastMode:boolean=true):dragonBones.Armature{
		var name = skeletonType[Type];
		if(FastMode){
			var armature:dragonBones.FastArmature = this.dragonFactory.buildFastArmature("Armature"); //构建FastArmature
			armature.enableAnimationCache(30);  //开启数据缓存，30代表采样帧频，推荐设置为12~30，达到性能和动画流畅度的最佳平衡点。
		}else{
			var armature = this.dragonFactory.buildArmature("Armature");
		}
		armature.animation.gotoAndStop(name,-1);
		dragonBones.WorldClock.clock.add(armature);
		var clip = armature.display;
		clip.x = posx;
		clip.y = posy;
		return armature;
	}

	public getAnimation(Type:aniType,posx:number=0,posy:number=0,scale:number=1):egret.MovieClip{
		var name = aniType[Type];
		var clip;
		switch(Type){
			case aniType.useProps:
			clip = this.mcDataFactory7.generateMovieClipData(name);
			break;
			case aniType.dropdown:
			clip = this.mcDataFactory7.generateMovieClipData(name);
			break;
			case aniType.pocker0:
			clip = this.mcDataFactory8.generateMovieClipData(name);
			break;
			case aniType.pocker1:
			clip = this.mcDataFactory8.generateMovieClipData(name);
			break;
			case aniType.pocker2:
			clip = this.mcDataFactory8.generateMovieClipData(name);
			break;
			case aniType.pocker3:
			clip = this.mcDataFactory8.generateMovieClipData(name);
			break;
			case aniType.pocker4:
			clip = this.mcDataFactory9.generateMovieClipData(name);
			break;
			case aniType.pocker5:
			clip = this.mcDataFactory9.generateMovieClipData(name);
			case aniType.boom:
			clip = this.mcDataFactory9.generateMovieClipData(name);
			break;
			case aniType.holeCover:
			clip = this.mcDataFactory7.generateMovieClipData(name);
			break;
		}
		var re = new egret.MovieClip(clip);
		re.x = posx;
		re.y = posy;
		re.$setScaleX(scale);
		re.$setScaleY(scale);
		if(Type==aniType.boom||Type==aniType.dropdown){
			re.gotoAndStop("run");
		}else{
			re.gotoAndPlay("run", -1);
		}
		
		return re;
	}

	public getDiamond(type:DiamondType,posx:number=0,posy:number=0,scale:number=0,anchorX:number=0,anchorY:number=0):Diamond{
		var name = DiamondType[type];
		var diamond;
		if(type<4&&type>=0){
			 diamond = new Diamond(this.mcDataFactory1.generateMovieClipData(name));
		}
		if(type>=4&&type<7){
			diamond = new Diamond(this.mcDataFactory2.generateMovieClipData(name));
		}
		if(type>=7&&type<10){
			diamond = new Diamond(this.mcDataFactory3.generateMovieClipData(name));
		}
		if(type>=10&&type<13){
			diamond = new Diamond(this.mcDataFactory4.generateMovieClipData(name));
		}
		if(type>=13&&type<17){
			diamond = new Diamond(this.mcDataFactory5.generateMovieClipData(name));
		}
		if(type>=17){
			diamond = new Diamond(this.mcDataFactory6.generateMovieClipData(name));
		}
		if(type==DiamondType.boom||type==DiamondType.brick){
			diamond.addEventListener(egret.Event.COMPLETE, function (){
				diamond.parent.removeChild(diamond);
        	}, this);
			diamond.addEventListener(egret.Event.LOOP_COMPLETE, function (){
				diamond.parent.removeChild(diamond);
        	}, this);
			diamond.gotoAndStop("boom");
		}
		else{
			var a:egret.MovieClip;
			// diamond.gotoAndPlay("rotate", Math.floor(Math.random() * diamond.totalFrames));
			diamond.gotoAndPlay( Math.floor(Math.random() * diamond.totalFrames),-1);
		}
		if(scale==0){
			diamond.$setScaleX(this.scaleNum);
			diamond.$setScaleY(this.scaleNum);
		}else{
			diamond.$setScaleX(scale);
			diamond.$setScaleY(scale);
		}
		diamond.x = posx;
		diamond.y = posy;
		diamond.anchorOffsetX = diamond.width*anchorX;
		diamond.anchorOffsetY = diamond.height*anchorY;
		return diamond;
	}


	public test():egret.MovieClip{
		return new egret.MovieClip(this.mcDataFactory1.generateMovieClipData("jewel1_Agate"));
	}
	
}