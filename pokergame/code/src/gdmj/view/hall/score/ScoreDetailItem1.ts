/**
 * @author xiongjian
 * 2017-1-14
 */

class ScoreDetailItem1 extends eui.ItemRenderer{
    public constructor(){
        super();
        this.skinName = "ScoreItemSkin1";
         this.touchChildren = true;
    }


    private scoreLabel :eui.Label;
    private selfLabel :eui.Label;
    private timeLabel :eui.Label;
    private user1Label :eui.Label;
    private user2Label :eui.Label;
    private user3Label :eui.Label;
    private shareBtn :eui.Button;
    private huifangBtn:eui.Button;
    private replayCode:string;


    public dataChanged():void{

        //console.log(this.data);
        // var date = this.data.gameDate;
        // var date1 = new Date(parseInt(date) *1000);
        // var seconds = date1.getSeconds()>10?date1.getSeconds():"0"+date1.getSeconds();
        // var time = date1.getHours() +":"+ seconds;
        // console.log(date);
        this.replayCode = this.data.replayCode

        var time = this.data.time;
        // console.log(time);
        this.timeLabel.text = time;

        this.scoreLabel.text = this.data.sort;  
        // this.selfLabel.text = this.data.selfScore;
        
        // this.user1Label.text = this.data["userList"][0].score;
        // this.user2Label.text = this.data["userList"][1].score;
        // this.user3Label.text = this.data["userList"][2].score;

        var selfScore = parseInt(this.data.selfScore);
        var user1Score = parseInt(this.data["userList"][0].score);
        var user2Score =  parseInt(this.data["userList"][1].score);
        var user3Score =  parseInt(this.data["userList"][2].score);

                /**
         * 分数处理
         */
          var p1 = this.setPoint(user1Score);
          var p2 = this.setPoint(user2Score);
          var p3 = this.setPoint(user3Score);
          var p4 = this.setPoint(selfScore);
          this.user1Label.text = p1;
          this.user2Label.text = p2;
          this.user3Label.text = p3;
          this.selfLabel.text = p4;

        /**
         * 分数颜色修改
         */
        if (user1Score >= 0){
            this.user1Label.textColor = 0xffb238;
        }else{
            this.user1Label.textColor = 0xabdbec;
        }

        if (user2Score >= 0){
            this.user2Label.textColor = 0xffb238;
        }else{
            this.user2Label.textColor = 0xabdbec;
        }

        if (user3Score >= 0){
            this.user3Label.textColor = 0xffb238;
        }else{
            this.user3Label.textColor = 0xabdbec;
        }

        if (selfScore >= 0){
            this.selfLabel.textColor = 0xffb238;
        }else{
            this.selfLabel.textColor = 0xabdbec;
        }
    }

    protected childrenCreated() {
       this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareBtnTouch,this);
       this.huifangBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.huifangBtnTouch,this);
    }


    /**
     * 分享按钮点击
     */
    private shareBtnTouch(){
       // console.log("点击分享");
        // App.PanelManager.open(PanelConst.ScoreSharePanel);
         var sharePanel: SharePanel = App.PanelManager.open(PanelConst.SharePanel);
            //sharePanel.showShareReplay();
        //分享数据
         var userID: number = App.DataCenter.UserInfo.getMyUserVo().userID;
        var deskCode: number = App.DataCenter.deskInfo.deskCode;
        var deskId: number = App.DataCenter.deskInfo.deskID;
        var replayCode:string = this.replayCode
        // console.log(replayCode);
        App.EventManager.sendEvent(App.EVENT_SET_WEB_WXSHARE,userID,deskCode,replayCode,deskId);
        
    }

    /**
     * 回放按钮点击
     */
    private huifangBtnTouch(){
       // console.log("点击回放");
            if(App.DataCenter.gameState != 3){
                var http = new HttpSender();
                var sendData = ProtocolHttp.send_z_replayCombatGain;
                sendData.param.replaycode = parseInt(this.data.replayCode);
                http.send(sendData,this.complete,this); 
           }else{
               Tips.info("游戏正在进行中，请游戏结束后回放!")
           }
    }


    private complete(data) {

        if(App.DataCenter.UserInfo.getMyUserVo().isOvertime == 1) {
            Tips.info("您房间过期不能看到回放!") 
            return;}
        
        if(!data.ret) {
            let replayData = data.data.replay;
 
//           let hallScene:HallScene= App.SceneManager.getScene(SceneConst.HallScene) ;
//            hallScene.intoGameDesk(true,replayData);
            App.DataCenter.replayInfo.bReplay = true;
            App.DataCenter.replayInfo.replayData = replayData;
            let gameScene:GameScene= App.SceneManager.getScene(SceneConst.GameScene) ;
            gameScene.reconnnect();
            
        } else {
            Tips.info(data.desc);
        }

    }

        /**
     * 分数过万处理 
     */
    private setPoint(point){
        var result;

        if(point > 0 && point >= 10000 ){
            result = (point/10000).toFixed(2)+"万";
        }else if(point < 0 && point <= -10000){
            result = (point/10000).toFixed(2)+"万";
        }else{
            result = point;
        }

        return result;
    }

}