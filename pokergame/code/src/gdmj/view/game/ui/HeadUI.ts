/**
* 头像UI
* 加载微信头像图片，并显示
* @author chenkai
* @date 2016/6/29
* 
* Example:
* 1. 拖拽HeadUI自定义组件到exml，并为其设置自定义皮肤HeadUISkin
* 2. this.headUI.loadImg(headUrl); //加载图片
* 
*/

class HeadUI extends eui.Component {
    public nameLabel:eui.Label;   //昵称文本
    public scoreLabel:eui.Label;  //分数文本
    public headImg: eui.Image;    //头像图片
    public userID: number = 0;   //用户ID
    private tuoGuanIcon:eui.Image;//托管图标
    public seatID:number;         //位置
    public icon:eui.Image;        //金币图片
    private headQuestionImg:eui.Image; //问号
    public headShutup:eui.Image;        //头像禁言图片
    public headOwner:eui.Image;     //房主标识
    private headShade:eui.Image;    //头像遮罩
    
    public constructor() {
        super();
        this.skinName = "HeadUISkin";

    }

    public childrenCreated(){
        // this.hideTuoGuanIcon();
        // this.headShutup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickShutup,this);
    }

    
    private onclickShutup() {
        // this.gameScene = App.SceneManager.getScene(SceneConst.GameScene);
        // for(var i=0;i<this.gameScene.headUIList.length;i++){
        //     if(this.userID == this.gameScene.headUIList[i].userID){
        //         this.setHeadUiShutup(this.userID);
        //     }
        // }
    }
    /**禁言处理*/
    private setHeadUiShutup(userId) {
        if(this.headShutup.source == "game_say1_png") return;
    }
    
    /**
     * 加载头像图片
     * @param headUrl 图片地址
     */ 
    public loadImg(headUrl){
        if(headUrl && headUrl != "" && headUrl != 1){
            this.headImg.source = headUrl;
            this.headQuestionImg.visible = false;
        }
    }

    //是否为空
    public isEmpty(): Boolean {
        if(this.headImg.bitmapData == null) {
            return true;
        }
        return false;
    }
        
    //显示托管图标
    public showTuoGuanIcon(){
        console.log("托管状态")
        this.tuoGuanIcon.visible = true;
        this.headShade.visible = true;
    }
    
    //隐藏托管图标
    public hideTuoGuanIcon(){
        this.tuoGuanIcon.visible = false;
        this.headShade.visible = false;
    }

    //清理数据
    public clear(): void {
        this.headImg.bitmapData = null;
        this.headImg.texture = null;
        this.headImg.source = null;
        this.userID = -1;
        this.nameLabel.text = "";
        this.scoreLabel.text = "";
        this.tuoGuanIcon.visible = false;
        this.headQuestionImg.visible = true;
    }
    
    //隐藏
    public hide(){
        this.headShutup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickShutup,this);
        this.parent && this.parent.removeChild(this);
    }

}