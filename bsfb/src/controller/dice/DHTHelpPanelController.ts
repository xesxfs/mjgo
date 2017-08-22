class DHTHelpPanelController extends KFController  {
    protected mPanel:DHTHelpPanel;
    

    protected init(){
    	super.init();
	}
	
    protected onReady() {
        this.InitText("帮助说明","1.新建房间可点击左上角的创建房间按钮，加入房间可选择列表中的房间加入，或直接搜索房间号加入。\r\n\r\n2.私密房间只有精确完整输入房间号后才会在列表中显示出来。\r\n\r\n3.如果设置了房间密码，请将密码牢记并告之朋友。");
    }

    protected onShow(){//在界面上显示出来
        }

    protected InitText(title:string, Desc:string){
        this.mPanel.Label_Title.text = LocalizationMgr.getText(title);
        this.mPanel.Label_Desc.text = LocalizationMgr.getText(Desc);
    }



    protected setOnClickListener() {
      this.AddClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
    }

    protected removeOnClickListener() {
      this.RemoveClickEvent(this.mPanel.Btn_Close,egret.TouchEvent.TOUCH_END,this.BackOnClick,this);
	}

	// 返回
    private BackOnClick(event:egret.TouchEvent):void{
        console.log("返回");
        this.mPanel.hide();
    }

}