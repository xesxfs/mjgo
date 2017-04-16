/**
 * 弹框管理类
 * @author chenkai
 * @date 2016/11/9
 *
 */
class PanelManager extends SingleClass{
	/**弹框*/
    private panelList = {};
	/**弹框类定义*/
    private panelClassList = {};
	/**资源组*/
    private assetList = {};
	
	/**
	 * 注册弹框
	 * @panelID 弹框ID
	 * @panelClass 弹框类定义
	 * @group 资源组名(支持字符串和数组)
	 */ 
    public register(panelID: number, panelClass:any, group:any = null){
        this.panelClassList[panelID] = panelClass;
        this.assetList[panelID] = group;
 	}
 	
 	/**
 	 * 打开弹框
 	 * @panelID 弹框ID
 	 * @callBack 打开后回调(需要加载资源时，在加载完成后回调)
 	 * @thisObject 执行环境
 	 * @return 弹框
	 * @click 是否监听点击黑色背景关闭弹框事件
	 * @lock 是否弹出透明遮罩
 	 */ 
    public open(panelID:number, callBack:Function = null, thisObject:any = null,click:boolean=true,lock = true,transData:any=null){
     	 var panel = this.panelList[panelID];
     	 if(panelID == PanelConst.ChatPanel){
			  App.PopUpManager.changeTransparency(0.0);
		 }else if(panelID == PanelConst.RankNewRuleDetail){
			  App.PopUpManager.changeTransparency(0.0);
		 }else if(panelID == PanelConst.GameBack){
			  App.PopUpManager.changeTransparency(0.0);
		 }else if(panelID == PanelConst.GameMall){
			  App.PopUpManager.changeTransparency(0.0);
		 }else if(panelID == PanelConst.GameSet){
			  App.PopUpManager.changeTransparency(0.0);
		 }else{
			  App.PopUpManager.changeTransparency(0.7);
		 }
     	 if(panel == null){
               var clz = this.panelClassList[panelID];
         	 if(clz != null){
                panel = new clz();
                this.panelList[panelID] = panel;
         	 }else{
               return null; 
         	 }
     	 }

		 /**接收参数 */
		 if(transData != null) {
			 panel.recDataFun(transData);
		 }

     	 //加载弹框所需资源后，再打开弹框
         var group = this.assetList[panelID];
     	 if(group != null){
		   App.LoadingLock.lock();
           App.ResUtils.loadGroup(group,this, ()=>{
			   App.LoadingLock.unlock();
               if(callBack != null && thisObject != null){
				   panel.once(egret.Event.ADDED_TO_STAGE, ()=>{
					   callBack.call(thisObject,true);
				   },this);
               }
			   App.PopUpManager.addPopUp(panel,lock,click);
            }, null,10); 
     	 }else{
			if(callBack != null && thisObject != null){
				panel.once(egret.Event.ADDED_TO_STAGE, ()=>{
					callBack.call(thisObject);
				},this);
			}
            App.PopUpManager.addPopUp(panel,lock,click); 
     	 }
     	 return panel;
 	}
 	
 	/**
 	 * 关闭弹框
 	 * @panelID 弹框ID
 	 * @return 弹框
 	 */ 
 	public close(panelID:number){
     	 var panel = this.panelList[panelID];
     	 if(panel != null){
            App.PopUpManager.removePopUp(panel);
     	 }
     	 return panel;
 	}
 	
 	/**
 	 * 获取弹框
 	 * @panelID 弹框ID
 	 */ 
 	public getPanel(panelID:number){
     	  return this.panelList[panelID];
 	}
 	
 	/**
 	 * 移除所有弹框
 	 */ 
 	public closeAllPanel(){
		App.ResUtils.deleteAllCallBack(); //防止当有弹框加载时，调用了该函数，加载完成后仍然会显示弹框
     	App.PopUpManager.removeAllPopUp();
		App.LoadingLock.unlock();
 	}
}














