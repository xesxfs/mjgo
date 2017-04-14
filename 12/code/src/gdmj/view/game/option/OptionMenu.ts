
/**
 * 游戏中设置菜单
 * @author chenkai
 * @date 2016/8/31
 */
class OptionMenu extends BaseUI{
    /**按钮容器*/
    private optionGroup:eui.Group;
    /**按钮容器遮照*/
    private bgMask:eui.Rect;
    /**按钮容器展开时坐标x*/
    private groupInitX;
    /**按钮容器展开时坐标y*/
    private groupInitY;
    /**聊天*/
    public chatBtn:eui.Image;
    /**返回*/
    public quitBtn:eui.Image;
    /**设置*/
    public optionBtn:eui.Image;
    /**番型*/
    public fanTypeBtn:eui.Image;
    /**托管*/
    public tuoGuanBtn:eui.Image;
    /**右箭头*/
    private rightArrow:eui.Image;
    /**左箭头*/
    private leftArrow:eui.Image;
    

    public constructor(){
        super();
        this.skinName = "OptionMenuSkin";
    }

    protected childrenCreated() {
        this.optionGroup.mask = this.bgMask;
        this.groupInitX = this.optionGroup.x;
        this.groupInitY = this.optionGroup.y;
        this.rightArrow.visible = true;
        this.leftArrow.visible = false;
    }

    protected onEnable() {
        this.rightArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightArrowTouch, this);
        this.leftArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftArrowTouch, this);
    }

    protected onRemove() {
        this.rightArrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightArrowTouch, this);
        this.leftArrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftArrowTouch, this);
    }

    //回缩菜单
    private onRightArrowTouch(){
        egret.Tween.get(this.optionGroup).to({x:this.groupInitX + this.optionGroup.width - 70},500).call(()=>{
            this.rightArrow.visible = false;
            this.leftArrow.visible = true;
        });
    }

    //展开菜单
    private onLeftArrowTouch(){
        egret.Tween.get(this.optionGroup).to({x:this.groupInitX},500).call(()=>{
            this.rightArrow.visible = true;
            this.leftArrow.visible = false;
        });
    }   
}