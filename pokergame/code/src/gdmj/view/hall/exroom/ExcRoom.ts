/**
 *
 * @author chenwei
 *5/1/2017
 */
class ExcRoom extends BasePanel{
	public constructor() {
    	super();
        this.skinName ="ExcRoomSkin";
	}	
	private minKey:MinKeyBorad;
	
    private editBtn:eui.Button;
    private swMinKeyboardBtn: eui.Button;
    private confirmBtn:eui.Button;
    
    private roomNameLab:eui.Label;
    private roomNumLab:eui.Label;    
    private basePointLab:eui.Label;     

    private ma2Rad:eui.CheckBox;
    private ma4Rad: eui.CheckBox;
    private ma6Rad: eui.CheckBox;
    
    //关闭
    private closeBtn: eui.Button;
    //鸡平胡
    private ptJpRBtn: eui.RadioButton;
    /**推倒胡 */
    private ptTdRBtn: eui.RadioButton;
    //鸡平胡 推到胡 选项面板
    private typeViewStack: eui.ViewStack;
    //步步高
    private ptBubuGaoRb: eui.RadioButton;
    //一炮多响
    private ptHasYiPaoSanXiangCk: eui.CheckBox;
    //海底捞月
    private ptHasHaiDiLaoYueCk: eui.CheckBox;
    //三元牌
    private ptHasSanYuanCk: eui.CheckBox;
    //风位风圈
    private ptHasFenWeiFengQuangCk: eui.CheckBox;
    //杠牌加番
    private ptHasGangAddFan: eui.CheckBox;
    //杠上开花
    private ptHasGangShangKaiHuaCk: eui.CheckBox;
    //抢杠
    private ptHasQiangGangCk: eui.CheckBox;
    private gameType: GAME_TYPE;
    private deskInfo:DeskInfo; 
    private maCG:Array<eui.CheckBox>;
    /**组件创建完毕*/
    protected childrenCreated() {
        this.maCG = [this.ma2Rad,this.ma4Rad,this.ma6Rad];
    }

    /**添加到场景中*/
    protected onEnable() {
        this.setCenter();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this.minKey.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMinKeyBorad,this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        this.ptJpRBtn.group.addEventListener(eui.UIEvent.CHANGE,this.onChangeMjType,this);
        this.ma2Rad.addEventListener(egret.Event.CHANGE,this.maOperation,this)
        this.ma4Rad.addEventListener(egret.Event.CHANGE,this.maOperation,this)
        this.ma6Rad.addEventListener(egret.Event.CHANGE,this.maOperation,this)
        this.initDesk();
        this.bubugaoState();
    }

    
    /**从场景中移除*/
    protected onRemove() {
        this.minKey.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMinKeyBorad,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
    }
    
    /**步步高状态*/
    private bubugaoState(){
        let len = this.maCG.length
        let hasSelec = false;
        for(let i = 0;i < len;i++) {
            let r: eui.CheckBox = this.maCG[i]
            if(r.selected) hasSelec = true;
        }
        this.ptBubuGaoRb.enabled = hasSelec;
    }
    
