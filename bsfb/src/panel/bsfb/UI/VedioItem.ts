class VedioItem extends eui.ItemRenderer {
	private Label_Time:eui.Label;
	private Btn_UpLoading:eui.Button;
	private Btn_PlayVedio:eui.Button;
	private Btn_Delete:eui.Button;
	private Btn_PlayPublicVedio:eui.Button;

	private normalItem:eui.Group;
	private endItem:eui.Group;
	private PubliclItem:eui.Group;

	private Label_Title:eui.Label;
	private Label_Playtimes:eui.Label;
	private Label_Author:eui.Label;
	private Label_But:eui.Label;

	private Vediodata:string;
	private VedioKey:string;
	private VedioID:string;

	public constructor() {
		super();
		this.skinName = "VedioItemSkin";
		this.childrenCreated
	}

	protected dataChanged(){
		

		this.normalItem.visible = false;
		this.endItem.visible = false;
		this.PubliclItem.visible = false;

		if(this.data.type==0){//我的视频
			this.normalItem.visible = true;
			this.Vediodata = this.data.vedioData;
			this.VedioKey = this.data.vedioKey;
			this.Label_Time.text = this.data.Time;
		}else if(this.data.type==1){//视频集锦
			this.PubliclItem.visible = true;
			this.Label_Title.text = LocalizationMgr.getText("标题:")+this.data.Title;
			this.Label_Playtimes.text = this.data.PlayTimes;
			this.Label_Author.text = this.data.NickName;
			this.VedioID = this.data.ID;
		}else if(this.data.type==2){//加载更多按钮
			this.endItem.visible = true;
			this.enableBut(this.endItem);
			this.Label_But.text = LocalizationMgr.getText(TipTexts.A1072);
		}else if(this.data.type==3){//已到底部按钮
			this.endItem.visible = true;
			this.Label_But.text = LocalizationMgr.getText(TipTexts.A1073);
			this.disableBut(this.endItem);
		}

		if(this.data.type==1||this.data.type==0){
			this.normalItem.addEventListener(egret.TouchEvent.TOUCH_END,this.normalItemClick,this);
		}else if(this.data.type==2){
			this.endItem.addEventListener(egret.TouchEvent.TOUCH_END,this.moreItemClick,this);
		}else if(this.data.type==3){
			this.endItem.addEventListener(egret.TouchEvent.TOUCH_END,this.endItemClick,this);
		}
	}

	protected childrenCreated(){
		this.Btn_UpLoading.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_UpLoadingClick,this);
		this.Btn_PlayVedio.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_PlayVedioClick,this);
		this.Btn_PlayPublicVedio.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_PlayPublicVedioClick,this);
		this.Btn_Delete.addEventListener(egret.TouchEvent.TOUCH_END,this.Btn_DeleteClick,this);
	}

	private Btn_UpLoadingClick(){
		console.log("Btn_UpLoadingClick");

		KFControllerMgr.getCtl(PanelName.UploadVedioPanel).setData(this.Vediodata).show();
	}
	private Btn_PlayVedioClick(){
		console.log("Btn_PlayVedioClick");
		KFControllerMgr.getCtl(PanelName.VedioPanel).PlaySelfVedio(this.Vediodata);
	}
	private Btn_PlayPublicVedioClick(){
		console.log("Btn_PlayPublicVedioClick");
		var js = { VedioID: this.VedioID};
        WebSocketMgr.getInstance().SendOneceMsg(MsgID.BSFB.GET_VEDIOCODE,JSON.stringify(js));
		KFControllerMgr.getCtl(PanelName.VedioPanel).showNick(this.data.NickName);
	}
	private Btn_DeleteClick(){
		console.log("Btn_DeleteClick");
		var _str = egret.localStorage.getItem(GlobalClass.UserInfo.str_UserID + "MyVedioKey").split("&");
        var _list = "";
		_str.forEach(s => {
           if (s!=""&&s != this.VedioKey)
            {
                _list += s + "&";
            }
        });
        egret.localStorage.setItem(GlobalClass.UserInfo.str_UserID + "MyVedioKey", _list);
		KFControllerMgr.getCtl(PanelName.VedioPanel).CreatMyVedioData();
	}

	private normalItemClick(){
		console.log("normalItemClick");
	}

	private endItemClick(){
		console.log("endItemClick");
	}

	private moreItemClick(){
		console.log("moreItemClick");
		KFControllerMgr.getCtl(PanelName.VedioPanel).LoadMorePublicVedio();
	}

	protected disableBut(obj:any){
        obj.enabled = false;
        var image: eui.Image = <eui.Image>obj.getChildAt(0);
         var colorMatrix = [
            0.4,0,0,0,0, 
            0,0.4,0,0,0,
            0,0,0.4,0,0,
            0,0,0,1,0
        ];

        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        image.filters = [colorFlilter];
    }

    protected enableBut(obj:any){
        obj.enabled = true;
        var image: eui.Image = <eui.Image>obj.getChildAt(0);
         var colorMatrix = [
            1,0,0,0,0, 
            0,1,0,0,0,
            0,0,1,0,0,
            0,0,0,1,0
        ];

        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        image.filters = [colorFlilter];
    }
}