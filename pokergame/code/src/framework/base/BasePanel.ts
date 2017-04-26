/**
 * 面板基类
 * @author chenkai
 * @date 2016/6/27
 */
class BasePanel extends BaseUI{
    
    public constructor() {
        super();
    }

     /**组件创建完毕*/
    protected childrenCreated() {
        
    }

    /**添加到场景中*/
    protected onEnable() {
        this.setCenter();
        
    }

    /**从场景中移除*/
    protected onRemove() {

    }
    
    /**
     * 显示
     * @lock 是否锁定屏幕(增加半透明黑色背景)
     * @click 是否点击空白处可关闭弹框
     */ 
    public show(lock: boolean = true,click:boolean = true) {
        App.PopUpManager.addPopUp(this, lock, click);
    }

    /**隐藏*/
    public hide() {
        App.PopUpManager.removePopUp(this);
    }

}