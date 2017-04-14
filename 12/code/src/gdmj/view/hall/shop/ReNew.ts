/**
 *
 * @author chenwei
 * 2017/01/13
 */
class ReNew extends BasePanel{
	public constructor() {
    	super();
        this.skinName = "ReNewSkin";
	}
	
    /**vip单选按钮容器*/
    private vipRadioGroup: eui.Group;
    private confirmBtn:eui.Button;
    private closeBtn:eui.Button;
	
    /**组件创建完毕*/
    protected childrenCreated() {

    }

    /**添加到场景中*/
    protected onEnable() {
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openVip,this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this.setCenter();
    }    
    
    public setVip(list: Array<any>) {

        var radioNum = this.vipRadioGroup.numChildren;
        let len = list.length;
        for(var i = 0;i < len;i++) {
            var btn: eui.RadioButton = this.vipRadioGroup.getChildAt(i) as eui.RadioButton;
            var vipOb = list[i];
            btn.label = vipOb.name;
            btn.value = vipOb.id;
  
        }
    }
    
    /**
 * 更新vip购买限制 弃用
 * @vipData vip显示数据
 */
    public updateBuyVip(vipData: Array<any>) {
        //禁用所有按钮
        var radioNum = this.vipRadioGroup.numChildren;
        for(var i = 0;i < radioNum;i++) {
            var btn: eui.RadioButton = this.vipRadioGroup.getChildAt(i) as eui.RadioButton;
            btn.enabled = false;
        }
        //启用允许显示的按钮
        var len = vipData.length;
        for(var i = 0;i < len;i++) {
            var childIndex = vipData[i] - 1; //目标radiobButton索引
            if(childIndex < radioNum) {
                var btn: eui.RadioButton = this.vipRadioGroup.getChildAt(childIndex) as eui.RadioButton;
                btn.enabled = true;
            }
        }
        //默认单选按钮
        if(vipData.length > 0) {
            var btn: eui.RadioButton = this.vipRadioGroup.getChildAt(vipData[0] - 1) as eui.RadioButton;
            btn.selected = true;
        }
    }
    
    //开通会员
    private openVip(event: egret.TouchEvent) {
        var vip: HallController = App.getController(HallController.NAME);
        var radioNum = this.vipRadioGroup.numChildren;
        for(var i = 0;i < radioNum;i++) {
            var btn: eui.RadioButton = this.vipRadioGroup.getChildAt(i) as eui.RadioButton;
            if(btn.selected) {
                let v = btn.value;
                vip.sendShopVipReq(v);
                break;
            }
        }

    }

    /**从场景中移除*/
    protected onRemove() {
        
    }
}
