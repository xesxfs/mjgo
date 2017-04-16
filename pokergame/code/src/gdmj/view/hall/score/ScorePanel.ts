/**
 *
 * @author chenwei
 * 2016/07/13
 */
class ScorePanel extends BasePanel{
	public constructor() {
    	super();    	
    	this.skinName="ScorePanelSkin"
	}
   
    //关闭
    private closeBtn: eui.Button;
    private lookBtn:eui.Button;
    private nullTipsLab:eui.Label;
    private scoreList:eui.List;
    protected onEnable() {
        this.getData();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTouch,this);  
        this.lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLookTouch,this);  
        this.setCenter();        
    }
    protected childrenCreated(){       
    }
    
    private closeTouch(e:egret.Event){
        this.hide();
    }
    
    private onLookTouch(e: egret.Event) {
        var codebox = new LookPswPanel();   
        codebox.show();
    }
    
    public setScoreListData(scoreArray:Array<Object>){
        <eui.ArrayCollection>this.scoreList.dataProvider;        
    }
    
    protected onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTouch,this);
        this.lookBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLookTouch,this);  
    }
    
    private getData(){
        var http = new HttpSender();
        var sendData = ProtocolHttp.send_z_combat;
//        sendData.param.playerID
        http.send(sendData,this.setData,this);
    }
    
    
    private setData(data){

//        { "gameID":"99999999","deskno":"3","buildDate":"1470477243","ownerID":"9223","playerGameInfo":"","num":"81","deskCode":"149399" }
        if(!data.ret) {
            this.nullTipsLab.visible = false;
            let ac = new eui.ArrayCollection();
            var rList = data;
            let arr = [];
            for(let i = 0;i < rList.data.length;i++) {                
                let rObj = rList.data[i];
                let dataObj = new Object();
                dataObj["ownerID"] = rObj.ownerID;   
//                dataObj["score"] = rObj.score;
                dataObj["buildDate"] = rObj.buildDate;
                dataObj["deskCode"] = rObj.deskCode;                
                dataObj["num"] = rObj.num;
                dataObj["deskno"] = rObj.deskno;
                dataObj["roomid"] = rObj.roomid;
//                let playerGameInfo: Object = JSON.parse(rObj.playerGameInfo);
//                dataObj["playerGameInfo"] = rObj.playerGameInfo;               
                let gdate = new Date();
                gdate.setTime(rObj.buildDate*1000);
                
                dataObj["time"] = gdate.getFullYear() + "-" + NumberTool.formatTime((gdate.getMonth() + 1)) + "-" + NumberTool.formatTime(gdate.getDate()) + " " + NumberTool.formatTime(gdate.getHours()) + ":" + NumberTool.formatTime(gdate.getMinutes()) + ":" + NumberTool.formatTime(gdate.getSeconds());
      
                dataObj["playerGameInfo"] = JSON.parse(rObj.playerGameInfo);
                dataObj["RecordList"] = dataObj["playerGameInfo"].RecordList;              
                             
                if(!dataObj["RecordList"].length){
                    continue;
                }
                for(let i = 0;i < dataObj["RecordList"].length;i++) { 
                    //4个玩家数据
                    let play = dataObj["RecordList"][i];                   
                    
                    if(play.userID == App.DataCenter.UserInfo.httpUserInfo.userID){                        
                        dataObj["mp"] = play.point;
                        if(play.point > 0) {
                            dataObj["s"] = "score_win_png";
                        } else {
                            dataObj["s"] = "score_lost_png";
                        }
                    }
                }                
                arr.unshift(dataObj);
            }
            ac.source = arr;
            this.scoreList.dataProvider = ac;

        } else {
            this.nullTipsLab.visible=true;
//            Tips.info(data.desc);
        }
    }
}
