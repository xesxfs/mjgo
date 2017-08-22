class ArenaTwoItem extends  eui.ItemRenderer{
	private Sprite_IsHavePassword2:eui.Image;
	private Sprite_Challenge1:eui.Image;
	private Sprite_Challenge2:eui.Image;
	private Label_ArenaName_Item2:eui.Label;
	private Label_ArenaCountItem2:eui.Label;
	private Label_ChallengeUserItem2:eui.Label;
	private Label_ArenaTimeItem2:eui.Label;

	public constructor() {
		super();
	}

	protected dataChanged(){
		this.Label_ArenaName_Item2.text = this.data.Label_ArenaName;
		this.Label_ArenaCountItem2.text = this.data.Label_ArenaCount;
		this.Label_ChallengeUserItem2.text = CommonFuc.subString(this.data.Label_ChallengeUser,12,true);
		this.Label_ArenaTimeItem2.text = this.data.Label_ArenaTime;

		if(this.Label_ChallengeUserItem2.text == "无人挑战，擂台超时" ){
			this.Label_ChallengeUserItem2.size = 18;
			this.Label_ChallengeUserItem2.textColor = 0xFFFFFF;
		}else{
			this.Label_ChallengeUserItem2.size = 20;
			this.Label_ChallengeUserItem2.textColor = 0xFCD774;
		}
		
		this.Sprite_Challenge1.visible = true;
		this.Sprite_Challenge2.visible = true;
		this.imgOri(this.Sprite_Challenge1);
		this.imgOri(this.Sprite_Challenge2);
		if(this.data.Label_ChallengeUserColor=="1"){
			this.Label_ArenaTimeItem2.textColor = 0xFFFFFF;
		}
		if(this.data.Sprite_IsHavePassword=="0"){
			this.Sprite_IsHavePassword2.visible = false;
		}else{
			this.Sprite_IsHavePassword2.visible = true;
		}
		if(this.data.img1=="-1"){
			this.Sprite_Challenge1.visible = false;
		}else{
			this.Sprite_Challenge1.source = RES.getRes(this.data.img1);
		}
		if(this.data.img2=="-1"){
			this.Sprite_Challenge2.visible = false;
		}else{
			this.Sprite_Challenge2.source = RES.getRes(this.data.img2);
		}
		if(this.data.img1Fade=="1"){
			this.imgFade(this.Sprite_Challenge1,0.5);
		}
		if(this.data.img2Fade=="1"){
			this.imgFade(this.Sprite_Challenge2,0.5);
		}
	}

	protected childrenCreated(){
		
	}

	private imgOri(img:eui.Image){
		var colorMatrix = [
            1,0,0,0,0, 
            0,1,0,0,0,
            0,0,1,0,0,
            0,0,0,1,0
        ];
         var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        img.filters = [colorFlilter];
	}	

	private imgFade(img:eui.Image,percent:number){
         var colorMatrix = [
            percent,0,0,0,0, 
            0,percent,0,0,0,
            0,0,percent,0,0,
            0,0,0,1,0
        ];
         var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        img.filters = [colorFlilter];
    }

}