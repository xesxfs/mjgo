/**
 * 排行榜界面
 * @author chenwei
 * @date 2016/07/04
 */
class RankPanel extends BasePanel{
	public constructor() {
    	super();
        this.skinName = "RankPanelSkin";
	}
	//关闭
    private closeBtn:eui.Button;
    //日排行榜
    private dayRBtn:eui.RadioButton;
    
    //领取奖励
    private getAwardBtn: eui.Button;
    
    private openRuleImg:eui.Image;
    //排行榜切换
    private rankViewStack:eui.ViewStack;

    //自己的积分
    private scoreLab:eui.Label;
    //日巅峰榜
    private dayList:eui.List;
    
    //财富榜
    private richerList: eui.List;    
    
    //雀神榜
    private godList: eui.List;
    //
    private rankNumLab:eui.Label;
    
    private rankCoinLab: eui.Label;
    private coinLab: eui.Label;    
    private rankGodLab: eui.Label;    
    private godLab: eui.Label;    
    private ruleDesc:eui.Group;
    private ruleLab:eui.Label;
	
    protected childrenCreated(){  
       this.setRuleText();
    }
    
    private close(e:egret.Event){
        App.PopUpManager.removePopUp(this);
    }
    
    /**
     *  领取奖励
     * @param e
     */
    private onGetAward(e: egret.Event) {
        
        
        if(e.target==this.getAwardBtn){
            var http = new HttpSender();
            var data = ProtocolHttp.send_z_avard;
            http.send(data,this.awardBack,this);
        }else{
        
//            this.rankRule||(this.rankRule=new RankRuleDetail());
//            this.rankRule.show();
        }

        
    }
    
    private setRuleText(){
        var txt = "今日巅峰(榜)前3名可领取奖励：\n\n   第一名:\n   第二名:\n   第三名:\n\n每天24点后可以领取前一天排行榜的奖励，并清空当天的积分数据。"
        var parser = new egret.HtmlTextParser();    
        var textFlow: Array < egret.ITextElement >= parser.parser(txt)
        this.ruleLab.textFlow=textFlow;
    }

    private getGodRank(){
        var http=new HttpSender();
        var data = ProtocolHttp.send_z_godrank;
        http.send(data,this.setGodRank,this);
    }
    
    
    private awardBack(data){
        
        if(!data.ret) {           
            
            App.DataCenter.UserInfo.httpUserInfo.roomCard= data.data.room_card;
            App.DataCenter.UserInfo.httpUserInfo.roomCardCoop = data.data.room_card_coop;            
//            (<HallScene>App.layerMgr.curscene).updataUserUI();
            Tips.info("恭喜你，领奖成功!!!");
            
        }
        else{
//            Tips.error(data.desc);
        }
    }
    //神榜
    private setGodRank(data){              
    
       if(!data.ret){            
            let ac=new eui.ArrayCollection();
            var rankList = data;
            let arr = [];
            let myself = rankList.data.pop();
            let myselfUser=new Object();
//            myselfUser["coin"] = myself.point;
            myselfUser["name"] = App.DataCenter.UserInfo.httpUserInfo.nickName;
            myselfUser["rankIcon"] = "rank_self_icon_png";
            myselfUser["desc"] = "赢" + myself.point;
            myselfUser["head"] = App.DataCenter.UserInfo.httpUserInfo.headUrl;
            myselfUser["bg"] = "rank_selfitem_bg_png"
            if(myself.rank == "未入围") {
                myselfUser["sn"] = "rank_nohave_png";
            } else {
                myselfUser["n"] = myself.rank;
            }
            arr.push(myselfUser);
//            this.rankGodLab.text = myself.rank;
//            this.godLab.text = myself.point;   
//            

            for(let i = 0;i < rankList.data.length;i++) {
                let rankObj = rankList.data[i];

                let rankUser = new Object();
                
                switch(i) {
                    case 0:
                        rankUser["rankIcon"] = "rank_one_icon_png"
                        break;
                    case 1:
                        rankUser["rankIcon"] = "rank_two_icon_png"
                        break;
                    case 2:
                        rankUser["rankIcon"] = "rank_three_icon_png"
                        break;
                    default: 
                        rankUser["rankIcon"] = "rank_default_icon_png"
                }
                
                rankUser["n"] = rankObj.num;
                if(i < 3) {
                    rankUser["n"] = "";
                }
                rankUser["tclor"] = "0xFFD200"
                rankUser["bg"] = "hall_com_item_png";      
                rankUser["win"] = rankObj.win;    //胜利积分
                rankUser["lose"] = rankObj.lose;//输的积分
                rankUser["draw"] = rankObj.draw;//平的积分
                rankUser["name"] = rankObj.name;//名字
                rankUser["head"] = rankObj.avater=="1"?"":rankObj.avater;//头像
                rankUser["id"] = rankObj.id;//id 
                rankUser["desc"] ="赢:"+rankObj.win+"输:"+rankObj.lose+"平:"+rankObj.draw;
                arr.push(rankUser);
            }
            ac.source = arr;
            this.godList.dataProvider=ac;            

        }else{
//            Tips.info(data.desc);
        }
        
    }
    private getRichData(){
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_richrank;
        http.send(data,this.setRichData,this);
    }
    //财富榜
    private setRichData(data){
        
        if(!data.ret) {
            let ac = new eui.ArrayCollection();
            var rankList = data;
            let arr = [];
            let myself = rankList.data.pop();
            let myselfUser=new Object();
            myselfUser["coin"]=myself.point;
            myselfUser["name"] = App.DataCenter.UserInfo.httpUserInfo.nickName;
            myselfUser["rankIcon"] ="rank_self_icon_png";
            myselfUser["desc"] = App.DataCenter.UserInfo.httpUserInfo.coin + "钻石"; 
            myselfUser["head"] = App.DataCenter.UserInfo.httpUserInfo.headUrl;
            myselfUser["bg"]="rank_selfitem_bg_png"
           
            if(myself.rank=="未入围"){
                myselfUser["sn"] = "rank_nohave_png";
            }else{
                myselfUser["n"] = myself.rank;
            }
            arr.push(myselfUser);
//            this.rankCoinLab.text = myself.rank;
//            this.coinLab.text = myself.point;                 
            for(let i = 0;i < rankList.data.length;i++) {
                let rankObj = rankList.data[i];

                let rankUser = new Object();
                switch(i){
                    case 0:
                        rankUser["rankIcon"] ="rank_one_icon_png"
                        break;
                    case 1:
                        rankUser["rankIcon"] ="rank_two_icon_png"
                        break;
                    case 2:
                        rankUser["rankIcon"] ="rank_three_icon_png"
                        break;
                    default:
                        rankUser["rankIcon"] = "rank_default_icon_png"
                        
                }
                rankUser["n"] = rankObj.num;
                if(i < 3) {
                    rankUser["n"] = "";
                }
                rankUser["tclor"] = "0xFFD200";
                rankUser["bg"] ="hall_com_item_png";
             
                rankUser["coin"] = rankObj.coin; //金币
                rankUser["name"] = rankObj.name;//名字
                rankUser["head"] = rankObj.avater == "1" ? "" : rankObj.avater;//头像
                rankUser["id"] = rankObj.id;//id 
                rankUser["desc"] = rankObj.coin + "钻石"; 
                arr.push(rankUser);
            }
            ac.source = arr;
            this.richerList.dataProvider = ac;

        } else {
//            Tips.info(data.desc);
        }
        
    }
        

