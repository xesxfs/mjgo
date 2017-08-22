class KFControllerMgr {

    private AddedCtls:any = null;
	private sharePanelList = null;
	private static instance: KFControllerMgr;
    public static getInstance(): KFControllerMgr {
        if(this.instance == null) {
            this.instance = new KFControllerMgr();
        }
        return this.instance;
    }

	public constructor() {
		this.AddedCtls = {};
		this.sharePanelList = {
            "DialogPanel":""
        };
	}

	public getCtl(type:PanelName):any{
		var  Panelname = PanelName[type];
        if(this.AddedCtls[Panelname]==null){
			var className = egret.getDefinitionByName(Panelname+"Controller");
			this.AddedCtls[Panelname] = new className();
        }
		return this.AddedCtls[Panelname] ;
	}

	public static getCtl(type:PanelName):any{
		return KFControllerMgr.getInstance().getCtl(type);
	}

	

	public revomePanel(panelName:string){
		if(!this.sharePanelList[panelName]){
			this.AddedCtls[panelName] = null;
		}
	}

	public static showTips(content: string,duringTime: number = 2,buttonState: number = 0,btnCallBack?: Function,title?:string,btnLeftCallBack?:Function,rightTxt?,leftTxt?){
		KFControllerMgr.getCtl(PanelName.DialogPanel).showTip(LocalizationMgr.getText(content),duringTime,buttonState,btnCallBack,LocalizationMgr.getText(title),btnLeftCallBack,rightTxt,leftTxt);
    }

	
}