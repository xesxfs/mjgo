/**
 * 牌局信息
 * @author chenkai 
 * @date 2016/7/12
 */
class MatchInfoPanel extends BasePanel{
    private panelBg:PanelBg;
    private uiGroup:eui.Group;  //uiGroup
    private headUIList = [];   //头像
    private nameList = [];     //名字
    private idList = [];       //id
    private ziMoList = [];     //自摸
    private jiePaoList = [];   //接炮
    private dianPaoList = [];  //点炮
    private anGangList = [];   //暗杠
    private gangList = [];     //明杠
    private zScoreList = [];   //总成绩，正分
    private fScoreList = [];   //总成绩，负分
    
	public constructor() {
    	super();
        this.skinName = "MatchInfoPanelSkin";
	}
	
    protected childrenCreated() {
        for(var i=0;i<4;i++){
            this.headUIList[i] = this.uiGroup.getChildAt(i);
            this.nameList[i] = this.uiGroup.getChildAt(i+4);
            this.idList[i] = this.uiGroup.getChildAt(i+8);
            this.ziMoList[i] = this.uiGroup.getChildAt(i+12);
            this.jiePaoList[i] = this.uiGroup.getChildAt(i+16);
            this.dianPaoList[i] = this.uiGroup.getChildAt(i+20);
            this.anGangList[i] = this.uiGroup.getChildAt(i+24);
            this.gangList[i] = this.uiGroup.getChildAt(i+28);
            this.zScoreList[i] = this.uiGroup.getChildAt(i+32);
            this.fScoreList[i] = this.uiGroup.getChildAt(i+36);
        }
    }

    protected onEnable() {
        this.setCenter();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.updateInfo();
    }

    protected onRemove() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    private onTouchTap(e:egret.TouchEvent){
        switch(e.target){
            case this.panelBg.closeBtn:
                this.hide();
                this.clear();
            break;
        }
    }
    
    //更新页面
    public updateInfo(){
        this.clear();

        var json = ProtocolData.Rev180_62_0;
        console.log("牌局信息:", json);
        var recordList = json.RecordList;
        if(recordList == null){
            console.log("牌局信息不存在");
            return;
        }
        var len = recordList.length;
        for(var i=0;i<len;i++){
            var recordInfo = recordList[i];
            var userID = recordInfo.userID;
            var userVO: UserVO = App.DataCenter.UserInfo.getUser(userID);
            if(userVO){
                this.nameList[i].text =  StringTool.formatNickName(userVO.nickName);
                this.idList[i].text = "ID：" + userVO.userID;
                this.headUIList[i].source = userVO.headUrl;
            }
            this.ziMoList[i].text = "自摸次数：" + recordInfo.ziMoNum;
            this.jiePaoList[i].text = "接炮次数：" +recordInfo.jiePaoNum;
            this.dianPaoList[i].text ="点炮次数：" + recordInfo.dianPaoNum;
            this.anGangList[i].text = "暗杠次数：" +recordInfo.anGangNum;
            this.gangList[i].text = "明杠次数：" +recordInfo.mingGangNum;
            console.log("poin="+recordInfo.point);
            if(recordInfo.point >= 0){
                this.zScoreList[i].text = "+" + recordInfo.point;
                this.fScoreList[i].text = "";
            }else{
                this.zScoreList[i].text = "";
                this.fScoreList[i].text = recordInfo.point + "";
            }
        }
    }

    //清理
    public clear(){
        var len = this.headUIList.length;
        for(var i=0;i<4;i++){
            this.nameList[i].text = "";
            this.idList[i].text = "";
            this.headUIList[i].bitmapData = null;
            this.ziMoList[i].text =  "自摸次数：0";
            this.jiePaoList[i].text = "接炮次数：0";
            this.dianPaoList[i].text = "点炮次数：0";
            this.anGangList[i].text = "暗杠次数：0";
            this.gangList[i].text = "明杠次数：0";
            this.zScoreList[i].text = "";
            this.fScoreList[i].text = "";
        }
    }
	
}