    private getScoreRank(){
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_scorerank;
        http.send(data,this.setScoreRank,this);
    }
    
    private setScoreRank(data){        
        if(!data.ret) {
            let ac = new eui.ArrayCollection();
            var rankList = data;        
            
            let myself = rankList.data.pop();            
            let arr = [];
            let myselfUser = new Object();
     
            myselfUser["name"] = App.DataCenter.UserInfo.httpUserInfo.nickName;
            myselfUser["rankIcon"] = "rank_self_icon_png";
            myselfUser["desc"] = myself.point + "分";
            myselfUser["head"] = App.DataCenter.UserInfo.httpUserInfo.headUrl;
            myselfUser["bg"] = "rank_selfitem_bg_png"
            if(myself.rank == "未入围") {
                myselfUser["sn"] = "rank_nohave_png";
            } else {
                myselfUser["n"] = myself.rank;
            }
            arr.push(myselfUser);
            for(let i = 0;i < rankList.data.length;i++) {
                let rankObj = rankList.data[i];
                let rankUser = new Object();                
                switch(i) {
                    case 0:
                        rankUser["rankIcon"] = "rank_one_icon_png"
                        break;
                    case 1:
                        rankUser["rankIcon"] = "rank_two_icon_png"
                        break;
                    case 2:
                        rankUser["rankIcon"] = "rank_three_icon_png"
                        break;
                    default:
                        rankUser["rankIcon"] = "rank_default_icon_png"
                }                
                rankUser["n"] = rankObj.num;                
                if(i<3){
                    rankUser["n"] = ""; 
                }
                rankUser["tclor"] = "0xFFD200"
                rankUser["bg"] = "hall_com_item_png";        
                rankUser["point"] = rankObj.point;    //积分
                rankUser["name"] = rankObj.name;//名字
                rankUser["head"] = rankObj.avater == "1" ? "" : rankObj.avater;//头像
                rankUser["id"] = rankObj.user_id;//id 
                rankUser["desc"] = rankObj.point + "分";
                arr.push(rankUser);

            }
            ac.source = arr;
            this.dayList.dataProvider = ac;

        } else {
//            Tips.info(data.desc);
        }
        
    }
        
    
    /**
     *  切换排行榜
     * @param evt
     */
    private onChangeRankType(evt:eui.UIEvent){
        var radioGroup: eui.RadioButtonGroup = evt.target;
        this.rankViewStack.selectedIndex = radioGroup.selectedValue;       
    }
    
    protected onEnable() {
        this.setCenter();
       this.ruleDesc.visible=false;
        this.getGodRank();
        this.getRichData();
        this.getScoreRank();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
//        this.getAwardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGetAward,this);
//        this.openRuleImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGetAward,this);
        this.openRuleImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.ruleTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.ruleTouchEnd,this);
        this.dayRBtn.group.addEventListener(eui.UIEvent.CHANGE,this.onChangeRankType,this);
//        this.scoreLab.text=DataCenter.UserInfo.httpUserInfo.point.toString();     
//        this.rankViewStack.selectedIndex=0;

    }
    
    private ruleTouchBegin(e:egret.TouchEvent){

        this.ruleDesc.visible=true;
    }
    
    private ruleTouchEnd(e: egret.TouchEvent){

        this.ruleDesc.visible = false;
    }

    protected onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
//        this.getAwardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGetAward,this);
        this.dayRBtn.group.removeEventListener(eui.UIEvent.CHANGE,this.onChangeRankType,this)
        this.ruleDesc.visible = false;
    }

    protected onDestroy() {

    }
}