    private onTouch(e :egret.TouchEvent){
        switch(e.target){
            case this.swMinKeyboardBtn: 
                this.minKey.visible =!this.minKey.visible;
                break;
            case this.editBtn: 
                break        
            case this.confirmBtn: 
                this.sendChange();
                break
            default: 
                this.minKey.visible = false;
        }
    }
    
//    初始化
    private initDesk(){        
        let deskInfo:DeskInfo = App.DataCenter.roomInfo.getCurDesk();
        if(!deskInfo){
            Tips.error("未能获取房间信息！！")
            this.hide();
            return;
        }
        this.deskInfo =deskInfo;      
        this.roomNumLab.text= deskInfo.deskCode.toString();
        this.roomNameLab.text = decodeURIComponent(deskInfo.deskName); 
        this.basePointLab.text = deskInfo.basePoint.toString();    
        this.setGameConfig(deskInfo.gameConfig);
    }
    
//     设置游戏
    private setGameConfig(gameConfig){
        let config = ProtocolData.gameConfig;
        config = gameConfig;   
        this.selView(config.gameType)        
        this.ptHasYiPaoSanXiangCk.selected = config.hasYiPaoSanXiang
        this.ptHasHaiDiLaoYueCk.selected = config.hasHaiDiLaoYue
        this.ptHasSanYuanCk.selected  = config.hasSanYuan
        this.ptHasFenWeiFengQuangCk.selected =(config.hasFengWei&&config.hasFengQuan)
        this.ptHasGangAddFan.selected = config.hasGangAddFan;
        this.ptHasGangShangKaiHuaCk.selected = config.hasGangShangKaiHua;
        this.ptHasQiangGangCk.selected = config.hasQiangGang;
        this.ptBubuGaoRb.selected = config.hasBuBuGao;
        this.ptBubuGaoRb.enabled = config.hasMaiMa;
        if (config.hasMaiMa)this.setMaCount(config.maiMaNum);        
    }
//    设置抓马数量
    private setMaCount(mac:number){        
      let len=  this.maCG.length
      for(let i=0;i<len;i++){
        let r:eui.CheckBox=  this.maCG[i];
        if(parseInt(r.label) == mac){
            r.selected = true;
            break;
        }
      }      
    }
//    抓马选择
    private maOperation(e:egret.Event){        
        let len = this.maCG.length
        let hasSelec =false;
        for(let i = 0;i < len;i++) {
            let r: eui.CheckBox = this.maCG[i]
            if(r!= e.target)r.selected = false;    
            if(r.selected)hasSelec=true; 
            if(r.enabled)hasSelec = true;
        }
        this.ptBubuGaoRb.enabled =hasSelec;
    }

/**
 * 获取游戏配置
 */
    private getGameOperation() {
        
//       let  dataConfig = new Object();
       let dataConfig = ProtocolData.gameConfig;
        //重置数据
        dataConfig.hasMaiMa = false;
        dataConfig.hasOni = false;
        dataConfig.hasYiPaoSanXiang = false;
        dataConfig.hasHaiDiLaoYue = false;
        dataConfig.hasGangShangKaiHua = false;
        dataConfig.hasQiangGang = false;
        dataConfig.hasYiPaoDuoXiang = true;
        dataConfig.hasFengQuan = false;// 是否有风圈刻子
        dataConfig.hasFengWei = false;// 是否有风位刻子
        dataConfig.hasSanYuan = false;// 是否有三元牌刻子
        dataConfig.hasBuBuGao = false;//是否步步高
        dataConfig.hasGangAddFan = false; //是否杠牌加番
        dataConfig.maiMaNum = 0;
        dataConfig.gameType = this.gameType;

        if(this.gameType == GAME_TYPE.JI_PING_HU) {

            dataConfig.hasYiPaoSanXiang = this.ptHasYiPaoSanXiangCk.selected;
            dataConfig.hasHaiDiLaoYue = this.ptHasHaiDiLaoYueCk.selected;
            dataConfig.hasFengQuan = dataConfig.hasFengWei = this.ptHasFenWeiFengQuangCk.selected
            dataConfig.hasSanYuan = this.ptHasSanYuanCk.selected;// 是否有三元牌刻子
            dataConfig.hasGangAddFan = this.ptHasGangAddFan.selected; // 是否杠牌加番

        } else {

            dataConfig.hasGangShangKaiHua = this.ptHasGangShangKaiHuaCk.selected;
            dataConfig.hasQiangGang = this.ptHasQiangGangCk.selected;
            let mainMaNum = this.getMaCount();
            if(this.ptBubuGaoRb.enabled && this.ptBubuGaoRb.selected) {
                dataConfig.hasBuBuGao = true;
            }
            //没有买马返回null           
            if(mainMaNum){
                dataConfig.maiMaNum = mainMaNum;
                dataConfig.hasMaiMa = true;
            }
        }
        return dataConfig;
    }
//获取抓马数量
    private getMaCount(): number {

        var count: string;
        if(this.gameType == GAME_TYPE.JI_PING_HU) {
            count = null;
        } else {
            for(let i=0;i<this.maCG.length;i++){
               if(this.maCG[i].selected)count=this.maCG[i].label;
            }
        }

        let c = parseInt(count)
        return c;
    }
    
    private sendChange(){     
        
        if(App.DataCenter.gameState == GameState.Playing){               
            Tips.info("游戏已正式开始,请结束后再修改房间信息")
        }else{
            App.DataCenter.GameInfo
            var info = ProtocolData.Send120_1_0;
            info.basePoint = parseInt(this.basePointLab.text);
            info.deskName = encodeURIComponent(this.roomNameLab.text);
            info.deskNo = this.deskInfo.deskNo;
            info.gameConfig = this.getGameOperation();
            let ctc: HallController = App.getController(HallController.NAME)
            ctc.sendRoomChange(info);
            this.hide();
           
        }
    }
    
    private onChangeMjType(evt: eui.UIEvent) {
        var radioGroup: eui.RadioButtonGroup = evt.target;
        this.typeViewStack.selectedIndex = radioGroup.selectedValue;
        this.gameType = parseInt(radioGroup.selectedValue) + 1;
    }
    
    private selView(type:GAME_TYPE){
        this.gameType = type;
        this.typeViewStack.selectedIndex = this.gameType -1;
        if(type == GAME_TYPE.JI_PING_HU){
            this.ptJpRBtn.selected = true
        }else{
            this.ptTdRBtn.selected = true;
        }
            
    }
    
    
    private onMinKeyBorad(e :egret.TouchEvent){        
        if(e.target instanceof eui.Button){
            let btn :eui.Button =e.target;
            this.basePointLab.text = btn.label;                 
        }
    }
	
}
