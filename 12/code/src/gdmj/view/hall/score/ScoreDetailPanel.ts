/**
 *
 * @author chenwei
 * 2016/08/03
 */
class ScoreDetailPanel extends BasePanel{
	public constructor() {
    	super();
    	this.skinName="ScoreDetailPanelSkin"
	}

    private deskno:number;
    private buildDate: number;
    private roomid:number;
    
    private p1head:eui.Image;
    private p1name:eui.Label;
    
    private p2head: eui.Image;
    private p2name: eui.Label;
    
    private p3head: eui.Image;
    private p3name: eui.Label;
    
    private p4head: eui.Image;
    private p4name: eui.Label;
    
    protected onEnable() {
        this.setCenter();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTouch,this);  
    }
    private closeBtn: eui.Button;
    private scoreDetailList:eui.List;
    private closeTouch(e: egret.Event) {
        this.hide();
    }
    public setDeskno(desk:number,buildDate:number,roomid:number){
        this.deskno=desk;
        this.buildDate=buildDate;
        this.roomid=roomid;
        this.getData();
        
    }
   protected childrenCreated(){
      
   }
   
   private getData(){
       var http = new HttpSender();
       var data = ProtocolHttp.send_z_combatdetail;
       data.param.deskno = this.deskno;
       data.param.buildDate = this.buildDate;
       data.param.playerID = App.DataCenter.UserInfo.httpUserInfo.userID;
       data.param.roomid=this.roomid;
       http.send(data,this.setData,this);
   }
   
   private setData(data){
       
//       { "playerID":"9218","score":"-20","deskno":"3","gamelog":"{\"test\": \"test\"}","gameDate":"1470364426","replayCode":"0","num":"605" }
       
       if(!data.ret) {
           let ac = new eui.ArrayCollection();
           var rList = data;
           
           let arr = [];
           let ix=1;
           for(let i = 0;i < rList.data.length;i++) {
               let rObj = rList.data[i];
               let dataObj = new Object();
               dataObj["n"] = "第"+(ix++)+"局";
               dataObj["playerID"] = rObj.playerID;
               dataObj["score"] = rObj.score;
               dataObj["gameDate"] = rObj.gameDate;
               dataObj["deskno"] = rObj.deskno;
               dataObj["num"] = rObj.num;
               dataObj["deskno"] = rObj.deskno;
               dataObj["replayCode"] = rObj.replayCode;
               dataObj["avater_url"] = rObj.avater_url;          
               
               let gamelog: Object = JSON.parse(rObj.gamelog);   
               dataObj["gamelog"] = rObj.gamelog;                    
               let gdate = new Date();
               gdate.setTime(rObj.gameDate*1000);
               dataObj["time"] = gdate.getHours() + ":" + (gdate.getMinutes() > 9 ? gdate.getMinutes() : "0" + gdate.getMinutes());               
               dataObj["p1"] = gamelog[gamelog["seat0"]]; 
               dataObj["p2"] = gamelog[gamelog["seat1"]];   
               dataObj["p3"] = gamelog[gamelog["seat2"]];   
               dataObj["p4"] = gamelog[gamelog["seat3"]];   
               dataObj["banker"] = gamelog["banker"];                 
               arr.push(dataObj);               
           }
           
           //为累加数据,需要减掉前一个数据
           for(let i = arr.length-1;i>0;i--) {
               arr[i]["p1"] -= arr[i - 1]["p1"];
               arr[i]["p2"] -= arr[i - 1]["p2"]
               arr[i]["p3"] -= arr[i - 1]["p3"]
               arr[i]["p4"] -= arr[i - 1]["p4"]               
           }
           
           let userinfo=JSON.parse(rList.data[0].userinfo);
           let gamelog = JSON.parse(rList.data[0].gamelog);           
           this.p1head.source = userinfo[gamelog.seat0].avater_url == "1" ? "" : userinfo[gamelog.seat0].avater_url;
           this.p1name.text = userinfo[gamelog.seat0].name;

           this.p2head.source = userinfo[gamelog.seat1].avater_url == "1" ? "" : userinfo[gamelog.seat1].avater_url;
           this.p2name.text = userinfo[gamelog.seat1].name;

           this.p3head.source = userinfo[gamelog.seat2].avater_url == "1" ? "" : userinfo[gamelog.seat2].avater_url;
           this.p3name.text = userinfo[gamelog.seat2].name;

           this.p4head.source = userinfo[gamelog.seat3].avater_url == "1" ? "" : userinfo[gamelog.seat3].avater_url;
           this.p4name.text = userinfo[gamelog.seat3].name;
           
           ac.source = arr;
           this.scoreDetailList.dataProvider = ac;

       } else {
//           Tips.info(data.desc);
       }
       
   }
    
}
