// TypeScript file
class PersionInfoPanel extends BasePanel{
	public constructor() {
        super();
        this.skinName="PersonInfoSkin";
	}
    	 /**组件创建完毕*/
    protected childrenCreated() {
        
    }

	private closeBtn:eui.Button;
    // private userIdLab:eui.Label;
    private userIdLab:eui.Label;
    private nickNameLab:eui.Label;
    private roomCardLab:eui.Label;
    private headImg:eui.Image;
    /**添加到场景中*/
    protected onEnable() {
        this.setCenter();
        this.setUserInfoUI();
        this.closeBtn.addEventListener("touchTap",this.hide,this)
        
    }

    private setUserInfoUI(){
        var userVo:UserVO = App.DataCenter.UserInfo.getMyUserVo();
        if(!userVo){
            return;
        }
        this.userIdLab.text = userVo.playerId.toString();
        this.nickNameLab.text = userVo.nickName;
        this.roomCardLab.text = userVo.roomCard.toString();
        this.headImg.source = userVo.headImgUrl;

    }

    /**从场景中移除*/
    protected onRemove() {

    }
}